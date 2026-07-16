// src/pages/Profile/components/RecentAchievements.jsx
import React from 'react';
import AchievementBadge from './AchievementBadge';
import './RecentAchievements.css';

function RecentAchievements({ achievements }) {
  return (
    <div className="achievements-section-glass">
      <div className="achievements-header">
        <h3 className="achievements-title">Recent Achievements</h3>
        {achievements.length > 0 && (
          <span className="achievements-count">{achievements.length} earned</span>
        )}
      </div>

      {achievements.length === 0 ? (
        <div className="achievements-empty">
          <div className="empty-tree-container">
            <div className="empty-tree-icon">🌱</div>
            <div className="empty-glow"></div>
          </div>
          <div className="empty-content">
            <p className="empty-text">Start your journey</p>
            <p className="empty-sub">Complete tasks to unlock achievements and watch your tree grow.</p>
          </div>
          <div className="empty-decoration">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      ) : (
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <AchievementBadge 
              key={index} 
              achievement={achievement} 
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentAchievements;