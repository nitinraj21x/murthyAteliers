import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { brand, navigation } from "../data/content";

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBookingClick = (e) => {
    e.preventDefault();
    setOpen(false);
    window.dispatchEvent(new CustomEvent('open-booking-modal', {
      detail: { service: 'Consultation', notes: 'Inquiry from the Navbar' }
    }));
  };


  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-forest/95 backdrop-blur-md border-b border-gold/20 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="shell">
        <div className="frame flex items-center justify-between gap-4 py-2.5 lg:py-5">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-baseline leading-none"
          >
            <span
              className={`logo-brand script-brand whitespace-nowrap transition-colors duration-500 ${
                scrolled ? "text-gold-dark" : "text-gold"
              }`}
              style={{ fontSize: "clamp(1rem, 4.5vw, 1.6rem)", lineHeight: 1 }}
            >
              {brand.fullName}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#"
            onClick={handleBookingClick}
            className="hidden lg:inline-flex btn-primary"
          >
            Request Details
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden flex items-center justify-center h-8 w-8 rounded-full border border-gold/25 bg-cream/60 backdrop-blur-sm text-forest flex-shrink-0"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-gold/15 bg-forest/95 backdrop-blur-md"
          >
            <div className="shell py-3">
              <div className="frame flex flex-col gap-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-2xl text-xs font-medium tracking-widest uppercase transition ${
                        isActive
                          ? "bg-gold/15 text-gold"
                          : "text-cream hover:bg-gold/10 hover:text-gold"
                      }`
                    }
                    style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)" }}
                  >
                    {item.label}
                  </NavLink>
                ))}
                <a
                  href="#"
                  onClick={handleBookingClick}
                  className="mt-2 btn-primary justify-center"
                >
                  Request Details
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
