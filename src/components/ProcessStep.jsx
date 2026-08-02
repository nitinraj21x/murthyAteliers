import { motion } from "framer-motion";
import { staggerItem } from "../utils/motion";

export default function ProcessStep({ step }) {
  return (
    <motion.div variants={staggerItem} className="process-card group">
      <div className="process-step-img-wrap">
        <img
          src={step.image}
          alt={step.title}
          className="process-step-img"
          loading="lazy"
        />
        <div className="img-fill img-overlay-forest" style={{ opacity: 0.6 }} />
        <span className="process-card-num font-display">{step.step}</span>
      </div>
      <div className="process-card-body">
        <h3 className="process-card-title font-display">{step.title}</h3>
        <div className="ornament-sm" style={{ marginBlock: "0.75rem" }} />
        <p className="process-card-desc">{step.body}</p>
      </div>
    </motion.div>
  );
}

