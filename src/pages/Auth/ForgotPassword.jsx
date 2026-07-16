// src/pages/Auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from './components/AuthCard';
import AuthInput from './components/AuthInput';
import AuthButton from './components/AuthButton';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSent(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
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
        title="Reset Password"
        subtitle={sent ? "Check your email for the reset link" : "Enter your email to receive a reset link"}
        icon={sent ? "📨" : "🔑"}
      >
        {sent ? (
          <>
            <div className="auth-success">
              <p>We've sent a password reset link to <strong>{email}</strong>.</p>
              <p className="auth-success-sub">Please check your inbox and spam folder.</p>
            </div>
            <Link to="/login" className="auth-back-to-login">Back to Log In</Link>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <AuthInput
              label="Email"
              type="email"
              placeholder="you@naturequest.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon="📧"
            />
            {error && <div className="auth-error">{error}</div>}
            <AuthButton type="submit" loading={loading}>
              Send Reset Link
            </AuthButton>
            <p className="auth-switch">
              Remember your password? <Link to="/login">Log in</Link>
            </p>
          </form>
        )}
      </AuthCard>
    </div>
  );
}

export default ForgotPassword;