import React from "react";
import { Cpu } from "lucide-react";

export default function BorrowerAIScore() {
  return (
    <div className="space-y-6 font-sans text-slate-100">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Borrower Score</h1>
        <p className="text-sm text-slate-400">Risk rating assessment generated automatically by OAL's scoring model.</p>
      </div>

      <div className="p-8 bg-slate-900 border border-slate-800 rounded-xl max-w-xl text-center space-y-4">
        <Cpu size={48} className="text-indigo-400 mx-auto" />
        <h2 className="text-lg font-bold">iNV IQ Evaluation</h2>
        <div className="p-4 bg-slate-950 rounded-lg">
          <span className="text-3xl font-extrabold text-indigo-400">A+</span>
          <p className="text-xs text-slate-400 mt-1">Excellent Creditworthiness & Profile Matrix Score</p>
        </div>
        <p className="text-xs text-slate-500">
          This score helps matching Lenders evaluate risk factors and customize pricing on loan offers.
        </p>
      </div>
    </div>
  );
}
