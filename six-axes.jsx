import { useState, useEffect, useRef } from "react";

const AXES = [
  {
    id: "reasoning",
    label: "Reasoning",
    shortLabel: "Reasoning",
    automationLevel: 0.85,
    timeline: "Now",
    timelineColor: "#FF4D4D",
    icon: "🧠",
    bestModel: "Gemini 3.1 Pro",
    description:
      "Multi-step logical deduction from first principles. Analyzing complex contracts across jurisdictions, multi-constraint optimization, novel scientific problems.",
    aiStatus:
      "Rapidly automating. ARC-AGI-2 scores doubled in 3 months. Deep Think solved 18 previously unsolved research problems in one session.",
    examples: "Tax optimization, derivatives pricing, structural fraud detection, drug discovery",
    humanEdge: "Narrowing fast — this is where AI is advancing fastest",
  },
  {
    id: "effort",
    label: "Effort",
    shortLabel: "Effort",
    automationLevel: 0.75,
    timeline: "Now",
    timelineColor: "#FF4D4D",
    icon: "⛏️",
    bestModel: "Opus 4.6 / Codex 5.3",
    description:
      "Not intellectually difficult, just large. Sustaining attention and thoroughness across a massive surface area without dropping things.",
    aiStatus:
      "Actively automating. Agentic models sustain work for hours and days. Opus 4.6 ran 7 hours on Rakuten's codebase. 16 agents built a C compiler over 2 weeks.",
    examples: "Auditing 3,000 contracts, migrating legacy codebases, reviewing all customer interactions from last quarter",
    humanEdge: "Shrinking — agents are built for exactly this",
  },
  {
    id: "coordination",
    label: "Coordination",
    shortLabel: "Coord.",
    automationLevel: 0.4,
    timeline: "Emerging",
    timelineColor: "#FFB020",
    icon: "🔗",
    bestModel: "Opus 4.6 (agent teams)",
    description:
      "Aligning teams, routing work across dependencies, managing information flow so the right people know the right things at the right time.",
    aiStatus:
      "Starting to yield. Opus autonomously closed 13 issues and routed 12 more across a 50-person org and 6 repos — understanding not just code but the org chart.",
    examples: "Cross-team architecture decisions, dependency management, meeting routing, stakeholder alignment",
    humanEdge: "Significant — organizational awareness still requires human context",
  },
  {
    id: "domain",
    label: "Domain Expertise",
    shortLabel: "Domain",
    automationLevel: 0.35,
    timeline: "Emerging",
    timelineColor: "#FFB020",
    icon: "🎯",
    bestModel: "Frontier models (all)",
    description:
      "Pattern recognition from years of repetition. The senior engineer who's seen that stack trace before. The M&A attorney who's closed 300 deals.",
    aiStatus:
      "Slowly being absorbed into training data. But the gap between 'has read about it' and 'has lived it' remains real, especially in domains with thin published literature.",
    examples: "Undocumented library quirks, which contract clauses actually get litigated, production incident pattern matching",
    humanEdge: "Durable for now — lived experience still beats training data",
  },
  {
    id: "ambiguity",
    label: "Ambiguity",
    shortLabel: "Ambiguity",
    automationLevel: 0.15,
    timeline: "Years away",
    timelineColor: "#4DA6FF",
    icon: "🌫️",
    bestModel: "No clear leader",
    description:
      "Figuring out what the question actually is. When the customer says 'better reporting' but means 'my boss needs to stop questioning my numbers.'",
    aiStatus:
      "Barely touched. Models can help explore options but cannot resolve the ambiguity. Product sense and strategic intuition remain deeply human.",
    examples: "Defining strategy from contradictory signals, interpreting what customers actually want, choosing between plausible roadmaps",
    humanEdge: "Strong — requires holding incomplete mental models in tension",
  },
  {
    id: "emotional",
    label: "Emotional Intelligence",
    shortLabel: "EQ",
    automationLevel: 0.1,
    timeline: "Years away",
    timelineColor: "#4DA6FF",
    icon: "💬",
    bestModel: "None reliable",
    description:
      "Reading a boardroom. Knowing the CFO's silence means opposition. Delivering feedback to someone going through a divorce. Calibrating tone, timing, and transparency.",
    aiStatus:
      "No current model solves this well or even attempts it reliably. A massive percentage of what makes leadership genuinely hard.",
    examples: "Difficult feedback conversations, negotiation subtext, team morale through reorgs, political navigation",
    humanEdge: "Very strong — dynamics no model can observe",
  },
  {
    id: "judgment",
    label: "Judgment & Willpower",
    shortLabel: "Judgment",
    automationLevel: 0.05,
    timeline: "May never yield",
    timelineColor: "#8B5CF6",
    icon: "⚖️",
    bestModel: "N/A — human only",
    description:
      "Killing a project your team spent 6 months building. Saying no to a lucrative client. Making the unpopular call. The bottleneck isn't computing the right answer — it's having the nerve to act on it.",
    aiStatus:
      "Almost entirely unsolvable by AI. These are courage problems, identity problems. Any competent analyst could lay out the logic.",
    examples: "Walking away from bad deals, career-risk decisions, values-aligned choices, strategic courage",
    humanEdge: "Near-total — this is about identity, not intelligence",
  },
];

const CENTER_X = 250;
const CENTER_Y = 250;
const RADIUS = 185;
const INNER_RINGS = [0.25, 0.5, 0.75, 1.0];

function polarToCart(angleDeg, r) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER_X + r * Math.cos(rad), y: CENTER_Y + r * Math.sin(rad) };
}

function HexChart({ selected, onSelect, hoveredAxis, onHover }) {
  const n = AXES.length;
  const angleStep = 360 / n;

  const gridLines = INNER_RINGS.map((ring) => {
    const pts = Array.from({ length: n }, (_, i) => {
      const p = polarToCart(i * angleStep, RADIUS * ring);
      return `${p.x},${p.y}`;
    }).join(" ");
    return pts;
  });

  const axisLines = Array.from({ length: n }, (_, i) => {
    const p = polarToCart(i * angleStep, RADIUS);
    return { x1: CENTER_X, y1: CENTER_Y, x2: p.x, y2: p.y };
  });

  const dataPoints = AXES.map((axis, i) => {
    const p = polarToCart(i * angleStep, RADIUS * axis.automationLevel);
    return `${p.x},${p.y}`;
  }).join(" ");

  const labelPositions = AXES.map((axis, i) => {
    const p = polarToCart(i * angleStep, RADIUS + 32);
    return { ...p, axis };
  });

  const dotPositions = AXES.map((axis, i) => {
    return polarToCart(i * angleStep, RADIUS * axis.automationLevel);
  });

  return (
    <svg viewBox="0 0 500 500" style={{ width: "100%", maxWidth: 500, display: "block", margin: "0 auto" }}>
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,77,77,0.08)" />
          <stop offset="100%" stopColor="rgba(255,77,77,0)" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx={CENTER_X} cy={CENTER_Y} r={RADIUS + 10} fill="url(#centerGlow)" />

      {gridLines.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={i === gridLines.length - 1 ? 1.5 : 0.8}
        />
      ))}

      {axisLines.map((line, i) => (
        <line key={i} {...line} stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
      ))}

      <polygon
        points={dataPoints}
        fill="rgba(255,77,77,0.12)"
        stroke="rgba(255,77,77,0.6)"
        strokeWidth={2}
        filter="url(#glow)"
      />

      {dotPositions.map((p, i) => {
        const axis = AXES[i];
        const isSelected = selected === axis.id;
        const isHovered = hoveredAxis === axis.id;
        return (
          <g key={axis.id}>
            <circle
              cx={p.x}
              cy={p.y}
              r={isSelected || isHovered ? 7 : 5}
              fill={axis.timelineColor}
              stroke="#0D0D0F"
              strokeWidth={2}
              style={{
                cursor: "pointer",
                transition: "r 0.2s ease",
                filter: isSelected ? "drop-shadow(0 0 6px " + axis.timelineColor + ")" : "none",
              }}
              onClick={() => onSelect(axis.id)}
              onMouseEnter={() => onHover(axis.id)}
              onMouseLeave={() => onHover(null)}
            />
          </g>
        );
      })}

      {labelPositions.map(({ x, y, axis }, i) => {
        const isSelected = selected === axis.id;
        const isHovered = hoveredAxis === axis.id;
        const angle = i * angleStep;
        let textAnchor = "middle";
        let dx = 0;
        if (angle > 20 && angle < 160) { textAnchor = "start"; dx = 4; }
        else if (angle > 200 && angle < 340) { textAnchor = "end"; dx = -4; }

        return (
          <text
            key={axis.id}
            x={x}
            y={y}
            dx={dx}
            textAnchor={textAnchor}
            dominantBaseline="central"
            fill={isSelected || isHovered ? "#fff" : "rgba(255,255,255,0.55)"}
            fontSize={12.5}
            fontFamily="'DM Sans', sans-serif"
            fontWeight={isSelected ? 700 : 500}
            letterSpacing="0.02em"
            style={{ cursor: "pointer", transition: "fill 0.2s ease" }}
            onClick={() => onSelect(axis.id)}
            onMouseEnter={() => onHover(axis.id)}
            onMouseLeave={() => onHover(null)}
          >
            {axis.shortLabel}
          </text>
        );
      })}

      {INNER_RINGS.map((ring, i) => {
        const labelVal = Math.round(ring * 100) + "%";
        return (
          <text
            key={i}
            x={CENTER_X + 6}
            y={CENTER_Y - RADIUS * ring + 2}
            fill="rgba(255,255,255,0.2)"
            fontSize={9}
            fontFamily="'DM Mono', monospace"
          >
            {labelVal}
          </text>
        );
      })}
    </svg>
  );
}

function AxisDetail({ axis }) {
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
              fontFamily: "'Instrument Serif', Georgia, serif",
              letterSpacing: "-0.01em",
            }}
          >
            {axis.label}
          </h3>
          <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: 11,
                fontFamily: "'DM Mono', monospace",
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
                fontFamily: "'DM Mono', monospace",
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
            fontFamily: "'DM Mono', monospace",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          <span>AI automation progress</span>
          <span style={{ color: axis.timelineColor }}>{Math.round(axis.automationLevel * 100)}%</span>
        </div>
      </div>

      <p
        style={{
          margin: "0 0 14px",
          fontSize: 14,
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.7)",
          fontFamily: "'DM Sans', sans-serif",
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
            fontFamily: "'DM Mono', monospace",
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
            fontFamily: "'DM Sans', sans-serif",
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
              fontFamily: "'DM Mono', monospace",
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
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {axis.examples}
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div
            style={{
              fontSize: 10,
              fontFamily: "'DM Mono', monospace",
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
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {axis.humanEdge}
          </p>
        </div>
      </div>
    </div>
  );
}

function Legend() {
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
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.02em",
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SixAxesFramework() {
  const [selected, setSelected] = useState("reasoning");
  const [hoveredAxis, setHoveredAxis] = useState(null);

  const selectedAxis = AXES.find((a) => a.id === selected);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0D0D0F",
        color: "#fff",
        fontFamily: "'DM Sans', sans-serif",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;700&family=Instrument+Serif:ital@0;1&display=swap"
        rel="stylesheet"
      />

      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              fontSize: 10,
              fontFamily: "'DM Mono', monospace",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              marginBottom: 12,
            }}
          >
            Framework
          </div>
          <h1
            style={{
              margin: "0 0 10px",
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 400,
              fontFamily: "'Instrument Serif', Georgia, serif",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#fff",
            }}
          >
            The Seven Axes of{" "}
            <span style={{ fontStyle: "italic", color: "#FF4D4D" }}>Hard</span>
          </h1>
          <p
            style={{
              margin: "0 auto",
              maxWidth: 520,
              fontSize: 14.5,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Not all difficulty is the same. Each axis is getting automated on a different timeline, at a different
            rate, by different tools. Click any axis to explore.
          </p>
        </div>

        {/* Main layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(300px, 500px) 1fr",
            gap: 32,
            alignItems: "start",
          }}
        >
          {/* Chart */}
          <div>
            <HexChart
              selected={selected}
              onSelect={setSelected}
              hoveredAxis={hoveredAxis}
              onHover={setHoveredAxis}
            />
            <Legend />
          </div>

          {/* Detail panel */}
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              padding: "24px 22px",
              minHeight: 360,
            }}
          >
            {selectedAxis && <AxisDetail axis={selectedAxis} />}
          </div>
        </div>

        {/* Axis selector pills (mobile-friendly) */}
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
                fontFamily: "'DM Sans', sans-serif",
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

        {/* Footer insight */}
        <div
          style={{
            marginTop: 44,
            padding: "20px 24px",
            background: "rgba(255,77,77,0.04)",
            border: "1px solid rgba(255,77,77,0.1)",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontFamily: "'DM Mono', monospace",
              color: "#FF4D4D",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            Key Insight
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            For most knowledge workers, the pure reasoning component of their work — the part Gemini 3.1 Pro
            dominates — is roughly 10% of what makes their job hard. The other 90% lives on axes where different
            tools lead, or where no AI helps at all yet.{" "}
            <span style={{ color: "rgba(255,255,255,0.75)" }}>
              The question isn't "which AI is smartest" — it's "which axis is actually my bottleneck?"
            </span>
          </p>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: 28,
            fontSize: 11,
            fontFamily: "'DM Mono', monospace",
            color: "rgba(255,255,255,0.15)",
            letterSpacing: "0.04em",
          }}
        >
          Adapted from "The 6 Reasons Your Work Is Hard" · Feb 2026
        </div>
      </div>
    </div>
  );
}
