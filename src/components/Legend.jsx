export default function Legend({ hasUserScores }) {
  const items = [
    { color: "#FF4D4D", label: "Automating now" },
    { color: "#FFB020", label: "Emerging" },
    { color: "#4DA6FF", label: "Years away" },
    { color: "#8B5CF6", label: "May never yield" },
  ];

  return (
    <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 4 }}>
      {items.map((item) => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: item.color,
              boxShadow: `0 0 6px ${item.color}44`,
            }}
          />
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.02em",
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
      {hasUserScores && (
        <>
          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.1)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 12,
                height: 2,
                borderRadius: 1,
                background: "#22D3EE",
                boxShadow: "0 0 6px rgba(34,211,238,0.4)",
                borderTop: "2px dashed #22D3EE",
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: "#22D3EE",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.02em",
              }}
            >
              Your profile
            </span>
          </div>
        </>
      )}
    </div>
  );
}
