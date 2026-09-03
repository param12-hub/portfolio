import React, { useState } from 'react';
import { useCommandPalette } from '../../context/CommandPaletteContext';
import { Terminal as TerminalIcon, X, CornerDownLeft } from 'lucide-react';

export const TerminalDrawer: React.FC = () => {
  const { isTerminalOpen, toggleTerminal } = useCommandPalette();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'welcome', output: 'Paramesh Rajuri CLI v1.0.0. Type "help" for available commands.' },
  ]);

  if (!isTerminalOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;

    let output = '';
    switch (command) {
      case 'help':
        output = 'Available commands: bio, skills, projects, contact, clear, exit';
        break;
      case 'bio':
        output = 'Paramesh Rajuri - AI Engineer, Agentic AI Developer & Full Stack Developer.';
        break;
      case 'skills':
        output = 'Primary Stack: Python, Agentic AI, LangChain, LangGraph, RAG, FastAPI, React.js, Node.js, MongoDB, Docker.';
        break;
      case 'projects':
        output = 'Top Projects: Pharmacy Inventory System, Lineman Safety Automation, IoT Train Monitoring System.';
        break;
      case 'contact':
        output = 'Email: parameshrajuri@gmail.com | LinkedIn: paramesh-rajuri-700394222 | Location: Hyderabad, India';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        toggleTerminal();
        return;
      default:
        output = `Command not recognized: "${command}". Type "help" for available commands.`;
    }

    setHistory(prev => [...prev, { cmd: input, output }]);
    setInput('');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 p-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono text-slate-300 font-semibold">paramesh-rajuri@portfolio-terminal:~</span>
          </div>
          <button onClick={toggleTerminal} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="font-mono text-xs text-slate-300 space-y-2 max-h-48 overflow-y-auto mb-3">
          {history.map((item, i) => (
            <div key={i}>
              <div className="text-emerald-400 flex items-center">
                <span className="mr-2">➜</span>
                <span className="text-slate-200">{item.cmd}</span>
              </div>
              <div className="text-slate-400 pl-4 mt-0.5 whitespace-pre-wrap">{item.output}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleCommand} className="flex items-center font-mono text-xs">
          <span className="text-emerald-400 mr-2">➜ ~</span>
          <input
            type="text"
            className="flex-1 bg-transparent text-slate-100 focus:outline-none placeholder-slate-600"
            placeholder="Type command ('help', 'bio', 'skills', 'clear')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <button type="submit" className="text-slate-500 hover:text-slate-300">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
