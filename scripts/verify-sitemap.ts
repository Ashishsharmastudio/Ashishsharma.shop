import sitemapHandler from '../api/sitemap.js';

console.log('=== RUNNING SITEMAP VERIFICATION ===\n');

// Mock Express req and res
let statusCode = 0;
const headers: Record<string, string> = {};
let responseBody = '';

const mockReq: any = {
  method: 'GET',
};

const mockRes: any = {
  setHeader: (key: string, val: string) => {
    headers[key] = val;
    return mockRes;
  },
  status: (code: number) => {
    statusCode = code;
    return mockRes;
  },
  send: (body: string) => {
    responseBody = body;
    return mockRes;
  },
};

async function run() {
  await sitemapHandler(mockReq, mockRes);

  let pass = true;

  function assert(cond: boolean, name: string) {
    if (cond) {
      console.log(`[PASS] ${name}`);
    } else {
      console.error(`[FAIL] ${name}`);
      pass = false;
    }
  }

  assert(statusCode === 200, `Sitemap HTTP status 200 (got ${statusCode})`);
  assert(
    headers['Content-Type']?.includes('application/xml'),
    `Content-Type is application/xml (got ${headers['Content-Type']})`
  );
  assert(
    headers['Cache-Control']?.includes('s-maxage=3600'),
    `Cache-Control has s-maxage=3600 (got ${headers['Cache-Control']})`
  );
  assert(responseBody.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'Starts with XML declaration');
  assert(responseBody.includes('<loc>https://www.ashishsharma.shop/</loc>'), 'Contains home URL');
  assert(responseBody.includes('<loc>https://www.ashishsharma.shop/work</loc>'), 'Contains work URL');
  assert(responseBody.includes('<loc>https://www.ashishsharma.shop/blog</loc>'), 'Contains blog URL');

  // Verify all 4 authoritative case studies from src/data/projects.ts
  assert(responseBody.includes('<loc>https://www.ashishsharma.shop/work/ai-commerce-platform</loc>'), 'Contains /work/ai-commerce-platform');
  assert(responseBody.includes('<loc>https://www.ashishsharma.shop/work/real-estate-operations-platform</loc>'), 'Contains /work/real-estate-operations-platform');
  assert(responseBody.includes('<loc>https://www.ashishsharma.shop/work/business-intelligence-dashboard</loc>'), 'Contains /work/business-intelligence-dashboard');
  assert(responseBody.includes('<loc>https://www.ashishsharma.shop/work/ai-lead-qualification-system</loc>'), 'Contains /work/ai-lead-qualification-system');

  // Verify strictly NO priority or changefreq (as requested by user)
  assert(!responseBody.includes('<priority>'), 'Strictly omits ignored <priority> tags');
  assert(!responseBody.includes('<changefreq>'), 'Strictly omits ignored <changefreq> tags');
  assert(responseBody.includes('<lastmod>'), 'Contains <lastmod> timestamps');

  console.log(`\nSitemap Verification: ${pass ? 'ALL PASSED' : 'FAILED'}\n`);
  if (!pass) process.exit(1);
}

run();
