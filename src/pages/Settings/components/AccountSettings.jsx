// src/pages/Settings/components/AccountSettings.jsx
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './AccountSettings.css';
import API_URL from "../../../config/api";

function AccountSettings() {
  const { user, token, updateUser } = useAuth();
  const [activeSection, setActiveSection] = useState(null); // 'profile' | 'password' | null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ─── Edit Profile State ───
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');

  // ─── Change Password State ───
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
    setError('');
    // Reset form fields when switching
    if (section === 'profile') {
      setName(user?.name || '');
      setBio(user?.bio || '');
    }
    if (section === 'password') {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  // ─── Handle Edit Profile ───
  const handleEditProfile = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name.trim(), bio: bio.trim() }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to update profile');
      }
      const updatedUser = await response.json();
      updateUser(updatedUser);
      setActiveSection(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Handle Change Password ───
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to change password');
      }
      setActiveSection(null);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="settings-card-glass">
      <h3 className="settings-card-title">Account</h3>

      {/* ─── Profile Display ─── */}
      <div className="account-profile">
        <div className="account-avatar">
          <span className="avatar-emoji">🌳</span>
        </div>
        <div className="account-info">
          <span className="account-name">{user.name || 'User'}</span>
          <span className="account-email">{user.email || 'No email'}</span>
          <div className="account-meta">
            <span className="account-level">Level {user.level || 1}</span>
            <span className="account-divider">•</span>
            <span className="account-stage">{user.treeStage || 'Seed'}</span>
          </div>
          {user.bio && (
            <div className="account-bio">
              <span className="bio-text">{user.bio}</span>
            </div>
          )}
        </div>
      </div>

      {/* ─── Action Buttons ─── */}
      <div className="account-actions">
        <button
          className={`account-btn primary ${activeSection === 'profile' ? 'active' : ''}`}
          onClick={() => toggleSection('profile')}
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M11 2L14 5M3 13L2 14L3 13ZM9 4L12 7L4 15H1V12L9 4Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {activeSection === 'profile' ? 'Cancel' : 'Edit Profile'}
        </button>
        <button
          className={`account-btn secondary ${activeSection === 'password' ? 'active' : ''}`}
          onClick={() => toggleSection('password')}
        >
          <svg viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6 2V14M10 2V14" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          {activeSection === 'password' ? 'Cancel' : 'Change Password'}
        </button>
      </div>

      {/* ─── Edit Profile Form (Expandable) ─── */}
      {activeSection === 'profile' && (
        <form className="account-expandable-section" onSubmit={handleEditProfile}>
          <div className="account-expandable-field">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div className="account-expandable-field">
            <label>Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>
          {error && <div className="account-expandable-error">{error}</div>}
          <div className="account-expandable-actions">
            <button type="button" className="account-expandable-cancel" onClick={() => setActiveSection(null)}>
              Cancel
            </button>
            <button type="submit" className="account-expandable-save" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {/* ─── Change Password Form (Expandable) ─── */}
      {activeSection === 'password' && (
        <form className="account-expandable-section" onSubmit={handleChangePassword}>
          <div className="account-expandable-field">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              required
            />
          </div>
          <div className="account-expandable-field">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="account-expandable-field">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>
          {error && <div className="account-expandable-error">{error}</div>}
          <div className="account-expandable-actions">
            <button type="button" className="account-expandable-cancel" onClick={() => setActiveSection(null)}>
              Cancel
            </button>
            <button type="submit" className="account-expandable-save" disabled={loading}>
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AccountSettings;