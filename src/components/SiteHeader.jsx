import { useState, useLayoutEffect, useRef, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { brand, navigation } from "../data/content";

/* ─────────────────────────────────────────────────────────────────
   HamburgerIcon
   Three rounded lines that animate between three states:

   IDLE   ─── (full-width, stacked, parallel)
               ─────────
               ─────────
               ─────────

   HOVER  → lines stagger-slide right with a subtle rubber-band,
            top shrinks to ~60 %, bottom shrinks to ~60 %,
            giving a "play / forward" impression without arrows

   OPEN   → top rotates +45°, middle fades out, bottom rotates −45°
            forming a clean × (close icon)

   All transforms use Framer Motion variants so they're perfectly
   synchronised and spring-tuned.
───────────────────────────────────────────────────────────────── */

const LINE_W   = 22;   // px — full bar width
const LINE_H   = 2.5;  // px — bar height
const LINE_R   = 99;   // px — border-radius (pill)
const LINE_GAP = 6;    // px — vertical gap between bars
const GOLD     = "#D3af37";

/* Spring configs */
const SPRING_OPEN  = { type: "spring", stiffness: 420, damping: 28 };
const SPRING_HOVER = { type: "spring", stiffness: 380, damping: 22 };
const EASE_FADE    = { duration: 0.18, ease: "easeInOut" };

function HamburgerIcon({ isOpen, isHovered }) {
  /* ── Top line ── */
  const topVariant = isOpen
    ? {
        y:       LINE_GAP + LINE_H,   // drop to center
        rotate:  45,
        width:   LINE_W,
        opacity: 1,
      }
    : isHovered
    ? { y: 0, rotate: 0, width: LINE_W * 0.62, opacity: 1 }
    : { y: 0, rotate: 0, width: LINE_W,         opacity: 1 };

  /* ── Middle line ── */
  const midVariant = isOpen
    ? { opacity: 0, scaleX: 0 }
    : isHovered
    ? { opacity: 1, scaleX: 1, width: LINE_W }
    : { opacity: 1, scaleX: 1, width: LINE_W };

  /* ── Bottom line ── */
  const botVariant = isOpen
    ? {
        y:       -(LINE_GAP + LINE_H),  // rise to center
        rotate:  -45,
        width:   LINE_W,
        opacity: 1,
      }
    : isHovered
    ? { y: 0, rotate: 0, width: LINE_W * 0.62, opacity: 1 }
    : { y: 0, rotate: 0, width: LINE_W,         opacity: 1 };

  /* Stagger delays for hover entrance */
  const topDelay  = isHovered && !isOpen ? 0      : 0;
  const midDelay  = isHovered && !isOpen ? 0.04   : 0;
  const botDelay  = isHovered && !isOpen ? 0.08   : 0;

  const lineBase = {
    display:         "block",
    height:          LINE_H,
    borderRadius:    LINE_R,
    background:      GOLD,
    transformOrigin: "center center",
  };

  return (
    /* Outer wrapper — slides right on hover */
    <motion.div
      style={{ display: "flex", flexDirection: "column", gap: LINE_GAP, alignItems: "flex-start" }}
      animate={isHovered && !isOpen ? { x: 3 } : { x: 0 }}
      transition={SPRING_HOVER}
    >
      {/* Top */}
      <motion.span
        style={{ ...lineBase, width: LINE_W }}
        animate={topVariant}
        transition={
          isOpen
            ? { ...SPRING_OPEN,  delay: topDelay }
            : isHovered
            ? { ...SPRING_HOVER, delay: topDelay }
            : { ...SPRING_HOVER, delay: 0 }
        }
      />
      {/* Middle */}
      <motion.span
        style={{ ...lineBase, width: LINE_W }}
        animate={midVariant}
        transition={
          isOpen
            ? { ...EASE_FADE,   delay: 0 }
            : { ...SPRING_HOVER, delay: midDelay }
        }
      />
      {/* Bottom */}
      <motion.span
        style={{ ...lineBase, width: LINE_W }}
        animate={botVariant}
        transition={
          isOpen
            ? { ...SPRING_OPEN,  delay: botDelay }
            : isHovered
            ? { ...SPRING_HOVER, delay: botDelay }
            : { ...SPRING_HOVER, delay: 0 }
        }
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SiteHeader
───────────────────────────────────────────────────────────────── */

const BANNER_IDS = ["home-banner", "page-hero"];

export default function SiteHeader() {
  const { pathname } = useLocation();

  const [bannerVisible, setBannerVisible] = useState(true);
  const [drawerOpen, setDrawerOpen]       = useState(false);
  const [btnHovered, setBtnHovered]       = useState(false);

  const drawerRef = useRef(null);
  const obsRef    = useRef(null);

  /* Watch whichever banner element exists on the current page */
  useLayoutEffect(() => {
    obsRef.current?.disconnect();
    const raf = requestAnimationFrame(() => setBannerVisible(true));

    let bannerEl = null;
    for (const id of BANNER_IDS) {
      bannerEl = document.getElementById(id);
      if (bannerEl) break;
    }

    if (!bannerEl) {
      cancelAnimationFrame(raf);
      requestAnimationFrame(() => setBannerVisible(false));
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => setBannerVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(bannerEl);
    obsRef.current = obs;

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [pathname]);

  /* Close drawer on route change */
  useLayoutEffect(() => {
    const raf = requestAnimationFrame(() => setDrawerOpen(false));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  /* Lock body scroll when drawer open */
  useLayoutEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  /* Close on outside click */
  const handleOutsideClick = useCallback((e) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      setDrawerOpen(false);
    }
  }, []);

  useLayoutEffect(() => {
    if (!drawerOpen) return;
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [drawerOpen, handleOutsideClick]);

  const handleBooking = (e) => {
    e.preventDefault();
    setDrawerOpen(false);
    window.dispatchEvent(new CustomEvent("open-booking-modal", {
      detail: { service: "Consultation", notes: "Inquiry from the nav menu" },
    }));
  };

  const toggleDrawer = () => {
    setDrawerOpen((v) => !v);
    setBtnHovered(false);
  };

  /* Shared button props for hover tracking */
  const hoverProps = {
    onMouseEnter: () => { if (!drawerOpen) setBtnHovered(true);  },
    onMouseLeave: () => setBtnHovered(false),
  };

  return (
    <>
      {/* ── Fixed top-left header ────────────────────────────── */}
      <header className="site-header" aria-label="Site header">
        <div className="site-header-inner">
          <AnimatePresence mode="wait" initial={false}>

            {bannerVisible ? (
              /* ICON MODE — standalone circular button */
              <motion.button
                key="icon-mode"
                type="button"
                className="site-nav-icon-btn"
                onClick={toggleDrawer}
                aria-label={drawerOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={drawerOpen}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                {...hoverProps}
              >
                <HamburgerIcon isOpen={drawerOpen} isHovered={btnHovered} />
              </motion.button>

            ) : (
              /* LOGO MODE — small trigger (left) + company name */
              <motion.div
                key="logo-mode"
                className="site-header-logo-row"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  className="site-nav-trigger"
                  onClick={toggleDrawer}
                  aria-label={drawerOpen ? "Close navigation" : "Open navigation"}
                  aria-expanded={drawerOpen}
                  {...hoverProps}
                >
                  <HamburgerIcon isOpen={drawerOpen} isHovered={btnHovered} />
                </button>

                <Link
                  to="/"
                  className="site-logo-link"
                  aria-label="Murthy Ateliers — Home"
                >
                  <span className="site-logo-text script-brand">
                    <span className="site-logo-line1">Murthy Ateliers</span>
                    <span className="site-logo-line2">by 9th</span>
                  </span>
                </Link>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </header>

      {/* ── Nav drawer ───────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="nav-backdrop"
              className="nav-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.nav
              key="nav-drawer"
              ref={drawerRef}
              className="nav-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              role="navigation"
              aria-label="Site navigation"
            >
              {/* Header */}
              <div className="nav-drawer-header">
                <Link to="/" onClick={() => setDrawerOpen(false)} className="site-logo-link">
                  <span className="site-logo-text script-brand nav-drawer-logo-text">
                    <span className="site-logo-line1">Murthy Ateliers</span>
                    <span className="site-logo-line2">by 9th</span>
                  </span>
                </Link>
                <button
                  type="button"
                  className="nav-drawer-close"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Links */}
              <div className="nav-drawer-links">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.06 + i * 0.055,
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <NavLink
                      to={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className={({ isActive }) =>
                        `nav-drawer-link${isActive ? " active" : ""}`
                      }
                    >
                      {item.label}
                      <ArrowUpRight size={14} className="nav-drawer-link-icon" />
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Footer CTA */}
              <motion.div
                className="nav-drawer-footer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
              >
                <a
                  href="#"
                  onClick={handleBooking}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Request Consultation
                </a>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
