import React from 'react';
import { GlassCard } from '../components/common/GlassCard';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-8">
      <h1 className="text-3xl font-bold text-slate-100">Terms of Service</h1>
      <GlassCard className="prose prose-invert max-w-none text-xs text-slate-300 space-y-4">
        <p>Last updated: July 2026</p>
        <p>By accessing and using this portfolio platform, you agree to comply with the terms and conditions set forth below.</p>
        <h3 className="text-sm font-bold text-white">1. Intellectual Property</h3>
        <p>All software architecture designs, code snippets, branding, and written case studies presented are the intellectual property of Paramesh Rajuri unless open-sourced under specified MIT/Apache licenses.</p>
      </GlassCard>
    </div>
  );
};
