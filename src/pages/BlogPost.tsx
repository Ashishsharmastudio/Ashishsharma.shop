import React, { useState, useEffect } from 'react';
import { useRouter } from '../lib/router';
import { getBlogById, Blog } from '../lib/blogStore';
import { Calendar, User, ArrowLeft, ArrowUpRight } from 'lucide-react';

interface Props {
  slug: string;
}

export default function BlogPost({ slug }: Props) {
  const { navigate } = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await getBlogById(slug);
        setBlog(data);
      } catch (err: any) {
        setError(err.message || "Failed to load the article");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-24 text-center text-studio-text-secondary">
        Loading article content...
      </div>
    );
  }

  if (error || !blog || !blog.published) {
    return (
      <div className="min-h-screen pt-40 pb-24 text-center">
        <h2 className="text-3xl font-display font-medium text-white mb-4">404 // ARTICLE_NOT_FOUND</h2>
        <button 
          onClick={() => navigate('/blog')}
          className="text-sm text-studio-accent underline"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/blog')}
        className="inline-flex items-center gap-2 text-sm text-studio-text-secondary hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Insights
      </button>

      {/* Header Info */}
      <header className="mb-12 border-b border-studio-border/30 pb-8">
        <div className="flex flex-wrap gap-2.5 mb-6">
          {blog.tags?.map((tag) => (
            <span key={tag} className="text-xs font-mono tracking-wider bg-studio-card px-3 py-1 rounded-full text-studio-accent border border-studio-border uppercase">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-medium text-white tracking-tight mb-6 leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-studio-text-secondary font-mono">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {new Date(blog.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <User size={14} />
            {blog.author}
          </span>
        </div>
      </header>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="mb-12 rounded-3xl overflow-hidden aspect-[16/9] border border-white/5 shadow-2xl">
          <img 
            src={blog.coverImage} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Excerpt Summary */}
      <div className="text-lg sm:text-xl text-white font-sans font-medium mb-10 leading-relaxed border-l-2 border-studio-accent pl-6 italic">
        {blog.excerpt}
      </div>

      {/* Rich Text Rendered Content */}
      <div 
        className="prose prose-invert max-w-none text-studio-text-primary/90 font-sans leading-relaxed text-base sm:text-lg mb-16 ql-editor-display"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Editor custom styles in view mode */}
      <style>{`
        .ql-editor-display {
          font-family: inherit;
          word-break: break-word;
          overflow-wrap: break-word;
          white-space: pre-wrap;
        }
        .ql-editor-display p {
          margin-bottom: 1.5rem;
        }
        .ql-editor-display h1, .ql-editor-display h2, .ql-editor-display h3 {
          color: white;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .ql-editor-display h1 { font-size: 1.8rem; }
        .ql-editor-display h2 { font-size: 1.5rem; }
        .ql-editor-display h3 { font-size: 1.25rem; }
        .ql-editor-display ul, .ql-editor-display ol {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
          list-style-type: decimal;
        }
        .ql-editor-display ul {
          list-style-type: disc;
        }
        .ql-editor-display li {
          margin-bottom: 0.5rem;
        }
        .ql-editor-display a {
          color: #8B5CF6;
          text-decoration: underline;
        }
        .ql-editor-display a.blog-buy-now {
          display: inline-block !important;
          background: #6A00FF !important;
          color: #ffffff !important;
          padding: 10px 28px !important;
          border-radius: 8px !important;
          text-decoration: none !important;
          font-weight: 700 !important;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 4px 14px rgba(106, 0, 255, 0.4);
          transition: transform 0.2s, background 0.2s;
        }
        .ql-editor-display a.blog-buy-now:hover {
          background: #5500cc !important;
          transform: translateY(-1px);
        }
      `}</style>
    </article>
  );
}
