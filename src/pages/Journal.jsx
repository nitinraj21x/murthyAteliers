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
      <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
        <img src={story.image} alt={story.title}
          className="absolute inset-0 w-full h-full object-cover" fetchpriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/50 to-forest/20" />
        <div className="relative z-10 shell pb-12 w-full">
          <div className="frame">
            <p className="eyebrow text-gold/70 mb-2">{story.category}</p>
            <h1 className="display-lg text-cream max-w-3xl" style={{ textWrap: "balance" }}>
              {story.title}
            </h1>
            <div className="flex items-center gap-2 mt-4 text-cream/50 text-xs">
              <Clock size={11} />
              <span>{story.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-16">
        <div className="frame max-w-3xl">
          <Link to="/journal" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-forest/50 hover:text-crimson transition-colors mb-10">
            <ArrowLeft size={13} /> Back to Journal
          </Link>

          {/* Jewel attribution */}
          <div className="card-parchment rounded-2xl px-6 py-4 mb-10 flex items-start gap-3">
            <BookOpen size={15} className="text-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs tracking-widest uppercase text-forest/45 font-medium mb-0.5">Lives on today in</p>
              <p className="text-sm text-forest/70 italic">{story.jewel}</p>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-base sm:text-lg leading-9 text-forest/75 mb-8">{story.excerpt}</p>

          <div className="ornament mb-10" />

          {/* Body paragraphs */}
          <div className="space-y-6">
            {story.body.map((para, i) => (
              <p key={i} className="text-base leading-9 text-forest/70">{para}</p>
            ))}
          </div>

          {/* Meaning */}
          <div className="mt-12 pt-8 border-t border-gold/20">
            <p className="eyebrow text-crimson mb-3">What the story is really saying</p>
            <p className="font-display italic text-forest/70 text-xl leading-9">{story.meaning}</p>
          </div>

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

/* ─── Regular Article View ────────────────────────────────── */
function ArticleView({ article }) {
  return (
    <>
      <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
        <img src={article.image} alt={article.title}
          className="absolute inset-0 w-full h-full object-cover" fetchpriority="high" />
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
          <Link to="/journal"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-forest/50 hover:text-crimson transition-colors mb-10">
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

/* ─── Journal Index ───────────────────────────────────────── */
function JournalIndex() {
  const featured = journalArticles[0];
  const rest = journalArticles.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        <img src="/jewellry/Web-Optimised/heirStory.webp" alt="Journal"
          className="absolute inset-0 w-full h-full object-cover" fetchpriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/50 to-forest/20" />
        <div className="relative z-10 shell pb-14 w-full">
          <div className="frame">
            <motion.p {...fadeUp} className="eyebrow text-gold/70 mb-4">Notes From the Atelier</motion.p>
            <motion.h1 {...fadeUp} transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-cream">
              The Journal
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Featured article */}
      <section className="shell py-16">
        <div className="frame">
          <p className="eyebrow text-crimson mb-6">Featured</p>
          <motion.article {...fadeUp} {...inView}
            className="group grid gap-0 lg:grid-cols-[1.2fr_0.8fr] overflow-hidden rounded-3xl shadow-luxury card-parchment">
            <div className="relative overflow-hidden h-72 lg:h-auto">
              <img src={featured.image} alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
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
              <h2 className="font-display text-forest text-3xl sm:text-4xl leading-tight">{featured.title}</h2>
              <p className="mt-4 text-sm leading-7 text-forest/65">{featured.excerpt}</p>
              <Link to={`/journal/${featured.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-crimson hover:text-forest transition-colors">
                Read More <ArrowUpRight size={12} />
              </Link>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Rest of regular articles */}
      <section className="shell pb-16">
        <div className="frame">
          <div className="ornament mb-10" />
          <motion.div variants={staggerContainer} {...inView} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <JournalCard key={article.slug} article={article} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stories Behind the Jewels ── */}
      <section className="shell py-20 sm:py-28 bg-forest relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 30% 60%, rgba(211,175,55,0.2) 0%, transparent 55%)" }} />
        <div className="frame relative z-10">
          <motion.p {...fadeUp} {...inView} className="eyebrow text-gold/70 mb-4">
            Stories Behind the Jewels
          </motion.p>
          <motion.h2 {...fadeUp} {...inView} className="display-lg text-cream mb-4">
            Nine Legends Woven Into Gold
          </motion.h2>
          <motion.p {...fadeUp} {...inView} className="text-sm leading-8 text-cream/55 max-w-2xl mb-14">
            Every motif on the D.K. Murthy design sheet — the swan, the serpent, the mango, the moon, the twin-headed bird, the crocodile, the pearl — is the last surviving frame of a much longer story. These are those stories, told the way a grandmother would tell them.
          </motion.p>

          <motion.div variants={staggerContainer} {...inView} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {jewelleryStories.map((story, i) => (
              <motion.div key={story.slug} variants={staggerItem}>
                <Link to={`/journal/story-${story.slug}`} className="group block h-full">
                  <article className="h-full rounded-3xl overflow-hidden border border-gold/15 hover:border-gold/35 transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.03)" }}>
                    <div className="relative h-52 overflow-hidden">
                      <img src={story.image} alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <span className="absolute top-4 left-4 eyebrow text-gold/80 text-[0.6rem] bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        {story.category}
                      </span>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-xs text-gold/60 italic mb-1">{story.jewel}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-cream/40 text-xs mb-3">
                        <Clock size={10} />
                        <span>{story.readTime}</span>
                      </div>
                      <h3 className="font-display text-cream text-xl leading-tight mb-3">{story.title}</h3>
                      <p className="text-xs leading-6 text-cream/55 line-clamp-3">{story.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-gold/70 group-hover:text-gold transition-colors">
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

  // Check if it's a story
  if (slug && slug.startsWith("story-")) {
    const storySlug = slug.replace("story-", "");
    const story = jewelleryStories.find((s) => s.slug === storySlug);
    if (story) return <StoryView story={story} />;
  }

  // Check if it's a regular article
  const article = slug ? journalArticles.find((a) => a.slug === slug) : null;

  if (slug && !article && !(slug.startsWith("story-"))) {
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
