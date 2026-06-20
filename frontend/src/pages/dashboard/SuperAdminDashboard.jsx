import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Users, 
  GraduationCap, 
  Layers, 
  Briefcase, 
  ArrowUpRight, 
  TrendingUp,
  Info
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { dashboardService } from '../../services/dashboard.service';

const SuperAdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeTrainers: 0,
    activeBatches: 0,
    totalBatches: 0,
    partnerAgencies: 0,
    latestBatches: [],
    trends: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardService.getStats();
        if (response?.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Failed to load admin stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statsConfig = [
    { name: 'Total Students', value: stats.totalStudents, change: '+12%', icon: GraduationCap, color: 'text-indigo-400 bg-indigo-500/10' },
    { name: 'Active Trainers', value: stats.activeTrainers, change: '+4%', icon: Users, color: 'text-pink-400 bg-pink-500/10' },
    { name: 'Active Batches', value: stats.activeBatches, change: '+8%', icon: Layers, color: 'text-blue-400 bg-blue-500/10' },
    { name: 'Partner Agencies', value: stats.partnerAgencies, change: '0%', icon: Briefcase, color: 'text-emerald-400 bg-emerald-500/10' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Message */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">System Administration Dashboard</h2>
          <p className="text-xs text-gray-400 font-light mt-1">Logged in as {user?.fullName} ({user?.role})</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium text-xs transition-all duration-200">
          <span>Create New Batch</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsConfig.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="p-6 rounded-2xl glass-panel glass-panel-hover border border-dark-border flex flex-col justify-between h-36">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                  {stat.change !== '0%' && <TrendingUp size={10} />}
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase">{stat.name}</p>
                <p className="text-xl md:text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & System Batches Row */}
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Area Chart */}
        <div className="lg:col-span-2 rounded-2xl glass-panel p-6 border border-dark-border space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-dark-border">
            <h3 className="text-sm font-semibold text-gray-300">Enrollments Analytics (Yearly)</h3>
            <span className="text-xs text-gray-400">Total: {stats.totalStudents} Registered Learners</span>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEnrollments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: 10 }} />
                <YAxis stroke="#6b7280" style={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#0f0e26', border: '1px solid rgba(255,255,255,0.1)' }} labelStyle={{ color: '#fff' }} />
                <Area type="monotone" dataKey="enrollments" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorEnrollments)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Active System Batches */}
        <div className="rounded-2xl glass-panel p-6 border border-dark-border space-y-4">
          <h3 className="text-sm font-semibold text-gray-300 pb-2 border-b border-dark-border">Latest Batches</h3>
          <div className="space-y-4">
            {stats.latestBatches && stats.latestBatches.length > 0 ? (
              stats.latestBatches.map((batch, index) => (
                <div key={batch._id || index} className="flex justify-between items-center pb-2 border-b border-dark-border/50 last:border-0 last:pb-0">
                  <div>
                    <p className="text-xs font-semibold text-gray-200">
                      {batch.course?.title || batch.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Trainer: {batch.trainer ? `${batch.trainer.firstName} ${batch.trainer.lastName}` : 'Unassigned'} • {batch.students?.length || 0} Students
                    </p>
                  </div>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    batch.status === 'Ongoing' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : batch.status === 'Upcoming' 
                      ? 'bg-blue-500/10 text-blue-400' 
                      : 'bg-white/10 text-gray-400'
                  }`}>
                    {batch.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-10 flex flex-col items-center justify-center space-y-2">
                <Info size={20} className="text-gray-500" />
                <p className="text-xs text-gray-500 font-light">No batches registered in the system.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminDashboard;
