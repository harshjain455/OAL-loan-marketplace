import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Award, Bell } from "lucide-react";

export default function LenderDashboard() {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Lender Dashboard</h1>
        <p className="text-sm text-slate-400">Manage capital deployment and offer distributions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <h3 className="text-xs font-semibold text-slate-400">Total Capital Active</h3>
          <p className="text-3xl font-extrabold text-slate-50">$2.4M</p>
          <span className="text-xs text-emerald-400 font-semibold inline-flex items-center">
            +12.4% yield YTD
          </span>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <h3 className="text-xs font-semibold text-slate-400">Active Submitted Offers</h3>
          <p className="text-3xl font-extrabold text-slate-50">14</p>
          <Link to="/lender/offers" className="text-xs text-blue-400 hover:underline">
            Manage active offers
          </Link>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <h3 className="text-xs font-semibold text-slate-400">New Qualified Leads</h3>
          <p className="text-3xl font-extrabold text-slate-50">8</p>
          <Link to="/lender/lead-alerts" className="text-xs text-blue-400 hover:underline inline-flex items-center">
            <Bell size={12} className="mr-1 animate-bounce" /> View alerts
          </Link>
        </div>
      </div>

      {/* Rankings Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-100">AI rankings [iNV IQ]</h3>
          <Link to="/lender/rankings" className="text-xs text-blue-400 hover:underline flex items-center">
            View full list <ArrowUpRight size={12} className="ml-1" />
          </Link>
        </div>
        <div className="space-y-3">
          {[
            { id: "Lead #2918", score: "A+", amount: "$150,000", term: "12 Mos" },
            { id: "Lead #1092", score: "A", amount: "$80,000", term: "24 Mos" }
          ].map((lead, idx) => (
            <div key={idx} className="flex justify-between items-center bg-slate-950 p-4 rounded-lg">
              <span className="text-xs font-semibold text-slate-300">{lead.id}</span>
              <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded">{lead.score}</span>
              <span className="text-xs font-semibold text-slate-200">{lead.amount} / {lead.term}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
