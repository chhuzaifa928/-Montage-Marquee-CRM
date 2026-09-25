<div align="center">

# 🏛️ Montage Event Operations Suite
### Next-Gen Enterprise B2B SaaS & Venue ERP Platform
**Tailored for Montage Event Complex • Main Gulberg Expressway, Executive Block, Islamabad**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-PostgreSQL-C5F74F?style=for-the-badge&logo=postgresql)](https://orm.drizzle.team/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash_Vision-8E75B2?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Meta WhatsApp API](https://img.shields.io/badge/Meta_WhatsApp-Cloud_API_v21.0-25D366?style=for-the-badge&logo=whatsapp)](https://developers.facebook.com/docs/whatsapp/cloud-api)
[![Author](https://img.shields.io/badge/Architected_&_Engineered_by-Chaudhary_Huzaifa-d97706?style=for-the-badge)](https://github.com/chhuzaifa928)

<br />

**Designed, Architected, and Engineered by [Chaudhary Huzaifa](https://github.com/chhuzaifa928)**  
*Lead Full-Stack Systems Architect & AI Engineer*

</div>

---

## 📑 Table of Contents
- [Executive Overview](#-executive-overview)
- [Islamabad Venue Infrastructure](#-islamabad-venue-infrastructure)
- [Enterprise Feature Matrix](#-enterprise-feature-matrix)
  - [1. Executive Operations & Financial Dashboard](#1-executive-operations--financial-dashboard)
  - [2. Slot Booking & Collision Prevention Matrix](#2-slot-booking--collision-prevention-matrix)
  - [3. Multimodal Bank Slip OCR (Google Gemini Vision)](#3-multimodal-bank-slip-ocr-google-gemini-vision)
  - [4. Meta WhatsApp Business Cloud API v21.0 Engine](#4-meta-whatsapp-business-cloud-api-v210-engine)
  - [5. Official PRA/FBR Tax Invoices & Signed Legal Vouchers](#5-official-prafbr-tax-invoices--signed-legal-vouchers)
  - [6. Culinary Brigade & Catering Cost Estimator](#6-culinary-brigade--catering-cost-estimator)
- [System Architecture & Data Flow](#-system-architecture--data-flow)
- [Technology Stack](#-technology-stack)
- [Database Schema (Drizzle ORM)](#-database-schema-drizzle-orm)
- [Getting Started & Local Setup](#-getting-started--local-setup)
- [Environment Variables](#-environment-variables)
- [API Reference & Webhook Handshake](#-api-reference--webhook-handshake)
- [Author & Engineering Attribution](#-author--engineering-attribution)

---

## 🌟 Executive Overview

**Montage Event Operations Suite** is an enterprise-grade venue management and financial operations platform engineered by **Chaudhary Huzaifa** for **Montage Event Complex**, Islamabad's landmark luxury hospitality venue on Gulberg Expressway.

High-end banquets, destination weddings, and diplomatic summits in Pakistan demand rigorous financial accountability, government tax compliance, and seamless client communication. This suite solves the friction of traditional marquee operations by bridging:
1. **Automated Financial Forensics**: Eliminating forged bank receipts via Google Gemini Vision OCR.
2. **Instant Client Transparency**: Automated multi-channel dispatch via Meta WhatsApp Cloud API.
3. **Regulatory Strictness**: Standardized 16% PRA Sales Tax and FBR withholding invoice generation.
4. **Operations Precision**: Real-time slot clash prevention across 4 expansive banquet halls.

---

## 🏰 Islamabad Venue Infrastructure

The platform models the physical capacity, acoustics, and mechanical infrastructure of the **Montage Event Complex** (Plot 1-4, Executive Block, Main Gulberg Expressway, Gulberg Greens, Islamabad):

| Hall Name | Guest Capacity | Base Rent (Dinner) | Base Rent (Lunch) | Area (Sq Ft) | Key Highlights |
|---|---|---|---|---|---|
| **The Royal Imperial Hall** | 700 – 1,200 Pax | PKR 650,000 | PKR 450,000 | 16,000 | Swarovski Chandeliers, 55ft motorized stage, bridal suite, valet bay |
| **The Grand Marquee** | 450 – 850 Pax | PKR 500,000 | PKR 350,000 | 12,000 | Velvet draped canopies, robotic moving heads, VIP dining enclosure |
| **The Executive Ballroom** | 200 – 450 Pax | PKR 320,000 | PKR 220,000 | 6,500 | Seamless 32ft P2.5 Ultra-HD LED video wall, Bose distributed audio |
| **The Gulberg Terrace Lawn** | 300 – 650 Pax | PKR 380,000 | PKR 280,000 | 9,500 | Margalla skyline vista, fairy-light canopies, live tandoor & BBQ pavilion |

*All venues feature dual synchronized 500 kVA Caterpillar silent gensets with instantaneous automatic transfer switches (ATS).*

---

## ⚡ Enterprise Feature Matrix

### 1. Executive Operations & Financial Dashboard
- **Real-Time B2B Ledger**: Instant pipeline tracking across Total Booking Values, Audited Advances, and Receivable Balances.
- **Dynamic Islamabad Clock**: Accurate PKT (UTC+5) synchronization with operational status beacons.
- **Provisional Slip Alerts**: Immediate warning banners notifying management when advance slips await multimodal audit.

### 2. Slot Booking & Collision Prevention Matrix
- **Dual-Slot Calendar**: Morning/Lunch (12:00 PM – 04:00 PM) vs Dinner/Night (07:00 PM – 12:00 AM).
- **Collision Protection**: Strict engine prevents double-booking of any hall for overlapping event dates and timings.
- **Headcount Bounds Validation**: Enforces minimum and maximum occupancy rules per hall.

### 3. Multimodal Bank Slip OCR (Google Gemini Vision)
- **Engineered by Chaudhary Huzaifa**: Utilizing `@google/genai` (Gemini 2.5 Flash / 3.8 Flash multimodal vision).
- **Pakistani Banking Recognition**: Built-in parsers for **Meezan Bank Raast**, **Habib Bank Limited (HBL)**, **Bank Alfalah**, **MCB**, **Allied Bank**, and **SadaPay Business**.
- **Forensic Extraction**:
  - Bank Name & Raast / IMTS Transaction Reference
  - Amount in PKR & Exact Execution Timestamp
  - Sender Account Title & Account/IBAN Number
  - Beneficiary Match against Montage Event Complex (Meezan A/C `02010108924102`)
  - Digital Tamper Risk Score (0-100%) & Confidence percentage
- **1-Click Ledger Credit**: Updates booking advance balance, flips status to `CONFIRMED`, and prompts WhatsApp voucher dispatch.

### 4. Meta WhatsApp Business Cloud API v21.0 Engine
- **Direct Graph API v21.0 Endpoint**: Dispatches high-deliverability interactive template messages to Pakistani mobile carriers (+92 3XX).
- **Interactive Smartphone Preview**: Real-time virtual smartphone rendering recipient chat bubbles, verified badges, and delivery ticks (Sent, Delivered, Blue Read Receipts).
- **Webhook Handshake**: Complete `/api/whatsapp/webhook` implementing Meta `hub.challenge` verification and delivery status callbacks.

### 5. Official PRA/FBR Tax Invoices & Signed Legal Vouchers
- **Tax Credentials**: NTN: `8294102-4` | PRA Sales Tax Reg: `PRA-32778761101` | FBR ICT: `992140`.
- **Itemized Ledger**: Hall rent, catering per-head subtotal, stage decor, audio-visual truss, 16% PRA Tax, advance credited, balance payable.
- **A4 Print Engine**: Dedicated `@media print` CSS for pixel-perfect physical contract signing and PDF export.
- **Client Web Access**: Standalone public route at `/voucher/[id]`.

### 6. Culinary Brigade & Catering Cost Estimator
- **4 Signature Menus**:
  - *Royal Mughal Darbar Feast* (PKR 4,200/head): Mutton Kunna Qorma, Dum Biryani, Reshmi Seekh Kabab, Roghani Naan, Kashmiri Chai.
  - *Continental Banquet Elegance* (PKR 4,800/head): Prawn Tempura, Beef Medallions, Morel Mushroom Chicken, Belgian Lava Cake.
  - *Executive Corporate Gala* (PKR 3,400/head): Mutton Pulao, Chicken Handi Lazeez, Shami Kababs, Green Tea / Kahwa.
  - *Gulberg High Tea Gala* (PKR 2,600/head): Gourmet Sliders, Finger Fish, Club Sandwiches, French Macarons, Karak Chai.
- **Live Stall Surcharges**: Real-time toggles for Live Samawar Kashmiri Chai (+PKR 150/head), Hot Jalebi Counters (+PKR 120/head), and Red Snapper Bites (+PKR 350/head).

---

## 🏗️ System Architecture & Data Flow

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   MONTAGE EVENT OPERATIONS SUITE                       │
│                     (Designed by Chaudhary Huzaifa)                    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌──────────────┐             ┌──────────────┐             ┌──────────────┐
│  Executive   │             │   Multimodal │             │ Meta WhatsApp│
│  UI Console  │             │   Gemini OCR │             │ Cloud API    │
│ (Tailwind 4) │             │ (Flash Vision│             │ (v21.0 Graph)│
└──────┬───────┘             └──────┬───────┘             └──────┬───────┘
       │                            │                            │
       └────────────────────────────┼────────────────────────────┘
                                    │
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │             Montage Unified Data Service Layer          │
       │                   (src/lib/dataStore.ts)                │
       └────────────────────────────┬────────────────────────────┘
                                    │
       ┌────────────────────────────┴────────────────────────────┐
       ▼                                                         ▼
┌───────────────────────────────┐               ┌────────────────────────────────┐
│  PostgreSQL Database Engine   │               │   PRA & FBR Official Tax       │
│      (Drizzle ORM Schema)     │               │   Printable Voucher Generator  │
└───────────────────────────────┘               └────────────────────────────────┘
```

---

## 💻 Technology Stack

- **Core Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack, Server Actions, Route Handlers)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict typing across financial & booking models)
- **Styling & Design System**: [Tailwind CSS v4](https://tailwindcss.com/) with Lucide-React icons and executive light theme
- **Database & Migration Engine**: PostgreSQL & [Drizzle ORM](https://orm.drizzle.team/)
- **Artificial Intelligence**: [Google Gemini 2.5 Flash / 3.8 Flash Vision](https://ai.google.dev/) via `@google/genai`
- **Telecommunications**: [Meta WhatsApp Business Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api) (Graph API v21.0)

---

## 🗄️ Database Schema (Drizzle ORM)

Located in [`src/db/schema.ts`](./src/db/schema.ts):

- **`halls`**: Venue specifications, minimum/maximum guest capacities, dimensions, lunch & dinner rent rates, power backup configurations.
- **`catering_menus`**: Course components (appetizers, gravies, rice, breads, desserts, beverages) and per-head pricing.
- **`bookings`**: Customer credentials, CNIC, phone, event date, slot allocation, decor packages, itemized tax computations, advance balances.
- **`payments`**: Transaction references, bank names, base64 receipt slips, Gemini OCR forensic JSON data, audit verification stamps.
- **`whatsapp_logs`**: Meta message IDs (`wamid...`), recipient mobile numbers, template parameters, transmission timestamps, read statuses.
- **`audit_logs`**: Immutable activity trail tracking every booking creation, OCR verification, and financial credit.

---

## 🚀 Getting Started & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/chhuzaifa928/-Montage-Marquee-CRM.git
cd -Montage-Marquee-CRM
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

Populate `.env.local` with your credentials:
```env
# Multimodal AI: Google Gemini Vision API Key
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.8-flash

# Meta WhatsApp Business Cloud API (Graph API v21.0)
WHATSAPP_ACCESS_TOKEN=your_meta_system_user_token
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
WHATSAPP_VERIFY_TOKEN=montage_islamabad_webhook_secret_2026

# PostgreSQL Connection (Drizzle ORM)
DATABASE_URL=postgres://postgres:postgres@localhost:5432/montage_db

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 🔌 API Reference & Webhook Handshake

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/bookings` | List all bookings with optional query filters (`hallId`, `status`, `date`) |
| `POST` | `/api/bookings` | Create a new reservation with automatic collision checks & tax calculations |
| `GET` | `/api/halls` | Retrieve all 4 hall infrastructure specs, pricing, and availability |
| `GET` | `/api/menus` | Retrieve all catering menus with detailed dish composition |
| `POST` | `/api/ocr/receipt` | Upload bank receipt slip (Base64/Multipart) for Gemini 2.5 Flash OCR analysis |
| `GET` | `/api/payments` | Retrieve audited bank payments ledger |
| `POST` | `/api/payments` | Record verified payment and automatically credit the booking balance |
| `POST` | `/api/whatsapp/send` | Dispatch template messages via Meta Graph API v21.0 |
| `GET` | `/api/whatsapp/webhook` | Meta Webhook Verification challenge echo (`hub.challenge`) |
| `POST` | `/api/whatsapp/webhook` | Meta Webhook Inbound status & delivery receipt listener |
| `GET` | `/api/invoice/:id` | Retrieve formatted PRA/FBR computerized tax invoice data |
| `GET` | `/voucher/:id` | Public printable digital voucher and signed legal contract page |

---

## 👨‍💻 Author & Engineering Attribution

This platform was designed, engineered, and maintained by:

<div align="center">

### **Chaudhary Huzaifa**
**Lead Software Architect & AI Systems Engineer**

[![GitHub](https://img.shields.io/badge/GitHub-chhuzaifa928-181717?style=for-the-badge&logo=github)](https://github.com/chhuzaifa928)
[![Repository](https://img.shields.io/badge/Repository--Montage--Marquee--CRM-d97706?style=for-the-badge&logo=git)](https://github.com/chhuzaifa928/-Montage-Marquee-CRM)
[![Email](https://img.shields.io/badge/Email-huzaifa928.fui%40gmail.com-EA4335?style=for-the-badge&logo=gmail)](mailto:huzaifa928.fui@gmail.com)

*Engineered with precision for Montage Event Complex Private Limited, Islamabad.*

</div>

---

## 📜 Legal & Compliance Notice
- Registered Business: **Montage Event Complex (Pvt) Ltd**
- NTN: **8294102-4** | PRA Sales Tax: **PRA-32778761101** | FBR ICT: **992140**
- Location: Plot 1-4, Executive Block, Main Gulberg Expressway, Gulberg Greens, Islamabad
- All rights reserved © 2026 Chaudhary Huzaifa.
