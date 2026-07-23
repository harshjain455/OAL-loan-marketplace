import React, { useState } from "react";
import { Award, ShieldCheck, Eye, Briefcase, Trophy, Flame, ArrowUpRight, CheckCircle2, X, DollarSign, TrendingUp, Filter } from "lucide-react";

export default function LenderBorrowerRankings() {
  const [sortBy, setSortBy] = useState("score");
  const [savedLeads, setSavedLeads] = useState(["OAL-9842"]);

  // Modal States
  const [selectedLead, setSelectedLead] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  // Form State for Submit Offer
  const [offerAmount, setOfferAmount] = useState("");
  const [offerRate, setOfferRate] = useState("");
  const [offerDuration, setOfferDuration] = useState("");

  const rankedBorrowers = [
    {
      rank: 1,
      id: "OAL-9842",
      score: 94,
      riskLevel: "Low Risk",
      creditGrade: "AA+",
      amount: "$75,000",
      purpose: "Commercial Real Estate",
      term: "24 Months",
      matchRate: "96%",
      debtToIncome: "22%",
      annualRevenue: "$650,000",
      kycStatus: "Verified",
      targetRate: "6.5% - 8.0%",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" },
        { name: "Tax Filings & Audit Logs", status: "Verified" }
      ]
    },
    {
      rank: 2,
      id: "OAL-6501",
      score: 91,
      riskLevel: "Low Risk",
      creditGrade: "AAA",
      amount: "$200,000",
      purpose: "Business Expansion",
      term: "48 Months",
      matchRate: "94%",
      debtToIncome: "15%",
      annualRevenue: "$1,450,000",
      kycStatus: "Verified",
      targetRate: "6.0% - 7.5%",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" },
        { name: "Tax Filings & Audit Logs", status: "Verified" }
      ]
    },
    {
      rank: 3,
      id: "OAL-8843",
      score: 88,
      riskLevel: "Low Risk",
      creditGrade: "A",
      amount: "$45,000",
      purpose: "Equipment Financing",
      term: "12 Months",
      matchRate: "92%",
      debtToIncome: "18%",
      annualRevenue: "$320,000",
      kycStatus: "Verified",
      targetRate: "7.0% - 9.0%",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" }
      ]
    },
    {
      rank: 4,
      id: "OAL-7210",
      score: 82,
      riskLevel: "Moderate Risk",
      creditGrade: "B+",
      amount: "$120,000",
      purpose: "Working Capital",
      term: "36 Months",
      matchRate: "89%",
      debtToIncome: "28%",
      annualRevenue: "$980,050",
      kycStatus: "Verified",
      targetRate: "8.5% - 10.5%",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" }
      ]
    },
    {
      rank: 5,
      id: "OAL-5912",
      score: 79,
      riskLevel: "Moderate Risk",
      creditGrade: "B-",
      amount: "$30,000",
      purpose: "Inventory Expansion",
      term: "12 Months",
      matchRate: "84%",
      debtToIncome: "32%",
      annualRevenue: "$210,000",
      kycStatus: "Verified",
      targetRate: "9.0% - 11.0%",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" }
      ]
    }
  ];

  const sortedBorrowers = [...rankedBorrowers].sort((a, b) => {
    if (sortBy === "score") return b.score - a.score;
    if (sortBy === "amount") {
      const numA = parseInt(a.amount.replace(/[^0-9]/g, ""), 10);
      const numB = parseInt(b.amount.replace(/[^0-9]/g, ""), 10);
      return numB - numA;
    }
    if (sortBy === "dti") {
      const dtiA = parseInt(a.debtToIncome.replace(/[^0-9]/g, ""), 10);
      const dtiB = parseInt(b.debtToIncome.replace(/[^0-9]/g, ""), 10);
      return dtiA - dtiB;
    }
    return 0;
  });

  const openViewModal = (lead) => {
    setSelectedLead(lead);
    setIsViewModalOpen(true);
  };

  const openOfferModal = (lead) => {
    setSelectedLead(lead);
    setOfferAmount(lead.amount.replace(/[^0-9]/g, ""));
    setOfferRate("");
    setOfferDuration(lead.term.replace(/[^0-9]/g, ""));
    setIsOfferModalOpen(true);
  };

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    if (!offerAmount || !offerRate || !offerDuration) {
      alert("Please fill in all offer terms");
      return;
    }
    alert(`Offer successfully submitted for Lead ${selectedLead.id}!\nAmount: $${Number(offerAmount).toLocaleString()}\nInterest Rate: ${offerRate}%\nDuration: ${offerDuration} Months`);
    setIsOfferModalOpen(false);
  };

  // Top 3 Podium
  const top1 = rankedBorrowers.find((b) => b.rank === 1);
  const top2 = rankedBorrowers.find((b) => b.rank === 2);
  const top3 = rankedBorrowers.find((b) => b.rank === 3);

  return (
    <div className="space-y-8 animate-fade-in text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
              <Trophy size={22} />
            </div>
            Borrower Rankings – [ iNV IQ ]
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Custom AI scoring leaderboard ranking applicants by creditworthiness and risk grade.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs text-slate-300">
          <Flame size={16} className="text-amber-400" />
          Formula Model: <span className="text-amber-400 font-bold">iNV IQ v2.4 Active</span>
        </div>
      </div>

      {/* TOP 3 SPOTLIGHT PODIUM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* #2 Rank Card */}
        {top2 && (
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-black flex items-center justify-center shadow">
                #2
              </span>
              <span className="text-xs font-extrabold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Award size={14} />
                {top2.score} iNV IQ
              </span>
            </div>

            <div className="mt-4">
              <div className="text-lg font-black text-white">{top2.id}</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">{top2.purpose}</div>
              <div className="text-sm font-extrabold text-emerald-400 mt-2">{top2.amount} / {top2.term}</div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800/50 flex gap-2">
              <button
                onClick={() => openViewModal(top2)}
                className="flex-1 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer text-center"
              >
                View
              </button>
              <button
                onClick={() => openOfferModal(top2)}
                className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Offer
              </button>
            </div>
          </div>
        )}

        {/* #1 Rank Card (Gold Highlighted) */}
        {top1 && (
          <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between transform md:-translate-y-2 group hover:border-amber-500/60 transition-all">
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-lg">
              Top Rated Applicant
            </div>

            <div className="flex justify-between items-start">
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 text-sm font-black flex items-center justify-center shadow-lg shadow-amber-500/20">
                #1
              </span>
              <span className="text-xs font-extrabold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-lg flex items-center gap-1">
                <Award size={15} />
                {top1.score} iNV IQ
              </span>
            </div>

            <div className="mt-4">
              <div className="text-xl font-black text-white">{top1.id}</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">{top1.purpose}</div>
              <div className="text-base font-black text-emerald-400 mt-2">{top1.amount} / {top1.term}</div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800/60 flex gap-2">
              <button
                onClick={() => openViewModal(top1)}
                className="flex-1 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer text-center"
              >
                View Profile
              </button>
              <button
                onClick={() => openOfferModal(top1)}
                className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-colors cursor-pointer text-center shadow-lg shadow-amber-500/20"
              >
                Make Offer
              </button>
            </div>
          </div>
        )}

        {/* #3 Rank Card */}
        {top3 && (
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-black flex items-center justify-center shadow">
                #3
              </span>
              <span className="text-xs font-extrabold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Award size={14} />
                {top3.score} iNV IQ
              </span>
            </div>

            <div className="mt-4">
              <div className="text-lg font-black text-white">{top3.id}</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">{top3.purpose}</div>
              <div className="text-sm font-extrabold text-emerald-400 mt-2">{top3.amount} / {top3.term}</div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800/50 flex gap-2">
              <button
                onClick={() => openViewModal(top3)}
                className="flex-1 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer text-center"
              >
                View
              </button>
              <button
                onClick={() => openOfferModal(top3)}
                className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Offer
              </button>
            </div>
          </div>
        )}
      </div>

      {/* LEADERBOARD GRID */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl space-y-4 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/60 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">iNV IQ Leaderboard Rankings</h2>
            <p className="text-xs text-slate-400 mt-0.5">Full ranked table based on custom AI scoring parameters</p>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={15} className="text-slate-400" />
            <span className="text-xs text-slate-400 font-semibold">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3.5 py-2 focus:outline-none font-semibold cursor-pointer"
            >
              <option value="score">iNV IQ Score (Highest)</option>
              <option value="amount">Loan Amount (Highest)</option>
              <option value="dti">Lowest Debt-to-Income</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800/60">
              <tr>
                <th className="px-6 py-4 font-semibold text-center w-16">Rank</th>
                <th className="px-6 py-4 font-semibold">Lead ID (Anonymous)</th>
                <th className="px-6 py-4 font-semibold">iNV IQ Score</th>
                <th className="px-6 py-4 font-semibold">Risk Rating</th>
                <th className="px-6 py-4 font-semibold">Loan Requirement</th>
                <th className="px-6 py-4 font-semibold">DTI Ratio</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {sortedBorrowers.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4 text-center">
                    <span className={`w-7 h-7 rounded-full text-xs font-black inline-flex items-center justify-center ${
                      lead.rank === 1 ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
                      lead.rank === 2 ? "bg-slate-800 text-slate-200 border border-slate-700" :
                      lead.rank === 3 ? "bg-amber-900/20 text-amber-400 border border-amber-800/30" :
                      "bg-slate-950 text-slate-400 border border-slate-850"
                    }`}>
                      #{lead.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">
                    {lead.id}
                  </td>
                  <td className="px-6 py-4 font-black text-white">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-indigo-400" />
                      <span className="text-sm font-extrabold">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {lead.riskLevel} ({lead.creditGrade})
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">
                    {lead.amount} <span className="text-[11px] text-slate-500 font-medium">/ {lead.term}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-300">
                    {lead.debtToIncome}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {/* View Profile Button */}
                      <button
                        onClick={() => openViewModal(lead)}
                        className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={15} />
                      </button>

                      {/* Submit Offer Button */}
                      <button
                        onClick={() => openOfferModal(lead)}
                        className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors shadow cursor-pointer"
                      >
                        <Briefcase size={14} />
                        Offer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW DETAILS MODAL */}
      {isViewModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-[2px] animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg font-bold text-white">{selectedLead.id}</h3>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <ShieldCheck size={12} />
                    Anonymous Borrower
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">iNV IQ Rank #{selectedLead.rank} Financial Profile</p>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto py-5 space-y-5 no-scrollbar pr-1">
              <div className="bg-slate-950/50 border border-slate-800/60 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg">
                    <Award size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-450 uppercase tracking-wider font-semibold block">iNV IQ AI Score</span>
                    <span className="text-xl font-black text-white">{selectedLead.score}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                  {selectedLead.riskLevel}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/30 border border-slate-800/50 p-4 rounded-xl space-y-2.5">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Loan Requirement</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-850 pb-1.5">
                      <span className="text-slate-400">Target Amount</span>
                      <span className="font-bold text-white">{selectedLead.amount}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-850 pb-1.5">
                      <span className="text-slate-400">Preferred Term</span>
                      <span className="font-semibold text-slate-200">{selectedLead.term}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Rate</span>
                      <span className="font-semibold text-indigo-400">{selectedLead.targetRate}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/30 border border-slate-800/50 p-4 rounded-xl space-y-2.5">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Financial Risk Metrics</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-850 pb-1.5">
                      <span className="text-slate-400">Credit Score Grade</span>
                      <span className="font-bold text-emerald-400">{selectedLead.creditGrade}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-850 pb-1.5">
                      <span className="text-slate-400">Debt-to-Income (DTI)</span>
                      <span className="font-semibold text-slate-200">{selectedLead.debtToIncome}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Annual Business Revenue</span>
                      <span className="font-semibold text-slate-200">{selectedLead.annualRevenue}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedLead.kycDocuments && (
                <div className="bg-slate-950/30 border border-slate-800/50 p-4 rounded-xl">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">KYC Verification Audit</h4>
                  <div className="space-y-2 text-xs">
                    {selectedLead.kycDocuments.map((doc, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-slate-400">{doc.name}</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                          <CheckCircle2 size={11} />
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800/80 pt-4 flex items-center justify-end gap-3 mt-auto">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  openOfferModal(selectedLead);
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5"
              >
                <Briefcase size={14} />
                Make Offer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMIT OFFER MODAL */}
      {isOfferModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-[2px] animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden flex flex-col">
            <div className="flex justify-between items-start border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
                    <Briefcase size={16} />
                  </div>
                  Submit Bid Offer
                </h3>
                <p className="text-xs text-slate-400 mt-1">Deploy custom terms directly to Lead {selectedLead.id}</p>
              </div>
              <button
                onClick={() => setIsOfferModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitOffer} className="space-y-4 py-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">Target Lead</label>
                <input
                  type="text"
                  value={selectedLead.id}
                  disabled
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-400 text-xs font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">Offer Amount ($)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">$</span>
                  <input
                    type="number"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    required
                    placeholder="e.g. 75000"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-8 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={offerRate}
                    onChange={(e) => setOfferRate(e.target.value)}
                    required
                    placeholder="e.g. 7.2"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">Duration (Months)</label>
                  <input
                    type="number"
                    value={offerDuration}
                    onChange={(e) => setOfferDuration(e.target.value)}
                    required
                    placeholder="e.g. 24"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 text-[10px] text-slate-450 flex items-start gap-2">
                <ShieldCheck size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                <span>Terms will be forwarded to OAL Agent waiting room. Lender maintains exclusive offer control.</span>
              </div>

              <div className="border-t border-slate-800/80 pt-4 flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer text-xs font-semibold"
                >
                  Forward Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
