import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, Bookmark, Search, Eye, Zap, Trash2, Edit3, MessageSquare, 
  CheckCircle2, Clock, DollarSign, Sparkles, Filter, X 
} from "lucide-react";

export default function NetworkSavedLeads() {
  const [savedLeads, setSavedLeads] = useState([
    {
      id: "APP-9081",
      borrowerName: "TechVentures India Pvt Ltd",
      anonymousTitle: "Applicant #9081 [SME Tech]",
      amount: "₹45,00,000",
      tenure: "36 Months",
      invIqScore: "880 (A+ Verified)",
      topBidRate: "8.5% APR",
      notes: "High cashflow SME. Preparing ₹45L proposal @ 8.2% APR for credit committee.",
      savedDate: "July 22, 2026",
      priority: "HIGH"
    },
    {
      id: "APP-9079",
      borrowerName: "Verma Retail Chains",
      anonymousTitle: "Applicant #9079 [Retail Logistics]",
      amount: "₹18,50,000",
      tenure: "24 Months",
      invIqScore: "820 (A Grade)",
      topBidRate: "9.2% APR",
      notes: "Awaiting Q2 GST statement upload before final bid release.",
      savedDate: "July 21, 2026",
      priority: "MEDIUM"
    },
    {
      id: "APP-9074",
      borrowerName: "Sharma Logistics & Freight",
      anonymousTitle: "Applicant #9074 [Fleet Motors]",
      amount: "₹60,00,000",
      tenure: "48 Months",
      invIqScore: "910 (A+ Super Prime)",
      topBidRate: "7.9% APR",
      notes: "Super prime lead. Competitive bidding active.",
      savedDate: "July 20, 2026",
      priority: "HIGH"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingNoteLead, setEditingNoteLead] = useState(null);
  const [newNoteText, setNewNoteText] = useState("");

  const removeBookmark = (id) => {
    setSavedLeads(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    setSavedLeads(prev => prev.map(item => item.id === editingNoteLead.id ? { ...item, notes: newNoteText } : item));
    setEditingNoteLead(null);
  };

  const filteredSaved = savedLeads.filter(lead => 
    lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.anonymousTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1">
              <Heart size={12} fill="currentColor" />
              Bookmarked Borrower Workspace
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">Saved Leads & Bidding Workspace</h1>
          <p className="text-xs text-slate-400 mt-1">Pin and monitor key borrower applications while preparing loan proposals.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs font-mono">
            <span className="text-slate-500 uppercase font-bold block text-[10px]">Total Bookmarked Capital</span>
            <span className="text-blue-400 font-black text-base">₹1.23 Crore</span>
          </div>
        </div>
      </div>

      {/* Toolbar & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300">
            Bookmarked Leads ({filteredSaved.length})
          </span>
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search saved leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {/* Saved Leads Cards Roster */}
      {filteredSaved.length === 0 ? (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <Heart size={36} className="mx-auto text-slate-600" />
          <p className="text-sm text-slate-400">No bookmarked leads in your workspace.</p>
          <Link to="/network/live-stream" className="inline-block px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl">
            Browse Live Marketplace Stream →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSaved.map((lead) => (
            <div key={lead.id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 hover:border-rose-500/40 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">{lead.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                      lead.priority === "HIGH" ? "bg-rose-500/10 text-rose-400 border border-rose-500/30" : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                    }`}>
                      {lead.priority} PRIORITY
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{lead.anonymousTitle}</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Bookmarked: {lead.savedDate}</p>
                </div>

                <button
                  onClick={() => removeBookmark(lead.id)}
                  className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-600 hover:text-white transition-colors"
                  title="Remove from bookmarks"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-850 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Loan Amount</span>
                  <p className="font-mono text-base font-black text-blue-400">{lead.amount}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">iNV IQ™ Rating</span>
                  <p className="font-mono text-emerald-400 font-bold">{lead.invIqScore}</p>
                </div>
              </div>

              {/* Private Workspace Notes Box */}
              <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase font-bold">
                  <span>Workspace Strategy Notes</span>
                  <button
                    onClick={() => {
                      setEditingNoteLead(lead);
                      setNewNoteText(lead.notes);
                    }}
                    className="text-blue-400 hover:underline flex items-center gap-1 lowercase"
                  >
                    <Edit3 size={10} /> edit note
                  </button>
                </div>
                <p className="text-xs text-slate-300 italic">{lead.notes}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 border-t border-slate-850">
                <Link
                  to={`/network/details?id=${lead.id}`}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye size={14} />
                  <span>Inspect Details</span>
                </Link>

                <Link
                  to="/network/live-stream"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/30"
                >
                  <Zap size={14} />
                  <span>Submit Bid</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT NOTE MODAL */}
      {editingNoteLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold">Workspace Private Note</span>
                <h3 className="text-base font-bold text-white mt-0.5">{editingNoteLead.id}</h3>
              </div>
              <button onClick={() => setEditingNoteLead(null)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Enter Strategy Note / Reminder</label>
                <textarea
                  rows={4}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Preparing 8.5% proposal for credit committee..."
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setEditingNoteLead(null)} className="w-full py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg">
                  Save Workspace Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
