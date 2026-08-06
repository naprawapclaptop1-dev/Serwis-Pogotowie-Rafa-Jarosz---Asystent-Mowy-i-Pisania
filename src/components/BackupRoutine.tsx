import React, { useState } from 'react';
import { HardDrive, FolderSync, ShieldCheck, CheckCircle, Clock, Play, AlertCircle } from 'lucide-react';
import { BackupConfig } from '../types';

interface BackupRoutineProps {
  backupConfig: BackupConfig;
  setBackupConfig: React.Dispatch<React.SetStateAction<BackupConfig>>;
}

export const BackupRoutine: React.FC<BackupRoutineProps> = ({ backupConfig, setBackupConfig }) => {
  const [backingUp, setBackingUp] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const runBackupNow = () => {
    setBackingUp(true);
    setSuccessMsg(null);
    setTimeout(() => {
      setBackingUp(false);
      const now = new Date().toLocaleString();
      setBackupConfig(prev => ({ ...prev, lastBackup: now }));
      setSuccessMsg(`Pomyślnie wykonano kopię zapasową do folderu: ${backupConfig.targetFolder} (${now})`);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Kopia Zapasowa (Backup Routine)</h2>
          <p className="text-sm text-slate-400">Automatyczne tworzenie kopii zapasowych najważniejszych plików i dokumentów przy uruchomieniu systemu lub według harmonogramu.</p>
        </div>
        <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-3 py-1.5 rounded-lg text-xs font-medium">
          <FolderSync className="w-4 h-4" /> Serwis Rafał Jarosz
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Configuration Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg space-y-5">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-cyan-400" /> Ustawienia Kopii Zapasowej
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <div className="text-sm font-medium text-slate-200">Włącz automatyczny backup</div>
                <div className="text-xs text-slate-400">Skanuj i kopiuj pliki zgodnie z harmonogramem</div>
              </div>
              <input
                type="checkbox"
                checked={backupConfig.enabled}
                onChange={(e) => setBackupConfig({ ...backupConfig, enabled: e.target.checked })}
                className="w-5 h-5 accent-cyan-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1.5">Docelowy folder backupu</label>
              <input
                type="text"
                value={backupConfig.targetFolder}
                onChange={(e) => setBackupConfig({ ...backupConfig, targetFolder: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1.5">Częstotliwość</label>
              <select
                value={backupConfig.frequency}
                onChange={(e) => setBackupConfig({ ...backupConfig, frequency: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              >
                <option value="startup">Przy każdym uruchomieniu komputera (Startup Routine)</option>
                <option value="daily">Codziennie o północy</option>
                <option value="weekly">Co tydzień w niedzielę</option>
              </select>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs text-slate-400 font-medium block">Katalogi objęte kopią</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={backupConfig.includeDocuments}
                    onChange={(e) => setBackupConfig({ ...backupConfig, includeDocuments: e.target.checked })}
                    className="accent-cyan-500"
                  />
                  Dokumenty (/Documents)
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={backupConfig.includeDesktop}
                    onChange={(e) => setBackupConfig({ ...backupConfig, includeDesktop: e.target.checked })}
                    className="accent-cyan-500"
                  />
                  Pulpit (/Desktop)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Execution & Status Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" /> Status i Uruchomienie Ręczne
            </h3>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Ostatnia pomyślna kopia zapasowa:</div>
              <div className="text-sm font-mono text-cyan-400 font-medium">
                {backupConfig.lastBackup || "Brak zapisanych kopii w tej sesji"}
              </div>
            </div>

            {successMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs text-emerald-300 leading-relaxed">{successMsg}</div>
              </div>
            )}
          </div>

          <button
            onClick={runBackupNow}
            disabled={backingUp}
            className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition disabled:opacity-50 text-sm"
          >
            {backingUp ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Tworzenie kopii zapasowej...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Wymuś Backup Teraz
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
