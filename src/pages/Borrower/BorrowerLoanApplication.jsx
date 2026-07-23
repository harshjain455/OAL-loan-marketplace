import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, Calendar, Target, FileText, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

export default function BorrowerLoanApplication() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    loanAmount: "75000",
    loanDuration: "24",
    loanPurpose: "Business Expansion",
    monthlyIncome: "15000",
    existingDebt: "2500",
    employmentType: "Self-Employed / Business Owner",
    notes: ""
  });
  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Application Submitted Successfully! Proceeding to Document Upload.");
    setTimeout(() => {
      navigate("/borrower/documents");
    }, 1500);
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Loan Application</h1>
        <p className="text-sm text-slate-400">Complete your loan details to initiate AI scoring and matching with verified lenders.</p>
      </div>

      {/* Progress Steps Header */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? "text-indigo-400" : "text-slate-500"}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"}`}>1</span>
          Loan Amount & Term
        </div>
        <div className="h-0.5 flex-1 bg-slate-800 mx-4">
          <div className={`h-full bg-indigo-500 transition-all ${step >= 2 ? "w-full" : "w-0"}`}></div>
        </div>
        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? "text-indigo-400" : "text-slate-500"}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"}`}>2</span>
          Purpose & Financials
        </div>
        <div className="h-0.5 flex-1 bg-slate-800 mx-4">
          <div className={`h-full bg-indigo-500 transition-all ${step >= 3 ? "w-full" : "w-0"}`}></div>
        </div>
        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 3 ? "text-indigo-400" : "text-slate-500"}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 3 ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"}`}>3</span>
          Review & Submit
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <DollarSign size={18} className="text-indigo-400" />
              Step 1: Loan Amount & Term Specifications
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Requested Loan Amount ($ USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-500 font-bold">$</span>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-4 py-2.5 text-sm text-slate-100 font-semibold focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. 50000"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Specify total capital needed from matching lenders.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Preferred Repayment Term (Months)</label>
              <select
                name="loanDuration"
                value={formData.loanDuration}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 font-semibold focus:outline-none focus:border-indigo-500"
              >
                <option value="6">6 Months</option>
                <option value="12">12 Months (1 Year)</option>
                <option value="24">24 Months (2 Years)</option>
                <option value="36">36 Months (3 Years)</option>
                <option value="48">48 Months (4 Years)</option>
                <option value="60">60 Months (5 Years)</option>
              </select>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-slate-850 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Estimated Interest Rate Range:</span>
                <span className="text-emerald-400 font-bold">6.5% - 8.2%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Estimated Monthly Payment:</span>
                <span className="text-white font-bold">${Math.round((parseInt(formData.loanAmount || 0) * 1.07) / parseInt(formData.loanDuration || 1))} / mo</span>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                Next Step <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Target size={18} className="text-indigo-400" />
              Step 2: Purpose & Financial Profile
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Loan Purpose</label>
              <select
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 font-semibold focus:outline-none focus:border-indigo-500"
              >
                <option value="Business Expansion">Business Expansion & Capital Growth</option>
                <option value="Working Capital">Working Capital & Payroll</option>
                <option value="Debt Consolidation">Debt Consolidation</option>
                <option value="Equipment Purchase">Equipment / Asset Purchase</option>
                <option value="Real Estate Investment">Real Estate Investment</option>
                <option value="Personal / Other">Personal / Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Monthly Gross Revenue / Income ($)</label>
                <input
                  type="number"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 font-semibold focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Current Monthly Debt Payments ($)</label>
                <input
                  type="number"
                  name="existingDebt"
                  value={formData.existingDebt}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 font-semibold focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Employment / Business Structure</label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 font-semibold focus:outline-none focus:border-indigo-500"
              >
                <option value="Self-Employed / Business Owner">Self-Employed / Business Owner</option>
                <option value="Full-time Employed">Full-time Employed</option>
                <option value="Corporation / LLC">Corporation / LLC Partnership</option>
                <option value="Investor">Verified Investor / Developer</option>
              </select>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                Review Application <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400" />
              Step 3: Summary & Application Submission
            </h2>

            <div className="p-5 bg-slate-950 rounded-xl border border-slate-850 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-slate-500 block">Requested Amount</span>
                  <span className="text-base font-extrabold text-white">${parseInt(formData.loanAmount).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Duration</span>
                  <span className="text-base font-bold text-slate-200">{formData.loanDuration} Months</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-slate-500 block">Loan Purpose</span>
                  <span className="font-semibold text-indigo-400">{formData.loanPurpose}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Monthly Income</span>
                  <span className="font-semibold text-slate-200">${parseInt(formData.monthlyIncome).toLocaleString()} / mo</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 block mb-1">Additional Notes for OAL Representative (Optional)</span>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  placeholder="Provide any context or notes regarding your loan request..."
                />
              </div>
            </div>

            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-xs text-indigo-300">
              ℹ️ Upon submission, your request will be reviewed by your assigned OAL Rep and analyzed by our AI Borrower Scoring system.
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={16} /> Edit Details
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
              >
                Submit Loan Application
              </button>
            </div>
          </div>
        )}
      </form>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-emerald-500 text-slate-100 p-4 rounded-xl shadow-2xl flex items-start gap-2 z-50 text-xs animate-bounce max-w-sm whitespace-pre-line">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
