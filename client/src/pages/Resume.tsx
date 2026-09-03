import React from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { Download, FileText, ExternalLink, Printer } from 'lucide-react';

export const Resume: React.FC = () => {
  const resumeUrl = 'https://drive.google.com/file/d/1EBIVsDKCV9eVCIiPnVjen0yuVmWiaCM2/view?usp=sharing';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-8">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-white/10">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <span>Curriculum Vitae</span>
          </h1>
          <p className="text-xs text-slate-400">Paramesh Rajuri — AI Engineer & Full Stack Developer</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 text-slate-200 hover:text-white text-xs font-semibold border border-white/10"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
          >
            <Download className="w-4 h-4" />
            <span>View / Download PDF</span>
          </a>
        </div>
      </div>

      {/* Printable Resume Canvas */}
      <GlassCard className="p-8 space-y-8 text-slate-200 print:text-black print:bg-white print:p-0">
        {/* Header */}
        <div className="border-b border-white/10 pb-6 space-y-2">
          <h2 className="text-2xl font-bold text-slate-100">Paramesh Rajuri</h2>
          <p className="text-xs font-mono text-indigo-400">AI Engineer | Agentic AI Developer | Full Stack Developer</p>
          <p className="text-xs text-slate-400">
            Hyderabad, India | parameshrajuri@gmail.com | linkedin.com/in/paramesh-rajuri-700394222
          </p>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider text-indigo-300">Executive Summary</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            AI Engineer and Full Stack Developer specializing in Python, Machine Learning, Generative AI, Large Language Models (LLMs), and Agentic AI. Experienced in developing scalable AI-powered applications, enterprise software, logistics platforms, IoT automation systems, and cloud-native solutions. Skilled in Prompt Engineering, RAG, FastAPI, React.js, Node.js, and REST APIs.
          </p>
        </div>

        {/* Work Experience */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider text-indigo-300">Work Experience</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-100">
                <span>Startup Lead — Afflicart Pvt. Ltd.</span>
                <span className="font-mono text-slate-400">2022 - Present</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">• Led development of AI-ready enterprise applications, logistics platforms & cloud software.</p>
              <p className="text-xs text-slate-400">• Architected backend systems with Python, FastAPI, React.js, Node.js, and Firebase.</p>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-100">
                <span>Software Engineer — ParcelHorse Logistics</span>
                <span className="font-mono text-slate-400">2024</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">• Designed cloud logistics platform with real-time shipment tracking & dashboards.</p>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-100">
                <span>Freelance Software Developer</span>
                <span className="font-mono text-slate-400">2021 - 2023</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">• Developed 15+ web applications, enterprise dashboards, and automation tools.</p>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider text-indigo-300">Education</h3>
          <div className="flex justify-between text-xs text-slate-200">
            <span>B.Tech in Electronics and Communication Engineering — RGUKT Basar</span>
            <span className="font-mono text-slate-400">2018 - 2022 | CGPA: 8.5</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
