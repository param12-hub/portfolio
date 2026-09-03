import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { GlassCard } from '../components/common/GlassCard';
import { User, Zap, MapPin, Mail, Briefcase, Code, Award, FileText } from 'lucide-react';

export const About: React.FC = () => {
  const { data: about } = useQuery({ queryKey: ['about'], queryFn: api.getAbout });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-16">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">ABOUT ME</span>
        <h1 className="text-4xl font-extrabold text-slate-100">AI Engineer & Agentic AI Specialist</h1>
        <p className="text-base text-slate-300 leading-relaxed">
          {about?.summary || "I'm an AI Engineer and Full Stack Developer with a strong foundation in Python, Machine Learning, Agentic AI, Large Language Models, and modern web technologies."}
        </p>
      </div>

      {/* Quick Bio Info Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <GlassCard className="p-4 flex items-center space-x-3 text-center justify-center">
          <Briefcase className="w-5 h-5 text-indigo-400 shrink-0" />
          <div className="text-left">
            <span className="text-[10px] text-slate-400 font-mono block">EXPERIENCE</span>
            <span className="text-sm font-bold text-slate-100">3+ Years</span>
          </div>
        </GlassCard>
        <GlassCard className="p-4 flex items-center space-x-3 text-center justify-center">
          <Code className="w-5 h-5 text-purple-400 shrink-0" />
          <div className="text-left">
            <span className="text-[10px] text-slate-400 font-mono block">PROJECTS</span>
            <span className="text-sm font-bold text-slate-100">15+ Built</span>
          </div>
        </GlassCard>
        <GlassCard className="p-4 flex items-center space-x-3 text-center justify-center">
          <Award className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-left">
            <span className="text-[10px] text-slate-400 font-mono block">TECH STACK</span>
            <span className="text-sm font-bold text-slate-100">30+ Tools</span>
          </div>
        </GlassCard>
        <GlassCard className="p-4 flex items-center space-x-3 text-center justify-center">
          <MapPin className="w-5 h-5 text-pink-400 shrink-0" />
          <div className="text-left">
            <span className="text-[10px] text-slate-400 font-mono block">LOCATION</span>
            <span className="text-xs font-bold text-slate-100 truncate">Hyderabad, IN</span>
          </div>
        </GlassCard>
      </div>

      {/* Main Profile & Professional Story */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 glass-panel shadow-2xl">
            <img
              src={about?.profileImage || '/images/profile.jpg'}
              alt="Paramesh Rajuri"
              className="w-full h-[420px] object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 space-y-1">
              <p className="text-xl font-bold text-white">Paramesh Rajuri</p>
              <p className="text-xs text-indigo-300 font-mono">AI Engineer | Full Stack Developer</p>
              <div className="flex items-center space-x-2 pt-1 text-xs text-slate-300">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <a href="mailto:parameshrajuri@gmail.com" className="hover:text-white transition-colors truncate">
                  parameshrajuri@gmail.com
                </a>
              </div>
            </div>
          </div>

          <a
            href="https://drive.google.com/file/d/1EBIVsDKCV9eVCIiPnVjen0yuVmWiaCM2/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-lg shadow-indigo-600/30"
          >
            <FileText className="w-4 h-4" />
            <span>Download Official Resume</span>
          </a>
        </div>

        {/* Professional Summary Story */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="space-y-4">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" />
              <span>Professional Summary</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
              {about?.story || "AI Engineer and Full Stack Developer specializing in Python, Machine Learning, Generative AI, Large Language Models (LLMs), and Agentic AI. Experienced in developing scalable AI-powered applications, enterprise software, logistics platforms, IoT automation systems, and cloud-native solutions. Skilled in Prompt Engineering, Retrieval-Augmented Generation (RAG), FastAPI, React.js, Node.js, REST APIs, and intelligent automation. Passionate about building production-ready AI systems and autonomous agents that solve real-world business challenges."}
            </p>
          </GlassCard>

          {/* Highlights & Key Milestones */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-100 uppercase font-mono tracking-wider text-indigo-300">
              Key Engineering Milestones
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {(about?.highlights || [
                'Startup Lead at Afflicart Pvt. Ltd. designing scalable backend architectures & AI applications.',
                'Developed cloud-based logistics platform for ParcelHorse with real-time shipment tracking & dashboards.',
                'Engineered Smart Grid Electrical Worker Safety Automation & IoT Train Monitoring Systems.',
              ]).map((item, idx) => (
                <GlassCard key={idx} className="p-4 flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 leading-normal">{item}</span>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-100">Technical Expertise & Core Focus</h2>
          <p className="text-xs text-slate-400">Pillars of my software engineering and AI development practice</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(about?.coreValues || [
            { title: 'Agentic AI & LLM Systems', desc: 'Specialized in LangChain, LangGraph, RAG pipelines, Prompt Engineering, FAISS, ChromaDB, and autonomous AI agents.' },
            { title: 'Full Stack & Cloud Architecture', desc: 'Proficient in Python, FastAPI, Flask, Django, Node.js, React.js, Tailwind CSS, MongoDB, MySQL, and Docker.' },
            { title: 'IoT & Intelligent Automation', desc: 'Hands-on experience with ESP32 Mesh, LoRa communication, Smart Grid safety automation, and cloud logistics.' },
          ]).map((val, idx) => (
            <GlassCard key={idx} className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-slate-100">{val.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{val.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};
