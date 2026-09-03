import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { GlassCard } from '../components/common/GlassCard';
import { Blog as BlogType } from '../types';
import { BookOpen, Calendar, Clock, Eye, Search, X } from 'lucide-react';

export const Blog: React.FC = () => {
  const { data: blogs = [] } = useQuery({ queryKey: ['blogs'], queryFn: api.getBlogs });
  const [search, setSearch] = useState('');
  const [activeArticle, setActiveArticle] = useState<BlogType | null>(null);

  const filtered = blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.summary.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-12">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">ARTICLES & INSIGHTS</span>
        <h1 className="text-4xl font-extrabold text-slate-100">Engineering Blog & Thoughts</h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Deep dives into React 19 architecture, sub-second backend API design, WebGL performance, and system optimization.
        </p>
      </div>

      <div className="max-w-md mx-auto relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-white/10 rounded-2xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 glass-panel"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((blog) => (
          <GlassCard key={blog._id} className="flex flex-col justify-between space-y-4 group">
            <div className="space-y-4">
              <div className="relative h-48 rounded-xl overflow-hidden border border-white/10">
                <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-indigo-300 border border-white/10">
                  {blog.category}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-[11px] text-slate-400 font-mono">
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {blog.readingTime}</span>
                <span className="flex items-center"><Eye className="w-3.5 h-3.5 mr-1" /> {blog.views} views</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {blog.summary}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveArticle(blog)}
                className="text-xs font-semibold text-indigo-400 hover:underline"
              >
                Read Article →
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl glass-panel rounded-2xl border border-white/10 p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400">{activeArticle.category} • {activeArticle.readingTime}</span>
                <h2 className="text-2xl font-bold text-slate-100">{activeArticle.title}</h2>
              </div>
              <button onClick={() => setActiveArticle(null)} className="text-slate-400 hover:text-white p-2">
                <X className="w-6 h-6" />
              </button>
            </div>

            <img src={activeArticle.coverImage} alt={activeArticle.title} className="w-full h-64 object-cover rounded-xl border border-white/10" />

            <div className="prose prose-invert max-w-none text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
              {activeArticle.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
