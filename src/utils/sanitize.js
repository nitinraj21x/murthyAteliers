/**
 * sanitize.js
 * Client-side input sanitization and validation utilities.
 *
 * NOTE: This is defence-in-depth on the frontend only. All user data sent to
 * any backend/email service must ALSO be validated server-side.  These helpers
 * protect against XSS, injection attempts and malformed values being stored or
 * displayed inside the React app.
 */

// ---------------------------------------------------------------------------
// Character-level sanitization
// ---------------------------------------------------------------------------

/**
 * Strip HTML/XML tags, null bytes, and escape dangerous characters that could
 * be used in XSS or template-injection attacks.
 */
export function sanitizeText(value) {
  if (typeof value !== 'string') return '';
  return value
    // Remove null bytes
    .replace(/\0/g, '')
    // Strip HTML/XML tags
    .replace(/<[^>]*>/g, '')
    // Escape angle brackets and quotes to HTML entities
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    // Remove common SQL injection patterns (belt-and-suspenders; the email
    // service should parameterize on its end too)
    .replace(/(['";\\])\s*(--|\/\*|xp_|exec|select|insert|update|delete|drop|union|alter|cast|convert|declare|waitfor|benchmark)/gi, '')
    .trim();
}

/**
 * Sanitize but keep new-lines (for textarea fields).
 */
export function sanitizeMultiline(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/\0/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/(['";\\])\s*(--|\/\*|xp_|exec|select|insert|update|delete|drop|union|alter|cast|convert|declare|waitfor|benchmark)/gi, '')
    .trim();
}

// ---------------------------------------------------------------------------
// Field-specific validators  (return null on pass, error string on fail)
// ---------------------------------------------------------------------------

/** Name: letters, spaces, hyphens, apostrophes, dots. 2–80 chars. */
export function validateName(value) {
  const v = value.trim();
  if (!v) return 'Name is required.';
  if (v.length < 2) return 'Name must be at least 2 characters.';
  if (v.length > 80) return 'Name must be 80 characters or fewer.';
  if (!/^[\p{L}\p{M}\s'\-\.]+$/u.test(v))
    return 'Name contains invalid characters.';
  return null;
}

/** Email: RFC-ish regex + length cap. */
export function validateEmail(value) {
  const v = value.trim();
  if (!v) return 'Email address is required.';
  if (v.length > 254) return 'Email address is too long.';
  // Reasonably strict RFC 5321 subset
  const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRe.test(v)) return 'Please enter a valid email address.';
  return null;
}

/**
 * Phone: exactly 10 digits (after stripping spaces/dashes/dots).
 * The country code is stored separately and prepended on submission.
 */
export function validatePhone(digits) {
  const stripped = digits.replace(/[\s\-\.\(\)]/g, '');
  if (!stripped) return 'Phone number is required.';
  if (!/^\d{10}$/.test(stripped)) return 'Enter exactly 10 digits.';
  return null;
}

/** Generic text field with max-length guard. */
export function validateTextField(value, label = 'Field', { required = false, max = 500 } = {}) {
  const v = value.trim();
  if (required && !v) return `${label} is required.`;
  if (v.length > max) return `${label} must be ${max} characters or fewer.`;
  return null;
}

/** Textarea / narrative: optional, max 2000 chars. */
export function validateTextarea(value, label = 'Message', { required = false, max = 2000 } = {}) {
  return validateTextField(value, label, { required, max });
}

// ---------------------------------------------------------------------------
// Country codes list for phone picker
// ---------------------------------------------------------------------------
export const COUNTRY_CODES = [
  { code: '+91',  label: '🇮🇳 India (+91)',          iso: 'IN' },
  { code: '+1',   label: '🇺🇸 USA / Canada (+1)',     iso: 'US' },
  { code: '+44',  label: '🇬🇧 UK (+44)',              iso: 'GB' },
  { code: '+971', label: '🇦🇪 UAE (+971)',             iso: 'AE' },
  { code: '+65',  label: '🇸🇬 Singapore (+65)',        iso: 'SG' },
  { code: '+60',  label: '🇲🇾 Malaysia (+60)',         iso: 'MY' },
  { code: '+61',  label: '🇦🇺 Australia (+61)',        iso: 'AU' },
  { code: '+49',  label: '🇩🇪 Germany (+49)',          iso: 'DE' },
  { code: '+33',  label: '🇫🇷 France (+33)',           iso: 'FR' },
  { code: '+81',  label: '🇯🇵 Japan (+81)',            iso: 'JP' },
  { code: '+82',  label: '🇰🇷 South Korea (+82)',      iso: 'KR' },
  { code: '+86',  label: '🇨🇳 China (+86)',            iso: 'CN' },
  { code: '+7',   label: '🇷🇺 Russia (+7)',            iso: 'RU' },
  { code: '+55',  label: '🇧🇷 Brazil (+55)',           iso: 'BR' },
  { code: '+27',  label: '🇿🇦 South Africa (+27)',     iso: 'ZA' },
];
