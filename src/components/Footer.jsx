import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { sendEmail } from "../utils/emailjs";
import PhoneInput from "./PhoneInput";
import LeadProtection from "./LeadProtection";
import useLeadForm from "../hooks/useLeadForm";
import {
  sanitizeText,
  sanitizeMultiline,
  validateName,
  validateEmail,
  validatePhone,
  validateTextarea,
} from "../utils/sanitize";

// Allowed service values - used to reject spoofed submissions
const ALLOWED_SERVICES = [
  "Consultation",
  "Bespoke Design",
  "Heirloom Redesign",
  "Inquiry",
  "Share Story",
  "Bespoke Consultation",
  "Redesign Consultation",
];

// Today's date string for min-date on date picker
const todayStr = new Date().toISOString().split("T")[0];

const INITIAL_BOOKING_FORM = {
  name: "",
  email: "",
  phoneCountry: "+91",
  phone: "",
  service: "Consultation",
  date: "",
  notes: "",
};

function normalizeBookingValue(name, value) {
  let clean = value;
  if (name === "phone") {
    clean = value.replace(/[^\d\s().-]/g, "").slice(0, 15);
  } else if (name === "notes") {
    clean = value.slice(0, 2000);
  } else if (name === "name") {
    clean = value.slice(0, 80);
  } else if (name === "email") {
    clean = value.slice(0, 254).replace(/\s/g, "");
  } else if (name === "date") {
    clean = value;
  }

  return clean;
}

function validateBookingValues(values) {
  const errors = {};

  const nameErr = validateName(values.name);
  if (nameErr) errors.name = nameErr;

  const emailErr = validateEmail(values.email);
  if (emailErr) errors.email = emailErr;

  const phoneErr = validatePhone(values.phone);
  if (phoneErr) errors.phone = phoneErr;

  const notesErr = validateTextarea(values.notes, "Narrative", { required: false, max: 2000 });
  if (notesErr) errors.notes = notesErr;

  if (values.date && values.date < todayStr) {
    errors.date = "Please choose today or a future date.";
  }

  return errors;
}

function buildBookingPayload(values) {
  const fullPhone = `${values.phoneCountry} ${values.phone.trim()}`;
  return {
    from_name: sanitizeText(values.name),
    from_email: sanitizeText(values.email),
    phone: sanitizeText(fullPhone),
    service: sanitizeText(values.service),
    preferred_date: sanitizeText(values.date),
    notes: sanitizeMultiline(values.notes),
    message: sanitizeMultiline(values.notes),
    to_name: "Murthy Ateliers",
  };
}

export default function Footer() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const {
    form: bookingForm,
    setForm: setBookingForm,
    fieldErrors,
    setFieldErrors,
    sending: bookingSending,
    sendError: bookingError,
    setSendError: setBookingError,
    submitted: bookingSuccess,
    setSubmitted: setBookingSuccess,
    handleChange: handleInputChange,
    handleSubmit: handleFormSubmit,
  } = useLeadForm({
    initialValues: INITIAL_BOOKING_FORM,
    normalizeValue: normalizeBookingValue,
    validateValues: validateBookingValues,
    buildPayload: buildBookingPayload,
    submit: sendEmail,
    defaultError: "Something went wrong. Please reach us directly via WhatsApp or email.",
  });

  const openBookingModal = useCallback((serviceType = "Consultation", notesPrefill = "") => {
    const service = ALLOWED_SERVICES.includes(serviceType) ? serviceType : "Consultation";
    setBookingForm({
      ...INITIAL_BOOKING_FORM,
      service,
      notes: sanitizeMultiline(notesPrefill).slice(0, 2000),
    });
    setFieldErrors({});
    setBookingSuccess(false);
    setBookingError("");
    setIsBookingOpen(true);
  }, [setBookingError, setBookingSuccess, setBookingForm, setFieldErrors]);

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setBookingSuccess(false);
    setBookingError("");
    setFieldErrors({});
  };

  useEffect(() => {
    const handleGlobalOpen = (e) => {
      openBookingModal(e.detail?.service || "Consultation", e.detail?.notes || "");
    };
    window.addEventListener("open-booking-modal", handleGlobalOpen);
    return () => window.removeEventListener("open-booking-modal", handleGlobalOpen);
  }, [openBookingModal]);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <span className="footer-logo-main">Murthy Ateliers by 9th</span>
              <span className="footer-logo-sub">Heirloom Jewels</span>
              <p className="footer-desc">
                A contemporary heirloom jewelry house rooted in the legacy of Swamy Jewelers, Mylapore, Chennai. Crafting jewelry designed not only to adorn, but to endure.
              </p>
            </div>

            {/* Our Services */}
            <div>
              <h4 className="footer-title">Our Services</h4>
              <ul className="footer-links">
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openBookingModal("Bespoke Consultation", "I would like to inquire about bespoke custom orders.");
                    }}
                  >
                    Custom Orders
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openBookingModal("Redesign Consultation", "I would like to inquire about redesigning family heirloom jewelry.");
                    }}
                  >
                    Heirloom Redesign
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openBookingModal("Consultation", "I would like to book a private viewing.");
                    }}
                  >
                    Atelier Viewing
                  </a>
                </li>
                <li>
                  <Link to="/journal" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    Care Guide
                  </Link>
                </li>
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h4 className="footer-title">Explore</h4>
              <ul className="footer-links">
                <li><Link to="/#story">Our Story</Link></li>
                <li><Link to="/collections">Collections</Link></li>
                <li><Link to="/craftsmanship">The Process</Link></li>
                <li><Link to="/journal">Atelier Journal</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="footer-title">Contact &amp; Location</h4>
              <ul className="footer-contact">
                <li><strong>Location:</strong> Mylapore, Chennai, Tamil Nadu, India (By Appointment Only)</li>
                <li><strong>Email:</strong> contact@murthyateliers.com</li>
                <li><strong>WhatsApp / Call:</strong> +91 98410 24790</li>
              </ul>
              <div className="footer-socials">
                <a
                  href={`https://www.instagram.com/${"murthyateliers"}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>

                <a
                  href="https://wa.me/919841024790"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div>
              &copy; {new Date().getFullYear()} Murthy Ateliers. All Rights Reserved.
            </div>
            <div className="footer-bottom-line">
              Murthy Ateliers - Heirloom Jewels Crafted to Endure
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Dialog Modal (Global) */}
      {isBookingOpen && (
        <div className="modal-backdrop" onClick={closeBookingModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeBookingModal} aria-label="Close Booking Dialog">
              <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
            </button>

            <div className="modal-body">
              {!bookingSuccess ? (
                <>
                  <div className="modal-header">
                    <span className="section-subtitle">Private Consultation</span>
                    <h3 className="modal-title">Begin Your <span>Legacy</span></h3>
                    <p className="modal-sub">
                      Please share your details. Vidya or our senior design team will reach out directly to arrange an appointment.
                    </p>
                  </div>

                  <form className="modal-form" onSubmit={handleFormSubmit} noValidate>
                    {/* Full Name */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="booking-name">Your Full Name *</label>
                      <input
                        type="text"
                        id="booking-name"
                        name="name"
                        required
                        autoComplete="name"
                        className={`form-input${fieldErrors.name ? " form-input-error" : ""}`}
                        placeholder="e.g. Shanthi Shankar"
                        value={bookingForm.name}
                        onChange={handleInputChange}
                        maxLength={80}
                        aria-describedby={fieldErrors.name ? "booking-name-err" : undefined}
                      />
                      {fieldErrors.name && (
                        <span id="booking-name-err" className="form-field-error" role="alert">{fieldErrors.name}</span>
                      )}
                    </div>

                    <div className="form-row">
                      {/* Email */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="booking-email">Email Address *</label>
                        <input
                          type="email"
                          id="booking-email"
                          name="email"
                          required
                          autoComplete="email"
                          inputMode="email"
                          className={`form-input${fieldErrors.email ? " form-input-error" : ""}`}
                          placeholder="e.g. shanthi@mylapore.com"
                          value={bookingForm.email}
                          onChange={handleInputChange}
                          maxLength={254}
                          aria-describedby={fieldErrors.email ? "booking-email-err" : undefined}
                        />
                        {fieldErrors.email && (
                          <span id="booking-email-err" className="form-field-error" role="alert">{fieldErrors.email}</span>
                        )}
                      </div>

                      {/* Phone with country code */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="booking-phone">Phone / WhatsApp *</label>
                        <PhoneInput
                          countryValue={bookingForm.phoneCountry}
                          phoneValue={bookingForm.phone}
                          onCountryChange={handleInputChange}
                          onPhoneChange={handleInputChange}
                          error={fieldErrors.phone}
                          inputClass="form-input"
                          errorClass="form-input-error"
                          inputId="booking-phone"
                        />
                        {fieldErrors.phone && (
                          <span id="err-booking-phone" className="form-field-error" role="alert">{fieldErrors.phone}</span>
                        )}
                      </div>
                    </div>

                    <div className="form-row">
                      {/* Service */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="booking-service">Service / Collection Interest</label>
                        <select
                          id="booking-service"
                          name="service"
                          className="form-input"
                          value={bookingForm.service}
                          onChange={handleInputChange}
                        >
                          <option value="Consultation">Atelier Consultation</option>
                          <option value="Bespoke Design">Bespoke Legacies (Custom)</option>
                          <option value="Heirloom Redesign">Heirloom Redesign</option>
                          <option value="Inquiry">Collection Inquiry</option>
                          <option value="Share Story">Share Story</option>
                        </select>
                      </div>

                      {/* Preferred date - must be today or future */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="booking-date">Preferred Date</label>
                        <input
                          type="date"
                          id="booking-date"
                          name="date"
                          className={`form-input${fieldErrors.date ? " form-input-error" : ""}`}
                          value={bookingForm.date}
                          onChange={handleInputChange}
                          min={todayStr}
                          aria-describedby={fieldErrors.date ? "booking-date-err" : undefined}
                        />
                        {fieldErrors.date && (
                          <span id="booking-date-err" className="form-field-error" role="alert">{fieldErrors.date}</span>
                        )}
                      </div>
                    </div>

                    {/* Notes / narrative */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="booking-notes">
                        Narrative &amp; Preferences
                        <span className="form-char-count">{bookingForm.notes.length}/2000</span>
                      </label>
                      <textarea
                        id="booking-notes"
                        name="notes"
                        className={`form-input${fieldErrors.notes ? " form-input-error" : ""}`}
                        placeholder="Please share any design ideas, ancestral gold details, or specific pieces you would like to discuss..."
                        value={bookingForm.notes}
                        onChange={handleInputChange}
                        maxLength={2000}
                        rows={4}
                        aria-describedby={fieldErrors.notes ? "booking-notes-err" : undefined}
                      />
                      {fieldErrors.notes && (
                        <span id="booking-notes-err" className="form-field-error" role="alert">{fieldErrors.notes}</span>
                      )}
                    </div>

                    <LeadProtection />
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ marginTop: "1rem", width: "100%" }}
                      disabled={bookingSending}
                    >
                      {bookingSending ? "Sending..." : "Request Appointment"}
                    </button>

                    {bookingError && (
                      <p style={{ color: "var(--color-dark-red)", fontSize: "0.8rem", textAlign: "center", marginTop: "0.5rem" }} role="alert">
                        {bookingError}
                      </p>
                    )}
                  </form>
                </>
              ) : (
                <div className="modal-success-state" style={{ textAlign: "center" }}>
                  <div className="success-icon">
                    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                  </div>
                  <h3 className="success-title">வாழ்க வளமுடன்</h3>
                  <p className="success-desc">
                    Thank you for sharing your story, <strong>{sanitizeText(bookingForm.name)}</strong>. We have received your request for a {bookingForm.service === "Consultation" ? "private consultation" : bookingForm.service.toLowerCase()}.
                  </p>
                  <p className="success-desc" style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                    Vidya or our senior atelier curator will review your details and contact you via WhatsApp/Email within 24 hours to coordinate dates.
                  </p>
                  <button className="btn btn-secondary" onClick={closeBookingModal} style={{ marginTop: "1rem" }}>
                    Return to Atelier
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
