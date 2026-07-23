import React from "react";
import { Download, FileText, Calendar } from "lucide-react";

export default function RepReports() {
  const reports = [
    { name: "Monthly Commission Report - July 2026", date: "2026-07-23", size: "1.4 MB", type: "PDF" },
    { name: "Funded Borrower Pipeline Summary Q2", date: "2026-06-30", size: "3.2 MB", type: "CSV" },
    { name: "Agent Lead Audit Log", date: "2026-07-15", size: "950 KB", type: "PDF" }
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Export Reports</h1>
        <p className="text-sm text-slate-400">Download system audit logs, commission sheets, and borrower pipeline data.</p>
      </div>

      <div className="space-y-3">
        {reports.map((rep, idx) => (
          <div key={idx} className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
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
              onClick={() => alert(`Downloading report: ${rep.name}`)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 font-semibold text-xs rounded transition-colors flex items-center gap-1.5 text-slate-300 hover:text-white"
            >
              <Download size={12} />
              <span>Download {rep.type}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
