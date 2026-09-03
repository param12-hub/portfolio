import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { GlassCard } from '../components/common/GlassCard';
import { Image as ImageIcon, X } from 'lucide-react';
import { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const { data: items = [] } = useQuery({ queryKey: ['gallery'], queryFn: api.getGallery });
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-12">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">BEHIND THE SCENES</span>
        <h1 className="text-4xl font-extrabold text-slate-100">Workspace & Keynotes Gallery</h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Snapshots from my engineering desk, speaking engagements, keynotes, and developer hackathons.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <GlassCard
            key={item._id}
            className="p-0 overflow-hidden cursor-pointer group"
          >
            <div
              onClick={() => setActiveLightbox(item)}
              className="relative h-64 overflow-hidden"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-[10px] font-mono text-indigo-300 uppercase">{item.category}</span>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-1 mt-1">{item.caption}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full glass-panel p-4 rounded-2xl space-y-4">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeLightbox.imageUrl}
              alt={activeLightbox.title}
              className="w-full max-h-[70vh] object-contain rounded-xl"
            />
            <div className="p-2">
              <span className="text-xs font-mono text-indigo-400 uppercase">{activeLightbox.category}</span>
              <h2 className="text-lg font-bold text-slate-100">{activeLightbox.title}</h2>
              <p className="text-xs text-slate-300 mt-1">{activeLightbox.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
