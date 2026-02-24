import { AXES } from '../data/axes';
import AxisSlider from './AxisSlider';

export default function AssessmentSection({ scores, onScoreChange, onReset, hasScores }) {
  return (
    <section id="assessment" style={{ maxWidth: 680, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            fontSize: 10,
            fontFamily: "var(--font-mono)",
            color: "var(--cyan)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          Self-Assessment
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
          How hard is your work?
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 13.5,
            color: "var(--text-muted)",
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Rate each axis based on how much of your daily work falls into that category.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {AXES.map((axis) => (
          <AxisSlider
            key={axis.id}
            axis={axis}
            value={scores[axis.id] || 0}
            onChange={onScoreChange}
          />
        ))}
      </div>

      {hasScores && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button
            onClick={onReset}
            style={{
              background: "transparent",
              border: "1px solid var(--border-light)",
              borderRadius: 6,
              padding: "8px 20px",
              color: "var(--text-muted)",
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.2)";
              e.target.style.color = "var(--text-dim)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "var(--border-light)";
              e.target.style.color = "var(--text-muted)";
            }}
          >
            Reset all
          </button>
        </div>
      )}
    </section>
  );
}
