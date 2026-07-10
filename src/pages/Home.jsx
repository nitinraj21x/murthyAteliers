import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import FaqAccordion from "../components/FaqAccordion";
import { philosophy, bespoke, legacyStories, faqs } from "../data/content";
import { fadeRight, staggerContainer, staggerItem, inView, scaleIn } from "../utils/motion";

// ==========================================================================
// proj2 Data constants
// ==========================================================================
const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Concept & Story',
    subtitle: 'கற்பனை',
    image: '/craft.jpg',
    desc: 'Every piece begins not with metal, but with memory. We collect family stories, research historical archives, sketch motifs inspired by Mylapore temple arches, and map out the visual weight and balance of the design on parchment.'
  },
  {
    step: 2,
    title: 'Stone Selection',
    subtitle: 'கல் தேர்வு',
    image: '/hero_jewel.png',
    desc: 'We source natural, uncut diamonds (Polki), deep red kemp rubies, and premium cabochon emeralds. Each gemstone is chosen for its unique character, saturation of color, and ability to hold warm light under traditional settings.'
  },
  {
    step: 3,
    title: 'Handcrafting',
    subtitle: 'கைவினை',
    image: '/handCrafted.jpg',
    desc: 'Senior master artisans (Thattars) in our Mylapore workshop hand-carve, hammer, and chase the 22k gold. Ancient techniques like repoussé (nakshi) and filigree are utilized to raise three-dimensional gold motifs from flat sheets.'
  },
  {
    step: 4,
    title: 'Finishing & Detailing',
    subtitle: 'மெருகூட்டல்',
    image: '/detailing.jpg',
    desc: 'Using natural polishing compounds and antique patinas, we bring out the warm, buttery luster of high-carat gold. Stones are set using the ancient Kundan technique, sealing them in layers of pure, pressed gold foil.'
  },
  {
    step: 5,
    title: 'Passed Into Your Hands',
    subtitle: 'சமர்ப்பித்தல்',
    image: '/lineage.jpg',
    desc: 'The finished heirloom is placed on raw silk inside a wooden presentation box. More than a piece of craft, it is delivered as an unfinished sentence—ready to gather stories and be passed down through generations.'
  }
];

const JOURNAL_POSTS = [
  {
    id: 'post-1',
    title: 'The Story of Heirloom Jewelry',
    tag: 'Heritage Lore',
    date: 'May 24, 2026',
    excerpt: 'In South India, jewelry was never mere ornamentation; it was an investment of trust, a store of family memory, and a talisman. We trace the history of passing gold down generations.',
    image: '/heritage.png',
    body: (
      <>
        <p>Heirloom jewelry is a physical manifestation of time. In South Indian culture, jewelry was never created to be discarded or styled for a single season. It represented the family's honor, its security, and its memory. A piece of gold is melted, reformed, and worn, yet it carries the soul of the hands that held it first.</p>
        <blockquote>“Some things are not made—they are continued. The gold around your neck carries the heartbeat of the grandmother you never met.”</blockquote>
        <p>At Murthy Ateliers, we honor this continuity. When clients bring us ancestral pieces, we do not view them as raw materials. We study the old carvings, note the wear of the metal where it rested against skin, and design the new piece to carry that history forward. A marriage of historical weight and contemporary elegance ensures the piece will be worn, loved, and passed on for another hundred years.</p>
      </>
    )
  },
  {
    id: 'post-2',
    title: 'Mylapore & Our Craft Heritage',
    tag: 'Atelier Notes',
    date: 'April 15, 2026',
    excerpt: 'Mylapore is not just a neighborhood; it is a living archive of art. We explore the connection between this sacred geography and the integrity of traditional goldsmithing.',
    image: '/founder_story.png',
    body: (
      <>
        <p>Mylapore is a historic neighborhood in Chennai, famous for its grand Kapaleeshwarar Temple, bronze sculptors, and traditional silk weavers. But hidden in its narrow streets are the workshops of the traditional goldsmiths (Thattars) who have built Mylapore's reputation for trust and mastery over generations.</p>
        <p>It was here that D.K. Murthy spent his lifetime building Swamy Jewelers. The trust of families was not built overnight; it was forged through the integrity of gold and the beauty of the craft. Murthy Ateliers is a continuation of that heritage, operating from the heart of Mylapore with the same devotion to the ancient craft.</p>
        <blockquote>“To create in Mylapore is to hear the bells of the temple and the tapping of the goldsmith's hammer in the same breath.”</blockquote>
        <p>Every piece we craft carries this sacred geography. The peacock motifs, the lotus designs, and the temple arches that adorn our jewelry are directly inspired by the stone carvings and cultural life that surround our atelier.</p>
      </>
    )
  },
  {
    id: 'post-3',
    title: 'Preserving and Caring for Antique Gold',
    tag: 'Care Guide',
    date: 'March 08, 2026',
    excerpt: 'High-carat traditional gold and kemp stones require gentle care to preserve their warm, soft luster. Read our comprehensive care guide from our senior craftsmen.',
    image: '/preservation.png',
    body: (
      <>
        <p>High-carat gold (22k) is a soft metal, susceptible to scratches if stored improperly. Similarly, traditional South Indian kemp stones are set with thin gold foils (Kundan technique) which must be kept free from moisture to prevent darkening.</p>
        <p>Our senior craftsmen recommend the following rituals to preserve your Murthy Ateliers pieces:</p>
        <ul>
          <li><strong>Storage:</strong> Always store each piece separately in a dry, velvet-lined box or a soft cotton pouch. Avoid mixing different gemstones together to prevent friction.</li>
          <li><strong>Moisture:</strong> Never expose kemp jewelry or gold foil jewelry to water. Keep them away from perfumes, oils, and cosmetics. Apply your cosmetics and fragrance first, and let them dry completely before putting on your jewelry.</li>
          <li><strong>Cleaning:</strong> Clean your jewelry after wearing by wiping it gently with a dry, soft chamois or cotton cloth. Do not use chemical cleaners, soap, or water on foil-set kemp stones.</li>
        </ul>
        <p>By treating your jewelry with intention and care, you ensure it retains its warm patina and hand-finished character for the next generation.</p>
      </>
    )
  }
];

export default function Home() {
  // Section 6: Making of an Heirloom (proj2) state
  const [activeProcessStep, setActiveProcessStep] = useState(1);
  // Mobile process slider index
  const [mobileSlide, setMobileSlide] = useState(0);
  const touchStartX = useRef(null);

  const handleProcessTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleProcessTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) < 40) return; // ignore tiny swipes
    if (delta > 0 && mobileSlide < PROCESS_STEPS.length - 1) {
      setMobileSlide((s) => s + 1);
    } else if (delta < 0 && mobileSlide > 0) {
      setMobileSlide((s) => s - 1);
    }
    touchStartX.current = null;
  };

  // Section 8: Journal Section (proj2) state
  const [activeJournal, setActiveJournal] = useState(null);

  // Helper to trigger global booking modal
  const triggerBookingModal = (serviceType = 'Consultation', notes = '') => {
    window.dispatchEvent(new CustomEvent('open-booking-modal', {
      detail: { service: serviceType, notes }
    }));
  };

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to #story on hash load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => scrollToSection(id), 500);
    }
  }, []);

  return (
    <>
      {/* ==========================================================================
         Section 2: Banner Section (proj2)
         ========================================================================== */}
      <section className="hero-sec">
        <div className="hero-bg" style={{ backgroundImage: `url('/banner_collection.jpg')` }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-ctas">
            <Link to="/collections" className="btn btn-primary">Explore Collections</Link>
            <button 
              className="btn btn-secondary hero-btn-alt" 
              onClick={() => triggerBookingModal('Consultation', 'I would like to book a private heirloom consultation from the Banner section.')}
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         Section 3: A Legacy Continued Section (proj2)
         ========================================================================== */}
      <section id="story" className="section container">
        <div className="founder-grid">
          <div className="founder-image-wrapper">
            <div className="founder-img-frame">
              <img src="/founder_story.png" alt="Archival sketch of Mylapore jewelry workshop" className="founder-img" />
            </div>
          </div>
          <div className="founder-note">
            <span className="section-subtitle">A Legacy Continued</span>
            <h2 className="tamil-greeting">வாழ்க வளமுடன்</h2>
            <span className="tamil-sub">May you live and flourish</span>
            
            <div className="founder-body">
              <p>
                This piece carries a name — <strong>Shanthi Shankar</strong>, jeweller’s daughter, a woman of warmth and grace who was still becoming when we lost her.
              </p>
              <p>
                She was the daughter of <strong>D.K. Murthy</strong>, who spent a lifetime building something real in the heart of Mylapore — the trust of families, the integrity of craft, beauty made to outlast the hands that made it.
              </p>
              <p>
                Murthy Ateliers is her unfinished sentence, continued. We carry that goodwill forward into every piece, with gratitude for everything they built and love for where it is going.
              </p>
              <p>
                We are so glad this found its way to you. Wear it with intention. Keep it long. Pass it on.
              </p>
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

      {/* ==========================================================================
         Section 4: Made to Outlive Trends Section (proj1)
         ========================================================================== */}
      <section className="shell py-20 sm:py-28 bg-crimson relative overflow-hidden">
        {/* Background image */}
        <img
          src="/imgs/bgsec1.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: 0.18 }}
        />
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 50%, rgba(211,175,55,0.2) 0%, transparent 45%), radial-gradient(circle at 85% 30%, rgba(250,248,237,0.06) 0%, transparent 40%)",
          }}
        />

        <div className="frame relative z-10">
          <SectionHeading
            eyebrow={philosophy.eyebrow}
            heading={philosophy.heading}
            body="Three principles that guide every piece we create — from the first sketch to the final polish."
            align="center"
            light
          />

          <div className="ornament mt-10 mb-12 opacity-30" />

          <motion.div
            variants={staggerContainer}
            {...inView}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {philosophy.pillars.map((pillar) => (
              <motion.article
                key={pillar.number}
                variants={staggerItem}
                className="group relative overflow-hidden rounded-3xl"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 img-overlay-forest opacity-70" />
                  <span className="absolute top-5 left-5 font-display text-gold/50 text-5xl leading-none">
                    {pillar.number}
                  </span>
                </div>
                {/* Text */}
                <div className="p-6 bg-crimson/80 border border-gold/10 rounded-b-3xl -mt-1">
                  <h3 className="font-display text-cream text-2xl">{pillar.title}</h3>
                  <div className="ornament-sm mt-3 mb-3 opacity-60" />
                  <p className="text-sm leading-7 text-cream/65">{pillar.body}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         Section 5: Signature Collections Section
         ========================================================================== */}
      <section id="collections" className="shell py-20 sm:py-28">
        <div className="frame">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <SectionHeading
              eyebrow="Signature Collections"
              heading="Two Worlds of Heirloom Jewelry"
              body="Each collection is a distinct emotional universe — not a catalogue, but a curated world of meaning."
            />
            <Link
              to="/collections"
              className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-crimson hover:text-forest transition-colors duration-200"
            >
              View All <ArrowUpRight size={13} />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            {...inView}
            className="grid gap-5 sm:grid-cols-2"
          >
            {/* Cultural */}
            <motion.article
              variants={staggerItem}
              className="group relative overflow-hidden rounded-3xl min-h-[420px] sm:min-h-[500px]"
            >
              <img
                src="/jewellry/Cultural/1/DPPHOTGRAPHY-8173.jpg"
                alt="Cultural Collection"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.08) 100%)" }} />
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-gold/40 transition-colors duration-500 pointer-events-none" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <p className="eyebrow mb-2" style={{ color: "#D3AF37", textShadow: "0 1px 4px rgba(0,0,0,1)" }}>Cultural</p>
                <h3
                  className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,0.95)" }}
                >
                  Rooted in Tradition
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/75 hidden sm:block" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>
                  Jewelry shaped by temple geometry, Mylapore sanctums, and generations of South Indian goldsmithing.
                </p>
                <div className="mt-5 hidden sm:block">
                  <Link
                    to="/collections"
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white border border-white/40 rounded-full px-5 py-2.5 hover:bg-white/15 hover:border-white/70 transition-all duration-300 backdrop-blur-sm"
                  >
                    Explore Cultural <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.article>

            {/* Commissioned */}
            <motion.article
              variants={staggerItem}
              className="group relative overflow-hidden rounded-3xl min-h-[420px] sm:min-h-[500px]"
            >
              <img
                src="/jewellry/Commisioned/4/DPPHOTGRAPHY-8162.jpg"
                alt="Commissioned Collection"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.08) 100%)" }} />
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-gold/40 transition-colors duration-500 pointer-events-none" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <p className="eyebrow mb-2" style={{ color: "#D3AF37", textShadow: "0 1px 4px rgba(0,0,0,1)" }}>Commissioned</p>
                <h3
                  className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,0.95)" }}
                >
                  Made for You, by Name
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/75 hidden sm:block" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>
                  Client-led bespoke pieces where memory, material, and wearability are shaped together from the first conversation.
                </p>
                <div className="mt-5 hidden sm:block">
                  <Link
                    to="/collections"
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white border border-white/40 rounded-full px-5 py-2.5 hover:bg-white/15 hover:border-white/70 transition-all duration-300 backdrop-blur-sm"
                  >
                    Explore Commissioned <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         Section 6: Making of a Heirloom Section (proj2)
         ========================================================================== */}
      <section id="process" className="section container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-subtitle">Craftsmanship Process</span>
          <h2 className="section-title">The Making of <span>an Heirloom</span></h2>
          <div className="divider-gold"></div>
        </div>

        {/* ── Desktop timeline (hidden on mobile) ── */}
        <div className="process-container process-desktop-only">
          <div className="process-line"></div>
          <div className="process-timeline">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className={`process-step ${activeProcessStep === step.step ? 'active' : ''}`}
                onClick={() => setActiveProcessStep(step.step)}
              >
                <div className="process-node">{step.step}</div>
                <h4 className="process-step-title">{step.title}</h4>
                <span className="process-step-sub">{step.subtitle}</span>
              </div>
            ))}
          </div>
          {PROCESS_STEPS.map((step) => {
            if (step.step !== activeProcessStep) return null;
            return (
              <div key={step.step} className="process-details-card animate-fade-in">
                <div>
                  <img src={step.image} alt={step.title} className="process-details-img" />
                </div>
                <div className="process-details-content">
                  <span className="process-details-num">{step.step.toString().padStart(2, '0')}</span>
                  <h3 className="process-details-title">{step.title} <span>{step.subtitle}</span></h3>
                  <p className="process-details-desc founder-body">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Mobile swipe slider (hidden on desktop) ── */}
        <div
          className="process-mobile-slider"
          onTouchStart={handleProcessTouchStart}
          onTouchEnd={handleProcessTouchEnd}
        >
          {/* Slide track */}
          <div
            className="process-mobile-track"
            style={{ transform: `translateX(-${mobileSlide * 100}%)` }}
          >
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="process-mobile-slide">
                <img src={step.image} alt={step.title} className="process-mobile-img" />
                <div className="process-mobile-content">
                  <span className="process-mobile-num">{step.step.toString().padStart(2, '0')}</span>
                  <h3 className="process-mobile-title">
                    {step.title} <span className="process-mobile-sub">{step.subtitle}</span>
                  </h3>
                  <p className="process-mobile-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe arrows hint */}
          <div className="process-mobile-arrows">
            <button
              className="process-mobile-arrow"
              onClick={() => setMobileSlide((s) => Math.max(0, s - 1))}
              aria-label="Previous step"
              disabled={mobileSlide === 0}
            >
              ←
            </button>
            <div className="process-mobile-dots">
              {PROCESS_STEPS.map((_, i) => (
                <button
                  key={i}
                  className={`process-mobile-dot ${i === mobileSlide ? 'active' : ''}`}
                  onClick={() => setMobileSlide(i)}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>
            <button
              className="process-mobile-arrow"
              onClick={() => setMobileSlide((s) => Math.min(PROCESS_STEPS.length - 1, s + 1))}
              aria-label="Next step"
              disabled={mobileSlide === PROCESS_STEPS.length - 1}
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         Section 7: Craft Something Personal Section (proj1)
         ========================================================================== */}
      <section className="shell py-20 sm:py-28 bg-cream-dark relative overflow-hidden">
        {/* Background image */}
        <img
          src="/imgs/bgsec2.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: 0.12 }}
        />
        <div className="frame relative z-10 grid gap-10 lg:grid-cols-[1fr_1fr] items-center">

          {/* Image */}
          <motion.div
            variants={scaleIn}
            {...inView}
            className="relative overflow-hidden rounded-3xl shadow-luxury order-2 lg:order-1"
          >
            <img
              src={bespoke.image}
              alt="Bespoke jewelry"
              className="w-full h-[480px] object-cover bespoke-img-responsive"
              loading="lazy"
            />
            <div className="absolute inset-0 img-overlay-dark opacity-25" />
            {/* Floating quote */}
            <div className="absolute bottom-6 left-6 right-6 card-parchment rounded-2xl p-5">
              <p className="font-display italic text-forest text-xl leading-snug">
                "Some things are not made — they are continued."
              </p>
              <p className="mt-2 eyebrow text-crimson text-[0.6rem]">Murthy Ateliers</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fadeRight}
            {...inView}
            className="order-1 lg:order-2"
          >
            <p className="eyebrow text-crimson mb-4">{bespoke.eyebrow}</p>
            <h2 className="display-lg text-forest" style={{ textWrap: "balance" }}>
              {bespoke.heading}
            </h2>
            <div className="ornament my-7" />
            <p className="text-base leading-8 text-forest/70">{bespoke.body}</p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/consultation" className="btn-primary">
                Begin Your Consultation
                <ArrowUpRight size={14} />
              </Link>
              <button 
                onClick={() => triggerBookingModal('Share Story', 'I would like to share our family jewelry story.')}
                className="btn-outline"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.875rem 2rem",
                  fontSize: "0.6875rem",
                  fontWeight: "600",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  borderRadius: "9999px",
                  border: "1px solid var(--forest)",
                  color: "var(--forest)",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                Share Your Story
              </button>
            </div>

            {/* Trust signals */}
            <div className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t border-gold/20">
              {[
                { label: "Generations", value: "3+" },
                { label: "Heirloom Pieces", value: "500+" },
                { label: "Families Served", value: "200+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-crimson text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs tracking-widest uppercase text-forest/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         Section 8: Journal Section (proj2)
         ========================================================================== */}
      <section id="journal" className="section container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-subtitle">Notes From the Atelier</span>
          <h2 className="section-title">The Journal</h2>
          <div className="divider-gold"></div>
          <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.8 }} className="founder-body">
            A storytelling-led editorial space featuring reflections on heritage, craftsmanship, culture, and preservation.
          </p>
        </div>

        <div className="journal-grid">
          {JOURNAL_POSTS.map((post) => (
            <div key={post.id} className="journal-card">
              <img src={post.image} alt={post.title} className="journal-card-img" />
              <div className="journal-card-content">
                <span className="journal-card-tag">{post.tag}</span>
                <h3 className="journal-card-title">{post.title}</h3>
                <p className="journal-card-excerpt">{post.excerpt}</p>
                <button className="btn-text" style={{ alignSelf: 'flex-start' }} onClick={() => setActiveJournal(post)}>
                  Read Narrative
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journal Article Sliding Drawer */}
      <div className={`journal-drawer ${activeJournal ? 'open' : ''}`}>
        {activeJournal && (
          <>
            <button className="journal-drawer-close" onClick={() => setActiveJournal(null)}>
              <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Back to Journal
            </button>

            <div className="journal-drawer-header">
              <span className="journal-card-tag" style={{ fontSize: '0.85rem' }}>{activeJournal.tag}</span>
              <h2 className="journal-drawer-title">{activeJournal.title}</h2>
              <div className="journal-drawer-meta">
                <span>Published: {activeJournal.date}</span>
                <span>By: Murthy Ateliers</span>
              </div>
            </div>

            <img src={activeJournal.image} alt={activeJournal.title} className="journal-drawer-img" />

            <div className="journal-drawer-body">
              {activeJournal.body}
            </div>
          </>
        )}
      </div>

      {/* ==========================================================================
         Section 9: Testimonial Section (proj1)
         ========================================================================== */}
      <section className="shell py-20 sm:py-28 bg-cream">
        <div className="frame">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] items-start">
            <SectionHeading
              eyebrow="Stories That Stay"
              heading="Stories That Stay"
              body="Not reviews — emotional narratives from families whose jewels carry names, dates, and memory."
            />

            <motion.div
              variants={staggerContainer}
              {...inView}
              className="space-y-5"
            >
              {legacyStories.map((story, i) => (
                <motion.blockquote
                  key={i}
                  variants={staggerItem}
                  className="card-parchment rounded-3xl p-7 sm:p-8"
                >
                  <div className="text-gold/40 font-display text-6xl leading-none mb-2">"</div>
                  <p className="font-display text-forest text-2xl sm:text-3xl leading-snug">
                    {story.quote}
                  </p>
                  <footer className="mt-5 flex items-center gap-3">
                    <div className="ornament-sm" />
                    <div>
                      <p className="eyebrow text-crimson text-[0.6rem]">{story.byline}</p>
                      <p className="text-xs text-forest/40 mt-0.5">{story.detail}</p>
                    </div>
                  </footer>
                </motion.blockquote>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         Section 10: FAQ Section (proj1)
         ========================================================================== */}
      <section id="faq" className="shell py-20 sm:py-28 bg-cream-dark">
        <div className="frame">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] items-start">
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              heading="Frequently Asked Questions"
              body="Clarity and gentle guidance for private commissions, heirloom redesigns, and bespoke work."
            />
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ==========================================================================
         Section 11: Final Note Section (proj2)
         ========================================================================== */}
      <section className="emotional-sec">
        <div className="emotional-bg" style={{ backgroundImage: `url('/fbanner1.png')` }}></div>
        <div className="emotional-overlay"></div>
        <div className="emotional-content">
          <p className="emotional-text">
            “Some things are too meaningful to be trend-driven. Jewelry should hold memory. It should gather stories. It should stay.”
          </p>
          <span className="emotional-brand">Murthy Ateliers</span>
        </div>
      </section>
    </>
  );
}
