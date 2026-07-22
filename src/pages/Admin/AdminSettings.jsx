import React from "react";

export default function AdminSettings() {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
      <p className="text-sm text-slate-400">Core parameters API config, SMTP configurations, and MFA enforcement policies.</p>
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <p className="text-xs text-slate-500">System values.</p>
      </div>
    </div>
  );
}
