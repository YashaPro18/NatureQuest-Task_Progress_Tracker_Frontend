// src/components/Sidebar/Sidebar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiMenu,
  FiHome,
  FiCheckSquare,
  FiList,
  FiBook,
  FiUser,
  FiSettings,
} from "react-icons/fi";
import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/",               icon: FiHome,        label: "Overview"       },
  { to: "/tasks",          icon: FiCheckSquare, label: "Task Tracker"   },
  { to: "/tasks/manage",   icon: FiList,        label: "Task Manager"   },
  { to: "/journal",        icon: FiBook,        label: "Nature Journal" },
  { to: "/profile",        icon: FiUser,        label: "Profile"        },
  { to: "/settings",       icon: FiSettings,    label: "Settings"       },
];

function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`sidebar-overlay${expanded ? " visible" : ""}`}
        onClick={() => setExpanded(false)}
      />
      
      <aside className={`sidebar${expanded ? " expanded" : ""}`}>
        <button
          className="toggle-btn"
          onClick={() => setExpanded(!expanded)}
          aria-label="Toggle sidebar"
          aria-expanded={expanded}
        >
          <FiMenu />
        </button>

        <nav className="sidebar-menu">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `menu-item${isActive ? " active" : ""}`
              }
              onClick={() => {
                // Close sidebar on mobile when a link is clicked
                if (window.innerWidth <= 768) {
                  setExpanded(false);
                }
              }}
            >
              <span className="menu-icon-wrap">
                <Icon className="menu-icon" />
              </span>
              <span className="menu-text">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="eco-badge">
            <div className="eco-leaf">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2 22c0 0 5-3 9-9s7-12 11-11c0 4-3 10-9 13S2 22 2 22Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {expanded && (
              <div className="eco-text">
                <span className="eco-label">Carbon saved</span>
                <span className="eco-value">14.2 kg</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;