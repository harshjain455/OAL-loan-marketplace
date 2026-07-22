import React from "react";

export default function BorrowerNotifications() {
  const notifications = [
    { title: "Documents Received", time: "2 hours ago", desc: "Your KYC identity document is queued for manual check." },
    { title: "MFA Setup Successful", time: "1 day ago", desc: "Multi-Factor Authentication has been enabled on your account." }
  ];

  return (
    <div className="space-y-6 font-sans text-slate-100">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <p className="text-sm text-slate-400">Keep track of system alerts and active processing updates.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl divide-y divide-slate-800">
        {notifications.map((item, idx) => (
          <div key={idx} className="p-6 space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <span className="text-xs text-slate-500">{item.time}</span>
            </div>
            <p className="text-xs text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
