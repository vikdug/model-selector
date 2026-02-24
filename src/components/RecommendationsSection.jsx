import { AXES } from '../data/axes';
import { classifyProfile, getTopAxes, generateInsights } from '../data/recommendations';
import InsightCard from './InsightCard';

export default function RecommendationsSection({ scores }) {
  const profile = classifyProfile(scores);
  const topAxes = getTopAxes(scores, AXES);
  const insights = generateInsights(scores, AXES);

  return (
    <section style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            fontSize: 10,
            fontFamily: "var(--font-mono)",
            color: "var(--purple)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          Your Results
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
          {profile.emoji} {profile.name}
        </h2>
        <p
          style={{
            margin: "0 auto",
            fontSize: 14,
            lineHeight: 1.65,
            color: "var(--text-dim)",
            maxWidth: 540,
          }}
        >
          {profile.message}
        </p>
      </div>

      {/* Top axes & model recommendations */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontSize: 10,
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 12,
            fontWeight: 600,
          }}
        >
          Your Top Axes & Model Recommendations
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {topAxes.map((axis) => {
            const userVal = Math.round((scores[axis.id] || 0) * 100);
            const autoVal = Math.round(axis.automationLevel * 100);
            return (
              <div
                key={axis.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                }}
              >
                <span style={{ fontSize: 20 }}>{axis.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>
                      {axis.label}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontFamily: "var(--font-mono)",
                        color: "var(--cyan)",
                      }}
                    >
                      You: {userVal}%
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontFamily: "var(--font-mono)",
                        color: "var(--text-muted)",
                        padding: "1px 6px",
                        background: "rgba(255,255,255,0.04)",
                        borderRadius: 3,
                      }}
                    >
                      {axis.bestModel}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontFamily: "var(--font-mono)",
                        color: axis.timelineColor,
                      }}
                    >
                      AI: {autoVal}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insight cards */}
      {insights.length > 0 && (
        <div>
          <div
            style={{
              fontSize: 10,
              fontFamily: "var(--font-mono)",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
              fontWeight: 600,
            }}
          >
            Personalized Insights
          </div>
          <div
            className="assessment-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            {insights.map((insight, i) => (
              <InsightCard key={i} insight={insight} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
