import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, ArrowUpRight } from "lucide-react";
import JournalCard from "../components/JournalCard";
import SectionHeading from "../components/SectionHeading";
import { journalArticles } from "../data/content";
import { img } from "../data/images";
import { fadeUp, staggerContainer, staggerItem, inView } from "../utils/motion";

/* Single article view */
function ArticleView({ article }) {
  return (
    <>
      <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/50 to-forest/20" />
        <div className="relative z-10 shell pb-12 w-full">
          <div className="frame">
            <p className="eyebrow text-gold/70 mb-3">{article.category}</p>
            <h1 className="display-lg text-cream max-w-3xl" style={{ textWrap: "balance" }}>
              {article.title}
            </h1>
            <div className="flex items-center gap-2 mt-4 text-cream/50 text-xs">
              <Clock size={11} />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-16">
        <div className="frame max-w-3xl">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-forest/50 hover:text-crimson transition-colors mb-10"
          >
            <ArrowLeft size={13} /> Back to Journal
          </Link>
          <p className="text-base sm:text-lg leading-9 text-forest/75">{article.excerpt}</p>
          <div className="ornament my-10" />
          <p className="text-base leading-9 text-forest/70">
            This is an editorial piece from the Murthy Ateliers journal — a space for deeper reading on heritage, craft, and the stories behind the jewels. Full articles are available to clients and subscribers.
          </p>
          <div className="mt-10">
            <Link to="/consultation" className="btn-primary inline-flex">
              Begin a Conversation
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* Journal index */
function JournalIndex() {
  const featured = journalArticles[0];
  const rest = journalArticles.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        <img
          src={img.journal1}
          alt="Journal"
          className="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/50 to-forest/20" />
        <div className="relative z-10 shell pb-14 w-full">
          <div className="frame">
            <motion.p {...fadeUp} className="eyebrow text-gold/70 mb-4">
              Notes From the Atelier
            </motion.p>
            <motion.h1
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-cream"
            >
              The Journal
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Featured article */}
      <section className="shell py-16">
        <div className="frame">
          <p className="eyebrow text-crimson mb-6">Featured</p>
          <motion.article
            {...fadeUp}
            {...inView}
            className="group grid gap-0 lg:grid-cols-[1.2fr_0.8fr] overflow-hidden rounded-3xl shadow-luxury card-parchment"
          >
            <div className="relative overflow-hidden h-72 lg:h-auto">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 img-overlay-dark opacity-30" />
              <span className="absolute top-5 left-5 eyebrow text-gold bg-crimson/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-[0.6rem]">
                {featured.category}
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <div className="flex items-center gap-2 text-sage text-xs mb-4">
                <Clock size={11} />
                <span>{featured.readTime}</span>
              </div>
              <h2 className="font-display text-forest text-3xl sm:text-4xl leading-tight">
                {featured.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-forest/65">{featured.excerpt}</p>
              <Link
                to={`/journal/${featured.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-crimson hover:text-forest transition-colors"
              >
                Read More <ArrowUpRight size={12} />
              </Link>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Rest of articles */}
      <section className="shell pb-24">
        <div className="frame">
          <div className="ornament mb-10" />
          <motion.div
            variants={staggerContainer}
            {...inView}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((article) => (
              <JournalCard key={article.slug} article={article} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function Journal() {
  const { slug } = useParams();
  const article = slug ? journalArticles.find((a) => a.slug === slug) : null;

  if (slug && !article) {
    return (
      <div className="min-h-svh flex items-center justify-center shell">
        <div className="text-center">
          <p className="eyebrow text-crimson mb-4">Not Found</p>
          <h1 className="display-md text-forest mb-6">Article not found</h1>
          <Link to="/journal" className="btn-primary inline-flex">Back to Journal</Link>
        </div>
      </div>
    );
  }

  return article ? <ArticleView article={article} /> : <JournalIndex />;
}
