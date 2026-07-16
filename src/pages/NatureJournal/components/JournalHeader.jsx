import React from 'react';
import './JournalHeader.css';

function JournalHeader({ onBack }) {
  return (
    <div className="journal-header">
      <button className="journal-back-btn" onClick={onBack}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Back
      </button>
      <div className="journal-header-content">
        <span className="journal-eyebrow">Archive</span>
        <h1 className="journal-title">Nature Journal</h1>
        <p className="journal-subtitle">Track your growth and consistency over time</p>
      </div>
    </div>
  );
}

export default JournalHeader;