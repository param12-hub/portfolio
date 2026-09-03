import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommandPalette } from '../../context/CommandPaletteContext';
import { useTheme } from '../../context/ThemeContext';
import { Search, Home, User, Briefcase, Code, Award, BookOpen, Mail, Terminal, Sun, Moon, X } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { isOpen, closePalette, toggleTerminal } = useCommandPalette();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const actions = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'About & Journey', icon: User, path: '/about' },
    { name: 'Skills & Tech Stack', icon: Code, path: '/skills' },
    { name: 'Projects & Case Studies', icon: Briefcase, path: '/projects' },
    { name: 'Certifications', icon: Award, path: '/certifications' },
    { name: 'Blog & Insights', icon: BookOpen, path: '/blog' },
    { name: 'Contact & Hire', icon: Mail, path: '/contact' },
    { name: 'Open Developer Terminal (`)', icon: Terminal, action: () => { closePalette(); toggleTerminal(); } },
    { name: `Toggle ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, icon: theme === 'dark' ? Sun : Moon, action: () => { toggleTheme(); closePalette(); } },
  ];

  const filtered = actions.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (item: typeof actions[0]) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
      closePalette();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-xl glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 border-b border-white/10">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            placeholder="Type a command or search sections... (Esc to close)"
            className="w-full py-4 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button onClick={closePalette} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-sm">No results found for "{query}"</div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center px-4 py-3 rounded-xl text-left text-slate-300 hover:text-white hover:bg-indigo-600/20 hover:border hover:border-indigo-500/30 transition-all group"
                >
                  <Icon className="w-5 h-5 mr-3 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                  <span className="font-medium text-sm">{item.name}</span>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 bg-slate-900/60 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
          <span>Navigation Shortcut</span>
          <span><kbd className="px-2 py-0.5 bg-slate-800 rounded text-slate-300">Ctrl</kbd> + <kbd className="px-2 py-0.5 bg-slate-800 rounded text-slate-300">K</kbd></span>
        </div>
      </div>
    </div>
  );
};
