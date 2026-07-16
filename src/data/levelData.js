// src/data/levelData.js
export const levelData = [
  { level: 1, xpRequired: 0, title: 'Seedling' },
  { level: 2, xpRequired: 100, title: 'Sprout' },
  { level: 3, xpRequired: 250, title: 'Explorer' },
  { level: 4, xpRequired: 500, title: 'Gardener' },
  { level: 5, xpRequired: 800, title: 'Forester' },
  { level: 6, xpRequired: 1200, title: 'Guardian' },
  { level: 7, xpRequired: 1800, title: 'Elder' },
  { level: 8, xpRequired: 2500, title: 'Mystic' },
  { level: 9, xpRequired: 3500, title: 'Legend' },
  { level: 10, xpRequired: 5000, title: 'Ancient' },
];

export const getLevelByXp = (xp) => {
  let current = levelData[0];
  for (const level of levelData) {
    if (xp >= level.xpRequired) current = level;
  }
  return current;
};

export const getXpToNextLevel = (xp) => {
  const current = getLevelByXp(xp);
  const index = levelData.findIndex(l => l.level === current.level);
  if (index < levelData.length - 1) {
    return levelData[index + 1].xpRequired - xp;
  }
  return 0;
};

export const getLevelProgress = (xp) => {
  const current = getLevelByXp(xp);
  const index = levelData.findIndex(l => l.level === current.level);
  if (index >= levelData.length - 1) return 100;
  const currentXp = levelData[index].xpRequired;
  const nextXp = levelData[index + 1].xpRequired;
  return Math.round(((xp - currentXp) / (nextXp - currentXp)) * 100);
};