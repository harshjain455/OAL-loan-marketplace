import React from "react";

export default function BorrowerOffers() {
  const mockOffers = [
    { lender: "Lender Alpha (Anonymous)", amount: "$50,000", rate: "6.5%", duration: "12 Months", monthly: "$4,315" },
    { lender: "Lender Beta (Anonymous)", amount: "$45,000", rate: "7.0%", duration: "18 Months", monthly: "$2,640" },
  ];

  return (
    <div className="space-y-6 font-sans text-slate-100">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Waiting Room / Offers</h1>
        <p className="text-sm text-slate-400">Review and accept offers sent by active matching Lenders.</p>
      </div>

      <div className="space-y-4">
        {mockOffers.map((offer, idx) => (
          <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="font-semibold text-slate-200">{offer.lender}</h3>
              <p className="text-xs text-slate-400">Offer details: {offer.amount} at {offer.rate} interest</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              <div>
                <span className="text-xs text-slate-500 block">Duration</span>
                <span className="font-bold text-slate-300">{offer.duration}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Monthly Pay</span>
                <span className="font-bold text-slate-300">{offer.monthly}</span>
              </div>
            </div>
            <button
              onClick={() => alert("Offer Accepted! Handing over to OAL Rep for loan processing.")}
              className="px-4 py-2 bg-slate-100 text-slate-950 font-semibold text-xs rounded-lg hover:bg-slate-200 transition-colors"
            >
              Accept Offer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
