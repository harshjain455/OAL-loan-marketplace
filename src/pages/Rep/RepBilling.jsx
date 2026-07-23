import React, { useState } from "react";
import { CreditCard, Banknote, ShieldAlert, DollarSign, ArrowUpRight, HelpCircle, Check, CheckCircle2 } from "lucide-react";

export default function RepBilling() {
  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };
  const stats = [
    { label: "Total Earnings", value: "$18,750.00", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Pending Payout", value: "$8,500.00", icon: DollarSign, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Billing Status", value: "Active", icon: Check, color: "text-indigo-500", bg: "bg-indigo-500/10" }
  ];

  const payouts = [
    { id: "PAY-911", date: "2026-07-01", desc: "Commission: Lead OAL-9842 (John Doe) Funding", amount: "$3,750.00", status: "Completed" },
    { id: "PAY-802", date: "2026-06-15", desc: "Commission: Lead OAL-2291 (Elena Rostova) Funding", amount: "$15,000.00", status: "Completed" },
    { id: "PAY-705", date: "2026-05-10", desc: "Commission: Lead OAL-1102 (Sarah Jenkins) Funding", amount: "$5,500.00", status: "Completed" },
    { id: "PAY-601", date: "2026-04-18", desc: "Commission: Lead OAL-5593 (David Vance) Funding", amount: "$2,250.00", status: "Completed" }
  ];

  const faqs = [
    { q: "How are commission splits calculated?", a: "Commissions are split based on the lender's contract parameters, typically 2.5% of the total funded volume." },
    { q: "When are payouts deposited?", a: "Payouts are automatically transferred to your connected bank destination on the 1st of every month." },
    { q: "Can I update my billing card?", a: "Yes, you can update your primary credit card at any time via the Agent Subscription Card portal." }
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing & Payouts</h1>
        <p className="text-sm text-slate-400">Configure your banking info for commission payouts, manage subscription cards, and review statement records.</p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{s.label}</span>
                <span className="text-2xl font-black text-slate-100">{s.value}</span>
              </div>
              <div className={`p-3 rounded-lg ${s.bg}`}>
                <Icon size={18} className={s.color} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Setup Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <Banknote size={16} className="text-blue-400" />
            Payout Destination Setup
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Bank Name</label>
              <input type="text" className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500" defaultValue="Chase Bank, N.A." />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Routing Number</label>
              <input type="text" className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500" defaultValue="•••••678" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Account Number</label>
              <input type="text" className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500" defaultValue="••••••••1234" />
            </div>
            <button onClick={() => showToast("Payout details saved successfully!")} className="w-full py-2 bg-blue-600 hover:bg-blue-500 font-semibold text-xs rounded-lg transition-colors shadow">
              Save Account Information
            </button>
          </div>
        </div>

        {/* Saved Cards */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
              <CreditCard size={16} className="text-blue-400" />
              Agent Subscription Card
            </h3>
            <p className="text-xs text-slate-400">This card is billed monthly for your platform access subscription.</p>
            <div className="p-4 bg-slate-950 border border-slate-850 rounded-lg flex justify-between items-center">
              <div>
                <span className="font-bold text-xs block text-slate-200">Visa ending in 4422</span>
                <span className="text-[10px] text-slate-500">Expires 09/2029</span>
              </div>
              <span className="text-[10px] font-bold text-blue-400">PRIMARY</span>
            </div>
          </div>
          <button onClick={() => showToast("Card update wizard opened.")} className="w-full py-2 bg-slate-800 hover:bg-slate-700 font-semibold text-xs rounded-lg transition-colors">
            Update Payment Method
          </button>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="font-bold text-sm text-slate-200">Payout History</h3>
        <div className="divide-y divide-slate-800/60">
          {payouts.map((pay) => (
            <div key={pay.id} className="py-3.5 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-200">{pay.desc}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">{pay.date} • {pay.id}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-200 block">{pay.amount}</span>
                <span className="text-[10px] text-emerald-400 font-semibold">{pay.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
          <HelpCircle size={16} className="text-blue-400" />
          Payout & Commission Policy FAQ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {faqs.map((faq, idx) => (
            <div key={idx} className="space-y-1.5 p-3.5 bg-slate-950 rounded-lg border border-slate-850">
              <span className="font-bold text-slate-200 block">Q: {faq.q}</span>
              <p className="text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-emerald-500 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 text-xs animate-bounce">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
