import React from "react";
import { BarChart3, TrendingUp, DollarSign, Users, Award } from "lucide-react";

export default function RepAnalytics() {
  const metrics = [
    { label: "Active Coordinating Leads", value: "12", icon: Users, color: "text-blue-500" },
    { label: "Total Funded Loans", value: "34", icon: Award, color: "text-emerald-500" },
    { label: "Total Funded Value", value: "$4.8M", icon: DollarSign, color: "text-indigo-500" },
    { label: "Commission Earned", value: "$72,000", icon: TrendingUp, color: "text-amber-500" }
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Personal Performance Analytics</h1>
        <p className="text-sm text-slate-400">Detailed overview of your matched lead conversions, loan volume, and active commissions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-slate-500">
                <span className="text-[10px] font-bold uppercase tracking-wider">{m.label}</span>
                <Icon size={16} className={m.color} />
              </div>
              <div className="text-2xl font-bold text-slate-200">{m.value}</div>
            </div>
          );
        })}
      </div>

      {/* Monthly Chart */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <BarChart3 size={16} className="text-blue-400" />
            Funding Performance (Last 6 Months)
          </h3>
          <span className="text-[10px] text-slate-500">Updated hourly</span>
        </div>

        <div className="flex items-end justify-between h-48 pt-4 px-2 border-b border-slate-850">
          {[
            { month: "Feb", val: 30, amount: "$450k" },
            { month: "Mar", val: 50, amount: "$750k" },
            { month: "Apr", val: 40, amount: "$600k" },
            { month: "May", val: 75, amount: "$1.1M" },
            { month: "Jun", val: 90, amount: "$1.4M" },
            { month: "Jul", val: 65, amount: "$900k" }
          ].map((bar, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 w-12 group cursor-pointer">
              <span className="text-[9px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {bar.amount}
              </span>
              <div
                className="w-8 bg-blue-600/20 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-500 rounded-t transition-all duration-500"
                style={{ height: `${bar.val * 1.5}px` }}
              />
              <span className="text-[10px] text-slate-500 mt-2">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
