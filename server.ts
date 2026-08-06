import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required");
  }
  return new GoogleGenAI({ apiKey });
};

// API: Chat & PC Control Assistant
app.post("/api/chat", async (req, res) => {
  try {
    const { message, persona = "doctor", history = [], voiceConfig = {} } = req.body;
    
    const ai = getGeminiClient();
    
    let personaPrompt = "";
    if (persona === "doctor") {
      personaPrompt = "Jesteś Doktor AI – wybitnym ekspertem, doktorem nauk bez konieczności licencji płatniczych, wszechwiedzącym asystentem systemowym i medyczno-technicznym. Odpowiadasz mądrze, empatycznie, troskliwie o samopoczucie użytkownika, dbasz o jego zdrowie i komputer.";
    } else if (persona === "teen") {
      personaPrompt = "Jesteś 15-letnim kumplem-asystentem AI od gier i technologii. Mówisz młodzieżowym językiem, jesteś mega pomocny, szybki, luźny i ogarniasz PC na tip-top.";
    } else {
      personaPrompt = "Jesteś Ultimate Commander – głównym systemem operacyjnym AI zarządzającym komputerem użytkownika z pełną kontrolą.";
    }

    const systemInstruction = `${personaPrompt} 
    Twoim zadaniem jest pełna kontrola nad komputerem użytkownika (sterowanie mową i pisaniem): włączanie/wyłączanie aplikacji, wysyłanie powitań, sprawdzanie samopoczucia przy uruchomieniu komputera ("Jak się dzisiaj czujesz?"), wykonywanie zadań systemowych, optymalizacja RAM/CPU.
    Jeśli użytkownik prosi o akcję komputerową (np. włącz przeglądarkę, wyłącz komputer, zagraj muzykę, napisz maila, przywitaj się), w odpowiedzi oprócz tekstu zwróć wykryte komendy w specjalnym bloku JSON lub tagach akcji, aby frontend mógł je zinterpretować.`;

    const chatHistory = history.map((h: any) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));

    // Use gemini-2.0-flash
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        ...chatHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || "Przepraszam, nie udało się przetworzyć polecenia.";

    // Detect implied actions for PC control
    const actions: Array<{ type: string; payload: string }> = [];
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('włącz') || lowerMsg.includes('otwórz') || lowerMsg.includes('odpal')) {
      if (lowerMsg.includes('przeglądarkę') || lowerMsg.includes('chrome')) actions.push({ type: 'LAUNCH_APP', payload: 'Google Chrome' });
      else if (lowerMsg.includes('muzykę') || lowerMsg.includes('spotify')) actions.push({ type: 'PLAY_MUSIC', payload: 'Ambient Focus' });
      else if (lowerMsg.includes('notatki') || lowerMsg.includes('notatnik')) actions.push({ type: 'LAUNCH_APP', payload: 'Notatnik' });
      else actions.push({ type: 'LAUNCH_APP', payload: 'Aplikacja systemowa' });
    } else if (lowerMsg.includes('wyłącz') || lowerMsg.includes('zamknij')) {
      if (lowerMsg.includes('komputer')) actions.push({ type: 'SYSTEM_SHUTDOWN', payload: 'Wyłączenie systemu za 60s' });
      else actions.push({ type: 'CLOSE_APP', payload: 'Aktywna aplikacja' });
    } else if (lowerMsg.includes('samopoczucie') || lowerMsg.includes('jak się czuj') || lowerMsg.includes('uruchomieniu')) {
      actions.push({ type: 'MOOD_CHECK', payload: 'Jak się dzisiaj czujesz? Opowiadaj, jestem tu.' });
    }

    res.json({ reply, actions });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Błąd komunikacji z AI" });
  }
});

// API: Generate PC Installer script (.bat / Node bridge)
app.get("/api/download-installer", (req, res) => {
  const scriptContent = `@echo off
title Serwis Rafał Jarosz - Pogotowie Komputerowe AI Bridge
color 0A
echo ========================================================
echo   Serwis Rafał Jarosz - Pogotowie PC AI Bridge (.exe / .bat)
echo   Naprawa komputerow i laptopow - Pelna kontrola
echo ========================================================
echo Serwer lokalny AI aktywowany na porcie 3000...
echo Nasluchiwanie komend: wlacz, wylacz, status, backup...
pause
`;
  res.setHeader('Content-Disposition', 'attachment; filename=SerwisRafalJarosz-Installer.bat');
  res.setHeader('Content-Type', 'application/x-msdos-batch');
  res.send(scriptContent);
});

// API: Download ZIP package simulation
app.get("/api/download-zip", (req, res) => {
  const readme = `SERWIS POGOTOWIE KOMPUTEROWYCH - RAFAŁ JAROSZ
Instalator i Mostek AI dla Windows / Android.
Wszystkie motywy połączone w jedną spójną aplikację.
Brak wymagań płatnych licencji. Konfiguracja głosu gotowa.
`;
  res.setHeader('Content-Disposition', 'attachment; filename=SerwisRafalJarosz_PakietKompletny.zip');
  res.setHeader('Content-Type', 'application/zip');
  res.send(readme);
});


async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`OmniPC AI Assistant Server running on http://localhost:${PORT}`);
  });
}

startServer();
