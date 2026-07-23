import React, { useState, useRef } from "react";
import { UploadCloud, CheckCircle2, AlertCircle, Clock, File, ShieldCheck, Trash2, FileText, Sparkles, Plus, Check, X } from "lucide-react";

export default function BorrowerDocuments() {
  const fileInputRef = useRef(null);

  const [documents, setDocuments] = useState([
    {
      id: "doc-1",
      category: "Identity Proof",
      name: "Government_ID_Passport.pdf",
      size: "2.4 MB",
      uploadedDate: "2026-07-21",
      status: "Approved",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    {
      id: "doc-2",
      category: "Address Proof",
      name: "Utility_Bill_Electric_June.pdf",
      size: "1.1 MB",
      uploadedDate: "2026-07-22",
      status: "Under Review",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
    },
    {
      id: "doc-3",
      category: "Income Proof",
      name: "Bank_Statement_Q2_2026.pdf",
      size: "4.8 MB",
      uploadedDate: "2026-07-22",
      status: "Under Review",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Identity Proof");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedSuccessMsg, setUploadedSuccessMsg] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(20);
    setUploadedSuccessMsg("");

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 25;
      });
    }, 250);

    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);

      const newDoc = {
        id: `doc-${Date.now()}`,
        category: selectedCategory,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedDate: new Date().toISOString().split("T")[0],
        status: "Pending Review",
        badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
      };

      setDocuments((prevDocs) => [newDoc, ...prevDocs]);
      setUploading(false);
      setUploadedSuccessMsg(`File "${file.name}" uploaded successfully!`);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Close modal after brief delay
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
    }, 1500);
  };

  const removeDoc = (id) => {
    setDocuments(documents.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-5 font-sans text-slate-100 w-full max-w-7xl mx-auto pb-10 overflow-hidden">
      
      {/* 1. Header Banner with TOP RIGHT BROWSE FILE BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-bold tracking-tight text-white">KYC & Verification Documents</h1>
            <span className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold rounded-full flex items-center gap-1">
              <Sparkles size={11} /> Wireframe Compliant
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Upload required KYC documents for identity verification and AI scoring.
          </p>
        </div>

        {/* TOP RIGHT BROWSE FILE BUTTON */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-400 font-semibold">
            <ShieldCheck size={15} /> 256-Bit SSL Vault
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus size={16} /> Browse File
          </button>
        </div>
      </div>

      {/* Global Success Alert Banner */}
      {uploadedSuccessMsg && !isModalOpen && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
          <span className="flex items-center gap-2 font-semibold">
            <Check size={16} className="text-emerald-400 shrink-0" /> {uploadedSuccessMsg}
          </span>
          <button onClick={() => setUploadedSuccessMsg("")} className="text-slate-400 hover:text-white font-bold ml-2">×</button>
        </div>
      )}

      {/* 2. Verification Status Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        
        {/* Identity Proof Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <FileText size={15} className="text-indigo-400" /> Identity Proof
            </span>
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-full flex items-center gap-1">
              <CheckCircle2 size={11} /> Approved
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Passport, Driver's License, or National ID Card.</p>
        </div>

        {/* Address Proof Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <FileText size={15} className="text-indigo-400" /> Address Proof
            </span>
            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold rounded-full flex items-center gap-1">
              <Clock size={11} className="animate-spin" /> Under Review
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Utility Bill, Lease, or Bank Statement.</p>
        </div>

        {/* Income Proof Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <FileText size={15} className="text-indigo-400" /> Income Proof
            </span>
            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold rounded-full flex items-center gap-1">
              <Clock size={11} className="animate-spin" /> Under Review
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Bank Statements, Tax Returns, or Payslips.</p>
        </div>

      </div>

      {/* 3. Uploaded Documents Directory List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <FileText size={16} className="text-indigo-400" />
            Uploaded Documents Directory
          </h2>
          <span className="text-xs text-slate-400 font-semibold">{documents.length} Files Total</span>
        </div>

        <div className="space-y-3">
          {documents.map((doc) => (
            <div 
              key={doc.id} 
              className="p-3 sm:p-4 bg-slate-950/70 border border-slate-850 rounded-xl flex items-center justify-between gap-2.5 hover:border-slate-800 transition-colors"
            >
              {/* Left File Info */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="p-2 bg-slate-900 border border-slate-800 text-indigo-400 rounded-lg shrink-0">
                  <File size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-indigo-400 block truncate">{doc.category}</span>
                  <h3 className="text-xs font-bold text-white truncate max-w-[150px] xs:max-w-[200px] sm:max-w-md">{doc.name}</h3>
                  <span className="text-[10px] text-slate-500 block truncate">{doc.size} • {doc.uploadedDate}</span>
                </div>
              </div>

              {/* Right Side Status & Actions */}
              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                <span className={`px-2 sm:px-2.5 py-0.5 sm:py-1 border text-[10px] sm:text-xs font-semibold rounded-full flex items-center gap-1 shrink-0 ${doc.badgeColor}`}>
                  {doc.status === "Approved" ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                  {doc.status}
                </span>

                <button
                  onClick={() => removeDoc(doc.id)}
                  className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                  title="Remove document"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. FILE UPLOAD POPUP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <UploadCloud size={18} className="text-indigo-400" />
                Upload Verification Document
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
              
              {/* Category Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">Select Document Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-semibold focus:outline-none focus:border-indigo-500"
                >
                  <option value="Identity Proof">Identity Proof (Passport / Driver License)</option>
                  <option value="Address Proof">Address Proof (Utility Bill / Lease)</option>
                  <option value="Income Proof">Income Proof (Bank Statement / Tax Return)</option>
                  <option value="Other Financials">Other Financial Statements</option>
                </select>
              </div>

              {/* File Dropzone Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">Choose File to Upload</label>
                
                {/* Hidden Native File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="hidden"
                />

                <div 
                  onClick={() => !uploading && fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-800 hover:border-indigo-500/60 bg-slate-950/60 rounded-2xl p-6 text-center cursor-pointer transition-all group relative overflow-hidden"
                >
                  {/* Upload Progress Overlay */}
                  {uploading && (
                    <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center space-y-3 px-6 z-10">
                      <span className="text-xs font-bold text-indigo-400">Uploading Document... ({uploadProgress}%)</span>
                      <div className="w-full max-w-xs bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 group-hover:scale-110 transition-transform">
                      <UploadCloud size={24} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Click Here to Pick File from Computer</span>
                      <span className="text-[10.5px] text-slate-400 block mt-0.5">Supports PDF, PNG, JPG (Max 15MB)</span>
                    </div>
                    <button 
                      type="button"
                      className="mt-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Plus size={14} /> Browse File
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-xs rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
