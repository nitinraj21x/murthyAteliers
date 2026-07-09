import { motion } from "framer-motion";

/**
 * BrandLoader — clean rebuild
 *
 * Animation sequence:
 *  1. Each character of "Murthy Ateliers by 9th" fades + slides up one by one
 *     with a slight rotation, mimicking the feel of a pen writing each letter.
 *  2. A gold SVG line draws itself (stroke-dashoffset) beneath the name
 *     once the last letter has appeared.
 *  3. A soft eyebrow line fades in below.
 *  4. On exit, the whole screen fades out — no jump, no re-render flash.
 *
 * No SVG <text> is used for the brand name, eliminating all font-measurement
 * and reflow bugs. The Halimun font is loaded via index.css @font-face.
 */

const BRAND   = "Murthy Ateliers by 9th";
const CHARS   = BRAND.split("");

// Per-character animation
const charVariants = {
  hidden: { opacity: 0, y: 18, rotate: -4, filter: "blur(4px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.3 + i * 0.055,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// Underline draws after last char (~0.3 + 21*0.055 + 0.45 ≈ 1.9 s)
const UNDERLINE_DELAY = 1.85;
const UNDERLINE_DUR   = 1.0;

// Eyebrow fades in after underline
const EYEBROW_DELAY = UNDERLINE_DELAY + UNDERLINE_DUR + 0.1;

export default function BrandLoader() {
  return (
    <motion.div
      key="brand-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--cream)",
        gap: "0.75rem",
        overflow: "hidden",
      }}
    >
      {/* Ambient radial glow */}
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

      {/* ── Brand name ─────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {/* Characters */}
        <div
          aria-label={BRAND}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            fontFamily: "Halimun, cursive",
            fontSize: "clamp(2.4rem, 7vw, 5rem)",
            color: "var(--crimson)",
            lineHeight: 1.1,
            letterSpacing: "0.02em",
            userSelect: "none",
          }}
        >
          {CHARS.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={charVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: "inline-block",
                whiteSpace: char === " " ? "pre" : "normal",
                // spaces need a visible width
                minWidth: char === " " ? "0.35em" : undefined,
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Gold underline — draws via stroke-dashoffset */}
        <svg
          viewBox="0 0 400 12"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ width: "min(400px, 75vw)", height: 12, overflow: "visible" }}
        >
          {/* Static faint track */}
          <line
            x1="0" y1="6" x2="400" y2="6"
            stroke="rgba(211,175,55,0.15)"
            strokeWidth="1"
          />
          {/* Animated drawing line */}
          <motion.line
            x1="0" y1="6" x2="400" y2="6"
            stroke="var(--gold)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: {
                delay: UNDERLINE_DELAY,
                duration: UNDERLINE_DUR,
                ease: [0.4, 0, 0.2, 1],
              },
              opacity: { delay: UNDERLINE_DELAY, duration: 0.01 },
            }}
          />
        </svg>
      </div>

      {/* ── Eyebrow / tagline ──────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: EYEBROW_DELAY, duration: 0.6, ease: "easeOut" }}
        style={{
          fontFamily: "Jost, sans-serif",
          fontSize: "clamp(0.55rem, 1.5vw, 0.65rem)",
          fontWeight: 500,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "var(--crimson)",
          opacity: 0.7,
          marginTop: "0.5rem",
        }}
      >
        Heirloom Jewels Crafted to Endure
      </motion.p>

      {/* ── Gold shimmer bar ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: EYEBROW_DELAY + 0.3, duration: 0.4 }}
        style={{
          position: "relative",
          width: "min(200px, 45vw)",
          height: "1px",
          background: "rgba(211,175,55,0.2)",
          borderRadius: 999,
          overflow: "hidden",
          marginTop: "1.25rem",
        }}
      >
        <motion.span
          initial={{ x: "-100%" }}
          animate={{ x: "350%" }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.5,
            delay: EYEBROW_DELAY + 0.3,
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "1px",
            width: "30%",
            background:
              "linear-gradient(90deg, transparent, rgba(211,175,55,1), transparent)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
