# OAL Network

## Complete Application Workflow & Role Structure

## Project Overview

OAL Network will be a secure, enterprise-level lending platform where:

* Borrowers will submit loan applications.
* OAL Representatives will coordinate between borrowers and lenders.
* Lenders will provide loan offers to qualified borrowers.
* Admin will manage the complete platform.

Main workflow:
**Borrower → OAL Rep → Lender → Offer → Loan Processing**

---

## Security & Compliance
* The platform will meet International Security Standards.
* **Multi-Factor Authentication (MFA)** will be implemented for all user logins across all portals to ensure maximum data security.

---

## User Roles

The platform will have 4 main roles:
1. Borrower / Loan Applicant
2. Lender
3. OAL Rep / Agent
4. Admin / Super Admin

*Note: While there are only 4 distinct user roles, the system includes a 5th major operational dashboard called the **OAL Network Panel**. This is a shared Live Marketplace interface accessed by both Lenders and OAL Reps.*

---

## 1. Website Flow

Users will first land on the website.

**Website:**
* Home
* About
* How It Works
* Contact

**User Actions:**
* Create Account
* Login
* Apply For Loan
* Become a Lender
* Become an OAL Rep

---

## Registration & Access Control System

Public Registration has separate flows based on the required security and access levels:

* **Borrower:** Direct Account Creation. The system automatically activates the login ID/Password after Email/SMS verification.
* **Lender:** Publicly applies for an account. The **Admin** manually verifies business documents and grants Login Access (activates ID/Password).
* **OAL Rep (Agent):** Applies for the agent program. The **Admin** verifies credentials and grants Login Access.
* **Admin / Super Admin:** Can only be manually created by the Super Admin. No public registration is allowed.

*Note: Borrowers are assigned to OAL Reps either automatically by the system (based on location or loan type) or manually by the Admin via the 'Lead Distribution' menu.*

---

## 2. Borrower Workflow

### Account Creation
The borrower will create an account providing:
* Full Legal Name
* Email Address
* Phone Number
* Secure Password

**Verification:** Email / SMS Verification + MFA.
After the account is created, the borrower will start the loan application.

### Borrower Dashboard Menu & Details
* **Dashboard:** Summary of application status, active loan overview, and recent notifications.
* **Loan Application:** Forms to fill out loan amount, duration, and purpose.
* **Documents:** Secure section to upload KYC (ID proof, Address proof, Income proof).
* **AI Borrower Score:** System-generated risk score, qualification status, and detailed breakdown.
* **Waiting Room / Offers:** Space to view matching lenders, received loan offers, and compare terms (interest rate, duration).
* **Notifications:** System alerts, offer updates, and account changes.
* **Messages:** Secure chat interface exclusively for communicating with the assigned OAL Rep.
* **Referral Program:** Generate referral links and track rewards/commissions.
* **Profile & Settings:** Manage personal details, password, and MFA settings.

### Borrower Process
Create Account
↓
Identity Verification
↓
Loan Application Submit
↓
Documents Upload
↓
AI Borrower Score Generate
↓
Receive Loan Offers (in Waiting Room)
↓
Compare & Accept Offer
↓
Loan Processing

### Borrower Communication
The borrower will communicate **strictly with the OAL Rep**.
The borrower will not communicate directly with the Lender.

---

## 3. Lender Workflow

After registration, the lender will receive access through admin verification.

**Process:**
Register
↓
Verification
↓
Admin Approval
↓
Lender Dashboard Access

### Lender Dashboard Menu & Details
* **Dashboard:** High-level overview of total funded loans, active offers, and new leads.
* **Qualified Leads:** List of AI-matched borrowers (with anonymous identities).
* **AI Lead Alerts:** Real-time notifications for newly qualified leads.
* **Borrower Rankings – [ iNV IQ ]:** Custom AI scoring formula that ranks applicants based on loan details and risk factors.
* **Lead Details:** Detailed view of the borrower's loan requirement, AI score, and document verification status.
* **Loan Requests:** Live feed of active borrower requests in the marketplace.
* **Saved Leads:** Bookmarked leads for future consideration.
* **Communication:** Secure Chat, Email, and SMS interface to communicate exclusively with OAL Reps.
* **Offer Management:** Main control to create, update, or withdraw loan offers (Amount, Interest Rate, Terms).
* **Analytics & Reports:** Conversion rates, portfolio health, and performance metrics.
* **Billing & Subscription:** Manage platform fees and active subscription plans.
* **Profile & Settings:** Company details, lending criteria (matching rules), and MFA settings.

### Lender Process
View Qualified Leads / AI Alerts
↓
Review Borrower Details & [iNV IQ] Ranking
↓
Check Loan Information
↓
Submit Offer
↓
Manage Offers
↓
Save Leads for future reference

### Lender Communication
Communication: **Lender ↔ OAL Rep** (via Chat, Email, SMS).
The borrower will not communicate directly with the lender.

---

## 4. OAL Rep / Agent Workflow

The OAL Rep will coordinate between the borrower and the lender.
Agent access will be granted after admin approval.

**Process:**
Register
↓
Admin Verification
↓
Agent Dashboard Access

### Agent Dashboard Menu & Details
* **Dashboard:** Overview of assigned borrowers, pending tasks, and recent messages.
* **Qualified Leads:** List of verified borrowers assigned to the OAL Rep.
* **AI Lead Alerts:** Notifications when a new matching lender is found for an assigned borrower.
* **Lead Details:** Full borrower profile and requirement details to assist them.
* **Loan Requests:** Tracking active borrower requests in the market.
* **Saved Leads:** Pinned leads for quick access.
* **Communication:** OAL LetsWork portal common message box allowing the Rep to chat with both the Borrower and Lender simultaneously.
* **Offer Management (View Only):** View offers sent by lenders and share the results page with the Borrower (No edit access).
* **Analytics & Reports:** Total leads handled, successful loans, and commission reports.
* **Billing & Subscription:** Manage agent subscription and earnings.
* **Profile & Settings:** Agent specialization, contact details, and MFA.

### Agent Process
Receive Assigned Borrowers
↓
Review Applications
↓
Help Borrower
↓
Communicate With Lender
↓
Share Offers With Borrower

### Offer Management
OAL Rep:
* Can view offers in Offer Management
* Can share the Offer Management results page with the borrower
* **Cannot edit offers** (Offer control will remain exclusively with the lender)
* Can use a common message box in OAL LetsWork portal to chat with both Lender and Borrower simultaneously.

---

## 5. OAL Network Panel Flow

In the OAL Network Panel, lenders and OAL reps will manage qualified loan applications in a real-time live mobile/online marketplace.

**Features:**
* Live Marketplace View (Lenders remain anonymous to each other)
* Qualified Leads & AI Lead Alerts
* Lead Details & Loan Requests
* Saved Leads
* Offer Management
* Communication
* Timeline tracking (from application start to funding)

---

## 6. Admin Workflow

Admin will manage the complete platform.

### Admin Dashboard Menu & Details
* **Dashboard:** Bird's-eye view of total users, platform revenue, active loans, and pending tasks.
* **Borrowers Management:** View borrower list, block/unblock accounts, and check history.
* **Lenders Management:** Verify business credentials and approve/reject lenders.
* **Loan Applications:** Track all active loan applications on the platform.
* **AI Scoring Engine:** Set scoring rules and weightage (including special scoring forms for qualified verified applicant investors).
* **Verification Center:** Manual review and approval of KYC documents (ID, Income proof).
* **Document Management:** Secure central storage of all uploaded documents.
* **Lead Distribution:** Configure auto/manual rules for assigning borrowers to OAL Reps.
* **Notifications:** Manage global system alerts and email/SMS templates.
* **Referral & Affiliates:** Manage affiliate networks using 3rd party CRM/ERP integration.
* **Advertisements Management:** Control the system and structure of ads displayed on portals.
* **Payments & Subscription Plans:** Manage lender/agent subscription packages and platform fees.
* **CMS:** Edit landing page content, FAQs, and website pages.
* **Reports & Analytics:** Deep analytics for financial, operational, and user growth data.
* **Support Tickets:** Helpdesk to manage and resolve user queries and issues.
* **Audit Logs:** Strict security tracking of all user actions and system changes.
* **System Settings:** Global configurations, API integrations, and MFA policies.
* **Super Admin:** Control roles and access levels (permissions) for admin staff.

---

## Complete Recommended Application Flow

```
Landing Page
↓
Create Account
↓
KYC Verification
↓
Complete Loan Application
↓
Upload Documents
↓
AI Borrower Score Generated
↓
Qualified Lenders Instantly Notified
↓
Lenders Submit Offers
↓
Borrower Compares Offers
↓
Accept Offer
↓
Loan Processing
↓
Funding
↓
Post Funding Dashboard
```

---

## Role Connection & Network Panel

```text
                 ADMIN
                   |
      ----------------------------
      |             |            |
 Borrower       OAL Rep      Lender
                    |            |
                    --------------
                          |
                  OAL Network Panel
                (Shared Marketplace)


Borrower → OAL Rep → (OAL Network Panel) ← Lender
```
