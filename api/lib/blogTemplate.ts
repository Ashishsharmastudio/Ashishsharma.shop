import fs from 'fs';
import path from 'path';
import { escapeHtml } from './sanitize.js';

interface ViteAssets {
  css: string[];
  js: string[];
}

// Current production bundle hashes fallback
const DEFAULT_ASSETS: ViteAssets = {
  css: ['/assets/index-jD_k_eQC.css'],
  js: ['/assets/index-CNtZsm1y.js'],
};

let cachedAssets: ViteAssets | null = null;

/**
 * Resolves compiled Vite CSS and JS bundle script tags by reading dist/index.html.
 * Falls back to known default production bundle assets if dist/index.html is not traced.
 */
export function getViteAssets(): ViteAssets {
  if (cachedAssets) {
    return cachedAssets;
  }

  try {
    const indexPath = path.join(process.cwd(), 'dist', 'index.html');
    if (fs.existsSync(indexPath)) {
      const html = fs.readFileSync(indexPath, 'utf-8');

      const jsMatches = [
        ...html.matchAll(/<script[^>]+src=["'](\/assets\/[^"']+\.js)["'][^>]*><\/script>/g),
      ];
      const cssMatches = [
        ...html.matchAll(/<link[^>]+href=["'](\/assets\/[^"']+\.css)["'][^>]*>/g),
      ];

      if (jsMatches.length > 0 || cssMatches.length > 0) {
        cachedAssets = {
          js: jsMatches.map((m) => m[1]),
          css: cssMatches.map((m) => m[1]),
        };
        return cachedAssets;
      }
    }
  } catch (err) {
    // Graceful fallback: never crash serverless function on disk read
  }

  cachedAssets = DEFAULT_ASSETS;
  return cachedAssets;
}

export interface HtmlPageOptions {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  publishedIso?: string;
  modifiedIso?: string;
  author?: string;
  jsonLd?: string;
  bodyContent: string;
  initialBlogJson?: string;
  is404?: boolean;
}

/**
 * Builds the standalone, complete HTML response document.
 * Includes Google Fonts, typography styles, meta tags, OpenGraph, JSON-LD,
 * pre-rendered article body inside #root, and client bundle links.
 */
export function buildHtmlDocument(options: HtmlPageOptions): string {
  const assets = getViteAssets();
  const safeTitle = escapeHtml(options.title);
  const safeDesc = escapeHtml(options.description);
  const safeCanonical = escapeHtml(options.canonicalUrl);
  const safeOgImage = escapeHtml(
    options.ogImage || 'https://www.ashishsharma.shop/og-banner.png'
  );
  const safeAuthor = escapeHtml(options.author || 'Ashish Sharma');

  const cssTags = assets.css
    .map((href) => `<link rel="stylesheet" crossorigin href="${href}">`)
    .join('\n    ');

  const jsTags = assets.js
    .map((src) => `<script type="module" crossorigin src="${src}"></script>`)
    .join('\n    ');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary Meta Tags -->
  <title>${safeTitle}</title>
  <meta name="title" content="${safeTitle}" />
  <meta name="description" content="${safeDesc}" />
  <meta name="author" content="${safeAuthor}" />
  <meta name="robots" content="${options.is404 ? 'noindex, follow' : 'index, follow'}" />
  <link rel="canonical" href="${safeCanonical}" />

  <!-- Open Graph / Facebook / LinkedIn -->
  <meta property="og:type" content="${options.is404 ? 'website' : 'article'}" />
  <meta property="og:site_name" content="Ashish Sharma Studio" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDesc}" />
  <meta property="og:url" content="${safeCanonical}" />
  <meta property="og:image" content="${safeOgImage}" />
  ${options.publishedIso ? `<meta property="article:published_time" content="${options.publishedIso}" />` : ''}
  ${options.modifiedIso ? `<meta property="article:modified_time" content="${options.modifiedIso}" />` : ''}
  ${options.author ? `<meta property="article:author" content="${safeAuthor}" />` : ''}

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDesc}" />
  <meta name="twitter:image" content="${safeOgImage}" />

  <!-- Typography & Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">

  ${options.jsonLd ? `<script type="application/ld+json">\n${options.jsonLd}\n  </script>` : ''}

  <!-- Production Vite CSS Assets -->
  ${cssTags}

  <!-- Core Standalone Studio Styles (Guarantees zero FOUC and full styling with JS disabled) -->
  <style>
    :root {
      --bg-studio: #08090A;
      --card-studio: #101214;
      --border-studio: rgba(255, 255, 255, 0.08);
      --text-primary: #F3F4F6;
      --text-secondary: #9CA3AF;
      --accent-studio: #3B82F6;
      --accent-purple: #8B5CF6;
    }
    body {
      margin: 0;
      padding: 0;
      background-color: var(--bg-studio);
      color: var(--text-primary);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    .font-display { font-family: 'Outfit', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    
    /* Prose styling for article content */
    .prose-article {
      color: rgba(243, 244, 246, 0.9);
      font-size: 1.125rem;
      line-height: 1.8;
      max-width: 100%;
    }
    .prose-article p { margin-bottom: 1.75rem; }
    .prose-article h1, .prose-article h2, .prose-article h3, .prose-article h4 {
      color: #ffffff;
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      margin-top: 2.5rem;
      margin-bottom: 1rem;
      line-height: 1.3;
    }
    .prose-article h1 { font-size: 2rem; }
    .prose-article h2 { font-size: 1.625rem; border-bottom: 1px solid rgba(255, 255, 255, 0.06); padding-bottom: 0.5rem; }
    .prose-article h3 { font-size: 1.375rem; }
    .prose-article ul, .prose-article ol {
      margin-left: 1.5rem;
      margin-bottom: 1.75rem;
    }
    .prose-article li { margin-bottom: 0.5rem; }
    .prose-article blockquote {
      border-left: 3px solid var(--accent-studio);
      padding-left: 1.25rem;
      margin-left: 0;
      margin-right: 0;
      font-style: italic;
      color: #D1D5DB;
    }
    .prose-article code {
      font-family: 'JetBrains Mono', monospace;
      background: rgba(255, 255, 255, 0.06);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-size: 0.9em;
      color: #93C5FD;
    }
    .prose-article pre {
      background: #0d0f12;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 1.25rem;
      overflow-x: auto;
      margin-bottom: 1.75rem;
    }
    .prose-article pre code {
      background: transparent;
      padding: 0;
      color: inherit;
    }
    .prose-article a {
      color: var(--accent-purple);
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .prose-article img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      margin: 2rem 0;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
  </style>
</head>
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P43CFQ9J"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <!-- Standalone Server-Rendered Content Container -->
  <div id="root">${options.bodyContent}</div>

  <!-- Hydration / Initial Client Takeover Payload -->
  ${options.initialBlogJson ? `<script>window.__INITIAL_BLOG__ = ${options.initialBlogJson};</script>` : ''}

  <!-- Production Vite JS Bundles -->
  ${jsTags}
</body>
</html>`;
}
