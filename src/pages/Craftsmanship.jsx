import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        <img
          src={img.artisan1}
          alt="Craftsmanship"
          className="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/50 to-forest/20" />
        <div className="relative z-10 shell pb-14 w-full">
          <div className="frame">
            <motion.p {...fadeUp} className="eyebrow text-gold/70 mb-4">
              The Making of an Heirloom
            </motion.p>
            <motion.h1
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-cream"
            >
              Craft as Continuity
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="shell py-16">
        <div className="frame max-w-3xl">
          <p className="text-base sm:text-lg leading-8 text-forest/70">
            At Murthy Ateliers, craftsmanship is not a selling point — it is the entire point. Every piece is made slowly, by hand, with techniques passed through generations of South Indian goldsmithing tradition.
          </p>
          <div className="ornament mt-8" />
        </div>
      </section>

      {/* Process timeline */}
      <section className="shell pb-24">
        <div className="frame">
          <SectionHeading
            eyebrow="Five Stages"
            heading="The Five Stages of Making"
            body="From the first conversation to the moment the piece passes into your hands."
          />
          <motion.div
            variants={staggerContainer}
            {...inView}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
          >
            {processSteps.map((step) => (
              <ProcessStep key={step.step} step={step} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Craft techniques */}
      <section className="shell py-24 bg-crimson relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(211,175,55,0.2) 0%, transparent 50%)",
          }}
        />
        <div className="frame relative z-10">
          <SectionHeading
            eyebrow="Techniques"
            heading="The Language of the Bench"
            body="Four defining techniques that give Murthy Ateliers pieces their distinctive character."
            light
          />
          <div className="ornament mt-10 mb-12 opacity-30" />
          <motion.div
            variants={staggerContainer}
            {...inView}
            className="grid gap-6 sm:grid-cols-2"
          >
            {craftDetails.map((detail) => (
              <motion.article
                key={detail.title}
                variants={staggerItem}
                className="group relative overflow-hidden rounded-3xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={detail.image}
                    alt={detail.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 img-overlay-forest opacity-60" />
                </div>
                <div className="p-6 bg-crimson/80 border border-gold/10 rounded-b-3xl -mt-1">
                  <h3 className="font-display text-cream text-2xl">{detail.title}</h3>
                  <div className="ornament-sm mt-3 mb-3 opacity-60" />
                  <p className="text-sm leading-7 text-cream/65">{detail.body}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Atelier imagery */}
      <section className="shell py-24">
        <div className="frame grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <motion.div variants={fadeLeft} {...inView} className="relative overflow-hidden rounded-3xl shadow-luxury">
            <img
              src={img.artisan2}
              alt="Atelier"
              className="w-full h-[480px] object-cover"
              loading="lazy"
            />
          </motion.div>
          <motion.div variants={fadeRight} {...inView} className="space-y-6">
            <p className="eyebrow text-crimson">The Atelier</p>
            <h2 className="display-md text-forest">Where Memory Becomes Metal</h2>
            <div className="ornament-sm" />
            <p className="text-base leading-8 text-forest/70">
              The atelier is not a factory. It is a space of quiet concentration, where each piece is made one at a time, by hand, with the full attention of the craftsperson.
            </p>
            <p className="text-base leading-8 text-forest/70">
              We work with a small team of master goldsmiths trained in traditional South Indian techniques, ensuring that every piece carries the integrity of that lineage.
            </p>
            <a
              href={brand.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 btn-primary"
            >
              Begin a Commission
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
