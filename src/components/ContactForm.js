import { useState } from "react";
import { C } from "../constants/colors";
import { COPY } from "../constants/copy";

const ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;
const ENDPOINT = "https://api.web3forms.com/submit";

const inputStyle = {
  fontFamily: "'Manrope', sans-serif",
  fontSize: "0.82rem",
  background: C.bgCard,
  border: `1px solid ${C.border}`,
  color: C.cream,
  padding: "1rem 1.25rem",
  outline: "none",
  transition: "border-color 0.3s",
  fontWeight: 400,
  width: "100%",
};

const invalidStyle = { borderColor: "rgba(220, 80, 80, 0.55)" };

const focusHandler = (e) => {
  if (!e.target.getAttribute("data-invalid")) {
    e.target.style.borderColor = C.greenBorder;
  }
};
const blurHandler = (e) => {
  if (!e.target.getAttribute("data-invalid")) {
    e.target.style.borderColor = C.border;
  }
};

const INITIAL = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  // Honeypot — bots fill this, humans don't. Web3Forms rejects submissions
  // with a non-empty botcheck. Kept off-screen with CSS, never shown.
  botcheck: "",
};

// Email: requires local@domain.tld pattern with a sensible TLD and no stray
// whitespace. Tight enough to block common typos, permissive enough for real
// addresses (plus-addressing, subdomains, etc.).
const EMAIL_RE = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9](?:[A-Za-z0-9\-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9\-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

// Auto-format a phone number input as the user types.
// - Allows "+" only as the first character (for international prefixes)
// - Strips everything else that isn't a digit
// - US format: "(XXX) XXX-XXXX" capped at 10 digits
// - International (starts with +): "+CC XXX XXX XXXX" capped at 15 digits total
function formatPhone(raw) {
  if (!raw) return "";
  const startsWithPlus = raw.trim().startsWith("+");
  const digits = raw.replace(/\D/g, "");

  if (startsWithPlus) {
    const d = digits.slice(0, 15);
    if (d.length === 0) return "+";
    if (d.length <= 3) return "+" + d;
    if (d.length <= 6) return "+" + d.slice(0, 3) + " " + d.slice(3);
    if (d.length <= 10) return "+" + d.slice(0, 3) + " " + d.slice(3, 6) + " " + d.slice(6);
    return "+" + d.slice(0, 3) + " " + d.slice(3, 6) + " " + d.slice(6, 10) + " " + d.slice(10);
  }

  const d = digits.slice(0, 10);
  if (d.length === 0) return "";
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 10)}`;
}

// Validate a formatted phone value. Optional field — empty is OK.
// US: exactly 10 digits. International (leads with "+"): 8–15 digits.
function isValidPhone(formatted) {
  if (!formatted || !formatted.trim()) return true;
  const digits = formatted.replace(/\D/g, "");
  if (formatted.trim().startsWith("+")) {
    return digits.length >= 8 && digits.length <= 15;
  }
  return digits.length === 10;
}

function validate(values) {
  const errors = {};
  if (!values.first_name.trim()) errors.first_name = "Required";
  if (!values.last_name.trim()) errors.last_name = "Required";
  if (!values.email.trim()) errors.email = "Required";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid email address";
  if (values.phone.trim() && !isValidPhone(values.phone)) {
    errors.phone = "Enter a valid 10-digit phone number";
  }
  if (!values.service) errors.service = "Please choose one";
  if (!values.message.trim()) errors.message = "Required";
  else if (values.message.trim().length < 10) errors.message = "A bit more detail helps";
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const update = (field) => (e) => {
    let next = e.target.value;
    // Auto-format phone as the user types so only valid phone characters
    // are ever accepted into state.
    if (field === "phone") next = formatPhone(next);
    setValues((v) => ({ ...v, [field]: next }));
    // Clear error on the field as soon as the user starts correcting it
    if (errors[field]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    }
  };

  // Validate email on blur so the user gets feedback before submission
  const validateFieldOnBlur = (field) => () => {
    if (field === "email" && values.email.trim()) {
      if (!EMAIL_RE.test(values.email.trim())) {
        setErrors((prev) => ({ ...prev, email: "Enter a valid email address" }));
      }
    }
    if (field === "phone" && values.phone.trim()) {
      if (!isValidPhone(values.phone)) {
        setErrors((prev) => ({ ...prev, phone: "Enter a valid 10-digit phone number" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;

    // Honeypot: if a bot filled this in, silently pretend success
    if (values.botcheck) {
      setStatus("success");
      return;
    }

    // Client-side validation
    const v = validate(values);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      setStatus("idle");
      return;
    }

    // Fail fast if the deploy is missing the env var
    if (!ACCESS_KEY) {
      setStatus("error");
      setErrorMessage(
        "Form is not configured yet. Please email us directly at " + COPY.contact.email
      );
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    // Build payload. Trim everything; never trust untrimmed client input.
    const payload = {
      access_key: ACCESS_KEY,
      subject: `New intake from ${values.first_name.trim()} ${values.last_name.trim()}`,
      from_name: `${values.first_name.trim()} ${values.last_name.trim()}`,
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      service: values.service,
      message: values.message.trim(),
      // Web3Forms will redirect on success if this is set; we handle UX ourselves
      // so we omit redirect.
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("success");
        setValues(INITIAL);
        // Clear any lingering per-field errors on success
        setErrors({});
      } else {
        setStatus("error");
        // Show a short, non-technical message. Specific codes help the user
        // without exposing backend detail.
        if (res.status === 429) {
          setErrorMessage(
            "Too many submissions right now. Please wait a moment and try again."
          );
        } else if (res.status >= 500) {
          setErrorMessage(
            "The server had trouble handling your message. Please try again shortly, or email " +
              COPY.contact.email
          );
        } else {
          setErrorMessage(
            "We couldn't send your message. Please double-check your info or email " +
              COPY.contact.email
          );
        }
      }
    } catch (err) {
      // Network failure, offline, CORS blocked, etc.
      setStatus("error");
      setErrorMessage(
        "Couldn't reach the server. Check your internet connection or email " +
          COPY.contact.email
      );
    }
  };

  // --- success state ---
  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="contact-success"
        style={{
          background: C.bgCard,
          border: `1px solid ${C.greenBorder}`,
          padding: "2.5rem 2rem",
          textAlign: "center",
          fontFamily: "'Manrope', sans-serif",
          animation: "contactSuccessIn 0.5s ease-out",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "rgba(74,222,128,0.1)",
            border: `1px solid ${C.green}`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.25rem",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.2">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "1.2rem",
            color: C.cream,
            letterSpacing: "0.02em",
            marginBottom: "0.6rem",
            textTransform: "uppercase",
          }}
        >
          Message Received
        </h3>
        <p style={{ fontSize: "0.85rem", color: C.creamDim, lineHeight: 1.6 }}>
          Thanks for reaching out. We&rsquo;ll be in touch soon.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setErrors({});
          }}
          style={{
            marginTop: "1.75rem",
            background: "transparent",
            color: C.creamDim,
            border: `1px solid ${C.creamMuted}`,
            padding: "0.7rem 1.5rem",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
    >
      {/* Honeypot: hidden from sighted users + screen readers; only bots fill it */}
      <input
        type="text"
        name="botcheck"
        autoComplete="off"
        tabIndex="-1"
        aria-hidden="true"
        value={values.botcheck}
        onChange={update("botcheck")}
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}
        className="form-grid"
      >
        {[
          { key: "first_name", label: "First Name" },
          { key: "last_name", label: "Last Name" },
        ].map(({ key, label }) => (
          <div key={key}>
            <input
              type="text"
              name={key}
              placeholder={label}
              value={values[key]}
              onChange={update(key)}
              style={{ ...inputStyle, ...(errors[key] ? invalidStyle : null) }}
              data-invalid={errors[key] ? "true" : undefined}
              onFocus={focusHandler}
              onBlur={blurHandler}
              aria-invalid={errors[key] ? "true" : undefined}
              autoComplete={key === "first_name" ? "given-name" : "family-name"}
              maxLength={60}
            />
            {errors[key] && <FieldError msg={errors[key]} />}
          </div>
        ))}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={update("email")}
          style={{ ...inputStyle, ...(errors.email ? invalidStyle : null) }}
          data-invalid={errors.email ? "true" : undefined}
          onFocus={focusHandler}
          onBlur={(e) => {
            blurHandler(e);
            validateFieldOnBlur("email")();
          }}
          aria-invalid={errors.email ? "true" : undefined}
          autoComplete="email"
          maxLength={120}
          inputMode="email"
        />
        {errors.email && <FieldError msg={errors.email} />}
      </div>

      <div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone (optional) — (555) 123-4567"
          value={values.phone}
          onChange={update("phone")}
          style={{ ...inputStyle, ...(errors.phone ? invalidStyle : null) }}
          data-invalid={errors.phone ? "true" : undefined}
          onFocus={focusHandler}
          onBlur={(e) => {
            blurHandler(e);
            validateFieldOnBlur("phone")();
          }}
          aria-invalid={errors.phone ? "true" : undefined}
          autoComplete="tel"
          maxLength={20}
          inputMode="tel"
        />
        {errors.phone && <FieldError msg={errors.phone} />}
      </div>

      <div>
        <select
          name="service"
          value={values.service}
          onChange={update("service")}
          style={{
            ...inputStyle,
            ...(errors.service ? invalidStyle : null),
            color: values.service ? C.cream : C.creamMuted,
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
          }}
          data-invalid={errors.service ? "true" : undefined}
          onFocus={focusHandler}
          onBlur={blurHandler}
          aria-invalid={errors.service ? "true" : undefined}
        >
          <option value="">What do you need help with?</option>
          {COPY.contact.serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.service && <FieldError msg={errors.service} />}
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Tell us about your situation"
          rows={4}
          value={values.message}
          onChange={update("message")}
          style={{
            ...inputStyle,
            ...(errors.message ? invalidStyle : null),
            resize: "vertical",
            fontFamily: "'Manrope', sans-serif",
          }}
          data-invalid={errors.message ? "true" : undefined}
          onFocus={focusHandler}
          onBlur={blurHandler}
          aria-invalid={errors.message ? "true" : undefined}
          maxLength={2000}
        />
        {errors.message && <FieldError msg={errors.message} />}
      </div>

      {status === "error" && errorMessage && (
        <div
          role="alert"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.78rem",
            color: "#e27b7b",
            padding: "0.85rem 1rem",
            border: "1px solid rgba(220, 80, 80, 0.35)",
            background: "rgba(220, 80, 80, 0.06)",
            lineHeight: 1.55,
          }}
        >
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.72rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          background: status === "submitting" ? "rgba(74,222,128,0.55)" : C.green,
          color: C.bg,
          border: "none",
          padding: "1.1rem",
          cursor: status === "submitting" ? "not-allowed" : "pointer",
          fontWeight: 700,
          transition: "opacity 0.3s, transform 0.3s, background 0.3s",
          marginTop: "0.25rem",
        }}
        onMouseEnter={(e) => {
          if (status !== "submitting") {
            e.target.style.opacity = "0.9";
            e.target.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
        }}
      >
        {status === "submitting" ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}

function FieldError({ msg }) {
  return (
    <p
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: "0.68rem",
        color: "#e27b7b",
        letterSpacing: "0.04em",
        marginTop: "0.35rem",
        marginLeft: "0.25rem",
      }}
    >
      {msg}
    </p>
  );
}
