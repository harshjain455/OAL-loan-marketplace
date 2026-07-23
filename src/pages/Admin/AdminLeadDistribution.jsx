import React, { useState } from "react";
import { 
  Users, GitBranch, MapPin, Briefcase, RefreshCw, UserCheck, CheckCircle, Search, Filter, Shield, Plus, Edit2, X, Check, Sliders, ArrowRightLeft, UserPlus
} from "lucide-react";

export default function AdminLeadDistribution() {
  // Mode State: Auto-Assignment vs Manual Assignment Mode
  const [autoAssignEnabled, setAutoAssignEnabled] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  
  // Modals state
  const [selectedBorrowerForReassign, setSelectedBorrowerForReassign] = useState(null);
  const [newSelectedRep, setNewSelectedRep] = useState("");
  const [reassignNote, setReassignNote] = useState("");
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);

  // Available OAL Reps (Agents)
  const [oalReps] = useState([
    { id: "REP-101", name: "Amit Verma", region: "North India (Delhi/NCR)", specialty: "Personal & Business", activeLeads: 14, status: "Available" },
    { id: "REP-102", name: "Priya Singh", region: "West India (Mumbai/Pune)", specialty: "Commercial Loans", activeLeads: 9, status: "Available" },
    { id: "REP-103", name: "Rohan Kulkarni", region: "South India (Bangalore/Chennai)", specialty: "Personal Loans", activeLeads: 18, status: "Busy" },
    { id: "REP-104", name: "Sneha Reddy", region: "East India (Kolkata)", specialty: "Micro-finance & SMB", activeLeads: 7, status: "Available" },
    { id: "REP-105", name: "Vikram Malhotra", region: "North India (Punjab/Haryana)", specialty: "High Ticket Commercial", activeLeads: 11, status: "Available" }
  ]);

  // Rules Engine Data (Auto-Assignment Rules)
  const [routingRules, setRoutingRules] = useState([
    { id: "RULE-01", name: "North Region Auto-Routing", location: "Delhi/NCR, Punjab", loanType: "All Loan Types", assignedRepId: "REP-101", assignedRepName: "Amit Verma", active: true },
    { id: "RULE-02", name: "High-Ticket Commercial Assignment", location: "Pan India", loanType: "Commercial > ₹25L", assignedRepId: "REP-105", assignedRepName: "Vikram Malhotra", active: true },
    { id: "RULE-03", name: "West Zone Business Loans", location: "Mumbai, Pune, Gujarat", loanType: "Business Loan", assignedRepId: "REP-102", assignedRepName: "Priya Singh", active: true },
    { id: "RULE-04", name: "South Tech Corridor Personal Loans", location: "Bangalore, Hyderabad", loanType: "Personal Loan", assignedRepId: "REP-103", assignedRepName: "Rohan Kulkarni", active: false }
  ]);

  // New Rule Form State
  const [newRule, setNewRule] = useState({ name: "", location: "Delhi/NCR", loanType: "Personal Loan", assignedRepId: "REP-101" });

  // Borrower Leads List Data
  const [borrowerLeads, setBorrowerLeads] = useState([
    { id: "BOR-101", name: "Rahul Sharma", email: "rahul.sharma@example.com", location: "Delhi/NCR", loanType: "Personal Loan", amount: "₹5,00,000", assignedRepId: "REP-101", assignedRepName: "Amit Verma", mode: "Auto-Routed", assignedDate: "2026-01-22" },
    { id: "BOR-102", name: "Priya Patel", email: "priya.patel@example.com", location: "Mumbai", loanType: "Business Loan", amount: "₹15,00,000", assignedRepId: "REP-102", assignedRepName: "Priya Singh", mode: "Auto-Routed", assignedDate: "2026-01-21" },
    { id: "BOR-103", name: "Anish Gupta", email: "anish.g@example.com", location: "Bangalore", loanType: "Commercial Loan", amount: "₹35,00,000", assignedRepId: "REP-105", assignedRepName: "Vikram Malhotra", mode: "Manually Assigned", assignedDate: "2026-01-20" },
    { id: "BOR-104", name: "Meera Nair", email: "meera.nair@example.com", location: "Chennai", loanType: "Personal Loan", amount: "₹3,50,000", assignedRepId: "REP-103", assignedRepName: "Rohan Kulkarni", mode: "Auto-Routed", assignedDate: "2026-01-19" },
    { id: "BOR-105", name: "Sunil Kumar", email: "sunil.k@example.com", location: "Kolkata", loanType: "Micro-finance", amount: "₹2,00,000", assignedRepId: "REP-104", assignedRepName: "Sneha Reddy", mode: "Unassigned", assignedDate: "2026-01-23" }
  ]);

  // Handle Rule Toggle
  const handleToggleRule = (ruleId) => {
    setRoutingRules(prev => prev.map(rule => rule.id === ruleId ? { ...rule, active: !rule.active } : rule));
  };

  // Handle Create New Rule
  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newRule.name) return;
    const rep = oalReps.find(r => r.id === newRule.assignedRepId);
    const createdRule = {
      id: `RULE-0${routingRules.length + 1}`,
      name: newRule.name,
      location: newRule.location,
      loanType: newRule.loanType,
      assignedRepId: newRule.assignedRepId,
      assignedRepName: rep ? rep.name : "Unassigned",
      active: true
    };
    setRoutingRules([...routingRules, createdRule]);
    setShowAddRuleModal(false);
    setNewRule({ name: "", location: "Delhi/NCR", loanType: "Personal Loan", assignedRepId: "REP-101" });
  };

  // Handle Manual Re-assignment
  const handleConfirmReassign = () => {
    if (!selectedBorrowerForReassign || !newSelectedRep) return;
    const targetRep = oalReps.find(r => r.id === newSelectedRep);
    if (!targetRep) return;

    setBorrowerLeads(prev => prev.map(b => {
      if (b.id === selectedBorrowerForReassign.id) {
        return {
          ...b,
          assignedRepId: targetRep.id,
          assignedRepName: targetRep.name,
          mode: "Manually Assigned",
          assignedDate: new Date().toISOString().split("T")[0]
        };
      }
      return b;
    }));

    setSelectedBorrowerForReassign(null);
    setNewSelectedRep("");
    setReassignNote("");
  };

  // Filtered Borrower Leads
  const filteredLeads = borrowerLeads.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.assignedRepName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === "All Regions" || b.location.includes(regionFilter);
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Header & Auto-Assignment Master Switch */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Lead Distribution Rules Engine
            <span className={`text-xs px-3 py-1 rounded-full font-medium border flex items-center gap-1.5 ${
              autoAssignEnabled ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-amber-500/10 text-amber-400 border-amber-500/30"
            }`}>
              <span className={`w-2 h-2 rounded-full ${autoAssignEnabled ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              {autoAssignEnabled ? "Auto-Assignment Engine Active" : "Manual Assignment Mode"}
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Configure automated routing rules based on location and loan type, or manually re-assign borrowers to OAL Reps.</p>
        </div>

        {/* Master Toggle Switch */}
        <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <span className="text-xs font-medium text-slate-300">Auto-Routing Mode</span>
          <button
            onClick={() => setAutoAssignEnabled(!autoAssignEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
              autoAssignEnabled ? "bg-emerald-600" : "bg-slate-700"
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              autoAssignEnabled ? "translate-x-6" : "translate-x-0"
            }`} />
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Active Leads</p>
            <p className="text-2xl font-bold text-white mt-1">{borrowerLeads.length}</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <Users size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Auto-Routed Leads</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{borrowerLeads.filter(b => b.mode === "Auto-Routed").length}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <GitBranch size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Unassigned Queue</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{borrowerLeads.filter(b => b.mode === "Unassigned").length}</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <UserPlus size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Active OAL Reps</p>
            <p className="text-2xl font-bold text-purple-400 mt-1">{oalReps.length}</p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
            <UserCheck size={20} />
          </div>
        </div>
      </div>

      {/* Rules Engine Section (Auto-Assignment Rules) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders size={20} className="text-blue-400" />
              Automated Routing Rules Engine
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Define automated rules based on geographical location and loan product type.</p>
          </div>
          <button
            onClick={() => setShowAddRuleModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Plus size={16} />
            Add Routing Rule
          </button>
        </div>

        {/* Rules Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {routingRules.map((rule) => (
            <div 
              key={rule.id}
              className={`p-4 rounded-xl border transition-all ${
                rule.active ? "bg-slate-950/80 border-slate-800" : "bg-slate-950/40 border-slate-850 opacity-60"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">{rule.id}</span>
                  <h3 className="text-sm font-bold text-white mt-1">{rule.name}</h3>
                </div>
                <button
                  onClick={() => handleToggleRule(rule.id)}
                  className={`px-2.5 py-1 text-[11px] rounded-full font-medium transition-colors ${
                    rule.active ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {rule.active ? "Rule Active" : "Disabled"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 text-xs bg-slate-900 p-3 rounded-lg border border-slate-850">
                <div>
                  <p className="text-slate-500 text-[11px]">Location Filter</p>
                  <p className="font-semibold text-slate-200 mt-0.5 flex items-center gap-1">
                    <MapPin size={12} className="text-red-400" />
                    {rule.location}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 text-[11px]">Loan Product</p>
                  <p className="font-semibold text-slate-200 mt-0.5 flex items-center gap-1">
                    <Briefcase size={12} className="text-purple-400" />
                    {rule.loanType}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-850 flex justify-between items-center text-xs">
                <span className="text-slate-400">Assigned OAL Rep:</span>
                <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  {rule.assignedRepName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Borrower Lead Management & Manual Re-Assignment Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users size={20} className="text-emerald-400" />
              Borrower Lead Assignment Console
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">View current assigned OAL Reps and perform manual re-assignments.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search borrower or rep..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Borrower Name & ID</th>
                <th className="px-6 py-4 font-semibold">Location & Loan Details</th>
                <th className="px-6 py-4 font-semibold">Assigned OAL Rep</th>
                <th className="px-6 py-4 font-semibold">Routing Method</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.map((borrower) => (
                <tr key={borrower.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-slate-100 text-xs">{borrower.name}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{borrower.id} • {borrower.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <div>
                      <p className="text-slate-200 font-medium">{borrower.location} • <span className="text-emerald-400 font-mono">{borrower.amount}</span></p>
                      <p className="text-slate-500 text-[11px]">{borrower.loanType}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-blue-400">
                        {borrower.assignedRepName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-200">{borrower.assignedRepName}</p>
                        <p className="text-[10px] text-slate-500">{borrower.assignedRepId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      borrower.mode === "Auto-Routed"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : borrower.mode === "Manually Assigned"
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      <GitBranch size={12} />
                      {borrower.mode}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedBorrowerForReassign(borrower);
                        setNewSelectedRep(borrower.assignedRepId);
                      }}
                      className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 text-xs font-medium rounded-lg transition-all inline-flex items-center gap-1.5"
                    >
                      <ArrowRightLeft size={14} />
                      Re-Assign Rep
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Re-Assignment Modal */}
      {selectedBorrowerForReassign && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ArrowRightLeft size={18} className="text-blue-400" />
                Re-Assign Borrower Lead
              </h3>
              <button onClick={() => setSelectedBorrowerForReassign(null)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <p className="text-slate-500">Target Borrower</p>
                <p className="font-bold text-sm text-white">{selectedBorrowerForReassign.name} ({selectedBorrowerForReassign.id})</p>
                <p className="text-slate-400">{selectedBorrowerForReassign.location} • {selectedBorrowerForReassign.loanType}</p>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Select New OAL Rep (Agent)</label>
                <select
                  value={newSelectedRep}
                  onChange={(e) => setNewSelectedRep(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  {oalReps.map(rep => (
                    <option key={rep.id} value={rep.id}>
                      {rep.name} ({rep.region} - {rep.activeLeads} active leads)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Re-Assignment Reason / Note</label>
                <textarea
                  rows={3}
                  placeholder="Reason for manual override..."
                  value={reassignNote}
                  onChange={(e) => setReassignNote(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950">
              <button
                onClick={() => setSelectedBorrowerForReassign(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReassign}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
              >
                Confirm Re-Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Routing Rule Modal */}
      {showAddRuleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus size={18} className="text-blue-400" />
                Create Auto-Routing Rule
              </h3>
              <button onClick={() => setShowAddRuleModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddRule} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Rule Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. South Zone Commercial Routing"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Target Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Delhi/NCR, Haryana"
                  value={newRule.location}
                  onChange={(e) => setNewRule({ ...newRule, location: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Loan Product Type</label>
                <select
                  value={newRule.loanType}
                  onChange={(e) => setNewRule({ ...newRule, loanType: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Business Loan">Business Loan</option>
                  <option value="Commercial Loan">Commercial Loan</option>
                  <option value="Micro-finance">Micro-finance</option>
                  <option value="All Loan Types">All Loan Types</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Assign To Rep</label>
                <select
                  value={newRule.assignedRepId}
                  onChange={(e) => setNewRule({ ...newRule, assignedRepId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  {oalReps.map(rep => (
                    <option key={rep.id} value={rep.id}>{rep.name} ({rep.region})</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddRuleModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
                >
                  Save & Deploy Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
