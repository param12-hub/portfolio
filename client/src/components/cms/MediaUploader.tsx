import React, { useState } from 'react';
import { Upload, X, Check, Image as ImageIcon } from 'lucide-react';
import { getAuthToken } from '../../lib/api';

interface MediaUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({ value, onChange, label = 'Upload Image' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = getAuthToken();
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');

      onChange(data.data.url);
    } catch (err: any) {
      setError(err.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">{label}</label>
      {value ? (
        <div className="relative group w-full h-44 rounded-xl overflow-hidden border border-white/10 glass-panel">
          <img src={value} alt="Uploaded preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <div className="animate-spin w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full mb-2" />
            ) : (
              <Upload className="w-7 h-7 text-slate-400 mb-2 group-hover:text-indigo-400" />
            )}
            <p className="text-xs text-slate-300 font-medium">{uploading ? 'Uploading to Cloudinary...' : 'Click or drag & drop image'}</p>
            <p className="text-[10px] text-slate-500 mt-1">PNG, JPG, WebP up to 10MB</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        </label>
      )}

      {/* Manual URL input option */}
      <input
        type="text"
        placeholder="Or paste image URL directly..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-slate-900/60 border border-white/10 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
      />

      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
};
