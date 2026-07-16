// src/data/treeStages.js

export const treeStages = [
  { id: 1, name: 'Seed', emoji: '🌰', xpRequired: 0, minProgress: 0, description: 'The beginning of your journey.' },
  { id: 2, name: 'Sprout', emoji: '🌱', xpRequired: 100, minProgress: 15, description: 'First signs of life. Keep going!' },
  { id: 3, name: 'Sapling', emoji: '🌿', xpRequired: 300, minProgress: 30, description: 'Growing stronger every day.' },
  { id: 4, name: 'Young Tree', emoji: '🌳', xpRequired: 600, minProgress: 45, description: 'Roots are deep. You\'re thriving.' },
  { id: 5, name: 'Growing Tree', emoji: '🌳', xpRequired: 1000, minProgress: 60, description: 'Reaching for the sky.' },
  { id: 6, name: 'Mature Tree', emoji: '🌲', xpRequired: 1800, minProgress: 75, description: 'Strong and resilient.' },
  { id: 7, name: 'Ancient Oak', emoji: '🌳', xpRequired: 3000, minProgress: 90, description: 'A symbol of wisdom and growth.' },
  { id: 8, name: 'Elderwood', emoji: '🌴', xpRequired: 5000, minProgress: 100, description: 'The pinnacle of growth. Legendary.' },
];

export const getStageByXp = (xp) => {
  let current = treeStages[0];
  for (const stage of treeStages) {
    if (xp >= stage.xpRequired) current = stage;
  }
  return current;
};

export const getStageByProgress = (progress) => {
  let current = treeStages[0];
  for (const stage of treeStages) {
    if (progress >= stage.minProgress) current = stage;
  }
  return current;
};

export const getNextStage = (currentStage) => {
  const index = treeStages.findIndex(s => s.id === currentStage.id);
  return index < treeStages.length - 1 ? treeStages[index + 1] : null;
};