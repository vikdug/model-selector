import { useState, useEffect } from 'react';
import { AXES } from '../data/axes';

const STORAGE_KEY = 'seven-axes-scores';
const SELECTIONS_KEY = 'seven-axes-selections';
const MANUAL_KEY = 'seven-axes-manual';

function loadScores() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {};
}

function loadSelections() {
  try {
    const stored = localStorage.getItem(SELECTIONS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {};
}

function loadManual() {
  try {
    const stored = localStorage.getItem(MANUAL_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {};
}

export function useAssessment() {
  const [scores, setScores] = useState(loadScores);
  const [selections, setSelections] = useState(loadSelections);
  const [manualOverride, setManualOverride] = useState(loadManual);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem(SELECTIONS_KEY, JSON.stringify(selections));
  }, [selections]);

  useEffect(() => {
    localStorage.setItem(MANUAL_KEY, JSON.stringify(manualOverride));
  }, [manualOverride]);

  const setScore = (axisId, value) => {
    setScores((prev) => ({ ...prev, [axisId]: value }));
    setManualOverride((prev) => ({ ...prev, [axisId]: true }));
  };

  const toggleActivity = (axisId, activityId) => {
    setSelections((prev) => {
      const current = prev[axisId] || [];
      const next = current.includes(activityId)
        ? current.filter((id) => id !== activityId)
        : [...current, activityId];
      const axis = AXES.find((a) => a.id === axisId);
      const total = axis?.activities?.length || 8;
      const newScore = next.length / total;
      setScores((prevScores) => ({ ...prevScores, [axisId]: newScore }));
      setManualOverride((prevManual) => ({ ...prevManual, [axisId]: false }));
      return { ...prev, [axisId]: next };
    });
  };

  const reset = () => {
    setScores({});
    setSelections({});
    setManualOverride({});
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SELECTIONS_KEY);
    localStorage.removeItem(MANUAL_KEY);
  };

  const hasScores = Object.values(scores).some((v) => v > 0);

  return { scores, setScore, reset, hasScores, selections, toggleActivity, manualOverride };
}
