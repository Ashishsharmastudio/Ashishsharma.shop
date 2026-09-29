import { sanitizeBlogContent, escapeHtml, serializeSafeJson } from '../api/lib/sanitize.js';
import { renderBlogPostHtml, render404Html, render500Html } from '../api/lib/renderBlogPost.js';
import { getViteAssets } from '../api/lib/blogTemplate.js';
import type { LeanBlog, RelatedBlogSummary } from '../api/lib/blogQueries.js';

console.log('=== RUNNING SSR & SECURITY VERIFICATION SUITE ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failCount++;
  }
}

// -----------------------------------------------------------------------------
// 1. SANITIZER & SECURITY TESTS
// -----------------------------------------------------------------------------
console.log('--- 1. Testing Sanitizer & XSS Prevention ---');

const maliciousInput = `
  <p>Legitimate intro text explaining workflow decision engines.</p>
  <script>alert("XSS")</script>
  <img src="https://example.com/good.jpg" onerror="alert('steal')" alt="Safe Diagram" />
  <a href="javascript:alert(1)">Click for free gift</a>
  <a href="//evil.com/phishing">Protocol relative link</a>
  <a href="https://example.com" target="_blank">External Link</a>
  <iframe src="https://attacker.com"></iframe>
  <div style="background: url(javascript:alert(1))" class="safe-box">Styled Box</div>
  <h2>The Operational Architecture</h2>
  <p>In high-mix industrial supply chains, quoting remains the single slowest manual bottleneck.</p>
`;

const sanitized = sanitizeBlogContent(maliciousInput);

assert(!sanitized.includes('<script>'), 'Strips <script> tags completely');
assert(!sanitized.includes('onerror='), 'Strips inline event handlers (onerror)');
assert(!sanitized.includes('javascript:'), 'Strips javascript: pseudo-protocol in links and attributes');
assert(!sanitized.includes('//evil.com'), 'Strips protocol-relative URLs');
assert(!sanitized.includes('<iframe>'), 'Strips <iframe> embeds');
assert(!sanitized.includes('style='), 'Strips arbitrary style attributes');
assert(sanitized.includes('rel="noopener noreferrer"'), 'Adds rel="noopener noreferrer" to target="_blank" links');
assert(sanitized.includes('In high-mix industrial supply chains'), 'Preserves legitimate article body paragraphs');
assert(sanitized.includes('<h2>The Operational Architecture</h2>'), 'Preserves legitimate headings');

// -----------------------------------------------------------------------------
// 2. SAFE JSON SERIALIZATION TESTS
// -----------------------------------------------------------------------------
console.log('\n--- 2. Testing Safe JSON Serialization ---');

const payloadWithHtmlBreak = {
  title: 'Test Article',
  content: '</script><script>alert("hacked")</script>',
  excerpt: 'A & B < C > D',
};

const safeSerialized = serializeSafeJson(payloadWithHtmlBreak);
assert(!safeSerialized.includes('</script>'), 'Does not contain literal </script>');
assert(safeSerialized.includes('\\u003c/script\\u003e'), 'Properly Unicode-escapes < and >');
assert(safeSerialized.includes('\\u0026'), 'Properly Unicode-escapes &');

// -----------------------------------------------------------------------------
// 3. VITE ASSET RESOLUTION TEST
// -----------------------------------------------------------------------------
console.log('\n--- 3. Testing Vite Asset Resolution ---');

const assets = getViteAssets();
assert(assets.js.length > 0, `Discovered compiled Vite JS bundles: ${assets.js.join(', ')}`);
assert(assets.css.length > 0, `Discovered compiled Vite CSS bundles: ${assets.css.join(', ')}`);

// -----------------------------------------------------------------------------
// 4. FULL HTML RENDERING TEST
// -----------------------------------------------------------------------------
console.log('\n--- 4. Testing Full Server-Rendered HTML Output ---');

const mockBlog: LeanBlog = {
  _id: '507f1f77bcf86cd799439011',
  title: 'How to Turn Manual Quoting Into a Production Decision Engine',
  slug: 'manual-quoting-decision-engine',
  excerpt: 'Transform messy operational estimation workflows into deterministic automated systems.',
  content: `
    <h2>The Operational Reality</h2>
    <p>Turn complex operational workflows into high-speed autonomous engines with strict audit trails.</p>
    <p>In high-mix industrial facilities, quotes take 48 hours to return.</p>
  `,
  coverImage: 'https://www.ashishsharma.shop/og-banner.png',
  author: 'Ashish Sharma',
  tags: ['AI Agents', 'Decision Engines', 'Workflow Automation'],
  published: true,
  views: 120,
  totalTimeSpent: 3400,
  createdAt: new Date('2026-09-29T10:00:00Z'),
  updatedAt: new Date('2026-09-29T11:00:00Z'),
};

const mockRelated: RelatedBlogSummary[] = [
  {
    title: 'Zero-Hallucination RAG Architectures',
    slug: 'production-rag-architecture-zero-hallucinations',
    excerpt: 'Deterministic state machines powering enterprise retrieval.',
    tags: ['AI Agents', 'RAG'],
    createdAt: new Date('2026-09-28T10:00:00Z'),
  },
];

const renderedHtml = renderBlogPostHtml(mockBlog, mockRelated);

// Unmistakable article text check (as requested by user)
assert(
  renderedHtml.includes('Turn complex operational workflows into high-speed autonomous engines'),
  'Initial HTML contains the unmistakable article body paragraph without running JS'
);
assert(
  renderedHtml.includes('<h2>The Operational Reality</h2>'),
  'Initial HTML contains article headings in raw response'
);
assert(
  renderedHtml.includes('How to Turn Manual Quoting Into a Production Decision Engine'),
  'Initial HTML contains article title'
);
assert(
  renderedHtml.includes('<link rel="canonical" href="https://www.ashishsharma.shop/blog/manual-quoting-decision-engine" />'),
  'Initial HTML contains accurate rel="canonical" tag'
);
assert(
  renderedHtml.includes('<meta name="robots" content="index, follow" />'),
  'Initial HTML contains meta robots="index, follow"'
);
assert(
  renderedHtml.includes('<meta property="og:site_name" content="Ashish Sharma Studio" />'),
  'Initial HTML contains og:site_name'
);
assert(
  renderedHtml.includes('"@type": "BlogPosting"'),
  'Initial HTML contains Schema.org BlogPosting structured data'
);
assert(
  renderedHtml.includes('Related Systems &amp; Technical Articles') || renderedHtml.includes('Related Systems & Technical Articles'),
  'Initial HTML contains Related Systems internal link discovery graph'
);
assert(
  renderedHtml.includes('href="/blog/production-rag-architecture-zero-hallucinations"'),
  'Initial HTML contains crawlable <a href="/blog/..."> links for related articles'
);
assert(
  renderedHtml.includes('window.__INITIAL_BLOG__ = {'),
  'Initial HTML injects safe window.__INITIAL_BLOG__ payload for client takeover'
);
assert(
  renderedHtml.includes(assets.js[0]),
  'Initial HTML injects production Vite JS bundle script tag'
);

// -----------------------------------------------------------------------------
// 5. 404 HTML RENDERING TEST
// -----------------------------------------------------------------------------
console.log('\n--- 5. Testing 404 HTML Output ---');

const notFoundHtml = render404Html('does-not-exist');
assert(notFoundHtml.includes('404 // Article Not Found'), '404 page title contains 404 status');
assert(notFoundHtml.includes('noindex, follow'), '404 page sets robots noindex');
assert(notFoundHtml.includes('does-not-exist'), '404 page mentions the requested slug safely');

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log(`\n========================================`);
console.log(`TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`========================================\n`);

if (failCount > 0) {
  process.exit(1);
}
