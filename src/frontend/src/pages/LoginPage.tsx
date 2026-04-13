import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Fingerprint, Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppStore } from "../store/useAppStore";

const OTP_LENGTH = 6;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginStatus } = useInternetIdentity();
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [mode, setMode] = useState<"biometric" | "otp">("biometric");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [biometricState, setBiometricState] = useState<
    "idle" | "scanning" | "success"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  // Already authenticated — redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/home" });
    }
  }, [isAuthenticated, navigate]);

  // Watch loginStatus from II — when "success", mark authenticated and navigate
  useEffect(() => {
    if (loginStatus === "success") {
      setBiometricState("success");
      setAuthenticated(true);
      navigate({ to: "/home" });
    }
  }, [loginStatus, setAuthenticated, navigate]);

  // ── Biometric login ──────────────────────────────────────────────────────

  const handleBiometric = () => {
    setError(null);
    setBiometricState("scanning");
    setIsLoading(true);
    try {
      login();
    } catch {
      setBiometricState("idle");
      setIsLoading(false);
      setError("Authentication failed. Please try again.");
    }
  };

  // ── OTP login ────────────────────────────────────────────────────────────

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < OTP_LENGTH - 1) {
      const nextEl = document.getElementById(`otp-${index + 1}`);
      nextEl?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      setError("Please enter all 6 digits.");
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      login();
    } catch {
      setIsLoading(false);
      setError("Authentication failed. Please try again.");
    }
  };

  const otpBorderColor = (digit: string) =>
    digit ? "oklch(0.72 0.28 145 / 0.7)" : "oklch(0.22 0 0)";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{ backgroundColor: "oklch(0.08 0 0)" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.72 0.28 145 / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.72 0.28 145 / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-4 animate-threat-pulse"
            style={{
              backgroundColor: "oklch(0.72 0.28 145 / 0.08)",
              border: "1px solid oklch(0.72 0.28 145 / 0.4)",
            }}
          >
            <ShieldCheck
              size={40}
              style={{ color: "oklch(0.72 0.28 145)" }}
              strokeWidth={1.5}
            />
          </div>
          <h1
            className="text-3xl font-display font-bold tracking-tight"
            style={{ color: "oklch(0.93 0 0)" }}
          >
            Hook Sniffer
          </h1>
          <p
            className="text-sm font-mono mt-1 tracking-widest uppercase"
            style={{ color: "oklch(0.72 0.28 145)" }}
          >
            Anti-Phishing Defense
          </p>
        </div>

        {/* Login card */}
        <div
          className="rounded-lg overflow-hidden"
          style={{
            backgroundColor: "oklch(0.11 0 0)",
            border: "1px solid oklch(0.20 0 0)",
          }}
        >
          {/* Mode tabs */}
          <div
            className="flex"
            style={{ borderBottom: "1px solid oklch(0.18 0 0)" }}
          >
            {(["biometric", "otp"] as const).map((m) => (
              <button
                key={m}
                type="button"
                data-ocid={`login-tab-${m}`}
                onClick={() => {
                  setMode(m);
                  setError(null);
                }}
                className="flex-1 py-3 text-sm font-mono font-medium tracking-wide transition-smooth"
                style={{
                  color:
                    mode === m ? "oklch(0.72 0.28 145)" : "oklch(0.40 0 0)",
                  borderBottom:
                    mode === m
                      ? "2px solid oklch(0.72 0.28 145)"
                      : "2px solid transparent",
                  marginBottom: "-1px",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                {m === "biometric" ? "Biometric" : "OTP Code"}
              </button>
            ))}
          </div>

          <div className="p-6">
            {mode === "biometric" ? (
              <div className="flex flex-col items-center">
                <p
                  className="text-sm text-center mb-6"
                  style={{ color: "oklch(0.50 0 0)" }}
                >
                  Use your fingerprint or Face ID to securely access Hook
                  Sniffer.
                </p>
                <button
                  type="button"
                  data-ocid="biometric-btn"
                  onClick={handleBiometric}
                  disabled={isLoading}
                  className="w-full flex flex-col items-center gap-3 py-6 rounded-lg transition-smooth"
                  style={{
                    backgroundColor:
                      biometricState === "success"
                        ? "oklch(0.72 0.28 145 / 0.15)"
                        : "oklch(0.14 0 0)",
                    border:
                      biometricState === "scanning"
                        ? "1px solid oklch(0.72 0.28 145 / 0.6)"
                        : "1px solid oklch(0.22 0 0)",
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                >
                  <div
                    className={
                      biometricState === "scanning"
                        ? "animate-threat-pulse"
                        : ""
                    }
                  >
                    <Fingerprint
                      size={52}
                      strokeWidth={1}
                      style={{
                        color:
                          biometricState === "success"
                            ? "oklch(0.72 0.28 145)"
                            : biometricState === "scanning"
                              ? "oklch(0.72 0.28 145 / 0.8)"
                              : "oklch(0.40 0 0)",
                      }}
                    />
                  </div>
                  <span
                    className="text-sm font-mono"
                    style={{
                      color:
                        biometricState === "success"
                          ? "oklch(0.72 0.28 145)"
                          : "oklch(0.55 0 0)",
                    }}
                  >
                    {biometricState === "idle" && "Touch to authenticate"}
                    {biometricState === "scanning" && "Scanning…"}
                    {biometricState === "success" && "Verified ✓"}
                  </span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleOtpSubmit}>
                <p
                  className="text-sm text-center mb-5"
                  style={{ color: "oklch(0.50 0 0)" }}
                >
                  Enter the 6-digit OTP sent to your registered device.
                </p>

                <div className="flex gap-2 justify-center mb-6">
                  {(["d1", "d2", "d3", "d4", "d5", "d6"] as const).map(
                    (slot, i) => (
                      <input
                        key={slot}
                        id={`otp-${i}`}
                        data-ocid={`otp-input-${slot}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={otp[i]}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className="w-11 h-12 text-center text-lg font-mono font-bold rounded transition-smooth focus:outline-none"
                        style={{
                          backgroundColor: "oklch(0.14 0 0)",
                          border: `1px solid ${otpBorderColor(otp[i] ?? "")}`,
                          color: "oklch(0.93 0 0)",
                        }}
                      />
                    ),
                  )}
                </div>

                {error && (
                  <p
                    className="text-xs text-center mb-4 font-mono"
                    style={{ color: "oklch(0.62 0.22 22)" }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  data-ocid="otp-submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded font-semibold text-sm font-mono tracking-wide transition-smooth flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "oklch(0.72 0.28 145)",
                    color: "oklch(0.06 0 0)",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    opacity: isLoading ? 0.7 : 1,
                    border: "none",
                  }}
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : null}
                  {isLoading ? "Verifying…" : "Verify OTP"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p
          className="text-center text-xs font-mono mt-6"
          style={{ color: "oklch(0.28 0 0)" }}
        >
          Protected by Hook Sniffer AI Engine v3.1
        </p>
      </div>
    </div>
  );
}
