import React from 'react';
import { TrendingUp, Users } from 'lucide-react';

interface AnalyticsChartProps {
  data: { date: string; views: number }[];
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  const maxViews = Math.max(...data.map(d => d.views), 100);

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Visitor Activity Trends</span>
          </h3>
          <p className="text-xs text-slate-400">Daily unique page views across portfolio sections</p>
        </div>
        <span className="flex items-center text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
          <TrendingUp className="w-3.5 h-3.5 mr-1" /> +24% vs last week
        </span>
      </div>

      <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-white/10">
        {data.map((item, index) => {
          const heightPercent = Math.round((item.views / maxViews) * 100);
          return (
            <div key={index} className="flex-1 flex flex-col items-center group relative">
              <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-xs font-mono text-indigo-300 px-2 py-0.5 rounded border border-white/10 pointer-events-none">
                {item.views} views
              </div>
              <div
                style={{ height: `${Math.max(heightPercent, 8)}%` }}
                className="w-full max-w-[28px] bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-md group-hover:from-indigo-500 group-hover:to-pink-500 transition-all shadow-lg"
              />
              <span className="text-[10px] font-mono text-slate-500 mt-2 truncate w-full text-center">
                {item.date.split('-').slice(1).join('/')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
