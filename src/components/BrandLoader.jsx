import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DRAW_DUR    = 2500;  // ms — stroke draw
const FILL_DUR    = 1000;   // ms — stroke→fill crossfade
const MIN_HOLD_MS = DRAW_DUR + FILL_DUR + 1600; // ms before exit

export default function BrandLoader({ onDone }) {
  const containerRef = useRef(null);
  const [eyebrow, setEyebrow] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers  = [];

    const later = (fn, ms) => {
      const id = setTimeout(() => { if (!cancelled) fn(); }, ms);
      timers.push(id);
    };

    fetch("/text1.svg")
      .then(r => r.text())
      .then(svgText => {
        if (cancelled || !containerRef.current) return;

        // ── Parse ─────────────────────────────────────────────────
        const parser  = new DOMParser();
        const doc     = parser.parseFromString(svgText, "image/svg+xml");
        const srcSvg  = doc.querySelector("svg");
        const srcPath = doc.querySelector("path");
        if (!srcSvg || !srcPath) return;

        // ── Build SVG ─────────────────────────────────────────────
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", srcSvg.getAttribute("viewBox"));
        svg.style.cssText = "width:100%;height:auto;overflow:visible;display:block;";
        svg.setAttribute("aria-hidden", "true");

        const srcG = doc.querySelector("g");
        let parent = svg;
        if (srcG) {
          const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
          g.setAttribute("transform", srcG.getAttribute("transform") || "");
          svg.appendChild(g);
          parent = g;
        }

        // Strip every Inkscape-generated style / presentation attribute
        const path = srcPath.cloneNode(true);
        path.removeAttribute("style");
        path.removeAttribute("id");
        ["fill","fill-opacity","stroke","stroke-width","stroke-opacity",
         "stroke-linecap","stroke-linejoin","stroke-dasharray","stroke-dashoffset",
        ].forEach(a => path.removeAttribute(a));

        parent.appendChild(path);
        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(svg);

        // ── Measure ───────────────────────────────────────────────
        requestAnimationFrame(() => {
          if (cancelled) return;
          const len = path.getTotalLength();

          requestAnimationFrame(() => {
            if (cancelled) return;

            // ── PHASE 1 : draw stroke ─────────────────────────────
            // Set base state explicitly via WAAPI so nothing leaks through
            path.animate([
              {
                fill:             "#6a1413",
                fillOpacity:      "0",
                stroke:           "#D3af37",
                strokeWidth:      "1.5px",
                strokeLinecap:    "round",
                strokeLinejoin:   "round",
                strokeOpacity:    "1",
                strokeDasharray:  `${len}px`,
                strokeDashoffset: `${len}px`,
              },
              {
                fill:             "#6a1413",
                fillOpacity:      "0",
                stroke:           "#D3af37",
                strokeWidth:      "1.5px",
                strokeLinecap:    "round",
                strokeLinejoin:   "round",
                strokeOpacity:    "1",
                strokeDasharray:  `${len}px`,
                strokeDashoffset: "0px",
              },
            ], {
              duration:  DRAW_DUR,
              easing:    "linear",        // linear = dashoffset reaches 0 at exactly DRAW_DUR ms
              fill:      "forwards",
              composite: "replace",
            });

            // ── PHASE 2 : fill — triggered by setTimeout at DRAW_DUR ─
            // setTimeout fires at the same wall-clock moment the draw ends.
            // No onfinish callback lag, no extra frame delay.
            later(() => {
              path.animate([
                {
                  fill:          "#6a1413",
                  fillOpacity:   "0",
                  strokeOpacity: "1",
                },
                {
                  fill:          "#6a1413",
                  fillOpacity:   "1",
                  strokeOpacity: "0",
                },
              ], {
                duration:  FILL_DUR,
                easing:    "ease",
                fill:      "forwards",
                composite: "replace",
              });
            }, DRAW_DUR);

            // ── Eyebrow ───────────────────────────────────────────
            later(() => setEyebrow(true), DRAW_DUR + FILL_DUR );
          });
        });
      })
      .catch(() => { if (!cancelled && onDone) onDone(); });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  // Minimum hold before exit
  useEffect(() => {
    const t = setTimeout(() => { if (onDone) onDone(); }, MIN_HOLD_MS);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      key="brand-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1, ease: "easeInOut" } }}
      style={{
        position:        "fixed",
        inset:           0,
        zIndex:          9999,
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        justifyContent:  "center",
        backgroundColor: "var(--cream)",
        gap:             "1.5rem",
        overflow:        "hidden",
        willChange:      "opacity",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position:        "absolute",
          inset:           0,
          pointerEvents:   "none",
          backgroundImage: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(211,175,55,0.08) 0%, transparent 70%)",
        }}
      />

      <div
        ref={containerRef}
        role="img"
        aria-label="Murthy Ateliers"
        style={{ width: "min(780px, 88vw)", lineHeight: 0 }}
      />

      <AnimatePresence>
        {eyebrow && (
          <motion.p
            key="eyebrow"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              fontFamily:    "Jost, sans-serif",
              fontSize:      "clamp(0.5rem, 1.8vw, 0.62rem)",
              fontWeight:    500,
              letterSpacing: "0.36em",
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
