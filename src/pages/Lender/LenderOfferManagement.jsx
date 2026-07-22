import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const schema = zod.object({
  leadId: zod.string().min(3, "Lead ID required"),
  amount: zod.number().min(1000, "Minimum amount is $1,000"),
  rate: zod.number().min(1, "Minimum rate is 1%"),
  duration: zod.number().min(1, "Duration required"),
});

export default function LenderOfferManagement() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    alert(`Offer Submitted for ${data.leadId}! Price: $${data.amount} at ${data.rate}%`);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Offer Management</h1>
        <p className="text-sm text-slate-400">Deploy custom loan offers directly to qualified leads</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Target Lead ID</label>
            <input
              type="text"
              {...register("leadId")}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              placeholder="e.g. Lead #2918"
            />
            {errors.leadId && <p className="text-xs text-red-500 mt-1">{errors.leadId.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Offer Loan Amount ($)</label>
            <input
              type="number"
              {...register("amount", { valueAsNumber: true })}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              placeholder="e.g. 50000"
            />
            {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Annual Interest Rate (%)</label>
            <input
              type="number"
              step="0.01"
              {...register("rate", { valueAsNumber: true })}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              placeholder="e.g. 6.5"
            />
            {errors.rate && <p className="text-xs text-red-550 mt-1">{errors.rate.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Duration (Months)</label>
            <input
              type="number"
              {...register("duration", { valueAsNumber: true })}
              className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              placeholder="e.g. 12"
            />
            {errors.duration && <p className="text-xs text-red-500 mt-1">{errors.duration.message}</p>}
          </div>

          <button type="submit" className="bg-slate-100 text-slate-950 font-semibold px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors">
            Submit Offer
          </button>
        </form>
      </div>
    </div>
  );
}
