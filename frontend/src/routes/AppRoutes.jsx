import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Auth Components
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Dashboard Views
import StudentDashboard from '../pages/dashboard/StudentDashboard';
import SuperAdminDashboard from '../pages/dashboard/SuperAdminDashboard';

// Layouts & Guard Components
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import NotFound from '../pages/NotFound';

// Simple placeholders for missing pages to avoid routing crashes
const CoursesPlaceholder = () => (
  <div className="p-6 glass-panel rounded-2xl border border-dark-border text-center space-y-3">
    <h3 className="text-lg font-bold text-white">Ecosystem Courses Catalog</h3>
    <p className="text-xs text-gray-400 font-light">Browse training programs, syllabus, and module descriptions.</p>
  </div>
);

const StudentsPlaceholder = () => (
  <div className="p-6 glass-panel rounded-2xl border border-dark-border text-center space-y-3">
    <h3 className="text-lg font-bold text-white">Learners Management Panel</h3>
    <p className="text-xs text-gray-400 font-light">Monitor student attendance, assessment submissions, and course completions.</p>
  </div>
);

const SettingsPlaceholder = () => (
  <div className="p-6 glass-panel rounded-2xl border border-dark-border text-center space-y-3">
    <h3 className="text-lg font-bold text-white">Account Settings</h3>
    <p className="text-xs text-gray-400 font-light">Manage your email preferences, security configurations, and profile fields.</p>
  </div>
);

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
          <Route path="/courses" element={<CoursesPlaceholder />} />
          <Route path="/students" element={<StudentsPlaceholder />} />
          <Route path="/settings" element={<SettingsPlaceholder />} />
        </Route>
      </Route>

      {/* Fallback 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
