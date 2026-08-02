import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { staggerItem } from "../utils/motion";

export default function JournalCard({ article, featured = false }) {
  return (
    <motion.article
      variants={staggerItem}
      className={`jcard${featured ? " jcard--featured" : ""}`}
    >
      <div className={`jcard-img-wrap${featured ? " jcard-img-wrap--featured" : ""}`}>
        <img
          src={article.image}
          alt={article.title}
          className="journal-card-component-img"
          loading="lazy"
        />
        <div className="img-overlay-dark jcard-overlay" />
        <span className="jcard-category eyebrow">{article.category}</span>
      </div>

      <div className="jcard-body">
        <div className="jcard-meta">
          <Clock size={11} />
          <span>{article.readTime}</span>
        </div>
        <h3 className="jcard-title font-display">{article.title}</h3>
        <p className="jcard-excerpt">{article.excerpt}</p>
        <Link to={`/journal/${article.slug}`} className="jcard-cta">
          Read More <ArrowUpRight size={12} />
        </Link>
      </div>
    </motion.article>
  );
}

