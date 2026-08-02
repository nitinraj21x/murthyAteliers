import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";

export default function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-svh">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
