import { motion } from "framer-motion";
import { brand } from "../data/content";

export default function BrandLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-cream overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgba(211,175,55,0.12) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(106,20,19,0.08) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.32em" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow mb-8"
        >
          {brand.signature}
        </motion.p>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-baseline justify-center"
        >
          <span className="script-brand text-crimson whitespace-nowrap"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 1 }}>
            {brand.fullName}
          </span>
        </motion.div>

        {/* Gold shimmer line */}
        <div className="relative mt-10 h-px w-64 bg-gold/20 overflow-hidden rounded-full">
          <motion.span
            initial={{ x: "-100%" }}
            animate={{ x: "300%" }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
            className="absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-gold to-transparent"
          />
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2.5 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.3, scale: 0.8 }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
              className="block h-2 w-2 rounded-full bg-gold"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
