import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const Home         = lazy(() => import("../pages/Home"));
const Collections  = lazy(() => import("../pages/Collections"));
const Craftsmanship= lazy(() => import("../pages/Craftsmanship"));
const Heritage     = lazy(() => import("../pages/Heritage"));
const Journal      = lazy(() => import("../pages/Journal"));
const Consultation = lazy(() => import("../pages/Consultation"));
const NotFound     = lazy(() => import("../pages/NotFound"));

export default function AppRoutes() {
  return (
    <Suspense fallback={null}>
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
