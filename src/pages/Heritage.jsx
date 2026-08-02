import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
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
      {preview && <p className={`text-sm leading-8 ${textCol}`}>{preview}</p>}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden">
            <div className="pt-3 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen((p) => !p)}
        className={`mt-3 inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase transition-colors ${btnCol}`}>
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
    <section className="shell py-20 sm:py-28 bg-forest relative overflow-hidden">
      <div className="glow-gold-left" />
      <div className="frame relative z-10">
        <motion.p {...fadeUp} {...inView} className="eyebrow text-gold/70 mb-4">A Two-Thousand Year Story</motion.p>
        <motion.h2 {...fadeUp} {...inView} className="display-lg text-cream mb-4">Timeline: The Evolution of South Indian Jewellery</motion.h2>
        <motion.p {...fadeUp} {...inView} className="text-sm leading-8 text-cream/55 max-w-2xl mb-14">
          Each era shaped the vocabulary of ornament that survives in South Indian bridal jewellery today. Click any era to explore.
        </motion.p>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gold/20 hidden sm:block" />
          <motion.div variants={staggerContainer} {...inView} className="space-y-3">
            {timelineEvents.map((evt, i) => {
              const isOpen = activeIdx === i;
              return (
                <motion.div key={evt.period} variants={staggerItem}>
                  <button onClick={() => setActiveIdx(isOpen ? null : i)} className="w-full text-left">
                    <div className="flex items-start gap-5 sm:gap-8 group">
                      <div className="relative flex-shrink-0 hidden sm:flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 mt-1 ${isOpen ? "bg-gold border-gold scale-125" : "bg-forest border-gold/40 group-hover:border-gold"}`} />
                      </div>
                      <div className={`flex-1 rounded-2xl px-5 py-4 border transition-all duration-300 ${isOpen ? "border-gold/40" : "border-gold/10 hover:border-gold/25"}`}
                        style={{ background: isOpen ? "rgba(211,175,55,0.06)" : "rgba(255,255,255,0.02)" }}>
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-gold/60 text-xs tracking-widest uppercase font-medium mb-0.5">{evt.date}</p>
                            <h3 className="font-display text-cream text-lg sm:text-xl leading-tight">{evt.period}</h3>
                            <p className="text-xs text-cream/45 mt-1 italic">{evt.summary}</p>
                          </div>
                          <div className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? "border-gold text-gold" : "border-gold/30 text-gold/50"}`}>
                            {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                          </div>
                        </div>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden">
                              <p className="text-sm leading-7 text-cream/65 mt-4 pt-4 border-t border-gold/15">{evt.detail}</p>
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
      <section className="shell py-20 sm:py-28">
        <div className="frame max-w-3xl mx-auto text-center">
          <motion.p {...fadeUp} {...inView} className="eyebrow text-crimson mb-4">{goldCultureIntro.eyebrow}</motion.p>
          <motion.h2 {...fadeUp} {...inView} className="display-lg text-forest mb-5">{goldCultureIntro.heading}</motion.h2>
          <div className="ornament mb-7" />
          <motion.p {...fadeUp} {...inView} className="text-base leading-9 text-forest/65 italic font-display text-xl">
            {goldCultureIntro.subheading}
          </motion.p>
        </div>
      </section>
      <section className="shell pb-20 sm:pb-28">
        <div className="frame">
          <motion.div variants={staggerContainer} {...inView} className="grid gap-5 sm:grid-cols-2">
            {goldCulturePillars.map((p) => (
              <motion.div key={p.number} variants={staggerItem} className="card-parchment rounded-3xl p-7">
                <p className="font-display text-gold text-4xl leading-none mb-2">{p.number}</p>
                <h3 className="font-display text-forest text-xl mb-3">{p.title}</h3>
                <div className="ornament mb-4" />
                <ReadMore preview={p.summary}>
                  <p className="text-sm leading-7 text-forest/65">{p.detail}</p>
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
    <section className="shell py-20 sm:py-28 bg-forest relative overflow-hidden">
      <div className="glow-gold-right" />
      <div className="frame relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={fadeLeft} {...inView}>
            <p className="eyebrow text-gold/70 mb-4">{atelierStory.eyebrow}</p>
            <h2 className="display-lg text-cream mb-4">{atelierStory.heading}</h2>
            <div className="ornament mb-6 opacity-40" />
            <p className="text-sm leading-8 text-cream/55 max-w-xl">{atelierStory.subheading}</p>
          </motion.div>
          <motion.div variants={fadeRight} {...inView} className="space-y-3">
            {atelierStory.sections.map((sec, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={sec.title} className="rounded-2xl border border-gold/15 overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <button onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
                    <span className="font-display text-cream text-lg">{sec.title}</span>
                    <span className="flex-shrink-0 text-gold/60">
                      {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                        <p className="text-sm leading-7 text-cream/60 px-5 pb-5">{sec.body}</p>
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
    <section className="shell py-20 sm:py-28 bg-cream-dark">
      <div className="frame">
        <motion.p {...fadeUp} {...inView} className="eyebrow text-crimson mb-4">From Temple to Trousseau</motion.p>
        <motion.h2 {...fadeUp} {...inView} className="display-lg text-forest mb-4">How Temple Jewellery Became Bridal Tradition</motion.h2>
        <motion.p {...fadeUp} {...inView} className="text-sm leading-8 text-forest/60 max-w-2xl mb-14">
          A genre of jewellery designed exclusively for a stone or bronze deity — and how it became, six centuries later, the default aesthetic of the South Indian bride.
        </motion.p>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/20 hidden lg:block -translate-x-1/2" />
          <div className="space-y-6">
            {templeToBridalJourney.map((stage, i) => {
              const isRight = i % 2 === 1;
              return (
                <motion.div key={stage.stage} variants={staggerItem} {...inView}
                  className={`flex flex-col lg:flex-row gap-6 items-center ${isRight ? "lg:flex-row-reverse" : ""}`}>
                  <div className="w-full lg:w-[45%]">
                    <div className="card-parchment rounded-3xl p-7">
                      <p className="eyebrow text-gold mb-1">{stage.stage}</p>
                      <p className="text-xs text-forest/45 tracking-widest uppercase mb-3">{stage.era}</p>
                      <h3 className="font-display text-forest text-xl mb-3">{stage.title}</h3>
                      <div className="ornament mb-4" />
                      <p className="text-sm leading-7 text-forest/65">{stage.body}</p>
                    </div>
                  </div>
                  <div className="hidden lg:flex flex-col items-center flex-shrink-0 w-10">
                    <div className="w-4 h-4 rounded-full bg-gold border-4 border-cream-dark" />
                  </div>
                  <div className="w-full lg:w-[45%] hidden lg:block" />
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
    <section className="shell py-20 sm:py-28 bg-crimson relative overflow-hidden">
      <div className="glow-gold-center-low" />
      <div className="frame relative z-10">
        <motion.p {...fadeUp} {...inView} className="eyebrow text-gold/70 mb-4">Ornament Profiles</motion.p>
        <motion.h2 {...fadeUp} {...inView} className="display-lg text-cream mb-4">The Jewels Themselves</motion.h2>
        <motion.p {...fadeUp} {...inView} className="text-sm leading-8 text-cream/55 max-w-2xl mb-16">
          Each ornament carries two thousand years of meaning — etymology, dynastic origin, religious significance, and an unbroken lineage from Sangam poetry to the modern bridal trousseau.
        </motion.p>
        <div className="space-y-16">
          {ornamentProfiles.map((orn, i) => {
            const isReverse = i % 2 === 1;
            const img = imgs[i] || imgs[0];
            return (
              <motion.div key={orn.name} variants={staggerItem} {...inView}
                className={`flex flex-col lg:flex-row gap-8 xl:gap-14 items-center ${isReverse ? "lg:flex-row-reverse" : ""}`}>
                <div className="w-full lg:w-[28%] flex-shrink-0">
                  <div className="relative overflow-hidden rounded-3xl aspect-[3/4]">
                    <img src={img} alt={orn.name} className="heritage-ornament-img" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="eyebrow text-gold/80 text-[0.58rem]">{orn.period}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-cream text-2xl sm:text-3xl mb-1">{orn.name}</h3>
                  <p className="text-gold text-base font-medium mb-1">{orn.tamil}</p>
                  <p className="text-xs text-crimson bg-gold/15 inline-block px-3 py-1 rounded-full tracking-widest uppercase font-medium mb-5">
                    {orn.tagline}
                  </p>
                  <div className="ornament-sm opacity-60 mb-5" />
                  <ReadMore preview={orn.summary} dark>
                    <p className="text-sm leading-7 text-cream/60">{orn.detail}</p>
                    <p className="text-xs text-cream/40 italic mt-2">Worn by: {orn.wornBy}</p>
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
    <section className="shell py-20 sm:py-28">
      <div className="frame">
        <motion.p {...fadeUp} {...inView} className="eyebrow text-crimson mb-4">A Comparative Trend Map</motion.p>
        <motion.h2 {...fadeUp} {...inView} className="display-lg text-forest mb-4">Five Generations of South Indian Jewellery</motion.h2>
        <motion.p {...fadeUp} {...inView} className="text-sm leading-8 text-forest/60 max-w-2xl mb-14">
          From the bespoke pattarai commissions of the early twentieth century to the diaspora-era bridal market of today.
        </motion.p>
        <motion.div variants={staggerContainer} {...inView} className="space-y-3">
          {fiveGenerations.map((gen, i) => {
            const isOpen = openGen === i;
            return (
              <motion.div key={gen.gen} variants={staggerItem}>
                <button onClick={() => setOpenGen(isOpen ? null : i)} className="w-full text-left">
                  <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? "border-gold/40" : "border-gold/15 hover:border-gold/30"}`}>
                    <div className="flex items-center justify-between gap-4 px-6 py-5">
                      <div className="flex items-start gap-4">
                        <span className="font-display text-gold text-2xl leading-none flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                        <div>
                          <h3 className="font-display text-forest text-lg">{gen.era}</h3>
                          <p className="text-xs text-forest/45 tracking-widest uppercase mt-0.5">{gen.period}</p>
                          <p className="text-sm text-crimson/70 italic mt-1">{gen.summary}</p>
                        </div>
                      </div>
                      <span className="flex-shrink-0 text-gold/50">
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    </div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                          <p className="text-sm leading-7 text-forest/65 px-6 pb-6 pt-1 border-t border-gold/10">{gen.detail}</p>
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
    <section className="shell py-20 sm:py-28 bg-crimson relative overflow-hidden">
      <div className="glow-gold-center-high" />
      <div className="frame relative z-10">
        <motion.p {...fadeUp} {...inView} className="eyebrow text-gold/70 mb-4">Regional Variations</motion.p>
        <motion.h2 {...fadeUp} {...inView} className="display-lg text-cream mb-4">Across South India</motion.h2>
        <motion.p {...fadeUp} {...inView} className="text-sm leading-8 text-cream/55 max-w-2xl mb-16">
          While the core vocabulary of South Indian jewellery is shared, each linguistic-cultural region developed its own naming conventions, proportions and stylistic emphases.
        </motion.p>
        <div className="space-y-16">
          {regionalVariations.map((item, i) => {
            const isReverse = i % 2 === 1;
            return (
              <motion.div key={item.ornament} variants={staggerItem} {...inView}
                className={`flex flex-col lg:flex-row gap-8 xl:gap-14 items-center ${isReverse ? "lg:flex-row-reverse" : ""}`}>
                <div className="w-full lg:w-[28%] flex-shrink-0">
                  <div className="relative overflow-hidden rounded-3xl aspect-[3/4]">
                    <img src={item.image} alt={item.ornament} className="heritage-regional-img" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="eyebrow text-gold/80">{item.ornament}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-cream text-2xl sm:text-3xl mb-3">{item.ornament}</h3>
                  <div className="ornament-sm opacity-60 mb-5" />
                  <p className="text-sm leading-8 text-cream/65 mb-7">{item.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(item.states).map(([state, localName]) => (
                      <div key={state} className="rounded-xl px-4 py-2.5 border border-gold/20"
                        style={{ background: "rgba(255,255,255,0.06)" }}>
                        <p className="text-xs tracking-widest uppercase text-gold/60 font-medium">{state}</p>
                        <p className="text-cream text-sm font-display italic mt-0.5">{localName}</p>
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
      {/* Hero */}
      <section id="page-hero" className="page-hero-sec page-hero-sec--tall">
        <img src="/imgs/heriBanner.webp" alt="Heritage"
          className="hero-banner-img hero-banner-img--heritage" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/50 to-forest/20" />
        <div className="relative z-10 shell pb-14 w-full">
          <div className="frame">
            <motion.p {...fadeUp} className="eyebrow text-gold/70 mb-4">Our Heritage</motion.p>
            <motion.h1 {...fadeUp} transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-cream">Rooted in Mylapore</motion.h1>
          </div>
        </div>
      </section>

      {/* 1 — A Legacy Continued */}
      <section className="shell py-20 sm:py-28">
        <div className="frame grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <motion.div variants={fadeLeft} {...inView} className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-luxury">
              <img src="/jewellry/Web-Optimised/collection1-opt.webp" alt="A Legacy Continued"
                className="heritage-founder-img" loading="lazy" decoding="async" />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:-right-8 card-parchment rounded-2xl p-5 max-w-[200px] shadow-luxury">
              <p className="script-brand text-crimson text-2xl leading-tight">{founderStory.blessingTamil}</p>
              <p className="mt-2 text-xs tracking-widest uppercase text-forest/50">{founderStory.blessingEnglish}</p>
            </div>
          </motion.div>
          <motion.div variants={fadeRight} {...inView} className="pt-4 lg:pt-8">
            <p className="eyebrow text-crimson mb-4">{founderStory.eyebrow}</p>
            <h2 className="display-lg text-forest">{founderStory.heading}</h2>
            <div className="ornament my-7" />
            <div className="space-y-5">
              {founderStory.body.map((para, i) => (
                <p key={i} className="text-base leading-8 text-forest/70">{para}</p>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gold/20">
              <p className="script-brand text-crimson text-2xl">{founderStory.founder}</p>
              <p className="mt-1 text-xs tracking-widest uppercase text-forest/50">{founderStory.role}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shanthi Shankar */}
      <section className="shell py-16 bg-cream-dark">
        <div className="frame max-w-2xl mx-auto text-center">
          <motion.div variants={fadeUp} {...inView}>
            <p className="eyebrow text-crimson mb-4">In Memory</p>
            <h2 className="display-md text-forest mb-6">Shanthi Shankar</h2>
            <div className="ornament mb-8" />
            <p className="text-base leading-9 text-forest/70 font-display italic text-xl">
              Murthy Ateliers was founded in memory of Shanthi Shankar — jeweller's daughter, a woman of warmth and grace who was still becoming when we lost her. Every piece is her unfinished sentence, continued.
            </p>
            <div className="ornament mt-8" />
          </motion.div>
        </div>
      </section>

      {/* 2 — Where We Come From */}
      <section className="shell py-20 sm:py-24 bg-crimson relative overflow-hidden">
        <div className="glow-gold-right" />
        <div className="frame relative z-10">
          <motion.p {...fadeUp} {...inView} className="eyebrow text-gold/70 mb-4">Two Pillars of Our Story</motion.p>
          <motion.h2 {...fadeUp} {...inView} className="display-lg text-cream mb-12">Where We Come From</motion.h2>
          <motion.div variants={staggerContainer} {...inView} className="space-y-8">
            {heritagePoints.map((point, i) => (
              <motion.div key={point.title} variants={staggerItem}
                className={`grid gap-6 lg:grid-cols-2 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                <div className="relative overflow-hidden rounded-3xl lg:[direction:ltr]">
                  <img src={point.image} alt={point.title} className="heritage-pillar-img" loading="lazy" />
                  <div className="absolute inset-0 img-overlay-dark opacity-20" />
                </div>
                <div className="lg:[direction:ltr] space-y-4">
                  <h3 className="font-display text-cream text-2xl sm:text-3xl">{point.title}</h3>
                  <div className="ornament-sm opacity-60" />
                  <p className="text-sm leading-8 text-cream/65">{point.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3 — The History & Evolution intro */}
      <section className="shell py-20 sm:py-28">
        <div className="frame max-w-3xl mx-auto text-center">
          <motion.p {...fadeUp} {...inView} className="eyebrow text-crimson mb-4">{jewelleryHistoryIntro.eyebrow}</motion.p>
          <motion.h2 {...fadeUp} {...inView} className="display-lg text-forest mb-5">{jewelleryHistoryIntro.heading}</motion.h2>
          <div className="ornament mb-8" />
          <div className="space-y-5 text-left">
            {jewelleryHistoryIntro.body.map((para, i) => (
              <motion.p key={i} {...fadeUp} {...inView} className="text-base leading-9 text-forest/70">{para}</motion.p>
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
      <section className="shell py-20 sm:py-28 bg-cream-dark">
        <div className="frame grid gap-8 sm:grid-cols-2">
          {[
            { label: "Vision", text: "To create heirloom jewellery that carries memory, meaning, and legacy — where every piece becomes a continuation of craft, culture, and personal history across generations. Murthy Ateliers envisions a world where jewellery is not merely worn, but remembered; where craftsmanship remains intimate, intentional, and deeply human." },
            { label: "Mission", text: "To preserve and continue the legacy of timeless South Indian jewellery craftsmanship with integrity and intention. To create meaningful heirloom pieces that carry emotion, memory, and personal stories across generations. To blend traditional artistry with contemporary design, crafting jewellery that is both enduring and deeply personal." },
          ].map((item) => (
            <motion.div key={item.label} variants={staggerItem} {...inView} className="card-parchment rounded-3xl p-8 sm:p-10">
              <p className="eyebrow text-crimson mb-4">{item.label}</p>
              <p className="text-base leading-8 text-forest/75">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="shell py-24">
        <div className="frame text-center">
          <p className="font-display italic text-forest/60 text-xl sm:text-2xl max-w-2xl mx-auto">
            "At its heart, Murthy Ateliers believes that some things are not made — they are continued."
          </p>
          <div className="ornament mt-8 mb-8 max-w-xs mx-auto" />
          <Link to="/consultation" className="btn-primary inline-flex">
            Begin Your Story <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
