import React from 'react';
import './JournalEmptyState.css';

function JournalEmptyState({ onNavigate }) {
  return (
    <div className="journal-empty-state">
      <div className="journal-empty-icon">
        <svg viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4"/>
          <path d="M32 20v12M32 40h.02" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <h3>No journal entries yet</h3>
      <p>Complete tasks to start your growth journey.</p>
      <button className="journal-empty-cta" onClick={onNavigate}>
        Go to Dashboard
        <svg viewBox="0 0 20 20" fill="none">
          <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export default JournalEmptyState;