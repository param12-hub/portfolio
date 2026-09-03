import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
      <div className="max-w-md w-full text-center space-y-6">
        <GlassCard className="p-10 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto">
            <Compass className="w-8 h-8 animate-spin" />
          </div>

          <div className="space-y-2">
            <h1 className="text-6xl font-extrabold text-gradient">404</h1>
            <h2 className="text-xl font-bold text-slate-100">Page Not Found</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              The orbital vector or route you requested does not exist in this galaxy.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio Home</span>
          </Link>
        </GlassCard>
      </div>
    </div>
  );
};
