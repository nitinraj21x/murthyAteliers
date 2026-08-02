import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

// Allowed service values — used to reject spoofed submissions
const ALLOWED_SERVICES = [
  'Consultation',
  'Bespoke Design',
  'Heirloom Redesign',
  'Inquiry',
  'Share Story',
  'Bespoke Consultation',
  'Redesign Consultation',
];

// Today's date string for min-date on date picker
const todayStr = new Date().toISOString().split('T')[0];

export default function Footer() {
  // ── Modal open / status states ──────────────────────────────────────────
  const [isBookingOpen, setIsBookingOpen]   = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingSending, setBookingSending] = useState(false);
  const [bookingError, setBookingError]     = useState("");

  // ── Form field values ───────────────────────────────────────────────────
  const [bookingForm, setBookingForm] = useState({
    name: '', email: '', phoneCountry: '+91', phone: '',
    service: 'Consultation', date: '', notes: '',
  });

  // ── Per-field validation errors ─────────────────────────────────────────
  const [fieldErrors, setFieldErrors] = useState({});

  // ── Helpers ─────────────────────────────────────────────────────────────
  const openBookingModal = (serviceType = 'Consultation', notesPrefill = '') => {
    const service = ALLOWED_SERVICES.includes(serviceType) ? serviceType : 'Consultation';
    setBookingForm({
      name: '', email: '', phoneCountry: '+91', phone: '',
      service, date: '', notes: sanitizeMultiline(notesPrefill).slice(0, 2000),
    });
    setFieldErrors({});
    setBookingSuccess(false);
    setBookingError("");
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setBookingSuccess(false);
    setBookingError("");
    setFieldErrors({});
  };

  // Generic change handler with per-field sanitization
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let clean = value;
    if (name === 'phone') {
      // Allow only digits, spaces, hyphens, dots, parentheses
      clean = value.replace(/[^\d\s\-\.\(\)]/g, '').slice(0, 15);
    } else if (name === 'notes') {
      clean = value.slice(0, 2000); // hard cap; sanitize on submit
    } else if (name === 'name') {
      clean = value.slice(0, 80);
    } else if (name === 'email') {
      clean = value.slice(0, 254).replace(/\s/g, '');
    } else if (name === 'date') {
      // Keep as-is; validated below
      clean = value;
    }

    setBookingForm((prev) => ({ ...prev, [name]: clean }));

    // Clear the error for this field as the user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Validate all fields; return true if valid
  const validateAll = () => {
    const errors = {};

    const nameErr = validateName(bookingForm.name);
    if (nameErr) errors.name = nameErr;

    const emailErr = validateEmail(bookingForm.email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validatePhone(bookingForm.phone);
    if (phoneErr) errors.phone = phoneErr;

    const notesErr = validateTextarea(bookingForm.notes, 'Narrative', { required: false, max: 2000 });
    if (notesErr) errors.notes = notesErr;

    // Date: must be today or future (if provided)
    if (bookingForm.date && bookingForm.date < todayStr) {
      errors.date = 'Please choose today or a future date.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setBookingSending(true);
    setBookingError("");

    const fullPhone = `${bookingForm.phoneCountry} ${bookingForm.phone.trim()}`;

    const result = await sendEmail({
      from_name:      sanitizeText(bookingForm.name),
      from_email:     sanitizeText(bookingForm.email),
      phone:          sanitizeText(fullPhone),
      service:        sanitizeText(bookingForm.service),
      preferred_date: sanitizeText(bookingForm.date),
      notes:          sanitizeMultiline(bookingForm.notes),
      message:        sanitizeMultiline(bookingForm.notes),
      to_name:        "Murthy Ateliers",
    });

    setBookingSending(false);

    if (result.success) {
      setBookingSuccess(true);
    } else {
      setBookingError("Something went wrong. Please reach us directly via WhatsApp or email.");
    }
  };

  useEffect(() => {
    const handleGlobalOpen = (e) => {
      openBookingModal(e.detail?.service || 'Consultation', e.detail?.notes || '');
    };
    window.addEventListener('open-booking-modal', handleGlobalOpen);
    return () => window.removeEventListener('open-booking-modal', handleGlobalOpen);
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="footer-logo-main">Murthy Ateliers by 9th</span>
              <span className="footer-logo-sub">Heirloom Jewels</span>
              <p className="footer-desc" style={{ marginTop: '1rem' }}>
                A contemporary heirloom jewelry house rooted in the legacy of Swamy Jewelers, Mylapore, Chennai. Crafting jewelry designed not only to adorn, but to endure.
              </p>
            </div>

            <div>
              <h4 className="footer-title">Our Services</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); openBookingModal('Bespoke Consultation', 'I would like to inquire about bespoke custom orders.'); }}>
                    Custom Orders
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); openBookingModal('Redesign Consultation', 'I would like to inquire about redesigning family heirloom jewelry.'); }}>
                    Heirloom Redesign
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); openBookingModal('Consultation', 'I would like to book a private viewing.'); }}>
                    Atelier Viewing
                  </a>
                </li>
                <li>
                  <Link to="/journal" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    Care Guide
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Explore</h4>
              <ul className="footer-links">
                <li><Link to="/#story">Our Story</Link></li>
                <li><Link to="/collections">Collections</Link></li>
                <li><Link to="/craftsmanship">The Process</Link></li>
                <li><Link to="/journal">Atelier Journal</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Contact & Location</h4>
              <ul className="footer-contact">
                <li><strong>Location:</strong> Mylapore, Chennai, Tamil Nadu, India (By Appointment Only)</li>
                <li><strong>Email:</strong> contact@murthyateliers.com</li>
                <li><strong>WhatsApp / Call:</strong> +91 98410 24790</li>
              </ul>
              <div className="footer-socials">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://wa.me/919841024790" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.817 1.452 5.53 0 10.028-4.498 10.03-10.03.001-2.68-1.04-5.197-2.93-7.09C16.616 1.593 14.1 1.55 11.42 1.55c-5.532 0-10.03 4.498-10.032 10.03-.001 1.884.5 3.722 1.45 5.32l-.993 3.633 3.712-.975zm13.11-8.156c-.3-.15-1.775-.875-2.05-1.012-.275-.137-.475-.205-.675.093-.2.3-.775 1.012-.95 1.21-.175.2-.35.225-.65.075-.3-.15-1.263-.465-2.407-1.485-.89-.792-1.49-1.77-1.665-2.07-.175-.3-.02-.46.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.588-.492-.51-.675-.52-.175-.007-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.224 5.112 4.525.715.31 1.273.495 1.71.635.717.227 1.37.195 1.885.118.574-.085 1.775-.725 2.025-1.425.25-.7.25-1.3 1.175-1.425-.075-.125-.175-.205-.475-.355z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div>
              &copy; {new Date().getFullYear()} Murthy Ateliers. All Rights Reserved.
            </div>
            <div className="footer-bottom-line">
              Murthy Ateliers — Heirloom Jewels Crafted to Endure
            </div>
          </div>
        </div>
      </footer>

      {/* ── Booking Dialog Modal (Global) ───────────────────────────────── */}
      {isBookingOpen && (
        <div className="modal-backdrop" onClick={closeBookingModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeBookingModal} aria-label="Close Booking Dialog">
              <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
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
                        className={`form-input${fieldErrors.name ? ' form-input-error' : ''}`}
                        placeholder="e.g. Shanthi Shankar"
                        value={bookingForm.name}
                        onChange={handleInputChange}
                        maxLength={80}
                        aria-describedby={fieldErrors.name ? 'booking-name-err' : undefined}
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
                          className={`form-input${fieldErrors.email ? ' form-input-error' : ''}`}
                          placeholder="e.g. shanthi@mylapore.com"
                          value={bookingForm.email}
                          onChange={handleInputChange}
                          maxLength={254}
                          aria-describedby={fieldErrors.email ? 'booking-email-err' : undefined}
                        />
                        {fieldErrors.email && (
                          <span id="booking-email-err" className="form-field-error" role="alert">{fieldErrors.email}</span>
                        )}
                      </div>

                      {/* Phone with country code */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="booking-phone">Phone / WhatsApp *</label>
                        <div className="phone-input-row">
                          <select
                            name="phoneCountry"
                            value={bookingForm.phoneCountry}
                            onChange={handleInputChange}
                            className="form-input phone-country-select"
                            aria-label="Country code"
                          >
                            {COUNTRY_CODES.map((c) => (
                              <option key={c.code} value={c.code}>{c.label}</option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            id="booking-phone"
                            name="phone"
                            required
                            autoComplete="tel-national"
                            inputMode="numeric"
                            className={`form-input phone-digits-input${fieldErrors.phone ? ' form-input-error' : ''}`}
                            placeholder="10-digit number"
                            value={bookingForm.phone}
                            onChange={handleInputChange}
                            maxLength={15}
                            aria-describedby={fieldErrors.phone ? 'booking-phone-err' : undefined}
                          />
                        </div>
                        {fieldErrors.phone && (
                          <span id="booking-phone-err" className="form-field-error" role="alert">{fieldErrors.phone}</span>
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

                      {/* Preferred date — must be today or future */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="booking-date">Preferred Date</label>
                        <input
                          type="date"
                          id="booking-date"
                          name="date"
                          className={`form-input${fieldErrors.date ? ' form-input-error' : ''}`}
                          value={bookingForm.date}
                          onChange={handleInputChange}
                          min={todayStr}
                          aria-describedby={fieldErrors.date ? 'booking-date-err' : undefined}
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
                        className={`form-input${fieldErrors.notes ? ' form-input-error' : ''}`}
                        placeholder="Please share any design ideas, ancestral gold details, or specific pieces you would like to discuss…"
                        value={bookingForm.notes}
                        onChange={handleInputChange}
                        maxLength={2000}
                        rows={4}
                        aria-describedby={fieldErrors.notes ? 'booking-notes-err' : undefined}
                      />
                      {fieldErrors.notes && (
                        <span id="booking-notes-err" className="form-field-error" role="alert">{fieldErrors.notes}</span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ marginTop: '1rem', width: '100%' }}
                      disabled={bookingSending}
                    >
                      {bookingSending ? 'Sending…' : 'Request Appointment'}
                    </button>

                    {bookingError && (
                      <p style={{ color: 'var(--color-dark-red)', fontSize: '0.8rem', textAlign: 'center', marginTop: '0.5rem' }} role="alert">
                        {bookingError}
                      </p>
                    )}
                  </form>
                </>
              ) : (
                <div className="modal-success-state" style={{ textAlign: 'center' }}>
                  <div className="success-icon">
                    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </div>
                  <h3 className="success-title">வாழ்க வளமுடன்</h3>
                  <p className="success-desc">
                    Thank you for sharing your story, <strong>{sanitizeText(bookingForm.name)}</strong>. We have received your request for a {bookingForm.service === 'Consultation' ? 'private consultation' : bookingForm.service.toLowerCase()}.
                  </p>
                  <p className="success-desc" style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    Vidya or our senior atelier curator will review your details and contact you via WhatsApp/Email within 24 hours to coordinate dates.
                  </p>
                  <button className="btn btn-secondary" onClick={closeBookingModal} style={{ marginTop: '1rem' }}>
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
