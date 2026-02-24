export default function HeroSection() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px 40px" }}>
      <div
        style={{
          fontSize: 10,
          fontFamily: "var(--font-mono)",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          marginBottom: 12,
        }}
      >
        Interactive Self-Assessment
      </div>
      <h1
        style={{
          margin: "0 0 10px",
          fontSize: "clamp(32px, 6vw, 48px)",
          fontWeight: 400,
          fontFamily: "var(--font-serif)",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          color: "var(--text)",
        }}
      >
        The Seven Axes of{" "}
        <span style={{ fontStyle: "italic", color: "var(--red)" }}>Hard</span>
      </h1>
      <p
        style={{
          margin: "0 auto 32px",
          maxWidth: 560,
          fontSize: 15,
          lineHeight: 1.65,
          color: "var(--text-muted)",
        }}
      >
        Not all difficulty is the same. Each axis is getting automated on a different
        timeline, at a different rate, by different tools.{" "}
        <span style={{ color: "var(--text-dim)" }}>
          Map your work to discover your difficulty profile.
        </span>
      </p>
      <a
        href="#assessment"
        style={{
          display: "inline-block",
          padding: "12px 28px",
          background: "var(--red)",
          color: "#fff",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "var(--font-sans)",
          textDecoration: "none",
          letterSpacing: "0.02em",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
        onMouseLeave={(e) => (e.target.style.opacity = "1")}
      >
        Map your work
      </a>
    </div>
  );
}
