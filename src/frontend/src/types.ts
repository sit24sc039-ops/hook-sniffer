import type {
  LinkedEmailPublic,
  LinkedPhonePublic,
  ProtectionSettingsPublic,
  ScanEntry,
  ScanResult,
  ScanType,
  ThreatAlertPublic,
  ThreatSource,
  ThreatType,
} from "./backend.d";

// Re-export backend types for use across the app
export type { ScanResult, ScanType, ThreatSource, ThreatType };

// Primary threat alert type used throughout the UI
export type ThreatAlert = ThreatAlertPublic;

// Scan result entry from scan history
export type ScanHistoryEntry = ScanEntry;

// Protection settings
export type ProtectionSettings = ProtectionSettingsPublic;

// Linked accounts
export type LinkedAccount = LinkedEmailPublic;
export type LinkedPhone = LinkedPhonePublic;

// App-level stats (normalized from backend bigint)
export interface AppStats {
  scanned: number;
  warnings: number;
  blocked: number;
}

// Normalized scan entry for display
export interface ScanDisplay {
  id: string;
  url: string;
  result: ScanResult;
  scanType: ScanType;
  timestamp: number;
  confidence: number;
}

// Normalized threat alert for display
export interface ThreatAlertDisplay {
  id: string;
  url: string;
  source: ThreatSource;
  isRead: boolean;
  threatName: string;
  threatType: ThreatType;
  timestamp: number;
  riskScore: number;
}

// Utility: convert ThreatAlert (bigint) to display form
export function normalizeAlert(alert: ThreatAlert): ThreatAlertDisplay {
  return {
    id: alert.id.toString(),
    url: alert.url,
    source: alert.source,
    isRead: alert.isRead,
    threatName: alert.threatName,
    threatType: alert.threatType,
    timestamp: Number(alert.timestamp) / 1_000_000, // ns → ms
    riskScore: Number(alert.riskScore),
  };
}

// Utility: convert ScanEntry (bigint) to display form
export function normalizeScan(entry: ScanEntry): ScanDisplay {
  return {
    id: entry.id.toString(),
    url: entry.url,
    result: entry.result,
    scanType: entry.scanType,
    timestamp: Number(entry.timestamp) / 1_000_000,
    confidence: Number(entry.confidence),
  };
}
