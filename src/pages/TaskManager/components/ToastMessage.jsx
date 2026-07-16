import React, { useEffect, useState } from 'react';
import './ToastMessage.css';

function ToastMessage({ message, type = 'success' }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const icons = {
    success: '🌱',
    info: '📝',
    warning: '⚠️',
    error: '❌',
  };

  return (
    <div className={`toast-message-glass ${type}`}>
      <span className="toast-icon">{icons[type] || '🌱'}</span>
      <span className="toast-text">{message}</span>
    </div>
  );
}

export default ToastMessage;