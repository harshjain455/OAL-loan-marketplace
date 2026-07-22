import React from "react";
import { Link } from "react-router-dom";
import { CheckSquare, MessageSquare } from "lucide-react";

export default function RepDashboard() {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">OAL Rep Portal Dashboard</h1>
        <p className="text-sm text-slate-400">Coordinate between Borrowers and Lenders to facilitate funding</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <h3 className="text-xs font-semibold text-slate-400">Assigned Borrowers</h3>
          <p className="text-3xl font-extrabold text-slate-50">12</p>
          <Link to="/rep/qualified-leads" className="text-xs text-blue-400 hover:underline">
            Manage assigned files
          </Link>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <h3 className="text-xs font-semibold text-slate-400">Pending Actions</h3>
          <p className="text-3xl font-extrabold text-slate-50">3</p>
          <span className="text-xs text-slate-500 font-semibold inline-flex items-center">
            <CheckSquare size={12} className="mr-1" /> Awaiting KYC reviews
          </span>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <h3 className="text-xs font-semibold text-slate-400">Unread Messages</h3>
          <p className="text-3xl font-extrabold text-slate-50">5</p>
          <Link to="/rep/communication" className="text-xs text-blue-400 hover:underline inline-flex items-center">
            <MessageSquare size={12} className="mr-1" /> Open LetsWork Chat
          </Link>
        </div>
      </div>
    </div>
  );
}
