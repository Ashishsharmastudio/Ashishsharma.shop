import { handleRenderBlog } from '../api/render-blog.js';

console.log('=== RUNNING RENDER-BLOG HANDLER VERIFICATION ===\n');

async function test(
  method: string,
  query: Record<string, string>,
  deps?: any
) {
  let statusCode = 0;
  const headers: Record<string, string> = {};
  let body = '';

  const mockReq: any = {
    method,
    query,
    url: `/blog/${query.slug || ''}`,
  };

  const mockRes: any = {
    setHeader: (k: string, v: string) => {
      headers[k] = v;
      return mockRes;
    },
    status: (c: number) => {
      statusCode = c;
      return mockRes;
    },
    send: (b: string) => {
      body = b;
      return mockRes;
    },
  };

  await handleRenderBlog(mockReq, mockRes, deps);
  return { statusCode, headers, body };
}

async function run() {
  let pass = true;
  function assert(cond: boolean, name: string) {
    if (cond) {
      console.log(`[PASS] ${name}`);
    } else {
      console.error(`[FAIL] ${name}`);
      pass = false;
    }
  }

  // 1. Missing slug -> 404
  const resEmpty = await test('GET', {});
  assert(resEmpty.statusCode === 404, 'Missing slug returns 404');
  assert(resEmpty.headers['Cache-Control']?.includes('max-age=60'), '404 sets short cache');
  assert(resEmpty.body.includes('404 // Article Not Found'), '404 returns styled HTML');

  // 2. Mock DB for published post not found -> 404
  const mockDepsNotFound: any = {
    getPublishedBlogBySlug: async () => null,
    getRelatedBlogs: async () => [],
  };

  const resNotFound = await test('GET', { slug: 'unknown-random-slug-xyz' }, mockDepsNotFound);
  assert(resNotFound.statusCode === 404, 'Unpublished or missing slug returns 404');
  assert(resNotFound.headers['Cache-Control']?.includes('max-age=60'), '404 sets short cache max-age=60');
  assert(resNotFound.body.includes('STATUS: 404 // ARTICLE_NOT_FOUND'), 'Returns branded 404 error page');

  // 3. Mock DB for published post found -> 200
  const mockDepsSuccess: any = {
    getPublishedBlogBySlug: async () => ({
      _id: '123',
      title: 'Verified AI Systems Post',
      slug: 'verified-ai-systems-post',
      excerpt: 'Deep dive into deterministic enterprise engines.',
      content: '<p>Production verification with zero hallucinations.</p>',
      author: 'Ashish Sharma',
      tags: ['AI Systems'],
      published: true,
      views: 10,
      totalTimeSpent: 100,
      createdAt: new Date('2026-09-29T10:00:00Z'),
      updatedAt: new Date('2026-09-29T10:30:00Z'),
    }),
    getRelatedBlogs: async () => [],
  };

  const resSuccess = await test('GET', { slug: 'verified-ai-systems-post' }, mockDepsSuccess);
  assert(resSuccess.statusCode === 200, 'Published post returns 200 OK');
  assert(
    resSuccess.headers['Cache-Control']?.includes('s-maxage=3600'),
    '200 response sets CDN edge cache (s-maxage=3600)'
  );
  assert(
    resSuccess.headers['Cache-Control']?.includes('stale-while-revalidate=86400'),
    '200 response sets stale-while-revalidate=86400'
  );
  assert(resSuccess.headers['Vary'] === 'Accept-Encoding', '200 response sets Vary: Accept-Encoding');
  assert(
    resSuccess.body.includes('Production verification with zero hallucinations.'),
    '200 response contains complete article text in initial HTML'
  );
  assert(
    resSuccess.body.includes('<link rel="canonical" href="https://www.ashishsharma.shop/blog/verified-ai-systems-post" />'),
    '200 response contains canonical URL'
  );

  // 4. Operational failure -> 500 with NO-CACHE
  const mockDepsError: any = {
    getPublishedBlogBySlug: async () => {
      throw new Error('Forced DB Error');
    },
    getRelatedBlogs: async () => [],
  };

  const resError = await test('GET', { slug: 'error-slug' }, mockDepsError);
  assert(resError.statusCode === 500, 'DB error returns 500');
  assert(
    resError.headers['Cache-Control']?.includes('no-cache, no-store, must-revalidate'),
    '500 operational error strictly NEVER cached (no-cache, no-store, must-revalidate)'
  );
  assert(resError.body.includes('500 // SERVER_ERROR'), '500 returns styled error page');

  // 5. Method Not Allowed -> 405
  const resPost = await test('POST', { slug: 'test' });
  assert(resPost.statusCode === 405, 'POST method returns 405 Method Not Allowed');

  console.log(`\nRender-Blog Verification: ${pass ? 'ALL PASSED' : 'FAILED'}\n`);
  if (!pass) process.exit(1);
}

run();
