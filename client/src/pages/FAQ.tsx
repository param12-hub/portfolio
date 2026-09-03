import React, { useState } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: 'What is your current availability for contract or full-time roles?', a: 'I am currently available for select advisory, architectural consulting, and senior contract/full-time engineering engagements.' },
    { q: 'What tech stack do you specialize in?', a: 'Primary stack includes React 19, TypeScript, Node.js, Express, MongoDB, Tailwind v4, Three.js/R3F, Framer Motion, and Docker.' },
    { q: 'How do you handle project pricing and deliverables?', a: 'Projects are structured with milestones, fixed quotes, and clear timeline SLAs to ensure quality and budget compliance.' },
    { q: 'Can you work with distributed global teams across different time zones?', a: 'Yes, I have 4+ years of remote experience collaborating asynchronously across US, European, and Asian time zones.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-12">
      <div className="space-y-4 text-center">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">GOT QUESTIONS?</span>
        <h1 className="text-4xl font-extrabold text-slate-100">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <GlassCard key={idx} className="p-0 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-6 text-left flex items-center justify-between font-bold text-sm text-slate-100 hover:text-indigo-400 transition-colors"
            >
              <span className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-indigo-400" />
                {faq.q}
              </span>
              {openIndex === idx ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-6 pt-0 text-xs text-slate-300 border-t border-white/5 leading-relaxed">
                {faq.a}
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
