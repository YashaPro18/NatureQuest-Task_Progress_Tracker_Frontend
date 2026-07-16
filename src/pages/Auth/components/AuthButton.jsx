// src/pages/Auth/components/AuthButton.jsx
import React from 'react';
import './AuthButton.css';

function AuthButton({ children, type = 'button', loading = false, ...props }) {
  return (
    <button type={type} className="auth-btn" disabled={loading} {...props}>
      {loading ? (
        <span className="auth-btn-loader">🌱</span>
      ) : (
        children
      )}
    </button>
  );
}

export default AuthButton;