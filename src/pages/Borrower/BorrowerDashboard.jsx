import React from "react";
import { Link } from "react-router-dom";
import { Compass, Calendar, CheckSquare, MessageSquare } from "lucide-react";

export default function BorrowerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Borrower Dashboard</h1>
          <p className="text-sm text-slate-400">Welcome back, track your active loan applications and setup</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
          <h3 className="text-sm font-semibold text-slate-400">Application Status</h3>
          <p className="text-2xl font-bold text-slate-50">In Progress</p>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500">
            Awaiting Document Verification
          </span>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
          <h3 className="text-sm font-semibold text-slate-400">AI Score Card [iNV IQ]</h3>
          <p className="text-2xl font-bold text-slate-50">Not Generated</p>
          <span className="text-xs text-slate-500">Generated automatically after document check</span>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
          <h3 className="text-sm font-semibold text-slate-400">Assigned OAL Representative</h3>
          <p className="text-md font-semibold text-slate-50">Agent Alex</p>
          <Link to="/borrower/messages" className="inline-flex items-center text-xs text-blue-400 hover:underline">
            <MessageSquare size={14} className="mr-1" /> Chat with Agent
          </Link>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-lg font-bold text-slate-50 mb-4">Application Milestones</h2>
        <div className="relative border-l border-slate-850 ml-4 space-y-6">
          {[
            { title: "Account Created", desc: "MFA enabled", done: true },
            { title: "Fill Loan Details", desc: "Specify amount, terms, purpose", done: false },
            { title: "Upload KYC Verification Files", desc: "Submit ID, address & income proofs", done: false },
            { title: "AI Borrower Score Assessment", desc: "Automatic credit rating check", done: false },
            { title: "Receive Lender Offers", desc: "Compare and select terms", done: false },
          ].map((step, idx) => (
            <div key={idx} className="relative pl-6">
              <span className={`absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full ${step.done ? "bg-emerald-500" : "bg-slate-800"}`} />
              <h4 className={`text-sm font-semibold ${step.done ? "text-slate-100" : "text-slate-400"}`}>{step.title}</h4>
              <p className="text-xs text-slate-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
