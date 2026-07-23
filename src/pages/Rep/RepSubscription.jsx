import React, { useState } from "react";
import { Check, ShieldCheck, CreditCard, X, HelpCircle, CheckCircle2 } from "lucide-react";

export default function RepSubscription() {
  const [activePlanId, setActivePlanId] = useState("prof");
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: "starter",
      name: "Starter Agent",
      monthlyPrice: 49,
      annualPrice: 39,
      desc: "Perfect for independent agents starting out on the OAL Network.",
      features: [
        "Up to 5 assigned active leads",
        "LetsWork messaging hub access",
        "Standard AI alerts & matches",
        "Basic CSV performance reports"
      ]
    },
    {
      id: "prof",
      name: "Professional Broker",
      monthlyPrice: 99,
      annualPrice: 79,
      desc: "Our most popular plan for active commercial & real estate reps.",
      features: [
        "Unlimited assigned active leads",
        "LetsWork coordinated chat portal",
        "Instant push notifications & alerts",
        "Advanced CSV & PDF data exports",
        "Priority live marketplace view"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise Agency",
      monthlyPrice: 249,
      annualPrice: 199,
      desc: "Designed for lending agencies and multi-rep brokerage teams.",
      features: [
        "All Professional Broker features",
        "Multi-agent team dashboard seats",
        "Dedicated OAL account manager",
        "Custom API integrations & reports",
        "Direct lender match-making overrides"
      ]
    }
  ];

  const handleOpenUpgrade = (plan) => {
    setSelectedPlan(plan);
    setUpgradeModalOpen(true);
  };

  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleConfirmUpgrade = () => {
    setActivePlanId(selectedPlan.id);
    setUpgradeModalOpen(false);
    showToast(`Successfully upgraded to the ${selectedPlan.name} plan!`);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-12 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agent Subscription</h1>
          <p className="text-sm text-slate-400">Manage your active network platform subscription status and pricing tiers.</p>
        </div>

        {/* Monthly / Annual Toggle */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-1.5 shrink-0">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              billingPeriod === "monthly" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod("annual")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              billingPeriod === "annual" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Annually <span className="text-[9px] text-emerald-400 ml-1">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Plans Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isActive = activePlanId === plan.id;
          const price = billingPeriod === "monthly" ? plan.monthlyPrice : plan.annualPrice;
          
          return (
            <div
              key={plan.id}
              className={`p-6 bg-slate-900 border rounded-2xl flex flex-col justify-between space-y-6 transition-all ${
                isActive
                  ? "border-blue-500 ring-1 ring-blue-500 shadow-xl shadow-blue-500/5 bg-slate-900/90"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-slate-100">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{plan.desc}</p>
                  </div>
                  {isActive && (
                    <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded uppercase tracking-wider shrink-0">
                      Active
                    </span>
                  )}
                </div>

                <div className="pt-2">
                  <span className="text-3xl font-black text-slate-100">${price}</span>
                  <span className="text-xs text-slate-500 font-semibold"> / month</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {billingPeriod === "annual" ? `Billed annually ($${price * 12}/yr)` : "Billed monthly"}
                  </span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-850">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex gap-2 items-start text-xs text-slate-400">
                      <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleOpenUpgrade(plan)}
                disabled={isActive}
                className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? "bg-slate-950 text-slate-500 border border-slate-850 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/10"
                }`}
              >
                {isActive ? "Current Active Plan" : "Upgrade Plan"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Upgrade Checkout Modal */}
      {upgradeModalOpen && selectedPlan && (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-6 relative shadow-2xl animate-scale-in">
            <button
              onClick={() => setUpgradeModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-slate-100">Upgrade Subscription</h2>
              <p className="text-xs text-slate-400">Review terms and confirm payment to update your account level.</p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Plan Selected:</span>
                <span className="font-bold text-slate-200">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Billing Term:</span>
                <span className="font-bold text-slate-200 capitalize">{billingPeriod}</span>
              </div>
              <div className="flex justify-between pt-2.5 border-t border-slate-900">
                <span className="text-slate-500 font-semibold">Total Price:</span>
                <span className="font-black text-emerald-400 text-sm">
                  ${billingPeriod === "monthly" ? selectedPlan.monthlyPrice : selectedPlan.annualPrice}/mo
                </span>
              </div>
            </div>

            {/* Simulated Payment card details */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Charged to Primary Payment Method</span>
              <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-lg flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-blue-400" />
                  <span className="font-semibold text-slate-300">Visa ending in 4422</span>
                </div>
                <span className="text-[10px] text-slate-500">Chase Bank</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setUpgradeModalOpen(false)}
                className="px-4 py-2 border border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpgrade}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-lg"
              >
                Confirm Payment & Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-emerald-500 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 text-xs animate-bounce">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
