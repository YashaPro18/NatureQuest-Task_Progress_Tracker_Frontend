// src/components/MobileBottomNav/MobileBottomNav.jsx
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCheckSquare,
  FiBook,
  FiUser,
  FiSettings,
} from "react-icons/fi";
import "./MobileBottomNav.css";

const NAV_ITEMS = [
  { to: "/",               icon: FiHome,        label: "Home"          },
  { to: "/tasks",          icon: FiCheckSquare, label: "Tasks"         },
  { to: "/journal",        icon: FiBook,        label: "Journal"       },
  { to: "/profile",        icon: FiUser,        label: "Profile"       },
  { to: "/settings",       icon: FiSettings,    label: "Settings"      },
];

function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav">
      {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `bottom-nav-item${isActive ? " active" : ""}`
          }
        >
          <Icon className="bottom-nav-icon" />
          <span className="bottom-nav-label">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default MobileBottomNav;