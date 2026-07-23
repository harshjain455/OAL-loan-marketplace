import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, ShieldCheck, Award, Eye, Briefcase, Trash2, CheckCircle2, Zap, Settings, ShieldAlert, X, DollarSign, Calendar, TrendingUp, AlertTriangle } from "lucide-react";

export default function LenderAILeadAlerts() {
  const [activeTab, setActiveTab] = useState("all");
  const [alerts, setAlerts] = useState([
    {
      id: "alert-1",
      leadId: "OAL-9842",
      score: 94,
      amount: "$75,000",
      purpose: "Commercial Real Estate",
      time: "Just now",
      priority: "high",
      isRead: false,
      matchReason: "iNV IQ Score is exceptional (94) & requested term matches preferred criteria.",
      term: "24 Months",
      riskLevel: "Low Risk",
      targetRate: "6.5% - 8.0%",
      creditGrade: "AA+",
      debtToIncome: "22%",
      annualRevenue: "$650,000",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" },
        { name: "Tax Filings & Audit Logs", status: "Verified" }
      ]
    },
    {
      id: "alert-2",
      leadId: "OAL-8843",
      score: 88,
      amount: "$45,000",
      purpose: "Equipment Financing",
      time: "15 mins ago",
      priority: "high",
      isRead: false,
      matchReason: "Perfect match with Equipment Financing parameters.",
      term: "12 Months",
      riskLevel: "Low Risk",
      targetRate: "7.0% - 9.0%",
      creditGrade: "A",
      debtToIncome: "18%",
      annualRevenue: "$320,000",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" }
      ]
    },
    {
      id: "alert-3",
      leadId: "OAL-7210",
      score: 82,
      amount: "$120,000",
      purpose: "Working Capital",
      time: "2 hours ago",
      priority: "medium",
      isRead: true,
      matchReason: "LTI ratio falls within acceptable thresholds.",
      term: "36 Months",
      riskLevel: "Moderate Risk",
      targetRate: "8.5% - 10.5%",
      creditGrade: "B+",
      debtToIncome: "28%",
      annualRevenue: "$980,050",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" },
        { name: "Tax Filings & Audit Logs", status: "Verified" }
      ]
    },
    {
      id: "alert-4",
      leadId: "OAL-6501",
      score: 91,
      amount: "$200,000",
      purpose: "Business Expansion",
      time: "1 day ago",
      priority: "high",
      isRead: true,
      matchReason: "High-grade borrower with pre-approved KYC status.",
      term: "48 Months",
      riskLevel: "Low Risk",
      targetRate: "6.0% - 7.5%",
      creditGrade: "AAA",
      debtToIncome: "15%",
      annualRevenue: "$1,450,000",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" },
        { name: "Tax Filings & Audit Logs", status: "Verified" }
      ]
    }
  ]);

  // Modal States
  const [selectedLead, setSelectedLead] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  // Form State for Submit Offer
  const [offerAmount, setOfferAmount] = useState("");
  const [offerRate, setOfferRate] = useState("");
  const [offerDuration, setOfferDuration] = useState("");

  // Delete Confirmation Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [alertToDelete, setAlertToDelete] = useState(null);

  const promptDeleteAlert = (alert) => {
    setAlertToDelete(alert);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteAlert = () => {
    if (alertToDelete) {
      setAlerts(alerts.filter((alert) => alert.id !== alertToDelete.id));
      setIsDeleteModalOpen(false);
      setAlertToDelete(null);
    }
  };

  const markAsRead = (id) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, isRead: true } : alert)));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map((alert) => ({ ...alert, isRead: true })));
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const deleteAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
    showToast("Alert successfully dismissed.");
  };

  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 5000);
  };

  const openViewModal = (lead) => {
    setSelectedLead(lead);
    setIsViewModalOpen(true);
  };

  const openOfferModal = (lead) => {
    setSelectedLead(lead);
    setOfferAmount(lead.amount.replace(/[^0-9]/g, ""));
    setOfferRate("");
    setOfferDuration(lead.term.replace(/[^0-9]/g, ""));
    setIsOfferModalOpen(true);
  };

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    if (!offerAmount || !offerRate || !offerDuration) {
      showToast("Please fill in all offer terms");
      return;
    }
    showToast(`Offer successfully submitted for Lead ${selectedLead.id}!\nAmount: $${Number(offerAmount).toLocaleString()}\nInterest Rate: ${offerRate}%\nDuration: ${offerDuration} Months`);
    setIsOfferModalOpen(false);
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (activeTab === "unread") return !alert.isRead;
    if (activeTab === "high") return alert.priority === "high";
    return true;
  });

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
              <Bell size={22} className="animate-pulse" />
            </div>
            AI Lead Alerts
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time triggers generated when borrower scores match your investment criteria.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/25 px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            Mark All as Read
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Feed Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Feed Filter Menu */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800/80 p-1.5 rounded-xl text-xs font-semibold max-w-sm">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === "all" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              All Alerts
            </button>
            <button
              onClick={() => setActiveTab("unread")}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "unread" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("high")}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === "high" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              High Priority
            </button>
          </div>

          {/* Feed Cards */}
          <div className="space-y-3.5">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950/90 border rounded-2xl p-5 shadow-xl transition-all ${
                  !alert.isRead ? "border-indigo-500/25 shadow-indigo-950/10" : "border-slate-800/70"
                }`}
              >
                {/* Visual Unread Glow Light */}
                {!alert.isRead && (
                  <span className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-lg shadow-indigo-500/80"></span>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/40 pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border shrink-0 ${
                      alert.priority === "high"
                        ? "text-rose-400 bg-rose-500/10 border-rose-500/20"
                        : "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
                    }`}>
                      {alert.priority === "high" ? <ShieldAlert size={18} /> : <Zap size={18} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white">{alert.leadId}</span>
                        <span className="text-[10px] bg-slate-950 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-md font-bold">
                          {alert.purpose}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{alert.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                      <Award size={14} className="text-indigo-400" />
                      {alert.score} iNV IQ
                    </span>
                  </div>
                </div>

                <div className="py-4">
                  <p className="text-xs text-slate-200 font-semibold">
                    Matched for: <span className="text-white font-extrabold">{alert.amount}</span> / {alert.term}
                  </p>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-medium">
                    {alert.matchReason}
                  </p>
                </div>

                {/* Actions Panel */}
                <div className="pt-3 border-t border-slate-800/40 flex items-center justify-between text-xs">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openViewModal(alert)}
                      className="flex items-center gap-1.5 text-slate-350 hover:text-white bg-slate-950 border border-slate-800/80 px-3.5 py-2 rounded-xl transition-colors font-bold cursor-pointer text-xs"
                    >
                      <Eye size={14} />
                      View Profile
                    </button>
                    <button
                      onClick={() => openOfferModal(alert)}
                      className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-2 rounded-xl transition-colors font-bold cursor-pointer text-xs"
                    >
                      <Briefcase size={14} />
                      Submit Bid
                    </button>
                  </div>

                  <div className="flex gap-1.5">
                    {!alert.isRead && (
                      <button
                        onClick={() => markAsRead(alert.id)}
                        className="p-2 text-slate-400 hover:text-emerald-400 rounded-xl hover:bg-emerald-500/10 transition-colors cursor-pointer"
                        title="Mark as Read"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => promptDeleteAlert(alert)}
                      className="p-2 text-slate-450 hover:text-rose-450 rounded-xl hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Dismiss Alert"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredAlerts.length === 0 && (
              <div className="text-center py-16 bg-slate-900/40 border border-slate-850 rounded-2xl p-6 text-slate-500 text-sm">
                No active notifications found in this category.
              </div>
            )}
          </div>
        </div>

        {/* Match Rules Preference Card (1 Column) */}
        <div className="lg:col-span-1 bg-slate-900/90 border border-slate-800/85 rounded-2xl p-6 shadow-xl space-y-5 h-fit lg:mt-[52px]">
          <div className="flex items-center gap-2 border-b border-slate-800/60 pb-3">
            <Settings size={18} className="text-indigo-400" />
            <h2 className="text-xs font-black text-white uppercase tracking-wider">Matching Parameters</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
              <span className="text-slate-400 font-bold block mb-1">Minimum iNV IQ Threshold</span>
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-white text-sm">80 Points</span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">High Grade</span>
              </div>
            </div>

            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
              <span className="text-slate-400 font-bold block mb-1">Target Funding Allocation</span>
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-white text-sm">$25,000 - $250,000</span>
              </div>
            </div>

            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
              <span className="text-slate-400 font-bold block mb-1">Auto-Alert System Status</span>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active and Listening
              </div>
            </div>
          </div>

          <Link
            to="/lender/settings"
            className="w-full mt-4 py-2.5 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-all border border-slate-700/60 flex items-center justify-center gap-1.5"
          >
            Configure Rules
          </Link>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && alertToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-[2px] animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl relative overflow-hidden flex flex-col text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Dismiss AI Lead Alert?</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Are you sure you want to dismiss the alert for <span className="text-white font-bold">{alertToDelete.leadId}</span>?
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
                onClick={confirmDeleteAlert}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer text-xs font-semibold shadow-lg shadow-rose-950/30"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {isViewModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-[2px] animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg font-bold text-white">{selectedLead.leadId}</h3>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <ShieldCheck size={12} />
                    Anonymous Borrower
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Pre-screened financial profile lookup</p>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto py-5 space-y-5 no-scrollbar pr-1">
              {/* Score breakdown bar */}
              <div className="bg-slate-950/50 border border-slate-800/60 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg">
                    <Award size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-450 uppercase tracking-wider font-semibold block">iNV IQ AI Score</span>
                    <span className="text-xl font-black text-white">{selectedLead.score}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                  {selectedLead.riskLevel || "Low Risk"}
                </span>
              </div>

              {/* Grid data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/30 border border-slate-800/50 p-4 rounded-xl space-y-2.5">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Loan Requirement</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-850 pb-1.5">
                      <span className="text-slate-400">Target Amount</span>
                      <span className="font-bold text-white">{selectedLead.amount}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-850 pb-1.5">
                      <span className="text-slate-400">Preferred Term</span>
                      <span className="font-semibold text-slate-200">{selectedLead.term}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Rate</span>
                      <span className="font-semibold text-indigo-400">{selectedLead.targetRate}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/30 border border-slate-800/50 p-4 rounded-xl space-y-2.5">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Financial Risk Metrics</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-850 pb-1.5">
                      <span className="text-slate-400">Credit Score Grade</span>
                      <span className="font-bold text-emerald-400">{selectedLead.creditGrade}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-850 pb-1.5">
                      <span className="text-slate-400">Debt-to-Income (DTI)</span>
                      <span className="font-semibold text-slate-200">{selectedLead.debtToIncome}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Annual Business Revenue</span>
                      <span className="font-semibold text-slate-200">{selectedLead.annualRevenue}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* KYC Checklist */}
              {selectedLead.kycDocuments && (
                <div className="bg-slate-950/30 border border-slate-800/50 p-4 rounded-xl">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">KYC Verification Audit</h4>
                  <div className="space-y-2 text-xs">
                    {selectedLead.kycDocuments.map((doc, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-slate-400">{doc.name}</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                          <CheckCircle2 size={11} />
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-slate-800/80 pt-4 flex items-center justify-end gap-3 mt-auto">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  openOfferModal(selectedLead);
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5"
              >
                <Briefcase size={14} />
                Make Offer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMIT OFFER MODAL */}
      {isOfferModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-[2px] animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
                    <Briefcase size={16} />
                  </div>
                  Submit Bid Offer
                </h3>
                <p className="text-xs text-slate-400 mt-1">Deploy custom terms directly to Lead {selectedLead.leadId}</p>
              </div>
              <button
                onClick={() => setIsOfferModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitOffer} className="space-y-4 py-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">Target Lead</label>
                <input
                  type="text"
                  value={selectedLead.leadId}
                  disabled
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-400 text-xs font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">Offer Amount ($)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">$</span>
                  <input
                    type="number"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    required
                    placeholder="e.g. 75000"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-8 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={offerRate}
                    onChange={(e) => setOfferRate(e.target.value)}
                    required
                    placeholder="e.g. 7.2"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">Duration (Months)</label>
                  <input
                    type="number"
                    value={offerDuration}
                    onChange={(e) => setOfferDuration(e.target.value)}
                    required
                    placeholder="e.g. 24"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 text-[10px] text-slate-450 flex items-start gap-2">
                <ShieldCheck size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                <span>By submitting, the terms will be forwarded to OAL Agent waiting room. Lender maintains control to edit or withdraw active offers.</span>
              </div>

              {/* Footer Actions */}
              <div className="border-t border-slate-800/80 pt-4 flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer text-xs font-semibold"
                >
                  Forward Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Dismiss Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 space-y-6 relative shadow-2xl animate-scale-in">
            <button
              onClick={() => setConfirmDeleteId(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-100">Dismiss Notification Alert?</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Are you sure you want to dismiss this lead match alert? This alert will be permanently removed from your feed.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 border border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteAlert(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-lg"
              >
                Yes, Dismiss Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-emerald-500 text-slate-100 p-4 rounded-xl shadow-2xl flex items-start gap-2 z-50 text-xs animate-bounce max-w-sm whitespace-pre-line">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
