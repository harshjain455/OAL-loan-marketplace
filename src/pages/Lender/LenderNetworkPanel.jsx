import React, { useState, useEffect, useRef } from "react";
import { Compass, ShieldCheck, Eye, Clock, Filter, RefreshCw, Activity, ArrowUpRight, Lock, Wifi } from "lucide-react";

// Pipeline stage colors based on wireframe spec
const PIPELINE_STAGES = [
  { label: "New Application", color: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10" },
  { label: "KYC In Progress", color: "bg-amber-500", text: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10" },
  { label: "Under Review", color: "bg-sky-500", text: "text-sky-400", border: "border-sky-500/30", bg: "bg-sky-500/10" },
  { label: "Offer Pending", color: "bg-indigo-500", text: "text-indigo-400", border: "border-indigo-500/30", bg: "bg-indigo-500/10" },
  { label: "Funded", color: "bg-violet-500", text: "text-violet-400", border: "border-violet-500/30", bg: "bg-violet-500/10" }
];

const LOAN_PURPOSES = ["Commercial Real Estate", "Business Expansion", "Equipment Financing", "Working Capital", "Bridge Loan", "Inventory Finance"];

// Seed data
const SEED_STREAM = [
  { id: "NET-8801", appStarted: "2 min ago", stage: 0, purpose: "Commercial Real Estate", amount: "$120,000", invScore: 96 },
  { id: "NET-7432", appStarted: "5 min ago", stage: 1, purpose: "Business Expansion", amount: "$200,000", invScore: 91 },
  { id: "NET-6591", appStarted: "11 min ago", stage: 2, purpose: "Equipment Financing", amount: "$45,000", invScore: 88 },
  { id: "NET-5872", appStarted: "18 min ago", stage: 3, purpose: "Working Capital", amount: "$75,000", invScore: 84 },
  { id: "NET-5204", appStarted: "26 min ago", stage: 1, purpose: "Bridge Loan", amount: "$310,000", invScore: 92 },
  { id: "NET-4781", appStarted: "34 min ago", stage: 4, purpose: "Inventory Finance", amount: "$60,000", invScore: 89 },
  { id: "NET-4120", appStarted: "41 min ago", stage: 2, purpose: "Commercial Real Estate", amount: "$500,000", invScore: 95 },
  { id: "NET-3895", appStarted: "52 min ago", stage: 0, purpose: "Business Expansion", amount: "$95,000", invScore: 87 },
];

let nextIdCounter = 9000;

function generateEntry() {
  const stageIdx = Math.floor(Math.random() * PIPELINE_STAGES.length);
  const purposeIdx = Math.floor(Math.random() * LOAN_PURPOSES.length);
  const amounts = [45000, 60000, 75000, 95000, 120000, 150000, 200000, 300000, 500000];
  const amount = amounts[Math.floor(Math.random() * amounts.length)];
  const score = Math.floor(78 + Math.random() * 22);
  nextIdCounter++;
  return {
    id: `NET-${nextIdCounter}`,
    appStarted: "Just now",
    stage: stageIdx,
    purpose: LOAN_PURPOSES[purposeIdx],
    amount: `$${amount.toLocaleString()}`,
    invScore: score,
    isNew: true
  };
}

export default function LenderNetworkPanel() {
  const [stream, setStream] = useState(SEED_STREAM);
  const [isLive, setIsLive] = useState(true);
  const [filterStage, setFilterStage] = useState("All");
  const [totalSeen, setTotalSeen] = useState(SEED_STREAM.length);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const intervalRef = useRef(null);
  const topRef = useRef(null);

  // Live stream simulation — new entry every 4-7 seconds
  useEffect(() => {
    if (!isLive) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      const entry = generateEntry();
      setStream((prev) => {
        const updated = [entry, ...prev].slice(0, 50); // keep max 50 rows
        return updated;
      });
      setTotalSeen((prev) => prev + 1);
      setLastUpdated(new Date());
    }, Math.floor(4000 + Math.random() * 3000));

    return () => clearInterval(intervalRef.current);
  }, [isLive]);

  // Remove "isNew" highlight after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setStream((prev) => prev.map((e) => ({ ...e, isNew: false })));
    }, 2000);
    return () => clearTimeout(timer);
  }, [stream]);

  const filteredStream =
    filterStage === "All" ? stream : stream.filter((e) => PIPELINE_STAGES[e.stage].label === filterStage);

  const stageCounts = PIPELINE_STAGES.map((s, i) => ({
    ...s,
    count: stream.filter((e) => e.stage === i).length
  }));

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <div className="p-2.5 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-xl">
              <Compass size={22} />
            </div>
            OAL Network Panel
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time live marketplace activity stream. All lender identities remain completely anonymous.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Live toggle */}
          <button
            onClick={() => setIsLive((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isLive
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
            {isLive ? "LIVE" : "PAUSED"}
          </button>

          <button
            onClick={() => setLastUpdated(new Date())}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Refresh"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Anonymity Notice */}
      <div className="bg-gradient-to-r from-sky-500/10 via-slate-900 to-slate-900 border border-sky-500/20 p-4 rounded-2xl flex items-start gap-3 text-xs">
        <div className="p-2 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20 shrink-0 mt-0.5">
          <Lock size={16} />
        </div>
        <div>
          <span className="font-extrabold text-sky-400 block mb-0.5 uppercase tracking-wider text-[11px]">Full Anonymity Protocol Active</span>
          <p className="text-slate-400 leading-relaxed font-medium">
            All borrower and lender identities in this feed are anonymized. Application IDs are randomly generated network codes. Real contact details are never revealed in the marketplace stream.
          </p>
        </div>
      </div>

      {/* Pipeline Stage KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {stageCounts.map((s) => (
          <div
            key={s.label}
            onClick={() => setFilterStage(filterStage === s.label ? "All" : s.label)}
            className={`bg-slate-900/90 border rounded-xl p-3 cursor-pointer transition-all hover:scale-[1.02] ${
              filterStage === s.label ? `${s.bg} ${s.border}` : "border-slate-800/80"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${s.text}`}>{s.label}</span>
            </div>
            <div className={`text-2xl font-black ${s.text}`}>{s.count}</div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">Active</div>
          </div>
        ))}
      </div>

      {/* Stream Stats Bar */}
      <div className="bg-slate-900/90 border border-slate-800/80 p-4 rounded-2xl flex flex-wrap items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-indigo-400" />
          <span className="text-slate-400">Total Seen:</span>
          <span className="text-white font-extrabold">{totalSeen} Applications</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi size={14} className="text-emerald-400" />
          <span className="text-slate-400">Stream Status:</span>
          <span className={`font-bold ${isLive ? "text-emerald-400" : "text-slate-400"}`}>{isLive ? "Broadcasting Live" : "Stream Paused"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-slate-400" />
          <span className="text-slate-400">Last Updated:</span>
          <span className="text-white font-semibold">{lastUpdated.toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Filter size={13} className="text-slate-500" />
          <span className="text-slate-500 font-medium">Filter:</span>
          <span className={`font-bold ${filterStage === "All" ? "text-slate-300" : "text-indigo-400"}`}>{filterStage}</span>
          {filterStage !== "All" && (
            <button
              onClick={() => setFilterStage("All")}
              className="text-[10px] text-slate-500 hover:text-white underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Live Stream Table */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800/60 flex justify-between items-center text-xs">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity size={16} className="text-indigo-400" />
            Live Application Stream
          </h2>
          <span className="text-slate-400">
            Showing <span className="text-white font-bold">{filteredStream.length}</span> entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800/60">
              <tr>
                <th className="px-6 py-4 font-semibold">Application ID</th>
                <th className="px-6 py-4 font-semibold">Started</th>
                <th className="px-6 py-4 font-semibold">Pipeline Stage</th>
                <th className="px-6 py-4 font-semibold">Purpose</th>
                <th className="px-6 py-4 font-semibold">Request Amount</th>
                <th className="px-6 py-4 font-semibold">iNV IQ Score</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredStream.map((entry) => {
                const stage = PIPELINE_STAGES[entry.stage];
                return (
                  <tr
                    key={entry.id}
                    className={`transition-all ${
                      entry.isNew
                        ? "bg-emerald-500/5 border-l-2 border-emerald-500/50"
                        : "hover:bg-slate-800/30"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white">{entry.id}</span>
                        {entry.isNew && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-extrabold animate-pulse">NEW</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 flex items-center gap-1.5">
                      <Clock size={12} />
                      {entry.appStarted}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full w-fit border ${stage.bg} ${stage.border} ${stage.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${stage.color}`} />
                        {stage.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-medium">{entry.purpose}</td>
                    <td className="px-6 py-4 font-extrabold text-white">{entry.amount}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-bold text-indigo-300">
                        <ShieldCheck size={13} className="text-indigo-400" />
                        {entry.invScore}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <button className="flex items-center gap-1 bg-slate-950 border border-slate-800 hover:border-indigo-500/40 hover:text-indigo-300 text-slate-300 font-semibold text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer">
                          <Eye size={13} />
                          Monitor
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredStream.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-slate-500 text-sm">
                    No entries found for the selected pipeline stage filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Stream Footer */}
        <div className="px-6 py-3 bg-slate-950/60 border-t border-slate-800/40 flex items-center justify-between text-[10px] text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <ArrowUpRight size={12} className="text-emerald-400" />
            New entries appear at the top of the stream automatically
          </span>
          <span>Max 50 entries shown in view</span>
        </div>
      </div>
    </div>
  );
}
