import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { GlassCard } from '../components/common/GlassCard';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const Experience: React.FC = () => {
  const { data: experiences = [] } = useQuery({ queryKey: ['experiences'], queryFn: api.getExperiences });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">CAREER TIMELINE</span>
        <h1 className="text-4xl font-extrabold text-slate-100">Professional Work Experience</h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Over 6 years of building & scaling high-concurrency cloud infrastructure and web platforms across fast-growing startups and enterprises.
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-8 max-w-4xl mx-auto relative before:absolute before:inset-0 before:left-6 md:before:left-1/2 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:to-purple-500">
        {experiences.map((exp, idx) => (
          <div key={exp._id} className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Timeline Dot */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-600 border-4 border-slate-950 flex items-center justify-center shadow-lg z-10">
              <Briefcase className="w-3.5 h-3.5 text-white" />
            </div>

            {/* Card Content */}
            <div className="w-full md:w-[45%] pl-16 md:pl-0">
              <GlassCard className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                    <p className="text-xs font-semibold text-indigo-400 mt-0.5">{exp.company}</p>
                  </div>
                  {exp.current && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                      Present
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-xs text-slate-400 font-mono">
                  <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {exp.startDate} - {exp.endDate}</span>
                  {exp.location && <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {exp.location}</span>}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{exp.description}</p>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Key Impact & Deliverables:</span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-slate-900 text-[10px] text-slate-400 border border-white/5 font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
