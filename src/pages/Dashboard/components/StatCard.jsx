import React from 'react';
import './StatCard.css';

function StatCard({ icon, value, label, color }) {
  return (
    <div className="stat-card-glass">
      <div className="stat-card-icon" style={{ backgroundColor: `${color}20`, color }}>
        {icon}
      </div>
      <div className="stat-card-content">
        <span className="stat-card-value">{value}</span>
        <span className="stat-card-label">{label}</span>
      </div>
    </div>
  );
}

export default StatCard;