import React, { useState } from 'react';
import { Eye, Edit3, Check } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, label = 'Content (Markdown)' }) => {
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">{label}</label>
        <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-lg border border-white/10">
          <button
            type="button"
            onClick={() => setTab('write')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              tab === 'write' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Edit3 className="w-3 h-3" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('preview')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              tab === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {tab === 'write' ? (
        <textarea
          rows={10}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your markdown content here... # Heading 1, **bold**, `code snippets`"
          className="w-full p-4 bg-slate-900/60 border border-white/10 rounded-xl text-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-500 leading-relaxed"
        />
      ) : (
        <div className="min-h-[240px] p-6 bg-slate-900/80 border border-white/10 rounded-xl prose prose-invert max-w-none text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
          {value || <span className="text-slate-500 italic">Nothing to preview...</span>}
        </div>
      )}
    </div>
  );
};
