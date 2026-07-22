import React from "react";

export default function LenderBorrowerRankings() {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <h1 className="text-2xl font-bold tracking-tight">Borrower Rankings – [ iNV IQ ]</h1>
      <p className="text-sm text-slate-400">Custom scoring database and risk evaluation list.</p>
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <p className="text-xs text-slate-500">Database empty.</p>
      </div>
    </div>
  );
}
