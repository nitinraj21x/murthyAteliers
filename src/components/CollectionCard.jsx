import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { staggerItem } from "../utils/motion";

/**
 * CollectionCard
 *
 * The article has an explicit min-height. An absolutely-positioned <img>
 * fills it completely — same stacking context, so h-full always works.
 * Zoom on hover uses CSS transform: scale() which transitions smoothly
 * via Tailwind's group-hover + transition utilities.
 *
 * Text: bold white with a heavy multi-layer black text-shadow for
 * legibility against any image.
 */
export default function CollectionCard({ collection, featured = false }) {
  return (
    <motion.article
      variants={staggerItem}
      className={`group relative overflow-hidden rounded-3xl ${
        featured
          ? "lg:col-span-2 min-h-[480px] lg:min-h-[560px]"
          : "min-h-[18rem] sm:min-h-[22rem]"
      }`}
    >
      {/* ── Image — absolutely fills the article ── */}
      <img
        src={collection.image}
        alt={collection.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        style={{
          objectPosition: collection.imagePosition ?? "center center",
        }}
        loading="lazy"
      />

      {/* Dark gradient — heavier at the bottom so text always reads */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.08) 100%)",
        }}
      />

      {/* Gold border reveal on hover */}
      <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-gold/40 transition-colors duration-500 pointer-events-none" />

      {/* ── Text content ── */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">

        {/* Eyebrow */}
        <p
          className="eyebrow mb-2"
          style={{
            color: "#D3AF37",
            textShadow: "0 1px 4px rgba(0,0,0,1), 0 0 12px rgba(0,0,0,0.9)",
          }}
        >
          {collection.name}
        </p>

        {/* Tagline — bold white, strong black shadow */}
        <h3
          className={`font-display leading-tight font-bold text-white ${
            featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
          }`}
          style={{
            textShadow:
              "0 2px 4px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.8)",
          }}
        >
          {collection.tagline}
        </h3>

        {/* Story — featured cards only */}
        {featured && (
          <p
            className="mt-3 text-sm leading-7 font-medium text-white/90 max-w-lg"
            style={{
              textShadow: "0 1px 4px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.9)",
            }}
          >
            {collection.story}
          </p>
        )}

        {/* CTA button */}
        <div className="mt-5">
          <Link
            to={`/collections#${collection.id}`}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white border border-white/40 rounded-full px-5 py-2.5 hover:bg-white/15 hover:border-white/70 transition-all duration-300 backdrop-blur-sm"
          >
            Request Details
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
