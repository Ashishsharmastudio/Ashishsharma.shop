import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import dotenv from 'dotenv';

import dbConnect from './lib/mongodb.js';
import Blog from './lib/Blog.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '10mb' }));

// CORS & Path normalization middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Database middleware
app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await dbConnect();
    next();
  } catch (error: unknown) {
    console.error('Database connection error in api/index:', error);
    const message = error instanceof Error ? error.message : 'Unknown database error';
    return res.status(500).json({
      success: false,
      error: 'Database connection failed',
      details: message,
    });
  }
});

function generateSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function generateUniqueSlug(requestedSlug: string): Promise<string> {
  const baseSlug = generateSlug(requestedSlug);
  if (!baseSlug) {
    throw new Error('Unable to generate a valid slug.');
  }

  let slug = baseSlug;
  let counter = 2;

  while (await Blog.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
    if (counter > 1000) {
      throw new Error('Unable to generate a unique slug.');
    }
  }

  return slug;
}

// =============================================================================
// MCP SERVER INITIALIZATION
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

  server.registerTool(
    'create_blog_post',
    {
      title: 'Create Blog Post',
      description:
        'Create and publish a technical, operational systems, AI, engineering, or software blog post on Ashish Sharma Blog. The tool stores the article in MongoDB.',
      inputSchema: {
        title: z.string().min(3).describe('The title of the blog post'),
        slug: z.string().min(1).optional().describe('Optional URL slug. Unique slug generated automatically when omitted.'),
        excerpt: z.string().min(10).describe('Short SEO-friendly summary of the blog post'),
        content: z.string().min(20).describe('Full blog content. HTML is supported.'),
        tags: z.array(z.string()).optional().describe('Relevant blog categories or tags'),
        coverImage: z.string().url().optional().or(z.literal('')).describe('Optional public cover image URL'),
        published: z.boolean().default(true).describe('Whether the blog should be published immediately'),
        author: z.string().optional().describe('Blog author. Defaults to Ashish Sharma.'),
      },
    },
    async ({ title, slug, excerpt, content, tags, coverImage, published, author }) => {
      try {
        await dbConnect();
        const finalSlug = await generateUniqueSlug(slug || title);

        const post = new Blog({
          title,
          slug: finalSlug,
          excerpt,
          content,
          coverImage: coverImage || '',
          author: author || 'Ashish Sharma',
          tags: Array.isArray(tags) ? tags : [],
          published: Boolean(published),
          createdAt: new Date(),
          updatedAt: new Date(),
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
                `Status: ${post.published ? 'Published' : 'Draft'}`,
            },
          ],
        };
      } catch (error: unknown) {
        console.error('create_blog_post error:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Failed to create blog post: ${message}`,
            },
          ],
        };
      }
    }
  );

  return server;
}

// =============================================================================
// MCP HTTP ENDPOINTS
// =============================================================================

app.post(['/api/mcp', '/mcp'], async (req: Request, res: Response) => {
  try {
    const accept = req.headers.accept || '';
    if (!accept.includes('text/event-stream')) {
      req.headers.accept = accept ? `${accept}, text/event-stream` : 'application/json, text/event-stream';
    }

    const server = createMcpServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    res.on('close', () => {
      transport.close().catch(() => {});
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error: unknown) {
    console.error('MCP Streamable HTTP error:', error);
    if (!res.headersSent) {
      const message = error instanceof Error ? error.message : 'Internal MCP server error';
      return res.status(500).json({
        jsonrpc: '2.0',
        error: { code: -32603, message },
        id: null,
      });
    }
  }
});

app.get(['/api/mcp', '/mcp'], (_req: Request, res: Response) => {
  return res.status(405).json({
    error: 'MCP GET is not used by this stateless server. Use POST with a valid MCP request.',
  });
});

app.delete(['/api/mcp', '/mcp'], (_req: Request, res: Response) => {
  return res.status(405).json({
    error: 'This MCP server is stateless and does not maintain sessions.',
  });
});

// =============================================================================
// BLOG REST ENDPOINTS (Bifurcated: supports both /api/* and /* paths)
// =============================================================================

// GET ALL BLOGS
app.get(['/api/blogs', '/blogs'], async (req: Request, res: Response) => {
  try {
    const published = req.query.published;
    const filter: { published?: boolean } = {};

    if (published === 'true') {
      filter.published = true;
    }

    const blogs = await Blog.find(filter).sort({ createdAt: -1 }).lean();
    return res.status(200).json(blogs);
  } catch (error: unknown) {
    console.error('GET blogs error:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch blogs';
    return res.status(500).json({ success: false, error: message });
  }
});

// GET SINGLE BLOG
app.get(['/api/blogs/:idOrSlug', '/blogs/:idOrSlug'], async (req: Request, res: Response) => {
  try {
    const { idOrSlug } = req.params;
    let blog;

    if (/^[0-9a-fA-F]{24}$/.test(idOrSlug)) {
      blog = await Blog.findById(idOrSlug);
    } else {
      blog = await Blog.findOne({ slug: idOrSlug });
    }

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    blog.views = (blog.views || 0) + 1;
    await blog.save();

    return res.status(200).json(blog);
  } catch (error: unknown) {
    console.error('GET blog/:idOrSlug error:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch blog';
    return res.status(500).json({ success: false, error: message });
  }
});

// CREATE BLOG
app.post(['/api/blogs', '/blogs'], async (req: Request, res: Response) => {
  try {
    const { title, excerpt, content, slug, tags, coverImage, author, published } = req.body;

    if (!title || !excerpt || !content) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: title, excerpt, or content',
      });
    }

    const finalSlug = await generateUniqueSlug(slug || title);

    const newBlog = new Blog({
      title,
      slug: finalSlug,
      excerpt,
      content,
      coverImage: coverImage || '',
      author: author || 'Ashish Sharma',
      tags: Array.isArray(tags) ? tags : [],
      published: typeof published === 'boolean' ? published : false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedBlog = await newBlog.save();
    return res.status(201).json(savedBlog);
  } catch (error: unknown) {
    console.error('POST blogs error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create blog';
    return res.status(400).json({ success: false, error: message });
  }
});

// UPDATE BLOG
app.put(['/api/blogs/:id', '/blogs/:id'], async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    req.body.updatedAt = new Date();

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    return res.status(200).json(updatedBlog);
  } catch (error: unknown) {
    console.error('PUT blogs/:id error:', error);
    const message = error instanceof Error ? error.message : 'Failed to update blog';
    return res.status(400).json({ success: false, error: message });
  }
});

// DELETE BLOG
app.delete(['/api/blogs/:id', '/blogs/:id'], async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    return res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error: unknown) {
    console.error('DELETE blogs/:id error:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete blog';
    return res.status(500).json({ success: false, error: message });
  }
});

// HEALTH CHECK
app.get(['/api/health', '/health'], async (_req: Request, res: Response) => {
  try {
    await dbConnect();
    const connected = mongoose.connection.readyState === 1;

    return res.status(connected ? 200 : 503).json({
      ok: connected,
      service: 'Ashish Sharma Operational Systems Studio API',
      database: connected ? 'connected' : 'disconnected',
      databaseName: mongoose.connection.db?.databaseName || null,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown database error';
    return res.status(500).json({
      ok: false,
      database: 'disconnected',
      error: message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Global Error Handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Express error in api/index:', error);
  if (res.headersSent) {
    return next(error);
  }
  const message = error instanceof Error ? error.message : 'Internal server error';
  return res.status(500).json({ success: false, error: message });
});

export default app;