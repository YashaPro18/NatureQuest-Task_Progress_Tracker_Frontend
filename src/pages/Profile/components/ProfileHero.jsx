// src/pages/Profile/components/ProfileHero.jsx
import React from 'react';
import './ProfileHero.css';
import { getStageByXp } from '../../../data/treeStages';

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

const frames = [Frame1, Frame2, Frame3, Frame4, Frame5, Frame6, Frame7, Frame8, Frame9, Frame10];

function ProfileHero({ data }) {
  const {
    name,
    level,
    xp,
    nextLevelXp,
    levelProgress,
    streak,
    treeStage,
  } = data;

  // ─── Frame based on stage (from treeStages) ───
  const getFrameIndex = (xp) => {
    const stage = getStageByXp(xp);
    return stage.id - 1; // id is 1‑based, subtract 1 for array index
  };

  const frameIndex = getFrameIndex(xp);
  const treeImage = frames[frameIndex] || Frame1;
  const progressPercent = Math.min(levelProgress, 100);

  return (
    <div className="profile-hero-glass">
      <div className="profile-hero-left">
        <div className="profile-avatar">
          <span className="avatar-emoji">🌳</span>
        </div>
        <div className="profile-hero-info">
          <h1 className="profile-hero-name">{name}</h1>
          <div className="profile-hero-meta">
            <span className="meta-item">
              <span className="meta-label">Level</span>
              <span className="meta-value">{level}</span>
            </span>
            <span className="meta-divider"></span>
            <span className="meta-item">
              <span className="meta-label">Stage</span>
              <span className="meta-value">{treeStage}</span>
            </span>
            <span className="meta-divider"></span>
            <span className="meta-item">
              <span className="meta-label">Streak</span>
              <span className="meta-value">{streak} days</span>
            </span>
          </div>
        </div>
      </div>

      <div className="profile-hero-right">
        <div className="profile-hero-xp">
          <div className="xp-label">
            <span>XP Progress</span>
            <span className="xp-numbers">{xp} / {nextLevelXp}</span>
          </div>
          <div className="xp-bar-bg">
            <div className="xp-bar-fill" style={{ width: `${progressPercent}%` }}>
              <div className="xp-bar-shine" />
            </div>
          </div>
          <div className="xp-percent">{Math.round(progressPercent)}%</div>
        </div>
        <div className="profile-hero-tree">
          <img src={treeImage} alt={treeStage} className="profile-tree-img" />
        </div>
      </div>
    </div>
  );
}

export default ProfileHero;