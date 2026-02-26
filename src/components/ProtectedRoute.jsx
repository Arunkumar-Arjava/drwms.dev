import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const dashboardRoutes = {
      student: '/student',
      faculty: '/faculty',
      dept_admin: '/dept-admin',
      college_admin: '/admin'
    };
    
    return <Navigate to={dashboardRoutes[user.role] || '/dashboard'} replace />;
  }

  return children;
}

export default ProtectedRoute;