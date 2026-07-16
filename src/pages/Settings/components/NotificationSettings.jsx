// src/pages/Settings/components/NotificationSettings.jsx
import React, { useState } from 'react';
import './NotificationSettings.css';

function NotificationSettings({ notifications, onUpdate }) {
  const [state, setState] = useState(notifications || {
    dailyReminder: true,
    taskCompletion: true,
    achievement: true,
    levelUp: true,
  });

  const toggle = (key) => {
    const newState = { ...state, [key]: !state[key] };
    setState(newState);
    onUpdate(newState);
  };

  const items = [
    { key: 'dailyReminder', label: 'Daily Reminder', description: 'Get a reminder to complete your daily tasks' },
    { key: 'taskCompletion', label: 'Task Completion', description: 'Notify when you complete a task' },
    { key: 'achievement', label: 'Achievement', description: 'Celebrate when you unlock a new achievement' },
    { key: 'levelUp', label: 'Level Up', description: 'Notify when you reach a new level' },
  ];

  return (
    <div className="settings-card-glass">
      <h3 className="settings-card-title">Notifications</h3>

      <div className="notification-list">
        {items.map((item) => (
          <div key={item.key} className="notification-item">
            <div className="notification-info">
              <span className="notification-label">{item.label}</span>
              <span className="notification-description">{item.description}</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={state[item.key]}
                onChange={() => toggle(item.key)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationSettings;