import "./TreeProgress.css";

import tree1 from "../../assets/trees/tree1.png";
import tree2 from "../../assets/trees/tree2.png";
import tree3 from "../../assets/trees/tree3.png";
import tree4 from "../../assets/trees/tree4.png";
import tree5 from "../../assets/trees/tree5.png";
import tree6 from "../../assets/trees/tree6.png";
import tree7 from "../../assets/trees/tree7.png";
import tree8 from "../../assets/trees/tree8.png";
import tree9 from "../../assets/trees/tree9.png";
import tree10 from "../../assets/trees/tree10.png";

import Frame1 from "../../assets/Frame/Frame1.png";
import Frame2 from "../../assets/Frame/Frame2.png";
import Frame3 from "../../assets/Frame/Frame3.png";
import Frame4 from "../../assets/Frame/Frame4.png";
import Frame5 from "../../assets/Frame/Frame5.png";
import Frame6 from "../../assets/Frame/Frame6.png";
import Frame7 from "../../assets/Frame/Frame7.png";
import Frame8 from "../../assets/Frame/Frame8.png";
import Frame9 from "../../assets/Frame/Frame9.png";
import Frame10 from "../../assets/Frame/Frame10.png";

const trees = [tree1, tree2, tree3, tree4, tree5, tree6, tree7, tree8, tree9, tree10];
const Frames = [Frame1, Frame2, Frame3, Frame4, Frame5, Frame6, Frame7, Frame8, Frame9, Frame10];

const STAGE_LABELS = [
  "Seedling",
  "Sprout",
  "Sapling",
  "Young Tree",
  "Growing",
  "Maturing",
  "Established",
  "Flourishing",
  "Thriving",
  "Ancient",
];

function TreeProgress({ progress = 70 }) {
  const stage =
    progress === 0 ? 0 : Math.min(9, Math.ceil(progress / 10) - 1);

  const currentFrame = Frames[stage];
  const stageLabel = STAGE_LABELS[stage];

  // Number of pip segments filled
  const filledPips = Math.round(progress / 10);

  return (
    <div className="tp-wrapper">
      <div className="tp-card">

        {/* Header */}
        <div className="tp-header">
          <div className="tp-title-group">
            <span className="tp-eyebrow">Growth Status</span>
            <h2 className="tp-title">Tree Growth Tracker</h2>
          </div>
          <div className="tp-stage-chip">
            <span className="tp-stage-dot" />
            {stageLabel}
          </div>
        </div>

        {/* Tree Visual */}
        <div className="tp-visual">
          <div className="tp-glow" />
          <img
            key={stage}
            src={currentFrame}
            alt={`Tree at stage ${stage + 1}`}
            className="tp-tree-img"
          />
        </div>

        {/* Stats Row */}
        <div className="tp-stats">
          <div className="tp-stat">
            <span className="tp-stat-value">{progress.toFixed(0)}%</span>
            <span className="tp-stat-label">Progress</span>
          </div>
          <div className="tp-stat-divider" />
          <div className="tp-stat">
            <span className="tp-stat-value">{stage + 1}<span className="tp-stat-sub">/10</span></span>
            <span className="tp-stat-label">Stage</span>
          </div>
          <div className="tp-stat-divider" />
          <div className="tp-stat">
            <span className="tp-stat-value">{10 - (stage + 1)}</span>
            <span className="tp-stat-label">Remaining</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="tp-progress-area">
          <div className="tp-progress-track">
            <div
              className="tp-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Pip indicators */}
          <div className="tp-pips">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`tp-pip${i < filledPips ? " filled" : ""}`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default TreeProgress;