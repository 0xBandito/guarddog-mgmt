import React from "react";
import { C } from "../constants/colors";
import { COPY } from "../constants/copy";

/**
 * Top-level React error boundary. If any descendant component throws during
 * render, this replaces the broken tree with a branded fallback instead of
 * leaving the user with a blank white page.
 *
 * Must be a class component — React's error-catching lifecycle
 * (componentDidCatch + getDerivedStateFromError) is not available in hooks.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log for debugging. In a production app with analytics, this is where
    // you'd send to Sentry / Datadog / LogRocket / Vercel logs.
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary] caught:", error, errorInfo);
  }

  handleReload = () => {
    // Hard reload — lets the user try again with a fresh bundle + state.
    window.location.reload();
  };

  handleHome = () => {
    // Reset the error state and navigate home via full reload to ensure
    // nothing stale hangs around.
    window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        role="alert"
        style={{
          minHeight: "100vh",
          background: C.bg,
          color: C.cream,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1.5rem",
          textAlign: "center",
          fontFamily: "'Manrope', sans-serif",
        }}
      >
        <div
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: C.greenAccent,
            fontWeight: 600,
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span style={{ width: 28, height: 1, background: C.greenAccent }} />
          Something broke
          <span style={{ width: 28, height: 1, background: C.greenAccent }} />
        </div>

        <h1
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: "clamp(2.25rem, 6vw, 4rem)",
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            color: C.cream,
            marginBottom: "1.5rem",
            textTransform: "uppercase",
            maxWidth: 720,
          }}
        >
          We hit a snag<span style={{ color: C.green }}>.</span>
        </h1>

        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "1rem",
            color: C.creamDim,
            lineHeight: 1.7,
            maxWidth: 500,
            marginBottom: "2.5rem",
          }}
        >
          Something on our end didn&rsquo;t load the way it should. Try reloading the page
          &mdash; and if it keeps happening, email us at{" "}
          <a
            href={`mailto:${COPY.contact.email}`}
            style={{ color: C.green, textDecoration: "underline" }}
          >
            {COPY.contact.email}
          </a>
          .
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={this.handleReload}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.78rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              background: C.green,
              color: C.bg,
              border: "none",
              padding: "1.1rem 2.5rem",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Reload
          </button>
          <button
            onClick={this.handleHome}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.78rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              background: "transparent",
              color: C.creamDim,
              border: `1px solid ${C.creamMuted}`,
              padding: "1.1rem 2.5rem",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Go Home
          </button>
        </div>

        {/* In development, show the error message + stack for debugging.
            In production, this block is stripped out. */}
        {process.env.NODE_ENV !== "production" && this.state.error && (
          <details
            style={{
              marginTop: "3rem",
              fontFamily: "monospace",
              fontSize: "0.72rem",
              color: C.creamMuted,
              maxWidth: 720,
              textAlign: "left",
              background: C.bgCard,
              padding: "1rem",
              border: `1px solid ${C.border}`,
            }}
          >
            <summary style={{ cursor: "pointer", marginBottom: "0.5rem" }}>
              Error details (dev only)
            </summary>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>
              {String(this.state.error?.stack || this.state.error)}
            </pre>
          </details>
        )}
      </div>
    );
  }
}
