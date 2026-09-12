import express, {
  Request,
  Response,
  NextFunction,
} from 'express';

import dbConnect from '../lib/mongodb';
import Blog from '../lib/models/Blog';

const app = express();

app.use(express.json({ limit: '10mb' }));

// -------------------------------------------------------------
// Database connection middleware
// -------------------------------------------------------------

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

      res.status(500).json({
        error: 'Database connection failed',
        details: error.message,
      });
    }
  }
);

// -------------------------------------------------------------
// Optional API key validation for automated creation tools
// -------------------------------------------------------------

const validateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.BLOG_API_SECRET;

  // If no secret is configured, allow the request.
  if (!secret) {
    return next();
  }

  const authHeader =
    req.headers['authorization'] ||
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

// -------------------------------------------------------------
// 1. Core Blog REST Endpoints
// -------------------------------------------------------------

// GET all blogs
app.get(
  '/api/blogs',
  async (req: Request, res: Response) => {
    try {
      const { published } = req.query;

      const query: Record<string, any> = {};

      if (published === 'true') {
        query.published = true;
      }

      const blogs = await Blog.find(query).sort({
        createdAt: -1,
      });

      res.json(blogs);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);

// GET single blog by slug or ID
app.get(
  '/api/blogs/:idOrSlug',
  async (req: Request, res: Response) => {
    try {
      const { idOrSlug } = req.params;

      let blog;

      if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
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

      // Increment views whenever a blog is requested.
      blog.views = (blog.views || 0) + 1;
      await blog.save();

      res.json(blog);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);

// POST create blog
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

      // Generate slug from title if none was provided.
      const finalSlug = (slug || title)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

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

      res.status(201).json(newBlog);
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
);

// PUT update blog
app.put(
  '/api/blogs/:id',
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedBlog =
        await Blog.findByIdAndUpdate(
          id,
          req.body,
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

      res.json(updatedBlog);
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
);

// DELETE blog
app.delete(
  '/api/blogs/:id',
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deleted =
        await Blog.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({
          error: 'Blog not found',
        });
      }

      res.json({
        message: 'Blog deleted successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);

// -------------------------------------------------------------
// 2. MCP (Model Context Protocol) Endpoint
// -------------------------------------------------------------

app.post(
  '/api/mcp',
  validateApiKey,
  async (req: Request, res: Response) => {
    const {
      jsonrpc,
      method,
      params,
      id,
    } = req.body;

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

    // ---------------------------------------------------------
    // Tool Listing
    // ---------------------------------------------------------

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

    // ---------------------------------------------------------
    // Tool Execution
    // ---------------------------------------------------------

    if (method === 'tools/call') {
      const {
        name,
        arguments: args,
      } = params || {};

      if (name === 'create_blog_post') {
        try {
          const finalSlug = (
            args?.slug || args?.title
          )
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

          const post = new Blog({
            title: args?.title,
            slug: finalSlug,
            excerpt: args?.excerpt,
            content: args?.content,
            coverImage:
              args?.coverImage || '',
            author:
              args?.author || 'Ashish Sharma',
            tags: Array.isArray(args?.tags)
              ? args.tags
              : [],
            published: Boolean(args?.published),
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
                    `Blog post created successfully with ID ${post._id} ` +
                    `and slug '${post.slug}'. ` +
                    `Status: ${
                      post.published
                        ? 'Published'
                        : 'Draft'
                    }.`,
                },
              ],
            },
          });
        } catch (error: any) {
          return res.json({
            jsonrpc: '2.0',
            id,
            result: {
              isError: true,
              content: [
                {
                  type: 'text',
                  text:
                    `Failed to create blog post: ${error.message}`,
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
  }
);

// -------------------------------------------------------------
// 3. OpenAPI 3.0 Manifest
// -------------------------------------------------------------

app.get(
  '/api/openapi.json',
  (req: Request, res: Response) => {
    const host =
      req.headers.host || 'localhost:3000';

    const protocol =
      req.headers['x-forwarded-proto'] || 'https';

    res.json({
      openapi: '3.0.0',

      info: {
        title: 'Digital Product Studio Blog API',
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
          post: {
            operationId: 'createBlogPost',

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
      },
    });
  }
);

export default app;