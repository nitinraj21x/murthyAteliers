import { motion } from "framer-motion";
import { fadeUp, inView } from "../utils/motion";

/**
 * SectionHeading
 * @param {string}  eyebrow   - small uppercase label above heading
 * @param {string}  heading   - main heading text
 * @param {string}  [body]    - optional paragraph below heading
 * @param {"left"|"center"} [align="left"]
 * @param {boolean} [light]   - use light (cream) text for dark backgrounds
 */
export default function SectionHeading({ eyebrow, heading, body, align = "left", light = false }) {
  const centered = align === "center";
  return (
    <motion.div
      variants={fadeUp}
      {...inView}
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className={`eyebrow mb-4 ${light ? "text-gold/70" : "text-crimson"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`display-lg ${light ? "text-cream" : "text-forest"}`}
        style={{ textWrap: "balance" }}
      >
        {heading}
      </h2>
      {body && (
        <p className={`mt-5 text-base leading-8 sm:text-lg ${light ? "text-cream/65" : "text-forest/65"}`}>
          {body}
        </p>
      )}
    </motion.div>
  );
}
