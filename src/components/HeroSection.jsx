export default function HeroSection() {
  return (
    <div style={{ textAlign: "center", padding: "20px 20px 4px" }}>
      <h1
        style={{
          margin: "0 0 6px",
          fontSize: "clamp(26px, 5vw, 38px)",
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
          margin: "0 auto",
          maxWidth: 520,
          fontSize: 13.5,
          lineHeight: 1.55,
          color: "var(--text-muted)",
        }}
      >
        Click activities that match your work. Each axis is automated on a different timeline.
      </p>
    </div>
  );
}
