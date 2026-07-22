import React from "react";

export default function AdminAuditLogs() {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
      <p className="text-sm text-slate-400">Security tracker auditing system logs and login histories.</p>
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <p className="text-xs text-slate-500">Search logs...</p>
      </div>
    </div>
  );
}
