import { motion } from "framer-motion";
import { staggerItem } from "../utils/motion";

export default function ProcessStep({ step }) {
  return (
    <motion.div
      variants={staggerItem}
      className="group relative flex flex-col"
    >
      {/* Image */}
      <div className="process-step-img-wrap">
        <img
          src={step.image}
          alt={step.title}
          className="process-step-img"
          loading="lazy"
        />
        <div className="absolute inset-0 img-overlay-forest opacity-60" />
        {/* Step number */}
        <div className="absolute top-4 left-4">
          <span className="font-display text-gold/80 text-5xl leading-none">{step.step}</span>
        </div>
      </div>

      {/* Content */}
      <div className="mt-5 px-1">
        <h3 className="font-display text-forest text-2xl">{step.title}</h3>
        <div className="ornament-sm mt-3 mb-3" />
        <p className="text-sm leading-7 text-forest/65">{step.body}</p>
      </div>
    </motion.div>
  );
}
