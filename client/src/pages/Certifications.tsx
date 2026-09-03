import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { GlassCard } from '../components/common/GlassCard';
import { Award, ExternalLink, Calendar } from 'lucide-react';

export const Certifications: React.FC = () => {
  const { data: certs = [] } = useQuery({ queryKey: ['certificates'], queryFn: api.getCertificates });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-12">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">VERIFIED CREDENTIALS</span>
        <h1 className="text-4xl font-extrabold text-slate-100">Professional Certifications</h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Industry-recognized certifications across AWS Cloud Architecture, MongoDB engineering, and Security compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certs.map((cert) => (
          <GlassCard key={cert._id} className="flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="relative h-44 rounded-xl overflow-hidden border border-white/10">
                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
              </div>

              <div>
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider">{cert.issuer}</span>
                <h3 className="text-lg font-bold text-slate-100">{cert.title}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center font-mono">
                  <Calendar className="w-3.5 h-3.5 mr-1" /> Issued {cert.issueDate}
                </p>
              </div>
            </div>

            {cert.credentialUrl && (
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  Verify Credential <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
