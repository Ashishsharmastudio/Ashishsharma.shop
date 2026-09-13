import express, {
  Request,
  Response,
  NextFunction,
} from 'express';

import mongoose from 'mongoose';

import {
  McpServer,
} from '@modelcontextprotocol/sdk/server/mcp.js';

import {
  StreamableHTTPServerTransport,
} from '@modelcontextprotocol/sdk/server/streamableHttp.js';

import {
  z,
} from 'zod';

import dotenv from 'dotenv';

import dbConnect from './lib/mongodb.js';
import Blog from './lib/Blog.js';

dotenv.config();

// =============================================================================
// EXPRESS APPLICATION
// =============================================================================

const app = express();

app.use(
  express.json({
    limit: '10mb',
  })
);

// =============================================================================
// DATABASE
// =============================================================================

app.use(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // MCP requests also need MongoDB because create_blog_post writes to DB.
    try {
      await dbConnect();
      next();
    } catch (error: unknown) {
      console.error(
        'Database connection error:',
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : 'Unknown database error';

      return res.status(500).json({
        success: false,
        error: 'Database connection failed',
        details: message,
      });
    }
  }
);

// =============================================================================
// BLOG UTILITIES
// =============================================================================

function generateSlug(
  value: string
): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Creates a unique slug.
 *
 * Example:
 *
 * my-blog
 * my-blog-2
 * my-blog-3
 */
async function generateUniqueSlug(
  requestedSlug: string
): Promise<string> {
  const baseSlug =
    generateSlug(requestedSlug);

  if (!baseSlug) {
    throw new Error(
      'Unable to generate a valid slug.'
    );
  }

  let slug = baseSlug;
  let counter = 2;

  while (
    await Blog.exists({ slug })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;

    if (counter > 1000) {
      throw new Error(
        'Unable to generate a unique slug.'
      );
    }
  }

  return slug;
}

// =============================================================================
// STANDARD MCP SERVER
// =============================================================================

function createMcpServer(): McpServer {
  const server = new McpServer(
    {
      name: 'Ashish Sharma Blog',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // ---------------------------------------------------------------------------
  // CREATE BLOG TOOL
  // ---------------------------------------------------------------------------

  server.registerTool(
    'create_blog_post',
    {
      title: 'Create Blog Post',

      description:
        'Create and publish a technical, design, AI, engineering, or software blog post on Ashish Sharma Blog. The tool stores the article in MongoDB.',

      inputSchema: {
        title: z
          .string()
          .min(3)
          .describe(
            'The title of the blog post'
          ),

        slug: z
          .string()
          .min(1)
          .optional()
          .describe(
            'Optional URL slug. A unique slug is generated automatically when omitted or when the requested slug already exists.'
          ),

        excerpt: z
          .string()
          .min(10)
          .describe(
            'Short SEO-friendly summary of the blog post'
          ),

        content: z
          .string()
          .min(20)
          .describe(
            'Full blog content. HTML is supported.'
          ),

        tags: z
          .array(z.string())
          .optional()
          .describe(
            'Relevant blog categories or tags'
          ),

        coverImage: z
          .string()
          .url()
          .optional()
          .or(z.literal(''))
          .describe(
            'Optional public cover image URL'
          ),

        published: z
          .boolean()
          .default(true)
          .describe(
            'Whether the blog should be published immediately'
          ),

        author: z
          .string()
          .optional()
          .describe(
            'Blog author. Defaults to Ashish Sharma.'
          ),
      },
    },

    async ({
      title,
      slug,
      excerpt,
      content,
      tags,
      coverImage,
      published,
      author,
    }) => {
      try {
        await dbConnect();

        // Generate a collision-safe slug.
        const finalSlug =
          await generateUniqueSlug(
            slug || title
          );

        const post =
          new Blog({
            title,
            slug: finalSlug,
            excerpt,
            content,
            coverImage:
              coverImage || '',
            author:
              author ||
              'Ashish Sharma',
            tags:
              Array.isArray(tags)
                ? tags
                : [],
            published:
              Boolean(published),
          });

        await post.save();

        return {
          content: [
            {
              type: 'text',
              text:
                `Blog post created successfully.\n\n` +
                `ID: ${post._id}\n` +
                `Title: ${post.title}\n` +
                `Slug: ${post.slug}\n` +
                `URL: https://www.ashishsharma.shop/blog/${post.slug}\n` +
                `Status: ${
                  post.published
                    ? 'Published'
                    : 'Draft'
                }`,
            },
          ],
        };
      } catch (
        error: unknown
      ) {
        console.error(
          'create_blog_post error:',
          error
        );

        const message =
          error instanceof Error
            ? error.message
            : 'Unknown error';

        return {
          isError: true,

          content: [
            {
              type: 'text',
              text:
                `Failed to create blog post: ${message}`,
            },
          ],
        };
      }
    }
  );

  return server;
}

// =============================================================================
// MCP STREAMABLE HTTP
// =============================================================================

/**
 * Standard MCP Streamable HTTP endpoint.
 *
 * We use stateless mode because Vercel functions are serverless.
 *
 * A fresh transport is created for every POST request.
 */
app.post(
  '/api/mcp',
  async (
    req: Request,
    res: Response
  ) => {
    try {
      /*
       * Some HTTP MCP clients send only application/json in Accept.
       *
       * The SDK's Streamable HTTP implementation may validate that
       * text/event-stream is also advertised, even when JSON responses
       * are explicitly enabled.
       *
       * Adding it here keeps the endpoint compatible with those clients.
       */
      const accept =
        req.headers.accept || '';

      if (
        !accept.includes(
          'text/event-stream'
        )
      ) {
        req.headers.accept =
          accept
            ? `${accept}, text/event-stream`
            : 'application/json, text/event-stream';
      }

      const server =
        createMcpServer();

      const transport =
        new StreamableHTTPServerTransport(
          {
            sessionIdGenerator:
              undefined,

            enableJsonResponse:
              true,
          }
        );

      res.on(
        'close',
        () => {
          transport
            .close()
            .catch(() => {});
        }
      );

      await server.connect(
        transport
      );

      await transport.handleRequest(
        req,
        res,
        req.body
      );
    } catch (
      error: unknown
    ) {
      console.error(
        'MCP Streamable HTTP error:',
        error
      );

      if (!res.headersSent) {
        const message =
          error instanceof Error
            ? error.message
            : 'Internal MCP server error';

        return res.status(500).json({
          jsonrpc: '2.0',

          error: {
            code: -32603,
            message,
          },

          id: null,
        });
      }
    }
  }
);

// =============================================================================
// MCP GET
// =============================================================================

/**
 * Streamable HTTP GET.
 *
 * Our server is stateless and does not maintain a persistent
 * server-to-client notification stream, so GET is not needed
 * for normal tool execution.
 */
app.get(
  '/api/mcp',
  (
    _req: Request,
    res: Response
  ) => {
    return res.status(405).json({
      error:
        'MCP GET is not used by this stateless server. Use POST with a valid MCP request.',
    });
  }
);

// =============================================================================
// MCP DELETE
// =============================================================================

app.delete(
  '/api/mcp',
  (
    _req: Request,
    res: Response
  ) => {
    return res.status(405).json({
      error:
        'This MCP server is stateless and does not maintain sessions.',
    });
  }
);

// =============================================================================
// BLOG REST API
// =============================================================================

// -----------------------------------------------------------------------------
// GET ALL BLOGS
// -----------------------------------------------------------------------------

app.get(
  '/api/blogs',
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const published =
        req.query.published;

      const filter: {
        published?: boolean;
      } = {};

      if (
        published === 'true'
      ) {
        filter.published = true;
      }

      const blogs =
        await Blog.find(filter)
          .sort({
            createdAt: -1,
          })
          .lean();

      return res.status(200).json(
        blogs
      );
    } catch (
      error: unknown
    ) {
      console.error(
        'GET /api/blogs error:',
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : 'Failed to fetch blogs';

      return res.status(500).json({
        success: false,
        error: message,
      });
    }
  }
);

// -----------------------------------------------------------------------------
// GET SINGLE BLOG
// -----------------------------------------------------------------------------

app.get(
  '/api/blogs/:idOrSlug',
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        idOrSlug,
      } = req.params;

      let blog;

      if (
        /^[0-9a-fA-F]{24}$/.test(
          idOrSlug
        )
      ) {
        blog =
          await Blog.findById(
            idOrSlug
          );
      } else {
        blog =
          await Blog.findOne({
            slug: idOrSlug,
          });
      }

      if (!blog) {
        return res.status(404).json({
          success: false,
          error: 'Blog not found',
        });
      }

      blog.views =
        (blog.views || 0) + 1;

      await blog.save();

      return res.status(200).json(
        blog
      );
    } catch (
      error: unknown
    ) {
      console.error(
        'GET /api/blogs/:idOrSlug error:',
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : 'Failed to fetch blog';

      return res.status(500).json({
        success: false,
        error: message,
      });
    }
  }
);

// -----------------------------------------------------------------------------
// CREATE BLOG
// -----------------------------------------------------------------------------

app.post(
  '/api/blogs',
  async (
    req: Request,
    res: Response
  ) => {
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

      if (
        !title ||
        !excerpt ||
        !content
      ) {
        return res.status(400).json({
          success: false,
          error:
            'Missing required fields: title, excerpt, or content',
        });
      }

      const finalSlug =
        await generateUniqueSlug(
          slug || title
        );

      const newBlog =
        new Blog({
          title,
          slug: finalSlug,
          excerpt,
          content,
          coverImage:
            coverImage || '',
          author:
            author ||
            'Ashish Sharma',
          tags:
            Array.isArray(tags)
              ? tags
              : [],
          published:
            typeof published ===
            'boolean'
              ? published
              : false,
        });

      const savedBlog =
        await newBlog.save();

      return res.status(201).json(
        savedBlog
      );
    } catch (
      error: unknown
    ) {
      console.error(
        'POST /api/blogs error:',
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : 'Failed to create blog';

      return res.status(400).json({
        success: false,
        error: message,
      });
    }
  }
);

// -----------------------------------------------------------------------------
// UPDATE BLOG
// -----------------------------------------------------------------------------

app.put(
  '/api/blogs/:id',
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        id,
      } = req.params;

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
          success: false,
          error: 'Blog not found',
        });
      }

      return res.status(200).json(
        updatedBlog
      );
    } catch (
      error: unknown
    ) {
      console.error(
        'PUT /api/blogs/:id error:',
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : 'Failed to update blog';

      return res.status(400).json({
        success: false,
        error: message,
      });
    }
  }
);

// -----------------------------------------------------------------------------
// DELETE BLOG
// -----------------------------------------------------------------------------

app.delete(
  '/api/blogs/:id',
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        id,
      } = req.params;

      const deleted =
        await Blog.findByIdAndDelete(
          id
        );

      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Blog not found',
        });
      }

      return res.status(200).json({
        success: true,
        message:
          'Blog deleted successfully',
      });
    } catch (
      error: unknown
    ) {
      console.error(
        'DELETE /api/blogs/:id error:',
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : 'Failed to delete blog';

      return res.status(500).json({
        success: false,
        error: message,
      });
    }
  }
);

// =============================================================================
// OPENAPI
// =============================================================================

app.get(
  '/api/openapi.json',
  (
    req: Request,
    res: Response
  ) => {
    const host =
      req.headers.host ||
      'localhost:3000';

    const forwardedProto =
      req.headers[
        'x-forwarded-proto'
      ];

    const protocol =
      Array.isArray(
        forwardedProto
      )
        ? forwardedProto[0]
        : forwardedProto ||
          (process.env.NODE_ENV ===
          'production'
            ? 'https'
            : 'http');

    return res.json({
      openapi: '3.0.0',

      info: {
        title:
          'Digital Product Studio Blog API',

        description:
          'API for managing Ashish Sharma blog articles.',

        version: '2.0.0',
      },

      servers: [
        {
          url: `${protocol}://${host}`,
        },
      ],

      paths: {
        '/api/blogs': {
          get: {
            operationId:
              'getBlogs',

            summary:
              'Get all blog posts',
          },

          post: {
            operationId:
              'createBlogPost',

            summary:
              'Create a new blog post',
          },
        },

        '/api/blogs/{idOrSlug}': {
          get: {
            operationId:
              'getBlog',

            summary:
              'Get a blog post',
          },
        },

        '/api/mcp': {
          post: {
            operationId:
              'mcpEndpoint',

            summary:
              'MCP Streamable HTTP endpoint',
          },
        },

        '/api/health': {
          get: {
            operationId:
              'healthCheck',

            summary:
              'API and MongoDB health check',
          },
        },
      },
    });
  }
);

// =============================================================================
// HEALTH
// =============================================================================

app.get(
  '/api/health',
  async (
    _req: Request,
    res: Response
  ) => {
    try {
      await dbConnect();

      const connected =
        mongoose.connection
          .readyState === 1;

      return res.status(
        connected ? 200 : 503
      ).json({
        ok: connected,

        service:
          'Digital Product Studio Blog API',

        database: connected
          ? 'connected'
          : 'disconnected',

        databaseName:
          mongoose.connection.db
            ?.databaseName ||
          null,

        host:
          mongoose.connection.host ||
          null,

        timestamp:
          new Date().toISOString(),
      });
    } catch (
      error: unknown
    ) {
      console.error(
        'Health check error:',
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : 'Unknown database error';

      return res.status(500).json({
        ok: false,

        service:
          'Digital Product Studio Blog API',

        database:
          'disconnected',

        error: message,

        timestamp:
          new Date().toISOString(),
      });
    }
  }
);

// =============================================================================
// ERROR HANDLER
// =============================================================================

app.use(
  (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(
      'Unhandled Express error:',
      error
    );

    if (
      res.headersSent
    ) {
      return next(error);
    }

    const message =
      error instanceof Error
        ? error.message
        : 'Internal server error';

    return res.status(500).json({
      success: false,
      error: message,
    });
  }
);

// =============================================================================
// VERCEL EXPORT
// =============================================================================

export default app;