import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BookOpen, Calendar, Award, CheckCircle, Bell, ArrowRight, Info } from 'lucide-react';
import { dashboardService } from '../../services/dashboard.service';

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    enrolledBatches: 0,
    ongoingCourses: 0,
    certifications: 0,
    completedClasses: 0,
    enrollments: [],
    announcements: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardService.getStats();
        if (response?.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Failed to load student stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statsConfig = [
    { name: 'Enrolled Batches', value: stats.enrolledBatches, icon: Calendar, color: 'text-blue-400 bg-blue-500/10' },
    { name: 'Ongoing Courses', value: stats.ongoingCourses, icon: BookOpen, color: 'text-indigo-400 bg-indigo-500/10' },
    { name: 'Certifications', value: stats.certifications, icon: Award, color: 'text-pink-400 bg-pink-500/10' },
    { name: 'Completed Classes', value: stats.completedClasses, icon: CheckCircle, color: 'text-emerald-400 bg-emerald-500/10' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Find first active enrollment/batch
  const activeEnrollment = stats.enrollments?.find((e) => e.batch && e.enrollmentStatus === 'Enrolled') || stats.enrollments?.[0];

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
            Here's a snapshot of your training progress. Keep learning and upgrading your skills! 
            {stats.enrolledBatches > 0 
              ? ` You are enrolled in ${stats.enrolledBatches} active training batch(es).` 
              : ' You are not enrolled in any training batches yet.'}
          </p>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsConfig.map((stat) => {
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
          {activeEnrollment && activeEnrollment.batch ? (
            <div className="rounded-2xl glass-panel p-6 border border-dark-border space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-dark-border">
                <div>
                  <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {activeEnrollment.course?.category || 'Training Program'}
                  </span>
                  <h4 className="text-lg font-bold text-white mt-2">
                    {activeEnrollment.course?.title} ({activeEnrollment.batch?.name})
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar size={14} />
                  <span>{activeEnrollment.batch?.scheduleTime || 'Schedule pending'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm font-light">
                <div>
                  <p className="text-xs text-gray-500 font-normal">Trainer</p>
                  <p className="text-white mt-1 font-medium">
                    {activeEnrollment.batch?.trainer 
                      ? `${activeEnrollment.batch.trainer.firstName} ${activeEnrollment.batch.trainer.lastName}` 
                      : 'Assigned Trainer'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-normal">Start Date</p>
                  <p className="text-white mt-1">
                    {activeEnrollment.batch?.startDate 
                      ? new Date(activeEnrollment.batch.startDate).toLocaleDateString() 
                      : 'Pending'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-normal">Status</p>
                  <p className="text-emerald-400 mt-1 font-medium">
                    {activeEnrollment.enrollmentStatus}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Attendance / Score Progress</span>
                  <span className="text-white font-medium">{activeEnrollment.attendancePercentage || 0}% Attendance</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full" 
                    style={{ width: `${activeEnrollment.attendancePercentage || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl glass-panel p-8 border border-dark-border text-center flex flex-col items-center justify-center space-y-3">
              <div className="p-3 rounded-full bg-white/5 text-gray-400">
                <Info size={24} />
              </div>
              <h4 className="text-md font-semibold text-white">No active enrollments</h4>
              <p className="text-xs text-gray-400 max-w-sm">
                You are not currently active in any training batches. Contact your coordinator or apply for courses to get started.
              </p>
            </div>
          )}
        </div>

        {/* Right Column - Announcements */}
        <div className="space-y-4">
          <h3 className="text-md font-semibold text-gray-300 px-1">Announcements</h3>
          <div className="rounded-2xl glass-panel p-6 border border-dark-border space-y-4">
            {stats.announcements && stats.announcements.length > 0 ? (
              stats.announcements.map((ann, idx) => (
                <div key={ann._id || idx} className="flex gap-3 pb-3 border-b border-dark-border last:border-0 last:pb-0">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 h-9 w-9 shrink-0 flex items-center justify-center">
                    <Bell size={16} />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-semibold text-gray-200">{ann.title}</h5>
                    <p className="text-[10px] text-gray-400 font-light leading-normal">{ann.body}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-xs text-gray-500 font-light">No new announcements at this time.</p>
              </div>
            )}

            {stats.announcements && stats.announcements.length > 0 && (
              <button className="w-full flex items-center justify-center gap-2 mt-4 text-xs font-medium text-primary-400 hover:text-primary-300 transition-colors">
                <span>View All Alerts</span>
                <ArrowRight size={12} />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
