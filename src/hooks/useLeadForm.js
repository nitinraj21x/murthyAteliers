import { useCallback, useRef, useState } from "react";

const DEFAULT_ERROR = "Something went wrong. Please reach us directly via WhatsApp or email.";

export default function useLeadForm({
  initialValues,
  normalizeValue,
  validateValues,
  buildPayload,
  submit,
  defaultError = DEFAULT_ERROR,
}) {
  const [form, setForm] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inFlight = useRef(false);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setForm((prev) => {
        const nextValue = normalizeValue ? normalizeValue(name, value, prev) : value;
        return { ...prev, [name]: nextValue };
      });

      setSendError("");
      setSubmitted(false);
      setFieldErrors((prev) => {
        if (!prev[name]) return prev;
        return { ...prev, [name]: null };
      });
    },
    [normalizeValue]
  );

  const validateAll = useCallback(() => {
    const errors = validateValues(form) || {};
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [form, validateValues]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (inFlight.current) return;
      const element = e.currentTarget;
      const fields = new FormData(element);
      if (fields.get("lead_website")) {
        setSendError("Unable to submit. Please contact us directly.");
        return;
      }
      if (!validateAll()) return;
      const token = fields.get("g-recaptcha-response");
      if (import.meta.env.VITE_RECAPTCHA_SITE_KEY && !token) {
        setSendError("Please complete the verification before sending.");
        return;
      }

      inFlight.current = true;
      setSending(true);
      setSendError("");

      try {
        const payload = buildPayload(form);
        if (token) payload["g-recaptcha-response"] = token;
        const result = await submit(payload, form);

        if (result?.success) {
          setSubmitted(true);
        } else {
          setSendError(result?.error || defaultError);
        }
      } catch {
        setSendError(defaultError);
      } finally {
        inFlight.current = false;
        element.dispatchEvent(new Event("lead-attempt-finished"));
        setSending(false);
      }
    },
    [buildPayload, defaultError, form, submit, validateAll]
  );

  return {
    form,
    setForm,
    fieldErrors,
    setFieldErrors,
    sending,
    sendError,
    setSendError,
    submitted,
    setSubmitted,
    handleChange,
    handleSubmit,
  };
}
