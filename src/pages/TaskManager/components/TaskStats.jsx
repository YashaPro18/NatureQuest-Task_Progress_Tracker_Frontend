import React from 'react';
import StatCard from '../../Dashboard/components/StatCard';
import './TaskStats.css';

function TaskStats({ total, active, completed }) {
  const totalIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

  const activeIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4l2.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  const completedIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

  return (
    <div className="task-stats-grid">
      <StatCard icon={totalIcon} value={total} label="Total Tasks" color="#60a5fa" />
      <StatCard icon={activeIcon} value={active} label="Active" color="#fbbf24" />
      <StatCard icon={completedIcon} value={completed} label="Completed" color="#4ade80" />
    </div>
  );
}

export default TaskStats;