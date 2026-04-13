import { create } from "zustand";
import type {
  AppStats,
  LinkedAccount,
  ProtectionSettings,
  ThreatAlert,
} from "../types";

interface AppStore {
  // Auth
  isAuthenticated: boolean;

  // Alerts
  alerts: ThreatAlert[];
  unreadCount: number;

  // Active modal — null means no modal shown
  activeThreatModal: ThreatAlert | null;

  // Dashboard stats
  stats: AppStats;

  // Security score 0–100
  securityScore: number;

  // Protection settings
  protectionSettings: ProtectionSettings;

  // Linked email account
  linkedEmail: LinkedAccount;

  // ── Actions ───────────────────────────────────────────────────────────────

  setAuthenticated: (v: boolean) => void;

  setAlerts: (alerts: ThreatAlert[]) => void;
  addAlert: (alert: ThreatAlert) => void;
  markAlertRead: (id: bigint) => void;
  markAllRead: () => void;

  setActiveThreatModal: (alert: ThreatAlert | null) => void;

  setStats: (stats: AppStats) => void;
  setSecurityScore: (score: number) => void;

  setProtectionSettings: (settings: ProtectionSettings) => void;
  setLinkedEmail: (account: LinkedAccount) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // ── Initial state ──────────────────────────────────────────────────────────
  isAuthenticated: false,

  alerts: [],
  unreadCount: 0,

  activeThreatModal: null,

  stats: { scanned: 0, warnings: 0, blocked: 0 },
  securityScore: 0,

  protectionSettings: {
    emailProtection: true,
    smsProtection: true,
    browserProtection: true,
    silentScan: false,
    aiIntel: true,
  },

  linkedEmail: {
    provider: "",
    isLinked: false,
    emailAddress: "",
  },

  // ── Action implementations ─────────────────────────────────────────────────
  setAuthenticated: (v) => set({ isAuthenticated: v }),

  setAlerts: (alerts) => {
    const unreadCount = alerts.filter((a) => !a.isRead).length;
    set({ alerts, unreadCount });
  },

  addAlert: (alert) =>
    set((state) => {
      const alerts = [alert, ...state.alerts];
      const unreadCount = alerts.filter((a) => !a.isRead).length;
      return { alerts, unreadCount };
    }),

  markAlertRead: (id) =>
    set((state) => {
      const alerts = state.alerts.map((a) =>
        a.id === id ? { ...a, isRead: true } : a,
      );
      const unreadCount = alerts.filter((a) => !a.isRead).length;
      return { alerts, unreadCount };
    }),

  markAllRead: () =>
    set((state) => ({
      alerts: state.alerts.map((a) => ({ ...a, isRead: true })),
      unreadCount: 0,
    })),

  setActiveThreatModal: (alert) => set({ activeThreatModal: alert }),

  setStats: (stats) => set({ stats }),
  setSecurityScore: (securityScore) => set({ securityScore }),

  setProtectionSettings: (protectionSettings) => set({ protectionSettings }),
  setLinkedEmail: (linkedEmail) => set({ linkedEmail }),
}));
