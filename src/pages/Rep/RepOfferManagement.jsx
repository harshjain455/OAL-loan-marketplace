import React, { useState } from "react";
import { Briefcase, Share2, Info, Check } from "lucide-react";

export default function RepOfferManagement() {
  const [offers, setOffers] = useState([
    { id: "OFF-119", leadId: "OAL-9842", borrower: "John Doe", lender: "Lender Alpha (Anonymous)", amount: "$75,000", rate: "6.5%", status: "Active Bids", shared: false },
    { id: "OFF-202", leadId: "OAL-1102", borrower: "Sarah Jenkins", lender: "Summit Finance (Anonymous)", amount: "$290,000", rate: "7.1%", status: "Active Bids", shared: true },
    { id: "OFF-340", leadId: "OAL-2291", borrower: "Elena Rostova", lender: "Pacific Bids (Anonymous)", amount: "$500,000", rate: "5.8%", status: "Approved Offer", shared: false }
  ]);

  const [toastMessage, setToastMessage] = useState("");

  const shareOffer = (id, borrowerName) => {
    setOffers(offers.map(off => off.id === id ? { ...off, shared: true } : off));
    setToastMessage(`Offer results successfully shared with ${borrowerName}!`);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Lender Offers (Read Only)</h1>
        <p className="text-sm text-slate-400">View sent offers and share results pages with borrowers</p>
      </div>

      {/* Notice box */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-start gap-3 text-amber-500 text-xs">
        <Info size={16} className="shrink-0 mt-0.5" />
        <span>
          <strong>🔒 Read-Only Notice:</strong> Representatives cannot create, edit, or withdraw bids. Bids are submitted and managed directly by the matching Lenders. You have the ability to review these bids and share them with the corresponding borrowers.
        </span>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-emerald-500 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 text-xs animate-bounce">
          <Check size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="space-y-4">
        {offers.map((offer) => (
          <div key={offer.id} className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-bold">{offer.id}</span>
                <h3 className="font-bold text-slate-200">{offer.borrower}'s Application</h3>
              </div>
              <p className="text-xs text-slate-500">Lender: <span className="text-slate-400">{offer.lender}</span></p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-xs shrink-0">
              <div>
                <span className="text-slate-500 block">Offer Amount</span>
                <span className="font-bold text-slate-200 text-sm">{offer.amount}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Interest Rate</span>
                <span className="font-bold text-slate-200 text-sm">{offer.rate}</span>
              </div>
            </div>

            <button
              onClick={() => shareOffer(offer.id, offer.borrower)}
              disabled={offer.shared}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 w-full md:w-auto justify-center ${
                offer.shared
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
              }`}
            >
              <Share2 size={12} />
              <span>{offer.shared ? "Shared with Borrower" : "Share Results"}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
