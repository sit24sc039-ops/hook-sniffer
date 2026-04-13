import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
  /** Hide the bottom nav — used on login screen */
  hideNav?: boolean;
}

export function Layout({ children, hideNav = false }: LayoutProps) {
  return (
    <div
      className="flex flex-col min-h-screen w-full max-w-md mx-auto relative"
      style={{ backgroundColor: "oklch(0.08 0 0)" }}
    >
      {/* Main content — padded for bottom nav */}
      <main
        className="flex-1 flex flex-col overflow-y-auto"
        style={{ paddingBottom: hideNav ? 0 : "72px" }}
      >
        {children}
      </main>

      {!hideNav && <BottomNav />}
    </div>
  );
}

// ── Page header component used by each screen ──────────────────────────────

interface PageHeaderProps {
  title: string;
  rightSlot?: ReactNode;
}

export function PageHeader({ title, rightSlot }: PageHeaderProps) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-4 py-4"
      style={{
        backgroundColor: "oklch(0.08 0 0 / 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid oklch(0.16 0 0)",
      }}
    >
      <h1 className="text-2xl font-display font-bold text-foreground tracking-tight">
        {title}
      </h1>
      {rightSlot && <div className="flex items-center gap-2">{rightSlot}</div>}
    </header>
  );
}
