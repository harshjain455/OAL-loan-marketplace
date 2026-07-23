import React, { useState } from "react";
import { Briefcase, Plus, Edit2, Trash2, X, CheckCircle2, Clock, AlertCircle, ShieldCheck, DollarSign, Percent, Calendar, AlertTriangle } from "lucide-react";

const INITIAL_OFFERS = [
  {
    id: "OFR-4421",
    leadId: "OAL-9842",
    amount: 75000,
    rate: 7.2,
    duration: 24,
    status: "Pending",
    submittedAt: "Today, 10:30 AM",
    notes: "Priority bid — commercial real estate expansion"
  },
  {
    id: "OFR-3801",
    leadId: "OAL-6501",
    amount: 190000,
    rate: 6.5,
    duration: 48,
    status: "Accepted",
    submittedAt: "Yesterday, 04:15 PM",
    notes: "Structured repayment preferred"
  },
  {
    id: "OFR-3204",
    leadId: "OAL-8843",
    amount: 42000,
    rate: 8.5,
    duration: 12,
    status: "Rejected",
    submittedAt: "Jul 20, 2026",
    notes: "Equipment financing short-term"
  }
];

const STATUS_CONFIG = {
  Pending: { color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", icon: Clock },
  Accepted: { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", icon: CheckCircle2 },
  Rejected: { color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20", icon: AlertCircle }
};

export default function LenderOfferManagement() {
  const [offers, setOffers] = useState(INITIAL_OFFERS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  // Form state
  const [formData, setFormData] = useState({ leadId: "", amount: "", rate: "", duration: "", notes: "" });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.leadId.trim()) errors.leadId = "Lead ID is required";
    if (!formData.amount || Number(formData.amount) < 1000) errors.amount = "Minimum amount is $1,000";
    if (!formData.rate || Number(formData.rate) < 1 || Number(formData.rate) > 50) errors.rate = "Rate must be between 1% - 50%";
    if (!formData.duration || Number(formData.duration) < 1) errors.duration = "Duration is required";
    return errors;
  };

  const openCreateForm = () => {
    setEditingOffer(null);
    setFormData({ leadId: "", amount: "", rate: "", duration: "", notes: "" });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openEditForm = (offer) => {
    setEditingOffer(offer);
    setFormData({
      leadId: offer.leadId,
      amount: String(offer.amount),
      rate: String(offer.rate),
      duration: String(offer.duration),
      notes: offer.notes
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingOffer) {
      setOffers((prev) =>
        prev.map((o) =>
          o.id === editingOffer.id
            ? { ...o, leadId: formData.leadId, amount: Number(formData.amount), rate: Number(formData.rate), duration: Number(formData.duration), notes: formData.notes }
            : o
        )
      );
    } else {
      const newOffer = {
        id: `OFR-${Math.floor(1000 + Math.random() * 9000)}`,
        leadId: formData.leadId,
        amount: Number(formData.amount),
        rate: Number(formData.rate),
        duration: Number(formData.duration),
        status: "Pending",
        submittedAt: "Just now",
        notes: formData.notes
      };
      setOffers((prev) => [newOffer, ...prev]);
    }
    setIsFormOpen(false);
    setEditingOffer(null);
  };

  const promptDelete = (offer) => {
    setDeleteTarget(offer);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setOffers((prev) => prev.filter((o) => o.id !== deleteTarget.id));
      setIsDeleteModalOpen(false);
      setDeleteTarget(null);
    }
  };

  const withdrawOffer = (id) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "Withdrawn" } : o))
    );
  };

  const filteredOffers = activeFilter === "All" ? offers : offers.filter((o) => o.status === activeFilter);

  const stats = {
    total: offers.length,
    pending: offers.filter((o) => o.status === "Pending").length,
    accepted: offers.filter((o) => o.status === "Accepted").length,
    rejected: offers.filter((o) => o.status === "Rejected").length
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
              <Briefcase size={22} />
            </div>
            Offer Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Submit, manage, and track custom bid offers deployed to qualified leads.
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-indigo-900/30 cursor-pointer"
        >
          <Plus size={16} />
          Create New Offer
        </button>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Offers", value: stats.total, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20", icon: Briefcase },
          { label: "Pending", value: stats.pending, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", icon: Clock },
          { label: "Accepted", value: stats.accepted, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", icon: CheckCircle2 },
          { label: "Rejected", value: stats.rejected, color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20", icon: AlertCircle }
        ].map(({ label, value, color, bg, icon: Icon }) => (
          <div key={label} className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 shadow-md flex items-center gap-3">
            <div className={`p-2.5 ${bg} border ${color} rounded-xl`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-semibold">{label}</div>
              <div className={`text-2xl font-black ${color}`}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Offers Table */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        {/* Filters */}
        <div className="px-6 py-4 border-b border-slate-800/60 flex flex-wrap items-center gap-3 justify-between">
          <h2 className="text-sm font-bold text-white">Active Offer Pipeline</h2>
          <div className="flex items-center gap-2 text-xs font-semibold">
            {["All", "Pending", "Accepted", "Rejected"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeFilter === f
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800/60">
              <tr>
                <th className="px-6 py-4 font-semibold">Offer ID</th>
                <th className="px-6 py-4 font-semibold">Target Lead</th>
                <th className="px-6 py-4 font-semibold">Offer Terms</th>
                <th className="px-6 py-4 font-semibold">Submitted</th>
                <th className="px-6 py-4 font-semibold">Notes</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredOffers.map((offer) => {
                const sc = STATUS_CONFIG[offer.status] || { color: "text-slate-400", bg: "bg-slate-800 border-slate-700", icon: Clock };
                const StatusIcon = sc.icon;
                const isPending = offer.status === "Pending";
                return (
                  <tr key={offer.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-indigo-400 text-sm">{offer.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 font-bold text-white">
                        <ShieldCheck size={13} className="text-emerald-400" />
                        {offer.leadId}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-white font-bold">
                          <DollarSign size={12} className="text-slate-400" />
                          ${offer.amount.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-slate-400">
                          <Percent size={11} />
                          {offer.rate}% &nbsp;·&nbsp;
                          <Calendar size={11} />
                          {offer.duration} Mo
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{offer.submittedAt}</td>
                    <td className="px-6 py-4 text-slate-400 max-w-[180px] truncate" title={offer.notes}>
                      {offer.notes || "—"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-[10px] ${sc.bg} border ${sc.color} px-2.5 py-1 rounded-full font-bold flex items-center justify-center gap-1 w-fit mx-auto`}>
                        <StatusIcon size={12} />
                        {offer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {isPending && (
                          <>
                            <button
                              onClick={() => openEditForm(offer)}
                              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                              title="Edit Offer"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => withdrawOffer(offer.id)}
                              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer"
                              title="Withdraw Offer"
                            >
                              <X size={14} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => promptDelete(offer)}
                          className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-colors cursor-pointer"
                          title="Delete Offer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredOffers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-slate-500 text-sm">
                    No offers found in this category. Create a new offer to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT OFFER MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-[2px] animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col">
            <div className="flex justify-between items-start border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
                    <Briefcase size={16} />
                  </div>
                  {editingOffer ? "Edit Offer" : "Create New Offer"}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {editingOffer
                    ? `Updating terms for offer ${editingOffer.id}`
                    : "Deploy a custom bid offer to a qualified borrower lead"}
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 py-5">
              {/* Lead ID */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Target Lead ID</label>
                <input
                  type="text"
                  value={formData.leadId}
                  onChange={(e) => setFormData({ ...formData, leadId: e.target.value })}
                  placeholder="e.g. OAL-9842"
                  className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none font-medium ${formErrors.leadId ? "border-rose-500" : "border-slate-800 focus:border-indigo-500"}`}
                />
                {formErrors.leadId && <p className="text-[10px] text-rose-400 mt-1">{formErrors.leadId}</p>}
              </div>

              {/* Amount */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Offer Amount ($)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">$</span>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="e.g. 75000"
                    className={`w-full bg-slate-950 border rounded-xl pl-8 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none font-medium ${formErrors.amount ? "border-rose-500" : "border-slate-800 focus:border-indigo-500"}`}
                  />
                </div>
                {formErrors.amount && <p className="text-[10px] text-rose-400 mt-1">{formErrors.amount}</p>}
              </div>

              {/* Rate & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.rate}
                    onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                    placeholder="e.g. 7.2"
                    className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none font-medium ${formErrors.rate ? "border-rose-500" : "border-slate-800 focus:border-indigo-500"}`}
                  />
                  {formErrors.rate && <p className="text-[10px] text-rose-400 mt-1">{formErrors.rate}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Duration (Months)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 24"
                    className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none font-medium ${formErrors.duration ? "border-rose-500" : "border-slate-800 focus:border-indigo-500"}`}
                  />
                  {formErrors.duration && <p className="text-[10px] text-rose-400 mt-1">{formErrors.duration}</p>}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Internal Notes (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                  placeholder="e.g. Priority bid for commercial real estate expansion..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none resize-none font-medium"
                />
              </div>

              <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 text-[10px] text-slate-400 flex items-start gap-2">
                <ShieldCheck size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                <span>Offer will be placed into OAL Waiting Room for review. You maintain full control to update or withdraw until accepted.</span>
              </div>

              <div className="border-t border-slate-800/80 pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer text-xs font-semibold"
                >
                  {editingOffer ? "Update Offer" : "Submit Offer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-[2px] animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl flex flex-col text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Delete Offer?</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Are you sure you want to permanently delete offer <span className="text-white font-bold">{deleteTarget.id}</span> for lead <span className="text-white font-bold">{deleteTarget.leadId}</span>?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer text-xs font-semibold shadow-lg shadow-rose-950/30"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
