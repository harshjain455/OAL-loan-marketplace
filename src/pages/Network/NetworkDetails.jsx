import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Eye, Shield, Lock, Unlock, FileText, CheckCircle2, AlertCircle, Clock, 
  DollarSign, Zap, MessageSquare, Heart, ArrowLeft, Cpu, Download, UserCheck, X 
} from "lucide-react";

export default function NetworkDetails() {
  const [searchParams] = useSearchParams();
  const leadIdQuery = searchParams.get("id") || "APP-9081";

  const [selectedAppId, setSelectedAppId] = useState(leadIdQuery);
  const [viewRole, setViewRole] = useState("lender"); // 'lender' (anonymous) vs 'rep' (unmasked)
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [bidInterest, setBidInterest] = useState("8.5");
  const [bidSuccess, setBidSuccess] = useState("");
  const [isSaved, setIsSaved] = useState(true);

  const applicationsData = {
    "APP-9081": {
      id: "APP-9081",
      borrowerName: "TechVentures India Pvt Ltd",
      anonymousTitle: "Applicant #9081 [SME Tech]",
      amount: "₹45,00,000",
      tenure: "36 Months",
      purpose: "AI R&D Infrastructure & High-Performance Hardware Expansion",
      invIqScore: "880",
      scoreGrade: "A+ Super Prime",
      kycStatus: "100% Verified",
      turnover: "₹3.8 Crore / year",
      gstNumber: "27AAACT1234F1Z5",
      appliedDate: "July 22, 2026",
      assignedRep: "Vikramaditya Roy (Super Admin)",
      bids: [
        { lenderId: "Lender Desk #104", rate: "8.5% APR", amount: "₹45,00,000", tenure: "36 Mos", date: "Today 10:14 AM" },
        { lenderId: "Lender Desk #809", rate: "8.8% APR", amount: "₹40,00,000", tenure: "36 Mos", date: "Today 09:30 AM" }
      ],
      kycDocs: [
        { name: "PAN Card & Aadhaar Proof", status: "VERIFIED" },
        { name: "12-Month Audited Bank Statement", status: "VERIFIED" },
        { name: "GST Certificate & Tax Filings", status: "VERIFIED" },
        { name: "Board Resolution & Office Lease", status: "VERIFIED" }
      ]
    },
    "APP-9079": {
      id: "APP-9079",
      borrowerName: "Verma Retail Chains",
      anonymousTitle: "Applicant #9079 [Retail Logistics]",
      amount: "₹18,50,000",
      tenure: "24 Months",
      purpose: "Inventory Working Capital & Seasonal Festival Stocking",
      invIqScore: "820",
      scoreGrade: "A Grade",
      kycStatus: "KYC Approved",
      turnover: "₹1.8 Crore / year",
      gstNumber: "07AABCV5678K1Z2",
      appliedDate: "July 21, 2026",
      assignedRep: "Amit Verma (REP-101)",
      bids: [
        { lenderId: "Lender Desk #302", rate: "9.2% APR", amount: "₹18,50,000", tenure: "24 Mos", date: "Yesterday 04:20 PM" }
      ],
      kycDocs: [
        { name: "PAN Card & Identity Proof", status: "VERIFIED" },
        { name: "Bank Statements (6 Months)", status: "VERIFIED" },
        { name: "Shop Establishment License", status: "VERIFIED" }
      ]
    },
    "APP-9074": {
      id: "APP-9074",
      borrowerName: "Sharma Logistics & Freight",
      anonymousTitle: "Applicant #9074 [Fleet Motors]",
      amount: "₹60,00,000",
      tenure: "48 Months",
      purpose: "Commercial Vehicle Purchase & Fleet Fleet Modernization",
      invIqScore: "910",
      scoreGrade: "A+ Super Prime",
      kycStatus: "100% Audit Complete",
      turnover: "₹6.4 Crore / year",
      gstNumber: "09AAACS9012M1Z8",
      appliedDate: "July 20, 2026",
      assignedRep: "Pooja Gupta (ADM-102)",
      bids: [
        { lenderId: "Lender Desk #104", rate: "7.9% APR", amount: "₹60,00,000", tenure: "48 Mos", date: "July 20 11:00 AM" },
        { lenderId: "Lender Desk #512", rate: "8.1% APR", amount: "₹50,00,000", tenure: "48 Mos", date: "July 20 02:40 PM" }
      ],
      kycDocs: [
        { name: "Commercial Transport Registration", status: "VERIFIED" },
        { name: "Audited Balance Sheets (2 Yrs)", status: "VERIFIED" }
      ]
    }
  };

  const app = applicationsData[selectedAppId] || applicationsData["APP-9081"];

  const handleSendBid = (e) => {
    e.preventDefault();
    setBidSuccess(`Offer of ${bidAmount || app.amount} @ ${bidInterest}% APR successfully submitted!`);
    setTimeout(() => {
      setBidSuccess("");
      setBidModalOpen(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center gap-3">
          <Link to="/network/live-stream" className="p-2 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800 rounded-xl transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                Application Deep-Dive Parameters
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-100">
              {viewRole === "rep" ? app.borrowerName : app.anonymousTitle}
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">Application Reference ID: {app.id} • Applied {app.appliedDate}</p>
          </div>
        </div>

        {/* Perspective Switcher */}
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

      {/* Select Application Roster Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {Object.keys(applicationsData).map(id => (
          <button
            key={id}
            onClick={() => setSelectedAppId(id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              selectedAppId === id 
                ? "bg-slate-100 text-slate-950 border-white shadow-md" 
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            {id} ({applicationsData[id].amount})
          </button>
        ))}
      </div>

      {/* Main Parameters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Loan Specs & KYC Verification */}
        <div className="lg:col-span-8 space-y-6">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Requested Capital</span>
              <p className="text-2xl font-black text-blue-400 font-mono">{app.amount}</p>
              <p className="text-[11px] text-slate-400">Tenure: {app.tenure}</p>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold">iNV IQ™ Score</span>
              <p className="text-2xl font-black text-emerald-400 font-mono">{app.invIqScore}</p>
              <p className="text-[11px] text-emerald-400 font-semibold">{app.scoreGrade}</p>
            </div>

            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold">KYC & Audit Status</span>
              <p className="text-base font-bold text-white flex items-center gap-1 mt-1">
                <CheckCircle2 size={16} className="text-emerald-400" />
                {app.kycStatus}
              </p>
              <p className="text-[11px] text-slate-400">Turnover: {app.turnover}</p>
            </div>
          </div>

          {/* Loan Purpose & Business Overview */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-base font-bold text-white">Loan Purpose & Business Context</h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-850">
              {app.purpose}
            </p>
            {viewRole === "rep" && (
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xs space-y-1 text-purple-300">
                <p className="font-bold">OAL Rep Escalation Notes:</p>
                <p>Assigned Representative: {app.assignedRep}. Borrower GST Number: {app.gstNumber}.</p>
              </div>
            )}
          </div>

          {/* KYC Document Verification Checklist */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center justify-between">
              <span>KYC & Financial Documents Assessment</span>
              <span className="text-xs text-emerald-400 font-mono font-bold">All 4 Checkpoints Clear</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {app.kycDocs.map((doc, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{doc.name}</span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded">
                    ✓ Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Active Bids & Action Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Action Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Lender Bidding Console</h3>

            <button
              onClick={() => {
                setBidAmount(app.amount);
                setBidModalOpen(true);
              }}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/30 text-xs transition-all flex items-center justify-center gap-2"
            >
              <Zap size={16} />
              <span>Submit Custom Bid Offer</span>
            </button>

            <Link
              to="/network/communication"
              className="w-full py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold rounded-xl border border-slate-700 text-xs transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare size={16} className="text-purple-400" />
              <span>LetsWork™ 3-Way Chat Room</span>
            </Link>

            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`w-full py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                isSaved ? "bg-rose-500/20 text-rose-400 border-rose-500/40" : "bg-slate-950 text-slate-400 border-slate-800"
              }`}
            >
              <Heart size={14} fill={isSaved ? "currentColor" : "none"} />
              <span>{isSaved ? "Saved in Bookmarks" : "Bookmark Lead"}</span>
            </button>
          </div>

          {/* Active Bids Table */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-white">Active Lender Bids ({app.bids.length})</h3>
            <div className="space-y-2">
              {app.bids.map((b, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between font-mono font-bold text-slate-300">
                    <span>{b.lenderId}</span>
                    <span className="text-purple-400">{b.rate}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>{b.amount} ({b.tenure})</span>
                    <span>{b.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BID MODAL */}
      {bidModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold">Submit Bid Offer</span>
                <h3 className="text-base font-bold text-white mt-0.5">{app.id} - {app.amount}</h3>
              </div>
              <button onClick={() => setBidModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {bidSuccess ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold text-center">
                {bidSuccess}
              </div>
            ) : (
              <form onSubmit={handleSendBid} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Loan Capital Amount</label>
                  <input
                    type="text"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-slate-100 font-mono font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Interest Rate (% APR)</label>
                  <input
                    type="text"
                    value={bidInterest}
                    onChange={(e) => setBidInterest(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-slate-100 font-mono font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="pt-2 flex gap-3">
                  <button type="button" onClick={() => setBidModalOpen(false)} className="w-full py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl">
                    Cancel
                  </button>
                  <button type="submit" className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl shadow-lg">
                    Submit Proposal
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
