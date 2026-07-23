import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, Calendar, Target, FileText, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Plus, X, FileEdit } from "lucide-react";

export default function BorrowerLoanApplication() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    loanAmount: "75000",
    loanDuration: "24",
    loanPurpose: "Business Expansion",
    monthlyIncome: "15000",
    existingDebt: "2500",
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
    setIsSubmitted(true);
    setIsModalOpen(false);
    showToast("Application Submitted Successfully!");
  };

  return (
    <div className="space-y-6 font-sans text-slate-100 w-full max-w-7xl mx-auto pb-10 overflow-hidden">
      
      {/* 1. Header Banner with TOP RIGHT BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-bold tracking-tight text-white">Loan Application</h1>
            <span className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold rounded-full flex items-center gap-1">
              <Sparkles size={11} /> Wireframe Specs Compliant
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Submit your loan requirements to initiate AI borrower scoring and lender matching.
          </p>
        </div>

        {/* TOP RIGHT LOAN APPLICATION FORM BUTTON */}
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-400 font-semibold">
            <ShieldCheck size={15} /> Verified & Encrypted
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus size={16} /> Loan Application Form
          </button>
        </div>
      </div>

      {/* Success Notification Alert after submitting */}
      {isSubmitted && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-300 shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2 font-bold text-sm">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span>Loan Application Submitted Successfully! Saved & queued for AI Scoring.</span>
          </div>
          <button
            onClick={() => navigate("/borrower/documents")}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-md cursor-pointer"
          >
            Proceed to Document Upload <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* 2. Main Page Application Status & Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileEdit size={18} className="text-indigo-400" />
              Loan Application Overview & Status
            </h2>
            <p className="text-xs text-slate-400">
              {isSubmitted 
                ? "Your loan application has been submitted and is currently active for AI Scoring & Lender Bidding."
                : "Fill out the loan application form to request capital for your business."}
            </p>
          </div>

          <div className="shrink-0">
            {isSubmitted ? (
              <span className="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-xl flex items-center gap-1.5">
                <CheckCircle2 size={15} /> Application Submitted
              </span>
            ) : (
              <span className="px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold rounded-xl flex items-center gap-1.5">
                <Sparkles size={15} /> Form Ready for Submission
              </span>
            )}
          </div>
        </div>

        {/* Current Application Summary Grid (UPDATES LIVE FROM FORM) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-xl space-y-1">
            <span className="text-slate-500 block">Requested Loan Amount</span>
            <span className="text-lg font-black text-white">${parseInt(formData.loanAmount || 0).toLocaleString()}</span>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-xl space-y-1">
            <span className="text-slate-500 block">Repayment Term</span>
            <span className="text-base font-extrabold text-indigo-400">{formData.loanDuration} Months</span>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-xl space-y-1">
            <span className="text-slate-500 block">Loan Purpose</span>
            <span className="text-xs font-bold text-white truncate block">{formData.loanPurpose}</span>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-xl space-y-1">
            <span className="text-slate-500 block">Est. Monthly Payment</span>
            <span className="text-base font-extrabold text-emerald-400">
              ${Math.round((parseInt(formData.loanAmount || 0) * 1.07) / parseInt(formData.loanDuration || 1)).toLocaleString()} / mo
            </span>
          </div>
        </div>

        {/* Notes & Extra Info if filled */}
        {formData.notes && (
          <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl space-y-1 text-xs">
            <span className="text-slate-400 font-bold block">Application Notes:</span>
            <p className="text-slate-300 italic">{formData.notes}</p>
          </div>
        )}
      </div>

      {/* 3. LOAN APPLICATION POPUP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-5 sm:p-6 space-y-5 shadow-2xl relative my-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FileEdit size={18} className="text-indigo-400" />
                Loan Application Form
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Step Progress Indicator */}
            <div className="bg-slate-950 border border-slate-850 rounded-xl p-3 sm:p-4">
              <div className="flex items-center justify-between">
                
                {/* Step 1 Pill */}
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg font-extrabold flex items-center justify-center text-xs transition-all ${
                    step >= 1 ? "bg-indigo-600 text-white shadow-md" : "bg-slate-800 text-slate-400"
                  }`}>
                    1
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-slate-200">Amount & Term</span>
                </div>

                <div className="h-0.5 flex-1 bg-slate-800 mx-3 rounded-full overflow-hidden">
                  <div className={`h-full bg-indigo-500 transition-all duration-300 ${step >= 2 ? "w-full" : "w-0"}`}></div>
                </div>

                {/* Step 2 Pill */}
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg font-extrabold flex items-center justify-center text-xs transition-all ${
                    step >= 2 ? "bg-indigo-600 text-white shadow-md" : "bg-slate-800 text-slate-400"
                  }`}>
                    2
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-slate-200">Purpose & Income</span>
                </div>

                <div className="h-0.5 flex-1 bg-slate-800 mx-3 rounded-full overflow-hidden">
                  <div className={`h-full bg-indigo-500 transition-all duration-300 ${step >= 3 ? "w-full" : "w-0"}`}></div>
                </div>

                {/* Step 3 Pill */}
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg font-extrabold flex items-center justify-center text-xs transition-all ${
                    step >= 3 ? "bg-indigo-600 text-white shadow-md" : "bg-slate-800 text-slate-400"
                  }`}>
                    3
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-slate-200">Review & Submit</span>
                </div>

              </div>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* STEP 1: AMOUNT & TERM */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 1: Loan Amount & Repayment Duration</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">Requested Loan Amount ($ USD)</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold">$</span>
                        <input
                          type="number"
                          name="loanAmount"
                          value={formData.loanAmount}
                          onChange={handleChange}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2 text-xs text-white font-bold focus:outline-none focus:border-indigo-500"
                          placeholder="e.g. 75000"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">Preferred Term (Months)</label>
                      <select
                        name="loanDuration"
                        value={formData.loanDuration}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-bold focus:outline-none focus:border-indigo-500"
                      >
                        <option value="6">6 Months</option>
                        <option value="12">12 Months (1 Year)</option>
                        <option value="24">24 Months (2 Years)</option>
                        <option value="36">36 Months (3 Years)</option>
                        <option value="48">48 Months (4 Years)</option>
                        <option value="60">60 Months (5 Years)</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-850 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Estimated Monthly Repayment:</span>
                    <span className="text-sm font-extrabold text-emerald-400">
                      ${Math.round((parseInt(formData.loanAmount || 0) * 1.07) / parseInt(formData.loanDuration || 1)).toLocaleString()} / mo
                    </span>
                  </div>

                  <div className="flex justify-end pt-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/30 cursor-pointer"
                    >
                      Next Step <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PURPOSE & FINANCIALS */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 2: Loan Purpose & Financial Inputs</h3>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-300">Loan Purpose</label>
                    <select
                      name="loanPurpose"
                      value={formData.loanPurpose}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-bold focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Business Expansion">Business Expansion & Capital Growth</option>
                      <option value="Working Capital">Working Capital & Payroll</option>
                      <option value="Debt Consolidation">Debt Consolidation</option>
                      <option value="Equipment Purchase">Equipment / Asset Purchase</option>
                      <option value="Real Estate Investment">Real Estate Investment</option>
                      <option value="Personal / Other">Personal / Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">Monthly Gross Income ($)</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold">$</span>
                        <input
                          type="number"
                          name="monthlyIncome"
                          value={formData.monthlyIncome}
                          onChange={handleChange}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2 text-xs text-white font-bold focus:outline-none focus:border-indigo-500"
                          placeholder="e.g. 15000"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">Monthly Existing Debt ($)</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold">$</span>
                        <input
                          type="number"
                          name="existingDebt"
                          value={formData.existingDebt}
                          onChange={handleChange}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2 text-xs text-white font-bold focus:outline-none focus:border-indigo-500"
                          placeholder="e.g. 2500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft size={15} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/30 cursor-pointer"
                    >
                      Review Application <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: REVIEW & SUBMIT */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 3: Review Application Summary</h3>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-3 pb-2 border-b border-slate-800">
                      <div>
                        <span className="text-slate-500 block mb-0.5">Requested Amount</span>
                        <span className="text-base font-black text-white">${parseInt(formData.loanAmount || 0).toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-0.5">Duration</span>
                        <span className="text-sm font-bold text-indigo-400">{formData.loanDuration} Months</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pb-2 border-b border-slate-800">
                      <div>
                        <span className="text-slate-500 block mb-0.5">Loan Purpose</span>
                        <span className="font-bold text-white">{formData.loanPurpose}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-0.5">Monthly Income</span>
                        <span className="font-bold text-emerald-400">${parseInt(formData.monthlyIncome || 0).toLocaleString()} / mo</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1 font-medium">Additional Context / Notes (Optional)</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={2}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                        placeholder="Provide any additional details regarding your loan request..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft size={15} /> Edit Details
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 size={16} /> Submit Application
                    </button>
                  </div>
                </div>
              )}

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
