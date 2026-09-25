// Sample Pakistani Bank Receipts for instant 1-click OCR demonstration and testing

export interface SampleBankReceipt {
  id: string;
  bankName: string;
  expectedRef: string;
  expectedAmount: number;
  expectedSender: string;
  dataUrl: string;
  filename: string;
}

// Generate high-resolution SVG receipt for Meezan Bank
function generateMeezanReceiptSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 850" width="600" height="850">
    <defs>
      <linearGradient id="meezanHeader" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#005a2b"/>
        <stop offset="100%" stop-color="#003d1c"/>
      </linearGradient>
    </defs>
    <!-- Background Card -->
    <rect width="600" height="850" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    
    <!-- Top Brand Bar -->
    <rect width="600" height="120" rx="16" fill="url(#meezanHeader)"/>
    <rect y="104" width="600" height="16" fill="url(#meezanHeader)"/>
    
    <!-- Meezan Emblem & Title -->
    <circle cx="60" cy="60" r="30" fill="#ffffff" opacity="0.15"/>
    <text x="60" y="68" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">M</text>
    <text x="110" y="55" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ffffff">Meezan Bank Limited</text>
    <text x="110" y="78" font-family="Arial, sans-serif" font-size="13" fill="#d1fae5">The Premier Islamic Bank • Raast Instant Payment</text>

    <!-- Success Badge -->
    <g transform="translate(480, 45)">
      <circle cx="20" cy="20" r="18" fill="#10b981"/>
      <path d="M12 20 L18 26 L28 14" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round"/>
    </g>

    <!-- Amount Banner -->
    <rect x="40" y="150" width="520" height="110" rx="12" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1.5"/>
    <text x="60" y="185" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="#166534">TRANSFER AMOUNT</text>
    <text x="60" y="235" font-family="Arial, sans-serif" font-size="34" font-weight="bold" fill="#14532d">PKR 2,000,000.00</text>
    <rect x="420" y="175" width="120" height="30" rx="15" fill="#dcfce7"/>
    <text x="480" y="195" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#15803d" text-anchor="middle">✓ SUCCESSFUL</text>

    <!-- Transaction Attributes Grid -->
    <g transform="translate(40, 290)">
      <!-- Line 1: Reference -->
      <text x="0" y="20" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Transaction Ref / Raast ID</text>
      <text x="0" y="42" font-family="Courier, monospace" font-size="16" font-weight="bold" fill="#0f172a">MZ-260920-881920</text>
      <line x1="0" y1="58" x2="520" y2="58" stroke="#f1f5f9" stroke-width="1.5"/>

      <!-- Line 2: Date & Time -->
      <text x="0" y="85" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Date &amp; Time (PKT)</text>
      <text x="0" y="107" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">20-Sep-2026 02:12:35 PM</text>
      <line x1="0" y1="123" x2="520" y2="123" stroke="#f1f5f9" stroke-width="1.5"/>

      <!-- Line 3: From Account -->
      <text x="0" y="150" font-family="Arial, sans-serif" font-size="13" fill="#64748b">From (Sender)</text>
      <text x="0" y="172" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">Malik Tariq Javed</text>
      <text x="0" y="192" font-family="Arial, sans-serif" font-size="13" fill="#475569">A/C: 0201-0102938471 (Meezan Bank)</text>
      <line x1="0" y1="208" x2="520" y2="208" stroke="#f1f5f9" stroke-width="1.5"/>

      <!-- Line 4: Beneficiary Account -->
      <text x="0" y="235" font-family="Arial, sans-serif" font-size="13" fill="#64748b">To Beneficiary</text>
      <text x="0" y="257" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#005a2b">Montage Event Complex Pvt Ltd</text>
      <text x="0" y="277" font-family="Arial, sans-serif" font-size="13" fill="#475569">A/C: 02010108924102 • Gulberg Greens Islamabad</text>
      <line x1="0" y1="293" x2="520" y2="293" stroke="#f1f5f9" stroke-width="1.5"/>

      <!-- Line 5: Purpose / Note -->
      <text x="0" y="320" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Purpose of Payment</text>
      <text x="0" y="342" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">Advance Hall Booking (Barat: MEC-2026-0814)</text>
    </g>

    <!-- Footer Note -->
    <rect x="40" y="730" width="520" height="75" rx="8" fill="#f8fafc" stroke="#e2e8f0"/>
    <text x="60" y="755" font-family="Arial, sans-serif" font-size="11" fill="#64748b">State Bank of Pakistan Raast Payment Gateway System.</text>
    <text x="60" y="775" font-family="Arial, sans-serif" font-size="11" fill="#64748b">Computer generated acknowledgment receipt. No physical signature required.</text>
  </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// Generate SVG receipt for HBL Mobile
function generateHblReceiptSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 850" width="600" height="850">
    <!-- Background Card -->
    <rect width="600" height="850" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
    
    <!-- HBL Green Header -->
    <rect width="600" height="120" rx="16" fill="#008269"/>
    <rect y="104" width="600" height="16" fill="#008269"/>

    <text x="60" y="60" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#ffffff">HBL</text>
    <text x="130" y="55" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#ffffff">Habib Bank Limited</text>
    <text x="130" y="78" font-family="Arial, sans-serif" font-size="13" fill="#a7f3d0">Inter-Bank Funds Transfer (IBFT)</text>

    <!-- Status Banner -->
    <rect x="40" y="150" width="520" height="100" rx="12" fill="#ecfdf5" stroke="#a7f3d0"/>
    <text x="60" y="185" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#047857">AMOUNT SENT</text>
    <text x="60" y="225" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#065f46">PKR 1,500,000.00</text>
    <text x="440" y="200" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#047857">SUCCESSFUL</text>

    <!-- Details -->
    <g transform="translate(40, 280)">
      <text x="0" y="25" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Transaction Reference</text>
      <text x="0" y="47" font-family="Courier, monospace" font-size="16" font-weight="bold" fill="#0f172a">HBL-FT-9912041</text>
      <line x1="0" y1="62" x2="520" y2="62" stroke="#e2e8f0"/>

      <text x="0" y="90" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Execution Timestamp</text>
      <text x="0" y="112" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">20-Sep-2026 03:45:10 PM PKT</text>
      <line x1="0" y1="127" x2="520" y2="127" stroke="#e2e8f0"/>

      <text x="0" y="155" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Sender (Debited Account)</text>
      <text x="0" y="177" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">Ch. Daniyal Afzal</text>
      <text x="0" y="197" font-family="Arial, sans-serif" font-size="13" fill="#475569">0042-790184729101 (HBL Main)</text>
      <line x1="0" y1="212" x2="520" y2="212" stroke="#e2e8f0"/>

      <text x="0" y="240" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Beneficiary Name</text>
      <text x="0" y="262" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#008269">Montage Event Complex</text>
      <text x="0" y="282" font-family="Arial, sans-serif" font-size="13" fill="#475569">Meezan Bank • A/C 02010108924102</text>
      <line x1="0" y1="297" x2="520" y2="297" stroke="#e2e8f0"/>

      <text x="0" y="325" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Booking / Remarks</text>
      <text x="0" y="347" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">MEC-2026-0820 Grand Marquee Advance</text>
    </g>

    <text x="60" y="780" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8">HBL Mobile App Digital Transaction Certificate</text>
  </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// Generate SVG receipt for SadaPay
function generateSadaPayReceiptSvg(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 850" width="600" height="850">
    <rect width="600" height="850" rx="16" fill="#0b0f19"/>
    
    <!-- Top SadaPay Logo -->
    <rect x="40" y="40" width="40" height="40" rx="8" fill="#1de9b6"/>
    <text x="60" y="68" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#0b0f19" text-anchor="middle">S</text>
    <text x="95" y="67" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#ffffff">SadaPay</text>
    
    <text x="40" y="160" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8">Payment Sent</text>
    <text x="40" y="210" font-family="Arial, sans-serif" font-size="38" font-weight="bold" fill="#ffffff">Rs. 1,200,000</text>
    <text x="40" y="240" font-family="Arial, sans-serif" font-size="14" fill="#1de9b6">✓ Completed Instantly via Raast</text>

    <!-- Details Card -->
    <rect x="40" y="270" width="520" height="420" rx="12" fill="#161e2e" stroke="#1f293d"/>
    
    <g transform="translate(65, 305)">
      <text x="0" y="20" font-family="Arial, sans-serif" font-size="13" fill="#64748b">To</text>
      <text x="0" y="45" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#ffffff">Montage Event Complex</text>
      <text x="0" y="68" font-family="Arial, sans-serif" font-size="13" fill="#94a3b8">Meezan Bank • 02010108924102</text>
      <line x1="0" y1="85" x2="470" y2="85" stroke="#253248"/>

      <text x="0" y="115" font-family="Arial, sans-serif" font-size="13" fill="#64748b">From</text>
      <text x="0" y="140" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#ffffff">Dr. Bilal Qureshi</text>
      <text x="0" y="163" font-family="Arial, sans-serif" font-size="13" fill="#94a3b8">0345-8011234 (SadaPay Account)</text>
      <line x1="0" y1="180" x2="470" y2="180" stroke="#253248"/>

      <text x="0" y="210" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Transaction Reference ID</text>
      <text x="0" y="235" font-family="Courier, monospace" font-size="16" font-weight="bold" fill="#1de9b6">SP-77192801</text>
      <line x1="0" y1="250" x2="470" y2="250" stroke="#253248"/>

      <text x="0" y="280" font-family="Arial, sans-serif" font-size="13" fill="#64748b">Date &amp; Time</text>
      <text x="0" y="305" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#ffffff">25 Sep 2026, 10:15 AM</text>
    </g>

    <text x="60" y="740" font-family="Arial, sans-serif" font-size="12" fill="#64748b">SadaPay is regulated by the State Bank of Pakistan.</text>
  </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export const SAMPLE_RECEIPTS: SampleBankReceipt[] = [
  {
    id: "meezan-raast",
    bankName: "Meezan Bank Limited",
    expectedRef: "MZ-260920-881920",
    expectedAmount: 2000000,
    expectedSender: "Malik Tariq Javed",
    dataUrl: generateMeezanReceiptSvg(),
    filename: "meezan-raast-slip.svg",
  },
  {
    id: "hbl-ibft",
    bankName: "Habib Bank Limited (HBL)",
    expectedRef: "HBL-FT-9912041",
    expectedAmount: 1500000,
    expectedSender: "Ch. Daniyal Afzal",
    dataUrl: generateHblReceiptSvg(),
    filename: "hbl-mobile-transfer.svg",
  },
  {
    id: "sadapay-raast",
    bankName: "SadaPay Business",
    expectedRef: "SP-77192801",
    expectedAmount: 1200000,
    expectedSender: "Dr. Bilal Qureshi",
    dataUrl: generateSadaPayReceiptSvg(),
    filename: "sadapay-transfer.svg",
  },
];
