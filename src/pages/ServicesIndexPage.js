import { Link } from "react-router-dom";
import { C } from "../constants/colors";
import { COPY } from "../constants/copy";
import useInView from "../hooks/useInView";
import CTABanner from "../components/CTABanner";

export default function ServicesIndexPage() {
  const [headerRef, headerInView] = useInView();
  const [listRef, listInView] = useInView();

  return (
    <>
      <section
        ref={headerRef}
        style={{
          background: C.bg,
          padding: "10rem 3rem 4rem",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "3rem",
            width: 1,
            height: "40%",
            background: `linear-gradient(to bottom, ${C.greenBorder}, transparent)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              marginBottom: "3rem",
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <p
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: C.greenAccent,
                fontFamily: "'Manrope', sans-serif",
                marginBottom: "1rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ width: 20, height: 1, background: C.greenAccent, display: "inline-block" }} />
              {COPY.services.tag}
            </p>
            <h1
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 400,
                color: C.cream,
                letterSpacing: "-0.01em",
                lineHeight: 1.05,
                marginBottom: "2rem",
              }}
            >
              {COPY.services.headline}
            </h1>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "1rem",
                color: C.creamDim,
                lineHeight: 1.85,
                fontWeight: 400,
                maxWidth: 640,
              }}
            >
              Four pillars, one goal: make sure the money you earn on the field works for you long after the cleats come off. Each service below can stand on its own or plug into a full-coverage strategy built around your career.
            </p>
          </div>
        </div>
      </section>

      <section
        ref={listRef}
        style={{
          background: C.bgAlt,
          padding: "6rem 3rem 8rem",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.25rem",
            }}
            className="services-index-grid"
          >
            {COPY.services.items.map((s, i) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                style={{
                  textDecoration: "none",
                  background: C.bgCard,
                  border: `1px solid ${C.border}`,
                  padding: "2.5rem 2rem 2.25rem",
                  transition: "border-color 0.3s, transform 0.3s, background 0.3s",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  opacity: listInView ? 1 : 0,
                  transform: listInView ? "translateY(0)" : "translateY(18px)",
                  transitionDelay: `${i * 0.08}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.borderHover;
                  e.currentTarget.style.background = C.bgElevated;
                  const arr = e.currentTarget.querySelector(".svc-arrow");
                  if (arr) {
                    arr.style.transform = "translateX(6px)";
                    arr.style.color = C.green;
                  }
                  const num = e.currentTarget.querySelector(".svc-num");
                  if (num) num.style.color = C.green;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.background = C.bgCard;
                  const arr = e.currentTarget.querySelector(".svc-arrow");
                  if (arr) {
                    arr.style.transform = "translateX(0)";
                    arr.style.color = C.creamMuted;
                  }
                  const num = e.currentTarget.querySelector(".svc-num");
                  if (num) num.style.color = C.creamMuted;
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    className="svc-num"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.7rem",
                      color: C.creamMuted,
                      letterSpacing: "0.2em",
                      fontWeight: 600,
                      transition: "color 0.3s",
                    }}
                  >
                    {s.num}
                  </span>
                  <span
                    className="svc-arrow"
                    style={{
                      color: C.creamMuted,
                      fontSize: "1rem",
                      transition: "transform 0.3s, color 0.3s",
                    }}
                  >
                    &rarr;
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "clamp(1.25rem, 1.8vw, 1.65rem)",
                    color: C.cream,
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    textTransform: "uppercase",
                    lineHeight: 1.15,
                    marginTop: "0.5rem",
                  }}
                >
                  {s.title}
                </h2>

                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.9rem",
                    color: "rgba(232,228,220,0.78)",
                    lineHeight: 1.65,
                    fontWeight: 400,
                  }}
                >
                  {s.body}
                </p>

                {s.detail && s.detail.tagline && (
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.68rem",
                      color: C.green,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginTop: "auto",
                      paddingTop: "1rem",
                    }}
                  >
                    Learn More
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
