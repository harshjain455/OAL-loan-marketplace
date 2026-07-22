import React from "react";
import { Clock } from "lucide-react";

export default function NetworkLiveMarketplace() {
  const activeApplications = [
    { id: "Applicant #2918", amount: "$50,000", status: "New", elapsed: "3 hours ago", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { id: "Applicant #1092", amount: "$80,000", status: "In Underwriting", elapsed: "2 days ago", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    { id: "Applicant #0881", amount: "$120,000", status: "Offer Accepted", elapsed: "4 days ago", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Live Marketplace View</h1>
        <p className="text-sm text-slate-400">Real-time listing of active applicants with lifecycle timestamps</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeApplications.map((app, idx) => (
          <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-slate-400">{app.id}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${app.color}`}>
                  {app.status}
                </span>
              </div>
              <p className="text-2xl font-extrabold">{app.amount}</p>
            </div>
            
            <div className="flex items-center text-[10px] text-slate-500 gap-1 pt-3 border-t border-slate-850">
              <Clock size={12} />
              <span>Pipeline time: {app.elapsed}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
