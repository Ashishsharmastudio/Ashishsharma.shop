import type { Request, Response } from 'express';
import dbConnect from './lib/mongodb.js';
import Blog from './lib/Blog.js';
import { escapeHtml } from './lib/sanitize.js';
import { buildHtmlDocument } from './lib/blogTemplate.js';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).send('Method Not Allowed');
  }

  try {
    await dbConnect();
    const blogs = await Blog.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();

    const articlesListHtml = blogs.map((blog: any) => {
      const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      const tagsHtml = (blog.tags || [])
        .slice(0, 3)
        .map(
          (t: string) => `
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 2px 8px; border-radius: 9999px; color: #3B82F6; text-transform: uppercase;">
            ${escapeHtml(t)}
          </span>
        `
        )
        .join('');

      return `
        <article style="background: #101214; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 2rem; margin-bottom: 2rem; transition: border-color 0.2s;">
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; align-items: center;">
            ${tagsHtml}
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #6B7280; margin-left: auto;">
              ${formattedDate}
            </span>
          </div>
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.65rem; font-weight: 600; color: #ffffff; margin: 0 0 0.75rem 0; line-height: 1.3;">
            <a href="/blog/${escapeHtml(blog.slug)}" style="color: #ffffff; text-decoration: none;">
              ${escapeHtml(blog.title)}
            </a>
          </h2>
          <p style="color: #9CA3AF; font-size: 1rem; line-height: 1.6; margin: 0 0 1.25rem 0;">
            ${escapeHtml(blog.excerpt)}
          </p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <a href="/blog/${escapeHtml(blog.slug)}" style="color: #3B82F6; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; font-weight: 500; text-decoration: none;">
              Read Architecture Teardown &rarr;
            </a>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #6B7280;">
              By ${escapeHtml(blog.author || 'Ashish Sharma')}
            </span>
          </div>
        </article>
      `;
    }).join('');

    const jsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Operational Systems Engineering Insights & Technical Architecture Blog',
      description: 'Production software architecture, deterministic automation pipelines, and Human-in-the-Loop systems for operational enterprises.',
      url: 'https://www.ashishsharma.shop/blog',
      author: {
        '@type': 'Person',
        name: 'Ashish Sharma',
        url: 'https://www.ashishsharma.shop/about',
      },
    });

    const bodyContent = `
      <div style="min-height: 100vh; display: flex; flex-direction: column; background-color: #08090A; color: #F3F4F6;">
        <header style="width: 100%; border-bottom: 1px solid rgba(255, 255, 255, 0.06); padding: 1.25rem 1.5rem; background: rgba(8, 9, 10, 0.85); backdrop-filter: blur(12px);">
          <div style="max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;">
            <a href="/" style="font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 1.125rem; color: #ffffff; display: flex; align-items: center; gap: 0.5rem; text-decoration: none;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #3B82F6;"></span>
              ASHISH SHARMA<span style="color: #3B82F6; font-family: 'JetBrains Mono', monospace;">//</span>
            </a>
            <nav style="display: flex; align-items: center; gap: 1.5rem; font-size: 0.875rem;">
              <a href="/work" style="color: #9CA3AF; text-decoration: none;">Work</a>
              <a href="/services" style="color: #9CA3AF; text-decoration: none;">Services</a>
              <a href="/blog" style="color: #3B82F6; text-decoration: none; font-weight: 500;">Blog</a>
              <a href="/about" style="color: #9CA3AF; text-decoration: none;">About</a>
              <a href="/contact" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.12); color: #ffffff; padding: 0.4rem 0.9rem; border-radius: 9999px; text-decoration: none;">Book Systems Review</a>
            </nav>
          </div>
        </header>

        <main style="flex: 1; max-width: 900px; width: 100%; margin: 0 auto; padding: 4rem 1.5rem 6rem;">
          <div style="margin-bottom: 3.5rem;">
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: #3B82F6; display: block; margin-bottom: 0.75rem;">
              // Technical Insights & Operational Systems
            </span>
            <h1 style="font-family: 'Outfit', sans-serif; font-size: 3rem; font-weight: 600; color: #ffffff; line-height: 1.15; margin: 0 0 1rem 0;">
              Turning Operational Chaos into Deterministic Software.
            </h1>
            <p style="color: #9CA3AF; font-size: 1.15rem; line-height: 1.6; max-width: 720px; margin: 0;">
              Architectural blueprints for replacing high-friction manual coordination, dense PDF spec extraction, and offshore virtual assistant dependencies with production Human-in-the-Loop systems.
            </p>
          </div>

          <section>
            ${articlesListHtml || '<p style="text-align: center; color: #9CA3AF; padding: 4rem 0;">No published articles found in database.</p>'}
          </section>

          <section style="margin-top: 5rem; padding: 3rem; background: #101214; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; text-align: center;">
            <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.75rem; color: #fff; margin-bottom: 1rem;">
              Have an Ugly Business Process That Needs Software?
            </h3>
            <p style="color: #9CA3AF; max-width: 580px; margin: 0 auto 1.5rem; font-size: 0.95rem; line-height: 1.6;">
              We partner directly with COOs, CTOs, and Operations VPs to build deterministic platforms that survive production scale.
            </p>
            <a href="https://cal.com/ashish-sharma-2000" style="display: inline-block; background: #ffffff; color: #000000; font-weight: 600; padding: 0.75rem 1.75rem; border-radius: 8px; text-decoration: none; font-size: 0.9rem;">
              Schedule an Architecture Discovery Call
            </a>
          </section>
        </main>

        <footer style="border-top: 1px solid rgba(255, 255, 255, 0.06); padding: 3rem 1.5rem; text-align: center; color: #9CA3AF; font-size: 0.875rem;">
          <p style="margin: 0 0 0.5rem 0;">Ashish Sharma Studio &copy; ${new Date().getFullYear()} &mdash; Operational Systems Engineering & Deterministic AI Architecture.</p>
          <div style="display: flex; justify-content: center; gap: 1.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;">
            <a href="/" style="color: #9CA3AF; text-decoration: none;">Home</a>
            <a href="/work" style="color: #9CA3AF; text-decoration: none;">Case Studies</a>
            <a href="/sitemap.xml" style="color: #3B82F6; text-decoration: none;">Sitemap.xml</a>
            <a href="mailto:ashishsharmastudio@gmail.com" style="color: #9CA3AF; text-decoration: none;">Contact</a>
          </div>
        </footer>
      </div>
    `;

    const html = buildHtmlDocument({
      title: 'Operational Systems Engineering Insights & Technical Architecture Blog — Ashish Sharma',
      description: 'Production blueprints for turning complex operational workflows into deterministic software systems. By Ashish Sharma, Principal Systems Architect.',
      canonicalUrl: 'https://www.ashishsharma.shop/blog',
      bodyContent,
      jsonLd,
      is404: false,
    });

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=120, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(html);
  } catch (error: unknown) {
    console.error('Render blog list error:', error);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(500).send('<h1>500 // Error rendering blog collection</h1>');
  }
}