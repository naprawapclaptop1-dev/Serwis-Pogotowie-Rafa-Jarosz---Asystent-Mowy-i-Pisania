import React, { useState } from 'react';
import { 
  Terminal, 
  Power, 
  Volume2, 
  VolumeX, 
  Globe, 
  FileText, 
  Music, 
  ShieldCheck, 
  Cpu, 
  HardDrive, 
  Activity,
  CheckCircle,
  Play,
  AlertTriangle,
  Clock,
  Focus,
  Key,
  Lock,
  Plus,
  Search,
  Eye,
  EyeOff,
  Copy,
  Zap
} from 'lucide-react';
import { SystemStatus, VaultItem } from '../types';

interface PcControlHubProps {
  systemStatus: SystemStatus;
  setSystemStatus: React.Dispatch<React.SetStateAction<SystemStatus>>;
}

export const PcControlHub: React.FC<PcControlHubProps> = ({ systemStatus, setSystemStatus }) => {
  const [logs, setLogs] = useState<string[]>([
    "[Serwis Rafał Jarosz] Serwis Pogotowie PC Bridge zainicjalizowany pomyślnie.",
    "[Security] Tryb Doktor AI aktywny – pełne uprawnienia bez płatnych licencji.",
    "[Monitor] CPU stabilne na 14%, pamięć RAM 4.2 GB / 16 GB."
  ]);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);

  // Deep Focus State
  const [deepFocusActive, setDeepFocusActive] = useState(false);

  // Windows Event Log AI Diagnostics State
  const [analyzingLogs, setAnalyzingLogs] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<string | null>(null);

  // Vault State
  const [vaultItems, setVaultItems] = useState<VaultItem[]>([
    { id: '1', title: 'Panel Klienta Serwis', username: 'rafal_admin', encryptedPassword: '••••••••••••', category: 'Praca' },
    { id: '2', title: 'Konto Google / YouTube', username: 'naprawapclaptop1@gmail.com', encryptedPassword: '••••••••••••', category: 'Prywatne' }
  ]);
  const [showNewVaultModal, setShowNewVaultModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUser, setNewUser] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newCat, setNewCat] = useState('Praca');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  // Top 3 most used apps with time spent
  const topApps = [
    { name: 'Google Chrome', timeSpent: '4h 25m', usage: 65 },
    { name: 'Visual Studio Code', timeSpent: '2h 10m', usage: 45 },
    { name: 'Spotify Music', timeSpent: '1h 50m', usage: 30 }
  ];

  const [selectedAppStats, setSelectedAppStats] = useState<{
    name: string;
    totalTime: string;
    weeklyBreakdown: { day: string; hours: string; cpu: string; ram: string }[];
  } | null>(null);

  const handleSelectApp = (app: { name: string; timeSpent: string; usage: number }) => {
    const weeklyBreakdown = [
      { day: 'Poniedziałek', hours: '3h 15m', cpu: '18%', ram: '1.4 GB' },
      { day: 'Wtorek', hours: '4h 30m', cpu: '22%', ram: '1.8 GB' },
      { day: 'Środa', hours: '2h 45m', cpu: '15%', ram: '1.2 GB' },
      { day: 'Czwartek', hours: '5h 10m', cpu: '28%', ram: '2.1 GB' },
      { day: 'Piątek', hours: '3h 50m', cpu: '20%', ram: '1.6 GB' },
      { day: 'Sobota', hours: '1h 20m', cpu: '10%', ram: '0.9 GB' },
      { day: 'Niedziela', hours: '2h 00m', cpu: '12%', ram: '1.0 GB' },
    ];
    setSelectedAppStats({
      name: app.name,
      totalTime: app.timeSpent,
      weeklyBreakdown
    });
    addLog(`Wyświetlono szczegółowe statystyki tygodniowe dla aplikacji: ${app.name}`);
  };

  const isCpuHigh = systemStatus.cpuUsage > 80;

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 15)]);
  };

  const handleActionClick = (actionName: string, detail: string) => {
    addLog(`Wykonano komendę: ${actionName} (${detail})`);
    if (actionName === 'Włącz Chrome') {
      setSystemStatus(prev => ({ ...prev, activeApps: Array.from(new Set([...prev.activeApps, 'Google Chrome'])) }));
    } else if (actionName === 'Włącz Spotify') {
      setSystemStatus(prev => ({ ...prev, activeApps: Array.from(new Set([...prev.activeApps, 'Spotify Music'])) }));
    } else if (actionName === 'Zamknij aplikacje') {
      setSystemStatus(prev => ({ ...prev, activeApps: ['Serwis Rafał Jarosz Assistant'] }));
    }
  };

  const toggleDeepFocus = () => {
    const newState = !deepFocusActive;
    setDeepFocusActive(newState);
    if (newState) {
      setIsMuted(true);
      setSystemStatus(prev => ({
        ...prev,
        activeApps: ['Serwis Rafał Jarosz Assistant', 'Google Chrome']
      }));
      addLog("[Deep Focus] Aktywowano: powiadomienia wyciszone, aplikacje zredukowane do whitelist, Quiet Mode włączony.");
    } else {
      setIsMuted(false);
      addLog("[Deep Focus] Wyłączono tryb głębokiego skupienia.");
    }
  };

  const runAiEventLogDiagnostics = () => {
    setAnalyzingLogs(true);
    setDiagnosticResult(null);
    addLog("[AI Diagnostics] Skanowanie dzienników zdarzeń systemu Windows (Windows Event Logs)...");
    setTimeout(() => {
      setAnalyzingLogs(false);
      setDiagnosticResult("Analiza pomyślna: Wykryto 2 drobne ostrzeżenia sterownika karty graficznej (Event ID 4101). Rekomendacja AI: Automatyczne czyszczenie pamięci podręcznej Shader Cache i optymalizacja usługi WDDM. System działa stabilnie.");
      addLog("[AI Diagnostics] Zidentyfikowano zdarzenia krytyczne oraz zaproponowano automatyczne poprawki.");
    }, 2000);
  };

  const handleAddVaultItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUser || !newPass) return;
    const newItem: VaultItem = {
      id: Date.now().toString(),
      title: newTitle,
      username: newUser,
      encryptedPassword: newPass,
      category: newCat
    };
    setVaultItems(prev => [newItem, ...prev]);
    setNewTitle('');
    setNewUser('');
    setNewPass('');
    setShowNewVaultModal(false);
    addLog(`[Vault] Dodano bezpieczny wpis: ${newTitle} (zahasłowany)`);
  };

  const toggleReveal = (id: string) => {
    setRevealedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Panel Kontroli Komputera (PC Control Hub)</h2>
          <p className="text-sm text-slate-400">Zarządzaj procesami, głębokim skupieniem, dziennikami Windows oraz bezpiecznym sejfem haseł.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Deep Focus Toggle */}
          <button
            onClick={toggleDeepFocus}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition shadow ${
              deepFocusActive
                ? 'bg-indigo-600 text-white animate-pulse ring-2 ring-indigo-400/50'
                : 'bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-850'
            }`}
          >
            <Focus className="w-4 h-4" /> {deepFocusActive ? 'Deep Focus AKTYWNY' : 'Włącz Deep Focus'}
          </button>
          <div className="hidden sm:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-2 rounded-xl text-xs font-medium">
            <ShieldCheck className="w-4 h-4" /> Pełna Kontrola
          </div>
        </div>
      </div>

      {/* Hardware Health Alert & AI Diagnostics */}
      <div className="space-y-3">
        {isCpuHigh ? (
          <div className="bg-red-500/15 border border-red-500/40 p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-red-300">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 animate-bounce" />
              <div>
                <div className="font-semibold text-sm">Ostrzeżenie Hardware Health Alert: Wysokie obciążenie CPU ({systemStatus.cpuUsage}%)!</div>
                <div className="text-xs text-slate-300">Wykryto potencjalne anomalia w systemie. Uruchom AI Windows Event Log Diagnostics.</div>
              </div>
            </div>
            <button
              onClick={runAiEventLogDiagnostics}
              disabled={analyzingLogs}
              className="bg-red-600 hover:bg-red-500 text-white font-medium px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition shrink-0"
            >
              <Zap className="w-4 h-4" /> {analyzingLogs ? "Analizowanie Event Logs..." : "Uruchom AI Event Logs Diagnostics"}
            </button>
          </div>
        ) : (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3.5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-emerald-300">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs font-medium">Hardware Health Alert: Podzespoły w normie. Dzienniki Windows bez krytycznych błędów.</div>
            </div>
            <button
              onClick={runAiEventLogDiagnostics}
              disabled={analyzingLogs}
              className="bg-slate-900 hover:bg-slate-850 border border-slate-700 text-cyan-400 font-medium px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 transition shrink-0"
            >
              <Search className="w-4 h-4" /> {analyzingLogs ? "Skanowanie logów..." : "Skanuj Windows Event Logs"}
            </button>
          </div>
        )}

        {diagnosticResult && (
          <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-2xl space-y-2 text-xs text-cyan-200 animate-fadeIn">
            <div className="font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Raport AI Diagnostics & Windows Event Logs:
            </div>
            <p className="text-slate-300 leading-relaxed">{diagnosticResult}</p>
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Obciążenie CPU</span>
            <Cpu className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">{systemStatus.cpuUsage}%</div>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${systemStatus.cpuUsage}%` }}></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Pamięć RAM</span>
            <Activity className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">{systemStatus.ramUsage}%</div>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${systemStatus.ramUsage}%` }}></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Dysk SSD Wolne</span>
            <HardDrive className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">{systemStatus.diskFree}</div>
          <p className="text-xs text-slate-400 mt-2">Optymalizacja włączona</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Aktywne Appki</span>
            <Terminal className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">{systemStatus.activeApps.length}</div>
          <p className="text-xs text-slate-400 mt-2">{deepFocusActive ? 'Deep Focus (Whitelist)' : 'Pełny dostęp'}</p>
        </div>
      </div>

      {/* Secure Vault Module */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-400" /> Bezpieczny Sejf Haseł (Vault & AI Autofill)
          </h3>
          <button
            onClick={() => setShowNewVaultModal(true)}
            className="bg-slate-950 hover:bg-slate-850 border border-slate-700 text-amber-400 px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" /> Dodaj Hasło
          </button>
        </div>
        <p className="text-xs text-slate-400">
          Zarządzaj zaszyfrowanymi danymi logowania zintegrowanymi z asystentem AI dla bezpiecznego autouzupełniania (Autofill).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {vaultItems.map(item => (
            <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-sm font-medium text-slate-200">{item.title}</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-mono">{item.category}</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">Użytkownik: {item.username}</div>
                <div className="text-xs text-slate-500 font-mono">
                  Hasło: {revealedIds[item.id] ? "HasłoSkomplikowane123!" : "••••••••••••"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleReveal(item.id)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition"
                  title="Pokaż/Ukryj"
                >
                  {revealedIds[item.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    addLog(`[Vault Autofill] Wypełniono dane dla: ${item.title}`);
                    alert(`AI Autofill: Pomyślnie wklejono dane logowania dla "${item.title}" do aktywnej przeglądarki.`);
                  }}
                  className="bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-medium transition"
                >
                  Autofill AI
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Vault Item Modal */}
      {showNewVaultModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" /> Dodaj Nowy Wpis do Sejfu Haseł
            </h3>
            <form onSubmit={handleAddVaultItem} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Nazwa serwisu / aplikacji</label>
                <input
                  type="text"
                  required
                  placeholder="np. Panel Administratora"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Login / Email</label>
                <input
                  type="text"
                  required
                  placeholder="admin@serwis.pl"
                  value={newUser}
                  onChange={(e) => setNewUser(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Hasło</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Kategoria</label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                >
                  <option value="Praca">Praca</option>
                  <option value="Prywatne">Prywatne</option>
                  <option value="Finanse">Finanse</option>
                  <option value="Serwisy">Serwisy</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewVaultModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-xs font-medium transition"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-medium transition"
                >
                  Zapisz Zaszyfrowane
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Top 3 Apps & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top 3 Apps */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" /> Top 3 Aplikacje (Kliknij po szczegóły)
          </h3>
          <div className="space-y-3">
            {topApps.map((app, idx) => (
              <div 
                key={idx} 
                onClick={() => handleSelectApp(app)}
                className="bg-slate-950 p-3 rounded-xl border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition space-y-1.5 group"
              >
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-200 group-hover:text-cyan-300 transition">{idx + 1}. {app.name}</span>
                  <span className="text-cyan-400 font-mono">{app.timeSpent}</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full" style={{ width: `${app.usage}%` }}></div>
                </div>
                <div className="text-[10px] text-slate-400 text-right pt-0.5">Statystyki 7 dni ↗</div>
              </div>
            ))}
          </div>
        </div>

        {/* App Weekly Stats Modal */}
        {selectedAppStats && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{selectedAppStats.name}</h3>
                    <p className="text-xs text-slate-400">Szczegółowe statystyki czasu pracy (ostatni tydzień / 7 dni)</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAppStats(null)}
                  className="text-slate-400 hover:text-slate-200 p-2 rounded-xl bg-slate-950 border border-slate-800"
                >
                  ✕
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Łączny czas w tygodniu</div>
                  <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">{selectedAppStats.totalTime}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Status AI</div>
                  <div className="text-xs font-medium text-emerald-400 mt-1">Optymalny / Brak błędów</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Dzienny podział (7 dni):</div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {selectedAppStats.weeklyBreakdown.map((dayStat, dIdx) => (
                    <div key={dIdx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-200">{dayStat.day}</span>
                      <div className="flex items-center gap-4 font-mono">
                        <span className="text-slate-400">CPU: {dayStat.cpu}</span>
                        <span className="text-slate-400">RAM: {dayStat.ram}</span>
                        <span className="text-cyan-400 font-bold">{dayStat.hours}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedAppStats(null)}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-medium transition"
                >
                  Zamknij
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Full CPU, RAM, & Disk Control Bar */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Pełny Dostęp i Kontrola Zasobów (CPU / RAM / Dysk)
            </h3>
            <span className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded-lg font-mono">
              Tryb Administratora PC
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => {
                setSystemStatus(prev => ({ ...prev, cpuUsage: Math.floor(Math.random() * 25) + 12 }));
                addLog("[CPU Turbo] Zoptymalizowano częstotliwość procesora. Obciążenie zredukowane do poziomu optymalnego.");
              }}
              className="bg-slate-950 hover:bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-left transition flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-cyan-400" /> Pełna Moc CPU
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Optymalizuj wątki i cache</div>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-lg">Boost</span>
            </button>

            <button
              onClick={() => {
                setSystemStatus(prev => ({ ...prev, ramUsage: 35 }));
                addLog("[RAM Defrag] Zwolniono pamięć RAM. Aktualne zużycie: 35% (stabilne).");
              }}
              className="bg-slate-950 hover:bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-left transition flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-indigo-400" /> Czyszczenie RAM
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Zwolnij pamięć podręczną</div>
              </div>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-lg">Defrag</span>
            </button>

            <button
              onClick={() => {
                setSystemStatus(prev => ({ ...prev, diskFree: '340 GB wolnego' }));
                addLog("[Dysk SSD] Wyczyszczono pliki tymczasowe i Shader Cache. Zwolniono dodatkową przestrzeń dyskową.");
              }}
              className="bg-slate-950 hover:bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-left transition flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-emerald-400" /> Skan i Czyszczenie Dysku
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Usunięcie śmieci systemu</div>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">Skanuj</span>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Szybkie Akcje Systemowe</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleActionClick('Włącz Chrome', 'Uruchomiono przeglądarkę domyślną')}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition text-left group"
            >
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-200">Przeglądarka</div>
                <div className="text-xs text-slate-400">Otwórz Chrome</div>
              </div>
            </button>

            <button
              onClick={() => handleActionClick('Włącz Spotify', 'Uruchomiono odtwarzacz muzyki')}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition text-left group"
            >
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-200">Muzyka</div>
                <div className="text-xs text-slate-400">Spotify & Audio</div>
              </div>
            </button>

            <button
              onClick={() => handleActionClick('Notatnik', 'Otwarto edytor tekstowy')}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 transition text-left group"
            >
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-200">Notatnik</div>
                <div className="text-xs text-slate-400">Zapisywanie</div>
              </div>
            </button>

            <button
              onClick={() => {
                window.open('https://www.allegro.pl', '_blank');
                addLog("Otwarto zakładkę: Allegro.pl");
              }}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-orange-500/50 hover:bg-slate-900 transition text-left group"
            >
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 group-hover:scale-110 transition">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-200">Allegro</div>
                <div className="text-xs text-slate-400">Zakupy online</div>
              </div>
            </button>

            <button
              onClick={() => {
                window.open('https://www.aliexpress.com', '_blank');
                addLog("Otwarto zakładkę: AliExpress");
              }}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-500/50 hover:bg-slate-900 transition text-left group"
            >
              <div className="p-2 rounded-lg bg-red-500/10 text-red-400 group-hover:scale-110 transition">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-200">AliExpress</div>
                <div className="text-xs text-slate-400">Global Shopping</div>
              </div>
            </button>

            <button
              onClick={() => {
                window.open('https://www.amazon.pl', '_blank');
                addLog("Otwarto zakładkę: Amazon.pl");
              }}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-900 transition text-left group"
            >
              <div className="p-2 rounded-lg bg-amber-400/10 text-amber-300 group-hover:scale-110 transition">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-200">Amazon</div>
                <div className="text-xs text-slate-400">Amazon.pl</div>
              </div>
            </button>
          </div>

          {/* Volume Control */}
          <div className="pt-2 border-t border-slate-800 flex items-center gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-400 transition"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Głośność Systemowa</span>
                <span className="font-mono text-cyan-400">{isMuted ? 'Wyciszone' : `${volume}%`}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={isMuted ? 0 : volume} 
                onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Logs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" /> Logi Wykonawcze Komputera (.exe / .bat Bridge)
          </span>
          <button 
            onClick={() => setLogs(["[System] Wyczyszczeno logi."])}
            className="text-xs text-slate-500 hover:text-slate-300 transition"
          >
            Wyczyść
          </button>
        </div>
        <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs text-cyan-300 space-y-1.5 flex-1 overflow-y-auto border border-slate-850">
          {logs.map((log, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-slate-600">›</span>
              <span className={log.includes('Błąd') ? 'text-red-400' : 'text-slate-300'}>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
