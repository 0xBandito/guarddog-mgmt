import { Link } from "react-router-dom";
import { C } from "../constants/colors";
import { COPY } from "../constants/copy";
import useInView from "../hooks/useInView";
import usePageMeta from "../hooks/usePageMeta";
import CTABanner from "../components/CTABanner";

export default function WhyPage() {
  usePageMeta({
    title: "Why Guard Dog — Built for Athletes, Not Banks",
    description:
      "College athletes are signing six-figure NIL deals with no financial infrastructure around them. Guard Dog was built to fill that gap before the habits that last a lifetime get set.",
    path: "/why-guard-dogs",
  });

  const [ref, inView] = useInView();
  const [pillarsRef, pillarsInView] = useInView();
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

      <PillarsSection pillarsRef={pillarsRef} pillarsInView={pillarsInView} />

      <CTABanner />
    </>
  );
}

function PillarsSection({ pillarsRef, pillarsInView }) {
  return (
    <section ref={pillarsRef} style={{ background: C.bgAlt, padding: "6rem 3rem 8rem", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "3rem",
            opacity: pillarsInView ? 1 : 0,
            transform: pillarsInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: C.greenAccent,
              fontWeight: 600,
              marginBottom: "1.2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span style={{ width: 24, height: 1, background: C.greenAccent }} />
            {COPY.why.pillarsTag}
          </p>
          <h2
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
              fontWeight: 400,
              color: C.cream,
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              textTransform: "uppercase",
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}
          >
            Full Coverage.<br />
            No Blind Spots<span style={{ color: C.green }}>.</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {COPY.why.pillars.map((p, i) => (
            <Link
              key={p.slug}
              to={`/why-guard-dogs/${p.slug}`}
              className="service-subrow"
              style={{
                textDecoration: "none",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "1.5rem",
                alignItems: "center",
                padding: "1.35rem 0",
                borderTop: `1px solid ${C.border}`,
                transition: "border-color 0.3s, opacity 0.6s ease, transform 0.6s ease",
                opacity: pillarsInView ? 1 : 0,
                transform: pillarsInView ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${0.1 + i * 0.08}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderTopColor = C.green;
                const arr = e.currentTarget.querySelector(".svc-arrow");
                if (arr) arr.style.transform = "translateX(4px)";
                const num = e.currentTarget.querySelector(".svc-num");
                if (num) num.style.color = C.green;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderTopColor = C.border;
                const arr = e.currentTarget.querySelector(".svc-arrow");
                if (arr) arr.style.transform = "translateX(0)";
                const num = e.currentTarget.querySelector(".svc-num");
                if (num) num.style.color = C.creamMuted;
              }}
            >
              <span
                className="svc-num"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.75rem",
                  color: C.creamMuted,
                  letterSpacing: "0.15em",
                  fontWeight: 600,
                  transition: "color 0.3s",
                  minWidth: 28,
                  paddingTop: "0.35rem",
                }}
              >{p.num}</span>
              <div>
                <h3
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "clamp(1.3rem, 1.75vw, 1.7rem)",
                    color: C.cream,
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    marginBottom: "0.5rem",
                    textTransform: "uppercase",
                  }}
                >{p.title}</h3>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
                    color: "rgba(232,228,220,0.82)",
                    lineHeight: 1.65,
                    fontWeight: 400,
                  }}
                >{p.body}</p>
              </div>
              <span
                className="svc-arrow"
                style={{
                  color: C.creamMuted,
                  fontSize: "1rem",
                  transition: "transform 0.3s, color 0.3s",
                  paddingTop: "0.25rem",
                }}
              >&rarr;</span>
            </Link>
          ))}
          {/* Closing border so the last row visually completes */}
          <div style={{ borderTop: `1px solid ${C.border}` }} />
        </div>
      </div>
    </section>
  );
}
