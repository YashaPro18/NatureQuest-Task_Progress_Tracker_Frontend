// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TreeHero from './components/TreeHero';
import DailyStats from './components/DailyStats';
import TodayTaskList from './components/TodayTaskList';
import FooterNote from './components/FooterNote';
import ToastMessage from '../TaskManager/components/ToastMessage';
import plantImage from '../../assets/Parts/Lush_green_plant.png'; 
import './Dashboard.css';  // 👈 cache busting
import API_URL from "../../config/api";

// ─── Helper: Get stage based on progress ───
const getStageByProgress = (progress) => {
  const stages = [
    { name: "Seed", minProgress: 0 },
    { name: "Sprout", minProgress: 10 },
    { name: "Sapling", minProgress: 20 },
    { name: "Young Tree", minProgress: 30 },
    { name: "Growing", minProgress: 40 },
    { name: "Maturing", minProgress: 50 },
    { name: "Established", minProgress: 60 },
    { name: "Flourishing", minProgress: 70 },
    { name: "Thriving", minProgress: 80 },
    { name: "Ancient", minProgress: 90 },
  ];

  let current = stages[0];
  for (const stage of stages) {
    if (progress >= stage.minProgress) current = stage;
  }
  return current;
};

// ─── Helper: Get level based on progress ───
const getLevelByProgress = (progress) => {
  return Math.min(10, Math.floor(progress / 10) + 1);
};

// ─── Premium Skeleton Component ───
const DashboardSkeleton = () => (
  <div className="dashboard-skeleton">
    {/* Hero Skeleton */}
    <div className="skeleton-hero-card">
      <div className="skeleton-hero-header">
        <div className="skeleton-line skeleton-line-sm"></div>
        <div className="skeleton-line skeleton-line-lg"></div>
      </div>
      <div className="skeleton-hero-visual">
        <div className="skeleton-circle"></div>
        <div className="skeleton-badge"></div>
      </div>
      <div className="skeleton-hero-stats">
        <div className="skeleton-stat-item"></div>
        <div className="skeleton-stat-item"></div>
        <div className="skeleton-stat-item"></div>
      </div>
      <div className="skeleton-hero-progress">
        <div className="skeleton-line skeleton-line-md"></div>
        <div className="skeleton-bar"></div>
      </div>
    </div>

    {/* Stats Skeleton */}
    <div className="skeleton-stats-grid">
      <div className="skeleton-stat-card"></div>
      <div className="skeleton-stat-card"></div>
      <div className="skeleton-stat-card"></div>
      <div className="skeleton-stat-card"></div>
    </div>

    {/* Quick Action Skeleton */}
    <div className="skeleton-quick-action">
      <div className="skeleton-quick-content">
        <div className="skeleton-circle-small"></div>
        <div className="skeleton-quick-text">
          <div className="skeleton-line skeleton-line-md"></div>
          <div className="skeleton-line skeleton-line-sm"></div>
        </div>
      </div>
      <div className="skeleton-btn"></div>
    </div>

    {/* Tasks Skeleton */}
    <div className="skeleton-tasks-card">
      <div className="skeleton-tasks-header">
        <div className="skeleton-line skeleton-line-lg"></div>
        <div className="skeleton-line skeleton-line-sm"></div>
      </div>
      <div className="skeleton-tasks-list">
        <div className="skeleton-task-item"></div>
        <div className="skeleton-task-item"></div>
        <div className="skeleton-task-item"></div>
      </div>
      <div className="skeleton-see-more"></div>
    </div>
  </div>
);

function Dashboard() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Fetch today's tasks ───
  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) return;
      try {
        const response = await fetch(`${API_URL}/tasks`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        showToast('Failed to load tasks', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [token]);

  // ─── Compute stats from tasks ───
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  const todayXp = tasks.reduce((sum, t) => t.completed ? sum + t.xp : sum, 0);
  const totalTodayXp = tasks.reduce((sum, t) => sum + t.xp, 0);

  const progressLevel = getLevelByProgress(progress);
  const progressStage = getStageByProgress(progress);
  const treeData = {
    level: progressLevel,
    stage: progressStage.name,
    xp: todayXp,
    xpToNext: totalTodayXp,
    progress: progress,
  };
  const dailyStats = {
    todayXp: todayXp,
    completedTasks: completedTasks,
    streak: user?.streak || 0,
    treeStage: progressStage.name,
  };

  // ─── Show Premium Skeleton ───
  if (loading) {
    return (
      <div className="dashboard-root">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
        <div className="dashboard-root">
      <div className="dashboard-grid">
        {/* LEFT: TreeHero – Slide from LEFT */}
        <div className="dashboard-hero animate-slide-left">
          <TreeHero treeData={treeData} />
        </div>

        {/* RIGHT: DailyStats – Slide from RIGHT */}
        <div className="dashboard-stats animate-slide-right">
          <DailyStats stats={dailyStats} />

          {/* ─── UPDATED Quick Action ─── */}
          <div className="dashboard-quick-action animate-fade-up">

    <img
        src={plantImage}
        alt=""
        className="quick-action-plant-bg"
    />

    <div className="quick-action-content">

        <div className="quick-action-text">
            <h3 className="quick-action-title">
                Focus Mode
            </h3>

            <p className="quick-action-desc">
                Complete your daily tasks and watch your tree grow.
            </p>
        </div>

        <button
            className="quick-action-btn"
            onClick={() => navigate("/tasks")}
        >
            Go to Task Tracker →
        </button>

    </div>

</div>
        </div>
      </div>

      <div className="dashboard-tasks-section animate-fade-up-delayed">
        <TodayTaskList tasks={tasks} />
      </div>

      <FooterNote />
      {toast && <ToastMessage message={toast.message} type={toast.type} />}
    </div>
  );
}

export default Dashboard;