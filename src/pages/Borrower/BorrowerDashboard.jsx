import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Clock, 
  CheckCircle2, 
  FileText, 
  UploadCloud, 
  Cpu, 
  Award, 
  MessageSquare, 
  Share2, 
  Settings, 
  DollarSign, 
  UserCheck, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp,
  BarChart3,
  PieChart,
  Sparkles,
  ChevronRight,
  Zap,
  Bell,
  Lock,
  Info
} from "lucide-react";

export default function BorrowerDashboard() {
  const [graphTimeframe, setGraphTimeframe] = useState("24m");
  const [hoveredPoint, setHoveredPoint] = useState(2); // Default selected node (M12)

  // Application Data
  const applicationData = {
    id: "APP-2026-8942",
    status: "Under Review",
    statusColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    progress: 65,
    requestedAmount: "$75,000",
    duration: "24 Months",
    estRate: "6.5% - 7.2%",
    estMonthlyPayment: "$3,342 / mo"
  };

  const aiScoreData = {
    rating: "A+",
    numericScore: 842,
    maxScore: 900,
    tier: "Prime Qualified Applicant",
  };

  const oalRepData = {
    name: "Sarah Jenkins",
    role: "Senior Loan Coordinator",
    status: "Online",
    avatarInitials: "SJ"
  };

  // Node Points with Exact SVG Coordinates (Ensures no edge cropping & large hit targets)
  const graphPoints = [
    { label: "M1", amount: "$3,342", principal: "$2,750", interest: "$592", x: 15, y: 75 },
    { label: "M6", amount: "$3,342", principal: "$2,850", interest: "$492", x: 130, y: 38 },
    { label: "M12", amount: "$3,342", principal: "$2,985", interest: "$357", x: 250, y: 62 },
    { label: "M18", amount: "$3,342", principal: "$3,120", interest: "$222", x: 370, y: 22 },
    { label: "M24", amount: "$3,342", principal: "$3,276", interest: "$66", x: 485, y: 10 },
  ];

  const lenderBids = [
    { name: "Lender Alpha (Anon)", rate: "6.5%", amount: "$75,000", term: "24 Mo", color: "from-indigo-500 to-purple-500", percent: 86 },
    { name: "Lender Gamma (Anon)", rate: "6.2%", amount: "$70,000", term: "18 Mo", color: "from-emerald-500 to-teal-500", percent: 92 },
    { name: "Lender Beta (Anon)", rate: "7.0%", amount: "$75,000", term: "36 Mo", color: "from-blue-500 to-indigo-500", percent: 78 },
  ];

  return (
    <div className="space-y-5 font-sans text-slate-100 max-w-7xl mx-auto pb-8">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900/95 to-indigo-950/40 border border-slate-800/80 p-5 rounded-2xl shadow-lg backdrop-blur-sm">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-white">Borrower Dashboard</h1>
            <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold rounded-full flex items-center gap-1">
              <Sparkles size={11} /> Analytics & Live Overview
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Real-time loan progress metrics, AI credit score analytics, and visual repayment projections.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to="/borrower/loan-application"
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
          >
            <FileText size={15} /> Apply For Loan
          </Link>
          <Link
            to="/borrower/offers"
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
          >
            <Award size={15} className="text-emerald-400" /> Waiting Room ({lenderBids.length})
          </Link>
        </div>
      </div>

      {/* 2. Compact Stat Cards (4 Equal Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Stat 1: Status Ring */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between hover:border-slate-750 transition-colors">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-medium block">Application Status</span>
            <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full border inline-block ${applicationData.statusColor}`}>
              {applicationData.status}
            </span>
            <p className="text-[10px] text-slate-500">ID: {applicationData.id}</p>
          </div>
          <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-indigo-500" strokeDasharray="65, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span className="absolute text-[10px] font-bold text-indigo-400">65%</span>
          </div>
        </div>

        {/* Stat 2: Requested Amount */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 space-y-1.5 hover:border-slate-750 transition-colors">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400 font-medium">Requested Loan</span>
            <span className="font-bold text-emerald-400">{applicationData.estRate}</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xl font-black text-white">{applicationData.requestedAmount}</span>
              <p className="text-[10px] text-slate-500">{applicationData.duration} • {applicationData.estMonthlyPayment}</p>
            </div>
            {/* Wavy Sparkline */}
            <svg className="w-14 h-6 text-emerald-400 overflow-visible shrink-0" viewBox="0 0 50 20">
              <path fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" d="M0,16 C10,5 20,18 30,8 C40,14 45,4 50,2" />
            </svg>
          </div>
        </div>

        {/* Stat 3: AI Borrower Score */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between hover:border-slate-750 transition-colors">
          <div className="space-y-0.5">
            <span className="text-[11px] text-slate-400 font-medium block">AI Borrower Score</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                {aiScoreData.rating}
              </span>
              <span className="text-xs font-bold text-slate-300">({aiScoreData.numericScore}/900)</span>
            </div>
            <p className="text-[10px] text-purple-400 font-semibold">{aiScoreData.tier}</p>
          </div>
          <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20 shrink-0">
            <Cpu size={18} />
          </div>
        </div>

        {/* Stat 4: Assigned OAL Rep */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between hover:border-slate-750 transition-colors">
          <div className="space-y-0.5 min-w-0">
            <span className="text-[11px] text-slate-400 font-medium block">Assigned Coordinator</span>
            <h4 className="text-xs font-bold text-white truncate">{oalRepData.name}</h4>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> {oalRepData.status}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-md">
            {oalRepData.avatarInitials}
          </div>
        </div>

      </div>

      {/* 3. GRAPH SECTION WITH STABLE CLICKABLE HIGHLIGHTS & ZERO BLINKING */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Left Column (Spans 2): Single Wave Graph */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl relative overflow-hidden">
          
          {/* Graph Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp size={18} className="text-indigo-400" />
                Loan Repayment Analytics Graph
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Click any node or month tab to highlight node metrics.
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400/50"></span> Active Wave Curve
              </span>

              <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px]">
                <button 
                  onClick={() => setGraphTimeframe("12m")}
                  className={`px-2.5 py-1 rounded font-bold transition-all ${graphTimeframe === "12m" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}
                >
                  12M
                </button>
                <button 
                  onClick={() => setGraphTimeframe("24m")}
                  className={`px-2.5 py-1 rounded font-bold transition-all ${graphTimeframe === "24m" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"}`}
                >
                  24M
                </button>
              </div>
            </div>
          </div>

          {/* Active Highlight Info Bar */}
          <div className="flex items-center justify-between bg-slate-950/80 border border-indigo-500/30 p-3 rounded-xl text-xs transition-all shadow-inner">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-indigo-600 text-white font-bold rounded text-[11px] shadow-sm">
                Selected: {graphPoints[hoveredPoint].label} Node
              </span>
              <span className="text-slate-300">Principal Paid: <strong className="text-white">{graphPoints[hoveredPoint].principal}</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400">Interest Portion: <strong className="text-purple-400">{graphPoints[hoveredPoint].interest}</strong></span>
              <span className="text-slate-400">Monthly EMI: <strong className="text-emerald-400">{graphPoints[hoveredPoint].amount}</strong></span>
            </div>
          </div>

          {/* SINGLE WAVE GRAPH WITH STABLE HIT TARGETS */}
          <div className="flex items-stretch gap-2 pt-1">
            
            {/* Y-Axis Labels */}
            <div className="flex flex-col justify-between text-[10px] font-bold text-slate-500 py-1 pr-1 shrink-0 select-none">
              <span>$4,000</span>
              <span>$3,000</span>
              <span>$2,000</span>
              <span>$1,000</span>
              <span>$0</span>
            </div>

            {/* SVG Single Wave Area Overlay */}
            <div className="flex-1 space-y-3">
              <div className="h-44 w-full relative p-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="singleWaveFillNoBox" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#818cf8" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid Lines */}
                  <line x1="0" y1="0" x2="500" y2="0" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  <line x1="0" y1="25" x2="500" y2="25" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

                  {/* ACTIVE SELECTED NODE VERTICAL GUIDELINE */}
                  {hoveredPoint !== null && (
                    <line 
                      x1={graphPoints[hoveredPoint].x} 
                      y1="0" 
                      x2={graphPoints[hoveredPoint].x} 
                      y2="100" 
                      stroke="#818cf8" 
                      strokeWidth="1.5" 
                      strokeDasharray="3 3" 
                      opacity="0.8" 
                    />
                  )}

                  {/* WAVE GRADIENT AREA FILL */}
                  <path 
                    d="M 0,75 C 60,35 110,85 170,40 C 230,10 290,65 350,30 C 410,50 450,15 500,10 L 500,100 L 0,100 Z" 
                    fill="url(#singleWaveFillNoBox)" 
                  />

                  {/* SINGLE SMOOTH WAVE STROKE */}
                  <path 
                    d="M 0,75 C 60,35 110,85 170,40 C 230,10 290,65 350,30 C 410,50 450,15 500,10" 
                    fill="none" 
                    stroke="#818cf8" 
                    strokeWidth="3.5" 
                    strokeLinecap="round"
                  />

                  {/* INTERACTIVE NODES: STABLE CLICK TARGETS & ACTIVE GLOW */}
                  {graphPoints.map((pt, idx) => {
                    const isSelected = hoveredPoint === idx;
                    return (
                      <g key={idx} className="cursor-pointer" onClick={() => setHoveredPoint(idx)}>
                        {/* Invisible Large Hit Target Circle to prevent slipping */}
                        <circle cx={pt.x} cy={pt.y} r="16" fill="transparent" />

                        {/* Active Selection Glow Ring */}
                        {isSelected && (
                          <circle cx={pt.x} cy={pt.y} r="10" stroke="#38bdf8" strokeWidth="2.5" fill="none" opacity="0.6" />
                        )}

                        {/* Solid Node Circle */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isSelected ? "6.5" : "4.5"}
                          fill={isSelected ? "#38bdf8" : "#6366f1"}
                          stroke="#ffffff"
                          strokeWidth={isSelected ? "2.5" : "1.8"}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* X-AXIS MONTH BUTTONS WITH ACTIVE SELECTION HIGHLIGHT */}
              <div className="flex justify-between text-[11px] font-bold text-slate-400 px-1 pt-1">
                {graphPoints.map((pt, idx) => {
                  const isSelected = hoveredPoint === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setHoveredPoint(idx)}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        isSelected 
                          ? "bg-indigo-600 text-white font-extrabold shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400" 
                          : "bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-850"
                      }`}
                    >
                      {pt.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column (Spans 1): AI Score Donut Gauge */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <PieChart size={15} className="text-purple-400" />
              iNV IQ Credit Rating Gauge
            </h3>
            <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
              Low Risk
            </span>
          </div>

          {/* Radial Gauge Ring */}
          <div className="relative w-32 h-32 mx-auto flex items-center justify-center my-1">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-purple-500" strokeDasharray="93, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-white">{aiScoreData.rating}</span>
              <span className="text-[10px] text-purple-300 font-bold">842 / 900</span>
            </div>
          </div>

          <Link
            to="/borrower/ai-score"
            className="w-full py-2 bg-slate-950 hover:bg-slate-850 text-indigo-400 border border-slate-800 text-xs font-bold rounded-xl transition-colors text-center shadow-sm"
          >
            Full Score Breakdown &rarr;
          </Link>
        </div>

      </div>

      {/* 4. Bottom 2-Column Row (Lender Bids Bar Chart - NO INNER WHITE LINE BOXES) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Left Column (Spans 2): Bidding Comparison Visual Bars */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                <BarChart3 size={16} className="text-emerald-400" />
                Waiting Room Lender Rate Bids
              </h2>
              <p className="text-[11px] text-slate-400">Incoming offers ranked by interest rate.</p>
            </div>
            <Link to="/borrower/offers" className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              View All Bids <ChevronRight size={13} />
            </Link>
          </div>

          {/* Horizontal Bar Items */}
          <div className="space-y-3.5 pt-1">
            {lenderBids.map((bid, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{bid.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium">({bid.amount} • {bid.term})</span>
                  </div>
                  <span className="font-extrabold text-emerald-400 text-xs">{bid.rate} Interest</span>
                </div>
                <div className="w-full bg-slate-950/80 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${bid.color} transition-all duration-700`}
                    style={{ width: `${bid.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Spans 1): Coordinator Console & Shortcuts */}
        <div className="space-y-4">
          
          {/* Coordinator Console */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <UserCheck size={14} className="text-indigo-400" />
                Coordinator Chat
              </h3>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online
              </span>
            </div>

            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[10px] text-amber-300 leading-tight">
              🔒 <strong>Policy:</strong> Borrowers chat exclusively with assigned OAL Reps.
            </div>

            <Link
              to="/borrower/messages"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <MessageSquare size={14} /> Encrypted Chat
            </Link>
          </div>

          {/* Quick Shortcuts 2x2 Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2.5 shadow-xl">
            <h3 className="text-xs font-bold text-white border-b border-slate-800 pb-2">Quick Shortcuts</h3>

            <div className="grid grid-cols-2 gap-2">
              <Link 
                to="/borrower/documents"
                className="p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 rounded-xl text-center space-y-1 transition-colors"
              >
                <UploadCloud size={16} className="text-indigo-400 mx-auto" />
                <span className="text-[10px] font-bold text-white block">KYC Upload</span>
              </Link>
              <Link 
                to="/borrower/offers"
                className="p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 rounded-xl text-center space-y-1 transition-colors"
              >
                <Award size={16} className="text-emerald-400 mx-auto" />
                <span className="text-[10px] font-bold text-white block">Offers ({lenderBids.length})</span>
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
