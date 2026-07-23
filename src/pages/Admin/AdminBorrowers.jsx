import React, { useState } from "react";
import { 
  Users, UserCheck, ShieldAlert, ShieldCheck, Search, Filter, Eye, Lock, Unlock, X, FileText, Clock, AlertTriangle, Phone, Mail, CheckCircle2 
} from "lucide-react";

export default function AdminBorrowers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBorrower, setSelectedBorrower] = useState(null);

  // Mock initial borrowers data
  const [borrowers, setBorrowers] = useState([
    {
      id: "BOR-101",
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      phone: "+91 98765 43210",
      status: "Active",
      assignedRep: "Sarah Jenkins",
      joinedDate: "2025-11-12",
      creditScore: 750,
      totalLoans: 2,
      activeLoanAmount: "$25,000",
      history: [
        { date: "2026-01-10", action: "Submitted Personal Loan Application ($25,000)", status: "Active" },
        { date: "2025-11-15", action: "KYC Documents Verified by Admin", status: "Completed" },
        { date: "2025-11-12", action: "Account Registered & Verified", status: "Completed" }
      ]
    },
    {
      id: "BOR-102",
      name: "Priya Patel",
      email: "priya.patel@example.com",
      phone: "+91 98234 56789",
      status: "Pending KYC",
      assignedRep: "David Miller",
      joinedDate: "2026-01-05",
      creditScore: 680,
      totalLoans: 1,
      activeLoanAmount: "$10,000",
      history: [
        { date: "2026-01-06", action: "Uploaded ID and Income Proof", status: "Pending Audit" },
        { date: "2026-01-05", action: "Account Registered", status: "Completed" }
      ]
    },
    {
      id: "BOR-103",
      name: "Amit Verma",
      email: "amit.verma@example.com",
      phone: "+91 99123 45678",
      status: "Blocked",
      assignedRep: "Unassigned",
      joinedDate: "2025-08-20",
      creditScore: 590,
      totalLoans: 3,
      activeLoanAmount: "$0",
      history: [
        { date: "2025-12-01", action: "Account Blocked due to Suspicious Fraud Flag", status: "Blocked" },
        { date: "2025-09-10", action: "Completed Business Loan ($50,000)", status: "Closed" }
      ]
    },
    {
      id: "BOR-104",
      name: "Sneha Reddy",
      email: "sneha.reddy@example.com",
      phone: "+91 97890 12345",
      status: "Active",
      assignedRep: "Sarah Jenkins",
      joinedDate: "2025-10-04",
      creditScore: 780,
      totalLoans: 4,
      activeLoanAmount: "$45,000",
      history: [
        { date: "2026-01-18", action: "Applied for Expansion Loan ($45,000)", status: "Under Review" },
        { date: "2025-10-04", action: "Account Verified & Approved", status: "Completed" }
      ]
    },
    {
      id: "BOR-105",
      name: "Vikram Malhotra",
      email: "vikram.m@example.com",
      phone: "+91 96543 21098",
      status: "Active",
      assignedRep: "David Miller",
      joinedDate: "2025-12-28",
      creditScore: 710,
      totalLoans: 1,
      activeLoanAmount: "$15,000",
      history: [
        { date: "2026-01-02", action: "Loan Offer Accepted from Capital Lenders", status: "Funded" },
        { date: "2025-12-28", action: "Account Registered", status: "Completed" }
      ]
    }
  ]);

  // Toggle Block/Unblock Status
  const toggleBlockStatus = (id) => {
    setBorrowers(prev => prev.map(b => {
      if (b.id === id) {
        const newStatus = b.status === "Blocked" ? "Active" : "Blocked";
        return { 
          ...b, 
          status: newStatus,
          history: [
            { date: new Date().toISOString().split('T')[0], action: `Account manually ${newStatus === 'Blocked' ? 'Blocked' : 'Unblocked'} by Admin`, status: newStatus },
            ...b.history
          ] 
        };
      }
      return b;
    }));

    if (selectedBorrower && selectedBorrower.id === id) {
      setSelectedBorrower(prev => ({
        ...prev,
        status: prev.status === "Blocked" ? "Active" : "Blocked"
      }));
    }
  };

  // Filter borrowers based on search and status
  const filteredBorrowers = borrowers.filter(b => {
    const matchesSearch = 
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = borrowers.length;
  const activeCount = borrowers.filter(b => b.status === "Active").length;
  const blockedCount = borrowers.filter(b => b.status === "Blocked").length;
  const pendingCount = borrowers.filter(b => b.status === "Pending KYC").length;

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Borrowers Management</h1>
          <p className="text-sm text-slate-400 mt-1">Manage borrower accounts, review histories, and control access permissions.</p>
        </div>
        <div className="text-xs bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <Users size={14} className="text-blue-400" />
          <span>Total Registered: <strong className="text-white">{totalCount}</strong></span>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Borrowers</p>
            <p className="text-2xl font-bold text-white mt-1">{totalCount}</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <Users size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Active Accounts</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{activeCount}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <UserCheck size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Blocked Accounts</p>
            <p className="text-2xl font-bold text-red-400 mt-1">{blockedCount}</p>
          </div>
          <div className="p-3 bg-red-500/10 text-red-400 rounded-lg">
            <ShieldAlert size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Pending KYC</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{pendingCount}</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <Clock size={20} />
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search name, email, phone..."
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
            {["All", "Active", "Blocked", "Pending KYC"].map((status) => (
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

      {/* Borrowers Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Borrower</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Assigned Rep</th>
                <th className="px-6 py-4 font-semibold">Reg. Date</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBorrowers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500 text-sm">
                    No borrowers found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredBorrowers.map((borrower) => (
                  <tr key={borrower.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold text-sm">
                          {borrower.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-100">{borrower.name}</p>
                          <p className="text-xs text-slate-500">{borrower.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-xs text-slate-300 flex items-center gap-1.5">
                          <Mail size={12} className="text-slate-500" />
                          {borrower.email}
                        </p>
                        <p className="text-xs text-slate-400 flex items-center gap-1.5">
                          <Phone size={12} className="text-slate-500" />
                          {borrower.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        borrower.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : borrower.status === "Blocked"
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          borrower.status === "Active" ? "bg-emerald-400" : borrower.status === "Blocked" ? "bg-red-400" : "bg-amber-400"
                        }`}></span>
                        {borrower.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-300">
                      {borrower.assignedRep}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {borrower.joinedDate}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View History Button */}
                        <button
                          onClick={() => setSelectedBorrower(borrower)}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors flex items-center gap-1.5 border border-slate-700"
                          title="View Borrower Details & History"
                        >
                          <Eye size={14} className="text-blue-400" />
                          History
                        </button>

                        {/* Block/Unblock Toggle */}
                        <button
                          onClick={() => toggleBlockStatus(borrower.id)}
                          className={`px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-1.5 border ${
                            borrower.status === "Blocked"
                              ? "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                              : "bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/30"
                          }`}
                          title={borrower.status === "Blocked" ? "Unblock Borrower Account" : "Block Borrower Account"}
                        >
                          {borrower.status === "Blocked" ? (
                            <>
                              <Unlock size={14} />
                              Unblock
                            </>
                          ) : (
                            <>
                              <Lock size={14} />
                              Block
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Borrower Details & History Modal */}
      {selectedBorrower && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg">
                  {selectedBorrower.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {selectedBorrower.name}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-normal ${
                      selectedBorrower.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {selectedBorrower.status}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">ID: {selectedBorrower.id} • Registered {selectedBorrower.joinedDate}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBorrower(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {/* Personal & Credit Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <p className="text-slate-500">Credit Score</p>
                  <p className="text-base font-bold text-emerald-400 mt-0.5">{selectedBorrower.creditScore}</p>
                </div>
                <div>
                  <p className="text-slate-500">Total Loans</p>
                  <p className="text-base font-bold text-white mt-0.5">{selectedBorrower.totalLoans}</p>
                </div>
                <div>
                  <p className="text-slate-500">Active Loan Vol.</p>
                  <p className="text-base font-bold text-blue-400 mt-0.5">{selectedBorrower.activeLoanAmount}</p>
                </div>
                <div>
                  <p className="text-slate-500">Assigned Rep</p>
                  <p className="text-base font-bold text-slate-200 mt-0.5">{selectedBorrower.assignedRep}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact & Credentials</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <p className="text-slate-300"><strong className="text-slate-500">Email:</strong> {selectedBorrower.email}</p>
                  <p className="text-slate-300"><strong className="text-slate-500">Phone:</strong> {selectedBorrower.phone}</p>
                </div>
              </div>

              {/* History & Activity Log */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FileText size={14} className="text-blue-400" />
                  Borrower History & Activity Timeline
                </h4>
                <div className="space-y-3 relative pl-4 border-l border-slate-800">
                  {selectedBorrower.history.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border border-slate-900"></div>
                      <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-850 text-xs">
                        <div className="flex justify-between items-center text-slate-400 mb-1">
                          <span className="font-semibold text-slate-200">{item.action}</span>
                          <span className="text-[10px] text-slate-500">{item.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">Status: <span className="text-slate-300">{item.status}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900">
              <button
                onClick={() => toggleBlockStatus(selectedBorrower.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                  selectedBorrower.status === "Blocked"
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                    : "bg-red-600 hover:bg-red-500 text-white"
                }`}
              >
                {selectedBorrower.status === "Blocked" ? (
                  <>
                    <Unlock size={14} />
                    Unblock Account
                  </>
                ) : (
                  <>
                    <Lock size={14} />
                    Block Account
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedBorrower(null)}
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
