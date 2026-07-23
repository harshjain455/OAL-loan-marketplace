import React, { useState } from "react";
import { Share2, Copy, Check, Users, Gift, TrendingUp, Award } from "lucide-react";

export default function BorrowerReferral() {
  const [copied, setCopied] = useState(false);
  const referralCode = "REF_BORROWER_9812";
  const referralLink = `https://oalnetwork.com/apply?ref=${referralCode}`;

  const referralStats = {
    totalInvited: 12,
    successfulApplications: 4,
    pendingVerifications: 3,
    earnedRewards: "$450 USD"
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Referral & Rewards Program</h1>
        <p className="text-sm text-slate-400">Invite colleagues or businesses to apply for loans on OAL Network and earn cashback rewards.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
          <span className="text-slate-400 text-xs font-medium block">Total Invited</span>
          <span className="text-2xl font-black text-white">{referralStats.totalInvited}</span>
          <span className="text-[10px] text-slate-500 block">Invites Sent</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
          <span className="text-slate-400 text-xs font-medium block">Successful Applications</span>
          <span className="text-2xl font-black text-emerald-400">{referralStats.successfulApplications}</span>
          <span className="text-[10px] text-slate-500 block">Loans Approved</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
          <span className="text-slate-400 text-xs font-medium block">Pending KYC Check</span>
          <span className="text-2xl font-black text-amber-400">{referralStats.pendingVerifications}</span>
          <span className="text-[10px] text-slate-500 block">Under Review</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
          <span className="text-slate-400 text-xs font-medium block">Earned Rewards</span>
          <span className="text-2xl font-black text-indigo-400">{referralStats.earnedRewards}</span>
          <span className="text-[10px] text-slate-500 block">Cash Credit</span>
        </div>
      </div>

      {/* Referral Link Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Share2 size={18} className="text-indigo-400" />
          Your Unique Referral Link
        </h2>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 bg-slate-950 border border-slate-850 rounded-lg px-4 py-3 text-xs font-mono text-indigo-300 break-all select-all flex items-center">
            {referralLink}
          </div>
          <button
            onClick={copyToClipboard}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 shrink-0"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Link Copied!" : "Copy Referral Link"}
          </button>
        </div>

        <p className="text-xs text-slate-400 pt-1">
          💡 Share this link via Email, WhatsApp, or Social Media. Receive a $100 platform reward when your referee completes their first loan funding.
        </p>
      </div>
    </div>
  );
}
