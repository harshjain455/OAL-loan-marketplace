import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { UserPlus } from "lucide-react";

const schema = zod.object({
  name: zod.string().min(2, "Full legal name is required"),
  email: zod.string().email("Invalid email address"),
  phone: zod.string().min(10, "Valid phone number is required"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
  role: zod.enum(["borrower", "lender", "rep"]),
});

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { role: "borrower" }
  });

  const onSubmit = (data) => {
    // Navigate to verification screen
    navigate(`/auth/mfa?role=${data.role}&new=true`);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
        <div className="flex flex-col items-center text-center">
          <UserPlus size={40} className="text-indigo-400 mb-3" />
          <h2 className="text-2xl font-bold text-slate-100">Create Account</h2>
          <p className="text-xs text-slate-400 mt-1">Register for the OAL Network Platform</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">I want to register as</label>
            <select
              {...register("role")}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="borrower">Borrower (Loan Applicant)</option>
              <option value="lender">Lender (Investor Partner)</option>
              <option value="rep">OAL Rep (Agent)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Full Legal Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Email Address</label>
            <input
              type="email"
              {...register("email")}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              placeholder="name@example.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Phone Number</label>
            <input
              type="text"
              {...register("phone")}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
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
            Register & Verify
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already registered? <Link to="/auth/login" className="text-indigo-400 hover:underline">Log in here</Link>
        </div>
      </div>
    </div>
  );
}
