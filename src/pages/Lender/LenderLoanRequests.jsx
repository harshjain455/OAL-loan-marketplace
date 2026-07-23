import React, { useState } from "react";
import { Search, Filter, ShieldCheck, Award, Eye, Briefcase, Heart, CheckCircle2, X, Clock, Flame } from "lucide-react";

export default function LenderLoanRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState("all");
  const [savedLeads, setSavedLeads] = useState(["OAL-9842"]);

  // Modal States
  const [selectedLead, setSelectedLead] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  // Form State for Submit Offer
  const [offerAmount, setOfferAmount] = useState("");
  const [offerRate, setOfferRate] = useState("");
  const [offerDuration, setOfferDuration] = useState("");

  const loanRequestsList = [
    {
      id: "OAL-9842",
      score: 94,
      riskLevel: "Low Risk",
      creditGrade: "AA+",
      amount: "$75,000",
      purpose: "Commercial Real Estate",
      term: "24 Months",
      timePosted: "5 mins ago",
      debtToIncome: "22%",
      annualRevenue: "$650,000",
      targetRate: "6.5% - 8.0%",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" },
        { name: "Tax Filings & Audit Logs", status: "Verified" }
      ]
    },
    {
      id: "OAL-8843",
      score: 88,
      riskLevel: "Low Risk",
      creditGrade: "A",
      amount: "$45,000",
      purpose: "Equipment Financing",
      term: "12 Months",
      timePosted: "12 mins ago",
      debtToIncome: "18%",
      annualRevenue: "$320,000",
      targetRate: "7.0% - 9.0%",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" }
      ]
    },
    {
      id: "OAL-7210",
      score: 82,
      riskLevel: "Moderate Risk",
      creditGrade: "B+",
      amount: "$120,000",
      purpose: "Working Capital",
      term: "36 Months",
      timePosted: "35 mins ago",
      debtToIncome: "28%",
      annualRevenue: "$980,050",
      targetRate: "8.5% - 10.5%",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" }
      ]
    },
    {
      id: "OAL-6501",
      score: 91,
      riskLevel: "Low Risk",
      creditGrade: "AAA",
      amount: "$200,000",
      purpose: "Business Expansion",
      term: "48 Months",
      timePosted: "1 hour ago",
      debtToIncome: "15%",
      annualRevenue: "$1,450,000",
      targetRate: "6.0% - 7.5%",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" },
        { name: "Tax Filings & Audit Logs", status: "Verified" }
      ]
    },
    {
      id: "OAL-5912",
      score: 79,
      riskLevel: "Moderate Risk",
      creditGrade: "B-",
      amount: "$30,000",
      purpose: "Inventory Expansion",
      term: "12 Months",
      timePosted: "2 hours ago",
      debtToIncome: "32%",
      annualRevenue: "$210,000",
      targetRate: "9.0% - 11.0%",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" }
      ]
    },
    {
      id: "OAL-4108",
      score: 86,
      riskLevel: "Low Risk",
      creditGrade: "A+",
      amount: "$150,000",
      purpose: "Debt Consolidation",
      term: "36 Months",
      timePosted: "3 hours ago",
      debtToIncome: "20%",
      annualRevenue: "$890,000",
      targetRate: "7.2% - 8.8%",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" },
        { name: "Tax Filings & Audit Logs", status: "Verified" }
      ]
    }
  ];

  const toggleSave = (id) => {
    if (savedLeads.includes(id)) {
      setSavedLeads(savedLeads.filter((item) => item !== id));
    } else {
      setSavedLeads([...savedLeads, id]);
    }
  };

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

  const filteredRequests = loanRequestsList.filter((lead) => {
    const matchesSearch = lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPurpose = selectedPurpose === "all" || lead.purpose.toLowerCase().includes(selectedPurpose.toLowerCase());
    return matchesSearch && matchesPurpose;
  });

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
              <Clock size={22} className="animate-pulse" />
            </div>
            Loan Requests
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Live stream of active loan application posts submitted across the open marketplace.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Live Stream: <span className="text-emerald-400 font-bold">{filteredRequests.length} Active Posts</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800/80 p-4 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Lead ID or purpose..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 shrink-0 mr-1">
            <Filter size={13} />
            Purpose:
          </span>
          {[
            { id: "all", label: "All Requests" },
            { id: "commercial", label: "Commercial Real Estate" },
            { id: "equipment", label: "Equipment" },
            { id: "working", label: "Working Capital" },
            { id: "expansion", label: "Expansion" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedPurpose(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedPurpose === tab.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-950/30"
                  : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800/60">
              <tr>
                <th className="px-6 py-4 font-semibold">Lead ID (Anonymous)</th>
                <th className="px-6 py-4 font-semibold">Target Amount</th>
                <th className="px-6 py-4 font-semibold">Purpose & Term</th>
                <th className="px-6 py-4 font-semibold">iNV IQ Score</th>
                <th className="px-6 py-4 font-semibold">Time Posted</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredRequests.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-extrabold text-white text-sm">{lead.id}</span>
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <ShieldCheck size={11} />
                        Verified
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-extrabold text-white text-sm">
                    {lead.amount}
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-200">{lead.purpose}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{lead.term}</div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <Award size={15} className="text-indigo-400" />
                      <span>{lead.score}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">({lead.riskLevel})</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-400 font-medium">
                    {lead.timePosted}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {/* Heart / Save button */}
                      <button
                        onClick={() => toggleSave(lead.id)}
                        className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                          savedLeads.includes(lead.id)
                            ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:text-rose-400"
                        }`}
                        title={savedLeads.includes(lead.id) ? "Saved" : "Save Lead"}
                      >
                        <Heart size={15} className={savedLeads.includes(lead.id) ? "fill-rose-400" : ""} />
                      </button>

                      {/* View Profile Button */}
                      <button
                        onClick={() => openViewModal(lead)}
                        className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={15} />
                      </button>

                      {/* Submit Offer Button */}
                      <button
                        onClick={() => openOfferModal(lead)}
                        className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-colors shadow cursor-pointer"
                      >
                        <Briefcase size={14} />
                        Offer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500 text-sm">
                    No active loan requests match your current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW DETAILS MODAL */}
      {isViewModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-[2px] animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-start border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg font-bold text-white">{selectedLead.id}</h3>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <ShieldCheck size={12} />
                    Anonymous Borrower
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Marketplace Live Feed Applicant Profile</p>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

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
