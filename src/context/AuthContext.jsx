// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getStageByXp } from '../data/treeStages';

const AuthContext = createContext();
import API_URL from "../config/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // ─── Check if user is already logged in ───
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('authUser');

      if (storedToken && storedUser) {
        try {
          const response = await fetch(`${API_URL}/auth/verify`, {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            const userData = {
              id: data._id,
              name: data.name,
              email: data.email,
              level: data.level || 1,
              xp: data.xp || 0,
              streak: data.streak || 0,
              totalTasks: data.totalTasks || 0,
              perfectDays: data.perfectDays || 0,
              longestStreak: data.longestStreak || 0,
              totalXp: data.totalXp || data.xp || 0,
              lastResetDate: data.lastResetDate || null, // 👈 ADD THIS
              treeStage: getStageByXp(data.xp || 0).name,
            };
            setUser(userData);
            setToken(storedToken);
            localStorage.setItem('authUser', JSON.stringify(userData));
          } else {
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
          }
        } catch {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setToken(storedToken);
          } catch {
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
          }
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // ─── LOGIN ───
  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed. Please try again.');
    }

    const userData = {
      id: data._id,
      name: data.name,
      email: data.email,
      level: data.level || 1,
      xp: data.xp || 0,
      streak: data.streak || 0,
      totalTasks: data.totalTasks || 0,
      perfectDays: data.perfectDays || 0,
      longestStreak: data.longestStreak || 0,
      totalXp: data.totalXp || data.xp || 0,
      lastResetDate: data.lastResetDate || null, // 👈 ADD THIS
      treeStage: getStageByXp(data.xp || 0).name,
    };

    setUser(userData);
    setToken(data.token);
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('authUser', JSON.stringify(userData));

    return userData;
  };

  // ─── REGISTER ───
  const register = async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed. Please try again.');
    }

    const userData = {
      id: data._id,
      name: data.name,
      email: data.email,
      level: data.level || 1,
      xp: data.xp || 0,
      streak: data.streak || 0,
      totalTasks: data.totalTasks || 0,
      perfectDays: data.perfectDays || 0,
      longestStreak: data.longestStreak || 0,
      totalXp: data.totalXp || data.xp || 0,
      lastResetDate: data.lastResetDate || null, // 👈 ADD THIS
      treeStage: getStageByXp(data.xp || 0).name,
    };

    setUser(userData);
    setToken(data.token);
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('authUser', JSON.stringify(userData));

    return userData;
  };

  // ─── LOGOUT ───
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  // ─── UPDATE USER ───
  const updateUser = (updatedData) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedData };
    if (updatedData.xp !== undefined) {
      updatedUser.treeStage = getStageByXp(updatedData.xp).name;
    }
    setUser(updatedUser);
    localStorage.setItem('authUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}