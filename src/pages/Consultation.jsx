import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Mail, MapPin, Phone, CheckCircle, Loader } from "lucide-react";
import { brand } from "../data/content";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItem, inView } from "../utils/motion";
import { sendEmail } from "../utils/emailjs";
import {
  sanitizeText,
  sanitizeMultiline,
  validateName,
  validateEmail,
  validatePhone,
  validateTextField,
  validateTextarea,
  COUNTRY_CODES,
} from "../utils/sanitize";

const consultationSteps = [
  { step: "01", title: "Share Your Story", body: "Tell us about the piece you have in mind — a family memory, a ceremony, or a feeling you want to translate into gold." },
  { step: "02", title: "Design Conversation", body: "We review silhouettes, motif references, and ceremonial context together, refining the direction until it feels right." },
  { step: "03", title: "Craft & Deliver", body: "The piece is made slowly, by hand, and delivered with care advice, styling notes, and space for it to become yours." },
];

const todayStr = new Date().toISOString().split('T')[0];

export default function Consultation() {
  const location = useLocation();
  const prefill  = location.state?.prefill || {};

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending]     = useState(false);
  const [sendError, setSendError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [form, setForm] = useState({
    name:         "",
    email:        "",
    phoneCountry: "+91",
    phone:        "",
    occasion:     prefill.occasion ? sanitizeText(prefill.occasion).slice(0, 120) : "",
    message:      prefill.message  ? sanitizeMultiline(prefill.message).slice(0, 2000) : "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    let clean = value;
    if (name === 'phone') {
      clean = value.replace(/[^\d\s\-\.\(\)]/g, '').slice(0, 15);
    } else if (name === 'name') {
      clean = value.slice(0, 80);
    } else if (name === 'email') {
      clean = value.slice(0, 254).replace(/\s/g, '');
    } else if (name === 'occasion') {
      clean = value.slice(0, 120);
    } else if (name === 'message') {
      clean = value.slice(0, 2000);
    }
    setForm((prev) => ({ ...prev, [name]: clean }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  }

  function validateAll() {
    const errors = {};
    const nameErr = validateName(form.name);
    if (nameErr) errors.name = nameErr;
    const emailErr = validateEmail(form.email);
    if (emailErr) errors.email = emailErr;
    // Phone is optional on consultation page but if filled must be 10 digits
    if (form.phone.trim()) {
      const phoneErr = validatePhone(form.phone);
      if (phoneErr) errors.phone = phoneErr;
    }
    const occasionErr = validateTextField(form.occasion, 'Occasion', { required: false, max: 120 });
    if (occasionErr) errors.occasion = occasionErr;
    const messageErr = validateTextarea(form.message, 'Your Story', { required: true, max: 2000 });
    if (messageErr) errors.message = messageErr;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateAll()) return;

    setSending(true);
    setSendError("");

    const fullPhone = form.phone.trim()
      ? `${form.phoneCountry} ${form.phone.trim()}`
      : '';

    const result = await sendEmail({
      from_name: sanitizeText(form.name),
      from_email: sanitizeText(form.email),
      phone:      sanitizeText(fullPhone),
      occasion:   sanitizeText(form.occasion),
      message:    sanitizeMultiline(form.message),
      to_name:    "Murthy Ateliers",
    });

    setSending(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setSendError("Something went wrong. Please try WhatsApp or email us directly.");
    }
  }

  return (
    <>
      {/* Hero */}
      <section id="page-hero" className="page-hero-sec">
        <img
          src="/jewellry/Web-Optimised/bannerConsult.webp"
          alt="Consultation"
          className="hero-banner-img hero-banner-img--consult"
          fetchPriority="high"
          decoding="async"
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
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs tracking-widest uppercase text-forest/60 mb-2">
                    Your Name <span className="text-crimson">*</span>
                  </label>
                  <input
                    id="name" name="name" type="text" required
                    autoComplete="name"
                    maxLength={80}
                    placeholder="e.g. Shanthi Shankar"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-2xl border bg-cream focus:outline-none focus:ring-2 focus:ring-gold/15 text-forest text-sm placeholder:text-forest/30 transition-all duration-200 ${fieldErrors.name ? 'border-crimson/70' : 'border-gold/25 focus:border-gold/60'}`}
                    aria-describedby={fieldErrors.name ? 'err-name' : undefined}
                  />
                  {fieldErrors.name && <p id="err-name" className="mt-1 text-xs text-crimson" role="alert">{fieldErrors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs tracking-widest uppercase text-forest/60 mb-2">
                    Email Address <span className="text-crimson">*</span>
                  </label>
                  <input
                    id="email" name="email" type="email" required
                    autoComplete="email" inputMode="email"
                    maxLength={254}
                    placeholder="e.g. shanthi@mylapore.com"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-2xl border bg-cream focus:outline-none focus:ring-2 focus:ring-gold/15 text-forest text-sm placeholder:text-forest/30 transition-all duration-200 ${fieldErrors.email ? 'border-crimson/70' : 'border-gold/25 focus:border-gold/60'}`}
                    aria-describedby={fieldErrors.email ? 'err-email' : undefined}
                  />
                  {fieldErrors.email && <p id="err-email" className="mt-1 text-xs text-crimson" role="alert">{fieldErrors.email}</p>}
                </div>

                {/* Phone with country code */}
                <div>
                  <label htmlFor="phone" className="block text-xs tracking-widest uppercase text-forest/60 mb-2">
                    Phone / WhatsApp <span className="text-forest/40 normal-case">(optional)</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="phoneCountry"
                      value={form.phoneCountry}
                      onChange={handleChange}
                      className="px-3 py-4 rounded-2xl border border-gold/25 bg-cream focus:outline-none focus:border-gold/60 text-forest text-sm transition-all duration-200 shrink-0"
                      style={{ width: '23%', minWidth: '80px' }}
                      aria-label="Country code"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                    <input
                      id="phone" name="phone" type="tel"
                      autoComplete="tel-national" inputMode="numeric"
                      maxLength={15}
                      placeholder="10-digit number"
                      value={form.phone}
                      onChange={handleChange}
                      className={`flex-1 px-5 py-4 rounded-2xl border bg-cream focus:outline-none focus:ring-2 focus:ring-gold/15 text-forest text-sm placeholder:text-forest/30 transition-all duration-200 ${fieldErrors.phone ? 'border-crimson/70' : 'border-gold/25 focus:border-gold/60'}`}
                      aria-describedby={fieldErrors.phone ? 'err-phone' : undefined}
                    />
                  </div>
                  {fieldErrors.phone && <p id="err-phone" className="mt-1 text-xs text-crimson" role="alert">{fieldErrors.phone}</p>}
                </div>

                {/* Occasion */}
                <div>
                  <label htmlFor="occasion" className="block text-xs tracking-widest uppercase text-forest/60 mb-2">
                    Occasion or Intent
                  </label>
                  <input
                    id="occasion" name="occasion" type="text"
                    maxLength={120}
                    placeholder="e.g. Bridal, Heirloom redesign, Gift…"
                    value={form.occasion}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-2xl border bg-cream focus:outline-none focus:ring-2 focus:ring-gold/15 text-forest text-sm placeholder:text-forest/30 transition-all duration-200 ${fieldErrors.occasion ? 'border-crimson/70' : 'border-gold/25 focus:border-gold/60'}`}
                    aria-describedby={fieldErrors.occasion ? 'err-occasion' : undefined}
                  />
                  {fieldErrors.occasion && <p id="err-occasion" className="mt-1 text-xs text-crimson" role="alert">{fieldErrors.occasion}</p>}
                </div>

                {/* Message / Your Story */}
                <div>
                  <label htmlFor="message" className="block text-xs tracking-widest uppercase text-forest/60 mb-2 flex justify-between">
                    <span>Your Story <span className="text-crimson">*</span></span>
                    <span className="normal-case text-forest/35 font-normal">{form.message.length}/2000</span>
                  </label>
                  <textarea
                    id="message" name="message" required
                    rows={5}
                    maxLength={2000}
                    placeholder="Share the memory, ceremony, or feeling behind the piece you have in mind…"
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-2xl border bg-cream focus:outline-none focus:ring-2 focus:ring-gold/15 text-forest text-sm placeholder:text-forest/30 transition-all duration-200 resize-none ${fieldErrors.message ? 'border-crimson/70' : 'border-gold/25 focus:border-gold/60'}`}
                    aria-describedby={fieldErrors.message ? 'err-message' : undefined}
                  />
                  {fieldErrors.message && <p id="err-message" className="mt-1 text-xs text-crimson" role="alert">{fieldErrors.message}</p>}
                </div>

                <button type="submit" className="btn-primary w-full justify-center" disabled={sending}>
                  {sending ? (
                    <>
                      <Loader size={14} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Your Story
                      <ArrowUpRight size={14} />
                    </>
                  )}
                </button>

                {sendError && (
                  <p className="text-xs text-crimson text-center mt-2">{sendError}</p>
                )}

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

            {/* Brand name card — same style as navbar logo */}
            <div className="relative overflow-hidden rounded-3xl shadow-luxury bg-crimson flex items-center justify-center" style={{ minHeight: "13rem" }}>
              <div className="glow-consult-brand-card" />
              <div className="relative z-10 flex flex-col items-center gap-2 p-8 text-center">
                <span
                  className="script-brand text-cream whitespace-nowrap"
                  style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", lineHeight: 1 }}
                >
                  Murthy Ateliers by 9th
                </span>
                <div className="ornament mt-3" style={{ width: "120px" }} />
                <p className="eyebrow text-gold/70 mt-1">Heirloom Jewels Crafted to Endure</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
