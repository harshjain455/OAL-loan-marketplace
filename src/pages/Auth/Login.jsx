import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Shield, ArrowLeft } from "lucide-react";

const schema = zod.object({
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
  role: zod.enum(["borrower", "lender", "rep", "admin", "network"]),
});

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { 
      role: "borrower",
      email: "borrower@gmail.com",
      password: "123456"
    }
  });

  const selectedRole = watch("role");

  useEffect(() => {
    if (selectedRole === "borrower") setValue("email", "borrower@gmail.com");
    if (selectedRole === "lender") setValue("email", "lender@gmail.com");
    if (selectedRole === "rep") setValue("email", "rep@gmail.com");
    if (selectedRole === "admin") setValue("email", "admin@gmail.com");
    if (selectedRole === "network") setValue("email", "network@gmail.com");
  }, [selectedRole, setValue]);

  const onSubmit = (data) => {
    localStorage.setItem("oal_user_role", data.role);
    localStorage.setItem("oal_user_email", data.email);
    const roleNameMap = {
      borrower: "Rahul Sharma",
      lender: "Apex Capital Lending",
      rep: "Amit Verma",
      admin: "Vikramaditya Roy",
      network: "Network Stream Viewer"
    };
    localStorage.setItem("oal_user_name", roleNameMap[data.role] || "System Admin");
    // Redirect to MFA before landing on dashboard
    navigate(`/auth/mfa?role=${data.role}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 font-sans relative">
      <Link to="/" className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center text-slate-400 hover:text-slate-100 transition-colors">
        <ArrowLeft size={20} className="mr-2" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
        <div className="flex flex-col items-center text-center">
          <Shield size={40} className="text-blue-500 mb-3" />
          <h2 className="text-2xl font-bold text-slate-100">Sign in to OAL</h2>
          <p className="text-sm text-slate-400 mt-1">Multi-Factor Authentication enabled</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Select Role</label>
            <input type="hidden" {...register("role")} />
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "borrower", label: "Borrower / Applicant" },
                { id: "lender", label: "Lender / Investor" },
                { id: "rep", label: "OAL Representative" },
                { id: "admin", label: "System Admin" },
                { id: "network", label: "Network Stream Panel" }
              ].map((roleOption) => (
                <button
                  key={roleOption.id}
                  type="button"
                  onClick={() => setValue("role", roleOption.id)}
                  className={`px-3 py-2.5 rounded-lg border text-xs font-medium transition-all text-center ${
                    selectedRole === roleOption.id
                      ? "bg-blue-600 border-blue-500 text-slate-100 shadow-lg shadow-blue-500/20"
                      : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  } ${roleOption.id === "network" ? "col-span-2 bg-purple-900/30 border-purple-500/30 text-purple-300 hover:bg-purple-900/50" : ""}`}
                >
                  {roleOption.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Email Address</label>
            <input
              type="email"
              {...register("email")}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              placeholder="name@company.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full bg-slate-100 text-slate-950 font-medium py-2 rounded-lg hover:bg-slate-200 transition-colors">
            Continue to Verification
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          New here? <Link to="/auth/register" className="text-blue-400 hover:underline">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
