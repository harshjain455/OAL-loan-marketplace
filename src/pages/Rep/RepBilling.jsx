import React from "react";
import { CreditCard, Banknote, ShieldAlert } from "lucide-react";

export default function RepBilling() {
  const payouts = [
    { id: "PAY-911", date: "2026-07-01", desc: "Commission: Lead OAL-9842 Funding", amount: "$3,750.00", status: "Completed" },
    { id: "PAY-802", date: "2026-06-15", desc: "Commission: Lead OAL-2291 Funding", amount: "$15,000.00", status: "Completed" }
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing & Payouts</h1>
        <p className="text-sm text-slate-400">Configure your banking info for commission payouts and check payment records.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Setup Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <Banknote size={16} className="text-blue-400" />
            Payout Destination Setup
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Bank Name</label>
              <input type="text" className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none" defaultValue="Chase Bank, N.A." />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Routing Number</label>
              <input type="text" className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none" defaultValue="•••••678" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Account Number</label>
              <input type="text" className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none" defaultValue="••••••••1234" />
            </div>
            <button onClick={() => alert("Payout details saved successfully!")} className="w-full py-2 bg-blue-600 hover:bg-blue-500 font-semibold text-xs rounded-lg transition-colors">
              Save Account Information
            </button>
          </div>
        </div>

        {/* Saved Cards */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
              <CreditCard size={16} className="text-blue-400" />
              Agent Subscription Card
            </h3>
            <p className="text-xs text-slate-400 mt-1">This card is billed monthly for your platform access subscription.</p>
            <div className="mt-4 p-4 bg-slate-950 border border-slate-850 rounded-lg flex justify-between items-center">
              <div>
                <span className="font-bold text-xs block text-slate-200">Visa ending in 4422</span>
                <span className="text-[10px] text-slate-500">Expires 09/2029</span>
              </div>
              <span className="text-[10px] font-bold text-blue-400">PRIMARY</span>
            </div>
          </div>
          <button onClick={() => alert("Card update wizard opened.")} className="py-2 bg-slate-800 hover:bg-slate-700 font-semibold text-xs rounded-lg transition-colors mt-4">
            Update Payment Method
          </button>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="font-bold text-sm text-slate-200">Payout History</h3>
        <div className="divide-y divide-slate-800/60">
          {payouts.map((pay) => (
            <div key={pay.id} className="py-3 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-200">{pay.desc}</span>
                <span className="text-[10px] text-slate-500 block">{pay.date} • {pay.id}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-200 block">{pay.amount}</span>
                <span className="text-[10px] text-emerald-400 font-semibold">{pay.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
