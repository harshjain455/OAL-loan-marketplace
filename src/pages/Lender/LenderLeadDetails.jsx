import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Award, Briefcase, MessageSquare, Heart, CheckCircle2, TrendingUp, DollarSign, Calendar } from "lucide-react";

export default function LenderLeadDetails() {
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get("id") || "OAL-9842";

  // Mock lead database lookup
  const leadDetails = {
    id: leadId,
    amount: "$75,000",
    purpose: "Commercial Real Estate",
    term: "24 Months",
    targetRate: "6.5% - 8.0%",
    invIqScore: 94,
    riskRating: "Low Risk",
    creditGrade: "AA+",
    debtToIncome: "22%",
    annualRevenue: "$650,000",
    kycDocuments: [
      { name: "Government Identity Verification", status: "Verified" },
      { name: "Bank Statements (Last 12 Months)", status: "Verified" },
      { name: "Tax Filings & Audit Logs", status: "Verified" },
      { name: "Business Registration Certificate", status: "Verified" }
    ],
    matchedCriteria: [
      "Minimum iNV IQ score threshold met (>80)",
      "Loan amount within lender's allocation limit ($100k max)",
      "Preferred industry sector matched"
    ]
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in max-w-5xl">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/lender/qualified-leads"
          className="inline-flex items-center text-xs font-medium text-slate-400 hover:text-white gap-2 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Qualified Leads
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to={`/lender/offers?leadId=${leadDetails.id}`}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors shadow"
          >
            <Briefcase size={15} />
            Submit Offer
          </Link>
        </div>
      </div>

      {/* Main Profile Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">{leadDetails.id}</h1>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
              <ShieldCheck size={14} />
              Identity Anonymous & Protected
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Target Purpose: <span className="text-slate-200 font-medium">{leadDetails.purpose}</span> • Term: <span className="text-slate-200 font-medium">{leadDetails.term}</span>
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-center gap-4 min-w-[220px]">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
            <Award size={28} />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">iNV IQ Rating</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">{leadDetails.invIqScore}</span>
              <span className="text-xs text-emerald-400 font-semibold">{leadDetails.riskRating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Loan Overview */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-850 pb-3">
            <DollarSign size={16} className="text-emerald-400" />
            Loan Details
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-850">
              <span className="text-slate-400">Requested Amount</span>
              <span className="font-bold text-white text-sm">{leadDetails.amount}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-850">
              <span className="text-slate-400">Target Duration</span>
              <span className="font-semibold text-slate-200">{leadDetails.term}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-850">
              <span className="text-slate-400">Expected Interest Range</span>
              <span className="font-semibold text-indigo-400">{leadDetails.targetRate}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Primary Purpose</span>
              <span className="font-semibold text-slate-200">{leadDetails.purpose}</span>
            </div>
          </div>
        </div>

        {/* Card 2: AI Financial Breakdown */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-850 pb-3">
            <TrendingUp size={16} className="text-indigo-400" />
            Financial Risk Index
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-850">
              <span className="text-slate-400">Credit Score Grade</span>
              <span className="font-bold text-emerald-400">{leadDetails.creditGrade}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-850">
              <span className="text-slate-400">Debt-to-Income (DTI)</span>
              <span className="font-semibold text-slate-200">{leadDetails.debtToIncome}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-850">
              <span className="text-slate-400">Annual Business Revenue</span>
              <span className="font-semibold text-slate-200">{leadDetails.annualRevenue}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Overall Qualification</span>
              <span className="font-semibold text-emerald-400">Passed Pre-Screening</span>
            </div>
          </div>
        </div>

        {/* Card 3: Verification Checklist */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-850 pb-3">
            <ShieldCheck size={16} className="text-blue-400" />
            KYC Verification Center
          </h2>
          <div className="space-y-3 text-xs">
            {leadDetails.kycDocuments.map((doc, i) => (
              <div key={i} className="flex justify-between items-center py-1">
                <span className="text-slate-400 line-clamp-1">{doc.name}</span>
                <span className="text-[11px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Match Parameters & Action Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-sm font-bold text-white mb-2">Why this lead matched your profile:</h3>
          <ul className="space-y-1 text-xs text-slate-400">
            {leadDetails.matchedCriteria.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <Link
            to="/lender/communication"
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
          >
            <MessageSquare size={16} />
            Ask OAL Rep
          </Link>

          <Link
            to={`/lender/offers?leadId=${leadDetails.id}`}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-lg"
          >
            <Briefcase size={16} />
            Make Offer Now
          </Link>
        </div>
      </div>
    </div>
  );
}
