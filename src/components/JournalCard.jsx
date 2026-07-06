import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { staggerItem } from "../utils/motion";

export default function JournalCard({ article, featured = false }) {
  return (
    <motion.article
      variants={staggerItem}
      className={`group card-parchment rounded-3xl overflow-hidden flex flex-col ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden shrink-0 ${
        featured ? "h-56 lg:h-auto lg:w-72" : "h-52"
      }`}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 img-overlay-dark opacity-40" />
        <span className="absolute top-4 left-4 eyebrow text-gold bg-crimson/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-[0.6rem]">
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 sm:p-7">
        <div className="flex items-center gap-2 text-sage text-xs mb-3">
          <Clock size={11} />
          <span>{article.readTime}</span>
        </div>
        <h3 className="font-display text-forest text-2xl sm:text-3xl leading-tight group-hover:text-crimson transition-colors duration-300">
          {article.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-forest/65 flex-1">{article.excerpt}</p>
        <Link
          to={`/journal/${article.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-crimson hover:text-forest transition-colors duration-200"
        >
          Read More <ArrowUpRight size={12} />
        </Link>
      </div>
    </motion.article>
  );
}
