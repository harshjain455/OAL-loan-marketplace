import React from "react";

export default function RepBilling() {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <h1 className="text-2xl font-bold tracking-tight">Billing & Subscription</h1>
      <p className="text-sm text-slate-400">Manage agent payouts, metrics, and commissions.</p>
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <p className="text-xs text-slate-500">Billing details loading...</p>
      </div>
    </div>
  );
}
