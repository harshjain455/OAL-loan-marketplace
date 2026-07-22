import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const schema = zod.object({
  amount: zod.number().min(1000, "Minimum loan amount is $1,000"),
  duration: zod.number().min(1, "Minimum duration is 1 month"),
  purpose: zod.string().min(10, "Please provide a detailed purpose (minimum 10 characters)"),
});

export default function BorrowerLoanApplication() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    alert("Application Details Saved! Proceed to upload your KYC documents next.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Loan Application Form</h1>
        <p className="text-sm text-slate-400">Provide details of your required loan request</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Requested Loan Amount ($)</label>
            <input
              type="number"
              {...register("amount", { valueAsNumber: true })}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              placeholder="e.g. 50000"
            />
            {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Requested Duration (Months)</label>
            <input
              type="number"
              {...register("duration", { valueAsNumber: true })}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              placeholder="e.g. 12"
            />
            {errors.duration && <p className="text-xs text-red-500 mt-1">{errors.duration.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Loan Purpose & Business Context</label>
            <textarea
              {...register("purpose")}
              rows={4}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              placeholder="Explain why you need the funding..."
            />
            {errors.purpose && <p className="text-xs text-red-500 mt-1">{errors.purpose.message}</p>}
          </div>

          <button type="submit" className="bg-slate-100 text-slate-950 font-medium px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors">
            Submit Loan Application
          </button>
        </form>
      </div>
    </div>
  );
}
