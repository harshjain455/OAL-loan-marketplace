import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Shield } from "lucide-react";

const schema = zod.object({
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
  role: zod.enum(["borrower", "lender", "rep", "admin"]),
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
  }, [selectedRole, setValue]);

  const onSubmit = (data) => {
    // Redirect to MFA before landing on dashboard
    navigate(`/auth/mfa?role=${data.role}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
        <div className="flex flex-col items-center text-center">
          <Shield size={40} className="text-blue-500 mb-3" />
          <h2 className="text-2xl font-bold text-slate-100">Sign in to OAL</h2>
          <p className="text-sm text-slate-400 mt-1">Multi-Factor Authentication enabled</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Select Role</label>
            <select
              {...register("role")}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="borrower">Borrower / Applicant</option>
              <option value="lender">Lender / Investor</option>
              <option value="rep">OAL Representative</option>
              <option value="admin">System Admin</option>
            </select>
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
