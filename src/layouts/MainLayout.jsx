// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import MobileBottomNav from "../components/MobileBottomNav/MobileBottomNav";
import "./MainLayout.css";

function MainLayout() {
  const { theme } = useTheme();  // 👈 get current theme

  return (
    <div className={`main-layout theme-${theme}`}>  {/* 👈 apply class */}
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="main-page">
          <Outlet />
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}

export default MainLayout;