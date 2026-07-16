// src/pages/TaskTracker/components/TaskCard.jsx
import React from 'react';
import './TaskCard.css';

const PRIORITY = {
  high:   { label: "High",   color: "#f87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.2)"  },
  medium: { label: "Medium", color: "#fbbf24", bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.2)"   },
  low:    { label: "Low",    color: "#4ade80", bg: "rgba(74,222,128,0.12)",  border: "rgba(74,222,128,0.2)"   },
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 10" fill="none" width="12" height="10">
      <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TaskCard({ task, onToggleComplete, index }) {
  const { _id, title, completed, priority } = task;
  const p = PRIORITY[priority] || PRIORITY.medium;

  return (
    <div className={`tt-task${completed ? " tt-task--done" : ""}`} style={{ animationDelay: `${index * 0.04}s` }}>
      <div className="tt-task-stripe" style={{ background: p.color }} />
      <label className="tt-check-wrap" title="Mark complete">
        <input type="checkbox" checked={completed} onChange={() => onToggleComplete(_id)} className="tt-check-input" />
        <span className={`tt-checkmark${completed ? " tt-checkmark--done" : ""}`}>
          {completed && <CheckIcon />}
        </span>
      </label>
      <div className="tt-task-body">
        <span className="tt-task-title">{title}</span>
        <span className="tt-priority-pill" style={{ color: p.color, background: p.bg, border: `1px solid ${p.border}` }}>
          {p.label}
        </span>
      </div>
      {completed && (
        <div className="tt-task-done-badge" title="Completed">
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
            <path d="M3 8.5L6.5 12L13 5" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default TaskCard;