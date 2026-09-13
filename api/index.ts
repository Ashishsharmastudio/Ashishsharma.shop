import express, {
  Request,
  Response,
  NextFunction,
} from 'express';

import mongoose, {
  Schema,
  Document,
  Model,
  QueryFilter,
  UpdateQuery,
} from 'mongoose';

import dotenv from 'dotenv';
import dns from 'node:dns';

dotenv.config();

/**
 * Temporary DNS workaround.
 *
 * Your local DNS resolver was failing MongoDB SRV lookups,
 * while 8.8.8.8 successfully resolved the Atlas SRV record.
 *
 * Keep this for now while we verify production.
 */
dns.setServers(['8.8.8.8']);

// -----------------------------------------------------------------------------
// MongoDB configuration
// -----------------------------------------------------------------------------

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.warn(
    'Warning: MONGODB_URI is not defined in environment variables.'
  );
}

// -----------------------------------------------------------------------------
// Blog model
// -----------------------------------------------------------------------------

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  published: boolean;
  views: number;
  totalTimeSpent: number;
  createdAt: Date;
}

const BlogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
  },

  excerpt: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  coverImage: {
    type: String,
    default: '',
  },

  author: {
    type: String,
    default: 'Ishant Saini',
  },

  tags: {
    type: [String],
    default: [],
  },

  published: {
    type: Boolean,
    default: false,
  },

  views: {
    type: Number,
    default: 0,
  },

  totalTimeSpent: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog: Model<IBlog> =
  (mongoose.models.Blog as Model<IBlog> | undefined) ||
  mongoose.model<IBlog>('Blog', BlogSchema);

// -----------------------------------------------------------------------------
// MongoDB connection cache
// -----------------------------------------------------------------------------

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = {
    conn: null,
    promise: null,
  };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables.');
  }

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (error) {
    cached!.promise = null;
    throw error;
  }

  return cached!.conn;
}

// -----------------------------------------------------------------------------
// Express application
// -----------------------------------------------------------------------------

const app = express();

app.use(
  express.json({
    limit: '10mb',
  })
);

// -----------------------------------------------------------------------------
// Database middleware
// -----------------------------------------------------------------------------

app.use(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await dbConnect();
      next();
    } catch (error: any) {
      console.error('Database connection error:', error);

      return res.status(500).json({
        error: 'Database connection failed',
        details: error?.message || 'Unknown database error',
      });
    }
  }
);

// -----------------------------------------------------------------------------
// Utility functions
// -----------------------------------------------------------------------------

function generateSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// -----------------------------------------------------------------------------
// Optional API key validation for automated creation tools
// -----------------------------------------------------------------------------

const validateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.BLOG_API_SECRET;

  // No secret configured = allow request.
  if (!secret) {
    return next();
  }

  const authHeader =
    req.headers.authorization ||
    req.headers['x-api-key'];

  if (
    !authHeader ||
    (authHeader !== secret &&
      authHeader !== `Bearer ${secret}`)
  ) {
    return res.status(401).json({
      error: 'Unauthorized: Invalid or missing API key',
    });
  }

  next();
};

// =============================================================================
// 1. CORE BLOG REST ENDPOINTS
// =============================================================================

// -----------------------------------------------------------------------------
// GET all blogs
// GET /api/blogs
// Optional: ?published=true
// -----------------------------------------------------------------------------

app.get(
  '/api/blogs',
  async (req: Request, res: Response) => {
    try {
      const { published } = req.query;

      const query: QueryFilter<IBlog> = {};

      if (published === 'true') {
        query.published = true;
      }

      const blogs = await Blog.find(query).sort({
        createdAt: -1,
      });

      return res.json(blogs);
    } catch (error: any) {
      console.error('GET /api/blogs error:', error);

      return res.status(500).json({
        error: error?.message || 'Failed to fetch blogs',
      });
    }
  }
);

// -----------------------------------------------------------------------------
// GET single blog by slug or ID
// GET /api/blogs/:idOrSlug
// -----------------------------------------------------------------------------

app.get(
  '/api/blogs/:idOrSlug',
  async (req: Request, res: Response) => {
    try {
      const { idOrSlug } = req.params;

      let blog: IBlog | null = null;

      if (/^[0-9a-fA-F]{24}$/.test(idOrSlug)) {
        blog = await Blog.findById(idOrSlug);
      } else {
        blog = await Blog.findOne({
          slug: idOrSlug,
        });
      }

      if (!blog) {
        return res.status(404).json({
          error: 'Blog not found',
        });
      }

      // Increment view count.
      blog.views = (blog.views || 0) + 1;

      await blog.save();

      return res.json(blog);
    } catch (error: any) {
      console.error(
        'GET /api/blogs/:idOrSlug error:',
        error
      );

      return res.status(500).json({
        error: error?.message || 'Failed to fetch blog',
      });
    }
  }
);

// -----------------------------------------------------------------------------
// POST create blog
// POST /api/blogs
// -----------------------------------------------------------------------------

app.post(
  '/api/blogs',
  async (req: Request, res: Response) => {
    try {
      const {
        title,
        excerpt,
        content,
        slug,
        tags,
        coverImage,
        author,
        published,
      } = req.body;

      if (!title || !excerpt || !content) {
        return res.status(400).json({
          error:
            'Missing required fields: title, excerpt, or content',
        });
      }

      const finalSlug = generateSlug(
        slug || title
      );

      const newBlog = new Blog({
        title,
        slug: finalSlug,
        excerpt,
        content,
        coverImage: coverImage || '',
        author: author || 'Ashish Sharma',
        tags: Array.isArray(tags) ? tags : [],
        published:
          typeof published === 'boolean'
            ? published
            : false,
      });

      await newBlog.save();

      return res.status(201).json(newBlog);
    } catch (error: any) {
      console.error('POST /api/blogs error:', error);

      return res.status(400).json({
        error: error?.message || 'Failed to create blog',
      });
    }
  }
);

// -----------------------------------------------------------------------------
// PUT update blog
// PUT /api/blogs/:id
// -----------------------------------------------------------------------------

app.put(
  '/api/blogs/:id',
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const update: UpdateQuery<IBlog> = req.body;

      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        update,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedBlog) {
        return res.status(404).json({
          error: 'Blog not found',
        });
      }

      return res.json(updatedBlog);
    } catch (error: any) {
      console.error(
        'PUT /api/blogs/:id error:',
        error
      );

      return res.status(400).json({
        error: error?.message || 'Failed to update blog',
      });
    }
  }
);

// -----------------------------------------------------------------------------
// DELETE blog
// DELETE /api/blogs/:id
// -----------------------------------------------------------------------------

app.delete(
  '/api/blogs/:id',
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deleted = await Blog.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({
          error: 'Blog not found',
        });
      }

      return res.json({
        message: 'Blog deleted successfully',
      });
    } catch (error: any) {
      console.error(
        'DELETE /api/blogs/:id error:',
        error
      );

      return res.status(500).json({
        error: error?.message || 'Failed to delete blog',
      });
    }
  }
);

// =============================================================================
// 2. MCP ENDPOINT
// =============================================================================

// -----------------------------------------------------------------------------
// POST /api/mcp
// -----------------------------------------------------------------------------

app.post(
  '/api/mcp',
  validateApiKey,
  async (req: Request, res: Response) => {
    try {
      const {
        jsonrpc,
        method,
        params,
        id,
      } = req.body || {};

      // -----------------------------------------------------------------------
      // Validate JSON-RPC request
      // -----------------------------------------------------------------------

      if (jsonrpc !== '2.0') {
        return res.status(400).json({
          jsonrpc: '2.0',
          id,
          error: {
            code: -32600,
            message: 'Invalid Request',
          },
        });
      }

      // -----------------------------------------------------------------------
      // MCP tools/list
      // -----------------------------------------------------------------------

      if (method === 'tools/list') {
        return res.json({
          jsonrpc: '2.0',
          id,
          result: {
            tools: [
              {
                name: 'create_blog_post',

                description:
                  'Creates a new technical or design blog post on the studio platform with Markdown/HTML formatting.',

                inputSchema: {
                  type: 'object',

                  properties: {
                    title: {
                      type: 'string',
                      description:
                        'The title of the blog post',
                    },

                    slug: {
                      type: 'string',
                      description:
                        'URL slug (e.g. optimizing-nextjs-15-caching)',
                    },

                    excerpt: {
                      type: 'string',
                      description:
                        'Short 1-2 sentence SEO excerpt',
                    },

                    content: {
                      type: 'string',
                      description:
                        'Full HTML/rich text content with h2, h3, p, ul, code tags',
                    },

                    tags: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description:
                        'Relevant category tags',
                    },

                    coverImage: {
                      type: 'string',
                      description:
                        'Direct image URL for post banner',
                    },

                    published: {
                      type: 'boolean',
                      description:
                        'True to publish immediately, false for draft',
                    },

                    author: {
                      type: 'string',
                      description:
                        'Author name (default: Ashish Sharma)',
                    },
                  },

                  required: [
                    'title',
                    'excerpt',
                    'content',
                  ],
                },
              },
            ],
          },
        });
      }

      // -----------------------------------------------------------------------
      // MCP tools/call
      // -----------------------------------------------------------------------

      if (method === 'tools/call') {
        const {
          name,
          arguments: args,
        } = params || {};

        if (name === 'create_blog_post') {
          try {
            if (
              !args ||
              !args.title ||
              !args.excerpt ||
              !args.content
            ) {
              return res.json({
                jsonrpc: '2.0',
                id,
                result: {
                  isError: true,
                  content: [
                    {
                      type: 'text',
                      text:
                        'Failed to create blog post: title, excerpt, and content are required.',
                    },
                  ],
                },
              });
            }

            const finalSlug = generateSlug(
              args.slug || args.title
            );

            const post = new Blog({
              title: args.title,
              slug: finalSlug,
              excerpt: args.excerpt,
              content: args.content,
              coverImage:
                args.coverImage || '',
              author:
                args.author || 'Ashish Sharma',
              tags: Array.isArray(args.tags)
                ? args.tags
                : [],
              published: Boolean(
                args.published
              ),
            });

            await post.save();

            return res.json({
              jsonrpc: '2.0',
              id,
              result: {
                content: [
                  {
                    type: 'text',
                    text:
                      `Blog post created successfully with ID ${post._id} and slug '${post.slug}'. Status: ${
                        post.published
                          ? 'Published'
                          : 'Draft'
                      }.`,
                  },
                ],
              },
            });
          } catch (error: any) {
            console.error(
              'MCP create_blog_post error:',
              error
            );

            return res.json({
              jsonrpc: '2.0',
              id,
              result: {
                isError: true,
                content: [
                  {
                    type: 'text',
                    text:
                      `Failed to create blog post: ${
                        error?.message ||
                        'Unknown error'
                      }`,
                  },
                ],
              },
            });
          }
        }

        return res.status(404).json({
          jsonrpc: '2.0',
          id,
          error: {
            code: -32601,
            message: `Tool '${name}' not found`,
          },
        });
      }

      return res.status(400).json({
        jsonrpc: '2.0',
        id,
        error: {
          code: -32601,
          message: 'Method not supported',
        },
      });
    } catch (error: any) {
      console.error(
        'POST /api/mcp error:',
        error
      );

      return res.status(500).json({
        jsonrpc: '2.0',
        id: req.body?.id,
        error: {
          code: -32603,
          message:
            error?.message ||
            'Internal server error',
        },
      });
    }
  }
);

// =============================================================================
// 3. OPENAPI 3.0 MANIFEST
// =============================================================================

// -----------------------------------------------------------------------------
// GET /api/openapi.json
// -----------------------------------------------------------------------------

app.get(
  '/api/openapi.json',
  (req: Request, res: Response) => {
    const host =
      req.headers.host ||
      'localhost:3000';

    const forwardedProto =
      req.headers['x-forwarded-proto'];

    const protocol = Array.isArray(
      forwardedProto
    )
      ? forwardedProto[0]
      : forwardedProto ||
        (process.env.NODE_ENV === 'production'
          ? 'https'
          : 'http');

    return res.json({
      openapi: '3.0.0',

      info: {
        title:
          'Digital Product Studio Blog API',

        description:
          'API for creating and managing studio blog articles and case studies.',

        version: '1.0.0',
      },

      servers: [
        {
          url: `${protocol}://${host}`,
        },
      ],

      paths: {
        '/api/blogs': {
          get: {
            operationId: 'getBlogs',

            summary:
              'Get all blog posts',

            parameters: [
              {
                name: 'published',
                in: 'query',
                required: false,
                schema: {
                  type: 'boolean',
                },
                description:
                  'Filter published posts',
              },
            ],

            responses: {
              '200': {
                description:
                  'List of blog posts',
              },

              '500': {
                description:
                  'Database error',
              },
            },
          },

          post: {
            operationId:
              'createBlogPost',

            summary:
              'Create a new blog post',

            requestBody: {
              required: true,

              content: {
                'application/json': {
                  schema: {
                    type: 'object',

                    required: [
                      'title',
                      'excerpt',
                      'content',
                    ],

                    properties: {
                      title: {
                        type: 'string',
                        description:
                          'Article title',
                      },

                      slug: {
                        type: 'string',
                        description:
                          'Unique URL slug',
                      },

                      excerpt: {
                        type: 'string',
                        description:
                          'Short summary for SEO cards',
                      },

                      content: {
                        type: 'string',
                        description:
                          'Rich HTML content (h2, h3, p, ul, etc.)',
                      },

                      tags: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                      },

                      coverImage: {
                        type: 'string',
                        description:
                          'Image URL',
                      },

                      published: {
                        type: 'boolean',
                        description:
                          'Set true to publish or false for draft',
                      },

                      author: {
                        type: 'string',
                        default:
                          'Ashish Sharma',
                      },
                    },
                  },
                },
              },
            },

            responses: {
              '201': {
                description:
                  'Blog post created successfully',
              },

              '400': {
                description:
                  'Validation error',
              },
            },
          },
        },

        '/api/blogs/{idOrSlug}': {
          get: {
            operationId:
              'getBlog',

            summary:
              'Get a blog post by ID or slug',

            parameters: [
              {
                name:
                  'idOrSlug',

                in: 'path',

                required: true,

                schema: {
                  type: 'string',
                },
              },
            ],

            responses: {
              '200': {
                description:
                  'Blog post',
              },

              '404': {
                description:
                  'Blog not found',
              },
            },
          },
        },

        '/api/blogs/{id}': {
          put: {
            operationId:
              'updateBlog',

            summary:
              'Update a blog post',

            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                schema: {
                  type: 'string',
                },
              },
            ],

            requestBody: {
              required: true,

              content: {
                'application/json': {
                  schema: {
                    type: 'object',

                    properties: {
                      title: {
                        type: 'string',
                      },

                      slug: {
                        type: 'string',
                      },

                      excerpt: {
                        type: 'string',
                      },

                      content: {
                        type: 'string',
                      },

                      coverImage: {
                        type: 'string',
                      },

                      author: {
                        type: 'string',
                      },

                      tags: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                      },

                      published: {
                        type: 'boolean',
                      },
                    },
                  },
                },
              },
            },

            responses: {
              '200': {
                description:
                  'Updated blog post',
              },

              '404': {
                description:
                  'Blog not found',
              },
            },
          },

          delete: {
            operationId:
              'deleteBlog',

            summary:
              'Delete a blog post',

            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                schema: {
                  type: 'string',
                },
              },
            ],

            responses: {
              '200': {
                description:
                  'Blog deleted successfully',
              },

              '404': {
                description:
                  'Blog not found',
              },
            },
          },
        },
      },
    });
  }
);

// =============================================================================
// HEALTH CHECK
// =============================================================================

// Useful for quickly verifying that Vercel can invoke the function.
app.get(
  '/api/health',
  (req: Request, res: Response) => {
    return res.json({
      ok: true,
      service: 'Digital Product Studio Blog API',
      database:
        mongoose.connection.readyState === 1
          ? 'connected'
          : 'disconnected',
      timestamp:
        new Date().toISOString(),
    });
  }
);

// =============================================================================
// ERROR HANDLER
// =============================================================================

app.use(
  (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(
      'Unhandled Express error:',
      error
    );

    if (res.headersSent) {
      return next(error);
    }

    return res.status(500).json({
      error:
        error?.message ||
        'Internal server error',
    });
  }
);

// =============================================================================
// VERCEL EXPORT
// =============================================================================

export default app;