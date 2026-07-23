# OAL Rep (Agent) Dashboard - Data Flow & Wireframe Specs

Based on the client requirements and the structured `RepLayout`, here is the data flow and wireframe requirements for each Rep (Agent) Dashboard menu. This document is designed for developers to understand the mediator role of the Rep without extra fluff.

---

### 1. Dashboard (`/rep/dashboard`)
- **Data Points:** Overview widgets. Total Borrowers assigned to them, count of Pending Tasks (e.g., Unread messages, active applications), and Recent Message snippets.
- **Flow:** Read-only snapshot helping the Rep prioritize their daily tasks and communications.

### 2. Qualified Leads (`/rep/qualified-leads`)
- **Data Points:** List of verified borrowers specifically **assigned to this OAL Rep**.
- **Flow:** Rep reviews their assigned borrower list. Clicking a borrower opens their Lead Details.

### 3. AI Lead Alerts (`/rep/lead-alerts`)
- **Data Points:** Push notifications regarding matching activity.
- **Flow:** Triggers an alert when a **new matching lender** is found for one of the Rep's assigned borrowers.

### 4. Lead Details (`/rep/lead-details`)
- **Data Points:** Full, un-anonymized borrower profile and requirement details (unlike lenders who see anonymous data). 
- **Flow:** Used by the Rep to review the borrower's exact needs, KYC status, and AI Score in order to properly assist them.

### 5. Loan Requests (`/rep/loan-requests`)
- **Data Points:** Tracking all active loan requests associated with the Rep's assigned borrowers in the open market.
- **Flow:** Monitor which applications are still seeking funding vs which have received bids.

### 6. Saved Leads (`/rep/saved-leads`)
- **Data Points:** List of pinned or bookmarked leads.
- **Flow:** Quick-access list for the Rep to monitor specific high-priority borrowers.

### 7. Communication (LetsWork) (`/rep/communication`)
- **Data Points:** The central "OAL LetsWork Portal" messaging hub.
- **Flow / Critical Rule:** 
  - Contains a **Common Message Box** feature.
  - The Rep can chat with the Borrower on one side and the Lender on the other, mediating the deal.
  - **Lenders and Borrowers can never chat directly.**

### 8. Offer Management (`/rep/offers`)
- **Data Points:** List of all incoming bids/offers from lenders for their assigned borrowers.
- **Flow / Critical Rule:** 
  - Strictly **View-Only** access. Reps **cannot edit** offers.
  - Reps use this page to view the offers and click "Share with Borrower" to pass the results page to the applicant.

### 9. OAL Network Panel (`/rep/network-panel`)
- **Data Points:** Access to the real-time live marketplace view.
- **Flow:** Allows the Rep to observe the entire market pipeline, monitor Lender activity, and see where their borrowers stand in the live queue.

### 10. Analytics & Reports (`/rep/analytics`)
- **Data Points:** Performance metrics. Total leads handled, total successful funded loans, and earned commission reports.
- **Flow:** Generate and export personal performance charts.

### 11. Billing & Subscription (`/rep/billing`)
- **Data Points:** Agent subscription fees and earnings/payout history.
- **Flow:** Manage credit card details for subscription payments or connect bank details for commission payouts.

### 12. Profile & Settings (`/rep/settings`)
- **Data Points:** Agent specialization (e.g., Real Estate, Personal Loans), contact details, and Multi-Factor Authentication (MFA) enforcement.
- **Flow:** Edit personal profile and manage platform security settings.
