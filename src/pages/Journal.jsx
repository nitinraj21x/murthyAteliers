import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, ArrowUpRight, BookOpen } from "lucide-react";
import JournalCard from "../components/JournalCard";
import { journalArticles, jewelleryStories } from "../data/content";
import { fadeUp, staggerContainer, staggerItem, inView } from "../utils/motion";

/* ─── Story Article View ──────────────────────────────────── */
function StoryView({ story }) {
  return (
    <>
      <section className="page-hero-sec">
        <img src={story.image} alt={story.title}
          className="hero-banner-img hero-banner-img--article" fetchPriority="high" />
        <div className="page-hero-gradient" />
        <div className="page-hero-content shell">
          <div className="frame">
            <p className="eyebrow journal-hero-eyebrow">{story.category}</p>
            <h1 className="display-lg journal-hero-title">{story.title}</h1>
            <div className="journal-hero-meta">
              <Clock size={11} />
              <span>{story.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="shell journal-article-sec">
        <div className="frame journal-article-inner">
          <Link to="/journal" className="journal-back-link">
            <ArrowLeft size={13} /> Back to Journal
          </Link>
          <div className="card-parchment journal-jewel-attr">
            <BookOpen size={15} className="journal-jewel-icon" />
            <div>
              <p className="journal-jewel-label">Lives on today in</p>
              <p className="journal-jewel-value">{story.jewel}</p>
            </div>
          </div>
          <p className="journal-excerpt">{story.excerpt}</p>
          <div className="ornament journal-divider" />
          <div className="journal-body-paras">
            {story.body.map((para, i) => (
              <p key={i} className="journal-body-para">{para}</p>
            ))}
          </div>
          <div className="journal-meaning-block">
            <p className="eyebrow" style={{ color:"var(--crimson)", marginBottom:"0.75rem" }}>What the story is really saying</p>
            <p className="journal-meaning-text font-display">{story.meaning}</p>
          </div>
          <div style={{ marginTop:"2.5rem" }}>
            <Link to="/consultation" className="btn-primary journal-article-cta">
              Begin a Conversation <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Regular Article View ────────────────────────────────── */
function ArticleView({ article }) {
  return (
    <>
      <section className="page-hero-sec">
        <img src={article.image} alt={article.title}
          className="hero-banner-img hero-banner-img--article" fetchPriority="high" />
        <div className="page-hero-gradient" />
        <div className="page-hero-content shell">
          <div className="frame">
            <p className="eyebrow journal-hero-eyebrow">{article.category}</p>
            <h1 className="display-lg journal-hero-title">{article.title}</h1>
            <div className="journal-hero-meta">
              <Clock size={11} />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="shell journal-article-sec">
        <div className="frame journal-article-inner">
          <Link to="/journal" className="journal-back-link">
            <ArrowLeft size={13} /> Back to Journal
          </Link>
          <p className="journal-excerpt">{article.excerpt}</p>
          <div className="ornament journal-divider" />
          <p className="journal-body-para">
            This is an editorial piece from the Murthy Ateliers journal — a space for deeper reading on heritage, craft, and the stories behind the jewels. Full articles are available to clients and subscribers.
          </p>
          <div style={{ marginTop:"2.5rem" }}>
            <Link to="/consultation" className="btn-primary journal-article-cta">
              Begin a Conversation <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Journal Index ───────────────────────────────────────── */
function JournalIndex() {
  const featured = journalArticles[0];
  const rest = journalArticles.slice(1);

  return (
    <>
      <section id="page-hero" className="page-hero-sec page-hero-sec--tall">
        <img src="/jewellry/Web-Optimised/heirStory-opt.webp" alt="Journal"
          className="hero-banner-img hero-banner-img--journal" fetchPriority="high" decoding="async" />
        <div className="page-hero-gradient" />
        <div className="page-hero-content shell">
          <div className="frame">
            <motion.p {...fadeUp} className="eyebrow" style={{ color:"rgba(211,175,55,0.70)", marginBottom:"1rem" }}>Notes From the Atelier</motion.p>
            <motion.h1 {...fadeUp} transition={{ delay:0.1, duration:0.8, ease:[0.22,1,0.36,1] }}
              className="display-xl" style={{ color:"var(--cream)" }}>The Journal</motion.h1>
          </div>
        </div>
      </section>

      <section className="shell journal-featured-sec">
        <div className="frame">
          <p className="eyebrow" style={{ color:"var(--crimson)", marginBottom:"1.5rem" }}>Featured</p>
          <motion.article {...fadeUp} {...inView} className="journal-featured-card group card-parchment shadow-luxury">
            <div className="journal-featured-img-wrap">
              <img src={featured.image} alt={featured.title} className="journal-featured-img" loading="lazy" />
              <div className="img-fill img-overlay-dark journal-featured-overlay" />
              <span className="journal-featured-cat eyebrow">{featured.category}</span>
            </div>
            <div className="journal-featured-body">
              <div className="journal-hero-meta" style={{ marginBottom:"1rem" }}>
                <Clock size={11} /><span>{featured.readTime}</span>
              </div>
              <h2 className="font-display journal-featured-title">{featured.title}</h2>
              <p className="journal-featured-excerpt">{featured.excerpt}</p>
              <Link to={`/journal/${featured.slug}`} className="journal-read-more">
                Read More <ArrowUpRight size={12} />
              </Link>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="shell journal-grid-sec">
        <div className="frame">
          <div className="ornament" style={{ marginBottom:"2.5rem" }} />
          <motion.div variants={staggerContainer} {...inView} className="journal-cards-grid">
            {rest.map((article) => (
              <JournalCard key={article.slug} article={article} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="shell journal-stories-sec" style={{ position:"relative", overflow:"hidden" }}>
        <div className="glow-journal-stories" />
        <div className="frame journal-stories-inner">
          <motion.p {...fadeUp} {...inView} className="eyebrow" style={{ color:"rgba(211,175,55,0.70)", marginBottom:"1rem" }}>
            Stories Behind the Jewels
          </motion.p>
          <motion.h2 {...fadeUp} {...inView} className="display-lg" style={{ color:"var(--cream)", marginBottom:"1rem" }}>
            Nine Legends Woven Into Gold
          </motion.h2>
          <motion.p {...fadeUp} {...inView} className="journal-stories-intro">
            Every motif on the D.K. Murthy design sheet — the swan, the serpent, the mango, the moon, the twin-headed bird, the crocodile, the pearl — is the last surviving frame of a much longer story. These are those stories, told the way a grandmother would tell them.
          </motion.p>
          <motion.div variants={staggerContainer} {...inView} className="journal-cards-grid">
            {jewelleryStories.map((story) => (
              <motion.div key={story.slug} variants={staggerItem}>
                <Link to={`/journal/story-${story.slug}`} className="journal-story-link group">
                  <article className="journal-story-card">
                    <div className="journal-story-card-img-wrap">
                      <img src={story.image} alt={story.title} className="journal-story-card-img" loading="lazy" />
                      <div className="journal-story-card-gradient" />
                      <span className="journal-story-cat eyebrow">{story.category}</span>
                      <div className="journal-story-jewel-wrap">
                        <p className="journal-story-jewel">{story.jewel}</p>
                      </div>
                    </div>
                    <div className="journal-story-body">
                      <div className="journal-hero-meta journal-story-meta">
                        <Clock size={10} /><span>{story.readTime}</span>
                      </div>
                      <h3 className="font-display journal-story-title">{story.title}</h3>
                      <p className="journal-story-excerpt">{story.excerpt}</p>
                      <span className="journal-story-cta">
                        Read Story <ArrowUpRight size={11} />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ─── Main Export ─────────────────────────────────────────── */
export default function Journal() {
  const { slug } = useParams();

  if (slug && slug.startsWith("story-")) {
    const storySlug = slug.replace("story-", "");
    const story = jewelleryStories.find((s) => s.slug === storySlug);
    if (story) return <StoryView story={story} />;
  }

  const article = slug ? journalArticles.find((a) => a.slug === slug) : null;

  if (slug && !article && !(slug.startsWith("story-"))) {
    return (
      <div className="journal-notfound shell">
        <div className="text-center">
          <p className="eyebrow" style={{ color:"var(--crimson)", marginBottom:"1rem" }}>Not Found</p>
          <h1 className="display-md" style={{ color:"var(--forest)", marginBottom:"1.5rem" }}>Article not found</h1>
          <Link to="/journal" className="btn-primary">Back to Journal</Link>
        </div>
      </div>
    );
  }

  return article ? <ArticleView article={article} /> : <JournalIndex />;
}

