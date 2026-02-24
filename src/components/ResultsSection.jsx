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
    <section id="results" style={{ padding: "12px 0" }}>
      {/* Radar chart */}
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

      {/* Axis selector pills */}
      <div
        style={{
          display: "flex",
          gap: 5,
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: 12,
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
              padding: "4px 10px",
              color: selected === axis.id ? "#fff" : "rgba(255,255,255,0.35)",
              fontSize: 11,
              fontFamily: "var(--font-sans)",
              fontWeight: selected === axis.id ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <span style={{ marginRight: 3 }}>{axis.icon}</span>
            {axis.shortLabel}
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          padding: "18px 18px",
          marginTop: 14,
        }}
      >
        {selectedAxis && (
          <AxisDetail axis={selectedAxis} userScore={scores[selectedAxis.id] || 0} />
        )}
      </div>
    </section>
  );
}
