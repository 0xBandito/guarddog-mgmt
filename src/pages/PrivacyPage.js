import { C } from "../constants/colors";
import { COPY } from "../constants/copy";
import useInView from "../hooks/useInView";

const headingStyle = {
  fontFamily: "'Archivo Black', sans-serif",
  fontSize: "clamp(1.3rem, 2vw, 1.75rem)",
  color: C.cream,
  letterSpacing: "0.01em",
  textTransform: "uppercase",
  marginTop: "3rem",
  marginBottom: "1rem",
  lineHeight: 1.15,
};

const paragraphStyle = {
  fontFamily: "'Manrope', sans-serif",
  fontSize: "0.95rem",
  color: C.creamDim,
  lineHeight: 1.8,
  fontWeight: 400,
  marginBottom: "1rem",
};

const listStyle = {
  fontFamily: "'Manrope', sans-serif",
  fontSize: "0.95rem",
  color: C.creamDim,
  lineHeight: 1.8,
  fontWeight: 400,
  paddingLeft: "1.25rem",
  marginBottom: "1rem",
};

// Effective date — update this when the policy materially changes
const EFFECTIVE = "April 2026";

export default function PrivacyPage() {
  const [ref, inView] = useInView();
  return (
    <section
      ref={ref}
      style={{
        background: C.bg,
        padding: "10rem 3rem 6rem",
        position: "relative",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
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
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
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
          Legal
        </p>

        <h1
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
            fontWeight: 400,
            color: C.cream,
            letterSpacing: "-0.01em",
            lineHeight: 1.05,
            marginBottom: "1rem",
          }}
        >
          Privacy Policy
        </h1>
        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.72rem",
            color: C.creamMuted,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: "2.5rem",
          }}
        >
          Effective {EFFECTIVE}
        </p>

        <p style={paragraphStyle}>
          Guard Dog Management Inc. (&ldquo;Guard Dog,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) respects
          your privacy. This policy explains what information we collect through this website,
          how we use it, and your rights.
        </p>

        <h2 style={headingStyle}>What we collect</h2>
        <p style={paragraphStyle}>
          When you submit the contact form on this site, we collect:
        </p>
        <ul style={listStyle}>
          <li>Your first and last name</li>
          <li>Your email address</li>
          <li>Your phone number (optional)</li>
          <li>The service area you&apos;re asking about</li>
          <li>The message you send us</li>
        </ul>
        <p style={paragraphStyle}>
          We do not use cookies, analytics trackers, or any other automatic tracking technology
          on this site at this time.
        </p>

        <h2 style={headingStyle}>How we use it</h2>
        <p style={paragraphStyle}>
          The information you submit is used for one purpose: so Guard Dog can follow up with
          you directly about the services you&apos;re interested in. Your information is delivered
          to our team by email via our form provider
          {" "}
          <a
            href="https://web3forms.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: C.green, textDecoration: "underline" }}
          >
            Web3Forms
          </a>
          , which transmits the submission to our inbox and does not use your information for
          any other purpose.
        </p>

        <h2 style={headingStyle}>What we do NOT do</h2>
        <ul style={listStyle}>
          <li>We do not sell your information to anyone.</li>
          <li>We do not share your information with third parties for marketing or advertising.</li>
          <li>We do not sign you up for mailing lists without your explicit request.</li>
          <li>We do not use behavioral tracking, cross-site tracking, or fingerprinting.</li>
        </ul>

        <h2 style={headingStyle}>How long we keep it</h2>
        <p style={paragraphStyle}>
          Contact form submissions live in our email inbox. We retain them for as long as is
          reasonably necessary to continue the conversation you started, or until you ask us
          to delete them.
        </p>

        <h2 style={headingStyle}>Your rights</h2>
        <p style={paragraphStyle}>
          You can request that we delete any personal information we&apos;ve collected from you
          through this site. Email us at{" "}
          <a
            href={`mailto:${COPY.contact.email}`}
            style={{ color: C.green, textDecoration: "underline" }}
          >
            {COPY.contact.email}
          </a>{" "}
          and we&apos;ll honor the request promptly.
        </p>

        <h2 style={headingStyle}>Children&apos;s privacy</h2>
        <p style={paragraphStyle}>
          This site is not directed to children under 13, and we do not knowingly collect
          personal information from anyone under that age.
        </p>

        <h2 style={headingStyle}>Changes to this policy</h2>
        <p style={paragraphStyle}>
          If we update this policy, we&apos;ll change the effective date at the top of this
          page. Material changes will be highlighted on the site.
        </p>

        <h2 style={headingStyle}>Contact</h2>
        <p style={paragraphStyle}>
          Questions about this policy or your information? Reach us at{" "}
          <a
            href={`mailto:${COPY.contact.email}`}
            style={{ color: C.green, textDecoration: "underline" }}
          >
            {COPY.contact.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
