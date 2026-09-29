import type { Request, Response } from 'express';
import { getAllPublishedBlogSlugs } from './lib/blogQueries.js';

const SITE_URL = 'https://www.ashishsharma.shop';

/**
 * Core static site pages.
 */
const STATIC_ROUTES = [
  '/',
  '/about',
  '/services',
  '/work',
  '/blog',
  '/lab',
  '/contact',
  '/privacy',
  '/terms',
];

/**
 * Authoritative case studies defined in the project portfolio.
 */
const PROJECT_SLUGS = [
  'ai-commerce-platform',
  'real-estate-operations-platform',
  'business-intelligence-dashboard',
  'ai-lead-qualification-system',
];

/**
 * Formats a Date object or string into a W3C ISO 8601 string (YYYY-MM-DDTHH:mm:ssZ).
 */
function formatW3CDate(date?: Date | string | null): string {
  if (!date) {
    return new Date().toISOString();
  }
  const d = typeof date === 'string' ? new Date(date) : date;
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

/**
 * Dedicated Vercel Serverless Function for dynamic /sitemap.xml.
 * Queries MongoDB for all published posts, includes static pages and case studies,
 * and outputs clean XML with accurate <loc> and <lastmod> (omitting ignored priority/changefreq).
 */
export default async function handler(req: Request, res: Response) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).send('Method Not Allowed');
  }

  try {
    let blogPosts: { slug: string; createdAt: Date; updatedAt?: Date }[] = [];

    try {
      blogPosts = await getAllPublishedBlogSlugs();
    } catch (dbError) {
      console.error('sitemap DB fetch error (proceeding with static routes):', dbError);
    }

    const todayIso = new Date().toISOString();

    const urlEntries: string[] = [];

    // 1. Core static pages
    for (const route of STATIC_ROUTES) {
      const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
      urlEntries.push(`  <url>\n    <loc>${loc}</loc>\n    <lastmod>${todayIso}</lastmod>\n  </url>`);
    }

    // 2. Authoritative project case studies
    for (const slug of PROJECT_SLUGS) {
      const loc = `${SITE_URL}/work/${slug}`;
      urlEntries.push(`  <url>\n    <loc>${loc}</loc>\n    <lastmod>${todayIso}</lastmod>\n  </url>`);
    }

    // 3. Dynamic MongoDB blog posts
    for (const post of blogPosts) {
      const loc = `${SITE_URL}/blog/${post.slug}`;
      const lastmod = formatW3CDate(post.updatedAt || post.createdAt);
      urlEntries.push(`  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader(
      'Cache-Control',
      'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
    );

    return res.status(200).send(xml);
  } catch (error: unknown) {
    console.error('api/sitemap error:', error);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.status(500).send('Internal Server Error generating sitemap');
  }
}
