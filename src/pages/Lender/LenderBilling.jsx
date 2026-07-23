import React, { useState } from "react";
import { CreditCard, CheckCircle2, Clock, Download, Star, Zap, Shield, ArrowUpRight, X, AlertTriangle } from "lucide-react";

const INVOICES = [
  { id: "INV-2407", desc: "OAL Lender Pro — July 2026", date: "Jul 1, 2026", amount: "$149.00", status: "Paid" },
  { id: "INV-2406", desc: "OAL Lender Pro — June 2026", date: "Jun 1, 2026", amount: "$149.00", status: "Paid" },
  { id: "INV-2405", desc: "OAL Lender Pro — May 2026", date: "May 1, 2026", amount: "$149.00", status: "Paid" },
  { id: "INV-2404", desc: "OAL Lender Pro — April 2026", date: "Apr 1, 2026", amount: "$149.00", status: "Paid" },
  { id: "INV-2403", desc: "OAL Lender Pro — March 2026", date: "Mar 1, 2026", amount: "$149.00", status: "Paid" },
];

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "$49",
    period: "/mo",
    desc: "For new lenders exploring the OAL marketplace.",
    icon: Star,
    color: "text-slate-400",
    border: "border-slate-700",
    bg: "bg-slate-900",
    features: ["Up to 10 Active Offers", "Basic AI Lead Alerts", "Email Support", "Standard Reports"]
  },
  {
    id: "pro",
    name: "Pro",
    price: "$149",
    period: "/mo",
    desc: "Most popular plan for active institutional lenders.",
    icon: Zap,
    color: "text-indigo-400",
    border: "border-indigo-500/40",
    bg: "bg-indigo-500/5",
    features: ["Unlimited Active Offers", "Priority AI Lead Matching", "OAL Network Panel Access", "Advanced Analytics & Reports", "Communication Console", "Dedicated OAL Rep"]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large institutions with custom volume requirements.",
    icon: Shield,
    color: "text-violet-400",
    border: "border-violet-500/30",
    bg: "bg-violet-500/5",
    features: ["All Pro Features", "Custom Offer Limits", "White-Label Reporting", "SLA Guarantees", "Dedicated Account Manager", "API Access"]
  }
];

export default function LenderBilling() {
  const [activePlanId, setActivePlanId] = useState("pro");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isUpdateCardOpen, setIsUpdateCardOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4821");
  const [cardInput, setCardInput] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const handleSwitchPlan = (planId) => {
    if (planId === "pro") return;
    if (planId === "enterprise") {
      alert("Redirecting request to OAL Representative Sarah Connor to structure Enterprise custom terms. She will contact you directly.");
      return;
    }
    const confirmSwitch = window.confirm(`Are you sure you want to switch to the ${planId.toUpperCase()} plan?`);
    if (confirmSwitch) {
      setActivePlanId(planId);
      alert(`Successfully switched to ${planId.toUpperCase()} plan!`);
    }
  };

  const handleUpdateCard = (e) => {
    e.preventDefault();
    if (!cardInput || !cardExpiry || !cardCvv) return;
    const last4 = cardInput.replace(/\s/g, "").slice(-4);
    setCardNumber(`•••• •••• •••• ${last4}`);
    setIsUpdateCardOpen(false);
    setCardInput(""); setCardExpiry(""); setCardCvv("");
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <div className="p-2.5 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-xl">
              <CreditCard size={22} />
            </div>
            Billing & Subscription
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your OAL membership plan, payment methods, and invoice history.
          </p>
        </div>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-gradient-to-r from-indigo-600/20 via-slate-900 to-slate-900 border border-indigo-500/30 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
            <Zap size={22} className="text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-extrabold text-lg">
                OAL Lender {activePlanId === "pro" ? "Pro" : activePlanId === "starter" ? "Starter" : "Enterprise"}
              </span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Next billing: <span className="text-white font-semibold">August 1, 2026 · {activePlanId === "pro" ? "$149.00" : activePlanId === "starter" ? "$49.00" : "Custom"}</span></p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCancelModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/20 transition-colors text-xs font-semibold cursor-pointer"
          >
            Cancel Plan
          </button>
          {activePlanId !== "enterprise" && (
            <button
              onClick={() => handleSwitchPlan("enterprise")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <ArrowUpRight size={14} />
              Upgrade to Enterprise
            </button>
          )}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-slate-800 border border-slate-700 rounded-xl">
            <CreditCard size={20} className="text-slate-300" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Payment Method</div>
            <div className="text-sm font-mono text-slate-300 mt-0.5">{cardNumber}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">VISA · Expires 09/28</div>
          </div>
        </div>
        <button
          onClick={() => setIsUpdateCardOpen(true)}
          className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors text-xs font-semibold cursor-pointer"
        >
          Update Card
        </button>
      </div>

      {/* Subscription Plan Cards */}
      <div>
        <h2 className="text-sm font-bold text-white mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PLANS.map((plan) => {
            const PlanIcon = plan.icon;
            const isCurrent = plan.id === activePlanId;
            return (
              <div key={plan.id} className={`relative border ${plan.border} ${plan.bg} rounded-2xl p-5 space-y-4 shadow-md ${isCurrent ? "ring-1 ring-indigo-500/40" : ""}`}>
                {isCurrent && (
                  <span className="absolute top-3 right-3 text-[9px] font-extrabold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded-full">Current Plan</span>
                )}
                <div className={`p-2.5 w-fit rounded-xl bg-slate-950/50 border ${plan.border}`}>
                  <PlanIcon size={18} className={plan.color} />
                </div>
                <div>
                  <div className={`text-lg font-extrabold ${plan.color}`}>{plan.name}</div>
                  <div className="flex items-end gap-1 mt-1">
                    <span className="text-2xl font-black text-white">{plan.price}</span>
                    <span className="text-xs text-slate-500 font-semibold pb-0.5">{plan.period}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 font-medium leading-relaxed">{plan.desc}</p>
                </div>
                <ul className="space-y-1.5">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] text-slate-400">
                      <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSwitchPlan(plan.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    isCurrent
                      ? "bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 cursor-default"
                      : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                  }`}
                  disabled={isCurrent}
                >
                  {isCurrent ? "Current Plan" : plan.id === "enterprise" ? "Contact Sales" : "Switch Plan"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoice History Table */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800/60 flex justify-between items-center">
          <h2 className="text-sm font-bold text-white">Invoice History</h2>
          <span className="text-xs text-slate-400">{INVOICES.length} invoices</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800/60">
              <tr>
                <th className="px-6 py-4 font-semibold">Invoice ID</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-indigo-400">{inv.id}</td>
                  <td className="px-6 py-4 text-white font-semibold">{inv.desc}</td>
                  <td className="px-6 py-4 text-slate-400">{inv.date}</td>
                  <td className="px-6 py-4 font-extrabold text-white">{inv.amount}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold flex items-center justify-center gap-1 w-fit mx-auto">
                      <CheckCircle2 size={11} />
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => alert(`Downloading receipt for ${inv.id}...`)}
                      className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl mx-auto bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                    >
                      <Download size={12} />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CANCEL PLAN CONFIRMATION MODAL */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-[2px] animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl flex flex-col text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Cancel Subscription?</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Your OAL Lender Pro plan will remain active until the end of the billing cycle (August 1, 2026), then all premium features will be deactivated.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
              >
                Keep Plan
              </button>
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer text-xs font-semibold"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE CARD MODAL */}
      {isUpdateCardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-[2px] animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
                    <CreditCard size={16} />
                  </div>
                  Update Payment Card
                </h3>
                <p className="text-xs text-slate-400 mt-1">Update your billing card details securely</p>
              </div>
              <button onClick={() => setIsUpdateCardOpen(false)} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleUpdateCard} className="space-y-4 pt-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Card Number</label>
                <input
                  type="text"
                  maxLength={19}
                  value={cardInput}
                  onChange={(e) => setCardInput(e.target.value.replace(/[^0-9]/g, "").replace(/(.{4})/g, "$1 ").trim())}
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 font-mono focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="09/28"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">CVV</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="•••"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 font-mono focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t border-slate-800/80 pt-4">
                <button type="button" onClick={() => setIsUpdateCardOpen(false)} className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer text-xs font-semibold">Save Card</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
