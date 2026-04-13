import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart2, Home, MapPin, ScanLine, User } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Scan", href: "/scan", icon: ScanLine },
  { label: "Map", href: "/map", icon: MapPin },
  { label: "Analytics", href: "/analytics", icon: BarChart2 },
  { label: "Profile", href: "/profile", icon: User },
];

export function BottomNav() {
  const router = useRouterState();
  const pathname = router.location.pathname;
  const unreadCount = useAppStore((s) => s.unreadCount);

  return (
    <nav
      data-ocid="bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-40 flex items-stretch"
      style={{
        backgroundColor: "oklch(0.10 0 0)",
        borderTop: "1px solid oklch(0.22 0 0)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        const showBadge = label === "Home" && unreadCount > 0;

        return (
          <Link
            key={href}
            to={href}
            data-ocid={`nav-${label.toLowerCase()}`}
            className="flex flex-1 flex-col items-center justify-center gap-1 py-2 min-h-[56px] relative transition-smooth"
            style={{
              color: isActive ? "oklch(0.72 0.28 145)" : "oklch(0.45 0 0)",
              textDecoration: "none",
            }}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
          >
            {/* Active indicator bar */}
            {isActive && (
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                style={{ backgroundColor: "oklch(0.72 0.28 145)" }}
              />
            )}

            <div className="relative">
              <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
              {showBadge && (
                <span
                  className="absolute -top-1.5 -right-2 min-w-[16px] h-4 rounded-full text-[10px] font-mono font-bold flex items-center justify-center px-0.5"
                  style={{
                    backgroundColor: "oklch(0.62 0.22 22)",
                    color: "oklch(0.95 0 0)",
                  }}
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>

            <span
              className="text-[10px] font-mono font-medium tracking-wide"
              style={{
                color: isActive ? "oklch(0.72 0.28 145)" : "oklch(0.40 0 0)",
              }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
