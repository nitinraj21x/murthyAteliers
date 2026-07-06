import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp } from "../utils/motion";

export default function NotFound() {
  return (
    <div className="min-h-svh flex items-center justify-center shell py-24">
      <div className="frame text-center max-w-xl">
        <motion.p {...fadeUp} className="eyebrow text-crimson mb-4">
          404 — Page Not Found
        </motion.p>
        <motion.h1
          {...fadeUp}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="display-lg text-forest mb-6"
        >
          This page has passed on.
        </motion.h1>
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.2 }}
          className="text-base leading-8 text-forest/65 mb-10"
        >
          Like all things worth keeping, some things are not found — they are returned to. Let us take you back.
        </motion.p>
        <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            Return Home
            <ArrowUpRight size={14} />
          </Link>
          <Link to="/collections" className="btn-outline">
            Explore Collections
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
