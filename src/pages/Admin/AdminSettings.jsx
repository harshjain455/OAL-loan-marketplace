import React, { useState } from "react";
import { 
  Settings, Key, ShieldCheck, Mail, CheckCircle2, Save, Eye, EyeOff, RefreshCw, Power, Lock, Sliders, Database, Server, Check, X, Bell 
} from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("Global Configurations");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showApiSecrets, setShowApiSecrets] = useState(false);

  // Global Platform Settings State
  const [globalConfig, setGlobalConfig] = useState({
    maintenanceMode: false,
    borrowerRegistrationActive: true,
    lenderRegistrationActive: true,
    aiScoringEngineActive: true,
    autoLeadRoutingActive: true,
    defaultCurrency: "INR (₹)",
    sessionTimeoutMinutes: "30"
  });

  // API Keys & CRM Integrations State
  const [apiKeys, setApiKeys] = useState({
    salesforceApiKey: "sf_live_90192830192830192830192",
    hubspotApiKey: "pat-na1-890a8c2d-9012-4211-b012",
    zohoCrmAuthToken: "zoho_auth_789123891237",
    razorpayKeyId: "rzp_live_89012389123",
    stripeSecretKey: "sk_live_51M00192830192830192830"
  });

  // Security & MFA Enforcement State
  const [securityPolicy, setSecurityPolicy] = useState({
    mandatoryMfaAdmins: true,
    mandatoryMfaLenders: true,
    mandatoryMfaBorrowers: false,
    minPasswordLength: 10,
    failedLoginLockoutAttempts: 5,
    ipWhitelist: "103.22.180.4, 49.207.210.12"
  });

  // Email SMTP & Gateway Settings State
  const [smtpConfig, setSmtpConfig] = useState({
    smtpHost: "smtp.sendgrid.net",
    smtpPort: "587",
    smtpUser: "apikey",
    senderEmail: "no-reply@oaloanmarketplace.com",
    twilioSmsSid: "AC89012389123891238912389"
  });

  // Handle Save Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Global System Settings
            <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full font-mono flex items-center gap-1">
              <Settings size={12} />
              Platform Configuration Engine
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Configure global platform toggles, API keys for CRM/ERP integrations, MFA security enforcement policies, and SMTP gateways.</p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
        >
          <Save size={16} />
          Save Platform Settings
        </button>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-xs text-emerald-400 flex items-center gap-2 animate-fade-in shadow-md">
          <CheckCircle2 size={18} />
          <span>Global platform settings successfully saved and applied across all clusters!</span>
        </div>
      )}

      {/* Navigation Section Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs overflow-x-auto">
        {["Global Configurations", "API Keys & CRM Integrations", "Security & MFA Enforcement", "Email SMTP & Gateways"].map((tab) => (
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

      {/* TAB 1: Global Configurations */}
      {activeTab === "Global Configurations" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 max-w-3xl space-y-6 shadow-xl">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Power size={18} className="text-blue-400" />
              Platform Feature Switches & Core Parameters
            </h2>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-200">System Maintenance Mode</p>
                  <p className="text-[11px] text-slate-500">Temporarily restrict public access</p>
                </div>
                <button
                  type="button"
                  onClick={() => setGlobalConfig({ ...globalConfig, maintenanceMode: !globalConfig.maintenanceMode })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${globalConfig.maintenanceMode ? "bg-red-600" : "bg-slate-800"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${globalConfig.maintenanceMode ? "translate-x-6" : ""}`} />
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-200">Borrower Self-Registration</p>
                  <p className="text-[11px] text-slate-500">Allow new borrower onboarding</p>
                </div>
                <button
                  type="button"
                  onClick={() => setGlobalConfig({ ...globalConfig, borrowerRegistrationActive: !globalConfig.borrowerRegistrationActive })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${globalConfig.borrowerRegistrationActive ? "bg-emerald-600" : "bg-slate-800"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${globalConfig.borrowerRegistrationActive ? "translate-x-6" : ""}`} />
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-200">iNV IQ™ Risk Engine</p>
                  <p className="text-[11px] text-slate-500">Automatic AI credit scoring</p>
                </div>
                <button
                  type="button"
                  onClick={() => setGlobalConfig({ ...globalConfig, aiScoringEngineActive: !globalConfig.aiScoringEngineActive })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${globalConfig.aiScoringEngineActive ? "bg-purple-600" : "bg-slate-800"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${globalConfig.aiScoringEngineActive ? "translate-x-6" : ""}`} />
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-200">Lead Auto-Routing Engine</p>
                  <p className="text-[11px] text-slate-500">Auto assign leads to OAL Reps</p>
                </div>
                <button
                  type="button"
                  onClick={() => setGlobalConfig({ ...globalConfig, autoLeadRoutingActive: !globalConfig.autoLeadRoutingActive })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${globalConfig.autoLeadRoutingActive ? "bg-blue-600" : "bg-slate-800"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${globalConfig.autoLeadRoutingActive ? "translate-x-6" : ""}`} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Default Platform Currency</label>
                <input
                  type="text"
                  value={globalConfig.defaultCurrency}
                  onChange={(e) => setGlobalConfig({ ...globalConfig, defaultCurrency: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Session Inactivity Timeout (Mins)</label>
                <select
                  value={globalConfig.sessionTimeoutMinutes}
                  onChange={(e) => setGlobalConfig({ ...globalConfig, sessionTimeoutMinutes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="15">15 Minutes</option>
                  <option value="30">30 Minutes</option>
                  <option value="60">60 Minutes</option>
                </select>
              </div>
            </div>

            <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg text-xs">
              Save Global Configurations
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: API Keys & CRM Integrations */}
      {activeTab === "API Keys & CRM Integrations" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 max-w-3xl space-y-6 shadow-xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Key size={18} className="text-purple-400" />
              API Secret Keys & CRM Webhook Tokens
            </h2>
            <button
              onClick={() => setShowApiSecrets(!showApiSecrets)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800"
            >
              {showApiSecrets ? <EyeOff size={14} /> : <Eye size={14} />}
              {showApiSecrets ? "Hide Secret Keys" : "Reveal Secret Keys"}
            </button>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Salesforce CRM API Key</label>
              <input
                type={showApiSecrets ? "text" : "password"}
                value={apiKeys.salesforceApiKey}
                onChange={(e) => setApiKeys({ ...apiKeys, salesforceApiKey: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">HubSpot ERP Secret Key</label>
              <input
                type={showApiSecrets ? "text" : "password"}
                value={apiKeys.hubspotApiKey}
                onChange={(e) => setApiKeys({ ...apiKeys, hubspotApiKey: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Razorpay Payment Gateway Key ID</label>
              <input
                type={showApiSecrets ? "text" : "password"}
                value={apiKeys.razorpayKeyId}
                onChange={(e) => setApiKeys({ ...apiKeys, razorpayKeyId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <button type="submit" className="px-5 py-2 bg-purple-600 text-white font-bold rounded-lg text-xs">
              Update API Secret Credentials
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: Security & MFA Enforcement */}
      {activeTab === "Security & MFA Enforcement" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 max-w-3xl space-y-6 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Lock size={18} className="text-emerald-400" />
            Security & Mandatory MFA Enforcement Policies
          </h2>

          <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-200">Mandatory MFA for Admin & Rep Staff</p>
                  <p className="text-[11px] text-slate-500">Require Authenticator app OTP on every login</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSecurityPolicy({ ...securityPolicy, mandatoryMfaAdmins: !securityPolicy.mandatoryMfaAdmins })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${securityPolicy.mandatoryMfaAdmins ? "bg-emerald-600" : "bg-slate-800"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${securityPolicy.mandatoryMfaAdmins ? "translate-x-6" : ""}`} />
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-200">Mandatory MFA for Institutional Lenders</p>
                  <p className="text-[11px] text-slate-500">Enforce OTP verification for high-value bids</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSecurityPolicy({ ...securityPolicy, mandatoryMfaLenders: !securityPolicy.mandatoryMfaLenders })}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${securityPolicy.mandatoryMfaLenders ? "bg-emerald-600" : "bg-slate-800"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${securityPolicy.mandatoryMfaLenders ? "translate-x-6" : ""}`} />
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-200">Minimum Password Length Requirement</label>
                <span className="font-mono text-emerald-400 font-bold">{securityPolicy.minPasswordLength} Characters</span>
              </div>
              <input
                type="range"
                min="8"
                max="16"
                value={securityPolicy.minPasswordLength}
                onChange={(e) => setSecurityPolicy({ ...securityPolicy, minPasswordLength: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Admin Portal Whitelisted IP Addresses (Comma Separated)</label>
              <input
                type="text"
                value={securityPolicy.ipWhitelist}
                onChange={(e) => setSecurityPolicy({ ...securityPolicy, ipWhitelist: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-lg text-xs">
              Apply Security Policies
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: Email SMTP & Gateways */}
      {activeTab === "Email SMTP & Gateways" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 max-w-3xl space-y-6 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Mail size={18} className="text-amber-400" />
            SMTP Email Server & SMS Gateway Configuration
          </h2>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">SMTP Host Server</label>
                <input
                  type="text"
                  value={smtpConfig.smtpHost}
                  onChange={(e) => setSmtpConfig({ ...smtpConfig, smtpHost: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-xs text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">SMTP Port</label>
                <input
                  type="text"
                  value={smtpConfig.smtpPort}
                  onChange={(e) => setSmtpConfig({ ...smtpConfig, smtpPort: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-xs text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Sender Email Address</label>
              <input
                type="email"
                value={smtpConfig.senderEmail}
                onChange={(e) => setSmtpConfig({ ...smtpConfig, senderEmail: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <button type="submit" className="px-5 py-2 bg-amber-600 text-white font-bold rounded-lg text-xs">
              Save SMTP Configurations
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
