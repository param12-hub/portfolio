import React from 'react';

export const HeroCanvas: React.FC = () => {
  return (
    <div className="w-full h-[350px] md:h-[450px] flex items-center justify-center relative">
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
        {/* Outer Glowing Sphere Aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-25 blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />

        {/* Outer Orbit Ring */}
        <div
          className="absolute inset-0 rounded-full border border-indigo-500/40 border-dashed animate-spin"
          style={{ animationDuration: '25s' }}
        />

        {/* Inner Orbit Ring */}
        <div
          className="absolute inset-6 rounded-full border border-purple-500/50 border-dotted animate-spin"
          style={{ animationDuration: '18s', animationDirection: 'reverse' }}
        />

        {/* Central Geometric Icon Badge */}
        <div className="w-36 h-36 rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/15 flex flex-col items-center justify-center shadow-2xl shadow-indigo-500/20 group hover:scale-110 transition-transform duration-500">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-extrabold text-white text-2xl">
              PR
            </div>
          </div>
          <span className="text-[10px] font-mono text-indigo-300 mt-2 tracking-widest uppercase">AI ENGINEER</span>
        </div>

        {/* Floating Satellite Badges */}
        <div className="absolute top-2 left-6 px-3 py-1 rounded-full glass-panel border border-white/10 text-[10px] font-mono text-emerald-400 animate-bounce" style={{ animationDuration: '4s' }}>
          ✦ React 19
        </div>
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full glass-panel border border-white/10 text-[10px] font-mono text-indigo-400 animate-bounce" style={{ animationDuration: '5s' }}>
          ⚡ Node & Mongo
        </div>
        <div className="absolute top-1/2 -right-6 px-3 py-1 rounded-full glass-panel border border-white/10 text-[10px] font-mono text-pink-400 animate-bounce" style={{ animationDuration: '6s' }}>
          💎 Sub-ms Speed
        </div>
      </div>
    </div>
  );
};
