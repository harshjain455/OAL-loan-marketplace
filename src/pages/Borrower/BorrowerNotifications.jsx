import React, { useState } from "react";
import { Bell, ShieldCheck, FileText, Award, MessageSquare, Check, Filter, Sparkles, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BorrowerNotifications() {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Lender Bid Received",
      category: "offers",
      time: "10 minutes ago",
      desc: "Lender Alpha submitted a loan offer of $75,000 at 6.5% interest rate in your Waiting Room.",
      read: false,
      icon: Award,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      actionLink: "/borrower/offers",
      actionText: "View Offer"
    },
    {
      id: 2,
      title: "KYC Documents Under Compliance Review",
      category: "kyc",
      time: "2 hours ago",
      desc: "Your uploaded Identity Proof and Bank Statements are queued for Admin verification.",
      read: false,
      icon: FileText,
      iconColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      actionLink: "/borrower/documents",
      actionText: "View Documents"
    },
    {
      id: 3,
      title: "Message from Assigned OAL Rep",
      category: "messages",
      time: "5 hours ago",
      desc: "Sarah Jenkins sent a new update regarding your application timeline.",
      read: true,
      icon: MessageSquare,
      iconColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      actionLink: "/borrower/messages",
      actionText: "Open Chat"
    },
    {
      id: 4,
      title: "Multi-Factor Authentication (MFA) Enabled",
      category: "security",
      time: "1 day ago",
      desc: "Multi-Factor Authentication (MFA) was successfully activated for all future account logins.",
      read: true,
      icon: ShieldCheck,
      iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      actionLink: "/borrower/settings",
      actionText: "Security Settings"
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifications = filter === "all" ? notifications : notifications.filter((n) => n.category === filter);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 font-sans text-slate-100 w-full max-w-7xl mx-auto pb-10 overflow-hidden">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-bold tracking-tight text-white">Notifications Center</h1>
            <span className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold rounded-full flex items-center gap-1">
              <Sparkles size={11} /> Wireframe Specs Compliant
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time feed for system alerts, lender offers, KYC verification updates, and security alerts.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
          {unreadCount > 0 && (
            <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold rounded-xl">
              {unreadCount} Unread
            </span>
          )}
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Check size={14} className="text-emerald-400" /> Mark All as Read
          </button>
        </div>
      </div>

      {/* 2. Responsive Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs border-b border-slate-800">
        <button
          onClick={() => setFilter("all")}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
            filter === "all" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          All Feed ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("offers")}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
            filter === "offers" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          Offers & Bids
        </button>
        <button
          onClick={() => setFilter("kyc")}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
            filter === "kyc" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          KYC & Documents
        </button>
        <button
          onClick={() => setFilter("messages")}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
            filter === "messages" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          OAL Rep Messages
        </button>
        <button
          onClick={() => setFilter("security")}
          className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
            filter === "security" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          }`}
        >
          Account Security
        </button>
      </div>

      {/* 3. Notification Stream List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-850 shadow-xl overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">No notifications found in this category.</div>
        ) : (
          filteredNotifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 transition-colors ${
                  item.read ? "bg-slate-900/60" : "bg-slate-900 font-medium"
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <div className={`p-2.5 rounded-xl border shrink-0 ${item.iconColor}`}>
                    <Icon size={18} />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="text-xs font-bold text-white flex items-center gap-2">
                        {item.title}
                        {!item.read && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>}
                      </h3>
                      <span className="text-[10.5px] text-slate-500">{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                {/* Direct Action Link */}
                {item.actionLink && (
                  <Link
                    to={item.actionLink}
                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-indigo-400 font-bold text-xs rounded-xl transition-colors flex items-center gap-1 shrink-0 self-end sm:self-auto"
                  >
                    {item.actionText} <ChevronRight size={13} />
                  </Link>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
