export const CENTER_X = 250;
export const CENTER_Y = 250;
export const RADIUS = 185;
export const INNER_RINGS = [0.25, 0.5, 0.75, 1.0];

export function polarToCart(angleDeg, r) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER_X + r * Math.cos(rad), y: CENTER_Y + r * Math.sin(rad) };
}

export function generatePolygonPoints(values, count) {
  const angleStep = 360 / count;
  return values
    .map((val, i) => {
      const p = polarToCart(i * angleStep, RADIUS * val);
      return `${p.x},${p.y}`;
    })
    .join(" ");
}
