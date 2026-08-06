import React, { useState } from 'react';
import { Clock, Smile, Sun, CheckCircle, Bell, Play, ShieldAlert } from 'lucide-react';
import { SystemStatus } from '../types';

interface StartupRoutinesProps {
  systemStatus: SystemStatus;
  setSystemStatus: React.Dispatch<React.SetStateAction<SystemStatus>>;
}

export const StartupRoutines: React.FC<StartupRoutinesProps> = ({ systemStatus, setSystemStatus }) => {
  const [greetingMessage, setGreetingMessage] = useState("Dzień dobry! Cieszę się, że uruchomiłeś komputer. Jak się dzisiaj czujesz?");
  const [moodCheckedToday, setMoodCheckedToday] = useState(false);
  const [userMood, setUserMood] = useState<string | null>(null);
  const [startupAppsEnabled, setStartupAppsEnabled] = useState(true);

  const handleMoodSelect = (mood: string) => {
    setUserMood(mood);
    setMoodCheckedToday(true);
    setSystemStatus(prev => ({ ...prev, lastMoodCheck: new Date().toLocaleTimeString() }));
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Uruchomienie Komputera & Samopoczucie</h2>
          <p className="text-sm text-slate-400">Konfiguracja zadań startowych, powitań i codziennych pytań o zdrowie i nastrój.</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded-lg text-xs font-medium">
          <Sun className="w-4 h-4" /> Automatyczny Start
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Startup Greeting & Mood Check Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg space-y-5">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Smile className="w-4 h-4 text-cyan-400" /> Poranne Pytanie o Samopoczucie
          </h3>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="text-xs text-cyan-400 font-medium">Komunikat asystenta przy starcie Windows / Androida:</div>
            <div className="text-sm italic text-slate-200">"{greetingMessage}"</div>
          </div>

          {!moodCheckedToday ? (
            <div className="space-y-3">
              <label className="text-xs text-slate-400 font-medium block">Jak się dzisiaj czujesz?</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleMoodSelect('Świetnie i pełen energii! 🚀')}
                  className="bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 p-3 rounded-xl text-center transition"
                >
                  <div className="text-2xl mb-1">🚀</div>
                  <div className="text-xs font-medium text-slate-200">Świetnie</div>
                </button>
                <button
                  onClick={() => handleMoodSelect('Normalnie, spokój i skupienie 😌')}
                  className="bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 p-3 rounded-xl text-center transition"
                >
                  <div className="text-2xl mb-1">😌</div>
                  <div className="text-xs font-medium text-slate-200">Spokojnie</div>
                </button>
                <button
                  onClick={() => handleMoodSelect('Zmęczony, potrzebuję relaksu ☕')}
                  className="bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 p-3 rounded-xl text-center transition"
                >
                  <div className="text-2xl mb-1">☕</div>
                  <div className="text-xs font-medium text-slate-200">Zmęczony</div>
                </button>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Opcjonalna refleksja dnia (Daily Reflection)</label>
                <input
                  type="text"
                  placeholder="np. Plan na dziś: naprawić laptopa klienta, zrobić backup..."
                  id="daily-reflection-input"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-xl flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-cyan-400 shrink-0" />
              <div>
                <div className="text-sm font-semibold text-cyan-300">Zarejestrowano samopoczucie!</div>
                <div className="text-xs text-slate-300">Twój wybór: "{userMood}". Asystent dostosuje ton i playlisty na dziś.</div>
              </div>
            </div>
          )}
        </div>

        {/* Startup Tasks Configuration */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg space-y-5">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" /> Automatyzacje Przy Starcie Systemu
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <div className="text-sm font-medium text-slate-200">Uruchom asystenta ze startem PC</div>
                <div className="text-xs text-slate-400">Automatyczne włączenie agenta po zalogowaniu do systemu</div>
              </div>
              <input
                type="checkbox"
                checked={startupAppsEnabled}
                onChange={(e) => setStartupAppsEnabled(e.target.checked)}
                className="w-5 h-5 accent-cyan-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <div className="text-sm font-medium text-slate-200">Sprawdzanie stanu RAM / CPU</div>
                <div className="text-xs text-slate-400">Automatyczny skan procesów w tle</div>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 accent-cyan-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <div className="text-sm font-medium text-slate-200">Powitanie głosowe i powiadomienia</div>
                <div className="text-xs text-slate-400">Lektor czyta plan dnia przy pierwszym uruchomieniu</div>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
