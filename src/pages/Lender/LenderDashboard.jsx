import React, { useState } from "react";
import { Coins, Briefcase, Users, ArrowUpRight, TrendingUp, Clock, Activity, FileText, CheckCircle2, ShieldCheck, Zap, BarChart2, Filter } from "lucide-react";

export default function LenderDashboard() {
  const [chartTimeframe, setChartTimeframe] = useState("6M");
  const [activeDataIndex, setActiveDataIndex] = useState(null);

  const stats = [
    {
      label: "Total Funded Loans",
      value: "$1,245,000",
      change: "+12.4%",
      changeType: "up",
      icon: Coins,
      color: "text-emerald-400",
      glowBg: "bg-emerald-500/10 border-emerald-500/20",
      gradient: "from-emerald-500/20 to-teal-500/5",
      description: "Lifetime funding volume"
    },
    {
      label: "Active Offers",
      value: "8 Offers",
      change: "4 Pending",
      changeType: "neutral",
      icon: Briefcase,
      color: "text-blue-400",
      glowBg: "bg-blue-500/10 border-blue-500/20",
      gradient: "from-blue-500/20 to-indigo-500/5",
      description: "Awaiting borrower response"
    },
    {
      label: "New Qualified Leads",
      value: "5 Leads",
      change: "+2 today",
      changeType: "up",
      icon: Users,
      color: "text-indigo-400",
      glowBg: "bg-indigo-500/10 border-indigo-500/20",
      gradient: "from-indigo-500/20 to-purple-500/5",
      description: "AI-matched anonymous profiles"
    }
  ];

  // Graph Data points
  const chartData = [
    { month: "Jan", volume: 110000, offers: 4 },
    { month: "Feb", volume: 145000, offers: 6 },
    { month: "Mar", volume: 180000, offers: 7 },
    { month: "Apr", volume: 160000, offers: 5 },
    { month: "May", volume: 240000, offers: 9 },
    { month: "Jun", volume: 295000, offers: 12 },
    { month: "Jul", volume: 315000, offers: 14 }
  ];

  const quickActivities = [
    {
      id: 1,
      action: "New Lead Matched",
      details: "Lead #8843 matching your lending rules",
      time: "10 mins ago",
      type: "lead",
      icon: Zap,
      iconColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
    },
    {
      id: 2,
      action: "Offer Submitted",
      details: "Sent $45,000 offer @ 6.5% to Lead #8210",
      time: "2 hours ago",
      type: "offer",
      icon: Briefcase,
      iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      id: 3,
      action: "Offer Accepted",
      details: "Lead #7988 accepted your $120,000 funding offer!",
      time: "1 day ago",
      type: "accept",
      icon: CheckCircle2,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      id: 4,
      action: "Broker Activity",
      details: "Assigned OAL Agent updated documentation status for Lead #8210",
      time: "2 days ago",
      type: "chat",
      icon: ShieldCheck,
      iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    }
  ];

  // SVG Chart path calculation
  const maxVol = 350000;
  const svgWidth = 600;
  const svgHeight = 200;
  const points = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1)) * svgWidth;
    const y = svgHeight - (d.volume / maxVol) * (svgHeight - 20);
    return { x, y, ...d };
  });

  // Create smooth bezier curve path string
  const lineD = points.reduce((acc, point, i, a) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = a[i - 1];
    const cx = (prev.x + point.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${point.y} ${point.x},${point.y}`;
  }, "");

  const areaD = `${lineD} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`;

  return (
    <div className="space-y-8 animate-fade-in text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Lender Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">High-level metrics of your active pipeline and portfolio health.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300 bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 px-4 py-2 rounded-xl shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-500/50"></span>
          Portal Status: <span className="text-emerald-400 font-bold">Active & Approved</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`relative overflow-hidden bg-gradient-to-br ${stat.gradient} bg-slate-900/90 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300 shadow-xl group`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                <h3 className="text-3xl font-black text-white group-hover:scale-105 transition-transform duration-300 origin-left">
                  {stat.value}
                </h3>
              </div>
              <div className={`p-3.5 rounded-2xl border ${stat.glowBg} ${stat.color} shadow-lg backdrop-blur-sm`}>
                <stat.icon size={24} />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">{stat.description}</span>
              <span className="font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN GRAPH & HEALTH SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphical Performance Area Chart (2 Columns) */}
        <div className="lg:col-span-2 bg-slate-900/90 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
                  <TrendingUp size={18} />
                </div>
                <h2 className="text-lg font-bold text-white">Loan Volume Growth & Yield Graph</h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">Monthly total capital deployment trend ($USD)</p>
            </div>

            {/* Timeframe Filter Buttons */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
              {["1M", "3M", "6M", "YTD", "ALL"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setChartTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    chartTimeframe === tf
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Smooth Glowing Area Graph */}
          <div className="relative pt-4 pb-2">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-56 overflow-visible">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 50, 100, 150, 200].map((yVal, i) => (
                <line key={i} x1="0" y1={yVal} x2={svgWidth} y2={yVal} stroke="#1e293b" strokeDasharray="3 3" strokeOpacity="0.6" />
              ))}

              {/* Gradient Area Fill */}
              <path d={areaD} fill="url(#chartGradient)" />

              {/* Smooth Spline Glowing Line */}
              <path d={lineD} fill="none" stroke="url(#lineGradient)" strokeWidth="3.5" strokeLinecap="round" />

              {/* Glowing Data Circles */}
              {points.map((pt, i) => (
                <g key={i} className="cursor-pointer group" onMouseEnter={() => setActiveDataIndex(i)} onMouseLeave={() => setActiveDataIndex(null)}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={activeDataIndex === i ? "7" : "4.5"}
                    fill="#0f172a"
                    stroke={activeDataIndex === i ? "#34d399" : "#818cf8"}
                    strokeWidth="3"
                    className="transition-all duration-200"
                  />
                  {activeDataIndex === i && (
                    <g>
                      <rect
                        x={Math.max(10, Math.min(svgWidth - 90, pt.x - 45))}
                        y={Math.max(10, pt.y - 45)}
                        width="90"
                        height="32"
                        rx="8"
                        fill="#0f172a"
                        stroke="#6366f1"
                        strokeWidth="1"
                      />
                      <text
                        x={Math.max(10, Math.min(svgWidth - 90, pt.x - 45)) + 45}
                        y={Math.max(10, pt.y - 45) + 20}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        ${(pt.volume / 1000).toFixed(0)}k Vol
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>

            {/* X-Axis Labels */}
            <div className="flex justify-between text-xs font-semibold text-slate-400 mt-2 px-1 border-t border-slate-800/60 pt-3">
              {chartData.map((d, i) => (
                <span key={i} className={`transition-colors ${activeDataIndex === i ? "text-indigo-400 font-bold" : ""}`}>
                  {d.month}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Health Summary (1 Column) */}
        <div className="lg:col-span-1 bg-slate-900/90 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <div className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
                  <Activity size={18} />
                </div>
                Lending Health
              </h2>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Optimal
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-6">Real-time status check based on active parameters</p>

            <div className="space-y-4">
              {/* Stat 1 */}
              <div className="bg-slate-950/50 border border-slate-800/60 p-3.5 rounded-xl">
                <div className="flex justify-between text-xs mb-2 font-semibold">
                  <span className="text-slate-300">Offer Acceptance Rate</span>
                  <span className="text-indigo-400">62%</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full" style={{ width: "62%" }}></div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-slate-950/50 border border-slate-800/60 p-3.5 rounded-xl">
                <div className="flex justify-between text-xs mb-2 font-semibold">
                  <span className="text-slate-300">Criteria Match Rate</span>
                  <span className="text-emerald-400">88%</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-300 h-full rounded-full" style={{ width: "88%" }}></div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-slate-950/50 border border-slate-800/60 p-3.5 rounded-xl">
                <div className="flex justify-between text-xs mb-2 font-semibold">
                  <span className="text-slate-300">Average Processing Time</span>
                  <span className="text-amber-400">4.2 Days</span>
                </div>
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full rounded-full" style={{ width: "42%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock size={14} className="text-slate-500" />
              Criteria Auto-match: <span className="text-slate-200">ON</span>
            </span>
            <button className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">Edit Rules</button>
          </div>
        </div>
      </div>

      {/* Recent Pipeline Activity Graphical Cards */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <div className="p-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">
              <FileText size={18} />
            </div>
            Recent Pipeline Activity
          </h2>
          <button className="text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 px-3 py-1.5 rounded-lg transition-colors">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActivities.map((act) => {
            const IconComponent = act.icon;
            return (
              <div
                key={act.id}
                className="bg-slate-950/40 hover:bg-slate-800/40 border border-slate-800/40 hover:border-slate-700/60 p-4 rounded-xl flex items-center justify-between gap-4 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl border ${act.iconColor} shrink-0`}>
                    <IconComponent size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors">{act.action}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{act.details}</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-900/80 border border-slate-800 px-2.5 py-1 rounded-lg whitespace-nowrap">
                  {act.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
