import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { collections, brand } from "../data/content";
import { fadeUp, staggerContainer, staggerItem, inView, scaleIn } from "../utils/motion";

export default function Collections() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        <img
          src={collections[0].image}
          alt="Collections"
          className="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/50 to-forest/20" />
        <div className="relative z-10 shell pb-14 w-full">
          <div className="frame">
            <motion.p {...fadeUp} className="eyebrow text-gold/70 mb-4">
              Signature Collections
            </motion.p>
            <motion.h1
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-cream"
            >
              Five Worlds of Heirloom Jewelry
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="shell py-16">
        <div className="frame max-w-3xl">
          <p className="text-base sm:text-lg leading-8 text-forest/70">
            Each collection at Murthy Ateliers is a distinct emotional and visual universe — not a catalogue of products, but a curated world of meaning. Browse, inquire, and begin a conversation.
          </p>
          <div className="ornament mt-8" />
        </div>
      </section>

      {/* Collections grid */}
      <section className="shell pb-24">
        <div className="frame space-y-24">
          {collections.map((col, i) => (
            <motion.article
              key={col.id}
              id={col.id}
              variants={staggerContainer}
              {...inView}
              className={`grid gap-8 lg:grid-cols-2 items-center ${
                i % 2 === 1 ? "lg:[direction:rtl]" : ""
              }`}
            >
              {/* Image */}
              <motion.div
                variants={staggerItem}
                className="relative overflow-hidden rounded-3xl shadow-luxury lg:[direction:ltr]"
              >
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-[420px] sm:h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 img-overlay-dark opacity-20" />
                {/* Accent image */}
                <div className="absolute bottom-5 right-5 w-28 h-28 rounded-2xl overflow-hidden border-2 border-gold/30 shadow-gold">
                  <img src={col.accent} alt="" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Text */}
              <motion.div variants={staggerItem} className="lg:[direction:ltr] space-y-5">
                <p className="eyebrow text-crimson">{col.name}</p>
                <h2 className="display-md text-forest">{col.tagline}</h2>
                <div className="ornament-sm" />
                <p className="text-base leading-8 text-forest/70">{col.story}</p>
                <a
                  href={brand.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 btn-primary mt-2"
                >
                  Request Details
                  <ArrowUpRight size={14} />
                </a>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="shell pb-24">
        <div className="frame">
          <motion.div
            variants={scaleIn}
            {...inView}
            className="relative overflow-hidden rounded-3xl bg-crimson p-10 sm:p-16 text-center"
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 50%, rgba(211,175,55,0.3) 0%, transparent 60%)",
              }}
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
