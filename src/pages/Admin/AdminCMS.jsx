import React, { useState } from "react";
import { 
  FileEdit, Layout, Eye, Save, CheckCircle2, Bold, Italic, List, Link, Image as ImageIcon, Plus, Trash2, Edit2, Globe, HelpCircle, Phone, Info, Check, X, Code 
} from "lucide-react";

export default function AdminCMS() {
  const [activeSection, setActiveSection] = useState("Home Landing Page");
  const [livePreviewActive, setLivePreviewActive] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Home Page State
  const [homeCMS, setHomeCMS] = useState({
    heroTitle: "India's Premier Institutional & P2P Loan Marketplace",
    heroSubtitle: "Empowering borrowers with instant competitive loan bids from verified lenders & banks across India.",
    primaryCtaText: "Apply For Loan Now",
    secondaryCtaText: "Register As Partner Lender",
    statDisbursed: "₹500Cr+",
    statBorrowers: "10,000+",
    statApprovalRate: "98.4%",
    bannerImageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=60"
  });

  // About Us Page State
  const [aboutCMS, setAboutCMS] = useState({
    missionTitle: "Democratizing Access to Capital Across India",
    missionBody: "OAL Loan Marketplace was founded to eliminate traditional loan friction by connecting creditworthy borrowers directly with institutional lenders, NBFCs, and verified private investors.",
    visionTitle: "Transparent, AI-Driven Financial Infrastructure",
    visionBody: "Our proprietary iNV IQ™ risk scoring algorithm empowers instant risk assessment and seamless capital deployment."
  });

  // How It Works Steps State
  const [howItWorksSteps, setHowItWorksSteps] = useState([
    { step: 1, title: "Submit Digital Loan Application", description: "Fill out online requirements with AI-guided document verification in under 5 minutes." },
    { step: 2, title: "iNV IQ™ Algorithm Scoring & Bidding", description: "Our AI engine scores credit risks and opens competitive bidding to top lenders." },
    { step: 3, title: "Choose Best Rate & Fast Payout", description: "Compare bids, select lowest interest rate offer, and receive instant fund disbursement." }
  ]);

  // Contact Info State
  const [contactCMS, setContactCMS] = useState({
    email: "support@oaloanmarketplace.com",
    phone: "+91 1800-200-9988",
    address: "OAL Financial Tower, Level 14, BKC, Mumbai, MH - 400051",
    operatingHours: "Monday - Saturday: 9:00 AM - 7:00 PM IST"
  });

  // FAQs State
  const [faqs, setFaqs] = useState([
    { id: "FAQ-01", question: "What is the minimum eligibility criteria for borrowers?", answer: "Borrowers must be Indian citizens aged 21-65 with a minimum monthly income of ₹25,000 or registered business entity." },
    { id: "FAQ-02", question: "How does the iNV IQ™ Risk Scoring Engine work?", answer: "Our AI evaluates over 120 credit data points including bank cashflow, bureau scores, and transaction velocity." },
    { id: "FAQ-03", question: "How quickly are funds disbursed after lender approval?", answer: "Funds are typically transferred directly to your bank account within 24 hours of final digital agreement signing." }
  ]);

  // New FAQ Form State
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [showAddFaqModal, setShowAddFaqModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  // WYSIWYG Active Formatting State (Visual Indicator)
  const [formatting, setFormatting] = useState({ bold: false, italic: false });

  // Handle Save & Publish Content
  const handlePublishContent = (e) => {
    e.preventDefault();
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 3000);
  };

  // Add FAQ Handler
  const handleAddFaq = (e) => {
    e.preventDefault();
    if (!newFaq.question || !newFaq.answer) return;
    setFaqs([...faqs, { id: `FAQ-0${faqs.length + 1}`, question: newFaq.question, answer: newFaq.answer }]);
    setShowAddFaqModal(false);
    setNewFaq({ question: "", answer: "" });
  };

  // Save Edit FAQ
  const handleSaveEditFaq = (e) => {
    e.preventDefault();
    if (!editingFaq) return;
    setFaqs(prev => prev.map(f => f.id === editingFaq.id ? editingFaq : f));
    setEditingFaq(null);
  };

  // Delete FAQ
  const handleDeleteFaq = (faqId) => {
    setFaqs(prev => prev.filter(f => f.id !== faqId));
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans animate-fade-in pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Content Management System (CMS)
            <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full font-mono flex items-center gap-1">
              <Globe size={12} />
              WYSIWYG Live Editor
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Update public landing page text, graphics, FAQs, and contact information without touching application code.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Preview Toggle */}
          <button
            onClick={() => setLivePreviewActive(!livePreviewActive)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
              livePreviewActive ? "bg-purple-600 text-white border-purple-500" : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
            }`}
          >
            <Eye size={14} />
            {livePreviewActive ? "Hide Public Preview" : "Show Public Preview"}
          </button>

          <button
            onClick={handlePublishContent}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2"
          >
            <Save size={16} />
            Save & Publish Live
          </button>
        </div>
      </div>

      {publishSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-xs text-emerald-400 flex items-center gap-2 animate-fade-in shadow-md">
          <CheckCircle2 size={18} />
          <span>Website content successfully saved and deployed live to production servers! Version Tag: <strong>v2.4.1-CMS</strong></span>
        </div>
      )}

      {/* Navigation Section Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs overflow-x-auto">
        {["Home Landing Page", "About Us", "How It Works", "Contact Info", "FAQs Manager"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeSection === tab
                ? "bg-purple-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* WYSIWYG Formatting Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-500 font-mono mr-2">WYSIWYG Toolbar:</span>
          <button
            onClick={() => setFormatting({ ...formatting, bold: !formatting.bold })}
            className={`p-1.5 rounded transition-colors ${formatting.bold ? "bg-purple-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white"}`}
            title="Bold Text"
          >
            <Bold size={14} />
          </button>
          <button
            onClick={() => setFormatting({ ...formatting, italic: !formatting.italic })}
            className={`p-1.5 rounded transition-colors ${formatting.italic ? "bg-purple-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white"}`}
            title="Italic Text"
          >
            <Italic size={14} />
          </button>
          <button className="p-1.5 bg-slate-950 text-slate-400 hover:text-white rounded" title="Bullet List">
            <List size={14} />
          </button>
          <button className="p-1.5 bg-slate-950 text-slate-400 hover:text-white rounded" title="Insert Link">
            <Link size={14} />
          </button>
          <button className="p-1.5 bg-slate-950 text-slate-400 hover:text-white rounded" title="Insert Banner Image">
            <ImageIcon size={14} />
          </button>
          <button className="p-1.5 bg-slate-950 text-slate-400 hover:text-white rounded" title="Raw Code View">
            <Code size={14} />
          </button>
        </div>

        <span className="text-[11px] text-slate-400 font-mono">
          Language: <strong>English (Default)</strong> • Auto-Save Drafts: <strong>Enabled</strong>
        </span>
      </div>

      {/* SECTION 1: Home Landing Page */}
      {activeSection === "Home Landing Page" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Form */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <FileEdit size={18} className="text-purple-400" />
              Edit Hero Banner & Main Headings
            </h2>

            <form onSubmit={handlePublishContent} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Hero Main Title</label>
                <input
                  type="text"
                  value={homeCMS.heroTitle}
                  onChange={(e) => setHomeCMS({ ...homeCMS, heroTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Hero Subtitle Description</label>
                <textarea
                  rows={3}
                  value={homeCMS.heroSubtitle}
                  onChange={(e) => setHomeCMS({ ...homeCMS, heroSubtitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Primary CTA Button</label>
                  <input
                    type="text"
                    value={homeCMS.primaryCtaText}
                    onChange={(e) => setHomeCMS({ ...homeCMS, primaryCtaText: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">Secondary CTA Button</label>
                  <input
                    type="text"
                    value={homeCMS.secondaryCtaText}
                    onChange={(e) => setHomeCMS({ ...homeCMS, secondaryCtaText: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Disbursed Stat</label>
                  <input
                    type="text"
                    value={homeCMS.statDisbursed}
                    onChange={(e) => setHomeCMS({ ...homeCMS, statDisbursed: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Borrower Count</label>
                  <input
                    type="text"
                    value={homeCMS.statBorrowers}
                    onChange={(e) => setHomeCMS({ ...homeCMS, statBorrowers: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Approval Rate</label>
                  <input
                    type="text"
                    value={homeCMS.statApprovalRate}
                    onChange={(e) => setHomeCMS({ ...homeCMS, statApprovalRate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-blue-400 focus:outline-none"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Live Preview Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-slate-850 pb-3">
              <span className="text-xs font-mono text-purple-400 flex items-center gap-1.5">
                <Eye size={14} />
                Rendered Live Preview (Home)
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                Responsive View
              </span>
            </div>

            <div className="space-y-4 py-4">
              <h1 className="text-2xl font-extrabold text-white leading-tight">{homeCMS.heroTitle}</h1>
              <p className="text-xs text-slate-300 leading-relaxed">{homeCMS.heroSubtitle}</p>
              
              <div className="flex gap-3 pt-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">{homeCMS.primaryCtaText}</button>
                <button className="px-4 py-2 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium">{homeCMS.secondaryCtaText}</button>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-850">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500">Capital Disbursed</p>
                  <p className="text-base font-bold text-emerald-400 mt-0.5">{homeCMS.statDisbursed}</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500">Active Borrowers</p>
                  <p className="text-base font-bold text-purple-400 mt-0.5">{homeCMS.statBorrowers}</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500">Approval Rate</p>
                  <p className="text-base font-bold text-blue-400 mt-0.5">{homeCMS.statApprovalRate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: About Us */}
      {activeSection === "About Us" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 max-w-3xl space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Info size={18} className="text-blue-400" />
            Edit Mission & Vision Statements
          </h2>

          <form onSubmit={handlePublishContent} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Mission Title</label>
              <input
                type="text"
                value={aboutCMS.missionTitle}
                onChange={(e) => setAboutCMS({ ...aboutCMS, missionTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Mission Statement Text</label>
              <textarea
                rows={4}
                value={aboutCMS.missionBody}
                onChange={(e) => setAboutCMS({ ...aboutCMS, missionBody: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Vision Statement Text</label>
              <textarea
                rows={3}
                value={aboutCMS.visionBody}
                onChange={(e) => setAboutCMS({ ...aboutCMS, visionBody: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            <button type="submit" className="px-5 py-2 bg-purple-600 text-white font-bold rounded-lg text-xs">
              Update About Us Content
            </button>
          </form>
        </div>
      )}

      {/* SECTION 3: How It Works */}
      {activeSection === "How It Works" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layout size={18} className="text-purple-400" />
              Configure "How It Works" Step Workflow Cards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorksSteps.map((item, idx) => (
              <div key={item.step} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                    {item.step}
                  </span>
                  <span className="text-xs font-mono text-slate-400">Step {item.step} Card</span>
                </div>

                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const updated = [...howItWorksSteps];
                    updated[idx].title = e.target.value;
                    setHowItWorksSteps(updated);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-bold text-white"
                />

                <textarea
                  rows={3}
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...howItWorksSteps];
                    updated[idx].description = e.target.value;
                    setHowItWorksSteps(updated);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: Contact Info */}
      {activeSection === "Contact Info" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 max-w-2xl space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Phone size={18} className="text-emerald-400" />
            Edit Official Support & Office Address Details
          </h2>

          <form onSubmit={handlePublishContent} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Support Email</label>
              <input
                type="email"
                value={contactCMS.email}
                onChange={(e) => setContactCMS({ ...contactCMS, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Helpline Phone Number</label>
              <input
                type="text"
                value={contactCMS.phone}
                onChange={(e) => setContactCMS({ ...contactCMS, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Registered Office Address</label>
              <input
                type="text"
                value={contactCMS.address}
                onChange={(e) => setContactCMS({ ...contactCMS, address: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Support Hours</label>
              <input
                type="text"
                value={contactCMS.operatingHours}
                onChange={(e) => setContactCMS({ ...contactCMS, operatingHours: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-lg text-xs">
              Save Contact Details
            </button>
          </form>
        </div>
      )}

      {/* SECTION 5: FAQs Manager */}
      {activeSection === "FAQs Manager" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <HelpCircle size={20} className="text-amber-400" />
                Frequently Asked Questions (FAQs) Accordion Manager
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Manage borrower and lender landing page help section questions.</p>
            </div>

            <button
              onClick={() => setShowAddFaqModal(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
            >
              <Plus size={16} />
              Add FAQ Question
            </button>
          </div>

          <div className="p-6 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">{faq.id}</span>
                    <h3 className="text-sm font-bold text-white">{faq.question}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingFaq({ ...faq })}
                      className="p-1.5 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
                      title="Edit FAQ"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="p-1.5 text-red-400 hover:text-red-300 bg-red-500/10 rounded-lg border border-red-500/20"
                      title="Delete FAQ"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-850">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add FAQ Modal */}
      {showAddFaqModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus size={18} className="text-purple-400" />
                Add FAQ Question & Answer
              </h3>
              <button onClick={() => setShowAddFaqModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddFaq} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Question Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Is there any prepayment penalty?"
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Detailed Answer</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type clear explanation..."
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddFaqModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold"
                >
                  Add FAQ Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit FAQ Modal */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit2 size={18} className="text-purple-400" />
                Edit FAQ ({editingFaq.id})
              </h3>
              <button onClick={() => setEditingFaq(null)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEditFaq} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Question Title</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1.5">Detailed Answer</label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold"
                >
                  Save FAQ Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
