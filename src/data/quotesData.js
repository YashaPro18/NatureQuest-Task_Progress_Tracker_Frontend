// src/data/quotesData.js

export const motivationalQuotes = [
  { text: 'Every task you complete is a step toward your forest.', author: 'NatureQuest' },
  { text: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese Proverb' },
  { text: 'Growth is the only evidence of life.', author: 'John Henry Newman' },
  { text: 'A journey of a thousand miles begins with a single step.', author: 'Lao Tzu' },
  { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { text: 'Small daily improvements over time lead to stunning results.', author: 'Robin Sharma' },
  { text: 'The strongest trees weather the toughest storms.', author: 'NatureQuest' },
  { text: 'Your roots grow deeper with every challenge.', author: 'NatureQuest' },
  { text: 'What you plant today, you harvest tomorrow.', author: 'NatureQuest' },
  { text: 'Be like a tree. Stay grounded. Keep growing.', author: 'NatureQuest' },
  { text: 'The tree that does not move with the wind breaks.', author: 'NatureQuest' },
  { text: 'Plant seeds of greatness, water them with consistency.', author: 'NatureQuest' },
  { text: 'The best view comes after the hardest climb.', author: 'NatureQuest' },
  { text: 'Every great oak was once a little nut that held its ground.', author: 'NatureQuest' },
];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
};

export const getDailyQuote = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const index = dayOfYear % motivationalQuotes.length;
  return motivationalQuotes[index];
};