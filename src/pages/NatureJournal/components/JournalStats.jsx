// src/pages/NatureJournal/components/JournalStats.jsx
import React from 'react';
import StatCard from '../../Dashboard/components/StatCard';
import './JournalStats.css';

function JournalStats({ totalXp, totalTasks, totalCompleted, avgCompletion, bestDay }) {
  const xpIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(74,222,128,0.1)"/>
      <circle cx="12" cy="12" r="2" fill="#4ade80"/>
    </svg>
  );

  const tasksIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );

  const completedIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );

  const bestIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15 9H22L16.5 13.5L19 21L12 16.5L5 21L7.5 13.5L2 9H9L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(251,191,36,0.1)"/>
    </svg>
  );

  return (
    <div className="journal-stats-grid">
      <StatCard icon={xpIcon} value={totalXp} label="Total XP" color="#4ade80" />
      <StatCard icon={tasksIcon} value={totalTasks} label="Total Tasks" color="#60a5fa" />
      <StatCard icon={completedIcon} value={totalCompleted} label="Completed" color="#a855f7" />
      <StatCard icon={bestIcon} value={`${bestDay?.progress || 0}%`} label="Best Day" color="#fbbf24" />
    </div>
  );
}

export default JournalStats;