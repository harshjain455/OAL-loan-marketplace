import React, { useState } from "react";
import { Award, ShieldCheck, CheckCircle2, ArrowRight, DollarSign, Percent, Calendar, AlertCircle, X, Sparkles, Lock, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function BorrowerOffers() {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [acceptedOffer, setAcceptedOffer] = useState(null);

  const mockOffers = [
    {
      id: "BID-8912",
      lenderCode: "Lender Alpha (Anonymous)",
      tier: "Verified Premier Lender",
      amount: "$75,000",
      rate: "6.5%",
      duration: "24 Months",
      monthly: "$3,342",
      processingFee: "$500",
      totalRepayment: "$80,208",
      fundingTime: "24-48 Hours"
    },
    {
      id: "BID-8915",
      lenderCode: "Lender Beta (Anonymous)",
      tier: "Institutional Capital Group",
      amount: "$75,000",
      rate: "7.0%",
      duration: "36 Months",
      monthly: "$2,315",
      processingFee: "$350",
      totalRepayment: "$83,340",
      fundingTime: "3-5 Business Days"
    },
    {
      id: "BID-8920",
      lenderCode: "Lender Gamma (Anonymous)",
      tier: "Private Credit Fund",
      amount: "$70,000",
      rate: "6.2%",
      duration: "18 Months",
      monthly: "$4,080",
      processingFee: "$600",
      totalRepayment: "$73,440",
      fundingTime: "24 Hours"
    }
  ];

  const handleAccept = (offer) => {
    setAcceptedOffer(offer);
    setSelectedOffer(null);
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 w-full max-w-7xl mx-auto pb-10 overflow-hidden">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-bold tracking-tight text-white">Waiting Room & Lender Bids</h1>
            <span className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold rounded-full flex items-center gap-1">
              <Sparkles size={11} /> Wireframe Specs Compliant
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Compare incoming loan offers from matching anonymous lenders and lock terms for final processing.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-400 font-semibold shrink-0 self-start sm:self-auto">
          <Award size={16} /> {mockOffers.length} Active Bids
        </div>
      </div>

      {/* 2. Security & Policy Infobox */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl shrink-0">
            <ShieldCheck size={18} />
          </div>
          <span>
            🔒 <strong>Lender Anonymity Policy:</strong> Lender identities are anonymized to ensure unbiased competitive bidding. All communications are strictly coordinated through your assigned OAL Representative.
          </span>
        </div>
        <Link 
          to="/borrower/messages" 
          className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-indigo-400 font-bold rounded-xl text-xs flex items-center gap-1.5 shrink-0"
        >
          <MessageSquare size={14} /> Contact OAL Rep
        </Link>
      </div>

      {/* Success Notification Banner if accepted */}
      {acceptedOffer && (
        <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-2 text-emerald-400 animate-fadeIn shadow-lg">
          <div className="flex items-center gap-2 font-bold text-sm">
            <CheckCircle2 size={18} /> Offer Accepted: {acceptedOffer.lenderCode} ({acceptedOffer.amount} at {acceptedOffer.rate})
          </div>
          <p className="text-xs text-emerald-300">
            Your choice has been locked and submitted to your assigned OAL Representative. They will contact you shortly to complete closing documentation and funding.
          </p>
        </div>
      )}

      {/* 3. Offers List */}
      <div className="space-y-4">
        {mockOffers.map((offer) => {
          const isSelected = acceptedOffer?.id === offer.id;

          return (
            <div
              key={offer.id}
              className={`p-5 sm:p-6 bg-slate-900 border rounded-2xl space-y-4 transition-all shadow-xl ${
                isSelected ? "border-emerald-500 bg-emerald-950/10 ring-1 ring-emerald-500/30" : "border-slate-800 hover:border-slate-750"
              }`}
            >
              {/* Offer Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-2 flex-wrap">
                      {offer.lenderCode}
                      <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded-full font-semibold border border-slate-700">
                        {offer.tier}
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Offer ID: {offer.id} • Est. Funding: {offer.fundingTime}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-xs text-slate-400 block">Offered Amount</span>
                  <span className="text-xl font-black text-emerald-400">{offer.amount}</span>
                </div>
              </div>

              {/* Offer Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-slate-950/80 p-4 rounded-xl border border-slate-850">
                <div>
                  <span className="text-slate-500 block mb-0.5 font-medium">Interest Rate</span>
                  <span className="font-extrabold text-white text-sm flex items-center gap-1">
                    <Percent size={14} className="text-indigo-400" />
                    {offer.rate} APR
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 font-medium">Duration</span>
                  <span className="font-extrabold text-white text-sm flex items-center gap-1">
                    <Calendar size={14} className="text-indigo-400" />
                    {offer.duration}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 font-medium">Monthly EMI</span>
                  <span className="font-extrabold text-indigo-400 text-sm">{offer.monthly}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 font-medium">Total Repayment</span>
                  <span className="font-extrabold text-slate-200 text-sm">{offer.totalRepayment}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-1">
                {isSelected ? (
                  <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-xl flex items-center gap-1.5">
                    <CheckCircle2 size={16} /> Offer Accepted & Locked
                  </span>
                ) : (
                  <button
                    onClick={() => setSelectedOffer(offer)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer"
                  >
                    Review & Accept Offer <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Confirmation Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award size={18} className="text-emerald-400" />
                Confirm Offer Acceptance
              </h3>
              <button onClick={() => setSelectedOffer(null)} className="text-slate-400 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-300">
                You are about to accept the following loan terms from <strong>{selectedOffer.lenderCode}</strong>:
              </p>
              <div className="p-4 bg-slate-950 rounded-xl space-y-2 border border-slate-850">
                <div className="flex justify-between">
                  <span className="text-slate-400">Loan Amount:</span>
                  <span className="font-bold text-white">{selectedOffer.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Interest Rate:</span>
                  <span className="font-bold text-emerald-400">{selectedOffer.rate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Term Duration:</span>
                  <span className="font-bold text-white">{selectedOffer.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly EMI:</span>
                  <span className="font-bold text-indigo-400">{selectedOffer.monthly}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                Your assigned OAL Rep will handle closing & funding contracts upon confirmation.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedOffer(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAccept(selectedOffer)}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30"
              >
                <CheckCircle2 size={16} /> Accept & Lock Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
