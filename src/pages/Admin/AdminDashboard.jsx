import React from "react";
import { Link } from "react-router-dom";
import { Users, FileText, CheckCircle, LifeBuoy } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Console Dashboard</h1>
        <p className="text-sm text-slate-400">Complete platform management controls</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <h3 className="text-xs font-semibold text-slate-400">Active Borrowers</h3>
          <p className="text-3xl font-extrabold text-slate-50">142</p>
          <Link to="/admin/borrowers" className="text-xs text-blue-400 hover:underline">
            Manage borrowers
          </Link>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <h3 className="text-xs font-semibold text-slate-400">Active Lenders</h3>
          <p className="text-3xl font-extrabold text-slate-50">28</p>
          <Link to="/admin/lenders" className="text-xs text-blue-400 hover:underline">
            Manage Lenders
          </Link>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <h3 className="text-xs font-semibold text-slate-400">KYC Approvals Pending</h3>
          <p className="text-3xl font-extrabold text-slate-50">4</p>
          <Link to="/admin/verification" className="text-xs text-blue-400 hover:underline">
            Open Verification Center
          </Link>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <h3 className="text-xs font-semibold text-slate-400">Help Desk Tickets</h3>
          <p className="text-3xl font-extrabold text-slate-50">2</p>
          <Link to="/admin/help-desk" className="text-xs text-blue-400 hover:underline">
            Open Help Desk
          </Link>
        </div>
      </div>
    </div>
  );
}
