import type { Request, Response } from 'express';
import { getPublishedBlogBySlug, getRelatedBlogs } from './lib/blogQueries.js';
import { renderBlogPostHtml, render404Html, render500Html } from './lib/renderBlogPost.js';

/**
 * Dedicated Vercel Serverless Function for rendering /blog/:slug.
 * Provides pre-rendered HTML to crawlers and bots on initial response,
 * and sets appropriate CDN Edge caching headers.
 */
export interface RenderBlogDeps {
  getPublishedBlogBySlug: typeof getPublishedBlogBySlug;
  getRelatedBlogs: typeof getRelatedBlogs;
}

/**
 * Core handler logic for /blog/:slug with optional dependency injection for testing.
 */
export async function handleRenderBlog(
  req: Request,
  res: Response,
  deps: RenderBlogDeps = { getPublishedBlogBySlug, getRelatedBlogs }
) {
  // Only accept GET requests
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).send('Method Not Allowed');
  }

  try {
    let slug = (req.query?.slug as string) || '';

    // Fallback: parse slug from URL if not populated in query
    if (!slug && req.url) {
      const match = req.url.match(/\/blog\/([^/?#]+)/);
      if (match) {
        slug = match[1];
      }
    }

    slug = slug ? slug.trim() : '';

    if (!slug) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
      return res.status(404).send(render404Html(''));
    }

    // 1. Single lean query for published post
    const blog = await deps.getPublishedBlogBySlug(slug);

    if (!blog) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
      return res.status(404).send(render404Html(slug));
    }

    // 2. Query related articles for internal link discovery graph
    const related = await deps.getRelatedBlogs(slug, blog.tags, 3);

    // 3. Assemble complete HTML
    const html = renderBlogPostHtml(blog, related);

    // 4. Send with strict production caching for 200 responses
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader(
      'Cache-Control',
      'public, max-age=120, s-maxage=3600, stale-while-revalidate=86400'
    );
    res.setHeader('Vary', 'Accept-Encoding');

    return res.status(200).send(html);
  } catch (error: unknown) {
    console.error('api/render-blog error:', error);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // Operational failure: Never cache 500 errors
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.status(500).send(render500Html());
  }
}

/**
 * Dedicated Vercel Serverless Function entrypoint for rendering /blog/:slug.
 */
export default async function handler(req: Request, res: Response) {
  return handleRenderBlog(req, res);
}
