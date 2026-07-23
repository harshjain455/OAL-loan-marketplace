import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, Users, Bell, Award, Eye, FileText, Heart, MessageSquare, Briefcase, BarChart2, CreditCard, Settings, User, LogOut, Compass, PanelLeft, PanelLeftClose, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { ChatNotificationProvider, useChatNotification } from "../context/ChatNotificationContext";

function LenderLayoutInner() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
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
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 md:translate-x-0 md:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-20" : "w-60"}`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800 bg-slate-900">
          {!isCollapsed ? (
            <span className="text-sm font-bold tracking-wider text-slate-50 uppercase truncate">
              Lender Portal
            </span>
          ) : (
            <span className="text-xs font-bold tracking-wider text-indigo-400 uppercase mx-auto">
              OAL
            </span>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          {/* Mobile Close Button */}
          <button className="md:hidden text-slate-400 hover:text-slate-100" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
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
                } py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600/30 to-indigo-500/10 border border-indigo-500/30 text-white shadow-md shadow-indigo-950/20"
                    : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent"
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
                {!isCollapsed && <span className="truncate">{item.name}</span>}
                {!isCollapsed && isChat && unreadCount > 0 && (
                  <span className="ml-auto bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                    {unreadCount} New
                  </span>
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
            } py-2.5 text-xs font-semibold text-rose-400 rounded-xl hover:bg-rose-500/10 hover:text-rose-300 border border-transparent hover:border-rose-500/20 transition-all group`}
          >
            <LogOut size={17} className={`flex-shrink-0 text-rose-400 group-hover:text-rose-300 ${!isCollapsed ? "mr-3" : ""}`} />
            {!isCollapsed && <span>Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-slate-900 border-b border-slate-800 relative z-30">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-slate-400 hover:text-slate-100" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/60 border border-slate-700/50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              {isCollapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
              <span>{isCollapsed ? "Expand Menu" : "Collapse Menu"}</span>
            </button>
          </div>

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

            {/* Dynamic Top Right Lender Profile & Quick Access Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition-all cursor-pointer group"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">First Capital Partners</p>
                  <p className="text-[10px] text-emerald-400 font-mono flex items-center justify-end gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    Lender Verified
                  </p>
                </div>

                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-md shadow-indigo-950/30">
                  <User size={18} />
                </div>

                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 p-3 space-y-2 animate-in fade-in zoom-in-95 duration-150 text-left">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-xs font-bold text-white">First Capital Partners</p>
                      <p className="text-[11px] text-slate-400 font-mono truncate">lender-ops@firstcapital.com</p>
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                        Lender Pro Clearance
                      </span>
                    </div>

                    <div className="space-y-1 text-xs pt-1">
                      <Link
                        to="/lender/settings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors font-medium"
                      >
                        <Settings size={15} className="text-indigo-400" />
                        <span>System Settings</span>
                      </Link>

                      <Link
                        to="/lender/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors font-medium"
                      >
                        <User size={15} className="text-purple-400" />
                        <span>View Profile</span>
                      </Link>

                      <Link
                        to="/lender/billing"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors font-medium"
                      >
                        <CreditCard size={15} className="text-emerald-400" />
                        <span>Billing & Invoices</span>
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          navigate("/auth/login");
                        }}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold rounded-xl border border-red-500/20 transition-all cursor-pointer"
                      >
                        <LogOut size={14} />
                        Sign Out Account
                      </button>
                    </div>
                  </div>
                </>
              )}
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
