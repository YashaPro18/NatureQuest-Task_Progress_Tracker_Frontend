// src/pages/Settings/Settings.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AccountSettings from './components/AccountSettings';
import NotificationSettings from './components/NotificationSettings';
import ThemeSettings from './components/ThemeSettings';
import ReminderSettings from './components/ReminderSettings';
import DangerZone from './components/DangerZone';
import ToastMessage from '../TaskManager/components/ToastMessage';
import './Settings.css';
import API_URL from "../../config/api";

function Settings() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── Fetch settings ───
  useEffect(() => {
    const fetchSettings = async () => {
      if (!token) return;
      try {
        const response = await fetch(`${API_URL}/settings`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch settings');
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        showToast('Failed to load settings', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [token]);

  // ─── Update settings ───
  const updateSettings = async (updatedFields) => {
    try {
      const response = await fetch(`${API_URL}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) throw new Error('Failed to update settings');
      const data = await response.json();
      setSettings(data);
      showToast('Settings updated! ✨');
      return data;
    } catch (error) {
      showToast('Failed to update settings', 'error');
      throw error;
    }
  };

  // ─── Reset settings ───
  const resetSettings = async () => {
    try {
      const response = await fetch(`${API_URL}/settings`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to reset settings');
      const data = await response.json();
      setSettings(data);
      showToast('Settings reset to default! 🔄');
    } catch (error) {
      showToast('Failed to reset settings', 'error');
    }
  };

  if (loading) {
    return (
      <div className="settings-page">
        <button className="settings-back" onClick={() => navigate('/')}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Back
        </button>
        <div className="settings-skeleton">
          <div className="skeleton-header"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <button className="settings-back" onClick={() => navigate('/')}>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Back
      </button>

      <div className="settings-header">
        <span className="settings-eyebrow">Preferences</span>
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">Manage your account and preferences</p>
      </div>

      <div className="settings-grid">
        <AccountSettings />
        <NotificationSettings
          notifications={settings?.notifications}
          onUpdate={(updates) => updateSettings({ notifications: updates })}
        />
        <ThemeSettings
          theme={settings?.theme}
          onUpdate={(theme) => updateSettings({ theme })}
        />
        <ReminderSettings
          reminders={settings?.reminders}
          onUpdate={(updates) => updateSettings({ reminders: updates })}
        />
        <DangerZone onReset={resetSettings} />
      </div>

      {toast && <ToastMessage message={toast.message} type={toast.type} />}
    </div>
  );
}

export default Settings;