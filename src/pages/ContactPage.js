import { C } from "../constants/colors";
import { COPY } from "../constants/copy";
import useInView from "../hooks/useInView";
import usePageMeta from "../hooks/usePageMeta";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  usePageMeta({
    title: "Contact — Let's Build with Guard Dog Management",
    description:
      "Whether you just signed your first NIL deal or you're looking for long-term wealth strategy, we're here. No pressure, no pitch — just a conversation about protecting what is yours.",
    path: "/contact",
  });

  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ background: C.bgAlt, padding: "10rem 3rem 10rem", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "3rem", right: "3rem", height: "1px", background: `linear-gradient(90deg, ${C.border}, transparent 70%)` }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "6rem", alignItems: "start" }} className="contact-grid">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: C.greenAccent, fontFamily: "'Manrope', sans-serif", marginBottom: "1rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ width: 20, height: 1, background: C.greenAccent, display: "inline-block" }} />
            {COPY.contact.tag}
          </p>
          <h1 style={{
            fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 400, color: C.cream, letterSpacing: "-0.01em", lineHeight: 1.05, marginBottom: "2rem",
          }}>{COPY.contact.headline}</h1>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.9rem", color: C.creamDim, lineHeight: 1.8, fontWeight: 400, marginBottom: "2.5rem" }}>
            {COPY.contact.intro}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "Email", value: COPY.contact.email },
              { label: "Based in", value: COPY.contact.location },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.6rem", color: C.greenAccent, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, minWidth: 60 }}>{item.label}</span>
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.88rem", color: C.creamDim, fontWeight: 400 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(24px)",
          transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
        }}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
