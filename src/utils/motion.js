/* Shared Framer Motion variants */

export const fadeUp = {
  initial:   { opacity: 0, y: 28 },
  animate:   { opacity: 1, y: 0 },
  transition:{ duration: 0.72, ease: [0.22, 1, 0.36, 1] },
};

export const fadeIn = {
  initial:   { opacity: 0 },
  animate:   { opacity: 1 },
  transition:{ duration: 0.6, ease: "easeOut" },
};

export const fadeLeft = {
  initial:   { opacity: 0, x: -32 },
  animate:   { opacity: 1, x: 0 },
  transition:{ duration: 0.72, ease: [0.22, 1, 0.36, 1] },
};

export const fadeRight = {
  initial:   { opacity: 0, x: 32 },
  animate:   { opacity: 1, x: 0 },
  transition:{ duration: 0.72, ease: [0.22, 1, 0.36, 1] },
};

export const scaleIn = {
  initial:   { opacity: 0, scale: 0.94 },
  animate:   { opacity: 1, scale: 1 },
  transition:{ duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

export const staggerItem = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* Viewport-triggered animation props */
export const inView = {
  initial:   "hidden",
  whileInView:"visible",
  viewport:  { once: true, amount: 0.15 },
};
