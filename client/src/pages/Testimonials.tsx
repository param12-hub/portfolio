import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { GlassCard } from '../components/common/GlassCard';
import { Quote, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { data: testimonials = [] } = useQuery({ queryKey: ['testimonials'], queryFn: api.getTestimonials });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-12">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">CLIENT ENDORSEMENTS</span>
        <h1 className="text-4xl font-extrabold text-slate-100">What Leadership Teams Say</h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Feedback and recommendations from founders, VPs of Engineering, and product directors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t) => (
          <GlassCard key={t._id} className="space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Quote className="w-8 h-8 text-indigo-500/40" />
                <div className="flex items-center space-x-1">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">"{t.quote}"</p>
            </div>

            <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border border-white/20 object-cover" />
              <div>
                <p className="text-xs font-bold text-slate-100">{t.name}</p>
                <p className="text-[10px] text-slate-400 font-mono">{t.role} • {t.company}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
