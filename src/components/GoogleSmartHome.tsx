import React, { useState } from 'react';
import { Home, Lightbulb, Thermometer, Lock, Camera, Wifi, CheckCircle2, Sliders, Volume2, Power, Tv, Smartphone, Laptop, Router, RefreshCw } from 'lucide-react';

export interface SmartDevice {
  id: string;
  name: string;
  type: 'light' | 'thermostat' | 'lock' | 'camera' | 'speaker' | 'plug' | 'tv' | 'decoder' | 'router' | 'smartphone' | 'laptop';
  room: string;
  status: boolean;
  value?: string | number;
}

export const GoogleSmartHome: React.FC = () => {
  const [devices, setDevices] = useState<SmartDevice[]>([
    { id: '1', name: 'Główny Router Wi-Fi 7 Mesh', type: 'router', room: 'Serwerownia', status: true, value: '1.2 Gbps / Ping 4ms' },
    { id: '2', name: 'Router / Access Point Piętro', type: 'router', room: 'Biuro Rafał', status: true, value: '860 Mbps' },
    { id: '3', name: 'Telewizor OLED 4K Google TV', type: 'tv', room: 'Salon Serwisowy', status: true, value: 'HDMI 1 / Netflix 4K' },
    { id: '4', name: 'Dekoder 4K IPTV / Sat', type: 'decoder', room: 'Salon Serwisowy', status: true, value: 'Kanał 101: TVP Info HD' },
    { id: '5', name: 'Smartfon Serwisowy (Android)', type: 'smartphone', room: 'Mobilny', status: true, value: 'Bateria 94% / 5G' },
    { id: '6', name: 'Laptop Diagnostyczny i7', type: 'laptop', room: 'Stanowisko 1', status: true, value: 'CPU 18% / RAM 45%' },
    { id: '7', name: 'Oświetlenie Biuro Serwis', type: 'light', room: 'Warsztat Rafał', status: true, value: '85%' },
    { id: '8', name: 'Inteligentny Termostat Nest', type: 'thermostat', room: 'Salon / Serwis', status: true, value: '21.5°C' },
    { id: '9', name: 'Zamek Szyfrowy Drzwi', type: 'lock', room: 'Wejście Główne', status: true, value: 'Zablokowane' },
    { id: '10', name: 'Kamera IP Przemysłowa', type: 'camera', room: 'Stanowisko Napraw', status: true, value: '1080p 60FPS' },
    { id: '11', name: 'Google Nest Audio Speaker', type: 'speaker', room: 'Warsztat Rafał', status: true, value: 'Głośność 60%' },
    { id: '12', name: 'Inteligentne Gniazdko Zasilania PC', type: 'plug', room: 'Stanowisko Główne', status: true, value: 'Pobór: 85W' },
  ]);

  const [logMessage, setLogMessage] = useState('Google Smart Home, Telewizory, Dekodery i Ruter zsynchronizowane pomyślnie.');

  const toggleDevice = (id: string) => {
    setDevices(prev => prev.map(d => {
      if (d.id === id) {
        const nextStatus = !d.status;
        setLogMessage(`Urządzenie "${d.name}" zostało ${nextStatus ? 'włączone' : 'wyłączone'} przez Google Smart Home & Serwis.`);
        return { ...d, status: nextStatus };
      }
      return d;
    }));
  };

  const handleRebootRouter = (id: string, name: string) => {
    setLogMessage(`[Ruter Mesh] Wykonano restart urządzenia "${name}". Ponowne łączenie z siecią ISP...`);
    setTimeout(() => {
      setLogMessage(`[Ruter Mesh] "${name}" zrestartowany pomyślnie. Internet i Wi-Fi działają z pełną prędkością.`);
    }, 1200);
  };

  const handleSyncAll = () => {
    setLogMessage('Trwa pełna synchronizacja chmury Google Home, telewizorów, dekoderów, ruterów i urządzeń mobilnych...');
    setTimeout(() => {
      setLogMessage('Wszystkie 12 urządzeń (PC, Laptopy, Smartfony, Telewizory, Dekodery, Rutery, IoT) działa poprawnie.');
    }, 1000);
  };

  return (
    <div className="flex-1 bg-slate-950 p-6 overflow-y-auto text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Google Smart Home, Ruter, TV & Dekoder Hub <span className="text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full font-mono">Pełna Kontrola</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Zarządzanie komputerami, laptopami, smartfonami, telewizorami, dekoderami IPTV, ruterami Wi-Fi i inteligentnym domem Google.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-mono text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Google Cloud IoT & Mesh aktywne
          </div>
          <button
            onClick={handleSyncAll}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-cyan-600/20 flex items-center gap-2"
          >
            <Wifi className="w-4 h-4" /> Synchronizuj Wszystko
          </button>
        </div>
      </div>

      {/* Status banner */}
      <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-3 rounded-xl flex items-center justify-between text-xs text-cyan-300">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{logMessage}</span>
        </div>
        <span className="font-mono text-[11px] text-slate-400">Rafał Jarosz Serwis v2.5 PRO</span>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map(device => {
          let IconComponent = Lightbulb;
          if (device.type === 'thermostat') IconComponent = Thermometer;
          if (device.type === 'lock') IconComponent = Lock;
          if (device.type === 'camera') IconComponent = Camera;
          if (device.type === 'speaker') IconComponent = Volume2;
          if (device.type === 'plug') IconComponent = Power;
          if (device.type === 'tv') IconComponent = Tv;
          if (device.type === 'decoder') IconComponent = Sliders;
          if (device.type === 'router') IconComponent = Router;
          if (device.type === 'smartphone') IconComponent = Smartphone;
          if (device.type === 'laptop') IconComponent = Laptop;

          return (
            <div
              key={device.id}
              className={`bg-slate-900 border p-5 rounded-2xl shadow-lg transition flex flex-col justify-between space-y-4 ${
                device.status ? 'border-slate-800 hover:border-cyan-500/40' : 'border-slate-900 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    device.status ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-slate-800 text-slate-500'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">{device.name}</h3>
                    <p className="text-xs text-slate-400">{device.room}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {device.type === 'router' && (
                    <button
                      onClick={() => handleRebootRouter(device.id, device.name)}
                      className="bg-slate-800 hover:bg-slate-700 text-cyan-400 p-2 rounded-xl transition text-xs"
                      title="Zrestartuj ruter"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => toggleDevice(device.id)}
                    className={`w-11 h-6 rounded-full transition relative p-0.5 ${
                      device.status ? 'bg-cyan-600' : 'bg-slate-800'
                    }`}
                    title="Przełącz stan urządzenia"
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition shadow transform ${
                      device.status ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Stan / Parametr:</span>
                <span className={`font-mono font-medium px-2 py-0.5 rounded-lg ${
                  device.status ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-slate-800 text-slate-500'
                }`}>
                  {device.status ? (device.value || 'Włączone') : 'Wyłączone'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Voice & Routine Integration Notice */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
        <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" /> Sterowanie Wszystkim przez Głos i Asystenta Serwisu Rafał Jarosz
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Ten panel zarządza każdym urządzeniem: komputerem, laptopem, smartfonem, telewizorem, dekoderem kablowym/satelitarnym oraz ruterami Wi-Fi. 
          Wszystkie polecenia głosowe i zapytania są natychmiast wykonywane. W czym jeszcze mogę pomóc? Co jeszcze mam włączyć lub sprawdzić?
        </p>
      </div>
    </div>
  );
};
