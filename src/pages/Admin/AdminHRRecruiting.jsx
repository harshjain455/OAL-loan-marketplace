import React, { useState } from "react";
import { Users, Search, Mail, PhoneCall } from "lucide-react";

export default function AdminHRRecruiting() {
  const [candidates] = useState([
    { name: "Alice Johnson", role: "Junior Underwriter", skills: ["Risk Analysis", "KYC Check"], status: "Screened" },
    { name: "Robert Smith", role: "Lead Loan Representative", skills: ["Customer Service", "Escrow Control"], status: "Interviewed" }
  ]);

  return (
    <div className="space-y-6 text-slate-100 font-sans max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">HR Recruiting & Sourcing Portal</h1>
        <p className="text-sm text-slate-400">Manage candidate database profiles, tag skills, and initiate outreach campaigns</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-850 pb-3">
          <h3 className="font-semibold text-sm">Candidate Database Management</h3>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded">ATS Integrated</span>
          </div>
        </div>

        <div className="space-y-3">
          {candidates.map((cand, idx) => (
            <div key={idx} className="p-4 bg-slate-950 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-slate-900 hover:border-slate-800 transition-colors">
              <div>
                <h4 className="font-semibold text-sm">{cand.name}</h4>
                <p className="text-xs text-slate-400">{cand.role} &bull; Status: <span className="text-blue-400">{cand.status}</span></p>
                <div className="flex gap-1.5 mt-2">
                  {cand.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 bg-slate-900 text-slate-400 rounded text-[10px] font-medium border border-slate-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => alert(`Outreach Email sequence triggered for ${cand.name}`)}
                  className="p-1.5 bg-slate-900 text-slate-400 hover:text-slate-100 rounded-lg border border-slate-800"
                  title="Send Automated Outreach Email"
                >
                  <Mail size={16} />
                </button>
                <button
                  onClick={() => alert(`Outreach SMS sequence triggered for ${cand.name}`)}
                  className="p-1.5 bg-slate-900 text-slate-400 hover:text-slate-100 rounded-lg border border-slate-800"
                  title="Send Automated Outreach SMS"
                >
                  <PhoneCall size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
