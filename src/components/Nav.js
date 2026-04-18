import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { C } from "../constants/colors";
import { COPY } from "../constants/copy";

const navLinkStyle = {
  background: "none", border: "none", color: C.creamMuted,
  fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase",
  fontFamily: "'Manrope', sans-serif", cursor: "pointer",
  transition: "color 0.3s", fontWeight: 500,
  textDecoration: "none",
  padding: "1.25rem 1rem",
  display: "inline-block",
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleLogoClick = (e) => {
    // On the homepage, clicking the logo should scroll to the top rather than reload.
    if (location.pathname === "/") {
      e.preventDefault();
      if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(12,11,9,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "background 0.4s, backdrop-filter 0.4s, border-bottom 0.4s",
      padding: "0 3rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      {/* Logo: click area is constrained to the visible elements only.
          No extra invisible padding bleeding into the hero content below the nav.
          Image + text are each directly clickable; clicks on either bubble up
          to the wrapping <Link> which handles navigation. */}
      <Link
        to="/"
        onClick={handleLogoClick}
        aria-label="Guard Dog Management — Home"
        className="nav-logo-link"
        style={{
          cursor: "pointer",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: 0,
          margin: 0,
          position: "relative",
          zIndex: 101,
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        <img
          src="/images/guarddogmgmt-logo.png"
          alt=""
          aria-hidden="true"
          draggable="false"
          style={{
            height: "40px",
            width: "40px",
            display: "block",
            cursor: "pointer",
          }}
        />
        <span
          className="nav-logo-text"
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "1.1rem",
            color: C.cream,
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
            cursor: "pointer",
            userSelect: "none",
            display: "inline-block",
          }}
        >GUARD DOG</span>
      </Link>

      <ul className="nav-desktop" style={{ display: "flex", gap: "0", listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
        {COPY.nav.links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              style={navLinkStyle}
              onMouseEnter={(e) => (e.target.style.color = C.cream)}
              onMouseLeave={(e) => (e.target.style.color = C.creamMuted)}
            >{link.label}</Link>
          </li>
        ))}
      </ul>

      <button
        className="nav-mobile-btn"
        onClick={() => setOpen(!open)}
        style={{ display: "none", background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 6, padding: "0.75rem" }}
      >
        <div style={{ width: 24, height: 1.5, background: C.cream }} />
        <div style={{ width: 24, height: 1.5, background: C.cream }} />
        <div style={{ width: 16, height: 1.5, background: C.cream }} />
      </button>

      {open && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: C.bg, zIndex: 200,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2.5rem",
        }}>
          <button onClick={() => setOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "2rem", background: "none", border: "none", color: C.cream, fontSize: "1.5rem", cursor: "pointer", fontWeight: 300, padding: "0.75rem" }}>
            {"\u2715"}
          </button>
          {COPY.nav.links.map((link) => (
            <Link key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              style={{
                background: "none", border: "none", color: C.cream,
                fontSize: "1.5rem", fontFamily: "'Archivo Black', sans-serif",
                letterSpacing: "0.05em", cursor: "pointer",
                textDecoration: "none",
                padding: "0.75rem 1.5rem",
              }}
            >{link.label}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}
