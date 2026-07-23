import React, { useState } from "react";
import { Eye, Heart, Briefcase, Search, Filter, ShieldCheck, Award, X, CheckCircle2, DollarSign, Calendar, TrendingUp, ShieldAlert } from "lucide-react";

export default function LenderQualifiedLeads() {
  const [savedLeads, setSavedLeads] = useState(["OAL-9842"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("All");

  // Modal States
  const [selectedLead, setSelectedLead] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  // Form State for Submit Offer
  const [offerAmount, setOfferAmount] = useState("");
  const [offerRate, setOfferRate] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 5000);
  };
  const [offerDuration, setOfferDuration] = useState("");

  const leads = [
    {
      id: "OAL-9842",
      score: 94,
      riskLevel: "Low Risk",
      amount: "$75,000",
      purpose: "Commercial Real Estate",
      term: "24 Months",
      matchRate: "96%",
      kycStatus: "Verified",
      dateAdded: "Today",
      targetRate: "6.5% - 8.0%",
      creditGrade: "AA+",
      debtToIncome: "22%",
      annualRevenue: "$650,000",
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
      amount: "$45,000",
      purpose: "Equipment Financing",
      term: "12 Months",
      matchRate: "92%",
      kycStatus: "Verified",
      dateAdded: "Yesterday",
      targetRate: "7.0% - 9.0%",
      creditGrade: "A",
      debtToIncome: "18%",
      annualRevenue: "$320,000",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" }
      ]
    },
    {
      id: "OAL-7210",
      score: 82,
      riskLevel: "Moderate Risk",
      amount: "$120,000",
      purpose: "Working Capital",
      term: "36 Months",
      matchRate: "89%",
      kycStatus: "Verified",
      dateAdded: "2 days ago",
      targetRate: "8.5% - 10.5%",
      creditGrade: "B+",
      debtToIncome: "28%",
      annualRevenue: "$980,050",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" },
        { name: "Tax Filings & Audit Logs", status: "Verified" }
      ]
    },
    {
      id: "OAL-6501",
      score: 91,
      riskLevel: "Low Risk",
      amount: "$200,000",
      purpose: "Business Expansion",
      term: "48 Months",
      matchRate: "94%",
      kycStatus: "Verified",
      dateAdded: "3 days ago",
      targetRate: "6.0% - 7.5%",
      creditGrade: "AAA",
      debtToIncome: "15%",
      annualRevenue: "$1,450,000",
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
      amount: "$30,000",
      purpose: "Inventory Expansion",
      term: "12 Months",
      matchRate: "84%",
      kycStatus: "Verified",
      dateAdded: "3 days ago",
      targetRate: "9.0% - 11.0%",
      creditGrade: "B-",
      debtToIncome: "32%",
      annualRevenue: "$210,000",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" }
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
    // Pre-fill default values from selected lead info
    setOfferAmount(lead.amount.replace(/[^0-9]/g, ""));
    setOfferRate("");
    setOfferDuration(lead.term.replace(/[^0-9]/g, ""));
    setIsOfferModalOpen(true);
  };

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    if (!offerAmount || !offerRate || !offerDuration) {
      showToast("Please fill in all offer terms");
      return;
    }
    showToast(`Offer successfully submitted for Lead ${selectedLead.id}!\nAmount: $${Number(offerAmount).toLocaleString()}\nInterest Rate: ${offerRate}%\nDuration: ${offerDuration} Months`);
    setIsOfferModalOpen(false);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPurpose = purposeFilter === "All" || lead.purpose === purposeFilter;
    return matchesSearch && matchesPurpose;
  });

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Qualified Leads</h1>
          <p className="text-sm text-slate-400 mt-1">
            Pre-screened, anonymous borrower profiles matching your custom AI lending rules.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg text-xs text-indigo-400 font-medium">
          <ShieldCheck size={16} />
          Borrower Identity Protection Enabled
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search Lead ID or Purpose..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <Filter size={16} className="text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Purpose:</span>
          <select
            value={purposeFilter}
            onChange={(e) => setPurposeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="All">All Purposes</option>
            <option value="Commercial Real Estate">Commercial Real Estate</option>
            <option value="Equipment Financing">Equipment Financing</option>
            <option value="Working Capital">Working Capital</option>
            <option value="Business Expansion">Business Expansion</option>
            <option value="Inventory Expansion">Inventory Expansion</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900/80 border border-slate-800/85 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-350">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800/60">
              <tr>
                <th className="px-6 py-4 font-semibold">Lead ID (Anonymous)</th>
                <th className="px-6 py-4 font-semibold">iNV IQ Score</th>
                <th className="px-6 py-4 font-semibold">Loan Requirement</th>
                <th className="px-6 py-4 font-semibold">Purpose & Term</th>
                <th className="px-6 py-4 font-semibold">AI Match Rate</th>
                <th className="px-6 py-4 font-semibold">KYC Status</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredLeads.map((lead) => {
                const isSaved = savedLeads.includes(lead.id);
                return (
                  <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {lead.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Award size={16} className="text-indigo-400" />
                        <span className="font-bold text-white text-sm">{lead.score}</span>
                        <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded font-medium ml-1">
                          {lead.riskLevel}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-100 text-sm">
                      {lead.amount}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-200">{lead.purpose}</div>
                      <div className="text-[11px] text-slate-500">{lead.term}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {lead.matchRate}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                        <ShieldCheck size={14} />
                        {lead.kycStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Bookmark/Save button */}
                        <button
                          onClick={() => toggleSave(lead.id)}
                          title={isSaved ? "Remove from Saved" : "Save Lead"}
                          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                            isSaved
                              ? "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:text-rose-450 hover:border-slate-700"
                          }`}
                        >
                          <Heart size={15} fill={isSaved ? "currentColor" : "none"} />
                        </button>

                        {/* View details - Opens Modal */}
                        <button
                          onClick={() => openViewModal(lead)}
                          className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>

                        {/* Submit offer - Opens Modal */}
                        <button
                          onClick={() => openOfferModal(lead)}
                          className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-3 py-1.5 rounded-lg transition-colors shadow cursor-pointer font-semibold"
                        >
                          <Briefcase size={14} />
                          Offer
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500 text-sm">
                    No leads found matching your search criteria.
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
                <p className="text-xs text-slate-400 mt-1">Pre-screened financial profile lookup</p>
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
              {/* Score breakdown bar */}
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

              {/* Grid data */}
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

              {/* KYC Checklist */}
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
            </div>

            {/* Footer Actions */}
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
            {/* Header */}
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

            {/* Form */}
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
                <span>By submitting, the terms will be forwarded to OAL Agent waiting room. Lender maintains control to edit or withdraw active offers.</span>
              </div>

              {/* Footer Actions */}
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
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-emerald-500 text-slate-100 p-4 rounded-xl shadow-2xl flex items-start gap-2 z-50 text-xs animate-bounce max-w-sm whitespace-pre-line">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
