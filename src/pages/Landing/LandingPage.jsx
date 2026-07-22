import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Shield, Zap, Compass, Users, UserCheck, 
  ChevronRight, Lock, HelpCircle, Star, Sparkles, Server,
  TrendingUp, CheckCircle, Clock, ShieldAlert, DollarSign
} from "lucide-react";

export default function LandingPage() {
  const [selectedRoleTab, setSelectedRoleTab] = useState("borrower");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const portalRoles = [
    { 
      id: "borrower",
      name: "Borrower Portal", 
      path: "/borrower/dashboard", 
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      desc: "Register with MFA, complete KYC wizard, instantly calculate AI risk scores, and accept loan offers in the Waiting Room."
    },
    { 
      id: "lender",
      name: "Lender Portal", 
      path: "/lender/dashboard", 
      icon: Zap,
      color: "from-amber-500 to-orange-500",
      desc: "Manage yield, audit anonymous borrower profiles, review rankings via [iNV IQ], and publish customized loan offers."
    },
    { 
      id: "rep",
      name: "OAL Rep Portal", 
      path: "/rep/dashboard", 
      icon: Shield,
      color: "from-indigo-500 to-purple-500",
      desc: "Access the LetsWork communication module to securely chat with Lenders and Borrowers at the same time."
    },
    { 
      id: "network",
      name: "Network Panel", 
      path: "/network/dashboard", 
      icon: Compass,
      color: "from-emerald-500 to-teal-500",
      desc: "Monitor active loan applications in a real-time live marketplace feed with pipeline color codes and funding timers."
    },
    { 
      id: "admin",
      name: "Admin Control", 
      path: "/admin/dashboard", 
      icon: Server,
      color: "from-rose-500 to-pink-500",
      desc: "Configure AI scoring engine weights, manage KYC verifications, run recruitment ATS metrics, and support tickets."
    }
  ];

  // Mock Dashboard Previews for "Show Everything" Dashboard Showroom
  const mockPreviews = {
    borrower: {
      title: "Borrower Control Dashboard",
      stats: [
        { label: "Application Stage", val: "Underwriting Check" },
        { label: "Your iNV IQ Score", val: "A+ Verified" },
        { label: "Lender Matches Found", val: "6 Offers Active" }
      ],
      element: (
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex justify-between items-center text-xs">
            <span>KYC Verification Documents</span>
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 font-bold rounded">Approved</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex justify-between items-center text-xs">
            <span>Average Offered Rate</span>
            <span className="font-semibold text-blue-400">6.4% APR</span>
          </div>
        </div>
      )
    },
    lender: {
      title: "Lender Deal Flow Dashboard",
      stats: [
        { label: "Total Active Bids", val: "$480,000" },
        { label: "Portfolio Yield", val: "8.42% Net" },
        { label: "Verified Leads Active", val: "18 Leads" }
      ],
      element: (
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex justify-between items-center text-xs">
            <span>Lead #2918 [iNV IQ Score]</span>
            <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 font-bold rounded">A+ Score</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex justify-between items-center text-xs">
            <span>Custom Bid Status</span>
            <span className="text-amber-500">Sent (Pending Borrower Accept)</span>
          </div>
        </div>
      )
    },
    rep: {
      title: "LetsWork Agent Center",
      stats: [
        { label: "My Assigned Accounts", val: "14 Borrowers" },
        { label: "Pending KYC Checks", val: "3 Actions Required" },
        { label: "Deals Funded This Month", val: "8 Complete" }
      ],
      element: (
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex justify-between items-center text-xs">
            <span>letsWork Active Channel</span>
            <span className="text-blue-400">3-Way Message Room Live</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex justify-between items-center text-xs">
            <span>Lender Offers (Read Only)</span>
            <span className="text-slate-400">View Active Bids & Share results</span>
          </div>
        </div>
      )
    },
    network: {
      title: "OAL Network Panel Stream",
      stats: [
        { label: "Total Marketplace Volume", val: "$14.8M" },
        { label: "Active Investors Online", val: "32 Lenders" },
        { label: "Average Funding Time", val: "4.8 Days" }
      ],
      element: (
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex justify-between items-center text-xs">
            <span>Real-time Stream Updates</span>
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 animate-pulse rounded">Live Panel Feed</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex justify-between items-center text-xs">
            <span>New Borrowers Status</span>
            <span className="text-emerald-400 font-semibold">Green Color Badge Active</span>
          </div>
        </div>
      )
    },
    admin: {
      title: "Platform Administration System",
      stats: [
        { label: "Total System Accounts", val: "1,248 Users" },
        { label: "KYC Audit Backlog", val: "0 Pending" },
        { label: "Monthly Gross Revenue", val: "$48,900" }
      ],
      element: (
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex justify-between items-center text-xs">
            <span>AI Scoring Weightage Config</span>
            <span className="text-blue-400">Investor Custom Forms Active</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex justify-between items-center text-xs">
            <span>ATS Hiring & Sourcing logs</span>
            <span className="text-slate-400">Auto-Outreach Enabled</span>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden font-sans relative">
      {/* 1. Moving Technical Tech Grid Background */}
      <div className="absolute inset-0 animate-grid opacity-[0.8] pointer-events-none z-0" />

      {/* 2. Floating Giant Glowing Mesh Blobs */}
      <div className="absolute top-[15%] left-[-15%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-15%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-glow" />

      {/* Header */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-slate-900/50 backdrop-blur-md relative z-10">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center space-x-2"
        >
          <Sparkles className="text-blue-500 animate-pulse" size={24} />
          <span className="text-xl font-bold tracking-wider text-slate-50 uppercase">OAL Network</span>
        </motion.div>
        
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center space-x-4"
        >
          <Link to="/auth/login" className="px-4 py-2 text-sm text-slate-300 hover:text-slate-100 transition-colors">
            Login
          </Link>
          <Link to="/auth/register" className="relative group overflow-hidden px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-slate-50 text-sm font-semibold rounded-lg shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </motion.div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow relative z-10 py-16 md:py-28 px-6 max-w-7xl mx-auto w-full space-y-32">
        
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center px-3 py-1 rounded-full border border-slate-800 bg-slate-900/60 backdrop-blur-md text-xs text-blue-400 gap-1.5"
            >
              <Lock size={12} />
              <span>International Security Compliant & MFA Enabled</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-8xl font-black tracking-tight text-white leading-none"
            >
              Connect. Verify.<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Fund Instantly.
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed"
            >
              A fully integrated lending ecosystem connecting Borrowers, Lenders, and OAL Reps. Fully secure, real-time, and powered by custom AI ratings.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <Link to="/auth/register" className="px-6 py-3 bg-white text-slate-950 font-bold rounded-lg shadow-lg hover:bg-slate-200 transition-colors inline-flex items-center gap-2">
                Apply for Loan <ArrowRight size={16} />
              </Link>
              <Link to="/auth/login" className="px-6 py-3 bg-slate-900 border border-slate-800 text-slate-200 font-bold rounded-lg hover:bg-slate-850 transition-colors">
                Lender Registration
              </Link>
            </motion.div>
          </motion.div>

          {/* Interactive Floating 3D Widgets (Hero Visual - Responsive Optimized) */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[300px] lg:h-[350px] w-full max-w-md mx-auto overflow-hidden">
            {/* Widget 1 */}
            <motion.div
              variants={floatVariants}
              animate="animate"
              className="absolute top-4 left-2 lg:left-6 p-4 bg-slate-900/80 border border-slate-800 rounded-xl shadow-2xl backdrop-blur-md w-44 lg:w-52 space-y-2 z-20"
            >
              <div className="flex justify-between items-center">
                <span className="text-[9px] lg:text-[10px] text-slate-500 uppercase tracking-widest font-bold">iNV IQ System</span>
                <Sparkles size={12} className="text-indigo-400" />
              </div>
              <p className="text-base lg:text-xl font-bold text-slate-100">Score: A+ Verified</p>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-[94%]" />
              </div>
            </motion.div>

            {/* Widget 2 */}
            <motion.div
              animate={{
                y: [0, 10, 0],
                transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute bottom-6 right-2 lg:right-6 p-4 bg-slate-900/80 border border-slate-800 rounded-xl shadow-2xl backdrop-blur-md w-48 lg:w-56 space-y-2 z-10"
            >
              <div className="flex justify-between items-center">
                <span className="text-[9px] lg:text-[10px] text-slate-500 uppercase tracking-widest font-bold">LetsWork Console</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <p className="text-xs text-slate-200 font-semibold">Active Bid Matching Live</p>
              <p className="text-[9px] lg:text-[10px] text-slate-400">Rep coordinating 3-way stream</p>
            </motion.div>

            {/* Widget 3 (Giant glowing circle behind widgets) */}
            <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-tr from-blue-600/10 to-indigo-600/10 border border-blue-500/10 blur-xl animate-pulse" />
          </div>
        </section>

        {/* 3D ROLE CARDS SECTION */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl md:text-5xl font-black">5 Connected Portals</h2>
            <p className="text-sm text-slate-400">Choose a workflow role to open its dedicated dashboard portal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {portalRoles.map((role) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.name}
                  whileHover={{ 
                    y: -12, 
                    rotateX: 8, 
                    rotateY: -8,
                    transition: { duration: 0.25 } 
                  }}
                  className="relative p-6 bg-slate-900/40 border border-slate-850 rounded-2xl hover:border-slate-700 transition-all flex flex-col justify-between overflow-hidden group shadow-2xl backdrop-blur-sm"
                  style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                >
                  {/* Hover glowing backdrop blur */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${role.color} opacity-5 group-hover:opacity-20 blur-2xl transition-all`} />
                  
                  <div className="space-y-4 relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                      <Icon size={24} className="text-slate-950 font-bold" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100 text-lg group-hover:text-blue-400 transition-colors">{role.name}</h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{role.desc}</p>
                    </div>
                  </div>

                  <Link 
                    to={role.path} 
                    className="inline-flex items-center text-xs font-semibold text-slate-300 group-hover:text-white mt-6 pt-4 border-t border-slate-850/50 group-hover:border-slate-750"
                  >
                    Open Dashboard <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* MOCK SHOWROOM / SHOW EVERYTHING TAB SECTION */}
        <section className="bg-slate-900/20 border border-slate-850 rounded-3xl p-6 md:p-10 backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">Dashboard Live Showroom</h2>
            <p className="text-xs text-slate-400">Click a portal tab to inspect mock metrics and features in real-time.</p>
          </div>

          {/* Tabs switch */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {portalRoles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRoleTab(role.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedRoleTab === role.id 
                    ? "bg-slate-100 text-slate-950 shadow-md" 
                    : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {role.name}
              </button>
            ))}
          </div>

          {/* Tab Display Console */}
          <div className="border border-slate-805 bg-slate-950/80 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header style */}
            <div className="bg-slate-900/50 px-4 py-3 border-b border-slate-850 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              <span className="text-[10px] text-slate-500 font-mono ml-4 truncate">
                https://oalnetwork.com/{selectedRoleTab}/dashboard
              </span>
            </div>

            {/* Mock Dashboard Preview Window */}
            <div className="p-6 md:p-8 space-y-6">
              <h3 className="text-lg font-bold text-slate-100">{mockPreviews[selectedRoleTab].title}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockPreviews[selectedRoleTab].stats.map((stat, idx) => (
                  <div key={idx} className="p-4 bg-slate-900/40 border border-slate-850 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">{stat.label}</span>
                    <p className="text-xl font-bold text-slate-100">{stat.val}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-850/50">
                {mockPreviews[selectedRoleTab].element}
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS TIMELINE VISUALIZER */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">Milestone Processing Flow</h2>
            <p className="text-xs text-slate-400">Clear lifecycle from applicant registration to funding release</p>
          </div>

          <div className="relative border-l border-slate-850 ml-4 md:ml-8 space-y-8 max-w-3xl mx-auto">
            {[
              { title: "Account & MFA Setup", desc: "Borrower registers legal credentials and completes security SMS/Email checks.", icon: Lock },
              { title: "KYC Document Upload", desc: "Direct file storage uploads for validation assessments.", icon: CheckCircle },
              { title: "AI Borrower Score Evaluation", desc: "Automated iNV IQ engine scores risk profile factors.", icon: Sparkles },
              { title: "Bid Proposals", desc: "Qualified lenders view requests anonymously and submit interest offers.", icon: DollarSign },
              { title: "LetsWork Escalation", desc: "OAL Rep coordinates final approvals via split chat thread to release escrow funding.", icon: UserCheck }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative pl-8 group">
                  <span className="absolute left-0 top-1 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                    <Icon size={12} className="text-slate-400 group-hover:text-blue-400" />
                  </span>
                  <h4 className="font-bold text-slate-200 text-sm group-hover:text-blue-400 transition-colors">{step.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500 bg-slate-950/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span>&copy; 2026 OAL Network. All rights reserved.</span>
          <div className="flex space-x-6 text-[11px] text-slate-400">
            <span>Secure Encryption</span>
            <span>GDPR Compliant</span>
            <span>MFA Verification Enforced</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
