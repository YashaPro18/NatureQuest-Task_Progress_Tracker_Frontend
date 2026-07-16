// src/pages/Auth/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthCard from './components/AuthCard';
import AuthInput from './components/AuthInput';
import AuthButton from './components/AuthButton';
import SocialAuth from './components/SocialAuth';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-bg-blob auth-bg-blob-1" />
        <div className="auth-bg-blob auth-bg-blob-2" />
        <div className="auth-bg-blob auth-bg-blob-3" />
      </div>
      <AuthCard
        title="Create Account"
        subtitle="Start your growth journey today"
        icon="🌱"
      >
        <form onSubmit={handleSubmit}>
          <AuthInput
            label="Full Name"
            type="text"
            placeholder="Yash"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon="👤"
          />
          <AuthInput
            label="Email"
            type="email"
            placeholder="you@naturequest.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon="📧"
          />
          <AuthInput
            label="Password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon="🔒"
          />
          <AuthInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon="🔐"
          />
          {error && <div className="auth-error">{error}</div>}
          <AuthButton type="submit" loading={loading}>
            Create Account
          </AuthButton>
        </form>
        <SocialAuth />
        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </AuthCard>
    </div>
  );
}

export default Register;