import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { brand } from "../data/content";
import { catalogueIntro, catalogueJewels, catalogueClosingNote } from "../data/jewellsCatalogue";
import { fadeUp, inView, scaleIn, staggerContainer, staggerItem } from "../utils/motion";
/* ─── Image data ────────────────────────────────────────────── */
const CULTURAL_GROUPS = [
  { label: "Set 1",  images: ["/jewellry/Web-Optimised/jewellry/Cultural/1/DPPHOTGRAPHY-8171.webp","/jewellry/Web-Optimised/jewellry/Cultural/1/DPPHOTGRAPHY-8173.webp","/jewellry/Web-Optimised/jewellry/Cultural/1/DPPHOTGRAPHY-8175.webp","/jewellry/Web-Optimised/jewellry/Cultural/1/DPPHOTGRAPHY-8177.webp"] },
  { label: "Set 2",  images: ["/jewellry/Web-Optimised/jewellry/Cultural/2/DPPHOTGRAPHY-8350.webp","/jewellry/Web-Optimised/jewellry/Cultural/2/DPPHOTGRAPHY-8354.webp","/jewellry/Web-Optimised/jewellry/Cultural/2/DPPHOTGRAPHY-8356.webp","/jewellry/Web-Optimised/jewellry/Cultural/2/DPPHOTGRAPHY-8358.webp"] },
  { label: "Set 3",  images: ["/jewellry/Web-Optimised/jewellry/Cultural/3/DPPHOTGRAPHY-8180.webp","/jewellry/Web-Optimised/jewellry/Cultural/3/DPPHOTGRAPHY-8186.webp","/jewellry/Web-Optimised/jewellry/Cultural/3/DPPHOTGRAPHY-8190.webp"] },
  { label: "Set 4",  images: ["/jewellry/Web-Optimised/jewellry/Cultural/4/DPPHOTGRAPHY-8194.webp","/jewellry/Web-Optimised/jewellry/Cultural/4/DPPHOTGRAPHY-8196.webp","/jewellry/Web-Optimised/jewellry/Cultural/4/DPPHOTGRAPHY-8199.webp","/jewellry/Web-Optimised/jewellry/Cultural/4/DPPHOTGRAPHY-8200.webp"] },
  { label: "Set 5",  images: ["/jewellry/Web-Optimised/jewellry/Cultural/5/DPPHOTGRAPHY-8202.webp","/jewellry/Web-Optimised/jewellry/Cultural/5/DPPHOTGRAPHY-8206.webp","/jewellry/Web-Optimised/jewellry/Cultural/5/DPPHOTGRAPHY-8209.webp"] },
  { label: "Set 6",  images: ["/jewellry/Web-Optimised/jewellry/Cultural/6/DPPHOTGRAPHY-8212.webp","/jewellry/Web-Optimised/jewellry/Cultural/6/DPPHOTGRAPHY-8214.webp","/jewellry/Web-Optimised/jewellry/Cultural/6/DPPHOTGRAPHY-8224.webp"] },
  { label: "Set 7",  images: ["/jewellry/Web-Optimised/jewellry/Cultural/7/DPPHOTGRAPHY-8227.webp","/jewellry/Web-Optimised/jewellry/Cultural/7/DPPHOTGRAPHY-8229.webp","/jewellry/Web-Optimised/jewellry/Cultural/7/DPPHOTGRAPHY-8233.webp","/jewellry/Web-Optimised/jewellry/Cultural/7/DPPHOTGRAPHY-8237.webp"] },
  { label: "Set 8",  images: ["/jewellry/Web-Optimised/jewellry/Cultural/8/DPPHOTGRAPHY-8254.webp","/jewellry/Web-Optimised/jewellry/Cultural/8/DPPHOTGRAPHY-8259.webp","/jewellry/Web-Optimised/jewellry/Cultural/8/DPPHOTGRAPHY-8262.webp","/jewellry/Web-Optimised/jewellry/Cultural/8/DPPHOTGRAPHY-8265.webp","/jewellry/Web-Optimised/jewellry/Cultural/8/DPPHOTGRAPHY-8266.webp"] },
  { label: "Set 9",  images: ["/jewellry/Web-Optimised/jewellry/Cultural/9/DPPHOTGRAPHY-8335.webp","/jewellry/Web-Optimised/jewellry/Cultural/9/DPPHOTGRAPHY-8338.webp"] },
  { label: "Set 10", images: ["/jewellry/Web-Optimised/jewellry/Cultural/10/DPPHOTGRAPHY-8340.webp","/jewellry/Web-Optimised/jewellry/Cultural/10/DPPHOTGRAPHY-8343.webp","/jewellry/Web-Optimised/jewellry/Cultural/10/DPPHOTGRAPHY-8346.webp","/jewellry/Web-Optimised/jewellry/Cultural/10/DPPHOTGRAPHY-8348.webp"] },
];

const COMMISIONED_GROUPS = [
  { label: "Set 1", images: ["/jewellry/Web-Optimised/jewellry/Commisioned/1/DPPHOTGRAPHY-8089.webp","/jewellry/Web-Optimised/jewellry/Commisioned/1/DPPHOTGRAPHY-8091.webp","/jewellry/Web-Optimised/jewellry/Commisioned/1/DPPHOTGRAPHY-8094.webp","/jewellry/Web-Optimised/jewellry/Commisioned/1/DPPHOTGRAPHY-8095.webp","/jewellry/Web-Optimised/jewellry/Commisioned/1/DPPHOTGRAPHY-8098.webp","/jewellry/Web-Optimised/jewellry/Commisioned/1/DPPHOTGRAPHY-8102.webp","/jewellry/Web-Optimised/jewellry/Commisioned/1/DPPHOTGRAPHY-8107.webp"] },
  { label: "Set 2", images: ["/jewellry/Web-Optimised/jewellry/Commisioned/2/DPPHOTGRAPHY-8108.webp","/jewellry/Web-Optimised/jewellry/Commisioned/2/DPPHOTGRAPHY-8111.webp","/jewellry/Web-Optimised/jewellry/Commisioned/2/DPPHOTGRAPHY-8115.webp","/jewellry/Web-Optimised/jewellry/Commisioned/2/DPPHOTGRAPHY-8118.webp"] },
  { label: "Set 3", images: ["/jewellry/Web-Optimised/jewellry/Commisioned/3/DPPHOTGRAPHY-8130.webp","/jewellry/Web-Optimised/jewellry/Commisioned/3/DPPHOTGRAPHY-8133.webp","/jewellry/Web-Optimised/jewellry/Commisioned/3/DPPHOTGRAPHY-8135.webp","/jewellry/Web-Optimised/jewellry/Commisioned/3/DPPHOTGRAPHY-8142.webp"] },
  { label: "Set 4", images: ["/jewellry/Web-Optimised/jewellry/Commisioned/4/DPPHOTGRAPHY-8147.webp","/jewellry/Web-Optimised/jewellry/Commisioned/4/DPPHOTGRAPHY-8152.webp","/jewellry/Web-Optimised/jewellry/Commisioned/4/DPPHOTGRAPHY-8156.webp","/jewellry/Web-Optimised/jewellry/Commisioned/4/DPPHOTGRAPHY-8158.webp","/jewellry/Web-Optimised/jewellry/Commisioned/4/DPPHOTGRAPHY-8160.webp","/jewellry/Web-Optimised/jewellry/Commisioned/4/DPPHOTGRAPHY-8162.webp","/jewellry/Web-Optimised/jewellry/Commisioned/4/DPPHOTGRAPHY-8168.webp"] },
  { label: "Set 5", images: ["/jewellry/Web-Optimised/jewellry/Commisioned/5/DPPHOTGRAPHY-8220.webp","/jewellry/Web-Optimised/jewellry/Commisioned/5/DPPHOTGRAPHY-8270.webp","/jewellry/Web-Optimised/jewellry/Commisioned/5/DPPHOTGRAPHY-8273.webp","/jewellry/Web-Optimised/jewellry/Commisioned/5/DPPHOTGRAPHY-8275.webp"] },
  { label: "Set 6", images: ["/jewellry/Web-Optimised/jewellry/Commisioned/6/DPPHOTGRAPHY-8278.webp","/jewellry/Web-Optimised/jewellry/Commisioned/6/DPPHOTGRAPHY-8286.webp","/jewellry/Web-Optimised/jewellry/Commisioned/6/DPPHOTGRAPHY-8290.webp"] },
  { label: "Set 7", images: ["/jewellry/Web-Optimised/jewellry/Commisioned/7/DPPHOTGRAPHY-8404.webp","/jewellry/Web-Optimised/jewellry/Commisioned/7/DPPHOTGRAPHY-8407.webp"] },
];

// Flatten all images for a collection into a single array for the slider
// Round-robin interleave: first image of each folder, then second, etc.
function interleave(groups) {
  const result = [];
  const maxLen = Math.max(...groups.map((g) => g.images.length));
  for (let i = 0; i < maxLen; i++) {
    for (const group of groups) {
      if (i < group.images.length) result.push(group.images[i]);
    }
  }
  return result;
}

const CULTURAL_IMAGES    = interleave(CULTURAL_GROUPS);
const COMMISIONED_IMAGES = interleave(COMMISIONED_GROUPS);

/* ─── Image Gallery Block ───────────────────────────────────── */
function CollectionBlock({ id, eyebrow, heading, description, images, bgImage, reverse = false, whatsapp }) {
  const [active, setActive]   = useState(0);
  const [sliderStart, setSliderStart] = useState(0);
  const THUMB_VISIBLE = 5;

  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);
  const next = () => setActive((a) => (a + 1) % images.length);

  const thumbPrev = () => setSliderStart((s) => Math.max(0, s - 1));
  const thumbNext = () => setSliderStart((s) => Math.min(images.length - THUMB_VISIBLE, s + 1));

  const visibleThumbs = images.slice(sliderStart, sliderStart + THUMB_VISIBLE);

  return (
    <section
      id={id}
      className="relative overflow-hidden"
      style={{ minHeight: "90vh" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(10,8,5,0.78)" }} />

      <div className="relative z-10 shell py-16 sm:py-20">
        <div className="frame">
          <div className={`flex flex-col lg:flex-row gap-10 xl:gap-16 items-start ${reverse ? "lg:flex-row-reverse" : ""}`}>

            {/* ── Text + Thumbnail slider ── */}
            <div className="w-full lg:w-[42%] flex flex-col justify-between gap-8">
              {/* Heading block */}
              <motion.div variants={fadeUp} {...inView}>
                <p className="eyebrow text-gold/80 mb-3">{eyebrow}</p>
                <h2 className="display-lg text-cream mb-4">{heading}</h2>
                <div className="ornament mb-6 opacity-40" />
                <p className="text-base leading-8 text-cream/65 max-w-md">{description}</p>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 btn-primary mt-8"
                >
                  Enquire About This Collection
                  <ArrowUpRight size={14} />
                </a>
              </motion.div>

              {/* Thumbnail slider */}
              <div className="mt-4">
                <p className="text-xs tracking-widest uppercase text-cream/40 mb-3">
                  {active + 1} / {images.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={thumbPrev}
                    disabled={sliderStart === 0}
                    className="flex-shrink-0 h-8 w-8 rounded-full border border-gold/30 flex items-center justify-center text-gold/60 hover:border-gold hover:text-gold transition-all duration-200 disabled:opacity-25"
                    aria-label="Previous thumbnails"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  <div className="flex gap-2 flex-1 overflow-hidden">
                    {visibleThumbs.map((src, idx) => {
                      const globalIdx = sliderStart + idx;
                      return (
                        <button
                          key={src}
                          onClick={() => setActive(globalIdx)}
                          className="relative flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0"
                          style={{
                            borderColor: active === globalIdx ? "var(--gold)" : "rgba(211,175,55,0.15)",
                            opacity: active === globalIdx ? 1 : 0.6,
                          }}
                          aria-label={`View image ${globalIdx + 1}`}
                        >
                          <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={thumbNext}
                    disabled={sliderStart + THUMB_VISIBLE >= images.length}
                    className="flex-shrink-0 h-8 w-8 rounded-full border border-gold/30 flex items-center justify-center text-gold/60 hover:border-gold hover:text-gold transition-all duration-200 disabled:opacity-25"
                    aria-label="Next thumbnails"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Main image display ── */}
            <div className="w-full lg:w-[58%]">
              <div className="relative overflow-hidden rounded-3xl shadow-deep" style={{ aspectRatio: "4/5", maxHeight: "70vh" }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[active]}
                    src={images[active]}
                    alt={`${heading} — image ${active + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    loading="lazy"
                  />
                </AnimatePresence>

                {/* Prev / Next arrows on the main image */}
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>

                {/* Counter badge */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-xs text-white/70">{active + 1}/{images.length}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Jewels Catalogue Tab ──────────────────────────────────── */
function JewelCard({ jewel, index }) {
  const [expanded, setExpanded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  return (
    <motion.div variants={staggerItem} className="card-parchment rounded-3xl overflow-hidden shadow-luxury">
      {/* Image strip */}
      <div className="relative h-64 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={jewel.images[activeImg]}
            src={jewel.images[activeImg]}
            alt={jewel.name}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            loading="lazy"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Image dots */}
        {jewel.images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1.5">
            {jewel.images.map((_, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === activeImg ? "bg-gold scale-125" : "bg-white/50"}`}
                aria-label={`View image ${i + 1}`} />
            ))}
          </div>
        )}
        {/* Number badge */}
        <span className="absolute top-4 left-4 eyebrow text-gold bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-[0.6rem]">
          {jewel.number}
        </span>
        <span className="absolute top-4 right-4 text-xs text-white/60 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
          {jewel.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-forest text-xl leading-tight mb-1">{jewel.name}</h3>
        <p className="text-xs text-gold/70 italic mb-3">{jewel.caption}</p>

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-forest/50">
            <BookOpen size={10} className="text-gold/60" />
            <span>{jewel.stone}</span>
          </div>
        </div>

        <div className="ornament mb-4" />

        <p className="text-sm leading-7 text-forest/70 mb-3">{jewel.summary}</p>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="text-sm leading-7 text-forest/65 pb-2">{jewel.detail}</p>
              <div className="mt-3 pt-3 border-t border-gold/15 flex flex-wrap gap-4 text-xs text-forest/45">
                <span><span className="text-gold/60 font-medium">Worn by:</span> {jewel.wornBy}</span>
                <span><span className="text-gold/60 font-medium">Occasion:</span> {jewel.occasion}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded((p) => !p)}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-crimson hover:text-forest transition-colors"
        >
          {expanded ? "Show Less" : "Read More"}
          {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
        </button>
      </div>
    </motion.div>
  );
}

function JewelsTab() {
  const categories = [...new Set(catalogueJewels.map((j) => j.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? catalogueJewels
      : catalogueJewels.filter((j) => j.category === activeCategory);

  return (
    <section className="shell py-16 sm:py-20">
      <div className="frame">
        {/* Intro */}
        <motion.div variants={fadeUp} {...inView} className="max-w-2xl mb-14">
          <p className="eyebrow text-gold mb-4">{catalogueIntro.eyebrow}</p>
          <h2 className="display-lg text-cream mb-5">{catalogueIntro.heading}</h2>
          <div className="ornament mb-6 opacity-40" />
          <p className="text-sm leading-8 text-cream/60">{catalogueIntro.body}</p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase transition-all duration-200"
              style={{
                background: activeCategory === cat ? "var(--gold)" : "rgba(255,255,255,0.06)",
                color: activeCategory === cat ? "var(--forest)" : "rgba(250,248,237,0.55)",
                border: activeCategory === cat ? "1px solid var(--gold)" : "1px solid rgba(211,175,55,0.2)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div variants={staggerContainer} {...inView}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((jewel, i) => (
            <JewelCard key={jewel.id} jewel={jewel} index={i} />
          ))}
        </motion.div>

        {/* Closing note */}
        <motion.div variants={fadeUp} {...inView}
          className="mt-16 max-w-3xl mx-auto text-center">
          <div className="ornament mb-8" />
          <p className="font-display italic text-cream/60 text-lg sm:text-xl leading-9">
            "{catalogueClosingNote}"
          </p>
          <div className="ornament mt-8" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function Collections() {
  const [activeTab, setActiveTab] = useState("cultural");

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
        <img
          src="/jewellry/Web-Optimised/bannerCollection.webp"
          alt="Collections"
          className="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/50 to-forest/15" />
        <div className="relative z-10 shell pb-12 w-full">
          <div className="frame">
            <motion.p {...fadeUp} className="eyebrow text-gold/70 mb-3">
              Signature Collections
            </motion.p>
            <motion.h1
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-cream"
            >
              Two Worlds of Heirloom Jewelry
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Tab bar */}
      <div className="sticky top-0 z-30 bg-forest/95 backdrop-blur-md border-b border-gold/20">
        <div className="shell">
          <div className="frame flex items-center gap-1 py-1">
            {[
              { key: "cultural",    label: "Cultural" },
              { key: "commisioned", label: "Commissioned" },
              { key: "jewels",      label: "Jewels" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="relative px-6 py-3.5 text-xs font-medium tracking-widest uppercase transition-colors duration-200"
                style={{
                  color: activeTab === tab.key ? "var(--gold)" : "rgba(250,248,237,0.5)",
                }}
              >
                {tab.label}
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold transition-opacity duration-200"
                  style={{ opacity: activeTab === tab.key ? 1 : 0 }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Collection blocks */}
      <AnimatePresence mode="wait">
        {activeTab === "cultural" ? (
          <motion.div
            key="cultural"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CollectionBlock
              id="cultural"
              eyebrow="Cultural Collection"
              heading="Rooted in Tradition"
              description="Jewelry shaped by temple geometry, Mylapore sanctums, and generations of South Indian goldsmithing. Each piece carries the memory of sacred architecture and the warmth of 22k gold."
              images={CULTURAL_IMAGES}
              bgImage="/jewellry/Web-Optimised/jewellry/Cultural/1/DPPHOTGRAPHY-8173.webp"
              whatsapp={brand.whatsapp}
            />
          </motion.div>
        ) : activeTab === "commisioned" ? (
          <motion.div
            key="commisioned"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CollectionBlock
              id="commisioned"
              eyebrow="Commissioned Collection"
              heading="Made for You, by Name"
              description="Client-led pieces where memory, material, and wearability are shaped together from the first conversation. Bespoke work crafted with quiet restraint and deep personal intention."
              images={COMMISIONED_IMAGES}
              bgImage="/jewellry/Web-Optimised/jewellry/Commisioned/4/DPPHOTGRAPHY-8152.webp"
              reverse
              whatsapp={brand.whatsapp}
            />
          </motion.div>
        ) : (
          <motion.div
            key="jewels"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-forest min-h-screen"
          >
            <JewelsTab />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Banner */}
      <section className="shell py-20">
        <div className="frame">
          <motion.div
            variants={scaleIn}
            {...inView}
            className="relative overflow-hidden rounded-3xl bg-crimson p-10 sm:p-16 text-center"
          >
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(211,175,55,0.3) 0%, transparent 60%)" }}
            />
            <div className="relative z-10">
              <p className="eyebrow text-gold/70 mb-4">Don't see what you're looking for?</p>
              <h2 className="display-md text-cream mb-6">Every piece can be made for you.</h2>
              <Link to="/consultation" className="btn-primary inline-flex">
                Begin a Custom Commission
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
