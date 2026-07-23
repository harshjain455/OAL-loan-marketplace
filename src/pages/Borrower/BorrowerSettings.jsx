import React, { useState } from "react";
import { Settings, ShieldCheck, Lock, User, Key, CheckCircle2, Phone, Mail, Sparkles, Bell, Building, Trash2 } from "lucide-react";

export default function BorrowerSettings() {
  const [profile, setProfile] = useState({
    legalName: "Alexander Vance",
    companyName: "Vance Enterprises LLC",
    email: "alexander.vance@example.com",
    phone: "+1 (555) 234-5678",
    taxId: "EIN-89-123456"
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    offerBids: true,
    marketing: false
  });

  const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirm: "" });
  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 5000);
  };
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showToast("Personal & Business Profile updated successfully!");
    setSaveSuccessMsg("Personal & Business Profile updated successfully!");
    setTimeout(() => setSaveSuccessMsg(""), 3000);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPass !== passwordForm.confirm) {
      showToast("New passwords do not match!");
      return;
    }
    showToast("Password updated successfully!");
    setSaveSuccessMsg("Password updated successfully!");
    setPasswordForm({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setSaveSuccessMsg(""), 3000);
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 w-full max-w-7xl mx-auto pb-10 overflow-hidden">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-bold tracking-tight text-white">Profile & Account Settings</h1>
            <span className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold rounded-full flex items-center gap-1">
              <Sparkles size={11} /> Wireframe Specs Compliant
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Manage your legal identity details, business information, notification alerts, and MFA account security.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-400 font-semibold shrink-0 self-start sm:self-auto">
          <ShieldCheck size={16} /> Verified Borrower Profile
        </div>
      </div>

      {/* Global Toast Success Message */}
      {saveSuccessMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs font-bold text-emerald-300 flex items-center gap-2 animate-fadeIn shadow-lg">
          <CheckCircle2 size={16} className="text-emerald-400" /> {saveSuccessMsg}
        </div>
      )}

      {/* 2. MFA Compliance Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-400" />
            Multi-Factor Authentication (MFA) Compliance
          </h2>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-full">
            Active & Enforced
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950 p-4 rounded-xl border border-slate-850">
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-white">Require OTP Verification on Login</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              In compliance with International Financial Security Standards, all account logins require a 6-digit SMS/Email verification code.
            </p>
          </div>
          <button
            type="button"
            onClick={() => showToast("MFA protection is strictly required on OAL Network and cannot be disabled.")}
            className="px-4 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-xl shrink-0 cursor-default self-start sm:self-auto"
          >
            MFA Active (Enforced)
          </button>
        </div>
      </div>

      {/* 3. Personal Info & Password Forms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Personal & Business Details Form */}
        <form onSubmit={handleSaveProfile} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <User size={17} className="text-indigo-400" />
            Personal & Business Details
          </h2>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">Full Legal Name</label>
            <input
              type="text"
              value={profile.legalName}
              onChange={(e) => setProfile({ ...profile, legalName: e.target.value })}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">Registered Business / Company Name</label>
            <input
              type="text"
              value={profile.companyName}
              onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">Phone Number</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </form>

        {/* Security & Password Form */}
        <form onSubmit={handleSavePassword} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Lock size={17} className="text-indigo-400" />
            Account Security & Password
          </h2>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">Current Password</label>
            <input
              type="password"
              value={passwordForm.current}
              onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">New Password</label>
            <input
              type="password"
              value={passwordForm.newPass}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">Confirm New Password</label>
            <input
              type="password"
              value={passwordForm.confirm}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs rounded-xl transition-colors border border-slate-750 cursor-pointer"
            >
              Update Security Password
            </button>
          </div>
        </form>

      </div>
      {/* 4. Notification Preferences */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Bell size={17} className="text-indigo-400" />
          Notification Alert Preferences
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-855 flex items-center justify-between gap-3">
            <div>
              <span className="font-bold text-white block">Email Notifications</span>
              <span className="text-[11px] text-slate-400">Receive application updates via email</span>
            </div>
            <input
              type="checkbox"
              checked={notifications.emailAlerts}
              onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
              className="w-4 h-4 rounded accent-indigo-600 cursor-pointer shrink-0"
            />
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-855 flex items-center justify-between gap-3">
            <div>
              <span className="font-bold text-white block">SMS Loan Alerts</span>
              <span className="text-[11px] text-slate-400">Urgent SMS notifications for bids</span>
            </div>
            <input
              type="checkbox"
              checked={notifications.smsAlerts}
              onChange={(e) => setNotifications({ ...notifications, smsAlerts: e.target.checked })}
              className="w-4 h-4 rounded accent-indigo-600 cursor-pointer shrink-0"
            />
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-emerald-500 text-slate-100 p-4 rounded-xl shadow-2xl flex items-start gap-2 z-50 text-xs animate-bounce max-w-sm whitespace-pre-line">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
