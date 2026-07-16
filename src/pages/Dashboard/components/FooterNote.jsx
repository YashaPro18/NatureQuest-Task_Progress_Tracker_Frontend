import React from 'react';
import './FooterNote.css';

function FooterNote() {
  return (
    <div className="footer-note-glass">
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <path d="M12 2L13.5 8.5L20 9.5L15 14L16.5 20.5L12 17L7.5 20.5L9 14L4 9.5L10.5 8.5L12 2Z" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <p>“Every task you complete is a step toward your forest. Keep growing.”</p>
    </div>
  );
}

export default FooterNote;