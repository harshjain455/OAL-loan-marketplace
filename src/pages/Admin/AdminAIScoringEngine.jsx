import React, { useState } from "react";
import { 
  Cpu, Sliders, ShieldCheck, Award, Save, RefreshCw, AlertCircle, CheckCircle2, FileCheck, Layers, ToggleLeft, ToggleRight, Info, HelpCircle
} from "lucide-react";

export default function AdminAIScoringEngine() {
  const [activeTab, setActiveTab] = useState("standard"); // 'standard' or 'investors'
  const [isSaved, setIsSaved] = useState(false);

  // Standard Applicants Weightages State
  const [standardWeights, setStandardWeights] = useState({
    dti: 35,
    kycAuth: 25,
    creditScore: 25,
    liquidity: 15
  });

  // Standard Applicant Rule Thresholds
  const [standardRules, setStandardRules] = useState({
    minCreditScore: 650,
    maxDTI: 45,
    minMonthlyIncome: 3500,
    autoApprovalEnabled: true,
    requireManualKYCOverride: false
  });

  // Qualified Investor Applicants Weightages State
  const [investorWeights, setInvestorWeights] = useState({
    netWorth: 40,
    liquidReserves: 35,
    accreditationProof: 25
  });

  // Investor Custom Form Controls
  const [investorFormRules, setInvestorFormRules] = useState({
    requireAccreditedCert: true,
    requireAssetDeclaration: true,
    minNetWorthThreshold: "$1,000,000",
    minLiquidReserves: "$250,000",
    fastTrackApproval: true
  });

  const totalStandardWeight = standardWeights.dti + standardWeights.kycAuth + standardWeights.creditScore + standardWeights.liquidity;
  const totalInvestorWeight = investorWeights.netWorth + investorWeights.liquidReserves + investorWeights.accreditationProof;

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleResetDefaults = () => {
    if (activeTab === "standard") {
      setStandardWeights({ dti: 35, kycAuth: 25, creditScore: 25, liquidity: 15 });
      setStandardRules({ minCreditScore: 650, maxDTI: 45, minMonthlyIncome: 3500, autoApprovalEnabled: true, requireManualKYCOverride: false });
    } else {
      setInvestorWeights({ netWorth: 40, liquidReserves: 35, accreditationProof: 25 });
      setInvestorFormRules({ requireAccreditedCert: true, requireAssetDeclaration: true, minNetWorthThreshold: "$1,000,000", minLiquidReserves: "$250,000", fastTrackApproval: true });
    }
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            AI Scoring Engine Configurations
            <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-mono">
              iNV IQ™ v3.4
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure risk scoring weightages and custom evaluation rules for standard borrowers and accredited investors.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RefreshCw size={14} />
            Reset Defaults
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-blue-900/30 transition-all flex items-center gap-1.5"
          >
            <Save size={14} />
            Deploy iNV IQ Rules
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {isSaved && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between text-emerald-400 text-xs animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span><strong>iNV IQ™ Algorithm Updated!</strong> New scoring weightages and custom investor rules have been deployed to live pipeline.</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-500">Live Status: Active</span>
        </div>
      )}

      {/* Navigation Sub-Section Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs font-medium">
        <button
          onClick={() => setActiveTab("standard")}
          className={`flex-1 py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === "standard"
              ? "bg-blue-600 text-white shadow-md font-semibold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Sliders size={16} />
          Standard Applicant Rules & Weightages
        </button>

        <button
          onClick={() => setActiveTab("investors")}
          className={`flex-1 py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === "investors"
              ? "bg-purple-600 text-white shadow-md font-semibold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Award size={16} />
          Qualified Verified Applicant Investors (Custom Forms)
        </button>
      </div>

      {/* TAB 1: STANDARD APPLICANTS */}
      {activeTab === "standard" && (
        <div className="space-y-6">
          {/* Weightage Allocation Sliders */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-semibold text-white">Algorithm Weightage Allocation</h3>
                <p className="text-xs text-slate-400 mt-0.5">Adjust how the iNV IQ™ engine weights borrower credentials.</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                totalStandardWeight === 100 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                  : "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse"
              }`}>
                Total Weight: {totalStandardWeight}% {totalStandardWeight !== 100 && "(Must Equal 100%)"}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DTI Weight */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">Debt-to-Income (DTI) Ratio</span>
                  <span className="text-blue-400 font-mono font-bold">{standardWeights.dti}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={standardWeights.dti}
                  onChange={(e) => setStandardWeights({ ...standardWeights, dti: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <p className="text-[11px] text-slate-500">Evaluates current monthly debt payments against total gross income.</p>
              </div>

              {/* KYC Authenticity Weight */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">KYC Credential Authenticity</span>
                  <span className="text-emerald-400 font-mono font-bold">{standardWeights.kycAuth}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={standardWeights.kycAuth}
                  onChange={(e) => setStandardWeights({ ...standardWeights, kycAuth: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <p className="text-[11px] text-slate-500">Confidence score from verified ID, proof of address, and fraud checks.</p>
              </div>

              {/* Credit Score Weight */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">Credit Bureau Score</span>
                  <span className="text-purple-400 font-mono font-bold">{standardWeights.creditScore}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={standardWeights.creditScore}
                  onChange={(e) => setStandardWeights({ ...standardWeights, creditScore: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <p className="text-[11px] text-slate-500">TransUnion/Equifax credit score tier weightage.</p>
              </div>

              {/* Liquidity Weight */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">Bank Statement Liquidity</span>
                  <span className="text-amber-400 font-mono font-bold">{standardWeights.liquidity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={standardWeights.liquidity}
                  onChange={(e) => setStandardWeights({ ...standardWeights, liquidity: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <p className="text-[11px] text-slate-500">Average 90-day cash balance reserves.</p>
              </div>
            </div>
          </div>

          {/* Standard Threshold Rule Builder */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
            <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-3">Threshold Rule Builder</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <label className="text-xs text-slate-400 font-medium block">Min Credit Score Cutoff</label>
                <input
                  type="number"
                  value={standardRules.minCreditScore}
                  onChange={(e) => setStandardRules({ ...standardRules, minCreditScore: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <label className="text-xs text-slate-400 font-medium block">Max Allowed DTI %</label>
                <input
                  type="number"
                  value={standardRules.maxDTI}
                  onChange={(e) => setStandardRules({ ...standardRules, maxDTI: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <label className="text-xs text-slate-400 font-medium block">Min Monthly Income ($)</label>
                <input
                  type="number"
                  value={standardRules.minMonthlyIncome}
                  onChange={(e) => setStandardRules({ ...standardRules, minMonthlyIncome: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-850">
                <div>
                  <p className="text-xs font-semibold text-slate-200">Automatic Eligibility Recommendation</p>
                  <p className="text-[11px] text-slate-500">Instantly flag qualified standard borrowers for lender matching.</p>
                </div>
                <button
                  onClick={() => setStandardRules({ ...standardRules, autoApprovalEnabled: !standardRules.autoApprovalEnabled })}
                  className={`text-2xl transition-colors ${standardRules.autoApprovalEnabled ? "text-emerald-400" : "text-slate-600"}`}
                >
                  {standardRules.autoApprovalEnabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-850">
                <div>
                  <p className="text-xs font-semibold text-slate-200">Require Manual KYC Override for Low Credit</p>
                  <p className="text-[11px] text-slate-500">Route applicants with credit below 600 to Admin Verification Queue.</p>
                </div>
                <button
                  onClick={() => setStandardRules({ ...standardRules, requireManualKYCOverride: !standardRules.requireManualKYCOverride })}
                  className={`text-2xl transition-colors ${standardRules.requireManualKYCOverride ? "text-emerald-400" : "text-slate-600"}`}
                >
                  {standardRules.requireManualKYCOverride ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: QUALIFIED VERIFIED APPLICANT INVESTORS */}
      {activeTab === "investors" && (
        <div className="space-y-6">
          <div className="bg-purple-950/30 border border-purple-800/40 p-4 rounded-xl flex items-start gap-3">
            <Award className="text-purple-400 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-xs">
              <h4 className="font-bold text-purple-200">Accredited Applicant Investor Special Engine</h4>
              <p className="text-slate-400 mt-0.5">
                This custom sub-section configures specialized scoring rules for high-net-worth verified applicant investors using custom assessment forms.
              </p>
            </div>
          </div>

          {/* Investor Weightages */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-semibold text-white">Investor Risk Model Weightages</h3>
                <p className="text-xs text-slate-400 mt-0.5">Define weights for accredited asset declarations.</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                totalInvestorWeight === 100 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                  : "bg-red-500/10 text-red-400 border-red-500/30 animate-pulse"
              }`}>
                Total Weight: {totalInvestorWeight}% {totalInvestorWeight !== 100 && "(Must Equal 100%)"}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Portfolio Net Worth Weight */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">Portfolio Net Worth</span>
                  <span className="text-purple-400 font-mono font-bold">{investorWeights.netWorth}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={investorWeights.netWorth}
                  onChange={(e) => setInvestorWeights({ ...investorWeights, netWorth: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <p className="text-[11px] text-slate-500">Declared securities & commercial holdings.</p>
              </div>

              {/* Liquid Reserves Weight */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">Liquid Cash Reserves</span>
                  <span className="text-emerald-400 font-mono font-bold">{investorWeights.liquidReserves}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={investorWeights.liquidReserves}
                  onChange={(e) => setInvestorWeights({ ...investorWeights, liquidReserves: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <p className="text-[11px] text-slate-500">Immediate unencumbered capital pool.</p>
              </div>

              {/* Accreditation Proof Weight */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">Accredited Investor Permit</span>
                  <span className="text-blue-400 font-mono font-bold">{investorWeights.accreditationProof}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={investorWeights.accreditationProof}
                  onChange={(e) => setInvestorWeights({ ...investorWeights, accreditationProof: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <p className="text-[11px] text-slate-500">SEC / Regulatory accredited status verification.</p>
              </div>
            </div>
          </div>

          {/* Investor Custom Assessment Form Configurations */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-6">
            <h3 className="text-base font-semibold text-white border-b border-slate-800 pb-3">Custom Investor Assessment Form Controls</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <label className="text-xs text-slate-400 font-medium block">Min Net Worth Threshold</label>
                <input
                  type="text"
                  value={investorFormRules.minNetWorthThreshold}
                  onChange={(e) => setInvestorFormRules({ ...investorFormRules, minNetWorthThreshold: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <label className="text-xs text-slate-400 font-medium block">Min Liquid Reserve Cutoff</label>
                <input
                  type="text"
                  value={investorFormRules.minLiquidReserves}
                  onChange={(e) => setInvestorFormRules({ ...investorFormRules, minLiquidReserves: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Custom Form Toggles */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-850">
                <div>
                  <p className="text-xs font-semibold text-slate-200">Require Accredited Investor Self-Declaration Form</p>
                  <p className="text-[11px] text-slate-500">Enforces custom investor form submission before matching with premier lenders.</p>
                </div>
                <button
                  onClick={() => setInvestorFormRules({ ...investorFormRules, requireAccreditedCert: !investorFormRules.requireAccreditedCert })}
                  className={`text-2xl transition-colors ${investorFormRules.requireAccreditedCert ? "text-purple-400" : "text-slate-600"}`}
                >
                  {investorFormRules.requireAccreditedCert ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-850">
                <div>
                  <p className="text-xs font-semibold text-slate-200">Fast-Track Investor Priority Marketplace Queue</p>
                  <p className="text-[11px] text-slate-500">Automatically promotes verified applicant investors to top-tier lender notifications.</p>
                </div>
                <button
                  onClick={() => setInvestorFormRules({ ...investorFormRules, fastTrackApproval: !investorFormRules.fastTrackApproval })}
                  className={`text-2xl transition-colors ${investorFormRules.fastTrackApproval ? "text-purple-400" : "text-slate-600"}`}
                >
                  {investorFormRules.fastTrackApproval ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
