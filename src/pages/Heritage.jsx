import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { founderStory } from "../data/content";
import {
  jewelleryHistoryIntro, timelineEvents, ornamentProfiles, regionalVariations,
} from "../data/heritageHistory";
import {
  goldCultureIntro, goldCulturePillars, atelierStory,
  templeToBridalJourney, fiveGenerations,
} from "../data/goldCulture";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItem, inView } from "../utils/motion";

const heritagePoints = [
  { title: "D.K. Murthy & E.A. Swamy Jewelers", body: "Founded in the heart of Mylapore, Chennai, the original house built its reputation on the trust of families, the integrity of craft, and beauty made to outlast the hands that made it.", image: "/jewellry/Web-Optimised/store.webp" },
  { title: "The Legacy of Mylapore", body: "Mylapore is not just a location — it is a living archive of South Indian culture, temple tradition, and artisanal craft. The streets, the sanctums, and the silk have shaped the visual language of our jewelry.", image: "/jewellry/Web-Optimised/chennai.webp" },
];

/* ── ReadMore ──────────────────────────────────────────────── */
function ReadMore({ children, preview, dark = false }) {
  const [open, setOpen] = useState(false);
  const textCol = dark ? "text-cream/65" : "text-forest/70";
  const btnCol  = dark ? "text-gold/70 hover:text-gold" : "text-crimson hover:text-forest";
  return (
    <div>
      {preview && <p className="heri-readmore-preview" style={{ color: dark ? "rgba(250,248,237,0.65)" : "rgba(61,75,42,0.70)" }}>{preview}</p>}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow:"hidden" }}>
            <div className="heri-readmore-body">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen((p) => !p)}
        className="heri-readmore-btn" style={{ color: dark ? "rgba(211,175,55,0.70)" : "var(--crimson)" }}>
        {open ? "Show Less" : "Read More"}
        {open ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
      </button>
    </div>
  );
}

/* ── Timeline ──────────────────────────────────────────────── */
function JewelleryTimeline() {
  const [activeIdx, setActiveIdx] = useState(null);
  return (
    <section className="shell heri-timeline-sec">
      <div className="glow-gold-left" />
      <div className="frame heri-frame-z">
        <motion.p {...fadeUp} {...inView} className="eyebrow heri-eyebrow-gold">A Two-Thousand Year Story</motion.p>
        <motion.h2 {...fadeUp} {...inView} className="display-lg heri-heading-cream">Timeline: The Evolution of South Indian Jewellery</motion.h2>
        <motion.p {...fadeUp} {...inView} className="heri-section-intro">
          Each era shaped the vocabulary of ornament that survives in South Indian bridal jewellery today. Click any era to explore.
        </motion.p>
        <div style={{ position:"relative" }}>
          <div className="heri-timeline-line" />
          <motion.div variants={staggerContainer} {...inView} className="heri-stack-sm">
            {timelineEvents.map((evt, i) => {
              const isOpen = activeIdx === i;
              return (
                <motion.div key={evt.period} variants={staggerItem}>
                  <button onClick={() => setActiveIdx(isOpen ? null : i)} className="heri-timeline-btn">
                    <div className="heri-timeline-row group">
                      <div className="heri-timeline-dot-col">
                        <div className={`heri-timeline-dot${isOpen ? " heri-timeline-dot--open" : ""}`} />
                      </div>
                      <div className={`heri-timeline-card${isOpen ? " heri-timeline-card--open" : ""}`}
                        style={{ background: isOpen ? "rgba(211,175,55,0.06)" : "rgba(255,255,255,0.02)" }}>
                        <div className="heri-timeline-card-header">
                          <div>
                            <p className="heri-timeline-date">{evt.date}</p>
                            <h3 className="font-display heri-timeline-period">{evt.period}</h3>
                            <p className="heri-timeline-summary">{evt.summary}</p>
                          </div>
                          <div className={`heri-timeline-chevron${isOpen ? " heri-timeline-chevron--open" : ""}`}>
                            {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                          </div>
                        </div>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                              style={{ overflow:"hidden" }}>
                              <p className="heri-timeline-detail">{evt.detail}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Why Gold Became Irreplaceable ─────────────────────────── */
function WhyGoldSection() {
  return (
    <>
      <section className="shell heri-sec-pad">
        <div className="frame heri-history-inner">
          <motion.p {...fadeUp} {...inView} className="eyebrow heri-eyebrow-crimson">{goldCultureIntro.eyebrow}</motion.p>
          <motion.h2 {...fadeUp} {...inView} className="display-lg heri-heading-forest-mb">{goldCultureIntro.heading}</motion.h2>
          <div className="ornament" style={{ marginBottom:"1.75rem" }} />
          <motion.p {...fadeUp} {...inView} className="font-display heri-subheading-italic">
            {goldCultureIntro.subheading}
          </motion.p>
        </div>
      </section>
      <section className="shell heri-why-gold-sec">
        <div className="frame">
          <motion.div variants={staggerContainer} {...inView} className="heri-two-grid">
            {goldCulturePillars.map((p) => (
              <motion.div key={p.number} variants={staggerItem} className="card-parchment heri-pillar-card">
                <p className="font-display heri-pillar-num">{p.number}</p>
                <h3 className="font-display heri-pillar-card-title">{p.title}</h3>
                <div className="ornament heri-ornament-mb4" />
                <ReadMore preview={p.summary}>
                  <p className="heri-body-forest-sm">{p.detail}</p>
                </ReadMore>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ── The Goldsmith's Workshop ───────────────────────────────── */
function AtelierSection() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="shell heri-timeline-sec">
      <div className="glow-gold-right" />
      <div className="frame heri-frame-z">
        <div className="heri-atelier-grid">
          <motion.div variants={fadeLeft} {...inView}>
            <p className="eyebrow heri-eyebrow-gold">{atelierStory.eyebrow}</p>
            <h2 className="display-lg heri-heading-cream">{atelierStory.heading}</h2>
            <div className="ornament" style={{ marginBottom:"1.5rem", opacity:0.40 }} />
            <p className="heri-atelier-intro">{atelierStory.subheading}</p>
          </motion.div>
          <motion.div variants={fadeRight} {...inView} className="heri-stack-sm">
            {atelierStory.sections.map((sec, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={sec.title} className="heri-accordion-item"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <button onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="heri-accordion-trigger">
                    <span className="font-display heri-accordion-title">{sec.title}</span>
                    <span className="heri-accordion-chevron">
                      {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }} style={{ overflow:"hidden" }}>
                        <p className="heri-accordion-body">{sec.body}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── How Temple Jewellery Became Bridal Tradition ───────────── */
function TempleToBridalSection() {
  return (
    <section className="shell heri-vision-sec">
      <div className="frame">
        <motion.p {...fadeUp} {...inView} className="eyebrow heri-eyebrow-crimson">From Temple to Trousseau</motion.p>
        <motion.h2 {...fadeUp} {...inView} className="display-lg heri-heading-forest-mb">How Temple Jewellery Became Bridal Tradition</motion.h2>
        <motion.p {...fadeUp} {...inView} className="heri-section-intro-forest">
          A genre of jewellery designed exclusively for a stone or bronze deity — and how it became, six centuries later, the default aesthetic of the South Indian bride.
        </motion.p>
        <div style={{ position:"relative" }}>
          <div className="heri-temple-timeline-line" />
          <div className="heri-stage-list">
            {templeToBridalJourney.map((stage, i) => {
              const isRight = i % 2 === 1;
              return (
                <motion.div key={stage.stage} variants={staggerItem} {...inView}
                  className={`flex flex-col lg:flex-row gap-6 items-center ${isRight ? "lg:flex-row-reverse" : ""}`}>
                  <div className="heri-stage-half">
                    <div className="card-parchment heri-pillar-card">
                      <p className="eyebrow heri-eyebrow-gold-sm">{stage.stage}</p>
                      <p className="heri-stage-era">{stage.era}</p>
                      <h3 className="font-display heri-pillar-card-title">{stage.title}</h3>
                      <div className="ornament heri-ornament-mb4" />
                      <p className="heri-body-forest-sm">{stage.body}</p>
                    </div>
                  </div>
                  <div className="heri-stage-connector">
                    <div className="heri-stage-dot" />
                  </div>
                  <div className="heri-stage-spacer" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── The Jewels Themselves (Ornament Profiles) ──────────────── */
function OrnamentProfiles() {
  const imgs = [
    "/jewellry/Web-Optimised/jewellry/Cultural/Saradu Malai/DPPHOTGRAPHY-8171.webp",
    "/jewellry/Web-Optimised/jewellry/Cultural/Mango Saradu Malai/DPPHOTGRAPHY-8354.webp",
    "/jewellry/Web-Optimised/jewellry/Cultural/Manga Malai/DPPHOTGRAPHY-8186.webp",
    "/jewellry/Web-Optimised/jewellry/Cultural/Studded Mango Saradu/DPPHOTGRAPHY-8196.webp",
    "/jewellry/Web-Optimised/jewellry/Cultural/Studded Saradu Malai/DPPHOTGRAPHY-8206.webp",
    "/jewellry/Web-Optimised/jewellry/Cultural/Adigai blue/DPPHOTGRAPHY-8214.webp",
    "/jewellry/Web-Optimised/jewellry/Cultural/Poothali/DPPHOTGRAPHY-8229.webp",
    "/jewellry/Web-Optimised/jewellry/Cultural/Manga Malai Small/DPPHOTGRAPHY-8259.webp",
  ];
  return (
    <section className="shell heri-ornament-sec">
      <div className="glow-gold-center-low" />
      <div className="frame heri-frame-z">
        <motion.p {...fadeUp} {...inView} className="eyebrow heri-eyebrow-gold">Ornament Profiles</motion.p>
        <motion.h2 {...fadeUp} {...inView} className="display-lg heri-heading-cream">The Jewels Themselves</motion.h2>
        <motion.p {...fadeUp} {...inView} className="heri-section-intro">
          Each ornament carries two thousand years of meaning — etymology, dynastic origin, religious significance, and an unbroken lineage from Sangam poetry to the modern bridal trousseau.
        </motion.p>
        <div className="heri-ornament-list">
          {ornamentProfiles.map((orn, i) => {
            const isReverse = i % 2 === 1;
            const img = imgs[i] || imgs[0];
            return (
              <motion.div key={orn.name} variants={staggerItem} {...inView}
                className={`flex flex-col lg:flex-row gap-8 xl:gap-14 items-center ${isReverse ? "lg:flex-row-reverse" : ""}`}>
                <div className="heri-ornament-img-col">
                  <div className="heri-portrait-wrap">
                    <img src={img} alt={orn.name} className="heritage-ornament-img" loading="lazy" />
                    <div className="img-fill heri-portrait-gradient" />
                    <div className="heri-portrait-period-wrap">
                      <p className="eyebrow heri-portrait-period">{orn.period}</p>
                    </div>
                  </div>
                </div>
                <div className="heri-ornament-text">
                  <h3 className="font-display heri-ornament-name">{orn.name}</h3>
                  <p className="heri-ornament-tamil">{orn.tamil}</p>
                  <p className="heri-ornament-tag">
                    {orn.tagline}
                  </p>
                  <div className="ornament-sm heri-ornament-sm" />
                  <ReadMore preview={orn.summary} dark>
                    <p className="heri-body-cream-xs">{orn.detail}</p>
                    <p className="heri-ornament-worn">Worn by: {orn.wornBy}</p>
                  </ReadMore>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Five Generations ───────────────────────────────────────── */
function FiveGenerationsSection() {
  const [openGen, setOpenGen] = useState(null);
  return (
    <section className="shell heri-sec-pad">
      <div className="frame">
        <motion.p {...fadeUp} {...inView} className="eyebrow heri-eyebrow-crimson">A Comparative Trend Map</motion.p>
        <motion.h2 {...fadeUp} {...inView} className="display-lg heri-heading-forest-mb">Five Generations of South Indian Jewellery</motion.h2>
        <motion.p {...fadeUp} {...inView} className="heri-section-intro-forest">
          From the bespoke pattarai commissions of the early twentieth century to the diaspora-era bridal market of today.
        </motion.p>
        <motion.div variants={staggerContainer} {...inView} className="heri-stack-sm">
          {fiveGenerations.map((gen, i) => {
            const isOpen = openGen === i;
            return (
              <motion.div key={gen.gen} variants={staggerItem}>
                <button onClick={() => setOpenGen(isOpen ? null : i)} className="heri-timeline-btn">
                  <div className={`heri-gen-card${isOpen ? " heri-gen-card--open" : ""}`}>
                    <div className="heri-gen-header">
                      <div className="heri-gen-header-left">
                        <span className="font-display heri-gen-num">{String(i + 1).padStart(2, "0")}</span>
                        <div>
                          <h3 className="font-display heri-gen-era">{gen.era}</h3>
                          <p className="heri-gen-period">{gen.period}</p>
                          <p className="heri-gen-summary">{gen.summary}</p>
                        </div>
                      </div>
                      <span className="heri-gen-chevron">
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    </div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }} style={{ overflow:"hidden" }}>
                          <p className="heri-gen-detail">{gen.detail}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Across South India (Regional Variations) ───────────────── */
function RegionalVariations() {
  return (
    <section className="shell heri-ornament-sec">
      <div className="glow-gold-center-high" />
      <div className="frame heri-frame-z">
        <motion.p {...fadeUp} {...inView} className="eyebrow heri-eyebrow-gold">Regional Variations</motion.p>
        <motion.h2 {...fadeUp} {...inView} className="display-lg heri-heading-cream">Across South India</motion.h2>
        <motion.p {...fadeUp} {...inView} className="heri-section-intro">
          While the core vocabulary of South Indian jewellery is shared, each linguistic-cultural region developed its own naming conventions, proportions and stylistic emphases.
        </motion.p>
        <div className="heri-ornament-list">
          {regionalVariations.map((item, i) => {
            const isReverse = i % 2 === 1;
            return (
              <motion.div key={item.ornament} variants={staggerItem} {...inView}
                className={`flex flex-col lg:flex-row gap-8 xl:gap-14 items-center ${isReverse ? "lg:flex-row-reverse" : ""}`}>
                <div className="heri-ornament-img-col">
                  <div className="heri-portrait-wrap">
                    <img src={item.image} alt={item.ornament} className="heritage-regional-img" loading="lazy" />
                    <div className="img-fill heri-regional-gradient" />
                    <div className="absolute bottom-4 left-4">
                      <p className="eyebrow" style={{ color:"rgba(211,175,55,0.80)" }}>{item.ornament}</p>
                    </div>
                  </div>
                </div>
                <div className="heri-ornament-text">
                  <h3 className="font-display heri-regional-title">{item.ornament}</h3>
                  <div className="ornament-sm heri-ornament-sm" />
                  <p className="heri-regional-desc">{item.description}</p>
                  <div className="heri-regional-states">
                    {Object.entries(item.states).map(([state, localName]) => (
                      <div key={state} className="heri-state-tag"
                        style={{ background: "rgba(255,255,255,0.06)" }}>
                        <p className="heri-state-name">{state}</p>
                        <p className="font-display heri-state-local">{localName}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Main Heritage Page ─────────────────────────────────────── */
export default function Heritage() {
  return (
    <>
      <Helmet>
        <title>Heritage — Murthy Ateliers</title>
        <meta name="description" content="The story of Murthy Ateliers — rooted in Mylapore, Chennai. Explore the history of South Indian jewellery, the legacy of D.K. Murthy, and two thousand years of ornament tradition." />
      </Helmet>

      {/* Hero */}
      <section id="page-hero" className="page-hero-sec page-hero-sec--tall">
        <img src="/imgs/heriBanner.webp" alt="Heritage"
          className="hero-banner-img hero-banner-img--heritage" fetchPriority="high" decoding="async" />
        <div className="page-hero-gradient" />
        <div className="page-hero-content shell">
          <div className="frame">
            <motion.p {...fadeUp} className="eyebrow" style={{ color:"rgba(211,175,55,0.70)", marginBottom:"1rem" }}>Our Heritage</motion.p>
            <motion.h1 {...fadeUp} transition={{ delay:0.1, duration:0.8, ease:[0.22,1,0.36,1] }}
              className="display-xl" style={{ color:"var(--cream)" }}>Rooted in Mylapore</motion.h1>
          </div>
        </div>
      </section>

      {/* 1 — A Legacy Continued */}
      <section className="shell heri-sec-pad">
        <div className="frame heri-legacy-grid">
          <motion.div variants={fadeLeft} {...inView} style={{ position:"relative" }}>
            <div className="heri-legacy-img-wrap shadow-luxury">
              <img src="/jewellry/Web-Optimised/collection1-opt.webp" alt="A Legacy Continued"
                className="heritage-founder-img" loading="lazy" decoding="async" />
            </div>
            <div className="heri-legacy-blessing card-parchment shadow-luxury">
              <p className="script-brand heri-blessing-tamil">{founderStory.blessingTamil}</p>
              <p className="heri-blessing-english">{founderStory.blessingEnglish}</p>
            </div>
          </motion.div>
          <motion.div variants={fadeRight} {...inView} className="heri-legacy-text">
            <p className="eyebrow heri-eyebrow-crimson">{founderStory.eyebrow}</p>
            <h2 className="display-lg heri-heading-forest">{founderStory.heading}</h2>
            <div className="ornament heri-ornament-mid" />
            <div className="heri-body-stack">
              {founderStory.body.map((para, i) => (
                <p key={i} className="heri-body-para">{para}</p>
              ))}
            </div>
            <div className="heri-signature-block">
              <p className="script-brand heri-sig-name">{founderStory.founder}</p>
              <p className="heri-sig-role">{founderStory.role}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shanthi Shankar */}
      <section className="shell heri-memorial-sec">
        <div className="frame heri-memorial-inner">
          <motion.div variants={fadeUp} {...inView}>
            <p className="eyebrow heri-eyebrow-crimson">In Memory</p>
            <h2 className="display-md heri-heading-forest-sm">Shanthi Shankar</h2>
            <div className="ornament heri-ornament-mb8" />
            <p className="font-display heri-memorial-quote">
              Murthy Ateliers was founded in memory of Shanthi Shankar — jeweller's daughter, a woman of warmth and grace who was still becoming when we lost her. Every piece is her unfinished sentence, continued.
            </p>
            <div className="ornament heri-ornament-mt8" />
          </motion.div>
        </div>
      </section>

      {/* 2 — Where We Come From */}
      <section className="shell heri-pillars-sec">
        <div className="glow-gold-right" />
        <div className="frame heri-frame-z">
          <motion.h2 {...fadeUp} {...inView} className="display-lg heri-heading-cream-lg">Where We Come From</motion.h2>
          <motion.div variants={staggerContainer} {...inView} className="heri-pillars-list">
            {heritagePoints.map((point, i) => (
              <motion.div key={point.title} variants={staggerItem}
                className="grid gap-6 lg:grid-cols-2 items-center">
                <div className={`heri-pillar-img-wrap ${i % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                  <img src={point.image} alt={point.title} className="heritage-pillar-img" loading="lazy" />
                  <div className="img-fill img-overlay-dark heri-pillar-overlay" />
                </div>
                <div className={`heri-pillar-text ${i % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                  <h3 className="font-display heri-pillar-title">{point.title}</h3>
                  <div className="ornament-sm heri-ornament-sm" />
                  <p className="heri-body-cream-sm">{point.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3 — The History & Evolution intro */}
      <section className="shell heri-sec-pad">
        <div className="frame heri-history-inner">
          <motion.p {...fadeUp} {...inView} className="eyebrow heri-eyebrow-crimson">{jewelleryHistoryIntro.eyebrow}</motion.p>
          <motion.h2 {...fadeUp} {...inView} className="display-lg heri-heading-forest-mb">{jewelleryHistoryIntro.heading}</motion.h2>
          <div className="ornament heri-ornament-mb8" />
          <div className="heri-body-stack">
            {jewelleryHistoryIntro.body.map((para, i) => (
              <motion.p key={i} {...fadeUp} {...inView} className="heri-body-para-lg">{para}</motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Timeline */}
      <JewelleryTimeline />

      {/* 5 — Why Gold Became Irreplaceable */}
      <WhyGoldSection />

      {/* 6 — The Goldsmith's Workshop */}
      <AtelierSection />

      {/* 7 — How Temple Jewellery Became Bridal Tradition */}
      <TempleToBridalSection />

      {/* 8 — The Jewels Themselves */}
      <OrnamentProfiles />

      {/* 9 — Five Generations of South Indian Jewellery */}
      <FiveGenerationsSection />

      {/* 10 — Across South India */}
      <RegionalVariations />

      {/* Vision & Mission */}
      <section className="shell heri-vision-sec">
        <div className="frame heri-vision-grid">
          {[
            { label: "Vision", text: "To create heirloom jewellery that carries memory, meaning, and legacy — where every piece becomes a continuation of craft, culture, and personal history across generations. Murthy Ateliers envisions a world where jewellery is not merely worn, but remembered; where craftsmanship remains intimate, intentional, and deeply human." },
            { label: "Mission", text: "To preserve and continue the legacy of timeless South Indian jewellery craftsmanship with integrity and intention. To create meaningful heirloom pieces that carry emotion, memory, and personal stories across generations. To blend traditional artistry with contemporary design, crafting jewellery that is both enduring and deeply personal." },
          ].map((item) => (
            <motion.div key={item.label} variants={staggerItem} {...inView} className="card-parchment heri-vision-card">
              <p className="eyebrow heri-eyebrow-crimson">{item.label}</p>
              <p className="heri-body-para">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="shell heri-cta-sec">
        <div className="frame heri-cta-inner">
          <p className="font-display heri-cta-quote">
            "At its heart, Murthy Ateliers believes that some things are not made — they are continued."
          </p>
          <div className="ornament heri-cta-ornament" />
          <Link to="/consultation" className="btn-primary heri-cta-btn">
            Begin Your Story <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}





