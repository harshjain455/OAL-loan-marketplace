import React, { useState } from "react";
import { FileText, Download, Calendar, CheckCircle2, Clock, BarChart2, TrendingUp, DollarSign, RefreshCw } from "lucide-react";

const INITIAL_REPORTS = [
  {
    id: "RPT-2407-01",
    title: "Monthly Portfolio Performance Summary",
    period: "July 2026",
    type: "Portfolio",
    generatedAt: "Today, 06:00 AM",
    size: "1.2 MB",
    status: "Ready",
    icon: TrendingUp,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20"
  },
  {
    id: "RPT-2407-02",
    title: "Offer Conversion & Rejection Analysis",
    period: "July 2026",
    type: "Offers",
    generatedAt: "Today, 06:00 AM",
    size: "842 KB",
    status: "Ready",
    icon: BarChart2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20"
  },
  {
    id: "RPT-2406-01",
    title: "Monthly Portfolio Performance Summary",
    period: "June 2026",
    type: "Portfolio",
    generatedAt: "Jul 1, 2026",
    size: "1.1 MB",
    status: "Ready",
    icon: TrendingUp,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20"
  },
  {
    id: "RPT-2406-02",
    title: "Yield Health & Risk Exposure Report",
    period: "June 2026",
    type: "Risk",
    generatedAt: "Jul 1, 2026",
    size: "980 KB",
    status: "Ready",
    icon: DollarSign,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20"
  },
  {
    id: "RPT-2405-01",
    title: "Q2 Lead Qualified & Funded Summary",
    period: "Q2 2026",
    type: "Quarterly",
    generatedAt: "Jun 30, 2026",
    size: "2.4 MB",
    status: "Ready",
    icon: FileText,
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/20"
  },
  {
    id: "RPT-2408-01",
    title: "August Monthly Summary",
    period: "August 2026",
    type: "Portfolio",
    generatedAt: "Scheduled",
    size: "—",
    status: "Pending",
    icon: Clock,
    color: "text-slate-400",
    bg: "bg-slate-800 border-slate-700"
  }
];

const REPORT_TEMPLATES = [
  { title: "Lead Quality Score Distribution Report", type: "Portfolio", icon: TrendingUp, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
  { title: "Offer Yield vs. Market Rate Benchmarks", type: "Risk", icon: DollarSign, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { title: "Borrower Segment Performance Analysis", type: "Quarterly", icon: FileText, color: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/20" },
  { title: "Active Pipeline Conversion Rate Report", type: "Offers", icon: BarChart2, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
];

let reportCounter = 10;

const TYPE_FILTERS = ["All", "Portfolio", "Offers", "Risk", "Quarterly"];

export default function LenderReports() {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [filterType, setFilterType] = useState("All");
  const [generating, setGenerating] = useState(false);

  const handleGenerateNew = () => {
    if (generating) return;
    setGenerating(true);

    // Pick next template in rotation
    const template = REPORT_TEMPLATES[reportCounter % REPORT_TEMPLATES.length];
    reportCounter++;

    const now = new Date();
    const newId = `RPT-NEW-${String(reportCounter).padStart(2, "0")}`;
    const newEntry = {
      id: newId,
      title: template.title,
      period: now.toLocaleString("default", { month: "long", year: "numeric" }),
      type: template.type,
      generatedAt: "Generating...",
      size: "—",
      status: "Pending",
      icon: template.icon,
      color: template.color,
      bg: template.bg
    };

    // Add with Pending status immediately
    setReports((prev) => [newEntry, ...prev]);

    // After 3 seconds mark it as Ready
    setTimeout(() => {
      const sizes = ["740 KB", "1.0 MB", "1.3 MB", "890 KB", "1.6 MB"];
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
      setReports((prev) =>
        prev.map((r) =>
          r.id === newId
            ? { ...r, status: "Ready", generatedAt: "Just now", size: randomSize }
            : r
        )
      );
      setGenerating(false);
    }, 3000);
  };

  const handleDownload = (report) => {
    if (report.status !== "Ready") return;
    alert(`Downloading: ${report.title} (${report.period})\nFile size: ${report.size}`);
  };

  const filteredReports =
    filterType === "All" ? reports : reports.filter((r) => r.type === filterType);

  const readyCount = reports.filter((r) => r.status === "Ready").length;
  const pendingCount = reports.filter((r) => r.status === "Pending").length;

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <div className="p-2.5 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-xl">
              <FileText size={22} />
            </div>
            Reports
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Generate, review, and export data reports for internal accounting and compliance.
          </p>
        </div>

        <button
          onClick={handleGenerateNew}
          disabled={generating}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-lg cursor-pointer"
        >
          <RefreshCw size={15} className={generating ? "animate-spin" : ""} />
          {generating ? "Generating..." : "Generate New Report"}
        </button>
      </div>

      {/* Summary KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/10 border border-sky-500/20 rounded-xl">
            <FileText size={18} className="text-sky-400" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold">Total Reports</div>
            <div className="text-2xl font-black text-white">{reports.length}</div>
          </div>
        </div>
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <CheckCircle2 size={18} className="text-emerald-400" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold">Ready to Download</div>
            <div className="text-2xl font-black text-emerald-400">{readyCount}</div>
          </div>
        </div>
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <Clock size={18} className="text-amber-400" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold">Scheduled / Pending</div>
            <div className="text-2xl font-black text-amber-400">{pendingCount}</div>
          </div>
        </div>
      </div>

      {/* Filter + Table */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800/60 flex flex-wrap justify-between items-center gap-3">
          <h2 className="text-sm font-bold text-white">Report Library</h2>
          <div className="flex items-center gap-2 text-xs font-semibold">
            {TYPE_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterType === f
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
                <th className="px-6 py-4 font-semibold">Report</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Period</th>
                <th className="px-6 py-4 font-semibold">Generated</th>
                <th className="px-6 py-4 font-semibold">Size</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredReports.map((report) => {
                const ReportIcon = report.icon;
                const isReady = report.status === "Ready";
                return (
                  <tr key={report.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg border ${report.bg}`}>
                          <ReportIcon size={14} className={report.color} />
                        </div>
                        <div>
                          <div className="font-bold text-white">{report.title}</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">{report.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-950 border border-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded font-semibold">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 flex items-center gap-1.5">
                      <Calendar size={12} />
                      {report.period}
                    </td>
                    <td className="px-6 py-4 text-slate-400">{report.generatedAt}</td>
                    <td className="px-6 py-4 text-slate-400 font-mono">{report.size}</td>
                    <td className="px-6 py-4 text-center">
                      {isReady ? (
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold flex items-center justify-center gap-1 w-fit mx-auto">
                          <CheckCircle2 size={12} />
                          Ready
                        </span>
                      ) : (
                        <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full font-bold flex items-center justify-center gap-1 w-fit mx-auto">
                          <Clock size={12} />
                          Scheduled
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDownload(report)}
                        disabled={!isReady}
                        className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl mx-auto transition-colors cursor-pointer ${
                          isReady
                            ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow"
                            : "bg-slate-950 border border-slate-800 text-slate-600 cursor-not-allowed"
                        }`}
                      >
                        <Download size={13} />
                        {isReady ? "Download" : "Pending"}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-slate-500 text-sm">
                    No reports found for the selected type.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
