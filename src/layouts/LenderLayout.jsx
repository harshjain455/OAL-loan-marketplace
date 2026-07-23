import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  Menu, X, Home, Users, Bell, Award, Eye, FileText, Heart, MessageSquare, 
  Briefcase, BarChart2, CreditCard, Settings, User, LogOut, ChevronLeft, ChevronRight, Compass 
} from "lucide-react";
import { ChatNotificationProvider, useChatNotification } from "../context/ChatNotificationContext";

function LenderLayoutInner() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    { name: "Billing", path: "/lender/billing", icon: CreditCard },
    { name: "Subscription", path: "/lender/subscription", icon: FileText },
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
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-900 border-r border-slate-800/50 transform transition-all duration-300 md:translate-x-0 md:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/50 bg-slate-900/50">
          {!isCollapsed ? (
            <span className="text-xs font-bold tracking-wider text-slate-50 uppercase truncate">LENDER PORTAL</span>
          ) : (
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase mx-auto">LND</span>
          )}
          
          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          <button className="md:hidden text-slate-400 hover:text-slate-100" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
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
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center ${
                  isCollapsed ? "justify-center px-2" : "px-3.5"
                } py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-slate-800 text-slate-100"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                }`}
              >
                <div className={`relative ${!isCollapsed ? "mr-3" : ""}`}>
                  <Icon size={17} className={`transition-colors ${isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200"}`} />
                  {isChat && unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-rose-500 rounded-full text-[8px] font-black text-white flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </div>
                {!isCollapsed && (
                  <>
                    <span className="truncate">{item.name}</span>
                    {isChat && unreadCount > 0 && (
                      <span className="ml-auto bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                        {unreadCount} New
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-800 mt-auto">
          <Link
            to="/auth/login"
            title={isCollapsed ? "Logout" : undefined}
            className={`flex items-center ${
              isCollapsed ? "justify-center px-2" : "px-4"
            } py-2.5 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-colors group`}
          >
            <LogOut size={18} className={`text-red-400 group-hover:text-red-300 ${!isCollapsed ? "mr-3" : ""}`} />
            {!isCollapsed && <span>Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-slate-900 border-b border-slate-800">
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

            <Link
              to="/lender/profile"
              className="flex items-center space-x-3 hover:opacity-85 transition-opacity"
              title="View Profile"
            >
              <span className="text-xs font-semibold text-slate-300">Lender Partner</span>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-200">
                <User size={16} />
              </div>
            </Link>
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
