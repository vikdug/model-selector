export default function AxisSlider({ axis, value, onChange }) {
  const displayValue = Math.round((value || 0) * 100);

  return (
    <div
      style={{
        padding: "16px 20px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        transition: "border-color 0.2s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 20 }}>{axis.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--text)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {axis.label}
            </span>
            <span
              style={{
                fontSize: 12,
                fontFamily: "var(--font-mono)",
                color: displayValue > 0 ? "var(--cyan)" : "var(--text-muted)",
                fontWeight: 500,
                minWidth: 36,
                textAlign: "right",
              }}
            >
              {displayValue}%
            </span>
          </div>
        </div>
      </div>
      <p
        style={{
          margin: "0 0 10px",
          fontSize: 12.5,
          lineHeight: 1.5,
          color: "var(--text-dim)",
          fontFamily: "var(--font-sans)",
        }}
      >
        {axis.prompt}
      </p>
      <input
        type="range"
        min={0}
        max={100}
        value={displayValue}
        onChange={(e) => onChange(axis.id, Number(e.target.value) / 100)}
        style={{ width: "100%" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 4,
          fontSize: 10,
          fontFamily: "var(--font-mono)",
          color: "var(--text-faint)",
        }}
      >
        <span>None</span>
        <span style={{ color: "rgba(255,255,255,0.25)", fontStyle: "italic", fontSize: 9.5 }}>
          {axis.hint}
        </span>
        <span>All</span>
      </div>
    </div>
  );
}
