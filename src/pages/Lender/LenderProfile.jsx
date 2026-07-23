import React, { useState } from "react";
import { User, Building2, ShieldCheck, Mail, Phone, MapPin, CheckCircle2, Award, Briefcase, Calendar, Save, Globe } from "lucide-react";

export default function LenderProfile() {
  const [companyName, setCompanyName] = useState("First Capital Partners LLC");
  const [contactName, setContactName] = useState("Robert Klein");
  const [email, setEmail] = useState("r.klein@firstcapital.com");
  const [phone, setPhone] = useState("+1 (555) 482-9210");
  const [website, setWebsite] = useState("www.firstcapital.com");
  const [address, setAddress] = useState("100 Wall Street, New York, NY 10005");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in w-full">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
            <User size={22} />
          </div>
          Company Profile
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review your registered corporate identity, active verifications, and institution details.
        </p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Profile Card & Verifications */}
        <div className="lg:col-span-1 space-y-6">
          {/* Identity Card */}
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 text-center space-y-4 shadow-xl">
            <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white font-black text-2xl flex items-center justify-center rounded-2xl mx-auto shadow-lg shadow-indigo-950/30">
              FC
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">{companyName}</h2>
              <p className="text-xs text-slate-400 mt-0.5">Primary Contact: {contactName}</p>
            </div>
            <div className="pt-2 border-t border-slate-800/60 flex justify-center gap-2">
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
                <Award size={12} />
                Lender Pro
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
                <ShieldCheck size={12} />
                Verified Rep
              </span>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Compliance Status</h3>
            <ul className="space-y-3">
              {[
                { label: "Corporate KYC Audit", desc: "Completed & Verified", date: "Jul 2026" },
                { label: "Capital Allocation Liquidity", desc: "Proof of Funds Cleared", date: "Jul 2026" },
                { label: "SEC Accredited Status", desc: "Accredited Lender File", date: "Verified 2026" }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">{item.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.desc} · {item.date}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Profile Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-800/60 pb-4">
              <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                <Building2 size={18} className="text-indigo-400" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Institutional Contact Details</h2>
                <p className="text-[11px] text-slate-400">Manage communication details routing from OAL marketplace.</p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Building2 size={12} /> Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <User size={12} /> Primary Contact
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Mail size={12} /> Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Phone size={12} /> Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none font-medium"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Globe size={12} /> Website URL
                  </label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none font-medium"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <MapPin size={12} /> Office Location Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 mt-6">
                {isSaved ? (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 animate-fade-in">
                    <CheckCircle2 size={13} />
                    Profile updated!
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-indigo-400" />
                    Secure SSL Profile Encryption
                  </span>
                )}
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer shadow"
                >
                  <Save size={14} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
