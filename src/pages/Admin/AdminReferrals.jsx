import React, { useState } from "react";
import { 
  Share2, Link2, DollarSign, RefreshCw, CheckCircle2, Copy, ExternalLink, ShieldCheck, Database, Layers, Check, X, Search, Filter, ArrowUpRight, Zap 
} from "lucide-react";

export default function AdminReferrals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [copiedLink, setCopiedLink] = useState("");
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [syncingCrm, setSyncingCrm] = useState(null);

  // CRM/ERP Integrations Data
  const [crmIntegrations, setCrmIntegrations] = useState([
    { id: "CRM-01", name: "Salesforce CRM", type: "Enterprise CRM", status: "Connected", lastSync: "2 mins ago", syncMode: "Real-time Webhook", apiKey: "pk_live_sf_901928374" },
    { id: "CRM-02", name: "HubSpot ERP", type: "Marketing & Leads", status: "Connected", lastSync: "15 mins ago", syncMode: "Hourly Sync", apiKey: "pk_live_hs_102938475" },
    { id: "CRM-03", name: "Zoho CRM", type: "Partner Network", status: "Connected", lastSync: "1 hour ago", syncMode: "Real-time Webhook", apiKey: "pk_live_zh_564738291" }
  ]);

  // Affiliate Network & Referral Tracking Data
  const [affiliates, setAffiliates] = useState([
    {
      id: "AFF-801",
      partnerName: "FinTech Direct Network",
      contactEmail: "affiliates@fintechdirect.in",
      refCode: "FINDIRECT2026",
      refUrl: "https://oaloan.com/ref/FINDIRECT2026",
      referralsCount: 420,
      fundedLoansCount: 84,
      totalVolume: "₹2.1 Cr",
      totalCommission: "₹6,30,000",
      pendingPayout: "₹1,25,000",
      payoutStatus: "Pending Payout",
      crmConnected: "Salesforce CRM",
      joinedDate: "2025-10-12"
    },
    {
      id: "AFF-802",
      partnerName: "Capital Connect Brokers",
      contactEmail: "partners@capconnect.com",
      refCode: "CAPITALCON",
      refUrl: "https://oaloan.com/ref/CAPITALCON",
      referralsCount: 290,
      fundedLoansCount: 62,
      totalVolume: "₹1.4 Cr",
      totalCommission: "₹4,20,000",
      pendingPayout: "₹0",
      payoutStatus: "Paid Out",
      crmConnected: "HubSpot ERP",
      joinedDate: "2025-11-05"
    },
    {
      id: "AFF-803",
      partnerName: "SmartMoney Advisors",
      contactEmail: "refer@smartmoney.io",
      refCode: "SMARTLOAN",
      refUrl: "https://oaloan.com/ref/SMARTLOAN",
      referralsCount: 185,
      fundedLoansCount: 39,
      totalVolume: "₹85,00,000",
      totalCommission: "₹2,55,000",
      pendingPayout: "₹75,000",
      payoutStatus: "Pending Payout",
      crmConnected: "Zoho CRM",
      joinedDate: "2025-12-01"
    },
    {
      id: "AFF-804",
      partnerName: "Urban Wealth Consultants",
      contactEmail: "admin@urbanwealth.in",
      refCode: "URBANWEALTH",
      refUrl: "https://oaloan.com/ref/URBANWEALTH",
      referralsCount: 95,
      fundedLoansCount: 18,
      totalVolume: "₹45,00,000",
      totalCommission: "₹1,35,000",
      pendingPayout: "₹0",
      payoutStatus: "Paid Out",
      crmConnected: "Salesforce CRM",
      joinedDate: "2026-01-02"
    }
  ]);

  // Copy Referral Link Handler
  const handleCopyLink = (url, code) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(code);
    setTimeout(() => setCopiedLink(""), 2500);
  };

  // Sync CRM Handler
  const handleSyncCrm = (crmName) => {
    setSyncingCrm(crmName);
    setTimeout(() => {
      setSyncingCrm(null);
    }, 1500);
  };

  // Release Payout Handler
  const handleReleasePayout = (affId) => {
    setAffiliates(prev => prev.map(aff => {
      if (aff.id === affId) {
        return {
          ...aff,
          pendingPayout: "₹0",
          payoutStatus: "Paid Out"
        };
      }
      return aff;
    }));
    setSelectedPayout(null);
  };

  // Filtered Affiliates
  const filteredAffiliates = affiliates.filter(aff => {
    const matchesSearch = aff.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          aff.refCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          aff.contactEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || aff.payoutStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Referrals & Affiliate Network
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-mono flex items-center gap-1">
              <Zap size={12} />
              CRM / ERP Bridge Connected
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Manage affiliate tracking, referral links, commission stats, and 3rd party CRM/ERP integration payouts.</p>
        </div>

        <div className="flex items-center gap-2">
          {crmIntegrations.map(crm => (
            <button
              key={crm.id}
              onClick={() => handleSyncCrm(crm.name)}
              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors"
              title={`Trigger manual sync with ${crm.name}`}
            >
              <RefreshCw size={12} className={`text-blue-400 ${syncingCrm === crm.name ? "animate-spin" : ""}`} />
              {crm.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Active Affiliates</p>
            <p className="text-2xl font-bold text-white mt-1">{affiliates.length}</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <Share2 size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Referrals Generated</p>
            <p className="text-2xl font-bold text-purple-400 mt-1">990</p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
            <Link2 size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Commission Paid</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">₹14.4 Lakh</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">CRM Webhook Sync</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">100% Active</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <Database size={20} />
          </div>
        </div>
      </div>

      {/* 3rd Party CRM / ERP Integration Status Panel */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Database size={20} className="text-blue-400" />
              3rd Party CRM / ERP Integration Gateways
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Automated lead mapping, affiliate commission calculations, and ERP sync pipelines.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {crmIntegrations.map((crm) => (
            <div key={crm.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">{crm.type}</span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle2 size={10} />
                  {crm.status}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{crm.name}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Sync Mode: {crm.syncMode}</p>
              </div>
              <div className="pt-2 border-t border-slate-850 flex justify-between items-center text-xs">
                <span className="text-[11px] text-slate-400">Last Sync: {crm.lastSync}</span>
                <button
                  onClick={() => handleSyncCrm(crm.name)}
                  className="text-blue-400 hover:text-white text-xs font-semibold flex items-center gap-1"
                >
                  <RefreshCw size={12} className={syncingCrm === crm.name ? "animate-spin" : ""} />
                  Sync Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Affiliate Network Tracking & Payouts Console */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Share2 size={20} className="text-purple-400" />
              Affiliate Partners & Commission Ledger
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Track referral link performance, funded loan commissions, and release affiliate payouts.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search partner, code, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              {["All", "Pending Payout", "Paid Out"].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                    statusFilter === st ? "bg-blue-600 text-white font-medium" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Affiliate Partner</th>
                <th className="px-6 py-4 font-semibold">Referral Link Code</th>
                <th className="px-6 py-4 font-semibold">Conversions & Volume</th>
                <th className="px-6 py-4 font-semibold">Total Commission</th>
                <th className="px-6 py-4 font-semibold">Payout Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAffiliates.map((aff) => (
                <tr key={aff.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-slate-100 text-xs">{aff.partnerName}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{aff.id} • {aff.contactEmail}</p>
                      <p className="text-[10px] text-blue-400 mt-0.5">Mapped CRM: {aff.crmConnected}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {aff.refCode}
                      </span>
                      <button
                        onClick={() => handleCopyLink(aff.refUrl, aff.refCode)}
                        className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                      >
                        {copiedLink === aff.refCode ? (
                          <span className="text-emerald-400 flex items-center gap-1 font-bold"><Check size={12} /> Copied!</span>
                        ) : (
                          <span className="flex items-center gap-1"><Copy size={12} /> Copy Link</span>
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <div>
                      <p className="text-slate-200 font-medium">{aff.referralsCount} Clicks • <strong className="text-emerald-400">{aff.fundedLoansCount} Loans Funded</strong></p>
                      <p className="text-slate-500 text-[11px]">Total Volume: {aff.totalVolume}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono font-bold text-slate-200">
                    <div>
                      <p className="text-emerald-400">{aff.totalCommission}</p>
                      {aff.pendingPayout !== "₹0" && (
                        <p className="text-[11px] text-amber-400 font-normal">Pending: {aff.pendingPayout}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      aff.payoutStatus === "Pending Payout"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}>
                      <CheckCircle2 size={12} />
                      {aff.payoutStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {aff.payoutStatus === "Pending Payout" ? (
                      <button
                        onClick={() => setSelectedPayout(aff)}
                        className="px-3.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-medium rounded-lg transition-all inline-flex items-center gap-1.5"
                      >
                        <DollarSign size={14} />
                        Release Payout
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSyncCrm(aff.crmConnected)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors inline-flex items-center gap-1 border border-slate-700"
                      >
                        <RefreshCw size={12} />
                        Re-Sync CRM
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Release Payout Modal */}
      {selectedPayout && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign size={18} className="text-emerald-400" />
                Approve & Release Affiliate Payout
              </h3>
              <button onClick={() => setSelectedPayout(null)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <p className="text-slate-500">Affiliate Partner</p>
                <p className="font-bold text-base text-white">{selectedPayout.partnerName} ({selectedPayout.id})</p>
                <p className="text-slate-400">Mapped CRM: {selectedPayout.crmConnected}</p>
                <div className="pt-2 border-t border-slate-850 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Pending Commission Amount:</span>
                  <span className="text-base font-mono font-bold text-emerald-400">{selectedPayout.pendingPayout}</span>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-emerald-300 text-[11px]">
                ✓ Payout will be dispatched via connected CRM ERP integration and recorded in the audit ledger.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950">
              <button
                onClick={() => setSelectedPayout(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReleasePayout(selectedPayout.id)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <Check size={14} />
                Confirm & Disburse Payout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
