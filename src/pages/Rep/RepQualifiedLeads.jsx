import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, MessageSquare, TrendingUp, Heart } from "lucide-react";

export default function RepQualifiedLeads() {
  const leads = [
    { id: "OAL-9842", name: "John Doe", amount: "$75,000", purpose: "Commercial Real Estate", score: 94, status: "Active Bids", date: "2026-07-20" },
    { id: "OAL-1102", name: "Sarah Jenkins", amount: "$300,000", purpose: "Business Expansion", score: 88, status: "Matching Lenders", date: "2026-07-22" },
    { id: "OAL-5593", name: "David Vance", amount: "$150,000", purpose: "Debt Consolidation", score: 72, status: "Under Review", date: "2026-07-18" },
    { id: "OAL-2291", name: "Elena Rostova", amount: "$500,000", purpose: "Equipment Financing", score: 91, status: "Approved Offer", date: "2026-07-23" },
  ];

  // Load saved leads from localStorage or default to John Doe & Elena Rostova
  const [savedLeads, setSavedLeads] = useState(() => {
    const raw = localStorage.getItem("oal_rep_saved_leads");
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        return ["OAL-9842", "OAL-2291"];
      }
    }
    return ["OAL-9842", "OAL-2291"];
  });

  useEffect(() => {
    localStorage.setItem("oal_rep_saved_leads", JSON.stringify(savedLeads));
  }, [savedLeads]);

  const toggleSave = (id) => {
    if (savedLeads.includes(id)) {
      setSavedLeads(savedLeads.filter(leadId => leadId !== id));
    } else {
      setSavedLeads([...savedLeads, id]);
    }
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Qualified Leads</h1>
          <p className="text-sm text-slate-400">Assigned borrower accounts awaiting coordination and loan matching.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {leads.map((lead) => {
          const isSaved = savedLeads.includes(lead.id);
          return (
            <div
              key={lead.id}
              className="p-5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2.5">
                  <Link to={`/rep/lead-details?id=${lead.id}`} className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-bold hover:underline">
                    {lead.id}
                  </Link>
                  <Link to={`/rep/lead-details?id=${lead.id}`} className="font-bold text-base text-slate-200 hover:text-blue-400 transition-colors">
                    {lead.name}
                  </Link>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    lead.status === "Approved Offer" ? "bg-emerald-500/15 text-emerald-400" :
                    lead.status === "Active Bids" ? "bg-blue-500/15 text-blue-400" :
                    lead.status === "Under Review" ? "bg-amber-500/15 text-amber-400" :
                    "bg-slate-800 text-slate-400"
                  }`}>
                    {lead.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                  <span>Amount: <strong className="text-slate-200">{lead.amount}</strong></span>
                  <span>Purpose: <strong className="text-slate-200">{lead.purpose}</strong></span>
                  <span>Assigned: <strong className="text-slate-200">{lead.date}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end shrink-0">
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">AI InvIQ Score</span>
                    <span className="font-bold text-slate-200 text-sm flex items-center justify-end gap-1">
                      <TrendingUp size={14} className="text-emerald-400" />
                      {lead.score}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSave(lead.id)}
                    className={`p-2 border rounded-lg transition-colors ${
                      isSaved
                        ? "bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20"
                        : "bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                    title={isSaved ? "Remove from Saved" : "Save Lead"}
                  >
                    <Heart size={14} fill={isSaved ? "currentColor" : "none"} />
                  </button>
                  <Link
                    to={`/rep/lead-details?id=${lead.id}`}
                    className="p-2 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold px-3"
                    title="View Profile Details"
                  >
                    <Eye size={14} />
                    <span>View Details</span>
                  </Link>
                  <Link
                    to={`/rep/communication?borrowerId=${lead.id}`}
                    className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors flex items-center gap-1.5 text-xs font-semibold px-3"
                  >
                    <MessageSquare size={14} />
                    <span>Chat</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
