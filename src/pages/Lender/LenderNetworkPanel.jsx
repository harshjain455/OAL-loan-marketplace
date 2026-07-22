import React from "react";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function LenderNetworkPanel() {
  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div className="flex justify-between items-center pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">OAL Network Panel</h1>
          <p className="text-sm text-slate-400">Access the shared live real-time lending marketplace view</p>
        </div>
      </div>

      <div className="p-8 bg-slate-900 border border-slate-800 rounded-xl max-w-xl text-center space-y-4">
        <Compass size={48} className="text-blue-400 mx-auto animate-spin" />
        <h3 className="text-lg font-bold">Launch Marketplace View</h3>
        <p className="text-xs text-slate-400">
          Open the real-time marketplace stream to monitor borrowers, check application color indicators, and audit processing stages.
        </p>
        <Link to="/network/live-stream" className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-950 font-semibold text-xs rounded-lg hover:bg-slate-200 transition-colors">
          Open Live Stream Panel
        </Link>
      </div>
    </div>
  );
}
