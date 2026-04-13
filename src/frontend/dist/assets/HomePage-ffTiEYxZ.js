import { c as createLucideIcon, u as useActor, a as useAppStore, r as reactExports, j as jsxRuntimeExports, P as PageHeader, b as createActor } from "./index-B9QzGcrp.js";
import { n as normalizeAlert, T as ThreatType, a as ThreatSource } from "./types-D5Hoju2w.js";
import { m as motion } from "./proxy-DXWyW35z.js";
import { S as Shield } from "./shield-BWtu2nWP.js";
import { C as ChevronRight } from "./chevron-right-BR06CZkr.js";
import { M as Mail, Q as QrCode } from "./qr-code-R1Uy9or9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
];
const Monitor = createLucideIcon("monitor", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode);
function scoreColor(score) {
  if (score >= 70) return "oklch(0.72 0.28 145)";
  if (score >= 40) return "oklch(0.75 0.18 85)";
  return "oklch(0.62 0.22 22)";
}
function scoreLabel(score) {
  if (score >= 80) return "SECURE";
  if (score >= 60) return "FAIR";
  if (score >= 40) return "CAUTION";
  return "AT RISK";
}
function ScoreRing({ score }) {
  const r = 64;
  const cx = 80;
  const cy = 80;
  const sweep = 270;
  const sweepRad = sweep * Math.PI / 180;
  const startAngle = 135 * (Math.PI / 180);
  const filled = score / 100 * sweepRad;
  const describeArc = (start, end) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "160",
      height: "160",
      viewBox: "0 0 160 160",
      role: "img",
      "aria-label": `Security score ${score}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
          "Security score ",
          score
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "glow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "3", result: "coloredBlur" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "coloredBlur" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: describeArc(startAngle, trackEnd),
            fill: "none",
            stroke: "oklch(0.22 0 0)",
            strokeWidth: "10",
            strokeLinecap: "round"
          }
        ),
        score > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: describeArc(startAngle, progressEnd),
            fill: "none",
            stroke: color,
            strokeWidth: "10",
            strokeLinecap: "round",
            filter: "url(#glow)",
            style: {
              transition: "stroke 0.5s ease"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: cx,
            y: cy - 6,
            textAnchor: "middle",
            dominantBaseline: "middle",
            fontSize: "36",
            fontWeight: "700",
            fontFamily: "var(--font-display)",
            fill: color,
            children: score
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: cx,
            y: cy + 22,
            textAnchor: "middle",
            dominantBaseline: "middle",
            fontSize: "11",
            fontWeight: "600",
            fontFamily: "var(--font-mono)",
            letterSpacing: "2",
            fill: color,
            children: scoreLabel(score)
          }
        )
      ]
    }
  );
}
function StatCard({
  label,
  value,
  accent = "oklch(0.72 0.28 145)"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 flex flex-col items-center py-4 rounded-lg",
      style: {
        backgroundColor: "oklch(0.12 0 0)",
        border: "1px solid oklch(0.20 0 0)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-2xl font-display font-bold tabular-nums",
            style: { color: accent },
            children: value.toLocaleString()
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs font-mono mt-1",
            style: { color: "oklch(0.50 0 0)" },
            children: label
          }
        )
      ]
    }
  );
}
function MonitorRow({ icon, label, active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
        style: {
          backgroundColor: active ? "oklch(0.72 0.28 145 / 0.12)" : "oklch(0.14 0 0)",
          border: `1px solid ${active ? "oklch(0.72 0.28 145 / 0.4)" : "oklch(0.20 0 0)"}`
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: { color: active ? "oklch(0.72 0.28 145)" : "oklch(0.35 0 0)" },
            children: icon
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm font-body text-foreground", children: label }),
    active ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 15, style: { color: "oklch(0.72 0.28 145)" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-xs font-mono",
          style: { color: "oklch(0.72 0.28 145)" },
          children: "ACTIVE"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 15, style: { color: "oklch(0.38 0 0)" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-xs font-mono",
          style: { color: "oklch(0.38 0 0)" },
          children: "OFF"
        }
      )
    ] })
  ] });
}
function riskBadgeColor(score) {
  if (score >= 70)
    return { bg: "oklch(0.62 0.22 22 / 0.15)", fg: "oklch(0.72 0.22 22)" };
  if (score >= 40)
    return { bg: "oklch(0.75 0.18 85 / 0.15)", fg: "oklch(0.75 0.18 85)" };
  return { bg: "oklch(0.72 0.28 145 / 0.12)", fg: "oklch(0.72 0.28 145)" };
}
function timeAgo(ms) {
  const diff = Date.now() - ms;
  const minutes = Math.floor(diff / 6e4);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
function AlertRow({ alert }) {
  const riskColors = riskBadgeColor(alert.riskScore);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "recent-alert-row",
      className: "flex items-center gap-3 py-3 border-b",
      style: { borderColor: "oklch(0.16 0 0)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold",
            style: { backgroundColor: riskColors.bg, color: riskColors.fg },
            children: alert.riskScore
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: alert.threatName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-mono truncate mt-0.5",
              style: { color: "oklch(0.45 0 0)" },
              children: alert.url
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs px-2 py-0.5 rounded-full font-mono capitalize",
              style: {
                backgroundColor: "oklch(0.16 0 0)",
                color: "oklch(0.55 0 0)"
              },
              children: alert.threatType
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", style: { color: "oklch(0.40 0 0)" }, children: timeAgo(alert.timestamp) })
        ] })
      ]
    }
  );
}
const SEED_ALERTS = [
  {
    id: "1",
    url: "https://crime.com/login",
    source: ThreatSource.email,
    isRead: true,
    threatName: "SBI NetBanking Clone",
    threatType: ThreatType.phishing,
    timestamp: Date.now() - 5 * 6e4,
    riskScore: 92
  },
  {
    id: "2",
    url: "https://amaz0n-secure.net/account",
    source: ThreatSource.url,
    isRead: true,
    threatName: "Amazon Credential Harvest",
    threatType: ThreatType.phishing,
    timestamp: Date.now() - 45 * 6e4,
    riskScore: 87
  },
  {
    id: "3",
    url: "https://paypal-verify.pw/update",
    source: ThreatSource.sms,
    isRead: true,
    threatName: "PayPal SMS Spoofing",
    threatType: ThreatType.phishing,
    timestamp: Date.now() - 3 * 36e5,
    riskScore: 78
  },
  {
    id: "4",
    url: "https://malware-dist.ru/payload.exe",
    source: ThreatSource.email,
    isRead: true,
    threatName: "Malware Dropper",
    threatType: ThreatType.malware,
    timestamp: Date.now() - 8 * 36e5,
    riskScore: 96
  },
  {
    id: "5",
    url: "https://promo-spam.click/offer",
    source: ThreatSource.url,
    isRead: true,
    threatName: "Promotional Spam",
    threatType: ThreatType.spam,
    timestamp: Date.now() - 26 * 36e5,
    riskScore: 35
  }
];
function HomePage() {
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
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    const load = async () => {
      try {
        const [rawAlerts, rawStats, score, settings] = await Promise.all([
          actor.getAlerts(),
          actor.getStats(),
          actor.getSecurityScore(),
          actor.getProtectionSettings()
        ]);
        setAlerts(rawAlerts);
        setStats({
          scanned: Number(rawStats.totalScanned),
          warnings: Number(rawStats.totalWarnings),
          blocked: Number(rawStats.totalBlocked)
        });
        setSecurityScore(Number(score));
        setProtectionSettings(settings);
        const unread = rawAlerts.find((a) => !a.isRead);
        if (unread) setActiveThreatModal(unread);
      } catch {
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
    setActiveThreatModal
  ]);
  const displayAlerts = alerts.length > 0 ? alerts.map(normalizeAlert) : SEED_ALERTS;
  const displayStats = {
    scanned: stats.scanned > 0 ? stats.scanned : 1243,
    warnings: stats.warnings > 0 ? stats.warnings : 58,
    blocked: stats.blocked > 0 ? stats.blocked : 32
  };
  const displayScore = securityScore > 0 ? securityScore : 85;
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };
  const handleBellClick = async () => {
    markAllRead();
    if (actor && !isFetching) {
      try {
        await actor.markAllAlertsRead();
      } catch {
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Home",
        rightSlot: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "aria-label": "Notifications",
            "data-ocid": "home-notifications-btn",
            onClick: handleBellClick,
            className: "relative p-2 rounded-lg transition-smooth",
            style: {
              backgroundColor: "oklch(0.14 0 0)",
              border: "1px solid oklch(0.20 0 0)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 18, style: { color: "oklch(0.70 0 0)" } }),
              unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold",
                  style: {
                    backgroundColor: "oklch(0.72 0.28 145)",
                    color: "oklch(0.06 0 0)"
                  },
                  children: unreadCount > 9 ? "9+" : unreadCount
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "flex-1 px-4 py-4 space-y-4 pb-6",
        variants: containerVariants,
        initial: "hidden",
        animate: "visible",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: itemVariants, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "security-score-card",
              className: "rounded-xl overflow-hidden",
              style: {
                backgroundColor: "oklch(0.11 0 0)",
                border: "1px solid oklch(0.20 0 0)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 pt-4 pb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Shield,
                      {
                        size: 16,
                        className: "animate-threat-pulse",
                        style: { color: scoreColor(displayScore) }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Security score" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, style: { color: "oklch(0.40 0 0)" } })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreRing, { score: displayScore }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-0.5 mx-4 mb-4 rounded-full",
                    style: {
                      background: `linear-gradient(90deg, ${scoreColor(displayScore)} ${displayScore}%, oklch(0.18 0 0) ${displayScore}%)`
                    }
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: itemVariants, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", "data-ocid": "quick-stats-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "SCANNED",
                value: displayStats.scanned,
                accent: "oklch(0.72 0.28 145)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "WARNINGS",
                value: displayStats.warnings,
                accent: "oklch(0.75 0.18 85)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "BLOCKED",
                value: displayStats.blocked,
                accent: "oklch(0.62 0.22 22)"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: itemVariants, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "live-monitor-section",
              className: "rounded-xl px-4",
              style: {
                backgroundColor: "oklch(0.11 0 0)",
                border: "1px solid oklch(0.20 0 0)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-4 pb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dot-active" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Live Monitor Status" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MonitorRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 15 }),
                    label: "Email Protection",
                    active: protectionSettings.emailProtection
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MonitorRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { size: 15 }),
                    label: "SMS Protection",
                    active: protectionSettings.smsProtection
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MonitorRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { size: 15 }),
                    label: "QR Protection",
                    active: true
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MonitorRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { size: 15 }),
                    label: "Browser Protection",
                    active: protectionSettings.browserProtection
                  }
                ) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: itemVariants, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "recent-alerts-section",
              className: "rounded-xl px-4 pt-4",
              style: {
                backgroundColor: "oklch(0.11 0 0)",
                border: "1px solid oklch(0.20 0 0)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Recent Alerts" }),
                  displayAlerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-xs font-mono px-2 py-0.5 rounded-full",
                      style: {
                        backgroundColor: "oklch(0.62 0.22 22 / 0.15)",
                        color: "oklch(0.72 0.22 22)"
                      },
                      children: [
                        displayAlerts.length,
                        " threats"
                      ]
                    }
                  )
                ] }),
                displayAlerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": "alerts-empty-state",
                    className: "flex flex-col items-center py-8 gap-3",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 32, style: { color: "oklch(0.72 0.28 145)" } }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "No threats detected. You're protected!" })
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "alerts-feed", className: "pb-2", children: displayAlerts.slice(0, 8).map((alert) => /* @__PURE__ */ jsxRuntimeExports.jsx(AlertRow, { alert }, alert.id)) })
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
export {
  HomePage as default
};
