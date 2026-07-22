// src/layouts/MainLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import MobileBottomNav from "../components/MobileBottomNav/MobileBottomNav";
import "./MainLayout.css";

function MainLayout() {
  const { theme } = useTheme();

  // Lifted out of Sidebar so Navbar's mobile menu button can open/close
  // it too — previously the only toggle lived inside Sidebar itself,
  // which sits off-canvas by default on mobile, so there was no way to
  // open it at all on a phone.
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`main-layout theme-${theme}`}>
      <Sidebar expanded={sidebarOpen} setExpanded={setSidebarOpen} />
      <div className="main-content">
        <Navbar onMenuClick={() => setSidebarOpen((v) => !v)} />
        <main className="main-page">
          <Outlet />
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

export default MainLayout;