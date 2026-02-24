import { useState, useEffect } from 'react';
import { AXES } from '../data/axes';

const STORAGE_KEY = 'seven-axes-scores';

function loadScores() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {};
}

export function useAssessment() {
  const [scores, setScores] = useState(loadScores);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  }, [scores]);

  const setScore = (axisId, value) => {
    setScores((prev) => ({ ...prev, [axisId]: value }));
  };

  const reset = () => {
    setScores({});
    localStorage.removeItem(STORAGE_KEY);
  };

  const hasScores = Object.values(scores).some((v) => v > 0);

  return { scores, setScore, reset, hasScores };
}
