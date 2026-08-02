/**
 * Shared Framer Motion variants and helpers.
 *
 * TWO PATTERNS — do not mix them:
 *
 * Pattern A — direct animate (used with motion.div animate={} on static elements):
 *   fadeUp, fadeLeft, fadeRight, scaleIn
 *   Spread directly: <motion.div {...fadeUp} />
 *   Keys: initial / animate / transition
 *
 * Pattern B — whileInView stagger (used for scroll-triggered reveals):
 *   staggerContainer, staggerItem, inView
 *   Use: <motion.div variants={staggerContainer} {...inView}>
 *          <motion.div variants={staggerItem} />
 *        </motion.div>
 *   Keys: hidden / visible (matched by inView's initial/whileInView)
 */

/* ── Pattern A: direct animate props ───────────────────────── */

export const fadeUp = {
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
};

export const fadeLeft = {
  initial:    { opacity: 0, x: -32 },
  animate:    { opacity: 1, x: 0 },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
};

export const fadeRight = {
  initial:    { opacity: 0, x: 32 },
  animate:    { opacity: 1, x: 0 },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
};

export const scaleIn = {
  initial:    { opacity: 0, scale: 0.94 },
  animate:    { opacity: 1, scale: 1 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

/* ── Pattern B: whileInView variant names ───────────────────── */

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

export const staggerItem = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Spread onto a motion element that uses Pattern B variants.
 * Sets initial="hidden", whileInView="visible", viewport once.
 *
 * Usage:
 *   <motion.div variants={staggerContainer} {...inView}>
 *     <motion.div variants={staggerItem} />
 *   </motion.div>
 *
 * For Pattern A (fadeUp etc.) do NOT use inView — they use animate= directly.
 * If you need a fadeUp on scroll, use:
 *   <motion.div variants={fadeUpVariant} {...inView} />
 * where fadeUpVariant uses hidden/visible keys (see below).
 */
export const inView = {
  initial:     "hidden",
  whileInView: "visible",
  viewport:    { once: true, amount: 0.15 },
};

/**
 * scroll-triggered versions of the Pattern A animations.
 * Use these with {...inView} instead of the Pattern A exports above.
 */
export const fadeUpVariant = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeLeftVariant = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeRightVariant = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleInVariant = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
