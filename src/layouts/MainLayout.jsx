import { Outlet, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import { Home } from "lucide-react";

export default function MainLayout() {
  const { pathname } = useLocation();
  const [showFab, setShowFab] = useState(false);

  /* Scroll-to-top on route change */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  /* Show FAB only after scrolling past ~60% of viewport */
  useEffect(() => {
    const onScroll = () => setShowFab(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100svh" }}>
      <SiteHeader />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />

      {/* Home FAB — bottom-right, appears after scrolling */}
      <Link
        to="/"
        className={`home-fab${showFab ? "" : " home-fab--hidden"}`}
        aria-label="Go to Home"
        title="Home"
        onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
      >
        <Home size={18} strokeWidth={1.5} />
      </Link>
    </div>
  );
}
