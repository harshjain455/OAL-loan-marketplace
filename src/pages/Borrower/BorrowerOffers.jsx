import React, { useState } from "react";
import { Award, ShieldCheck, CheckCircle2, ArrowRight, DollarSign, Percent, Calendar, AlertCircle, X } from "lucide-react";

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
    <div className="space-y-6 font-sans text-slate-100 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Waiting Room / Offers</h1>
        <p className="text-sm text-slate-400">Compare incoming bids from matching lenders and accept terms to finalize funding.</p>
      </div>

      {/* Security Banner */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3 text-xs text-slate-400">
        <ShieldCheck size={20} className="text-indigo-400 shrink-0" />
        <span>
          <strong>Lender Anonymity:</strong> Lender identities are anonymized to ensure fair bidding. All communications and offer contracts are coordinated through your assigned OAL Representative.
        </span>
      </div>

      {/* Success Notification if accepted */}
      {acceptedOffer && (
        <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2 text-emerald-400">
          <div className="flex items-center gap-2 font-bold text-sm">
            <CheckCircle2 size={18} /> Offer Accepted: {acceptedOffer.lenderCode} ({acceptedOffer.amount} at {acceptedOffer.rate})
          </div>
          <p className="text-xs text-emerald-300">
            Your choice has been submitted to your assigned OAL Representative. They will contact you shortly to begin loan processing and closing documents.
          </p>
        </div>
      )}

      {/* Offers List */}
      <div className="space-y-4">
        {mockOffers.map((offer) => {
          const isSelected = acceptedOffer?.id === offer.id;

          return (
            <div
              key={offer.id}
              className={`p-6 bg-slate-900 border rounded-xl space-y-4 transition-all ${
                isSelected ? "border-emerald-500 bg-emerald-950/10" : "border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Offer Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      {offer.lenderCode}
                      <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded font-normal">
                        {offer.tier}
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-500">Offer ID: {offer.id} • Est. Funding: {offer.fundingTime}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Offer Amount</span>
                  <span className="text-xl font-black text-emerald-400">{offer.amount}</span>
                </div>
              </div>

              {/* Offer Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs bg-slate-950 p-4 rounded-lg border border-slate-850">
                <div>
                  <span className="text-slate-500 block mb-0.5">Interest Rate</span>
                  <span className="font-bold text-white text-sm flex items-center gap-1">
                    <Percent size={14} className="text-indigo-400" />
                    {offer.rate}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Duration</span>
                  <span className="font-bold text-white text-sm flex items-center gap-1">
                    <Calendar size={14} className="text-indigo-400" />
                    {offer.duration}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Est. Monthly Pay</span>
                  <span className="font-bold text-indigo-400 text-sm">{offer.monthly}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Total Repayment</span>
                  <span className="font-bold text-slate-300 text-sm">{offer.totalRepayment}</span>
                </div>
              </div>

              {/* Action */}
              <div className="flex justify-end pt-1">
                {isSelected ? (
                  <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-lg flex items-center gap-1.5">
                    <CheckCircle2 size={16} /> Offer Accepted
                  </span>
                ) : (
                  <button
                    onClick={() => setSelectedOffer(offer)}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                  >
                    Review & Accept Offer <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award size={18} className="text-emerald-400" />
                Confirm Offer Acceptance
              </h3>
              <button onClick={() => setSelectedOffer(null)} className="text-slate-500 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-300">
                You are about to accept the following loan terms from <strong>{selectedOffer.lenderCode}</strong>:
              </p>
              <div className="p-4 bg-slate-950 rounded-lg space-y-2 border border-slate-850">
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
              <p className="text-[11px] text-slate-500">
                Your assigned OAL Rep will handle closing & funding contracts upon confirmation.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedOffer(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAccept(selectedOffer)}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
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
