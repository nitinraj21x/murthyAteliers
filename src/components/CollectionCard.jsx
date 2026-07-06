import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { staggerItem } from "../utils/motion";

export default function CollectionCard({ collection, featured = false }) {
  return (
    <motion.article
      variants={staggerItem}
      className={`group relative overflow-hidden rounded-3xl ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "h-[480px] lg:h-[560px]" : "h-72 sm:h-80"}`}>
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 img-overlay-dark" />
        {/* Gold border on hover */}
        <div className="absolute inset-0 rounded-3xl border border-gold/0 group-hover:border-gold/30 transition-all duration-500" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        <p className="eyebrow text-gold/80 mb-3">{collection.name}</p>
        <h3 className={`font-display text-cream leading-tight ${featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>
          {collection.tagline}
        </h3>
        {featured && (
          <p className="mt-3 text-sm leading-7 text-cream/70 max-w-lg">{collection.story}</p>
        )}
        <div className="mt-5">
          <Link
            to={`/collections#${collection.id}`}
            className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-gold border border-gold/30 rounded-full px-5 py-2.5 hover:bg-gold/10 hover:border-gold/60 transition-all duration-300"
          >
            Request Details
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
