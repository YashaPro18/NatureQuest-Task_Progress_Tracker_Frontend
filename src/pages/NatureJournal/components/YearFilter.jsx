import React from 'react';
import './YearFilter.css';

function YearFilter({ years, selectedYear, onYearChange }) {
  return (
    <div className="year-filter">
      <div className="year-filter-label">
        <svg viewBox="0 0 20 20" fill="none">
          <path d="M5 10h10M2 5h16M7 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Filter by year:
      </div>
      <div className="year-filter-options">
        {years.map((year) => (
          <button
            key={year}
            className={`year-chip ${selectedYear === year ? 'active' : ''}`}
            onClick={() => onYearChange(year)}
          >
            {year === 'all' ? 'All Time' : year}
          </button>
        ))}
      </div>
    </div>
  );
}

export default YearFilter;