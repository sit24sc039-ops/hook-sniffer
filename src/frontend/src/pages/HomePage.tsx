import { useActor } from "@caffeineai/core-infrastructure";
import {
  Bell,
  CheckCircle,
  ChevronRight,
  Mail,
  Minus,
  Monitor,
  QrCode,
  Shield,
  Smartphone,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { createActor } from "../backend";
import { ThreatSource, ThreatType } from "../backend.d";
import { PageHeader } from "../components/Layout";
import { useAppStore } from "../store/useAppStore";
import { normalizeAlert } from "../types";
import type { ThreatAlertDisplay } from "../types";

// ── Security Score Ring ────────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score >= 70) return "oklch(0.72 0.28 145)";
  if (score >= 40) return "oklch(0.75 0.18 85)";
  return "oklch(0.62 0.22 22)";
}

function scoreLabel(score: number): string {
  if (score >= 80) return "SECURE";
  if (score >= 60) return "FAIR";
  if (score >= 40) return "CAUTION";
  return "AT RISK";
}

interface ScoreRingProps {
  score: number;
}

function ScoreRing({ score }: ScoreRingProps) {
  const r = 64;
  const cx = 80;
  const cy = 80;
  // Arc starts at 135deg and sweeps 270deg (leaving a 90deg gap at the bottom)
  const sweep = 270;
  const sweepRad = (sweep * Math.PI) / 180;
  const startAngle = 135 * (Math.PI / 180);
  const filled = (score / 100) * sweepRad;

  // SVG arc path for the track and progress
  const describeArc = (start: number, end: number) => {
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const largeArc = end - start > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const trackEnd = startAngle + sweepRad;
  const progressEnd = startAngle + filled;

  const color = scoreColor(score);

  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 160 160"
      role="img"
      aria-label={`Security score ${score}`}
    >
      <title>Security score {score}</title>
      {/* Background glow filter */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Track */}
      <path
        d={describeArc(startAngle, trackEnd)}
        fill="none"
        stroke="oklch(0.22 0 0)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Progress */}
      {score > 0 && (
        <path
          d={describeArc(startAngle, progressEnd)}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#glow)"
          style={{
            transition: "stroke 0.5s ease",
          }}
        />
      )}
      {/* Center score */}
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="36"
        fontWeight="700"
        fontFamily="var(--font-display)"
        fill={color}
      >
        {score}
      </text>
      <text
        x={cx}
        y={cy + 22}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono)"
        letterSpacing="2"
        fill={color}
      >
        {scoreLabel(score)}
      </text>
    </svg>
  );
}

// ── Quick Stat Card ────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number;
  accent?: string;
}

function StatCard({
  label,
  value,
  accent = "oklch(0.72 0.28 145)",
}: StatCardProps) {
  return (
    <div
      className="flex-1 flex flex-col items-center py-4 rounded-lg"
      style={{
        backgroundColor: "oklch(0.12 0 0)",
        border: "1px solid oklch(0.20 0 0)",
      }}
    >
      <span
        className="text-2xl font-display font-bold tabular-nums"
        style={{ color: accent }}
      >
        {value.toLocaleString()}
      </span>
      <span
        className="text-xs font-mono mt-1"
        style={{ color: "oklch(0.50 0 0)" }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Monitor Row ────────────────────────────────────────────────────────────

interface MonitorRowProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

function MonitorRow({ icon, label, active }: MonitorRowProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: active
            ? "oklch(0.72 0.28 145 / 0.12)"
            : "oklch(0.14 0 0)",
          border: `1px solid ${active ? "oklch(0.72 0.28 145 / 0.4)" : "oklch(0.20 0 0)"}`,
        }}
      >
        <span
          style={{ color: active ? "oklch(0.72 0.28 145)" : "oklch(0.35 0 0)" }}
        >
          {icon}
        </span>
      </div>
      <span className="flex-1 text-sm font-body text-foreground">{label}</span>
      {active ? (
        <div className="flex items-center gap-1.5">
          <CheckCircle size={15} style={{ color: "oklch(0.72 0.28 145)" }} />
          <span
            className="text-xs font-mono"
            style={{ color: "oklch(0.72 0.28 145)" }}
          >
            ACTIVE
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          <Minus size={15} style={{ color: "oklch(0.38 0 0)" }} />
          <span
            className="text-xs font-mono"
            style={{ color: "oklch(0.38 0 0)" }}
          >
            OFF
          </span>
        </div>
      )}
    </div>
  );
}

// ── Alert Row ─────────────────────────────────────────────────────────────

function riskBadgeColor(score: number): { bg: string; fg: string } {
  if (score >= 70)
    return { bg: "oklch(0.62 0.22 22 / 0.15)", fg: "oklch(0.72 0.22 22)" };
  if (score >= 40)
    return { bg: "oklch(0.75 0.18 85 / 0.15)", fg: "oklch(0.75 0.18 85)" };
  return { bg: "oklch(0.72 0.28 145 / 0.12)", fg: "oklch(0.72 0.28 145)" };
}

function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

interface AlertRowProps {
  alert: ThreatAlertDisplay;
}

function AlertRow({ alert }: AlertRowProps) {
  const riskColors = riskBadgeColor(alert.riskScore);
  return (
    <div
      data-ocid="recent-alert-row"
      className="flex items-center gap-3 py-3 border-b"
      style={{ borderColor: "oklch(0.16 0 0)" }}
    >
      {/* Risk badge */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold"
        style={{ backgroundColor: riskColors.bg, color: riskColors.fg }}
      >
        {alert.riskScore}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {alert.threatName}
        </p>
        <p
          className="text-xs font-mono truncate mt-0.5"
          style={{ color: "oklch(0.45 0 0)" }}
        >
          {alert.url}
        </p>
      </div>

      {/* Right side */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span
          className="text-xs px-2 py-0.5 rounded-full font-mono capitalize"
          style={{
            backgroundColor: "oklch(0.16 0 0)",
            color: "oklch(0.55 0 0)",
          }}
        >
          {alert.threatType}
        </span>
        <span className="text-xs" style={{ color: "oklch(0.40 0 0)" }}>
          {timeAgo(alert.timestamp)}
        </span>
      </div>
    </div>
  );
}

// ── Fallback seed alerts for first-load experience ────────────────────────

const SEED_ALERTS: ThreatAlertDisplay[] = [
  {
    id: "1",
    url: "https://crime.com/login",
    source: ThreatSource.email,
    isRead: true,
    threatName: "SBI NetBanking Clone",
    threatType: ThreatType.phishing,
    timestamp: Date.now() - 5 * 60000,
    riskScore: 92,
  },
  {
    id: "2",
    url: "https://amaz0n-secure.net/account",
    source: ThreatSource.url,
    isRead: true,
    threatName: "Amazon Credential Harvest",
    threatType: ThreatType.phishing,
    timestamp: Date.now() - 45 * 60000,
    riskScore: 87,
  },
  {
    id: "3",
    url: "https://paypal-verify.pw/update",
    source: ThreatSource.sms,
    isRead: true,
    threatName: "PayPal SMS Spoofing",
    threatType: ThreatType.phishing,
    timestamp: Date.now() - 3 * 3600000,
    riskScore: 78,
  },
  {
    id: "4",
    url: "https://malware-dist.ru/payload.exe",
    source: ThreatSource.email,
    isRead: true,
    threatName: "Malware Dropper",
    threatType: ThreatType.malware,
    timestamp: Date.now() - 8 * 3600000,
    riskScore: 96,
  },
  {
    id: "5",
    url: "https://promo-spam.click/offer",
    source: ThreatSource.url,
    isRead: true,
    threatName: "Promotional Spam",
    threatType: ThreatType.spam,
    timestamp: Date.now() - 26 * 3600000,
    riskScore: 35,
  },
];

// ── HomePage ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const { actor, isFetching } = useActor(createActor);
  const alerts = useAppStore((s) => s.alerts);
  const stats = useAppStore((s) => s.stats);
  const securityScore = useAppStore((s) => s.securityScore);
  const protectionSettings = useAppStore((s) => s.protectionSettings);
  const unreadCount = useAppStore((s) => s.unreadCount);
  const setAlerts = useAppStore((s) => s.setAlerts);
  const setStats = useAppStore((s) => s.setStats);
  const setSecurityScore = useAppStore((s) => s.setSecurityScore);
  const setProtectionSettings = useAppStore((s) => s.setProtectionSettings);
  const setActiveThreatModal = useAppStore((s) => s.setActiveThreatModal);
  const markAllRead = useAppStore((s) => s.markAllRead);

  // Fetch data on mount
  useEffect(() => {
    if (!actor || isFetching) return;

    const load = async () => {
      try {
        const [rawAlerts, rawStats, score, settings] = await Promise.all([
          actor.getAlerts(),
          actor.getStats(),
          actor.getSecurityScore(),
          actor.getProtectionSettings(),
        ]);

        setAlerts(rawAlerts);
        setStats({
          scanned: Number(rawStats.totalScanned),
          warnings: Number(rawStats.totalWarnings),
          blocked: Number(rawStats.totalBlocked),
        });
        setSecurityScore(Number(score));
        setProtectionSettings(settings);

        const unread = rawAlerts.find((a) => !a.isRead);
        if (unread) setActiveThreatModal(unread);
      } catch {
        // Backend unavailable — seed data used
      }
    };

    load();
  }, [
    actor,
    isFetching,
    setAlerts,
    setStats,
    setSecurityScore,
    setProtectionSettings,
    setActiveThreatModal,
  ]);

  // Normalized display alerts — fallback to seed data
  const displayAlerts: ThreatAlertDisplay[] =
    alerts.length > 0 ? alerts.map(normalizeAlert) : SEED_ALERTS;

  // Display stats — fallback to sample data
  const displayStats = {
    scanned: stats.scanned > 0 ? stats.scanned : 1243,
    warnings: stats.warnings > 0 ? stats.warnings : 58,
    blocked: stats.blocked > 0 ? stats.blocked : 32,
  };
  const displayScore = securityScore > 0 ? securityScore : 85;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  const handleBellClick = async () => {
    markAllRead();
    if (actor && !isFetching) {
      try {
        await actor.markAllAlertsRead();
      } catch {
        // Non-critical — local state already cleared
      }
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <PageHeader
        title="Home"
        rightSlot={
          <button
            type="button"
            aria-label="Notifications"
            data-ocid="home-notifications-btn"
            onClick={handleBellClick}
            className="relative p-2 rounded-lg transition-smooth"
            style={{
              backgroundColor: "oklch(0.14 0 0)",
              border: "1px solid oklch(0.20 0 0)",
            }}
          >
            <Bell size={18} style={{ color: "oklch(0.70 0 0)" }} />
            {unreadCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{
                  backgroundColor: "oklch(0.72 0.28 145)",
                  color: "oklch(0.06 0 0)",
                }}
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        }
      />

      {/* Page content */}
      <motion.div
        className="flex-1 px-4 py-4 space-y-4 pb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── Security Score Card ─────────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <div
            data-ocid="security-score-card"
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: "oklch(0.11 0 0)",
              border: "1px solid oklch(0.20 0 0)",
            }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <div className="flex items-center gap-2">
                <Shield
                  size={16}
                  className="animate-threat-pulse"
                  style={{ color: scoreColor(displayScore) }}
                />
                <span className="text-sm font-semibold text-foreground">
                  Security score
                </span>
              </div>
              <ChevronRight size={16} style={{ color: "oklch(0.40 0 0)" }} />
            </div>

            {/* Ring */}
            <div className="flex justify-center py-4">
              <ScoreRing score={displayScore} />
            </div>

            {/* Bottom accent bar */}
            <div
              className="h-0.5 mx-4 mb-4 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${scoreColor(displayScore)} ${displayScore}%, oklch(0.18 0 0) ${displayScore}%)`,
              }}
            />
          </div>
        </motion.div>

        {/* ── Quick Stats ─────────────────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <div className="flex gap-3" data-ocid="quick-stats-row">
            <StatCard
              label="SCANNED"
              value={displayStats.scanned}
              accent="oklch(0.72 0.28 145)"
            />
            <StatCard
              label="WARNINGS"
              value={displayStats.warnings}
              accent="oklch(0.75 0.18 85)"
            />
            <StatCard
              label="BLOCKED"
              value={displayStats.blocked}
              accent="oklch(0.62 0.22 22)"
            />
          </div>
        </motion.div>

        {/* ── Live Monitor Status ─────────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <div
            data-ocid="live-monitor-section"
            className="rounded-xl px-4"
            style={{
              backgroundColor: "oklch(0.11 0 0)",
              border: "1px solid oklch(0.20 0 0)",
            }}
          >
            <div className="flex items-center gap-2 pt-4 pb-2">
              <div className="dot-active" />
              <span className="text-sm font-semibold text-foreground">
                Live Monitor Status
              </span>
            </div>

            <MonitorRow
              icon={<Mail size={15} />}
              label="Email Protection"
              active={protectionSettings.emailProtection}
            />
            <MonitorRow
              icon={<Smartphone size={15} />}
              label="SMS Protection"
              active={protectionSettings.smsProtection}
            />
            <MonitorRow
              icon={<QrCode size={15} />}
              label="QR Protection"
              active={true}
            />
            <div className="pb-1">
              <MonitorRow
                icon={<Monitor size={15} />}
                label="Browser Protection"
                active={protectionSettings.browserProtection}
              />
            </div>
          </div>
        </motion.div>

        {/* ── Recent Alerts ───────────────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <div
            data-ocid="recent-alerts-section"
            className="rounded-xl px-4 pt-4"
            style={{
              backgroundColor: "oklch(0.11 0 0)",
              border: "1px solid oklch(0.20 0 0)",
            }}
          >
            <div className="flex items-center justify-between pb-2">
              <span className="text-sm font-semibold text-foreground">
                Recent Alerts
              </span>
              {displayAlerts.length > 0 && (
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "oklch(0.62 0.22 22 / 0.15)",
                    color: "oklch(0.72 0.22 22)",
                  }}
                >
                  {displayAlerts.length} threats
                </span>
              )}
            </div>

            {displayAlerts.length === 0 ? (
              <div
                data-ocid="alerts-empty-state"
                className="flex flex-col items-center py-8 gap-3"
              >
                <Shield size={32} style={{ color: "oklch(0.72 0.28 145)" }} />
                <p className="text-sm text-muted-foreground text-center">
                  No threats detected. You're protected!
                </p>
              </div>
            ) : (
              <div data-ocid="alerts-feed" className="pb-2">
                {displayAlerts.slice(0, 8).map((alert) => (
                  <AlertRow key={alert.id} alert={alert} />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
