import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Auth Components
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Dashboard Views
import StudentDashboard from '../pages/dashboard/StudentDashboard';
import SuperAdminDashboard from '../pages/dashboard/SuperAdminDashboard';

// Dynamic Pages
import Courses from '../pages/courses/Courses';
import Students from '../pages/students/Students';
import Settings from '../pages/settings/Settings';

// Layouts & Guard Components
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import NotFound from '../pages/NotFound';

// Dynamic router that renders the correct dashboard based on user role
const DynamicDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  
  if (user?.role === 'SuperAdmin' || user?.role === 'Admin') {
    return <SuperAdminDashboard />;
  }
  return <StudentDashboard />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public Auth Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Private Authenticated Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DynamicDashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/students" element={<Students />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Fallback 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
