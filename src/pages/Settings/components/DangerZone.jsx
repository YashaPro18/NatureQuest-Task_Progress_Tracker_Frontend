// src/pages/Settings/components/DangerZone.jsx
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './DangerZone.css';
import API_URL from "../../../config/api";

function DangerZone({ onReset }) {
  const { token } = useAuth();
  const [showConfirm, setShowConfirm] = useState(null);

  const actions = [
    { id: 'reset', label: 'Reset Progress', description: 'Reset all your progress and start fresh', icon: '🔄' },
    { id: 'history', label: 'Delete History', description: 'Remove all your journal history', icon: '🗑️' },
    { id: 'tasks', label: 'Clear All Tasks', description: 'Delete all tasks from your dashboard', icon: '🧹' },
  ];

  const handleAction = (id) => {
    setShowConfirm(id);
  };

  const confirmAction = async () => {
    try {
      switch (showConfirm) {
        case 'reset':
          await onReset();
          break;
        case 'history':
          const historyRes = await fetch(`${API_URL}/journal`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!historyRes.ok) throw new Error('Failed to delete history');
          alert('Journal history deleted successfully!');
          break;
        case 'tasks':
          const tasksRes = await fetch(`${API_URL}/tasks`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!tasksRes.ok) throw new Error('Failed to clear tasks');
          alert('All tasks cleared successfully!');
          break;
        default:
          break;
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setShowConfirm(null);
    }
  };

  const cancelAction = () => {
    setShowConfirm(null);
  };

  const getConfirmMessage = () => {
    switch (showConfirm) {
      case 'reset':
        return 'This will reset all your preferences to default. Your tasks and journal entries will NOT be deleted.';
      case 'history':
        return 'This will permanently delete ALL your journal entries. This cannot be undone!';
      case 'tasks':
        return 'This will permanently delete ALL your tasks. This cannot be undone!';
      default:
        return 'This action cannot be undone. All your data will be permanently deleted.';
    }
  };

  return (
    <div className="settings-card-glass danger">
      <h3 className="settings-card-title danger-title">Danger Zone</h3>
      <p className="danger-description">These actions are irreversible. Proceed with caution.</p>

      <div className="danger-list">
        {actions.map((action) => (
          <div key={action.id} className="danger-item">
            <div className="danger-item-info">
              <span className="danger-item-icon">{action.icon}</span>
              <div>
                <span className="danger-item-label">{action.label}</span>
                <span className="danger-item-description">{action.description}</span>
              </div>
            </div>
            <button
              className="danger-btn"
              onClick={() => handleAction(action.id)}
            >
              {action.label}
            </button>
          </div>
        ))}
      </div>

      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-dialog">
            <div className="confirm-header">
              <span className="confirm-icon">⚠️</span>
              <h4>Are you sure?</h4>
            </div>
            <p className="confirm-text">{getConfirmMessage()}</p>
            <div className="confirm-actions">
              <button className="confirm-btn cancel" onClick={cancelAction}>
                Cancel
              </button>
              <button className="confirm-btn danger" onClick={confirmAction}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DangerZone;