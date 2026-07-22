import React, { useState } from "react";
import { LifeBuoy, Check } from "lucide-react";

export default function AdminHelpDesk() {
  const [activeTicket, setActiveTicket] = useState({
    id: "TCK-1092",
    user: "Borrower John Doe",
    query: "I cannot upload my Income statement. It says file size exceeded.",
    suggestions: [
      "Hello! Please compress the PDF to under 5MB or upload as JPEG format.",
      "Hello John, let me manually verify it for you if you send it via email."
    ]
  });

  const [response, setResponse] = useState("");

  return (
    <div className="space-y-6 text-slate-100 font-sans max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Help Desk & Support Tickets</h1>
        <p className="text-sm text-slate-400">Streamline support tickets and resolve user queries with AI-suggested responses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
          <h3 className="font-semibold text-sm border-b border-slate-850 pb-2">Active Tickets</h3>
          <div className="p-3 bg-slate-950 rounded-lg border border-blue-500/20 cursor-pointer">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-300">{activeTicket.id}</span>
              <span className="text-blue-400">Open</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 truncate">{activeTicket.query}</p>
          </div>
        </div>

        {/* Ticket Chat Console */}
        <div className="md:col-span-2 p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
          <div className="border-b border-slate-850 pb-3">
            <h3 className="font-semibold text-sm">{activeTicket.user} ({activeTicket.id})</h3>
            <p className="text-xs text-slate-400 mt-1">Issue: "{activeTicket.query}"</p>
          </div>

          {/* AI Response Suggestions */}
          <div className="space-y-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">AI Suggested Responses</span>
            <div className="grid grid-cols-1 gap-2">
              {activeTicket.suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => setResponse(sug)}
                  className="p-3 bg-slate-950 border border-slate-850 hover:border-blue-500/30 text-left text-xs rounded-lg transition-colors text-slate-300"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Response Box */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-semibold text-slate-300">Reply Response</label>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg p-3 text-xs text-slate-200 focus:outline-none"
              placeholder="Type or select an AI suggestion..."
            />
            <button
              onClick={() => {
                alert("Reply Sent! Ticket Status updated to Closed.");
                setResponse("");
              }}
              className="px-4 py-2 bg-slate-100 text-slate-950 font-semibold text-xs rounded-lg hover:bg-slate-200 transition-colors"
            >
              Send Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
