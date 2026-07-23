import React, { useState } from "react";
import { 
  ShieldCheck, Search, Filter, Download, Lock, RefreshCw, Eye, AlertTriangle, FileCode, CheckCircle2, Server, Globe, User, X, Clock, Terminal 
} from "lucide-react";

export default function AdminAuditLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Actions");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [selectedLogPayload, setSelectedLogPayload] = useState(null);
  const [exportSuccess, setExportSuccess] = useState("");

  // Audit Logs Data
  const [auditLogs] = useState([
    {
      id: "LOG-8801",
      timestamp: "2026-01-22 14:22:10 UTC",
      userId: "ADM-101 (Super Admin)",
      action: "Modified AI Scoring Weights",
      category: "Data Modifications",
      resource: "/admin/ai-scoring/weights",
      ipAddress: "103.22.180.4 (Mumbai, IN)",
      severity: "WARN",
      payload: {
        modifiedBy: "Super Admin (ADM-101)",
        changeSet: { bureauWeight: 35, bankCashflowWeight: 30 },
        cryptoHash: "0x8f7a9d2c1e4b3a6f9c8d7e6f5a4b3c2d1e0f9a8b"
      }
    },
    {
      id: "LOG-8802",
      timestamp: "2026-01-22 13:45:00 UTC",
      userId: "BOR-9012 (Rahul Sharma)",
      action: "Successful MFA Login",
      category: "User Authentication",
      resource: "/auth/mfa-verify",
      ipAddress: "49.207.210.12 (Delhi, IN)",
      severity: "INFO",
      payload: {
        authMethod: "Authenticator OTP",
        sessionDuration: "8 hours",
        cryptoHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b"
      }
    },
    {
      id: "LOG-8803",
      timestamp: "2026-01-22 12:10:45 UTC",
      userId: "LND-402 (Apex Capital)",
      action: "Submitted Portfolio Loan Bid",
      category: "Data Modifications",
      resource: "/api/v1/bids/submit",
      ipAddress: "115.240.90.15 (Bengaluru, IN)",
      severity: "INFO",
      payload: {
        bidAmount: "₹25,00,000",
        interestRate: "11.5%",
        cryptoHash: "0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e"
      }
    },
    {
      id: "LOG-8804",
      timestamp: "2026-01-22 10:05:12 UTC",
      userId: "UNKNOWN (IP Blocked)",
      action: "Failed MFA Code Attempt (3x)",
      category: "User Authentication",
      resource: "/auth/login",
      ipAddress: "185.220.101.5 (Proxy Node)",
      severity: "CRITICAL",
      payload: {
        attemptCount: 3,
        actionTaken: "IP Temporarily Rate-Limited",
        cryptoHash: "0x4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c"
      }
    },
    {
      id: "LOG-8805",
      timestamp: "2026-01-21 18:30:00 UTC",
      userId: "ADM-102 (System Admin)",
      action: "Updated Platform Fee Settings",
      category: "Admin Permission Changes",
      resource: "/admin/payments/fee-config",
      ipAddress: "103.22.180.4 (Mumbai, IN)",
      severity: "WARN",
      payload: {
        feeType: "Borrower Origination Fee",
        oldValue: "1.2%",
        newValue: "1.5%",
        cryptoHash: "0x7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b"
      }
    }
  ]);

  // Handle Export Audit Ledger CSV
  const handleExportLedger = () => {
    setExportSuccess("Audit Log Cryptographic Ledger exported to CSV!");
    const element = document.createElement("a");
    const file = new Blob([`OAL Security Audit Log Ledger\nExported At: ${new Date().toLocaleString()}\nImmutable SHA-256 Ledger Verified\n\nID,Timestamp,User,Action,Category,Resource,IP,Severity\n` + auditLogs.map(l => `${l.id},${l.timestamp},"${l.userId}","${l.action}",${l.category},${l.resource},"${l.ipAddress}",${l.severity}`).join("\n")], {type: 'text/csv'});
    element.href = URL.createObjectURL(file);
    element.download = `OAL_Security_Audit_Ledger_${Date.now()}.csv`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setTimeout(() => setExportSuccess(""), 4000);
  };

  // Filtered Logs
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.ipAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All Actions" || log.category === categoryFilter;
    const matchesSeverity = severityFilter === "All" || log.severity === severityFilter;
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Security & System Audit Logs
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-mono flex items-center gap-1">
              <Lock size={12} />
              Immutable Cryptographic Ledger
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Immutable security tracking logs capturing timestamps, user IDs, actions performed, API resources, and IP addresses for compliance.</p>
        </div>

        <button
          onClick={handleExportLedger}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
        >
          <Download size={15} />
          Export Audit Ledger (.CSV)
        </button>
      </div>

      {exportSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-xs text-emerald-400 flex items-center gap-2 animate-fade-in shadow-md">
          <CheckCircle2 size={18} />
          <span>{exportSuccess}</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Logged Actions</p>
            <p className="text-2xl font-bold text-white mt-1">12,480</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <Terminal size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Critical Security Alerts</p>
            <p className="text-2xl font-bold text-red-400 mt-1">1 Event</p>
          </div>
          <div className="p-3 bg-red-500/10 text-red-400 rounded-lg">
            <AlertTriangle size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Active IP Sessions</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">48 Live</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <Globe size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Compliance Integrity</p>
            <p className="text-2xl font-bold text-purple-400 mt-1">100% Verified</p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
            <ShieldCheck size={20} />
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs overflow-x-auto">
        {["All Actions", "User Authentication", "Data Modifications", "API Key Access", "Admin Permission Changes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setCategoryFilter(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              categoryFilter === tab
                ? "bg-blue-600 text-white shadow-md font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Audit Logs Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck size={20} className="text-emerald-400" />
              Security Audit Event Records
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Real-time immutable log feed with IP tracking and cryptographic SHA hashes.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search action, user, IP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              {["All", "INFO", "WARN", "CRITICAL"].map(sev => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                    severityFilter === sev ? "bg-blue-600 text-white font-medium" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Log Ref & Timestamp</th>
                <th className="px-6 py-4 font-semibold">User Identity & Role</th>
                <th className="px-6 py-4 font-semibold">Action Performed</th>
                <th className="px-6 py-4 font-semibold">Resource Endpoint</th>
                <th className="px-6 py-4 font-semibold">IP Address & Geolocation</th>
                <th className="px-6 py-4 font-semibold text-right">Severity / Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">
                    <div>
                      <p className="font-bold text-slate-100">{log.id}</p>
                      <p className="text-[11px] text-slate-500">{log.timestamp}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-200">
                    {log.userId}
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-100">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-blue-400">
                    {log.resource}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">
                    {log.ipAddress}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
                        log.severity === "INFO"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : log.severity === "WARN"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}>
                        {log.severity}
                      </span>

                      <button
                        onClick={() => setSelectedLogPayload(log)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                        title="Inspect Raw JSON Payload"
                      >
                        <FileCode size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raw Payload Inspection Modal */}
      {selectedLogPayload && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode size={18} className="text-purple-400" />
                Raw Cryptographic Log Payload ({selectedLogPayload.id})
              </h3>
              <button onClick={() => setSelectedLogPayload(null)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Action:</span>
                  <span className="font-bold text-white">{selectedLogPayload.action}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Performed By:</span>
                  <span className="text-slate-200 font-mono">{selectedLogPayload.userId}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>IP Geolocation:</span>
                  <span className="text-blue-400 font-mono">{selectedLogPayload.ipAddress}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Raw JSON Payload & Crypto Signature:</label>
                <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto custom-scrollbar">
                  {JSON.stringify(selectedLogPayload.payload, null, 2)}
                </pre>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950">
              <button
                onClick={() => setSelectedLogPayload(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
