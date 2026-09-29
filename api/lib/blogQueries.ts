import dbConnect from './mongodb.js';
import Blog, { IBlog } from './Blog.js';

export interface LeanBlog {
  _id: string | any;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  tags: string[];
  published: boolean;
  views: number;
  totalTimeSpent: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface RelatedBlogSummary {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  createdAt: Date;
}

/**
 * Retrieves a single published blog article by slug.
 * Executes exactly 1 lean MongoDB query.
 */
export async function getPublishedBlogBySlug(slug: string): Promise<LeanBlog | null> {
  await dbConnect();
  const blog = await Blog.findOne({
    slug: slug.trim(),
    published: true,
  }).lean();

  return (blog as unknown as LeanBlog) || null;
}

/**
 * Retrieves related published blog posts for internal linking discovery graph.
 * Executes 1 primary tag-match query, with 1 bounded fallback query if needed.
 */
export async function getRelatedBlogs(
  currentSlug: string,
  tags: string[] = [],
  limit = 3
): Promise<RelatedBlogSummary[]> {
  await dbConnect();

  let results: RelatedBlogSummary[] = [];

  if (Array.isArray(tags) && tags.length > 0) {
    const tagMatches = await Blog.find({
      slug: { $ne: currentSlug },
      published: true,
      tags: { $in: tags },
    })
      .select('title slug excerpt tags createdAt')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    results = tagMatches as unknown as RelatedBlogSummary[];
  }

  // Fallback: If not enough related articles by tag, fill with recent published articles
  if (results.length < limit) {
    const existingSlugs = [currentSlug, ...results.map((r) => r.slug)];
    const additional = await Blog.find({
      slug: { $nin: existingSlugs },
      published: true,
    })
      .select('title slug excerpt tags createdAt')
      .sort({ createdAt: -1 })
      .limit(limit - results.length)
      .lean();

    results = [...results, ...(additional as unknown as RelatedBlogSummary[])];
  }

  return results;
}

/**
 * Retrieves all published blog slugs with timestamps for dynamic sitemap generation.
 * Executes exactly 1 lean MongoDB query.
 */
export async function getAllPublishedBlogSlugs(): Promise<
  { slug: string; createdAt: Date; updatedAt?: Date }[]
> {
  await dbConnect();
  const posts = await Blog.find({ published: true })
    .select('slug createdAt updatedAt')
    .sort({ createdAt: -1 })
    .lean();

  return (posts as unknown as { slug: string; createdAt: Date; updatedAt?: Date }[]) || [];
}
