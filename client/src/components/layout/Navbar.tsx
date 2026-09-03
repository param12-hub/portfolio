import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useCommandPalette } from '../../context/CommandPaletteContext';
import { useAuth } from '../../context/AuthContext';
import {
  Sun, Moon, Command, Menu, X, FileText, LayoutDashboard, Terminal
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { openPalette, toggleTerminal } = useCommandPalette();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3 shadow-xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Animated Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-white text-lg">
              PR
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors tracking-tight text-base">
              Paramesh Rajuri
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider">AI & FULL STACK ENGINEER</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-1 glass-panel px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-indigo-600/30 border border-indigo-500/50 rounded-full -z-10 shadow-sm" />
                )}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center space-x-2">
          {/* Command Palette Trigger */}
          <button
            onClick={openPalette}
            className="p-2 rounded-xl text-slate-400 hover:text-white glass-panel-hover border border-white/10 text-xs flex items-center space-x-1.5 px-3"
            title="Command Palette (Ctrl+K)"
          >
            <Command className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-[11px]">Cmd+K</span>
          </button>

          {/* Terminal Drawer Trigger */}
          <button
            onClick={toggleTerminal}
            className="p-2 rounded-xl text-slate-400 hover:text-white glass-panel-hover border border-white/10"
            title="Developer CLI Terminal (`)"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-400 hover:text-white glass-panel-hover border border-white/10"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Resume PDF */}
          <Link
            to="/resume"
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/25 transition-all hover:scale-105 active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </Link>

          {/* Admin CMS Button (If Logged In) */}
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="p-2 rounded-xl bg-purple-600/30 border border-purple-500/50 text-purple-300 hover:text-white"
              title="Admin CMS Dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={openPalette}
            className="p-2 rounded-xl text-slate-400 glass-panel"
          >
            <Command className="w-4 h-4 text-indigo-400" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 glass-panel"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-panel border-b border-white/10 px-6 py-6 mt-3 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <Link
              to="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              <FileText className="w-4 h-4" />
              <span>Resume PDF</span>
            </Link>

            <div className="flex items-center space-x-2">
              <button onClick={toggleTheme} className="p-2 rounded-xl glass-panel text-amber-400">
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button onClick={toggleTerminal} className="p-2 rounded-xl glass-panel text-emerald-400">
                <Terminal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
