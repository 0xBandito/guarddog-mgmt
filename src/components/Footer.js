import { Link } from "react-router-dom";
import { C } from "../constants/colors";
import { COPY } from "../constants/copy";

export default function Footer() {
  return (
    <footer style={{ background: "#070706", padding: "2.5rem 3rem 1.5rem", borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              src="/images/guarddogmgmt-logo.png"
              alt="Guard Dog Management Inc."
              style={{ height: "36px", width: "auto", display: "block" }}
            />
          </Link>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {COPY.nav.links.map((link) => (
              <Link key={link.label}
                to={link.to === "/#services" ? "/" : link.to}
                style={{
                  background: "none", border: "none",
                  fontFamily: "'Manrope', sans-serif", fontSize: "0.65rem",
                  color: C.creamMuted, letterSpacing: "0.1em", cursor: "pointer",
                  transition: "color 0.3s", padding: 0, fontWeight: 500,
                  textTransform: "uppercase", textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.target.style.color = C.cream)}
                onMouseLeave={(e) => (e.target.style.color = C.creamMuted)}
              >{link.label}</Link>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1rem" }}>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.62rem", color: "rgba(232,228,220,0.1)", margin: 0, fontWeight: 400 }}>{COPY.footer.copy}</p>
        </div>
      </div>
    </footer>
  );
}
