import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  Menu, X, Home, Users, Bell, Award, Eye, FileText, Heart, MessageSquare, 
  Briefcase, BarChart2, CreditCard, Settings, User, LogOut, ChevronLeft, ChevronRight, PanelLeft, PanelLeftClose 
} from "lucide-react";

export default function LenderLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

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
    { name: "Analytics", path: "/lender/analytics", icon: BarChart2 },
    { name: "Reports", path: "/lender/reports", icon: FileText },
    { name: "Billing", path: "/lender/billing", icon: CreditCard },
    { name: "Subscription", path: "/lender/subscription", icon: FileText },
    { name: "Profile", path: "/lender/profile", icon: User },
    { name: "Settings", path: "/lender/settings", icon: Settings },
  ];

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
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-900/95 backdrop-blur-md border-r border-slate-800/50 transition-all duration-300 md:translate-x-0 md:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-20" : "w-60"}`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/50 bg-slate-900/50">
          {!isCollapsed ? (
            <span className="text-xs font-extrabold tracking-wider text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent truncate">
              Lender Portal Dashboard
            </span>
          ) : (
            <span className="text-xs font-bold tracking-wider text-indigo-400 uppercase mx-auto">
              OAL
            </span>
          )}

          {/* Desktop Collapse Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
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
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center ${
                  isCollapsed ? "justify-center px-2" : "px-3.5"
                } py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600/30 to-indigo-500/10 border border-indigo-500/30 text-white shadow-md shadow-indigo-950/20"
                    : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border border-transparent"
                }`}
              >
                <Icon
                  size={17}
                  className={`flex-shrink-0 transition-colors ${
                    isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200"
                  } ${!isCollapsed ? "mr-3" : ""}`}
                />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-800/50 mt-auto">
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
        <header className="flex items-center justify-between h-16 px-6 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-slate-400 hover:text-slate-100" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>

            {/* Desktop Top Header Collapse Toggle Shortcut */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 rounded-xl transition-colors"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
            </button>
          </div>

          <div className="flex items-center ml-auto space-x-4">
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
