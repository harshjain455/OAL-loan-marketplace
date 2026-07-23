import React, { useState } from "react";
import { 
  ShieldCheck, UserPlus, Users, Lock, Key, CheckCircle2, Search, Filter, Edit2, ShieldAlert, Check, X, Layers, Sliders, ChevronRight, AlertTriangle 
} from "lucide-react";

export default function AdminSuperAdmin() {
  const [activeTab, setActiveTab] = useState("Admin Staff Roster");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // Modals state
  const [showCreateStaffModal, setShowCreateStaffModal] = useState(false);
  const [editingPermissionsStaff, setEditingPermissionsStaff] = useState(null);
  const [saveRbacSuccess, setSaveRbacSuccess] = useState(false);

  // All 18 Platform Modules for RBAC Matrix
  const platformModules = [
    "Borrowers Management",
    "Lenders Management",
    "Loan Applications Pipeline",
    "AI Risk Scoring Engine",
    "Verification Center (KYC)",
    "Document Management Storage",
    "Lead Distribution Engine",
    "Notifications Broadcast",
    "Referrals & Affiliates",
    "Advertisements Manager",
    "Payments Revenue Ledger",
    "Subscription Packages",
    "Content Management (CMS)",
    "Reports & Deep Analytics",
    "Help Desk Support Tickets",
    "Security Audit Logs",
    "System Settings",
    "Super Admin Controls"
  ];

  // Admin Staff Accounts Roster Data
  const [staffAccounts, setStaffAccounts] = useState([
    {
      id: "ADM-101",
      name: "Vikramaditya Roy",
      email: "vikram.roy@oaloanmarketplace.com",
      role: "Super Admin",
      status: "Active",
      allowedModules: [...platformModules],
      createdDate: "2025-11-01"
    },
    {
      id: "REP-101",
      name: "Amit Verma",
      email: "amit.v@oaloan.com",
      role: "OAL Rep Agent",
      status: "Active",
      allowedModules: [
        "Borrowers Management",
        "Loan Applications Pipeline",
        "Lead Distribution Engine",
        "Notifications Broadcast",
        "Help Desk Support Tickets"
      ],
      createdDate: "2025-12-10"
    },
    {
      id: "ADM-102",
      name: "Pooja Gupta",
      email: "pooja.g@oaloanmarketplace.com",
      role: "Operations Admin",
      status: "Active",
      allowedModules: [
        "Borrowers Management",
        "Lenders Management",
        "Loan Applications Pipeline",
        "Verification Center (KYC)",
        "Document Management Storage",
        "Help Desk Support Tickets"
      ],
      createdDate: "2026-01-05"
    },
    {
      id: "ADM-103",
      name: "Rajesh Kulkarni",
      email: "rajesh.k@oaloanmarketplace.com",
      role: "Compliance Officer",
      status: "Active",
      allowedModules: [
        "Verification Center (KYC)",
        "Document Management Storage",
        "Security Audit Logs",
        "Reports & Deep Analytics"
      ],
      createdDate: "2026-01-12"
    }
  ]);

  // Role Based Permission Matrix State (Toggles per role)
  const [rbacRoleMatrix, setRbacRoleMatrix] = useState({
    "Super Admin": platformModules.reduce((acc, mod) => ({ ...acc, [mod]: true }), {}),
    "Operations Admin": {
      "Borrowers Management": true,
      "Lenders Management": true,
      "Loan Applications Pipeline": true,
      "AI Risk Scoring Engine": true,
      "Verification Center (KYC)": true,
      "Document Management Storage": true,
      "Lead Distribution Engine": false,
      "Notifications Broadcast": true,
      "Referrals & Affiliates": false,
      "Advertisements Manager": false,
      "Payments Revenue Ledger": false,
      "Subscription Packages": false,
      "Content Management (CMS)": true,
      "Reports & Deep Analytics": true,
      "Help Desk Support Tickets": true,
      "Security Audit Logs": false,
      "System Settings": false,
      "Super Admin Controls": false
    },
    "OAL Rep Agent": {
      "Borrowers Management": true,
      "Lenders Management": false,
      "Loan Applications Pipeline": true,
      "AI Risk Scoring Engine": false,
      "Verification Center (KYC)": false,
      "Document Management Storage": false,
      "Lead Distribution Engine": true,
      "Notifications Broadcast": true,
      "Referrals & Affiliates": false,
      "Advertisements Manager": false,
      "Payments Revenue Ledger": false,
      "Subscription Packages": false,
      "Content Management (CMS)": false,
      "Reports & Deep Analytics": false,
      "Help Desk Support Tickets": true,
      "Security Audit Logs": false,
      "System Settings": false,
      "Super Admin Controls": false
    },
    "Compliance Officer": {
      "Borrowers Management": false,
      "Lenders Management": false,
      "Loan Applications Pipeline": false,
      "AI Risk Scoring Engine": true,
      "Verification Center (KYC)": true,
      "Document Management Storage": true,
      "Lead Distribution Engine": false,
      "Notifications Broadcast": false,
      "Referrals & Affiliates": false,
      "Advertisements Manager": false,
      "Payments Revenue Ledger": false,
      "Subscription Packages": false,
      "Content Management (CMS)": false,
      "Reports & Deep Analytics": true,
      "Help Desk Support Tickets": false,
      "Security Audit Logs": true,
      "System Settings": false,
      "Super Admin Controls": false
    }
  });

  // Create Staff Form State
  const [newStaffForm, setNewStaffForm] = useState({
    name: "",
    email: "",
    role: "OAL Rep Agent",
    password: "",
    selectedModules: [
      "Borrowers Management",
      "Loan Applications Pipeline",
      "Lead Distribution Engine",
      "Notifications Broadcast",
      "Help Desk Support Tickets"
    ]
  });

  // Handle Create Staff Account
  const handleCreateStaff = (e) => {
    e.preventDefault();
    if (!newStaffForm.name || !newStaffForm.email) return;

    const createdStaff = {
      id: `${newStaffForm.role === "OAL Rep Agent" ? "REP" : "ADM"}-10${staffAccounts.length + 1}`,
      name: newStaffForm.name,
      email: newStaffForm.email,
      role: newStaffForm.role,
      status: "Active",
      allowedModules: [...newStaffForm.selectedModules],
      createdDate: new Date().toISOString().split("T")[0]
    };

    setStaffAccounts([...staffAccounts, createdStaff]);
    setShowCreateStaffModal(false);
    setNewStaffForm({ name: "", email: "", role: "OAL Rep Agent", password: "", selectedModules: ["Borrowers Management", "Loan Applications Pipeline", "Lead Distribution Engine"] });
  };

  // Handle Save Staff Permission Modifications
  const handleSaveStaffPermissions = (e) => {
    e.preventDefault();
    if (!editingPermissionsStaff) return;

    setStaffAccounts(prev => prev.map(s => s.id === editingPermissionsStaff.id ? editingPermissionsStaff : s));
    setEditingPermissionsStaff(null);
  };

  // Handle Toggle RBAC Permission Checkbox
  const handleToggleRbacPermission = (role, moduleName) => {
    setRbacRoleMatrix(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [moduleName]: !prev[role][moduleName]
      }
    }));
  };

  // Handle Save RBAC Matrix
  const handleSaveRbacMatrix = (e) => {
    e.preventDefault();
    setSaveRbacSuccess(true);
    setTimeout(() => setSaveRbacSuccess(false), 3000);
  };

  // Toggle Account Active / Suspended
  const handleToggleAccountStatus = (staffId) => {
    setStaffAccounts(prev => prev.map(s => {
      if (s.id === staffId && s.role !== "Super Admin") {
        return { ...s, status: s.status === "Active" ? "Suspended" : "Active" };
      }
      return s;
    }));
  };

  // Filtered Roster
  const filteredStaff = staffAccounts.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || staff.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Super Admin Controls & RBAC Matrix
            <span className="text-xs bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded-full font-mono flex items-center gap-1">
              <Lock size={12} />
              Root Security Clearance
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Manage internal Admin & Rep staff accounts, define module-level access permissions, and configure Role-Based Access Control (RBAC).</p>
        </div>

        <button
          onClick={() => setShowCreateStaffModal(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
        >
          <UserPlus size={16} />
          Create Admin / Rep Account
        </button>
      </div>

      {saveRbacSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-xs text-emerald-400 flex items-center gap-2 animate-fade-in shadow-md">
          <CheckCircle2 size={18} />
          <span>Role-Based Access Control (RBAC) matrix permissions successfully updated and synchronized!</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Admin Accounts</p>
            <p className="text-2xl font-bold text-white mt-1">{staffAccounts.length}</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <Users size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Super Admins</p>
            <p className="text-2xl font-bold text-red-400 mt-1">1 Account</p>
          </div>
          <div className="p-3 bg-red-500/10 text-red-400 rounded-lg">
            <ShieldAlert size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">OAL Rep Agents</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">1 Active</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <ShieldCheck size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Modules Covered</p>
            <p className="text-2xl font-bold text-purple-400 mt-1">18 Modules</p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
            <Layers size={20} />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs overflow-x-auto">
        {["Admin Staff Roster", "Role-Based Access Control (RBAC) Matrix"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-md font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB 1: Admin Staff Accounts Roster Table */}
      {activeTab === "Admin Staff Roster" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Users size={20} className="text-blue-400" />
                Internal Admin & OAL Rep Staff Roster
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Manage employee accounts, assign roles, and modify module permission sets.</p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search staff ID, name, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                {["All", "Super Admin", "Operations Admin", "OAL Rep Agent"].map(r => (
                  <button
                    key={r}
                    onClick={() => setRoleFilter(r)}
                    className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                      roleFilter === r ? "bg-blue-600 text-white font-medium" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-semibold">Staff Identity</th>
                  <th className="px-6 py-4 font-semibold">Assigned Role</th>
                  <th className="px-6 py-4 font-semibold">Allowed Modules Access</th>
                  <th className="px-6 py-4 font-semibold">Created Date</th>
                  <th className="px-6 py-4 font-semibold text-right">Account Status & Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono">
                      <div>
                        <p className="font-bold text-slate-100">{staff.name}</p>
                        <p className="text-[11px] text-blue-400">{staff.id} • {staff.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        staff.role === "Super Admin"
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : staff.role === "Operations Admin"
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}>
                        {staff.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-300">
                      <span className="bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 font-mono text-emerald-400 font-bold">
                        {staff.allowedModules.length} / 18 Modules Allowed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-400">
                      {staff.createdDate}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleAccountStatus(staff.id)}
                          disabled={staff.role === "Super Admin"}
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors ${
                            staff.status === "Active"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-red-500/10 hover:text-red-400"
                              : "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-emerald-500/10 hover:text-emerald-400"
                          } disabled:opacity-50`}
                        >
                          {staff.status}
                        </button>

                        <button
                          onClick={() => setEditingPermissionsStaff({ ...staff })}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700"
                          title="Configure Allowed Modules"
                        >
                          <Edit2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Role-Based Access Control (RBAC) Matrix */}
      {activeTab === "Role-Based Access Control (RBAC) Matrix" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders size={20} className="text-purple-400" />
                Global Role-Based Access Control (RBAC) Permission Matrix
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Toggle module permission access for each staff role across all 18 platform menus.</p>
            </div>

            <button
              onClick={handleSaveRbacMatrix}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition-colors shadow-lg flex items-center gap-2"
            >
              <CheckCircle2 size={16} />
              Save RBAC Permission Matrix
            </button>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3 font-semibold">Platform Module (18 Total)</th>
                  <th className="p-3 font-semibold text-center text-red-400">Super Admin</th>
                  <th className="p-3 font-semibold text-center text-purple-400">Operations Admin</th>
                  <th className="p-3 font-semibold text-center text-blue-400">OAL Rep Agent</th>
                  <th className="p-3 font-semibold text-center text-emerald-400">Compliance Officer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {platformModules.map((mod) => (
                  <tr key={mod} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-slate-200">{mod}</td>

                    {/* Super Admin Always Has Access */}
                    <td className="p-3 text-center">
                      <Check size={16} className="text-emerald-400 mx-auto font-bold" />
                    </td>

                    {/* Operations Admin Toggle */}
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={!!rbacRoleMatrix["Operations Admin"][mod]}
                        onChange={() => handleToggleRbacPermission("Operations Admin", mod)}
                        className="w-4 h-4 rounded accent-purple-600 bg-slate-950 border-slate-800 cursor-pointer"
                      />
                    </td>

                    {/* OAL Rep Agent Toggle */}
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={!!rbacRoleMatrix["OAL Rep Agent"][mod]}
                        onChange={() => handleToggleRbacPermission("OAL Rep Agent", mod)}
                        className="w-4 h-4 rounded accent-blue-600 bg-slate-950 border-slate-800 cursor-pointer"
                      />
                    </td>

                    {/* Compliance Officer Toggle */}
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={!!rbacRoleMatrix["Compliance Officer"][mod]}
                        onChange={() => handleToggleRbacPermission("Compliance Officer", mod)}
                        className="w-4 h-4 rounded accent-emerald-600 bg-slate-950 border-slate-800 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Internal Staff Account Modal */}
      {showCreateStaffModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus size={18} className="text-blue-400" />
                Create Internal Admin / Rep Staff Account
              </h3>
              <button onClick={() => setShowCreateStaffModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Employee Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anish Malhotra"
                  value={newStaffForm.name}
                  onChange={(e) => setNewStaffForm({ ...newStaffForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Official Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. anish.m@oaloanmarketplace.com"
                  value={newStaffForm.email}
                  onChange={(e) => setNewStaffForm({ ...newStaffForm, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Assigned Role</label>
                <select
                  value={newStaffForm.role}
                  onChange={(e) => setNewStaffForm({ ...newStaffForm, role: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="OAL Rep Agent">OAL Rep Agent</option>
                  <option value="Operations Admin">Operations Admin</option>
                  <option value="Compliance Officer">Compliance Officer</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Initial Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={newStaffForm.password}
                  onChange={(e) => setNewStaffForm({ ...newStaffForm, password: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateStaffModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
                >
                  Provision Staff Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Staff Allowed Modules Modal */}
      {editingPermissionsStaff && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit2 size={18} className="text-blue-400" />
                Configure Module Permissions ({editingPermissionsStaff.name})
              </h3>
              <button onClick={() => setEditingPermissionsStaff(null)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveStaffPermissions} className="p-6 space-y-4 text-xs">
              <p className="text-slate-400">Select which of the 18 platform modules <strong className="text-white">{editingPermissionsStaff.name}</strong> has access to:</p>

              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-64 overflow-y-auto custom-scrollbar">
                {platformModules.map((mod) => {
                  const isChecked = editingPermissionsStaff.allowedModules.includes(mod);
                  return (
                    <label key={mod} className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-900 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          let updated = [...editingPermissionsStaff.allowedModules];
                          if (isChecked) {
                            updated = updated.filter(m => m !== mod);
                          } else {
                            updated.push(mod);
                          }
                          setEditingPermissionsStaff({ ...editingPermissionsStaff, allowedModules: updated });
                        }}
                        className="w-4 h-4 rounded accent-blue-600 bg-slate-900 border-slate-800"
                      />
                      <span className="truncate">{mod}</span>
                    </label>
                  );
                })}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingPermissionsStaff(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
                >
                  Save Permission Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
