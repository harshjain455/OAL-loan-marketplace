import React, { useState } from "react";
import { Send, User, Building } from "lucide-react";

export default function RepLetsWorkChat() {
  const [borrowerMsg, setBorrowerMsg] = useState([
    { sender: "Borrower", text: "Hi, I uploaded my W2 form. Can you review it?" }
  ]);
  const [lenderMsg, setLenderMsg] = useState([
    { sender: "Lender", text: "We reviewed Lead #2918. Can they do a 10% down payment?" }
  ]);
  const [borrowerInput, setBorrowerInput] = useState("");
  const [lenderInput, setLenderInput] = useState("");

  const handleBorrowerSend = (e) => {
    e.preventDefault();
    if (!borrowerInput.trim()) return;
    setBorrowerMsg([...borrowerMsg, { sender: "Rep", text: borrowerInput }]);
    setBorrowerInput("");
  };

  const handleLenderSend = (e) => {
    e.preventDefault();
    if (!lenderInput.trim()) return;
    setLenderMsg([...lenderMsg, { sender: "Rep", text: lenderInput }]);
    setLenderInput("");
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">OAL LetsWork Portal</h1>
        <p className="text-sm text-slate-400">Coordinated chat interface for simultaneous Lender and Borrower messaging</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Borrower Communication Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-[400px] overflow-hidden">
          <div className="p-4 bg-slate-950 border-b border-slate-850 flex items-center gap-2">
            <User size={16} className="text-blue-400" />
            <span className="font-semibold text-sm">Borrower Chat Thread (Legal Profile Name)</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {borrowerMsg.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "Rep" ? "justify-end" : "justify-start"}`}>
                <div className={`p-2.5 rounded-xl text-xs max-w-xs ${
                  msg.sender === "Rep" ? "bg-blue-600 text-slate-50" : "bg-slate-850 text-slate-200"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleBorrowerSend} className="p-3 bg-slate-950 border-t border-slate-850 flex gap-2">
            <input
              type="text"
              value={borrowerInput}
              onChange={(e) => setBorrowerInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
              placeholder="Message Borrower..."
            />
            <button type="submit" className="p-1.5 bg-blue-600 rounded-lg hover:bg-blue-500">
              <Send size={14} />
            </button>
          </form>
        </div>

        {/* Lender Communication Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-[400px] overflow-hidden">
          <div className="p-4 bg-slate-950 border-b border-slate-850 flex items-center gap-2">
            <Building size={16} className="text-indigo-400" />
            <span className="font-semibold text-sm">Lender Chat Thread (Anonymous Lender Company)</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {lenderMsg.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "Rep" ? "justify-end" : "justify-start"}`}>
                <div className={`p-2.5 rounded-xl text-xs max-w-xs ${
                  msg.sender === "Rep" ? "bg-indigo-600 text-slate-50" : "bg-slate-850 text-slate-200"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleLenderSend} className="p-3 bg-slate-950 border-t border-slate-850 flex gap-2">
            <input
              type="text"
              value={lenderInput}
              onChange={(e) => setLenderInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
              placeholder="Message Lender..."
            />
            <button type="submit" className="p-1.5 bg-indigo-600 rounded-lg hover:bg-indigo-500">
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
