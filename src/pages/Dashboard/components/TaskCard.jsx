// src/pages/Dashboard/components/TaskCard.jsx
import React from 'react';
import './TaskCard.css';

function TaskCard({ task, onClick, readOnly = false }) {
  const { title, difficulty, xp, completed } = task;

  const difficultyColor = {
    Easy: '#22c55e',
    Medium: '#fbbf24',
    Hard: '#f97316',
  }[difficulty] || '#6b7280';

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div 
      className={`task-card-glass ${completed ? 'completed' : ''} ${readOnly ? 'read-only' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* ─── Status indicator (no checkbox) ─── */}
      <div className={`task-status-indicator ${completed ? 'done' : 'pending'}`}>
        {completed ? '✓' : '○'}
      </div>

      <div className="task-card-content">
        <span className="task-card-title">{title}</span>
        <div className="task-card-meta">
          <span
            className="task-card-difficulty"
            style={{ backgroundColor: `${difficultyColor}20`, color: difficultyColor }}
          >
            {difficulty}
          </span>
          <span className="task-card-xp">
            <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
              <path d="M8 1L10 6L15 7L11 10.5L12.5 15L8 12.5L3.5 15L5 10.5L1 7L6 6L8 1Z" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            {xp} XP
          </span>
        </div>
      </div>

      {readOnly && (
        <div className="task-click-hint">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default TaskCard;