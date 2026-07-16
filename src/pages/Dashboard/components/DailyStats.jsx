// src/pages/Dashboard/components/DailyStats.jsx
import React from 'react';
import StatCard from './StatCard';
import './DailyStats.css';

function DailyStats({ stats }) {
  const { todayXp, completedTasks, streak, treeStage } = stats;

  const xpIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

  const checkIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

  const fireIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2C10 6 6 10 6 14C6 18 9 22 12 22C15 22 18 18 18 14C18 10 14 6 12 2Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

  const treeIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15 9H22L16.5 13.5L19 21L12 16.5L5 21L7.5 13.5L2 9H9L12 2Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

  return (
    <div className="daily-stats-grid">
      <StatCard icon={xpIcon} value={todayXp} label="Today's XP" color="#4ade80" />
      <StatCard icon={checkIcon} value={completedTasks} label="Completed" color="#60a5fa" />
      <StatCard icon={fireIcon} value={streak} label="Day Streak" color="#fbbf24" />
      <StatCard icon={treeIcon} value={treeStage} label="Stage" color="#a855f7" />
    </div>
  );
}

export default DailyStats;