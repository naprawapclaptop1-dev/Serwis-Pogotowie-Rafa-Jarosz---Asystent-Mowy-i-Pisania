import React from 'react';
import { Download, Smartphone, Laptop, ShieldCheck, Terminal, ExternalLink, CheckCircle } from 'lucide-react';

export const InstallerHub: React.FC = () => {
  const downloadInstallerScript = () => {
    window.location.href = '/api/download-installer';
  };

  const downloadZipPackage = () => {
    window.location.href = '/api/download-zip';
  };

  const openGoogleDrive = () => {
    window.open('https://drive.google.com', '_blank');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Instalator Aplikacji PC (.exe / ZIP) & Google Drive</h2>
          <p className="text-sm text-slate-400">Pobierz pełny pakiet w formacie ZIP, instalator Windows (.bat / .exe) lub pobierz bezpośrednio z Dysku Google.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-lg text-xs font-medium">
          <ShieldCheck className="w-4 h-4" /> Gotowe do pobrania
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PC Windows Installer (.exe / .bat / ZIP) */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Serwis Rafał Jarosz Desktop (.exe / .zip)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pobierz instalator okienkowy lub kompletny pakiet ZIP dla systemu Windows (Naprawa komputerów i laptopów - serwis pogotowie Rafał Jarosz). Pełna kontrola nad komputerem bez żadnych płatnych licencji.
            </p>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                Dedykowane okno aplikacji systemowej Windows
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                Kompletny archiwum ZIP ze skryptami startowymi
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                Mirror na Dysku Google dla łatwego dostępu
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <button
              onClick={downloadInstallerScript}
              className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition text-sm"
            >
              <Download className="w-4 h-4" /> Pobierz Instalator (.bat / .exe)
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={downloadZipPackage}
                className="bg-slate-800 hover:bg-slate-750 text-cyan-400 border border-slate-700 font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs transition"
              >
                <Download className="w-3.5 h-3.5" /> Pobierz ZIP
              </button>
              <button
                onClick={openGoogleDrive}
                className="bg-slate-800 hover:bg-slate-750 text-emerald-400 border border-slate-700 font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs transition"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Dysk Google
              </button>
            </div>
          </div>
        </div>

        {/* Android App (.apk / PWA) */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Serwis Rafał Jarosz Mobile (.apk dla Androida)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zainstaluj aplikację na telefonie z systemem Android od serwisu Rafała Jarosza, aby sterować komputerem zdalnie za pomocą głosu, sprawdzać samopoczucie i pisać wiadomości z dowolnego miejsca.
            </p>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                Aplikacja mobilna PWA / instalator APK
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                Mikrofon i synteza mowy w telefonie
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                Szybkie powiadomienia i raporty z PC
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <button
              onClick={openGoogleDrive}
              className="w-full bg-slate-800 hover:bg-slate-750 text-indigo-300 border border-slate-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2 text-xs transition"
            >
              <ExternalLink className="w-4 h-4" /> Pobierz APK z Dysku Google
            </button>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <p className="text-[11px] text-slate-400">
                Otwórz aplikację w Chrome na Androidzie i wybierz <strong className="text-cyan-400">"Zainstaluj aplikację"</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
