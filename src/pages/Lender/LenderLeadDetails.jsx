import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Award, Briefcase, MessageSquare, CheckCircle2, TrendingUp, DollarSign, X, Send } from "lucide-react";

export default function LenderLeadDetails() {
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get("id") || "OAL-9842";

  // Modal States
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isRepModalOpen, setIsRepModalOpen] = useState(false);

  // Form States
  const [offerAmount, setOfferAmount] = useState("");
  const [offerRate, setOfferRate] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 5000);
  };
  const [offerDuration, setOfferDuration] = useState("24");
  const [repNote, setRepNote] = useState("");

  // Open offer modal — always with a fresh form
  const openOfferModal = () => {
    setOfferAmount("");
    setOfferRate("");
    setOfferDuration("24");
    setOfferSubmitted(false);
    setIsOfferModalOpen(true);
  };

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

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    if (!offerAmount || !offerRate || !offerDuration) {
      showToast("Please fill in all offer terms");
      return;
    }
    setOfferSubmitted(true);
    showToast(`Offer successfully submitted for Lead ${leadDetails.id}!\nAmount: $${Number(offerAmount).toLocaleString()}\nInterest Rate: ${offerRate}%\nDuration: ${offerDuration} Months`);
    setTimeout(() => setIsOfferModalOpen(false), 1500);
  };

  const handleSendRepMessage = (e) => {
    e.preventDefault();
    if (!repNote) {
      showToast("Please enter a note for the OAL Representative.");
      return;
    }
    showToast(`Message successfully dispatched to assigned OAL Representative regarding Lead ${leadDetails.id}!\nMessage: "${repNote}"`);
    setRepNote("");
    setIsRepModalOpen(false);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in w-full">
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
          <button
            onClick={openOfferModal}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors shadow cursor-pointer"
          >
            <Briefcase size={15} />
            Submit Offer
          </button>
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
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-850 pb-3">
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
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-850 pb-3">
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
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-slate-850 pb-3">
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
          <button
            onClick={() => setIsRepModalOpen(true)}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors cursor-pointer"
          >
            <MessageSquare size={16} />
            Ask OAL Rep
          </button>

          <button
            onClick={openOfferModal}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-lg cursor-pointer"
          >
            <Briefcase size={16} />
            Make Offer Now
          </button>
        </div>
      </div>

      {/* SUBMIT OFFER MODAL */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-[2px] animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden flex flex-col">
            <div className="flex justify-between items-start border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
                    <Briefcase size={16} />
                  </div>
                  Submit Bid Offer
                </h3>
                <p className="text-xs text-slate-400 mt-1">Deploy custom terms directly to Lead {leadDetails.id}</p>
              </div>
              <button
                onClick={() => setIsOfferModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitOffer} className="space-y-4 py-5">
              {offerSubmitted ? (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 size={28} className="text-emerald-400" />
                  </div>
                  <p className="text-sm font-bold text-white">Offer Successfully Submitted!</p>
                  <p className="text-xs text-slate-400">Your bid has been forwarded to the OAL Agent waiting room for Lead {leadDetails.id}.</p>
                </div>
              ) : (
                <>
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">Target Lead</label>
                <input
                  type="text"
                  value={leadDetails.id}
                  disabled
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-400 text-xs font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">Offer Amount ($)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">$</span>
                  <input
                    type="number"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    required
                    placeholder="e.g. 75000"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-8 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={offerRate}
                    onChange={(e) => setOfferRate(e.target.value)}
                    required
                    placeholder="e.g. 7.2"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">Duration (Months)</label>
                  <input
                    type="number"
                    value={offerDuration}
                    onChange={(e) => setOfferDuration(e.target.value)}
                    required
                    placeholder="e.g. 24"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 text-[10px] text-slate-450 flex items-start gap-2">
                <ShieldCheck size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                <span>Terms will be forwarded to OAL Agent waiting room. Lender maintains exclusive offer control.</span>
              </div>

              <div className="border-t border-slate-800/80 pt-4 flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer text-xs font-semibold"
                >
                  Forward Offer
                </button>
              </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ASK OAL REP MODAL */}
      {isRepModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-[2px] animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden flex flex-col">
            <div className="flex justify-between items-start border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <div className="p-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg">
                    <MessageSquare size={16} />
                  </div>
                  Ask OAL Representative
                </h3>
                <p className="text-xs text-slate-400 mt-1">Send a direct query regarding Lead {leadDetails.id}</p>
              </div>
              <button
                onClick={() => setIsRepModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSendRepMessage} className="space-y-4 py-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">Target Lead Reference</label>
                <input
                  type="text"
                  value={`${leadDetails.id} (${leadDetails.purpose} - ${leadDetails.amount})`}
                  disabled
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-400 text-xs font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5">Your Question / Note to Agent</label>
                <textarea
                  value={repNote}
                  onChange={(e) => setRepNote(e.target.value)}
                  rows={4}
                  required
                  placeholder="e.g. Please clarify if the borrower can provide audited financials for 2025..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none"
                ></textarea>
              </div>

              <div className="border-t border-slate-800/80 pt-4 flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsRepModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5"
                >
                  <Send size={14} />
                  Send Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-emerald-500 text-slate-100 p-4 rounded-xl shadow-2xl flex items-start gap-2 z-50 text-xs animate-bounce max-w-sm whitespace-pre-line">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
