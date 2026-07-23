import React, { useState } from "react";
import { Settings, ShieldCheck, Lock, User, Key, CheckCircle2, Phone, Mail } from "lucide-react";

export default function BorrowerSettings() {
  const [profile, setProfile] = useState({
    legalName: "Alexander Vance",
    email: "alexander.vance@example.com",
    phone: "+1 (555) 234-5678"
  });

  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [passwordForm, setPasswordForm] = useState({ current: "", newPass: "", confirm: "" });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert("Profile details updated successfully!");
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPass !== passwordForm.confirm) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPasswordForm({ current: "", newPass: "", confirm: "" });
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Profile & Security Settings</h1>
        <p className="text-sm text-slate-400">Manage your legal account details, password, and Multi-Factor Authentication (MFA).</p>
      </div>

      {/* MFA Security Mandatory Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-400" />
            Multi-Factor Authentication (MFA) Compliance
          </h2>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-full">
            Active & Enforced
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-950 p-4 rounded-lg border border-slate-850">
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-white">Require OTP Verification on Login</h3>
            <p className="text-[11px] text-slate-400">
              In compliance with International Financial Security Standards, all account logins require a 6-digit SMS/Email verification code.
            </p>
          </div>
          <button
            onClick={() => alert("MFA protection is strictly required on OAL Network and cannot be disabled.")}
            className="px-4 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-lg shrink-0 cursor-default"
          >
            MFA Active (Enforced)
          </button>
        </div>
      </div>

      {/* Personal Info & Password Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Personal Details */}
        <form onSubmit={handleSaveProfile} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <User size={18} className="text-indigo-400" />
            Personal Details
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Full Legal Name</label>
            <input
              type="text"
              value={profile.legalName}
              onChange={(e) => setProfile({ ...profile, legalName: e.target.value })}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Phone Number</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-colors"
            >
              Save Profile Changes
            </button>
          </div>
        </form>

        {/* Change Password */}
        <form onSubmit={handleSavePassword} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Lock size={18} className="text-indigo-400" />
            Security & Password
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Current Password</label>
            <input
              type="password"
              value={passwordForm.current}
              onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">New Password</label>
            <input
              type="password"
              value={passwordForm.newPass}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Confirm New Password</label>
            <input
              type="password"
              value={passwordForm.confirm}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg transition-colors border border-slate-750"
            >
              Update Password
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
