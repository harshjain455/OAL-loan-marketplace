import React, { useState } from "react";
import { 
  ShieldCheck, ShieldAlert, Clock, Search, Filter, Eye, Check, X, FileText, User, Calendar, ExternalLink, FileCheck2, AlertCircle, CheckCircle2, Download, Printer, ZoomIn, ZoomOut, Lock
} from "lucide-react";

export default function AdminVerificationCenter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending Review");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [fullPreviewDoc, setFullPreviewDoc] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [actionNotification, setActionNotification] = useState("");

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 25, 50));

  const handleDownload = (fileName) => {
    setActionNotification(`Downloading ${fileName}...`);
    const element = document.createElement("a");
    const file = new Blob([`OAL Marketplace Official Verified Document Stream\nFile: ${fileName}\nStatus: Cryptographically Verified`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setTimeout(() => setActionNotification(""), 3000);
  };

  const handlePrint = () => {
    setActionNotification("Preparing document for print...");
    setTimeout(() => {
      window.print();
      setActionNotification("");
    }, 500);
  };

  // Mock KYC Documents Queue Data
  const [kycQueue, setKycQueue] = useState([
    {
      id: "KYC-301",
      borrowerId: "BOR-101",
      borrowerName: "Rahul Sharma",
      borrowerEmail: "rahul.sharma@example.com",
      docType: "ID Proof",
      fileName: "Passport_National_ID_Rahul.pdf",
      fileSize: "2.4 MB",
      uploadedDate: "2026-01-22 10:30 AM",
      status: "Pending Review",
      issuedBy: "Government Authority",
      notes: "Passport valid thru 2030. Clear photo matching profile."
    },
    {
      id: "KYC-302",
      borrowerId: "BOR-102",
      borrowerName: "Priya Patel",
      borrowerEmail: "priya.patel@example.com",
      docType: "Income Proof",
      fileName: "Bank_Statement_Q4_Priya.pdf",
      fileSize: "4.1 MB",
      uploadedDate: "2026-01-21 02:15 PM",
      status: "Pending Review",
      issuedBy: "HDFC Bank Ltd",
      notes: "Last 3 months salary credit verified."
    },
    {
      id: "KYC-303",
      borrowerId: "BOR-104",
      borrowerName: "Sneha Reddy",
      borrowerEmail: "sneha.reddy@example.com",
      docType: "Address Proof",
      fileName: "Electricity_Utility_Bill.pdf",
      fileSize: "1.2 MB",
      uploadedDate: "2026-01-19 11:00 AM",
      status: "Approved",
      issuedBy: "State Utility Board",
      notes: "Matches registered residential address."
    },
    {
      id: "KYC-304",
      borrowerId: "BOR-103",
      borrowerName: "Amit Verma",
      borrowerEmail: "amit.verma@example.com",
      docType: "ID Proof",
      fileName: "Blurry_Driver_License.png",
      fileSize: "850 KB",
      uploadedDate: "2026-01-15 04:45 PM",
      status: "Rejected",
      issuedBy: "Unverified",
      notes: "Document image unreadable / blurry text. Re-upload requested."
    },
    {
      id: "KYC-305",
      borrowerId: "BOR-105",
      borrowerName: "Vikram Malhotra",
      borrowerEmail: "vikram.m@example.com",
      docType: "Income Proof",
      fileName: "Tax_Return_Form_16.pdf",
      fileSize: "3.5 MB",
      uploadedDate: "2026-01-22 09:00 AM",
      status: "Pending Review",
      issuedBy: "Income Tax Dept",
      notes: "Annual return filing proof submitted."
    }
  ]);

  // Handle Approve KYC Document
  const handleApproveDoc = (id) => {
    setKycQueue(prev => prev.map(doc => {
      if (doc.id === id) {
        return { ...doc, status: "Approved" };
      }
      return doc;
    }));

    if (selectedDoc && selectedDoc.id === id) {
      setSelectedDoc(prev => ({ ...prev, status: "Approved" }));
    }
  };

  // Handle Reject KYC Document
  const handleRejectDoc = (id) => {
    setKycQueue(prev => prev.map(doc => {
      if (doc.id === id) {
        return { ...doc, status: "Rejected" };
      }
      return doc;
    }));

    if (selectedDoc && selectedDoc.id === id) {
      setSelectedDoc(prev => ({ ...prev, status: "Rejected" }));
    }
  };

  // Filtering
  const filteredQueue = kycQueue.filter(item => {
    const matchesSearch = 
      item.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.borrowerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.docType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      statusFilter === "All" || 
      item.status === statusFilter ||
      (statusFilter === "ID Proofs" && item.docType === "ID Proof") ||
      (statusFilter === "Income Proofs" && item.docType === "Income Proof") ||
      (statusFilter === "Address Proofs" && item.docType === "Address Proof");

    return matchesSearch && matchesStatus;
  });

  const totalCount = kycQueue.length;
  const pendingCount = kycQueue.filter(d => d.status === "Pending Review").length;
  const approvedCount = kycQueue.filter(d => d.status === "Approved").length;
  const rejectedCount = kycQueue.filter(d => d.status === "Rejected").length;

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Verification Center</h1>
          <p className="text-sm text-slate-400 mt-1">Manual review and approval console for borrower KYC verification documents.</p>
        </div>
        <div className="text-xs bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <Clock size={14} className="text-amber-400" />
          <span>Awaiting Review: <strong className="text-amber-400">{pendingCount} Documents</strong></span>
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
            <p className="text-xs font-medium text-slate-400">Total KYC Queue</p>
            <p className="text-2xl font-bold text-white mt-1">{totalCount}</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <FileText size={20} />
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter("Pending Review")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            statusFilter === "Pending Review" ? "border-amber-500/50 shadow-md shadow-amber-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Pending Audit</p>
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
            <p className="text-xs font-medium text-slate-400">Approved KYC</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{approvedCount}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <ShieldCheck size={20} />
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter("Rejected")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            statusFilter === "Rejected" ? "border-red-500/50 shadow-md shadow-red-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Rejected Documents</p>
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
            placeholder="Search borrower, doc type, file..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end overflow-x-auto">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-xs text-slate-400">Filter:</span>
          </div>
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {["Pending Review", "All", "Approved", "Rejected", "ID Proofs", "Income Proofs", "Address Proofs"].map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                  statusFilter === filter
                    ? "bg-blue-600 text-white font-medium"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KYC Queue Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Borrower</th>
                <th className="px-6 py-4 font-semibold">Doc Category</th>
                <th className="px-6 py-4 font-semibold">File Name & Size</th>
                <th className="px-6 py-4 font-semibold">Upload Date</th>
                <th className="px-6 py-4 font-semibold">KYC Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredQueue.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500 text-sm">
                    No documents match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredQueue.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-100">{doc.borrowerName}</p>
                        <p className="text-xs text-slate-500">{doc.borrowerId} • {doc.borrowerEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${
                        doc.docType === "ID Proof"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : doc.docType === "Income Proof"
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }`}>
                        <FileText size={12} />
                        {doc.docType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-xs font-medium text-slate-200 truncate max-w-[200px]">{doc.fileName}</p>
                        <p className="text-[11px] text-slate-500">{doc.fileSize} • Issued: {doc.issuedBy}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {doc.uploadedDate}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        doc.status === "Approved"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : doc.status === "Rejected"
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          doc.status === "Approved" ? "bg-emerald-400" : doc.status === "Rejected" ? "bg-red-400" : "bg-amber-400 animate-ping"
                        }`}></span>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Document Modal */}
                        <button
                          onClick={() => setSelectedDoc(doc)}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors flex items-center gap-1.5 border border-slate-700"
                          title="Inspect Document"
                        >
                          <Eye size={14} className="text-blue-400" />
                          View Doc
                        </button>

                        {/* Approve Button */}
                        {doc.status !== "Approved" && (
                          <button
                            onClick={() => handleApproveDoc(doc.id)}
                            className="px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs rounded-lg transition-colors flex items-center gap-1"
                            title="Approve KYC Document"
                          >
                            <Check size={14} />
                            Approve
                          </button>
                        )}

                        {/* Reject Button */}
                        {doc.status !== "Rejected" && (
                          <button
                            onClick={() => handleRejectDoc(doc.id)}
                            className="px-2 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs rounded-lg transition-colors flex items-center gap-1"
                            title="Reject KYC Document"
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

      {/* Inspection & Verification Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    KYC Audit: {selectedDoc.id}
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-normal ${
                      selectedDoc.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : selectedDoc.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {selectedDoc.status}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">Borrower: {selectedDoc.borrowerName} ({selectedDoc.borrowerId})</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {/* Document Overview Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <p className="text-slate-500">Document Type</p>
                  <p className="text-sm font-bold text-blue-400 mt-0.5">{selectedDoc.docType}</p>
                </div>
                <div>
                  <p className="text-slate-500">Issuing Authority</p>
                  <p className="text-sm font-bold text-white mt-0.5">{selectedDoc.issuedBy}</p>
                </div>
                <div>
                  <p className="text-slate-500">File Size</p>
                  <p className="text-sm font-bold font-mono text-slate-300 mt-0.5">{selectedDoc.fileSize}</p>
                </div>
              </div>

              {/* Document Preview Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 shadow-inner">
                  <FileCheck2 size={32} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">{selectedDoc.fileName}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Uploaded on {selectedDoc.uploadedDate}</p>
                </div>
                <div className="pt-2">
                  <button 
                    onClick={() => setFullPreviewDoc(selectedDoc)}
                    className="text-xs text-blue-400 hover:text-white cursor-pointer inline-flex items-center gap-1.5 bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 px-3.5 py-2 rounded-lg transition-all font-medium"
                  >
                    <ExternalLink size={14} />
                    Open Full Document Preview
                  </button>
                </div>
              </div>

              {/* Audit Notes */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-1 text-xs">
                <p className="font-semibold text-slate-400 uppercase tracking-wider">KYC Audit Notes & System Flags</p>
                <p className="text-slate-300">{selectedDoc.notes}</p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900">
              <div className="flex items-center gap-2">
                {selectedDoc.status !== "Approved" && (
                  <button
                    onClick={() => handleApproveDoc(selectedDoc.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Check size={14} />
                    Approve KYC & Verify Borrower
                  </button>
                )}

                {selectedDoc.status !== "Rejected" && (
                  <button
                    onClick={() => handleRejectDoc(selectedDoc.id)}
                    className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <X size={14} />
                    Reject Document
                  </button>
                )}
              </div>

              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Interactive Document Viewer Sub-Modal */}
      {fullPreviewDoc && (
        <div className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 md:p-6 animate-in fade-in zoom-in-95 duration-200">
          {/* Top Viewer Toolbar */}
          <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-xl px-6 py-3 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/30">
                <FileCheck2 size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  {fullPreviewDoc.fileName}
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                    AES-256 Encrypted Stream
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Borrower: {fullPreviewDoc.borrowerName} ({fullPreviewDoc.borrowerId}) • {fullPreviewDoc.docType}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {actionNotification && (
                <span className="text-xs text-blue-400 font-medium animate-pulse bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-lg">
                  {actionNotification}
                </span>
              )}

              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs text-slate-400">
                <button onClick={handleZoomOut} className="p-1.5 hover:text-white hover:bg-slate-800 rounded transition-colors" title="Zoom Out"><ZoomOut size={16} /></button>
                <span className="px-3 font-mono text-slate-200">{zoomLevel}%</span>
                <button onClick={handleZoomIn} className="p-1.5 hover:text-white hover:bg-slate-800 rounded transition-colors" title="Zoom In"><ZoomIn size={16} /></button>
              </div>

              <button onClick={handlePrint} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors" title="Print Document">
                <Printer size={16} />
              </button>

              <button onClick={() => handleDownload(fullPreviewDoc.fileName)} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors" title="Download Document">
                <Download size={16} />
              </button>

              <button
                onClick={() => {
                  setFullPreviewDoc(null);
                  setZoomLevel(100);
                }}
                className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg transition-colors"
                title="Close Viewer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Interactive Document Preview Canvas */}
          <div className="w-full max-w-5xl flex-1 my-4 bg-slate-900/90 border border-slate-800 rounded-xl p-8 overflow-y-auto custom-scrollbar flex flex-col items-center justify-center relative shadow-2xl">
            {/* Watermark Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 rotate-[-30deg]">
              <span className="text-7xl font-extrabold uppercase text-slate-100 tracking-widest">OAL VERIFIED SECURE</span>
            </div>

            {/* Simulated Official Document Page */}
            <div 
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl relative transition-transform duration-200"
            >
              {/* Document Header */}
              <div className="flex justify-between items-start border-b border-slate-850 pb-6">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-wide uppercase">OFFICIAL REGULATORY DOCUMENT</h2>
                  <p className="text-xs text-blue-400 font-mono mt-0.5">ISSUED BY: {fullPreviewDoc.issuedBy.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono bg-blue-500/10 text-blue-400 px-3 py-1 rounded-md border border-blue-500/20">
                    REF: {fullPreviewDoc.id}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1">{fullPreviewDoc.uploadedDate}</p>
                </div>
              </div>

              {/* Document Details Grid */}
              <div className="grid grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 text-xs">
                <div>
                  <p className="text-slate-500 font-medium">DOCUMENT HOLDER</p>
                  <p className="text-sm font-bold text-white mt-0.5">{fullPreviewDoc.borrowerName}</p>
                  <p className="text-[11px] font-mono text-slate-400">{fullPreviewDoc.borrowerEmail}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">BORROWER ID</p>
                  <p className="text-sm font-bold text-emerald-400 mt-0.5">{fullPreviewDoc.borrowerId}</p>
                  <p className="text-[11px] text-slate-400">Category: {fullPreviewDoc.docType}</p>
                </div>
              </div>

              {/* Simulated Document Graphic Box */}
              <div className="border-2 border-dashed border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-3 bg-slate-900/30">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck size={36} />
                </div>
                <h4 className="text-sm font-bold text-slate-100">SCANNED VERIFICATION DOCUMENT ATTACHMENT</h4>
                <p className="text-xs text-slate-400 max-w-md">
                  This document has been cryptographically signed and stored in the OAL Enterprise Storage Vault.
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <span className="text-[11px] font-mono bg-slate-900 text-slate-400 px-3 py-1 rounded border border-slate-800">
                    {fullPreviewDoc.fileName}
                  </span>
                  <span className="text-[11px] font-mono bg-slate-900 text-emerald-400 px-2.5 py-1 rounded border border-slate-800">
                    VERIFIED
                  </span>
                </div>
              </div>

              {/* Official Stamp Footer */}
              <div className="pt-4 border-t border-slate-850 flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <Lock size={12} className="text-emerald-400" />
                  <span>Tamper-Proof Audit Trail Active</span>
                </div>
                <div className="border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 px-3 py-1 rounded font-bold text-[11px] tracking-wider uppercase">
                  ✓ VERIFICATION APPROVED
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="w-full max-w-5xl flex justify-between items-center text-xs text-slate-400 px-2">
            <span>Press ESC or click close button to exit viewer</span>
            <button
              onClick={() => setFullPreviewDoc(null)}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors border border-slate-700"
            >
              Close Full Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
