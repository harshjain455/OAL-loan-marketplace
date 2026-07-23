import React, { useState } from "react";
import { 
  FileText, Download, BarChart2, TrendingUp, DollarSign, Users, Briefcase, Calendar, CheckCircle2, RefreshCw, Filter, ShieldCheck, Database, Layers, ArrowUpRight, Eye, Sliders, Check, X, Sparkles 
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

export default function AdminReports() {
  const [activeCategory, setActiveCategory] = useState("Financial & Loan Analytics");
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [exportFormat, setExportFormat] = useState("PDF Report");
  const [generatingReport, setGeneratingReport] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState("");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // Financial Growth Data for Recharts AreaChart
  const [financialData] = useState([
    { month: "Jan", revenue: 42.5, disbursal: 320, crmLeads: 1200 },
    { month: "Feb", revenue: 48.0, disbursal: 380, crmLeads: 1450 },
    { month: "Mar", revenue: 54.2, disbursal: 420, crmLeads: 1680 },
    { month: "Apr", revenue: 61.0, disbursal: 460, crmLeads: 1890 },
    { month: "May", revenue: 72.4, disbursal: 540, crmLeads: 2200 },
    { month: "Jun", revenue: 84.5, disbursal: 620, crmLeads: 2650 }
  ]);

  // ATS Hiring & Sourcing Logs Data
  const [atsLogs] = useState([
    { id: "ATS-901", candidateName: "Rahul Saxena", position: "Senior OAL Relationship Manager", sourcingChannel: "LinkedIn Recruiter", stage: "Hired & Onboarded", crmSynced: "Salesforce ATS", timestamp: "2026-01-22 10:30 AM" },
    { id: "ATS-902", candidateName: "Neha Sharma", position: "Underwriting Risk Specialist", sourcingChannel: "Internal Referral", stage: "Interview Scheduled", crmSynced: "HubSpot ATS", timestamp: "2026-01-21 04:15 PM" },
    { id: "ATS-903", candidateName: "Vikram Sethi", position: "Regional Lending Agent", sourcingChannel: "Naukri Portal", stage: "Document Verification", crmSynced: "Zoho ATS", timestamp: "2026-01-20 02:45 PM" },
    { id: "ATS-904", candidateName: "Pooja Gupta", position: "Compliance Audit Lead", sourcingChannel: "Direct Application", stage: "Offer Released", crmSynced: "Salesforce ATS", timestamp: "2026-01-18 11:10 AM" }
  ]);

  // Handle Export Report
  const handleGenerateReport = (e) => {
    if (e) e.preventDefault();
    setGeneratingReport(true);
    setTimeout(() => {
      setGeneratingReport(false);
      setDownloadSuccess(`Generated & Downloaded ${activeCategory} (${exportFormat}) successfully!`);

      // Trigger text file download simulation
      const element = document.createElement("a");
      const file = new Blob([`OAL Loan Marketplace Official Verified Report\nCategory: ${activeCategory}\nDate Range: ${dateRange}\nFormat: ${exportFormat}\nGenerated At: ${new Date().toLocaleString()}\nIntegrated CRM Sync: 100% Verified`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `OAL_Report_${activeCategory.replace(/ /g, "_")}_${dateRange.replace(/ /g, "_")}.${exportFormat.split(" ")[0].toLowerCase()}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setPreviewModalOpen(false);
      setTimeout(() => setDownloadSuccess(""), 4000);
    }, 1200);
  };

  // Custom Recharts Tooltip Component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl shadow-2xl space-y-1 text-xs font-sans">
          <p className="font-bold text-white border-b border-slate-800 pb-1 font-mono">{label} 2026 Financial Summary</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} className="flex justify-between items-center gap-4 text-xs">
              <span style={{ color: entry.color }} className="font-medium">{entry.name}:</span>
              <strong className="text-white font-mono">{entry.value} {entry.name.includes("Revenue") ? "Lakh" : "Cr"}</strong>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-white tracking-tight">Reports & Deep Analytics Console</h1>
            <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full font-mono flex items-center gap-1.5 shrink-0">
              <Database size={13} className="text-blue-400" />
              CRM / ERP Data Stream Connected
            </span>
          </div>
          <p className="text-sm text-slate-400">Deep analytics for financial volume, operational metrics, ATS hiring/sourcing logs, and user growth data exports.</p>
        </div>

        {/* Quick Export Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Quarter to Date">Quarter to Date</option>
            <option value="Year to Date">Year to Date</option>
          </select>

          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="PDF Report">PDF Report</option>
            <option value="CSV Ledger">CSV Ledger</option>
            <option value="Excel Sheet">Excel Sheet</option>
          </select>

          <button
            onClick={() => setPreviewModalOpen(true)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Eye size={14} className="text-purple-400" />
            Preview Data
          </button>

          <button
            onClick={handleGenerateReport}
            disabled={generatingReport}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2 disabled:opacity-50"
          >
            <Download size={14} className={generatingReport ? "animate-bounce" : ""} />
            {generatingReport ? "Exporting..." : "Export Report"}
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-xs text-emerald-400 flex items-center gap-2 animate-fade-in shadow-md">
          <CheckCircle2 size={18} />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Interactive Metric Cards (Clickable Filters) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveCategory("Financial & Loan Analytics")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            activeCategory === "Financial & Loan Analytics" ? "border-emerald-500/50 shadow-md shadow-emerald-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Total Disbursed Volume</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">₹520 Cr</p>
            <p className="text-[10px] text-slate-500 mt-0.5">+24.8% MoM Growth</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <DollarSign size={20} />
          </div>
        </div>

        <div 
          onClick={() => setActiveCategory("Operational & Portfolio Metrics")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            activeCategory === "Operational & Portfolio Metrics" ? "border-blue-500/50 shadow-md shadow-blue-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Generated Reports Log</p>
            <p className="text-2xl font-bold text-white mt-1">1,480</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Automated Daily Audits</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <FileText size={20} />
          </div>
        </div>

        <div 
          onClick={() => setActiveCategory("ATS Hiring & Sourcing Logs")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            activeCategory === "ATS Hiring & Sourcing Logs" ? "border-purple-500/50 shadow-md shadow-purple-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">ATS Sourcing Records</p>
            <p className="text-2xl font-bold text-purple-400 mt-1">420 Logs</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Agent Recruit Pipeline</p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
            <Briefcase size={20} />
          </div>
        </div>

        <div 
          onClick={() => setActiveCategory("User Growth & Marketplace Volume")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            activeCategory === "User Growth & Marketplace Volume" ? "border-amber-500/50 shadow-md shadow-amber-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">CRM Data Sync Health</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">100% Synced</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Real-Time Webhooks</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <Database size={20} />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs overflow-x-auto">
        {["Financial & Loan Analytics", "Operational & Portfolio Metrics", "ATS Hiring & Sourcing Logs", "User Growth & Marketplace Volume"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCategory(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeCategory === tab
                ? "bg-blue-600 text-white shadow-md font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB 1: Financial & Loan Analytics (Recharts AreaChart) */}
      {activeCategory === "Financial & Loan Analytics" && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp size={20} className="text-emerald-400" />
                  Monthly Marketplace Capital Disbursal & Revenue Growth
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Real-time revenue in ₹ Lakhs & Loan Disbursal in ₹ Crores integrated with CRM/ERP ledger.</p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  Revenue (₹ Lakh)
                </span>
                <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                  Disbursal (₹ Cr)
                </span>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={financialData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDisbursal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="disbursal" name="Disbursal Volume" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDisbursal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Financial Highlights Sub-Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <p className="text-slate-500">Average Deal Size</p>
                <p className="text-base font-bold text-white mt-1">₹8.40 Lakh</p>
                <p className="text-[10px] text-emerald-400 mt-0.5">↑ 12% vs last quarter</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <p className="text-slate-500">Marketplace NPA / Default Rate</p>
                <p className="text-base font-bold text-emerald-400 mt-1">0.42%</p>
                <p className="text-[10px] text-slate-400 mt-0.5">iNV IQ™ Risk Protected</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <p className="text-slate-500">CRM Sync Payout Latency</p>
                <p className="text-base font-bold text-blue-400 mt-1">&lt; 100ms</p>
                <p className="text-[10px] text-purple-400 mt-0.5">Real-time Salesforce ERP</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Operational & Portfolio Metrics */}
      {activeCategory === "Operational & Portfolio Metrics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart2 size={18} className="text-blue-400" />
              Loan Portfolio Approval Rates By Product
            </h2>
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 font-medium mb-1.5">
                  <span>Personal Loans</span>
                  <span className="text-emerald-400 font-mono font-bold">92.4% Approved</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-emerald-500 rounded-full w-[92.4%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 font-medium mb-1.5">
                  <span>Commercial & Business Loans</span>
                  <span className="text-blue-400 font-mono font-bold">88.6% Approved</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-blue-500 rounded-full w-[88.6%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 font-medium mb-1.5">
                  <span>Micro-finance Loans</span>
                  <span className="text-purple-400 font-mono font-bold">95.1% Approved</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-purple-500 rounded-full w-[95.1%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Database size={18} className="text-purple-400" />
              CRM & ERP Data Synchronization Status
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-300 font-medium">Salesforce Enterprise Lead Stream</span>
                <span className="text-emerald-400 font-mono font-bold flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 size={12} /> Synced
                </span>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-300 font-medium">HubSpot ERP Financial Payouts</span>
                <span className="text-emerald-400 font-mono font-bold flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 size={12} /> Synced
                </span>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-300 font-medium">Zoho ATS Sourcing & Hiring Logs</span>
                <span className="text-emerald-400 font-mono font-bold flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 size={12} /> Synced
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ATS Hiring & Sourcing Logs */}
      {activeCategory === "ATS Hiring & Sourcing Logs" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase size={20} className="text-purple-400" />
                ATS Candidate Sourcing & Agent Recruitment Logs
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Track internal admin staff recruitment, agent sourcing channels, and ATS pipeline stages.</p>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-semibold">Log Ref & Candidate Name</th>
                  <th className="px-6 py-4 font-semibold">Target Position</th>
                  <th className="px-6 py-4 font-semibold">Sourcing Channel</th>
                  <th className="px-6 py-4 font-semibold">ATS Stage</th>
                  <th className="px-6 py-4 font-semibold">Mapped ATS CRM</th>
                  <th className="px-6 py-4 font-semibold text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {atsLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-100 text-xs">{log.candidateName}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{log.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-200">
                      {log.position}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-300">
                      {log.sourcingChannel}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {log.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-blue-400">
                      {log.crmSynced}
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-mono text-slate-400">
                      {log.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: User Growth & Marketplace Volume */}
      {activeCategory === "User Growth & Marketplace Volume" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users size={20} className="text-blue-400" />
            Monthly User Registration Growth Across Roles
          </h2>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="barBlueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(59, 130, 246, 0.12)', rx: 8 }}
                  contentStyle={{ backgroundColor: "#020617", borderColor: "#1e293b", borderRadius: "12px", fontSize: "12px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)" }} 
                />
                <Bar dataKey="crmLeads" name="New User Leads" fill="url(#barBlueGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Report Data Preview Modal */}
      {previewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-blue-400" />
                <h3 className="text-base font-bold text-white">Report Data Preview</h3>
              </div>
              <button onClick={() => setPreviewModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Report Category:</span>
                  <span className="font-bold text-white">{activeCategory}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Date Range:</span>
                  <span className="text-slate-200 font-mono">{dateRange}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Target Export Format:</span>
                  <span className="text-blue-400 font-mono font-bold">{exportFormat}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>CRM Synchronization:</span>
                  <span className="text-emerald-400 font-mono font-bold">100% Synced</span>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
                <p className="text-slate-500 font-bold">// SAMPLE EXPORT HEADER STREAM</p>
                <p>Date,Category,Disbursal_Cr,Revenue_Lakh,CRM_Status</p>
                <p>2026-01-01,{activeCategory.replace(/ /g, "_")},320,42.5,SYNCED</p>
                <p>2026-01-15,{activeCategory.replace(/ /g, "_")},420,54.2,SYNCED</p>
                <p>2026-01-22,{activeCategory.replace(/ /g, "_")},620,84.5,SYNCED</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950">
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
              >
                Close Preview
              </button>
              <button
                onClick={handleGenerateReport}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-lg shadow-blue-900/20"
              >
                <Download size={14} />
                Download {exportFormat.split(" ")[0]}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
