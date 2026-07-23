# OAL Loan Marketplace - Master Wireframes & Data Flow

This document combines all dashboard wireframes and data flows into a single, unified blueprint. It is 100% aligned with the `Client-Requirmnet.md` and `Proposed-Workflow-Roadmap-English.MD`.

---

## 1. Borrow Portal Dashbord
**Role:** The Loan Applicant seeking funds.
**Core Rule:** Borrowers can ONLY communicate with OAL Reps. They cannot see or chat with Lenders directly.


*   **AI Borrower Score:** View the system-generated AI score based on their application.
*   **Secure Messaging / Chat:** Direct line to their assigned OAL Rep.
*   **Notifications:** Alerts regarding application status.
*   **Waiting Room / Offers:** Where approved offers from lenders appear for the borrower to review and accept.
*   **Referral Program:** Affiliate tracking and links.
*   **Settings:** Profile management and MFA setup.

---

## 2. Lender Portal Dashboard
**Role:** The Investor/Lender providing funds.
**Core Rule:** Lenders remain anonymous to each other. They communicate ONLY with the OAL Rep, never directly with the Borrower.


*   **Qualified Leads:** Pool of verified loan applications ready for funding.
*   **AI Lead Alerts:** Push notifications for newly matched borrowers based on Lender preferences.
*   **Borrower Rankings – [ iNV IQ ]:** AI-driven scoring matrix ranking the risk of applicants.
*   **Lead Details:** Deep dive into anonymized borrower requirements.
*   **Loan Requests:** Tracking of active market requests.
*   **Saved Leads:** Bookmarked leads for further review.
*   **Communication:** Secure messaging channel exclusively with the OAL Agent/Broker.
*   **Offer Management:** Interface to submit, edit, and withdraw loan offers to borrowers.
*   **Analytics & Reports:** Performance metrics on investments.
*   **Billing & Subscription:** Manage platform fees and payouts.
*   **Profile & Settings:** Lender criteria setup and account security.

---

## 3. OAL REPS / AGENT Portal Dashboard
**Role:** The Mediator connecting Borrowers and Lenders.
**Core Rule:** Reps mediate all deals. They have a "Common Message Box" to chat with both parties simultaneously. They can view, but NOT edit, Lender offers.


*   **Communication:** The LetsWork portal hub. Allows chatting with Borrower and Lender in a mediated environment.
*   **Qualified Leads:** List of verified borrowers specifically assigned to this Rep.
*   **AI Lead Alerts:** Notifications when a Lender matches with their assigned Borrower.
*   **Lead Details:** Full, un-anonymized profile of the borrower to assist them properly.
*   **Loan Requests:** Monitoring the funding progress of their assigned borrowers.
*   **Saved Leads:** Pinned high-priority leads.
*   **Offer Management:** View-only access to incoming Lender bids. Reps can share the results page with the Borrower here.
*   **Analytics & Reports:** Commission tracking and successful deal metrics.
*   **Billing & Subscription:** Agent fees and payout settings.
*   **Profile & Settings:** Agent specialization and MFA.

---

## 4. OAL Network Panel Dashboard
**Role:** A shared "Live Marketplace" view accessible by both Lenders and OAL Reps.
**Core Rule:** Acts as a real-time trading floor. New applicants get color-coded tags.

*   **Dashboard / Live Marketplace View:** Real-time stream of incoming loan applications.
*   **Communication:** Chat access (adhering to the strict Lender <-> Rep rule).
*   **Qualified Leads & AI Lead Alerts:** Live notifications of new market entries.
*   **Lead Details & Loan Requests:** Drill-down into live applications.
*   **Saved Leads:** Quick-save active market opportunities.
*   **Offer Management:** Manage live bids on the open market.
*   **Timeline Tracking:** Chronological timestamp logs documenting the exact time from application start to loan funding.
*   **Analytics, Reports, Billing, Subscription, Profile, Settings:** Standard user management within the network view.

---

## 5. Admin Panel Dashboard
**Role:** The Super User managing the entire platform ecosystem.


*   **Borrowers & Lenders:** Complete user management and override controls.
*   **Loan Applications:** Global view of all active, funded, and rejected loans.
*   **AI Scoring Engine:** Configuration of the `iNV IQ` risk models and special forms for verified investors.
*   **Verification Center:** Manual KYC review and approval queue.
*   **Document Management:** Secure vault for all system documents.
*   **Lead Distribution:** Logic and assignment rules for routing Borrowers to OAL Reps.
*   **Notifications:** Global platform announcement system.
*   **Referral & Affiliates:** Integration with 3rd-party CRM/ERP tracking.
*   **Advertisements:** Management of ad placements on the platform.
*   **Payments & Subscription Plans:** Platform revenue tracking and plan tier configurations.
*   **CMS:** Content management for the landing page and informational text.
*   **Reports & Analytics, Support Tickets, Audit Logs:** Compliance, help desk, and deep system logging.
*   **System Settings & Super Admin:** Role configurations and MFA enforcement globally.
