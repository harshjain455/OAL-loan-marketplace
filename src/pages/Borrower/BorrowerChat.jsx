import React, { useState } from "react";
import { MessageSquare, Send, ShieldAlert, Paperclip, CheckCheck, UserCheck } from "lucide-react";

export default function BorrowerChat() {
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
      text: "I noticed your Bank Statement document is currently under review. Do you have any additional questions about the matching lender offers in your Waiting Room?",
      time: "10:31 AM"
    }
  ]);
  const [input, setInput] = useState("");

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

    setMessages([...messages, newMsg]);
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

  return (
    <div className="space-y-6 font-sans text-slate-100 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Messages & Support</h1>
        <p className="text-sm text-slate-400">Direct encrypted chat console with your assigned OAL Representative.</p>
      </div>

      {/* Security Rule Banner */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3 text-xs text-amber-300">
        <ShieldAlert size={20} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block text-amber-200">Strict Communication Policy:</strong>
          Borrowers communicate <strong>exclusively with assigned OAL Representatives</strong>. Direct communication with Lenders is restricted to ensure privacy and compliance.
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[520px]">
        {/* Chat Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
              SJ
            </div>
            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                Sarah Jenkins
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </h3>
              <p className="text-[10px] text-slate-400">Senior OAL Representative • Assigned Coordinator</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-400 flex items-center gap-1">
            <UserCheck size={12} className="text-emerald-400" />
            Verified Staff
          </span>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-900/60">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "User" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-md space-y-1 ${msg.sender === "User" ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 px-1">
                  <span>{msg.name}</span>
                  <span>• {msg.time}</span>
                </div>
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
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
        </div>

        {/* Chat Input Form */}
        <form onSubmit={handleSend} className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-3">
          <button
            type="button"
            onClick={() => alert("File attachment option selected.")}
            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-800"
            title="Attach File"
          >
            <Paperclip size={18} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            placeholder="Type your message to Sarah Jenkins..."
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
          >
            <Send size={16} /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
