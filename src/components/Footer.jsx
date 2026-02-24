export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "40px 20px",
        borderTop: "1px solid var(--border)",
        marginTop: 40,
      }}
    >
      {/* Key insight callout */}
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto 28px",
          padding: "20px 24px",
          background: "rgba(255,77,77,0.04)",
          border: "1px solid rgba(255,77,77,0.1)",
          borderRadius: 10,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontFamily: "var(--font-mono)",
            color: "var(--red)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          Key Insight
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.7,
            color: "var(--text-dim)",
          }}
        >
          For most knowledge workers, the pure reasoning component of their work — the part
          Gemini 3.1 Pro dominates — is roughly 10% of what makes their job hard. The other 90%
          lives on axes where different tools lead, or where no AI helps at all yet.{" "}
          <span style={{ color: "rgba(255,255,255,0.75)" }}>
            The question isn't "which AI is smartest" — it's "which axis is actually my
            bottleneck?"
          </span>
        </p>
      </div>

      <div
        style={{
          fontSize: 11,
          fontFamily: "var(--font-mono)",
          color: "var(--text-faint)",
          letterSpacing: "0.04em",
        }}
      >
        Framework adapted from "The Seven Axes of Hard" by Nate (Feb 2026)
      </div>
    </footer>
  );
}
