/**
 * EmailJS Configuration
 * ---------------------
 * Fill in your credentials from https://www.emailjs.com/
 *
 * HOW TO GET THESE VALUES:
 *   SERVICE_ID  → EmailJS Dashboard → Email Services → your service → Service ID
 *   TEMPLATE_ID → EmailJS Dashboard → Email Templates → your template → Template ID
 *   PUBLIC_KEY  → EmailJS Dashboard → Account → API Keys → Public Key
 *
 * TEMPLATE VARIABLES to add in your EmailJS template:
 *   {{from_name}}      - sender's full name
 *   {{from_email}}     - sender's email
 *   {{phone}}          - phone / WhatsApp number
 *   {{occasion}}       - occasion or intent (consultation form)
 *   {{service}}        - service type (booking modal)
 *   {{preferred_date}} - preferred appointment date (booking modal)
 *   {{message}}        - the story / main message
 *   {{notes}}          - additional notes (booking modal)
 *   {{to_name}}        - set to "Murthy Ateliers" in the template
 */

export const EMAILJS_CONFIG = {
  SERVICE_ID:  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY:  import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

/**
 * Sends an email via EmailJS.
 * Returns { success: true } or { success: false, error: string }
 *
 * @param {object} templateParams - key/value pairs matching your EmailJS template variables
 */
export async function sendEmail(templateParams) {
  // Lazy-import EmailJS so it's only bundled when needed
  const emailjs = await import("@emailjs/browser");

  try {
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
    );
    return { success: true };
  } catch (err) {
    console.error("EmailJS error:", err);
    return { success: false, error: err?.text ?? err?.message ?? "Unknown error" };
  }
}
