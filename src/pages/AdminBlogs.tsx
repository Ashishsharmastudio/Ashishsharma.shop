import React, { useState, useEffect } from "react";
import { useRouter } from "../lib/router";
import GlassCard from "../components/ui/GlassCard";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { getBlogs, deleteBlog, Blog } from "../lib/blogStore";

export default function AdminBlogsPage() {
    const { navigate } = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const data = await getBlogs();
            setBlogs(data);
        } catch (err: any) {
            setError(err.message || "Failed to load blogs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id: string, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                const success = await deleteBlog(id);
                if (success) {
                    fetchBlogs();
                } else {
                    alert("Failed to delete blog");
                }
            } catch (err: any) {
                alert(err.message || "Error deleting blog");
            }
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <button 
                        onClick={() => navigate("/admin")}
                        className="flex items-center gap-2 text-sm text-studio-text-secondary hover:text-white mb-2 transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold font-display text-white">All Blogs</h1>
                </div>
                <button
                    onClick={() => navigate("/admin/blogs/new")}
                    className="inline-flex items-center gap-2 bg-studio-accent text-white px-6 py-3 rounded-full hover:bg-studio-accent/90 transition-all text-sm font-medium"
                >
                    <Plus size={18} /> New Post
                </button>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6">
                    {error}
                </div>
            )}

            <GlassCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="p-4 text-sm font-medium text-studio-text-secondary">Title</th>
                                <th className="p-4 text-sm font-medium text-studio-text-secondary">Status</th>
                                <th className="p-4 text-sm font-medium text-studio-text-secondary">Views</th>
                                <th className="p-4 text-sm font-medium text-studio-text-secondary">Avg Time</th>
                                <th className="p-4 text-sm font-medium text-studio-text-secondary">Date</th>
                                <th className="p-4 text-sm font-medium text-studio-text-secondary text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-studio-text-secondary">
                                        Loading blogs from MongoDB...
                                    </td>
                                </tr>
                            ) : blogs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-studio-text-secondary">
                                        No blogs found. Create one!
                                    </td>
                                </tr>
                            ) : (
                                blogs.map((blog) => {
                                    const views = blog.views || 0;
                                    const totalTime = blog.totalTimeSpent || 0;
                                    const avgTimeSecs = views > 0 ? Math.round(totalTime / views) : 0;
                                    const mins = Math.floor(avgTimeSecs / 60);
                                    const secs = avgTimeSecs % 60;
                                    const avgTimeString = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

                                    return (
                                        <tr key={blog._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="p-4 text-white font-medium">{blog.title}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${blog.published ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"}`}>
                                                    {blog.published ? "Published" : "Draft"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-studio-text-secondary text-sm">
                                                {views}
                                            </td>
                                            <td className="p-4 text-studio-text-secondary text-sm">
                                                {avgTimeString}
                                            </td>
                                            <td className="p-4 text-studio-text-secondary text-sm">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        onClick={() => navigate(`/admin/blogs/edit/${blog._id}`)} 
                                                        className="p-2 hover:bg-white/10 rounded-lg text-blue-400 hover:text-blue-300 transition-colors"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(blog._id, blog.title)} 
                                                        className="p-2 hover:bg-white/10 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
}
