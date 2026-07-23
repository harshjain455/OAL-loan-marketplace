import React, { useState } from "react";
import { Shield, Bell, Lock } from "lucide-react";

export default function RepSettings() {
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-sm text-slate-400">Configure platform security, notifications, and verification settings.</p>
      </div>

      <div className="space-y-4">
        {/* Security / MFA */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <Shield size={16} className="text-blue-400" />
            Security & Authentication
          </h3>
          <div className="flex justify-between items-center text-xs">
            <div>
              <span className="font-bold text-slate-200 block">Multi-Factor Authentication (MFA)</span>
              <span className="text-[10px] text-slate-500">MFA is strictly enforced for all agent and representative accounts.</span>
            </div>
            <button
              onClick={() => {
                setMfaEnabled(!mfaEnabled);
                alert(`MFA ${!mfaEnabled ? "Enabled" : "Disabled"}`);
              }}
              className={`px-3 py-1 rounded font-semibold transition-all ${
                mfaEnabled ? "bg-emerald-600 text-white" : "bg-slate-850 text-slate-400"
              }`}
            >
              {mfaEnabled ? "ENABLED" : "DISABLED"}
            </button>
          </div>
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
                className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-blue-600 focus:ring-0 focus:ring-offset-0"
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
                className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-blue-600 focus:ring-0 focus:ring-offset-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
