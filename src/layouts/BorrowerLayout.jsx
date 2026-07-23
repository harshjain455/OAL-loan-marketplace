import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  Menu, X, Home, FileText, UploadCloud, Cpu, Award, Bell, MessageSquare, 
  Share2, Settings, User, LogOut, ChevronLeft, ChevronRight, PanelLeft, PanelLeftClose, ChevronDown 
} from "lucide-react";

export default function BorrowerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Dynamic Logged In Borrower Info
  const userRole = localStorage.getItem("oal_user_role") || "borrower";
  const userEmail = localStorage.getItem("oal_user_email") || "borrower@gmail.com";
  const userName = localStorage.getItem("oal_user_name") || "Rajesh Sharma (Borrower)";

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
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 md:translate-x-0 md:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-20" : "w-60"}`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800 bg-slate-900">
          {!isCollapsed ? (
            <span className="text-sm font-bold tracking-wider text-slate-50 uppercase truncate">
              Borrow Portal Dashbord
            </span>
          ) : (
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase mx-auto">
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
                  isCollapsed ? "justify-center px-2" : "px-3"
                } py-3 text-sm font-medium rounded-xl transition-colors group relative ${
                  isActive
                    ? "bg-slate-800 text-slate-100 border border-slate-700 font-semibold"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                }`}
              >
                <Icon
                  size={18}
                  className={`flex-shrink-0 text-slate-400 group-hover:text-slate-100 ${
                    !isCollapsed ? "mr-3" : ""
                  }`}
                />
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
              isCollapsed ? "justify-center px-2" : "px-3"
            } py-3 text-sm font-medium text-red-400 rounded-xl hover:bg-red-500/10 hover:text-red-300 transition-colors group`}
          >
            <LogOut size={18} className={`flex-shrink-0 text-red-400 group-hover:text-red-300 ${!isCollapsed ? "mr-3" : ""}`} />
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

            {/* Desktop Top Header Collapse Toggle Shortcut */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 rounded-xl transition-colors"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
            </button>
          </div>

          {/* Dynamic Top Right Borrower Profile Dropdown */}
          <div className="relative ml-auto">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition-all cursor-pointer group"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">{userName}</p>
                <p className="text-[10px] text-emerald-400 font-mono flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  Borrower Active
                </p>
              </div>

              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                <User size={18} />
              </div>

              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setProfileDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 p-3 space-y-2 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <p className="text-xs font-bold text-white">{userName}</p>
                    <p className="text-[11px] text-slate-400 font-mono truncate">{userEmail}</p>
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                      Borrower Account
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        localStorage.removeItem("oal_user_name");
                        localStorage.removeItem("oal_user_email");
                        localStorage.removeItem("oal_user_role");
                        navigate("/auth/login");
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold rounded-xl border border-red-500/20 transition-all"
                    >
                      <LogOut size={14} />
                      Sign Out Account
                    </button>
                  </div>
                </div>
              </>
            )}
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
