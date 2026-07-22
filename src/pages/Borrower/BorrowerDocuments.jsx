import React from "react";
import { Upload } from "lucide-react";

export default function BorrowerDocuments() {
  return (
    <div className="space-y-6 font-sans text-slate-100">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">KYC Document Upload</h1>
        <p className="text-sm text-slate-400">Upload your ID proof, address proof, and income statement to verify your application.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Identity Proof (Passport/ID)", "Address Proof (Utility Bill)", "Income Statement (Paystub/Bank Statement)"].map((docType, idx) => (
          <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
            <Upload size={32} className="text-blue-400" />
            <h3 className="text-sm font-semibold">{docType}</h3>
            <button className="px-3 py-1.5 bg-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-700 transition-colors">
              Choose File
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
