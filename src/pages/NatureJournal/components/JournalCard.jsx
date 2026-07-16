// src/pages/NatureJournal/components/JournalCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './JournalCard.css';

// Import tree frames
import Frame1 from '../../../assets/Frame/Frame1.png';
import Frame2 from '../../../assets/Frame/Frame2.png';
import Frame3 from '../../../assets/Frame/Frame3.png';
import Frame4 from '../../../assets/Frame/Frame4.png';
import Frame5 from '../../../assets/Frame/Frame5.png';
import Frame6 from '../../../assets/Frame/Frame6.png';
import Frame7 from '../../../assets/Frame/Frame7.png';
import Frame8 from '../../../assets/Frame/Frame8.png';
import Frame9 from '../../../assets/Frame/Frame9.png';
import Frame10 from '../../../assets/Frame/Frame10.png';

const Frames = [
  Frame1, Frame2, Frame3, Frame4, Frame5,
  Frame6, Frame7, Frame8, Frame9, Frame10,
];

function JournalCard({ entry, index }) {
  const navigate = useNavigate();
  const { _id, date, xpEarned, completedTasks, totalTasks, level, stage, status } = entry;

  // ─── Skipped day ───
  if (status === 'skipped') {
    return (
      <div className="journal-card skipped" style={{ animationDelay: `${index * 0.05}s` }}>
        <div className="journal-card-tree">
          <img src={Frame1} alt="Skipped day" className="journal-tree-img" />
          <div className="journal-progress-ring">
            <svg viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#6b7280"
                strokeWidth="2.5"
                strokeDasharray="0 100.5"
                strokeDashoffset="25"
                transform="rotate(-90 18 18)"
              />
            </svg>
            <span className="ring-percent" style={{ color: '#6b7280' }}>0%</span>
          </div>
          <div className="skipped-badge">Skipped</div>
        </div>

        <div className="journal-card-info">
          <div className="journal-card-date">
            <span className="date-text">{date}</span>
          </div>
          <div className="journal-card-stage">
            <span className="stage-name" style={{ color: '#6b7280' }}>No activity</span>
          </div>
          <div className="journal-skipped-message">
            You skipped using the app on this day.
          </div>
        </div>
      </div>
    );
  }

  // ─── Normal (completed) day ───
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const isPerfect = progress === 100;
  const stageIndex = progress === 0 ? 0 : Math.min(9, Math.ceil(progress / 10) - 1);
  const treeImage = Frames[stageIndex];

  const handleViewDetails = () => {
    navigate(`/journal/${_id}`, { state: { entry } });
  };

  return (
    <div className={`journal-card ${isPerfect ? 'perfect' : ''}`} style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="journal-card-tree">
        <img src={treeImage} alt={`Tree at ${progress}%`} className="journal-tree-img" />
        <div className="journal-progress-ring">
          <svg viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke={isPerfect ? '#fbbf24' : '#22c55e'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${progress * 1.005} 100.5`}
              strokeDashoffset="25"
              transform="rotate(-90 18 18)"
            />
          </svg>
          <span className="ring-percent">{progress}%</span>
        </div>
        {isPerfect && (
          <div className="perfect-badge-journal">
            <svg viewBox="0 0 12 12" fill="none">
              <path d="M4 6L6 8L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Perfect
          </div>
        )}
      </div>

      <div className="journal-card-info">
        <div className="journal-card-date">
          <span className="date-text">{date}</span>
          <span className="level-text">Lv.{level}</span>
        </div>

        <div className="journal-card-stage">
          <span className="stage-name">{stage}</span>
        </div>

        <div className="journal-card-stats">
          <div className="journal-stat">
            <span className="journal-stat-value">{xpEarned}</span>
            <span className="journal-stat-label">XP</span>
          </div>
          <div className="journal-stat-divider" />
          <div className="journal-stat">
            <span className="journal-stat-value">{completedTasks}</span>
            <span className="journal-stat-label">Done</span>
          </div>
          <div className="journal-stat-divider" />
          <div className="journal-stat">
            <span className="journal-stat-value">{totalTasks}</span>
            <span className="journal-stat-label">Total</span>
          </div>
        </div>
      </div>

      <button className="journal-view-btn" onClick={handleViewDetails}>
        View Details
        <svg viewBox="0 0 20 20" fill="none">
          <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export default JournalCard;