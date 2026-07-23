import React, { useState, useEffect } from "react";
import { Briefcase, Share2, Info, Check, Eye, X, DollarSign, Calendar, Percent } from "lucide-react";

export default function RepOfferManagement() {
  const defaultOffers = [
    {
      id: "OFF-119",
      leadId: "OAL-9842",
      borrower: "John Doe",
      lender: "Lender Alpha (Anonymous)",
      amount: "$75,000",
      rate: "6.5%",
      term: "24 Months",
      monthly: "$3,342",
      fee: "$500",
      totalRepay: "$80,208",
      timeframe: "24-48 Hours",
      status: "Active Bids"
    },
    {
      id: "OFF-202",
      leadId: "OAL-1102",
      borrower: "Sarah Jenkins",
      lender: "Summit Finance (Anonymous)",
      amount: "$290,000",
      rate: "7.1%",
      term: "36 Months",
      monthly: "$8,970",
      fee: "$1,200",
      totalRepay: "$322,920",
      timeframe: "3-5 Business Days",
      status: "Active Bids"
    },
    {
      id: "OFF-340",
      leadId: "OAL-2291",
      borrower: "Elena Rostova",
      lender: "Pacific Bids (Anonymous)",
      amount: "$500,000",
      rate: "5.8%",
      term: "48 Months",
      monthly: "$11,698",
      fee: "$2,000",
      totalRepay: "$561,504",
      timeframe: "24 Hours",
      status: "Approved Offer"
    }
  ];

  // Load shared status from localStorage
  const [sharedOfferIds, setSharedOfferIds] = useState(() => {
    const raw = localStorage.getItem("oal_shared_offers");
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        return ["OFF-202"]; // Default OFF-202 is shared in the screenshot
      }
    }
    return ["OFF-202"];
  });

  useEffect(() => {
    localStorage.setItem("oal_shared_offers", JSON.stringify(sharedOfferIds));
  }, [sharedOfferIds]);

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const shareOffer = (id, borrowerName) => {
    if (!sharedOfferIds.includes(id)) {
      setSharedOfferIds([...sharedOfferIds, id]);
    }
    setToastMessage(`Offer terms shared with ${borrowerName} successfully!`);
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

      {/* Offers Grid */}
      <div className="space-y-4">
        {defaultOffers.map((offer) => {
          const isShared = sharedOfferIds.includes(offer.id);
          return (
            <div key={offer.id} className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-bold">{offer.id}</span>
                  <h3 className="font-bold text-slate-200">{offer.borrower}'s Application</h3>
                </div>
                <p className="text-xs text-slate-500">Lender: <span className="text-slate-400">{offer.lender}</span></p>
              </div>

              <div className="grid grid-cols-2 gap-6 text-xs shrink-0 mr-4">
                <div>
                  <span className="text-slate-500 block">Offer Amount</span>
                  <span className="font-bold text-slate-200 text-sm">{offer.amount}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Interest Rate</span>
                  <span className="font-bold text-slate-200 text-sm">{offer.rate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => setSelectedOffer(offer)}
                  className="p-2 bg-slate-850 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold px-3"
                  title="View Offer Details"
                >
                  <Eye size={14} />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => shareOffer(offer.id, offer.borrower)}
                  disabled={isShared}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 justify-center ${
                    isShared
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-850"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
                  }`}
                >
                  <Share2 size={12} />
                  <span>{isShared ? "Shared with Borrower" : "Share Results"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-6 relative shadow-2xl animate-scale-in">
            <button
              onClick={() => setSelectedOffer(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="space-y-1.5">
              <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-bold">{selectedOffer.id}</span>
              <h2 className="text-xl font-bold text-slate-100">{selectedOffer.borrower}'s Offer Terms</h2>
              <p className="text-xs text-slate-400">Submitted by: {selectedOffer.lender}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Offer Amount</span>
                <span className="font-bold text-slate-100 text-sm flex items-center gap-1">
                  <DollarSign size={14} className="text-emerald-400" />
                  {selectedOffer.amount}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Interest Rate</span>
                <span className="font-bold text-slate-100 text-sm flex items-center gap-1">
                  <Percent size={14} className="text-blue-400" />
                  {selectedOffer.rate}
                </span>
              </div>
              <div className="space-y-1 pt-2 border-t border-slate-900">
                <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Duration Term</span>
                <span className="font-bold text-slate-100">{selectedOffer.term}</span>
              </div>
              <div className="space-y-1 pt-2 border-t border-slate-900">
                <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Est. Monthly Payment</span>
                <span className="font-bold text-slate-100">{selectedOffer.monthly}</span>
              </div>
              <div className="space-y-1 pt-2 border-t border-slate-900">
                <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Processing Fee</span>
                <span className="font-bold text-slate-100">{selectedOffer.fee}</span>
              </div>
              <div className="space-y-1 pt-2 border-t border-slate-900">
                <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Total Repayment</span>
                <span className="font-bold text-slate-100">{selectedOffer.totalRepay}</span>
              </div>
              <div className="space-y-1 pt-2 border-t border-slate-900 col-span-2">
                <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Estimated Funding Speed</span>
                <span className="font-bold text-emerald-400">{selectedOffer.timeframe}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedOffer(null)}
                className="px-4 py-2 border border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-lg transition-colors"
              >
                Close View
              </button>
              <button
                onClick={() => {
                  shareOffer(selectedOffer.id, selectedOffer.borrower);
                  setSelectedOffer(null);
                }}
                disabled={sharedOfferIds.includes(selectedOffer.id)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  sharedOfferIds.includes(selectedOffer.id)
                    ? "bg-slate-850 text-slate-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
                }`}
              >
                {sharedOfferIds.includes(selectedOffer.id) ? "Already Shared" : "Share Results"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
