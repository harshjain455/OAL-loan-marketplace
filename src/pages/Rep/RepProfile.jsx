import React, { useState } from "react";
import { User, Briefcase, Mail, Phone, Save } from "lucide-react";

export default function RepProfile() {
  const [profile, setProfile] = useState({
    name: "Alex Mercer",
    title: "Senior OAL Representative",
    email: "rep@gmail.com",
    phone: "+1 (555) 019-8829",
    specialization: "Commercial Loans & Real Estate",
    bio: "Assisting qualified borrowers match with institutional lenders since 2024."
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile saved successfully!");
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Agent Profile</h1>
        <p className="text-sm text-slate-400">Manage your legal representative name, contact details, and lending specializations.</p>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-850">
          <div className="p-3 bg-blue-600/10 text-blue-400 rounded-full">
            <User size={32} />
          </div>
          <div>
            <h3 className="font-bold text-slate-200">{profile.name}</h3>
            <p className="text-xs text-slate-500">{profile.title}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Full Legal Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Specialization</label>
            <select
              value={profile.specialization}
              onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="Commercial Loans & Real Estate">Commercial Loans & Real Estate</option>
              <option value="Equipment & Machinery Financing">Equipment & Machinery Financing</option>
              <option value="Small Business Capital">Small Business Capital</option>
              <option value="Unsecured Personal Loans">Unsecured Personal Loans</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone Number</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Professional Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 h-20 resize-none"
          />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-500 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow">
          <Save size={14} />
          Save Changes
        </button>
      </form>
    </div>
  );
}
