import { C } from "../constants/colors";
import { COPY } from "../constants/copy";
import useInView from "../hooks/useInView";
import CTABanner from "../components/CTABanner";

export default function AboutPage() {
  const [ref, inView] = useInView();
  return (
    <>
      <section ref={ref} style={{ background: C.bgAlt, padding: "10rem 3rem 9rem", position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 600, marginBottom: "5rem", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: C.greenAccent, fontFamily: "'Manrope', sans-serif", marginBottom: "1rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ width: 20, height: 1, background: C.greenAccent, display: "inline-block" }} />
              {COPY.about.tag}
            </p>
            <h1 style={{
              fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400, color: C.cream, letterSpacing: "-0.01em", lineHeight: 1.05, marginBottom: "2rem",
            }}>{COPY.about.headline}</h1>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.95rem", color: C.creamDim, lineHeight: 1.85, fontWeight: 400 }}>{COPY.about.body}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }} className="team-grid">
            {COPY.about.team.map((t, i) => (
              <div key={i} style={{
                background: C.bgCard, border: `1px solid ${C.border}`,
                padding: "3rem 2rem 2.5rem",
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                position: "relative",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.borderHover; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; }}
              >
                <div style={{
                  position: "absolute", top: "1.25rem", right: "1.25rem",
                  fontFamily: "'Manrope', sans-serif", fontSize: "0.55rem",
                  color: C.creamMuted, letterSpacing: "0.1em", fontWeight: 600,
                }}>0{i + 1}</div>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", marginBottom: "2rem",
                  background: C.bgElevated, border: `1px solid ${C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.creamMuted} strokeWidth="1.2">
                    <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/>
                  </svg>
                </div>
                <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1rem", color: C.cream, letterSpacing: "0.02em", marginBottom: "0.35rem" }}>{t.name}</p>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.65rem", color: C.creamMuted, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
