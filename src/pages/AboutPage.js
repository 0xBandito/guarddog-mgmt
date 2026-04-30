import { useNavigate } from "react-router-dom";
import { C } from "../constants/colors";
import { COPY } from "../constants/copy";
import useInView from "../hooks/useInView";
import usePageMeta from "../hooks/usePageMeta";
import qHeadshot from "../assets/QUENTIN_JONES_HEADSHOT.webp";

export default function AboutPage() {
  usePageMeta({
    title: "About | Guard Dog Management",
    description:
      "Meet Quentin Jones, founder of Guard Dog Management. A former defensive back with Power 5 and NFL coaching experience, building NIL representation that protects what athletes earn.",
    path: "/about",
  });

  return (
    <>
      <Hero />
      <FounderSpotlight />
      <Differentiators />
      <Closing />
    </>
  );
}

function Hero() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ background: C.bgAlt, padding: "10rem 3rem 6rem", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "3rem", width: 1, height: "40%", background: `linear-gradient(to bottom, ${C.greenBorder}, transparent)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ maxWidth: 720, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: C.greenAccent, fontFamily: "'Manrope', sans-serif", marginBottom: "1rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ width: 20, height: 1, background: C.greenAccent, display: "inline-block" }} />
            {COPY.about.tag}
          </p>
          <h1 style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 400, color: C.cream,
            letterSpacing: "-0.01em", lineHeight: 1.05,
            marginBottom: "2rem",
          }}>{COPY.about.headline}</h1>
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "1rem",
            color: C.creamDim,
            lineHeight: 1.85,
            fontWeight: 400,
          }}>{COPY.about.body}</p>
        </div>
      </div>
    </section>
  );
}

function FounderSpotlight() {
  const [ref, inView] = useInView();
  const f = COPY.about.founder;
  return (
    <section ref={ref} style={{ background: C.bg, padding: "7rem 3rem 8rem", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="founder-grid" style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 380px) 1fr",
          gap: "5rem",
          alignItems: "start",
        }}>
          {/* Photo column */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
            position: "relative",
            aspectRatio: "3 / 4",
            border: `1.5px solid ${C.green}`,
            boxShadow: `0 0 0 1px rgba(74,222,128,0.08), 0 0 32px rgba(74,222,128,0.16)`,
            background: C.bgCard,
            overflow: "hidden",
          }}>
            <img
              src={qHeadshot}
              alt="Quentin Jones, Founder of Guard Dog Management"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
            {/* Subtle inner border accent */}
            <span aria-hidden="true" style={{
              position: "absolute",
              inset: 0,
              border: `1px solid rgba(74,222,128,0.12)`,
              pointerEvents: "none",
            }} />
          </div>

          {/* Copy column */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(24px)",
            transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
          }}>
            <p style={{
              fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase",
              color: C.greenAccent, fontFamily: "'Manrope', sans-serif",
              marginBottom: "1.25rem", fontWeight: 600,
              display: "flex", alignItems: "center", gap: "0.75rem",
            }}>
              <span style={{ width: 20, height: 1, background: C.greenAccent, display: "inline-block" }} />
              Founder
            </p>
            <h2 style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "clamp(2rem, 3.6vw, 3rem)",
              fontWeight: 400, color: C.cream,
              letterSpacing: "-0.01em", lineHeight: 1.1,
              marginBottom: "0.5rem",
            }}>
              {f.name}<span style={{ color: C.green }}>.</span>
            </h2>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(232,228,220,0.7)",
              fontWeight: 600,
              marginBottom: "2.25rem",
            }}>{f.role}</p>

            {f.bio.map((p, i) => (
              <p key={i} style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.95rem",
                color: C.creamDim,
                lineHeight: 1.85,
                fontWeight: 400,
                marginBottom: i < f.bio.length - 1 ? "1.5rem" : "2.5rem",
              }}>{p}</p>
            ))}

            {/* Quote */}
            <div style={{
              borderLeft: `2px solid ${C.green}`,
              padding: "0.5rem 0 0.5rem 1.75rem",
              background: "rgba(74,222,128,0.04)",
            }}>
              <p style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
                color: C.cream,
                lineHeight: 1.45,
                fontWeight: 400,
                fontStyle: "italic",
                letterSpacing: "-0.005em",
                margin: 0,
              }}>
                <span style={{ color: C.green, marginRight: "0.2em" }}>&ldquo;</span>
                {f.quote}
                <span style={{ color: C.green, marginLeft: "0.1em" }}>&rdquo;</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Differentiators() {
  const [ref, inView] = useInView();
  const d = COPY.about.differentiators;
  return (
    <section ref={ref} style={{ background: C.bgAlt, padding: "7rem 3rem 8rem", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          marginBottom: "3rem",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          <p style={{
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
          }}>
            <span style={{ width: 24, height: 1, background: C.greenAccent }} />
            {d.tag}
          </p>
          <h2 style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
            fontWeight: 400, color: C.cream,
            lineHeight: 1.1, letterSpacing: "-0.015em",
            textTransform: "uppercase",
            whiteSpace: "normal",
            overflowWrap: "break-word",
          }}>
            {d.headline}
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {d.items.map((item, i) => (
            <div
              key={item.num}
              className="service-subrow"
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "1.5rem",
                alignItems: "center",
                padding: "1.35rem 0",
                borderTop: `1px solid ${C.border}`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.6s ease ${0.1 + i * 0.08}s, transform 0.6s ease ${0.1 + i * 0.08}s`,
              }}
            >
              <span style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.75rem",
                color: C.green,
                letterSpacing: "0.15em",
                fontWeight: 600,
                minWidth: 28,
                paddingTop: "0.35rem",
              }}>{item.num}</span>
              <div>
                <h3 style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "clamp(1.3rem, 1.75vw, 1.7rem)",
                  color: C.cream,
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}>{item.title}</h3>
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
                  color: "rgba(232,228,220,0.82)",
                  lineHeight: 1.65,
                  fontWeight: 400,
                }}>{item.body}</p>
              </div>
            </div>
          ))}
          {/* Closing border so the last row visually completes */}
          <div style={{ borderTop: `1px solid ${C.border}` }} />
        </div>
      </div>
    </section>
  );
}

function Closing() {
  const [ref, inView] = useInView();
  const navigate = useNavigate();
  const c = COPY.about.closing;
  return (
    <section ref={ref} style={{ background: C.bg, padding: "8rem 3rem 9rem", textAlign: "center", position: "relative" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.68rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: C.greenAccent,
          fontWeight: 600,
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}>
          <span style={{ width: 28, height: 1, background: C.greenAccent }} />
          What Comes Next
          <span style={{ width: 28, height: 1, background: C.greenAccent }} />
        </p>
        <h2 style={{
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
          fontWeight: 400, color: C.cream,
          lineHeight: 1.1, letterSpacing: "-0.015em",
          marginBottom: "2rem",
          textTransform: "uppercase",
        }}>
          {c.headline.split(/(\.)\s*$/)[0]}<span style={{ color: C.green }}>.</span>
        </h2>
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "clamp(1rem, 1.15vw, 1.15rem)",
          color: "rgba(232,228,220,0.92)",
          lineHeight: 1.7,
          fontWeight: 400,
          marginBottom: "3rem",
          maxWidth: 640,
          margin: "0 auto 3rem",
        }}>{c.body}</p>
        <button
          onClick={() => navigate("/contact")}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.85rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            background: C.green,
            color: C.bg,
            border: `2px solid ${C.green}`,
            padding: "1.35rem 3.25rem",
            cursor: "pointer",
            fontWeight: 700,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            boxShadow: `0 0 0 1px ${C.green}66, 0 8px 24px rgba(74,222,128,0.3)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = `0 0 0 1px ${C.green}, 0 14px 36px rgba(74,222,128,0.5)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = `0 0 0 1px ${C.green}66, 0 8px 24px rgba(74,222,128,0.3)`;
          }}
        >{c.button}</button>
      </div>
    </section>
  );
}
