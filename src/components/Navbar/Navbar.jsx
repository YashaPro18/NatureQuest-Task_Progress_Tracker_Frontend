// src/components/Navbar/Navbar.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      {/* Mobile-only menu button — opens the Sidebar drawer. Hidden on
          desktop via CSS, since Sidebar's own toggle handles that there. */}
      <button
        className="navbar-menu-btn"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
        </svg>
      </button>

      <div className="navbar-left">
        <div className="project-badge">
          <span className="badge-initials">TG</span>
          <div className="badge-pulse" />
        </div>
        <div className="project-info">
          <h2 className="project-title">Environmental Growth</h2>
          <p className="project-subtitle">
            <span className="status-dot" />
            Impact Dashboard
          </p>
        </div>
      </div>

      <div className="navbar-center">
        <div className="search-wrapper">
          <svg className="search-icon" viewBox="0 0 20 20" fill="none">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search tasks, habits, goals..."
            className="search-box"
          />
          <span className="search-shortcut">⌘K</span>
        </div>
      </div>

      <div className="navbar-right">
        <button className="notif-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="notif-badge">3</span>
        </button>
        <div className="divider" />
        <button className="profile-btn" onClick={handleProfileClick}>
          <div className="profile-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="profile-text">
            <span className="profile-name">{user?.name || "Guest"}</span>
            <span className="profile-role">Level {user?.level || 0}</span>
          </div>
          <svg className="chevron" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Navbar;