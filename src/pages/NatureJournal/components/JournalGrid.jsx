// src/pages/NatureJournal/components/JournalGrid.jsx
import React from 'react';
import JournalCard from './JournalCard';
import './JournalGrid.css';

function JournalGrid({ entries }) {
  return (
    <div className="journal-grid">
      {entries.map((entry, index) => (
        <JournalCard key={entry._id} entry={entry} index={index} />
      ))}
    </div>
  );
}

export default JournalGrid;