import React, { useState } from "react";
import { Zap, CheckCircle2, ShieldCheck, AlertCircle, Sparkles, Star, Shield, ArrowUpRight, Flame } from "lucide-react";

const BENEFITS = [
  { text: "Unlimited Active Offer Deployments", plans: ["pro", "enterprise"] },
  { text: "Priority Real-time AI Lead Alerts", plans: ["pro", "enterprise"] },
  { text: "Direct LetsWork Rep Chat Channel", plans: ["pro", "enterprise"] },
  { text: "Dedicated Structuring Broker Support", plans: ["enterprise"] },
  { text: "Custom Yield Curve & Lead Optimization API", plans: ["enterprise"] },
  { text: "Standard Report Generation & Logs", plans: ["starter", "pro", "enterprise"] },
];

export default function LenderSubscription() {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSwitchPlan = (planId) => {
    if (planId === "pro") return;
    setSuccessMsg(`Initiating migration request to the ${planId.toUpperCase()} tier...`);
    setTimeout(() => {
      setSuccessMsg("");
      alert(`Subscription change request sent to your OAL Representative Sarah Connor. She will process this in the queue.`);
    }, 2000);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in w-full">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
            <Zap size={22} />
          </div>
          Subscription Tiers
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Monitor your premium membership advantages, rate limits, and select active feature modules.
        </p>
      </div>

      {/* Active Subscription Summary */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Flame size={12} className="animate-pulse" />
                Active Plan: Pro Tier
              </span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Lender Professional Account</h2>
              <p className="text-xs text-slate-400 mt-1">
                Your account is currently matches with all high-priority OAL Borrower Leads.
              </p>
            </div>
            
            {/* Features summary tags */}
            <div className="flex flex-wrap gap-2 pt-1.5">
              {["Unlimited Bids", "Priority Matching", "LetsWork Chat", "Custom Escrow Routing"].map((tag) => (
                <span key={tag} className="text-[10px] bg-slate-950/60 border border-slate-800/80 text-slate-300 px-2.5 py-1 rounded-lg font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-950/50 border border-slate-800/60 p-4 rounded-xl space-y-2 text-xs w-full md:w-auto md:min-w-[220px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Plan Rate:</span>
              <span className="font-bold text-white">$149 / month</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Billing Cycle:</span>
              <span className="font-semibold text-slate-350">Monthly Recurring</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-850">
              <span className="text-slate-500">Status:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck size={13} />
                Verified & Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Pricing Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            id: "starter",
            name: "Starter Tier",
            price: "$49",
            period: "/mo",
            desc: "Ideal for new lenders gaining initial capital exposure.",
            icon: Star,
            color: "text-slate-400",
            border: "border-slate-800",
            bg: "bg-slate-900/60",
            primary: false
          },
          {
            id: "pro",
            name: "Professional Tier",
            price: "$149",
            period: "/mo",
            desc: "Complete toolkit for institutional volume lenders.",
            icon: Zap,
            color: "text-indigo-400",
            border: "border-indigo-500/40",
            bg: "bg-slate-900/90",
            primary: true
          },
          {
            id: "enterprise",
            name: "Enterprise Custom",
            price: "Custom",
            period: "",
            desc: "SLA-backed priority allocation for large firms.",
            icon: Shield,
            color: "text-violet-400",
            border: "border-violet-500/30",
            bg: "bg-slate-900/60",
            primary: false
          }
        ].map((p) => {
          const Icon = p.icon;
          const isCurrent = p.id === "pro";
          return (
            <div
              key={p.id}
              className={`relative border rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all hover:scale-[1.01] ${
                p.border
              } ${p.bg} ${p.primary ? "ring-2 ring-indigo-500/40" : ""}`}
            >
              {isCurrent && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-black tracking-widest text-indigo-300 bg-indigo-600 border border-indigo-500 px-3 py-0.5 rounded-full uppercase shadow">
                  Current Plan
                </span>
              )}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-950 border border-slate-850 rounded-xl">
                    <Icon size={18} className={p.color} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{p.name}</h3>
                    <div className="flex items-end gap-1 mt-0.5">
                      <span className="text-2xl font-black text-white">{p.price}</span>
                      <span className="text-[10px] text-slate-500 font-semibold pb-0.5">{p.period}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{p.desc}</p>
                <div className="border-t border-slate-800/60 pt-4 space-y-2">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Plan Allocation:</span>
                  <ul className="space-y-2">
                    {BENEFITS.filter((b) => b.plans.includes(p.id)).map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold">
                        <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                        {benefit.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-5 mt-auto">
                <button
                  onClick={() => handleSwitchPlan(p.id)}
                  disabled={isCurrent}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 cursor-default"
                      : "bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 active:scale-[0.98]"
                  }`}
                >
                  {isCurrent ? "Current Plan Active" : p.id === "enterprise" ? "Request Enterprise" : "Switch Tier"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscription Alert Banner */}
      <div className="bg-slate-900/90 border border-slate-850 p-4 rounded-2xl flex items-start gap-3 text-xs">
        <AlertCircle size={16} className="text-indigo-400 mt-0.5 shrink-0" />
        <div>
          <span className="font-extrabold text-white block mb-0.5">Need a custom volume license?</span>
          <p className="text-slate-400 leading-relaxed font-medium">
            Contact your assigned representative directly via the <span className="text-indigo-400 underline font-semibold cursor-pointer">Communication Console</span> to structure multi-seat corporate accounts or custom API configurations.
          </p>
        </div>
      </div>
    </div>
  );
}
