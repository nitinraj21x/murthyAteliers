import { motion } from "framer-motion";
import { fadeUp, inView } from "../utils/motion";

export default function SectionHeading({ eyebrow, heading, body, align = "left", light = false }) {
  const centered = align === "center";
  return (
    <motion.div
      variants={fadeUp}
      {...inView}
      className="section-heading"
      style={{
        maxWidth: "48rem",
        marginInline: centered ? "auto" : undefined,
        textAlign:    centered ? "center" : undefined,
      }}
    >
      {eyebrow && (
        <p className="eyebrow" style={{ marginBottom: "1rem", color: light ? "rgba(211,175,55,0.70)" : "var(--crimson)" }}>
          {eyebrow}
        </p>
      )}
      <h2
        className="display-lg"
        style={{ textWrap: "balance", color: light ? "var(--cream)" : "var(--forest)" }}
      >
        {heading}
      </h2>
      {body && (
        <p
          style={{
            marginTop:   "1.25rem",
            fontSize:    "1rem",
            lineHeight:  "2rem",
            color:       light ? "rgba(250,248,237,0.65)" : "rgba(61,75,42,0.65)",
          }}
        >
          {body}
        </p>
      )}
    </motion.div>
  );
}
