import React, { useState } from "react";
import { Share2, Copy, Check, Users, Gift, TrendingUp, Award, Sparkles, ShieldCheck, ExternalLink } from "lucide-react";

export default function BorrowerReferral() {
  const [copied, setCopied] = useState(false);
  const referralCode = "REF_BORROWER_9812";
  const referralLink = `https://oalnetwork.com/apply?ref=${referralCode}`;

  const referralStats = {
    totalInvited: 12,
    successfulApplications: 4,
    pendingVerifications: 3,
    earnedRewards: "$500 USD"
  };

  const referralLog = [
    { name: "Apex Financial Solutions", date: "2026-07-20", status: "Loan Funded", reward: "+$200 USD", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { name: "TechHorizon Innovations", date: "2026-07-18", status: "Loan Funded", reward: "+$300 USD", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { name: "Vanguard Logistics Inc", date: "2026-07-21", status: "KYC Under Review", reward: "Pending", badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    { name: "Nexus Global Ventures", date: "2026-07-22", status: "Application Submitted", reward: "Pending", badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 w-full max-w-7xl mx-auto pb-10 overflow-hidden">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-bold tracking-tight text-white">Referral & Rewards Program</h1>
            <span className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold rounded-full flex items-center gap-1">
              <Sparkles size={11} /> Wireframe Specs Compliant
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Invite businesses or colleagues to apply on OAL Network and earn cashback rewards upon loan funding.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-400 font-semibold shrink-0 self-start sm:self-auto">
          <Gift size={16} /> $100 - $300 Reward Per Invite
        </div>
      </div>

      {/* 2. Stats Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-md">
          <span className="text-slate-400 text-xs font-semibold block">Total Invites Sent</span>
          <span className="text-2xl font-black text-white">{referralStats.totalInvited}</span>
          <span className="text-[11px] text-slate-500 block font-medium">Tracking Conversions</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-md">
          <span className="text-slate-400 text-xs font-semibold block">Funded Applications</span>
          <span className="text-2xl font-black text-emerald-400">{referralStats.successfulApplications}</span>
          <span className="text-[11px] text-slate-500 block font-medium">Loans Disbursed</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-md">
          <span className="text-slate-400 text-xs font-semibold block">Pending KYC Checks</span>
          <span className="text-2xl font-black text-amber-400">{referralStats.pendingVerifications}</span>
          <span className="text-[11px] text-slate-500 block font-medium">Under Compliance Review</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-md">
          <span className="text-slate-400 text-xs font-semibold block">Total Earned Rewards</span>
          <span className="text-2xl font-black text-indigo-400">{referralStats.earnedRewards}</span>
          <span className="text-[11px] text-slate-500 block font-medium">Unlocked Cash Balance</span>
        </div>

      </div>

      {/* 3. Unique Referral Link Generator Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Share2 size={18} className="text-indigo-400" />
          Your Unique Referral Link & Code
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-xs font-mono text-indigo-300 break-all select-all flex items-center shadow-inner">
            {referralLink}
          </div>
          <button
            onClick={copyToClipboard}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30 shrink-0 cursor-pointer"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Link Copied!" : "Copy Referral Link"}
          </button>
        </div>

        <p className="text-xs text-slate-400 pt-1 leading-relaxed">
          💡 Share your unique referral link via Email, WhatsApp, or LinkedIn. When a business completes loan funding using your link, cashback rewards are credited directly to your account.
        </p>
      </div>

      {/* 4. Referral Conversion Log Directory */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Users size={17} className="text-indigo-400" />
            Referral Conversion History
          </h2>
          <span className="text-xs text-slate-400 font-semibold">{referralLog.length} Records</span>
        </div>

        <div className="space-y-3">
          {referralLog.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-950/70 border border-slate-850 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-800 transition-colors">
              <div>
                <h3 className="text-xs font-bold text-white">{item.name}</h3>
                <span className="text-[11px] text-slate-500">Referred on {item.date}</span>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                <span className={`px-3 py-1 border text-xs font-semibold rounded-full ${item.badge}`}>
                  {item.status}
                </span>
                <span className="text-xs font-black text-emerald-400 min-w-[80px] text-right">
                  {item.reward}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
