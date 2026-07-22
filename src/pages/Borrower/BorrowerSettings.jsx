import React from "react";

export default function BorrowerSettings() {
  return (
    <div className="space-y-6 font-sans text-slate-100 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile & Settings</h1>
        <p className="text-sm text-slate-400">Configure your account parameters and MFA credentials</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold mb-2">Multi-Factor Authentication (MFA)</h3>
          <div className="flex justify-between items-center bg-slate-950 p-4 rounded-lg">
            <div>
              <p className="text-xs font-semibold">MFA Login Verification</p>
              <p className="text-[10px] text-slate-500">Require 6-digit OTP code on all account logins</p>
            </div>
            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded text-xs font-semibold">
              Always Active (Enforced)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
