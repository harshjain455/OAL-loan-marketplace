# Admin Dashboard - Data Flow & Wireframe Specs

Based on the client requirements (Client-Requirmnet.md and Proposed-Workflow-Roadmap-English.MD) and the structured `AdminLayout`, here is the data flow and wireframe requirements for each Admin Dashboard menu. This is designed for developers to understand exactly what data goes into each section without extra fluff.

---

### 1. Dashboard (`/admin/dashboard`)
- **Data Points:** Bird's-eye view metrics. Total users (Borrowers, Lenders, Reps), Platform Revenue, Active Loans count, Total Marketplace Volume, Pending Tasks (e.g., KYC audit backlog, unapproved lenders).
- **Flow:** Read-only summary cards and charts pulling from all other modules.

### 2. Borrowers (`/admin/borrowers`)
- **Data Points:** List of all registered borrowers (Name, Email, Phone, Status, Assigned Rep).
- **Flow:** View detailed borrower history. Admin actions include manually Blocking/Unblocking accounts.

### 3. Lenders (`/admin/lenders`)
- **Data Points:** Pending and approved lender applications, business credentials.
- **Flow:** Admin reviews public applications -> verifies business documents -> Approves/Rejects lender -> System grants login access (activates ID/Password).

### 4. Loan Applications (`/admin/loan-applications`)
- **Data Points:** Table of all active loan applications across the platform. Includes Amount, Duration, Purpose, Status (Processing, Funded, etc.).
- **Flow:** View-only tracking of the entire marketplace pipeline and funding timestamps.

### 5. AI Scoring Engine (`/admin/ai-scoring`)
- **Data Points:** Rule builder and weightage configurations for the `iNV IQ` risk scoring algorithm.
- **Flow:** Set rules for standard applicants. Contains a special sub-section to configure the special scoring engine rules for "qualified verified applicant investors" based on custom forms.

### 6. Verification Center (`/admin/verification`)
- **Data Points:** Queue of uploaded KYC documents (ID proofs, Income proofs, Address proofs) awaiting review.
- **Flow:** Admin views documents -> Manually Approves or Rejects -> Updates borrower's KYC verification status.

### 7. Document Management (`/admin/document-management`)
- **Data Points:** Global secure central storage repository.
- **Flow:** Search, view, and audit all uploaded documents across the platform. Read-only access to files linked to users and applications.

### 8. Lead Distribution (`/admin/lead-distribution`)
- **Data Points:** Rules Engine for assigning borrowers to OAL Reps (Agents).
- **Flow:** Toggle between Auto-assignment (based on location/loan type) and Manual assignment. Interface to manually re-assign a borrower to a different Rep.

### 9. Notifications (`/admin/notifications`)
- **Data Points:** Global system alerts, Email templates, and SMS templates.
- **Flow:** Create, edit, and dispatch platform-wide announcements. Configure automated trigger messages (e.g., "Account Approved").

### 10. Referrals & Affiliates (`/admin/referrals`)
- **Data Points:** Affiliate tracking, referral links, commission stats.
- **Flow:** Interface intended for 3rd party CRM/ERP integration to manage affiliate networks and payouts.

### 11. Advertisements (`/admin/advertisements`)
- **Data Points:** Ad campaigns, banners, target portal selection.
- **Flow:** Control the system and structure of ads displayed on the Borrower, Lender, and Rep portals. Upload creatives and set visibility rules.

### 12. Payments & Subscriptions (`/admin/payments`)
- **Data Points:** Subscription packages (for Lenders/Agents), platform fee configurations, payment logs.
- **Flow:** Create/Edit subscription tiers. View monthly gross revenue and billing history.

### 13. CMS (`/admin/cms`)
- **Data Points:** Website content (Home, About, How It Works, Contact, FAQs).
- **Flow:** WYSIWYG editor to update public landing page content without touching code.

### 14. Reports & Analytics (`/admin/reports`)
- **Data Points:** Deep analytics for financial, operational, ATS Hiring/Sourcing logs, and user growth data.
- **Flow:** Generate and export reports. Integrated with CRM/ERP data.

### 15. Support Tickets (`/admin/help-desk`)
- **Data Points:** User-submitted queries, issue status (Open, Pending, Resolved), ticket chat logs.
- **Flow:** Helpdesk interface to reply to users and resolve platform issues.

### 16. Audit Logs (`/admin/audit-logs`)
- **Data Points:** Strict security tracking logs (Timestamps, User IDs, Actions performed, IP addresses).
- **Flow:** Immutable list of all user actions and system changes for security compliance.

### 17. System Settings (`/admin/settings`)
- **Data Points:** Global platform configurations, API keys (CRM/ERP), MFA enforcement policies.
- **Flow:** Toggle platform-wide features, configure third-party integration settings.

### 18. Super Admin (`/admin/super-admin`)
- **Data Points:** Admin staff accounts, Role-Based Access Control (RBAC) matrix.
- **Flow:** Create new internal Admin/Rep accounts. Define and modify what modules each admin staff member has permission to access.
