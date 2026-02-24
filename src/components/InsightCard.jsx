const TYPE_COLORS = {
  "ai-addressable": "#FF4D4D",
  "human-edge": "#8B5CF6",
  "ai-leverage": "#22D3EE",
  gap: "#FFB020",
};

export default function InsightCard({ insight }) {
  const color = TYPE_COLORS[insight.type] || "#FF4D4D";

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "18px 20px",
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontFamily: "var(--font-mono)",
          color,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 6,
          fontWeight: 600,
        }}
      >
        {insight.title}
      </div>
      <div
        style={{
          fontSize: 22,
          fontFamily: "var(--font-serif)",
          color: "var(--text)",
          fontWeight: 400,
          marginBottom: 8,
          letterSpacing: "-0.01em",
        }}
      >
        {insight.value}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          lineHeight: 1.6,
          color: "var(--text-dim)",
          fontFamily: "var(--font-sans)",
        }}
      >
        {insight.description}
      </p>
    </div>
  );
}
