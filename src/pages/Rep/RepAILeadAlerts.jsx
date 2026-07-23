import React from "react";
import { Bell, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function RepAILeadAlerts() {
  const alerts = [
    { id: 1, title: "New Lender Match Found", desc: "Summit Finance matched with Sarah Jenkins' $300k Business Expansion request. (InvIQ Match score: 88)", time: "30m ago" },
    { id: 2, title: "KYC Verified", desc: "John Doe's identity verification completed successfully.", time: "1h ago" },
    { id: 3, title: "Bids Received", desc: "Lender Alpha submitted a bid of $75,000 for John Doe.", time: "2h ago" },
    { id: 4, title: "Borrower Activity", desc: "Elena Rostova uploaded Equipment Appraisal Report.", time: "1d ago" }
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Lead Alerts</h1>
        <p className="text-sm text-slate-400">Push notifications regarding matching activity and verification milestones.</p>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-sm text-slate-200 flex items-center gap-2">
                <Bell size={14} className="text-blue-500" />
                {alert.title}
              </span>
              <p className="text-xs text-slate-400">{alert.desc}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-500 block mb-2">{alert.time}</span>
              <Link to="/rep/communication" className="inline-flex items-center gap-1 text-[10px] text-blue-400 hover:underline">
                View Chat <ArrowRight size={10} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
