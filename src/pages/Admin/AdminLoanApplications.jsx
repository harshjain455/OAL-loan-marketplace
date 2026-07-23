import React, { useState } from "react";
import { 
  FileText, DollarSign, Activity, CheckCircle2, Clock, Search, Filter, Eye, X, ArrowUpRight, Building2, User, ChevronRight, ShieldCheck, Tag, Calendar 
} from "lucide-react";

export default function AdminLoanApplications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApp, setSelectedApp] = useState(null);

  // Mock Loan Applications Data across platform
  const [applications] = useState([
    {
      id: "APP-9010",
      borrowerName: "Rahul Sharma",
      borrowerEmail: "rahul.sharma@example.com",
      amount: "$25,000",
      term: "24 Months",
      purpose: "Working Capital",
      status: "Processing",
      assignedRep: "Sarah Jenkins",
      matchedLender: "Apex Capital Lending LLC",
      appliedDate: "2026-01-10",
      lastUpdated: "2026-01-22 14:30 EST",
      aiScore: 750,
      timeline: [
        { stage: "Loan Application Submitted", timestamp: "2026-01-10 09:15 AM", done: true },
        { stage: "AI Risk Scoring & Verification", timestamp: "2026-01-10 09:20 AM", done: true },
        { stage: "Assigned to OAL Rep (Sarah Jenkins)", timestamp: "2026-01-11 11:00 AM", done: true },
        { stage: "Matched with Lender (Apex Capital)", timestamp: "2026-01-15 02:45 PM", done: true },
        { stage: "Lender Offer Accepted", timestamp: "2026-01-20 04:10 PM", done: true },
        { stage: "Final Contract & Funding Disbursal", timestamp: "Pending Disbursal", done: false }
      ]
    },
    {
      id: "APP-9011",
      borrowerName: "Sneha Reddy",
      borrowerEmail: "sneha.reddy@example.com",
      amount: "$45,000",
      term: "36 Months",
      purpose: "Business Expansion",
      status: "Under Review",
      assignedRep: "Sarah Jenkins",
      matchedLender: "Pending Match",
      appliedDate: "2026-01-18",
      lastUpdated: "2026-01-21 11:05 EST",
      aiScore: 780,
      timeline: [
        { stage: "Loan Application Submitted", timestamp: "2026-01-18 10:00 AM", done: true },
        { stage: "AI Risk Scoring & Verification", timestamp: "2026-01-18 10:05 AM", done: true },
        { stage: "Assigned to OAL Rep (Sarah Jenkins)", timestamp: "2026-01-19 09:30 AM", done: true },
        { stage: "Matching with Qualified Lenders", timestamp: "In Progress", done: false },
        { stage: "Lender Offer Accepted", timestamp: "Awaiting Offers", done: false },
        { stage: "Final Contract & Funding Disbursal", timestamp: "Pending", done: false }
      ]
    },
    {
      id: "APP-9012",
      borrowerName: "Vikram Malhotra",
      borrowerEmail: "vikram.m@example.com",
      amount: "$15,000",
      term: "12 Months",
      purpose: "Equipment Purchase",
      status: "Funded",
      assignedRep: "David Miller",
      matchedLender: "Horizon Commercial Funding",
      appliedDate: "2025-12-28",
      lastUpdated: "2026-01-02 16:45 EST",
      aiScore: 710,
      timeline: [
        { stage: "Loan Application Submitted", timestamp: "2025-12-28 08:30 AM", done: true },
        { stage: "AI Risk Scoring & Verification", timestamp: "2025-12-28 08:35 AM", done: true },
        { stage: "Assigned to OAL Rep (David Miller)", timestamp: "2025-12-29 10:00 AM", done: true },
        { stage: "Matched with Lender (Horizon Commercial)", timestamp: "2025-12-30 01:15 PM", done: true },
        { stage: "Lender Offer Accepted", timestamp: "2026-01-01 03:00 PM", done: true },
        { stage: "Final Contract & Funding Disbursal", timestamp: "2026-01-02 04:45 PM (COMPLETED)", done: true }
      ]
    },
    {
      id: "APP-9013",
      borrowerName: "Priya Patel",
      borrowerEmail: "priya.patel@example.com",
      amount: "$10,000",
      term: "18 Months",
      purpose: "Debt Consolidation",
      status: "Processing",
      assignedRep: "David Miller",
      matchedLender: "BlueSky Merchant Credit",
      appliedDate: "2026-01-05",
      lastUpdated: "2026-01-19 13:20 EST",
      aiScore: 680,
      timeline: [
        { stage: "Loan Application Submitted", timestamp: "2026-01-05 11:20 AM", done: true },
        { stage: "AI Risk Scoring & Verification", timestamp: "2026-01-05 11:25 AM", done: true },
        { stage: "Assigned to OAL Rep (David Miller)", timestamp: "2026-01-06 02:00 PM", done: true },
        { stage: "Matched with Lender (BlueSky Credit)", timestamp: "2026-01-12 04:30 PM", done: true },
        { stage: "Lender Offer Accepted", timestamp: "Pending Confirmation", done: false },
        { stage: "Final Contract & Funding Disbursal", timestamp: "Pending", done: false }
      ]
    },
    {
      id: "APP-9014",
      borrowerName: "Amit Verma",
      borrowerEmail: "amit.verma@example.com",
      amount: "$50,000",
      term: "36 Months",
      purpose: "Commercial Real Estate",
      status: "Closed",
      assignedRep: "Unassigned",
      matchedLender: "Vanguard Micro-Finance",
      appliedDate: "2025-08-20",
      lastUpdated: "2025-09-10 17:00 EST",
      aiScore: 590,
      timeline: [
        { stage: "Loan Application Submitted", timestamp: "2025-08-20 09:00 AM", done: true },
        { stage: "AI Risk Scoring & Verification", timestamp: "2025-08-20 09:05 AM", done: true },
        { stage: "Loan Repayment Completed", timestamp: "2025-09-10 05:00 PM (CLOSED)", done: true }
      ]
    }
  ]);

  // Filtering
  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.matchedLender.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = applications.length;
  const processingCount = applications.filter(a => a.status === "Processing" || a.status === "Under Review").length;
  const fundedCount = applications.filter(a => a.status === "Funded").length;
  const totalVolume = "$145,000";

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Loan Applications Pipeline</h1>
          <p className="text-sm text-slate-400 mt-1">View-only tracking of marketplace loan applications and funding timestamps.</p>
        </div>
        <div className="text-xs bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <Activity size={14} className="text-blue-400" />
          <span>Active Pipeline: <strong className="text-white">{totalCount} Applications</strong></span>
        </div>
      </div>

      {/* Metric Cards - Clickable Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setStatusFilter("All")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            statusFilter === "All" ? "border-blue-500/50 shadow-md shadow-blue-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Total Applications</p>
            <p className="text-2xl font-bold text-white mt-1">{totalCount}</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <FileText size={20} />
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter("Processing")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            statusFilter === "Processing" ? "border-amber-500/50 shadow-md shadow-amber-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">In Pipeline / Processing</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{processingCount}</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <Clock size={20} />
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter("Funded")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            statusFilter === "Funded" ? "border-emerald-500/50 shadow-md shadow-emerald-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Funded Loans</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{fundedCount}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter("All")}
          className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-all"
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Total Volume Requested</p>
            <p className="text-2xl font-bold text-blue-400 mt-1">{totalVolume}</p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
            <DollarSign size={20} />
          </div>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search App ID, borrower, purpose..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-xs text-slate-400">Status:</span>
          </div>
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {["All", "Processing", "Under Review", "Funded", "Closed"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  statusFilter === status
                    ? "bg-blue-600 text-white font-medium"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Application</th>
                <th className="px-6 py-4 font-semibold">Amount & Term</th>
                <th className="px-6 py-4 font-semibold">Loan Purpose</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Rep & Lender Match</th>
                <th className="px-6 py-4 font-semibold">Applied Date</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500 text-sm">
                    No loan applications match your criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-100 flex items-center gap-1.5">
                          {app.id}
                        </p>
                        <p className="text-xs text-slate-400">{app.borrowerName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-emerald-400">{app.amount}</p>
                        <p className="text-xs text-slate-500">{app.term}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        <Tag size={12} className="text-blue-400" />
                        {app.purpose}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        app.status === "Funded"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : app.status === "Closed"
                          ? "bg-slate-800 text-slate-400 border-slate-700"
                          : app.status === "Under Review"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          app.status === "Funded" ? "bg-emerald-400" : app.status === "Closed" ? "bg-slate-400" : app.status === "Under Review" ? "bg-blue-400" : "bg-amber-400 animate-pulse"
                        }`}></span>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div className="space-y-0.5">
                        <p className="text-slate-300"><strong className="text-slate-500">Rep:</strong> {app.assignedRep}</p>
                        <p className="text-slate-400"><strong className="text-slate-500">Lender:</strong> {app.matchedLender}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {app.appliedDate}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors inline-flex items-center gap-1.5 border border-slate-700"
                        title="View Full Pipeline & Funding Timestamps"
                      >
                        <Eye size={14} className="text-blue-400" />
                        View Pipeline Track
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View-Only Pipeline Lifecycle & Timestamps Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Pipeline Tracker: {selectedApp.id}
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-normal ${
                    selectedApp.status === 'Funded' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {selectedApp.status}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Borrower: {selectedApp.borrowerName} • {selectedApp.borrowerEmail}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {/* Application Details Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <p className="text-slate-500">Requested Amount</p>
                  <p className="text-base font-bold text-emerald-400 mt-0.5">{selectedApp.amount}</p>
                </div>
                <div>
                  <p className="text-slate-500">Loan Term</p>
                  <p className="text-base font-bold text-white mt-0.5">{selectedApp.term}</p>
                </div>
                <div>
                  <p className="text-slate-500">AI Risk Score</p>
                  <p className="text-base font-bold text-blue-400 mt-0.5">{selectedApp.aiScore}</p>
                </div>
                <div>
                  <p className="text-slate-500">Loan Purpose</p>
                  <p className="text-xs font-semibold text-slate-300 mt-1">{selectedApp.purpose}</p>
                </div>
              </div>

              {/* Rep & Lender Tracking */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-2 text-xs">
                <h4 className="font-semibold text-slate-400 uppercase tracking-wider">Stakeholders & Matches</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <p className="text-slate-300"><strong className="text-slate-500">OAL Representative:</strong> {selectedApp.assignedRep}</p>
                  <p className="text-slate-300"><strong className="text-slate-500">Matched Lender:</strong> {selectedApp.matchedLender}</p>
                  <p className="text-slate-300"><strong className="text-slate-500">Last System Update:</strong> {selectedApp.lastUpdated}</p>
                </div>
              </div>

              {/* Pipeline Timestamps & Audit Stages */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Clock size={14} className="text-blue-400" />
                  Marketplace Funding Pipeline Timestamps
                </h4>

                <div className="space-y-4 relative pl-5 border-l-2 border-slate-800 ml-2">
                  {selectedApp.timeline.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className={`absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full border-2 ${
                        step.done 
                          ? "bg-emerald-500 border-emerald-400" 
                          : "bg-slate-900 border-slate-700"
                      }`}></div>

                      <div className={`p-3 rounded-xl border text-xs ${
                        step.done ? "bg-slate-950/80 border-slate-800" : "bg-slate-950/30 border-slate-850 opacity-60"
                      }`}>
                        <div className="flex justify-between items-center">
                          <p className={`font-semibold ${step.done ? "text-slate-200" : "text-slate-500"}`}>
                            {step.stage}
                          </p>
                          <span className={`text-[10px] font-mono ${step.done ? "text-emerald-400" : "text-slate-500"}`}>
                            {step.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900">
              <span className="text-xs text-slate-500">View-only Admin Tracking Mode</span>
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
