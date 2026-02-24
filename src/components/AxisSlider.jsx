import ActivityChips from './ActivityChips';

export default function AxisSlider({ axis, value, onChange, selections, onToggleActivity, isManual }) {
  const displayValue = Math.round((value || 0) * 100);
  const selected = selections || [];

  return (
    <div
      style={{
        padding: "10px 14px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        transition: "border-color 0.2s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{ fontSize: 18 }}>{axis.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {axis.label}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              {isManual && displayValue > 0 && (
                <span
                  style={{
                    fontSize: 9,
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-faint)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Adjusted
                </span>
              )}
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
      </div>
      {axis.activities && (
        <div style={{ marginBottom: 6 }}>
          <ActivityChips
            activities={axis.activities}
            selected={selected}
            onToggle={(activityId) => onToggleActivity(axis.id, activityId)}
          />
        </div>
      )}
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
          marginTop: 2,
          fontSize: 10,
          fontFamily: "var(--font-mono)",
          color: "var(--text-faint)",
        }}
      >
        <span>None</span>
        <span>All</span>
      </div>
    </div>
  );
}
