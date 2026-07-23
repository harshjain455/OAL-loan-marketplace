import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, TrendingUp, DollarSign, Users, Award, Download, Calendar, Filter, CheckCircle2 } from "lucide-react";

export default function RepAnalytics() {
  const [timeRange, setTimeRange] = useState("6m");

  const metrics = [
    { label: "Active Coordinating Leads", value: "12", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Total Funded Loans", value: "34", icon: Award, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Total Funded Value", value: "$4.8M", icon: DollarSign, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { label: "Commission Earned", value: "$72,000", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10" }
  ];

  const transactionHistory = [
    { id: "TX-901", borrower: "John Doe", type: "Commercial Real Estate", funded: "$75,000", commission: "$1,875", date: "2026-07-20", status: "Funded" },
    { id: "TX-781", borrower: "Elena Rostova", type: "Equipment Financing", funded: "$500,000", commission: "$12,500", date: "2026-07-15", status: "Funded" },
    { id: "TX-620", borrower: "Sarah Jenkins", type: "Business Expansion", funded: "$300,000", commission: "$7,500", date: "2026-06-28", status: "Funded" },
    { id: "TX-401", borrower: "Marcus Aurelius", type: "Working Capital", funded: "$120,000", commission: "$3,000", date: "2026-05-14", status: "Funded" }
  ];

  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const exportReport = () => {
    showToast("Performance Report generated and downloaded successfully!");
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Performance Analytics</h1>
          <p className="text-sm text-slate-400">Detailed overview of your matched lead conversions, loan volume, and earned commissions.</p>
        </div>
        <button
          onClick={exportReport}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 shadow"
        >
          <Download size={14} />
          Export Performance Report
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m.label}</span>
                <div className={`p-2 rounded-lg ${m.bg}`}>
                  <Icon size={16} className={m.color} />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-100">{m.value}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart Card */}
        <div className="lg:col-span-2 p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-6 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
              <BarChart3 size={16} className="text-blue-400" />
              Funding Volume Performance
            </h3>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-850 rounded-lg p-1">
              {["3m", "6m", "1y"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded uppercase transition-all ${
                    timeRange === t ? "bg-blue-600 text-white shadow" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {t === "6m" ? "6 Months" : t === "3m" ? "3 Months" : "1 Year"}
                </button>
              ))}
            </div>
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

        {/* Commission breakdown summary card */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-slate-200">Commission Summary</h3>
            <p className="text-xs text-slate-400">Details of commission rate splits and payout estimates.</p>
          </div>

          <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Average Split Rate</span>
              <span className="font-bold text-slate-300">2.5% per deal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated Next Payout</span>
              <span className="font-bold text-emerald-400">$8,500.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Next Payout Date</span>
              <span className="font-bold text-slate-300">2026-08-01</span>
            </div>
          </div>

          <Link
            to="/rep/billing"
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-center font-semibold text-xs rounded-lg transition-colors block text-slate-300 hover:text-white"
          >
            Manage Payout Destination
          </Link>
        </div>
      </div>

      {/* Transaction History Log table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="font-bold text-sm text-slate-200">Recent Commission Payout Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-850">
              <tr>
                <th className="px-4 py-3 font-semibold">Transaction ID</th>
                <th className="px-4 py-3 font-semibold">Borrower</th>
                <th className="px-4 py-3 font-semibold">Loan Category</th>
                <th className="px-4 py-3 font-semibold">Funded Volume</th>
                <th className="px-4 py-3 font-semibold">Earned Commission</th>
                <th className="px-4 py-3 font-semibold">Funding Date</th>
                <th className="px-4 py-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {transactionHistory.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-850/20 transition-colors">
                  <td className="px-4 py-3.5 font-mono text-[10px] font-bold text-blue-400">{tx.id}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-200">{tx.borrower}</td>
                  <td className="px-4 py-3.5 text-slate-400">{tx.type}</td>
                  <td className="px-4 py-3.5 font-bold text-slate-200">{tx.funded}</td>
                  <td className="px-4 py-3.5 font-bold text-emerald-400">{tx.commission}</td>
                  <td className="px-4 py-3.5 text-slate-500">{tx.date}</td>
                  <td className="px-4 py-3.5 text-right font-bold text-emerald-400">{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-emerald-500 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 text-xs animate-bounce">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
