import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Copy,
  ExternalLink,
  Link2,
  LogOut,
  Phone,
  Shield,
  ShieldCheck,
  Unlink,
  User,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { PageHeader } from "../components/Layout";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { useAppStore } from "../store/useAppStore";
import type { LinkedAccount, LinkedPhone, ProtectionSettings } from "../types";

// ── Helpline data ────────────────────────────────────────────────────────────

const HELPLINES = [
  {
    name: "National Cyber Crime Portal",
    number: "1930",
    description: "Report cybercrime incidents",
    icon: Shield,
  },
  {
    name: "RBI Fraud Helpline",
    number: "14440",
    description: "Banking fraud & phishing",
    icon: AlertTriangle,
  },
  {
    name: "Cyber Crime Helpline India",
    number: "1930",
    description: "24/7 cyber threat response",
    icon: Phone,
  },
  {
    name: "CERT-In Incident Response",
    number: "+91-1800-11-4949",
    description: "National security incidents",
    icon: ShieldCheck,
  },
];

const EMAIL_PROVIDERS = [
  { id: "gmail", label: "Gmail", color: "oklch(0.62 0.22 22)" },
  { id: "outlook", label: "Outlook", color: "oklch(0.55 0.18 240)" },
  { id: "yahoo", label: "Yahoo", color: "oklch(0.55 0.22 280)" },
] as const;

type EmailProviderId = (typeof EMAIL_PROVIDERS)[number]["id"];

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border overflow-hidden ${className}`}
      style={{ backgroundColor: "oklch(0.12 0 0)" }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono font-semibold text-primary uppercase tracking-widest px-4 pt-4 pb-2">
      {children}
    </p>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { actor } = useActor(createActor);
  const navigate = useNavigate();

  // Store state
  const protectionSettings = useAppStore((s) => s.protectionSettings);
  const linkedEmail = useAppStore((s) => s.linkedEmail);
  const setProtectionSettings = useAppStore((s) => s.setProtectionSettings);
  const setLinkedEmail = useAppStore((s) => s.setLinkedEmail);
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setAlerts = useAppStore((s) => s.setAlerts);
  const setActiveThreatModal = useAppStore((s) => s.setActiveThreatModal);

  // Local state
  const [linkedPhone, setLinkedPhone] = useState<LinkedPhone>({
    isLinked: false,
    phoneNumber: "",
  });
  const [phoneInput, setPhoneInput] = useState("");
  const [linkingEmail, setLinkingEmail] = useState<EmailProviderId | null>(
    null,
  );
  const [linkingPhone, setLinkingPhone] = useState(false);
  const [unlinkingEmail, setUnlinkingEmail] = useState(false);
  const [unlinkingPhone, setUnlinkingPhone] = useState(false);
  const [simulatingThreat, setSimulatingThreat] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  // Load phone on mount
  useEffect(() => {
    if (!actor) return;
    actor.getLinkedPhone().then((p) => {
      setLinkedPhone(p);
      if (p.isLinked) setPhoneInput(p.phoneNumber);
    });
  }, [actor]);

  // ── Email linking ──────────────────────────────────────────────────────────

  const handleLinkEmail = useCallback(
    async (provider: EmailProviderId) => {
      if (!actor) return;
      setLinkingEmail(provider);
      try {
        const demoEmail = `user@${provider}.com`;
        await actor.linkEmail(provider, demoEmail);
        const updated = await actor.getLinkedEmail();
        setLinkedEmail(updated);
        toast.success(`${provider} linked successfully`, {
          description: demoEmail,
        });
      } catch {
        toast.error("Failed to link email");
      } finally {
        setLinkingEmail(null);
      }
    },
    [actor, setLinkedEmail],
  );

  const handleUnlinkEmail = useCallback(async () => {
    if (!actor) return;
    setUnlinkingEmail(true);
    try {
      await actor.unlinkEmail();
      setLinkedEmail({ provider: "", isLinked: false, emailAddress: "" });
      toast.success("Email account unlinked");
    } catch {
      toast.error("Failed to unlink email");
    } finally {
      setUnlinkingEmail(false);
    }
  }, [actor, setLinkedEmail]);

  // ── Phone linking ──────────────────────────────────────────────────────────

  const handleLinkPhone = useCallback(async () => {
    if (!actor || !phoneInput.trim()) return;
    setLinkingPhone(true);
    try {
      await actor.linkPhone(phoneInput.trim());
      const updated = await actor.getLinkedPhone();
      setLinkedPhone(updated);
      toast.success("Phone number linked", { description: phoneInput.trim() });
    } catch {
      toast.error("Failed to link phone");
    } finally {
      setLinkingPhone(false);
    }
  }, [actor, phoneInput]);

  const handleUnlinkPhone = useCallback(async () => {
    if (!actor) return;
    setUnlinkingPhone(true);
    try {
      await actor.unlinkPhone();
      setLinkedPhone({ isLinked: false, phoneNumber: "" });
      setPhoneInput("");
      toast.success("Phone number unlinked");
    } catch {
      toast.error("Failed to unlink phone");
    } finally {
      setUnlinkingPhone(false);
    }
  }, [actor]);

  // ── Protection settings toggle ─────────────────────────────────────────────

  const handleToggle = useCallback(
    async (key: keyof ProtectionSettings, value: boolean) => {
      if (!actor) return;
      const updated = { ...protectionSettings, [key]: value };
      setProtectionSettings(updated);
      setSavingSettings(true);
      try {
        await actor.updateProtectionSettings(updated);
      } catch {
        // Revert on failure
        setProtectionSettings(protectionSettings);
        toast.error("Failed to update setting");
      } finally {
        setSavingSettings(false);
      }
    },
    [actor, protectionSettings, setProtectionSettings],
  );

  // ── Simulate email threat ──────────────────────────────────────────────────

  const handleSimulateThreat = useCallback(async () => {
    if (!actor) return;
    setSimulatingThreat(true);
    try {
      const threat = await actor.simulateEmailThreat(
        "https://crime.com",
        "Phishing Email Alert",
      );
      const alerts = await actor.getAlerts();
      setAlerts(alerts);
      setActiveThreatModal(threat);
      toast.success("Demo threat triggered!", {
        description: "Check the threat modal on Home.",
      });
    } catch {
      toast.error("Failed to simulate threat");
    } finally {
      setSimulatingThreat(false);
    }
  }, [actor, setAlerts, setActiveThreatModal]);

  // ── Logout ─────────────────────────────────────────────────────────────────

  const handleLogout = useCallback(() => {
    setAuthenticated(false);
    navigate({ to: "/login" });
  }, [setAuthenticated, navigate]);

  // ── Protection settings rows ───────────────────────────────────────────────

  const settingsRows: {
    key: keyof ProtectionSettings;
    label: string;
    description: string;
  }[] = [
    {
      key: "emailProtection",
      label: "Email Protection",
      description: "Scan incoming emails for phishing",
    },
    {
      key: "smsProtection",
      label: "SMS Protection",
      description: "Detect malicious links in SMS",
    },
    {
      key: "browserProtection",
      label: "Browser Protection",
      description: "Block phishing sites in real-time",
    },
    {
      key: "silentScan",
      label: "Silent Scan Mode",
      description: "Scan without notifications",
    },
    {
      key: "aiIntel",
      label: "AI Intelligence",
      description: "Enhanced ML threat detection",
    },
  ];

  return (
    <div className="flex flex-col min-h-full">
      <PageHeader title="Profile" />

      <div className="flex-1 px-4 py-4 space-y-5 pb-6">
        {/* ── Account card ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SectionCard>
            <div className="flex items-center gap-4 p-4">
              {/* Shield avatar */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-threat-glow"
                style={{
                  backgroundColor: "oklch(0.16 0 0)",
                  border: "1.5px solid oklch(0.72 0.28 145 / 0.4)",
                }}
              >
                <Shield
                  className="w-8 h-8"
                  style={{ color: "oklch(0.72 0.28 145)" }}
                />
              </div>

              <div className="min-w-0">
                <p className="font-display font-bold text-foreground text-lg leading-tight truncate">
                  Hook Sniffer User
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className="border-primary text-primary font-mono text-xs px-2 py-0"
                    style={{ borderColor: "oklch(0.72 0.28 145 / 0.5)" }}
                  >
                    PRO SHIELD
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground font-mono mt-1">
                  Member since{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </SectionCard>
        </motion.div>

        {/* ── Email linking ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <SectionTitle>Linked Email Account</SectionTitle>
          <SectionCard>
            {linkedEmail.isLinked ? (
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="dot-active shrink-0" />
                    <div className="min-w-0">
                      <p className="font-mono text-sm text-foreground truncate font-medium capitalize">
                        {linkedEmail.provider}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {linkedEmail.emailAddress}
                      </p>
                    </div>
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 ml-1"
                      style={{ color: "oklch(0.72 0.28 145)" }}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleUnlinkEmail}
                    disabled={unlinkingEmail}
                    className="text-destructive hover:text-destructive shrink-0 ml-2"
                    data-ocid="unlink-email-btn"
                  >
                    <Unlink className="w-3.5 h-3.5 mr-1" />
                    Disconnect
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-2">
                <p className="text-xs text-muted-foreground mb-3">
                  Connect your inbox to enable automatic phishing detection.
                </p>
                {EMAIL_PROVIDERS.map((provider) => (
                  <button
                    key={provider.id}
                    type="button"
                    onClick={() => handleLinkEmail(provider.id)}
                    disabled={linkingEmail !== null}
                    data-ocid={`link-${provider.id}-btn`}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-border transition-smooth hover:border-primary/40 disabled:opacity-50"
                    style={{ backgroundColor: "oklch(0.14 0 0)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: provider.color }}
                      />
                      <span className="text-sm font-medium text-foreground">
                        Connect {provider.label}
                      </span>
                    </div>
                    {linkingEmail === provider.id ? (
                      <div
                        className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                        style={{ borderColor: "oklch(0.72 0.28 145)" }}
                      />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </SectionCard>
        </motion.div>

        {/* ── Phone linking ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <SectionTitle>Linked Phone Number</SectionTitle>
          <SectionCard>
            <div className="p-4">
              {linkedPhone.isLinked ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="dot-active shrink-0" />
                    <div className="min-w-0">
                      <p className="font-mono text-sm text-foreground font-medium">
                        {linkedPhone.phoneNumber}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        SMS Protection Active
                      </p>
                    </div>
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 ml-1"
                      style={{ color: "oklch(0.72 0.28 145)" }}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleUnlinkPhone}
                    disabled={unlinkingPhone}
                    className="text-destructive hover:text-destructive shrink-0 ml-2"
                    data-ocid="unlink-phone-btn"
                  >
                    <Unlink className="w-3.5 h-3.5 mr-1" />
                    Unlink
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+91 98765 43210"
                      data-ocid="phone-input"
                      className="w-full bg-input border border-border rounded-lg pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-smooth"
                    />
                  </div>
                  <Button
                    onClick={handleLinkPhone}
                    disabled={linkingPhone || !phoneInput.trim()}
                    size="sm"
                    className="shrink-0"
                    data-ocid="link-phone-btn"
                    style={{
                      backgroundColor: "oklch(0.72 0.28 145)",
                      color: "oklch(0.06 0 0)",
                    }}
                  >
                    <Link2 className="w-3.5 h-3.5 mr-1" />
                    {linkingPhone ? "Linking…" : "Link"}
                  </Button>
                </div>
              )}
            </div>
          </SectionCard>
        </motion.div>

        {/* ── Protection settings ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <SectionTitle>
            Protection Settings
            {savingSettings && (
              <span className="ml-2 text-muted-foreground normal-case font-normal">
                Saving…
              </span>
            )}
          </SectionTitle>
          <SectionCard>
            <div className="divide-y divide-border">
              {settingsRows.map(({ key, label, description }, i) => (
                <div
                  key={key}
                  className="flex items-center justify-between px-4 py-3.5 transition-smooth hover:bg-muted/20"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="min-w-0 mr-4">
                    <p className="text-sm font-medium text-foreground">
                      {label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {description}
                    </p>
                  </div>
                  <Switch
                    checked={protectionSettings[key]}
                    onCheckedChange={(v) => handleToggle(key, v)}
                    data-ocid={`toggle-${key}`}
                    className="shrink-0"
                  />
                </div>
              ))}
            </div>
          </SectionCard>
        </motion.div>

        {/* ── Helplines ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <SectionTitle>Report Threats — Government Helplines</SectionTitle>
          <div className="space-y-2">
            {HELPLINES.map(({ name, number, description, icon: Icon }) => (
              <SectionCard key={`${name}-${number}`}>
                <div className="flex items-center gap-3 px-4 py-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "oklch(0.16 0 0)" }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: "oklch(0.72 0.28 145)" }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-tight truncate">
                      {name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className="font-mono font-bold text-sm"
                      style={{ color: "oklch(0.72 0.28 145)" }}
                    >
                      {number}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(number);
                        toast.success("Number copied");
                      }}
                      data-ocid={`copy-${number}`}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
                      aria-label={`Copy ${name} number`}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </SectionCard>
            ))}
          </div>
        </motion.div>

        {/* ── Demo threat button ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <SectionTitle>Developer Tools</SectionTitle>
          <SectionCard>
            <div className="p-4">
              <p className="text-xs text-muted-foreground mb-3">
                Simulate an incoming email threat to test the alert system.
              </p>
              <button
                type="button"
                onClick={handleSimulateThreat}
                disabled={simulatingThreat}
                data-ocid="simulate-threat-btn"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-mono font-semibold text-sm transition-smooth disabled:opacity-60 shadow-danger-glow"
                style={{
                  backgroundColor: "oklch(0.62 0.22 22 / 0.15)",
                  border: "1px solid oklch(0.62 0.22 22 / 0.5)",
                  color: "oklch(0.85 0.15 22)",
                }}
              >
                {simulatingThreat ? (
                  <>
                    <div
                      className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                      style={{ borderColor: "oklch(0.85 0.15 22)" }}
                    />
                    Triggering Threat…
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Test Email Alert (Demo)
                  </>
                )}
              </button>
            </div>
          </SectionCard>
        </motion.div>

        {/* ── Logout ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="pb-2"
        >
          <Button
            variant="outline"
            onClick={handleLogout}
            data-ocid="logout-btn"
            className="w-full border-destructive/40 text-destructive hover:bg-destructive/10 hover:border-destructive transition-smooth font-mono"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>

          {/* Branding */}
          <p className="text-center text-xs text-muted-foreground mt-4 font-mono">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
