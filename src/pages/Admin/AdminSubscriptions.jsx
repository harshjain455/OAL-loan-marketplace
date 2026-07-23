import React, { useState } from "react";
import { 
  CreditCard, Plus, Edit2, Check, X, ShieldCheck, Users, TrendingUp, Layers, CheckCircle2, Search, Filter 
} from "lucide-react";

export default function AdminSubscriptions() {
  const [roleFilter, setRoleFilter] = useState("All Plans");
  const [showCreatePlanModal, setShowCreatePlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  // Subscription Tiers Data (for Lenders & Agents)
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    {
      id: "PLAN-LND-01",
      name: "Lender Starter Tier",
      targetRole: "Lender",
      price: "₹9,999",
      billingCycle: "Monthly",
      activeSubscribers: 142,
      maxLoanBids: "50 Bids / month",
      analyticsAccess: "Standard Metrics",
      features: [
        "Up to 50 active portfolio bids/month",
        "Standard AI Risk Score Access",
        "Direct Messaging with Borrowers",
        "Email Support (24h response)"
      ],
      status: "Active"
    },
    {
      id: "PLAN-LND-02",
      name: "Lender Enterprise Pro",
      targetRole: "Lender",
      price: "₹24,999",
      billingCycle: "Monthly",
      activeSubscribers: 88,
      maxLoanBids: "Unlimited Bids",
      analyticsAccess: "iNV IQ™ Advanced Analytics",
      features: [
        "Unlimited loan portfolio bidding",
        "Full iNV IQ™ Algorithm Insights & Custom Rules",
        "Dedicated Account Relationship Manager",
        "Priority API Access & ERP Integration"
      ],
      status: "Active"
    },
    {
      id: "PLAN-AGT-01",
      name: "Agent Preferred Partner",
      targetRole: "OAL Agent",
      price: "₹4,999",
      billingCycle: "Monthly",
      activeSubscribers: 110,
      maxLoanBids: "100 Lead Routes",
      analyticsAccess: "Lead Pipeline CRM",
      features: [
        "Priority Auto-Routing Lead Allocation",
        "15% Higher Commission Multiplier Split",
        "Dedicated Agent Support Desk",
        "CRM & WhatsApp Instant Alert Integration"
      ],
      status: "Active"
    }
  ]);

  // New Plan Form State
  const [newPlanForm, setNewPlanForm] = useState({
    name: "",
    targetRole: "Lender",
    price: "₹14,999",
    billingCycle: "Monthly",
    maxLoanBids: "100 Bids",
    analyticsAccess: "Standard Analytics",
    features: "Feature 1, Feature 2, Feature 3"
  });

  // Create Plan Handler
  const handleCreatePlan = (e) => {
    e.preventDefault();
    if (!newPlanForm.name) return;

    const createdPlan = {
      id: `PLAN-${newPlanForm.targetRole === "Lender" ? "LND" : "AGT"}-0${subscriptionPlans.length + 1}`,
      name: newPlanForm.name,
      targetRole: newPlanForm.targetRole,
      price: newPlanForm.price,
      billingCycle: newPlanForm.billingCycle,
      activeSubscribers: 0,
      maxLoanBids: newPlanForm.maxLoanBids,
      analyticsAccess: newPlanForm.analyticsAccess,
      features: newPlanForm.features.split(",").map(f => f.trim()),
      status: "Active"
    };

    setSubscriptionPlans([...subscriptionPlans, createdPlan]);
    setShowCreatePlanModal(false);
    setNewPlanForm({ name: "", targetRole: "Lender", price: "₹14,999", billingCycle: "Monthly", maxLoanBids: "100 Bids", analyticsAccess: "Standard Analytics", features: "Feature 1, Feature 2, Feature 3" });
  };

  // Save Edit Plan Handler
  const handleSaveEditPlan = (e) => {
    e.preventDefault();
    if (!editingPlan) return;
    setSubscriptionPlans(prev => prev.map(p => p.id === editingPlan.id ? editingPlan : p));
    setEditingPlan(null);
  };

  // Filtered Plans
  const filteredPlans = subscriptionPlans.filter(p => {
    if (roleFilter === "All Plans") return true;
    if (roleFilter === "Lender Plans") return p.targetRole === "Lender";
    if (roleFilter === "Agent Plans") return p.targetRole === "OAL Agent";
    return true;
  });

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Subscription Plans & Package Manager
            <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full font-mono flex items-center gap-1">
              <CreditCard size={12} />
              Multi-Tier Billing Active
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Configure recurring subscription packages for Lenders and OAL Agents, set bidding limits, and manage feature access.</p>
        </div>

        <button
          onClick={() => setShowCreatePlanModal(true)}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-purple-900/20 flex items-center gap-2"
        >
          <Plus size={16} />
          Create Subscription Tier
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Active Subscriptions</p>
            <p className="text-2xl font-bold text-white mt-1">340</p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
            <CreditCard size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Lender Subscribers</p>
            <p className="text-2xl font-bold text-blue-400 mt-1">230</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <Users size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Agent Subscribers</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">110</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <ShieldCheck size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Monthly Recurring Revenue (MRR)</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">₹54.2 Lakh</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>

      {/* Target Role Filter Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs overflow-x-auto">
        {["All Plans", "Lender Plans", "Agent Plans"].map((tab) => (
          <button
            key={tab}
            onClick={() => setRoleFilter(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              roleFilter === tab
                ? "bg-purple-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Subscription Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-md font-bold uppercase border ${
                  plan.targetRole === "Lender"
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                }`}>
                  {plan.targetRole} Tier
                </span>
                <button
                  onClick={() => setEditingPlan({ ...plan })}
                  className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  title="Edit Package & Features"
                >
                  <Edit2 size={14} />
                </button>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{plan.id}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-emerald-400">{plan.price}</span>
                  <span className="text-xs text-slate-500">/ {plan.billingCycle.toLowerCase()}</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 font-medium">Active Paid Subscribers: <strong className="text-white">{plan.activeSubscribers}</strong></p>
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Tier Privileges & Limits:</p>
                <ul className="space-y-1.5">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300">
                      <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-850 flex justify-between items-center text-xs">
              <span className="text-slate-500">Status: <strong className="text-emerald-400">{plan.status}</strong></span>
              <button
                onClick={() => setEditingPlan({ ...plan })}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors text-xs border border-slate-700 font-medium"
              >
                Configure Package
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Subscription Plan Modal */}
      {showCreatePlanModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus size={18} className="text-purple-400" />
                Create New Subscription Package
              </h3>
              <button onClick={() => setShowCreatePlanModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePlan} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Package Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lender Growth Tier"
                  value={newPlanForm.name}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Target Role</label>
                  <select
                    value={newPlanForm.targetRole}
                    onChange={(e) => setNewPlanForm({ ...newPlanForm, targetRole: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="Lender">Lender</option>
                    <option value="OAL Agent">OAL Agent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Monthly Price</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹14,999"
                    value={newPlanForm.price}
                    onChange={(e) => setNewPlanForm({ ...newPlanForm, price: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Features List (Comma Separated)</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Up to 100 bids/month, Full Analytics, Priority Support"
                  value={newPlanForm.features}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, features: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreatePlanModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold"
                >
                  Deploy Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Subscription Plan Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit2 size={18} className="text-purple-400" />
                Edit Subscription Package ({editingPlan.id})
              </h3>
              <button onClick={() => setEditingPlan(null)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEditPlan} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Package Name</label>
                <input
                  type="text"
                  required
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Monthly Price</label>
                <input
                  type="text"
                  required
                  value={editingPlan.price}
                  onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold"
                >
                  Save Tier Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
