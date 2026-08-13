/**
 * PhoneInput.jsx
 * Custom phone field:
 *  - Trigger: dial code only (no flag) — compact, no overflow
 *  - Dropdown: India + USA pinned at top, rest sorted A–Z by name
 *    Each row in the list shows: flag | country name | dial code
 */
import { useState, useRef, useEffect, useMemo } from "react";
import ReactCountryFlag from "react-country-flag";
import { COUNTRY_CODES } from "../utils/sanitize";

// ISOs pinned to the top of the list
const PINNED_ISOS = ["IN", "US"];

export default function PhoneInput({
  countryValue,
  phoneValue,
  onCountryChange,
  onPhoneChange,
  error,
  inputClass = "form-input-field",
  errorClass,
  inputId = "phone",
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  const searchRef  = useRef(null);
  const errClass   = errorClass || `${inputClass}--error`;

  const selected = COUNTRY_CODES.find((c) => c.code === countryValue) || COUNTRY_CODES[0];

  // Build sorted list: pinned first, then A–Z by name
  const sortedAll = useMemo(() => {
    const pinned = PINNED_ISOS.map((iso) => COUNTRY_CODES.find((c) => c.iso === iso)).filter(Boolean);
    const rest   = COUNTRY_CODES
      .filter((c) => !PINNED_ISOS.includes(c.iso))
      .sort((a, b) => a.name.localeCompare(b.name));
    return [...pinned, rest[0] === undefined ? [] : rest].flat();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sortedAll;
    return sortedAll.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.includes(q)
    );
  }, [search, sortedAll]);

  // Close on outside click
  useEffect(() => {
    function onOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    }
    if (open) document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  // Focus search on open
  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  function pick(code) {
    onCountryChange({ target: { name: "phoneCountry", value: code } });
    setOpen(false);
    setSearch("");
  }

  return (
    <div className="phone-input-row">
      {/* ── Country picker ── */}
      <div className="phone-picker" ref={wrapperRef}>

        {/* Trigger — dial code only, no flag */}
        <button
          type="button"
          className="phone-picker-trigger"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Country code: ${selected.code}`}
        >
          <span className="phone-picker-code">{selected.code}</span>
          <svg className="phone-picker-chevron" viewBox="0 0 10 6" width="8" height="8" aria-hidden="true">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="phone-picker-dropdown" role="listbox" aria-label="Select country">
            <div className="phone-picker-search-wrap">
              <input
                ref={searchRef}
                type="text"
                className="phone-picker-search"
                placeholder="Search country…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search country"
              />
            </div>
            <ul className="phone-picker-list">
              {filtered.length === 0 && (
                <li className="phone-picker-empty">No results</li>
              )}
              {filtered.map((c) => (
                <li
                  key={c.iso + c.code}
                  role="option"
                  aria-selected={c.code === countryValue}
                  className={`phone-picker-option${c.code === countryValue ? " phone-picker-option--active" : ""}`}
                  onMouseDown={() => pick(c.code)}
                >
                  <ReactCountryFlag
                    countryCode={c.iso}
                    svg
                    style={{ width: "1.3em", height: "1.3em", flexShrink: 0 }}
                    aria-hidden="true"
                  />
                  <span className="phone-picker-name">{c.name}</span>
                  <span className="phone-picker-option-code">{c.code}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ── Digit input ── */}
      <input
        id={inputId}
        name="phone"
        type="tel"
        autoComplete="tel-national"
        inputMode="numeric"
        maxLength={15}
        placeholder="Phone number"
        value={phoneValue}
        onChange={onPhoneChange}
        className={`${inputClass} phone-digits-input${error ? ` ${errClass}` : ""}`}
        aria-describedby={error ? `err-${inputId}` : undefined}
      />
    </div>
  );
}
