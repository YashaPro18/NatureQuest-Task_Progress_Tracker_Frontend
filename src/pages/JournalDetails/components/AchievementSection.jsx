// src/pages/JournalDetails/components/AchievementSection.jsx
import React from 'react';
import AchievementCard from './AchievementCard';
import './AchievementSection.css';

function AchievementSection({ achievements }) {
  return (
    <div className="achievement-section-glass">
      <h3 className="achievement-section-title">Achievements Earned</h3>

      {achievements.length === 0 ? (
        <div className="achievement-empty">
          <span className="achievement-empty-icon">🏆</span>
          <p>No achievements earned this day.</p>
        </div>
      ) : (
        <div className="achievement-grid">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AchievementSection;