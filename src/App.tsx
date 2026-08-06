/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatVoiceView } from './components/ChatVoiceView';
import { PcControlHub } from './components/PcControlHub';
import { VoiceStudio } from './components/VoiceStudio';
import { StartupRoutines } from './components/StartupRoutines';
import { BackupRoutine } from './components/BackupRoutine';
import { AnalyticsView } from './components/AnalyticsView';
import { InstallerHub } from './components/InstallerHub';
import { PersonaType, ChatMessage, VoiceConfig, SystemStatus, BackupConfig, AnalyticsRecord, ThemeVibe } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [persona, setPersona] = useState<PersonaType>('doctor');
  const [themeVibe, setThemeVibe] = useState<ThemeVibe>('cyan');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [voiceConfig, setVoiceConfig] = useState<VoiceConfig>({
    voiceName: 'Serwis Rafał Jarosz Master Voice',
    pitch: 1.0,
    rate: 1.0,
    volume: 1.0,
    triggerWord: 'Hej Serwis',
    customProfileName: 'Rafał Jarosz AI Voice'
  });
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    cpuUsage: 16,
    ramUsage: 42,
    diskFree: '342 GB',
    isLocked: false,
    activeApps: ['Serwis Rafał Jarosz Assistant', 'Google Chrome'],
    lastMoodCheck: 'Dzisiaj rano (OK)'
  });
  const [backupConfig, setBackupConfig] = useState<BackupConfig>({
    enabled: true,
    targetFolder: 'D:\\Backup_Serwis_RafalJarosz',
    frequency: 'startup',
    includeDocuments: true,
    includeDesktop: true,
    lastBackup: 'Dzisiaj, 06:30'
  });

  const [analyticsData] = useState<AnalyticsRecord[]>([
    { day: 'Dzień 1', moodScore: 4, cpuAvg: 18, ramAvg: 40, backupsCompleted: 1 },
    { day: 'Dzień 5', moodScore: 5, cpuAvg: 15, ramAvg: 38, backupsCompleted: 1 },
    { day: 'Dzień 10', moodScore: 4, cpuAvg: 22, ramAvg: 45, backupsCompleted: 1 },
    { day: 'Dzień 15', moodScore: 5, cpuAvg: 16, ramAvg: 41, backupsCompleted: 1 },
    { day: 'Dzień 20', moodScore: 4, cpuAvg: 19, ramAvg: 44, backupsCompleted: 1 },
    { day: 'Dzień 25', moodScore: 5, cpuAvg: 14, ramAvg: 39, backupsCompleted: 1 },
    { day: 'Dzień 30', moodScore: 5, cpuAvg: 17, ramAvg: 42, backupsCompleted: 1 },
  ]);

  const handleExecuteAction = (action: { type: string; payload: string }) => {
    if (action.type === 'LAUNCH_APP') {
      setSystemStatus(prev => ({
        ...prev,
        activeApps: Array.from(new Set([...prev.activeApps, action.payload]))
      }));
    } else if (action.type === 'SYSTEM_SHUTDOWN') {
      alert("Komenda systemowa: Wyłączanie komputera zaplanowane przez serwis.");
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 overflow-hidden font-sans">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        persona={persona}
        setPersona={setPersona}
        systemStatus={systemStatus}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {activeTab === 'chat' && (
          <ChatVoiceView
            messages={messages}
            setMessages={setMessages}
            persona={persona}
            voiceConfig={voiceConfig}
            onExecuteAction={handleExecuteAction}
          />
        )}
        {activeTab === 'pc_control' && (
          <PcControlHub
            systemStatus={systemStatus}
            setSystemStatus={setSystemStatus}
          />
        )}
        {activeTab === 'voice_studio' && (
          <VoiceStudio
            voiceConfig={voiceConfig}
            setVoiceConfig={setVoiceConfig}
            themeVibe={themeVibe}
            setThemeVibe={setThemeVibe}
          />
        )}
        {activeTab === 'routines' && (
          <StartupRoutines
            systemStatus={systemStatus}
            setSystemStatus={setSystemStatus}
          />
        )}
        {activeTab === 'backup' && (
          <BackupRoutine
            backupConfig={backupConfig}
            setBackupConfig={setBackupConfig}
          />
        )}
        {activeTab === 'analytics' && (
          <AnalyticsView
            analyticsData={analyticsData}
          />
        )}
        {activeTab === 'installer' && (
          <InstallerHub />
        )}
      </main>
    </div>
  );
}


