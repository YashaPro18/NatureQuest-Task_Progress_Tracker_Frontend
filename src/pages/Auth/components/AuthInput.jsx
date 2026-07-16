// src/pages/Auth/components/AuthInput.jsx
import React from 'react';
import './AuthInput.css';

function AuthInput({ label, type = 'text', value, onChange, placeholder, icon, required = true, ...props }) {
  return (
    <div className="auth-input-group">
      <label className="auth-input-label">{label}</label>
      <div className="auth-input-wrapper">
        {icon && <span className="auth-input-icon">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`auth-input ${icon ? 'with-icon' : ''}`}
          {...props}
        />
      </div>
    </div>
  );
}

export default AuthInput;