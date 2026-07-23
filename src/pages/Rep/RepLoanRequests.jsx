import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Eye, MessageSquare, Clock, ArrowRight } from "lucide-react";

export default function RepLoanRequests() {
  const requests = [
    { id: "LR-9021", borrowerId: "OAL-9842", borrower: "John Doe", amount: "$75,000", purpose: "Commercial Real Estate", status: "Bids Received", progress: 75, date: "2026-07-20" },
    { id: "LR-1142", borrowerId: "OAL-1102", borrower: "Sarah Jenkins", amount: "$300,000", purpose: "Business Expansion", status: "Seeking Funding", progress: 25, date: "2026-07-22" },
    { id: "LR-5582", borrowerId: "OAL-5593", borrower: "David Vance", amount: "$150,000", purpose: "Debt Consolidation", status: "Under Review", progress: 50, date: "2026-07-18" },
    { id: "LR-2210", borrowerId: "OAL-2291", borrower: "Elena Rostova", amount: "$500,000", purpose: "Equipment Financing", status: "Approved Offer", progress: 100, date: "2026-07-23" },
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Active Loan Requests</h1>
        <p className="text-sm text-slate-400">Track loan files listed on the live marketplace and monitor lender bidding stages.</p>
      </div>

      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-bold">{req.id}</span>
                  <h3 className="font-bold text-sm text-slate-200">{req.borrower}</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">{req.purpose} • Requested on {req.date}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Request Amount</span>
                <span className="font-bold text-slate-200 text-sm">{req.amount}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className={`flex items-center gap-1.5 text-xs font-bold ${
                  req.status === "Bids Received" ? "text-emerald-400" :
                  req.status === "Approved Offer" ? "text-blue-400" :
                  "text-slate-400"
                }`}>
                  <Clock size={12} className="animate-pulse" />
                  Status: {req.status}
                </span>
                <span className="text-slate-300">{req.progress}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${req.progress}%` }}
                />
              </div>
            </div>

            {/* Actions Panel */}
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-850">
              <Link
                to={`/rep/lead-details?id=${req.borrowerId}`}
                className="px-3 py-1.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1"
              >
                <Eye size={12} />
                <span>Details</span>
              </Link>
              <Link
                to="/rep/offers"
                className="px-3 py-1.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1"
              >
                <Briefcase size={12} />
                <span>View Bids</span>
              </Link>
              <Link
                to={`/rep/communication?borrowerId=${req.borrowerId}`}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold text-white transition-colors flex items-center gap-1"
              >
                <MessageSquare size={12} />
                <span>Chat</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
