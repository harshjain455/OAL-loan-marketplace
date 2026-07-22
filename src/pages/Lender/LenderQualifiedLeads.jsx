import React from "react";

export default function LenderQualifiedLeads() {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <h1 className="text-2xl font-bold tracking-tight">Qualified Leads</h1>
      <p className="text-sm text-slate-400">Pre-screened, anonymous borrower leads matched by the AI scoring system.</p>
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <p className="text-xs text-slate-500">Currently no new qualified leads are assigned to your matching parameters.</p>
      </div>
    </div>
  );
}
