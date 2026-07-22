import React from "react";

export default function RepAnalytics() {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <h1 className="text-2xl font-bold tracking-tight">Analytics & Reports</h1>
      <p className="text-sm text-slate-400">Yield and active coordinator logs metrics.</p>
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <p className="text-xs text-slate-500">Analytics loading...</p>
      </div>
    </div>
  );
}
