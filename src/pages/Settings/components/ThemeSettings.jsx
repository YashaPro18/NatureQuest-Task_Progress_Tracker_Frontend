// src/pages/Settings/components/ThemeSettings.jsx
import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import './ThemeSettings.css';

function ThemeSettings({ theme, onUpdate }) {
  const { setTheme } = useTheme();

  const themes = [
    { id: 'nature-green', label: 'Nature Green', color: '#22c55e' },
    { id: 'forest-dark', label: 'Forest Dark', color: '#2d3a2c' },
    { id: 'sunrise', label: 'Sunrise', color: '#f59e0b' },
    { id: 'ocean-blue', label: 'Ocean Blue', color: '#3b82f6' },
  ];

  const handleThemeChange = (id) => {
    // Update global context (UI)
    setTheme(id);
    // Save to backend via parent prop
    onUpdate(id);
  };

  return (
    <div className="settings-card-glass">
      <h3 className="settings-card-title">Theme</h3>

      <div className="theme-grid">
        {themes.map((t) => (
          <button
            key={t.id}
            className={`theme-option ${theme === t.id ? 'active' : ''}`}
            onClick={() => handleThemeChange(t.id)}
          >
            <div className="theme-color" style={{ backgroundColor: t.color }} />
            <span className="theme-label">{t.label}</span>
            {theme === t.id && (
              <svg className="theme-check" viewBox="0 0 12 10" fill="none">
                <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSettings;