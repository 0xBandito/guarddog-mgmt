import { C } from "../constants/colors";
import { COPY } from "../constants/copy";

const inputStyle = {
  fontFamily: "'Manrope', sans-serif", fontSize: "0.82rem",
  background: C.bgCard, border: `1px solid ${C.border}`,
  color: C.cream, padding: "1rem 1.25rem",
  outline: "none", transition: "border-color 0.3s",
  fontWeight: 400,
};

const focusHandler = (e) => { e.target.style.borderColor = C.greenBorder; };
const blurHandler = (e) => { e.target.style.borderColor = C.border; };

export default function ContactForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} style={{
      display: "flex", flexDirection: "column", gap: "0.75rem",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }} className="form-grid">
        {["First Name", "Last Name"].map((field) => (
          <input key={field}
            type="text"
            placeholder={field}
            style={inputStyle}
            onFocus={focusHandler}
            onBlur={blurHandler}
          />
        ))}
      </div>
      {["Email", "Phone"].map((field) => (
        <input key={field}
          type={field === "Email" ? "email" : "tel"}
          placeholder={field}
          style={inputStyle}
          onFocus={focusHandler}
          onBlur={blurHandler}
        />
      ))}
      <select style={{
        ...inputStyle,
        color: C.creamMuted,
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center",
      }}
        onFocus={focusHandler}
        onBlur={blurHandler}
        onChange={(e) => { if (e.target.value) e.target.style.color = C.cream; }}
      >
        <option value="">What do you need help with?</option>
        {COPY.contact.serviceOptions.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      <textarea
        placeholder="Tell us about your situation"
        rows={4}
        style={{
          ...inputStyle,
          resize: "vertical",
        }}
        onFocus={focusHandler}
        onBlur={blurHandler}
      />
      <button type="submit" style={{
        fontFamily: "'Manrope', sans-serif", fontSize: "0.72rem",
        letterSpacing: "0.15em", textTransform: "uppercase",
        background: C.green, color: C.bg, border: "none",
        padding: "1.1rem", cursor: "pointer", fontWeight: 700,
        transition: "opacity 0.3s, transform 0.3s",
      }}
        onMouseEnter={(e) => { e.target.style.opacity = "0.85"; e.target.style.transform = "translateY(-1px)"; }}
        onMouseLeave={(e) => { e.target.style.opacity = "1"; e.target.style.transform = "translateY(0)"; }}
      >Submit</button>
    </form>
  );
}
