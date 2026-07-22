import React from "react";

export default function RepQualifiedLeads() {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <h1 className="text-2xl font-bold tracking-tight">Qualified Leads</h1>
      <p className="text-sm text-slate-400">Assigned borrower accounts awaiting coordination.</p>
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <p className="text-xs text-slate-500">Currently no new leads are assigned.</p>
      </div>
    </div>
  );
}
