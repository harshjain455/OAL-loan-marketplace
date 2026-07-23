import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function MFAVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const role = searchParams.get("role") || "borrower";
  const isNew = searchParams.get("new") === "true";

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp === "123456" || otp.length === 6) {
      // Mock successful verification
      navigate(`/${role}`);
    } else {
      setError("Incorrect OTP verification code (Try '123456')");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
        <div className="flex flex-col items-center text-center">
          <ShieldCheck size={40} className="text-emerald-500 mb-3" />
          <h2 className="text-2xl font-bold text-slate-100">Verification Required</h2>
          <p className="text-xs text-slate-400 mt-1">
            We sent a 6-digit verification code to your verified contacts.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 text-center">
              Enter 6-Digit Code
            </label>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setError("");
              }}
              className="w-full text-center bg-slate-950 border border-slate-850 rounded-lg px-3 py-3 text-2xl font-bold tracking-widest text-slate-200 focus:outline-none focus:border-emerald-500"
              placeholder="000000"
            />
            {error && <p className="text-xs text-red-500 mt-2 text-center">{error}</p>}
          </div>

          <button type="submit" className="w-full bg-slate-100 text-slate-950 font-medium py-2.5 rounded-lg hover:bg-slate-200 transition-colors">
            Verify & Authenticate
          </button>
        </form>

        <p className="text-xs text-slate-500 text-center">
          For demo, enter <span className="font-mono text-slate-300 font-semibold">123456</span>
        </p>
      </div>
    </div>
  );
}
