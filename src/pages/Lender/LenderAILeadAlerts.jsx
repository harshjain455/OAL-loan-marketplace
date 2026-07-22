import React from "react";

export default function LenderAILeadAlerts() {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <h1 className="text-2xl font-bold tracking-tight">AI Lead Alerts</h1>
      <p className="text-sm text-slate-400">Real-time alerts for active borrower requests in the market.</p>
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <p className="text-xs text-slate-500">No new alerts.</p>
      </div>
    </div>
  );
}
