const PROFILES = [
  {
    id: "analyst",
    name: "The Analyst",
    dominantAxes: ["reasoning", "effort"],
    message: "AI can help significantly right now. Your hardest work lives on axes where frontier models are already strong.",
    emoji: "\u{1F4CA}",
  },
  {
    id: "leader",
    name: "The Leader",
    dominantAxes: ["ambiguity", "emotional", "judgment"],
    message: "Your hardest work is inherently human. AI tools won't replace your core skills anytime soon \u2014 but they can free you to spend more time on what matters.",
    emoji: "\u{1F451}",
  },
  {
    id: "program-manager",
    name: "The Program Manager",
    dominantAxes: ["coordination", "effort"],
    message: "Agentic AI is your force multiplier. The emerging wave of multi-agent systems is built for exactly the kind of cross-cutting coordination you do.",
    emoji: "\u{1F5C2}\uFE0F",
  },
  {
    id: "specialist",
    name: "The Specialist",
    dominantAxes: ["domain", "reasoning"],
    message: "Frontier models augment, don't replace. Your deep expertise gives you the context AI needs to be useful \u2014 you're the human-in-the-loop.",
    emoji: "\u{1F3AF}",
  },
  {
    id: "people-leader",
    name: "The People Leader",
    dominantAxes: ["emotional", "judgment"],
    message: "Invest in human skills, not AI tooling. The axes where you operate are the ones AI is least likely to touch. Your value is durable.",
    emoji: "\u{1F91D}",
  },
];

export function classifyProfile(scores) {
  let bestProfile = PROFILES[0];
  let bestScore = -1;

  for (const profile of PROFILES) {
    const score = profile.dominantAxes.reduce((sum, axisId) => sum + (scores[axisId] || 0), 0);
    const normalized = score / profile.dominantAxes.length;
    if (normalized > bestScore) {
      bestScore = normalized;
      bestProfile = profile;
    }
  }

  return bestProfile;
}

export function getTopAxes(scores, axes, count = 3) {
  return [...axes]
    .sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0))
    .slice(0, count);
}

export function generateInsights(scores, axes) {
  const insights = [];

  // AI-addressable percentage
  const totalScore = Object.values(scores).reduce((s, v) => s + v, 0);
  if (totalScore === 0) return insights;

  const weightedAutomation = axes.reduce((sum, axis) => {
    const userScore = scores[axis.id] || 0;
    return sum + userScore * axis.automationLevel;
  }, 0);
  const aiAddressable = Math.round((weightedAutomation / totalScore) * 100);
  insights.push({
    type: "ai-addressable",
    title: "AI-Addressable Today",
    value: `${aiAddressable}%`,
    description: `${aiAddressable}% of your difficulty profile is on axes where AI automation is already making progress.`,
  });

  // Biggest human-edge axis
  const sortedByHumanEdge = [...axes]
    .filter((a) => (scores[a.id] || 0) > 0.2)
    .sort((a, b) => {
      const scoreA = (scores[a.id] || 0) * (1 - a.automationLevel);
      const scoreB = (scores[b.id] || 0) * (1 - b.automationLevel);
      return scoreB - scoreA;
    });

  if (sortedByHumanEdge.length > 0) {
    const topHuman = sortedByHumanEdge[0];
    insights.push({
      type: "human-edge",
      title: "Your Biggest Human Edge",
      value: topHuman.label,
      description: `${topHuman.label} is where your skills matter most \u2014 only ${Math.round(topHuman.automationLevel * 100)}% automatable today.`,
    });
  }

  // Biggest AI leverage point
  const sortedByLeverage = [...axes]
    .filter((a) => (scores[a.id] || 0) > 0.2)
    .sort((a, b) => {
      const leverageA = (scores[a.id] || 0) * a.automationLevel;
      const leverageB = (scores[b.id] || 0) * b.automationLevel;
      return leverageB - leverageA;
    });

  if (sortedByLeverage.length > 0) {
    const topLeverage = sortedByLeverage[0];
    insights.push({
      type: "ai-leverage",
      title: "Your Biggest AI Leverage Point",
      value: `${topLeverage.label} \u2192 ${topLeverage.bestModel}`,
      description: `You scored high on ${topLeverage.label}, which is ${Math.round(topLeverage.automationLevel * 100)}% automatable. ${topLeverage.bestModel} can help here.`,
    });
  }

  // Gap insight
  const maxGap = [...axes]
    .filter((a) => (scores[a.id] || 0) > 0.2)
    .sort((a, b) => {
      const gapA = Math.abs((scores[a.id] || 0) - a.automationLevel);
      const gapB = Math.abs((scores[b.id] || 0) - b.automationLevel);
      return gapB - gapA;
    });

  if (maxGap.length > 0) {
    const biggest = maxGap[0];
    const userScore = scores[biggest.id] || 0;
    const isAbove = userScore > biggest.automationLevel;
    insights.push({
      type: "gap",
      title: isAbove ? "Biggest Unmet Need" : "Biggest Opportunity",
      value: biggest.label,
      description: isAbove
        ? `You need ${biggest.label} (${Math.round(userScore * 100)}%) but AI only covers ${Math.round(biggest.automationLevel * 100)}% today. This is your human differentiator.`
        : `AI can automate ${Math.round(biggest.automationLevel * 100)}% of ${biggest.label}, but you only scored ${Math.round(userScore * 100)}%. You may be under-leveraging AI here.`,
    });
  }

  return insights;
}
