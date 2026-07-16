// src/pages/JournalDetails/components/DaySummaryHero.jsx
import React from 'react';
import './DaySummaryHero.css';

function DaySummaryHero({ data }) {
  const { date, stage, level, xpEarned, progress, completedTasks, totalTasks, treeImage } = data;
  const isPerfect = progress === 100;

  return (
    <div className={`day-summary-hero ${isPerfect ? 'perfect' : ''}`}>
      <div className="day-summary-left">
        <div className="day-summary-header">
          <span className="day-summary-eyebrow">Daily Report</span>
          <h1 className="day-summary-title">{date}</h1>
        </div>

        <div className="day-summary-metrics">
          <div className="day-metric">
            <span className="day-metric-value">{stage}</span>
            <span className="day-metric-label">Stage</span>
          </div>
          <div className="day-metric-divider"></div>
          <div className="day-metric">
            <span className="day-metric-value">Lv.{level}</span>
            <span className="day-metric-label">Level</span>
          </div>
          <div className="day-metric-divider"></div>
          <div className="day-metric">
            <span className="day-metric-value">{xpEarned} XP</span>
            <span className="day-metric-label">Earned</span>
          </div>
        </div>

        <div className="day-summary-progress">
          <div className="day-progress-label">
            <span>Completion</span>
            <span className="day-progress-percent">{Math.round(progress)}%</span>
          </div>
          <div className="day-progress-bg">
            <div className="day-progress-fill" style={{ width: `${progress}%` }}>
              <div className="day-progress-shine" />
            </div>
          </div>
          <div className="day-task-count">
            {completedTasks} of {totalTasks} tasks completed
          </div>
        </div>

        {isPerfect && (
          <div className="day-perfect-badge">
            <span className="badge-icon">⭐</span>
            Perfect Day!
          </div>
        )}
      </div>

      <div className="day-summary-right">
        <div className="day-tree-wrapper">
          <img src={treeImage} alt={`Tree at ${progress}%`} className="day-tree-img" />
          <div className="day-tree-glow"></div>
        </div>
      </div>
    </div>
  );
}

export default DaySummaryHero;