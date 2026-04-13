import { useActor } from "@caffeineai/core-infrastructure";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Suspense, lazy } from "react";
import { createActor } from "./backend";
import { Layout } from "./components/Layout";
import { ThreatAlertModal } from "./components/ThreatAlertModal";
import LoginPage from "./pages/LoginPage";
import { useAppStore } from "./store/useAppStore";

// ── Lazy page imports ──────────────────────────────────────────────────────
const HomePage = lazy(() => import("./pages/HomePage"));
const ScanPage = lazy(() => import("./pages/ScanPage"));
const MapPage = lazy(() => import("./pages/MapPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

// ── Page loader skeleton ───────────────────────────────────────────────────
function PageSkeleton() {
  return (
    <div className="flex-1 p-4 space-y-3">
      {[40, 80, 60, 70].map((w) => (
        <div
          key={w}
          className="h-16 rounded animate-pulse"
          style={{ backgroundColor: "oklch(0.14 0 0)", width: `${w}%` }}
        />
      ))}
    </div>
  );
}

// ── Root component — initializes backend data ─────────────────────────────
function RootApp() {
  const { actor, isFetching } = useActor(createActor);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const setAlerts = useAppStore((s) => s.setAlerts);
  const setStats = useAppStore((s) => s.setStats);
  const setSecurityScore = useAppStore((s) => s.setSecurityScore);
  const setProtectionSettings = useAppStore((s) => s.setProtectionSettings);
  const setLinkedEmail = useAppStore((s) => s.setLinkedEmail);
  const setActiveThreatModal = useAppStore((s) => s.setActiveThreatModal);

  useEffect(() => {
    if (!actor || isFetching || !isAuthenticated) return;

    const init = async () => {
      try {
        const [alerts, stats, score, settings, linkedEmail] = await Promise.all(
          [
            actor.getAlerts(),
            actor.getStats(),
            actor.getSecurityScore(),
            actor.getProtectionSettings(),
            actor.getLinkedEmail(),
          ],
        );

        setAlerts(alerts);
        setStats({
          scanned: Number(stats.totalScanned),
          warnings: Number(stats.totalWarnings),
          blocked: Number(stats.totalBlocked),
        });
        setSecurityScore(Number(score));
        setProtectionSettings(settings);
        setLinkedEmail(linkedEmail);

        // Surface any unread threat alert as modal
        const unread = alerts.find((a) => !a.isRead);
        if (unread) setActiveThreatModal(unread);
      } catch {
        // Non-critical boot error — app still usable
      }
    };

    init();
  }, [
    actor,
    isFetching,
    isAuthenticated,
    setAlerts,
    setStats,
    setSecurityScore,
    setProtectionSettings,
    setLinkedEmail,
    setActiveThreatModal,
  ]);

  return (
    <>
      <Outlet />
      <ThreatAlertModal />
    </>
  );
}

// ── Route definitions ─────────────────────────────────────────────────────

const rootRoute = createRootRoute({ component: RootApp });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/login" });
  },
});

// Helper to read Zustand store outside React (for beforeLoad guards)
function getIsAuthenticated(): boolean {
  return useAppStore.getState().isAuthenticated;
}

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  beforeLoad: () => {
    if (getIsAuthenticated()) throw redirect({ to: "/home" });
  },
  component: () => (
    <Layout hideNav>
      <LoginPage />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  beforeLoad: () => {
    if (!getIsAuthenticated()) throw redirect({ to: "/login" });
  },
  component: () => (
    <Layout>
      <Suspense fallback={<PageSkeleton />}>
        <HomePage />
      </Suspense>
    </Layout>
  ),
});

const scanRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/scan",
  beforeLoad: () => {
    if (!getIsAuthenticated()) throw redirect({ to: "/login" });
  },
  component: () => (
    <Layout>
      <Suspense fallback={<PageSkeleton />}>
        <ScanPage />
      </Suspense>
    </Layout>
  ),
});

const mapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/map",
  beforeLoad: () => {
    if (!getIsAuthenticated()) throw redirect({ to: "/login" });
  },
  component: () => (
    <Layout>
      <Suspense fallback={<PageSkeleton />}>
        <MapPage />
      </Suspense>
    </Layout>
  ),
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  beforeLoad: () => {
    if (!getIsAuthenticated()) throw redirect({ to: "/login" });
  },
  component: () => (
    <Layout>
      <Suspense fallback={<PageSkeleton />}>
        <AnalyticsPage />
      </Suspense>
    </Layout>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  beforeLoad: () => {
    if (!getIsAuthenticated()) throw redirect({ to: "/login" });
  },
  component: () => (
    <Layout>
      <Suspense fallback={<PageSkeleton />}>
        <ProfilePage />
      </Suspense>
    </Layout>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  homeRoute,
  scanRoute,
  mapRoute,
  analyticsRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ── App entry ─────────────────────────────────────────────────────────────
export default function App() {
  return <RouterProvider router={router} />;
}
