import React, { useState } from "react";
import { 
  MessageSquare, ShieldCheck, Lock, Send, Paperclip, Mail, PhoneCall, 
  User, CheckCircle2, AlertCircle, ShieldAlert, Sparkles, UserCheck, Smartphone 
} from "lucide-react";

export default function NetworkCommunication() {
  const [activeChannelId, setActiveChannelId] = useState("3way_main");
  const [commType, setCommType] = useState("chat"); // 'chat', 'email', 'sms'
  const [newMessageText, setNewMessageText] = useState("");
  const [activeRolePerspective, setActiveRolePerspective] = useState("rep"); // 'rep' or 'lender'

  const channelsList = [
    {
      id: "3way_main",
      name: "LetsWork™ 3-Way Mediator Room (APP-9081)",
      subtitle: "TechVentures India + Lender Desk #104 + OAL Rep",
      type: "MEDIATOR_3WAY",
      unread: false
    },
    {
      id: "rep_lender_104",
      name: "Lender Desk #104 ↔ OAL Rep Agent",
      subtitle: "Direct Channel for Rate Terms Negotiation",
      type: "REP_LENDER",
      unread: true
    },
    {
      id: "rep_borrower_9081",
      name: "OAL Rep ↔ TechVentures Borrower",
      subtitle: "Direct Channel for KYC Document Assistance",
      type: "REP_BORROWER",
      unread: false
    }
  ];

  const [chatMessages, setChatMessages] = useState({
    "3way_main": [
      { id: 1, sender: "Vikramaditya Roy", role: "OAL Rep Agent", roleColor: "bg-purple-500/20 text-purple-400 border-purple-500/30", text: "Welcome both to the LetsWork™ 3-way escrow room for Application APP-9081 (₹45,00,000). I am here as your mediator.", time: "10:00 AM" },
      { id: 2, sender: "TechVentures India (Borrower)", role: "Borrower Applicant", roleColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", text: "Hello! We uploaded our Q1 GST tax returns and 12-month bank statements.", time: "10:04 AM" },
      { id: 3, sender: "Lender Desk #104", role: "Institutional Lender", roleColor: "bg-blue-500/20 text-blue-400 border-blue-500/30", text: "We reviewed the iNV IQ score of 880 (A+). Our desk is ready to offer ₹45,00,000 @ 8.5% APR for 36 months.", time: "10:14 AM" }
    ],
    "rep_lender_104": [
      { id: 1, sender: "Lender Desk #104", role: "Institutional Lender", roleColor: "bg-blue-500/20 text-blue-400 border-blue-500/30", text: "Hi Agent, can we request the audited balance sheet for 2025?", time: "09:45 AM" },
      { id: 2, sender: "Vikramaditya Roy", role: "OAL Rep Agent", roleColor: "bg-purple-500/20 text-purple-400 border-purple-500/30", text: "Sure, I have unmasked and verified the balance sheet. Uploading now.", time: "09:50 AM" }
    ],
    "rep_borrower_9081": [
      { id: 1, sender: "Vikramaditya Roy", role: "OAL Rep Agent", roleColor: "bg-purple-500/20 text-purple-400 border-purple-500/30", text: "Hello Rahul, Lender Desk #104 has placed an 8.5% APR offer. Please review in your waiting room.", time: "10:20 AM" }
    ]
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: activeRolePerspective === "rep" ? "Vikramaditya Roy (OAL Rep)" : "Lender Desk #104",
      role: activeRolePerspective === "rep" ? "OAL Rep Agent" : "Institutional Lender",
      roleColor: activeRolePerspective === "rep" ? "bg-purple-500/20 text-purple-400 border-purple-500/30" : "bg-blue-500/20 text-blue-400 border-blue-500/30",
      text: newMessageText,
      time: "Just now"
    };

    setChatMessages(prev => ({
      ...prev,
      [activeChannelId]: [...(prev[activeChannelId] || []), newMsg]
    }));
    setNewMessageText("");
  };

  const currentChannel = channelsList.find(c => c.id === activeChannelId);

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck size={12} />
              Strict Communication Protocol Safeguard Active
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">LetsWork™ Centralized Communication</h1>
          <p className="text-xs text-slate-400 mt-1">Mediated 3-way communication module between Lenders, OAL Agents, and Borrowers.</p>
        </div>

        {/* Sender Role Switcher */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          <span className="text-[10px] text-slate-500 font-mono pl-2">Post As:</span>
          <button
            onClick={() => setActiveRolePerspective("rep")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeRolePerspective === "rep" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            OAL Rep Mediator
          </button>
          <button
            onClick={() => setActiveRolePerspective("lender")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeRolePerspective === "lender" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Institutional Lender
          </button>
        </div>
      </div>

      {/* Protocol Rules Banner */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <ShieldAlert size={20} className="text-red-400 shrink-0" />
          <div className="space-y-0.5">
            <p className="font-bold text-slate-200">Strict Marketplace Flow Protocol:</p>
            <p className="text-slate-400 text-[11px]">
              <span className="text-emerald-400 font-semibold">Lender ↔ Rep</span> (Direct Allowed) • 
              <span className="text-purple-400 font-semibold"> Rep ↔ Borrower</span> (Direct Allowed) • 
              <span className="text-red-400 font-bold"> Lender ↔ Borrower Direct Contact PROHIBITED</span> (Must use 3-Way Mediator Thread).
            </p>
          </div>
        </div>
      </div>

      {/* Communication Chat Console Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px] border border-slate-800 bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
        {/* Left 4 Cols: Channels List Sidebar */}
        <div className="lg:col-span-4 border-r border-slate-800 flex flex-col bg-slate-950/60">
          <div className="p-4 border-b border-slate-800">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Active Communication Channels</h3>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-850">
            {channelsList.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannelId(ch.id)}
                className={`w-full p-4 text-left transition-colors flex flex-col gap-1 ${
                  activeChannelId === ch.id 
                    ? "bg-slate-850/80 border-l-4 border-blue-500" 
                    : "hover:bg-slate-900/60"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white truncate max-w-[190px]">{ch.name}</span>
                  {ch.type === "MEDIATOR_3WAY" && (
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded">
                      3-Way Thread
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate">{ch.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right 8 Cols: Live Thread Window */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-slate-900">
          {/* Thread Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/40 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare size={16} className="text-purple-400" />
                {currentChannel?.name}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{currentChannel?.subtitle}</p>
            </div>

            {/* Comm Type Selector (Chat / Email / SMS) */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
              <button
                onClick={() => setCommType("chat")}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                  commType === "chat" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <MessageSquare size={12} /> Chat
              </button>
              <button
                onClick={() => setCommType("email")}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                  commType === "email" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Mail size={12} /> Email
              </button>
              <button
                onClick={() => setCommType("sms")}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                  commType === "sms" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Smartphone size={12} /> SMS Gateway
              </button>
            </div>
          </div>

          {/* Messages Log Thread */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar">
            {(chatMessages[activeChannelId] || []).map((msg) => (
              <div key={msg.id} className="p-4 bg-slate-950 border border-slate-850 rounded-2xl space-y-1.5 max-w-2xl">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{msg.sender}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${msg.roleColor}`}>
                      {msg.role}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{msg.time}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Message Input Footer */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-950 flex items-center gap-3">
            <button
              type="button"
              className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-colors"
              title="Attach File / Proof"
            >
              <Paperclip size={18} />
            </button>

            <input
              type="text"
              placeholder={`Send ${commType.toUpperCase()} message via LetsWork™ mediator stream...`}
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-lg shadow-blue-900/30"
            >
              <span>Dispatch</span>
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
