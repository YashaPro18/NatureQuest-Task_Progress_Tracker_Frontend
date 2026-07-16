import React from 'react';
import './AchievementCard.css';

function AchievementCard({ achievement, index }) {
  const { icon, title, description } = achievement;

  return (
    <div className="achievement-card" style={{ animationDelay: `${index * 0.06}s` }}>
      <div className="achievement-card-icon">{icon}</div>
      <div className="achievement-card-content">
        <span className="achievement-card-title">{title}</span>
        <span className="achievement-card-description">{description}</span>
      </div>
    </div>
  );
}

export default AchievementCard;