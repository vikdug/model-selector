export default function ActivityChips({ activities, selected, onToggle }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
      {activities.map((activity) => {
        const isSelected = selected.includes(activity.id);
        return (
          <button
            key={activity.id}
            onClick={() => onToggle(activity.id)}
            style={{
              padding: "3px 10px",
              fontSize: 11,
              fontFamily: "var(--font-sans)",
              border: "1px solid",
              borderColor: isSelected ? "var(--cyan)" : "var(--border)",
              borderRadius: 100,
              background: isSelected ? "rgba(0, 200, 200, 0.1)" : "transparent",
              color: isSelected ? "var(--cyan)" : "var(--text-muted)",
              cursor: "pointer",
              transition: "all 0.15s ease",
              lineHeight: 1.5,
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.borderColor = "var(--text-muted)";
                e.currentTarget.style.color = "var(--text-dim)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-muted)";
              }
            }}
          >
            {activity.label}
          </button>
        );
      })}
    </div>
  );
}
