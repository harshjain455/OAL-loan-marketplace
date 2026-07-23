import React from "react";
import { Link } from "react-router-dom";
import { Bell, ArrowRight, Building, ShieldCheck, Zap } from "lucide-react";

export default function RepAILeadAlerts() {
  const alerts = [
    {
      id: 1,
      borrowerId: "OAL-1102",
      borrowerName: "Sarah Jenkins",
      lenderName: "Summit Finance (Anonymous)",
      matchScore: "88%",
      loanRequest: "$300,000 (Business Expansion)",
      time: "30m ago",
      desc: "AI matching engine detected a high-probability lender match for Sarah Jenkins' business expansion capital request."
    },
    {
      id: 2,
      borrowerId: "OAL-9842",
      borrowerName: "John Doe",
      lenderName: "Lender Alpha (Anonymous)",
      matchScore: "94%",
      loanRequest: "$75,000 (Commercial Real Estate)",
      time: "2h ago",
      desc: "New bid submitted by Lender Alpha. Terms proposed: 6.5% interest rate with 24-month term."
    },
    {
      id: 3,
      borrowerId: "OAL-2291",
      borrowerName: "Elena Rostova",
      lenderName: "Pacific Bids (Anonymous)",
      matchScore: "91%",
      loanRequest: "$500,000 (Equipment Financing)",
      time: "1d ago",
      desc: "Lender Pacific Bids matched with Elena Rostova's equipment appraisal metrics."
    }
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Lead Alerts</h1>
        <p className="text-sm text-slate-400">Real-time alerts triggered when new matching lenders are identified for your assigned borrowers.</p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg mt-0.5">
                  <Zap size={18} className="animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-bold text-sm text-slate-200">New Lender Match Found</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                      Match Score: {alert.matchScore}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{alert.desc}</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 shrink-0">{alert.time}</span>
            </div>

            <div className="p-3 bg-slate-950/80 border border-slate-850 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Assigned Borrower</span>
                <span className="font-semibold text-slate-300">{alert.borrowerName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Matching Lender</span>
                <span className="font-semibold text-slate-300">{alert.lenderName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Loan Request File</span>
                <span className="font-semibold text-slate-300">{alert.loanRequest}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Link
                to={`/rep/lead-details?id=${alert.borrowerId}`}
                className="px-3.5 py-1.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                View Details
              </Link>
              <Link
                to={`/rep/communication?borrowerId=${alert.borrowerId}`}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
              >
                Open LetsWork Chat
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
