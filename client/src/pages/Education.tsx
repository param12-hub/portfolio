import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { GlassCard } from '../components/common/GlassCard';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

export const Education: React.FC = () => {
  const { data: education = [] } = useQuery({ queryKey: ['education'], queryFn: api.getEducation });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-12">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">ACADEMIC BACKGROUND</span>
        <h1 className="text-4xl font-extrabold text-slate-100">Education & Academic Achievements</h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Foundational computer science theory, advanced coursework, and academic research honors.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {education.map((edu) => (
          <GlassCard key={edu._id} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-400" />
                  <span>{edu.degree}</span>
                </h3>
                <p className="text-xs font-semibold text-indigo-300 mt-1">{edu.institution}</p>
              </div>

              {edu.cgpa && (
                <span className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-mono font-bold w-fit">
                  CGPA: {edu.cgpa}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {edu.startDate} - {edu.endDate}</span>
              {edu.location && <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {edu.location}</span>}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{edu.description}</p>

            <div className="space-y-2 pt-3 border-t border-white/5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Relevant Coursework
              </span>
              <div className="flex flex-wrap gap-2">
                {edu.coursework.map((course, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 text-xs text-slate-300 border border-white/5">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
