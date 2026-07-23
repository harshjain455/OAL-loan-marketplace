import React from "react";
import { Link } from "react-router-dom";
import { Users, MessageSquare, Clock, ArrowRight, Bell, Shield, TrendingUp, CheckCircle } from "lucide-react";

export default function RepDashboard() {
  const stats = [
    { label: "Total Borrowers Assigned", value: "12", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Pending Tasks", value: "5", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Unread Messages", value: "3", icon: MessageSquare, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Active Offers View-Only", value: "8", icon: Shield, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  ];

  const recentMessages = [
    { id: "borrower-1", sender: "John Doe (Borrower)", role: "Borrower", preview: "I have uploaded the tax return files, please review.", time: "10m ago" },
    { id: "lender-1", sender: "Apex Capital (Lender)", role: "Lender", preview: "Is John Doe willing to accept a 7.2% interest rate?", time: "2h ago" },
    { id: "borrower-2", sender: "Sarah Jenkins (Borrower)", role: "Borrower", preview: "Thanks! Looking forward to hearing from the lender.", time: "1d ago" },
  ];

  const alerts = [
    { type: "match", title: "New Lender Match Found", desc: "Summit Finance matched with Sarah Jenkins' $300k Commercial Loan request.", time: "30m ago" },
    { type: "kyc", title: "KYC Verified", desc: "John Doe's identity verification completed successfully.", time: "1h ago" },
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Agent Dashboard</h1>
        <p className="text-sm text-slate-400">Welcome back, OAL Representative. Here is an overview of your active loan files.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon size={18} className={stat.color} />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-100">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Messages & Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h3 className="font-bold text-sm text-slate-200">Recent Communication Thread Snippets</h3>
              <Link to="/rep/communication" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                Open LetsWork Chat <ArrowRight size={12} />
              </Link>
            </div>
            <div className="divide-y divide-slate-800/60">
              {recentMessages.map((msg, idx) => (
                <div key={idx} className="p-4 hover:bg-slate-850/30 transition-colors flex justify-between items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-slate-200">{msg.sender}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        msg.role === "Borrower" ? "bg-blue-600/10 text-blue-400" : "bg-indigo-600/10 text-indigo-400"
                      }`}>
                        {msg.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{msg.preview}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-500 block mb-1">{msg.time}</span>
                    <Link
                      to={`/rep/communication?borrowerId=${msg.id}`}
                      className="px-2.5 py-1 bg-slate-850 hover:bg-slate-800 text-[10px] font-medium rounded text-slate-300 transition-colors"
                    >
                      Reply
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-200">OAL LetsWork Portal Rule Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-400">
              <div className="flex gap-2 items-start">
                <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>Reps act as sole mediators between Borrowers and Lenders.</span>
              </div>
              <div className="flex gap-2 items-start">
                <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>Borrowers can only see and chat with their assigned Reps.</span>
              </div>
              <div className="flex gap-2 items-start">
                <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>Lender identity is kept completely anonymous from other lenders.</span>
              </div>
              <div className="flex gap-2 items-start">
                <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>Offer Management is read-only; reps can only view & share.</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI & Marketplace Alerts */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-slate-200">AI Alerts & Events</h3>
              <Link to="/rep/lead-alerts" className="text-xs text-blue-400 hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {alerts.map((alert, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-slate-850 rounded-lg space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-xs text-slate-200 flex items-center gap-1.5">
                      <Bell size={12} className="text-amber-500" />
                      {alert.title}
                    </span>
                    <span className="text-[10px] text-slate-500">{alert.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{alert.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-blue-950 border border-blue-900/30 rounded-xl p-5 space-y-3">
            <TrendingUp size={24} className="text-blue-400" />
            <h3 className="font-bold text-sm text-slate-100">Live Lending Marketplace</h3>
            <p className="text-xs text-slate-400">
              Observe real-time borrowing requests, time stamps, and live offer tracking in the interactive Network Panel.
            </p>
            <Link
              to="/rep/network-panel"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              Open Network Panel <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
