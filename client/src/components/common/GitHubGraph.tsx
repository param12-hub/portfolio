import React from 'react';
import { GitCommit } from 'lucide-react';

export const GitHubGraph: React.FC = () => {
  // Generate mock contribution grid (52 weeks x 7 days)
  const weeks = 28;
  const days = 7;
  
  const generateLevel = (week: number, day: number) => {
    const seed = (week * 7 + day) % 17;
    if (seed === 0) return 'bg-slate-900 border-white/5';
    if (seed < 5) return 'bg-emerald-950 border-emerald-800/30';
    if (seed < 10) return 'bg-emerald-800 border-emerald-600/40';
    if (seed < 14) return 'bg-emerald-600 border-emerald-500/50';
    return 'bg-emerald-400 border-emerald-300';
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <GitCommit className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-semibold text-slate-200">1,842 Contributions in the last year</h3>
        </div>
        <span className="text-xs text-slate-500 font-mono">@alexmorgan</span>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1.5 min-w-[500px]">
          {Array.from({ length: weeks }).map((_, w) => (
            <div key={w} className="flex flex-col gap-1.5">
              {Array.from({ length: days }).map((_, d) => (
                <div
                  key={d}
                  className={`w-3 h-3 rounded-xs border transition-transform hover:scale-125 ${generateLevel(w, d)}`}
                  title={`Contributions on week ${w + 1}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
        <span>Less</span>
        <div className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-xs bg-slate-900" />
          <span className="w-2.5 h-2.5 rounded-xs bg-emerald-950" />
          <span className="w-2.5 h-2.5 rounded-xs bg-emerald-800" />
          <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" />
          <span className="w-2.5 h-2.5 rounded-xs bg-emerald-400" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
