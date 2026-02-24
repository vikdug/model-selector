import { useState } from 'react';
import { AXES } from '../data/axes';
import RadarChart from './RadarChart';
import Legend from './Legend';
import AxisDetail from './AxisDetail';

export default function ResultsSection({ scores, hasScores }) {
  const [selected, setSelected] = useState("reasoning");
  const [hoveredAxis, setHoveredAxis] = useState(null);

  const selectedAxis = AXES.find((a) => a.id === selected);

  return (
    <section id="results" style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            fontSize: 10,
            fontFamily: "var(--font-mono)",
            color: "var(--red)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          Difficulty Map
        </div>
        <h2
          style={{
            margin: "0 0 8px",
            fontSize: "clamp(22px, 4vw, 30px)",
            fontWeight: 400,
            fontFamily: "var(--font-serif)",
            letterSpacing: "-0.01em",
            color: "var(--text)",
          }}
        >
          Your Difficulty Profile
        </h2>
        <p style={{ margin: 0, fontSize: 13.5, color: "var(--text-muted)" }}>
          {hasScores
            ? "The gap between polygons reveals where AI helps \u2014 and where it can't."
            : "Click any axis to explore. Complete the assessment above to overlay your profile."}
        </p>
      </div>

      {/* Main grid */}
      <div
        className="grid-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(300px, 500px) 1fr",
          gap: 32,
          alignItems: "start",
        }}
      >
        {/* Chart */}
        <div>
          <RadarChart
            selected={selected}
            onSelect={setSelected}
            hoveredAxis={hoveredAxis}
            onHover={setHoveredAxis}
            userScores={hasScores ? scores : null}
          />
          <Legend hasUserScores={hasScores} />
        </div>

        {/* Detail panel */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "24px 22px",
            minHeight: 360,
          }}
        >
          {selectedAxis && (
            <AxisDetail axis={selectedAxis} userScore={scores[selectedAxis.id] || 0} />
          )}
        </div>
      </div>

      {/* Axis selector pills */}
      <div
        style={{
          display: "flex",
          gap: 6,
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: 28,
        }}
      >
        {AXES.map((axis) => (
          <button
            key={axis.id}
            onClick={() => setSelected(axis.id)}
            style={{
              background: selected === axis.id ? "rgba(255,255,255,0.08)" : "transparent",
              border: `1px solid ${selected === axis.id ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: 6,
              padding: "6px 12px",
              color: selected === axis.id ? "#fff" : "rgba(255,255,255,0.35)",
              fontSize: 12,
              fontFamily: "var(--font-sans)",
              fontWeight: selected === axis.id ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <span style={{ marginRight: 4 }}>{axis.icon}</span>
            {axis.shortLabel}
          </button>
        ))}
      </div>
    </section>
  );
}
