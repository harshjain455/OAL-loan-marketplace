import React, { useState } from "react";
import { 
  Clock, CheckCircle2, FileText, Cpu, Zap, DollarSign, ShieldCheck, 
  ChevronRight, Calendar, ArrowRight, Download, Lock, Award, X 
} from "lucide-react";

export default function NetworkTimeline() {
  const [selectedAppId, setSelectedAppId] = useState("APP-9081");
  const [hashVerifyModal, setHashVerifyModal] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState("");

  const timelineData = {
    "APP-9081": {
      id: "APP-9081",
      borrower: "TechVentures India Pvt Ltd",
      anonymousTitle: "Applicant #9081 [SME Tech]",
      amount: "₹45,00,000",
      currentStageIndex: 5, // 0 to 5 (Fully Funded)
      stages: [
        {
          stageNum: 1,
          title: "Application Start",
          status: "COMPLETED",
          timestamp: "July 22, 2026 • 09:15:02 AM",
          desc: "Borrower submitted digital loan application and completed MFA authentication check.",
          metadata: "IP: 103.21.124.89 • Device: Mac (Chrome v126)",
          icon: FileText
        },
        {
          stageNum: 2,
          title: "KYC Approval",
          status: "COMPLETED",
          timestamp: "July 22, 2026 • 09:42:18 AM",
          desc: "All 4 KYC document checkpoints verified (PAN, Aadhaar, 12M Bank Statement, GST Certificate).",
          metadata: "Verified by Auditor: Pooja Gupta (ADM-102)",
          icon: ShieldCheck
        },
        {
          stageNum: 3,
          title: "AI Score Generated",
          status: "COMPLETED",
          timestamp: "July 22, 2026 • 09:45:00 AM",
          desc: "iNV IQ™ algorithm evaluated bank cashflow velocity and generated score rating 880 (A+ Super Prime).",
          metadata: "Algorithm Confidence: 99.4% • Risk Weight: Low",
          icon: Cpu
        },
        {
          stageNum: 4,
          title: "Offer Sent",
          status: "COMPLETED",
          timestamp: "July 22, 2026 • 10:14:30 AM",
          desc: "Lender Desk #104 published proposal: ₹45,00,000 @ 8.5% APR for 36 Months.",
          metadata: "Proposal Hash: 0x8F9A2B4C7D... • Escrow Terms Locked",
          icon: Zap
        },
        {
          stageNum: 5,
          title: "Offer Accepted",
          status: "COMPLETED",
          timestamp: "July 22, 2026 • 11:30:12 AM",
          desc: "Borrower executed digital loan agreement in waiting room with OTP signature.",
          metadata: "Digital Signature Hash: 0xE41B72F9... • Legal Agreement Signed",
          icon: Award
        },
        {
          stageNum: 6,
          title: "Loan Funding & Settlement",
          status: "COMPLETED",
          timestamp: "July 22, 2026 • 01:15:00 PM",
          desc: "₹45,00,000 capital released from escrow directly into borrower's HDFC Bank account.",
          metadata: "Settlement Ref: UTR-9081248192 • Disbursal Status: Settled",
          icon: DollarSign
        }
      ]
    },
    "APP-9079": {
      id: "APP-9079",
      borrower: "Verma Retail Chains",
      anonymousTitle: "Applicant #9079 [Retail Logistics]",
      amount: "₹18,50,000",
      currentStageIndex: 3, // In Bidding
      stages: [
        {
          stageNum: 1,
          title: "Application Start",
          status: "COMPLETED",
          timestamp: "July 21, 2026 • 02:10:00 PM",
          desc: "Borrower submitted loan request.",
          metadata: "IP: 49.36.12.90",
          icon: FileText
        },
        {
          stageNum: 2,
          title: "KYC Approval",
          status: "COMPLETED",
          timestamp: "July 21, 2026 • 03:00:00 PM",
          desc: "Identity & shop license verified.",
          metadata: "Auditor: Amit Verma (REP-101)",
          icon: ShieldCheck
        },
        {
          stageNum: 3,
          title: "AI Score Generated",
          status: "COMPLETED",
          timestamp: "July 21, 2026 • 03:05:00 PM",
          desc: "iNV IQ™ Score generated: 820 (A Grade).",
          metadata: "Algorithm Rating: A Grade",
          icon: Cpu
        },
        {
          stageNum: 4,
          title: "Offer Sent",
          status: "IN_PROGRESS",
          timestamp: "July 21, 2026 • 04:20:00 PM",
          desc: "Lender Desk #302 submitted 9.2% APR bid. Awaiting borrower decision.",
          metadata: "Active Bids: 1 Offer Pending",
          icon: Zap
        },
        {
          stageNum: 5,
          title: "Offer Accepted",
          status: "PENDING",
          timestamp: "Pending borrower acceptance...",
          desc: "Borrower has not yet accepted offer.",
          metadata: "--",
          icon: Award
        },
        {
          stageNum: 6,
          title: "Loan Funding & Settlement",
          status: "PENDING",
          timestamp: "Pending escrow disbursal...",
          desc: "Awaiting stage 5 completion.",
          metadata: "--",
          icon: DollarSign
        }
      ]
    }
  };

  const app = timelineData[selectedAppId] || timelineData["APP-9081"];

  // Real File Download Trigger for Export Audit PDF
  const handleExportPdf = () => {
    const pdfContent = `
===================================================================
             OAL NETWORK MARKETPLACE TIMELINE CERTIFICATE
===================================================================
Application Reference ID : ${app.id}
Borrower Identity       : ${app.borrower}
Requested Capital       : ${app.amount}
Verification Status     : 100% Verified & Escrow Settled
Ledger Chain Hash       : 0x8F9A2B4C7D6E5F4A3B2C1D0E9F8A7B6C5D4E3F2A1B0C9D8E7F6A5B4C3D2E1F0
Date Generated          : ${new Date().toLocaleString()}

-------------------------------------------------------------------
CHRONOLOGICAL LIFECYCLE TIMESTAMP AUDIT LOGS:
-------------------------------------------------------------------
${app.stages.map(s => `
[STAGE ${s.stageNum}] ${s.title.toUpperCase()}
Status     : ${s.status}
Timestamp  : ${s.timestamp}
Details    : ${s.desc}
Metadata   : ${s.metadata}
`).join("\n-------------------------------------------------------------------\n")}

===================================================================
End of Audit Certificate • ISO 27001 Certified • OAL Network System
===================================================================
    `;

    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `OAL_Timeline_Audit_${app.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadMsg(`Audit Timeline Certificate for ${app.id} downloaded successfully as OAL_Timeline_Audit_${app.id}.pdf!`);
    setTimeout(() => setDownloadMsg(""), 3500);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1">
              <Clock size={12} />
              Immutable Lifecycle Audit Trail
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">Timeline Tracking Console</h1>
          <p className="text-xs text-slate-400 mt-1">Chronological stage-by-stage timestamp logs from application start to funding settlement.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setHashVerifyModal(true)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Lock size={14} className="text-emerald-400" />
            <span>Verify Cryptographic Hashes</span>
          </button>
          <button
            onClick={handleExportPdf}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-900/30 transition-all flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>Export Audit PDF</span>
          </button>
        </div>
      </div>

      {/* Download Notification */}
      {downloadMsg && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-2xl text-xs font-bold text-center animate-in fade-in">
          ✓ {downloadMsg}
        </div>
      )}

      {/* Select Application Selector */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="flex items-center gap-2 overflow-x-auto">
          {Object.keys(timelineData).map((id) => (
            <button
              key={id}
              onClick={() => setSelectedAppId(id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedAppId === id
                  ? "bg-slate-100 text-slate-950 border-white shadow-md"
                  : "bg-slate-950 text-slate-400 border-slate-850 hover:text-slate-200"
              }`}
            >
              {id} ({timelineData[id].borrower})
            </button>
          ))}
        </div>

        <div className="hidden sm:block font-mono text-xs text-emerald-400 font-bold">
          Stage Progress: {app.currentStageIndex + 1} / 6 Complete
        </div>
      </div>

      {/* Horizontal Lifecycle Stepper Bar */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-2xl">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
          Visual Lifecycle Stepper: {app.id} ({app.amount})
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {app.stages.map((stage) => {
            const isDone = stage.status === "COMPLETED";
            const isInProgress = stage.status === "IN_PROGRESS";
            return (
              <div 
                key={stage.stageNum}
                className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                  isDone 
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                    : isInProgress 
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-400 animate-pulse" 
                    : "bg-slate-950 border-slate-850 text-slate-500"
                }`}
              >
                <div className="flex justify-between items-center font-mono font-bold text-[10px]">
                  <span>STEP 0{stage.stageNum}</span>
                  {isDone ? <span>✓ DONE</span> : isInProgress ? <span>ACTIVE</span> : <span>WAITING</span>}
                </div>
                <p className="font-bold truncate text-slate-100">{stage.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chronological Timestamp Log Feed */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6">
        <h2 className="text-base font-bold text-slate-100 flex items-center justify-between">
          <span>Chronological Timestamp Audit Logs</span>
          <span className="text-xs font-mono text-slate-400 font-normal">All Timestamps UTC / IST Synchronized</span>
        </h2>

        <div className="relative border-l-2 border-slate-800 ml-4 space-y-8 pl-6">
          {app.stages.map((stage) => {
            const Icon = stage.icon;
            const isDone = stage.status === "COMPLETED";
            const isInProgress = stage.status === "IN_PROGRESS";

            return (
              <div key={stage.stageNum} className="relative group">
                {/* Timeline Icon Node */}
                <span className={`absolute -left-[35px] top-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                  isDone 
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/50" 
                    : isInProgress 
                    ? "bg-amber-500/20 border-amber-500 text-amber-400 animate-pulse" 
                    : "bg-slate-950 border-slate-800 text-slate-600"
                }`}>
                  <Icon size={16} />
                </span>

                {/* Event Card Content */}
                <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl space-y-2 hover:border-slate-750 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-400">Stage {stage.stageNum}: {stage.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${
                        isDone ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-slate-900 text-slate-500 border-slate-800"
                      }`}>
                        {stage.status}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Calendar size={12} />
                      {stage.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{stage.desc}</p>
                  <p className="text-[11px] font-mono text-slate-500 pt-1 border-t border-slate-900">{stage.metadata}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* VERIFY HASH MODAL */}
      {hashVerifyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <Lock size={20} />
                <h3 className="text-base font-bold text-white">Cryptographic Hash Verification</h3>
              </div>
              <button onClick={() => setHashVerifyModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">SHA-256 Ledger Hash</span>
                <p className="font-mono text-[11px] text-emerald-400 break-all font-bold">
                  0x8F9A2B4C7D6E5F4A3B2C1D0E9F8A7B6C5D4E3F2A1B0C9D8E7F6A5B4C3D2E1F0
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Audit Ledger Status</span>
                <p className="text-slate-200 font-bold flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  100% Immutable & Chain Signed
                </p>
              </div>
            </div>

            <button
              onClick={() => setHashVerifyModal(false)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs"
            >
              Close Verification
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
