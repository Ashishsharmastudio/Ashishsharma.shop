import { LeanBlog, RelatedBlogSummary } from './blogQueries.js';
import { sanitizeBlogContent, escapeHtml, serializeSafeJson } from './sanitize.js';
import { buildHtmlDocument } from './blogTemplate.js';

/**
 * Builds the complete, production-grade server-rendered HTML for a blog post.
 */
export function renderBlogPostHtml(
  blog: LeanBlog,
  relatedBlogs: RelatedBlogSummary[] = []
): string {
  const canonicalUrl = `https://www.ashishsharma.shop/blog/${blog.slug}`;
  const ogImage = blog.coverImage || 'https://www.ashishsharma.shop/og-banner.png';
  const publishedIso = new Date(blog.createdAt).toISOString();
  const modifiedIso = blog.updatedAt
    ? new Date(blog.updatedAt).toISOString()
    : publishedIso;

  const sanitizedContent = sanitizeBlogContent(blog.content);

  // Schema.org BlogPosting structured data
  const jsonLd = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.excerpt,
      image: [ogImage],
      datePublished: publishedIso,
      dateModified: modifiedIso,
      author: {
        '@type': 'Person',
        name: blog.author || 'Ashish Sharma',
        url: 'https://www.ashishsharma.shop/about',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Ashish Sharma Digital Product Studio',
        url: 'https://www.ashishsharma.shop/',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
    },
    null,
    2
  );

  // Safe client takeover payload (strictly whitelisted fields, Unicode-escaped)
  const safeClientBlog = {
    _id: String(blog._id),
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: sanitizedContent,
    coverImage: blog.coverImage || '',
    author: blog.author || 'Ashish Sharma',
    tags: Array.isArray(blog.tags) ? blog.tags : [],
    published: true,
    views: blog.views || 0,
    totalTimeSpent: blog.totalTimeSpent || 0,
    createdAt: publishedIso,
    updatedAt: modifiedIso,
  };
  const safeJsonPayload = serializeSafeJson(safeClientBlog);

  // Formatted date string
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Related Articles Discovery Graph
  const relatedSectionHtml =
    relatedBlogs.length > 0
      ? `
      <section style="margin-top: 5rem; padding-top: 3rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
        <div style="margin-bottom: 2rem;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent-studio);">
            // Internal Knowledge Graph
          </span>
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 1.75rem; font-weight: 600; color: #ffffff; margin-top: 0.5rem; margin-bottom: 0.5rem;">
            Related Systems & Technical Articles
          </h2>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 0;">
            Further explorations into autonomous AI systems, production pipelines, and enterprise architectures.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
          ${relatedBlogs
            .map(
              (rel) => `
            <a href="/blog/${escapeHtml(rel.slug)}" style="display: flex; flex-direction: column; background: var(--card-studio); border: 1px solid var(--border-studio); border-radius: 16px; padding: 1.5rem; text-decoration: none; transition: border-color 0.2s, transform 0.2s;">
              <div style="display: flex; flex-wrap: gap; gap: 0.5rem; margin-bottom: 0.75rem;">
                ${(rel.tags || [])
                  .slice(0, 2)
                  .map(
                    (t) => `
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 2px 8px; border-radius: 9999px; color: var(--accent-studio); text-transform: uppercase;">
                    ${escapeHtml(t)}
                  </span>
                `
                  )
                  .join('')}
              </div>
              <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.15rem; font-weight: 600; color: #ffffff; margin: 0 0 0.5rem 0; line-height: 1.4;">
                ${escapeHtml(rel.title)}
              </h3>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin: 0 0 1rem 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                ${escapeHtml(rel.excerpt)}
              </p>
              <div style="margin-top: auto; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--accent-studio); display: flex; items-center: center;">
                Read Article &rarr;
              </div>
            </a>
          `
            )
            .join('')}
        </div>
      </section>
    `
      : '';

  // Pre-rendered Body Content
  const bodyContent = `
    <div style="min-height: 100vh; display: flex; flex-direction: column; background-color: var(--bg-studio);">
      <!-- Minimalist Static Header -->
      <header style="width: 100%; border-bottom: 1px solid rgba(255, 255, 255, 0.06); padding: 1.25rem 1.5rem; background: rgba(8, 9, 10, 0.85); backdrop-filter: blur(12px);">
        <div style="max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;">
          <a href="/" style="font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 1.125rem; color: #ffffff; display: flex; align-items: center; gap: 0.5rem; text-decoration: none;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-studio);"></span>
            ASHISH SHARMA<span style="color: var(--accent-studio); font-family: 'JetBrains Mono', monospace;">//</span>
          </a>
          <nav style="display: flex; align-items: center; gap: 1.5rem; font-size: 0.875rem;">
            <a href="/work" style="color: var(--text-secondary); text-decoration: none;">Work</a>
            <a href="/services" style="color: var(--text-secondary); text-decoration: none;">Services</a>
            <a href="/blog" style="color: var(--accent-studio); text-decoration: none; font-weight: 500;">Blog</a>
            <a href="/about" style="color: var(--text-secondary); text-decoration: none;">About</a>
            <a href="/contact" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.12); color: #ffffff; padding: 0.4rem 0.9rem; border-radius: 9999px; text-decoration: none;">Start Project</a>
          </nav>
        </div>
      </header>

      <!-- Main Article Container -->
      <main style="flex: 1; max-width: 860px; width: 100%; margin: 0 auto; padding: 3rem 1.5rem 6rem;">
        <article>
          <!-- Navigation Backlink -->
          <div style="margin-bottom: 2rem;">
            <a href="/blog" style="display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--text-secondary); text-decoration: none; font-family: 'JetBrains Mono', monospace;">
              &larr; Back to Insights
            </a>
          </div>

          <!-- Header / Meta -->
          <header style="margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
            <!-- Tags -->
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem;">
              ${(blog.tags || [])
                .map(
                  (tag) => `
                <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; background: var(--card-studio); color: var(--accent-studio); border: 1px solid var(--border-studio); padding: 0.25rem 0.75rem; border-radius: 9999px; text-transform: uppercase;">
                  ${escapeHtml(tag)}
                </span>
              `
                )
                .join('')}
            </div>

            <!-- Title -->
            <h1 style="font-family: 'Outfit', sans-serif; font-size: 2.5rem; font-weight: 600; color: #ffffff; line-height: 1.2; letter-spacing: -0.02em; margin: 0 0 1.25rem 0;">
              ${escapeHtml(blog.title)}
            </h1>

            <!-- Meta Details -->
            <div style="display: flex; align-items: center; gap: 1.5rem; font-size: 0.875rem; color: var(--text-secondary); font-family: 'JetBrains Mono', monospace;">
              <span>${formattedDate}</span>
              <span>&bull;</span>
              <span>${escapeHtml(blog.author || 'Ashish Sharma')}</span>
            </div>
          </header>

          <!-- Cover Image -->
          ${
            blog.coverImage
              ? `
            <div style="margin-bottom: 2.5rem; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.08); aspect-ratio: 16 / 9; max-height: 480px; width: 100%;">
              <img src="${escapeHtml(blog.coverImage)}" alt="${escapeHtml(blog.title)}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
            </div>
          `
              : ''
          }

          <!-- Excerpt Lead -->
          <div style="font-size: 1.25rem; font-weight: 500; font-style: italic; color: #ffffff; line-height: 1.6; border-left: 3px solid var(--accent-studio); padding-left: 1.25rem; margin-bottom: 2.5rem;">
            ${escapeHtml(blog.excerpt)}
          </div>

          <!-- Sanitized Article Content -->
          <div class="prose-article ql-editor-display">
            ${sanitizedContent}
          </div>

          <!-- Related Systems Discovery Graph -->
          ${relatedSectionHtml}
        </article>
      </main>

      <!-- Minimalist Static Footer -->
      <footer style="border-top: 1px solid rgba(255, 255, 255, 0.06); padding: 3rem 1.5rem; text-align: center; color: var(--text-secondary); font-size: 0.875rem;">
        <div style="max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
          <p style="margin: 0;">Ashish Sharma Studio &copy; ${new Date().getFullYear()} &mdash; AI Systems Architecture & Decoupled High-Performance Web Platforms.</p>
          <div style="display: flex; gap: 1.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;">
            <a href="/" style="color: var(--text-secondary); text-decoration: none;">Home</a>
            <a href="/work" style="color: var(--text-secondary); text-decoration: none;">Case Studies</a>
            <a href="/blog" style="color: var(--text-secondary); text-decoration: none;">Engineering Blog</a>
            <a href="/sitemap.xml" style="color: var(--accent-studio); text-decoration: none;">Sitemap.xml</a>
          </div>
        </div>
      </footer>
    </div>
  `;

  return buildHtmlDocument({
    title: `${blog.title} — Ashish Sharma`,
    description: blog.excerpt,
    canonicalUrl,
    ogImage,
    publishedIso,
    modifiedIso,
    author: blog.author || 'Ashish Sharma',
    jsonLd,
    bodyContent,
    initialBlogJson: safeJsonPayload,
    is404: false,
  });
}

/**
 * Builds a styled, genuine 404 HTML document.
 */
export function render404Html(slug?: string): string {
  const safeSlug = escapeHtml(slug || '');
  const title = '404 // Article Not Found — Ashish Sharma';
  const description =
    'The requested technical article could not be located in our production database.';

  const bodyContent = `
    <div style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem; background: var(--bg-studio); text-align: center;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: #EF4444; margin-bottom: 1rem; border: 1px solid rgba(239, 68, 68, 0.2); background: rgba(239, 68, 68, 0.05); padding: 0.4rem 1rem; border-radius: 9999px;">
        STATUS: 404 // ARTICLE_NOT_FOUND
      </div>
      <h1 style="font-family: 'Outfit', sans-serif; font-size: 2.25rem; font-weight: 600; color: #ffffff; margin: 0 0 1rem 0;">
        Article Offline or Unpublished
      </h1>
      <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 2rem; font-size: 1rem; line-height: 1.6;">
        ${
          safeSlug
            ? `The publication pipeline for <code style="color: #93C5FD; background: rgba(255,255,255,0.06); padding: 2px 6px; border-radius: 4px;">${safeSlug}</code> returned null.`
            : 'The requested technical insight could not be found.'
        }
      </p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
        <a href="/blog" style="background: var(--accent-studio); color: #ffffff; padding: 0.75rem 1.5rem; border-radius: 9999px; text-decoration: none; font-size: 0.875rem; font-weight: 500;">
          Browse All Insights &rarr;
        </a>
        <a href="/" style="background: var(--card-studio); border: 1px solid var(--border-studio); color: #ffffff; padding: 0.75rem 1.5rem; border-radius: 9999px; text-decoration: none; font-size: 0.875rem;">
          Studio Homepage
        </a>
      </div>
    </div>
  `;

  return buildHtmlDocument({
    title,
    description,
    canonicalUrl: `https://www.ashishsharma.shop/blog/${safeSlug || '404'}`,
    bodyContent,
    is404: true,
  });
}

/**
 * Builds a styled 500 error HTML document for unexpected server errors.
 */
export function render500Html(): string {
  const title = '500 // Internal Server Error — Ashish Sharma';
  const description = 'A database or rendering error occurred.';

  const bodyContent = `
    <div style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem; background: var(--bg-studio); text-align: center;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: #F59E0B; margin-bottom: 1rem;">
        STATUS: 500 // SERVER_ERROR
      </div>
      <h1 style="font-family: 'Outfit', sans-serif; font-size: 2rem; font-weight: 600; color: #ffffff; margin: 0 0 1rem 0;">
        Rendering Pipeline Interrupted
      </h1>
      <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 2rem; font-size: 1rem;">
        The system experienced a temporary database error. Please refresh or retry in a few moments.
      </p>
      <a href="/blog" style="background: var(--accent-studio); color: #ffffff; padding: 0.75rem 1.5rem; border-radius: 9999px; text-decoration: none; font-size: 0.875rem;">
        Back to Blog
      </a>
    </div>
  `;

  return buildHtmlDocument({
    title,
    description,
    canonicalUrl: 'https://www.ashishsharma.shop/blog',
    bodyContent,
    is404: true,
  });
}
