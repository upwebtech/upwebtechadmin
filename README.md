# UP Web Tech --- Business Management Platform (Since 2026)

> **Free, Self-Hostable Business Management & Client Delivery Platform for UP Web Tech**
> *Web Development • Apps • SEO • Digital Solutions*

---

## 🚀 Overview

The **UP Web Tech Business Management Platform** is a full-featured web application engineered to operate UP Web Tech's agency operations. It separates workflows into three dedicated, role-guarded portals:

1. **Admin Command Center**: Complete executive oversight, client CRM, developer/worker team allocation, project pipelines, task management, GST invoicing, expense ledger, and profit margin analysis.
2. **Worker Station**: Focused developer & designer portal for reviewing assigned deliverables, tracking sprint deadlines, updating task statuses (`TODO` → `IN_PROGRESS` → `IN_REVIEW`), and submitting work for QA review without exposing client billing or company margins.
3. **Client Portal**: Clean, non-technical customer experience featuring live staging website previews, visual 6-stage milestone roadmaps (`Requirements` → `Design` → `Development` → `Testing` → `Client Review` → `Live Deployment`), direct feedback/revision submission, and invoice receipts.

---

## 🛠️ Free Open-Source Tech Stack

- **Frontend & App Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling & UI**: Tailwind CSS v4, Lucide Icons
- **Relational Database**: PostgreSQL / Supabase Free Tier (`migrations/01_initial_schema.sql`)
- **Excel & Spreadsheet Engine**: SheetJS (`xlsx`) for column-validated XLSX import and 1-click export
- **Self-Hosting / Deployment**: Vercel (Frontend) + Supabase (PostgreSQL, Auth, Storage)

---

## 📦 Directory Structure

```text
up-web-tech-platform/
├── public/
│   └── logo.jpg               # Official UP Web Tech (Since 2026) emblem
├── migrations/
│   ├── 01_initial_schema.sql  # Full PostgreSQL relational schema & indexes
│   └── 02_seed_data.sql       # Initial demo dataset (Clients, Workers, Projects)
├── src/
│   ├── app/
│   │   ├── admin/             # Admin portal (dashboard, clients, workers, projects, etc.)
│   │   ├── worker/            # Developer & designer workspace
│   │   ├── client/            # Client review & invoice portal
│   │   ├── layout.tsx         # Global layout with branding & AuthProvider
│   │   └── page.tsx           # Multi-portal landing & role gateway
│   ├── components/
│   │   ├── branding/Logo.tsx  # Official UP Web Tech logo component
│   │   ├── layouts/           # Sidebar & Header components with role switcher
│   │   ├── excel/             # SheetJS import/export modals
│   │   └── ui/                # Status badges, cards, metrics
│   ├── lib/
│   │   ├── auth/              # Role-based auth provider
│   │   ├── db/store.ts        # Persistent relational data store & seed repository
│   │   └── excel/             # SheetJS Excel import/export pipelines
│   └── types/                 # Strict TypeScript models
├── .env.example
└── README.md
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 👥 Demo Personas & Credentials

The platform comes pre-seeded with realistic records for instant testing:

| Role | Name | Email | Focus |
|---|---|---|---|
| **Super Admin** | UP Web Tech Admin | `admin@upwebtech.com` | Complete access, financials, Excel import/export |
| **Worker** | Rahul Sharma (EMP-001) | `rahul@upwebtech.com` | Lead Full-Stack Dev (Assigned e-commerce project) |
| **Worker** | Priya Patel (EMP-002) | `priya@upwebtech.com` | Senior UI/UX Designer (Zenith Hotel Suite) |
| **Worker** | Amit Verma (EMP-003) | `amit@upwebtech.com` | DevOps & Backend (Nexa Fleet GPS route) |
| **Client** | Vikram Malhotra | `vikram@apolloretail.in` | Apollo Retail Mart (E-commerce Store) |
| **Client** | Sneha Reddy | `sneha@nexalogistics.com` | Nexa Logistics (Fleet Tracking SaaS) |
| **Client** | Rohit Khanna | `rohit@zenithhospitality.com` | Zenith Grand Hotel (Luxury Resort Site) |

*Use the instant role switcher in the sidebar to toggle between Admin, Worker, and Client views in real-time.*

---

## 📊 Database Migration & Supabase Setup

To connect to a live Supabase PostgreSQL database:
1. Create a free project on [Supabase](https://supabase.com).
2. Open the **SQL Editor** in Supabase and paste the contents of:
   - `migrations/01_initial_schema.sql` (Creates all tables, foreign keys, and indexes)
   - `migrations/02_seed_data.sql` (Populates initial business records)
3. Copy your project URL and Anon Key into `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
   ```
