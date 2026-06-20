import { useSelector } from 'react-redux';
import { 
  Users, 
  GraduationCap, 
  Layers, 
  Briefcase, 
  ArrowUpRight, 
  TrendingUp 
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

const data = [
  { name: 'Jan', enrollments: 40 },
  { name: 'Feb', enrollments: 65 },
  { name: 'Mar', enrollments: 120 },
  { name: 'Apr', enrollments: 85 },
  { name: 'May', enrollments: 170 },
  { name: 'Jun', enrollments: 220 },
];

const SuperAdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const stats = [
    { name: 'Total Students', value: '1,280', change: '+12%', icon: GraduationCap, color: 'text-indigo-400 bg-indigo-500/10' },
    { name: 'Active Trainers', value: '48', change: '+4%', icon: Users, color: 'text-pink-400 bg-pink-500/10' },
    { name: 'Active Batches', value: '32', change: '+8%', icon: Layers, color: 'text-blue-400 bg-blue-500/10' },
    { name: 'Partner Agencies', value: '14', change: '0%', icon: Briefcase, color: 'text-emerald-400 bg-emerald-500/10' },
  ];

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
        {stats.map((stat) => {
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
            <span className="text-xs text-gray-400">Total: 650 Learners</span>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold text-gray-200">MERN Stack Web Dev</p>
                <p className="text-[10px] text-gray-400">Trainer: Alex Mercer • 24 Students</p>
              </div>
              <span className="text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Ongoing
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold text-gray-200">Cybersecurity Essentials</p>
                <p className="text-[10px] text-gray-400">Trainer: Sarah Conner • 18 Students</p>
              </div>
              <span className="text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Ongoing
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold text-gray-200">Data Science Fundamentals</p>
                <p className="text-[10px] text-gray-400">Trainer: James Cole • 30 Students</p>
              </div>
              <span className="text-[9px] font-semibold bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Upcoming
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminDashboard;
