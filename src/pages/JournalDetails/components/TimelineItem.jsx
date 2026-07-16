// src/pages/JournalDetails/components/TimelineItem.jsx
import React from 'react';
import './TimelineItem.css';

function TimelineItem({ task, index }) {
  const { title, completed, difficulty, xp } = task;

  const difficultyColors = {
    Easy: { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' },
    Medium: { bg: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' },
    Hard: { bg: 'rgba(249, 115, 22, 0.15)', color: '#f97316' },
  };

  const diffStyle = difficultyColors[difficulty] || difficultyColors.Medium;

  return (
    <div className={`timeline-item ${completed ? 'completed' : 'incomplete'}`} style={{ animationDelay: `${index * 0.04}s` }}>
      <div className="timeline-item-icon">
        {completed ? (
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M3 8L6.5 11.5L13 4" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </div>

      <div className="timeline-item-content">
        <span className="timeline-item-title">{title}</span>
        <div className="timeline-item-meta">
          <span className="timeline-item-difficulty" style={{ backgroundColor: diffStyle.bg, color: diffStyle.color }}>
            {difficulty}
          </span>
          <span className="timeline-item-xp">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M8 1L10 6L15 7L11 10.5L12.5 15L8 12.5L3.5 15L5 10.5L1 7L6 6L8 1Z" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            +{xp} XP
          </span>
        </div>
      </div>

      <div className="timeline-item-status">
        {completed ? '✓ Done' : '✗ Pending'}
      </div>
    </div>
  );
}

export default TimelineItem;