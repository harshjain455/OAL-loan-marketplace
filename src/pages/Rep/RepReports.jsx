import React, { useState } from "react";
import { Download, FileText, Calendar, Plus, RefreshCw, CheckCircle2 } from "lucide-react";

export default function RepReports() {
  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };
  const [reports, setReports] = useState([
    { name: "Monthly Commission Report - July 2026", date: "2026-07-23", size: "1.4 MB", type: "PDF" },
    { name: "Funded Borrower Pipeline Summary Q2", date: "2026-06-30", size: "3.2 MB", type: "CSV" },
    { name: "Agent Lead Audit Log", date: "2026-07-15", size: "950 KB", type: "PDF" }
  ]);

  const [reportType, setReportType] = useState("Commission Payouts");
  const [dateRange, setDateRange] = useState("This Month");
  const [format, setFormat] = useState("PDF");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    setGenerating(true);

    setTimeout(() => {
      const today = new Date().toISOString().split("T")[0];
      const newReport = {
        name: `${reportType} Report - ${dateRange} Export`,
        date: today,
        size: "1.2 MB",
        type: format
      };
      setReports([newReport, ...reports]);
      setGenerating(false);
      showToast("New report generated successfully and added to your export logs below!");
    }, 1500);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Export Reports</h1>
        <p className="text-sm text-slate-400">Request custom exports or download past system audit logs, commission sheets, and borrower pipeline data.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Request Custom Report Form */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 h-fit">
          <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <Plus size={16} className="text-blue-400" />
            Generate New Report
          </h3>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Report Category</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="Commission Payouts">Commission Payouts</option>
                <option value="Lead Pipeline Summary">Lead Pipeline Summary</option>
                <option value="Bidding History Log">Bidding History Log</option>
                <option value="Agent Audit Logs">Agent Audit Logs</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="This Month">This Month (July 2026)</option>
                <option value="Last Month">Last Month (June 2026)</option>
                <option value="Year to Date">Year to Date (2026)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Export Format</label>
              <div className="flex gap-2">
                {["PDF", "CSV"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFormat(f)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      format === f
                        ? "bg-blue-600 border-blue-500 text-white shadow"
                        : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
            >
              {generating ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Compiling Data...</span>
                </>
              ) : (
                <>
                  <span>Compile & Export</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right column: Generated Reports List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="font-bold text-sm text-slate-200">Generated Reports Archive</h3>
            <div className="divide-y divide-slate-800/60">
              {reports.map((rep, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-400">
                      <FileText size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-slate-200">{rep.name}</h3>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Calendar size={10} /> Created: {rep.date} • Size: {rep.size}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast(`Started download for: ${rep.name}`)}
                    className="px-3 py-1.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 font-semibold text-xs rounded transition-colors flex items-center gap-1.5 text-slate-300 hover:text-white"
                  >
                    <Download size={12} />
                    <span>Download {rep.type}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-emerald-500 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 text-xs animate-bounce">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
