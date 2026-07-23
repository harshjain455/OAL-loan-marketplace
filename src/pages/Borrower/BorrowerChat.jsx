import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, ShieldAlert, Paperclip, CheckCheck, UserCheck, CheckCircle2, Sparkles, Lock, ShieldCheck } from "lucide-react";

export default function BorrowerChat() {
  const messagesEndRef = useRef(null);
  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 5000);
  };
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Rep",
      name: "Sarah Jenkins (OAL Rep)",
      text: "Hello! I am your assigned OAL Representative. I will be coordinating your loan application and document verification process.",
      time: "10:30 AM"
    },
    {
      id: 2,
      sender: "Rep",
      name: "Sarah Jenkins (OAL Rep)",
      text: "I noticed your Bank Statement document is currently under review. Do you have any questions about the matching lender offers in your Waiting Room?",
      time: "10:31 AM"
    }
  ]);
  const [input, setInput] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "User",
      name: "You (Borrower)",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulated OAL Rep Auto Response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "Rep",
          name: "Sarah Jenkins (OAL Rep)",
          text: "Thank you for updating me! I am reviewing this with compliance and will share any lender updates directly with you here.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }, 1500);
  };

  const handleQuickPrompt = (promptText) => {
    setInput(promptText);
  };

  return (
    <div className="space-y-5 font-sans text-slate-100 w-full max-w-7xl mx-auto pb-10 overflow-hidden">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">OAL Encrypted Chat Console</h1>
            <span className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10.5px] font-bold rounded-full flex items-center gap-1">
              <Sparkles size={11} /> Wireframe Specs Compliant
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Direct encrypted messaging interface with your assigned OAL Representative.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-[11px] text-emerald-400 font-semibold shrink-0 self-start sm:self-auto">
          <ShieldCheck size={15} /> AES 256-Bit Encrypted
        </div>
      </div>

      {/* 2. Security Communication Policy Banner */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3 text-xs text-amber-300 shadow-md">
        <ShieldAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5 leading-relaxed">
          <strong className="text-amber-200">Strict Marketplace Communication Policy:</strong>
          {" "}Borrowers communicate <strong>exclusively with assigned OAL Representatives</strong>. Direct communication with Lenders is restricted to ensure borrower privacy, compliance, and disintermediation protection.
        </div>
      </div>

      {/* 3. Main Responsive Chat Console */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[520px] sm:h-[560px] shadow-2xl">
        
        {/* Chat Console Header */}
        <div className="p-3.5 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-extrabold text-white text-xs shadow-md">
                SJ
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                Sarah Jenkins
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold rounded-full">
                  Online
                </span>
              </h3>
              <p className="text-[10.5px] text-slate-400 truncate max-w-[170px] xs:max-w-[240px] sm:max-w-none">Senior OAL Representative • Assigned Loan Officer</p>
            </div>
          </div>

          <span className="hidden sm:flex items-center gap-1.5 text-[11px] px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 font-semibold shrink-0">
            <UserCheck size={14} className="text-emerald-400" />
            Verified Staff
          </span>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-3.5 sm:p-6 overflow-y-auto space-y-4 bg-slate-900/60">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "User" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] sm:max-w-lg space-y-1 ${msg.sender === "User" ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 px-1">
                  <span className="font-semibold text-slate-400 truncate max-w-[130px] sm:max-w-none">{msg.name}</span>
                  <span>• {msg.time}</span>
                </div>
                <div
                  className={`p-3.5 sm:p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "User"
                      ? "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/20"
                      : "bg-slate-950 border border-slate-850 text-slate-200 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3.5 sm:px-4 py-2 bg-slate-950/90 border-t border-slate-850 flex items-center gap-2 overflow-x-auto text-[10.5px]">
          <span className="text-slate-500 font-medium shrink-0">Quick Inquiry:</span>
          <button
            type="button"
            onClick={() => handleQuickPrompt("When will my KYC verification be completed?")}
            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg shrink-0 transition-colors cursor-pointer"
          >
            KYC Status?
          </button>
          <button
            type="button"
            onClick={() => handleQuickPrompt("Can you review the terms of Lender Alpha's offer?")}
            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg shrink-0 transition-colors cursor-pointer"
          >
            Review Offer Terms
          </button>
          <button
            type="button"
            onClick={() => handleQuickPrompt("What additional financial documents are required?")}
            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg shrink-0 transition-colors cursor-pointer"
          >
            Required Documents?
          </button>
        </div>

        {/* Responsive Chat Input Form */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => showToast("File attachment option selected.")}
            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors border border-slate-800 shrink-0"
            title="Attach Document"
          >
            <Paperclip size={18} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 min-w-0 bg-slate-900 border border-slate-800 rounded-xl px-3.5 sm:px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            placeholder="Type your message to Sarah Jenkins..."
          />
          <button
            type="submit"
            className="px-3.5 sm:px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/20 shrink-0 cursor-pointer"
          >
            <Send size={15} /> <span className="hidden xs:inline">Send</span>
          </button>
        </form>
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
