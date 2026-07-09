import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { staggerItem } from "../utils/motion";

/**
 * CollectionCard
 *
 * Desktop: featured card spans 2 cols, tall height. Non-featured: shorter fixed height.
 * Mobile: all cards are uniform height (260px), no "Request Details" button.
 * Zoom on hover uses CSS transform: scale() for smooth GPU-composited animation.
 * Text: bold white with heavy black text-shadow for legibility on any image.
 */
export default function CollectionCard({ collection, featured = false }) {
  return (
    <motion.article
      variants={staggerItem}
      className={`group relative overflow-hidden rounded-3xl ${
        featured
          ? "lg:col-span-2 min-h-[260px] sm:min-h-[360px] lg:min-h-[480px] xl:min-h-[560px]"
          : "min-h-[260px] sm:min-h-[22rem]"
      }`}
    >
      {/* Image — absolutely fills the article */}
      <img
        src={collection.image}
        alt={collection.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        style={{ objectPosition: collection.imagePosition ?? "center center" }}
        loading="lazy"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.08) 100%)",
        }}
      />

      {/* Gold border on hover */}
      <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-gold/40 transition-colors duration-500 pointer-events-none" />

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 lg:p-8">
        <p
          className="eyebrow mb-2"
          style={{
            color: "#D3AF37",
            textShadow: "0 1px 4px rgba(0,0,0,1), 0 0 12px rgba(0,0,0,0.9)",
          }}
        >
          {collection.name}
        </p>

        <h3
          className={`font-display leading-tight font-bold text-white ${
            featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl lg:text-3xl"
          }`}
          style={{
            textShadow:
              "0 2px 4px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.8)",
          }}
        >
          {collection.tagline}
        </h3>

        {featured && (
          <p
            className="mt-2 text-xs sm:text-sm leading-6 sm:leading-7 font-medium text-white/90 max-w-lg hidden md:block"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.9)" }}
          >
            {collection.story}
          </p>
        )}

        {/* CTA — hidden on mobile via .collection-cta-wrap */}
        <div className="collection-cta-wrap mt-4">
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
