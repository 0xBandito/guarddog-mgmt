import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { C } from "../constants/colors";
import { COPY } from "../constants/copy";
import useScrollScene from "../hooks/useScrollScene";

/* ===== Loader ===== */
function Loader({ progress, done }) {
  return (
    <div id="home-loader" className={done ? "loaded" : ""}>
      <div className="loader-brand">GUARD DOG</div>
      <div className="loader-track">
        <div className="loader-bar" style={{ width: progress + "%" }} />
      </div>
      <div className="loader-percent">{progress}%</div>
    </div>
  );
}

/* ===== Hero (standalone 100vh) ===== */
function HeroStandalone({ heroRef }) {
  const navigate = useNavigate();
  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        background: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        overflow: "hidden",
        padding: "0 1.5rem",
      }}
    >
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "'Archivo Black', sans-serif",
        fontSize: "clamp(12rem, 28vw, 32rem)",
        color: "rgba(74,222,128,0.018)",
        lineHeight: 1, pointerEvents: "none",
        letterSpacing: "-0.02em", whiteSpace: "nowrap",
      }}>GD</div>

      <div style={{ textAlign: "center", position: "relative", zIndex: 2, maxWidth: 900 }}>
        <div
          className="hero-tag"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: C.greenAccent,
            fontWeight: 600,
            marginBottom: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <span style={{ width: 28, height: 1, background: C.greenAccent }} />
          {COPY.hero.tag}
          <span style={{ width: 28, height: 1, background: C.greenAccent }} />
        </div>

        <h1
          className="hero-heading"
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "clamp(4rem, 11vw, 10rem)",
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: C.cream,
            marginBottom: "2rem",
            textTransform: "uppercase",
          }}
        >
          <span className="hero-word" style={{ display: "block", overflow: "hidden" }}>Protect</span>
          <span className="hero-word" style={{ display: "block", overflow: "hidden" }}>The</span>
          <span className="hero-word" style={{ display: "block", overflow: "hidden" }}>
            Bag<span style={{ color: C.green }}>.</span>
          </span>
        </h1>

        <p
          className="hero-sub"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
            color: C.creamDim,
            lineHeight: 1.75,
            maxWidth: 580,
            margin: "0 auto 2.75rem",
            fontWeight: 400,
          }}
        >
          {COPY.hero.subheadline}
        </p>

        <div
          className="hero-ctas"
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => navigate("/contact")}
            className="hover-lift"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              background: C.green,
              color: C.bg,
              border: "none",
              padding: "1.1rem 2.5rem",
              cursor: "pointer",
              fontWeight: 700,
              transition: "opacity 0.3s, transform 0.3s",
            }}
            onMouseEnter={(e) => { e.target.style.opacity = "0.85"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.target.style.opacity = "1"; e.target.style.transform = "translateY(0)"; }}
          >{COPY.hero.cta}</button>
        </div>
      </div>

      <div
        className="hero-scroll-indicator"
        style={{
          position: "absolute",
          bottom: "0.8rem",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(232,228,220,0.6)",
          fontSize: "0.58rem",
          fontFamily: "'Manrope', sans-serif",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          fontWeight: 600,
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <div className="hero-scroll-inner">
          <span>Scroll</span>
          <svg width="12" height="18" viewBox="0 0 14 22" fill="none">
            <path d="M7 0v18M1 13l6 6 6-6" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </div>
      </div>

      {/* Subtle bottom fade so the indicator reads cleanly over the CTAs above */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "5rem",
          background: "linear-gradient(to bottom, rgba(12,11,9,0) 0%, rgba(12,11,9,0.7) 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </section>
  );
}

/* ===== Mission Section ===== */
function MissionSection() {
  return (
    <section
      className="scroll-section align-center mission-section"
      data-enter="42" data-leave="52" data-animation="fade-up"
    >
      {/* Dark radial scrim — darkens canvas behind the text, fades to transparent at edges */}
      <div className="mission-scrim" aria-hidden="true" />
      <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="section-label"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: C.greenAccent,
            fontWeight: 600,
            marginBottom: "2rem",
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
          }}
        >Our Mission</div>
        <p
          className="mission-text"
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 3.25rem)",
            color: C.cream,
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            maxWidth: 1000,
            margin: "0 auto",
            textShadow: "0 4px 24px rgba(0,0,0,0.7), 0 0 60px rgba(0,0,0,0.5)",
          }}
        >
          <span style={{ color: C.green, marginRight: "0.3em" }}>&ldquo;</span>
          {COPY.mission}
          <span style={{ color: C.green, marginLeft: "0.1em" }}>&rdquo;</span>
        </p>
      </div>
    </section>
  );
}

/* ===== Services Section ===== */
function ServicesSection() {
  return (
    <section
      className="scroll-section align-left services-section"
      data-enter="52" data-leave="65" data-animation="slide-left"
    >
      {/* Left-side scrim — darkens the canvas behind the services text */}
      <div className="services-scrim" aria-hidden="true" />
      <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="section-label"
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
          {COPY.services.tag}
        </div>
        <h2
          className="section-heading"
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
            fontWeight: 400,
            color: C.cream,
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            marginBottom: "3rem",
            textTransform: "uppercase",
            whiteSpace: "normal",
            overflowWrap: "break-word",
          }}
        >
          Full Coverage.<br />
          No Blind Spots<span style={{ color: C.green }}>.</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {COPY.services.items.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="service-subrow"
              style={{
                textDecoration: "none",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "1.5rem",
                alignItems: "center",
                padding: "1.35rem 0",
                borderTop: `1px solid ${C.border}`,
                transition: "border-color 0.3s",
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
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >{s.num}</span>
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
                    textShadow: "0 2px 16px rgba(0,0,0,0.6)",
                  }}
                >{s.title}</h3>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "clamp(0.95rem, 1.05vw, 1.05rem)",
                    color: "rgba(232,228,220,0.82)",
                    lineHeight: 1.65,
                    fontWeight: 400,
                    textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                  }}
                >{s.body}</p>
              </div>
              <span
                className="svc-arrow"
                style={{
                  color: C.creamMuted,
                  fontSize: "1rem",
                  transition: "transform 0.3s, color 0.3s",
                  paddingTop: "0.25rem",
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >&rarr;</span>
            </Link>
          ))}
        </div>

        <div
          className="section-foot"
          style={{ marginTop: "2rem" }}
        >
          <Link
            to="/why-guard-dogs"
            className="section-note"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.7rem",
              color: C.green,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
              textDecoration: "none",
              borderBottom: `1px solid ${C.greenBorder}`,
              paddingBottom: "0.3rem",
            }}
          >
            Why Guard Dog &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ===== Stats Section ===== */
function StatsSection() {
  return (
    <section
      className="scroll-section align-center"
      data-enter="65" data-leave="73" data-animation="stagger-up"
    >
      <div className="section-inner">
        <div
          className="section-label"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: C.green,
            fontWeight: 600,
            marginBottom: "1.2rem",
          }}
        >{COPY.why.tag}</div>
        <h2
          className="section-heading"
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: 400,
            color: C.cream,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            marginBottom: "4rem",
            textTransform: "uppercase",
          }}
        >
          {COPY.why.headline}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "3rem",
            maxWidth: 1100,
            margin: "0 auto",
          }}
          className="stats-grid"
        >
          {COPY.why.stats.map((s, i) => {
            const parsed = parseStat(s.number);
            return (
              <div key={i} className="stat" style={{ textAlign: "center" }}>
                <div
                  className="stat-number"
                  data-value={parsed.value}
                  data-prefix={parsed.prefix}
                  data-suffix={parsed.suffix}
                  data-decimals={parsed.decimals}
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    fontWeight: 400,
                    color: C.green,
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                    marginBottom: "1rem",
                    textTransform: "uppercase",
                  }}
                >
                  {parsed.prefix}0{parsed.suffix}
                </div>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.82rem",
                    color: C.creamDim,
                    lineHeight: 1.5,
                    fontWeight: 400,
                    maxWidth: 280,
                    margin: "0 auto",
                  }}
                >{s.label}</p>
              </div>
            );
          })}
        </div>

        <div
          className="section-foot"
          style={{
            margin: "3rem auto 0",
            maxWidth: 680,
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem",
            padding: "1.5rem 1.75rem",
            borderLeft: `2px solid ${C.green}`,
            background: "rgba(74,222,128,0.04)",
          }}
        >
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.6rem",
              color: C.green,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 700,
              flexShrink: 0,
              paddingTop: "0.15rem",
              whiteSpace: "nowrap",
            }}
          >
            For Context
          </span>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.9rem",
              color: "rgba(232,228,220,0.88)",
              lineHeight: 1.65,
              fontWeight: 400,
              margin: 0,
            }}
          >
            {COPY.why.footnote.replace(/^For context:\s*/i, "")}
          </p>
        </div>
      </div>
    </section>
  );
}

/* Parse "$1.17B", "2%", "500K+" into counter-animatable components */
function parseStat(str) {
  const prefixMatch = str.match(/^[^\d.]+/);
  const prefix = prefixMatch ? prefixMatch[0] : "";
  const rest = str.slice(prefix.length);
  const numMatch = rest.match(/^([\d,.]+)/);
  const numRaw = numMatch ? numMatch[1].replace(/,/g, "") : "0";
  const value = parseFloat(numRaw);
  const suffix = rest.slice(numMatch ? numMatch[1].length : 0);
  const decimals = (numRaw.split(".")[1] || "").length;
  return { prefix, value, suffix, decimals };
}

/* ===== Team Section ===== */
function TeamSection() {
  return (
    <section
      className="scroll-section align-center"
      data-enter="73" data-leave="82" data-animation="clip-reveal"
    >
      <div className="section-inner">
        <div
          className="section-label"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: C.greenAccent,
            fontWeight: 600,
            marginBottom: "1.2rem",
          }}
        >{COPY.about.tag}</div>
        <h2
          className="section-heading"
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: 400,
            color: C.cream,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            marginBottom: "3rem",
            textTransform: "uppercase",
          }}
        >{COPY.about.headline}</h2>

        <div
          className="team-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {COPY.about.team.map((t, i) => (
            <div
              key={t.name}
              className="team-member hover-lift"
              style={{
                padding: "2rem 1.5rem 1.75rem",
                background: "rgba(12,11,9,0.55)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: `1px solid ${C.border}`,
                textAlign: "left",
                transition: "border-color 0.3s, transform 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.borderHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; }}
            >
              <div style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.55rem",
                color: C.creamMuted,
                letterSpacing: "0.15em",
                fontWeight: 600,
                marginBottom: "1.25rem",
              }}>0{i + 1}</div>
              <div style={{
                width: 62, height: 62, borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.bgElevated} 0%, ${C.bgCard} 100%)`,
                border: `1.5px solid ${C.green}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1.5rem",
                position: "relative",
                boxShadow: `0 0 0 1px rgba(74,222,128,0.08), 0 0 24px rgba(74,222,128,0.12)`,
              }}>
                <span style={{
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: "1.35rem",
                  color: C.green,
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                  textTransform: "uppercase",
                }}>{t.name.charAt(0)}</span>
                <span style={{
                  position: "absolute",
                  bottom: -4, right: -4,
                  width: 14, height: 14,
                  borderRadius: "50%",
                  background: C.green,
                  border: `2px solid ${C.bg}`,
                  boxShadow: `0 0 8px ${C.green}88`,
                }} />
              </div>
              <p style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "1.05rem",
                color: C.cream,
                letterSpacing: "0.02em",
                marginBottom: "0.4rem",
                textTransform: "uppercase",
              }}>{t.name}</p>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.68rem",
                color: "rgba(232,228,220,0.7)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 500,
                lineHeight: 1.55,
              }}>{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== CTA Section ===== */
function CTASection() {
  const navigate = useNavigate();
  return (
    <section
      className="scroll-section align-center cta-section"
      data-enter="82" data-leave="100" data-animation="scale-up"
      data-persist="true"
    >
      <div className="cta-scrim" aria-hidden="true" />
      <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="section-label"
          style={{
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
          }}
        >
          <span style={{ width: 28, height: 1, background: C.greenAccent }} />
          Get In Touch
          <span style={{ width: 28, height: 1, background: C.greenAccent }} />
        </div>

        <h2
          className="section-heading"
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 400,
            color: C.cream,
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            marginBottom: "1.5rem",
            textTransform: "uppercase",
            textShadow: "0 4px 24px rgba(0,0,0,0.7)",
          }}
        >
          Your Money.<br />
          Your Future.<br />
          <span style={{ color: C.green }}>Our Watch.</span>
        </h2>

        <p
          className="section-body"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "clamp(1.05rem, 1.25vw, 1.25rem)",
            color: "rgba(232,228,220,0.95)",
            lineHeight: 1.6,
            fontWeight: 500,
            marginBottom: "2.5rem",
            maxWidth: 600,
            margin: "0 auto 2.5rem",
            textShadow: "0 2px 16px rgba(0,0,0,0.7)",
          }}
        >{COPY.cta.body}</p>

        <div className="cta-button-wrap" style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="cta-primary-btn"
            onClick={() => navigate("/contact")}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.95rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              background: C.green,
              color: C.bg,
              border: `2px solid ${C.green}`,
              padding: "1.5rem 3.75rem",
              cursor: "pointer",
              fontWeight: 700,
              opacity: 1,
              transform: "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
              boxShadow: `0 0 0 1px ${C.green}66, 0 10px 32px rgba(74,222,128,0.35), 0 2px 14px rgba(0,0,0,0.7)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = `0 0 0 1px ${C.green}, 0 18px 48px rgba(74,222,128,0.55), 0 4px 18px rgba(0,0,0,0.7)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 0 0 1px ${C.green}66, 0 10px 32px rgba(74,222,128,0.35), 0 2px 14px rgba(0,0,0,0.7)`;
            }}
          >{COPY.cta.button}</button>
        </div>
      </div>
    </section>
  );
}

/* ===== HomePage ===== */
export default function HomePage() {
  const canvasRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const heroRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const darkOverlayRef = useRef(null);
  const marqueeRef = useRef(null);

  const { loadProgress, loaded } = useScrollScene({
    canvasRef,
    scrollContainerRef,
    heroRef,
    canvasWrapRef,
    darkOverlayRef,
    marqueeRef,
  });

  // Hide the pre-React HTML loader as soon as the React Loader is on screen.
  // Both loaders are styled identically so the handoff is visually seamless.
  useEffect(() => {
    const el = document.getElementById("initial-loader");
    if (el) el.classList.add("hidden");
  }, []);

  // Animate hero words in after loader hides
  useEffect(() => {
    if (!loaded) return;
    const words = document.querySelectorAll(".hero-word");
    const tag = document.querySelector(".hero-tag");
    const sub = document.querySelector(".hero-sub");
    const ctas = document.querySelector(".hero-ctas");
    const indicator = document.querySelector(".hero-scroll-indicator");

    // Translate-on-reveal elements: setting transform won't clobber anything.
    const translateEls = [tag, ...words, sub, ctas].filter(Boolean);
    translateEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 0.9s ease, transform 0.9s ease";
    });

    // Scroll indicator: only fade opacity — keep its translateX(-50%) centering
    // and let the CSS bounce animation on the inner element run uninterrupted.
    if (indicator) {
      indicator.style.opacity = "0";
      indicator.style.transition = "opacity 0.9s ease";
    }

    requestAnimationFrame(() => {
      translateEls.forEach((el, i) => {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, 80 + i * 120);
      });
      if (indicator) {
        setTimeout(() => { indicator.style.opacity = "1"; }, 80 + translateEls.length * 120);
      }
    });
  }, [loaded]);

  return (
    <>
      <Loader progress={loadProgress} done={loaded} />

      <HeroStandalone heroRef={heroRef} />

      <div ref={canvasWrapRef} className="canvas-wrap">
        <canvas ref={canvasRef} id="canvas" />
      </div>

      <div ref={darkOverlayRef} className="home-dark-overlay" />

      <div ref={marqueeRef} className="marquee-wrap">
        <div className="marquee-text">
          Protect The Bag &nbsp;&bull;&nbsp; Protect The Bag &nbsp;&bull;&nbsp; Protect The Bag
        </div>
      </div>

      <div ref={scrollContainerRef} id="scroll-container">
        <MissionSection />
        <ServicesSection />
        <StatsSection />
        <TeamSection />
        <CTASection />
      </div>
    </>
  );
}
