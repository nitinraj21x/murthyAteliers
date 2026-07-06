import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Mail, MapPin, Phone, CheckCircle } from "lucide-react";
import { brand } from "../data/content";
import { img } from "../data/images";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItem, inView } from "../utils/motion";

const consultationSteps = [
  { step: "01", title: "Share Your Story", body: "Tell us about the piece you have in mind — a family memory, a ceremony, or a feeling you want to translate into gold." },
  { step: "02", title: "Design Conversation", body: "We review silhouettes, motif references, and ceremonial context together, refining the direction until it feels right." },
  { step: "03", title: "Craft & Deliver", body: "The piece is made slowly, by hand, and delivered with care advice, styling notes, and space for it to become yours." },
];

export default function Consultation() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", occasion: "", message: "",
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // In production this would POST to a backend / email service
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
        <img
          src={img.consultation}
          alt="Consultation"
          className="absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/50 to-forest/20" />
        <div className="relative z-10 shell pb-14 w-full">
          <div className="frame">
            <motion.p {...fadeUp} className="eyebrow text-gold/70 mb-4">
              Create Something Personal
            </motion.p>
            <motion.h1
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-cream"
            >
              Begin Your Consultation
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="shell py-16 bg-cream-dark">
        <div className="frame">
          <motion.div
            variants={staggerContainer}
            {...inView}
            className="grid gap-6 sm:grid-cols-3"
          >
            {consultationSteps.map((step) => (
              <motion.div key={step.step} variants={staggerItem} className="card-parchment rounded-3xl p-7">
                <span className="font-display text-gold/50 text-5xl leading-none">{step.step}</span>
                <h3 className="font-display text-forest text-2xl mt-4">{step.title}</h3>
                <div className="ornament-sm mt-3 mb-3" />
                <p className="text-sm leading-7 text-forest/65">{step.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main content: form + contact */}
      <section className="shell py-20 sm:py-28">
        <div className="frame grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">

          {/* Form */}
          <motion.div variants={fadeLeft} {...inView}>
            <p className="eyebrow text-crimson mb-4">Inquiry Form</p>
            <h2 className="display-md text-forest mb-8">Tell Us Your Story</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-parchment rounded-3xl p-10 text-center"
              >
                <CheckCircle size={40} className="text-forest mx-auto mb-4" />
                <h3 className="font-display text-forest text-2xl mb-3">Thank you, {form.name}.</h3>
                <p className="text-sm leading-7 text-forest/65">
                  We've received your inquiry and will be in touch within 2–3 working days to begin the conversation.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: "name",    label: "Your Name",         type: "text",  required: true },
                  { name: "email",   label: "Email Address",     type: "email", required: true },
                  { name: "phone",   label: "Phone / WhatsApp",  type: "tel",   required: false },
                  { name: "occasion",label: "Occasion or Intent",type: "text",  required: false, placeholder: "e.g. Bridal, Heirloom redesign, Gift…" },
                ].map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="block text-xs tracking-widest uppercase text-forest/60 mb-2"
                    >
                      {field.label} {field.required && <span className="text-crimson">*</span>}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder || ""}
                      value={form[field.name]}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl border border-gold/25 bg-cream focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/15 text-forest text-sm placeholder:text-forest/30 transition-all duration-200"
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs tracking-widest uppercase text-forest/60 mb-2"
                  >
                    Your Story <span className="text-crimson">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Share the memory, ceremony, or feeling behind the piece you have in mind…"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl border border-gold/25 bg-cream focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/15 text-forest text-sm placeholder:text-forest/30 transition-all duration-200 resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  Send Your Story
                  <ArrowUpRight size={14} />
                </button>

                <p className="text-xs text-forest/40 text-center">
                  No pricing is discussed until we understand your vision fully.
                </p>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div variants={fadeRight} {...inView} className="space-y-8">
            <div>
              <p className="eyebrow text-crimson mb-4">Or Reach Us Directly</p>
              <h2 className="display-md text-forest mb-6">We'd Love to Hear From You</h2>
              <p className="text-sm leading-7 text-forest/65">
                Private consultations are encouraged so conversations around family jewelry, ceremonies, and design direction can happen with care and focus.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: MessageCircle, label: "WhatsApp",  value: brand.phone,     href: brand.whatsapp, external: true },
                { icon: Mail,          label: "Email",     value: brand.email,     href: `mailto:${brand.email}`, external: true },
                { icon: Phone,         label: "Phone",     value: brand.phone,     href: `tel:${brand.phone}`, external: true },
                { icon: MapPin,        label: "Location",  value: brand.address,   href: brand.mapLink, external: true },
              ].map(({ icon: Icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="flex items-start gap-4 card-parchment rounded-2xl p-5 hover:border-gold/40 transition-all duration-200 group"
                >
                  <span className="flex items-center justify-center h-10 w-10 rounded-full bg-crimson/8 text-crimson shrink-0 group-hover:bg-crimson group-hover:text-cream transition-all duration-200">
                    <Icon size={16} />
                  </span>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-forest/50 mb-0.5">{label}</p>
                    <p className="text-sm text-forest">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-luxury">
              <img
                src={img.velvetTray}
                alt="Atelier"
                className="w-full h-52 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 img-overlay-dark opacity-30" />
              <div className="absolute inset-0 flex items-end p-6">
                <p className="font-display italic text-cream text-lg">
                  "Every piece begins with a conversation."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
