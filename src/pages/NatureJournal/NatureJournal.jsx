// src/pages/NatureJournal/NatureJournal.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import JournalHeader from './components/JournalHeader';
import JournalStats from './components/JournalStats';
import YearFilter from './components/YearFilter';
import JournalGrid from './components/JournalGrid';
import JournalEmptyState from './components/JournalEmptyState';
import ToastMessage from '../TaskManager/components/ToastMessage';
import './NatureJournal.css';
import API_URL from "../../config/api";

function NatureJournal() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('all');
  const [toast, setToast] = useState(null);

  // ─── Toast helper ───
  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Fetch journal entries ───
  useEffect(() => {
    const fetchJournal = async () => {
      if (!token) return;
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/journal`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch journal entries');
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        showToast('Failed to load journal entries', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJournal();
  }, [token]);

  // ─── Get available years ───
  const years = ['all', ...new Set(entries.map(item => {
    // Extract year from date string (e.g., "June 7, 2026" -> 2026)
    const match = item.date?.match(/\d{4}$/);
    return match ? parseInt(match[0]) : null;
  }).filter(Boolean))];

  // ─── Filter by year ───
  const filteredEntries = selectedYear === 'all'
    ? entries
    : entries.filter(item => {
        const match = item.date?.match(/\d{4}$/);
        return match && parseInt(match[0]) === parseInt(selectedYear);
      });

  // ─── Compute stats ───
  const totalXp = entries.reduce((sum, e) => sum + (e.xpEarned || 0), 0);
  const totalTasks = entries.reduce((sum, e) => sum + (e.totalTasks || 0), 0);
  const totalCompleted = entries.reduce((sum, e) => sum + (e.completedTasks || 0), 0);
  const avgCompletion = entries.length
    ? Math.round(entries.reduce((sum, e) => sum + (e.completedTasks / e.totalTasks) * 100, 0) / entries.length)
    : 0;
  const bestDay = entries.reduce((best, e) => {
    const progress = e.totalTasks ? (e.completedTasks / e.totalTasks) * 100 : 0;
    return progress > (best?.progress || 0) ? { ...e, progress } : best;
  }, null);

  // ─── Skeleton ───
  if (isLoading) {
    return (
      <div className="nature-journal-page">
        <JournalHeader onBack={() => navigate('/tasks')} />
        <div className="journal-skeleton-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="journal-skeleton-card">
              <div className="skeleton-tree"></div>
              <div className="skeleton-date"></div>
              <div className="skeleton-stats"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="nature-journal-page">
      <JournalHeader onBack={() => navigate('/tasks')} />

      {entries.length > 0 && (
        <>
          <JournalStats
            totalXp={totalXp}
            totalTasks={totalTasks}
            totalCompleted={totalCompleted}
            avgCompletion={avgCompletion}
            bestDay={bestDay}
          />

          <YearFilter
            years={years}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
        </>
      )}

      {filteredEntries.length === 0 ? (
        <JournalEmptyState onNavigate={() => navigate('/tasks')} />
      ) : (
        <JournalGrid entries={filteredEntries} />
      )}

      {toast && <ToastMessage message={toast.message} type={toast.type} />}
    </div>
  );
}

export default NatureJournal;