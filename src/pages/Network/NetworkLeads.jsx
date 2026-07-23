import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  AlertCircle, Sparkles, Filter, Search, CheckCircle2, Zap, Eye, Bell, 
  ChevronRight, Shield, Award, ArrowUpRight, X, SlidersHorizontal, Check 
} from "lucide-react";

export default function NetworkLeads() {
  const [selectedScoreFilter, setSelectedScoreFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("matched"); // 'matched' vs 'alerts'
  const [selectedLeadModal, setSelectedLeadModal] = useState(null);
  const [alertRuleModal, setAlertRuleModal] = useState(false);
  const [ruleSavedMsg, setRuleSavedMsg] = useState("");

  // Alert Rule Form State
  const [ruleMinScore, setRuleMinScore] = useState("800");
  const [ruleMaxAmount, setRuleMaxAmount] = useState("5000000");

  const qualifiedLeadsList = [
    {
      id: "LEAD-1081",
      name: "TechVentures India Pvt Ltd",
      matchPercent: "98.4% Match",
      invIqScore: "880 (A+ Super Prime)",
      scoreGrade: "A+",
      amount: "₹45,00,000",
      tenure: "36 Months",
      turnover: "₹3.8 Crore / year",
      tags: ["High Cashflow Velocity", "Zero Bureau Default", "GST Verified 3 Yrs"],
      assignedAgent: "Vikramaditya Roy (ADM-101)",
      matchedDate: "Today, 10:14 AM",
      status: "QUALIFIED"
    },
    {
      id: "LEAD-1078",
      name: "Apollo Pharma Distributors",
      matchPercent: "94.2% Match",
      invIqScore: "840 (A Grade)",
      scoreGrade: "A",
      amount: "₹25,00,000",
      tenure: "12 Months",
      turnover: "₹2.1 Crore / year",
      tags: ["Short-term Working Cap", "Proven Repayment Log"],
      assignedAgent: "Pooja Gupta (ADM-102)",
      matchedDate: "Today, 09:30 AM",
      status: "QUALIFIED"
    },
    {
      id: "LEAD-1075",
      name: "Sharma Logistics & Freight",
      matchPercent: "96.8% Match",
      invIqScore: "910 (A+ Super Prime)",
      scoreGrade: "A+",
      amount: "₹60,00,000",
      tenure: "48 Months",
      turnover: "₹6.4 Crore / year",
      tags: ["Asset Backed Collateral", "Fast-track Underwriting"],
      assignedAgent: "Amit Verma (REP-101)",
      matchedDate: "Yesterday, 04:15 PM",
      status: "QUALIFIED"
    },
    {
      id: "LEAD-1070",
      name: "Verma Retail Chains",
      matchPercent: "89.5% Match",
      invIqScore: "790 (B+ Verified)",
      scoreGrade: "B+",
      amount: "₹18,50,000",
      tenure: "24 Months",
      turnover: "₹1.4 Crore / year",
      tags: ["Seasonal Retail Demand", "Verified Bank Statement"],
      assignedAgent: "Rajesh Kulkarni (ADM-103)",
      matchedDate: "Yesterday, 02:00 PM",
      status: "QUALIFIED"
    }
  ];

  const pushAlertsList = [
    { id: "ALT-401", title: "New A+ Lead Match", desc: "TechVentures India matched your minimum 850+ score threshold.", time: "10 mins ago", type: "CRITICAL" },
    { id: "ALT-398", title: "iNV IQ™ Score Rating Update", desc: "Sharma Logistics upgraded to 910 A+ Super Prime status.", time: "45 mins ago", type: "INFO" },
    { id: "ALT-395", title: "Bid Proposal Accepted", desc: "Apollo Pharma accepted 8.5% APR bid from Institutional Desk #104.", time: "2 hours ago", type: "SUCCESS" }
  ];

  const filteredLeads = qualifiedLeadsList.filter(lead => {
    const matchesSearch = lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedScoreFilter === "aplus") return matchesSearch && lead.scoreGrade === "A+";
    if (selectedScoreFilter === "a") return matchesSearch && lead.scoreGrade === "A";
    if (selectedScoreFilter === "bplus") return matchesSearch && lead.scoreGrade === "B+";
    return matchesSearch;
  });

  const handleSaveAlertRule = (e) => {
    e.preventDefault();
    setRuleSavedMsg(`Push Alert Rule Saved: Notify whenever iNV IQ score ≥ ${ruleMinScore} & Loan ≤ ₹${(ruleMaxAmount/100000).toFixed(1)} Lakh.`);
    setTimeout(() => {
      setRuleSavedMsg("");
      setAlertRuleModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1">
              <Sparkles size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
              iNV IQ™ Real-Time Lead Matching Active
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">Qualified Leads & Alerts</h1>
          <p className="text-xs text-slate-400 mt-1">Automated push notifications and pre-screened borrower leads matched to your risk criteria.</p>
        </div>

        <button
          onClick={() => setAlertRuleModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-900/30 transition-all flex items-center gap-1.5"
        >
          <SlidersHorizontal size={14} />
          <span>Configure Push Alert Rules</span>
        </button>
      </div>

      {/* Real-time Notification Banner */}
      <div className="p-4 bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-blue-900/30 border border-purple-500/30 rounded-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30 shrink-0">
            <Bell size={18} className="animate-bounce" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">⚡ Real-Time Push Alert Live</p>
            <p className="text-[11px] text-slate-300">3 New borrower applications matched your target iNV IQ score (800+) in the last 2 hours.</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("alerts")}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-purple-300 text-xs font-bold rounded-lg border border-purple-500/30 whitespace-nowrap transition-colors"
        >
          View Alert Log →
        </button>
      </div>

      {/* Tabs & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("matched")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === "matched"
                ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/30"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            Matched Leads Roster ({filteredLeads.length})
          </button>
          <button
            onClick={() => setActiveTab("alerts")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === "alerts"
                ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/30"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            AI Alert Logs ({pushAlertsList.length})
          </button>
        </div>

        {activeTab === "matched" && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              {[
                { id: "all", label: "All Scores" },
                { id: "aplus", label: "A+ Super Prime" },
                { id: "a", label: "A Grade" },
                { id: "bplus", label: "B+ Grade" },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedScoreFilter(f.id)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    selectedScoreFilter === f.id ? "bg-slate-100 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-48">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* MATCHED LEADS TAB CONTENT */}
      {activeTab === "matched" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 hover:border-slate-700 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">{lead.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {lead.matchPercent}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{lead.name}</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Turnover: {lead.turnover}</p>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                    {lead.scoreGrade} Rating
                  </span>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">{lead.matchedDate}</p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-850 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Loan Amount</span>
                  <p className="font-mono text-base font-black text-blue-400">{lead.amount}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">iNV IQ™ Rating</span>
                  <p className="font-mono text-emerald-400 font-bold">{lead.invIqScore}</p>
                </div>
              </div>

              {/* Match Factors Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {lead.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 text-[10px] font-medium border border-slate-800">
                    ✓ {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 border-t border-slate-850">
                <button
                  onClick={() => setSelectedLeadModal(lead)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye size={14} />
                  <span>Inspect Lead Specs</span>
                </button>
                <Link
                  to="/network/live-stream"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/30"
                >
                  <Zap size={14} />
                  <span>Place Bid in Stream</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PUSH ALERTS LOG TAB CONTENT */}
      {activeTab === "alerts" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Bell size={18} className="text-purple-400" />
            AI Push Notification Trigger Log
          </h3>

          <div className="space-y-3">
            {pushAlertsList.map((alert) => (
              <div key={alert.id} className="p-4 bg-slate-950 border border-slate-850 rounded-xl flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">{alert.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                      {alert.type}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{alert.title}</h4>
                  <p className="text-xs text-slate-400">{alert.desc}</p>
                </div>
                <span className="text-[10px] text-slate-500 font-mono shrink-0">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INSPECT LEAD MODAL */}
      {selectedLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold">{selectedLeadModal.id}</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedLeadModal.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedLeadModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">iNV IQ™ Match Score</span>
                <p className="text-base font-bold text-emerald-400">{selectedLeadModal.invIqScore} • {selectedLeadModal.matchPercent}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-850">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Loan Capital Needed</span>
                  <p className="text-base font-bold text-blue-400 font-mono">{selectedLeadModal.amount}</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-850">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Annual Turnover</span>
                  <p className="text-base font-bold text-white font-mono">{selectedLeadModal.turnover}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSelectedLeadModal(null)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs"
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIGURE PUSH ALERT RULE MODAL */}
      {alertRuleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-purple-400 font-bold">Configure Alert Notifications</span>
                <h3 className="text-base font-bold text-white mt-0.5">Set Custom Risk Threshold</h3>
              </div>
              <button 
                onClick={() => setAlertRuleModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {ruleSavedMsg ? (
              <div className="p-4 bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-xl text-xs font-bold text-center">
                {ruleSavedMsg}
              </div>
            ) : (
              <form onSubmit={handleSaveAlertRule} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Minimum iNV IQ Score Threshold</label>
                  <select
                    value={ruleMinScore}
                    onChange={(e) => setRuleMinScore(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-slate-100 font-bold focus:outline-none focus:border-purple-500"
                  >
                    <option value="850">850+ (A+ Super Prime Only)</option>
                    <option value="800">800+ (A Grade and above)</option>
                    <option value="750">750+ (B+ Grade and above)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Maximum Preferred Loan Capital</label>
                  <input
                    type="number"
                    value={ruleMaxAmount}
                    onChange={(e) => setRuleMaxAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-slate-100 font-mono font-bold focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAlertRuleModal(false)}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-900/30"
                  >
                    Save Alert Trigger Rule
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
