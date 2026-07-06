import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import BrandLoader from "../components/BrandLoader";

const Home         = lazy(() => import("../pages/Home"));
const Collections  = lazy(() => import("../pages/Collections"));
const Craftsmanship= lazy(() => import("../pages/Craftsmanship"));
const Heritage     = lazy(() => import("../pages/Heritage"));
const Journal      = lazy(() => import("../pages/Journal"));
const Consultation = lazy(() => import("../pages/Consultation"));
const NotFound     = lazy(() => import("../pages/NotFound"));

function PageLoader() {
  return (
    <div className="min-h-svh flex items-center justify-center bg-cream">
      <div className="flex flex-col items-center gap-4">
        <span className="script-brand text-crimson text-4xl">Murthy Ateliers</span>
        <div className="relative h-px w-48 bg-gold/20 overflow-hidden rounded-full">
          <span className="absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-gold to-transparent shimmer-line" />
        </div>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/"               element={<Home />} />
          <Route path="/collections"    element={<Collections />} />
          <Route path="/craftsmanship"  element={<Craftsmanship />} />
          <Route path="/heritage"       element={<Heritage />} />
          <Route path="/journal"        element={<Journal />} />
          <Route path="/journal/:slug"  element={<Journal />} />
          <Route path="/consultation"   element={<Consultation />} />
          <Route path="*"               element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
