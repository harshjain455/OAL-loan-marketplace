import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Compass, Clock, Search, Filter, Eye, Zap, Shield, Sparkles, Heart, 
  CheckCircle2, AlertCircle, ArrowRight, DollarSign, X, Lock, Unlock, UserCheck, MessageSquare 
} from "lucide-react";

export default function NetworkLiveMarketplace() {
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewRole, setViewRole] = useState("lender"); // 'lender' (anonymous) vs 'rep' (unmasked)
  const [selectedLeadModal, setSelectedLeadModal] = useState(null);
  const [bidModalLead, setBidModalLead] = useState(null);
  const [savedLeadsMap, setSavedLeadsMap] = useState({ "APP-9081": true });
  
  // Custom Bid Form State
  const [bidAmount, setBidAmount] = useState("");
  const [bidInterest, setBidInterest] = useState("8.5");
  const [bidTenure, setBidTenure] = useState("36");
  const [bidSuccessMsg, setBidSuccessMsg] = useState("");

  const liveApplications = [
    {
      id: "APP-9081",
      borrowerName: "TechVentures India Pvt Ltd",
      anonymousName: "Applicant #9081 [SME Tech]",
      amount: "₹45,00,000",
      tenure: "36 Months",
      purpose: "AI R&D & Equipment Expansion",
      invIqScore: "880 (A+ Verified)",
      kycStatus: "100% KYC Approved",
      isFresh: true,
      category: "fresh",
      elapsed: "2 mins ago",
      assignedRep: "Vikramaditya Roy (ADM-101)",
      lenderBidsCount: 4,
      topRate: "8.5% APR",
      colorCode: "border-emerald-500/80 shadow-emerald-950/40 bg-slate-900/90",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
    },
    {
      id: "APP-9079",
      borrowerName: "Verma Retail Chains",
      anonymousName: "Applicant #9079 [Retail Logistics]",
      amount: "₹18,50,000",
      tenure: "24 Months",
      purpose: "Inventory Working Capital",
      invIqScore: "820 (A Grade)",
      kycStatus: "KYC Verified",
      isFresh: false,
      category: "bidding",
      elapsed: "14 mins ago",
      assignedRep: "Amit Verma (REP-101)",
      lenderBidsCount: 3,
      topRate: "9.2% APR",
      colorCode: "border-blue-500/40 bg-slate-900/60",
      badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/40"
    },
    {
      id: "APP-9074",
      borrowerName: "Sharma Logistics & Freight",
      anonymousName: "Applicant #9074 [Fleet Motors]",
      amount: "₹60,00,000",
      tenure: "48 Months",
      purpose: "Commercial Vehicle Purchase",
      invIqScore: "910 (A+ Super Prime)",
      kycStatus: "Audit Complete",
      isFresh: false,
      category: "high_yield",
      elapsed: "42 mins ago",
      assignedRep: "Pooja Gupta (ADM-102)",
      lenderBidsCount: 7,
      topRate: "7.9% APR",
      colorCode: "border-purple-500/40 bg-slate-900/60",
      badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/40"
    },
    {
      id: "APP-9070",
      borrowerName: "Apollo Pharma Distributors",
      anonymousName: "Applicant #9070 [Pharma Supply]",
      amount: "₹25,00,000",
      tenure: "12 Months",
      purpose: "Short Term Working Capital",
      invIqScore: "790 (B+ Verified)",
      kycStatus: "KYC Pending Verification",
      isFresh: true,
      category: "fresh",
      elapsed: "4 mins ago",
      assignedRep: "Rajesh Kulkarni (ADM-103)",
      lenderBidsCount: 1,
      topRate: "10.5% APR",
      colorCode: "border-emerald-500/80 shadow-emerald-950/40 bg-slate-900/90",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
    }
  ];

  const filteredApps = liveApplications.filter(app => {
    const matchesSearch = app.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.anonymousName.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterCategory === "fresh") return matchesSearch && app.isFresh;
    if (filterCategory === "bidding") return matchesSearch && app.category === "bidding";
    if (filterCategory === "high_yield") return matchesSearch && app.category === "high_yield";
    return matchesSearch;
  });

  const toggleSaveLead = (id) => {
    setSavedLeadsMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSendBid = (e) => {
    e.preventDefault();
    setBidSuccessMsg(`Offer of ${bidAmount || bidModalLead?.amount} @ ${bidInterest}% APR successfully submitted for ${bidModalLead?.id}!`);
    setTimeout(() => {
      setBidSuccessMsg("");
      setBidModalLead(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Live Marketplace Socket Stream Connected
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">Live Marketplace View</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time incoming loan application feed with color-coded fresh applicant alerts.</p>
        </div>

        {/* Perspective Switcher (Lender vs OAL Rep View) */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setViewRole("lender")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              viewRole === "lender" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Lock size={13} />
            <span>Lender Mode (Anonymous)</span>
          </button>
          <button
            onClick={() => setViewRole("rep")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              viewRole === "rep" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Unlock size={13} />
            <span>OAL Rep Mode (Full Unmasked)</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Active Applications" },
            { id: "fresh", label: "● Fresh Applications (Color Coded)" },
            { id: "bidding", label: "In Active Bidding" },
            { id: "high_yield", label: "High Yield A+ Leads" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                filterCategory === tab.id
                  ? "bg-slate-100 text-slate-950 border-white shadow"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Live Marketplace Application Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredApps.map((app) => (
          <div 
            key={app.id}
            className={`p-6 border rounded-2xl relative transition-all duration-300 ${app.colorCode} space-y-4 hover:border-blue-500/60`}
          >
            {/* Crucial Fresh Notification Banner */}
            {app.isFresh && (
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 rounded-t-2xl animate-pulse" />
            )}

            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">{app.id}</span>
                  {app.isFresh && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      NEW FRESH APPLICATION
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-100 mt-1">
                  {viewRole === "rep" ? app.borrowerName : app.anonymousName}
                </h3>
                {viewRole === "rep" && (
                  <p className="text-[11px] text-purple-400 font-mono">Assigned Rep: {app.assignedRep}</p>
                )}
              </div>

              {/* Bookmark button */}
              <button
                onClick={() => toggleSaveLead(app.id)}
                className={`p-2 rounded-xl border transition-all ${
                  savedLeadsMap[app.id]
                    ? "bg-rose-500/20 border-rose-500/40 text-rose-400"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
                title={savedLeadsMap[app.id] ? "Saved in Bookmarks" : "Save Lead"}
              >
                <Heart size={16} fill={savedLeadsMap[app.id] ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Loan Specs Grid */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950/80 rounded-xl border border-slate-850 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Loan Amount</span>
                <p className="font-mono text-base font-black text-blue-400">{app.amount}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Requested Tenure</span>
                <p className="font-mono text-slate-200 font-bold">{app.tenure}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">iNV IQ™ Score</span>
                <p className="font-mono text-emerald-400 font-bold">{app.invIqScore}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Top Bid Rate</span>
                <p className="font-mono text-purple-400 font-bold">{app.topRate} ({app.lenderBidsCount} Bids)</p>
              </div>
            </div>

            {/* Loan Purpose & Timestamp Footer */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-850">
              <span className="text-slate-400 truncate max-w-[200px]">Purpose: {app.purpose}</span>
              <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1 shrink-0">
                <Clock size={12} /> {app.elapsed}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setSelectedLeadModal(app)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold rounded-xl border border-slate-700 text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Eye size={14} />
                <span>Inspect Lead</span>
              </button>

              <button
                onClick={() => {
                  setBidModalLead(app);
                  setBidAmount(app.amount);
                }}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/30 text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Zap size={14} />
                <span>Place Bid Offer</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* INSPECT LEAD MODAL */}
      {selectedLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold">{selectedLeadModal.id}</span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {viewRole === "rep" ? selectedLeadModal.borrowerName : selectedLeadModal.anonymousName}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedLeadModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">iNV IQ™ Algorithm Rating</span>
                <p className="text-sm font-bold text-emerald-400">{selectedLeadModal.invIqScore}</p>
                <p className="text-slate-400 text-[11px]">{selectedLeadModal.kycStatus}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-850">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Requested Amount</span>
                  <p className="text-base font-bold text-blue-400 font-mono">{selectedLeadModal.amount}</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-850">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Tenure</span>
                  <p className="text-base font-bold text-white font-mono">{selectedLeadModal.tenure}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Application Purpose</span>
                <p className="text-slate-200 mt-1">{selectedLeadModal.purpose}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedLeadModal(null)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PLACE BID OFFER MODAL */}
      {bidModalLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold">Place Lender Bid Offer</span>
                <h3 className="text-base font-bold text-white mt-0.5">{bidModalLead.id} - {bidModalLead.amount}</h3>
              </div>
              <button 
                onClick={() => setBidModalLead(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {bidSuccessMsg ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold text-center">
                {bidSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleSendBid} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Offered Loan Capital Amount</label>
                  <input
                    type="text"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-slate-100 font-mono font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Proposed Interest Rate (% APR)</label>
                  <input
                    type="text"
                    value={bidInterest}
                    onChange={(e) => setBidInterest(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-slate-100 font-mono font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Loan Tenure (Months)</label>
                  <select
                    value={bidTenure}
                    onChange={(e) => setBidTenure(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-slate-100 font-medium focus:outline-none focus:border-blue-500"
                  >
                    <option value="12">12 Months</option>
                    <option value="24">24 Months</option>
                    <option value="36">36 Months</option>
                    <option value="48">48 Months</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setBidModalLead(null)}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/30"
                  >
                    Submit Bid Proposal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
