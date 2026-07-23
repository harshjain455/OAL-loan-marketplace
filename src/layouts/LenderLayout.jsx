import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, Users, Bell, Award, Eye, FileText, Heart, MessageSquare, Briefcase, BarChart2, CreditCard, Settings, User, LogOut, Compass } from "lucide-react";
import { ChatNotificationProvider, useChatNotification } from "../context/ChatNotificationContext";

function LenderLayoutInner() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadCount, setUnreadCount } = useChatNotification();

  const menuItems = [
    { name: "Dashboard", path: "/lender/dashboard", icon: Home },
    { name: "Qualified Leads", path: "/lender/qualified-leads", icon: Users },
    { name: "AI Lead Alerts", path: "/lender/lead-alerts", icon: Bell },
    { name: "Borrower Rankings – [ iNV IQ ]", path: "/lender/rankings", icon: Award },
    { name: "Lead Details", path: "/lender/lead-details", icon: Eye },
    { name: "Loan Requests", path: "/lender/loan-requests", icon: FileText },
    { name: "Saved Leads", path: "/lender/saved-leads", icon: Heart },
    { name: "Communication", path: "/lender/communication", icon: MessageSquare },
    { name: "Offer Management", path: "/lender/offers", icon: Briefcase },
    { name: "OAL Network Panel", path: "/lender/network-panel", icon: Compass },
    { name: "Analytics", path: "/lender/analytics", icon: BarChart2 },
    { name: "Reports", path: "/lender/reports", icon: FileText },
    { name: "Billing & Subscription", path: "/lender/billing", icon: CreditCard },
    { name: "Profile", path: "/lender/profile", icon: User },
    { name: "Settings", path: "/lender/settings", icon: Settings },
  ];

  const handleMessageBellClick = () => {
    setUnreadCount(0);
    navigate("/lender/communication");
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-slate-900/95 backdrop-blur-md border-r border-slate-800/50 transform transition-transform duration-300 md:translate-x-0 md:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800/50 bg-slate-900/50">
          <span className="text-sm font-extrabold tracking-wider text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent truncate">
            Lender Portal Dashboard
          </span>
          <button className="md:hidden text-slate-400 hover:text-slate-100" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            const isChat = item.path === "/lender/communication";
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => {
                  setSidebarOpen(false);
                  if (isChat) setUnreadCount(0);
                }}
                className={`flex items-center px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600/30 to-indigo-500/10 border border-indigo-500/30 text-white shadow-md shadow-indigo-950/20"
                    : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent"
                }`}
              >
                <div className="relative mr-3">
                  <Icon size={17} className={`transition-colors ${isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200"}`} />
                  {isChat && unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-rose-500 rounded-full text-[8px] font-black text-white flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </div>
                <span className="truncate">{item.name}</span>
                {isChat && unreadCount > 0 && (
                  <span className="ml-auto bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                    {unreadCount} New
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/50 mt-auto">
          <Link
            to="/auth/login"
            className="flex items-center px-4 py-2.5 text-xs font-semibold text-rose-400 rounded-xl hover:bg-rose-500/10 hover:text-rose-300 border border-transparent hover:border-rose-500/20 transition-all group"
          >
            <LogOut size={17} className="mr-3 text-rose-400 group-hover:text-rose-300" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/50">
          <button className="md:hidden text-slate-400 hover:text-slate-100" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>

          <div className="flex items-center ml-auto space-x-4">
            {/* Message Notification Bell */}
            <button
              onClick={handleMessageBellClick}
              className="relative p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors cursor-pointer"
              title="Messages from OAL Rep"
            >
              <MessageSquare size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[9px] font-black text-white flex items-center justify-center animate-pulse shadow-lg shadow-rose-500/40">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            <span className="text-sm text-slate-300">Lender</span>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-200">
              <User size={16} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default function LenderLayout() {
  return (
    <ChatNotificationProvider>
      <LenderLayoutInner />
    </ChatNotificationProvider>
  );
}
