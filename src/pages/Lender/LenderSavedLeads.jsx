import React, { useState } from "react";
import { Search, ShieldCheck, Award, Eye, Briefcase, Heart, CheckCircle2, X, Bookmark, Trash2, AlertTriangle } from "lucide-react";

export default function LenderSavedLeads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [savedLeadsList, setSavedLeadsList] = useState([
    {
      id: "OAL-9842",
      score: 94,
      riskLevel: "Low Risk",
      creditGrade: "AA+",
      amount: "$75,000",
      purpose: "Commercial Real Estate",
      term: "24 Months",
      timeSaved: "Saved 2 hours ago",
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
      id: "OAL-6501",
      score: 91,
      riskLevel: "Low Risk",
      creditGrade: "AAA",
      amount: "$200,000",
      purpose: "Business Expansion",
      term: "48 Months",
      timeSaved: "Saved yesterday",
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
      id: "OAL-8843",
      score: 88,
      riskLevel: "Low Risk",
      creditGrade: "A",
      amount: "$45,000",
      purpose: "Equipment Financing",
      term: "12 Months",
      timeSaved: "Saved 3 days ago",
      debtToIncome: "18%",
      annualRevenue: "$320,000",
      targetRate: "7.0% - 9.0%",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" }
      ]
    }
  ]);

  // Modal States
  const [selectedLead, setSelectedLead] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);

  // Form State for Submit Offer
  const [offerAmount, setOfferAmount] = useState("");
  const [offerRate, setOfferRate] = useState("");
  const [offerDuration, setOfferDuration] = useState("");

  const promptDeleteSavedLead = (lead) => {
    setLeadToDelete(lead);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteSavedLead = () => {
    if (leadToDelete) {
      setSavedLeadsList(savedLeadsList.filter((lead) => lead.id !== leadToDelete.id));
      setIsDeleteModalOpen(false);
      setLeadToDelete(null);
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

  const filteredSavedLeads = savedLeadsList.filter((lead) =>
    lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">
              <Bookmark size={22} />
            </div>
            Saved Leads
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Your bookmarked borrower profiles pinned for custom review and offer generation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs text-slate-300">
            Saved Count: <span className="text-rose-400 font-extrabold">{savedLeadsList.length} Pinned Leads</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800/80 p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search saved leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>
      </div>

      {/* Bookmarked Leads Table */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800/60">
              <tr>
                <th className="px-6 py-4 font-semibold">Lead ID (Anonymous)</th>
                <th className="px-6 py-4 font-semibold">Target Amount</th>
                <th className="px-6 py-4 font-semibold">Purpose & Term</th>
                <th className="px-6 py-4 font-semibold">iNV IQ Score</th>
                <th className="px-6 py-4 font-semibold">Bookmark Status</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredSavedLeads.map((lead) => (
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
                    <span className="text-[10px] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 w-fit">
                      <Heart size={12} className="fill-rose-400" />
                      {lead.timeSaved}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {/* Unsave / Delete button */}
                      <button
                        onClick={() => promptDeleteSavedLead(lead)}
                        className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-colors cursor-pointer"
                        title="Remove from Saved"
                      >
                        <Trash2 size={15} />
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

              {filteredSavedLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-slate-500 text-sm">
                    No bookmarked leads found. You can bookmark leads from Qualified Leads or Loan Requests!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && leadToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-[2px] animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl relative overflow-hidden flex flex-col text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Remove Saved Lead?</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Are you sure you want to remove <span className="text-white font-bold">{leadToDelete.id}</span> from your bookmarked list?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteSavedLead}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer text-xs font-semibold shadow-lg shadow-rose-950/30"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
                <p className="text-xs text-slate-400 mt-1">Bookmarked Lead Profile Lookup</p>
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
