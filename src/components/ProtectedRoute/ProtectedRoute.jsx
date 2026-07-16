// src/components/ProtectedRoute/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// import './ProtectedRoute.css'; // optional, but we'll use the styles from index.css

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    // Return a clean loading spinner – NO text
    return (
      <div className="loading-screen">
        <div className="loading-spinner">🌱</div>
        {/* No paragraph with "Loading..." */}
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;