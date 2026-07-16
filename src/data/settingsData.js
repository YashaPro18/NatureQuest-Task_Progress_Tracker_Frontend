// src/data/settingsData.js

export const settingsData = {
  notifications: {
    dailyReminder: true,
    taskCompletion: true,
    achievement: true,
    levelUp: true,
  },
  reminders: {
    morning: true,
    evening: true,
    morningTime: '08:00',
    eveningTime: '20:00',
    timezone: 'UTC +5:30',
  },
  theme: 'nature-green',
  language: 'en',
  soundEffects: true,
  hapticFeedback: false,
};

export const updateSettings = (section, key, value) => {
  if (settingsData[section]) {
    settingsData[section][key] = value;
  }
  return settingsData;
};

export const getSettings = () => settingsData;

export const resetSettings = () => {
  settingsData.notifications = { dailyReminder: true, taskCompletion: true, achievement: true, levelUp: true };
  settingsData.reminders = { morning: true, evening: true, morningTime: '08:00', eveningTime: '20:00', timezone: 'UTC +5:30' };
  settingsData.theme = 'nature-green';
  settingsData.language = 'en';
  settingsData.soundEffects = true;
  settingsData.hapticFeedback = false;
  return settingsData;
};