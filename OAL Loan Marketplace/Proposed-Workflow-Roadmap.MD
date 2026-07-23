# OAL Network

## Complete Application Workflow & Role Structure

## Project Overview

OAL Network ek secure, enterprise-level lending platform hoga jahan:

* Borrowers loan applications submit karenge
* OAL Representatives borrowers aur lenders ke beech coordination karenge
* Lenders qualified borrowers ko loan offers provide karenge
* Admin complete platform manadge karega

Main workflow:
**Borrower → OAL Rep → Lender → Offer → Loan Processing**

---

## Security & Compliance
* Platform International Security Standards meet karega.
* Sabhi logins ke liye **Multi-Factor Authentication (MFA)** implement kiya jayega taaki data security maximum rahe.

---

## User Roles

Platform me 4 main roles honge:
1. Borrower / Loan Applicant
2. Lender
3. OAL Rep / Agent
4. Admin / Super Admin

*Note: Yahan sirf 4 user roles hain, lekin system me ek 5th major operational dashboard bhi hai jise **OAL Network Panel** kehte hain. Ye Lenders aur OAL Reps ke liye ek shared Live Marketplace ki tarah kaam karega.*

---

## 1. Website Flow

User sabse pehle website par aayega.

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

Public Registration ke alag-alag flows hain (Security and access ke basis par):

* **Borrower:** Direct Account Creation. Email/SMS verification ke baad system automatically login ID/Password activate kar deta hai.
* **Lender:** Publicly account ke liye apply karta hai. **Admin** manually business documents verify karta hai aur uske baad Login Access (ID/Password) grant karta hai.
* **OAL Rep (Agent):** Agent program ke liye apply karta hai. **Admin** credentials verify karke Login Access grant karta hai.
* **Admin / Super Admin:** Sirf Super Admin hi manually naye admin accounts create kar sakta hai. Koi public registration nahi hogi.

*Note: Borrowers ko OAL Reps assign karne ka kaam ya toh system automatically (location/loan type ke basis par) karta hai, ya phir Admin manually 'Lead Distribution' menu se assign karta hai.*

---

## 2. Borrower Workflow

### Account Creation
Borrower account create karega:
* Full Legal Name
* Email Address
* Phone Number
* Secure Password

**Verification:** Email / SMS Verification + MFA.
Account create hone ke baad borrower loan application start karega.

### Borrower Dashboard Menu & Details
* **Dashboard:** Application status, active loan overview, aur recent notifications ka summary.
* **Loan Application:** Loan amount, duration, aur purpose fill karne ka form.
* **Documents:** KYC (ID proof, Address proof, Income proof) upload karne ka secure section.
* **AI Borrower Score:** System generated risk score, qualification status aur detailed breakdown.
* **Waiting Room / Offers:** Matching lenders, received loan offers, aur terms (interest rate, duration) compare karne ka space.
* **Notifications:** System alerts, offer updates, aur account changes.
* **Messages:** Sirf assigned OAL Rep ke saath secure chat interface.
* **Referral Program:** Referral link generate karna aur rewards/commission track karna.
* **Profile & Settings:** Personal details, password, aur MFA settings manage karna.

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
Receive Loan Offers (Waiting Room me)
↓
Compare & Accept Offer
↓
Loan Processing

### Borrower Communication
Borrower sirf **OAL Rep se communicate karega**.
Borrower directly Lender se communicate nahi karega.

---

## 3. Lender Workflow

Lender registration ke baad admin verification ke through access milega.

**Process:**
Register
↓
Verification
↓
Admin Approval
↓
Lender Dashboard Access

### Lender Dashboard Menu & Details
* **Dashboard:** Total funded loans, active offers, aur new leads ka high-level overview.
* **Qualified Leads:** AI dwara matched borrowers ki list (anonymous identity ke saath).
* **AI Lead Alerts:** Nayi qualified leads aane par real-time notifications.
* **Borrower Rankings – [ iNV IQ ]:** Custom AI scoring formula jo loan details aur risk factors ke basis par applicants ko rank karta hai.
* **Lead Details:** Borrower ki detailed loan requirement, AI score, aur document verification status.
* **Loan Requests:** Live marketplace me active borrower requests ka feed.
* **Saved Leads:** Future consideration ke liye bookmark ki gayi leads.
* **Communication:** OAL Reps ke saath baat karne ke liye secure Chat, Email, aur SMS interface.
* **Offer Management:** Loan offers (Amount, Interest Rate, Terms) create, update, ya withdraw karne ka main control.
* **Analytics & Reports:** Conversion rates, portfolio health, aur performance metrics.
* **Billing & Subscription:** Platform fees aur active subscription plan manage karna.
* **Profile & Settings:** Company details, lending criteria (matching rules), aur MFA settings.

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
Borrower direct lender se communicate nahi karega.

---

## 4. OAL Rep / Agent Workflow

OAL Rep borrower aur lender ke beech coordination karega.
Agent access admin approval ke baad milega.

**Process:**
Register
↓
Admin Verification
↓
Agent Dashboard Access

### Agent Dashboard Menu & Details
* **Dashboard:** Assigned borrowers, pending tasks, aur recent messages ka overview.
* **Qualified Leads:** OAL Rep ko assign ki gayi verified borrowers ki list.
* **AI Lead Alerts:** Assigned borrower ke liye jab naya matching lender mile toh notifications.
* **Lead Details:** Borrower ko assist karne ke liye unki full profile aur requirement details.
* **Loan Requests:** Borrower ki market me chal rahi active requests track karna.
* **Saved Leads:** Quick access ke liye pinned leads.
* **Communication:** OAL LetsWork portal ka common message box jisme Rep ek hi time par Borrower aur Lender dono se chat kar sakta hai.
* **Offer Management (View Only):** Lender ke bheje gaye offers view karna aur Borrower ke saath result page share karna (Edit access nahi hoga).
* **Analytics & Reports:** Total leads handled, successful loans, aur commission reports.
* **Billing & Subscription:** Agent subscription aur earnings manage karna.
* **Profile & Settings:** Agent specialization, contact details, aur MFA.

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
* Offers view kar sakta hai (Offer Management me)
* Borrower ke saath Offer Management results page share kar sakta hai
* **Offer edit nahi kar sakta** (Offer control exclusively lender ke paas hoga)

---

## 5. OAL Network Panel Flow

OAL Network Panel me lenders aur OAL reps qualified loan applications manage karenge. Yeh ek real-time live mobile/online marketplace hoga.

**Features:**
* Live Marketplace View (Lenders ek dusre se anonymous rahenge)
* Qualified Leads & AI Lead Alerts
* Lead Details & Loan Requests
* Saved Leads
* Offer Management
* Communication
* Timeline tracking (application start se lekar funding tak)

---

## 6. Admin Workflow

Admin complete platform manage karega.

### Admin Dashboard Menu & Details
* **Dashboard:** Total users, platform revenue, active loans, aur pending tasks ka bird's-eye view.
* **Borrowers Management:** Borrowers ki list dekhna, block/unblock karna aur history check karna.
* **Lenders Management:** Lenders ke business credentials verify karna aur unhe approve/reject karna.
* **Loan Applications:** Platform par chal rahi sabhi loan applications ko track karna.
* **AI Scoring Engine:** Scoring rules, weightage set karna (isme qualified investors ke liye special scoring forms bhi honge).
* **Verification Center:** KYC documents (ID, Income proof) ka manual review aur approval.
* **Document Management:** Sabhi uploaded documents ka secure central storage.
* **Lead Distribution:** Borrowers ko OAL Reps ke paas assign karne ke auto/manual rules set karna.
* **Notifications:** Global system alerts aur email/SMS templates manage karna.
* **Referral & Affiliates:** 3rd party CRM/ERP integration ke through affiliate network manage karna.
* **Advertisements Management:** Portals par dikhne wale ads ka system aur structure control karna.
* **Payments & Subscription Plans:** Lender/Agent subscription packages aur platform fees manage karna.
* **CMS:** Landing page content, FAQs, aur website pages ko edit karna.
* **Reports & Analytics:** Financial, operational, aur user growth ki deep analytics.
* **Support Tickets:** User queries aur issues ko resolve karne ka helpdesk.
* **Audit Logs:** Security ke liye user actions aur system changes ka strict record.
* **System Settings:** Global configurations, API integrations, aur MFA policies.
* **Super Admin:** Admin staff ke role aur unke access level (permissions) control karna.

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