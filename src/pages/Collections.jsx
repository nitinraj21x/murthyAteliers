import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp, inView, scaleIn } from "../utils/motion";
import { culturalCollection, commissionedCollection } from "../data/collections";

/* ─── Animated title — slide up + fade on change ────────────── */
function AnimatedTitle({ text, className }) {
  return (
    <AnimatePresence mode="wait">
      <motion.h2
        key={text}
        className={className}
        style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.h2>
    </AnimatePresence>
  );
}

/* ─── Per-jewel image viewer ─────────────────────────────────── */
function JewelViewer({ jewel, imgActive, setImgActive }) {
  const images = jewel.images;
  const active = imgActive ?? 0;
  const setActive = setImgActive ?? (() => {});

  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);
  const next = () => setActive((a) => (a + 1) % images.length);

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-deep w-full h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[active]}
          src={images[active]}
          alt={`${jewel.name} — ${active + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
        />
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/45 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/65 transition-all"
            aria-label="Previous"><ChevronLeft size={16} /></button>
          <button onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/45 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/65 transition-all"
            aria-label="Next"><ChevronRight size={16} /></button>
          <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-0.5">
            <span className="text-xs text-white/70">{active + 1}/{images.length}</span>
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                style={{ background: i === active ? "var(--gold)" : "rgba(255,255,255,0.4)" }}
                aria-label={`Image ${i + 1}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Jewel selector strip ───────────────────────────────────── */
function JewelStrip({ items, activeIdx, onSelect }) {
  const VISIBLE = 4;
  const [start, setStart] = useState(0);
  const visible = items.slice(start, start + VISIBLE);

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setStart((s) => Math.max(0, s - 1))}
        disabled={start === 0}
        className="flex-shrink-0 h-8 w-8 rounded-full border border-gold/30 flex items-center justify-center text-gold/60 hover:border-gold hover:text-gold transition-all disabled:opacity-20"
        aria-label="Previous jewels"><ChevronLeft size={14} /></button>

      <div className="flex gap-3 flex-1 overflow-hidden">
        {visible.map((item, i) => {
          const globalIdx = start + i;
          const isActive  = globalIdx === activeIdx;
          return (
            <button key={item.id} onClick={() => onSelect(globalIdx)}
              className="flex-1 flex-shrink-0 group relative overflow-hidden rounded-2xl border-2 transition-all duration-300"
              style={{
                borderColor: isActive ? "var(--gold)" : "rgba(211,175,55,0.18)",
                opacity: isActive ? 1 : 0.6,
              }}
              aria-label={`Select ${item.name}`}>
              <div className="aspect-square overflow-hidden">
                <img src={item.images[0]} alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy" />
              </div>
            </button>
          );
        })}
      </div>

      <button onClick={() => setStart((s) => Math.min(items.length - VISIBLE, s + 1))}
        disabled={start + VISIBLE >= items.length}
        className="flex-shrink-0 h-8 w-8 rounded-full border border-gold/30 flex items-center justify-center text-gold/60 hover:border-gold hover:text-gold transition-all disabled:opacity-20"
        aria-label="Next jewels"><ChevronRight size={14} /></button>
    </div>
  );
}

/* ─── CollectionBlock ────────────────────────────────────────── */
function CollectionBlock({ id, eyebrow, heading, description, bgImage, items }) {
  const [explored, setExplored]   = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const navigate = useNavigate();
  const current  = items[activeIdx];

  /* Reset image viewer when jewel changes */
  const [imgActive, setImgActive] = useState(0);
  useEffect(() => { setImgActive(0); }, [activeIdx]);

  function handleEnquire() {
    navigate("/consultation", {
      state: {
        prefill: {
          occasion: `${current.name} — Catalogue No. ${current.id}`,
          message: `I would like to enquire about "${current.name}" (Catalogue No. ${current.id}) from the ${heading}.`,
        },
      },
    });
  }

  /* Shared image column height — both sides will match this */
  const IMG_H = "min(65vh, 600px)";

  return (
    <section id={id} className="relative overflow-hidden" style={{ minHeight: "90vh" }}>
      <div className="absolute inset-0"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0" style={{ background: "rgba(10,8,5,0.82)" }} />

      <div className="relative z-10 shell py-20 sm:py-24">
        <div className="frame">

          {/* ═══ PRE-EXPLORE: centered, no image ═══ */}
          {!explored && (
            <motion.div
              key="pre-explore"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center max-w-2xl mx-auto py-12"
            >
              <p className="eyebrow text-gold/80 mb-4">{eyebrow}</p>
              <h2 className="display-lg text-cream mb-6">{heading}</h2>
              <div className="ornament mb-8 opacity-40 w-full max-w-xs" />
              <p className="text-base leading-8 text-cream/65 mb-10">{description}</p>
              <button onClick={() => setExplored(true)}
                className="inline-flex items-center gap-2 btn-primary">
                Explore Collection <ArrowUpRight size={14} />
              </button>
            </motion.div>
          )}

          {/* ═══ POST-EXPLORE: two-column layout ═══ */}
          {explored && (
            <motion.div
              key="post-explore"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start"
            >
              {/* LEFT — fixed height, flex-col, strip pinned to bottom */}
              <div className="w-full lg:w-[44%] min-w-0 flex flex-col" style={{ height: IMG_H }}>

                {/* Top: eyebrow + typewriter title + ornament */}
                <div className="flex-shrink-0 min-w-0">
                  <p className="eyebrow text-gold/60 mb-3">{eyebrow}</p>
                  <AnimatedTitle
                    text={`Collection — ${current.id}`}
                    className="display-lg text-cream mb-5 break-words leading-tight"
                  />
                  <div className="ornament mb-5 opacity-40" />
                </div>

                {/* Middle: scrollable description */}
                <div className="flex-1 overflow-y-auto pr-1 min-h-0">
                  <p className="text-base leading-8 text-cream/65">{current.description}</p>
                </div>

                {/* Bottom: CTA + strip pinned */}
                <div className="flex-shrink-0 pt-6">
                  <div className="flex justify-center mb-5">
                    <button onClick={handleEnquire}
                      className="inline-flex items-center gap-2 btn-primary">
                      Enquire About This Collection <ArrowUpRight size={14} />
                    </button>
                  </div>
                  <JewelStrip items={items} activeIdx={activeIdx} onSelect={setActiveIdx} />
                </div>
              </div>

              {/* RIGHT — image panel, same height */}
              <div className="w-full lg:w-[56%] flex-shrink-0" style={{ height: IMG_H }}>
                <JewelViewer jewel={current} imgActive={imgActive} setImgActive={setImgActive} />
              </div>

            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function Collections() {
  const [activeTab, setActiveTab] = useState("cultural");

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
        <img src="/jewellry/Web-Optimised/bannerCollection.webp" alt="Collections"
          className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/50 to-forest/15" />
        <div className="relative z-10 shell pb-12 w-full">
          <div className="frame">
            <motion.p {...fadeUp} className="eyebrow text-gold/70 mb-3">Signature Collections</motion.p>
            <motion.h1 {...fadeUp} transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-cream">
              Two Worlds of Heirloom Jewelry
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Tab bar */}
      <div className="sticky top-0 z-30 bg-forest/95 backdrop-blur-md border-b border-gold/20">
        <div className="shell">
          <div className="frame flex items-center gap-1 py-1">
            {[{ key: "cultural", label: "Cultural" }, { key: "commisioned", label: "Commissioned" }].map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className="relative px-6 py-3.5 text-xs font-medium tracking-widest uppercase transition-colors duration-200"
                style={{ color: activeTab === tab.key ? "var(--gold)" : "rgba(250,248,237,0.5)" }}>
                {tab.label}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold transition-opacity duration-200"
                  style={{ opacity: activeTab === tab.key ? 1 : 0 }} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Collection blocks */}
      <AnimatePresence mode="wait">
        {activeTab === "cultural" ? (
          <motion.div key="cultural"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <CollectionBlock
              id="cultural"
              eyebrow="Cultural Collection"
              heading="Rooted in Tradition"
              description="Jewelry shaped by temple geometry, Mylapore sanctums, and generations of South Indian goldsmithing. Each piece carries the memory of sacred architecture and the warmth of 22k gold."
              bgImage="/jewellry/Web-Optimised/jewellry/Cultural/1/DPPHOTGRAPHY-8173.webp"
              items={culturalCollection}
            />
          </motion.div>
        ) : (
          <motion.div key="commisioned"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <CollectionBlock
              id="commisioned"
              eyebrow="Commissioned Collection"
              heading="Made for You, by Name"
              description="Client-led pieces where memory, material, and wearability are shaped together from the first conversation. Bespoke work crafted with quiet restraint and deep personal intention."
              bgImage="/jewellry/Web-Optimised/jewellry/Commisioned/4/DPPHOTGRAPHY-8152.webp"
              items={commissionedCollection}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="shell py-20">
        <div className="frame">
          <motion.div variants={scaleIn} {...inView}
            className="relative overflow-hidden rounded-3xl bg-crimson p-10 sm:p-16 text-center">
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(211,175,55,0.3) 0%, transparent 60%)" }} />
            <div className="relative z-10">
              <p className="eyebrow text-gold/70 mb-4">Don't see what you're looking for?</p>
              <h2 className="display-md text-cream mb-6">Every piece can be made for you.</h2>
              <Link to="/consultation" className="btn-primary inline-flex">
                Begin a Custom Commission <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
