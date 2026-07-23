import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, Activity, BarChart2, AlertCircle, FileText, CheckCircle, ChevronRight, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('6M');
  const [selectedTask, setSelectedTask] = useState(null);

  const metrics = [
    { label: "Total Users", value: "2,450", trend: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", path: "/admin/borrowers" },
    { label: "Platform Revenue", value: "$45,200", trend: "+8.5%", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10", path: "/admin/payments" },
    { label: "Active Loans", value: "854", trend: "+5%", icon: Activity, color: "text-purple-500", bg: "bg-purple-500/10", path: "/admin/loan-applications" },
    { label: "Total Volume", value: "$2.4M", trend: "+18%", icon: BarChart2, color: "text-amber-500", bg: "bg-amber-500/10", path: "/admin/reports" },
  ];

  const pendingTasks = [
    { id: 1, title: "KYC Audit Backlog", count: 12, priority: "High", icon: FileText, color: "text-red-500", bg: "bg-red-500/10", path: "/admin/verification" },
    { id: 2, title: "Unapproved Lenders", count: 4, priority: "Medium", icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-500/10", path: "/admin/lenders" },
    { id: 3, title: "System Updates Required", count: 1, priority: "Low", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10", path: "/admin/settings" },
  ];

  // Mock data for charts
  const chartData = {
    '1Y': [
      { name: 'Jan', volume: 4000, revenue: 2400 },
      { name: 'Mar', volume: 3000, revenue: 1398 },
      { name: 'May', volume: 2000, revenue: 9800 },
      { name: 'Jul', volume: 2780, revenue: 3908 },
      { name: 'Sep', volume: 1890, revenue: 4800 },
      { name: 'Nov', volume: 2390, revenue: 3800 },
      { name: 'Dec', volume: 3490, revenue: 4300 },
    ],
    '6M': [
      { name: 'Jul', volume: 2780, revenue: 3908 },
      { name: 'Aug', volume: 3100, revenue: 4100 },
      { name: 'Sep', volume: 1890, revenue: 4800 },
      { name: 'Oct', volume: 2100, revenue: 3500 },
      { name: 'Nov', volume: 2390, revenue: 3800 },
      { name: 'Dec', volume: 3490, revenue: 4300 },
    ],
    '1M': [
      { name: 'Week 1', volume: 500, revenue: 800 },
      { name: 'Week 2', volume: 700, revenue: 950 },
      { name: 'Week 3', volume: 650, revenue: 1100 },
      { name: 'Week 4', volume: 900, revenue: 1450 },
    ]
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-xl">
          <p className="text-slate-300 font-medium mb-2">{label}</p>
          <p className="text-blue-400 text-sm">Volume: ${payload[0].value}</p>
          <p className="text-emerald-400 text-sm">Revenue: ${payload[1].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400 mt-1">Bird's-eye view metrics and actionable system alerts.</p>
        </div>
        <div className="text-sm text-slate-400 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Realtime Monitoring Active
        </div>
      </div>

      {/* Metric Cards - Fully Clickable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div 
            key={index} 
            onClick={() => navigate(metric.path)}
            className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-blue-950/30 transition-all duration-300 group cursor-pointer relative"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{metric.label}</p>
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                  {metric.value}
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 text-blue-400 transition-opacity" />
                </h3>
              </div>
              <div className={`p-3 rounded-lg ${metric.bg} ${metric.color}`}>
                <metric.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-emerald-500 font-medium bg-emerald-500/10 px-2 py-0.5 rounded mr-2">
                {metric.trend}
              </span>
              <span className="text-slate-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Functional Chart */}
        <div className="lg:col-span-2 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Platform Growth & Revenue</h2>
              <p className="text-xs text-slate-400">Hover over points for breakdown</p>
            </div>
            <select 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
            >
              <option value="1Y">This Year</option>
              <option value="6M">Last 6 Months</option>
              <option value="1M">This Month</option>
            </select>
          </div>
          
          <div className="flex-1 w-full h-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData[timeFilter]}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actionable Pending Tasks */}
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Action Required</h2>
            <span className="text-xs font-medium bg-red-500/10 text-red-400 px-2.5 py-1 rounded-full border border-red-500/20">
              {pendingTasks.reduce((acc, task) => acc + task.count, 0)} Items
            </span>
          </div>
          
          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {pendingTasks.map((task) => (
              <div 
                key={task.id} 
                onClick={() => navigate(task.path)}
                className="flex items-center p-3 rounded-lg bg-slate-800/40 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-800/80 transition-all cursor-pointer group"
              >
                <div className={`p-2.5 rounded-lg ${task.bg} ${task.color} mr-3 group-hover:scale-105 transition-transform`}>
                  <task.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors truncate">{task.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Priority: <span className={task.priority === 'High' ? 'text-red-400' : task.priority === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}>{task.priority}</span></p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <span className="bg-slate-950 px-2.5 py-1 rounded text-xs font-bold text-slate-300 border border-slate-800">
                    {task.count}
                  </span>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => navigate('/admin/verification')}
            className="w-full mt-4 py-2.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white text-sm font-semibold rounded-lg transition-all border border-blue-500/30 flex items-center justify-center gap-2 group"
          >
            Go To Verification Center
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
