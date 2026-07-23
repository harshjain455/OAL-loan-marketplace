import React, { useState } from "react";
import { 
  FolderGit, Database, ShieldCheck, Search, Filter, Eye, Lock, FileText, User, Building2, Tag, Calendar, ExternalLink, HardDrive, Hash, X, Download, Printer, ZoomIn, ZoomOut, FileCheck2
} from "lucide-react";

export default function AdminDocumentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Files");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fullPreviewFile, setFullPreviewFile] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [actionNotification, setActionNotification] = useState("");

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 25, 50));

  const handleDownload = (fileName) => {
    setActionNotification(`Downloading ${fileName}...`);
    const element = document.createElement("a");
    const file = new Blob([`OAL Marketplace Central Storage Record\nFile: ${fileName}\nStatus: Vault Encrypted AES-256`], {type: 'text/plain'});
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

  // Mock Global Storage Repository Files Data (Read-Only Central Repository)
  const [documents] = useState([
    {
      id: "DOC-9001",
      fileName: "Passport_National_ID_Rahul.pdf",
      fileType: "PDF",
      fileSize: "2.4 MB",
      category: "KYC Documents",
      linkedEntity: "Rahul Sharma (BOR-101)",
      linkedAppId: "APP-9010",
      uploadedDate: "2026-01-22 10:30 AM",
      encryption: "AES-256 Encrypted",
      sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      accessLevel: "Restricted Read-Only"
    },
    {
      id: "DOC-9002",
      fileName: "Apex_Capital_Operating_License.pdf",
      fileType: "PDF",
      fileSize: "5.8 MB",
      category: "Lender Credentials",
      linkedEntity: "Apex Capital Lending LLC (LND-801)",
      linkedAppId: "N/A - Entity License",
      uploadedDate: "2026-01-20 04:15 PM",
      encryption: "AES-256 Encrypted",
      sha256Hash: "8f4e2c1198aa124b8efef9234857b610398f77a5649c002bc11234908ef91234",
      accessLevel: "Enterprise Verified"
    },
    {
      id: "DOC-9003",
      fileName: "Executing_Loan_Agreement_APP9012.pdf",
      fileType: "PDF",
      fileSize: "1.9 MB",
      category: "Loan Contracts",
      linkedEntity: "Vikram Malhotra (BOR-105) & Horizon Funding",
      linkedAppId: "APP-9012",
      uploadedDate: "2026-01-02 04:45 PM",
      encryption: "AES-256 Encrypted",
      sha256Hash: "4a98f102bc8911ef092837465910298374bcf891234098231478129038471092",
      accessLevel: "Legally Binding Contract"
    },
    {
      id: "DOC-9004",
      fileName: "Bank_Statement_Q4_Priya.pdf",
      fileType: "PDF",
      fileSize: "4.1 MB",
      category: "KYC Documents",
      linkedEntity: "Priya Patel (BOR-102)",
      linkedAppId: "APP-9013",
      uploadedDate: "2026-01-21 02:15 PM",
      encryption: "AES-256 Encrypted",
      sha256Hash: "9912083471092384710928374102983741092837410928374109283741092837",
      accessLevel: "Restricted Read-Only"
    },
    {
      id: "DOC-9005",
      fileName: "Horizon_State_Lending_Permit.pdf",
      fileType: "PDF",
      fileSize: "3.2 MB",
      category: "Lender Credentials",
      linkedEntity: "Horizon Commercial Funding (LND-802)",
      linkedAppId: "N/A - Entity License",
      uploadedDate: "2025-11-15 09:30 AM",
      encryption: "AES-256 Encrypted",
      sha256Hash: "1102938471029384710293847102938471029384710293847102938471029384",
      accessLevel: "Enterprise Verified"
    }
  ]);

  // Filtering
  const filteredDocs = documents.filter(doc => {
    const matchesSearch = 
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.linkedEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.linkedAppId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.sha256Hash.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "All Files" || doc.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const totalFiles = documents.length;
  const totalVolume = "4.8 GB";
  const kycCount = documents.filter(d => d.category === "KYC Documents").length;
  const contractCount = documents.filter(d => d.category === "Loan Contracts").length;

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Document Management Repository
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono flex items-center gap-1">
              <Lock size={12} />
              AES-256 Vault Active
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Global secure central storage repository. Read-only audit access across platform files.</p>
        </div>
        <div className="text-xs bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1.5 rounded-lg flex items-center gap-2">
          <Database size={14} className="text-blue-400" />
          <span>Storage Index: <strong className="text-white">{totalVolume} Used</strong></span>
        </div>
      </div>

      {/* Metric Cards - Clickable Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setCategoryFilter("All Files")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            categoryFilter === "All Files" ? "border-blue-500/50 shadow-md shadow-blue-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Total Vault Files</p>
            <p className="text-2xl font-bold text-white mt-1">{totalFiles}</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <FolderGit size={20} />
          </div>
        </div>

        <div 
          onClick={() => setCategoryFilter("KYC Documents")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            categoryFilter === "KYC Documents" ? "border-purple-500/50 shadow-md shadow-purple-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">KYC Proof Files</p>
            <p className="text-2xl font-bold text-purple-400 mt-1">{kycCount}</p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
            <FileText size={20} />
          </div>
        </div>

        <div 
          onClick={() => setCategoryFilter("Loan Contracts")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            categoryFilter === "Loan Contracts" ? "border-emerald-500/50 shadow-md shadow-emerald-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Loan Contracts</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{contractCount}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <ShieldCheck size={20} />
          </div>
        </div>

        <div 
          onClick={() => setCategoryFilter("All Files")}
          className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-all"
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Total Storage Pool</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{totalVolume}</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <HardDrive size={20} />
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search file name, user, app ID, hash..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end overflow-x-auto">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-xs text-slate-400">Category:</span>
          </div>
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {["All Files", "KYC Documents", "Lender Credentials", "Loan Contracts"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                  categoryFilter === cat
                    ? "bg-blue-600 text-white font-medium"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Repository Table (Read-Only Central Storage) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Document Name & Format</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Linked Entity / Application</th>
                <th className="px-6 py-4 font-semibold">Storage & Date</th>
                <th className="px-6 py-4 font-semibold">Security Encryption</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500 text-sm">
                    No documents found in central repository matching your search.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((file) => (
                  <tr key={file.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold text-xs">
                          {file.fileType}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-100 text-xs truncate max-w-[220px]">{file.fileName}</p>
                          <p className="text-[11px] text-slate-500 font-mono">{file.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${
                        file.category === "KYC Documents"
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                          : file.category === "Lender Credentials"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }`}>
                        <Tag size={12} />
                        {file.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5 text-xs">
                        <p className="text-slate-200 font-medium">{file.linkedEntity}</p>
                        <p className="text-slate-500">App Ref: {file.linkedAppId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div>
                        <p className="text-slate-300 font-mono">{file.fileSize}</p>
                        <p className="text-[11px] text-slate-500">{file.uploadedDate}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-mono">
                        <Lock size={11} />
                        {file.encryption}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedFile(file)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors inline-flex items-center gap-1.5 border border-slate-700"
                        title="View Read-Only Document Metadata & Audit Details"
                      >
                        <Eye size={14} className="text-blue-400" />
                        Audit & View File
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Read-Only File Audit Viewer Modal */}
      {selectedFile && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  <Database size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    Central Storage Audit: {selectedFile.id}
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-normal bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <Lock size={10} />
                      Read-Only Mode
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">{selectedFile.fileName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {/* File Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <p className="text-slate-500">File Category</p>
                  <p className="text-xs font-bold text-blue-400 mt-1">{selectedFile.category}</p>
                </div>
                <div>
                  <p className="text-slate-500">File Size</p>
                  <p className="text-xs font-bold font-mono text-slate-200 mt-1">{selectedFile.fileSize}</p>
                </div>
                <div>
                  <p className="text-slate-500">Format</p>
                  <p className="text-xs font-bold font-mono text-emerald-400 mt-1">{selectedFile.fileType}</p>
                </div>
                <div>
                  <p className="text-slate-500">Security Clearance</p>
                  <p className="text-xs font-bold text-purple-400 mt-1">{selectedFile.accessLevel}</p>
                </div>
              </div>

              {/* Entity Link Info */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 space-y-2 text-xs">
                <h4 className="font-semibold text-slate-400 uppercase tracking-wider">Linked Entity & Application Reference</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <p className="text-slate-300"><strong className="text-slate-500">Linked User/Lender:</strong> {selectedFile.linkedEntity}</p>
                  <p className="text-slate-300"><strong className="text-slate-500">Application Reference:</strong> {selectedFile.linkedAppId}</p>
                  <p className="text-slate-300"><strong className="text-slate-500">Upload Date:</strong> {selectedFile.uploadedDate}</p>
                  <p className="text-slate-300"><strong className="text-slate-500">Encryption Method:</strong> {selectedFile.encryption}</p>
                </div>
              </div>

              {/* Security Cryptographic Hash Checksum */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Hash size={14} className="text-blue-400" />
                  SHA-256 Security Checksum Hash
                </h4>
                <p className="font-mono text-[11px] text-emerald-400 bg-slate-900 p-2.5 rounded-lg border border-slate-850 break-all">
                  {selectedFile.sha256Hash}
                </p>
              </div>

              {/* Full Document Stream Button */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-xs font-semibold text-slate-200">Interactive Document Viewer Stream</p>
                  <p className="text-[11px] text-slate-500">Decrypt and stream document in full-screen reader.</p>
                </div>
                <button
                  onClick={() => setFullPreviewFile(selectedFile)}
                  className="px-3.5 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5"
                >
                  <ExternalLink size={14} />
                  Open Full Document Preview
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Lock size={12} className="text-emerald-400" />
                Read-Only Central Repository File Viewer
              </span>
              <button
                onClick={() => setSelectedFile(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors"
              >
                Close Audit Viewer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Interactive Central Repository File Viewer Sub-Modal */}
      {fullPreviewFile && (
        <div className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 md:p-6 animate-in fade-in zoom-in-95 duration-200">
          {/* Top Viewer Toolbar */}
          <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-xl px-6 py-3 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/30">
                <FileCheck2 size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  {fullPreviewFile.fileName}
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                    {fullPreviewFile.encryption}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Linked: {fullPreviewFile.linkedEntity} • ID: {fullPreviewFile.id}</p>
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

              <button onClick={() => handleDownload(fullPreviewFile.fileName)} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors" title="Download Encrypted File">
                <Download size={16} />
              </button>

              <button
                onClick={() => {
                  setFullPreviewFile(null);
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
              <span className="text-7xl font-extrabold uppercase text-slate-100 tracking-widest">OAL CENTRAL STORAGE REPOSITORY</span>
            </div>

            {/* Simulated Official Document Page */}
            <div 
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl relative transition-transform duration-200"
            >
              {/* Document Header */}
              <div className="flex justify-between items-start border-b border-slate-850 pb-6">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-wide uppercase">CENTRAL VAULT RECORD</h2>
                  <p className="text-xs text-blue-400 font-mono mt-0.5">CATEGORY: {fullPreviewFile.category.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono bg-blue-500/10 text-blue-400 px-3 py-1 rounded-md border border-blue-500/20">
                    ID: {fullPreviewFile.id}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1">{fullPreviewFile.uploadedDate}</p>
                </div>
              </div>

              {/* Document Details Grid */}
              <div className="grid grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 text-xs">
                <div>
                  <p className="text-slate-500 font-medium">LINKED ENTITY</p>
                  <p className="text-sm font-bold text-white mt-0.5">{fullPreviewFile.linkedEntity}</p>
                  <p className="text-[11px] font-mono text-slate-400">Ref: {fullPreviewFile.linkedAppId}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">FILE METADATA</p>
                  <p className="text-sm font-bold text-emerald-400 mt-0.5">{fullPreviewFile.fileSize} ({fullPreviewFile.fileType})</p>
                  <p className="text-[11px] text-purple-400 font-medium">{fullPreviewFile.accessLevel}</p>
                </div>
              </div>

              {/* Cryptographic Hash Details */}
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">SHA-256 Hash Integrity Verification</span>
                <p className="font-mono text-[10px] text-emerald-400 break-all">{fullPreviewFile.sha256Hash}</p>
              </div>

              {/* Simulated Document Graphic Box */}
              <div className="border-2 border-dashed border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-3 bg-slate-900/30">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Database size={36} />
                </div>
                <h4 className="text-sm font-bold text-slate-100">FULL FILE STREAM DECRYPTED</h4>
                <p className="text-xs text-slate-400 max-w-md">
                  This document is securely indexed in the central marketplace vault with full audit logging enabled.
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <span className="text-[11px] font-mono bg-slate-900 text-slate-400 px-3 py-1 rounded border border-slate-800">
                    {fullPreviewFile.fileName}
                  </span>
                  <span className="text-[11px] font-mono bg-slate-900 text-emerald-400 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1">
                    <Lock size={10} />
                    READ-ONLY VAULT STREAM
                  </span>
                </div>
              </div>

              {/* Official Stamp Footer */}
              <div className="pt-4 border-t border-slate-850 flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <Lock size={12} className="text-emerald-400" />
                  <span>Immutable Blockchain-Backed Vault Log</span>
                </div>
                <div className="border border-blue-500/30 bg-blue-500/5 text-blue-400 px-3 py-1 rounded font-bold text-[11px] tracking-wider uppercase">
                  ✓ RECORD AUDITED
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="w-full max-w-5xl flex justify-between items-center text-xs text-slate-400 px-2">
            <span>Press ESC or click close button to exit viewer</span>
            <button
              onClick={() => setFullPreviewFile(null)}
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
