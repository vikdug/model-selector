# The Seven Axes of Hard

Interactive self-assessment tool for the "Seven Axes of Hard" framework. Map your work across seven dimensions of difficulty, see your profile overlaid on AI automation levels, and get personalized model routing recommendations.

## What is this?

Not all difficulty is the same. This tool helps you understand *where* your work is hard across seven distinct axes — each being automated on a different timeline, at a different rate, by different tools:

| Axis | AI Automation | Timeline |
|------|--------------|----------|
| **Reasoning** — Multi-step logical deduction | 85% | Now |
| **Effort** — Large scope, sustained attention | 75% | Now |
| **Coordination** — Aligning teams & dependencies | 40% | Emerging |
| **Domain Expertise** — Pattern recognition from experience | 35% | Emerging |
| **Ambiguity** — Figuring out what the question actually is | 15% | Years away |
| **Emotional Intelligence** — Reading people, calibrating tone | 10% | Years away |
| **Judgment & Willpower** — Courage to make unpopular calls | 5% | May never yield |

## Features

- **Self-assessment sliders** — Rate your work on each axis
- **Dual-polygon radar chart** — Your profile (cyan) overlaid on AI automation levels (red)
- **Profile classification** — Get typed as The Analyst, The Leader, The Program Manager, etc.
- **Model recommendations** — See which AI models help most for your top axes
- **Personalized insights** — AI-addressable %, biggest human edge, leverage points
- **LocalStorage persistence** — Your scores survive page refreshes

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output goes to `dist/` — deploy anywhere static (Vercel, GitHub Pages, Netlify).

## Tech stack

- Vite + React 19
- Hand-rolled SVG radar chart (no charting libraries)
- Client-side only — no backend, no API keys