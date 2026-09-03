import React from 'react';
import { Link } from 'react-router-dom';
import { HeroCanvas } from '../components/3d/HeroCanvas';
import { GitHubGraph } from '../components/common/GitHubGraph';
import { LeetCodeStats } from '../components/common/LeetCodeStats';
import { GlassCard } from '../components/common/GlassCard';
import { api } from '../lib/api';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight, Sparkles, Code2, FolderKanban, Terminal, CheckCircle2, Star, ExternalLink, Github
} from 'lucide-react';

export const Home: React.FC = () => {
  const { data: hero } = useQuery({ queryKey: ['hero'], queryFn: api.getHero });
  const { data: projects = [] } = useQuery({ queryKey: ['projects'], queryFn: api.getProjects });
  const { data: skills = [] } = useQuery({ queryKey: ['skills'], queryFn: api.getSkills });

  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const featuredSkills = skills.slice(0, 6);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="space-y-6 text-left z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{hero?.availability || 'Available for Select Projects & Consulting'}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 leading-none">
              Engineering <span className="text-gradient">Apple & Stripe</span> Grade Platforms.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              {hero?.bio || 'Building hyper-scalable web platforms, real-time distributed systems, and modern WebGL interactive applications.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/projects"
                className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>Explore Featured Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl glass-panel text-slate-200 hover:text-white hover:border-indigo-500/50 font-semibold text-sm transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Let's Build Together</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-gradient">{hero?.yearsOfExp || '6+'}</p>
                <p className="text-xs text-slate-400 font-medium">Years Exp.</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-gradient-cyan">{hero?.projectsCompleted || '45+'}</p>
                <p className="text-xs text-slate-400 font-medium">Projects Built</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-purple-400">{hero?.happyClients || '32+'}</p>
                <p className="text-xs text-slate-400 font-medium">Clients Satisfied</p>
              </div>
            </div>
          </div>

          {/* Right Column 3D Canvas */}
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl -z-10" />
            <HeroCanvas />
          </div>

        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">SELECTED PORTFOLIO</span>
            <h2 className="text-3xl font-bold text-slate-100 mt-1">Featured Case Studies</h2>
          </div>
          <Link to="/projects" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <GlassCard key={project._id} className="flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="relative h-48 rounded-xl overflow-hidden border border-white/10">
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
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.slice(0, 4).map((tag, idx) => (
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
                <Link to="/projects" className="text-xs font-semibold text-indigo-400 flex items-center gap-1 hover:underline">
                  Case Study <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Tech Stack Marquee & GitHub Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GitHubGraph />
          <LeetCodeStats />
        </div>
      </section>
    </div>
  );
};
