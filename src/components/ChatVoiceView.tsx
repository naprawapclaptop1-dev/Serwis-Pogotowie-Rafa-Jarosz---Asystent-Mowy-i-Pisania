import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Terminal, 
  Play, 
  Square, 
  Smile, 
  Bot, 
  User,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { ChatMessage, PersonaType, VoiceConfig } from '../types';

interface ChatVoiceViewProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  persona: PersonaType;
  voiceConfig: VoiceConfig;
  onExecuteAction: (action: { type: string; payload: string }) => void;
}

export const ChatVoiceView: React.FC<ChatVoiceViewProps> = ({
  messages,
  setMessages,
  persona,
  voiceConfig,
  onExecuteAction
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [recentCommands, setRecentCommands] = useState<string[]>([
    "Włącz przeglądarkę Chrome",
    "Optymalizuj pamięć RAM",
    "Opróżnij kosz systemowy",
    "Wykonaj backup plików"
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Speech Recognition setup
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Przeglądarka nie wspiera rozpoznawania mowy. Użyj wpisywania tekstowego.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'pl-PL';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setInputText(speechToText);
      setIsListening(false);
      handleSendMessage(speechToText);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
  };

  // Speech Synthesis
  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pl-PL';
    utterance.pitch = voiceConfig.pitch;
    utterance.rate = voiceConfig.rate;
    utterance.volume = voiceConfig.volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    setRecentCommands(prev => [text, ...prev.filter(c => c !== text)].slice(0, 10));

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          persona,
          history: messages.slice(-10),
          voiceConfig
        })
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: data.actions
      };

      setMessages(prev => [...prev, assistantMsg]);
      speakText(data.reply);

      if (data.actions && data.actions.length > 0) {
        data.actions.forEach((act: any) => onExecuteAction(act));
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: `Błąd połączenia z asystentem: ${err.message}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100">
      {/* Top Bar */}
      <div className="h-16 border-b border-slate-800 bg-slate-900/80 px-6 flex items-center justify-between backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold text-sm flex items-center gap-2">
              Serwis Pogotowie Rafał Jarosz - Asystent Mowy i Pisania
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                {persona === 'doctor' ? 'Tryb Doktor AI (PhD)' : persona === 'teen' ? 'Tryb 15-latek Kumpel' : 'Tryb Commander'}
              </span>
            </h2>
            <p className="text-xs text-slate-400">Pełna kontrola nad komputerem • Słuchanie głosem aktywne</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2 rounded-lg border transition ${
              voiceEnabled 
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title={voiceEnabled ? "Synteza mowy włączona" : "Synteza mowy wyłączona"}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs animate-pulse"
            >
              <Square className="w-3.5 h-3.5" /> Zatrzymaj głos
            </button>
          )}
        </div>
      </div>

      {/* Pulsing AI Indicator */}
      {(isListening || loading || isSpeaking) && (
        <div className="bg-cyan-500/15 border-b border-cyan-500/30 px-6 py-2.5 flex items-center justify-between text-xs text-cyan-200">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></div>
            <span className="font-semibold">
              {isListening && "Mikrofon nasłuchuje komendy głosowej..."}
              {loading && "Asystent przetwarza zapytanie i steruje PC..."}
              {isSpeaking && "Asystent mowy odtwarza odpowiedź..."}
            </span>
          </div>
          <span className="text-[11px] text-cyan-400/80 font-mono">Serwis Rafał Jarosz Engine</span>
        </div>
      )}

      {/* Recent Voice Commands Widget */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-6 py-2 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Ostatnie komendy mowy:
        </span>
        {recentCommands.map((cmd, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(cmd)}
            className="bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-slate-300 px-3 py-1 rounded-lg shrink-0 transition"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-xl shadow-cyan-500/10">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">Cześć! Witaj w Serwisie Komputerowym Rafała Jarosza</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Jestem Twoim osobistym asystentem AI od Naprawy Komputerów i Laptopów. Mogę sterować Twoim PC, włączać aplikacje, pisać teksty, pytać o samopoczucie przy uruchomieniu i zarządzać wszystkim. Rozmawiaj ze mną głosem lub pisz!
            </p>
            <div className="flex flex-wrap gap-2 justify-center pt-2">
              <button 
                onClick={() => handleSendMessage("Cześć! Jak się dzisiaj czujesz i co robimy na komputerze?")}
                className="text-xs bg-slate-900 border border-slate-800 hover:border-cyan-500/40 px-3 py-1.5 rounded-lg text-slate-300 transition"
              >
                💬 Sprawdź samopoczucie przy uruchomieniu
              </button>
              <button 
                onClick={() => handleSendMessage("Włącz przeglądarkę Chrome i ulubioną muzykę.")}
                className="text-xs bg-slate-900 border border-slate-800 hover:border-cyan-500/40 px-3 py-1.5 rounded-lg text-slate-300 transition"
              >
                💻 Włącz przeglądarkę i muzykę
              </button>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-3 max-w-2xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20'
            }`}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`space-y-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-lg'
              }`}>
                {msg.text}
              </div>

              {msg.actions && msg.actions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {msg.actions.map((act, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[11px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-1 rounded-md">
                      <Terminal className="w-3 h-3" /> {act.type}: {act.payload}
                    </span>
                  ))}
                </div>
              )}

              <span className="text-[10px] text-slate-500 block px-1">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3 text-slate-400 text-sm">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/20 border border-cyan-600/40 flex items-center justify-center text-cyan-400">
              <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-900 border border-slate-800 px-4 py-3 rounded-2xl">
              Asystent myśli i wykonuje polecenie...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Commands Shelf */}
      <div className="px-6 py-2 bg-slate-900/50 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Szybkie Komendy PC:
        </span>
        <button
          onClick={() => handleSendMessage("Opróżnij kosz systemowy komputera")}
          className="bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-slate-300 px-3 py-1.5 rounded-lg shrink-0 transition flex items-center gap-1.5"
        >
          🗑️ Opróżnij Kosz
        </button>
        <button
          onClick={() => handleSendMessage("Wyczyść pliki tymczasowe i zwolnij miejsce na dysku")}
          className="bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-slate-300 px-3 py-1.5 rounded-lg shrink-0 transition flex items-center gap-1.5"
        >
          🧹 Wyczyść Temp
        </button>
        <button
          onClick={() => handleSendMessage("Optymalizuj pamięć RAM i zatrzymaj zbędne procesy w tle")}
          className="bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-slate-300 px-3 py-1.5 rounded-lg shrink-0 transition flex items-center gap-1.5"
        >
          ⚡ Optymalizuj RAM
        </button>
        <button
          onClick={() => handleSendMessage("Uruchom natychmiastową kopię zapasową ważnych dokumentów")}
          className="bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-slate-300 px-3 py-1.5 rounded-lg shrink-0 transition flex items-center gap-1.5"
        >
          💾 Wykonaj Backup
        </button>
      </div>

      {/* Input & Voice Controls */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/90 backdrop-blur">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-3 rounded-xl border transition flex items-center justify-center ${
              isListening
                ? 'bg-red-500 text-white border-red-400 animate-pulse shadow-lg shadow-red-500/30'
                : 'bg-slate-800 border-slate-700 text-cyan-400 hover:bg-slate-750'
            }`}
            title={isListening ? "Nasłuchiwanie aktywne... Kliknij by zatrzymać" : "Kliknij, aby mówić do asystenta"}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Wpisz polecenie (np. 'włącz przeglądarkę', 'jak się czujesz?', 'napisz maila')..."
            className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={loading || !inputText.trim()}
            className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 text-white font-medium px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Wyślij</span>
          </button>
        </div>

        {isListening && (
          <div className="text-center mt-2 text-xs text-red-400 animate-pulse font-medium">
            🔴 Nasłuchiwanie głosu w toku... Mów wyraźnie po polsku.
          </div>
        )}
      </div>
    </div>
  );
};
