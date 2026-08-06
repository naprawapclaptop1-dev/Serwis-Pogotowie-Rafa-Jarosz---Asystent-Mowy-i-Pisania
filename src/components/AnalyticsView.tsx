import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Legend } from 'recharts';
import { Activity, Smile, Cpu, HardDrive, Sparkles, Download } from 'lucide-react';
import { AnalyticsRecord } from '../types';

interface AnalyticsViewProps {
  analyticsData: AnalyticsRecord[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ analyticsData }) => {
  const exportJsonReport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(analyticsData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "rafal_jarosz_analytics_report.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportCsvReport = () => {
    let csvContent = "data:text/csv;charset=utf-8,Dzien,Samopoczucie,CPU_Avg,RAM_Avg,Backupy\n";
    analyticsData.forEach(row => {
      csvContent += `${row.day},${row.moodScore},${row.cpuAvg},${row.ramAvg},${row.backupsCompleted}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "rafal_jarosz_analytics_report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Statystyki i Analityka (30 Dni)</h2>
          <p className="text-sm text-slate-400">Analiza samopoczucia użytkownika, obciążenia procesora oraz historii kopii zapasowych.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportJsonReport}
            className="bg-slate-900 hover:bg-slate-850 border border-slate-700 text-cyan-400 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition shadow"
          >
            <Download className="w-3.5 h-3.5" /> Eksportuj JSON
          </button>
          <button
            onClick={exportCsvReport}
            className="bg-slate-900 hover:bg-slate-850 border border-slate-700 text-indigo-400 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition shadow"
          >
            <Download className="w-3.5 h-3.5" /> Eksportuj CSV
          </button>
          <div className="hidden sm:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-2 rounded-xl text-xs font-medium">
            <Activity className="w-4 h-4" /> Serwis Rafał Jarosz
          </div>
        </div>
      </div>

      {/* AI Summary Banner */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-slate-900 border border-cyan-500/30 p-5 rounded-2xl shadow-xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
            Podsumowanie AI i Analiza Trendów Nastroju (30 Dni)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Analiza ostatnich 30 dni wskazuje na silną korelację między stabilnym obciążeniem komputera (średnio 18% CPU) a wysokim samopoczuciem użytkownika (średnio 4.4/5.0). W dniach o zwiększonej produktywności zauważono krótsze przerwy. 
            <strong className="text-cyan-400"> Propozycja AI:</strong> Zalecamy 10-minutową przerwę od ekranu co 2 godziny oraz włączenie wieczornego trybu głosu dla lepszej regeneracji przed snem.
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Średnie Samopoczucie</div>
          <div className="text-2xl font-bold text-cyan-400">4.4 / 5.0</div>
          <div className="text-xs text-emerald-400 mt-1">↑ +0.3 w tym tygodniu</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Średnie Obciążenie CPU</div>
          <div className="text-2xl font-bold text-indigo-400">18.2%</div>
          <div className="text-xs text-slate-400 mt-1">Optymalny stan systemu</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Wykonane Backupy</div>
          <div className="text-2xl font-bold text-emerald-400">30 / 30</div>
          <div className="text-xs text-emerald-400 mt-1">100% skuteczności</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Status Licencji PC</div>
          <div className="text-2xl font-bold text-amber-400">Bez Limitu</div>
          <div className="text-xs text-slate-400 mt-1">Doktor AI & Commander</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mood & CPU Chart */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Smile className="w-4 h-4 text-cyan-400" /> Samopoczucie a Obciążenie CPU (Ostatnie dni)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
                <Area type="monotone" dataKey="moodScore" name="Samopoczucie (1-5)" stroke="#06b6d4" fillOpacity={1} fill="url(#colorMood)" />
                <Area type="monotone" dataKey="cpuAvg" name="CPU Średnie (%)" stroke="#6366f1" fillOpacity={1} fill="url(#colorCpu)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Backup & RAM Chart */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-400" /> Zużycie RAM i Wykonane Kopie
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="ramAvg" name="Zużycie RAM (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="backupsCompleted" name="Backupy" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
