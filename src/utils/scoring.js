export function hasAnyScore(scores) {
  return Object.values(scores).some((v) => v > 0);
}

export function normalizeScore(value) {
  return Math.round(value) / 100;
}
