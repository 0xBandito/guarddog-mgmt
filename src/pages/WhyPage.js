import { C } from "../constants/colors";
import { COPY } from "../constants/copy";
import useInView from "../hooks/useInView";
import CTABanner from "../components/CTABanner";

export default function WhyPage() {
  const [ref, inView] = useInView();
  return (
    <>
      <section ref={ref} style={{ background: C.bg, padding: "10rem 3rem 8rem", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "3rem", width: 1, height: "40%", background: `linear-gradient(to bottom, ${C.greenBorder}, transparent)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: "4rem", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: C.greenAccent, fontFamily: "'Manrope', sans-serif", marginBottom: "1rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ width: 20, height: 1, background: C.greenAccent, display: "inline-block" }} />
              {COPY.why.tag}
            </p>
            <h1 style={{
              fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400, color: C.cream, letterSpacing: "-0.01em", lineHeight: 1.05,
            }}>{COPY.why.headline}</h1>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "6rem", alignItems: "start" }} className="why-grid">
            <div style={{
              opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-24px)",
              transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
            }}>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.95rem", color: C.creamDim, lineHeight: 1.9, fontWeight: 400, marginBottom: "3rem" }}>{COPY.why.body}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: 40, height: 1, background: C.green }} />
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.65rem", color: C.green, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>The NIL era needs new infrastructure.</span>
              </div>
            </div>

            <div style={{
              opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
              display: "flex", flexDirection: "column",
            }}>
              {COPY.why.stats.map((s, i) => (
                <div key={i} style={{ padding: "2rem 0", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{
                    fontFamily: "'Archivo Black', sans-serif", fontSize: "2.8rem", fontWeight: 400,
                    color: C.green, lineHeight: 1, marginBottom: "0.6rem", letterSpacing: "-0.01em",
                  }}>{s.number}</div>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.78rem", color: C.creamDim, lineHeight: 1.6, fontWeight: 400 }}>{s.label}</p>
                </div>
              ))}
              <div style={{ paddingTop: "1.5rem" }}>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.7rem", color: C.creamMuted, lineHeight: 1.7, fontWeight: 400, fontStyle: "italic" }}>{COPY.why.footnote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
