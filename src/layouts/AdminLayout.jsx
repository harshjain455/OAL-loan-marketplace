import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  Menu, X, Home, Users, UserCheck, FileText, Cpu, ShieldAlert, FolderGit, 
  Network, Bell, Link2, Megaphone, DollarSign, Edit, BarChart, LifeBuoy, 
  FileCode, Settings, Shield, User, LogOut, CreditCard, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeft
} from "lucide-react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

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
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
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
        <header className="flex items-center justify-between h-16 px-6 bg-slate-900 border-b border-slate-800">
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

            <Link
              to="/admin/settings"
              className="flex items-center space-x-3 hover:opacity-85 transition-opacity"
              title="View Profile"
            >
              <span className="text-xs font-semibold text-slate-300">System Admin</span>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-200">
                <User size={16} />
              </div>
            </Link>
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
