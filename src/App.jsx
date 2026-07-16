// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import TaskTracker from './pages/TaskTracker/TaskTracker';
import TaskManager from './pages/TaskManager/TaskManager';
import NatureJournal from './pages/NatureJournal/NatureJournal';
import JournalDetails from './pages/JournalDetails/JournalDetails';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <ThemeProvider> 
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected routes */}
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <TaskTracker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks/manage"
              element={
                <ProtectedRoute>
                  <TaskManager />
                </ProtectedRoute>
              }
            />
            {/* 👇 Replace old history with NatureJournal */}
            <Route
              path="/journal"
              element={
                <ProtectedRoute>
                  <NatureJournal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/journal/:id"
              element={
                <ProtectedRoute>
                  <JournalDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
        </ThemeProvider>
      
    </BrowserRouter>
  );
}

export default App;