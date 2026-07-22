import React from "react";

export default function RepOfferManagement() {
  const activeOffers = [
    { lead: "Lead #2918 (Anonymous)", lender: "Lender Alpha (Anonymous)", amount: "$50,000", rate: "6.5%", status: "Active" }
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Lender Offers (Read Only)</h1>
        <p className="text-sm text-slate-400">View sent offers and share results pages with borrowers</p>
        <div className="mt-2 p-2 bg-amber-500/10 border border-amber-500/20 rounded text-xs text-amber-500">
          🔒 Notice: Representatives cannot edit or withdraw offers. Offer adjustments must be performed directly by Lenders.
        </div>
      </div>

      <div className="space-y-4">
        {activeOffers.map((offer, idx) => (
          <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="font-semibold text-slate-200">{offer.lead}</h3>
              <p className="text-xs text-slate-400">Offered by: {offer.lender}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              <div>
                <span className="text-xs text-slate-500 block">Amount</span>
                <span className="font-bold text-slate-300">{offer.amount}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Rate</span>
                <span className="font-bold text-slate-300">{offer.rate}</span>
              </div>
            </div>
            <button
              onClick={() => alert("Offers page link shared with the Borrower successfully!")}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 font-semibold text-xs rounded-lg transition-colors"
            >
              Share Results Page
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
