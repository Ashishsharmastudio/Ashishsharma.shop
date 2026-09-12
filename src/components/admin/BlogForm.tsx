import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "../../lib/router";
import dynamic from "react-quill-new";
import GlassCard from "../ui/GlassCard";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Save, X, Upload, Image as ImageIcon, Link } from "lucide-react";
import { saveBlog } from "../../lib/blogStore";
import "react-quill-new/dist/quill.snow.css";

// Use standard ReactQuill since we are in Vite
const ReactQuill = dynamic;

interface BlogFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
    const { navigate } = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);
    const [inputType, setInputType] = useState<'url' | 'file'>('url');
    const [buyNowModal, setBuyNowModal] = useState(false);
    const [buyNowUrl, setBuyNowUrl] = useState("");
    const [buyNowLabel, setBuyNowLabel] = useState("Buy Now");
    const quillInstanceRef = useRef<any>(null);
    const savedRangeRef = useRef<any>(null);
    const slugTouched = useRef<boolean>(isEditing);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        author: "Ishant Saini",
        tags: "",
        published: false,
    });

    function insertBuyNow() {
        const quill = quillInstanceRef.current;
        if (!quill || !buyNowUrl.trim()) return;
        const range = savedRangeRef.current ?? quill.getSelection(true) ?? { index: quill.getLength() - 1, length: 0 };
        const label = buyNowLabel.trim() || "Buy Now";
        const html = `<a href="${buyNowUrl.trim()}" class="blog-buy-now" target="_blank" rel="noopener noreferrer">${label}</a>&nbsp;`;
        quill.clipboard.dangerouslyPasteHTML(range.index, html);
        setBuyNowModal(false);
        setBuyNowUrl("");
        setBuyNowLabel("Buy Now");
        savedRangeRef.current = null;
    }

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean'],
            ]
        },
    }), []);

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : initialData.tags || "",
            });
        }
    }, [initialData]);

    useEffect(() => {
        if (slugTouched.current) return;
        if (!formData.title) return;
        const generated = formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
        setFormData(prev => ({ ...prev, slug: generated }));
    }, [formData.title]);

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        // Simulate local uploading
        setTimeout(() => {
            const fakeUrl = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, coverImage: fakeUrl }));
            setUploading(false);
        }, 1000);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const payload = {
            ...formData,
            tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
            _id: initialData?._id
        };

        try {
            await saveBlog(payload);
            navigate("/admin/blogs");
        } catch (err) {
            setError("Failed to save blog");
        } finally {
            setLoading(false);
        }
    }

    return (
        <GlassCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="bg-transparent"
                    />
                    <Input
                        label="Slug"
                        value={formData.slug}
                        onChange={(e) => {
                            slugTouched.current = true;
                            setFormData({ ...formData, slug: e.target.value });
                        }}
                        required
                        className="bg-transparent"
                        placeholder="auto-generated from title"
                    />
                </div>

                <Input
                    label="Excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    required
                    className="bg-transparent"
                />

                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <label className="text-sm font-medium text-gray-200">Cover Image Source</label>
                        <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                            <button
                                type="button"
                                onClick={() => setInputType('url')}
                                className={`px-4 py-1.5 rounded-md text-sm transition-all flex items-center gap-2 ${inputType === 'url' ? 'bg-studio-accent text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <Link size={14} /> URL
                            </button>
                            <button
                                type="button"
                                onClick={() => setInputType('file')}
                                className={`px-4 py-1.5 rounded-md text-sm transition-all flex items-center gap-2 ${inputType === 'file' ? 'bg-studio-accent text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                <Upload size={14} /> Upload
                            </button>
                        </div>
                    </div>

                    {inputType === 'url' ? (
                        <Input
                            label="Cover Image URL"
                            value={formData.coverImage}
                            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                            placeholder="https://images.unsplash.com/..."
                            className="bg-transparent"
                        />
                    ) : (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-200">Upload Image</label>
                            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center bg-white/5 hover:bg-white/10 transition-colors">
                                {uploading ? (
                                    <div className="text-gray-400">Uploading...</div>
                                ) : (
                                    <>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                                            <ImageIcon size={32} className="text-gray-400" />
                                            <span className="text-sm text-gray-400">Click to upload image</span>
                                        </label>
                                    </>
                                )}
                            </div>
                            {formData.coverImage && (
                                <div className="text-xs text-green-400 mt-2">
                                    Image uploaded/referenced successfully
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                        className="bg-transparent"
                    />
                    <Input
                        label="Tags (comma separated)"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        placeholder="Next.js, React, Design"
                        className="bg-transparent"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-200 ml-1">Content</label>
                    <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10 text-white">
                        <ReactQuill
                            theme="snow"
                            value={formData.content}
                            onChange={(content: string) => setFormData({ ...formData, content })}
                            modules={modules}
                            className="bg-transparent text-white"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="published"
                        className="w-5 h-5 rounded border-gray-600 bg-white/5 text-studio-accent focus:ring-studio-accent"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    />
                    <label htmlFor="published" className="text-sm font-medium text-white cursor-pointer select-none">
                        Publish immediately
                    </label>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/10">
                    <Button variant="primary" type="submit" disabled={loading}>
                        <Save size={18} /> {loading ? "Saving..." : "Save Post"}
                    </Button>
                    <Button variant="secondary" type="button" onClick={() => navigate("/admin/blogs")}>
                        <X size={18} /> Cancel
                    </Button>
                </div>
            </form>
        </GlassCard>
    );
}
