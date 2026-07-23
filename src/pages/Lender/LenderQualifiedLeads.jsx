import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Heart, Briefcase, Search, Filter, ShieldCheck, Award, ArrowUpRight } from "lucide-react";

export default function LenderQualifiedLeads() {
  const [savedLeads, setSavedLeads] = useState(["OAL-9842"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("All");

  const leads = [
    {
      id: "OAL-9842",
      score: 94,
      riskLevel: "Low Risk",
      amount: "$75,000",
      purpose: "Commercial Real Estate",
      term: "24 Months",
      matchRate: "96%",
      kycStatus: "Verified",
      dateAdded: "Today"
    },
    {
      id: "OAL-8843",
      score: 88,
      riskLevel: "Low Risk",
      amount: "$45,000",
      purpose: "Equipment Financing",
      term: "12 Months",
      matchRate: "92%",
      kycStatus: "Verified",
      dateAdded: "Yesterday"
    },
    {
      id: "OAL-7210",
      score: 82,
      riskLevel: "Moderate Risk",
      amount: "$120,000",
      purpose: "Working Capital",
      term: "36 Months",
      matchRate: "89%",
      kycStatus: "Verified",
      dateAdded: "2 days ago"
    },
    {
      id: "OAL-6501",
      score: 91,
      riskLevel: "Low Risk",
      amount: "$200,000",
      purpose: "Business Expansion",
      term: "48 Months",
      matchRate: "94%",
      kycStatus: "Verified",
      dateAdded: "3 days ago"
    },
    {
      id: "OAL-5912",
      score: 79,
      riskLevel: "Moderate Risk",
      amount: "$30,000",
      purpose: "Inventory Expansion",
      term: "12 Months",
      matchRate: "84%",
      kycStatus: "Verified",
      dateAdded: "3 days ago"
    }
  ];

  const toggleSave = (id) => {
    if (savedLeads.includes(id)) {
      setSavedLeads(savedLeads.filter((item) => item !== id));
    } else {
      setSavedLeads([...savedLeads, id]);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPurpose = purposeFilter === "All" || lead.purpose === purposeFilter;
    return matchesSearch && matchesPurpose;
  });

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Qualified Leads</h1>
          <p className="text-sm text-slate-400 mt-1">
            Pre-screened, anonymous borrower profiles matching your custom AI lending rules.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg text-xs text-indigo-400 font-medium">
          <ShieldCheck size={16} />
          Borrower Identity Protection Enabled
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search Lead ID or Purpose..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <Filter size={16} className="text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Purpose:</span>
          <select
            value={purposeFilter}
            onChange={(e) => setPurposeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Purposes</option>
            <option value="Commercial Real Estate">Commercial Real Estate</option>
            <option value="Equipment Financing">Equipment Financing</option>
            <option value="Working Capital">Working Capital</option>
            <option value="Business Expansion">Business Expansion</option>
            <option value="Inventory Expansion">Inventory Expansion</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Lead ID (Anonymous)</th>
                <th className="px-6 py-4 font-semibold">iNV IQ Score</th>
                <th className="px-6 py-4 font-semibold">Loan Requirement</th>
                <th className="px-6 py-4 font-semibold">Purpose & Term</th>
                <th className="px-6 py-4 font-semibold">AI Match Rate</th>
                <th className="px-6 py-4 font-semibold">KYC Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredLeads.map((lead) => {
                const isSaved = savedLeads.includes(lead.id);
                return (
                  <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {lead.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Award size={16} className="text-indigo-400" />
                        <span className="font-bold text-white text-sm">{lead.score}</span>
                        <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded font-medium ml-1">
                          {lead.riskLevel}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-100 text-sm">
                      {lead.amount}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-200">{lead.purpose}</div>
                      <div className="text-[11px] text-slate-500">{lead.term}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {lead.matchRate}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                        <ShieldCheck size={14} />
                        {lead.kycStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Bookmark/Save button */}
                        <button
                          onClick={() => toggleSave(lead.id)}
                          title={isSaved ? "Remove from Saved" : "Save Lead"}
                          className={`p-2 rounded-lg border transition-colors ${
                            isSaved
                              ? "bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:text-rose-400 hover:border-slate-700"
                          }`}
                        >
                          <Heart size={15} fill={isSaved ? "currentColor" : "none"} />
                        </button>

                        {/* View details */}
                        <Link
                          to={`/lender/lead-details?id=${lead.id}`}
                          className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                          title="View Details"
                        >
                          <Eye size={15} />
                        </Link>

                        {/* Submit offer */}
                        <Link
                          to={`/lender/offers?leadId=${lead.id}`}
                          className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-3 py-1.5 rounded-lg transition-colors shadow"
                        >
                          <Briefcase size={14} />
                          Offer
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500 text-sm">
                    No leads found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
