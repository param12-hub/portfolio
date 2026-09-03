import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, FolderKanban, Code2, Briefcase, GraduationCap, Wrench,
  FileText, Image as ImageIcon, Award, Quote, MessageSquare, LogOut, Globe, Menu, X
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Projects', path: '/dashboard/projects', icon: FolderKanban },
    { label: 'Skills', path: '/dashboard/skills', icon: Code2 },
    { label: 'Experience', path: '/dashboard/experience', icon: Briefcase },
    { label: 'Education', path: '/dashboard/education', icon: GraduationCap },
    { label: 'Services', path: '/dashboard/services', icon: Wrench },
    { label: 'Articles & Blog', path: '/dashboard/blogs', icon: FileText },
    { label: 'Gallery', path: '/dashboard/gallery', icon: ImageIcon },
    { label: 'Certificates', path: '/dashboard/certificates', icon: Award },
    { label: 'Testimonials', path: '/dashboard/testimonials', icon: Quote },
    { label: 'Contact Messages', path: '/dashboard/messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between p-4 glass-nav border-b border-white/10 z-30">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
            CMS
          </div>
          <span className="font-bold text-slate-100 text-sm">Portfolio Admin</span>
        </Link>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-xl text-slate-300 glass-panel"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* CMS Sidebar */}
      <aside
        className={`w-64 glass-nav border-r border-white/10 flex flex-col justify-between z-40 transition-all duration-300 ${
          mobileSidebarOpen
            ? 'fixed inset-y-0 left-0 bg-slate-950/95 backdrop-blur-xl flex'
            : 'hidden md:flex'
        }`}
      >
        <div>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                CMS
              </div>
              <div>
                <h1 className="font-bold text-slate-100 text-sm">Portfolio Admin</h1>
                <span className="text-[10px] text-slate-400 font-mono">Control Center v1.0</span>
              </div>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-slate-400 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/dashboard'
                  ? location.pathname === '/dashboard'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-slate-950/80">
          <div className="flex items-center space-x-3 px-2 py-2">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt="Avatar"
              className="w-8 h-8 rounded-full border border-white/20 object-cover"
            />
            <div className="flex-1 truncate">
              <p className="text-xs font-semibold text-slate-200 truncate">{user?.name || 'Admin User'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email || 'admin@portfolio.dev'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex-1 flex items-center justify-center space-x-1 py-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white text-xs"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between glass-nav">
          <h2 className="text-lg font-bold text-slate-100">{title}</h2>
          <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
            <span>Logged in as: <strong className="text-indigo-400">{user?.role || 'superadmin'}</strong></span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
