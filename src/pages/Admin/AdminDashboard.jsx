import React from 'react';
import { Users, DollarSign, Activity, BarChart2, AlertCircle, FileText, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const metrics = [
    { label: "Total Users", value: "2,450", trend: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Platform Revenue", value: "$45,200", trend: "+8.5%", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Active Loans", value: "854", trend: "+5%", icon: Activity, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Total Volume", value: "$2.4M", trend: "+18%", icon: BarChart2, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  const pendingTasks = [
    { title: "KYC Audit Backlog", count: 12, priority: "High", icon: FileText, color: "text-red-500" },
    { title: "Unapproved Lenders", count: 4, priority: "Medium", icon: AlertCircle, color: "text-amber-500" },
    { title: "System Updates", count: 1, priority: "Low", icon: CheckCircle, color: "text-emerald-500" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400 mt-1">Bird's-eye view of platform metrics and pending tasks.</p>
        </div>
        <div className="text-sm text-slate-400 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/50">
          Last updated: Just now
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div 
            key={index} 
            className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all duration-300 group"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{metric.label}</p>
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{metric.value}</h3>
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
        {/* Placeholder Chart Section */}
        <div className="lg:col-span-2 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Platform Growth</h2>
            <select className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>This Year</option>
              <option>Last 6 Months</option>
              <option>This Month</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 px-2 relative group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/20 backdrop-blur-[1px] rounded-lg">
              <p className="text-slate-300 text-sm bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700">Interactive Chart View</p>
            </div>
            {/* Simple mock chart bars */}
            {[40, 60, 45, 80, 55, 90, 75, 100, 85, 110, 95, 120].map((height, i) => (
              <div key={i} className="w-full bg-blue-500/20 rounded-t-md hover:bg-blue-500/40 transition-colors relative group/bar" style={{ height: `${height}%` }}>
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 bg-slate-800 text-white text-xs px-2 py-1 rounded transition-opacity">
                    {height}k
                 </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-500 px-2">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        {/* Pending Tasks Section */}
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Pending Tasks</h2>
            <span className="text-xs font-medium bg-red-500/10 text-red-500 px-2 py-1 rounded-full">
              {pendingTasks.reduce((acc, task) => acc + task.count, 0)} Total
            </span>
          </div>
          
          <div className="space-y-4">
            {pendingTasks.map((task, index) => (
              <div key={index} className="flex items-start p-3 rounded-lg bg-slate-800/30 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group">
                <div className={`mt-0.5 ${task.color}`}>
                  <task.icon size={18} />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{task.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Priority: {task.priority}</p>
                </div>
                <div className="bg-slate-800 px-2.5 py-0.5 rounded text-sm font-semibold text-slate-300">
                  {task.count}
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors border border-slate-700">
            View All Tasks
          </button>
        </div>
      </div>
    </div>
  );
}
