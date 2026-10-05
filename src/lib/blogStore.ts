export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  published: boolean;
  views: number;
  totalTimeSpent: number;
  createdAt: string;
}

export const getBlogs = async (publishedOnly = false): Promise<Blog[]> => {
  const queryParam = publishedOnly ? '?published=true' : '';
  
  // Try primary /api/blogs endpoint, fallback to /blogs
  let response = await fetch(`/api/blogs${queryParam}`);
  if (!response.ok) {
    response = await fetch(`/blogs${queryParam}`);
  }

  if (!response.ok) {
    throw new Error('Failed to load published articles from system database.');
  }

  return response.json();
};

export const getBlogById = async (idOrSlug: string): Promise<Blog | null> => {
  let response = await fetch(`/api/blogs/${encodeURIComponent(idOrSlug)}`);
  if (!response.ok && response.status !== 404) {
    response = await fetch(`/blogs/${encodeURIComponent(idOrSlug)}`);
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to fetch article details.');
  }

  return response.json();
};

export const saveBlog = async (
  blogData: Omit<Blog, '_id' | 'views' | 'totalTimeSpent' | 'createdAt'> & { _id?: string }
): Promise<Blog> => {
  const isEditing = !!blogData._id;
  const url = isEditing ? `/api/blogs/${blogData._id}` : '/api/blogs';
  const method = isEditing ? 'PUT' : 'POST';

  let response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blogData),
  });

  if (!response.ok && isEditing) {
    response = await fetch(`/blogs/${blogData._id}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blogData),
    });
  }

  if (!response.ok) {
    throw new Error('Failed to save blog post to database.');
  }

  return response.json();
};

export const deleteBlog = async (id: string): Promise<boolean> => {
  let response = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    response = await fetch(`/blogs/${id}`, { method: 'DELETE' });
  }
  return response.ok;
};