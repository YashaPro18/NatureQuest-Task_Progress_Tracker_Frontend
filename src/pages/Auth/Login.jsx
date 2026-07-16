// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthCard from './components/AuthCard';
import AuthInput from './components/AuthInput';
import AuthButton from './components/AuthButton';
import SocialAuth from './components/SocialAuth';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password); // 👈 must await the async function
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
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
        title="Welcome Back"
        subtitle="Log in to continue your growth journey"
        icon="🌳"
      >
        <form onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon="🔒"
          />
          {error && <div className="auth-error">{error}</div>}
          <div className="auth-options">
            <Link to="/forgot-password" className="auth-forgot-link">
              Forgot password?
            </Link>
          </div>
          <AuthButton type="submit" loading={loading}>
            Log In
          </AuthButton>
        </form>
        <SocialAuth />
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </AuthCard>
    </div>
  );
}

export default Login;