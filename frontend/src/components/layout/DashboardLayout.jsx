import { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User as UserIcon,
  Bell
} from 'lucide-react';

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['SuperAdmin', 'Admin', 'Student', 'Trainer', 'Coordinator'] },
    { name: 'Courses', path: '/courses', icon: BookOpen, roles: ['SuperAdmin', 'Admin', 'Student', 'Trainer', 'Coordinator'] },
    { name: 'Students', path: '/students', icon: Users, roles: ['SuperAdmin', 'Admin', 'Trainer', 'Coordinator'] },
    { name: 'Settings', path: '/settings', icon: Settings, roles: ['SuperAdmin', 'Admin', 'Student', 'Trainer', 'Coordinator', 'Organization', 'Partner', 'FundingAgency'] },
  ];

  // Filter routes based on user role
  const allowedNavItems = navItems.filter(item => item.roles.includes(user?.role));

  return (
    <div className="min-h-screen flex bg-dark-bg text-gray-100 font-sans">
      {/* Sidebar for Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 lg:static lg:block transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} transition-transform duration-300 ease-in-out glass-panel border-r border-dark-border flex flex-col justify-between`}>
        <div>
          {/* Logo / Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-dark-border">
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-indigo-400 bg-clip-text text-transparent tracking-wide">
              SkillDev Platform
            </span>
            <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 px-4 space-y-2">
            {allowedNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-dark-border">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-8 border-b border-dark-border glass-panel">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-gray-200 capitalize">
              {location.pathname.substring(1) || 'Dashboard'}
            </h1>
          </div>

          {/* User Profile Info */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              <Bell size={18} />
            </button>
            <div className="flex items-center gap-3 pl-3 border-l border-dark-border">
              <div className="hidden md:block text-right">
                <p className="text-xs font-semibold text-gray-200">{user?.fullName}</p>
                <p className="text-[10px] font-medium text-gray-400 capitalize">{user?.role}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-primary-400 font-bold">
                {user?.profilePhotoUrl ? (
                  <img src={user.profilePhotoUrl} alt="avatar" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <UserIcon size={18} />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
