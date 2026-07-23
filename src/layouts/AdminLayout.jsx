import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  Menu, X, Home, Users, UserCheck, FileText, Cpu, ShieldAlert, FolderGit, 
  Network, Bell, Link2, Megaphone, DollarSign, Edit, BarChart, LifeBuoy, 
  FileCode, Settings, Shield, User, LogOut, CreditCard, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeft, ChevronDown, CheckCircle2 
} from "lucide-react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Dynamic Logged-In User Information
  const loggedUserRole = localStorage.getItem("oal_user_role") || "admin";
  const loggedUserEmail = localStorage.getItem("oal_user_email") || "admin@oaloanmarketplace.com";
  const loggedUserName = localStorage.getItem("oal_user_name") || "Vikramaditya Roy";

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Borrowers", path: "/admin/borrowers", icon: Users },
    { name: "Lenders", path: "/admin/lenders", icon: UserCheck },
    { name: "Loan Applications", path: "/admin/loan-applications", icon: FileText },
    { name: "AI Scoring Engine", path: "/admin/ai-scoring", icon: Cpu },
    { name: "Verification Center", path: "/admin/verification", icon: ShieldAlert },
    { name: "Document Management", path: "/admin/document-management", icon: FolderGit },
    { name: "Lead Distribution", path: "/admin/lead-distribution", icon: Network },
    { name: "Notifications", path: "/admin/notifications", icon: Bell },
    { name: "Referrals & Affiliates", path: "/admin/referrals", icon: Link2 },
    { name: "Advertisements", path: "/admin/advertisements", icon: Megaphone },
    { name: "Payments", path: "/admin/payments", icon: DollarSign },
    { name: "Subscription Plans", path: "/admin/subscriptions", icon: CreditCard },
    { name: "CMS", path: "/admin/cms", icon: Edit },
    { name: "Reports & Analytics", path: "/admin/reports", icon: BarChart },
    { name: "Support Tickets", path: "/admin/help-desk", icon: LifeBuoy },
    { name: "Audit Logs", path: "/admin/audit-logs", icon: FileCode },
    { name: "System Settings", path: "/admin/settings", icon: Settings },
    { name: "Super Admin", path: "/admin/super-admin", icon: Shield },
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
              OAL Admin Panel
            </span>
          ) : (
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase mx-auto">
              OAL
            </span>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          {/* Mobile Close Button */}
          <button
            className="md:hidden text-slate-400 hover:text-slate-100"
            onClick={() => setSidebarOpen(false)}
          >
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
                } py-2.5 text-sm font-medium rounded-lg transition-colors group relative ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                }`}
              >
                <Icon
                  size={18}
                  className={`flex-shrink-0 ${
                    isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-100"
                  } ${!isCollapsed ? "mr-3" : ""}`}
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
            } py-2.5 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-colors group`}
          >
            <LogOut size={18} className={`flex-shrink-0 ${!isCollapsed ? "mr-3" : ""}`} />
            {!isCollapsed && <span>Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-slate-900 border-b border-slate-800 relative z-30">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-slate-400 hover:text-slate-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/60 border border-slate-700/50 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              {isCollapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
              <span>{isCollapsed ? "Expand Menu" : "Collapse Menu"}</span>
            </button>
          </div>

          <div className="flex items-center ml-auto space-x-4">
            <Link
              to="/admin/notifications"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors relative"
              title="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
            </Link>

            {/* Dynamic Top Right Admin Profile & Quick Access Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition-all cursor-pointer group"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">{loggedUserName}</p>
                  <p className="text-[10px] text-emerald-400 font-mono flex items-center justify-end gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    Root Verified
                  </p>
                </div>

                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md shadow-blue-950/30">
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
                      <p className="text-xs font-bold text-white">{loggedUserName}</p>
                      <p className="text-[11px] text-slate-400 font-mono truncate">{loggedUserEmail}</p>
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/20 uppercase">
                        {loggedUserRole} Clearance
                      </span>
                    </div>

                    <div className="space-y-1 text-xs pt-1">
                      <Link
                        to="/admin/settings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors font-medium"
                      >
                        <Settings size={15} className="text-blue-400" />
                        <span>System Settings</span>
                      </Link>

                      <Link
                        to="/admin/super-admin"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors font-medium"
                      >
                        <Shield size={15} className="text-purple-400" />
                        <span>Super Admin Controls</span>
                      </Link>

                      <Link
                        to="/admin/audit-logs"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors font-medium"
                      >
                        <FileCode size={15} className="text-emerald-400" />
                        <span>Security Audit Logs</span>
                      </Link>
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
          </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
