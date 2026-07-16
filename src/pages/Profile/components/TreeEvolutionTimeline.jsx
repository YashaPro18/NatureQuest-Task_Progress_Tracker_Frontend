// src/pages/Profile/components/TreeEvolutionTimeline.jsx
import React from 'react';
import EvolutionCard from './EvolutionCard';
import './TreeEvolutionTimeline.css';

function TreeEvolutionTimeline({ stages, currentStage }) {
  return (
    <div className="evolution-timeline-glass">
      <h3 className="evolution-title">Your Growth Journey</h3>
      <div className="evolution-list">
        {stages.map((stage, index) => (
          <EvolutionCard
            key={stage.id}
            stage={stage}
            isCurrent={stage.name === currentStage}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default TreeEvolutionTimeline;