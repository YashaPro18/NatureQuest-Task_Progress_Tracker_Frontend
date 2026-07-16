// src/pages/Profile/components/ProfileStats.jsx
import React from 'react';
import StatCard from '../../Dashboard/components/StatCard';
import './ProfileStats.css';

function ProfileStats({ data }) {
  const { totalXp, totalTasks, perfectDays, longestStreak } = data;

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

  const perfectIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15 9H22L16.5 13.5L19 21L12 16.5L5 21L7.5 13.5L2 9H9L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(251,191,36,0.1)"/>
    </svg>
  );

  const streakIcon = (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2C10 6 6 10 6 14C6 18 9 22 12 22C15 22 18 18 18 14C18 10 14 6 12 2Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(251,191,36,0.1)"/>
    </svg>
  );

  return (
    <div className="profile-stats-grid">
      <StatCard icon={xpIcon} value={totalXp} label="Total XP" color="#4ade80" />
      <StatCard icon={tasksIcon} value={totalTasks} label="Tasks Done" color="#60a5fa" />
      <StatCard icon={perfectIcon} value={perfectDays} label="Perfect Days" color="#fbbf24" />
      <StatCard icon={streakIcon} value={longestStreak} label="Best Streak" color="#f97316" />
    </div>
  );
}

export default ProfileStats;