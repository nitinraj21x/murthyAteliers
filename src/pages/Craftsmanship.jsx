import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import ProcessStep from "../components/ProcessStep";
import { processSteps, brand } from "../data/content";
import { img } from "../data/images";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItem, inView, scaleIn } from "../utils/motion";

const craftDetails = [
  {
    title: "Temple Geometry",
    body:  "Gopuram tiers, lotus borders, and shrine archways translated into wearable proportion — architecture as ornament.",
    image: img.temple,
  },
  {
    title: "Kasu Rhythm",
    body:  "The measured spacing of coin links, creating drape and movement that feels alive rather than rigid.",
    image: img.goldwork1,
  },
  {
    title: "Granulation",
    body:  "Tiny spheres of gold fused to the surface without solder — an ancient technique that creates texture and depth.",
    image: img.goldwork2,
  },
  {
    title: "Stone Setting",
    body:  "Rubies, emeralds, and pearls placed for warmth and balance, not spectacle — each stone chosen for how it sits against the gold.",
    image: img.gemstone1,
  },
];

export default function Craftsmanship() {
  return (
    <>
      <Helmet>
        <title>Craftsmanship — Murthy Ateliers</title>
        <meta name="description" content="Explore the five stages of making an heirloom at Murthy Ateliers — from concept and stone selection to handcrafting and the moment a piece passes into your hands." />
      </Helmet>

      <section id="page-hero" className="page-hero-sec page-hero-sec--tall">
        <img src="/imgs/bannerCraft.webp" alt="Craftsmanship"
          className="hero-banner-img hero-banner-img--craft" fetchPriority="high" decoding="async" />
        <div className="page-hero-gradient" />
        <div className="page-hero-content shell">
          <div className="frame">
            <motion.p {...fadeUp} className="eyebrow" style={{ color:"rgba(211,175,55,0.70)", marginBottom:"1rem" }}>
              The Making of an Heirloom
            </motion.p>
            <motion.h1 {...fadeUp} transition={{ delay:0.1, duration:0.8, ease:[0.22,1,0.36,1] }}
              className="display-xl" style={{ color:"var(--cream)" }}>
              Craft as Continuity
            </motion.h1>
          </div>
        </div>
      </section>

      <section className="shell craft-intro-sec">
        <div className="frame craft-intro-inner">
          <p className="craft-intro-text">
            At Murthy Ateliers, craftsmanship is not a selling point — it is the entire point. Every piece is made slowly, by hand, with techniques passed through generations of South Indian goldsmithing tradition.
          </p>
          <div className="ornament" style={{ marginTop:"2rem" }} />
        </div>
      </section>

      <section className="shell craft-process-sec">
        <div className="frame">
          <SectionHeading eyebrow="Five Stages" heading="The Five Stages of Making"
            body="From the first conversation to the moment the piece passes into your hands." />
          <motion.div variants={staggerContainer} {...inView} className="craft-process-grid">
            {processSteps.map((step) => <ProcessStep key={step.step} step={step} />)}
          </motion.div>
        </div>
      </section>

      <section className="shell craft-techniques-sec" style={{ position:"relative", overflow:"hidden" }}>
        <div className="glow-gold-left" />
        <div className="craft-techniques-inner frame">
          <SectionHeading eyebrow="Techniques" heading="The Language of the Bench"
            body="Four defining techniques that give Murthy Ateliers pieces their distinctive character." light />
          <div className="ornament craft-techniques-ornament" />
          <motion.div variants={staggerContainer} {...inView} className="craft-techniques-grid">
            {craftDetails.map((detail) => (
              <motion.article key={detail.title} variants={staggerItem} className="craft-technique-card group">
                <div className="craft-technique-img-wrap">
                  <img src={detail.image} alt={detail.title} className="craft-technique-img" loading="lazy" />
                  <div className="img-fill img-overlay-forest craft-technique-overlay" />
                </div>
                <div className="craft-technique-body">
                  <h3 className="font-display craft-technique-title">{detail.title}</h3>
                  <div className="ornament-sm craft-technique-ornament" />
                  <p className="craft-technique-desc">{detail.body}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="shell craft-atelier-sec">
        <div className="frame craft-atelier-grid">
          <motion.div variants={fadeLeft} {...inView} className="craft-atelier-img-wrap shadow-luxury">
            <img src={img.artisan2} alt="Atelier" className="craft-atelier-img" loading="lazy" />
          </motion.div>
          <motion.div variants={fadeRight} {...inView} className="craft-atelier-text">
            <p className="eyebrow" style={{ color:"var(--crimson)" }}>The Atelier</p>
            <h2 className="display-md" style={{ color:"var(--forest)" }}>Where Memory Becomes Metal</h2>
            <div className="ornament-sm" />
            <p className="craft-atelier-body">
              The atelier is not a factory. It is a space of quiet concentration, where each piece is made one at a time, by hand, with the full attention of the craftsperson.
            </p>
            <p className="craft-atelier-body">
              We work with a small team of master goldsmiths trained in traditional South Indian techniques, ensuring that every piece carries the integrity of that lineage.
            </p>
            <a href={brand.whatsapp} target="_blank" rel="noreferrer" className="btn-primary craft-atelier-cta">
              Begin a Commission <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

