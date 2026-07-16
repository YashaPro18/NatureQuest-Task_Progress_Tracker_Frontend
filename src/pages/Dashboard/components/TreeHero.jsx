// src/pages/Dashboard/components/TreeHero.jsx
import React from 'react';
import './TreeHero.css';

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

function TreeHero({ treeData }) {
  const { level, stage, xp, xpToNext, progress } = treeData;

  const getFrameIndex = (progress) => {
    if (progress === 0) return 0;
    return Math.min(9, Math.floor((progress / 100) * 10));
  };

  const frameIndex = getFrameIndex(progress);
  const treeImage = frames[frameIndex] || Frame1;
  const progressPercent = Math.round(progress);

  return (
    <div className="tree-hero-card">
      <div className="tree-hero-header">
        <span className="tree-hero-eyebrow">YOUR GROWTH</span>
        <h2 className="tree-hero-title">{stage}</h2>
      </div>

      <div className="tree-hero-visual">
        <img src={treeImage} alt="Tree" className="tree-hero-image" />
        <div className="tree-hero-level-badge">Level {level}</div>
      </div>

      <div className="tree-hero-stats">
        <div className="tree-hero-stat">
          <span className="tree-hero-stat-value">{xp}</span>
          <span className="tree-hero-stat-label">Today's XP</span>
        </div>
        <div className="tree-hero-stat-divider"></div>
        <div className="tree-hero-stat">
          <span className="tree-hero-stat-value">{level}</span>
          <span className="tree-hero-stat-label">Level</span>
        </div>
        <div className="tree-hero-stat-divider"></div>
        <div className="tree-hero-stat">
          <span className="tree-hero-stat-value">{progressPercent}%</span>
          <span className="tree-hero-stat-label">Progress</span>
        </div>
      </div>

      <div className="tree-hero-progress">
        <div className="tree-hero-progress-label">
          <span>Today's Progress</span>
          <span>{xp} / {xpToNext} XP</span>
        </div>
        <div className="tree-hero-progress-bg">
          <div className="tree-hero-progress-fill" style={{ width: `${progressPercent}%` }}>
            <div className="tree-hero-progress-shine"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreeHero;