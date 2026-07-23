import React, { useState } from "react";
import { 
  Bell, Mail, MessageSquare, Send, Plus, Edit2, CheckCircle2, ShieldAlert, Zap, Globe, Eye, Filter, Trash2, X, Check, Save 
} from "lucide-react";

export default function AdminNotifications() {
  const [activeTab, setActiveTab] = useState("Global System Alerts");
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);

  // Broadcast Form State
  const [broadcastForm, setBroadcastForm] = useState({
    title: "",
    targetAudience: "All Users",
    priority: "Info",
    message: ""
  });

  // Global System Alerts / Announcements Data
  const [broadcasts, setBroadcasts] = useState([
    { id: "ALERT-901", title: "Scheduled Platform Maintenance", targetAudience: "All Users", priority: "Warning", date: "2026-01-20 02:00 PM", reach: "14,250 Users", status: "Broadcast Active" },
    { id: "ALERT-902", title: "New Commercial Lending Rates Released", targetAudience: "Lenders Only", priority: "Info", date: "2026-01-18 10:30 AM", reach: "850 Lenders", status: "Completed" },
    { id: "ALERT-903", title: "Urgent: Mandatory KYC Re-verification", targetAudience: "Borrowers Only", priority: "Critical Alert", date: "2026-01-15 04:45 PM", reach: "8,900 Borrowers", status: "Completed" }
  ]);

  // Automated Trigger Messages Data
  const [triggers, setTriggers] = useState([
    { id: "TRIG-01", event: "Account Approved", triggerName: "Account Approval Welcome Notice", emailActive: true, smsActive: true, inAppActive: true, lastUpdated: "2026-01-10" },
    { id: "TRIG-02", event: "KYC Rejected", triggerName: "KYC Document Resubmission Required", emailActive: true, smsActive: true, inAppActive: true, lastUpdated: "2026-01-12" },
    { id: "TRIG-03", event: "Loan Disbursement Complete", triggerName: "Loan Funds Disbursed Confirmation", emailActive: true, smsActive: true, inAppActive: false, lastUpdated: "2026-01-05" },
    { id: "TRIG-04", event: "Lender Approval", triggerName: "Lender Enterprise Access Activated", emailActive: true, smsActive: false, inAppActive: true, lastUpdated: "2025-12-28" }
  ]);

  // Email Templates Data
  const [emailTemplates, setEmailTemplates] = useState([
    { id: "TMPL-EM1", name: "Account Approved Notice", subject: "Welcome to OAL Loan Marketplace - Account Approved!", category: "Onboarding", body: "Hello {user_name},\n\nYour account has been successfully verified and approved. You now have full access to loan marketplace features.\n\nBest regards,\nOAL Admin Team", placeholders: ["{user_name}", "{role}"] },
    { id: "TMPL-EM2", name: "KYC Document Rejection", subject: "KYC Verification Action Required for {borrower_id}", category: "Verification", body: "Dear {user_name},\n\nYour submitted document '{document_name}' was rejected due to: {rejection_reason}.\n\nPlease re-upload a clear copy in your portal.", placeholders: ["{user_name}", "{document_name}", "{rejection_reason}"] },
    { id: "TMPL-EM3", name: "Loan Disbursement Confirmation", subject: "Funds Disbursed for Loan #{loan_id}", category: "Transactions", body: "Hi {user_name},\n\nGood news! Your loan amount of {amount} for Application #{loan_id} has been transferred to your registered bank account.", placeholders: ["{user_name}", "{loan_id}", "{amount}"] }
  ]);

  // SMS Templates Data
  const [smsTemplates, setSmsTemplates] = useState([
    { id: "TMPL-SMS1", name: "Account Approved SMS", senderId: "OALNOT", body: "OAL Loan Marketplace: Dear {user_name}, your account is APPROVED. Log in at oal-marketplace.com", placeholders: ["{user_name}"] },
    { id: "TMPL-SMS2", name: "OTP Security Code", senderId: "OALAUTH", body: "Your OAL verification OTP is {otp_code}. Valid for 5 minutes. Do not share.", placeholders: ["{otp_code}"] },
    { id: "TMPL-SMS3", name: "Loan Funded SMS Alert", senderId: "OALLOAN", body: "OAL Alert: Loan #{loan_id} has been fully funded by lenders! Check portal details.", placeholders: ["{loan_id}"] }
  ]);

  // Dispatch New Broadcast Handler
  const handleDispatchBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastForm.title || !broadcastForm.message) return;

    const newBroadcast = {
      id: `ALERT-${900 + broadcasts.length + 1}`,
      title: broadcastForm.title,
      targetAudience: broadcastForm.targetAudience,
      priority: broadcastForm.priority,
      date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      reach: broadcastForm.targetAudience === "All Users" ? "14,500 Users" : broadcastForm.targetAudience === "Borrowers Only" ? "9,200 Borrowers" : "890 Lenders",
      status: "Broadcast Active"
    };

    setBroadcasts([newBroadcast, ...broadcasts]);
    setShowBroadcastModal(false);
    setBroadcastForm({ title: "", targetAudience: "All Users", priority: "Info", message: "" });
  };

  // Toggle Trigger Channel Handler
  const handleToggleTriggerChannel = (triggerId, channel) => {
    setTriggers(prev => prev.map(t => {
      if (t.id === triggerId) {
        return { ...t, [channel]: !t[channel] };
      }
      return t;
    }));
  };

  // Save Template Handler
  const handleSaveTemplate = (e) => {
    e.preventDefault();
    if (!editingTemplate) return;

    if (editingTemplate.type === "email") {
      setEmailTemplates(prev => prev.map(t => t.id === editingTemplate.data.id ? editingTemplate.data : t));
    } else if (editingTemplate.type === "sms") {
      setSmsTemplates(prev => prev.map(t => t.id === editingTemplate.data.id ? editingTemplate.data : t));
    }

    setEditingTemplate(null);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Header & Global Dispatch Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Notifications & Dispatch Center
            <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full font-mono flex items-center gap-1">
              <Zap size={12} />
              Multi-Channel Broadcast Active
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Manage platform-wide system alerts, email templates, SMS gateways, and automated trigger messages.</p>
        </div>

        <button
          onClick={() => setShowBroadcastModal(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
        >
          <Send size={16} />
          Dispatch Platform Announcement
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">System Templates</p>
            <p className="text-2xl font-bold text-white mt-1">{emailTemplates.length + smsTemplates.length}</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <Mail size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Dispatched Today</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">1,240</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <Send size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Global Announcements</p>
            <p className="text-2xl font-bold text-purple-400 mt-1">{broadcasts.length}</p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
            <Globe size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Delivery Success Rate</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">99.4%</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs overflow-x-auto">
        {["Global System Alerts", "Automated Trigger Messages", "Email Templates", "SMS Templates"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB 1: Global System Alerts (Broadcast Announcements) */}
      {activeTab === "Global System Alerts" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe size={20} className="text-purple-400" />
                Global Platform Announcements History
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Track and audit broadcast alerts dispatched across all user dashboards.</p>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-semibold">Announcement Title & Ref</th>
                  <th className="px-6 py-4 font-semibold">Target Audience</th>
                  <th className="px-6 py-4 font-semibold">Priority Level</th>
                  <th className="px-6 py-4 font-semibold">Dispatch Date</th>
                  <th className="px-6 py-4 font-semibold">Estimated Reach</th>
                  <th className="px-6 py-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {broadcasts.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-100 text-xs">{item.title}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{item.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-300">
                      {item.targetAudience}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                        item.priority === "Critical Alert"
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : item.priority === "Warning"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400 font-mono">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-200">
                      {item.reach}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        <CheckCircle2 size={12} />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Automated Trigger Messages */}
      {activeTab === "Automated Trigger Messages" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap size={20} className="text-amber-400" />
              Automated Event Trigger Configurations
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Toggle notification channels (Email, SMS, In-App) for automatic system events (e.g. Account Approved).</p>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-semibold">System Event</th>
                  <th className="px-6 py-4 font-semibold">Trigger Notice Name</th>
                  <th className="px-6 py-4 font-semibold text-center">Email Channel</th>
                  <th className="px-6 py-4 font-semibold text-center">SMS Channel</th>
                  <th className="px-6 py-4 font-semibold text-center">In-App Alert</th>
                  <th className="px-6 py-4 font-semibold text-right">Last Modified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {triggers.map((trig) => (
                  <tr key={trig.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-md text-xs font-mono font-bold">
                        {trig.event}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-200">
                      {trig.triggerName}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={trig.emailActive}
                        onChange={() => handleToggleTriggerChannel(trig.id, "emailActive")}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-0 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={trig.smsActive}
                        onChange={() => handleToggleTriggerChannel(trig.id, "smsActive")}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-0 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={trig.inAppActive}
                        onChange={() => handleToggleTriggerChannel(trig.id, "inAppActive")}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-0 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4 text-right text-xs text-slate-400 font-mono">
                      {trig.lastUpdated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Email Templates */}
      {activeTab === "Email Templates" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {emailTemplates.map((tmpl) => (
            <div key={tmpl.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">{tmpl.category}</span>
                  <button
                    onClick={() => setEditingTemplate({ type: "email", data: { ...tmpl } })}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                    title="Edit Email Template"
                  >
                    <Edit2 size={14} />
                  </button>
                </div>
                <h3 className="text-sm font-bold text-white">{tmpl.name}</h3>
                <p className="text-xs text-slate-400"><strong className="text-slate-500">Subject:</strong> {tmpl.subject}</p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300 font-mono whitespace-pre-line max-h-32 overflow-y-auto custom-scrollbar">
                  {tmpl.body}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-850">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Available Dynamic Tags:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {tmpl.placeholders.map(tag => (
                    <span key={tag} className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: SMS Templates */}
      {activeTab === "SMS Templates" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {smsTemplates.map((tmpl) => (
            <div key={tmpl.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Sender: {tmpl.senderId}</span>
                  <button
                    onClick={() => setEditingTemplate({ type: "sms", data: { ...tmpl } })}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                    title="Edit SMS Template"
                  >
                    <Edit2 size={14} />
                  </button>
                </div>
                <h3 className="text-sm font-bold text-white">{tmpl.name}</h3>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300 font-mono whitespace-pre-line">
                  {tmpl.body}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-850">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Available Dynamic Tags:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {tmpl.placeholders.map(tag => (
                    <span key={tag} className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dispatch Broadcast Announcement Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Send size={18} className="text-blue-400" />
                Dispatch Platform Announcement
              </h3>
              <button onClick={() => setShowBroadcastModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleDispatchBroadcast} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Announcement Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. System Maintenance Notice"
                  value={broadcastForm.title}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Target Audience</label>
                  <select
                    value={broadcastForm.targetAudience}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, targetAudience: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="All Users">All Users</option>
                    <option value="Borrowers Only">Borrowers Only</option>
                    <option value="Lenders Only">Lenders Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Priority Level</label>
                  <select
                    value={broadcastForm.priority}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, priority: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Info">Info</option>
                    <option value="Warning">Warning</option>
                    <option value="Critical Alert">Critical Alert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Announcement Message Body</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type full broadcast message..."
                  value={broadcastForm.message}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowBroadcastModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Send size={14} />
                  Broadcast Alert Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Template Modal */}
      {editingTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit2 size={18} className="text-blue-400" />
                Edit {editingTemplate.type === "email" ? "Email" : "SMS"} Template
              </h3>
              <button onClick={() => setEditingTemplate(null)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTemplate} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Template Name</label>
                <input
                  type="text"
                  required
                  value={editingTemplate.data.name}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, data: { ...editingTemplate.data, name: e.target.value } })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              {editingTemplate.type === "email" && (
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Email Subject Line</label>
                  <input
                    type="text"
                    required
                    value={editingTemplate.data.subject}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, data: { ...editingTemplate.data, subject: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Template Content</label>
                <textarea
                  rows={5}
                  required
                  value={editingTemplate.data.body}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, data: { ...editingTemplate.data, body: e.target.value } })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingTemplate(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Save size={14} />
                  Save Template Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
