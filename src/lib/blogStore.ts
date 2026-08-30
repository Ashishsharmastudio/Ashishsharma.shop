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
  const url = publishedOnly ? '/api/blogs?published=true' : '/api/blogs';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return response.json();
};

export const getBlogById = async (idOrSlug: string): Promise<Blog | null> => {
  const response = await fetch(`/api/blogs/${idOrSlug}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }
  return response.json();
};

export const saveBlog = async (blogData: Omit<Blog, '_id' | 'views' | 'totalTimeSpent' | 'createdAt'> & { _id?: string }): Promise<Blog> => {
  const isEditing = !!blogData._id;
  const url = isEditing ? `/api/blogs/${blogData._id}` : '/api/blogs';
  const method = isEditing ? 'PUT' : 'POST';

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogData),
  });

  if (!response.ok) {
    throw new Error('Failed to save blog');
  }

  return response.json();
};

export const deleteBlog = async (id: string): Promise<boolean> => {
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'DELETE',
  });

  return response.ok;
};
