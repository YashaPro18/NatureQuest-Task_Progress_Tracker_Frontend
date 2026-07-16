// src/pages/Profile/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { treeStages, getStageByXp } from '../../data/treeStages';
import { getLevelByXp, getXpToNextLevel, getLevelProgress } from '../../data/levelData';
import ProfileHero from './components/ProfileHero';
import ProfileStats from './components/ProfileStats';
import TreeEvolutionTimeline from './components/TreeEvolutionTimeline';
import RecentAchievements from './components/RecentAchievements';
import './Profile.css';
import API_URL from "../../config/api";

function Profile() {
  const navigate = useNavigate();
  const { user: authUser, token, loading: authLoading } = useAuth();
  const [user, setUser] = useState(authUser);
  const [isLoading, setIsLoading] = useState(true);

  // ─── Fetch latest user data to ensure fresh XP ───
  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(authUser);
        }
      } catch (error) {
        console.error('Failed to refresh user data:', error);
        setUser(authUser);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token, authUser]);

  // ─── If still loading, show skeleton ───
  if (authLoading || isLoading) {
    return (
      <div className="profile-page">
        <button className="profile-back" onClick={() => navigate('/')}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Back
        </button>
        <div className="profile-skeleton">
          <div className="skeleton-hero"></div>
          <div className="skeleton-stats"></div>
          <div className="skeleton-timeline"></div>
          <div className="skeleton-achievements"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  // ─── User Data ───
  const userXp = user.xp || 0;
  const userTotalXp = user.totalXp || userXp;

  // ─── Level Data ───
  const levelObj = getLevelByXp(userXp); // returns { level: number, xpRequired, title }
  const currentLevel = levelObj.level; // extract the number
  const xpToNext = getXpToNextLevel(userXp);
  const nextLevelXp = userXp + xpToNext;
  const levelProgress = getLevelProgress(userXp);

  // ─── Profile Data ───
  const profileData = {
    name: user.name || 'User',
    level: currentLevel,
    levelTitle: levelObj.title || `Level ${currentLevel}`,
    xp: userXp,
    xpToNext: xpToNext,
    nextLevelXp: nextLevelXp,
    levelProgress: levelProgress,
    streak: user.streak || 0,
    treeStage: getStageByXp(userXp).name,
    totalTasks: user.totalTasks || 0,
    perfectDays: user.perfectDays || 0,
    longestStreak: user.longestStreak || 0,
    totalXp: userTotalXp,
  };

  // ─── Evolution Stages (from treeStages) ───
  const stagesWithStatus = treeStages.map((stage) => ({
    ...stage,
    unlocked: userXp >= stage.xpRequired,
  }));

  const currentStage = getStageByXp(userXp).name;

  // ─── Compute Achievements ───
  const computeAchievements = () => {
    const list = [];
    const { xp, totalTasks, streak, level, perfectDays } = user;

    if (perfectDays && perfectDays > 0) {
      list.push({
        icon: '⭐',
        title: 'Perfect Day',
        description: 'Completed all tasks in a day',
        unlocked: true,
        unlockedDate: 'Achieved recently',
      });
    }

    if (totalTasks >= 100) {
      list.push({
        icon: '🏆',
        title: '100 Tasks',
        description: 'Completed 100 tasks total',
        unlocked: true,
        unlockedDate: 'Achieved recently',
      });
    } else if (totalTasks >= 50) {
      list.push({
        icon: '🏆',
        title: '50 Tasks',
        description: 'Completed 50 tasks total',
        unlocked: true,
        unlockedDate: 'Achieved recently',
      });
    }

    if (streak >= 7) {
      list.push({
        icon: '🔥',
        title: '7-Day Streak',
        description: 'Completed tasks for 7 days straight',
        unlocked: true,
        unlockedDate: 'Achieved recently',
      });
    } else if (streak >= 3) {
      list.push({
        icon: '🔥',
        title: '3-Day Streak',
        description: 'Completed tasks for 3 days straight',
        unlocked: true,
        unlockedDate: 'Achieved recently',
      });
    }

    if (level >= 5) {
      list.push({
        icon: '🌳',
        title: 'Level 5',
        description: 'Reached level 5',
        unlocked: true,
        unlockedDate: 'Achieved recently',
      });
    }

    if (xp >= 1000) {
      list.push({
        icon: '💪',
        title: '1000 XP',
        description: 'Earned 1000 XP total',
        unlocked: true,
        unlockedDate: 'Achieved recently',
      });
    }

    return list;
  };

  const achievements = computeAchievements();

  return (
    <div className="profile-page">
      <button className="profile-back" onClick={() => navigate('/')}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Back
      </button>

      <ProfileHero data={profileData} />
      <ProfileStats data={profileData} />
      <div className="profile-grid">
        <TreeEvolutionTimeline stages={stagesWithStatus} currentStage={currentStage} />
        <RecentAchievements achievements={achievements} />
      </div>
    </div>
  );
}

export default Profile;