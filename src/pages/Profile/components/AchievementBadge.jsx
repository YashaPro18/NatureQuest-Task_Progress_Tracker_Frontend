// src/pages/Profile/components/AchievementBadge.jsx
import React from 'react';
import './AchievementBadge.css';

function AchievementBadge({ achievement, index = 0 }) {
  const { icon, title, description, unlockedDate } = achievement;

  return (
    <div 
      className="achievement-badge" 
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="badge-icon-wrapper">
        <div className="badge-icon">{icon}</div>
      </div>
      <div className="badge-content">
        <span className="badge-title">{title}</span>
        <span className="badge-description">{description}</span>
        {unlockedDate && (
          <span className="badge-date">
            <span className="badge-date-dot"></span>
            {unlockedDate}
          </span>
        )}
      </div>
    </div>
  );
}

export default AchievementBadge;