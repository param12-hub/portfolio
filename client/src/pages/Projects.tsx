import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { GlassCard } from '../components/common/GlassCard';
import { Project } from '../types';
import { Search, Github, ExternalLink, Filter, Layers, X } from 'lucide-react';

export const Projects: React.FC = () => {
  const { data: projects = [] } = useQuery({ queryKey: ['projects'], queryFn: api.getProjects });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Full-Stack', 'AI & Machine Learning', 'UI/UX & Frontend'];

  const filtered = projects.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">SHOWCASE & CASE STUDIES</span>
        <h1 className="text-4xl font-extrabold text-slate-100">Featured Engineering Projects</h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Production applications, open-source libraries, and high-performance WebGL experiences crafted for real-world impact.
        </p>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-white/10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-white/10 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project) => (
          <GlassCard key={project._id} className="flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="relative h-52 rounded-xl overflow-hidden border border-white/10">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-indigo-300 border border-white/10">
                  {project.category}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-900 text-[10px] text-slate-300 border border-white/5 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-400">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <button
                onClick={() => setActiveModalProject(project)}
                className="text-xs font-semibold text-indigo-400 hover:underline"
              >
                View Case Study
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Case Study Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl glass-panel rounded-2xl border border-white/10 p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400">{activeModalProject.category}</span>
                <h2 className="text-2xl font-bold text-slate-100">{activeModalProject.title}</h2>
              </div>
              <button onClick={() => setActiveModalProject(null)} className="text-slate-400 hover:text-white p-2">
                <X className="w-6 h-6" />
              </button>
            </div>

            <img
              src={activeModalProject.thumbnail}
              alt={activeModalProject.title}
              className="w-full h-64 object-cover rounded-xl border border-white/10"
            />

            <div className="grid grid-cols-2 gap-4">
              {activeModalProject.metrics?.map((m, i) => (
                <div key={i} className="p-3 bg-slate-900/60 rounded-xl border border-white/5">
                  <span className="text-xs text-slate-400">{m.label}</span>
                  <p className="text-lg font-bold text-indigo-400">{m.value}</p>
                </div>
              ))}
            </div>

            <div className="prose prose-invert max-w-none text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
              {activeModalProject.content}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              {activeModalProject.liveUrl && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
