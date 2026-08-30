import React, { useState, useEffect } from 'react';
import { useRouter } from '../lib/router';
import SectionHeader from '../components/ui/SectionHeader';
import { motion, AnimatePresence } from 'motion/react';
import { getBlogs, Blog } from '../lib/blogStore';
import GlassCard from '../components/ui/GlassCard';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';

export default function BlogPage() {
  const { navigate } = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Only load published blogs for public view
        const data = await getBlogs(true);
        setBlogs(data);
      } catch (err: any) {
        setError(err.message || "Failed to load articles");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Get all unique tags across all published blogs
  const allTags = ["All", ...Array.from(new Set(blogs.flatMap(blog => blog.tags || [])))];

  const filteredBlogs = selectedTag === "All"
    ? blogs
    : blogs.filter(blog => blog.tags?.includes(selectedTag));

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Insights & Articles"
        title="Thinking, writing, and engineering at DPS."
        description="Explorations into modern design languages, backend architectures, AI capabilities, and building resilient web software."
      />

      {/* Tags Filter */}
      {blogs.length > 0 && (
        <div className="flex flex-wrap gap-2.5 mb-16 border-b border-studio-border/50 pb-8">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 text-xs font-mono rounded-full border transition-all duration-300 ${
                selectedTag === tag
                  ? 'bg-studio-accent border-transparent text-white'
                  : 'bg-studio-card border-studio-border text-studio-text-secondary hover:text-white hover:border-white/20'
              }`}
            >
              {tag.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-studio-text-secondary">
          Loading published posts...
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl text-center max-w-lg mx-auto">
          {error}
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-20 text-studio-text-secondary">
          No published posts found. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              key={blog._id}
              className="group cursor-pointer"
              onClick={() => navigate(`/blog/${blog.slug}`)}
            >
              <GlassCard className="h-full overflow-hidden flex flex-col hover:border-white/10 hover:bg-white/[0.04] transition-all">
                {blog.coverImage && (
                  <div className="w-full aspect-[16/10] overflow-hidden border-b border-white/5 relative">
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-1.5">
                      {blog.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] font-mono tracking-wider bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white border border-white/10 uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="p-6 flex-1 flex flex-col">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-studio-text-secondary mb-3 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(blog.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      {blog.author}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-medium text-white mb-3 group-hover:text-studio-accent transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-studio-text-secondary line-clamp-3 mb-6 flex-1">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center gap-1 text-sm font-medium text-white group-hover:gap-2 transition-all mt-auto">
                    Read Article <ArrowRight size={14} className="text-studio-accent" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
