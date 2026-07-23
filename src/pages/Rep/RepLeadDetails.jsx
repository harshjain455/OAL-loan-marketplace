import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Mail, Phone, ShieldCheck, DollarSign, Calendar, TrendingUp, AlertTriangle } from "lucide-react";

export default function RepLeadDetails() {
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get("id") || "OAL-9842";

  // Mock lead database lookup
  const leadsDb = {
    "OAL-9842": {
      id: "OAL-9842",
      name: "John Doe",
      email: "johndoe@gmail.com",
      phone: "+1 (555) 019-2834",
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
        { name: "Tax Filings (Last 2 Years)", status: "Verified" },
        { name: "Business Registration Certificate", status: "Verified" }
      ],
      matchingActivity: "Matched with 3 Lenders in current billing cycle"
    },
    "OAL-1102": {
      id: "OAL-1102",
      name: "Sarah Jenkins",
      email: "sjenkins.biz@outlook.com",
      phone: "+1 (555) 041-9921",
      amount: "$300,000",
      purpose: "Business Expansion",
      term: "36 Months",
      targetRate: "7.0% - 8.5%",
      invIqScore: 88,
      riskRating: "Low-Medium Risk",
      creditGrade: "A",
      debtToIncome: "28%",
      annualRevenue: "$1,200,000",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" },
        { name: "Tax Filings (Last 2 Years)", status: "Verified" },
        { name: "Business Plan Document", status: "Verified" }
      ],
      matchingActivity: "Matched with 1 Lender"
    },
    "OAL-5593": {
      id: "OAL-5593",
      name: "David Vance",
      email: "david.vance@yahoo.com",
      phone: "+1 (555) 091-8832",
      amount: "$150,000",
      purpose: "Debt Consolidation",
      term: "60 Months",
      targetRate: "8.0% - 9.5%",
      invIqScore: 72,
      riskRating: "Medium Risk",
      creditGrade: "B+",
      debtToIncome: "38%",
      annualRevenue: "$210,000",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" },
        { name: "Tax Filings (Last 2 Years)", status: "Pending Review" }
      ],
      matchingActivity: "No current active matches"
    },
    "OAL-2291": {
      id: "OAL-2291",
      name: "Elena Rostova",
      email: "erostova@rostovacap.com",
      phone: "+1 (555) 077-3311",
      amount: "$500,000",
      purpose: "Equipment Financing",
      term: "48 Months",
      targetRate: "5.8% - 7.2%",
      invIqScore: 91,
      riskRating: "Low Risk",
      creditGrade: "AA",
      debtToIncome: "18%",
      annualRevenue: "$3,400,000",
      kycDocuments: [
        { name: "Government Identity Verification", status: "Verified" },
        { name: "Bank Statements (Last 12 Months)", status: "Verified" },
        { name: "Equipment Appraisal Report", status: "Verified" },
        { name: "Corporate Tax Return Docs", status: "Verified" }
      ],
      matchingActivity: "Matched with 5 Lenders"
    }
  };

  const lead = leadsDb[leadId] || leadsDb["OAL-9842"];

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in max-w-5xl">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/rep/qualified-leads"
          className="inline-flex items-center text-xs font-medium text-slate-400 hover:text-white gap-2 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Qualified Leads
        </Link>

        <Link
          to={`/rep/communication?borrowerId=${lead.id}`}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors shadow"
        >
          Open Chat
        </Link>
      </div>

      {/* Main Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-bold">{lead.id}</span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">{lead.name}</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
            <span className="flex items-center gap-1"><Mail size={12} /> {lead.email}</span>
            <span className="flex items-center gap-1"><Phone size={12} /> {lead.phone}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-850">
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block">AI InvIQ Score</span>
            <span className="text-xl font-bold text-emerald-400 flex items-center gap-1">
              <TrendingUp size={16} />
              {lead.invIqScore}
            </span>
          </div>
        </div>
      </div>

      {/* Detail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Loan Request Information */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-200 pb-2 border-b border-slate-800">Loan Application Details</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Requested Amount:</span>
              <span className="font-bold text-slate-200">{lead.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Purpose:</span>
              <span className="font-bold text-slate-200">{lead.purpose}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Term Length:</span>
              <span className="font-bold text-slate-200">{lead.term}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Target Rate:</span>
              <span className="font-bold text-slate-200">{lead.targetRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Risk Profile:</span>
              <span className="font-bold text-slate-200">{lead.riskRating}</span>
            </div>
          </div>
        </div>

        {/* Financial Assessment */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-200 pb-2 border-b border-slate-800">Financial Verification</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Annual Revenue:</span>
              <span className="font-bold text-slate-200">{lead.annualRevenue}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Debt-to-Income (DTI):</span>
              <span className="font-bold text-slate-200">{lead.debtToIncome}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Credit Rating:</span>
              <span className="font-bold text-slate-200">{lead.creditGrade}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">System Activity:</span>
              <span className="font-bold text-blue-400">{lead.matchingActivity}</span>
            </div>
          </div>
        </div>

        {/* Documents Verification List */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-200 pb-2 border-b border-slate-800">KYC & Document Checklist</h3>
          <div className="space-y-2.5">
            {lead.kycDocuments.map((doc, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="text-slate-400 line-clamp-1">{doc.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 ${
                  doc.status === "Verified" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                }`}>
                  {doc.status === "Verified" ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
