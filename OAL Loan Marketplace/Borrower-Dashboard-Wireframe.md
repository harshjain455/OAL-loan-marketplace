# Borrower Dashboard - Data Flow & Wireframe Specs

Based on the client requirements and the structured `BorrowerLayout`, here is the data flow and wireframe requirements for each Borrower Dashboard menu. This document is designed for developers to understand exactly what data goes into each section without extra fluff.

---

### 1. Dashboard (`/borrower/dashboard`)
- **Data Points:** Summary of application status (e.g., In Progress, Under Review, Funded), Active Loan Overview (Amount, Interest Rate), and Recent Notifications.
- **Flow:** High-level read-only widgets giving the borrower an immediate status update on their loan journey.

### 2. Loan Application (`/borrower/loan-application`)
- **Data Points:** Multi-step form inputs: Loan Amount, Loan Duration (Terms), and Loan Purpose.
- **Flow:** User inputs data -> Validates -> Submits application. Status updates on Dashboard.

### 3. Documents (`/borrower/documents`)
- **Data Points:** Secure file upload sections for KYC: ID Proof, Address Proof, and Income Proof.
- **Flow:** File uploader -> Shows upload progress -> Displays verification status (Pending Review, Approved, Rejected) synced with Admin Verification Center.

### 4. AI Borrower Score (`/borrower/ai-score`)
- **Data Points:** System-generated risk score, qualification status (e.g., A+ Verified), and detailed breakdown of score factors.
- **Flow:** Read-only view. Generates automatically after KYC and Loan Application are submitted. 

### 5. Waiting Room / Offers (`/borrower/offers`)
- **Data Points:** List of matching anonymous lenders, received loan offers, and comparison metrics (Interest Rate, Duration, Total Repayment).
- **Flow:** Displays incoming bids -> Borrower clicks to compare terms -> Clicks "Accept Offer" to lock in the loan.

### 6. Notifications (`/borrower/notifications`)
- **Data Points:** System alerts, offer updates, KYC status changes, and account security changes.
- **Flow:** Standard notification feed with read/unread status.

### 7. Messages (`/borrower/messages`)
- **Data Points:** Secure chat interface (OAL LetsWork Portal common message box).
- **Flow:** Direct communication **exclusively with the assigned OAL Rep**. Borrowers cannot chat directly with lenders.

### 8. Referral Program (`/borrower/referral`)
- **Data Points:** Unique referral links, tracking of successful referrals, and reward/commission balance.
- **Flow:** Generate link -> Copy to clipboard -> Track conversions.

### 9. Profile & Settings (`/borrower/settings`)
- **Data Points:** Personal details, password reset, and Multi-Factor Authentication (MFA) settings.
- **Flow:** Edit basic info and toggle security settings.
