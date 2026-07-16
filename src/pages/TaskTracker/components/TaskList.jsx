import React from 'react';
import TaskCard from './TaskCard';
import './TaskList.css';

function TaskList({ tasks, onToggleComplete, onManageTasks, filter }) {
  if (tasks.length === 0) {
    return (
      <div className="tt-empty">
        {filter === "all" ? (
          <>
            <div className="tt-empty-icon">
              <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                <circle cx="24" cy="24" r="20"
                  stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M24 16v8M24 32h.01"
                  stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="tt-empty-title">No tasks yet</p>
            <p className="tt-empty-sub">
              Tap <strong>Manage Tasks</strong> to add your daily goals
            </p>
            <button
              className="tt-empty-cta"
              onClick={onManageTasks}
            >
              Add Your First Task
            </button>
          </>
        ) : filter === "active" ? (
          <>
            <div className="tt-empty-icon tt-empty-icon--green">
              <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                <path d="M10 24L20 34L38 16"
                  stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="tt-empty-title">All tasks complete!</p>
            <p className="tt-empty-sub">Your tree has reached its peak today.</p>
          </>
        ) : (
          <>
            <div className="tt-empty-icon">
              <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                <circle cx="24" cy="24" r="20"
                  stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                <path d="M24 16v8l5 5"
                  stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="tt-empty-title">Nothing completed yet</p>
            <p className="tt-empty-sub">Check off tasks to grow your tree.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="tt-task-list">
      {tasks.map((task, idx) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          index={idx}
        />
      ))}
    </div>
  );
}

export default TaskList;