import React from 'react';
import { GlassCard } from '../components/common/GlassCard';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-8">
      <h1 className="text-3xl font-bold text-slate-100">Privacy Policy</h1>
      <GlassCard className="prose prose-invert max-w-none text-xs text-slate-300 space-y-4">
        <p>Last updated: July 2026</p>
        <p>This privacy notice describes how Paramesh Rajuri Portfolio & CMS collects, protects, and uses information supplied when you visit our website.</p>
        <h3 className="text-sm font-bold text-white">1. Information We Collect</h3>
        <p>We only collect information directly submitted by you via the contact form (name, email, message content) or automated aggregate pageview telemetry for analytical performance metrics.</p>
        <h3 className="text-sm font-bold text-white">2. Data Security</h3>
        <p>All data transmitted is secured using SSL/TLS encryption. We do not sell or lease personal data to third parties.</p>
      </GlassCard>
    </div>
  );
};
