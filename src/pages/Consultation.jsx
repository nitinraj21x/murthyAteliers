import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Mail, MapPin, Phone, CheckCircle, Loader } from "lucide-react";
import { brand } from "../data/content";
import { fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItem, inView } from "../utils/motion";
import { sendEmail } from "../utils/emailjs";
import PhoneInput from "../components/PhoneInput";
import {
  sanitizeText,
  sanitizeMultiline,
  validateName,
  validateEmail,
  validatePhone,
  validateTextField,
  validateTextarea,
} from "../utils/sanitize";

const consultationSteps = [
  { step: "01", title: "Share Your Story", body: "Tell us about the piece you have in mind — a family memory, a ceremony, or a feeling you want to translate into gold." },
  { step: "02", title: "Design Conversation", body: "We review silhouettes, motif references, and ceremonial context together, refining the direction until it feels right." },
  { step: "03", title: "Craft & Deliver", body: "The piece is made slowly, by hand, and delivered with care advice, styling notes, and space for it to become yours." },
];

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
      clean = value.slice(0, 60);
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
      <Helmet>
        <title>Begin Your Consultation — Murthy Ateliers</title>
        <meta name="description" content="Start a private consultation with Murthy Ateliers. Share your story — a family memory, ceremony, or feeling — and we will craft an heirloom piece made entirely for you." />
      </Helmet>

      {/* Hero */}
      <section id="page-hero" className="page-hero-sec">
        <img src="/jewellry/Web-Optimised/bannerConsult.webp" alt="Consultation"
          className="hero-banner-img hero-banner-img--consult" fetchPriority="high" decoding="async" />
        <div className="gradient-hero-overlay-dark page-hero-gradient" />
        <div className="page-hero-content shell">
          <div className="frame">
            <motion.p {...fadeUp} className="eyebrow" style={{ color: "rgba(211,175,55,0.70)", marginBottom: "1rem" }}>
              Create Something Personal
            </motion.p>
            <motion.h1 {...fadeUp} transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl" style={{ color: "var(--cream)" }}>
              Begin Your Consultation
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="shell consult-steps-sec">
        <div className="frame">
          <motion.div variants={staggerContainer} {...inView} className="consult-steps-grid">
            {consultationSteps.map((step) => (
              <motion.div key={step.step} variants={staggerItem} className="card-parchment consult-step-card">
                <span className="font-display consult-step-num">{step.step}</span>
                <h3 className="font-display consult-step-title">{step.title}</h3>
                <div className="ornament-sm consult-step-ornament" />
                <p className="consult-step-body">{step.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main content: form + contact */}
      <section className="shell consult-main-sec">
        <div className="frame consult-main-grid">

          {/* Form */}
          <motion.div variants={fadeLeft} {...inView}>
            <p className="eyebrow" style={{ color: "var(--crimson)", marginBottom: "1rem" }}>Inquiry Form</p>
            <h2 className="display-md" style={{ color: "var(--forest)", marginBottom: "2rem" }}>Tell Us Your Story</h2>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="card-parchment consult-success">
                <CheckCircle size={40} className="consult-success-icon" />
                <h3 className="font-display consult-success-title">Thank you, {form.name}.</h3>
                <p className="consult-success-body">
                  We've received your inquiry and will be in touch within 2–3 working days to begin the conversation.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="consult-form" noValidate>

                {/* Name */}
                <div className="form-field">
                  <label htmlFor="name" className="form-field-label">
                    Your Name <span className="form-required">*</span>
                  </label>
                  <input id="name" name="name" type="text" required autoComplete="name" maxLength={60}
                    placeholder="e.g. Shanthi Shankar" value={form.name} onChange={handleChange}
                    className={`form-input-field${fieldErrors.name ? " form-input-field--error" : ""}`}
                    aria-describedby={fieldErrors.name ? "err-name" : undefined} />
                  {fieldErrors.name && <p id="err-name" className="form-field-error" role="alert">{fieldErrors.name}</p>}
                </div>

                {/* Email */}
                <div className="form-field">
                  <label htmlFor="email" className="form-field-label">
                    Email Address <span className="form-required">*</span>
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" inputMode="email"
                    maxLength={254} placeholder="e.g. shanthi@mylapore.com" value={form.email} onChange={handleChange}
                    className={`form-input-field${fieldErrors.email ? " form-input-field--error" : ""}`}
                    aria-describedby={fieldErrors.email ? "err-email" : undefined} />
                  {fieldErrors.email && <p id="err-email" className="form-field-error" role="alert">{fieldErrors.email}</p>}
                </div>

                {/* Phone */}
                <div className="form-field">
                  <label htmlFor="phone" className="form-field-label">
                    Phone / WhatsApp <span className="form-field-optional">(optional)</span>
                  </label>
                  <PhoneInput
                    countryValue={form.phoneCountry}
                    phoneValue={form.phone}
                    onCountryChange={handleChange}
                    onPhoneChange={handleChange}
                    error={fieldErrors.phone}
                  />
                  {fieldErrors.phone && <p id="err-phone" className="form-field-error" role="alert">{fieldErrors.phone}</p>}
                </div>

                {/* Occasion */}
                <div className="form-field">
                  <label htmlFor="occasion" className="form-field-label">Occasion or Intent</label>
                  <input id="occasion" name="occasion" type="text" maxLength={120}
                    placeholder="e.g. Bridal, Heirloom redesign, Gift…" value={form.occasion} onChange={handleChange}
                    className={`form-input-field${fieldErrors.occasion ? " form-input-field--error" : ""}`}
                    aria-describedby={fieldErrors.occasion ? "err-occasion" : undefined} />
                  {fieldErrors.occasion && <p id="err-occasion" className="form-field-error" role="alert">{fieldErrors.occasion}</p>}
                </div>

                {/* Message */}
                <div className="form-field">
                  <label htmlFor="message" className="form-field-label form-field-label--row">
                    <span>Your Story <span className="form-required">*</span></span>
                    <span className="form-char-count">{form.message.length}/2000</span>
                  </label>
                  <textarea id="message" name="message" required rows={5} maxLength={2000}
                    placeholder="Share the memory, ceremony, or feeling behind the piece you have in mind…"
                    value={form.message} onChange={handleChange}
                    className={`form-input-field form-textarea${fieldErrors.message ? " form-input-field--error" : ""}`}
                    aria-describedby={fieldErrors.message ? "err-message" : undefined} />
                  {fieldErrors.message && <p id="err-message" className="form-field-error" role="alert">{fieldErrors.message}</p>}
                </div>

                <button type="submit" className="btn-primary consult-submit" disabled={sending}>
                  {sending ? (<><Loader size={14} className="consult-spinner" />Sending…</>) : (<>Send Your Story <ArrowUpRight size={14} /></>)}
                </button>
                {sendError && <p className="consult-send-error" role="alert">{sendError}</p>}
                <p className="consult-disclaimer">No pricing is discussed until we understand your vision fully.</p>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div variants={fadeRight} {...inView} className="consult-contact">
            <div>
              <p className="eyebrow" style={{ color: "var(--crimson)", marginBottom: "1rem" }}>Or Reach Us Directly</p>
              <h2 className="display-md" style={{ color: "var(--forest)", marginBottom: "1.5rem" }}>We'd Love to Hear From You</h2>
              <p className="consult-contact-intro">
                Private consultations are encouraged so conversations around family jewelry, ceremonies, and design direction can happen with care and focus.
              </p>
            </div>

            <div className="consult-contact-links">
              {[
                { icon: MessageCircle, label: "WhatsApp", value: brand.phone,   href: brand.whatsapp, external: true },
                { icon: Mail,          label: "Email",    value: brand.email,   href: `mailto:${brand.email}`, external: true },
                { icon: Phone,         label: "Phone",    value: brand.phone,   href: `tel:${brand.phone}`, external: true },
                { icon: MapPin,        label: "Location", value: brand.address, href: brand.mapLink, external: true },
              ].map(({ icon: Icon, label, value, href, external }) => (
                <a key={label} href={href} target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined} className="consult-contact-item card-parchment group">
                  <span className="consult-contact-icon">
                    <Icon size={16} />
                  </span>
                  <div>
                    <p className="consult-contact-label">{label}</p>
                    <p className="consult-contact-value">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="consult-brand-card shadow-luxury">
              <div className="glow-consult-brand-card" />
              <div className="consult-brand-inner">
                <span className="script-brand" style={{ fontSize: "clamp(1.8rem,5vw,2.8rem)", lineHeight: 1, color: "var(--cream)" }}>
                  Murthy Ateliers by 9th
                </span>
                <div className="ornament" style={{ width: "120px", marginTop: "0.75rem" }} />
                <p className="eyebrow" style={{ color: "rgba(211,175,55,0.70)", marginTop: "0.25rem" }}>
                  Heirloom Jewels Crafted to Endure
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

