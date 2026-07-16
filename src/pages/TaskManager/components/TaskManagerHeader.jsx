import React from 'react';
import './TaskManagerHeader.css';

function TaskManagerHeader({ onBack }) {
  return (
    <div className="task-manager-header">
      <button className="task-manager-back" onClick={onBack}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Back
      </button>
      <div className="task-manager-header-content">
        <span className="task-manager-eyebrow">Task Management</span>
        <h1 className="task-manager-title">Manage Tasks</h1>
        <p className="task-manager-subtitle">Create, edit, and organize your growth tasks</p>
      </div>
    </div>
  );
}

export default TaskManagerHeader;