import type { backendInterface } from "../backend";
import {
  ScanResult,
  ScanType,
  ThreatSource,
  ThreatType,
} from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

export const mockBackend: backendInterface = {
  getAlerts: async () => [
    {
      id: BigInt(0),
      threatName: "Crime.com Phishing Email",
      url: "https://crime.com",
      riskScore: BigInt(97),
      threatType: ThreatType.phishing,
      source: ThreatSource.email,
      timestamp: now,
      isRead: false,
    },
    {
      id: BigInt(1),
      threatName: "SBI NetBanking Clone",
      url: "http://sbi-secure-login.net/verify",
      riskScore: BigInt(92),
      threatType: ThreatType.phishing,
      source: ThreatSource.email,
      timestamp: now - BigInt(3_600_000_000_000),
      isRead: true,
    },
    {
      id: BigInt(2),
      threatName: "Amazon Prize Scam",
      url: "http://amaz0n-rewards.tk/claim",
      riskScore: BigInt(88),
      threatType: ThreatType.phishing,
      source: ThreatSource.sms,
      timestamp: now - BigInt(7_200_000_000_000),
      isRead: true,
    },
    {
      id: BigInt(3),
      threatName: "Microsoft Support Malware",
      url: "http://ms-support-fix.ru/download",
      riskScore: BigInt(95),
      threatType: ThreatType.malware,
      source: ThreatSource.url,
      timestamp: now - BigInt(10_800_000_000_000),
      isRead: true,
    },
    {
      id: BigInt(4),
      threatName: "Suspicious Spam Campaign",
      url: "http://bulk-offers-now.biz/unsubscribe",
      riskScore: BigInt(60),
      threatType: ThreatType.spam,
      source: ThreatSource.email,
      timestamp: now - BigInt(14_400_000_000_000),
      isRead: true,
    },
  ],

  getLinkedEmail: async () => ({
    provider: "Gmail",
    isLinked: true,
    emailAddress: "user@gmail.com",
  }),

  getLinkedPhone: async () => ({
    isLinked: false,
    phoneNumber: "",
  }),

  getProtectionSettings: async () => ({
    aiIntel: true,
    silentScan: false,
    smsProtection: true,
    emailProtection: true,
    browserProtection: true,
  }),

  getScanHistory: async () => [
    { id: BigInt(0), url: "https://google.com", scanType: ScanType.url, result: ScanResult.safe, confidence: BigInt(99), timestamp: now - BigInt(1_800_000_000_000) },
    { id: BigInt(1), url: "https://crime.com", scanType: ScanType.email, result: ScanResult.phishing, confidence: BigInt(97), timestamp: now - BigInt(3_600_000_000_000) },
    { id: BigInt(2), url: "https://github.com", scanType: ScanType.url, result: ScanResult.safe, confidence: BigInt(99), timestamp: now - BigInt(5_400_000_000_000) },
    { id: BigInt(3), url: "http://amaz0n-rewards.tk/claim", scanType: ScanType.qr, result: ScanResult.phishing, confidence: BigInt(88), timestamp: now - BigInt(7_200_000_000_000) },
    { id: BigInt(4), url: "https://stackoverflow.com", scanType: ScanType.url, result: ScanResult.safe, confidence: BigInt(99), timestamp: now - BigInt(9_000_000_000_000) },
    { id: BigInt(5), url: "http://ms-support-fix.ru/dl", scanType: ScanType.url, result: ScanResult.malware, confidence: BigInt(95), timestamp: now - BigInt(10_800_000_000_000) },
  ],

  getSecurityScore: async () => BigInt(85),

  getStats: async () => ({
    totalScanned: BigInt(6),
    totalWarnings: BigInt(2),
    totalBlocked: BigInt(2),
  }),

  getUnreadAlertsCount: async () => BigInt(1),

  linkEmail: async (_provider: string, _emailAddress: string) => undefined,
  linkPhone: async (_phoneNumber: string) => undefined,
  markAlertRead: async (_id: bigint) => undefined,
  markAllAlertsRead: async () => undefined,

  scanEmail: async (url: string) => ({
    id: BigInt(99),
    url,
    scanType: ScanType.email,
    result: ScanResult.phishing,
    confidence: BigInt(97),
    timestamp: now,
  }),

  scanQr: async (url: string) => ({
    id: BigInt(100),
    url,
    scanType: ScanType.qr,
    result: ScanResult.safe,
    confidence: BigInt(99),
    timestamp: now,
  }),

  scanUrl: async (url: string) => ({
    id: BigInt(101),
    url,
    scanType: ScanType.url,
    result: url.includes("crime") ? ScanResult.phishing : ScanResult.safe,
    confidence: BigInt(url.includes("crime") ? 97 : 99),
    timestamp: now,
  }),

  simulateEmailThreat: async (url: string, threatName: string) => ({
    id: BigInt(200),
    url,
    threatName,
    riskScore: BigInt(97),
    threatType: ThreatType.phishing,
    source: ThreatSource.email,
    timestamp: now,
    isRead: false,
  }),

  unlinkEmail: async () => undefined,
  unlinkPhone: async () => undefined,

  updateProtectionSettings: async (_updated) => undefined,
};
