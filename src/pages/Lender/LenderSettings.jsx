import React, { useState } from "react";
import { Settings, User, Building2, Lock, ShieldCheck, Eye, EyeOff, Save, Sliders, Bell, CheckCircle2, AlertTriangle } from "lucide-react";

export default function LenderSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  // Profile State
  const [companyName, setCompanyName] = useState("First Capital Partners LLC");
  const [contactName, setContactName] = useState("Robert Klein");
  const [email, setEmail] = useState("r.klein@firstcapital.com");
  const [phone, setPhone] = useState("+1 (555) 482-9210");
  const [profileSaved, setProfileSaved] = useState(false);

  // Lending Criteria State
  const [minScore, setMinScore] = useState(80);
  const [maxAmount, setMaxAmount] = useState(500000);
  const [minAmount, setMinAmount] = useState(25000);
  const [preferredTerms, setPreferredTerms] = useState("12-48");
  const [preferredPurposes, setPreferredPurposes] = useState(["Commercial Real Estate", "Business Expansion"]);
  const [criteriaSaved, setCriteriaSaved] = useState(false);

  // Password State
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [pwdError, setPwdError] = useState("");
  const [pwdSaved, setPwdSaved] = useState(false);

  // MFA State
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [mfaToggleConfirm, setMfaToggleConfirm] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [leadAlertNotifs, setLeadAlertNotifs] = useState(true);

  const PURPOSES = ["Commercial Real Estate", "Business Expansion", "Equipment Financing", "Working Capital", "Bridge Loan", "Inventory Finance"];

  const togglePurpose = (p) => {
    setPreferredPurposes((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleSaveCriteria = (e) => {
    e.preventDefault();
    setCriteriaSaved(true);
    setTimeout(() => setCriteriaSaved(false), 2500);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    setPwdError("");
    if (!currentPwd) { setPwdError("Current password is required"); return; }
    if (newPwd.length < 8) { setPwdError("New password must be at least 8 characters"); return; }
    if (newPwd !== confirmPwd) { setPwdError("Passwords do not match"); return; }
    setPwdSaved(true);
    setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
    setTimeout(() => setPwdSaved(false), 2500);
  };

  const handleMfaToggle = () => {
    setMfaEnabled((v) => !v);
    setMfaToggleConfirm(false);
  };

  const tabs = [
    { id: "profile", label: "Company Profile", icon: Building2 },
    { id: "criteria", label: "Lending Criteria", icon: Sliders },
    { id: "security", label: "Password & MFA", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const SaveBanner = ({ show, message = "Changes saved successfully!" }) =>
    show ? (
      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl animate-fade-in">
        <CheckCircle2 size={14} />
        {message}
      </div>
    ) : null;

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in w-full">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <div className="p-2.5 bg-slate-700/50 border border-slate-700 text-slate-300 rounded-xl">
            <Settings size={22} />
          </div>
          Profile & Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage lending company details, AI matching criteria, password, MFA, and notification preferences.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 border border-slate-800/80 p-1.5 rounded-2xl w-fit text-xs font-semibold">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === id ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* TAB: COMPANY PROFILE */}
      {activeTab === "profile" && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl max-w-2xl space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-800/60 pb-4">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
              <Building2 size={18} className="text-indigo-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Company Profile</h2>
              <p className="text-[11px] text-slate-400">Lending institution details registered with OAL Platform.</p>
            </div>
          </div>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Company / Institution Name", value: companyName, setter: setCompanyName, placeholder: "e.g. First Capital Partners LLC" },
                { label: "Primary Contact Name", value: contactName, setter: setContactName, placeholder: "e.g. Robert Klein" },
                { label: "Official Email Address", value: email, setter: setEmail, placeholder: "e.g. r.klein@company.com" },
                { label: "Contact Phone Number", value: phone, setter: setPhone, placeholder: "e.g. +1 (555) 000-0000" },
              ].map(({ label, value, setter, placeholder }) => (
                <div key={label}>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none font-medium"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-2">
              <SaveBanner show={profileSaved} />
              <button type="submit" className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer shadow">
                <Save size={14} />
                Save Profile
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB: LENDING CRITERIA */}
      {activeTab === "criteria" && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl max-w-2xl space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-800/60 pb-4">
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
              <Sliders size={18} className="text-indigo-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">AI Lead Matching Criteria</h2>
              <p className="text-[11px] text-slate-400">These criteria tune the AI to surface the best-fit borrower leads for you.</p>
            </div>
          </div>
          <form onSubmit={handleSaveCriteria} className="space-y-5">
            {/* Min iNV IQ Score */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Minimum iNV IQ Score Threshold</label>
                <span className="text-indigo-400 font-extrabold text-sm">{minScore}</span>
              </div>
              <input
                type="range"
                min={50} max={100} value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
                <span>50</span><span>75</span><span>100</span>
              </div>
            </div>

            {/* Amount Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Min Loan Amount ($)</label>
                <input
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Max Loan Amount ($)</label>
                <input
                  type="number"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            {/* Preferred Term */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Preferred Loan Term (Months)</label>
              <select
                value={preferredTerms}
                onChange={(e) => setPreferredTerms(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none"
              >
                {["6-12", "12-24", "12-48", "24-60", "48-120"].map((t) => (
                  <option key={t} value={t}>{t} Months</option>
                ))}
              </select>
            </div>

            {/* Preferred Loan Purposes */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Preferred Loan Purposes</label>
              <div className="flex flex-wrap gap-2">
                {PURPOSES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePurpose(p)}
                    className={`px-3 py-1.5 text-[11px] font-semibold rounded-xl border transition-all cursor-pointer ${
                      preferredPurposes.includes(p)
                        ? "bg-indigo-600/20 border-indigo-500/40 text-indigo-300"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <SaveBanner show={criteriaSaved} message="Matching criteria updated!" />
              <button type="submit" className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer shadow">
                <Save size={14} />
                Save Criteria
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB: PASSWORD & MFA */}
      {activeTab === "security" && (
        <div className="space-y-4 max-w-2xl">
          {/* Password */}
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800/60 pb-4">
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <Lock size={18} className="text-amber-400" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Change Password</h2>
                <p className="text-[11px] text-slate-400">Use a strong unique password with 8+ characters.</p>
              </div>
            </div>
            <form onSubmit={handleSavePassword} className="space-y-4">
              {[
                { label: "Current Password", value: currentPwd, setter: setCurrentPwd },
                { label: "New Password", value: newPwd, setter: setNewPwd },
                { label: "Confirm New Password", value: confirmPwd, setter: setConfirmPwd },
              ].map(({ label, value, setter }) => (
                <div key={label} className="relative">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>
                  <input
                    type={showPwd ? "text" : "password"}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 pr-10 py-2.5 text-xs text-slate-200 focus:outline-none font-mono"
                  />
                  <button type="button" onClick={() => setShowPwd((v) => !v)} className="absolute right-3 top-[calc(50%+6px)] text-slate-500 hover:text-slate-300 cursor-pointer">
                    {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              ))}
              {pwdError && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle size={12} /> {pwdError}
                </p>
              )}
              <div className="flex items-center justify-between pt-1">
                <SaveBanner show={pwdSaved} message="Password updated successfully!" />
                <button type="submit" className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer shadow">
                  <Save size={14} />
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* MFA */}
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 border rounded-xl ${mfaEnabled ? "bg-emerald-500/10 border-emerald-500/20" : "bg-slate-800 border-slate-700"}`}>
                  <ShieldCheck size={18} className={mfaEnabled ? "text-emerald-400" : "text-slate-500"} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Multi-Factor Authentication (MFA)</h2>
                  <p className="text-[11px] text-slate-400">OTP verification via SMS on every login for account security.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-extrabold ${mfaEnabled ? "text-emerald-400" : "text-slate-500"}`}>
                  {mfaEnabled ? "ENABLED" : "DISABLED"}
                </span>
                <button
                  onClick={() => setMfaToggleConfirm(true)}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${mfaEnabled ? "bg-emerald-500" : "bg-slate-700"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${mfaEnabled ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
            </div>
            {mfaToggleConfirm && (
              <div className="mt-4 p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between gap-3 text-xs">
                <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                  <AlertTriangle size={13} />
                  {mfaEnabled ? "Disable MFA? This reduces account security." : "Enable MFA for enhanced login security."}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setMfaToggleConfirm(false)} className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white cursor-pointer font-semibold">Cancel</button>
                  <button onClick={handleMfaToggle} className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white cursor-pointer font-semibold">Confirm</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: NOTIFICATIONS */}
      {activeTab === "notifications" && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl max-w-2xl space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-800/60 pb-4">
            <div className="p-2.5 bg-sky-500/10 border border-sky-500/20 rounded-xl">
              <Bell size={18} className="text-sky-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Notification Preferences</h2>
              <p className="text-[11px] text-slate-400">Control which alerts and updates you receive from OAL Platform.</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: "Email Notifications", desc: "Receive updates, invoices, and offer status via email.", value: emailNotifs, setter: setEmailNotifs },
              { label: "SMS Notifications", desc: "Get OTP, security alerts, and urgent bid updates via SMS.", value: smsNotifs, setter: setSmsNotifs },
              { label: "AI Lead Alert Notifications", desc: "Real-time push updates for new matched leads based on your criteria.", value: leadAlertNotifs, setter: setLeadAlertNotifs },
            ].map(({ label, desc, value, setter }) => (
              <div key={label} className="flex items-center justify-between p-4 bg-slate-950/40 border border-slate-800/60 rounded-xl">
                <div>
                  <div className="text-xs font-bold text-white">{label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-medium">{desc}</div>
                </div>
                <button
                  onClick={() => setter((v) => !v)}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${value ? "bg-indigo-500" : "bg-slate-700"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${value ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => alert("Notification preferences saved!")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer shadow"
            >
              <Save size={14} />
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
