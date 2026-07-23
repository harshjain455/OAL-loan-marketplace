import React, { useState } from "react";
import { 
  Briefcase, Lock, Unlock, Plus, Edit3, Trash2, Share2, CheckCircle2, 
  AlertCircle, DollarSign, Clock, X, FileText, Zap, ShieldAlert 
} from "lucide-react";

export default function NetworkOfferManagement() {
  const [viewRole, setViewRole] = useState("lender"); // 'lender' (Edit access) vs 'rep' (Strictly View-Only)
  const [createOfferModal, setCreateOfferModal] = useState(false);
  const [editOfferModal, setEditOfferModal] = useState(null);
  const [withdrawOfferModal, setWithdrawOfferModal] = useState(null);
  const [shareSuccessMsg, setShareSuccessMsg] = useState("");
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");

  // Form State
  const [formAppId, setFormAppId] = useState("APP-9081");
  const [formAmount, setFormAmount] = useState("4500000");
  const [formRate, setFormRate] = useState("8.5");
  const [formTenure, setFormTenure] = useState("36");

  const [offersList, setOffersList] = useState([
    {
      id: "OFR-8801",
      appId: "APP-9081",
      borrower: "TechVentures India Pvt Ltd",
      anonymousTitle: "Applicant #9081 [SME Tech]",
      amount: "₹45,00,000",
      rawAmount: 4500000,
      rate: "8.5",
      tenure: "36 Months",
      status: "PENDING_BORROWER",
      statusText: "Pending Acceptance",
      submittedDate: "Today, 10:14 AM",
      lenderDesk: "Lender Desk #104 (Your Offer)"
    },
    {
      id: "OFR-8802",
      appId: "APP-9079",
      borrower: "Verma Retail Chains",
      anonymousTitle: "Applicant #9079 [Retail Logistics]",
      amount: "₹18,50,000",
      rawAmount: 1850000,
      rate: "9.2",
      tenure: "24 Months",
      status: "ACCEPTED",
      statusText: "Accepted by Borrower",
      submittedDate: "Yesterday, 04:20 PM",
      lenderDesk: "Lender Desk #104 (Your Offer)"
    },
    {
      id: "OFR-8803",
      appId: "APP-9074",
      borrower: "Sharma Logistics & Freight",
      anonymousTitle: "Applicant #9074 [Fleet Motors]",
      amount: "₹60,00,000",
      rawAmount: 6000000,
      rate: "7.9",
      tenure: "48 Months",
      status: "PENDING_BORROWER",
      statusText: "Pending Acceptance",
      submittedDate: "July 20, 2026",
      lenderDesk: "Lender Desk #809"
    }
  ]);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newOffer = {
      id: `OFR-${Math.floor(8800 + Math.random() * 100)}`,
      appId: formAppId,
      borrower: formAppId === "APP-9081" ? "TechVentures India Pvt Ltd" : "Apollo Pharma Distributors",
      anonymousTitle: `Applicant #${formAppId.split("-")[1]} [Verified]`,
      amount: `₹${(Number(formAmount)/100000).toFixed(2)} Lakh`,
      rawAmount: Number(formAmount),
      rate: formRate,
      tenure: `${formTenure} Months`,
      status: "PENDING_BORROWER",
      statusText: "Pending Acceptance",
      submittedDate: "Just now",
      lenderDesk: "Lender Desk #104 (Your Offer)"
    };
    setOffersList([newOffer, ...offersList]);
    setActionSuccessMsg(`Offer ${newOffer.id} successfully published to Marketplace!`);
    setTimeout(() => {
      setActionSuccessMsg("");
      setCreateOfferModal(false);
    }, 1800);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setOffersList(prev => prev.map(o => o.id === editOfferModal.id ? {
      ...o,
      rate: formRate,
      tenure: `${formTenure} Months`
    } : o));
    setActionSuccessMsg(`Offer ${editOfferModal.id} terms updated successfully!`);
    setTimeout(() => {
      setActionSuccessMsg("");
      setEditOfferModal(null);
    }, 1800);
  };

  const handleWithdrawConfirm = (id) => {
    setOffersList(prev => prev.filter(o => o.id !== id));
    setWithdrawOfferModal(null);
  };

  const handleShareResults = (offer) => {
    setShareSuccessMsg(`Offer summary for ${offer.id} shared with Borrower via SMS & Email!`);
    setTimeout(() => setShareSuccessMsg(""), 3000);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block whitespace-nowrap px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Active Marketplace Bids & Escrow Terms
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">Offer Management Console</h1>
          <p className="text-xs text-slate-400 mt-1">Manage active loan bids, edit rate terms, or share proposal summaries with borrowers.</p>
        </div>

        {/* Perspective Switcher */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setViewRole("lender")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              viewRole === "lender" ? "bg-amber-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Unlock size={13} />
            <span>Lender Mode (Create / Edit Access)</span>
          </button>
          <button
            onClick={() => setViewRole("rep")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              viewRole === "rep" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Lock size={13} />
            <span>OAL Rep Mode (STRICTLY VIEW-ONLY)</span>
          </button>
        </div>
      </div>

      {/* Role Alert Banner */}
      {viewRole === "rep" ? (
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-2xl flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <ShieldAlert size={20} className="text-purple-400 shrink-0" />
            <div>
              <p className="font-bold text-white uppercase tracking-wider">🔒 STRICTLY VIEW-ONLY ACCESS (REPRESENTATIVE ROLE)</p>
              <p className="text-slate-300 mt-0.5">As an OAL Agent, you cannot create, edit, or withdraw lender offers. You can share offer result summaries with the borrower.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <span className="text-xs text-slate-300 font-medium">You have full permission to create, edit, or withdraw your published bids.</span>
          <button
            onClick={() => setCreateOfferModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-1.5"
          >
            <Plus size={16} />
            <span>Create New Offer Bid</span>
          </button>
        </div>
      )}

      {/* Share Toast Notification */}
      {shareSuccessMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs font-bold text-center animate-in fade-in">
          ✓ {shareSuccessMsg}
        </div>
      )}

      {/* Offers Table Roster */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-100">Published Bids & Offer Roster ({offersList.length})</h2>
          <span className="text-[10px] font-mono text-slate-400">Real-Time Market Synchronized</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Offer ID</th>
                <th className="px-6 py-3">Target Application</th>
                <th className="px-6 py-3">Offered Capital</th>
                <th className="px-6 py-3">Interest (% APR)</th>
                <th className="px-6 py-3">Tenure</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions & Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {offersList.map((offer) => (
                <tr key={offer.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-slate-200">{offer.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-white">{viewRole === "rep" ? offer.borrower : offer.anonymousTitle}</p>
                    <p className="text-[10px] font-mono text-slate-500">{offer.appId}</p>
                  </td>
                  <td className="px-6 py-4 font-mono font-black text-blue-400">{offer.amount}</td>
                  <td className="px-6 py-4 font-mono font-bold text-purple-400">{offer.rate}% APR</td>
                  <td className="px-6 py-4 font-mono text-slate-300">{offer.tenure}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
                      offer.status === "ACCEPTED" 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    }`}>
                      {offer.statusText}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 text-right">
                    {viewRole === "lender" ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditOfferModal(offer);
                            setFormRate(offer.rate);
                          }}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 font-bold flex items-center gap-1 transition-colors"
                        >
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setWithdrawOfferModal(offer)}
                          className="px-3 py-1.5 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white rounded-lg border border-red-500/20 font-bold flex items-center gap-1 transition-colors"
                        >
                          <Trash2 size={13} />
                          <span>Withdraw</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => handleShareResults(offer)}
                          className="px-3.5 py-1.5 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-md"
                        >
                          <Share2 size={13} />
                          <span>Share Results with Borrower</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE OFFER MODAL */}
      {createOfferModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold">New Proposal Submission</span>
                <h3 className="text-base font-bold text-white mt-0.5">Publish Custom Bid Offer</h3>
              </div>
              <button onClick={() => setCreateOfferModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {actionSuccessMsg ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold text-center">
                {actionSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Application ID</label>
                  <select
                    value={formAppId}
                    onChange={(e) => setFormAppId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-slate-100 font-bold focus:outline-none focus:border-blue-500"
                  >
                    <option value="APP-9081">APP-9081 (TechVentures India)</option>
                    <option value="APP-9079">APP-9079 (Verma Retail)</option>
                    <option value="APP-9074">APP-9074 (Sharma Freight)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Offered Capital (₹ INR)</label>
                  <input
                    type="number"
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-slate-100 font-mono font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Interest Rate (% APR)</label>
                  <input
                    type="text"
                    value={formRate}
                    onChange={(e) => setFormRate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-slate-100 font-mono font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button type="button" onClick={() => setCreateOfferModal(false)} className="w-full py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl">
                    Cancel
                  </button>
                  <button type="submit" className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl shadow-lg">
                    Publish Offer Bid
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* EDIT OFFER MODAL */}
      {editOfferModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold">Edit Offer Terms</span>
                <h3 className="text-base font-bold text-white mt-0.5">{editOfferModal.id} - {editOfferModal.borrower}</h3>
              </div>
              <button onClick={() => setEditOfferModal(null)} className="p-1 text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {actionSuccessMsg ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold text-center">
                {actionSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Updated Interest Rate (% APR)</label>
                  <input
                    type="text"
                    value={formRate}
                    onChange={(e) => setFormRate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-slate-100 font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button type="button" onClick={() => setEditOfferModal(null)} className="w-full py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl">
                    Cancel
                  </button>
                  <button type="submit" className="w-full py-2.5 bg-amber-600 text-white font-bold rounded-xl shadow-lg">
                    Save Updated Terms
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* WITHDRAW OFFER WARNING MODAL */}
      {withdrawOfferModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-400 border-b border-slate-800 pb-4">
              <ShieldAlert size={24} />
              <div>
                <h3 className="text-base font-bold text-white">Confirm Offer Withdrawal</h3>
                <p className="text-[10px] font-mono text-slate-400">{withdrawOfferModal.id}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to withdraw proposal <span className="font-mono font-bold text-white">{withdrawOfferModal.id}</span> ({withdrawOfferModal.amount} @ {withdrawOfferModal.rate}% APR)? This action will remove the offer from the borrower's waiting room.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setWithdrawOfferModal(null)}
                className="w-full py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl text-xs"
              >
                Cancel Keep Active
              </button>
              <button
                onClick={() => handleWithdrawConfirm(withdrawOfferModal.id)}
                className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg text-xs"
              >
                Confirm Withdraw Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
