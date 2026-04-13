import {
  Activity,
  Globe,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "../components/Layout";

// ── Data ──────────────────────────────────────────────────────────────────

const spoofedBrands = [
  { brand: "Amazon", threats: 342 },
  { brand: "Microsoft", threats: 298 },
  { brand: "PayPal", threats: 241 },
  { brand: "Google", threats: 219 },
  { brand: "Apple", threats: 187 },
  { brand: "Facebook", threats: 156 },
  { brand: "Netflix", threats: 112 },
];

const threatTimeline = [
  { day: "Mon", threats: 28 },
  { day: "Tue", threats: 45 },
  { day: "Wed", threats: 31 },
  { day: "Thu", threats: 67 },
  { day: "Fri", threats: 52 },
  { day: "Sat", threats: 38 },
  { day: "Sun", threats: 61 },
];

const threatTypes = [
  { name: "Phishing", value: 60 },
  { name: "Malware", value: 25 },
  { name: "Spam", value: 15 },
];

const THREAT_TYPE_COLORS = [
  "oklch(0.72 0.28 145)", // neon green — Phishing
  "oklch(0.62 0.22 22)", // red — Malware
  "oklch(0.75 0.18 85)", // amber — Spam
];

const summaryCards = [
  {
    label: "Total Threats",
    value: "1,555",
    delta: "+12%",
    up: true,
    icon: ShieldAlert,
    ocid: "stat-total-threats",
  },
  {
    label: "Zero-day Caught",
    value: "47",
    delta: "+8%",
    up: true,
    icon: Zap,
    ocid: "stat-zero-day",
  },
  {
    label: "URLs Scanned",
    value: "8,210",
    delta: "+23%",
    up: true,
    icon: Globe,
    ocid: "stat-urls-scanned",
  },
  {
    label: "Blocked",
    value: "1,322",
    delta: "-3%",
    up: false,
    icon: Activity,
    ocid: "stat-blocked",
  },
];

// ── Custom tooltip components ─────────────────────────────────────────────

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name?: string }>;
  label?: string;
}

function NeonTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded border px-3 py-2 text-xs font-mono"
      style={{
        background: "oklch(0.14 0 0)",
        borderColor: "oklch(0.72 0.28 145 / 0.4)",
        color: "oklch(0.93 0 0)",
      }}
    >
      <p className="text-muted-foreground mb-1">{label}</p>
      <p style={{ color: "oklch(0.72 0.28 145)" }}>
        {payload[0].value} threats
      </p>
    </div>
  );
}

function PieTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded border px-3 py-2 text-xs font-mono"
      style={{
        background: "oklch(0.14 0 0)",
        borderColor: "oklch(0.72 0.28 145 / 0.4)",
        color: "oklch(0.93 0 0)",
      }}
    >
      <p className="text-muted-foreground mb-1">{payload[0].name}</p>
      <p style={{ color: "oklch(0.72 0.28 145)" }}>{payload[0].value}%</p>
    </div>
  );
}

// ── Section header ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span
        className="w-1 h-4 rounded-sm"
        style={{ background: "oklch(0.72 0.28 145)" }}
      />
      <h2
        className="text-sm font-mono font-semibold tracking-widest uppercase"
        style={{ color: "oklch(0.72 0.28 145)" }}
      >
        {children}
      </h2>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col min-h-full">
      <PageHeader title="Threat Intelligence" />

      <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-6 pt-4">
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3">
          {summaryCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                data-ocid={card.ocid}
                className="rounded-xl border p-3"
                style={{
                  background: "oklch(0.12 0 0)",
                  borderColor: "oklch(0.22 0 0)",
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <Icon size={16} style={{ color: "oklch(0.72 0.28 145)" }} />
                  <span
                    className="flex items-center gap-0.5 text-xs font-mono"
                    style={{
                      color: card.up
                        ? "oklch(0.72 0.28 145)"
                        : "oklch(0.62 0.22 22)",
                    }}
                  >
                    {card.up ? (
                      <TrendingUp size={11} />
                    ) : (
                      <TrendingDown size={11} />
                    )}
                    {card.delta}
                  </span>
                </div>
                <p
                  className="text-xl font-mono font-bold leading-none"
                  style={{ color: "oklch(0.93 0 0)" }}
                >
                  {card.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Top Spoofed Brands — Bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-xl border p-4"
          style={{
            background: "oklch(0.12 0 0)",
            borderColor: "oklch(0.22 0 0)",
          }}
          data-ocid="chart-spoofed-brands"
        >
          <SectionLabel>Top Spoofed Brands</SectionLabel>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={spoofedBrands}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              barCategoryGap="28%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.22 0 0)"
                vertical={false}
              />
              <XAxis
                dataKey="brand"
                tick={{
                  fill: "oklch(0.5 0 0)",
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{
                  fill: "oklch(0.5 0 0)",
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<NeonTooltip />}
                cursor={{ fill: "oklch(0.72 0.28 145 / 0.06)" }}
              />
              <Bar
                dataKey="threats"
                fill="oklch(0.72 0.28 145)"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Threat Levels Over Time — Line chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-xl border p-4"
          style={{
            background: "oklch(0.12 0 0)",
            borderColor: "oklch(0.22 0 0)",
          }}
          data-ocid="chart-threat-timeline"
        >
          <SectionLabel>Threat Levels Over Time</SectionLabel>
          <p className="text-xs text-muted-foreground mb-4 font-mono -mt-2">
            Zero-day threats caught — last 7 days
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart
              data={threatTimeline}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.22 0 0)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{
                  fill: "oklch(0.5 0 0)",
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{
                  fill: "oklch(0.5 0 0)",
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<NeonTooltip />}
                cursor={{
                  stroke: "oklch(0.72 0.28 145 / 0.3)",
                  strokeWidth: 1,
                }}
              />
              <Line
                type="monotone"
                dataKey="threats"
                stroke="oklch(0.72 0.28 145)"
                strokeWidth={2}
                dot={{ fill: "oklch(0.72 0.28 145)", r: 3, strokeWidth: 0 }}
                activeDot={{
                  fill: "oklch(0.72 0.28 145)",
                  r: 5,
                  strokeWidth: 0,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Threat Type Distribution — Donut chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="rounded-xl border p-4"
          style={{
            background: "oklch(0.12 0 0)",
            borderColor: "oklch(0.22 0 0)",
          }}
          data-ocid="chart-threat-types"
        >
          <SectionLabel>Threat Types Distribution</SectionLabel>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={threatTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {threatTypes.map((entry, index) => (
                    <Cell key={entry.name} fill={THREAT_TYPE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value: string) => (
                    <span
                      style={{
                        color: "oklch(0.82 0 0)",
                        fontSize: 11,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground font-mono pb-2">
          Data refreshed every 15 minutes · Powered by AI Threat Engine
        </p>
      </div>
    </div>
  );
}
