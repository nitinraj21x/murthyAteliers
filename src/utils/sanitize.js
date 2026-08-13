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

/** Name: letters, spaces, hyphens, apostrophes, dots. 2–60 chars. */
export function validateName(value) {
  const v = value.trim();
  if (!v) return 'Name is required.';
  if (v.length < 2) return 'Name must be at least 2 characters.';
  if (v.length > 60) return 'Name must be 60 characters or fewer.';
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
  // South Asia
  { code: '+91',  flag: '🇮🇳', iso: 'IN', name: 'India' },
  { code: '+92',  flag: '🇵🇰', iso: 'PK', name: 'Pakistan' },
  { code: '+880', flag: '🇧🇩', iso: 'BD', name: 'Bangladesh' },
  { code: '+94',  flag: '🇱🇰', iso: 'LK', name: 'Sri Lanka' },
  { code: '+977', flag: '🇳🇵', iso: 'NP', name: 'Nepal' },
  { code: '+975', flag: '🇧🇹', iso: 'BT', name: 'Bhutan' },
  { code: '+960', flag: '🇲🇻', iso: 'MV', name: 'Maldives' },
  // Southeast Asia
  { code: '+95',  flag: '🇲🇲', iso: 'MM', name: 'Myanmar' },
  { code: '+66',  flag: '🇹🇭', iso: 'TH', name: 'Thailand' },
  { code: '+84',  flag: '🇻🇳', iso: 'VN', name: 'Vietnam' },
  { code: '+62',  flag: '🇮🇩', iso: 'ID', name: 'Indonesia' },
  { code: '+63',  flag: '🇵🇭', iso: 'PH', name: 'Philippines' },
  { code: '+60',  flag: '🇲🇾', iso: 'MY', name: 'Malaysia' },
  { code: '+65',  flag: '🇸🇬', iso: 'SG', name: 'Singapore' },
  { code: '+855', flag: '🇰🇭', iso: 'KH', name: 'Cambodia' },
  { code: '+856', flag: '🇱🇦', iso: 'LA', name: 'Laos' },
  { code: '+670', flag: '🇹🇱', iso: 'TL', name: 'Timor-Leste' },
  // East Asia
  { code: '+86',  flag: '🇨🇳', iso: 'CN', name: 'China' },
  { code: '+81',  flag: '🇯🇵', iso: 'JP', name: 'Japan' },
  { code: '+82',  flag: '🇰🇷', iso: 'KR', name: 'South Korea' },
  { code: '+852', flag: '🇭🇰', iso: 'HK', name: 'Hong Kong' },
  { code: '+853', flag: '🇲🇴', iso: 'MO', name: 'Macao' },
  { code: '+886', flag: '🇹🇼', iso: 'TW', name: 'Taiwan' },
  { code: '+976', flag: '🇲🇳', iso: 'MN', name: 'Mongolia' },
  // Middle East
  { code: '+971', flag: '🇦🇪', iso: 'AE', name: 'UAE' },
  { code: '+966', flag: '🇸🇦', iso: 'SA', name: 'Saudi Arabia' },
  { code: '+974', flag: '🇶🇦', iso: 'QA', name: 'Qatar' },
  { code: '+973', flag: '🇧🇭', iso: 'BH', name: 'Bahrain' },
  { code: '+968', flag: '🇴🇲', iso: 'OM', name: 'Oman' },
  { code: '+965', flag: '🇰🇼', iso: 'KW', name: 'Kuwait' },
  { code: '+962', flag: '🇯🇴', iso: 'JO', name: 'Jordan' },
  { code: '+961', flag: '🇱🇧', iso: 'LB', name: 'Lebanon' },
  { code: '+972', flag: '🇮🇱', iso: 'IL', name: 'Israel' },
  { code: '+964', flag: '🇮🇶', iso: 'IQ', name: 'Iraq' },
  { code: '+98',  flag: '🇮🇷', iso: 'IR', name: 'Iran' },
  { code: '+90',  flag: '🇹🇷', iso: 'TR', name: 'Turkey' },
  { code: '+967', flag: '🇾🇪', iso: 'YE', name: 'Yemen' },
  // Central Asia
  { code: '+993', flag: '🇹🇲', iso: 'TM', name: 'Turkmenistan' },
  { code: '+998', flag: '🇺🇿', iso: 'UZ', name: 'Uzbekistan' },
  { code: '+996', flag: '🇰🇬', iso: 'KG', name: 'Kyrgyzstan' },
  { code: '+992', flag: '🇹🇯', iso: 'TJ', name: 'Tajikistan' },
  { code: '+7',   flag: '🇷🇺', iso: 'RU', name: 'Russia' },
  // Europe
  { code: '+44',  flag: '🇬🇧', iso: 'GB', name: 'United Kingdom' },
  { code: '+49',  flag: '🇩🇪', iso: 'DE', name: 'Germany' },
  { code: '+33',  flag: '🇫🇷', iso: 'FR', name: 'France' },
  { code: '+39',  flag: '🇮🇹', iso: 'IT', name: 'Italy' },
  { code: '+34',  flag: '🇪🇸', iso: 'ES', name: 'Spain' },
  { code: '+31',  flag: '🇳🇱', iso: 'NL', name: 'Netherlands' },
  { code: '+32',  flag: '🇧🇪', iso: 'BE', name: 'Belgium' },
  { code: '+41',  flag: '🇨🇭', iso: 'CH', name: 'Switzerland' },
  { code: '+43',  flag: '🇦🇹', iso: 'AT', name: 'Austria' },
  { code: '+46',  flag: '🇸🇪', iso: 'SE', name: 'Sweden' },
  { code: '+47',  flag: '🇳🇴', iso: 'NO', name: 'Norway' },
  { code: '+45',  flag: '🇩🇰', iso: 'DK', name: 'Denmark' },
  { code: '+358', flag: '🇫🇮', iso: 'FI', name: 'Finland' },
  { code: '+353', flag: '🇮🇪', iso: 'IE', name: 'Ireland' },
  { code: '+351', flag: '🇵🇹', iso: 'PT', name: 'Portugal' },
  { code: '+30',  flag: '🇬🇷', iso: 'GR', name: 'Greece' },
  { code: '+48',  flag: '🇵🇱', iso: 'PL', name: 'Poland' },
  { code: '+420', flag: '🇨🇿', iso: 'CZ', name: 'Czech Republic' },
  { code: '+36',  flag: '🇭🇺', iso: 'HU', name: 'Hungary' },
  { code: '+40',  flag: '🇷🇴', iso: 'RO', name: 'Romania' },
  { code: '+380', flag: '🇺🇦', iso: 'UA', name: 'Ukraine' },
  { code: '+375', flag: '🇧🇾', iso: 'BY', name: 'Belarus' },
  { code: '+370', flag: '🇱🇹', iso: 'LT', name: 'Lithuania' },
  { code: '+371', flag: '🇱🇻', iso: 'LV', name: 'Latvia' },
  { code: '+372', flag: '🇪🇪', iso: 'EE', name: 'Estonia' },
  { code: '+421', flag: '🇸🇰', iso: 'SK', name: 'Slovakia' },
  { code: '+386', flag: '🇸🇮', iso: 'SI', name: 'Slovenia' },
  { code: '+385', flag: '🇭🇷', iso: 'HR', name: 'Croatia' },
  { code: '+381', flag: '🇷🇸', iso: 'RS', name: 'Serbia' },
  { code: '+359', flag: '🇧🇬', iso: 'BG', name: 'Bulgaria' },
  { code: '+1',   flag: '🇺🇸', iso: 'US', name: 'USA / Canada' },
  // Americas
  { code: '+52',  flag: '🇲🇽', iso: 'MX', name: 'Mexico' },
  { code: '+55',  flag: '🇧🇷', iso: 'BR', name: 'Brazil' },
  { code: '+54',  flag: '🇦🇷', iso: 'AR', name: 'Argentina' },
  { code: '+56',  flag: '🇨🇱', iso: 'CL', name: 'Chile' },
  { code: '+57',  flag: '🇨🇴', iso: 'CO', name: 'Colombia' },
  { code: '+51',  flag: '🇵🇪', iso: 'PE', name: 'Peru' },
  { code: '+58',  flag: '🇻🇪', iso: 'VE', name: 'Venezuela' },
  { code: '+593', flag: '🇪🇨', iso: 'EC', name: 'Ecuador' },
  { code: '+591', flag: '🇧🇴', iso: 'BO', name: 'Bolivia' },
  { code: '+595', flag: '🇵🇾', iso: 'PY', name: 'Paraguay' },
  { code: '+598', flag: '🇺🇾', iso: 'UY', name: 'Uruguay' },
  { code: '+53',  flag: '🇨🇺', iso: 'CU', name: 'Cuba' },
  // Africa
  { code: '+27',  flag: '🇿🇦', iso: 'ZA', name: 'South Africa' },
  { code: '+234', flag: '🇳🇬', iso: 'NG', name: 'Nigeria' },
  { code: '+254', flag: '🇰🇪', iso: 'KE', name: 'Kenya' },
  { code: '+233', flag: '🇬🇭', iso: 'GH', name: 'Ghana' },
  { code: '+20',  flag: '🇪🇬', iso: 'EG', name: 'Egypt' },
  { code: '+212', flag: '🇲🇦', iso: 'MA', name: 'Morocco' },
  { code: '+213', flag: '🇩🇿', iso: 'DZ', name: 'Algeria' },
  { code: '+216', flag: '🇹🇳', iso: 'TN', name: 'Tunisia' },
  { code: '+251', flag: '🇪🇹', iso: 'ET', name: 'Ethiopia' },
  { code: '+255', flag: '🇹🇿', iso: 'TZ', name: 'Tanzania' },
  { code: '+256', flag: '🇺🇬', iso: 'UG', name: 'Uganda' },
  { code: '+250', flag: '🇷🇼', iso: 'RW', name: 'Rwanda' },
  { code: '+237', flag: '🇨🇲', iso: 'CM', name: 'Cameroon' },
  { code: '+225', flag: '🇨🇮', iso: 'CI', name: "Côte d'Ivoire" },
  { code: '+221', flag: '🇸🇳', iso: 'SN', name: 'Senegal' },
  { code: '+260', flag: '🇿🇲', iso: 'ZM', name: 'Zambia' },
  { code: '+263', flag: '🇿🇼', iso: 'ZW', name: 'Zimbabwe' },
  // Oceania
  { code: '+61',  flag: '🇦🇺', iso: 'AU', name: 'Australia' },
  { code: '+64',  flag: '🇳🇿', iso: 'NZ', name: 'New Zealand' },
  { code: '+679', flag: '🇫🇯', iso: 'FJ', name: 'Fiji' },
  { code: '+675', flag: '🇵🇬', iso: 'PG', name: 'Papua New Guinea' },
];
