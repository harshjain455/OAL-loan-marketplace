import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Home, Users, Bell, Eye, FileText, Heart, MessageSquare, Briefcase, BarChart2, CreditCard, Settings, User, LogOut } from "lucide-react";

export default function RepLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/rep/dashboard", icon: Home },
    { name: "Communication", path: "/rep/communication", icon: MessageSquare },
    { name: "Qualified Leads", path: "/rep/qualified-leads", icon: Users },
    { name: "AI Lead Alerts", path: "/rep/lead-alerts", icon: Bell },
    { name: "Lead Details", path: "/rep/lead-details", icon: Eye },
    { name: "Loan Requests", path: "/rep/loan-requests", icon: FileText },
    { name: "Saved Leads", path: "/rep/saved-leads", icon: Heart },
    { name: "Offer Management", path: "/rep/offers", icon: Briefcase },
    { name: "Analytics", path: "/rep/analytics", icon: BarChart2 },
    { name: "Reports", path: "/rep/reports", icon: FileText },
    { name: "Billing", path: "/rep/billing", icon: CreditCard },
    { name: "Subscription", path: "/rep/subscription", icon: FileText },
    { name: "Profile", path: "/rep/profile", icon: User },
    { name: "Settings", path: "/rep/settings", icon: Settings },
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
          <span className="text-lg font-bold tracking-wider text-slate-50 uppercase">OAL REPS / AGENT Portal Dashboard</span>
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
            <span className="text-sm text-slate-300">OAL Rep / Agent</span>
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
