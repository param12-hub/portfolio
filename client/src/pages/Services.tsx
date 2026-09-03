import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { GlassCard } from '../components/common/GlassCard';
import { Link } from 'react-router-dom';
import { Wrench, CheckCircle2, Clock, DollarSign, ArrowRight } from 'lucide-react';

export const Services: React.FC = () => {
  const { data: services = [] } = useQuery({ queryKey: ['services'], queryFn: api.getServices });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">SOLUTIONS & OFFERINGS</span>
        <h1 className="text-4xl font-extrabold text-slate-100">Services & Consulting Solutions</h1>
        <p className="text-base text-slate-400 leading-relaxed">
          High-value architectural consulting, full-stack application development, and WebGL interactive frontend implementations tailored to scale.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((srv) => (
          <GlassCard key={srv._id} className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Wrench className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                  {srv.timeline}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-100">{srv.title}</h3>
                <p className="text-xs font-medium text-slate-400 mt-1">{srv.shortDesc}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{srv.description}</p>

              <div className="space-y-2 pt-4 border-t border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Includes:</span>
                <ul className="space-y-2 text-xs text-slate-300">
                  {srv.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 mr-2 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Investment</span>
                <p className="text-sm font-bold text-slate-100">{srv.priceRange || 'Custom Quote'}</p>
              </div>
              <Link
                to="/contact"
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 transition-all"
              >
                <span>Hire Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
