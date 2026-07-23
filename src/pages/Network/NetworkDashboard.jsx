import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Home, Compass, Zap, ShieldCheck, TrendingUp, Users, DollarSign, Clock, 
  ArrowUpRight, Activity, Filter, Eye, MessageSquare, AlertCircle, ArrowRight, Layers 
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function NetworkDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");

  // Mock Marketplace Activity Data
  const activityTrend = [
    { day: "Mon", volume: 12.4, requests: 18, bids: 42 },
    { day: "Tue", volume: 15.8, requests: 24, bids: 56 },
    { day: "Wed", volume: 19.2, requests: 31, bids: 78 },
    { day: "Thu", volume: 22.5, requests: 28, bids: 64 },
    { day: "Fri", volume: 28.1, requests: 36, bids: 89 },
    { day: "Sat", volume: 32.4, requests: 29, bids: 71 },
    { day: "Sun", volume: 38.0, requests: 42, bids: 104 },
  ];

  const recentMarketplaceStream = [
    { id: "APP-9081", borrower: "TechVentures India Pvt Ltd", amount: "₹45,00,000", score: "880 (A+)", status: "FRESH_GREEN", statusText: "New Application Live", bids: 4, timestamp: "2 mins ago" },
    { id: "APP-9079", borrower: "Verma Retail Chains", amount: "₹18,50,000", score: "820 (A)", status: "ACTIVE_BLUE", statusText: "3 Bids Placed", bids: 3, timestamp: "8 mins ago" },
    { id: "APP-9074", borrower: "Sharma Logistics & Freight", amount: "₹60,00,000", score: "910 (A+)", status: "HIGH_PURPLE", statusText: "High Yield Lead", bids: 7, timestamp: "15 mins ago" },
    { id: "APP-9070", borrower: "Apollo Pharma Distributors", amount: "₹25,00,000", score: "790 (B+)", status: "UNDERWRITING", statusText: "Escrow Pending", bids: 2, timestamp: "24 mins ago" }
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Shared Marketplace Health: Optimal
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">Network Panel Marketplace Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">High-level real-time snapshot shared between Institutional Lenders & OAL Representatives.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/network/live-stream"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-900/30 transition-all flex items-center gap-1.5"
          >
            <Compass size={14} />
            <span>Open Live Stream Feed</span>
          </Link>
          <Link
            to="/network/communication"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <MessageSquare size={14} />
            <span>LetsWork™ Chat Box</span>
          </Link>
        </div>
      </div>

      {/* 4 Core Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 relative overflow-hidden group">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider">Active Loan Requests</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Layers size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-100 font-mono">148 Applications</p>
          <div className="flex items-center text-[11px] text-emerald-400 font-medium">
            <TrendingUp size={12} className="mr-1" />
            <span>+14.2% from last week</span>
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 relative overflow-hidden group">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider">Total Funded Volume</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-100 font-mono">₹148.5 Crore</p>
          <div className="flex items-center text-[11px] text-emerald-400 font-medium">
            <TrendingUp size={12} className="mr-1" />
            <span>+18.5% MoM Growth</span>
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 relative overflow-hidden group">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider">Active Bids Placed</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Zap size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-100 font-mono">342 Bids Live</p>
          <div className="flex items-center text-[11px] text-purple-400 font-medium">
            <Activity size={12} className="mr-1" />
            <span>Avg 4.2 Bids / Loan</span>
          </div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 relative overflow-hidden group">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span className="font-semibold uppercase tracking-wider">Avg Funding Speed</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock size={18} />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-100 font-mono">1.4 Days</p>
          <div className="flex items-center text-[11px] text-emerald-400 font-medium">
            <ShieldCheck size={12} className="mr-1" />
            <span>Fast-Track Escrow Verified</span>
          </div>
        </div>
      </div>

      {/* Main Charts & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Real-Time Marketplace Activity Chart */}
        <div className="lg:col-span-8 p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-slate-100">Marketplace Funding & Bid Velocity</h2>
              <p className="text-xs text-slate-400">Daily volume trends and incoming loan bid traffic.</p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {["7d", "30d", "90d"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTimeframe(t)}
                  className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-all ${
                    selectedTimeframe === t ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityTrend}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} unit="Cr" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "12px", color: "#f8fafc" }}
                  formatter={(val) => [`₹${val} Crore`, "Volume"]}
                />
                <Area type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Marketplace Stream Widget */}
        <div className="lg:col-span-4 p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Live Stream Ticker
              </h2>
              <Link to="/network/live-stream" className="text-xs text-blue-400 hover:underline">View All →</Link>
            </div>
            <p className="text-xs text-slate-400 mb-4">Latest loan applications arriving in the marketplace.</p>

            <div className="space-y-3">
              {recentMarketplaceStream.map((item) => (
                <div key={item.id} className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-200">{item.borrower}</span>
                    <span className="text-[10px] font-mono text-slate-500">{item.timestamp}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-blue-400 font-bold">{item.amount}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      iNV IQ: {item.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/network/live-stream"
            className="w-full mt-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 text-center block transition-all"
          >
            Launch Full Live Marketplace Stream
          </Link>
        </div>
      </div>
    </div>
  );
}
