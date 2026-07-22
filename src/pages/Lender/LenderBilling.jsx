import React from "react";

export default function LenderBilling() {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <h1 className="text-2xl font-bold tracking-tight">Billing & Subscription</h1>
      <p className="text-sm text-slate-400">Manage membership levels, subscription tiers, and invoicing logs.</p>
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <p className="text-xs text-slate-500">Subscription plans loading...</p>
      </div>
    </div>
  );
}
