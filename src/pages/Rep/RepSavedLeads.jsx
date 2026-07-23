import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, Eye, MessageSquare } from "lucide-react";

export default function RepSavedLeads() {
  const leadsPool = [
    { id: "OAL-9842", name: "John Doe", amount: "$75,000", purpose: "Commercial Real Estate", score: 94 },
    { id: "OAL-1102", name: "Sarah Jenkins", amount: "$300,000", purpose: "Business Expansion", score: 88 },
    { id: "OAL-5593", name: "David Vance", amount: "$150,000", purpose: "Debt Consolidation", score: 72 },
    { id: "OAL-2291", name: "Elena Rostova", amount: "$500,000", purpose: "Equipment Financing", score: 91 }
  ];

  // Load saved lead IDs from localStorage
  const [savedIds, setSavedIds] = useState(() => {
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
    localStorage.setItem("oal_rep_saved_leads", JSON.stringify(savedIds));
  }, [savedIds]);

  const removeLead = (id) => {
    setSavedIds(savedIds.filter(savedId => savedId !== id));
  };

  // Filter pool by saved IDs
  const savedLeads = leadsPool.filter(lead => savedIds.includes(lead.id));

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Saved Leads</h1>
        <p className="text-sm text-slate-400">Quick-access bookmarked profiles for close monitoring and priority coordination.</p>
      </div>

      {savedLeads.length === 0 ? (
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-3">
          <Heart size={36} className="text-slate-600 mx-auto" />
          <p className="text-sm text-slate-400">No saved leads found.</p>
          <Link to="/rep/qualified-leads" className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors">
            Browse Qualified Leads
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedLeads.map((lead) => (
            <div key={lead.id} className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 relative group">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-bold">{lead.id}</span>
                  <h3 className="font-bold text-sm text-slate-200 mt-1.5">{lead.name}</h3>
                  <p className="text-xs text-slate-400">{lead.purpose} • <strong className="text-slate-300">{lead.amount}</strong></p>
                </div>
                <button
                  onClick={() => removeLead(lead.id)}
                  className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                  title="Remove from Saved"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/rep/lead-details?id=${lead.id}`}
                  className="flex-1 py-1.5 bg-slate-850 hover:bg-slate-800 rounded border border-slate-800 text-center text-xs font-semibold text-slate-300 transition-colors"
                >
                  Details
                </Link>
                <Link
                  to={`/rep/communication?borrowerId=${lead.id}`}
                  className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-center text-xs font-semibold text-white transition-colors"
                >
                  Open Chat
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
