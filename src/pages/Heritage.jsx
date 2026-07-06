import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { founderStory, brand } from "../data/content";
import { img } from "../data/images";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItem, inView } from "../utils/motion";

const heritagePoints = [
  {
    title: "D.K. Murthy & E.A. Swamy Jewelers",
    body:  "Founded in the heart of Mylapore, Chennai, the original house built its reputation on the trust of families, the integrity of craft, and beauty made to outlast the hands that made it.",
    image: img.mylapore,
  },
  {
    title: "The Legacy of Mylapore",
    body:  "Mylapore is not just a location — it is a living archive of South Indian culture, temple tradition, and artisanal craft. The streets, the sanctums, and the silk have shaped the visual language of our jewelry.",
    image: img.archival,
  },
  {
    title: "Shanthi Shankar",
    body:  "Murthy Ateliers was founded in memory of Shanthi Shankar — jeweller's daughter, a woman of warmth and grace who was still becoming when we lost her. Every piece is her unfinished sentence, continued.",
    image: img.founder,
  },
];

export default function Heritage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        <img
          src={img.mylapore}
          alt="Heritage"
          className="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/50 to-forest/20" />
        <div className="relative z-10 shell pb-14 w-full">
          <div className="frame">
            <motion.p {...fadeUp} className="eyebrow text-gold/70 mb-4">
              Our Heritage
            </motion.p>
            <motion.h1
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-cream"
            >
              Rooted in Mylapore
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Founder story */}
      <section className="shell py-20 sm:py-28">
        <div className="frame grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <motion.div variants={fadeLeft} {...inView} className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-luxury">
              <img
                src={founderStory.image}
                alt="Founder"
                className="w-full h-[520px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:-right-8 card-parchment rounded-2xl p-5 max-w-[200px] shadow-luxury">
              <p className="script-brand text-crimson text-2xl leading-tight">
                {founderStory.blessingTamil}
              </p>
              <p className="mt-2 text-xs tracking-widest uppercase text-forest/50">
                {founderStory.blessingEnglish}
              </p>
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

      {/* Heritage points */}
      <section className="shell py-20 sm:py-24 bg-crimson relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 30%, rgba(211,175,55,0.2) 0%, transparent 50%)",
          }}
        />
        <div className="frame relative z-10">
          <motion.p {...fadeUp} {...inView} className="eyebrow text-gold/70 mb-4">
            Three Pillars of Our Story
          </motion.p>
          <motion.h2
            {...fadeUp}
            {...inView}
            className="display-lg text-cream mb-12"
          >
            Where We Come From
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            {...inView}
            className="space-y-8"
          >
            {heritagePoints.map((point, i) => (
              <motion.div
                key={point.title}
                variants={staggerItem}
                className={`grid gap-6 lg:grid-cols-2 items-center ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div className="relative overflow-hidden rounded-3xl lg:[direction:ltr]">
                  <img
                    src={point.image}
                    alt={point.title}
                    className="w-full h-64 sm:h-80 object-cover"
                    loading="lazy"
                  />
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

      {/* Vision & Mission */}
      <section className="shell py-20 sm:py-28">
        <div className="frame grid gap-8 sm:grid-cols-2">
          {[
            {
              label: "Vision",
              text:  "To create heirloom jewellery that carries memory, meaning, and legacy — where every piece becomes a continuation of craft, culture, and personal history across generations. Murthy Ateliers envisions a world where jewellery is not merely worn, but remembered; where craftsmanship remains intimate, intentional, and deeply human.",
            },
            {
              label: "Mission",
              text:  "To preserve and continue the legacy of timeless South Indian jewellery craftsmanship with integrity and intention. To create meaningful heirloom pieces that carry emotion, memory, and personal stories across generations. To blend traditional artistry with contemporary design, crafting jewellery that is both enduring and deeply personal.",
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={staggerItem}
              {...inView}
              className="card-parchment rounded-3xl p-8 sm:p-10"
            >
              <p className="eyebrow text-crimson mb-4">{item.label}</p>
              <p className="text-base leading-8 text-forest/75">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="shell pb-24">
        <div className="frame text-center">
          <p className="font-display italic text-forest/60 text-xl sm:text-2xl max-w-2xl mx-auto">
            "At its heart, Murthy Ateliers believes that some things are not made — they are continued."
          </p>
          <div className="ornament mt-8 mb-8 max-w-xs mx-auto" />
          <Link to="/consultation" className="btn-primary inline-flex">
            Begin Your Story
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
