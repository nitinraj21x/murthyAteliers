import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
    <div className="coll-viewer-wrap">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[active]}
          src={images[active]}
          alt={`${jewel.name} — ${active + 1}`}
          className="coll-jewel-viewer-img"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
        />
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button onClick={prev} className="coll-viewer-btn coll-viewer-btn--prev" aria-label="Previous"><ChevronLeft size={16} /></button>
          <button onClick={next} className="coll-viewer-btn coll-viewer-btn--next" aria-label="Next"><ChevronRight size={16} /></button>
          <div className="coll-viewer-counter">
            <span>{active + 1}/{images.length}</span>
          </div>
          <div className="coll-viewer-dots">
            {images.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="coll-viewer-dot"
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
    <div className="coll-strip">
      <button onClick={() => setStart((s) => Math.max(0, s - 1))}
        disabled={start === 0} className="coll-strip-arrow" aria-label="Previous jewels">
        <ChevronLeft size={14} />
      </button>
      <div className="coll-strip-thumbs">
        {visible.map((item, i) => {
          const globalIdx = start + i;
          const isActive  = globalIdx === activeIdx;
          return (
            <button key={item.id} onClick={() => onSelect(globalIdx)}
              className="coll-strip-thumb"
              style={{ borderColor: isActive ? "var(--gold)" : "rgba(211,175,55,0.18)", opacity: isActive ? 1 : 0.6 }}
              aria-label={`Select ${item.name}`}>
              <div className="coll-strip-thumb-img-wrap">
                <img src={item.images[0]} alt={item.name} className="coll-strip-thumb-img" loading="lazy" />
              </div>
            </button>
          );
        })}
      </div>
      <button onClick={() => setStart((s) => Math.min(items.length - VISIBLE, s + 1))}
        disabled={start + VISIBLE >= items.length} className="coll-strip-arrow" aria-label="Next jewels">
        <ChevronRight size={14} />
      </button>
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
    <section id={id} className="coll-block-section" style={{ minHeight: "90vh" }}>
      <div className="coll-block-bg"
        style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="coll-block-dark-overlay" />

      <div className="coll-block-content shell">
        <div className="frame">
          {!explored && (
            <motion.div key="pre-explore" initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
              transition={{ duration:0.5, ease:[0.22,1,0.36,1] }} className="coll-block-pre">
              <p className="eyebrow coll-block-eyebrow">{eyebrow}</p>
              <h2 className="display-lg coll-block-heading">{heading}</h2>
              <div className="ornament coll-block-ornament" />
              <p className="coll-block-desc">{description}</p>
              <button onClick={() => setExplored(true)} className="btn-primary coll-block-explore-btn">
                Explore Collection <ArrowUpRight size={14} />
              </button>
            </motion.div>
          )}
          {explored && (
            <motion.div key="post-explore" initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ duration:0.4 }} className="coll-block-explored">
              <div className="coll-block-left" style={{ height: IMG_H }}>
                <div className="coll-block-top">
                  <p className="eyebrow coll-block-eyebrow-sm">{eyebrow}</p>
                  <AnimatedTitle text={current.name} className="display-lg coll-block-title" />
                  <div className="ornament coll-block-ornament-sm" />
                </div>
                <div className="coll-block-desc-scroll">
                  <p className="coll-block-current-desc">{current.description}</p>
                </div>
                <div className="coll-block-actions">
                  <div className="coll-block-enquire-wrap">
                    <button onClick={handleEnquire} className="btn-primary coll-block-enquire-btn">
                      Enquire About This Collection <ArrowUpRight size={14} />
                    </button>
                  </div>
                  <JewelStrip items={items} activeIdx={activeIdx} onSelect={setActiveIdx} />
                </div>
              </div>
              <div className="coll-block-right" style={{ height: IMG_H }}>
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
  const location   = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.tab === "commisioned" ? "commisioned" : "cultural"
  );

  // Scroll to the collection block after mount if a tab was passed
  useEffect(() => {
    if (location.state?.tab) {
      const target = location.state.tab; // "cultural" | "commisioned"
      // Short delay lets the page render and sticky tab-bar settle
      const t = setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 180);
      return () => clearTimeout(t);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps — intentional mount-only run

  return (
    <>
      <Helmet>
        <title>Collections — Murthy Ateliers</title>
        <meta name="description" content="Browse two worlds of heirloom jewelry at Murthy Ateliers — the Cultural Collection rooted in South Indian temple tradition, and the Commissioned Collection made entirely for you." />
      </Helmet>

      {/* Hero */}
      <section id="page-hero" className="page-hero-sec">
        <img src="/jewellry/Web-Optimised/bannerCollection-opt.webp" alt="Collections"
          className="hero-banner-img hero-banner-img--collections" fetchPriority="high" decoding="async" />
        <div className="page-hero-gradient" />
        <div className="page-hero-content shell">
          <div className="frame">
            <motion.p {...fadeUp} className="eyebrow" style={{ color:"rgba(211,175,55,0.70)", marginBottom:"0.75rem" }}>Signature Collections</motion.p>
            <motion.h1 {...fadeUp} transition={{ delay:0.1, duration:0.8, ease:[0.22,1,0.36,1] }}
              className="display-xl" style={{ color:"var(--cream)" }}>
              Two Worlds of Heirloom Jewelry
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Tab bar */}
      <div className="coll-tabbar">
        <div className="shell">
          <div className="frame coll-tabbar-inner">
            {[{ key: "cultural", label: "Cultural" }, { key: "commisioned", label: "Commissioned" }].map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className="coll-tab"
                style={{ color: activeTab === tab.key ? "var(--gold)" : "rgba(250,248,237,0.5)" }}>
                {tab.label}
                <span className="coll-tab-underline" style={{ opacity: activeTab === tab.key ? 1 : 0 }} />
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
              bgImage="/jewellry/Web-Optimised/jewellry/Cultural/Saradu Malai/DPPHOTGRAPHY-8173.webp"
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

      <section className="shell coll-cta-sec">
        <div className="frame">
          <motion.div variants={scaleIn} {...inView} className="coll-cta-card">
            <div className="glow-collections-cta" />
            <div className="coll-cta-inner">
              <p className="eyebrow" style={{ color:"rgba(211,175,55,0.70)", marginBottom:"1rem" }}>Don't see what you're looking for?</p>
              <h2 className="display-md" style={{ color:"var(--cream)", marginBottom:"1.5rem" }}>Every piece can be made for you.</h2>
              <Link to="/consultation" className="btn-primary coll-cta-btn">
                Begin a Custom Commission <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

