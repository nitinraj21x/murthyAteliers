import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const Home         = lazy(() => import("../pages/Home"));
const Collections  = lazy(() => import("../pages/Collections"));
const Craftsmanship= lazy(() => import("../pages/Craftsmanship"));
const Heritage     = lazy(() => import("../pages/Heritage"));
const Journal      = lazy(() => import("../pages/Journal"));
const Consultation = lazy(() => import("../pages/Consultation"));
const NotFound     = lazy(() => import("../pages/NotFound"));

/**
 * RedirectOnRefresh
 * Detects a hard browser refresh (F5 / Ctrl+R) and redirects to home.
 *
 * How it works:
 *   - On every client-side navigation React sets a sessionStorage flag.
 *   - On a hard refresh the browser wipes JS state but keeps sessionStorage
 *     only if the tab stays open. We use navigation.type to detect the reload.
 *   - performance.getEntriesByType("navigation")[0].type === "reload"
 *     is the most reliable cross-browser signal for a hard refresh.
 */
function RedirectOnRefresh() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    // Only redirect if we're NOT already on home
    if (pathname === "/") return;

    const navEntry = performance.getEntriesByType("navigation")[0];
    const isReload = navEntry?.type === "reload";

    if (isReload) {
      // Replace so the back button doesn't loop
      navigate("/", { replace: true });
    }
  // Run once on mount — intentionally empty deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/"               element={<><RedirectOnRefresh /><Home /></>} />
          <Route path="/collections"    element={<><RedirectOnRefresh /><Collections /></>} />
          <Route path="/craftsmanship"  element={<><RedirectOnRefresh /><Craftsmanship /></>} />
          <Route path="/heritage"       element={<><RedirectOnRefresh /><Heritage /></>} />
          <Route path="/journal"        element={<><RedirectOnRefresh /><Journal /></>} />
          <Route path="/journal/:slug"  element={<><RedirectOnRefresh /><Journal /></>} />
          <Route path="/consultation"   element={<><RedirectOnRefresh /><Consultation /></>} />
          <Route path="*"               element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
