// src/pages/Settings/components/ReminderSettings.jsx
import React, { useState, useEffect } from 'react';
import './ReminderSettings.css';

function ReminderSettings({ reminders, onUpdate }) {
  const [state, setState] = useState(reminders || {
    morning: true,
    evening: true,
    morningTime: '08:00',
    eveningTime: '20:00',
    timezone: 'UTC +5:30',
  });

  useEffect(() => {
    if (reminders) setState(reminders);
  }, [reminders]);

  const updateReminder = (key, value) => {
    const newState = { ...state, [key]: value };
    setState(newState);
    onUpdate(newState);
  };

  return (
    <div className="settings-card-glass">
      <h3 className="settings-card-title">Reminders</h3>

      <div className="reminder-grid">
        <div className="reminder-item">
          <div className="reminder-info">
            <span className="reminder-label">Morning Reminder</span>
            <span className="reminder-description">Start your day with intention</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={state.morning}
              onChange={() => updateReminder('morning', !state.morning)}
            />
            <span className="toggle-slider"></span>
          </label>
          <input
            type="time"
            className="reminder-time"
            value={state.morningTime}
            onChange={(e) => updateReminder('morningTime', e.target.value)}
            disabled={!state.morning}
          />
        </div>

        <div className="reminder-item">
          <div className="reminder-info">
            <span className="reminder-label">Evening Reminder</span>
            <span className="reminder-description">Reflect on your day's growth</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={state.evening}
              onChange={() => updateReminder('evening', !state.evening)}
            />
            <span className="toggle-slider"></span>
          </label>
          <input
            type="time"
            className="reminder-time"
            value={state.eveningTime}
            onChange={(e) => updateReminder('eveningTime', e.target.value)}
            disabled={!state.evening}
          />
        </div>

        <div className="reminder-timezone">
          <span className="timezone-label">Timezone</span>
          <select
            className="timezone-select"
            value={state.timezone}
            onChange={(e) => updateReminder('timezone', e.target.value)}
          >
            <option value="UTC +5:30">UTC +5:30 (IST)</option>
            <option value="UTC +0:00">UTC +0:00 (GMT)</option>
            <option value="UTC -5:00">UTC -5:00 (EST)</option>
            <option value="UTC -8:00">UTC -8:00 (PST)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ReminderSettings;