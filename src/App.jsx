import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import BorrowerLayout from "./layouts/BorrowerLayout";
import LenderLayout from "./layouts/LenderLayout";
import RepLayout from "./layouts/RepLayout";
import NetworkLayout from "./layouts/NetworkLayout";
import AdminLayout from "./layouts/AdminLayout";

// Landing & Auth
import LandingPage from "./pages/Landing/LandingPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import MFAVerification from "./pages/Auth/MFAVerification";

// Borrower Pages
import BorrowerAIScore from "./pages/Borrower/BorrowerAIScore";
import BorrowerOffers from "./pages/Borrower/BorrowerOffers";
import BorrowerNotifications from "./pages/Borrower/BorrowerNotifications";
import BorrowerChat from "./pages/Borrower/BorrowerChat";
import BorrowerReferral from "./pages/Borrower/BorrowerReferral";
import BorrowerSettings from "./pages/Borrower/BorrowerSettings";

// Lender Pages
import LenderDashboard from "./pages/Lender/LenderDashboard";
import LenderQualifiedLeads from "./pages/Lender/LenderQualifiedLeads";
import LenderAILeadAlerts from "./pages/Lender/LenderAILeadAlerts";
import LenderBorrowerRankings from "./pages/Lender/LenderBorrowerRankings";
import LenderLeadDetails from "./pages/Lender/LenderLeadDetails";
import LenderLoanRequests from "./pages/Lender/LenderLoanRequests";
import LenderSavedLeads from "./pages/Lender/LenderSavedLeads";
import LenderChat from "./pages/Lender/LenderChat";
import LenderOfferManagement from "./pages/Lender/LenderOfferManagement";
import LenderNetworkPanel from "./pages/Lender/LenderNetworkPanel";
import LenderAnalytics from "./pages/Lender/LenderAnalytics";
import LenderBilling from "./pages/Lender/LenderBilling";
import LenderSettings from "./pages/Lender/LenderSettings";
import LenderReports from "./pages/Lender/LenderReports";
import LenderSubscription from "./pages/Lender/LenderSubscription";
import LenderProfile from "./pages/Lender/LenderProfile";

// Rep Pages

import RepQualifiedLeads from "./pages/Rep/RepQualifiedLeads";
import RepAILeadAlerts from "./pages/Rep/RepAILeadAlerts";
import RepLeadDetails from "./pages/Rep/RepLeadDetails";
import RepLoanRequests from "./pages/Rep/RepLoanRequests";
import RepSavedLeads from "./pages/Rep/RepSavedLeads";
import RepLetsWorkChat from "./pages/Rep/RepLetsWorkChat";
import RepOfferManagement from "./pages/Rep/RepOfferManagement";
import RepNetworkPanel from "./pages/Rep/RepNetworkPanel";
import RepAnalytics from "./pages/Rep/RepAnalytics";
import RepBilling from "./pages/Rep/RepBilling";
import RepSettings from "./pages/Rep/RepSettings";
import RepReports from "./pages/Rep/RepReports";
import RepSubscription from "./pages/Rep/RepSubscription";
import RepProfile from "./pages/Rep/RepProfile";

// Network Panel Pages

import NetworkLiveMarketplace from "./pages/Network/NetworkLiveMarketplace";
import NetworkLeads from "./pages/Network/NetworkLeads";
import NetworkDetails from "./pages/Network/NetworkDetails";
import NetworkSavedLeads from "./pages/Network/NetworkSavedLeads";
import NetworkOfferManagement from "./pages/Network/NetworkOfferManagement";
import NetworkCommunication from "./pages/Network/NetworkCommunication";
import NetworkTimeline from "./pages/Network/NetworkTimeline";
import NetworkReports from "./pages/Network/NetworkReports";
import NetworkSubscription from "./pages/Network/NetworkSubscription";
import NetworkProfile from "./pages/Network/NetworkProfile";
import NetworkSettings from "./pages/Network/NetworkSettings";

// Admin Pages

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminBorrowers from "./pages/Admin/AdminBorrowers";
import AdminLenders from "./pages/Admin/AdminLenders";
import AdminLoanApplications from "./pages/Admin/AdminLoanApplications";
import AdminAIScoringEngine from "./pages/Admin/AdminAIScoringEngine";
import AdminVerificationCenter from "./pages/Admin/AdminVerificationCenter";
import AdminDocumentManagement from "./pages/Admin/AdminDocumentManagement";
import AdminLeadDistribution from "./pages/Admin/AdminLeadDistribution";
import AdminNotifications from "./pages/Admin/AdminNotifications";
import AdminReferrals from "./pages/Admin/AdminReferrals";
import AdminAdvertisements from "./pages/Admin/AdminAdvertisements";
import AdminPayments from "./pages/Admin/AdminPayments";
import AdminSubscriptions from "./pages/Admin/AdminSubscriptions";
import AdminCMS from "./pages/Admin/AdminCMS";
import AdminReports from "./pages/Admin/AdminReports";
import AdminHelpDesk from "./pages/Admin/AdminHelpDesk";
import AdminAuditLogs from "./pages/Admin/AdminAuditLogs";
import AdminSettings from "./pages/Admin/AdminSettings";
import AdminSuperAdmin from "./pages/Admin/AdminSuperAdmin";
import AdminHRRecruiting from "./pages/Admin/AdminHRRecruiting";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/mfa" element={<MFAVerification />} />

        {/* Borrower Portal */}
        <Route path="/borrower" element={<BorrowerLayout />}>
          <Route index element={<Navigate to="/borrower/ai-score" replace />} />
          <Route path="ai-score" element={<BorrowerAIScore />} />
          <Route path="offers" element={<BorrowerOffers />} />
          <Route path="notifications" element={<BorrowerNotifications />} />
          <Route path="messages" element={<BorrowerChat />} />
          <Route path="referral" element={<BorrowerReferral />} />
          <Route path="settings" element={<BorrowerSettings />} />
        </Route>

        <Route path="/lender" element={<LenderLayout />}>
          <Route index element={<Navigate to="/lender/dashboard" replace />} />
          <Route path="dashboard" element={<LenderDashboard />} />
          <Route path="qualified-leads" element={<LenderQualifiedLeads />} />
          <Route path="lead-alerts" element={<LenderAILeadAlerts />} />
          <Route path="rankings" element={<LenderBorrowerRankings />} />
          <Route path="lead-details" element={<LenderLeadDetails />} />
          <Route path="loan-requests" element={<LenderLoanRequests />} />
          <Route path="saved-leads" element={<LenderSavedLeads />} />
          <Route path="communication" element={<LenderChat />} />
          <Route path="offers" element={<LenderOfferManagement />} />
          <Route path="network-panel" element={<LenderNetworkPanel />} />
          <Route path="analytics" element={<LenderAnalytics />} />
          <Route path="reports" element={<LenderReports />} />
          <Route path="billing" element={<LenderBilling />} />
          <Route path="subscription" element={<LenderSubscription />} />
          <Route path="profile" element={<LenderProfile />} />
          <Route path="settings" element={<LenderSettings />} />
        </Route>

        {/* Rep Portal */}
        <Route path="/rep" element={<RepLayout />}>
          <Route index element={<Navigate to="/rep/communication" replace />} />
          <Route path="communication" element={<RepLetsWorkChat />} />
          <Route path="qualified-leads" element={<RepQualifiedLeads />} />
          <Route path="lead-alerts" element={<RepAILeadAlerts />} />
          <Route path="lead-details" element={<RepLeadDetails />} />
          <Route path="loan-requests" element={<RepLoanRequests />} />
          <Route path="saved-leads" element={<RepSavedLeads />} />

          <Route path="offers" element={<RepOfferManagement />} />
          <Route path="network-panel" element={<RepNetworkPanel />} />
          <Route path="analytics" element={<RepAnalytics />} />
          <Route path="reports" element={<RepReports />} />
          <Route path="billing" element={<RepBilling />} />
          <Route path="subscription" element={<RepSubscription />} />
          <Route path="profile" element={<RepProfile />} />
          <Route path="settings" element={<RepSettings />} />
        </Route>

        {/* Network Panel (Shared View/Stream Portal) */}
        <Route path="/network" element={<NetworkLayout />}>
          <Route index element={<Navigate to="/network/communication" replace />} />
          <Route path="live-stream" element={<NetworkLiveMarketplace />} />
          <Route path="leads" element={<NetworkLeads />} />
          <Route path="details" element={<NetworkDetails />} />
          <Route path="saved" element={<NetworkSavedLeads />} />
          <Route path="offers" element={<NetworkOfferManagement />} />
          <Route path="communication" element={<NetworkCommunication />} />
          <Route path="timeline" element={<NetworkTimeline />} />
          <Route path="reports" element={<NetworkReports />} />
          <Route path="subscription" element={<NetworkSubscription />} />
          <Route path="profile" element={<NetworkProfile />} />
          <Route path="settings" element={<NetworkSettings />} />
        </Route>

        {/* Admin Portal */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="borrowers" element={<AdminBorrowers />} />
          <Route path="lenders" element={<AdminLenders />} />
          <Route path="loan-applications" element={<AdminLoanApplications />} />
          <Route path="ai-scoring" element={<AdminAIScoringEngine />} />
          <Route path="verification" element={<AdminVerificationCenter />} />
          <Route path="document-management" element={<AdminDocumentManagement />} />
          <Route path="lead-distribution" element={<AdminLeadDistribution />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="referrals" element={<AdminReferrals />} />
          <Route path="advertisements" element={<AdminAdvertisements />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="subscriptions" element={<AdminSubscriptions />} />
          <Route path="cms" element={<AdminCMS />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="help-desk" element={<AdminHelpDesk />} />
          <Route path="audit-logs" element={<AdminAuditLogs />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="super-admin" element={<AdminSuperAdmin />} />
          <Route path="hr-recruiting" element={<AdminHRRecruiting />} />
        </Route>

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
