import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Send, User, Building, AlertCircle, Check } from "lucide-react";

export default function RepLetsWorkChat() {
  const [searchParams, setSearchParams] = useSearchParams();
  const borrowerParam = searchParams.get("borrowerId") || "OAL-9842";

  // List of active chats
  const activeChats = [
    { id: "OAL-9842", name: "John Doe", purpose: "Commercial Real Estate", lender: "Lender Alpha (Anonymous)" },
    { id: "OAL-1102", name: "Sarah Jenkins", purpose: "Business Expansion", lender: "Summit Finance (Anonymous)" },
    { id: "OAL-5593", name: "David Vance", purpose: "Debt Consolidation", lender: "Apex Credit (Anonymous)" },
    { id: "OAL-2291", name: "Elena Rostova", purpose: "Equipment Financing", lender: "Pacific Bids (Anonymous)" }
  ];

  const currentChat = activeChats.find(chat => chat.id === borrowerParam) || activeChats[0];

  // Chats local state database
  const [chatDatabase, setChatDatabase] = useState({
    "OAL-9842": {
      borrower: [
        { sender: "Borrower", text: "Hi, I uploaded my W2 form. Can you review it?", time: "10:14 AM" }
      ],
      lender: [
        { sender: "Lender", text: "We reviewed Lead #OAL-9842. Can they do a 10% down payment?", time: "10:15 AM" }
      ]
    },
    "OAL-1102": {
      borrower: [
        { sender: "Borrower", text: "Is there any update on the business expansion loan?", time: "Yesterday" }
      ],
      lender: [
        { sender: "Lender", text: "Requesting audit documents for company expansion verification.", time: "Yesterday" }
      ]
    },
    "OAL-5593": {
      borrower: [
        { sender: "Borrower", text: "Can we adjust the term limit from 60 months to 48 months?", time: "2 days ago" }
      ],
      lender: [
        { sender: "Lender", text: "We are calculating terms for David Vance's debt consolidation request.", time: "Yesterday" }
      ]
    },
    "OAL-2291": {
      borrower: [
        { sender: "Borrower", text: "Hello! Ready to sign the agreement once terms are finalized.", time: "Just now" }
      ],
      lender: [
        { sender: "Lender", text: "Finalizing paperwork under Corporate Equipment Financing offer.", time: "5m ago" }
      ]
    }
  });

  const [borrowerInput, setBorrowerInput] = useState("");
  const [lenderInput, setLenderInput] = useState("");

  const handleBorrowerSend = (e) => {
    e.preventDefault();
    if (!borrowerInput.trim()) return;

    setChatDatabase(prev => ({
      ...prev,
      [currentChat.id]: {
        ...prev[currentChat.id],
        borrower: [...prev[currentChat.id].borrower, { sender: "Rep", text: borrowerInput, time: "Just now" }]
      }
    }));
    setBorrowerInput("");
  };

  const handleLenderSend = (e) => {
    e.preventDefault();
    if (!lenderInput.trim()) return;

    setChatDatabase(prev => ({
      ...prev,
      [currentChat.id]: {
        ...prev[currentChat.id],
        lender: [...prev[currentChat.id].lender, { sender: "Rep", text: lenderInput, time: "Just now" }]
      }
    }));
    setLenderInput("");
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">LetsWork Messaging Hub</h1>
        <p className="text-sm text-slate-400">Coordinated chat interface for simultaneous Lender and Borrower messaging</p>
      </div>

      {/* Strict Rule Notice */}
      <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-center gap-3 text-amber-400 text-xs">
        <AlertCircle size={18} className="shrink-0" />
        <span>
          <strong>Strict Mediator Rule:</strong> Borrowers and Lenders can never communicate directly. All negotiations, terms, and questions must go through you as the OAL Representative.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side: Borrower List */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Deal Files</h3>
          <div className="space-y-2">
            {activeChats.map(chat => (
              <button
                key={chat.id}
                onClick={() => setSearchParams({ borrowerId: chat.id })}
                className={`w-full text-left p-3 rounded-lg border transition-all space-y-1 block ${
                  currentChat.id === chat.id
                    ? "bg-slate-800 border-blue-500 text-slate-100 shadow"
                    : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs">{chat.name}</span>
                  <span className="text-[9px] font-mono bg-slate-850 px-1 py-0.5 rounded text-blue-400">{chat.id}</span>
                </div>
                <p className="text-[10px] text-slate-500 truncate">{chat.purpose}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Dual Chat Panel */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Borrower Chat Thread */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-[450px] overflow-hidden shadow-lg">
            <div className="p-4 bg-slate-950 border-b border-slate-850 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User size={16} className="text-blue-400" />
                <span className="font-bold text-xs text-slate-200">{currentChat.name} (Borrower)</span>
              </div>
              <span className="text-[9px] font-semibold text-emerald-400 flex items-center gap-1">
                <Check size={10} /> Legal Profile
              </span>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatDatabase[currentChat.id]?.borrower.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === "Rep" ? "items-end" : "items-start"}`}>
                  <div className={`p-2.5 rounded-xl text-xs max-w-[85%] ${
                    msg.sender === "Rep" ? "bg-blue-600 text-slate-100" : "bg-slate-800 text-slate-200"
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleBorrowerSend} className="p-3 bg-slate-950 border-t border-slate-850 flex gap-2">
              <input
                type="text"
                value={borrowerInput}
                onChange={(e) => setBorrowerInput(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                placeholder={`Message ${currentChat.name}...`}
              />
              <button type="submit" className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-white">
                <Send size={14} />
              </button>
            </form>
          </div>

          {/* Lender Chat Thread */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-[450px] overflow-hidden shadow-lg">
            <div className="p-4 bg-slate-950 border-b border-slate-850 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building size={16} className="text-indigo-400" />
                <span className="font-bold text-xs text-slate-200">{currentChat.lender}</span>
              </div>
              <span className="text-[9px] font-semibold text-slate-400">Anonymous Lender</span>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatDatabase[currentChat.id]?.lender.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === "Rep" ? "items-end" : "items-start"}`}>
                  <div className={`p-2.5 rounded-xl text-xs max-w-[85%] ${
                    msg.sender === "Rep" ? "bg-indigo-600 text-slate-100" : "bg-slate-800 text-slate-200"
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleLenderSend} className="p-3 bg-slate-950 border-t border-slate-850 flex gap-2">
              <input
                type="text"
                value={lenderInput}
                onChange={(e) => setLenderInput(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                placeholder="Message Lender..."
              />
              <button type="submit" className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors text-white">
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
