import React from "react";
import BlogForm from "../components/admin/BlogForm";

export default function NewBlogPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold font-display text-white mb-8">Create New Post</h1>
            <BlogForm />
        </div>
    );
}
