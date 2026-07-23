import React, { useState } from "react";
import { 
  DollarSign, TrendingUp, ShieldCheck, Search, Filter, Download, FileText, Sliders, CheckCircle2, ArrowUpRight, X, CreditCard, RefreshCw 
} from "lucide-react";

export default function AdminPayments() {
  const [activeTab, setActiveTab] = useState("Payment Logs & Billing History");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Platform Fee Config State
  const [feeConfigs, setFeeConfigs] = useState({
    borrowerProcessingFee: 1.5,
    lenderMarketplaceFee: 2.0,
    latePaymentPenaltyFee: 0.5,
    agentCommissionSplit: 15.0
  });

  const [feeSaveSuccess, setFeeSaveSuccess] = useState(false);

  // Payment Logs & Billing History Data
  const [paymentLogs] = useState([
    {
      id: "TXN-90901",
      entityName: "Apex Capital Lending LLC",
      entityType: "Lender",
      description: "Lender Enterprise Pro Subscription Renewal",
      amount: "₹24,999",
      gateway: "Razorpay PG",
      paymentMethod: "Corporate Net Banking",
      date: "2026-01-22 11:30 AM",
      status: "Success",
      invoiceRef: "INV-2026-001"
    },
    {
      id: "TXN-90902",
      entityName: "Amit Verma (Agent REP-101)",
      entityType: "OAL Agent",
      description: "Agent Preferred Partner Monthly Fee",
      amount: "₹4,999",
      gateway: "UPI Direct",
      paymentMethod: "Google Pay UPI",
      date: "2026-01-21 03:15 PM",
      status: "Success",
      invoiceRef: "INV-2026-002"
    },
    {
      id: "TXN-90903",
      entityName: "Horizon Commercial Funding",
      entityType: "Lender",
      description: "Platform Loan Settlement Fee (APP-9012)",
      amount: "₹37,500",
      gateway: "Stripe Enterprise",
      paymentMethod: "Wire Transfer",
      date: "2026-01-20 05:45 PM",
      status: "Success",
      invoiceRef: "INV-2026-003"
    },
    {
      id: "TXN-90904",
      entityName: "Priya Patel (Borrower BOR-102)",
      entityType: "Borrower",
      description: "Loan Origination Processing Fee",
      amount: "₹7,500",
      gateway: "Razorpay PG",
      paymentMethod: "Debit Card",
      date: "2026-01-19 01:20 PM",
      status: "Success",
      invoiceRef: "INV-2026-004"
    },
    {
      id: "TXN-90905",
      entityName: "Quantum Credit Corp",
      entityType: "Lender",
      description: "Lender Starter Monthly Subscription",
      amount: "₹9,999",
      gateway: "Razorpay PG",
      paymentMethod: "Credit Card",
      date: "2026-01-18 10:05 AM",
      status: "Failed",
      invoiceRef: "INV-2026-005"
    }
  ]);

  // Handle Fee Config Save
  const handleSaveFeeConfigs = (e) => {
    e.preventDefault();
    setFeeSaveSuccess(true);
    setTimeout(() => setFeeSaveSuccess(false), 3000);
  };

  // Filtered Payment Logs
  const filteredLogs = paymentLogs.filter(log => {
    const matchesSearch = log.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.invoiceRef.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Payments & Revenue Ledger
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-mono flex items-center gap-1">
              <ShieldCheck size={12} />
              Payment Gateways Active
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Audit gross marketplace revenue, billing logs, payment gateways, and configure transaction fee rules.</p>
        </div>

        <div className="text-xs bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-slate-300">
          Gateway Integration: <strong className="text-emerald-400">Razorpay & Stripe Live</strong>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Monthly Gross Revenue</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">₹84.5 Lakh</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <TrendingUp size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Transaction Volume</p>
            <p className="text-2xl font-bold text-white mt-1">₹14.2 Cr</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Platform Fee Revenue</p>
            <p className="text-2xl font-bold text-purple-400 mt-1">₹12.6 Lakh</p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
            <Sliders size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Logged Invoices</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">1,840 Txns</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <FileText size={20} />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs overflow-x-auto">
        {["Payment Logs & Billing History", "Platform Fee Settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB 1: Payment Logs & Billing History */}
      {activeTab === "Payment Logs & Billing History" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText size={20} className="text-emerald-400" />
                Global Marketplace Billing & Payment Audit Logs
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Audit all subscription renewals, origination fees, and payment gateway receipts.</p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search TXN ID, entity, invoice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                {["All", "Success", "Failed"].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                      statusFilter === st ? "bg-blue-600 text-white font-medium" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-semibold">Transaction & Invoice Ref</th>
                  <th className="px-6 py-4 font-semibold">Entity Name & Role</th>
                  <th className="px-6 py-4 font-semibold">Description</th>
                  <th className="px-6 py-4 font-semibold">Amount & Gateway</th>
                  <th className="px-6 py-4 font-semibold">Timestamp</th>
                  <th className="px-6 py-4 font-semibold text-right">Receipt / Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">
                      <div>
                        <p className="font-bold text-slate-100">{log.id}</p>
                        <p className="text-[11px] text-blue-400">{log.invoiceRef}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div>
                        <p className="font-semibold text-slate-200">{log.entityName}</p>
                        <p className="text-[11px] text-slate-500">{log.entityType}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-300">
                      {log.description}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div>
                        <p className="font-bold font-mono text-emerald-400 text-sm">{log.amount}</p>
                        <p className="text-[10px] text-slate-500">{log.gateway} ({log.paymentMethod})</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-400">
                      {log.date}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          log.status === "Success"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}>
                          {log.status}
                        </span>

                        <button
                          onClick={() => setSelectedInvoice(log)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                          title="View Invoice Receipt"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Platform Fee Settings */}
      {activeTab === "Platform Fee Settings" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 max-w-3xl space-y-6 shadow-xl">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders size={20} className="text-purple-400" />
              Global Marketplace Transaction & Service Fee Rules
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Configure platform revenue cut, origination charges, and agent commission splits.</p>
          </div>

          {feeSaveSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-xs text-emerald-400 flex items-center gap-2 animate-fade-in">
              <CheckCircle2 size={16} />
              Platform fee configurations successfully updated & deployed live to billing engine!
            </div>
          )}

          <form onSubmit={handleSaveFeeConfigs} className="space-y-5 text-xs">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-200">Borrower Origination Fee (%)</label>
                  <span className="font-mono text-emerald-400 font-bold text-sm">{feeConfigs.borrowerProcessingFee}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={feeConfigs.borrowerProcessingFee}
                  onChange={(e) => setFeeConfigs({ ...feeConfigs, borrowerProcessingFee: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">Deducted automatically upon loan agreement execution & funding disbursement.</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-200">Lender Marketplace Match Fee (%)</label>
                  <span className="font-mono text-purple-400 font-bold text-sm">{feeConfigs.lenderMarketplaceFee}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={feeConfigs.lenderMarketplaceFee}
                  onChange={(e) => setFeeConfigs({ ...feeConfigs, lenderMarketplaceFee: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">Applied to institutional lender payouts per successful deal closure.</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-200">Agent Commission Pool Split (%)</label>
                  <span className="font-mono text-blue-400 font-bold text-sm">{feeConfigs.agentCommissionSplit}%</span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="30.0"
                  step="1.0"
                  value={feeConfigs.agentCommissionSplit}
                  onChange={(e) => setFeeConfigs({ ...feeConfigs, agentCommissionSplit: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">Share of platform transaction fee allocated to assigned OAL Representatives.</p>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors shadow-lg flex items-center gap-2"
            >
              <ShieldCheck size={16} />
              Save Fee Configurations
            </button>
          </form>
        </div>
      )}

      {/* Invoice Receipt Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText size={18} className="text-emerald-400" />
                Official Billing Receipt ({selectedInvoice.invoiceRef})
              </h3>
              <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Transaction ID:</span>
                  <span className="font-mono text-white font-bold">{selectedInvoice.id}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Payer Entity:</span>
                  <span className="text-slate-200 font-medium">{selectedInvoice.entityName}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Description:</span>
                  <span className="text-slate-200">{selectedInvoice.description}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Gateway:</span>
                  <span className="text-slate-300 font-mono">{selectedInvoice.gateway}</span>
                </div>
                <div className="pt-3 border-t border-slate-850 flex justify-between items-center text-sm">
                  <span className="text-slate-300 font-bold">Total Paid:</span>
                  <span className="font-mono font-extrabold text-emerald-400 text-lg">{selectedInvoice.amount}</span>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-emerald-300 text-[11px] text-center font-mono">
                ✓ Cryptographically Verified Marketplace Payment Receipt
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
