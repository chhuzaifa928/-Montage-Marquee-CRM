import { pgTable, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";

export const halls = pgTable("halls", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  tagline: varchar("tagline", { length: 255 }),
  capacityMin: integer("capacity_min").notNull(),
  capacityMax: integer("capacity_max").notNull(),
  baseRentLunch: integer("base_rent_lunch").notNull(),
  baseRentDinner: integer("base_rent_dinner").notNull(),
  dimensionSqFt: integer("dimension_sq_ft").notNull(),
  stageWidthFt: integer("stage_width_ft").notNull(),
  amenities: text("amenities").notNull(), // JSON string array
  status: varchar("status", { length: 32 }).default("AVAILABLE").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cateringMenus = pgTable("catering_menus", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  pricePerHead: integer("price_per_head").notNull(),
  minGuests: integer("min_guests").default(100).notNull(),
  items: text("items").notNull(), // JSON string of dishes
  popularChoice: varchar("popular_choice", { length: 32 }).default("NO"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id", { length: 64 }).primaryKey(),
  bookingRef: varchar("booking_ref", { length: 64 }).notNull().unique(),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerPhone: varchar("customerPhone", { length: 64 }).notNull(),
  customerCnic: varchar("customerCnic", { length: 64 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 255 }),
  eventType: varchar("event_type", { length: 64 }).notNull(),
  eventDate: varchar("event_date", { length: 32 }).notNull(),
  timeSlot: varchar("time_slot", { length: 64 }).notNull(),
  hallId: varchar("hall_id", { length: 64 }).notNull(),
  cateringMenuId: varchar("catering_menu_id", { length: 64 }).notNull(),
  guestCount: integer("guest_count").notNull(),
  decorPackage: varchar("decor_package", { length: 128 }),
  decorCost: integer("decor_cost").default(0),
  soundAndAvCost: integer("sound_and_av_cost").default(0),
  hallRent: integer("hall_rent").notNull(),
  foodCost: integer("food_cost").notNull(),
  subtotal: integer("subtotal").notNull(),
  taxRate: integer("tax_rate").default(16),
  taxAmount: integer("tax_amount").notNull(),
  totalAmount: integer("total_amount").notNull(),
  advancePaid: integer("advance_paid").default(0),
  balanceDue: integer("balance_due").notNull(),
  status: varchar("status", { length: 32 }).default("CONFIRMED"),
  specialInstructions: text("special_instructions"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: varchar("id", { length: 64 }).primaryKey(),
  bookingId: varchar("booking_id", { length: 64 }).notNull(),
  amount: integer("amount").notNull(),
  bankName: varchar("bank_name", { length: 128 }).notNull(),
  transactionRef: varchar("transaction_ref", { length: 128 }).notNull(),
  receiptImageUrl: text("receipt_image_url"),
  senderAccountTitle: varchar("sender_account_title", { length: 255 }),
  senderAccountNumber: varchar("sender_account_number", { length: 64 }),
  recipientAccount: varchar("recipient_account", { length: 255 }).default(
    "Montage Event Complex - Meezan A/C 02010108924102"
  ),
  ocrExtractedData: text("ocr_extracted_data"), // JSON string
  verificationStatus: varchar("verification_status", { length: 32 }).default("VERIFIED"),
  verifiedBy: varchar("verified_by", { length: 128 }).default("AI Gemini 2.5 Flash"),
  verifiedAt: timestamp("verified_at").defaultNow(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const whatsappLogs = pgTable("whatsapp_logs", {
  id: varchar("id", { length: 64 }).primaryKey(),
  bookingId: varchar("booking_id", { length: 64 }),
  recipientPhone: varchar("recipient_phone", { length: 64 }).notNull(),
  recipientName: varchar("recipient_name", { length: 255 }).notNull(),
  templateName: varchar("template_name", { length: 128 }).notNull(),
  messageBody: text("message_body").notNull(),
  status: varchar("status", { length: 32 }).default("DELIVERED"),
  metaMessageId: varchar("meta_message_id", { length: 128 }),
  sentAt: timestamp("sent_at").defaultNow(),
});

export const auditLogs = pgTable("audit_logs", {
  id: varchar("id", { length: 64 }).primaryKey(),
  action: varchar("action", { length: 128 }).notNull(),
  actor: varchar("actor", { length: 128 }).notNull(),
  entityType: varchar("entity_type", { length: 64 }).notNull(),
  entityId: varchar("entity_id", { length: 64 }).notNull(),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow(),
});
