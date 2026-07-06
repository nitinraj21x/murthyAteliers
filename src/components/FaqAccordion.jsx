import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.question}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
              isOpen
                ? "border-gold/40 bg-cream shadow-card"
                : "border-gold/15 bg-cream/60 hover:border-gold/30"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className={`font-display text-xl sm:text-2xl leading-snug transition-colors duration-200 ${
                isOpen ? "text-crimson" : "text-forest"
              }`}>
                {item.question}
              </span>
              <span className={`shrink-0 flex items-center justify-center h-7 w-7 rounded-full border transition-all duration-300 ${
                isOpen
                  ? "border-crimson/30 bg-crimson/8 text-crimson"
                  : "border-gold/30 bg-gold/8 text-forest/60"
              }`}>
                {isOpen ? <Minus size={13} /> : <Plus size={13} />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-8 text-forest/70">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
