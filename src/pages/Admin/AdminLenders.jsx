import React, { useState } from "react";
import { 
  Building2, UserCheck, ShieldAlert, Clock, Search, Filter, Eye, CheckCircle, XCircle, FileText, Key, Check, X, ShieldCheck, Mail, Phone, ExternalLink, Award 
} from "lucide-react";

export default function AdminLenders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedLender, setSelectedLender] = useState(null);

  // Mock Lenders Applications Data
  const [lenders, setLenders] = useState([
    {
      id: "LND-801",
      companyName: "Apex Capital Lending LLC",
      contactPerson: "Marcus Vance",
      email: "marcus.vance@apexcapital.com",
      phone: "+1 (555) 234-5678",
      taxId: "TAX-9982410-X",
      licenseNo: "NMLS-440129",
      capitalPool: "$15,000,000",
      status: "Pending Review",
      loginAccess: "Access Disabled",
      appliedDate: "2026-01-20",
      documents: [
        { name: "Business Operating License", type: "PDF", verified: true, date: "2026-01-20" },
        { name: "State Lending Authority Permit", type: "PDF", verified: true, date: "2026-01-20" },
        { name: "Proof of Liquid Reserve ($15M)", type: "PDF", verified: false, date: "2026-01-20" }
      ]
    },
    {
      id: "LND-802",
      companyName: "Horizon Commercial Funding",
      contactPerson: "Elena Rostova",
      email: "elena@horizonfunding.io",
      phone: "+1 (555) 876-5432",
      taxId: "TAX-7712390-B",
      licenseNo: "NMLS-882103",
      capitalPool: "$50,000,000",
      status: "Approved",
      loginAccess: "Active Login",
      appliedDate: "2025-11-15",
      documents: [
        { name: "Business Operating License", type: "PDF", verified: true, date: "2025-11-15" },
        { name: "State Lending Authority Permit", type: "PDF", verified: true, date: "2025-11-15" },
        { name: "Proof of Liquid Reserve ($50M)", type: "PDF", verified: true, date: "2025-11-15" }
      ]
    },
    {
      id: "LND-803",
      companyName: "Vanguard Micro-Finance Group",
      contactPerson: "Jonathan Hayes",
      email: "j.hayes@vanguardmicro.org",
      phone: "+1 (555) 345-6789",
      taxId: "TAX-5541092-C",
      licenseNo: "NMLS-102938",
      capitalPool: "$5,000,000",
      status: "Pending Review",
      loginAccess: "Access Disabled",
      appliedDate: "2026-01-22",
      documents: [
        { name: "Business Operating License", type: "PDF", verified: true, date: "2026-01-22" },
        { name: "State Lending Authority Permit", type: "PDF", verified: false, date: "2026-01-22" },
        { name: "Proof of Liquid Reserve ($5M)", type: "PDF", verified: false, date: "2026-01-22" }
      ]
    },
    {
      id: "LND-804",
      companyName: "BlueSky Merchant Credit Inc.",
      contactPerson: "Sarah Jenkins (Partner)",
      email: "s.jenkins@blueskycredit.com",
      phone: "+1 (555) 901-2345",
      taxId: "TAX-1120493-Z",
      licenseNo: "NMLS-559302",
      capitalPool: "$25,000,000",
      status: "Approved",
      loginAccess: "Active Login",
      appliedDate: "2025-12-01",
      documents: [
        { name: "Business Operating License", type: "PDF", verified: true, date: "2025-12-01" },
        { name: "State Lending Authority Permit", type: "PDF", verified: true, date: "2025-12-01" },
        { name: "Proof of Liquid Reserve ($25M)", type: "PDF", verified: true, date: "2025-12-01" }
      ]
    },
    {
      id: "LND-805",
      companyName: "Shadow Private Equity",
      contactPerson: "Unknown Rep",
      email: "info@shadowequity.fake",
      phone: "+1 (555) 000-1122",
      taxId: "TAX-0000000-0",
      licenseNo: "NMLS-EXPIRED",
      capitalPool: "$500,000",
      status: "Rejected",
      loginAccess: "Access Disabled",
      appliedDate: "2025-10-10",
      documents: [
        { name: "Business Operating License", type: "PDF", verified: false, date: "2025-10-10" },
        { name: "Expired Financial Audit", type: "PDF", verified: false, date: "2025-10-10" }
      ]
    }
  ]);

  // Handle Action: Approve Lender Application & Activate System Credentials
  const handleApproveLender = (id) => {
    setLenders(prev => prev.map(lender => {
      if (lender.id === id) {
        return {
          ...lender,
          status: "Approved",
          loginAccess: "Active Login",
          documents: lender.documents.map(doc => ({ ...doc, verified: true }))
        };
      }
      return lender;
    }));

    if (selectedLender && selectedLender.id === id) {
      setSelectedLender(prev => ({
        ...prev,
        status: "Approved",
        loginAccess: "Active Login",
        documents: prev.documents.map(doc => ({ ...doc, verified: true }))
      }));
    }
  };

  // Handle Action: Reject Lender Application
  const handleRejectLender = (id) => {
    setLenders(prev => prev.map(lender => {
      if (lender.id === id) {
        return {
          ...lender,
          status: "Rejected",
          loginAccess: "Access Disabled"
        };
      }
      return lender;
    }));

    if (selectedLender && selectedLender.id === id) {
      setSelectedLender(prev => ({
        ...prev,
        status: "Rejected",
        loginAccess: "Access Disabled"
      }));
    }
  };

  // Toggle Document Verification inside Modal
  const toggleDocVerification = (docName) => {
    if (!selectedLender) return;
    const updatedDocs = selectedLender.documents.map(doc => 
      doc.name === docName ? { ...doc, verified: !doc.verified } : doc
    );
    setSelectedLender(prev => ({ ...prev, documents: updatedDocs }));
    setLenders(prev => prev.map(l => l.id === selectedLender.id ? { ...l, documents: updatedDocs } : l));
  };

  // Filtering
  const filteredLenders = lenders.filter(l => {
    const matchesSearch = 
      l.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.taxId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.licenseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = lenders.length;
  const pendingCount = lenders.filter(l => l.status === "Pending Review").length;
  const approvedCount = lenders.filter(l => l.status === "Approved").length;
  const rejectedCount = lenders.filter(l => l.status === "Rejected").length;

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Lenders Management</h1>
          <p className="text-sm text-slate-400 mt-1">Audit business credentials, verify licenses, and activate system logins.</p>
        </div>
        <div className="text-xs bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <Building2 size={14} className="text-blue-400" />
          <span>Total Entities: <strong className="text-white">{totalCount}</strong></span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setStatusFilter("All")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            statusFilter === "All" ? "border-blue-500/50 shadow-md shadow-blue-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Total Registered</p>
            <p className="text-2xl font-bold text-white mt-1">{totalCount}</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <Building2 size={20} />
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter("Pending Review")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            statusFilter === "Pending Review" ? "border-amber-500/50 shadow-md shadow-amber-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Pending Review</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{pendingCount}</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <Clock size={20} />
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter("Approved")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            statusFilter === "Approved" ? "border-emerald-500/50 shadow-md shadow-emerald-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Approved & Active</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{approvedCount}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <UserCheck size={20} />
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter("Rejected")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            statusFilter === "Rejected" ? "border-red-500/50 shadow-md shadow-red-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Rejected Applications</p>
            <p className="text-2xl font-bold text-red-400 mt-1">{rejectedCount}</p>
          </div>
          <div className="p-3 bg-red-500/10 text-red-400 rounded-lg">
            <ShieldAlert size={20} />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search company, tax ID, license..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-xs text-slate-400">Filter:</span>
          </div>
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {["All", "Pending Review", "Approved", "Rejected"].map((status) => (
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

      {/* Lenders Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Lender Company</th>
                <th className="px-6 py-4 font-semibold">Credentials</th>
                <th className="px-6 py-4 font-semibold">Contact Person</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Login Access</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLenders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500 text-sm">
                    No lender applications match your filter.
                  </td>
                </tr>
              ) : (
                filteredLenders.map((lender) => (
                  <tr key={lender.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
                          {lender.companyName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-100">{lender.companyName}</p>
                          <p className="text-xs text-slate-500">{lender.id} • Pool: {lender.capitalPool}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5 text-xs">
                        <p className="text-slate-300 font-mono"><strong className="text-slate-500 font-sans">Tax ID:</strong> {lender.taxId}</p>
                        <p className="text-slate-400 font-mono"><strong className="text-slate-500 font-sans">Lic #:</strong> {lender.licenseNo}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-xs text-slate-200 font-medium">{lender.contactPerson}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Mail size={11} className="text-slate-500" />
                          {lender.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        lender.status === "Approved"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : lender.status === "Rejected"
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          lender.status === "Approved" ? "bg-emerald-400" : lender.status === "Rejected" ? "bg-red-400" : "bg-amber-400 animate-ping"
                        }`}></span>
                        {lender.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                        lender.loginAccess === "Active Login" ? "text-emerald-400" : "text-slate-500"
                      }`}>
                        <Key size={13} />
                        {lender.loginAccess}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Review Credentials Modal */}
                        <button
                          onClick={() => setSelectedLender(lender)}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors flex items-center gap-1.5 border border-slate-700"
                          title="Audit Business License & Verification Docs"
                        >
                          <FileText size={14} className="text-blue-400" />
                          Review Docs
                        </button>

                        {/* Approve & Grant Access Button */}
                        {lender.status !== "Approved" && (
                          <button
                            onClick={() => handleApproveLender(lender.id)}
                            className="px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs rounded-lg transition-colors flex items-center gap-1"
                            title="Approve Application & Grant System Login Access"
                          >
                            <Check size={14} />
                            Approve
                          </button>
                        )}

                        {/* Reject Button */}
                        {lender.status !== "Rejected" && (
                          <button
                            onClick={() => handleRejectLender(lender.id)}
                            className="px-2 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs rounded-lg transition-colors flex items-center gap-1"
                            title="Reject Lender Application"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Documents & Audit Modal */}
      {selectedLender && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg">
                  {selectedLender.companyName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {selectedLender.companyName}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-normal ${
                      selectedLender.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : selectedLender.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {selectedLender.status}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">Application ID: {selectedLender.id} • Applied {selectedLender.appliedDate}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLender(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {/* Credentials Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <p className="text-slate-500">Tax ID Number</p>
                  <p className="text-sm font-bold font-mono text-slate-200 mt-0.5">{selectedLender.taxId}</p>
                </div>
                <div>
                  <p className="text-slate-500">NMLS License No.</p>
                  <p className="text-sm font-bold font-mono text-slate-200 mt-0.5">{selectedLender.licenseNo}</p>
                </div>
                <div>
                  <p className="text-slate-500">Declared Capital Pool</p>
                  <p className="text-sm font-bold text-emerald-400 mt-0.5">{selectedLender.capitalPool}</p>
                </div>
              </div>

              {/* Primary Contact Info */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-2 text-xs">
                <h4 className="font-semibold text-slate-400 uppercase tracking-wider">Representative Contact</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <p className="text-slate-300"><strong className="text-slate-500">Contact Person:</strong> {selectedLender.contactPerson}</p>
                  <p className="text-slate-300"><strong className="text-slate-500">Business Email:</strong> {selectedLender.email}</p>
                  <p className="text-slate-300"><strong className="text-slate-500">Phone:</strong> {selectedLender.phone}</p>
                  <p className="text-slate-300"><strong className="text-slate-500">System Login Status:</strong> <span className={selectedLender.loginAccess === 'Active Login' ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>{selectedLender.loginAccess}</span></p>
                </div>
              </div>

              {/* Uploaded Verification Documents Checklist */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Award size={14} className="text-blue-400" />
                  Uploaded Business Verification Documents (Click to toggle verification)
                </h4>
                
                <div className="space-y-3">
                  {selectedLender.documents.map((doc, idx) => (
                    <div 
                      key={idx}
                      onClick={() => toggleDocVerification(doc.name)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                        doc.verified 
                          ? "bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/50" 
                          : "bg-slate-950 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${doc.verified ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-200">{doc.name}</p>
                          <p className="text-[11px] text-slate-500">Uploaded {doc.date} • {doc.type}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${
                          doc.verified ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {doc.verified ? <CheckCircle size={12} /> : <Clock size={12} />}
                          {doc.verified ? 'Verified' : 'Audit Pending'}
                        </span>
                        <ExternalLink size={14} className="text-slate-600 hover:text-slate-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900">
              <div className="flex items-center gap-2">
                {selectedLender.status !== "Approved" && (
                  <button
                    onClick={() => handleApproveLender(selectedLender.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Check size={14} />
                    Approve & Grant Login Access
                  </button>
                )}

                {selectedLender.status !== "Rejected" && (
                  <button
                    onClick={() => handleRejectLender(selectedLender.id)}
                    className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <X size={14} />
                    Reject Application
                  </button>
                )}
              </div>

              <button
                onClick={() => setSelectedLender(null)}
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
