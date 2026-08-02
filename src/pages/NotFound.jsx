import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp } from "../utils/motion";

export default function NotFound() {
  return (
    <div className="not-found-page shell">
      <div className="frame not-found-inner">
        <motion.p {...fadeUp} className="eyebrow text-crimson" style={{ marginBottom: "1rem" }}>
          404 — Page Not Found
        </motion.p>
        <motion.h1
          {...fadeUp}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="display-lg text-forest"
          style={{ marginBottom: "1.5rem" }}
        >
          This page has passed on.
        </motion.h1>
        <motion.p
          {...fadeUp}
          transition={{ delay: 0.2 }}
          style={{ fontSize: "1rem", lineHeight: "2rem", color: "rgba(61,75,42,0.65)", marginBottom: "2.5rem" }}
        >
          Like all things worth keeping, some things are not found — they are returned to. Let us take you back.
        </motion.p>
        <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="not-found-ctas">
          <Link to="/" className="btn-primary">
            Return Home <ArrowUpRight size={14} />
          </Link>
          <Link to="/collections" className="btn-outline">
            Explore Collections
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
