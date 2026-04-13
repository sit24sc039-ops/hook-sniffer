import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { Activity, Globe, ShieldAlert, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import { ScanResult, ScanType } from "../backend.d";
import { PageHeader } from "../components/Layout";
import type { ScanDisplay } from "../types";
import { normalizeScan } from "../types";

// ── Threat hotspot data ───────────────────────────────────────────────────

interface ThreatDot {
  id: string;
  x: number;
  y: number;
  intensity: "high" | "medium" | "low";
  label: string;
}

const THREAT_DOTS: ThreatDot[] = [
  { id: "us-east", x: 21, y: 33, intensity: "high", label: "US East Coast" },
  { id: "us-west", x: 13, y: 32, intensity: "medium", label: "US West Coast" },
  { id: "brazil", x: 27, y: 62, intensity: "high", label: "Brazil" },
  { id: "uk", x: 46, y: 26, intensity: "medium", label: "United Kingdom" },
  { id: "germany", x: 49, y: 25, intensity: "low", label: "Germany" },
  { id: "russia", x: 58, y: 21, intensity: "medium", label: "Russia" },
  { id: "india", x: 66, y: 40, intensity: "high", label: "South Asia" },
  { id: "china", x: 74, y: 31, intensity: "high", label: "East Asia" },
  { id: "nigeria", x: 49, y: 48, intensity: "medium", label: "West Africa" },
  { id: "australia", x: 78, y: 68, intensity: "low", label: "Australia" },
  { id: "japan", x: 80, y: 30, intensity: "medium", label: "Japan" },
  { id: "mexico", x: 16, y: 42, intensity: "low", label: "Mexico" },
];

const DOT_COLORS = {
  high: { fill: "oklch(0.62 0.22 22)", glow: "oklch(0.62 0.22 22 / 0.5)" },
  medium: { fill: "oklch(0.72 0.28 145)", glow: "oklch(0.72 0.28 145 / 0.5)" },
  low: { fill: "oklch(0.72 0.18 85)", glow: "oklch(0.72 0.18 85 / 0.4)" },
};

// ── Static demo counters ──────────────────────────────────────────────────

const MAP_STATS = [
  {
    label: "Active Threats",
    value: "2.4K",
    icon: ShieldAlert,
    color: "text-destructive",
  },
  {
    label: "Blocked Today",
    value: "847",
    icon: ShieldCheck,
    color: "text-primary",
  },
  { label: "Countries", value: "12", icon: Globe, color: "text-primary" },
];

// ── Demo scan history ─────────────────────────────────────────────────────

const DEMO_HISTORY: ScanDisplay[] = [
  {
    id: "d1",
    url: "https://sbi-netbanking-secure.phish.tk",
    result: ScanResult.phishing,
    scanType: ScanType.url,
    timestamp: Date.now() - 240000,
    confidence: 97,
  },
  {
    id: "d2",
    url: "https://amzn-order-verify.click",
    result: ScanResult.phishing,
    scanType: ScanType.email,
    timestamp: Date.now() - 1080000,
    confidence: 92,
  },
  {
    id: "d3",
    url: "https://paypal.com/dashboard",
    result: ScanResult.safe,
    scanType: ScanType.url,
    timestamp: Date.now() - 2100000,
    confidence: 99,
  },
  {
    id: "d4",
    url: "https://qr.crime.net/free-reward",
    result: ScanResult.malware,
    scanType: ScanType.qr,
    timestamp: Date.now() - 3720000,
    confidence: 88,
  },
  {
    id: "d5",
    url: "https://github.com",
    result: ScanResult.safe,
    scanType: ScanType.url,
    timestamp: Date.now() - 5400000,
    confidence: 100,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────

function relativeTime(ms: number): string {
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function scanTypeLabel(t: ScanType): string {
  const map: Record<ScanType, string> = {
    [ScanType.url]: "URL",
    [ScanType.qr]: "QR",
    [ScanType.email]: "Email",
  };
  return map[t] ?? "URL";
}

function resultBadgeVariant(
  r: ScanResult,
): "default" | "destructive" | "secondary" | "outline" {
  if (r === ScanResult.safe) return "default";
  if (r === ScanResult.phishing || r === ScanResult.malware)
    return "destructive";
  return "secondary";
}

function resultLabel(r: ScanResult): string {
  return r.charAt(0).toUpperCase() + r.slice(1);
}

// ── SVG World Map ─────────────────────────────────────────────────────────

function WorldMapSVG() {
  return (
    <svg
      viewBox="0 0 100 57"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* North America */}
      <path
        d="M5 16 L10 12 L15 10 L20 11 L24 14 L26 20 L24 28 L22 32 L20 38 L18 42 L16 46 L18 50 L20 54 L16 56 L14 52 L10 46 L8 38 L6 30 L4 24 Z"
        fill="oklch(0.18 0 0)"
        stroke="oklch(0.28 0 0)"
        strokeWidth="0.4"
      />
      {/* Greenland */}
      <path
        d="M22 6 L28 4 L32 6 L30 12 L26 14 L22 12 Z"
        fill="oklch(0.18 0 0)"
        stroke="oklch(0.28 0 0)"
        strokeWidth="0.4"
      />
      {/* South America */}
      <path
        d="M20 38 L24 36 L28 38 L30 44 L28 52 L24 56 L20 54 L18 50 L20 46 L20 42 Z"
        fill="oklch(0.18 0 0)"
        stroke="oklch(0.28 0 0)"
        strokeWidth="0.4"
      />
      {/* Europe */}
      <path
        d="M44 14 L48 12 L52 13 L54 16 L52 20 L48 22 L44 20 L42 17 Z"
        fill="oklch(0.18 0 0)"
        stroke="oklch(0.28 0 0)"
        strokeWidth="0.4"
      />
      {/* Scandinavia */}
      <path
        d="M46 10 L50 8 L52 10 L50 14 L47 14 Z"
        fill="oklch(0.18 0 0)"
        stroke="oklch(0.28 0 0)"
        strokeWidth="0.4"
      />
      {/* Africa */}
      <path
        d="M44 22 L50 20 L54 22 L56 28 L54 36 L52 44 L48 50 L44 48 L42 42 L40 34 L42 28 Z"
        fill="oklch(0.18 0 0)"
        stroke="oklch(0.28 0 0)"
        strokeWidth="0.4"
      />
      {/* Russia / Central Asia */}
      <path
        d="M52 10 L60 8 L68 9 L74 12 L78 14 L76 18 L70 20 L62 18 L56 16 L52 14 Z"
        fill="oklch(0.18 0 0)"
        stroke="oklch(0.28 0 0)"
        strokeWidth="0.4"
      />
      {/* Middle East */}
      <path
        d="M54 22 L60 20 L64 24 L62 30 L58 30 L54 28 Z"
        fill="oklch(0.18 0 0)"
        stroke="oklch(0.28 0 0)"
        strokeWidth="0.4"
      />
      {/* South Asia */}
      <path
        d="M62 28 L68 26 L72 30 L70 38 L66 42 L62 38 L60 32 Z"
        fill="oklch(0.18 0 0)"
        stroke="oklch(0.28 0 0)"
        strokeWidth="0.4"
      />
      {/* East Asia */}
      <path
        d="M70 18 L78 16 L82 20 L80 28 L76 30 L72 28 L68 24 L70 20 Z"
        fill="oklch(0.18 0 0)"
        stroke="oklch(0.28 0 0)"
        strokeWidth="0.4"
      />
      {/* Southeast Asia */}
      <path
        d="M74 32 L78 30 L80 34 L78 38 L74 36 Z"
        fill="oklch(0.18 0 0)"
        stroke="oklch(0.28 0 0)"
        strokeWidth="0.4"
      />
      {/* Japan */}
      <path
        d="M80 24 L83 22 L84 26 L82 28 L80 26 Z"
        fill="oklch(0.18 0 0)"
        stroke="oklch(0.28 0 0)"
        strokeWidth="0.4"
      />
      {/* Australia */}
      <path
        d="M74 58 L80 55 L86 56 L88 62 L84 66 L78 66 L74 63 Z"
        fill="oklch(0.18 0 0)"
        stroke="oklch(0.28 0 0)"
        strokeWidth="0.4"
      />
    </svg>
  );
}

// ── Pulsing threat dot ────────────────────────────────────────────────────

function ThreatDotMarker({ dot, index }: { dot: ThreatDot; index: number }) {
  const colors = DOT_COLORS[dot.intensity];
  const size =
    dot.intensity === "high" ? 1.4 : dot.intensity === "medium" ? 1.1 : 0.85;

  return (
    <g
      transform={`translate(${dot.x}, ${dot.y})`}
      aria-label={`Threat: ${dot.label}`}
    >
      <circle
        r={size * 2.5}
        fill="none"
        stroke={colors.fill}
        strokeWidth="0.3"
        opacity="0.3"
        style={{
          animation: `threat-ring-pulse 2s ease-in-out ${index * 0.22}s infinite`,
        }}
      />
      <circle
        r={size * 1.6}
        fill="none"
        stroke={colors.fill}
        strokeWidth="0.25"
        opacity="0.5"
        style={{
          animation: `threat-ring-pulse 2s ease-in-out ${index * 0.22 + 0.3}s infinite`,
        }}
      />
      <circle
        r={size * 0.7}
        fill={colors.fill}
        style={{ filter: `drop-shadow(0 0 ${size * 2}px ${colors.glow})` }}
      />
    </g>
  );
}

// ── Scan history row ──────────────────────────────────────────────────────

function ScanHistoryRow({
  entry,
  index,
}: { entry: ScanDisplay; index: number }) {
  const isThreat = entry.result !== ScanResult.safe;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0"
      data-ocid={`scan-history-row-${entry.id}`}
    >
      <div
        className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
        style={{
          backgroundColor: isThreat
            ? "oklch(0.62 0.22 22 / 0.15)"
            : "oklch(0.72 0.28 145 / 0.12)",
        }}
      >
        {isThreat ? (
          <ShieldAlert
            className="w-4 h-4"
            style={{ color: "oklch(0.62 0.22 22)" }}
          />
        ) : (
          <ShieldCheck className="w-4 h-4 text-primary" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-mono text-foreground truncate">
          {entry.url}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-muted-foreground">
            {scanTypeLabel(entry.scanType)}
          </span>
          <span className="text-xs text-muted-foreground opacity-40">·</span>
          <span className="text-xs text-muted-foreground">
            {relativeTime(entry.timestamp)}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0">
        <Badge
          variant={resultBadgeVariant(entry.result)}
          className="text-xs py-0 h-5"
          data-ocid={`scan-result-badge-${entry.id}`}
        >
          {resultLabel(entry.result)}
        </Badge>
        {isThreat && (
          <span
            className="text-xs font-mono font-semibold"
            style={{ color: "oklch(0.62 0.22 22)" }}
          >
            {entry.confidence}%
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────

function EmptyHistory() {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-8 text-center"
      data-ocid="scan-history-empty"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{ backgroundColor: "oklch(0.72 0.28 145 / 0.1)" }}
      >
        <Activity className="w-7 h-7 text-primary" />
      </div>
      <p className="text-base font-display font-semibold text-foreground mb-1">
        No scan history yet
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Scanned URLs, QR codes, and emails will appear here once you start
        protecting your device.
      </p>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────

export default function MapPage() {
  const { actor, isFetching } = useActor(createActor);
  const [history, setHistory] = useState<ScanDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const tooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getScanHistory()
      .then((raw) => {
        const normalized = raw
          .map(normalizeScan)
          .sort((a, b) => b.timestamp - a.timestamp);
        setHistory(normalized.length > 0 ? normalized : DEMO_HISTORY);
      })
      .catch(() => setHistory(DEMO_HISTORY))
      .finally(() => setLoading(false));
  }, [actor, isFetching]);

  function handleDotHover(label: string | null) {
    if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
    setActiveLabel(label);
    if (label) {
      tooltipTimer.current = setTimeout(() => setActiveLabel(null), 2500);
    }
  }

  return (
    <div
      className="flex flex-col min-h-full bg-background"
      data-ocid="map-page"
    >
      <PageHeader
        title="Threat Map"
        rightSlot={
          <div className="flex items-center gap-1.5">
            <span className="dot-active animate-threat-pulse" />
            <span className="text-xs font-mono text-primary">LIVE</span>
          </div>
        }
      />

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-3 gap-2 px-4 py-3"
        style={{ backgroundColor: "oklch(0.10 0 0)" }}
      >
        {MAP_STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center py-2 px-1 rounded-xl"
            style={{ backgroundColor: "oklch(0.14 0 0)" }}
            data-ocid={`map-stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <stat.icon className={`w-4 h-4 mb-1 ${stat.color}`} />
            <span className={`text-lg font-display font-bold ${stat.color}`}>
              {stat.value}
            </span>
            <span className="text-[10px] text-muted-foreground text-center leading-tight">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Map section */}
      <div className="px-4 pt-3 pb-2">
        {/* Section header */}
        <div className="flex items-center gap-2 mb-3" data-ocid="map-header">
          <div
            className="w-1 h-5 rounded-full"
            style={{ backgroundColor: "oklch(0.72 0.28 145)" }}
          />
          <h2 className="text-sm font-display font-semibold text-foreground tracking-wide uppercase">
            Global Threat Intelligence
          </h2>
          <span className="dot-active animate-threat-pulse ml-1" />
        </div>

        {/* SVG map container */}
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-border"
          style={{
            backgroundColor: "oklch(0.06 0 0)",
            boxShadow: "inset 0 0 40px oklch(0.72 0.28 145 / 0.04)",
          }}
          data-ocid="threat-map-container"
        >
          {/* Grid overlay */}
          <svg
            viewBox="0 0 100 57"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            {[14, 28, 43].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="oklch(0.72 0.28 145 / 0.06)"
                strokeWidth="0.3"
              />
            ))}
            {[25, 50, 75].map((x) => (
              <line
                key={x}
                x1={x}
                y1="0"
                x2={x}
                y2="57"
                stroke="oklch(0.72 0.28 145 / 0.06)"
                strokeWidth="0.3"
              />
            ))}
          </svg>

          {/* World map + dots */}
          <div className="relative w-full" style={{ paddingBottom: "57%" }}>
            <div className="absolute inset-0">
              <WorldMapSVG />
            </div>

            <svg
              viewBox="0 0 100 57"
              className="absolute inset-0 w-full h-full"
              style={{ overflow: "visible" }}
              role="img"
              aria-label="Live threat locations worldwide"
            >
              <title>Live threat locations worldwide</title>
              {THREAT_DOTS.map((dot, i) => (
                <g
                  key={dot.id}
                  onMouseEnter={() => handleDotHover(dot.label)}
                  onMouseLeave={() => handleDotHover(null)}
                  onFocus={() => handleDotHover(dot.label)}
                  onBlur={() => handleDotHover(null)}
                  tabIndex={0}
                  style={{ cursor: "pointer", outline: "none" }}
                >
                  <ThreatDotMarker dot={dot} index={i} />
                </g>
              ))}
            </svg>
          </div>

          {/* Hover tooltip */}
          {activeLabel && (
            <div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-mono text-foreground animate-slide-up pointer-events-none"
              style={{
                backgroundColor: "oklch(0.16 0 0 / 0.95)",
                border: "1px solid oklch(0.72 0.28 145 / 0.4)",
                backdropFilter: "blur(8px)",
                whiteSpace: "nowrap",
              }}
            >
              <span className="text-primary mr-1">⚡</span>
              {activeLabel}
            </div>
          )}

          {/* Legend */}
          <div
            className="flex items-center gap-3 px-3 py-2"
            style={{ borderTop: "1px solid oklch(0.16 0 0)" }}
          >
            {(["high", "medium", "low"] as const).map((level) => (
              <div key={level} className="flex items-center gap-1.5">
                <span
                  className="block w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: DOT_COLORS[level].fill,
                    boxShadow: `0 0 5px ${DOT_COLORS[level].glow}`,
                  }}
                />
                <span className="text-[10px] text-muted-foreground capitalize">
                  {level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scan History */}
      <div className="flex-1 px-4 pb-4 mt-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-1 h-5 rounded-full"
              style={{ backgroundColor: "oklch(0.72 0.28 145)" }}
            />
            <h2 className="text-sm font-display font-semibold text-foreground tracking-wide uppercase">
              Scan History
            </h2>
          </div>
          {!loading && (
            <span className="text-xs text-muted-foreground font-mono">
              {history.length} entries
            </span>
          )}
        </div>

        <div
          className="rounded-2xl border border-border overflow-hidden"
          style={{ backgroundColor: "oklch(0.10 0 0)" }}
          data-ocid="scan-history-list"
        >
          {loading ? (
            <div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0"
                >
                  <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-4/5 rounded" />
                    <Skeleton className="h-2.5 w-2/5 rounded" />
                  </div>
                  <Skeleton className="h-5 w-14 rounded-full shrink-0" />
                </div>
              ))}
            </div>
          ) : history.length === 0 ? (
            <EmptyHistory />
          ) : (
            <ScrollArea className="max-h-64">
              {history.map((entry, i) => (
                <ScanHistoryRow key={entry.id} entry={entry} index={i} />
              ))}
            </ScrollArea>
          )}
        </div>
      </div>

      {/* Inline keyframe for ring pulse (not defined globally) */}
      <style>{`
        @keyframes threat-ring-pulse {
          0%, 100% { opacity: 0.15; transform: scale(0.9); }
          50%       { opacity: 0.5;  transform: scale(1.2); }
        }
        @media (prefers-reduced-motion: reduce) {
          circle[style*="threat-ring-pulse"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
