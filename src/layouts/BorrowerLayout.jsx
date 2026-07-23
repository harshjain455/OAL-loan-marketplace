import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  Menu, X, Home, FileText, UploadCloud, Cpu, Award, Bell, MessageSquare, 
  Share2, Settings, User, LogOut, ChevronLeft, ChevronRight 
} from "lucide-react";

export default function BorrowerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/borrower/dashboard", icon: Home },
    { name: "Loan Application", path: "/borrower/loan-application", icon: FileText },
    { name: "Documents", path: "/borrower/documents", icon: UploadCloud },
    { name: "AI Borrower Score", path: "/borrower/ai-score", icon: Cpu },
    { name: "Waiting Room / Offers", path: "/borrower/offers", icon: Award },
    { name: "Notifications", path: "/borrower/notifications", icon: Bell },
    { name: "Messages", path: "/borrower/messages", icon: MessageSquare },
    { name: "Referral Program", path: "/borrower/referral", icon: Share2 },
    { name: "Profile & Settings", path: "/borrower/settings", icon: Settings },
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
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-900 border-r border-slate-800 transform transition-all duration-300 md:translate-x-0 md:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800 bg-slate-900">
          {!isCollapsed ? (
            <span className="text-xs font-bold tracking-wider text-slate-50 uppercase truncate">BORROWER PORTAL</span>
          ) : (
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase mx-auto">BRW</span>
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
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center ${
                  isCollapsed ? "justify-center px-2" : "px-4"
                } py-2.5 text-sm font-medium rounded-lg transition-colors group ${
                  isActive
                    ? "bg-slate-800 text-slate-100"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                }`}
              >
                <Icon size={18} className={`text-slate-400 group-hover:text-slate-100 ${!isCollapsed ? "mr-3" : ""}`} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
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
            <Link
              to="/borrower/notifications"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors relative"
              title="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
            </Link>

            <Link
              to="/borrower/settings"
              className="flex items-center space-x-3 hover:opacity-85 transition-opacity"
              title="View Profile"
            >
              <span className="text-xs font-semibold text-slate-300">Borrower Applicant</span>
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
