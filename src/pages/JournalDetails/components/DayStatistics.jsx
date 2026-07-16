// src/pages/JournalDetails/components/DayStatistics.jsx
import React from 'react';
import StatCard from '../../Dashboard/components/StatCard';
import './DayStatistics.css';

function DayStatistics({ data }) {
  const { xpEarned, completedTasks, failedTasks, progress } = data;

  const xpIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(74,222,128,0.1)"/>
      <circle cx="12" cy="12" r="2" fill="#4ade80"/>
    </svg>
  );

  const completedIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );

  const failedIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 9L15 15M15 9L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const rateIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(251,191,36,0.1)"/>
    </svg>
  );

  return (
    <div className="day-statistics-grid">
      <StatCard icon={xpIcon} value={xpEarned} label="XP Earned" color="#4ade80" />
      <StatCard icon={completedIcon} value={completedTasks} label="Completed" color="#60a5fa" />
      <StatCard icon={failedIcon} value={failedTasks || 0} label="Failed" color="#f87171" />
      <StatCard icon={rateIcon} value={`${Math.round(progress)}%`} label="Rate" color="#fbbf24" />
    </div>
  );
}

export default DayStatistics;