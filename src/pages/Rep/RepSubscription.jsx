import React from "react";
import { Check, ShieldCheck } from "lucide-react";

export default function RepSubscription() {
  const currentPlan = {
    name: "Professional Broker Plan",
    price: "$99/mo",
    nextBilling: "2026-08-01",
    features: [
      "Access to unlimited assigned verified borrowers",
      "Instant push notifications and matched alerts",
      "LetsWork coordinated communication portal",
      "Comprehensive performance audit & CSV exports",
    ]
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Agent Subscription</h1>
        <p className="text-sm text-slate-400">Manage your active network platform subscription status and features.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded uppercase tracking-wider">Active</span>
            <h2 className="text-xl font-bold text-slate-100 mt-2">{currentPlan.name}</h2>
            <p className="text-xs text-slate-500 mt-1">Next automatic renewal: {currentPlan.nextBilling}</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-slate-100">{currentPlan.price}</span>
            <span className="text-[10px] text-slate-500 block">Billed Monthly</span>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-850">
          <h3 className="font-bold text-xs text-slate-300 uppercase tracking-wider">Features Included In Your Plan</h3>
          <div className="space-y-2 text-xs text-slate-400">
            {currentPlan.features.map((feat, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <Check size={14} className="text-emerald-500 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button
            onClick={() => alert("Cancellation request submitted.")}
            className="px-4 py-2 border border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-lg transition-colors"
          >
            Cancel Subscription
          </button>
          <button
            onClick={() => alert("Plan upgrade screen loaded.")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-lg"
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
}
