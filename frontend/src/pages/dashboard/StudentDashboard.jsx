import { useSelector } from 'react-redux';
import { BookOpen, Calendar, Award, CheckCircle, Bell, ArrowRight } from 'lucide-react';

const StudentDashboard = () => {
  const { user, profile } = useSelector((state) => state.auth);

  const stats = [
    { name: 'Enrolled Batches', value: '1', icon: Calendar, color: 'text-blue-400 bg-blue-500/10' },
    { name: 'Ongoing Courses', value: '2', icon: BookOpen, color: 'text-indigo-400 bg-indigo-500/10' },
    { name: 'Certifications', value: profile?.certifications?.length || '0', icon: Award, color: 'text-pink-400 bg-pink-500/10' },
    { name: 'Completed Classes', value: '12', icon: CheckCircle, color: 'text-emerald-400 bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-8 md:p-10 border border-dark-border bg-gradient-to-r from-primary-900/40 via-indigo-950/20 to-transparent">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl"></div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest">
            Welcome back
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Hello, {user?.firstName}!
          </h2>
          <p className="text-gray-300 text-sm font-light leading-relaxed">
            Here's a snapshot of your training progress. Keep learning and upgrading your skills! You have 2 classes scheduled for this week.
          </p>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="p-6 rounded-2xl glass-panel glass-panel-hover border border-dark-border flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-[10px] md:text-xs font-semibold text-gray-400 tracking-wider uppercase">{stat.name}</p>
                <p className="text-xl md:text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Batches and Announcements Row */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column - Active Batches */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-md font-semibold text-gray-300 px-1">My Active Batches</h3>
          <div className="rounded-2xl glass-panel p-6 border border-dark-border space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-dark-border">
              <div>
                <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Full Stack Web Development
                </span>
                <h4 className="text-lg font-bold text-white mt-2">Batch MERN-04</h4>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Calendar size={14} />
                <span>Mon, Wed, Fri (09:00 AM - 11:00 AM)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm font-light">
              <div>
                <p className="text-xs text-gray-500 font-normal">Trainer</p>
                <p className="text-white mt-1 font-medium">Alex Mercer</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-normal">Start Date</p>
                <p className="text-white mt-1">July 1, 2026</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-normal">Status</p>
                <p className="text-emerald-400 mt-1 font-medium">Ongoing</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Class Progress</span>
                <span className="text-white font-medium">35% Completed</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Announcements */}
        <div className="space-y-4">
          <h3 className="text-md font-semibold text-gray-300 px-1">Announcements</h3>
          <div className="rounded-2xl glass-panel p-6 border border-dark-border space-y-4">
            
            <div className="flex gap-3 pb-3 border-b border-dark-border">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 h-9 w-9 shrink-0 flex items-center justify-center">
                <Bell size={16} />
              </div>
              <div className="space-y-1">
                <h5 className="text-xs font-semibold text-gray-200">System Upgrade Scheduled</h5>
                <p className="text-[10px] text-gray-400 font-light">Ecosystem portal will be offline for maintenance on Saturday from 2 AM to 4 AM EST.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 h-9 w-9 shrink-0 flex items-center justify-center">
                <Award size={16} />
              </div>
              <div className="space-y-1">
                <h5 className="text-xs font-semibold text-gray-200">New React Assessment Live</h5>
                <p className="text-[10px] text-gray-400 font-light">The mid-module assessment for React hooks is now available. Submit before Monday.</p>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 mt-4 text-xs font-medium text-primary-400 hover:text-primary-300 transition-colors">
              <span>View All Alerts</span>
              <ArrowRight size={12} />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
