import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import FaqAccordion from "../components/FaqAccordion";
import { philosophy, bespoke, legacyStories, faqs } from "../data/content";
import { fadeRight, staggerContainer, staggerItem, inView, scaleIn } from "../utils/motion";

// ─── Static data ────────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  { step: 1, title: "Concept & Story",       subtitle: "கற்பனை",       image: "/jewellry/Web-Optimised/craft.webp",        desc: "Every piece begins not with metal, but with memory. We collect family stories, research historical archives, sketch motifs inspired by Mylapore temple arches, and map out the visual weight and balance of the design on parchment." },
  { step: 2, title: "Stone Selection",        subtitle: "கல் தேர்வு",   image: "/jewellry/Web-Optimised/hero_jewel.webp",   desc: "We source natural, uncut diamonds (Polki), deep red kemp rubies, and premium cabochon emeralds. Each gemstone is chosen for its unique character, saturation of color, and ability to hold warm light under traditional settings." },
  { step: 3, title: "Handcrafting",           subtitle: "கைவினை",       image: "/jewellry/Web-Optimised/handCrafted.webp",  desc: "Senior master artisans (Thattars) in our Mylapore workshop hand-carve, hammer, and chase the 22k gold. Ancient techniques like repoussé (nakshi) and filigree are utilized to raise three-dimensional gold motifs from flat sheets." },
  { step: 4, title: "Finishing & Detailing",  subtitle: "மெருகூட்டல்",  image: "/jewellry/Web-Optimised/detailing.webp",    desc: "Using natural polishing compounds and antique patinas, we bring out the warm, buttery luster of high-carat gold. Stones are set using the ancient Kundan technique, sealing them in layers of pure, pressed gold foil." },
  { step: 5, title: "Passed Into Your Hands", subtitle: "சமர்ப்பித்தல்", image: "/jewellry/Web-Optimised/lineage.webp",     desc: "The finished heirloom is placed on raw silk inside a wooden presentation box. More than a piece of craft, it is delivered as an unfinished sentence—ready to gather stories and be passed down through generations." },
];

const JOURNAL_POSTS = [
  { id: "post-1", title: "The Story of Heirloom Jewelry",       tag: "Heritage Lore", date: "May 24, 2026",   excerpt: "In South India, jewelry was never mere ornamentation; it was an investment of trust, a store of family memory, and a talisman. We trace the history of passing gold down generations.",            image: "/jewellry/Web-Optimised/heritage.webp",       body: (<><p>Heirloom jewelry is a physical manifestation of time. In South Indian culture, jewelry was never created to be discarded or styled for a single season. It represented the family's honor, its security, and its memory.</p><blockquote>"Some things are not made—they are continued. The gold around your neck carries the heartbeat of the grandmother you never met."</blockquote><p>At Murthy Ateliers, we honor this continuity. When clients bring us ancestral pieces, we study the old carvings, note the wear of the metal where it rested against skin, and design the new piece to carry that history forward.</p></>) },
  { id: "post-2", title: "Mylapore & Our Craft Heritage",        tag: "Atelier Notes", date: "April 15, 2026", excerpt: "Mylapore is not just a neighborhood; it is a living archive of art. We explore the connection between this sacred geography and the integrity of traditional goldsmithing.",                     image: "/jewellry/Web-Optimised/founder_story.webp",  body: (<><p>Mylapore is a historic neighborhood in Chennai, famous for its grand Kapaleeshwarar Temple, bronze sculptors, and traditional silk weavers. But hidden in its narrow streets are the workshops of the traditional goldsmiths (Thattars) who have built Mylapore's reputation for trust and mastery.</p><blockquote>"To create in Mylapore is to hear the bells of the temple and the tapping of the goldsmith's hammer in the same breath."</blockquote><p>Every piece we craft carries this sacred geography.</p></>) },
  { id: "post-3", title: "Preserving and Caring for Antique Gold", tag: "Care Guide",  date: "March 08, 2026", excerpt: "High-carat traditional gold and kemp stones require gentle care to preserve their warm, soft luster. Read our comprehensive care guide from our senior craftsmen.",                            image: "/jewellry/Web-Optimised/preservation.webp",   body: (<><p>High-carat gold (22k) is a soft metal, susceptible to scratches if stored improperly. Similarly, traditional South Indian kemp stones are set with thin gold foils (Kundan technique) which must be kept free from moisture to prevent darkening.</p><ul><li><strong>Storage:</strong> Always store each piece separately in a dry, velvet-lined box.</li><li><strong>Moisture:</strong> Never expose kemp jewelry to water or perfumes.</li><li><strong>Cleaning:</strong> Wipe gently with a dry, soft cloth after wearing.</li></ul></>) },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate();

  const [activeProcessStep, setActiveProcessStep] = useState(1);
  const [mobileSlide, setMobileSlide]             = useState(0);
  const touchStartX                               = useRef(null);
  const [activeJournal, setActiveJournal]         = useState(null);

  // "peek" = initial 50vh clipped state; "full" = expanded, cards animating in
  const [collState, setCollState] = useState("peek"); // "peek" | "full"
  const sectionRef                = useRef(null);
  const didReveal                 = useRef(false);

  // MainLayout handles scroll-to-top on route change — no need to duplicate here

  const triggerBookingModal = (serviceType = "Consultation", notes = "") => {
    window.dispatchEvent(new CustomEvent("open-booking-modal", { detail: { service: serviceType, notes } }));
  };

  // ── Reveal sequence ─────────────────────────────────────────
  // 1. Instantly expand section height (no transition — class swap)
  // 2. Scroll section top to viewport top
  // 3. Framer Motion takes over: cards unblur + resize, text fades in
  const triggerReveal = () => {
    if (didReveal.current) return;
    didReveal.current = true;

    // Step 1 — snap height (no animation duration on the section itself)
    setCollState("full");

    // Step 2 — after one rAF so DOM has expanded, scroll into view
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (sectionRef.current) {
          const top = sectionRef.current.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top, behavior: "smooth" });
        }
      });
    });
  };

  // Wheel / touch gate (only fires before reveal)
  useEffect(() => {
    const onWheel = (e) => {
      if (e.deltaY > 0 && window.scrollY < 60) triggerReveal();
    };
    let startY = 0;
    const onTouchStart = (e) => { startY = e.touches[0].clientY; };
    const onTouchEnd   = (e) => {
      if (startY - e.changedTouches[0].clientY > 30 && window.scrollY < 60) triggerReveal();
    };
    window.addEventListener("wheel",      onWheel,      { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend",   onTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Process touch handlers
  const handleProcessTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleProcessTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) < 40) return;
    if (delta > 0 && mobileSlide < PROCESS_STEPS.length - 1) setMobileSlide((s) => s + 1);
    else if (delta < 0 && mobileSlide > 0)                   setMobileSlide((s) => s - 1);
    touchStartX.current = null;
  };

  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 500);
    }
  }, []);

  const isPeek = collState === "peek";
  const isFull = collState === "full";

  // Card animation variants
  // Peek: small (scale 0.82), blurred, no text
  // Full: natural size, sharp, text fades in
  const cardVariants = {
    peek: {
      scale:  0.82,
      filter: "blur(7px) brightness(0.55)",
      borderRadius: "1rem",
    },
    full: {
      scale:  1,
      filter: "blur(0px) brightness(1)",
      borderRadius: "1.5rem",
      transition: {
        scale:        { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        filter:       { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
        borderRadius: { duration: 0.5, ease: "easeOut" },
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 14 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      {/* ====================================================================
          Section 1 — Home Banner (100vw × 50vh)
          ==================================================================== */}
      <section id="home-banner" className="home-banner-sec">
        <img
          src="/imgs/banner_collection.webp"
          alt=""
          aria-hidden="true"
          className="home-banner-img"
          fetchPriority="high"
          decoding="sync"
        />
        <div className="hero-overlay" />
      </section>

      {/* ====================================================================
          Section 2 — Signature Collections
          ─ Peek  : 50vh, cards scaled down + blurred, caption centred
          ─ Full  : height snaps instantly, cards unblur/resize, text fades in
          ==================================================================== */}
      <section
        id="collections"
        ref={sectionRef}
        className={`coll-section coll-section--${collState}`}
      >
        {/* ── Peek caption — fades out on reveal ── */}
        <AnimatePresence>
          {isPeek && (
            <motion.div
              key="peek-cta"
              className="coll-peek"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              role="button"
              tabIndex={0}
              aria-label="See Our Collections"
              onClick={triggerReveal}
              onKeyDown={(e) => e.key === "Enter" && triggerReveal()}
            >
              <motion.span
                className="coll-peek-eyebrow"
                initial={{ opacity: 0, letterSpacing: "0.6em" }}
                animate={{ opacity: 1, letterSpacing: "0.38em" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              >
                Signature Collections
              </motion.span>

              <motion.h2
                className="coll-peek-heading"
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              >
                See Our Collections
              </motion.h2>

              <motion.p
                className="coll-peek-sub"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 0.65, y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              >
                Rooted in tradition, made for you.
              </motion.p>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut", delay: 1 }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="coll-peek-chevron">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Cards grid — always in DOM, state drives animation ── */}
        <div className={`coll-cards-wrap ${isPeek ? "coll-cards-wrap--peek" : ""}`}>

          {/* Heading row — only visible when full */}
          <motion.div
            className="collections-heading-row"
            variants={textVariants}
            initial="hidden"
            animate={isFull ? "show" : "hidden"}
            transition={{ delay: 0.7 }}
          >
            <div>
              <p className="collections-revealed-eyebrow">Signature Collections</p>
              <h2 className="collections-revealed-heading">Two Worlds of Heirloom Jewelry</h2>
            </div>
            <Link to="/collections" className="collections-view-all">
              View All <ArrowUpRight size={13} />
            </Link>
          </motion.div>

          {/* Two cards */}
          <div className="collections-grid">

            {/* Cultural — click → /collections with cultural tab */}
            <motion.article
              className="collection-card-new collection-card-new--clickable group"
              variants={cardVariants}
              initial="peek"
              animate={collState}
              onClick={() => isFull && navigate("/collections", { state: { tab: "cultural" } })}
              role={isFull ? "link" : undefined}
              tabIndex={isFull ? 0 : -1}
              onKeyDown={(e) => isFull && e.key === "Enter" && navigate("/collections", { state: { tab: "cultural" } })}
              aria-label="Explore Cultural Collection"
            >
              <img
                src="/jewellry/Web-Optimised/jewellry/Cultural/Saradu Malai/DPPHOTGRAPHY-8173.webp"
                alt="Cultural Collection"
                className="collection-card-img"
                loading="eager"
                decoding="async"
              />
              <div className="collection-card-gradient" />
              <motion.div
                className="collection-card-body"
                variants={textVariants}
                initial="hidden"
                animate={isFull ? "show" : "hidden"}
                transition={{ delay: 0.85 }}
              >
                <p className="collection-card-eyebrow">Cultural</p>
                <h3 className="collection-card-title">Rooted in Tradition</h3>
                <p className="collection-card-desc">
                  Jewelry shaped by temple geometry, Mylapore sanctums, and generations of South Indian goldsmithing.
                </p>
                <span className="collection-card-cta">
                  Explore Cultural <ArrowUpRight size={13} />
                </span>
              </motion.div>
            </motion.article>

            {/* Commissioned — click → /collections with commisioned tab */}
            <motion.article
              className="collection-card-new collection-card-new--clickable group"
              variants={cardVariants}
              initial="peek"
              animate={collState}
              transition={{ delay: 0.08 }}
              onClick={() => isFull && navigate("/collections", { state: { tab: "commisioned" } })}
              role={isFull ? "link" : undefined}
              tabIndex={isFull ? 0 : -1}
              onKeyDown={(e) => isFull && e.key === "Enter" && navigate("/collections", { state: { tab: "commisioned" } })}
              aria-label="Explore Commissioned Collection"
            >
              <img
                src="/jewellry/Web-Optimised/jewellry/Commisioned/6/DPPHOTGRAPHY-8286.webp"
                alt="Commissioned Collection"
                className="collection-card-img"
                loading="eager"
                decoding="async"
              />
              <div className="collection-card-gradient" />
              <motion.div
                className="collection-card-body"
                variants={textVariants}
                initial="hidden"
                animate={isFull ? "show" : "hidden"}
                transition={{ delay: 0.95 }}
              >
                <p className="collection-card-eyebrow">Commissioned</p>
                <h3 className="collection-card-title">Made for You, by Name</h3>
                <p className="collection-card-desc">
                  Client-led bespoke pieces where memory, material, and wearability are shaped together from the first conversation.
                </p>
                <span className="collection-card-cta">
                  Explore Commissioned <ArrowUpRight size={13} />
                </span>
              </motion.div>
            </motion.article>

          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 3 — A Legacy Continued
          ==================================================================== */}
      <section id="story" className="section container home-journal-container">
        <div className="founder-grid">
          <div className="founder-image-wrapper">
            <div className="founder-img-frame">
              <img src="/jewellry/Web-Optimised/founder_story.webp" alt="Archival sketch of Mylapore jewelry workshop" className="home-founder-img" loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="founder-note">
            <span className="section-subtitle">A Legacy Continued</span>
            <h2 className="tamil-greeting">வாழ்க வளமுடன்</h2>
            <span className="tamil-sub">May you live and flourish</span>
            <div className="founder-body">
              <p>This piece carries a name — <strong>Shanthi Shankar</strong>, jeweller's daughter, a woman of warmth and grace who was still becoming when we lost her.</p>
              <p>She was the daughter of <strong>D.K. Murthy</strong>, who spent a lifetime building something real in the heart of Mylapore — the trust of families, the integrity of craft, beauty made to outlast the hands that made it.</p>
              <p>Murthy Ateliers is her unfinished sentence, continued. We carry that goodwill forward into every piece, with gratitude for everything they built and love for where it is going.</p>
              <p>We are so glad this found its way to you. Wear it with intention. Keep it long. Pass it on.</p>
            </div>
            <div className="founder-signature">
              <div>
                <div className="sig-name">Vidya Shankaran</div>
                <div className="sig-title">Founder, Murthy Ateliers</div>
              </div>
              <div className="sig-script">Vidya</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 4 — Made to Outlive Trends (Philosophy)
          ==================================================================== */}
      <section className="shell home-phil-sec">
        <img src="/imgs/bgsec1.webp" alt="" aria-hidden="true" className="home-philosophy-texture" loading="lazy" decoding="async" />
        <div className="glow-philosophy" />
        <div className="frame home-frame-z">
          <SectionHeading eyebrow={philosophy.eyebrow} heading={philosophy.heading} body="Three principles that guide every piece we create — from the first sketch to the final polish." align="center" light />
          <div className="ornament home-phil-ornament" />
          <motion.div variants={staggerContainer} {...inView} className="home-phil-grid">
            {philosophy.pillars.map((pillar) => (
              <motion.article key={pillar.number} variants={staggerItem} className="home-phil-card group">
                <div className="home-philosophy-card-wrap">
                  <img src={pillar.image} alt={pillar.title} className="home-philosophy-card-img" loading="lazy" />
                  <div className="img-fill img-overlay-forest home-phil-card-overlay" />
                  <span className="font-display home-phil-num">{pillar.number}</span>
                </div>
                <div className="home-phil-card-body">
                  <h3 className="font-display home-phil-card-title">{pillar.title}</h3>
                  <div className="ornament-sm home-phil-card-ornament" />
                  <p className="home-body-cream-sm">{pillar.body}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          Section 5 — Making of an Heirloom (Process)
          ==================================================================== */}
      <section id="process" className="section container home-journal-container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-subtitle">Craftsmanship Process</span>
          <h2 className="section-title">The Making of <span>an Heirloom</span></h2>
          <div className="divider-gold" />
        </div>
        {/* Desktop */}
        <div className="process-container process-desktop-only">
          <div className="process-line" />
          <div className="process-timeline">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className={`process-step ${activeProcessStep === step.step ? "active" : ""}`} onClick={() => setActiveProcessStep(step.step)}>
                <div className="process-node">{step.step}</div>
                <h4 className="process-step-title">{step.title}</h4>
                <span className="process-step-sub">{step.subtitle}</span>
              </div>
            ))}
          </div>
          {PROCESS_STEPS.map((step) => step.step !== activeProcessStep ? null : (
            <div key={step.step} className="process-details-card animate-fade-in">
              <div><img src={step.image} alt={step.title} className="process-details-img" /></div>
              <div className="process-details-content">
                <span className="process-details-num">{step.step.toString().padStart(2, "0")}</span>
                <h3 className="process-details-title">{step.title} <span>{step.subtitle}</span></h3>
                <p className="process-details-desc founder-body">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Mobile */}
        <div className="process-mobile-slider" onTouchStart={handleProcessTouchStart} onTouchEnd={handleProcessTouchEnd}>
          <div className="process-mobile-track" style={{ transform: `translateX(-${mobileSlide * 100}%)` }}>
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="process-mobile-slide">
                <img src={step.image} alt={step.title} className="process-mobile-img" />
                <div className="process-mobile-content">
                  <span className="process-mobile-num">{step.step.toString().padStart(2, "0")}</span>
                  <h3 className="process-mobile-title">{step.title} <span className="process-mobile-sub">{step.subtitle}</span></h3>
                  <p className="process-mobile-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="process-mobile-arrows">
            <button className="process-mobile-arrow" onClick={() => setMobileSlide((s) => Math.max(0, s - 1))} aria-label="Previous step" disabled={mobileSlide === 0}>←</button>
            <div className="process-mobile-dots">
              {PROCESS_STEPS.map((_, i) => (
                <button key={i} className={`process-mobile-dot ${i === mobileSlide ? "active" : ""}`} onClick={() => setMobileSlide(i)} aria-label={`Go to step ${i + 1}`} />
              ))}
            </div>
            <button className="process-mobile-arrow" onClick={() => setMobileSlide((s) => Math.min(PROCESS_STEPS.length - 1, s + 1))} aria-label="Next step" disabled={mobileSlide === PROCESS_STEPS.length - 1}>→</button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 6 — Craft Something Personal (Bespoke)
          ==================================================================== */}
      <section className="shell home-bespoke-sec">
        <img src="/jewellry/Web-Optimised/imgs/bgsec2.webp" alt="" aria-hidden="true" className="home-bespoke-texture" />
        <div className="frame home-bespoke-grid">
          <motion.div variants={scaleIn} {...inView} className="home-bespoke-img-wrap shadow-luxury">
            <img src={bespoke.image} alt="Bespoke jewelry" className="home-bespoke-img" loading="lazy" />
            <div className="img-fill img-overlay-dark home-bespoke-overlay" />
            <div className="home-bespoke-quote card-parchment">
              <p className="font-display home-bespoke-quote-text">"Some things are not made — they are continued."</p>
              <p className="eyebrow home-bespoke-quote-brand">Murthy Ateliers</p>
            </div>
          </motion.div>
          <motion.div variants={fadeRight} {...inView} className="home-bespoke-text">
            <p className="eyebrow" style={{ color:"var(--crimson)", marginBottom:"1rem" }}>{bespoke.eyebrow}</p>
            <h2 className="display-lg home-heading-forest" style={{ textWrap: "balance" }}>{bespoke.heading}</h2>
            <div className="ornament home-ornament-mid" />
            <p className="home-body-forest">{bespoke.body}</p>
            <div className="home-bespoke-ctas">
              <Link to="/consultation" className="btn-primary">Begin Your Consultation <ArrowUpRight size={14} /></Link>
              <button onClick={() => triggerBookingModal("Share Story", "I would like to share our family jewelry story.")} className="btn-outline">Share Your Story</button>
            </div>
            <div className="home-stats-grid">
              {[{ label: "Generations", value: "3+" }, { label: "Heirloom Pieces", value: "500+" }, { label: "Families Served", value: "200+" }].map((stat) => (
                <div key={stat.label} className="home-stat">
                  <p className="font-display home-stat-val">{stat.value}</p>
                  <p className="home-stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          Section 7 — Journal
          ==================================================================== */}
      <section id="journal" className="section container home-journal-container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-subtitle">Notes From the Atelier</span>
          <h2 className="section-title">The Journal</h2>
          <div className="divider-gold" />
          <p style={{ maxWidth: "600px", margin: "0 auto", opacity: 0.8 }} className="founder-body">A storytelling-led editorial space featuring reflections on heritage, craftsmanship, culture, and preservation.</p>
        </div>
        <div className="journal-grid">
          {JOURNAL_POSTS.map((post) => (
            <div key={post.id} className="journal-card">
              <img src={post.image} alt={post.title} className="home-journal-card-img" />
              <div className="journal-card-content">
                <span className="journal-card-tag">{post.tag}</span>
                <h3 className="journal-card-title">{post.title}</h3>
                <p className="journal-card-excerpt">{post.excerpt}</p>
                <button className="btn-text" style={{ alignSelf: "flex-start" }} onClick={() => setActiveJournal(post)}>Read Narrative</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journal drawer */}
      <div className={`journal-drawer ${activeJournal ? "open" : ""}`}>
        {activeJournal && (
          <>
            <button className="journal-drawer-close" onClick={() => setActiveJournal(null)}>
              <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              Back to Journal
            </button>
            <div className="journal-drawer-header">
              <span className="journal-card-tag" style={{ fontSize: "0.85rem" }}>{activeJournal.tag}</span>
              <h2 className="journal-drawer-title">{activeJournal.title}</h2>
              <div className="journal-drawer-meta"><span>Published: {activeJournal.date}</span><span>By: Murthy Ateliers</span></div>
            </div>
            <img src={activeJournal.image} alt={activeJournal.title} className="home-journal-drawer-img" />
            <div className="journal-drawer-body">{activeJournal.body}</div>
          </>
        )}
      </div>

      {/* ====================================================================
          Section 8 — Testimonials
          ==================================================================== */}
      <section className="shell home-testimonials-sec">
        <div className="frame">
          <div className="home-stories-grid">
            <SectionHeading eyebrow="Stories That Stay" heading="Stories That Stay" body="Not reviews — emotional narratives from families whose jewels carry names, dates, and memory." />
            <motion.div variants={staggerContainer} {...inView} className="home-stories-list">
              {legacyStories.map((story, i) => (
                <motion.blockquote key={i} variants={staggerItem} className="card-parchment home-story-card">
                  <div className="font-display home-story-quote-mark">"</div>
                  <p className="font-display home-story-quote">{story.quote}</p>
                  <footer className="home-story-footer">
                    <div className="ornament-sm" />
                    <div>
                      <p className="eyebrow home-story-byline">{story.byline}</p>
                      <p className="home-story-detail">{story.detail}</p>
                    </div>
                  </footer>
                </motion.blockquote>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 9 — FAQ
          ==================================================================== */}
      <section id="faq" className="shell home-faq-sec">
        <div className="frame">
          <div className="home-stories-grid">
            <SectionHeading eyebrow="Frequently Asked Questions" heading="Frequently Asked Questions" body="Clarity and gentle guidance for private commissions, heirloom redesigns, and bespoke work." />
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 10 — Final Note
          ==================================================================== */}
      <section className="emotional-sec">
        <div className="emotional-bg" />
        <div className="emotional-overlay" />
        <div className="emotional-content">
          <p className="emotional-text">"Some things are too meaningful to be trend-driven. Jewelry should hold memory. It should gather stories. It should stay."</p>
          <span className="emotional-brand">Murthy Ateliers</span>
        </div>
      </section>
    </>
  );
}



