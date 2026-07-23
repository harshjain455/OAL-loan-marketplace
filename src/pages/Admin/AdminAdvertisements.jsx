import React, { useState } from "react";
import { 
  Tv, Layout, Eye, MousePointer, Plus, Edit2, Play, Pause, Trash2, CheckCircle2, ShieldAlert, Layers, Image as ImageIcon, Calendar, ExternalLink, X, Check, Save 
} from "lucide-react";

export default function AdminAdvertisements() {
  const [targetPortalFilter, setTargetPortalFilter] = useState("All Portals");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);

  // Ad Campaign Form State
  const [campaignForm, setCampaignForm] = useState({
    title: "",
    placement: "Dashboard Top Banner",
    targetPortals: ["Borrower Portal", "Lender Portal"],
    creativeUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=60",
    destinationUrl: "https://oaloan.com/promos/prime-rate",
    startDate: "2026-02-01",
    endDate: "2026-03-01",
    status: "Active"
  });

  // Mock Ad Campaigns Data
  const [campaigns, setCampaigns] = useState([
    {
      id: "AD-101",
      title: "Prime Interest Rate Offer (Personal Loans)",
      placement: "Dashboard Top Banner",
      targetPortals: ["Borrower Portal"],
      creativeUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=60",
      destinationUrl: "https://oaloan.com/promos/prime-rate",
      startDate: "2026-01-01",
      endDate: "2026-02-28",
      impressions: "48,250",
      clicks: "2,140",
      ctr: "4.4%",
      status: "Active"
    },
    {
      id: "AD-102",
      title: "Lender Yield Maximizer Pro Feature",
      placement: "Sidebar Promo Box",
      targetPortals: ["Lender Portal"],
      creativeUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
      destinationUrl: "https://oaloan.com/lender-pro",
      startDate: "2026-01-10",
      endDate: "2026-03-15",
      impressions: "32,100",
      clicks: "1,890",
      ctr: "5.8%",
      status: "Active"
    },
    {
      id: "AD-103",
      title: "Agent High-Volume Incentive Bonus",
      placement: "Portal Header Announcement",
      targetPortals: ["OAL Rep Portal"],
      creativeUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=60",
      destinationUrl: "https://oaloan.com/rep-bonus",
      startDate: "2026-01-15",
      endDate: "2026-02-15",
      impressions: "14,800",
      clicks: "850",
      ctr: "5.7%",
      status: "Active"
    },
    {
      id: "AD-104",
      title: "Festive Season Zero Processing Fee",
      placement: "Dashboard Top Banner",
      targetPortals: ["Borrower Portal", "Lender Portal", "OAL Rep Portal"],
      creativeUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60",
      destinationUrl: "https://oaloan.com/festive-offer",
      startDate: "2025-11-01",
      endDate: "2025-12-31",
      impressions: "95,400",
      clicks: "3,620",
      ctr: "3.7%",
      status: "Paused"
    }
  ]);

  // Toggle Campaign Status (Pause/Activate)
  const handleToggleStatus = (campaignId) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === campaignId) {
        return {
          ...c,
          status: c.status === "Active" ? "Paused" : "Active"
        };
      }
      return c;
    }));
  };

  // Delete Campaign
  const handleDeleteCampaign = (campaignId) => {
    setCampaigns(prev => prev.filter(c => c.id !== campaignId));
  };

  // Create Campaign Submit
  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (!campaignForm.title) return;

    const newAd = {
      id: `AD-${100 + campaigns.length + 1}`,
      title: campaignForm.title,
      placement: campaignForm.placement,
      targetPortals: campaignForm.targetPortals,
      creativeUrl: campaignForm.creativeUrl,
      destinationUrl: campaignForm.destinationUrl,
      startDate: campaignForm.startDate,
      endDate: campaignForm.endDate,
      impressions: "0",
      clicks: "0",
      ctr: "0.0%",
      status: campaignForm.status
    };

    setCampaigns([newAd, ...campaigns]);
    setShowCreateModal(false);
  };

  // Save Edited Campaign
  const handleSaveEditCampaign = (e) => {
    e.preventDefault();
    if (!editingCampaign) return;

    setCampaigns(prev => prev.map(c => c.id === editingCampaign.id ? editingCampaign : c));
    setEditingCampaign(null);
  };

  // Target Portal Checkbox Toggle in Form
  const handlePortalCheckboxToggle = (portalName, isEditing = false) => {
    if (isEditing) {
      const current = editingCampaign.targetPortals || [];
      const updated = current.includes(portalName)
        ? current.filter(p => p !== portalName)
        : [...current, portalName];
      setEditingCampaign({ ...editingCampaign, targetPortals: updated });
    } else {
      const current = campaignForm.targetPortals || [];
      const updated = current.includes(portalName)
        ? current.filter(p => p !== portalName)
        : [...current, portalName];
      setCampaignForm({ ...campaignForm, targetPortals: updated });
    }
  };

  // Filtered Campaigns based on Portal Tab
  const filteredCampaigns = campaigns.filter(c => {
    if (targetPortalFilter === "All Portals") return true;
    return c.targetPortals.includes(targetPortalFilter);
  });

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Header & Create Campaign Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Advertisements & Banner Management
            <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full font-mono flex items-center gap-1">
              <Tv size={12} />
              Portal Display Engine Active
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Control system structure of ads displayed on Borrower, Lender, and Rep portals. Upload creatives & set visibility rules.</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-purple-900/20 flex items-center gap-2"
        >
          <Plus size={16} />
          Create New Ad Campaign
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Active Ad Campaigns</p>
            <p className="text-2xl font-bold text-white mt-1">{campaigns.filter(c => c.status === "Active").length}</p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg">
            <Tv size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Ad Impressions</p>
            <p className="text-2xl font-bold text-blue-400 mt-1">190.5K</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <Eye size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Avg. Click-Through Rate</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">4.9%</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <MousePointer size={20} />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Target Portals Covered</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">3 Portals</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <Layout size={20} />
          </div>
        </div>
      </div>

      {/* Target Portal Filter Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs overflow-x-auto">
        {["All Portals", "Borrower Portal", "Lender Portal", "OAL Rep Portal"].map((portal) => (
          <button
            key={portal}
            onClick={() => setTargetPortalFilter(portal)}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              targetPortalFilter === portal
                ? "bg-purple-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {portal}
          </button>
        ))}
      </div>

      {/* Ad Campaigns Grid / Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Tv size={20} className="text-purple-400" />
              Active System Banners & Visibility Rules
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Manage creative assets, target portal placements, and schedule dates.</p>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Creative & Campaign Title</th>
                <th className="px-6 py-4 font-semibold">Placement & Position</th>
                <th className="px-6 py-4 font-semibold">Target Portals</th>
                <th className="px-6 py-4 font-semibold">Schedule Window</th>
                <th className="px-6 py-4 font-semibold">Performance Stats</th>
                <th className="px-6 py-4 font-semibold text-right">Status & Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCampaigns.map((ad) => (
                <tr key={ad.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={ad.creativeUrl}
                        alt={ad.title}
                        className="w-14 h-10 rounded-lg object-cover border border-slate-700 bg-slate-950"
                      />
                      <div>
                        <p className="font-semibold text-slate-100 text-xs truncate max-w-[200px]">{ad.title}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{ad.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                      {ad.placement}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {ad.targetPortals.map(p => (
                        <span key={p} className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full font-medium">
                          {p.replace(" Portal", "")}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">
                    <div>
                      <p className="text-slate-300">{ad.startDate}</p>
                      <p className="text-slate-500 text-[10px]">To: {ad.endDate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono">
                    <div>
                      <p className="text-slate-200 font-bold">{ad.impressions} Impr.</p>
                      <p className="text-emerald-400 text-[11px]">{ad.clicks} Clicks ({ad.ctr} CTR)</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleStatus(ad.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          ad.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20"
                        }`}
                        title={ad.status === "Active" ? "Pause Campaign" : "Activate Campaign"}
                      >
                        {ad.status === "Active" ? <Pause size={14} /> : <Play size={14} />}
                      </button>

                      <button
                        onClick={() => setEditingCampaign({ ...ad })}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
                        title="Edit Campaign & Rules"
                      >
                        <Edit2 size={14} />
                      </button>

                      <button
                        onClick={() => handleDeleteCampaign(ad.id)}
                        className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-colors"
                        title="Delete Campaign"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create New Ad Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus size={18} className="text-purple-400" />
                Create New Ad Campaign & Banner Rule
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Campaign Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Special Rate Discount Banner"
                  value={campaignForm.title}
                  onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Placement Position</label>
                <select
                  value={campaignForm.placement}
                  onChange={(e) => setCampaignForm({ ...campaignForm, placement: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="Dashboard Top Banner">Dashboard Top Banner</option>
                  <option value="Sidebar Promo Box">Sidebar Promo Box</option>
                  <option value="Portal Header Announcement">Portal Header Announcement</option>
                  <option value="Loan Application Footer">Loan Application Footer</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Target Portals Visibility</label>
                <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {["Borrower Portal", "Lender Portal", "OAL Rep Portal"].map(portal => (
                    <label key={portal} className="flex items-center gap-2 cursor-pointer text-slate-300 text-[11px]">
                      <input
                        type="checkbox"
                        checked={campaignForm.targetPortals.includes(portal)}
                        onChange={() => handlePortalCheckboxToggle(portal, false)}
                        className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-0"
                      />
                      {portal.replace(" Portal", "")}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Creative Image Banner URL</label>
                <input
                  type="text"
                  required
                  value={campaignForm.creativeUrl}
                  onChange={(e) => setCampaignForm({ ...campaignForm, creativeUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Click Destination Link URL</label>
                <input
                  type="text"
                  required
                  value={campaignForm.destinationUrl}
                  onChange={(e) => setCampaignForm({ ...campaignForm, destinationUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Start Date</label>
                  <input
                    type="date"
                    required
                    value={campaignForm.startDate}
                    onChange={(e) => setCampaignForm({ ...campaignForm, startDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">End Date</label>
                  <input
                    type="date"
                    required
                    value={campaignForm.endDate}
                    onChange={(e) => setCampaignForm({ ...campaignForm, endDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold"
                >
                  Deploy Ad Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Ad Campaign Modal */}
      {editingCampaign && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit2 size={18} className="text-purple-400" />
                Edit Ad Campaign Rules
              </h3>
              <button onClick={() => setEditingCampaign(null)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEditCampaign} className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={editingCampaign.title}
                  onChange={(e) => setEditingCampaign({ ...editingCampaign, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Placement Position</label>
                <select
                  value={editingCampaign.placement}
                  onChange={(e) => setEditingCampaign({ ...editingCampaign, placement: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="Dashboard Top Banner">Dashboard Top Banner</option>
                  <option value="Sidebar Promo Box">Sidebar Promo Box</option>
                  <option value="Portal Header Announcement">Portal Header Announcement</option>
                  <option value="Loan Application Footer">Loan Application Footer</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Target Portals Visibility</label>
                <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {["Borrower Portal", "Lender Portal", "OAL Rep Portal"].map(portal => (
                    <label key={portal} className="flex items-center gap-2 cursor-pointer text-slate-300 text-[11px]">
                      <input
                        type="checkbox"
                        checked={(editingCampaign.targetPortals || []).includes(portal)}
                        onChange={() => handlePortalCheckboxToggle(portal, true)}
                        className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-0"
                      />
                      {portal.replace(" Portal", "")}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingCampaign(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Save size={14} />
                  Save Campaign Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
