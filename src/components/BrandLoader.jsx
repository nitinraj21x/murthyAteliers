import { motion } from "framer-motion";

/**
 * BrandLoader
 *
 * Renders "Murthy Ateliers" on line 1 and "by 9th" on line 2.
 * Each character animates in staggered left-to-right.
 * Both lines use white-space:nowrap so the name never wraps mid-word.
 * Font scales down on narrow viewports via a tight clamp.
 *
 * Exit: full-screen opacity fade — no reflow, no flash.
 */

const LINE1 = "Murthy Ateliers";
const LINE2 = "by 9th";

// Build per-character variants with a global index offset for line 2
const charVariants = {
  hidden: { opacity: 0, y: 14, rotate: -3, filter: "blur(3px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.2 + i * 0.05,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// Last char index across both lines
const TOTAL_CHARS = LINE1.length + LINE2.length;
const UNDERLINE_DELAY = 0.2 + TOTAL_CHARS * 0.05 + 0.3; // after last char
const UNDERLINE_DUR   = 0.9;
const EYEBROW_DELAY   = UNDERLINE_DELAY + UNDERLINE_DUR + 0.1;

function AnimatedLine({ text, startIndex, style }) {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        whiteSpace: "nowrap",
        justifyContent: "center",
        ...style,
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={startIndex + i}
          variants={charVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "inline-block",
            minWidth: char === " " ? "0.3em" : undefined,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

export default function BrandLoader() {
  return (
    <motion.div
      key="brand-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--cream)",
        gap: "0.5rem",
        overflow: "hidden",
        // Prevent any layout shift during exit
        willChange: "opacity",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(211,175,55,0.09) 0%, transparent 70%)," +
            "radial-gradient(circle at 20% 80%, rgba(106,20,19,0.06) 0%, transparent 40%)",
        }}
      />

      {/* ── Brand name — two lines, never wraps ── */}
      <div
        aria-label={`${LINE1} ${LINE2}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // Font: tight clamp — fits on one line even at 320px
          fontFamily: "Halimun, cursive",
          fontSize: "clamp(1.6rem, 8.5vw, 4.5rem)",
          color: "var(--crimson)",
          lineHeight: 1.15,
          letterSpacing: "0.02em",
          userSelect: "none",
          gap: "0.1em",
        }}
      >
        <AnimatedLine text={LINE1} startIndex={0} />
        <AnimatedLine
          text={LINE2}
          startIndex={LINE1.length}
          style={{ fontSize: "0.75em", opacity: 0.85 }}
        />
      </div>

      {/* ── Gold underline ── */}
      <svg
        viewBox="0 0 320 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ width: "min(320px, 72vw)", height: 10, overflow: "visible", marginTop: "0.25rem" }}
      >
        <line x1="0" y1="5" x2="320" y2="5" stroke="rgba(211,175,55,0.15)" strokeWidth="1" />
        <motion.line
          x1="0" y1="5" x2="320" y2="5"
          stroke="var(--gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { delay: UNDERLINE_DELAY, duration: UNDERLINE_DUR, ease: [0.4, 0, 0.2, 1] },
            opacity:    { delay: UNDERLINE_DELAY, duration: 0.01 },
          }}
        />
      </svg>

      {/* ── Eyebrow ── */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 0.65, y: 0 }}
        transition={{ delay: EYEBROW_DELAY, duration: 0.5, ease: "easeOut" }}
        style={{
          fontFamily: "Jost, sans-serif",
          fontSize: "clamp(0.5rem, 2vw, 0.62rem)",
          fontWeight: 500,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "var(--crimson)",
          marginTop: "0.6rem",
          whiteSpace: "nowrap",
        }}
      >
        Heirloom Jewels Crafted to Endure
      </motion.p>

      {/* ── Shimmer bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: EYEBROW_DELAY + 0.25, duration: 0.4 }}
        style={{
          position: "relative",
          width: "min(180px, 42vw)",
          height: "1px",
          background: "rgba(211,175,55,0.2)",
          borderRadius: 999,
          overflow: "hidden",
          marginTop: "1rem",
        }}
      >
        <motion.span
          initial={{ x: "-100%" }}
          animate={{ x: "350%" }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
          style={{
            position: "absolute",
            top: 0, left: 0,
            height: "1px",
            width: "30%",
            background: "linear-gradient(90deg, transparent, rgba(211,175,55,1), transparent)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
