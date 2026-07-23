# Network Panel - Data Flow & Wireframe Specs

Based on the client requirements and the structured `NetworkLayout`, here is the data flow and wireframe requirements for each Network Panel menu. This document is designed for developers to understand the shared, real-time marketplace environment where Lenders and OAL Reps operate.

---

### 1. Dashboard (`/network/dashboard`)
- **Data Points:** Summary of overall marketplace activity. Total active loan requests, total funded volume, and general live stats.
- **Flow:** High-level dashboard shared between Reps and Lenders, giving a quick snapshot of the platform's health.

### 2. Live Marketplace View (`/network/live-stream`)
- **Data Points:** Real-time stream of all incoming loan applications across the platform. 
- **Flow:** 
  - **Crucial UI Detail:** New applicants must have a distinct notification status or "color code" to instantly alert users that it's a fresh application.
  - Lenders remain anonymous to each other. Reps can see everyone.

### 3. Qualified Leads & Alerts (`/network/leads`)
- **Data Points:** AI Lead Alerts and list of matched borrowers.
- **Flow:** Real-time push notifications when a new borrower matches the system's `iNV IQ` scoring engine or specific lender criteria.

### 4. Lead Details & Requests (`/network/details`)
- **Data Points:** Deep dive into a specific loan application (Loan Amount, Purpose, Borrower Risk Score, KYC Status).
- **Flow:** Clicked from the Live Marketplace View. Lenders view this anonymously, while Reps view this to assist the borrower.

### 5. Saved Leads (`/network/saved`)
- **Data Points:** Bookmarked or "Hearted" loan applications.
- **Flow:** A workspace where Lenders and Reps can pin specific borrowers they are actively monitoring or preparing offers for.

### 6. Offer Management (`/network/offers`)
- **Data Points:** All active bids/offers made on a loan application.
- **Flow:** 
  - **Lenders:** Have full access to create, edit, or withdraw their own offers.
  - **OAL Reps:** Have strictly **View-Only** access. They cannot edit offers. They can only share the results page with the borrower.

### 7. Communication (`/network/communication`)
- **Data Points:** Centralized chat/messaging system (OAL LetsWork Portal common message box).
- **Flow Rules:** 
  - **Lender ↔ OAL Rep:** Can chat directly via Chat, Email, or SMS interface.
  - **OAL Rep ↔ Borrower:** Can chat directly.
  - **Lender ↔ Borrower:** Strictly prohibited. No direct contact.
  - **OAL Rep Feature:** Reps have a common message box where they can chat with the Lender and the Borrower at the same time as a mediator.

### 8. Timeline Tracking (`/network/timeline`)
- **Data Points:** Chronological timestamp logs for every loan application.
- **Flow:** Documents the exact timestamp of every stage: Application Start -> KYC Approval -> AI Score Generated -> Offer Sent -> Offer Accepted -> Loan Funding. Displays as a visual progress timeline.
