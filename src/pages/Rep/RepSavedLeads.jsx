import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, Eye, MessageSquare } from "lucide-react";

export default function RepSavedLeads() {
  const [savedLeads, setSavedLeads] = useState([
    { id: "OAL-9842", name: "John Doe", amount: "$75,000", purpose: "Commercial Real Estate", score: 94 },
    { id: "OAL-2291", name: "Elena Rostova", amount: "$500,000", purpose: "Equipment Financing", score: 91 }
  ]);

  const removeLead = (id) => {
    setSavedLeads(savedLeads.filter(lead => lead.id !== id));
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Saved Leads</h1>
        <p className="text-sm text-slate-400">Quick-access bookmarked profiles for close monitoring and priority coordination.</p>
      </div>

      {savedLeads.length === 0 ? (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-2">
          <p className="text-sm text-slate-500">No saved leads.</p>
          <Link to="/rep/qualified-leads" className="text-xs text-blue-400 hover:underline">
            Browse Assigned Leads
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
                  className="flex-1 py-1.5 bg-slate-850 hover:bg-slate-800 rounded text-center text-xs font-semibold text-slate-300 transition-colors"
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
