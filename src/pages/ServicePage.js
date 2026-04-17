import { useParams, Link, Navigate } from "react-router-dom";
import { C } from "../constants/colors";
import { COPY } from "../constants/copy";
import useInView from "../hooks/useInView";
import CTABanner from "../components/CTABanner";

export default function ServicePage() {
  const { slug } = useParams();
  const service = COPY.services.items.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/" replace />;

  const otherServices = COPY.services.items.filter((s) => s.slug !== slug);

  return (
    <>
      <ServiceHero service={service} />
      <ServiceDetail service={service} />
      <RelatedServices services={otherServices} />
      <CTABanner />
    </>
  );
}

function ServiceHero({ service }) {
  return (
    <section style={{
      minHeight: "50vh", background: C.bg,
      display: "flex", alignItems: "flex-end",
      position: "relative", overflow: "hidden", padding: "10rem 3rem 5rem",
    }}>
      <div style={{ position: "absolute", top: 0, left: "3rem", width: 1, height: "60%", background: `linear-gradient(to bottom, ${C.greenBorder}, transparent)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${C.green}22, transparent 60%)` }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        <div style={{
          fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase",
          color: C.greenAccent, fontFamily: "'Manrope', sans-serif", marginBottom: "1.5rem",
          fontWeight: 600, display: "flex", alignItems: "center", gap: "0.75rem",
        }}>
          <span style={{ width: 20, height: 1, background: C.greenAccent, display: "inline-block" }} />
          Pillar {service.num}
        </div>
        <h1 style={{
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em",
          color: C.cream, marginBottom: "1.5rem",
        }}>
          {service.title}<span style={{ color: C.green }}>.</span>
        </h1>
        <p style={{
          fontFamily: "'Manrope', sans-serif", fontSize: "1.05rem",
          color: C.creamDim, fontWeight: 400, maxWidth: 550, lineHeight: 1.7,
          fontStyle: "italic",
        }}>
          {service.detail.tagline}
        </p>
      </div>
    </section>
  );
}

function ServiceDetail({ service }) {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ background: C.bgAlt, padding: "6rem 3rem 7rem", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "5rem", alignItems: "start" }} className="why-grid">
        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-24px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          {service.detail.paragraphs.map((p, i) => (
            <p key={i} style={{
              fontFamily: "'Manrope', sans-serif", fontSize: "0.95rem",
              color: C.creamDim, lineHeight: 1.9, fontWeight: 400,
              marginBottom: i < service.detail.paragraphs.length - 1 ? "2rem" : 0,
            }}>{p}</p>
          ))}
        </div>

        <div style={{
          opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(24px)",
          transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
        }}>
          <p style={{
            fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase",
            color: C.greenAccent, fontFamily: "'Manrope', sans-serif", marginBottom: "1.5rem",
            fontWeight: 600, display: "flex", alignItems: "center", gap: "0.75rem",
          }}>
            <span style={{ width: 20, height: 1, background: C.greenAccent, display: "inline-block" }} />
            What's Included
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {service.detail.features.map((f, i) => (
              <div key={i} style={{
                padding: "1.25rem 0",
                borderBottom: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", gap: "1rem",
              }}>
                <div style={{ width: 6, height: 6, background: C.green, borderRadius: "50%", flexShrink: 0 }} />
                <p style={{
                  fontFamily: "'Manrope', sans-serif", fontSize: "0.88rem",
                  color: C.cream, fontWeight: 500, lineHeight: 1.5,
                }}>{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RelatedServices({ services }) {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{ background: C.bg, padding: "6rem 3rem 7rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{
          fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase",
          color: C.greenAccent, fontFamily: "'Manrope', sans-serif", marginBottom: "2.5rem",
          fontWeight: 600, display: "flex", alignItems: "center", gap: "0.75rem",
        }}>
          <span style={{ width: 20, height: 1, background: C.greenAccent, display: "inline-block" }} />
          Other Services
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="team-grid">
          {services.map((s, i) => (
            <Link key={s.slug} to={`/services/${s.slug}`} style={{ textDecoration: "none" }}>
              <div style={{
                background: C.bgCard, border: `1px solid ${C.border}`,
                padding: "2.5rem 2rem",
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.borderHover; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; }}
              >
                <div style={{
                  fontFamily: "'Manrope', sans-serif", fontSize: "0.55rem",
                  color: C.creamMuted, letterSpacing: "0.1em", fontWeight: 600,
                  marginBottom: "1.5rem",
                }}>{s.num}</div>
                <h3 style={{
                  fontFamily: "'Archivo Black', sans-serif", fontSize: "1.1rem",
                  color: C.cream, fontWeight: 400, letterSpacing: "0.01em",
                  lineHeight: 1.2, marginBottom: "0.75rem",
                }}>{s.title}</h3>
                <p style={{
                  fontFamily: "'Manrope', sans-serif", fontSize: "0.78rem",
                  color: C.creamDim, lineHeight: 1.7, fontWeight: 400,
                }}>{s.body}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
