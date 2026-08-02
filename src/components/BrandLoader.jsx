import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  Clean 3-phase loader — all timing via CSS custom properties on the SVG path.
  No WAAPI, no requestAnimationFrame chaining, no race conditions.

  Phase 1 (0 → 1.2s)  : stroke draws in (dashoffset 1→0)
  Phase 2 (1.2 → 1.9s): fill fades in, stroke fades out  (CSS transition on fill/stroke-opacity)
  Phase 3 (1.9 → 2.5s): eyebrow text appears, then onDone fires
*/

const T_DRAW      = 1200;   // ms — stroke draw
const T_FILL      = 700;    // ms — fill crossfade
const T_EYEBROW   = T_DRAW + T_FILL;          // 1900 ms
const T_EXIT      = T_DRAW + T_FILL + 600;    // 2500 ms total

export default function BrandLoader({ onDone }) {
  const containerRef = useRef(null);
  const [phase, setPhase] = useState("draw"); // draw | fill | done
  const [showEyebrow, setShowEyebrow] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/text1.svg")
      .then((r) => r.text())
      .then((svgText) => {
        if (cancelled || !containerRef.current) return;

        /* ── Parse SVG ─────────────────────────────────── */
        const parser = new DOMParser();
        const doc    = parser.parseFromString(svgText, "image/svg+xml");
        const srcSvg = doc.querySelector("svg");
        const srcPath = doc.querySelector("path");
        if (!srcSvg || !srcPath) return;

        /* ── Rebuild clean SVG ─────────────────────────── */
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", srcSvg.getAttribute("viewBox") || "0 0 100 100");
        svg.style.cssText = "width:100%;height:auto;display:block;overflow:visible;";
        svg.setAttribute("aria-hidden", "true");

        const srcG = doc.querySelector("g");
        let parent = svg;
        if (srcG) {
          const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
          g.setAttribute("transform", srcG.getAttribute("transform") || "");
          svg.appendChild(g);
          parent = g;
        }

        const path = srcPath.cloneNode(true);
        // Strip all presentation attrs — we control everything via inline style
        ["style","id","fill","fill-opacity","stroke","stroke-width","stroke-opacity",
          "stroke-linecap","stroke-linejoin","stroke-dasharray","stroke-dashoffset",
        ].forEach((a) => path.removeAttribute(a));
        parent.appendChild(path);

        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(svg);

        /* ── Measure then animate ──────────────────────── */
        // Use double rAF to ensure layout is complete before getTotalLength
        requestAnimationFrame(() => requestAnimationFrame(() => {
          if (cancelled) return;
          const len = path.getTotalLength();

          /* Phase 1 initial state — stroke fully offset (invisible) */
          path.style.cssText = `
            fill: #6a1413;
            fill-opacity: 0;
            stroke: #D3af37;
            stroke-width: 1.5px;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-opacity: 1;
            stroke-dasharray: ${len}px;
            stroke-dashoffset: ${len}px;
            transition:
              stroke-dashoffset ${T_DRAW}ms linear,
              fill-opacity       ${T_FILL}ms ease ${T_DRAW}ms,
              stroke-opacity     ${T_FILL}ms ease ${T_DRAW}ms;
          `;

          /* Trigger draw on next frame so the initial state paints first */
          requestAnimationFrame(() => {
            if (cancelled) return;
            path.style.strokeDashoffset = "0px";
            path.style.fillOpacity      = "1";
            path.style.strokeOpacity    = "0";
          });

          /* Phase timers */
          const tEyebrow = setTimeout(() => {
            if (!cancelled) setShowEyebrow(true);
          }, T_EYEBROW);

          const tExit = setTimeout(() => {
            if (!cancelled && onDone) onDone();
          }, T_EXIT);

          /* Stash for cleanup */
          containerRef.current._timers = [tEyebrow, tExit];
        }));
      })
      .catch(() => { if (!cancelled && onDone) onDone(); });

    return () => {
      cancelled = true;
      const timers = containerRef.current?._timers || [];
      timers.forEach(clearTimeout);
    };
  }, [onDone]);

  return (
    <motion.div
      key="brand-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
      style={{
        position:       "fixed",
        inset:          0,
        zIndex:         9999,
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        backgroundColor:"var(--cream)",
        gap:            "1.5rem",
        overflow:       "hidden",
      }}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className="glow-brand-loader"
      />

      {/* SVG container */}
      <div
        ref={containerRef}
        role="img"
        aria-label="Murthy Ateliers"
        style={{ width: "min(760px, 86vw)", lineHeight: 0 }}
      />

      {/* Eyebrow tagline */}
      <AnimatePresence>
        {showEyebrow && (
          <motion.p
            key="eyebrow"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              fontFamily:    "Jost, sans-serif",
              fontSize:      "clamp(0.48rem, 1.7vw, 0.6rem)",
              fontWeight:    500,
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color:         "var(--crimson)",
              whiteSpace:    "nowrap",
              margin:        0,
            }}
          >
            Heirloom Jewels Crafted to Endure
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
