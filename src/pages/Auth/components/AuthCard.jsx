// src/pages/Auth/components/AuthCard.jsx
import React from 'react';
import './AuthCard.css';

function AuthCard({ children, title, subtitle, icon }) {
  return (
    <div className="auth-card-glass">
      {icon && <div className="auth-card-icon">{icon}</div>}
      <h1 className="auth-card-title">{title}</h1>
      {subtitle && <p className="auth-card-subtitle">{subtitle}</p>}
      {children}
    </div>
  );
}

export default AuthCard;