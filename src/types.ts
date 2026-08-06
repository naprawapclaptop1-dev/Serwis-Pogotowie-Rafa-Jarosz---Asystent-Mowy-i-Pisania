export type PersonaType = 'doctor' | 'teen' | 'commander';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actions?: Array<{ type: string; payload: string }>;
}

export interface VoiceConfig {
  voiceName: string;
  pitch: number;
  rate: number;
  volume: number;
  triggerWord: string;
  customProfileName: string;
}

export interface SystemStatus {
  cpuUsage: number;
  ramUsage: number;
  diskFree: string;
  isLocked: boolean;
  activeApps: string[];
  lastMoodCheck: string;
}

export interface BackupConfig {
  enabled: boolean;
  targetFolder: string;
  frequency: 'startup' | 'daily' | 'weekly';
  includeDocuments: boolean;
  includeDesktop: boolean;
  lastBackup: string;
}

export interface AnalyticsRecord {
  day: string;
  moodScore: number; // 1-5
  cpuAvg: number;
  ramAvg: number;
  backupsCompleted: number;
}

export interface VaultItem {
  id: string;
  title: string;
  username: string;
  encryptedPassword: string;
  category: string;
}

export type ThemeVibe = 'cyan' | 'emerald' | 'amber' | 'purple';

