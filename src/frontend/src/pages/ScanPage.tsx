import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Link2,
  Mail,
  QrCode,
  Search,
  ShieldAlert,
  ShieldCheck,
  SkipForward,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import {
  type ScanEntry,
  ScanResult,
  ThreatSource,
  ThreatType,
} from "../backend.d";
import { PageHeader } from "../components/Layout";
import { useAppStore } from "../store/useAppStore";
import type { ScanDisplay } from "../types";
import { normalizeScan } from "../types";

// ── Types ─────────────────────────────────────────────────────────────────
type TabId = "url" | "qr" | "email";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  { id: "url", label: "Paste URL", icon: <Link2 size={14} /> },
  { id: "qr", label: "QR Code", icon: <QrCode size={14} /> },
  { id: "email", label: "Email", icon: <Mail size={14} /> },
];

const SCAN_STAGES = [
  { id: "lexical", label: "Lexical Analysis", icon: <Search size={12} /> },
  { id: "domain", label: "Domain Age Check", icon: <Zap size={12} /> },
  {
    id: "nlp",
    label: "NLP Sentiment Analysis",
    icon: <ShieldAlert size={12} />,
  },
];

const RING_SCALES: [number, number, number] = [1, 0.67, 0.33];

// ── Radar SVG ─────────────────────────────────────────────────────────────
function RadarDisplay({ scanning }: { scanning: boolean }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 180, height: 180 }}
    >
      {/* Concentric rings */}
      {RING_SCALES.map((scale) => (
        <div
          key={scale}
          className="absolute rounded-full border border-primary/20"
          style={{ width: 180 * scale, height: 180 * scale }}
        />
      ))}
      {/* Cross-hair lines */}
      <div className="absolute w-full h-px bg-primary/15" />
      <div className="absolute w-px h-full bg-primary/15" />
      {/* Sweep */}
      {scanning && (
        <div
          className="absolute inset-0 rounded-full radar-sweep animate-radar-rotate"
          style={{ clipPath: "circle(50%)" }}
        />
      )}
      {/* Center dot */}
      <div className="dot-active z-10" />
      {/* Blips — only visible when scanning */}
      {scanning && (
        <>
          <div
            className="absolute w-2 h-2 rounded-full bg-primary animate-threat-pulse"
            style={{ top: "28%", left: "60%" }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/70"
            style={{ top: "55%", left: "30%" }}
          />
        </>
      )}
    </div>
  );
}

// ── QR Viewfinder ─────────────────────────────────────────────────────────
const BRACKET_POSITIONS = [
  { cls: "top-2 left-2", isTop: true, isLeft: true },
  { cls: "top-2 right-2", isTop: true, isLeft: false },
  { cls: "bottom-2 left-2", isTop: false, isLeft: true },
  { cls: "bottom-2 right-2", isTop: false, isLeft: false },
] as const;

function QrViewfinder({ scanning }: { scanning: boolean }) {
  return (
    <div
      className="relative rounded-lg overflow-hidden"
      style={{ width: 220, height: 220, background: "oklch(0.08 0 0)" }}
    >
      {/* Dark scanline bg */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-muted-foreground font-mono text-xs text-center px-4">
          Aim camera at QR code
        </span>
      </div>

      {/* Corner brackets */}
      {BRACKET_POSITIONS.map(({ cls, isTop, isLeft }) => (
        <div key={cls} className={`absolute ${cls} w-6 h-6`}>
          <div
            className="absolute"
            style={{
              width: "100%",
              height: 2,
              top: isTop ? 0 : "auto",
              bottom: !isTop ? 0 : "auto",
              background: "oklch(0.72 0.28 145)",
            }}
          />
          <div
            className="absolute"
            style={{
              height: "100%",
              width: 2,
              left: isLeft ? 0 : "auto",
              right: !isLeft ? 0 : "auto",
              background: "oklch(0.72 0.28 145)",
            }}
          />
        </div>
      ))}

      {/* Center crosshair */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-8 h-8">
          <div
            className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
            style={{ background: "oklch(0.72 0.28 145 / 0.7)" }}
          />
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "oklch(0.72 0.28 145 / 0.7)" }}
          />
        </div>
      </div>

      {/* Scanning sweep bar */}
      {scanning && (
        <motion.div
          className="absolute left-0 right-0 h-0.5"
          style={{
            background: "oklch(0.72 0.28 145 / 0.7)",
            boxShadow: "0 0 8px oklch(0.72 0.28 145)",
          }}
          animate={{ top: ["10%", "90%", "10%"] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}

// ── Stage Indicators ──────────────────────────────────────────────────────
function StageIndicators({ currentStage }: { currentStage: number }) {
  return (
    <div className="flex flex-col gap-2 w-full mt-4">
      {SCAN_STAGES.map((stage, i) => {
        const active = i < currentStage;
        const current = i === currentStage;
        return (
          <motion.div
            key={stage.id}
            className="flex items-center gap-2 rounded-md px-3 py-2"
            style={{
              background: active
                ? "oklch(0.72 0.28 145 / 0.12)"
                : current
                  ? "oklch(0.72 0.28 145 / 0.06)"
                  : "oklch(0.14 0 0)",
              border: `1px solid ${active ? "oklch(0.72 0.28 145 / 0.4)" : current ? "oklch(0.72 0.28 145 / 0.2)" : "oklch(0.22 0 0)"}`,
            }}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <span
              style={{
                color:
                  active || current
                    ? "oklch(0.72 0.28 145)"
                    : "oklch(0.45 0 0)",
              }}
            >
              {active ? <CheckCircle2 size={13} /> : stage.icon}
            </span>
            <span
              className="font-mono text-xs"
              style={{
                color: active
                  ? "oklch(0.72 0.28 145)"
                  : current
                    ? "oklch(0.75 0 0)"
                    : "oklch(0.45 0 0)",
              }}
            >
              {stage.label}
            </span>
            {active && (
              <span
                className="ml-auto font-mono text-xs"
                style={{ color: "oklch(0.72 0.28 145)" }}
              >
                ✓
              </span>
            )}
            {current && (
              <motion.span
                className="ml-auto font-mono text-xs"
                style={{ color: "oklch(0.72 0.28 145)" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
              >
                scanning...
              </motion.span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Result Card ───────────────────────────────────────────────────────────
const RESULT_META: Record<
  ScanResult,
  {
    label: string;
    color: string;
    bg: string;
    action: string;
    icon: React.ReactNode;
  }
> = {
  [ScanResult.phishing]: {
    label: "Phishing",
    color: "oklch(0.62 0.22 22)",
    bg: "oklch(0.62 0.22 22 / 0.12)",
    action: "Immediately avoid this URL. Do not enter credentials.",
    icon: <ShieldAlert size={18} />,
  },
  [ScanResult.malware]: {
    label: "Malware",
    color: "oklch(0.65 0.20 30)",
    bg: "oklch(0.65 0.20 30 / 0.12)",
    action: "Dangerous payload detected. Block and report this URL.",
    icon: <AlertTriangle size={18} />,
  },
  [ScanResult.spam]: {
    label: "Spam",
    color: "oklch(0.75 0.18 85)",
    bg: "oklch(0.75 0.18 85 / 0.12)",
    action: "Low-risk spam content. Proceed with caution.",
    icon: <AlertTriangle size={18} />,
  },
  [ScanResult.safe]: {
    label: "Safe",
    color: "oklch(0.72 0.28 145)",
    bg: "oklch(0.72 0.28 145 / 0.10)",
    action: "No threats detected. URL appears safe.",
    icon: <ShieldCheck size={18} />,
  },
};

function ResultCard({
  scan,
  onAddToAlerts,
  onDismiss,
}: {
  scan: ScanDisplay;
  onAddToAlerts: () => void;
  onDismiss: () => void;
}) {
  const meta = RESULT_META[scan.result];
  const isThreat = scan.result !== ScanResult.safe;

  return (
    <motion.div
      className="w-full rounded-xl overflow-hidden"
      style={{
        background: meta.bg,
        border: `1px solid ${meta.color}`,
        boxShadow: `0 0 20px ${meta.color}33`,
      }}
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* Header row */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ borderBottom: `1px solid ${meta.color}33` }}
      >
        <span style={{ color: meta.color }}>{meta.icon}</span>
        <span
          className="font-display font-semibold text-sm"
          style={{ color: meta.color }}
        >
          Threat Classification
        </span>
        <Badge
          className="ml-auto font-mono text-xs px-2"
          style={{
            background: meta.bg,
            color: meta.color,
            border: `1px solid ${meta.color}`,
          }}
        >
          {meta.label}
        </Badge>
      </div>

      <div className="px-4 py-3 space-y-4">
        {/* Confidence bar */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-muted-foreground font-mono">
              Confidence
            </span>
            <span
              className="text-xs font-mono font-bold"
              style={{ color: meta.color }}
            >
              {scan.confidence}%
            </span>
          </div>
          <div
            className="h-1.5 rounded-full"
            style={{ background: "oklch(0.22 0 0)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: meta.color }}
              initial={{ width: 0 }}
              animate={{ width: `${scan.confidence}%` }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            />
          </div>
        </div>

        {/* URL */}
        <div>
          <span className="text-xs text-muted-foreground font-mono block mb-1">
            Scanned URL
          </span>
          <p
            className="font-mono text-xs rounded px-2 py-1.5 truncate"
            style={{ background: "oklch(0.10 0 0)", color: "oklch(0.75 0 0)" }}
          >
            {scan.url}
          </p>
        </div>

        {/* Recommended action */}
        <div
          className="flex items-start gap-2 rounded-lg px-3 py-2"
          style={{ background: "oklch(0.10 0 0)" }}
        >
          <ChevronRight
            size={13}
            className="mt-0.5 shrink-0 text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground leading-relaxed">
            {meta.action}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          {isThreat && (
            <Button
              type="button"
              size="sm"
              className="flex-1 font-mono text-xs h-9"
              data-ocid="scan-add-to-alerts"
              onClick={onAddToAlerts}
              style={{
                background: meta.color,
                color: "oklch(0.06 0 0)",
                border: "none",
              }}
            >
              Add to Alerts
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="flex-1 font-mono text-xs h-9"
            data-ocid="scan-dismiss"
            onClick={onDismiss}
          >
            <SkipForward size={12} className="mr-1.5" />
            Dismiss
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main ScanPage ─────────────────────────────────────────────────────────
export default function ScanPage() {
  const { actor } = useActor(createActor);
  const addAlert = useAppStore((s) => s.addAlert);

  const [activeTab, setActiveTab] = useState<TabId>("url");
  const [urlInput, setUrlInput] = useState("");
  const [qrInput, setQrInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const [scanning, setScanning] = useState(false);
  const [stageIndex, setStageIndex] = useState(-1);
  const [result, setResult] = useState<ScanDisplay | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearStageTimers = useCallback(() => {
    if (stageTimer.current) clearTimeout(stageTimer.current);
  }, []);

  useEffect(() => () => clearStageTimers(), [clearStageTimers]);

  const runStages = useCallback((onComplete: () => Promise<void>) => {
    setStageIndex(0);
    stageTimer.current = setTimeout(() => {
      setStageIndex(1);
      stageTimer.current = setTimeout(() => {
        setStageIndex(2);
        stageTimer.current = setTimeout(async () => {
          setStageIndex(3);
          await onComplete();
        }, 500);
      }, 500);
    }, 500);
  }, []);

  const handleScan = useCallback(async () => {
    if (!actor) return;
    setError(null);
    setResult(null);

    const input =
      activeTab === "url"
        ? urlInput.trim()
        : activeTab === "qr"
          ? qrInput.trim()
          : emailInput.trim();

    if (!input) {
      setError("Please enter content to scan.");
      return;
    }

    setScanning(true);

    runStages(async () => {
      try {
        let entry: ScanEntry;
        if (activeTab === "url") entry = await actor.scanUrl(input);
        else if (activeTab === "qr") entry = await actor.scanQr(input);
        else entry = await actor.scanEmail(input);

        const display = normalizeScan(entry);
        setResult(display);

        if (display.result !== ScanResult.safe) {
          const alertPayload = {
            id: BigInt(Date.now()),
            url: display.url,
            source:
              activeTab === "email"
                ? ThreatSource.email
                : activeTab === "qr"
                  ? ThreatSource.qr
                  : ThreatSource.url,
            isRead: false,
            threatName: `${display.result.charAt(0).toUpperCase()}${display.result.slice(1)} URL`,
            threatType:
              display.result === ScanResult.phishing
                ? ThreatType.phishing
                : display.result === ScanResult.malware
                  ? ThreatType.malware
                  : ThreatType.spam,
            timestamp: BigInt(Date.now()) * 1_000_000n,
            riskScore: BigInt(display.confidence),
          };
          addAlert(alertPayload);
        }
      } catch {
        setError("Scan failed. Please try again.");
      } finally {
        setScanning(false);
      }
    });
  }, [actor, activeTab, urlInput, qrInput, emailInput, runStages, addAlert]);

  const handleTabChange = (id: TabId) => {
    if (scanning) return;
    setActiveTab(id);
    setResult(null);
    setError(null);
    setStageIndex(-1);
  };

  const handleDismiss = () => {
    setResult(null);
    setStageIndex(-1);
    setError(null);
  };

  return (
    <div className="flex flex-col min-h-0 flex-1">
      <PageHeader title="Threat Scanner" />

      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-5">
        {/* ── Tab Pills ──────────────────────────────────────────────────── */}
        <div
          className="flex gap-1 rounded-xl p-1 mt-2"
          style={{ background: "oklch(0.12 0 0)" }}
          data-ocid="scan-tab-bar"
        >
          {TABS.map((tab) => (
            <button
              type="button"
              key={tab.id}
              data-ocid={`scan-tab-${tab.id}`}
              onClick={() => handleTabChange(tab.id)}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 font-mono text-xs font-medium transition-smooth relative"
              style={{
                background:
                  activeTab === tab.id ? "oklch(0.18 0 0)" : "transparent",
                color:
                  activeTab === tab.id
                    ? "oklch(0.72 0.28 145)"
                    : "oklch(0.5 0 0)",
              }}
              disabled={scanning}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                  style={{ background: "oklch(0.72 0.28 145)" }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Tab Content ──────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="space-y-4"
          >
            {/* URL Tab */}
            {activeTab === "url" && (
              <div className="space-y-3">
                <label
                  htmlFor="url-input"
                  className="text-xs font-mono text-muted-foreground block"
                >
                  Enter URL to scan
                </label>
                <input
                  id="url-input"
                  data-ocid="scan-url-input"
                  className="w-full rounded-lg px-3 py-2.5 font-mono text-sm bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-smooth"
                  placeholder="https://suspicious-link.example.com"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  disabled={scanning}
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                />
              </div>
            )}

            {/* QR Tab */}
            {activeTab === "qr" && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <QrViewfinder scanning={scanning} />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="qr-input"
                    className="text-xs font-mono text-muted-foreground block"
                  >
                    Or enter QR URL manually
                  </label>
                  <input
                    id="qr-input"
                    data-ocid="scan-qr-input"
                    className="w-full rounded-lg px-3 py-2.5 font-mono text-sm bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-smooth"
                    placeholder="Paste decoded QR URL here"
                    value={qrInput}
                    onChange={(e) => setQrInput(e.target.value)}
                    disabled={scanning}
                    onKeyDown={(e) => e.key === "Enter" && handleScan()}
                  />
                </div>
              </div>
            )}

            {/* Email Tab */}
            {activeTab === "email" && (
              <div className="space-y-3">
                <label
                  htmlFor="email-input"
                  className="text-xs font-mono text-muted-foreground block"
                >
                  Paste full email content or a suspicious URL found in an email
                </label>
                <textarea
                  id="email-input"
                  data-ocid="scan-email-input"
                  className="w-full rounded-lg px-3 py-2.5 font-mono text-sm bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-smooth resize-none"
                  placeholder={
                    "Subject: Your account has been compromised\n\nDear Customer, please click the link below...\nhttps://fake-bank-login.net/verify"
                  }
                  rows={6}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  disabled={scanning}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Scan Button ──────────────────────────────────────────────────── */}
        {!scanning && !result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              type="button"
              data-ocid="scan-now-btn"
              onClick={handleScan}
              disabled={scanning || !actor}
              className="w-full h-12 font-display font-semibold text-sm tracking-wide"
              style={{
                background: "oklch(0.72 0.28 145)",
                color: "oklch(0.06 0 0)",
                boxShadow: "0 0 20px oklch(0.72 0.28 145 / 0.4)",
              }}
            >
              <Search size={16} className="mr-2" />
              SCAN NOW
            </Button>
          </motion.div>
        )}

        {/* ── Error ─────────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {error && (
            <motion.p
              className="text-xs font-mono text-center"
              style={{ color: "oklch(0.62 0.22 22)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── Scanning Panel ────────────────────────────────────────────────── */}
        <AnimatePresence>
          {scanning && (
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              data-ocid="scan-processing"
            >
              <RadarDisplay scanning={scanning} />
              <p
                className="font-mono text-xs mt-1 animate-neon-flicker"
                style={{ color: "oklch(0.72 0.28 145)" }}
              >
                ML Engine Running...
              </p>
              <StageIndicators currentStage={stageIndex} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Result Card ───────────────────────────────────────────────────── */}
        <AnimatePresence>
          {!scanning && result && (
            <ResultCard
              scan={result}
              onAddToAlerts={handleDismiss}
              onDismiss={handleDismiss}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
