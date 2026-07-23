import React, { useState } from "react";
import { BarChart2, TrendingUp, DollarSign, Percent, CheckCircle2, Clock, XCircle, ArrowUpRight, ArrowDownRight, Target } from "lucide-react";

// SVG Bar Chart Component
function BarChartSVG({ data, height = 120 }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d, i) => {
        const barH = Math.max(4, (d.value / max) * height);
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1 group cursor-default">
            <span className="text-[9px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{d.value}</span>
            <div
              className={`w-full rounded-t-md transition-all duration-500 ${d.color || "bg-indigo-500"}`}
              style={{ height: `${barH}px` }}
            />
            <span className="text-[9px] text-slate-500 font-medium truncate w-full text-center">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// SVG Spline / Line Trend
function LineTrendSVG({ data, color = "#6366f1" }) {
  const width = 320;
  const height = 80;
  const max = Math.max(...data) || 1;
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 12) - 6;
    return `${x},${y}`;
  });
  const pathD = `M ${pts.join(" L ")}`;
  const areaD = `M ${pts[0]} L ${pts.join(" L ")} L ${width},${height} L 0,${height} Z`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#lineGrad)" />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((v - min) / range) * (height - 12) - 6;
        return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
      })}
    </svg>
  );
}

const OFFER_BAR_DATA = [
  { label: "Jan", value: 8, color: "bg-indigo-500" },
  { label: "Feb", value: 12, color: "bg-indigo-500" },
  { label: "Mar", value: 9, color: "bg-indigo-500" },
  { label: "Apr", value: 15, color: "bg-indigo-500" },
  { label: "May", value: 11, color: "bg-indigo-500" },
  { label: "Jun", value: 18, color: "bg-indigo-500" },
  { label: "Jul", value: 14, color: "bg-indigo-500" },
];

const ACCEPTED_BAR_DATA = [
  { label: "Jan", value: 4, color: "bg-emerald-500" },
  { label: "Feb", value: 7, color: "bg-emerald-500" },
  { label: "Mar", value: 5, color: "bg-emerald-500" },
  { label: "Apr", value: 9, color: "bg-emerald-500" },
  { label: "May", value: 6, color: "bg-emerald-500" },
  { label: "Jun", value: 11, color: "bg-emerald-500" },
  { label: "Jul", value: 8, color: "bg-emerald-500" },
];

const YIELD_TREND = [6.1, 6.4, 6.2, 6.8, 7.1, 6.9, 7.4, 7.2, 7.6, 7.8, 7.5, 8.0];
const FUNDED_TREND = [120000, 145000, 132000, 180000, 195000, 210000, 190000, 230000, 245000, 260000, 255000, 280000];

export default function LenderAnalytics() {
  const [timeRange, setTimeRange] = useState("YTD");

  const kpis = [
    {
      label: "Total Funded Volume",
      value: "$2.41M",
      change: "+14.2%",
      up: true,
      icon: DollarSign,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20"
    },
    {
      label: "Offer Conversion Rate",
      value: "58.3%",
      change: "+4.1%",
      up: true,
      icon: Percent,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20"
    },
    {
      label: "Avg. Portfolio Yield",
      value: "7.8%",
      change: "+0.6%",
      up: true,
      icon: TrendingUp,
      color: "text-sky-400",
      bg: "bg-sky-500/10 border-sky-500/20"
    },
    {
      label: "Active Offers Pending",
      value: "12",
      change: "-2",
      up: false,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20"
    },
    {
      label: "Offers Accepted",
      value: "50",
      change: "+8",
      up: true,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20"
    },
    {
      label: "Offers Rejected",
      value: "21",
      change: "-3",
      up: true,
      icon: XCircle,
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/20"
    },
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
              <BarChart2 size={22} />
            </div>
            Analytics
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Conversion rates, portfolio yield, and performance metrics for your lending activity.
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-bold">
          {["1M", "3M", "6M", "YTD", "ALL"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                timeRange === t ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {kpis.map(({ label, value, change, up, icon: Icon, color, bg }) => (
          <div key={label} className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-xl border ${bg}`}>
                <Icon size={16} className={color} />
              </div>
              <span className={`flex items-center gap-0.5 text-[11px] font-bold ${up ? "text-emerald-400" : "text-rose-400"}`}>
                {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                {change}
              </span>
            </div>
            <div className="text-2xl font-black text-white">{value}</div>
            <div className="text-[11px] text-slate-400 font-semibold mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Offer Pipeline Bar Chart */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white">Offer Pipeline Comparison</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Offers Sent vs. Accepted per month</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block" />Sent</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />Accepted</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-slate-500 mb-2 font-semibold uppercase tracking-wider">Offers Sent</p>
              <BarChartSVG data={OFFER_BAR_DATA} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 mb-2 font-semibold uppercase tracking-wider">Offers Accepted</p>
              <BarChartSVG data={ACCEPTED_BAR_DATA} />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-slate-800/60 pt-3 text-xs">
            <div className="text-slate-400">Overall Conversion</div>
            <div className="flex items-center gap-1.5 font-extrabold text-emerald-400">
              <Target size={14} />
              58.3%
            </div>
          </div>
        </div>

        {/* Portfolio Yield Trend */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white">Portfolio Yield Trend</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Average interest yield % across 12 months</p>
          </div>
          <LineTrendSVG data={YIELD_TREND} color="#6366f1" />
          <div className="flex items-center justify-between border-t border-slate-800/60 pt-3 text-xs">
            <div className="flex gap-4">
              <div>
                <div className="text-slate-500 text-[10px]">Low</div>
                <div className="font-bold text-white">6.1%</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">High</div>
                <div className="font-bold text-white">8.0%</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px]">Current</div>
                <div className="font-bold text-indigo-400">8.0%</div>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
              <ArrowUpRight size={12} />+1.9% YoY
            </span>
          </div>
        </div>
      </div>

      {/* Funded Volume Trend */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-white">Total Funded Volume Trend</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">Monthly loan disbursement volume in USD across portfolio</p>
          </div>
          <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl">
            <TrendingUp size={14} />
            +$160,000 YTD Growth
          </span>
        </div>
        <LineTrendSVG data={FUNDED_TREND} color="#10b981" />
        <div className="grid grid-cols-4 gap-4 border-t border-slate-800/60 pt-3 text-xs">
          {[
            { label: "Jan Start", value: "$120K" },
            { label: "Peak Month", value: "$280K" },
            { label: "Avg Monthly", value: "$218K" },
            { label: "YTD Total", value: "$2.41M" }
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-slate-500 text-[10px] font-medium">{label}</div>
              <div className="font-extrabold text-white mt-0.5">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Offer Status Breakdown */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-bold text-white mb-4">Offer Status Breakdown</h3>
        <div className="space-y-3">
          {[
            { label: "Accepted", value: 50, total: 83, color: "bg-emerald-500", text: "text-emerald-400" },
            { label: "Pending", value: 12, total: 83, color: "bg-amber-500", text: "text-amber-400" },
            { label: "Rejected", value: 21, total: 83, color: "bg-rose-500", text: "text-rose-400" }
          ].map(({ label, value, total, color, text }) => {
            const pct = Math.round((value / total) * 100);
            return (
              <div key={label} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className={text}>{label}</span>
                  <span className="text-slate-300">{value} offers ({pct}%)</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
