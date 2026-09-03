import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { AdminLayout } from '../components/layout/AdminLayout';
import { AnalyticsChart } from '../components/cms/AnalyticsChart';
import { GlassCard } from '../components/common/GlassCard';
import { MediaUploader } from '../components/cms/MediaUploader';
import { MarkdownEditor } from '../components/cms/MarkdownEditor';
import {
  FolderKanban, FileText, MessageSquare, Eye, Plus, Trash2, Code2, Briefcase, GraduationCap, Wrench, Image as ImageIcon, Award, Quote
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const location = useLocation();

  // Derive active section from route path
  const getSection = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes('/projects')) return 'projects';
    if (path.includes('/skills')) return 'skills';
    if (path.includes('/experience')) return 'experiences';
    if (path.includes('/education')) return 'education';
    if (path.includes('/services')) return 'services';
    if (path.includes('/blogs')) return 'blogs';
    if (path.includes('/gallery')) return 'gallery';
    if (path.includes('/certificates')) return 'certificates';
    if (path.includes('/testimonials')) return 'testimonials';
    if (path.includes('/messages')) return 'messages';
    return 'overview';
  };

  const activeSection = getSection();

  const { data: stats } = useQuery({ queryKey: ['stats'], queryFn: api.getDashboardStats });
  const { data: projects = [], refetch: refetchProjects } = useQuery({ queryKey: ['projects'], queryFn: api.getProjects });
  const { data: skills = [], refetch: refetchSkills } = useQuery({ queryKey: ['skills'], queryFn: api.getSkills });
  const { data: experiences = [], refetch: refetchExperiences } = useQuery({ queryKey: ['experiences'], queryFn: api.getExperiences });
  const { data: education = [], refetch: refetchEducation } = useQuery({ queryKey: ['education'], queryFn: api.getEducation });
  const { data: services = [], refetch: refetchServices } = useQuery({ queryKey: ['services'], queryFn: api.getServices });
  const { data: blogs = [], refetch: refetchBlogs } = useQuery({ queryKey: ['blogs'], queryFn: api.getBlogs });
  const { data: gallery = [], refetch: refetchGallery } = useQuery({ queryKey: ['gallery'], queryFn: api.getGallery });
  const { data: certificates = [], refetch: refetchCertificates } = useQuery({ queryKey: ['certificates'], queryFn: api.getCertificates });
  const { data: testimonials = [], refetch: refetchTestimonials } = useQuery({ queryKey: ['testimonials'], queryFn: api.getTestimonials });
  const { data: messages = [], refetch: refetchMessages } = useQuery({ queryKey: ['messages'], queryFn: api.getMessages });

  // Form Modals State
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [newProject, setNewProject] = useState({ title: '', tagline: '', description: '', content: '', category: 'Full-Stack', tags: 'React, TypeScript', thumbnail: '', githubUrl: '', liveUrl: '' });
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Frontend', proficiency: 90, level: 'Expert', color: '#6366f1' });
  const [newExp, setNewExp] = useState({ role: '', company: '', startDate: '2023', endDate: 'Present', description: '', achievements: 'Built micro-services' });
  const [newEdu, setNewEdu] = useState({ degree: '', institution: '', startDate: '2016', endDate: '2020', cgpa: '3.9', description: '' });
  const [newService, setNewService] = useState({ title: '', shortDesc: '', description: '', timeline: '2-4 weeks', priceRange: '$3,500' });
  const [newBlog, setNewBlog] = useState({ title: '', summary: '', content: '', category: 'Engineering', coverImage: '', readingTime: '5 min read' });
  const [newGallery, setNewGallery] = useState({ title: '', category: 'Workspaces', imageUrl: '', caption: '' });
  const [newCert, setNewCert] = useState({ title: '', issuer: '', issueDate: '2024', image: '', credentialUrl: '' });
  const [newTestimonial, setNewTestimonial] = useState({ name: '', role: '', company: '', quote: '', rating: 5, avatar: '' });

  // Generic Create Handler
  const handleCreate = async (type: string, payload: any, refetchFn: () => void) => {
    try {
      await api.createContent(type, payload);
      setShowAddForm(false);
      refetchFn();
    } catch (err: any) {
      alert(err.message || `Failed to add ${type}`);
    }
  };

  // Generic Delete Handler
  const handleDelete = async (type: string, id: string, refetchFn: () => void) => {
    if (confirm(`Are you sure you want to delete this item?`)) {
      await api.deleteContent(type, id);
      refetchFn();
    }
  };

  return (
    <AdminLayout title={`Portfolio Admin — ${activeSection.toUpperCase()}`}>
      <div className="space-y-8">

        {/* Section 1: Overview */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <GlassCard className="space-y-2">
                <span className="text-xs text-slate-400 font-mono">Total Projects</span>
                <p className="text-3xl font-extrabold text-slate-100">{stats?.totalProjects || projects.length}</p>
              </GlassCard>
              <GlassCard className="space-y-2">
                <span className="text-xs text-slate-400 font-mono">Articles Published</span>
                <p className="text-3xl font-extrabold text-indigo-400">{stats?.totalBlogs || blogs.length}</p>
              </GlassCard>
              <GlassCard className="space-y-2">
                <span className="text-xs text-slate-400 font-mono">Skills Indexed</span>
                <p className="text-3xl font-extrabold text-emerald-400">{skills.length}</p>
              </GlassCard>
              <GlassCard className="space-y-2">
                <span className="text-xs text-slate-400 font-mono">Contact Messages</span>
                <p className="text-3xl font-extrabold text-amber-400">{messages.length}</p>
              </GlassCard>
            </div>
            <AnalyticsChart data={stats?.pageviewsChart || []} />
          </div>
        )}

        {/* Section 2: Projects */}
        {activeSection === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100">Projects Collection ({projects.length})</h3>
              <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-indigo-600/30">
                <Plus className="w-4 h-4" /><span>Add Project</span>
              </button>
            </div>
            {showAddForm && (
              <GlassCard className="p-6 space-y-4 border-indigo-500/40">
                <h4 className="text-sm font-bold text-slate-100">Add New Project Specification</h4>
                <form onSubmit={(e) => { e.preventDefault(); handleCreate('projects', { ...newProject, slug: newProject.title.toLowerCase().replace(/ /g, '-'), tags: newProject.tags.split(',').map(t => t.trim()) }, refetchProjects); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                    <input type="text" placeholder="Tagline" value={newProject.tagline} onChange={e => setNewProject({...newProject, tagline: e.target.value})} className="p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                  </div>
                  <MediaUploader value={newProject.thumbnail} onChange={url => setNewProject({...newProject, thumbnail: url})} label="Thumbnail" />
                  <textarea rows={3} placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                  <MarkdownEditor value={newProject.content} onChange={val => setNewProject({...newProject, content: val})} label="Case Study Markdown" />
                  <div className="flex justify-end gap-3"><button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl">Cancel</button><button type="submit" className="px-5 py-2 bg-indigo-600 text-xs rounded-xl font-semibold text-white">Save</button></div>
                </form>
              </GlassCard>
            )}
            <div className="space-y-3">
              {projects.map(p => (
                <GlassCard key={p._id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img src={p.thumbnail} alt={p.title} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                    <div><h4 className="text-sm font-bold text-slate-100">{p.title}</h4><span className="text-[10px] font-mono text-indigo-400">{p.category}</span></div>
                  </div>
                  <button onClick={() => handleDelete('projects', p._id, refetchProjects)} className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Skills */}
        {activeSection === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100">Skills Collection ({skills.length})</h3>
              <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-indigo-600/30">
                <Plus className="w-4 h-4" /><span>Add Skill</span>
              </button>
            </div>
            {showAddForm && (
              <GlassCard className="p-6 space-y-4 border-indigo-500/40">
                <h4 className="text-sm font-bold text-slate-100">Add New Skill</h4>
                <form onSubmit={(e) => { e.preventDefault(); handleCreate('skills', newSkill, refetchSkills); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Skill Name (e.g. React 19)" value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} className="p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                    <select value={newSkill.category} onChange={e => setNewSkill({...newSkill, category: e.target.value})} className="p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100">
                      <option value="Frontend">Frontend</option><option value="Backend">Backend</option><option value="Database">Database</option><option value="DevOps">DevOps</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Proficiency % ({newSkill.proficiency}%)</label>
                      <input type="range" min="10" max="100" value={newSkill.proficiency} onChange={e => setNewSkill({...newSkill, proficiency: Number(e.target.value)})} className="w-full" />
                    </div>
                    <input type="color" value={newSkill.color} onChange={e => setNewSkill({...newSkill, color: e.target.value})} className="h-10 w-full bg-slate-900 border border-white/10 rounded-xl cursor-pointer" />
                  </div>
                  <div className="flex justify-end gap-3"><button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl">Cancel</button><button type="submit" className="px-5 py-2 bg-indigo-600 text-xs rounded-xl font-semibold text-white">Save Skill</button></div>
                </form>
              </GlassCard>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map(s => (
                <GlassCard key={s._id} className="p-4 flex items-center justify-between">
                  <div><h4 className="text-sm font-bold text-slate-100">{s.name}</h4><span className="text-[10px] font-mono text-indigo-400">{s.category} • {s.proficiency}%</span></div>
                  <button onClick={() => handleDelete('skills', s._id, refetchSkills)} className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: Experience */}
        {activeSection === 'experiences' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100">Work Experience Collection ({experiences.length})</h3>
              <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-indigo-600/30">
                <Plus className="w-4 h-4" /><span>Add Experience</span>
              </button>
            </div>
            {showAddForm && (
              <GlassCard className="p-6 space-y-4 border-indigo-500/40">
                <h4 className="text-sm font-bold text-slate-100">Add New Work Experience</h4>
                <form onSubmit={(e) => { e.preventDefault(); handleCreate('experiences', { ...newExp, achievements: newExp.achievements.split('\n'), skills: ['React', 'Node.js'] }, refetchExperiences); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Role (e.g. Senior Architect)" value={newExp.role} onChange={e => setNewExp({...newExp, role: e.target.value})} className="p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                    <input type="text" placeholder="Company Name" value={newExp.company} onChange={e => setNewExp({...newExp, company: e.target.value})} className="p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Start Date (2023)" value={newExp.startDate} onChange={e => setNewExp({...newExp, startDate: e.target.value})} className="p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                    <input type="text" placeholder="End Date (Present)" value={newExp.endDate} onChange={e => setNewExp({...newExp, endDate: e.target.value})} className="p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                  </div>
                  <textarea rows={2} placeholder="Role Overview Description" value={newExp.description} onChange={e => setNewExp({...newExp, description: e.target.value})} className="w-full p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                  <textarea rows={3} placeholder="Key Achievements (one per line)" value={newExp.achievements} onChange={e => setNewExp({...newExp, achievements: e.target.value})} className="w-full p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" />
                  <div className="flex justify-end gap-3"><button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl">Cancel</button><button type="submit" className="px-5 py-2 bg-indigo-600 text-xs rounded-xl font-semibold text-white">Save Experience</button></div>
                </form>
              </GlassCard>
            )}
            <div className="space-y-3">
              {experiences.map(e => (
                <GlassCard key={e._id} className="p-4 flex items-center justify-between">
                  <div><h4 className="text-sm font-bold text-slate-100">{e.role} @ {e.company}</h4><span className="text-[10px] font-mono text-indigo-400">{e.startDate} - {e.endDate}</span></div>
                  <button onClick={() => handleDelete('experiences', e._id, refetchExperiences)} className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: Services */}
        {activeSection === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100">Services Collection ({services.length})</h3>
              <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-indigo-600/30">
                <Plus className="w-4 h-4" /><span>Add Service</span>
              </button>
            </div>
            {showAddForm && (
              <GlassCard className="p-6 space-y-4 border-indigo-500/40">
                <h4 className="text-sm font-bold text-slate-100">Add New Service</h4>
                <form onSubmit={(e) => { e.preventDefault(); handleCreate('services', { ...newService, features: ['Type-safe', 'Performant'] }, refetchServices); }} className="space-y-4">
                  <input type="text" placeholder="Service Title" value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} className="w-full p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                  <input type="text" placeholder="Short Description" value={newService.shortDesc} onChange={e => setNewService({...newService, shortDesc: e.target.value})} className="w-full p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                  <textarea rows={3} placeholder="Full Service Description" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} className="w-full p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                  <div className="flex justify-end gap-3"><button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl">Cancel</button><button type="submit" className="px-5 py-2 bg-indigo-600 text-xs rounded-xl font-semibold text-white">Save Service</button></div>
                </form>
              </GlassCard>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map(s => (
                <GlassCard key={s._id} className="p-4 flex items-center justify-between">
                  <div><h4 className="text-sm font-bold text-slate-100">{s.title}</h4><span className="text-[10px] font-mono text-indigo-400">{s.timeline} • {s.priceRange}</span></div>
                  <button onClick={() => handleDelete('services', s._id, refetchServices)} className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Section 6: Blogs */}
        {activeSection === 'blogs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100">Articles Collection ({blogs.length})</h3>
              <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-indigo-600/30">
                <Plus className="w-4 h-4" /><span>Add Article</span>
              </button>
            </div>
            {showAddForm && (
              <GlassCard className="p-6 space-y-4 border-indigo-500/40">
                <h4 className="text-sm font-bold text-slate-100">Add New Blog Post</h4>
                <form onSubmit={(e) => { e.preventDefault(); handleCreate('blogs', { ...newBlog, slug: newBlog.title.toLowerCase().replace(/ /g, '-') }, refetchBlogs); }} className="space-y-4">
                  <input type="text" placeholder="Article Title" value={newBlog.title} onChange={e => setNewBlog({...newBlog, title: e.target.value})} className="w-full p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                  <MediaUploader value={newBlog.coverImage} onChange={url => setNewBlog({...newBlog, coverImage: url})} label="Cover Image" />
                  <textarea rows={2} placeholder="Article Summary" value={newBlog.summary} onChange={e => setNewBlog({...newBlog, summary: e.target.value})} className="w-full p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                  <MarkdownEditor value={newBlog.content} onChange={val => setNewBlog({...newBlog, content: val})} label="Full Markdown Content" />
                  <div className="flex justify-end gap-3"><button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl">Cancel</button><button type="submit" className="px-5 py-2 bg-indigo-600 text-xs rounded-xl font-semibold text-white">Publish Article</button></div>
                </form>
              </GlassCard>
            )}
            <div className="space-y-3">
              {blogs.map(b => (
                <GlassCard key={b._id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img src={b.coverImage} alt={b.title} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                    <div><h4 className="text-sm font-bold text-slate-100">{b.title}</h4><span className="text-[10px] font-mono text-indigo-400">{b.category} • {b.readingTime}</span></div>
                  </div>
                  <button onClick={() => handleDelete('blogs', b._id, refetchBlogs)} className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Section 7: Gallery */}
        {activeSection === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100">Gallery Collection ({gallery.length})</h3>
              <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-indigo-600/30">
                <Plus className="w-4 h-4" /><span>Add Gallery Photo</span>
              </button>
            </div>
            {showAddForm && (
              <GlassCard className="p-6 space-y-4 border-indigo-500/40">
                <h4 className="text-sm font-bold text-slate-100">Add Gallery Image</h4>
                <form onSubmit={(e) => { e.preventDefault(); handleCreate('gallery', newGallery, refetchGallery); }} className="space-y-4">
                  <input type="text" placeholder="Title" value={newGallery.title} onChange={e => setNewGallery({...newGallery, title: e.target.value})} className="w-full p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                  <MediaUploader value={newGallery.imageUrl} onChange={url => setNewGallery({...newGallery, imageUrl: url})} label="Photo Upload" />
                  <input type="text" placeholder="Caption" value={newGallery.caption} onChange={e => setNewGallery({...newGallery, caption: e.target.value})} className="w-full p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" />
                  <div className="flex justify-end gap-3"><button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl">Cancel</button><button type="submit" className="px-5 py-2 bg-indigo-600 text-xs rounded-xl font-semibold text-white">Save Image</button></div>
                </form>
              </GlassCard>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {gallery.map(g => (
                <GlassCard key={g._id} className="p-3 space-y-2">
                  <img src={g.imageUrl} alt={g.title} className="w-full h-32 object-cover rounded-xl border border-white/10" />
                  <div className="flex justify-between items-center"><h4 className="text-xs font-bold text-slate-100 truncate">{g.title}</h4><button onClick={() => handleDelete('gallery', g._id, refetchGallery)} className="text-rose-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button></div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Section 8: Certificates */}
        {activeSection === 'certificates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100">Certificates Collection ({certificates.length})</h3>
              <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-indigo-600/30">
                <Plus className="w-4 h-4" /><span>Add Certificate</span>
              </button>
            </div>
            {showAddForm && (
              <GlassCard className="p-6 space-y-4 border-indigo-500/40">
                <h4 className="text-sm font-bold text-slate-100">Add Certificate</h4>
                <form onSubmit={(e) => { e.preventDefault(); handleCreate('certificates', newCert, refetchCertificates); }} className="space-y-4">
                  <input type="text" placeholder="Title" value={newCert.title} onChange={e => setNewCert({...newCert, title: e.target.value})} className="w-full p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                  <input type="text" placeholder="Issuer (AWS, MongoDB)" value={newCert.issuer} onChange={e => setNewCert({...newCert, issuer: e.target.value})} className="w-full p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                  <MediaUploader value={newCert.image} onChange={url => setNewCert({...newCert, image: url})} label="Badge Image" />
                  <div className="flex justify-end gap-3"><button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl">Cancel</button><button type="submit" className="px-5 py-2 bg-indigo-600 text-xs rounded-xl font-semibold text-white">Save Certificate</button></div>
                </form>
              </GlassCard>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificates.map(c => (
                <GlassCard key={c._id} className="p-4 flex items-center justify-between">
                  <div><h4 className="text-sm font-bold text-slate-100">{c.title}</h4><span className="text-[10px] font-mono text-indigo-400">{c.issuer}</span></div>
                  <button onClick={() => handleDelete('certificates', c._id, refetchCertificates)} className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Section 9: Testimonials */}
        {activeSection === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100">Testimonials Collection ({testimonials.length})</h3>
              <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-indigo-600/30">
                <Plus className="w-4 h-4" /><span>Add Testimonial</span>
              </button>
            </div>
            {showAddForm && (
              <GlassCard className="p-6 space-y-4 border-indigo-500/40">
                <h4 className="text-sm font-bold text-slate-100">Add Testimonial</h4>
                <form onSubmit={(e) => { e.preventDefault(); handleCreate('testimonials', newTestimonial, refetchTestimonials); }} className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <input type="text" placeholder="Name" value={newTestimonial.name} onChange={e => setNewTestimonial({...newTestimonial, name: e.target.value})} className="p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                    <input type="text" placeholder="Role" value={newTestimonial.role} onChange={e => setNewTestimonial({...newTestimonial, role: e.target.value})} className="p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                    <input type="text" placeholder="Company" value={newTestimonial.company} onChange={e => setNewTestimonial({...newTestimonial, company: e.target.value})} className="p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                  </div>
                  <textarea rows={3} placeholder="Quote" value={newTestimonial.quote} onChange={e => setNewTestimonial({...newTestimonial, quote: e.target.value})} className="w-full p-3 bg-slate-900 border border-white/10 rounded-xl text-xs text-slate-100" required />
                  <div className="flex justify-end gap-3"><button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-xl">Cancel</button><button type="submit" className="px-5 py-2 bg-indigo-600 text-xs rounded-xl font-semibold text-white">Save Testimonial</button></div>
                </form>
              </GlassCard>
            )}
            <div className="space-y-3">
              {testimonials.map(t => (
                <GlassCard key={t._id} className="p-4 flex items-center justify-between">
                  <div><h4 className="text-sm font-bold text-slate-100">{t.name} ({t.role} @ {t.company})</h4><p className="text-xs text-slate-400 italic">"{t.quote}"</p></div>
                  <button onClick={() => handleDelete('testimonials', t._id, refetchTestimonials)} className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Section 10: Messages */}
        {activeSection === 'messages' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-100">Received Contact Inquiries ({messages.length})</h3>
            <div className="space-y-3">
              {messages.map(m => (
                <GlassCard key={m._id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">{m.name} ({m.email})</h4>
                      <span className="text-[10px] text-indigo-400 font-mono">{m.subject || 'Inquiry'}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{new Date(m.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-white/5 whitespace-pre-wrap">{m.message}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
