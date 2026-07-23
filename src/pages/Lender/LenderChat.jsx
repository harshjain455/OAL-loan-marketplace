import React, { useState, useEffect, useRef } from "react";
import { Send, Lock, ShieldCheck, MessageSquare, Mail, Smartphone, CheckCircle2, Sparkles, Check } from "lucide-react";
import { useChatNotification } from "../../context/ChatNotificationContext";

export default function LenderChat() {
  const [activeChannel, setActiveChannel] = useState("chat");
  const [inputMessage, setInputMessage] = useState("");
  const { setUnreadCount } = useChatNotification();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "Agent",
      authorName: "Sarah Connor (OAL Senior Rep)",
      avatarText: "SC",
      time: "10:14 AM",
      text: "Hello! I am your assigned OAL Loan Structuring Representative. I can assist you with lead queries, custom terms, or escrow clearance.",
      readStatus: "read" // "sent" | "delivered" | "read"
    },
    {
      id: 2,
      sender: "Agent",
      authorName: "Sarah Connor (OAL Senior Rep)",
      avatarText: "SC",
      time: "10:15 AM",
      text: "Lead OAL-9842 has completed 100% of KYC verification. Would you like me to highlight your bid offer to the borrower?",
      readStatus: "read"
    }
  ]);

  const emailLogs = [
    {
      id: "EML-8912",
      subject: "Bid Offer Received & Forwarded for Lead OAL-9842",
      date: "Today, 10:30 AM",
      status: "Delivered",
      provider: "SendGrid Gateway",
      recipient: "lender-ops@firstcapital.com"
    },
    {
      id: "EML-8501",
      subject: "Weekly Portfolio Yield Report & AI Match Summary",
      date: "Yesterday, 06:00 PM",
      status: "Delivered",
      provider: "SendGrid Gateway",
      recipient: "lender-ops@firstcapital.com"
    },
    {
      id: "EML-7920",
      subject: "Security Alert: MFA Login Verified from New Device",
      date: "Jul 21, 2026",
      status: "Delivered",
      provider: "SendGrid Gateway",
      recipient: "lender-ops@firstcapital.com"
    }
  ];

  const smsLogs = [
    {
      id: "SMS-4401",
      content: "OAL Alert: New High iNV IQ Lead OAL-9842 matched your $75k threshold.",
      date: "Today, 10:12 AM",
      status: "Delivered",
      provider: "Twilio API",
      phone: "+1 (555) ***-8921"
    },
    {
      id: "SMS-3982",
      content: "Security MFA OTP: Your verification code is 849201. Expires in 5 mins.",
      date: "Jul 21, 2026",
      status: "Delivered",
      provider: "Twilio API",
      phone: "+1 (555) ***-8921"
    }
  ];

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Track if user is at bottom of scroll
  const handleScroll = () => {
    const el = chatContainerRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    setIsAtBottom(atBottom);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "User",
      authorName: "You (Lender)",
      avatarText: "ME",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: inputMessage,
      readStatus: "sent"
    };

    setChatMessages((prev) => [...prev, userMsg]);
    const currentText = inputMessage;
    setInputMessage("");

    // Simulate delivery tick after 600ms
    setTimeout(() => {
      setChatMessages((prev) =>
        prev.map((m) => (m.id === userMsg.id ? { ...m, readStatus: "delivered" } : m))
      );
    }, 600);

    // Simulate agent typing + reply after 1.5s → mark user msg as "read" + add agent reply + trigger notification
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev.map((m) => (m.id === userMsg.id ? { ...m, readStatus: "read" } : m)),
        {
          id: Date.now() + 1,
          sender: "Agent",
          authorName: "Sarah Connor (OAL Senior Rep)",
          avatarText: "SC",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          text: `Understood regarding "${currentText}". I am reviewing the lead file now and will update your offer queue shortly.`,
          readStatus: "read"
        }
      ]);
      // Trigger header notification badge
      setUnreadCount((prev) => prev + 1);
    }, 1500);
  };

  const handleQuickPrompt = (promptText) => {
    setInputMessage(promptText);
  };

  // Read Receipt Icon Component
  const ReadReceiptIcon = ({ status }) => {
    if (status === "sent") {
      return <Check size={12} className="text-slate-500" />;
    }
    if (status === "delivered") {
      return (
        <span className="flex items-center">
          <Check size={12} className="text-slate-400 -mr-1.5" />
          <Check size={12} className="text-slate-400" />
        </span>
      );
    }
    if (status === "read") {
      return (
        <span className="flex items-center">
          <Check size={12} className="text-indigo-400 -mr-1.5" />
          <Check size={12} className="text-indigo-400" />
        </span>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
              <MessageSquare size={22} />
            </div>
            Communication Console
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Secure multi-channel communications line with assigned OAL Representatives.
          </p>
        </div>

        {/* Assigned Rep Status Badge */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-2.5 rounded-2xl shadow">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 font-black text-white text-xs flex items-center justify-center shadow">
            SC
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              Sarah Connor
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Assigned OAL Senior Rep</div>
          </div>
        </div>
      </div>

      {/* Security Rule Notice Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20 p-4 rounded-2xl flex items-start gap-3 text-xs">
        <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20 shrink-0 mt-0.5">
          <Lock size={16} />
        </div>
        <div>
          <span className="font-extrabold text-amber-400 block mb-0.5 uppercase tracking-wider text-[11px]">Strict Security Policy: Restricted Communication Line</span>
          <p className="text-slate-350 leading-relaxed font-medium">
            Lender communications are strictly restricted to assigned OAL Representatives. Direct borrower contact is blocked to protect applicant anonymity, prevent off-market circumvention, and ensure escrow compliance.
          </p>
        </div>
      </div>

      {/* Channel Switcher Tabs */}
      <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800/80 p-1.5 rounded-2xl w-fit text-xs font-semibold">
        <button
          onClick={() => setActiveChannel("chat")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeChannel === "chat" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <MessageSquare size={14} />
          OAL Rep Chat
        </button>
        <button
          onClick={() => setActiveChannel("email")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeChannel === "email" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Mail size={14} />
          Email Logs
        </button>
        <button
          onClick={() => setActiveChannel("sms")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeChannel === "sms" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Smartphone size={14} />
          SMS Logs
        </button>
      </div>

      {/* CHANNEL 1: SECURE CHAT */}
      {activeChannel === "chat" && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl shadow-xl flex flex-col h-[540px] overflow-hidden">
          {/* Chat Header Bar */}
          <div className="px-6 py-3.5 bg-slate-950/80 border-b border-slate-800/60 flex justify-between items-center text-xs shrink-0">
            <div className="flex items-center gap-2 text-slate-300 font-bold">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>LetsWork Encrypted Channel #LDR-8942</span>
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
              Rep Online & Verified
            </span>
          </div>

          {/* Chat Messages Feed — flex-col with justify-end to pin messages to bottom */}
          <div
            ref={chatContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto no-scrollbar p-5"
            style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
          >
            <div className="flex flex-col gap-4">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === "User" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 mt-1 ${
                    msg.sender === "User" ? "bg-indigo-600 text-white" : "bg-slate-800 border border-slate-700 text-indigo-400"
                  }`}>
                    {msg.avatarText}
                  </div>

                  <div className={`max-w-md space-y-1 ${msg.sender === "User" ? "items-end" : "items-start"} flex flex-col`}>
                    <div className={`flex items-center gap-2 text-[10px] text-slate-450 font-semibold ${msg.sender === "User" ? "flex-row-reverse" : ""}`}>
                      <span>{msg.authorName}</span>
                      <span className="text-slate-600">•</span>
                      <span>{msg.time}</span>
                    </div>
                    <div className={`p-3.5 rounded-2xl text-xs leading-relaxed font-medium shadow-md relative ${
                      msg.sender === "User"
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-tr-none"
                        : "bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none"
                    }`}>
                      {msg.text}
                    </div>
                    {/* WhatsApp-style read receipt ticks — only for User messages */}
                    {msg.sender === "User" && (
                      <div className="flex items-center justify-end gap-1 pr-0.5">
                        <ReadReceiptIcon status={msg.readStatus} />
                        <span className="text-[9px] text-slate-500 font-medium">
                          {msg.readStatus === "read" ? "Seen" : msg.readStatus === "delivered" ? "Delivered" : "Sent"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-5 py-2.5 bg-slate-950/60 border-t border-slate-800/40 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs shrink-0">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles size={11} className="text-indigo-400" /> Quick Ask:
            </span>
            {[
              "Inquire about Lead OAL-9842 KYC Status",
              "Request Custom Rate Revision",
              "Escrow Funding Release Clearance"
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleQuickPrompt(prompt)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors whitespace-nowrap text-[11px] font-medium cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 bg-slate-950 border-t border-slate-800/80 flex items-center gap-3 shrink-0">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type message to Sarah Connor (OAL Senior Rep)..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors shadow flex items-center gap-1.5 cursor-pointer"
            >
              <Send size={15} />
              Send
            </button>
          </form>
        </div>
      )}

      {/* CHANNEL 2: EMAIL LOGS */}
      {activeChannel === "email" && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-800/60 flex justify-between items-center">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail size={16} className="text-indigo-400" />
              Email Dispatch Audit Logs (SendGrid API)
            </h2>
            <span className="text-xs text-slate-400 font-semibold">{emailLogs.length} Total Emails</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800/60">
                <tr>
                  <th className="px-6 py-4 font-semibold">Log ID</th>
                  <th className="px-6 py-4 font-semibold">Email Subject</th>
                  <th className="px-6 py-4 font-semibold">Recipient</th>
                  <th className="px-6 py-4 font-semibold">Date & Time</th>
                  <th className="px-6 py-4 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {emailLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-indigo-400">{log.id}</td>
                    <td className="px-6 py-4 font-semibold text-white">{log.subject}</td>
                    <td className="px-6 py-4 text-slate-400">{log.recipient}</td>
                    <td className="px-6 py-4 text-slate-400">{log.date}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center justify-center gap-1 w-fit mx-auto">
                        <CheckCircle2 size={12} />
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CHANNEL 3: SMS LOGS */}
      {activeChannel === "sms" && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-800/60 flex justify-between items-center">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Smartphone size={16} className="text-indigo-400" />
              SMS Alert Logs (Twilio Gateway)
            </h2>
            <span className="text-xs text-slate-400 font-semibold">{smsLogs.length} Total SMS</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800/60">
                <tr>
                  <th className="px-6 py-4 font-semibold">SMS ID</th>
                  <th className="px-6 py-4 font-semibold">Message Content</th>
                  <th className="px-6 py-4 font-semibold">Phone (Masked)</th>
                  <th className="px-6 py-4 font-semibold">Sent Time</th>
                  <th className="px-6 py-4 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {smsLogs.map((sms) => (
                  <tr key={sms.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-indigo-400">{sms.id}</td>
                    <td className="px-6 py-4 font-semibold text-white max-w-xs">{sms.content}</td>
                    <td className="px-6 py-4 text-slate-400 font-mono">{sms.phone}</td>
                    <td className="px-6 py-4 text-slate-400">{sms.date}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center justify-center gap-1 w-fit mx-auto">
                        <CheckCircle2 size={12} />
                        {sms.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
