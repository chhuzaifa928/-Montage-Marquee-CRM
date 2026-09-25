# Montage Event Operations Suite
**Enterprise B2B SaaS Platform for Montage Event Complex**  
*Plot 1-4, Executive Block, Main Gulberg Expressway, Gulberg Greens, Islamabad*

---

## 🏛️ Overview
The **Montage Event Operations Suite** is an enterprise-grade venue management and financial operations platform designed specifically for the Pakistani luxury banquet and corporate event market. 

It unifies real-time hall scheduling across 4 distinct venues, automated Pakistani bank receipt OCR verification using **Google Gemini 2.5 Flash / 3.8 Flash**, automated B2B customer messaging via the **Meta WhatsApp Business Cloud API (Graph API v21.0)**, and digital signed legal contract & tax invoice generation compliant with PRA & FBR regulations.

---

## ✨ Key Features & Architecture

### 1. Executive Operations Dashboard
- **Financial KPIs**: Real-time pipeline revenue, audited advance payments, outstanding balances, and guest footprints.
- **Hall Readiness Matrix**: Live tracking for:
  - *The Royal Imperial Hall* (700–1,200 Pax)
  - *The Grand Marquee* (450–850 Pax)
  - *The Executive Ballroom* (200–450 Pax)
  - *The Gulberg Terrace Lawn* (300–650 Pax)
- Dual 500 kVA Caterpillar generator synchronization & HVAC status indicators.

### 2. Banquet Slot Allocation & Clash Prevention
- Morning/Lunch (12:00 PM – 04:00 PM) vs Dinner/Night (07:00 PM – 12:00 AM) reservation slots.
- Automated collision detection preventing double bookings.
- Interactive booking wizard with dynamic Pakistani tax calculation (16% PRA Sales Tax on services).

### 3. Multimodal Bank Receipt OCR (Google Gemini Vision)
- **1-Click Testing**: Pre-loaded authentic sample transfer slips for **Meezan Bank Raast**, **HBL Mobile**, and **SadaPay Business**.
- **Forensic Extraction**: Powered by `@google/genai` (Gemini 2.5 Flash / 3.8 Flash) extracting:
  - Bank Name & Raast / IMTS Transaction ID
  - Amount in PKR & Execution Timestamp
  - Sender Name & Account Title
  - Beneficiary Match against Montage Event Complex account (Meezan A/C `02010108924102`)
  - Forgery / Tamper Risk Score & OCR Confidence meter
- **1-Click Ledger Credit**: Updates booking balance and marks status as `CONFIRMED`.

### 4. Meta WhatsApp Business Cloud API v21.0
- **Official Webhook Integration**: Verification challenge handshake (`/api/whatsapp/webhook`) and incoming message listener.
- **Pre-Configured B2B Templates**:
  - `montage_booking_confirmation`: Hall, date, slot, advance received, contract link
  - `montage_payment_receipt_verified`: Bank reference, amount PKR, updated balance
  - `montage_event_reminder`: 48-hour protocol notice & headcount lock
  - `montage_invoice_pdf_dispatch`: FBR / PRA registered tax invoice link
- **Interactive Device Preview**: Real-time smartphone simulator with WhatsApp message bubbles, verified badges, and delivery ticks.

### 5. Legal Contracts & Official Tax Invoices
- Registered credentials: **NTN: 8294102-4**, **PRA Sales Tax Reg: PRA-32778761101**, **FBR ICT: 992140**.
- Complete itemized breakdown (Hall Rent, Catering per head, Decor, Audio-Visual, 16% PRA Tax, Advance Paid, Balance Due).
- Dedicated `@media print` CSS for pixel-perfect A4 printing or PDF export.
- Standalone client access route at `/voucher/[id]`.

### 6. Culinary & Catering Costing Engine
- 4 Signature menus: Royal Mughal Darbar Feast, Continental Banquet, Executive Corporate Gala, and Gulberg High Tea.
- Live terrace stall toggles (Live Samawar Kashmiri Chai, Hot Jalebi Counter, Seafood bites) with real-time per-head cost calculations.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- npm / pnpm / bun

### 1. Clone & Install
```bash
git clone https://github.com/<your-username>/montage-marquee-suite.git
cd montage-marquee-suite
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local` and set your credentials:
```bash
cp .env.example .env.local
```

```env
# Google Gemini API Key for Bank Receipt OCR
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.8-flash

# Meta WhatsApp Business Cloud API
WHATSAPP_ACCESS_TOKEN=your_meta_system_user_token
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
WHATSAPP_VERIFY_TOKEN=montage_islamabad_webhook_secret_2026

# PostgreSQL Database (Drizzle ORM)
DATABASE_URL=postgres://postgres:postgres@localhost:5432/montage_db
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router, Turbopack, TypeScript)
- **Styling:** Tailwind CSS v4, Lucide-React
- **Database / ORM:** PostgreSQL, Drizzle ORM, Drizzle-Kit
- **Vision AI:** Google Gemini 2.5 Flash / 3.8 Flash (`@google/genai`)
- **Messaging:** Meta WhatsApp Business Cloud API (Graph API v21.0)

---

## 📄 License
Proprietary — Montage Event Complex Private Limited, Islamabad.
