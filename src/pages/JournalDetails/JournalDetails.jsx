// src/pages/JournalDetails/JournalDetails.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DaySummaryHero from './components/DaySummaryHero';
import DayStatistics from './components/DayStatistics';
import TaskTimeline from './components/TaskTimeline';
import AchievementSection from './components/AchievementSection';
import ToastMessage from '../TaskManager/components/ToastMessage';
import './JournalDetails.css';
import API_URL from "../../config/api";

// Import frames for tree
import Frame1 from '../../assets/Frame/Frame1.png';
import Frame2 from '../../assets/Frame/Frame2.png';
import Frame3 from '../../assets/Frame/Frame3.png';
import Frame4 from '../../assets/Frame/Frame4.png';
import Frame5 from '../../assets/Frame/Frame5.png';
import Frame6 from '../../assets/Frame/Frame6.png';
import Frame7 from '../../assets/Frame/Frame7.png';
import Frame8 from '../../assets/Frame/Frame8.png';
import Frame9 from '../../assets/Frame/Frame9.png';
import Frame10 from '../../assets/Frame/Frame10.png';

const Frames = [
  Frame1, Frame2, Frame3, Frame4, Frame5,
  Frame6, Frame7, Frame8, Frame9, Frame10,
];

function JournalDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [dayData, setDayData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // ─── Toast helper ───
  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Fetch journal entry ───
  useEffect(() => {
    const fetchEntry = async () => {
      // If we have data from navigation state, use it
      if (location.state?.entry) {
        const entry = location.state.entry;
        const progress = entry.totalTasks > 0 
          ? Math.round((entry.completedTasks / entry.totalTasks) * 100) 
          : 0;
        const stageIndex = progress === 0 ? 0 : Math.min(9, Math.ceil(progress / 10) - 1);
        setDayData({
          ...entry,
          treeImage: Frames[stageIndex],
          failedTasks: entry.totalTasks - entry.completedTasks,
          progress,
        });
        setIsLoading(false);
        //console.log('Using navigation state for journal entry:', entry);
        return;
      }

      // Otherwise fetch from API
      if (!token || !id) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/journal/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch journal entry');
        const data = await response.json();
        const progress = data.totalTasks > 0 
          ? Math.round((data.completedTasks / data.totalTasks) * 100) 
          : 0;
        const stageIndex = progress === 0 ? 0 : Math.min(9, Math.ceil(progress / 10) - 1);
        setDayData({
          ...data,
          treeImage: Frames[stageIndex],
          failedTasks: data.totalTasks - data.completedTasks,
          progress,
        });
      } catch (error) {
        showToast('Failed to load journal entry');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [id, token, location.state]);

  // ─── Skeleton Loader ───
  if (isLoading) {
    return (
      <div className="journal-details-page">
        <button className="journal-details-back" onClick={() => navigate('/journal')}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Back to Journal
        </button>
        <div className="journal-details-skeleton">
          <div className="skeleton-hero"></div>
          <div className="skeleton-stats">
            {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton-stat-card"></div>)}
          </div>
          <div className="skeleton-timeline"></div>
          <div className="skeleton-achievements"></div>
        </div>
      </div>
    );
  }

  if (!dayData) {
    return (
      <div className="journal-details-page">
        <button className="journal-details-back" onClick={() => navigate('/journal')}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Back to Journal
        </button>
        <div className="journal-details-error">
          <span className="error-icon">🌱</span>
          <h3>Entry not found</h3>
          <p>We couldn't find the journal entry you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="journal-details-page">
      <button className="journal-details-back" onClick={() => navigate('/journal')}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Back to Journal
      </button>

      <DaySummaryHero data={dayData} />
      <DayStatistics data={dayData} />

      <div className="journal-details-grid">
        <TaskTimeline tasks={dayData.taskCompletions || []} />
        <AchievementSection achievements={dayData.achievements || []} />
      </div>

      {toast && <ToastMessage message={toast.message} type={toast.type} />}
    </div>
  );
}

export default JournalDetails;