import { useNavigate } from "react-router-dom";
import { C } from "../constants/colors";
import { COPY } from "../constants/copy";
import useInView from "../hooks/useInView";

export default function CTABanner() {
  const [ref, inView] = useInView();
  const navigate = useNavigate();

  return (
    <section ref={ref} style={{
      padding: "8rem 3rem", textAlign: "center",
      position: "relative", overflow: "hidden",
      background: C.bg,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
    }}>
      <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: `linear-gradient(90deg, transparent, ${C.green}22, transparent)` }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(10rem, 20vw, 16rem)",
        color: "rgba(232,228,220,0.012)", lineHeight: 1, pointerEvents: "none",
        letterSpacing: "-0.02em",
      }}>GD</div>

      <h2 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: C.cream, fontWeight: 400, marginBottom: "1rem", position: "relative", lineHeight: 1.05, letterSpacing: "-0.01em", maxWidth: 700, margin: "0 auto 1rem" }}>{COPY.cta.headline}</h2>
      <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.95rem", color: C.creamDim, marginBottom: "2.5rem", position: "relative", fontWeight: 400 }}>{COPY.cta.body}</p>
      <button
        onClick={() => navigate("/contact")}
        style={{
          fontFamily: "'Manrope', sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em",
          textTransform: "uppercase", background: C.green, color: C.bg,
          border: "none", padding: "1.1rem 3rem", cursor: "pointer", fontWeight: 700,
          transition: "opacity 0.3s, transform 0.3s", position: "relative",
        }}
        onMouseEnter={(e) => { e.target.style.opacity = "0.85"; e.target.style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { e.target.style.opacity = "1"; e.target.style.transform = "translateY(0)"; }}
      >{COPY.cta.button}</button>
    </section>
  );
}
