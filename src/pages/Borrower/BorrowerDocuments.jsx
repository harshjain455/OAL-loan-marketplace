import React, { useState } from "react";
import { UploadCloud, CheckCircle2, AlertCircle, Clock, File, ShieldCheck, Trash2 } from "lucide-react";

export default function BorrowerDocuments() {
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

  const [selectedCategory, setSelectedCategory] = useState("Identity Proof");
  const [uploading, setUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 5000);
  };

  const handleSimulatedUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setTimeout(() => {
      const newDoc = {
        id: `doc-${Date.now()}`,
        category: selectedCategory,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedDate: new Date().toISOString().split("T")[0],
        status: "Pending Review",
        badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
      };
      setDocuments([newDoc, ...documents]);
      setUploading(false);
      showToast(`${file.name} uploaded successfully and queued for KYC verification!`);
    }, 1200);
  };

  const removeDoc = (id) => {
    setDocuments(documents.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">KYC & Financial Documents</h1>
        <p className="text-sm text-slate-400">Upload required verification documents for compliance and AI score validation.</p>
      </div>

      {/* Verification Status Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Verification Status: In Progress</h3>
            <p className="text-xs text-slate-400">2 of 3 required KYC document categories uploaded and verified.</p>
          </div>
        </div>
        <div className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-400 font-semibold flex items-center gap-2">
          <Clock size={14} className="animate-spin" />
          Admin Verification Pending
        </div>
      </div>

      {/* Document Upload Area */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
        <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <UploadCloud size={18} className="text-indigo-400" />
          Upload New Document
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Document Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-100 font-semibold focus:outline-none focus:border-indigo-500"
            >
              <option value="Identity Proof">Identity Proof (Passport / Driver License)</option>
              <option value="Address Proof">Address Proof (Utility Bill / Lease)</option>
              <option value="Income Proof">Income Proof (Bank Statement / Tax Return)</option>
              <option value="Other Financials">Other Financial Statements</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-300 mb-2">Choose File (PDF, PNG, JPG)</label>
            <div className="relative border-2 border-dashed border-slate-800 hover:border-indigo-500/50 bg-slate-950/50 rounded-xl p-4 text-center cursor-pointer transition-colors">
              <input
                type="file"
                onChange={handleSimulatedUpload}
                disabled={uploading}
                accept=".pdf,.png,.jpg,.jpeg"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center space-y-1">
                <UploadCloud size={24} className="text-indigo-400" />
                <span className="text-xs font-bold text-slate-200">
                  {uploading ? "Uploading & Encrypting Document..." : "Click or Drag File Here to Upload"}
                </span>
                <span className="text-[10px] text-slate-500">Max File Size: 15MB. Encrypted under AES-256 standards.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Documents List */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">Uploaded Documents List</h2>

        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-900 border border-slate-800 text-indigo-400 rounded-lg">
                  <File size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">{doc.category}</span>
                  <h3 className="text-xs font-bold text-white">{doc.name}</h3>
                  <span className="text-[11px] text-slate-500">{doc.size} • Uploaded on {doc.uploadedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 border text-xs font-semibold rounded-full flex items-center gap-1 ${doc.badgeColor}`}>
                  {doc.status === "Approved" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                  {doc.status}
                </span>

                <button
                  onClick={() => removeDoc(doc.id)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Remove document"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-emerald-500 text-slate-100 p-4 rounded-xl shadow-2xl flex items-start gap-2 z-50 text-xs animate-bounce max-w-sm whitespace-pre-line">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
