import React from 'react';
import { 
  MessageSquare, 
  Cpu, 
  Mic2, 
  Clock, 
  Download, 
  ShieldAlert, 
  Sliders,
  Terminal,
  Smartphone,
  Laptop,
  HardDrive,
  BarChart3,
  Home
} from 'lucide-react';
import { PersonaType, SystemStatus } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  persona: PersonaType;
  setPersona: (p: PersonaType) => void;
  systemStatus: SystemStatus;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  persona,
  setPersona,
  systemStatus
}) => {
  return (
    <aside className="w-72 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800 shadow-2xl">
      {/* App Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Cpu className="w-6 h-6 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Serwis Pogotowie
          </h1>
          <p className="text-[11px] text-cyan-400 font-medium">Rafał Jarosz</p>
        </div>
      </div>

      {/* Persona Switcher */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/50">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Tryb Asystenta (Persona)
        </label>
        <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setPersona('doctor')}
            className={`px-2 py-1.5 rounded text-xs font-medium transition ${
              persona === 'doctor'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Doktor AI (PhD ekspert, mądry, dba o zdrowie i komputer)"
          >
            Doktor AI
          </button>
          <button
            onClick={() => setPersona('teen')}
            className={`px-2 py-1.5 rounded text-xs font-medium transition ${
              persona === 'teen'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="15-latek (Szybki kumpel, luźny vibe)"
          >
            15-latek
          </button>
          <button
            onClick={() => setPersona('commander')}
            className={`px-2 py-1.5 rounded text-xs font-medium transition ${
              persona === 'commander'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Commander (Pełna kontrola systemowa)"
          >
            Commander
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <button
          onClick={() => setActiveTab('chat')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
            activeTab === 'chat'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>Rozmowa Mowa & Pisanie</span>
        </button>

        <button
          onClick={() => setActiveTab('pc_control')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
            activeTab === 'pc_control'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-5 h-5" />
          <span>Panel Kontroli PC</span>
        </button>

        <button
          onClick={() => setActiveTab('voice_studio')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
            activeTab === 'voice_studio'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
          }`}
        >
          <Mic2 className="w-5 h-5" />
          <span>Konfiguracja Głosu</span>
        </button>

        <button
          onClick={() => setActiveTab('routines')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
            activeTab === 'routines'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span>Uruchomienie & Samopoczucie</span>
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
            activeTab === 'backup'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
          }`}
        >
          <HardDrive className="w-5 h-5" />
          <span>Kopia Zapasowa (Backup)</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
            activeTab === 'analytics'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Statystyki & Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('smart_home')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
            activeTab === 'smart_home'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Google Smart Home (IoT)</span>
        </button>

        <button
          onClick={() => setActiveTab('installer')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
            activeTab === 'installer'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
          }`}
        >
          <Download className="w-5 h-5" />
          <span>Instalator PC (.exe) & Android</span>
        </button>
      </nav>

      {/* Quick System Bar */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/80 text-xs text-slate-400 space-y-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Agent w gotowości
          </span>
          <span className="text-cyan-400 font-mono">v2.5 PRO</span>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
          <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
            CPU: <span className="text-slate-200 font-mono">{systemStatus.cpuUsage}%</span>
          </div>
          <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
            RAM: <span className="text-slate-200 font-mono">{systemStatus.ramUsage}%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
