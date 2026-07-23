import React, { useState } from "react";
import { Shield, Bell, Lock, Sliders, CheckCircle2 } from "lucide-react";

export default function RepSettings() {
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);

  // Match Preferences States
  const [minInvIq, setMinInvIq] = useState("80");
  const [maxLoanSize, setMaxLoanSize] = useState("500k");
  const [prefIndustries, setPrefIndustries] = useState({
    cre: true,
    equipment: true,
    expansion: false,
    personal: false
  });

  const handleCheckboxChange = (key) => {
    setPrefIndustries(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    showToast("Security & password settings updated successfully!");
  };

  const handleSaveMatching = (e) => {
    e.preventDefault();
    showToast("AI Lead Match preferences saved successfully!");
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-12 w-full">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-sm text-slate-400">Configure platform security, notification preferences, and AI matching rules.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Security & Notifications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Security / MFA */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
              <Shield size={16} className="text-blue-400" />
              Security & Authentication
            </h3>
            <div className="flex justify-between items-center text-xs pb-4 border-b border-slate-850">
              <div>
                <span className="font-bold text-slate-200 block">Multi-Factor Authentication (MFA)</span>
                <span className="text-[10px] text-slate-500">MFA is strictly enforced for all agent and representative accounts.</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMfaEnabled(!mfaEnabled);
                  showToast(`MFA ${!mfaEnabled ? "Enabled" : "Disabled"}`);
                }}
                className={`px-3 py-1 rounded font-semibold transition-all text-[10px] ${
                  mfaEnabled ? "bg-emerald-600 text-white" : "bg-slate-850 text-slate-400"
                }`}
              >
                {mfaEnabled ? "ENABLED" : "DISABLED"}
              </button>
            </div>

            {/* Change Password Form */}
            <form onSubmit={handleSaveSecurity} className="space-y-3 pt-2">
              <h4 className="font-bold text-xs text-slate-300 flex items-center gap-1.5">
                <Lock size={12} className="text-slate-400" />
                Change Password
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-1">New Password</label>
                  <input type="password" placeholder="Min 8 chars" className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Confirm New Password</label>
                  <input type="password" placeholder="Min 8 chars" className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <button type="submit" className="w-full mt-2 py-2 bg-slate-800 hover:bg-slate-700 font-semibold text-xs rounded-lg transition-colors">
                Update Password
              </button>
            </form>
          </div>

          {/* Notifications */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
              <Bell size={16} className="text-blue-400" />
              Notification Preferences
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-200 block">Email Alerts</span>
                  <span className="text-[10px] text-slate-500">Receive copy of new matching lender bids.</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={() => setEmailAlerts(!emailAlerts)}
                  className="w-4 h-4 rounded border-slate-850 bg-slate-950 text-blue-600 focus:ring-0 focus:ring-offset-0"
                />
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-slate-850">
                <div>
                  <span className="font-bold text-slate-200 block">Push Notifications</span>
                  <span className="text-[10px] text-slate-500">Receive alerts when borrowers upload KYC documents.</span>
                </div>
                <input
                  type="checkbox"
                  checked={pushAlerts}
                  onChange={() => setPushAlerts(!pushAlerts)}
                  className="w-4 h-4 rounded border-slate-850 bg-slate-950 text-blue-600 focus:ring-0 focus:ring-offset-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Lead Match Preferences */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 h-fit space-y-5">
          <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2 pb-2 border-b border-slate-850">
            <Sliders size={16} className="text-blue-400" />
            AI Lead Match Rules
          </h3>

          <form onSubmit={handleSaveMatching} className="space-y-4 text-xs">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Minimum InvIQ Score Alert Threshold</label>
              <select
                value={minInvIq}
                onChange={(e) => setMinInvIq(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="70">70+ Score (Medium Risk)</option>
                <option value="80">80+ Score (Low-Medium Risk)</option>
                <option value="90">90+ Score (Low Risk Only)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Max Loan Size Preference limit</label>
              <select
                value={maxLoanSize}
                onChange={(e) => setMaxLoanSize(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="100k">Up to $100,000</option>
                <option value="500k">Up to $500,000</option>
                <option value="1m">Up to $1,000,000+</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Preferred Lending Niches</label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Commercial Real Estate</span>
                  <input type="checkbox" checked={prefIndustries.cre} onChange={() => handleCheckboxChange("cre")} className="w-3.5 h-3.5 rounded border-slate-850 bg-slate-950 text-blue-600 focus:ring-0 focus:ring-offset-0" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Equipment Financing</span>
                  <input type="checkbox" checked={prefIndustries.equipment} onChange={() => handleCheckboxChange("equipment")} className="w-3.5 h-3.5 rounded border-slate-850 bg-slate-950 text-blue-600 focus:ring-0 focus:ring-offset-0" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Business Expansion</span>
                  <input type="checkbox" checked={prefIndustries.expansion} onChange={() => handleCheckboxChange("expansion")} className="w-3.5 h-3.5 rounded border-slate-850 bg-slate-950 text-blue-600 focus:ring-0 focus:ring-offset-0" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Unsecured Personal Loans</span>
                  <input type="checkbox" checked={prefIndustries.personal} onChange={() => handleCheckboxChange("personal")} className="w-3.5 h-3.5 rounded border-slate-850 bg-slate-950 text-blue-600 focus:ring-0 focus:ring-offset-0" />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-500 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow">
              <CheckCircle2 size={12} />
              Save Match Preferences
            </button>
          </form>
        </div>
      </div>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-emerald-500 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 text-xs animate-bounce">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
