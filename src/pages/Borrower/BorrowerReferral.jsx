import React from "react";

export default function BorrowerReferral() {
  return (
    <div className="space-y-6 font-sans text-slate-100">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Referral Program</h1>
        <p className="text-sm text-slate-400">Invite new users to apply for loan options and earn rewards.</p>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 max-w-xl">
        <h3 className="text-sm font-semibold">Your Referral Link</h3>
        <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-slate-300 break-all select-all">
          https://oalnetwork.com/ref?code=REF_9812A
        </div>
        <button
          onClick={() => alert("Link copied to clipboard!")}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg transition-colors"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}
