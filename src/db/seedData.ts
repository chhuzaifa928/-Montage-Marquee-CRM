export interface Hall {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  capacityMin: number;
  capacityMax: number;
  baseRentLunch: number;
  baseRentDinner: number;
  dimensionSqFt: number;
  stageWidthFt: number;
  amenities: string[];
  status: "AVAILABLE" | "MAINTENANCE" | "RESERVED";
  imageUrl: string;
}

export interface CateringMenu {
  id: string;
  name: string;
  description: string;
  pricePerHead: number;
  minGuests: number;
  popularChoice: boolean;
  appetizers: string[];
  mainCourses: string[];
  riceAndBreads: string[];
  desserts: string[];
  beverages: string[];
}

export interface Booking {
  id: string;
  bookingRef: string;
  customerName: string;
  customerPhone: string;
  customerCnic: string;
  customerEmail: string;
  eventType: string;
  eventDate: string;
  timeSlot: string;
  hallId: string;
  cateringMenuId: string;
  guestCount: number;
  decorPackage: string;
  decorCost: number;
  soundAndAvCost: number;
  hallRent: number;
  foodCost: number;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  advancePaid: number;
  balanceDue: number;
  status: "INQUIRY" | "PROVISIONAL" | "CONFIRMED" | "SETTLED" | "CANCELLED";
  specialInstructions: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRecord {
  id: string;
  bookingId: string;
  bookingRef: string;
  customerName: string;
  amount: number;
  bankName: string;
  transactionRef: string;
  receiptImageUrl: string;
  senderAccountTitle: string;
  senderAccountNumber: string;
  recipientAccount: string;
  ocrExtractedData?: {
    bankName: string;
    transactionId: string;
    amount: number;
    currency: string;
    dateTime: string;
    senderTitle: string;
    senderAccount: string;
    receiverTitle: string;
    receiverAccount: string;
    status: string;
    tamperRiskScore: number; // 0 to 100
    confidenceScore: number; // 0 to 100
    notes: string;
  };
  verificationStatus: "VERIFIED" | "PENDING_AUDIT" | "REJECTED";
  verifiedBy: string;
  verifiedAt: string;
  notes: string;
}

export interface WhatsAppMessage {
  id: string;
  bookingId: string;
  recipientPhone: string;
  recipientName: string;
  templateName: string;
  messageBody: string;
  status: "QUEUED" | "SENT" | "DELIVERED" | "READ" | "FAILED";
  metaMessageId: string;
  sentAt: string;
}

export const INITIAL_HALLS: Hall[] = [
  {
    id: "hall-royal-imperial",
    name: "The Royal Imperial Hall",
    slug: "royal-imperial-hall",
    tagline: "Grandeur and opulent sophistication for high-profile weddings and galas",
    capacityMin: 700,
    capacityMax: 1200,
    baseRentLunch: 450000,
    baseRentDinner: 650000,
    dimensionSqFt: 16000,
    stageWidthFt: 55,
    amenities: [
      "Imported Swarovski Crystal Chandeliers",
      "55ft Motorized Stage & Hydraulic Lift",
      "Dual 500 kVA Caterpillar Silent Genset Backup",
      "Executive Bridal Suite with Private Salon & Restroom",
      "L-Acoustics Concert Audio Array with Shure Axient Mics",
      "Dedicated Valet Drop-off Bay (500+ Vehicles)",
      "High-tonnage Centrifugal Chiller HVAC System",
    ],
    status: "AVAILABLE",
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hall-grand-marquee",
    name: "The Grand Marquee",
    slug: "grand-marquee",
    tagline: "Timeless contemporary luxury with custom thematic velvet drapes",
    capacityMin: 450,
    capacityMax: 850,
    baseRentLunch: 350000,
    baseRentDinner: 500000,
    dimensionSqFt: 12000,
    stageWidthFt: 42,
    amenities: [
      "Custom Thematic Velvet Canopies & Ambience Glow",
      "42ft Designer Floral Stage Area",
      "Dedicated Groom & Bridal Lounges",
      "Robotic Moving Head Lights & Hazer Effects",
      "Separate VIP Family Dining Enclosure",
      "Backup Power Dual Synchronized Generators",
      "High-speed Fiber Wi-Fi 6 for Live Streaming",
    ],
    status: "AVAILABLE",
    imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hall-executive-ballroom",
    name: "The Executive Ballroom",
    slug: "executive-ballroom",
    tagline: "Engineered for corporate summits, award nights, and intimate ceremonies",
    capacityMin: 200,
    capacityMax: 450,
    baseRentLunch: 220000,
    baseRentDinner: 320000,
    dimensionSqFt: 6500,
    stageWidthFt: 32,
    amenities: [
      "Seamless 32ft x 10ft P2.5 Ultra-HD LED Video Wall",
      "Bose Professional Distributed Sound Setup",
      "Flexible Theater, Cluster, and Banquet Seating",
      "Direct Video Conferencing Hybrid Uplink",
      "Dedicated Media & Press Conference Room",
      "Executive VIP Lounge & Green Room",
    ],
    status: "AVAILABLE",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hall-terrace-lawn",
    name: "The Gulberg Terrace Lawn",
    slug: "gulberg-terrace-lawn",
    tagline: "Open-air starlight marquee terrace overlooking Islamabad Margalla skyline",
    capacityMin: 300,
    capacityMax: 650,
    baseRentLunch: 280000,
    baseRentDinner: 380000,
    dimensionSqFt: 9500,
    stageWidthFt: 36,
    amenities: [
      "Panoramic Margalla & Gulberg Skyline Vista",
      "Live BBQ, Tandoor & Shawarma Pavilion",
      "Fairy-light Canopy with Amber Glow Lanterns",
      "Water Fountain Backdrops & Lush Landscaped Turf",
      "Weather-proof Retractable Electric Gazebos",
      "Direct Valet Access and Separate Exit Gateway",
    ],
    status: "AVAILABLE",
    imageUrl: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80",
  },
];

export const INITIAL_MENUS: CateringMenu[] = [
  {
    id: "menu-royal-mughal",
    name: "Royal Mughal Darbar Feast",
    description: "Our signature Pakistani imperial wedding spread with slow-cooked meats, rich dry fruits, and aromatic dum rice.",
    pricePerHead: 4200,
    minGuests: 150,
    popularChoice: true,
    appetizers: ["Chicken Reshmi Seekh Kabab", "Crispy Mint Fish Finger Bites", "Fresh Mint Chutney & Plum Dip"],
    mainCourses: ["Mutton Kunna Qorma (Special Cut)", "Chicken Handi Lazeez with Ginger Julienne", "Palak Paneer with Desi Ghee Tarka"],
    riceAndBreads: ["Special Chicken Dum Biryani (Long Grain Basmati)", "Tandoori Roghani Naan", "Sesame Seed Kalonji Naan"],
    desserts: ["Warm Shahi Tukray with Saffron Khoya", "Special Gulab Jamun in Rose Syrup", "Kulfa Ice Cream Cups"],
    beverages: ["Authentic Kashmiri Chai with Crushed Pistachio & Almonds", "Fresh Mint Lemonade", "Mineral Water & Assorted Soft Drinks"],
  },
  {
    id: "menu-continental-deluxe",
    name: "Continental Banquet Elegance",
    description: "Curated European & Pan-Asian gourmet cuisine tailored for modern celebrations and diplomatic receptions.",
    pricePerHead: 4800,
    minGuests: 100,
    popularChoice: false,
    appetizers: ["Cream of Wild Mushroom Soup with Herb Croutons", "Prawn Tempura with Sweet Chili Glaze", "Caesar Salad with Parmesan Shavings"],
    mainCourses: ["Stuffed Chicken Supreme in Morel Mushroom Cream", "Pan-Seared Snapper with Caper Lemon Butter", "Beef Medallions with Rosemary Peppercorn Jus"],
    riceAndBreads: ["Fettuccine Alfredo with Truffle Oil", "Herb Garlic Roasted Potatoes", "Artisanal Dinner Rolls & Garlic Bread"],
    desserts: ["Belgian Chocolate Molten Lava Cake", "New York Baked Cheesecake", "Tiramisu Cups"],
    beverages: ["Italian Espresso & Cappuccino Bar", "Fresh Peach & Guava Smoothies", "Sparkling Water"],
  },
  {
    id: "menu-executive-corporate",
    name: "Executive Corporate Gala",
    description: "Refined, balanced menu crafted for high-level corporate summits, board lunches, and annual corporate banquets.",
    pricePerHead: 3400,
    minGuests: 100,
    popularChoice: false,
    appetizers: ["Chicken Boti Skewers", "Vegetable Spring Rolls with Sweet Thai Dip", "Fresh Tossed Russian Salad"],
    mainCourses: ["Mutton Pulao with Tender Chops", "Chicken Jalfrezi", "Daal Makhani with Butter Glaze"],
    riceAndBreads: ["Zeera Rice", "Fresh Tandoori Naan & Roti", "Puri Paratha"],
    desserts: ["Kheer Khas in Clay Matkas", "Warm Carrot Halwa (Gajar Ka Halwa) with Pistachio", "Seasonal Fruit Trifle"],
    beverages: ["Peshawari Green Tea (Kahwa) with Cardamom", "Fresh Lemon Mint Cooler", "Mineral Water & Assorted Beverages"],
  },
  {
    id: "menu-gulberg-high-tea",
    name: "Gulberg High Tea Gala",
    description: "An array of hot savory delights, finger delicacies, mini sliders, and signature artisanal patisserie.",
    pricePerHead: 2600,
    minGuests: 80,
    popularChoice: false,
    appetizers: ["Mini Gourmet Chicken Sliders", "Smoked Chicken & Cheese Club Sandwiches", "Golden Fried Prawns"],
    mainCourses: ["Chicken White Karahi with Naan Bites", "Crispy Finger Fish with Tartar Sauce", "Assorted Stuffed Vol-au-Vents"],
    riceAndBreads: ["Vegetable Fried Rice", "Pita Bread with Hummus & Garlic Dip"],
    desserts: ["French Macarons Platter", "Mini Chocolate Eclairs", "Fruit Tartlets", "Red Velvet Bites"],
    beverages: ["Doodh Patti Karak Chai", "English Breakfast Tea Station", "Pink Lemonade & Seasonal Fruit Punch"],
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "MEC-2026-0814",
    bookingRef: "MEC-2026-0814",
    customerName: "Malik Tariq Javed",
    customerPhone: "+92 300 8554921",
    customerCnic: "61101-1234567-1",
    customerEmail: "tariq.javed@bahria-holdings.pk",
    eventType: "Barat",
    eventDate: "2026-10-18",
    timeSlot: "Dinner / Night (07:00 PM - 12:00 AM)",
    hallId: "hall-royal-imperial",
    cateringMenuId: "menu-royal-mughal",
    guestCount: 750,
    decorPackage: "Imperial Gold Stage & Crystal Archways",
    decorCost: 350000,
    soundAndAvCost: 90000,
    hallRent: 650000,
    foodCost: 3150000, // 750 * 4200
    subtotal: 4240000,
    taxRate: 16,
    taxAmount: 678400,
    totalAmount: 4918400,
    advancePaid: 2000000,
    balanceDue: 2918400,
    status: "CONFIRMED",
    specialInstructions: "VIP arrival protocol at 8:30 PM. Bride entry requires hydraulic stage cue. Strict no-fireworks compliance in accordance with Islamabad district laws.",
    createdAt: "2026-09-01T10:30:00Z",
    updatedAt: "2026-09-22T14:15:00Z",
  },
  {
    id: "MEC-2026-0820",
    bookingRef: "MEC-2026-0820",
    customerName: "Ch. Daniyal Afzal",
    customerPhone: "+92 321 9845120",
    customerCnic: "37405-9988123-3",
    customerEmail: "daniyal.afzal@fauji-group.com",
    eventType: "Walima",
    eventDate: "2026-11-02",
    timeSlot: "Dinner / Night (07:00 PM - 12:00 AM)",
    hallId: "hall-grand-marquee",
    cateringMenuId: "menu-royal-mughal",
    guestCount: 550,
    decorPackage: "White Lilies & Emerald Velvet Canopy",
    decorCost: 280000,
    soundAndAvCost: 60000,
    hallRent: 500000,
    foodCost: 2310000, // 550 * 4200
    subtotal: 3150000,
    taxRate: 16,
    taxAmount: 504000,
    totalAmount: 3654000,
    advancePaid: 1500000,
    balanceDue: 2154000,
    status: "CONFIRMED",
    specialInstructions: "VIP seating row reserved for 40 federal dignitaries. Ensure valet parking tags pre-issued.",
    createdAt: "2026-09-05T11:00:00Z",
    updatedAt: "2026-09-20T16:00:00Z",
  },
  {
    id: "MEC-2026-0835",
    bookingRef: "MEC-2026-0835",
    customerName: "Zainab Haroon (Corporate Affairs)",
    customerPhone: "+92 333 5129901",
    customerCnic: "61101-5544332-6",
    customerEmail: "zainab.haroon@telenor.com.pk",
    eventType: "Corporate Summit",
    eventDate: "2026-10-24",
    timeSlot: "Lunch / Afternoon (11:00 AM - 04:30 PM)",
    hallId: "hall-executive-ballroom",
    cateringMenuId: "menu-executive-corporate",
    guestCount: 300,
    decorPackage: "Executive Corporate Truss & LED Backdrop",
    decorCost: 150000,
    soundAndAvCost: 120000,
    hallRent: 220000,
    foodCost: 1020000, // 300 * 3400
    subtotal: 1510000,
    taxRate: 16,
    taxAmount: 241600,
    totalAmount: 1751600,
    advancePaid: 1000000,
    balanceDue: 751600,
    status: "CONFIRMED",
    specialInstructions: "Requires P2.5 LED wall setup calibrated for 4K presentation with 4 wireless lapel microphones. NTN invoice required for Telenor corporate accounts.",
    createdAt: "2026-09-10T09:20:00Z",
    updatedAt: "2026-09-24T12:00:00Z",
  },
  {
    id: "MEC-2026-0842",
    bookingRef: "MEC-2026-0842",
    customerName: "Dr. Bilal Qureshi",
    customerPhone: "+92 345 8011234",
    customerCnic: "61101-7711990-7",
    customerEmail: "bilal.qureshi@shifa.com.pk",
    eventType: "Mehndi / Sangeet",
    eventDate: "2026-10-30",
    timeSlot: "Dinner / Night (07:00 PM - 12:00 AM)",
    hallId: "hall-terrace-lawn",
    cateringMenuId: "menu-royal-mughal",
    guestCount: 400,
    decorPackage: "Marigold Yellow & Royal Velvet Draping",
    decorCost: 240000,
    soundAndAvCost: 80000,
    hallRent: 380000,
    foodCost: 1680000, // 400 * 4200
    subtotal: 2380000,
    taxRate: 16,
    taxAmount: 380800,
    totalAmount: 2760800,
    advancePaid: 1200000,
    balanceDue: 1560800,
    status: "CONFIRMED",
    specialInstructions: "Dholak stage with floor cushions and low divans. Live Jalebi and Kashmiri Chai stall required on terrace lawn.",
    createdAt: "2026-09-12T14:40:00Z",
    updatedAt: "2026-09-25T11:00:00Z",
  },
  {
    id: "MEC-2026-0850",
    bookingRef: "MEC-2026-0850",
    customerName: "Syed Ahsan Raza",
    customerPhone: "+92 301 5567890",
    customerCnic: "37405-1122334-5",
    customerEmail: "ahsan.raza@apexlaw.pk",
    eventType: "Barat",
    eventDate: "2026-11-15",
    timeSlot: "Dinner / Night (07:00 PM - 12:00 AM)",
    hallId: "hall-royal-imperial",
    cateringMenuId: "menu-royal-mughal",
    guestCount: 850,
    decorPackage: "Imperial Gold Stage & Crystal Archways",
    decorCost: 380000,
    soundAndAvCost: 100000,
    hallRent: 650000,
    foodCost: 3570000, // 850 * 4200
    subtotal: 4700000,
    taxRate: 16,
    taxAmount: 752000,
    totalAmount: 5452000,
    advancePaid: 0,
    balanceDue: 5452000,
    status: "PROVISIONAL",
    specialInstructions: "Customer has submitted Meezan Bank Raast transfer slip (PKR 1,500,000). Awaiting Gemini 2.5 Flash receipt OCR verification to confirm booking.",
    createdAt: "2026-09-24T18:00:00Z",
    updatedAt: "2026-09-25T15:30:00Z",
  },
  {
    id: "MEC-2026-0858",
    bookingRef: "MEC-2026-0858",
    customerName: "Barrister Ayla Mirza",
    customerPhone: "+92 312 4433221",
    customerCnic: "61101-3322114-2",
    customerEmail: "ayla.mirza@chambers.pk",
    eventType: "Qawwali Night",
    eventDate: "2026-11-20",
    timeSlot: "Dinner / Night (07:30 PM - 01:00 AM)",
    hallId: "hall-grand-marquee",
    cateringMenuId: "menu-gulberg-high-tea",
    guestCount: 500,
    decorPackage: "Sufi Mystical Indigo & Brass Floor Candlelights",
    decorCost: 300000,
    soundAndAvCost: 150000,
    hallRent: 500000,
    foodCost: 1300000, // 500 * 2600
    subtotal: 2250000,
    taxRate: 16,
    taxAmount: 360000,
    totalAmount: 2610000,
    advancePaid: 1000000,
    balanceDue: 1610000,
    status: "CONFIRMED",
    specialInstructions: "Special acoustic sound baffling. Low seating carpets and bolster pillows (gaw-takkiya) for 300 VIP guests.",
    createdAt: "2026-09-18T16:20:00Z",
    updatedAt: "2026-09-23T18:00:00Z",
  },
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: "PAY-2026-901",
    bookingId: "MEC-2026-0814",
    bookingRef: "MEC-2026-0814",
    customerName: "Malik Tariq Javed",
    amount: 2000000,
    bankName: "Meezan Bank Limited",
    transactionRef: "MZ-260920-881920",
    receiptImageUrl: "/receipts/sample-meezan-receipt.png",
    senderAccountTitle: "Malik Tariq Javed",
    senderAccountNumber: "0201-0102938471",
    recipientAccount: "Montage Event Complex - Meezan A/C 02010108924102",
    ocrExtractedData: {
      bankName: "Meezan Bank Limited",
      transactionId: "MZ-260920-881920",
      amount: 2000000,
      currency: "PKR",
      dateTime: "2026-09-20 14:12:35 PKT",
      senderTitle: "Malik Tariq Javed",
      senderAccount: "0201-0102938471",
      receiverTitle: "Montage Event Complex",
      receiverAccount: "02010108924102",
      status: "COMPLETED / SUCCESSFUL",
      tamperRiskScore: 2, // 2% risk (authentic)
      confidenceScore: 99,
      notes: "High confidence Raast IMTS slip match. Account title matches verified Montage Event Complex corporate account.",
    },
    verificationStatus: "VERIFIED",
    verifiedBy: "AI Gemini 2.5 Flash",
    verifiedAt: "2026-09-20T14:15:00Z",
    notes: "Advance 40% received for Royal Imperial Hall booking. Automated WhatsApp receipt dispatched.",
  },
  {
    id: "PAY-2026-902",
    bookingId: "MEC-2026-0820",
    bookingRef: "MEC-2026-0820",
    customerName: "Ch. Daniyal Afzal",
    amount: 1500000,
    bankName: "Habib Bank Limited (HBL)",
    transactionRef: "HBL-FT-9912041",
    receiptImageUrl: "/receipts/sample-hbl-receipt.png",
    senderAccountTitle: "Chaudhry Daniyal Afzal",
    senderAccountNumber: "0042-790184729101",
    recipientAccount: "Montage Event Complex - Meezan A/C 02010108924102",
    ocrExtractedData: {
      bankName: "Habib Bank Limited (HBL)",
      transactionId: "HBL-FT-9912041",
      amount: 1500000,
      currency: "PKR",
      dateTime: "2026-09-20 15:45:10 PKT",
      senderTitle: "Chaudhry Daniyal Afzal",
      senderAccount: "0042-790184729101",
      receiverTitle: "Montage Event Complex",
      receiverAccount: "02010108924102",
      status: "COMPLETED / TRANSFERRED",
      tamperRiskScore: 1,
      confidenceScore: 98,
      notes: "Authentic HBL Mobile app digital confirmation screenshot.",
    },
    verificationStatus: "VERIFIED",
    verifiedBy: "AI Gemini 2.5 Flash",
    verifiedAt: "2026-09-20T16:00:00Z",
    notes: "Advance payment verified. Booking confirmed in Grand Marquee.",
  },
  {
    id: "PAY-2026-903",
    bookingId: "MEC-2026-0835",
    bookingRef: "MEC-2026-0835",
    customerName: "Zainab Haroon (Corporate Affairs)",
    amount: 1000000,
    bankName: "Bank Alfalah Limited",
    transactionRef: "ALF-9021884",
    receiptImageUrl: "/receipts/sample-alfalah-receipt.png",
    senderAccountTitle: "Telenor Pakistan Corporate Ops",
    senderAccountNumber: "0182-1004928190",
    recipientAccount: "Montage Event Complex - Meezan A/C 02010108924102",
    ocrExtractedData: {
      bankName: "Bank Alfalah Limited",
      transactionId: "ALF-9021884",
      amount: 1000000,
      currency: "PKR",
      dateTime: "2026-09-24 11:30:22 PKT",
      senderTitle: "Telenor Pakistan Corporate Ops",
      senderAccount: "0182-1004928190",
      receiverTitle: "Montage Event Complex",
      receiverAccount: "02010108924102",
      status: "SUCCESSFUL",
      tamperRiskScore: 0,
      confidenceScore: 100,
      notes: "Official corporate IBFT confirmation.",
    },
    verificationStatus: "VERIFIED",
    verifiedBy: "AI Gemini 2.5 Flash",
    verifiedAt: "2026-09-24T12:00:00Z",
    notes: "Advance corporate transfer verified with tax invoice reference.",
  },
  {
    id: "PAY-2026-904",
    bookingId: "MEC-2026-0842",
    bookingRef: "MEC-2026-0842",
    customerName: "Dr. Bilal Qureshi",
    amount: 1200000,
    bankName: "SadaPay",
    transactionRef: "SP-77192801",
    receiptImageUrl: "/receipts/sample-sadapay-receipt.png",
    senderAccountTitle: "Bilal Qureshi",
    senderAccountNumber: "03458011234",
    recipientAccount: "Montage Event Complex - Meezan A/C 02010108924102",
    ocrExtractedData: {
      bankName: "SadaPay Business",
      transactionId: "SP-77192801",
      amount: 1200000,
      currency: "PKR",
      dateTime: "2026-09-25 10:15:00 PKT",
      senderTitle: "Bilal Qureshi",
      senderAccount: "03458011234",
      receiverTitle: "Montage Event Complex",
      receiverAccount: "02010108924102",
      status: "COMPLETED",
      tamperRiskScore: 3,
      confidenceScore: 97,
      notes: "SadaPay Raast instant settlement verified.",
    },
    verificationStatus: "VERIFIED",
    verifiedBy: "AI Gemini 2.5 Flash",
    verifiedAt: "2026-09-25T11:00:00Z",
    notes: "Terrace Lawn advance confirmed.",
  },
];

export const INITIAL_WHATSAPP_LOGS: WhatsAppMessage[] = [
  {
    id: "WA-2026-5501",
    bookingId: "MEC-2026-0814",
    recipientPhone: "+92 300 8554921",
    recipientName: "Malik Tariq Javed",
    templateName: "montage_booking_confirmation",
    messageBody:
      "Dear Malik Tariq Javed, your booking for Barat at Montage Event Complex (The Royal Imperial Hall) on 18-Oct-2026 has been CONFIRMED. Advance received: PKR 2,000,000. Balance due: PKR 2,918,400. You may view your signed digital contract here: https://montage-marquee.pk/voucher/MEC-2026-0814",
    status: "READ",
    metaMessageId: "wamid.HBgMOTEzMDA4NTU0OTIxFQIAEhggNzAyODg5OTk0MDExMjc4OUYwNzIyM0Q4MDFF",
    sentAt: "2026-09-20T14:16:00Z",
  },
  {
    id: "WA-2026-5502",
    bookingId: "MEC-2026-0814",
    recipientPhone: "+92 300 8554921",
    recipientName: "Malik Tariq Javed",
    templateName: "montage_payment_receipt_verified",
    messageBody:
      "Payment Verified! Meezan Bank transfer ref: MZ-260920-881920 for PKR 2,000,000 has been verified by Montage AI Financial Audit and credited to booking MEC-2026-0814.",
    status: "READ",
    metaMessageId: "wamid.HBgMOTEzMDA4NTU0OTIxFQIAEhggNzAyODg5OTk0MDExMjc4OUYwNzIyM0Q4MDFG",
    sentAt: "2026-09-20T14:17:30Z",
  },
  {
    id: "WA-2026-5503",
    bookingId: "MEC-2026-0820",
    recipientPhone: "+92 321 9845120",
    recipientName: "Ch. Daniyal Afzal",
    templateName: "montage_booking_confirmation",
    messageBody:
      "Dear Ch. Daniyal Afzal, your reservation for Walima at Montage Event Complex (The Grand Marquee) on 02-Nov-2026 is confirmed. Advance of PKR 1,500,000 received with thanks. Digital Contract: https://montage-marquee.pk/voucher/MEC-2026-0820",
    status: "DELIVERED",
    metaMessageId: "wamid.HBgMOTEzMjE5ODQ1MTIwFQIAEhggODAyODg5OTk0MDExMjc4OUYwNzIyM0Q4MDFH",
    sentAt: "2026-09-20T16:02:00Z",
  },
  {
    id: "WA-2026-5504",
    bookingId: "MEC-2026-0835",
    recipientPhone: "+92 333 5129901",
    recipientName: "Zainab Haroon",
    templateName: "montage_invoice_pdf_dispatch",
    messageBody:
      "Dear Zainab Haroon, please find attached the official PRA & FBR registered Tax Invoice for Telenor Leadership Summit at Montage Executive Ballroom: https://montage-marquee.pk/api/invoice/MEC-2026-0835",
    status: "READ",
    metaMessageId: "wamid.HBgMOTEzMzM1MTI5OTAxFQIAEhggOTAyODg5OTk0MDExMjc4OUYwNzIyM0Q4MDFI",
    sentAt: "2026-09-24T12:05:00Z",
  },
];
