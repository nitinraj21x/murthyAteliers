# Enable EmailJS abuse protection

The repository now includes a honeypot, duplicate-submit protection, a shared
60-second SDK cooldown, and optional reCAPTCHA v2 widgets on both lead forms.
Browser controls can be bypassed. Complete the dashboard steps to require
verification on direct EmailJS API requests too.

1. Register a reCAPTCHA v2 **I'm not a robot checkbox** site at
   https://www.google.com/recaptcha/admin/create. Add your actual production
   domain and any development hostname you need. Keep domain verification on.
2. Put the public site key in `VITE_RECAPTCHA_SITE_KEY` in your local `.env`
   and hosting environment. Restart development or rebuild and deploy production.
   With the variable empty, CAPTCHA is disabled so existing forms still work.
   The Google secret key must never appear in a VITE variable or this repository.
3. Confirm the checkbox appears in both the consultation page and booking modal.
4. In EmailJS, open the template matching `VITE_EMAILJS_TEMPLATE_ID`, select
   **Settings**, enable **reCAPTCHA V2 verification**, paste the Google secret
   key there, and save. Both forms use that template. Enable verification on
   any other publicly accessible templates as well.
5. In EmailJS account security settings, configure the origin allowlist for
   the actual website origins (scheme, hostname, and port where applicable).
   Include the www and non-www origins only if both actually serve the app.
   Avoid wildcards and remove temporary development origins after testing.
   The exact dashboard location/availability can vary with the account plan.
6. Check the template recipient is the fixed business inbox; customer input
   should populate Reply-To, never choose the recipient.

## Verify after configuration

- An empty checkbox must block submission. Expired verification must require
  another check. A network failure should show an error and allow a fresh check.
- With permission to send a test lead, verify both forms deliver successfully.
  Wait at least 60 seconds between attempts; inspect EmailJS history and inbox.
- Confirm the template rejects a request without a CAPTCHA token. This is the
  critical dashboard check; client validation alone does not prove protection.
- Check an unlisted origin is rejected. Keep production origins allowed.

No live email was sent and no dashboard settings were changed by the code update.

References:
- https://www.emailjs.com/docs/user-guide/adding-captcha-verification/
- https://www.emailjs.com/docs/faq/does-emailjs-expose-my-account-to-spam/
- https://www.emailjs.com/docs/sdk/options/
- https://developers.google.com/recaptcha/docs/display
