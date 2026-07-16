// src/pages/TaskManager/components/TaskFilter.jsx
import React from 'react';
import './TaskFilter.css';

function TaskFilter({ filter, onFilterChange, counts }) {
  const filters = [
    { key: 'all', label: 'All', count: counts.total, icon: '📊' },
    { key: 'active', label: 'Active', count: counts.active, icon: '🔄' },
    { key: 'completed', label: 'Completed', count: counts.completed, icon: '✅' },
  ];

  return (
    <div className="task-filter-glass">
      {filters.map((f) => (
        <button
          key={f.key}
          className={`task-filter-btn ${filter === f.key ? 'active' : ''}`}
          onClick={() => onFilterChange(f.key)}
        >
          <span className="filter-icon">{f.icon}</span>
          {f.label}
          <span className="task-filter-count">{f.count}</span>
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;