import React from "react";
import { Link } from "react-router-dom";
import { Compass, Sparkles } from "lucide-react";

export default function NetworkDashboard() {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">OAL Network Panel Dashboard</h1>
          <p className="text-sm text-slate-400">Live Lending Marketplace & Stream Portal</p>
        </div>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-blue-400" size={20} />
          <h3 className="font-semibold">Interactive Stream Status</h3>
        </div>
        <p className="text-xs text-slate-400">
          This portal allows Lenders and OAL Reps to monitor loan files, matching, and active offers in real-time.
        </p>
        <Link to="/network/live-stream" className="inline-flex items-center text-xs text-blue-400 hover:underline">
          Go to Live Marketplace View &rarr;
        </Link>
      </div>
    </div>
  );
}
