import React from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { Trophy } from 'lucide-react';

export const Achievements: React.FC = () => {
  const achievements = [
    {
      title: 'State Rank 1 — Mathematics Talent Test',
      org: 'State Mathematics Talent Examination Board',
      year: 'Honors Award',
      desc: 'Achieved 1st Rank across the state for exceptional mathematical problem solving, logic, and analytical skills.',
    },
    {
      title: 'State Rank 3 — Physics Talent Test',
      org: 'State Physics Talent Examination Board',
      year: 'Honors Award',
      desc: 'Secured 3rd Rank statewide in physical science principles, mechanics, and computational modeling.',
    },
    {
      title: 'Yuva Hackathon Winner',
      org: 'State Hackathon Committee',
      year: 'Grand Champion',
      desc: 'Awarded 1st Place for building intelligent automation and IoT systems under high-pressure hackathon conditions.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-12">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">HONORS & RECOGNITION</span>
        <h1 className="text-4xl font-extrabold text-slate-100">Key Achievements & Awards</h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Notable honors, state competitive rankings, and hackathon championships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {achievements.map((item, idx) => (
          <GlassCard key={idx} className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase">{item.org} • {item.year}</span>
              <h3 className="text-lg font-bold text-slate-100 mt-1">{item.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
