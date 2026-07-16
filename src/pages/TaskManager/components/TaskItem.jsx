// src/pages/TaskManager/components/TaskItem.jsx
import React, { useState } from 'react';
import './TaskItem.css';

function TaskItem({ task, onToggleComplete, onDelete, onEdit, style }) {
  const { _id, title, difficulty, xp, completed } = task;
  const [isHovered, setIsHovered] = useState(false);

  const difficultyColors = {
    Easy: { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' },
    Medium: { bg: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' },
    Hard: { bg: 'rgba(249, 115, 22, 0.15)', color: '#f97316' },
  };

  const diffStyle = difficultyColors[difficulty] || difficultyColors.Medium;

  return (
    <div
      className={`task-item-glass ${completed ? 'completed' : ''}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className="task-item-check"
        onClick={() => onToggleComplete(_id)}
        aria-label="Toggle complete"
      >
        {completed && (
          <svg viewBox="0 0 12 10">
            <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      <div className="task-item-content">
        <span className="task-item-title">{title}</span>
        <div className="task-item-meta">
          <span className="task-item-difficulty" style={{ backgroundColor: diffStyle.bg, color: diffStyle.color }}>
            {difficulty}
          </span>
          <span className="task-item-xp">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M8 1L10 6L15 7L11 10.5L12.5 15L8 12.5L3.5 15L5 10.5L1 7L6 6L8 1Z" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            {xp} XP
          </span>
        </div>
      </div>

      {isHovered && (
        <div className="task-item-actions">
          <button
            className="task-item-action edit"
            onClick={() => onEdit(task)}
            aria-label="Edit task"
          >
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M11 2L14 5M3 13L2 14L3 13ZM9 4L12 7L4 15H1V12L9 4Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            className="task-item-action delete"
            onClick={() => onDelete(_id)}
            aria-label="Delete task"
          >
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M5 4V2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V4M6 7.5v4M10 7.5v4M3 4l.8 8.6a.6.6 0 0 0 .6.4h7.2a.6.6 0 0 0 .6-.4L13 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskItem;