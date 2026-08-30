import React, { useState, useEffect } from "react";
import BlogForm from "../components/admin/BlogForm";
import { getBlogById, Blog } from "../lib/blogStore";
import { useRouter } from "../lib/router";

interface Props {
    blogId: string;
}

export default function EditBlogPage({ blogId }: Props) {
    const { navigate } = useRouter();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const data = await getBlogById(blogId);
                setBlog(data);
            } catch (err: any) {
                setError(err.message || "Failed to load blog");
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [blogId]);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-24 px-6 text-center text-studio-text-secondary">
                Loading blog content from database...
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen pt-32 pb-24 px-6 text-center">
                <h2 className="text-3xl font-display font-medium text-white mb-4">404 // BLOG_NOT_FOUND</h2>
                <button 
                    onClick={() => navigate('/admin/blogs')}
                    className="text-sm text-studio-accent underline"
                >
                    Back to Blogs
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold font-display text-white mb-8">Edit Post</h1>
            <BlogForm initialData={blog} isEditing />
        </div>
    );
}
