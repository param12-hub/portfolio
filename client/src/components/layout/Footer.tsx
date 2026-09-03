import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Globe, Mail, ArrowUp, Heart, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resumeUrl = 'https://drive.google.com/file/d/1EBIVsDKCV9eVCIiPnVjen0yuVmWiaCM2/view?usp=sharing';

  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-white text-sm">
                  PR
                </div>
              </div>
              <span className="font-bold text-slate-100 text-lg">Paramesh Rajuri</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI Engineer & Full Stack Developer building Agentic AI systems, LLM applications, FastAPI, and scalable cloud solutions.
            </p>
            <div className="flex items-center space-x-3 pt-1">
              <a
                href="https://www.linkedin.com/in/paramesh-rajuri-700394222"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl glass-panel text-slate-400 hover:text-white hover:border-indigo-500/50"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://mavixverse.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl glass-panel text-slate-400 hover:text-white hover:border-indigo-500/50"
                title="Portfolio Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:parameshrajuri@gmail.com"
                className="p-2 rounded-xl glass-panel text-slate-400 hover:text-white hover:border-indigo-500/50"
                title="Email Me"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl glass-panel text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50"
                title="View Resume"
              >
                <FileText className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About & Journey</Link></li>
              <li><Link to="/skills" className="hover:text-indigo-400 transition-colors">Skills & Tech Stack</Link></li>
              <li><Link to="/projects" className="hover:text-indigo-400 transition-colors">Projects & Case Studies</Link></li>
              <li><Link to="/experience" className="hover:text-indigo-400 transition-colors">Work Experience</Link></li>
            </ul>
          </div>

          {/* Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/services" className="hover:text-indigo-400 transition-colors">Services Offered</Link></li>
              <li><Link to="/education" className="hover:text-indigo-400 transition-colors">Education & CGPA</Link></li>
              <li><Link to="/certifications" className="hover:text-indigo-400 transition-colors">Certifications</Link></li>
              <li><Link to="/resume" className="hover:text-indigo-400 transition-colors">Curriculum Vitae / Resume</Link></li>
              <li><Link to="/blog" className="hover:text-indigo-400 transition-colors">Articles & Blog</Link></li>
            </ul>
          </div>

          {/* Legal & Quick Action */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Legal & Admin</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/faq" className="hover:text-indigo-400 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Admin CMS Sign In</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-1">
            <span>© {new Date().getFullYear()} Paramesh Rajuri. Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>in React 19, TypeScript & Tailwind v4.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl glass-panel text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
