import React, { useState } from "react";
import { Bell, ShieldCheck, FileText, Award, MessageSquare, Check, Filter } from "lucide-react";

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
      iconColor: "text-emerald-400 bg-emerald-500/10"
    },
    {
      id: 2,
      title: "KYC Documents Under Compliance Review",
      category: "kyc",
      time: "2 hours ago",
      desc: "Your uploaded Identity Proof and Bank Statements are queued for compliance verification.",
      read: false,
      icon: FileText,
      iconColor: "text-indigo-400 bg-indigo-500/10"
    },
    {
      id: 3,
      title: "Message from OAL Rep",
      category: "messages",
      time: "5 hours ago",
      desc: "Sarah Jenkins sent a new message regarding your application timeline.",
      read: true,
      icon: MessageSquare,
      iconColor: "text-purple-400 bg-purple-500/10"
    },
    {
      id: 4,
      title: "MFA Login Protection Enabled",
      category: "security",
      time: "1 day ago",
      desc: "Multi-Factor Authentication (MFA) was successfully activated for all future logins.",
      read: true,
      icon: ShieldCheck,
      iconColor: "text-blue-400 bg-blue-500/10"
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifications = filter === "all" ? notifications : notifications.filter((n) => n.category === filter);

  return (
    <div className="space-y-6 font-sans text-slate-100 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Notifications Center</h1>
          <p className="text-sm text-slate-400">Track system alerts, offer updates, KYC changes, and messaging alerts.</p>
        </div>
        <button
          onClick={markAllAsRead}
          className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold rounded-lg text-slate-300 transition-colors flex items-center gap-2 self-start md:self-auto"
        >
          <Check size={14} /> Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
            filter === "all" ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("offers")}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
            filter === "offers" ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          Offers & Bids
        </button>
        <button
          onClick={() => setFilter("kyc")}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
            filter === "kyc" ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          KYC & Documents
        </button>
        <button
          onClick={() => setFilter("messages")}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
            filter === "messages" ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          Messages
        </button>
        <button
          onClick={() => setFilter("security")}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 ${
            filter === "security" ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          Security
        </button>
      </div>

      {/* Notification Stream */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl divide-y divide-slate-850">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">No notifications found in this category.</div>
        ) : (
          filteredNotifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`p-5 flex items-start gap-4 transition-colors ${
                  item.read ? "bg-slate-900/50" : "bg-slate-900 font-medium"
                }`}
              >
                <div className={`p-2.5 rounded-xl border border-slate-800 shrink-0 ${item.iconColor}`}>
                  <Icon size={18} />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-white flex items-center gap-2">
                      {item.title}
                      {!item.read && <span className="w-2 h-2 rounded-full bg-indigo-500"></span>}
                    </h3>
                    <span className="text-[10px] text-slate-500">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
