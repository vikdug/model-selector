import { useState, useEffect } from 'react';

export default function AxisDetail({ axis, userScore }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(false);
    const t = setTimeout(() => setShow(true), 30);
    return () => clearTimeout(t);
  }, [axis.id]);

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(8px)",
        transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 28 }}>{axis.icon}</span>
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "var(--font-serif)",
              letterSpacing: "-0.01em",
            }}
          >
            {axis.label}
          </h3>
          <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                color: axis.timelineColor,
                background: axis.timelineColor + "18",
                padding: "2px 8px",
                borderRadius: 4,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {axis.timeline}
            </span>
            <span
              style={{
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                color: "rgba(255,255,255,0.4)",
                padding: "2px 8px",
                borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {axis.bestModel}
            </span>
          </div>
        </div>
      </div>

      {/* AI automation bar */}
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            height: 4,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 2,
            overflow: "hidden",
            marginBottom: 6,
          }}
        >
          <div
            style={{
              height: "100%",
              width: show ? `${axis.automationLevel * 100}%` : "0%",
              background: `linear-gradient(90deg, ${axis.timelineColor}88, ${axis.timelineColor})`,
              borderRadius: 2,
              transition: "width 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 10,
            fontFamily: "var(--font-mono)",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          <span>AI automation progress</span>
          <span style={{ color: axis.timelineColor }}>{Math.round(axis.automationLevel * 100)}%</span>
        </div>
      </div>

      {/* User score bar (if provided) */}
      {userScore > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              height: 4,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 2,
              overflow: "hidden",
              marginBottom: 6,
            }}
          >
            <div
              style={{
                height: "100%",
                width: show ? `${userScore * 100}%` : "0%",
                background: "linear-gradient(90deg, #22D3EE88, #22D3EE)",
                borderRadius: 2,
                transition: "width 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10,
              fontFamily: "var(--font-mono)",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            <span>Your rating</span>
            <span style={{ color: "#22D3EE" }}>{Math.round(userScore * 100)}%</span>
          </div>
        </div>
      )}

      <p
        style={{
          margin: "0 0 14px",
          fontSize: 14,
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.7)",
          fontFamily: "var(--font-sans)",
        }}
      >
        {axis.description}
      </p>

      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 8,
          padding: "12px 14px",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontFamily: "var(--font-mono)",
            color: axis.timelineColor,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 6,
            fontWeight: 600,
          }}
        >
          AI Status
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {axis.aiStatus}
        </p>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div
            style={{
              fontSize: 10,
              fontFamily: "var(--font-mono)",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 4,
            }}
          >
            Examples
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 12.5,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.45)",
              fontFamily: "var(--font-sans)",
            }}
          >
            {axis.examples}
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div
            style={{
              fontSize: 10,
              fontFamily: "var(--font-mono)",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 4,
            }}
          >
            Human Edge
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 12.5,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.45)",
              fontFamily: "var(--font-sans)",
            }}
          >
            {axis.humanEdge}
          </p>
        </div>
      </div>
    </div>
  );
}
