import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Shield, Zap, Compass, Users, UserCheck, 
  ChevronRight, Lock, HelpCircle, Star, Sparkles, Server,
  TrendingUp, CheckCircle2, Clock, ShieldAlert, DollarSign,
  Cpu, Layers, MessageSquare, CreditCard, Award, Activity, Globe, ChevronDown, Check, Play
} from "lucide-react";

export default function LandingPage() {
  const [selectedRoleTab, setSelectedRoleTab] = useState("borrower");
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const [faqOpenIdx, setFaqOpenIdx] = useState(null);

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  // 5 Ecosystem Portals Config
  const portalRoles = [
    { 
      id: "borrower",
      name: "Borrower Portal", 
      path: "/borrower/dashboard", 
      icon: Users,
      badge: "Applicants & SME",
      color: "from-blue-500 via-cyan-400 to-indigo-600",
      glowColor: "rgba(59, 130, 246, 0.3)",
      desc: "Complete digital KYC in 3 mins, calculate instant iNV IQ™ AI risk scores, compare competitive lender bids, and accept loan offers."
    },
    { 
      id: "lender",
      name: "Lender Portal", 
      path: "/lender/dashboard", 
      icon: Zap,
      badge: "Banks & NBFCs",
      color: "from-amber-500 via-orange-400 to-yellow-600",
      glowColor: "rgba(245, 158, 11, 0.3)",
      desc: "Manage high-yield capital deployment, review anonymous borrower profiles ranked by AI risk scores, and publish custom loan offers."
    },
    { 
      id: "rep",
      name: "OAL Rep Portal", 
      path: "/rep/dashboard", 
      icon: Shield,
      badge: "Agents & Managers",
      color: "from-purple-500 via-indigo-400 to-violet-600",
      glowColor: "rgba(168, 85, 247, 0.3)",
      desc: "Access LetsWork™ 3-way communication module to coordinate between Lenders and Borrowers for fast escrow settlement."
    },
    { 
      id: "network",
      name: "Network Panel", 
      path: "/network/live-stream", 
      icon: Compass,
      badge: "Live Marketplace Feed",
      color: "from-emerald-500 via-teal-400 to-green-600",
      glowColor: "rgba(16, 185, 129, 0.3)",
      desc: "Monitor active loan applications in a real-time live marketplace stream with pipeline color codes and countdown funding timers."
    },
    { 
      id: "admin",
      name: "Super Admin Control", 
      path: "/admin/dashboard", 
      icon: Server,
      badge: "Platform Control",
      color: "from-rose-500 via-pink-400 to-red-600",
      glowColor: "rgba(244, 63, 94, 0.3)",
      desc: "Configure iNV IQ™ AI weights, audit KYC verifications, manage subscription billing, monitor security logs, and control RBAC."
    }
  ];

  // Showroom Live Previews
  const mockPreviews = {
    borrower: {
      title: "Borrower Application & Risk Dashboard",
      stats: [
        { label: "Application Stage", val: "Underwriting Check", change: "Fast-Track Active", color: "text-blue-400" },
        { label: "Your iNV IQ™ Score", val: "A+ Verified (840)", change: "99.2% Credit Fit", color: "text-emerald-400" },
        { label: "Lender Bids Active", val: "6 Offers Received", change: "Lowest 8.5% APR", color: "text-purple-400" }
      ],
      element: (
        <div className="space-y-3 font-sans">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">Digital KYC Verification & Income Statements</span>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold rounded-full">✓ Approved & Encrypted</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">Top Lender Offer: Apex Capital LLC</span>
            <span className="font-mono text-emerald-400 font-bold">₹25,00,000 @ 8.5% APR (36 Months)</span>
          </div>
        </div>
      )
    },
    lender: {
      title: "Institutional Lender Deal Flow & Portfolio Bidding",
      stats: [
        { label: "Capital Deployed", val: "₹14.8 Crore", change: "+18% MoM", color: "text-amber-400" },
        { label: "Portfolio Net Yield", val: "12.4% Net APR", change: "Risk-Adjusted", color: "text-emerald-400" },
        { label: "Qualified Leads Active", val: "24 Verified Leads", change: "A+ Grade Leads", color: "text-blue-400" }
      ],
      element: (
        <div className="space-y-3 font-sans">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">Lead #APP-9012 [Business Expansion]</span>
            <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold rounded-full">iNV IQ™ Score: 880 (A+)</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">Custom Bid Status</span>
            <span className="text-amber-400 font-mono font-bold">Offer Sent (Awaiting Borrower Acceptance)</span>
          </div>
        </div>
      )
    },
    rep: {
      title: "LetsWork™ 3-Way Agent Communication Center",
      stats: [
        { label: "My Managed Accounts", val: "18 Borrowers", change: "Active CRM Leads", color: "text-purple-400" },
        { label: "Escrow Settlements", val: "₹85 Lakh", change: "Processed Today", color: "text-emerald-400" },
        { label: "Agent Commission Split", val: "₹42,500", change: "15% Bonus Active", color: "text-blue-400" }
      ],
      element: (
        <div className="space-y-3 font-sans">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">LetsWork™ Active Stream</span>
            <span className="text-blue-400 font-bold flex items-center gap-1.5"><MessageSquare size={14} /> 3-Way Message Room Live</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">Lender Bids Escalation</span>
            <span className="text-emerald-400 font-mono">2 Bids Approved for Escrow Release</span>
          </div>
        </div>
      )
    },
    network: {
      title: "OAL Network Panel Real-Time Marketplace Stream",
      stats: [
        { label: "Total Marketplace Volume", val: "₹520 Crore", change: "Live Stream Streamed", color: "text-emerald-400" },
        { label: "Active Institutional Lenders", val: "140 Online", change: "Real-time Bidding", color: "text-blue-400" },
        { label: "Average Funding Time", val: "1.4 Days", change: "Instant Settlement", color: "text-purple-400" }
      ],
      element: (
        <div className="space-y-3 font-sans">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">Marketplace Live Feed</span>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold rounded-full animate-pulse">● Live Stream Active</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">New Application Status</span>
            <span className="text-emerald-400 font-semibold">Green Color Pipeline Badge Active</span>
          </div>
        </div>
      )
    },
    admin: {
      title: "Super Admin Platform Control & RBAC System",
      stats: [
        { label: "Platform Users Logged", val: "2,450 Active", change: "Across All Roles", color: "text-rose-400" },
        { label: "Security Compliance Health", val: "100% Verified", change: "Immutable Audit Log", color: "text-emerald-400" },
        { label: "Monthly Platform Revenue", val: "₹84.5 Lakh", change: "Billing Engine Active", color: "text-purple-400" }
      ],
      element: (
        <div className="space-y-3 font-sans">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">iNV IQ™ Risk Engine Weights</span>
            <span className="text-purple-400 font-mono font-bold">Bureau (35%), Cashflow (30%), Bureau (35%)</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">Role-Based Access Control (RBAC)</span>
            <span className="text-blue-400 font-mono">18 Modules Configured</span>
          </div>
        </div>
      )
    }
  };

  // FAQs
  const faqs = [
    { q: "What is OAL Loan Marketplace?", a: "OAL Loan Marketplace is India's premier multi-portal lending ecosystem connecting creditworthy Borrowers directly with verified Institutional Lenders, Banks, and OAL Agent Representatives." },
    { q: "How does the iNV IQ™ AI Risk Scoring Engine work?", a: "Our proprietary AI scoring engine analyzes over 120 financial parameters including bank cashflows, bureau repayment histories, GST filings, and transaction velocity to generate an instant, verified credit score (A+ to C)." },
    { q: "What is the LetsWork™ 3-Way Communication Module?", a: "LetsWork™ is a secure, encrypted 3-way communication module allowing OAL Representative Agents to coordinate between Borrowers and Lenders in real-time for seamless document verification and escrow funding." },
    { q: "How quickly are funds disbursed after lender agreement?", a: "Once a borrower accepts a lender's proposal, digital loan contracts are signed and funds are transferred directly to the borrower's bank account within 24 hours via automated gateway integration." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-x-hidden font-sans relative selection:bg-blue-500 selection:text-white">
      {/* 3D Animated Background Tech Grid & Glowing Orbs */}
      <div className="fixed inset-0 opacity-[0.12] pointer-events-none z-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="fixed top-[-10%] left-[-10%] w-[650px] h-[650px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none z-0 animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="fixed top-[40%] right-[20%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* FLOATING COMPACT TOP NAVIGATION NAVBAR */}
      <header className="sticky top-3 w-full z-50 px-4">
        <div className="max-w-6xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-full px-5 py-2.5 shadow-2xl flex items-center justify-between transition-all">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Sparkles size={16} className="text-white animate-pulse" />
            </div>
            <div>
              <span className="text-sm font-black tracking-wider text-white uppercase block leading-none">OAL MARKETPLACE</span>
              <span className="text-[9px] text-blue-400 font-mono tracking-widest uppercase">AI Lending Ecosystem</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#hero" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#portals" className="hover:text-blue-400 transition-colors">Portals</a>
            <a href="#showroom" className="hover:text-blue-400 transition-colors">Showroom</a>
            <a href="#inv-iq" className="hover:text-blue-400 transition-colors">iNV IQ™ Engine</a>
            <a href="#faqs" className="hover:text-blue-400 transition-colors">FAQs</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Link 
              to="/auth/login" 
              className="px-3.5 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
            >
              Log In
            </Link>

            <Link 
              to="/auth/login" 
              className="px-4 py-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-blue-900/30 hover:scale-105 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN LANDING BODY */}
      <main className="relative z-10 space-y-16 md:space-y-24 pb-20">
        
        {/* HERO SECTION */}
        <section id="hero" className="max-w-7xl mx-auto px-6 pt-6 md:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs text-blue-400 font-mono gap-2 backdrop-blur-md shadow-sm"
            >
              <Shield size={14} className="text-blue-400 animate-pulse" />
              <span>ISO 27001 Security Compliant • MFA Enforced</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]"
            >
              Connect. Verify.<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Fund Instantly.
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed"
            >
              India's first fully integrated 5-portal lending marketplace connecting Borrowers, Verified Institutional Lenders, and OAL Representatives. Powered by real-time iNV IQ™ AI credit scoring and automated escrow settlement.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-4">
              <Link 
                to="/auth/register" 
                className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-xl shadow-blue-900/40 hover:scale-105 transition-all text-sm flex items-center gap-2"
              >
                <span>Apply For Loan</span>
                <ArrowRight size={16} />
              </Link>

              <Link 
                to="/auth/login" 
                className="px-7 py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold rounded-xl hover:bg-slate-850 transition-all text-sm flex items-center gap-2"
              >
                <span>Lender / Investor Access</span>
                <ChevronRight size={16} />
              </Link>
            </motion.div>

            {/* Quick Live Stats Pill */}
            <motion.div variants={itemVariants} className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-900">
              <div>
                <p className="text-2xl font-black text-emerald-400 font-mono">₹520Cr+</p>
                <p className="text-[11px] text-slate-400">Capital Disbursed</p>
              </div>
              <div>
                <p className="text-2xl font-black text-blue-400 font-mono">10,000+</p>
                <p className="text-[11px] text-slate-400">Verified Borrowers</p>
              </div>
              <div>
                <p className="text-2xl font-black text-purple-400 font-mono">98.4%</p>
                <p className="text-[11px] text-slate-400">AI Match Rate</p>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Animated Interactive Visual Canvas */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[400px] w-full max-w-lg mx-auto">
            {/* 3D Floating Widget 1 - iNV IQ Card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 left-0 p-5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl w-60 space-y-3 z-30 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">iNV IQ™ AI Engine</span>
                <Cpu size={14} className="text-blue-400 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <p className="text-xl font-black text-white">Score: A+ Verified</p>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full w-[94%]" />
              </div>
              <p className="text-[10px] text-emerald-400 font-mono font-semibold">✓ 120+ Financial Data Signals Analyzed</p>
            </motion.div>

            {/* 3D Floating Widget 2 - LetsWork Stream Card */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-6 right-0 p-5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl w-64 space-y-3 z-20 hover:border-purple-500/50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">LetsWork™ 3-Way Room</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <p className="text-xs font-bold text-white">Live Escrow Proposal Active</p>
              <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950 p-2 rounded-lg border border-slate-850">
                <MessageSquare size={12} className="text-purple-400 shrink-0" />
                <span className="truncate">OAL Rep: Offer matched @ 8.5% APR</span>
              </div>
            </motion.div>

            {/* Glowing Backdrop Mesh Sphere */}
            <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-emerald-600/20 border border-blue-500/20 blur-2xl animate-pulse" />
          </div>
        </section>

        {/* 5 CONNECTED PORTALS SECTION (3D TILT CARDS) */}
        <section id="portals" className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
              Ecosystem Architecture
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white">5 Connected Workflow Portals</h2>
            <p className="text-sm text-slate-400">Integrated portals tailored for Borrowers, Lenders, OAL Agents, Network Feed, and Super Admins.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {portalRoles.map((role) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.name}
                  whileHover={{ 
                    y: -12, 
                    rotateX: 6, 
                    rotateY: -6,
                    transition: { duration: 0.25 } 
                  }}
                  className="relative p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl hover:border-blue-500/40 transition-all flex flex-col justify-between overflow-hidden group shadow-2xl backdrop-blur-xl"
                  style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                >
                  <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${role.color} opacity-10 group-hover:opacity-30 blur-2xl transition-all`} />
                  
                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center shadow-lg`}>
                        <Icon size={22} className="text-slate-950 font-bold" />
                      </div>
                      <span className="text-[10px] font-mono bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800">{role.badge}</span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-100 text-lg group-hover:text-blue-400 transition-colors">{role.name}</h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{role.desc}</p>
                    </div>
                  </div>

                  <Link 
                    to={role.path} 
                    className="inline-flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-white mt-6 pt-4 border-t border-slate-850/80"
                  >
                    <span>Launch Portal</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-blue-400" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* DASHBOARD LIVE SHOWROOM */}
        <section id="showroom" className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">Interactive Console</span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white">Dashboard Live Showroom</h2>
              <p className="text-xs text-slate-400">Select a portal tab to inspect mock metrics and workflow screens in real time.</p>
            </div>

            {/* Portal Tab Switchers */}
            <div className="flex flex-wrap justify-center gap-2">
              {portalRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRoleTab(role.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    selectedRoleTab === role.id 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30" 
                      : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  {role.name}
                </button>
              ))}
            </div>

            {/* Rendered Mock Console Window */}
            <div className="border border-slate-800 bg-slate-950/90 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-slate-400 font-mono ml-3">
                    https://oalnetwork.com/{selectedRoleTab}/dashboard
                  </span>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/20 font-mono">
                  Live Stream Active
                </span>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">{mockPreviews[selectedRoleTab].title}</h3>
                  <Link 
                    to={portalRoles.find(p => p.id === selectedRoleTab).path}
                    className="px-3.5 py-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 rounded-lg text-xs font-bold transition-colors"
                  >
                    Open Live Portal →
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockPreviews[selectedRoleTab].stats.map((stat, idx) => (
                    <div key={idx} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{stat.label}</span>
                      <p className={`text-xl font-bold ${stat.color}`}>{stat.val}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{stat.change}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-850">
                  {mockPreviews[selectedRoleTab].element}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* iNV IQ™ AI SCORING FEATURE SPOTLIGHT */}
        <section id="inv-iq" className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20">
              Proprietary AI Algorithm
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              iNV IQ™ AI Credit Scoring Engine
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Our advanced machine learning engine evaluates risk using real-time bank cashflows, bureau records, transaction velocity, and custom investor rules.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">Instant Underwriting Score Card</h4>
                  <p className="text-slate-400 mt-0.5">Calculates credit grade (A+ to C) within 30 seconds of document submission.</p>
                </div>
              </div>

              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex items-start gap-3">
                <CheckCircle2 size={18} className="text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">Accredited Investor Custom Rules</h4>
                  <p className="text-slate-400 mt-0.5">Lenders can fine-tune custom risk parameters to auto-filter borrower leads.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl backdrop-blur-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
              <Cpu size={20} className="text-purple-400" />
              Live Algorithm Weightage Simulator
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-medium text-slate-300 mb-1">
                  <span>Bureau Credit Score History</span>
                  <span className="font-mono text-purple-400 font-bold">35% Weight</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-purple-500 rounded-full w-[35%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-300 mb-1">
                  <span>Bank Statement Cashflow Velocity</span>
                  <span className="font-mono text-blue-400 font-bold">30% Weight</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-blue-500 rounded-full w-[30%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-300 mb-1">
                  <span>Business GST & Debt Obligation</span>
                  <span className="font-mono text-emerald-400 font-bold">25% Weight</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-emerald-500 rounded-full w-[25%]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs SECTION */}
        <section id="faqs" className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400">Everything you need to know about the OAL Loan Marketplace platform.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setFaqOpenIdx(faqOpenIdx === idx ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 text-sm font-bold text-white hover:text-blue-400"
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className={`transition-transform ${faqOpenIdx === idx ? "rotate-180 text-blue-400" : "text-slate-500"}`} />
                </button>
                {faqOpenIdx === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-850 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION (CTA) BANNER */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border border-blue-500/30 rounded-3xl p-10 md:p-16 text-center space-y-6 relative overflow-hidden shadow-2xl backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-3xl md:text-5xl font-black text-white max-w-3xl mx-auto leading-tight">
              Ready to Access India's Most Advanced Loan & Investment Marketplace?
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Join thousands of borrowers and institutional lenders executing secure, AI-rated loan agreements today.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link 
                to="/auth/register" 
                className="px-8 py-4 bg-white text-slate-950 font-black rounded-xl hover:bg-slate-200 transition-all text-sm shadow-2xl hover:scale-105"
              >
                Get Started Now →
              </Link>
              <Link 
                to="/auth/login" 
                className="px-8 py-4 bg-slate-950 border border-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-all text-sm"
              >
                Explore Login Options
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500 bg-slate-950 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono">&copy; 2026 OAL Network. All rights reserved.</span>
          <div className="flex space-x-6 text-[11px] text-slate-400 font-mono">
            <span>ISO 27001 Certified</span>
            <span>GDPR Compliant</span>
            <span>MFA Verification Enforced</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
