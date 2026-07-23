import React, { useState } from "react";
import { 
  LifeBuoy, MessageSquare, Check, X, Search, Filter, Clock, User, ShieldAlert, CheckCircle2, Send, Paperclip, Sparkles, Tag, Plus, UserCheck, AlertTriangle, FileText, ArrowRight 
} from "lucide-react";

export default function AdminHelpDesk() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);

  // Mock Tickets Data
  const [tickets, setTickets] = useState([
    {
      id: "TCK-1092",
      userName: "Rahul Sharma",
      userEmail: "rahul.sharma@example.com",
      userRole: "Borrower",
      avatarBg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      subject: "KYC Income Statement Upload Error",
      query: "I cannot upload my Income statement for APP-9010. It says file size exceeded 5MB.",
      category: "Document Verification",
      priority: "High",
      status: "Open",
      createdDate: "2026-01-22 10:30 AM",
      messages: [
        { sender: "Rahul Sharma (Borrower)", role: "user", text: "I cannot upload my Income statement for APP-9010. It says file size exceeded 5MB.", time: "10:30 AM" }
      ],
      aiSuggestions: [
        "Hello Rahul! Please compress the PDF to under 5MB or upload in JPG/PNG format.",
        "Hello! I have temporarily increased your document upload size limit for APP-9010 to 10MB. Please try again."
      ]
    },
    {
      id: "TCK-1093",
      userName: "Apex Capital Lending LLC",
      userEmail: "ops@apexcapital.com",
      userRole: "Lender",
      avatarBg: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      subject: "API Webhook Rate Limit Query",
      query: "Our automated bidding API endpoint is returning HTTP 429 rate limit exceeded error during peak hours.",
      category: "API Integration",
      priority: "Medium",
      status: "Pending",
      createdDate: "2026-01-21 03:15 PM",
      messages: [
        { sender: "Apex Capital (Lender)", role: "user", text: "Our automated bidding API endpoint is returning HTTP 429 rate limit exceeded error during peak hours.", time: "03:15 PM" },
        { sender: "Support Admin", role: "admin", text: "We are reviewing your API key rate limits and upgrading your Enterprise tier throughput.", time: "04:00 PM" }
      ],
      aiSuggestions: [
        "Hi Apex Capital team! We have upgraded your API rate limit threshold to 500 requests/minute.",
        "Hello! Please ensure your webhook implementation uses exponential backoff retry headers."
      ]
    },
    {
      id: "TCK-1094",
      userName: "Amit Verma",
      userEmail: "amit.v@oaloan.com",
      userRole: "OAL Agent",
      avatarBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      subject: "Commission Payout Settlement Inquiry",
      query: "My lead distribution referral commission for APP-9012 has not been reflected in my bank ledger.",
      category: "Billing & Payout",
      priority: "Low",
      status: "Resolved",
      createdDate: "2026-01-18 11:20 AM",
      messages: [
        { sender: "Amit Verma (Agent)", role: "user", text: "My lead distribution referral commission for APP-9012 has not been reflected in my bank ledger.", time: "11:20 AM" },
        { sender: "Support Admin", role: "admin", text: "Hi Amit, your payout of ₹4,999 has been processed via Razorpay PG reference INV-2026-002.", time: "02:00 PM" }
      ],
      aiSuggestions: [
        "Hi Amit! Payout has been released and confirmed by Razorpay webhook.",
        "Hello! Please check your billing ledger history under Payments tab."
      ]
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
  const [replyText, setReplyText] = useState("");

  // New Ticket Form State
  const [newTicketForm, setNewTicketForm] = useState({
    userName: "",
    userEmail: "",
    userRole: "Borrower",
    subject: "",
    query: "",
    category: "Document Verification",
    priority: "Medium"
  });

  // Handle Send Reply
  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    const newMessage = {
      sender: "Support Admin",
      role: "admin",
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicket.id) {
        return {
          ...t,
          status: "Pending",
          messages: [...t.messages, newMessage]
        };
      }
      return t;
    });

    setTickets(updatedTickets);
    setSelectedTicket({
      ...selectedTicket,
      status: "Pending",
      messages: [...selectedTicket.messages, newMessage]
    });

    setReplyText("");
  };

  // Handle Update Ticket Status
  const handleUpdateStatus = (ticketId, newStatus) => {
    const updatedTickets = tickets.map(t => {
      if (t.id === ticketId) {
        return { ...t, status: newStatus };
      }
      return t;
    });
    setTickets(updatedTickets);
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus });
    }
  };

  // Handle Create New Ticket
  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicketForm.userName || !newTicketForm.subject) return;

    const createdTicket = {
      id: `TCK-${1090 + tickets.length + 2}`,
      userName: newTicketForm.userName,
      userEmail: newTicketForm.userEmail || "user@example.com",
      userRole: newTicketForm.userRole,
      avatarBg: newTicketForm.userRole === "Borrower" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-purple-500/20 text-purple-400 border-purple-500/30",
      subject: newTicketForm.subject,
      query: newTicketForm.query,
      category: newTicketForm.category,
      priority: newTicketForm.priority,
      status: "Open",
      createdDate: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      messages: [
        { sender: `${newTicketForm.userName} (${newTicketForm.userRole})`, role: "user", text: newTicketForm.query, time: "Just now" }
      ],
      aiSuggestions: [
        "Hello! Our support team is actively reviewing your request and will update you shortly.",
        "Hi! Please provide your loan application ID for accelerated verification."
      ]
    };

    setTickets([createdTicket, ...tickets]);
    setSelectedTicket(createdTicket);
    setShowCreateTicketModal(false);
    setNewTicketForm({ userName: "", userEmail: "", userRole: "Borrower", subject: "", query: "", category: "Document Verification", priority: "Medium" });
  };

  // Filtered Tickets
  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-white tracking-tight">Help Desk & Support Ticket Console</h1>
            <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full font-mono flex items-center gap-1.5 shrink-0">
              <Sparkles size={13} className="text-purple-400" />
              AI Assistant Enabled
            </span>
          </div>
          <p className="text-sm text-slate-400">Review user-submitted queries, manage issue statuses (Open, Pending, Resolved), and reply with AI smart suggestions.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowCreateTicketModal(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
          >
            <Plus size={16} />
            Log Support Ticket
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setStatusFilter("Open")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            statusFilter === "Open" ? "border-blue-500/50 shadow-md shadow-blue-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Open Tickets</p>
            <p className="text-2xl font-bold text-blue-400 mt-1">{tickets.filter(t => t.status === "Open").length}</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <LifeBuoy size={20} />
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter("Pending")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            statusFilter === "Pending" ? "border-amber-500/50 shadow-md shadow-amber-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Pending Response</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{tickets.filter(t => t.status === "Pending").length}</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <Clock size={20} />
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter("Resolved")}
          className={`bg-slate-900/80 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
            statusFilter === "Resolved" ? "border-emerald-500/50 shadow-md shadow-emerald-950/20" : "border-slate-800 hover:border-slate-700"
          }`}
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Resolved Issues</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{tickets.filter(t => t.status === "Resolved").length}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter("All")}
          className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-all"
        >
          <div>
            <p className="text-xs font-medium text-slate-400">Total Queries Handled</p>
            <p className="text-2xl font-bold text-purple-400 mt-1">{tickets.length}</p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
            <MessageSquare size={20} />
          </div>
        </div>
      </div>

      {/* Two-Column Helpdesk Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Tickets Queue List */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-3">
          <div className="p-4 border-b border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <LifeBuoy size={16} className="text-blue-400" />
                Support Ticket Queue
              </h3>
              <span className="text-xs text-slate-500 font-mono">{filteredTickets.length} Tickets</span>
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search ticket ID, user, subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
              {["All", "Open", "Pending", "Resolved"].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`flex-1 py-1 rounded-md transition-colors text-center ${
                    statusFilter === st ? "bg-blue-600 text-white font-medium shadow" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-850 max-h-[600px] overflow-y-auto custom-scrollbar p-2 space-y-1">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                  selectedTicket?.id === ticket.id
                    ? "bg-slate-800/80 border-blue-500/50 shadow-md shadow-blue-950/20"
                    : "bg-slate-950/50 border-slate-850 hover:bg-slate-800/40"
                }`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-blue-400 font-bold">{ticket.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                    ticket.status === "Open"
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      : ticket.status === "Pending"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  }`}>
                    {ticket.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-100 truncate">{ticket.subject}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px] ${ticket.avatarBg}`}>
                      {ticket.userName.charAt(0)}
                    </span>
                    <p className="text-[11px] text-slate-400 truncate">{ticket.userName} ({ticket.userRole})</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Ticket Chat Log & AI Resolution Console */}
        {selectedTicket ? (
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              {/* Ticket Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-bold">
                      {selectedTicket.id}
                    </span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      Category: {selectedTicket.category}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-white mt-1">{selectedTicket.subject}</h2>
                  <p className="text-xs text-slate-400">User: <strong className="text-slate-200">{selectedTicket.userName}</strong> ({selectedTicket.userEmail}) • {selectedTicket.userRole}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Status:</span>
                  <select
                    value={selectedTicket.status}
                    onChange={(e) => handleUpdateStatus(selectedTicket.id, e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-medium focus:outline-none focus:border-blue-500"
                  >
                    <option value="Open">Open</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              {/* Chat Thread Messages Log */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-[320px] overflow-y-auto custom-scrollbar">
                {selectedTicket.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.role === "admin" ? "items-end" : "items-start"}`}
                  >
                    <div className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                      msg.role === "admin"
                        ? "bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-900/20"
                        : "bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none"
                    }`}>
                      <div className="flex justify-between items-center gap-4 text-[10px] opacity-75">
                        <span className="font-bold">{msg.sender}</span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Smart Quick Response Suggestions */}
              <div className="space-y-2">
                <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={12} />
                  AI-Suggested Smart Quick Replies:
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {selectedTicket.aiSuggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => setReplyText(sug)}
                      className="p-2.5 bg-slate-950 border border-slate-800 hover:border-purple-500/40 text-left text-xs rounded-xl transition-all text-slate-300 hover:text-white flex items-center justify-between"
                    >
                      <span className="truncate pr-2">{sug}</span>
                      <span className="text-[10px] text-purple-400 font-mono shrink-0 flex items-center gap-1">Use Reply <ArrowRight size={10} /></span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reply Textarea & Actions */}
            <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-800 space-y-3">
              <textarea
                rows={3}
                placeholder="Type reply response to user or select an AI suggestion above..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setShowAttachmentModal(true)}
                  className="p-2 bg-slate-950 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-colors"
                  title="Attach File / Document"
                >
                  <Paperclip size={16} />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedTicket.id, "Resolved")}
                    className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Check size={14} />
                    Mark Resolved
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center gap-1.5"
                  >
                    <Send size={14} />
                    Send Reply
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center text-slate-500">
            <LifeBuoy size={48} className="text-slate-700 mb-3" />
            <p className="text-sm font-semibold">Select a support ticket from the queue to view full chat history and reply.</p>
          </div>
        )}
      </div>

      {/* Log Support Ticket Modal */}
      {showCreateTicketModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus size={18} className="text-blue-400" />
                Log Internal Support Ticket
              </h3>
              <button onClick={() => setShowCreateTicketModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">User Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newTicketForm.userName}
                  onChange={(e) => setNewTicketForm({ ...newTicketForm, userName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">User Role</label>
                  <select
                    value={newTicketForm.userRole}
                    onChange={(e) => setNewTicketForm({ ...newTicketForm, userRole: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Borrower">Borrower</option>
                    <option value="Lender">Lender</option>
                    <option value="OAL Agent">OAL Agent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Category</label>
                  <select
                    value={newTicketForm.category}
                    onChange={(e) => setNewTicketForm({ ...newTicketForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Document Verification">Document Verification</option>
                    <option value="API Integration">API Integration</option>
                    <option value="Billing & Payout">Billing & Payout</option>
                    <option value="Account Access">Account Access</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bank Account Statement Verification Failure"
                  value={newTicketForm.subject}
                  onChange={(e) => setNewTicketForm({ ...newTicketForm, subject: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Query Details</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the issue reported by the user..."
                  value={newTicketForm.query}
                  onChange={(e) => setNewTicketForm({ ...newTicketForm, query: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateTicketModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
                >
                  Log Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Attachment Upload Simulation Modal */}
      {showAttachmentModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Paperclip size={18} className="text-blue-400" />
                Attach Support Document
              </h3>
              <button onClick={() => setShowAttachmentModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="border-2 border-dashed border-slate-800 hover:border-blue-500/50 p-6 rounded-xl text-center space-y-2 bg-slate-950 cursor-pointer">
                <FileText size={28} className="text-slate-500 mx-auto" />
                <p className="text-slate-300 font-medium">Click to select PDF or image attachment</p>
                <p className="text-[10px] text-slate-500">Supported formats: PDF, PNG, JPG (Max 10MB)</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950">
              <button
                onClick={() => setShowAttachmentModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setReplyText(prev => prev + " [Attachment: Verified_Statement_Doc.pdf]");
                  setShowAttachmentModal(false);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
              >
                Attach To Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
