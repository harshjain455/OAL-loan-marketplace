import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Home, Users, UserCheck, FileText, Cpu, ShieldAlert, FolderGit, Network, Bell, Link2, Megaphone, DollarSign, Edit, BarChart, LifeBuoy, FileCode, Settings, Shield, User, LogOut, CreditCard } from "lucide-react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    { name: "Referral & Affiliates", path: "/admin/referrals", icon: Link2 },
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
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 md:translate-x-0 md:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800 bg-slate-900">
          <span className="text-lg font-bold tracking-wider text-slate-50 uppercase">Admin Panel Dashboard</span>
          <button className="md:hidden text-slate-400 hover:text-slate-100" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors group ${
                  isActive
                    ? "bg-slate-800 text-slate-100"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                }`}
              >
                <Icon size={18} className="mr-3 text-slate-400 group-hover:text-slate-100" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 mt-auto">
          <Link
            to="/auth/login"
            className="flex items-center px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-colors group"
          >
            <LogOut size={18} className="mr-3 text-red-400 group-hover:text-red-300" />
            Logout
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
            <span className="text-sm text-slate-300">Admin</span>
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
