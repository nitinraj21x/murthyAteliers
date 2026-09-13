import { useEffect, useRef, useState } from "react";

let captchaScript;
function loadCaptcha() {
  if (!captchaScript) {
    captchaScript = new Promise((resolve, reject) => {
      window.murthyCaptchaReady = () => resolve(window.grecaptcha);
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?onload=murthyCaptchaReady&render=explicit";
      script.async = true;
      script.onerror = () => {
        captchaScript = undefined;
        script.remove();
        reject(new Error("Verification could not load. Please reload or contact us directly."));
      };
      document.head.appendChild(script);
    });
  }
  return captchaScript;
}

export default function LeadProtection() {
  const container = useRef(null);
  const [error, setError] = useState("");
  const sitekey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!sitekey) return;
    const element = container.current;
    const form = element.closest("form");
    let cancelled = false;
    let widget;
    const reset = () => {
      if (widget !== undefined) window.grecaptcha.reset(widget);
    };
    form.addEventListener("lead-attempt-finished", reset);
    loadCaptcha().then((api) => {
      if (cancelled) return;
      widget = api.render(element, {
        sitekey,
        size: "compact",
        callback: () => setError(""),
        "expired-callback": () => setError("Verification expired. Please verify again."),
        "error-callback": () => setError("Verification failed to connect. Please reload or contact us directly."),
      });
    }).catch((err) => { if (!cancelled) setError(err.message); });
    return () => {
      cancelled = true;
      form.removeEventListener("lead-attempt-finished", reset);
      reset();
      element.replaceChildren();
    };
  }, [sitekey]);

  return (
    <>
      <div aria-hidden="true" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>
        <label>Leave this field empty<input name="lead_website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {sitekey && <div ref={container} />}
      {error && <p role="alert">{error}</p>}
    </>
  );
}
