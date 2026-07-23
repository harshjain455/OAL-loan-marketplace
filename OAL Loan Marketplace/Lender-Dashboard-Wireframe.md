# Lender Dashboard - Data Flow & Wireframe Specs

Based on the client requirements and the structured `LenderLayout`, here is the data flow and wireframe requirements for each Lender Dashboard menu. This document is designed for developers to understand exactly what data goes into each section without extra fluff.

---

### 1. Dashboard (`/lender/dashboard`)
- **Data Points:** High-level metrics: Total Funded Loans volume, Active Offers out pending acceptance, and count of New Qualified Leads.
- **Flow:** Read-only widgets summarizing the lender's active pipeline and portfolio health.

### 2. Qualified Leads (`/lender/qualified-leads`)
- **Data Points:** Table/List of AI-matched borrowers. **Crucial:** Borrower identities must remain anonymous (no direct names/contact info).
- **Flow:** Displays leads that match the lender's custom criteria. Lenders can click to view "Lead Details".

### 3. AI Lead Alerts (`/lender/lead-alerts`)
- **Data Points:** Real-time notification feed specifically for newly matched qualified leads.
- **Flow:** Alerts trigger when a new borrower's `iNV IQ` matches the lender's rules.

### 4. Borrower Rankings (`/lender/rankings`)
- **Data Points:** Leaderboard/ranking view of applicants based on the `iNV IQ` custom AI scoring formula.
- **Flow:** Sort leads by lowest risk/highest score.

### 5. Lead Details (`/lender/lead-details`)
- **Data Points:** Detailed view of a single anonymous borrower's profile. Includes: Loan Requirement (Amount, Purpose), AI Score breakdown, and Document Verification Status (e.g., KYC Approved).
- **Flow:** Read-only detailed view accessed from the Qualified Leads or Loan Requests menus.

### 6. Loan Requests (`/lender/loan-requests`)
- **Data Points:** Live feed of all active borrower requests currently in the open marketplace.
- **Flow:** Allows the lender to browse requests outside of their strictly matched "Qualified Leads" list.

### 7. Saved Leads (`/lender/saved-leads`)
- **Data Points:** List of bookmarked/pinned borrower profiles.
- **Flow:** Lenders can "Save/Heart" a lead from the main feed to review later before submitting an offer.

### 8. Communication (`/lender/communication`)
- **Data Points:** Secure Chat, Email, and SMS interface logs.
- **Flow:** Lenders can communicate **strictly with the assigned OAL Rep / Agent**. Borrowers are completely blocked from direct communication.

### 9. Offer Management (`/lender/offers`)
- **Data Points:** Form to create/edit offers (Loan Amount, Interest Rate, Repayment Terms). List of active/pending/rejected offers.
- **Flow:** Lender submits a custom bid for a borrower -> Offer goes to Waiting Room -> Borrower/Rep reviews. Lender has exclusive control to update or withdraw offers here.

### 10. OAL Network Panel (`/lender/network-panel`)
- **Data Points:** Real-time live marketplace stream. Shows application start timestamps and pipeline color codes (e.g., Green for new).
- **Flow:** High-speed live feed of all marketplace activity. Lender profiles remain completely anonymous to other Lenders.

### 11. Analytics & Reports (`/lender/analytics`)
- **Data Points:** Conversion rates (Offers sent vs. Accepted), portfolio yield/health, and performance metrics.
- **Flow:** Generate charts and data exports for the lender's internal accounting.

### 12. Billing & Subscription (`/lender/billing`)
- **Data Points:** Platform fee invoices, active subscription plans, payment methods.
- **Flow:** Manage credit card details and view past billing receipts.

### 13. Profile & Settings (`/lender/settings`)
- **Data Points:** Lending company details, lending criteria / matching rules (min score, max amount), password, and Multi-Factor Authentication (MFA) settings.
- **Flow:** Edit basic profile info, tune AI matching criteria, and toggle security settings.
