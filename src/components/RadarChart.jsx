import { AXES } from '../data/axes';
import { CENTER_X, CENTER_Y, RADIUS, INNER_RINGS, polarToCart } from '../utils/geometry';

export default function RadarChart({ selected, onSelect, hoveredAxis, onHover, userScores }) {
  const n = AXES.length;
  const angleStep = 360 / n;
  const hasUserScores = userScores && Object.values(userScores).some((v) => v > 0);

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

  const automationPoints = AXES.map((axis, i) => {
    const p = polarToCart(i * angleStep, RADIUS * axis.automationLevel);
    return `${p.x},${p.y}`;
  }).join(" ");

  const automationDots = AXES.map((axis, i) => {
    return polarToCart(i * angleStep, RADIUS * axis.automationLevel);
  });

  const userPoints = hasUserScores
    ? AXES.map((axis, i) => {
        const val = userScores[axis.id] || 0;
        const p = polarToCart(i * angleStep, RADIUS * val);
        return `${p.x},${p.y}`;
      }).join(" ")
    : null;

  const userDots = hasUserScores
    ? AXES.map((axis, i) => {
        const val = userScores[axis.id] || 0;
        return polarToCart(i * angleStep, RADIUS * val);
      })
    : null;

  const labelPositions = AXES.map((axis, i) => {
    const p = polarToCart(i * angleStep, RADIUS + 32);
    return { ...p, axis };
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
        <filter id="glowCyan">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx={CENTER_X} cy={CENTER_Y} r={RADIUS + 10} fill="url(#centerGlow)" />

      {/* Grid rings */}
      {gridLines.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={i === gridLines.length - 1 ? 1.5 : 0.8}
        />
      ))}

      {/* Axis lines */}
      {axisLines.map((line, i) => (
        <line key={i} {...line} stroke="rgba(255,255,255,0.08)" strokeWidth={0.8} />
      ))}

      {/* AI automation polygon (red, solid) */}
      <polygon
        points={automationPoints}
        fill="rgba(255,77,77,0.12)"
        stroke="rgba(255,77,77,0.6)"
        strokeWidth={2}
        filter="url(#glow)"
      />

      {/* User scores polygon (cyan, dashed) */}
      {userPoints && (
        <polygon
          points={userPoints}
          fill="rgba(34,211,238,0.08)"
          stroke="rgba(34,211,238,0.6)"
          strokeWidth={2}
          strokeDasharray="6 3"
          filter="url(#glowCyan)"
          style={{ transition: "all 0.3s ease" }}
        />
      )}

      {/* AI automation dots (red) */}
      {automationDots.map((p, i) => {
        const axis = AXES[i];
        const isSelected = selected === axis.id;
        const isHovered = hoveredAxis === axis.id;
        return (
          <circle
            key={`auto-${axis.id}`}
            cx={p.x}
            cy={p.y}
            r={isSelected || isHovered ? 7 : 5}
            fill={axis.timelineColor}
            stroke="#0D0D0F"
            strokeWidth={2}
            style={{
              cursor: "pointer",
              transition: "r 0.2s ease",
              filter: isSelected ? `drop-shadow(0 0 6px ${axis.timelineColor})` : "none",
            }}
            onClick={() => onSelect(axis.id)}
            onMouseEnter={() => onHover(axis.id)}
            onMouseLeave={() => onHover(null)}
          />
        );
      })}

      {/* User score dots (cyan) */}
      {userDots &&
        userDots.map((p, i) => {
          const axis = AXES[i];
          const val = userScores[axis.id] || 0;
          if (val === 0) return null;
          return (
            <circle
              key={`user-${axis.id}`}
              cx={p.x}
              cy={p.y}
              r={4}
              fill="#22D3EE"
              stroke="#0D0D0F"
              strokeWidth={1.5}
              style={{ transition: "all 0.3s ease" }}
            />
          );
        })}

      {/* Axis labels */}
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

      {/* Ring percentage labels */}
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
