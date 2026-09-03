import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { GlassCard } from '../components/common/GlassCard';
import { Code, Search, Cpu, Database, Server, Layout, Boxes } from 'lucide-react';

export const Skills: React.FC = () => {
  const { data: skills = [] } = useQuery({ queryKey: ['skills'], queryFn: api.getSkills });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps'];

  const filteredSkills = skills.filter(skill => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">TECHNICAL COMPETENCIES</span>
        <h1 className="text-4xl font-extrabold text-slate-100">Skills, Frameworks & Tooling</h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Comprehensive breakdown of my core technical stack across frontend engineering, distributed backends, databases, and DevOps automation.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-white/10">
        {/* Category Tabs */}
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

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search skill (e.g. React)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-white/10 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <GlassCard key={skill._id} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg"
                  style={{ backgroundColor: skill.color + '25', border: `1px solid ${skill.color}50` }}
                >
                  <Code className="w-5 h-5" style={{ color: skill.color }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">{skill.name}</h3>
                  <span className="text-[10px] font-mono text-slate-400">{skill.category} • {skill.level}</span>
                </div>
              </div>
              <span className="text-xs font-bold font-mono text-indigo-400">{skill.proficiency}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${skill.proficiency}%`,
                  backgroundColor: skill.color || '#6366f1',
                }}
              />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
