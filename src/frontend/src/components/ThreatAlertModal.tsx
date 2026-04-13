import { useActor } from "@caffeineai/core-infrastructure";
import { AlertTriangle, ShieldOff, Trash2, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import { createActor } from "../backend";
import { useAppStore } from "../store/useAppStore";

export function ThreatAlertModal() {
  const activeThreatModal = useAppStore((s) => s.activeThreatModal);
  const setActiveThreatModal = useAppStore((s) => s.setActiveThreatModal);
  const markAlertRead = useAppStore((s) => s.markAlertRead);
  const { actor } = useActor(createActor);

  const dismiss = useCallback(async () => {
    if (!activeThreatModal) return;
    markAlertRead(activeThreatModal.id);
    if (actor) {
      try {
        await actor.markAlertRead(activeThreatModal.id);
      } catch {
        // Non-critical — local state already updated
      }
    }
    setActiveThreatModal(null);
  }, [activeThreatModal, markAlertRead, actor, setActiveThreatModal]);

  const handleDeleteEmail = useCallback(async () => {
    await dismiss();
  }, [dismiss]);

  const handleBackdropKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") dismiss();
    },
    [dismiss],
  );

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    if (activeThreatModal) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [activeThreatModal, dismiss]);

  // Trap scroll when modal is open
  useEffect(() => {
    if (activeThreatModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeThreatModal]);

  if (!activeThreatModal) return null;

  const riskScore = Number(activeThreatModal.riskScore);

  return (
    <dialog
      open
      aria-labelledby="threat-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-backdrop-in m-0 max-w-none max-h-none w-full h-full"
      style={{ backgroundColor: "rgba(0,0,0,0.85)", border: "none" }}
    >
      {/* Backdrop click area */}
      <div
        className="absolute inset-0"
        role="button"
        tabIndex={0}
        aria-label="Close modal"
        onClick={dismiss}
        onKeyDown={handleBackdropKeyDown}
      />

      <div
        data-ocid="threat-alert-modal"
        className="relative w-full max-w-sm animate-modal-in rounded-lg overflow-hidden"
        style={{
          backgroundColor: "oklch(0.10 0 0)",
          border: "1px solid oklch(0.72 0.28 145 / 0.6)",
          boxShadow:
            "0 0 40px oklch(0.72 0.28 145 / 0.2), 0 0 0 1px oklch(0.72 0.28 145 / 0.3)",
        }}
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.72 0.28 145), oklch(0.62 0.22 22))",
          }}
        />

        {/* Close button */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close threat modal"
          className="absolute top-3 right-3 p-1 rounded transition-smooth"
          style={{
            color: "oklch(0.50 0 0)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <X size={16} />
        </button>

        <div className="px-6 py-5">
          {/* Icon + title */}
          <div className="flex flex-col items-center text-center mb-5">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-3 animate-threat-pulse"
              style={{
                backgroundColor: "oklch(0.72 0.28 145 / 0.1)",
                border: "1px solid oklch(0.72 0.28 145 / 0.5)",
              }}
            >
              <AlertTriangle
                size={28}
                style={{ color: "oklch(0.72 0.28 145)" }}
              />
            </div>

            <div
              className="text-xs font-mono font-semibold tracking-widest uppercase mb-1"
              style={{ color: "oklch(0.72 0.28 145)" }}
            >
              🚨 Threat Detected
            </div>
            <h2
              id="threat-modal-title"
              className="text-xl font-display font-bold text-foreground"
            >
              {activeThreatModal.threatName || "Phishing Link Found"}
            </h2>
          </div>

          {/* Threat details */}
          <div
            className="rounded p-3 mb-4 space-y-2"
            style={{
              backgroundColor: "oklch(0.14 0 0)",
              border: "1px solid oklch(0.22 0 0)",
            }}
          >
            <div className="flex items-start gap-2">
              <span
                className="text-xs font-mono"
                style={{ color: "oklch(0.50 0 0)" }}
              >
                SOURCE
              </span>
              <span className="text-xs font-mono text-foreground capitalize">
                {activeThreatModal.source}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span
                className="text-xs font-mono"
                style={{ color: "oklch(0.50 0 0)" }}
              >
                URL
              </span>
              <span
                className="text-xs font-mono break-all"
                style={{ color: "oklch(0.72 0.28 145)" }}
              >
                {activeThreatModal.url}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-mono"
                style={{ color: "oklch(0.50 0 0)" }}
              >
                RISK SCORE
              </span>
              <span
                className="text-sm font-mono font-bold"
                style={{
                  color:
                    riskScore >= 80
                      ? "oklch(0.62 0.22 22)"
                      : riskScore >= 60
                        ? "oklch(0.75 0.18 85)"
                        : "oklch(0.72 0.28 145)",
                }}
              >
                {riskScore}%
              </span>
            </div>
          </div>

          <p
            className="text-sm text-center mb-5"
            style={{ color: "oklch(0.55 0 0)" }}
          >
            A phishing link was detected in your linked email inbox. Take action
            immediately.
          </p>

          {/* Actions */}
          <div className="space-y-2">
            <button
              type="button"
              data-ocid="threat-modal-delete"
              onClick={handleDeleteEmail}
              className="w-full flex items-center justify-center gap-2 py-3 rounded font-semibold text-sm transition-smooth"
              style={{
                backgroundColor: "oklch(0.72 0.28 145)",
                color: "oklch(0.06 0 0)",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Trash2 size={15} />
              Delete Email
            </button>
            <button
              type="button"
              data-ocid="threat-modal-ignore"
              onClick={dismiss}
              className="w-full flex items-center justify-center gap-2 py-3 rounded font-semibold text-sm transition-smooth"
              style={{
                backgroundColor: "oklch(0.16 0 0)",
                color: "oklch(0.60 0 0)",
                border: "1px solid oklch(0.22 0 0)",
                cursor: "pointer",
              }}
            >
              <ShieldOff size={15} />
              Ignore
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
