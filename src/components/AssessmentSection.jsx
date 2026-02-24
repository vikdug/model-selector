import { AXES } from '../data/axes';
import AxisSlider from './AxisSlider';

export default function AssessmentSection({ scores, onScoreChange, onReset, hasScores, selections, onToggleActivity, manualOverride }) {
  return (
    <section id="assessment" style={{ padding: "8px 0" }}>
      <style>{`
        @media (max-width: 768px) {
          #assessment .axis-grid { grid-template-columns: 1fr !important; }
        }
        #assessment .axis-grid > div:last-child:nth-child(odd) {
          grid-column: 1 / -1;
        }
      `}</style>
      <div
        className="axis-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 8,
        }}
      >
        {AXES.map((axis) => (
          <AxisSlider
            key={axis.id}
            axis={axis}
            value={scores[axis.id] || 0}
            onChange={onScoreChange}
            selections={selections?.[axis.id] || []}
            onToggleActivity={onToggleActivity}
            isManual={manualOverride?.[axis.id] || false}
          />
        ))}
      </div>

      {hasScores && (
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button
            onClick={onReset}
            style={{
              background: "transparent",
              border: "1px solid var(--border-light)",
              borderRadius: 6,
              padding: "5px 16px",
              color: "var(--text-muted)",
              fontSize: 11,
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
