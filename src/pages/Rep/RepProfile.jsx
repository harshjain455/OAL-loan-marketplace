import React, { useState } from "react";
import { User, Mail, Phone, Save, Camera, ShieldCheck, Award, CheckCircle } from "lucide-react";

export default function RepProfile() {
  const [profile, setProfile] = useState({
    name: "Alex Mercer",
    title: "Senior OAL Representative",
    email: "rep@gmail.com",
    phone: "+1 (555) 019-8829",
    specialization: "Commercial Loans & Real Estate",
    bio: "Assisting qualified borrowers match with institutional lenders since 2024."
  });

  const [avatar, setAvatar] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    showToast("Profile changes saved successfully!");
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-12 w-full">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Agent Profile</h1>
        <p className="text-sm text-slate-400">Manage your legal representative name, profile avatar, contact details, and lending specializations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Middle Column: Edit Profile Form */}
        <form onSubmit={handleSave} className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          {/* Avatar Upload Section */}
          <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-850">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-slate-950 border border-slate-850 flex items-center justify-center overflow-hidden text-slate-400">
                {avatar ? (
                  <img src={avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={40} />
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-500 rounded-full text-white cursor-pointer shadow-lg transition-colors">
                <Camera size={14} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-center sm:text-left space-y-1">
              <h3 className="font-bold text-slate-200 text-lg">Representative Photo</h3>
              <p className="text-xs text-slate-500">Upload a professional headshot. Accepted formats: JPG, PNG. Max size 2MB.</p>
              {avatar && (
                <button
                  type="button"
                  onClick={() => setAvatar(null)}
                  className="text-[10px] text-red-400 hover:underline font-semibold block"
                >
                  Remove photo
                </button>
              )}
            </div>
          </div>

          {/* Form Fields */}
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
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 h-24 resize-none"
            />
          </div>

          <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/10">
            <Save size={14} />
            Save Profile Details
          </button>
        </form>

        {/* Right Column: Status & Credentials */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 h-fit">
          <h3 className="font-bold text-sm text-slate-200 pb-2 border-b border-slate-850">License & Verification</h3>
          
          <div className="space-y-4">
            <div className="p-3 bg-slate-950 border border-slate-850 rounded-lg space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">License Status</span>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span className="font-bold text-emerald-400">ACTIVE & VERIFIED</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-850 rounded-lg space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">License ID:</span>
                <span className="font-bold text-slate-300">OAL-BROKER-99120</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Registered States:</span>
                <span className="font-bold text-slate-300">CA, NY, FL, TX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verification Date:</span>
                <span className="font-bold text-slate-300">2026-01-10</span>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-slate-950 to-blue-950 border border-blue-900/30 rounded-xl space-y-2">
              <Award size={20} className="text-blue-400" />
              <span className="font-bold text-xs text-slate-200 block">Senior Rep Commission Privileges</span>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                As a verified Senior OAL Representative, you are qualified for maximum split limits (up to 3.5%) and instant live bidding monitoring privileges.
              </p>
            </div>
          </div>
        </div>
      </div>
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-emerald-500 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 text-xs animate-bounce">
          <CheckCircle size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
