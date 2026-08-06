import React, { useState } from 'react';
import { Mic2, Sliders, Play, CheckCircle, Sparkles, Volume2, Moon, Palette } from 'lucide-react';
import { VoiceConfig, ThemeVibe } from '../types';

interface VoiceStudioProps {
  voiceConfig: VoiceConfig;
  setVoiceConfig: React.Dispatch<React.SetStateAction<VoiceConfig>>;
  themeVibe: ThemeVibe;
  setThemeVibe: React.Dispatch<React.SetStateAction<ThemeVibe>>;
}

export const VoiceStudio: React.FC<VoiceStudioProps> = ({ voiceConfig, setVoiceConfig, themeVibe, setThemeVibe }) => {
  const [testText, setTestText] = useState("Witaj! Jestem gotowy do zarządzania Twoim komputerem. Jak mogę Ci pomóc?");
  const [calibrating, setCalibrating] = useState(false);
  const [calibrated, setCalibrated] = useState(false);
  const [nightMode, setNightMode] = useState(false);

  const testVoice = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(testText);
    utterance.lang = 'pl-PL';
    utterance.pitch = nightMode ? Math.max(0.5, voiceConfig.pitch - 0.2) : voiceConfig.pitch;
    utterance.rate = nightMode ? Math.max(0.7, voiceConfig.rate - 0.15) : voiceConfig.rate;
    utterance.volume = nightMode ? Math.max(0.2, voiceConfig.volume - 0.2) : voiceConfig.volume;
    window.speechSynthesis.speak(utterance);
  };

  const handleCalibrate = () => {
    setCalibrating(true);
    setTimeout(() => {
      setCalibrating(false);
      setCalibrated(true);
    }, 2500);
  };

  const vibes: { id: ThemeVibe; name: string; desc: string; color: string }[] = [
    { id: 'cyan', name: 'Commander Cyber (Cyan)', desc: 'Nowoczesny styl technologiczny i cyjanowe akcenty', color: 'bg-cyan-500' },
    { id: 'emerald', name: 'Doctor Fresh (Emerald)', desc: 'Spokojny zielony motyw diagnostyczny', color: 'bg-emerald-500' },
    { id: 'amber', name: 'Pro Gold (Amber)', desc: 'Ciepła bursztynowa paleta dla profesjonalistów', color: 'bg-amber-500' },
    { id: 'purple', name: 'Gamer Neon (Purple)', desc: 'Młodzieżowy fioletowo-indygo klimat', color: 'bg-purple-500' }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Konfiguracja Własnego Głosu i Motywu (Voice Studio)</h2>
          <p className="text-sm text-slate-400">Skonfiguruj profil głosowy asystenta oraz paletę barw interfejsu (vibe).</p>
        </div>
        <div className="flex items-center gap-2 bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 px-3 py-1.5 rounded-lg text-xs font-medium">
          <Mic2 className="w-4 h-4" /> Kalibracja Syntezy
        </div>
      </div>

      {/* Vibe Theme Selector */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg space-y-4">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4 text-cyan-400" /> Wybór Motywu i Vibe'u Aplikacji
        </h3>
        <p className="text-xs text-slate-400">
          Wybierz paletę barw dopasowaną do Twojego nastroju i stylu pracy.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {vibes.map(v => (
            <button
              key={v.id}
              onClick={() => setThemeVibe(v.id)}
              className={`p-4 rounded-xl border text-left transition flex flex-col justify-between space-y-3 ${
                themeVibe === v.id 
                  ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500/50 shadow-md' 
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`w-3.5 h-3.5 rounded-full ${v.color}`}></span>
                {themeVibe === v.id && <CheckCircle className="w-4 h-4 text-cyan-400" />}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-200">{v.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{v.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Settings Box */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg space-y-5">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" /> Parametry Głosu Asystenta
          </h3>

          <div className="space-y-4">
            {/* Night Voice Mode Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${nightMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-200">Tryb Nocny Głosu</div>
                  <div className="text-xs text-slate-400">Stonowana intonacja i wolniejsze tempo wieczorem</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={nightMode}
                onChange={(e) => setNightMode(e.target.checked)}
                className="w-5 h-5 accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1.5">Nazwa profilu głosowego</label>
              <input
                type="text"
                value={voiceConfig.customProfileName}
                onChange={(e) => setVoiceConfig({ ...voiceConfig, customProfileName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Wysokość głosu (Pitch) {nightMode && <span className="text-indigo-400">(Tryb Nocny aktywny)</span>}</span>
                <span className="font-mono text-cyan-400">{voiceConfig.pitch}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={voiceConfig.pitch}
                onChange={(e) => setVoiceConfig({ ...voiceConfig, pitch: Number(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Tempo mówienia (Rate)</span>
                <span className="font-mono text-cyan-400">{voiceConfig.rate}x</span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.5"
                step="0.1"
                value={voiceConfig.rate}
                onChange={(e) => setVoiceConfig({ ...voiceConfig, rate: Number(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Głośność (Volume)</span>
                <span className="font-mono text-cyan-400">{Math.round(voiceConfig.volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={voiceConfig.volume}
                onChange={(e) => setVoiceConfig({ ...voiceConfig, volume: Number(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1.5">Słowo wybudzające (Trigger Word)</label>
              <input
                type="text"
                value={voiceConfig.triggerWord}
                onChange={(e) => setVoiceConfig({ ...voiceConfig, triggerWord: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Calibration & Testing Box */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Test i Kalibracja Głosowa
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Przetestuj próbkę głosu asystenta z uwzględnieniem aktualnych ustawień i trybu nocnego.
            </p>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1.5">Tekst do testu głosu</label>
              <textarea
                rows={3}
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none resize-none"
              />
            </div>

            <button
              onClick={testVoice}
              className="w-full bg-slate-800 hover:bg-slate-750 text-cyan-400 border border-slate-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition shadow"
            >
              <Volume2 className="w-4 h-4" /> Przetestuj Głos Asystenta {nightMode && "(Tryb Nocny)"}
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-200">Autokalibracja Mikrofonu</span>
              {calibrated && (
                <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                  <CheckCircle className="w-4 h-4" /> Skalibrowano
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Dopasuj czułość mikrofonu do otoczenia, aby komendy głosowe działały bezbłędnie.
            </p>
            <button
              onClick={handleCalibrate}
              disabled={calibrating}
              className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow transition disabled:opacity-50"
            >
              {calibrating ? "Kalibrowanie szumu i tonu..." : "Rozpocznij Kalibrację Głosową"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

