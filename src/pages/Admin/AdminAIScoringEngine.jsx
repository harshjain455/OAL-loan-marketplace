import React from "react";

export default function AdminAIScoringEngine() {
  return (
    <div className="space-y-6 text-slate-100 font-sans max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Scoring Engine Configurations</h1>
        <p className="text-sm text-slate-400">Configure weighting parameters for loan eligibility scores</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-sm mb-2 text-slate-200">Regular Applicant Weights</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-slate-500 block">Debt-to-Income Weight</span>
              <input type="text" defaultValue="40%" className="w-full bg-slate-950 border border-slate-850 rounded px-2 py-1 text-xs text-slate-200" />
            </div>
            <div>
              <span className="text-xs text-slate-500 block">KYC Credential Authenticity</span>
              <input type="text" defaultValue="30%" className="w-full bg-slate-950 border border-slate-850 rounded px-2 py-1 text-xs text-slate-200" />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-850 pt-4">
          <h3 className="font-semibold text-sm mb-2 text-slate-200">Accredited Applicant Investors Scoring Form</h3>
          <p className="text-xs text-slate-500 mb-3">Custom assessment parameters form designed exclusively for high-net worth verified applicants.</p>
          <div className="bg-slate-950 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span>Special Verification Form Setup</span>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded font-semibold text-[10px]">Active</span>
            </div>
            <p className="text-[11px] text-slate-500">Includes verification filters like accredited status, asset declarations, and portfolio yields.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
