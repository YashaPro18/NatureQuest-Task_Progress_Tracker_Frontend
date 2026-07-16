// src/pages/Profile/components/EvolutionCard.jsx
import React from 'react';
import './EvolutionCard.css';

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

const frames = [
  Frame1, Frame2, Frame3, Frame4, Frame5,
  Frame6, Frame7, Frame8, Frame9, Frame10,
];

function EvolutionCard({ stage, isCurrent, index }) {
  const { name, xpRequired, unlocked } = stage;

  const stageIndex = Math.min(9, Math.floor((stage.id - 1) * 1.2));
  const treeImage = frames[stageIndex] || Frame1;

  return (
    <div
      className={`evolution-card ${isCurrent ? 'current' : ''} ${unlocked ? 'unlocked' : 'locked'}`}
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <div className="evolution-card-tree">
        <img src={treeImage} alt={name} className="evolution-tree-img" />
      </div>
      <div className="evolution-card-info">
        <span className="evolution-card-name">{name}</span>
        <span className="evolution-card-xp">Required: {xpRequired} XP</span>
      </div>
      <div className="evolution-card-status">
        {isCurrent ? (
          <span className="status-badge current-badge">Current</span>
        ) : unlocked ? (
          <span className="status-badge unlocked-badge">✓ Unlocked</span>
        ) : (
          <span className="status-badge locked-badge">🔒 Locked</span>
        )}
      </div>
    </div>
  );
}

export default EvolutionCard;