import React from 'react';
import { Award, CheckCircle2, Flame } from 'lucide-react';

export const LeetCodeStats: React.FC = () => {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-semibold text-slate-200">Competitive Programming Stats</h3>
        </div>
        <div className="flex items-center space-x-1 text-xs text-amber-400 font-mono bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
          <Flame className="w-3.5 h-3.5" />
          <span>Top 1.4% Global</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center mb-4">
        <div className="p-3 bg-slate-900/60 rounded-xl border border-emerald-500/20">
          <span className="text-xs text-emerald-400 font-medium">Easy</span>
          <p className="text-xl font-bold text-slate-100 mt-1">248</p>
        </div>
        <div className="p-3 bg-slate-900/60 rounded-xl border border-amber-500/20">
          <span className="text-xs text-amber-400 font-medium">Medium</span>
          <p className="text-xl font-bold text-slate-100 mt-1">412</p>
        </div>
        <div className="p-3 bg-slate-900/60 rounded-xl border border-rose-500/20">
          <span className="text-xs text-rose-400 font-medium">Hard</span>
          <p className="text-xl font-bold text-slate-100 mt-1">94</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
        <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1" /> Total Solved: 754</span>
        <span className="font-mono text-indigo-400">Rating: 2,185</span>
      </div>
    </div>
  );
};
