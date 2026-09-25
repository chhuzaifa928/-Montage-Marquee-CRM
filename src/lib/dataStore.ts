import {
  Booking,
  CateringMenu,
  Hall,
  PaymentRecord,
  WhatsAppMessage,
  INITIAL_BOOKINGS,
  INITIAL_HALLS,
  INITIAL_MENUS,
  INITIAL_PAYMENTS,
  INITIAL_WHATSAPP_LOGS,
} from "@/db/seedData";

// Global singleton storage to persist state across Next.js API requests and server actions during development
declare global {
  // eslint-disable-next-line no-var
  var __montage_store__: {
    halls: Hall[];
    menus: CateringMenu[];
    bookings: Booking[];
    payments: PaymentRecord[];
    whatsappLogs: WhatsAppMessage[];
    auditLogs: Array<{
      id: string;
      action: string;
      actor: string;
      entityType: string;
      entityId: string;
      details: string;
      timestamp: string;
    }>;
  } | undefined;
}

if (!global.__montage_store__) {
  global.__montage_store__ = {
    halls: [...INITIAL_HALLS],
    menus: [...INITIAL_MENUS],
    bookings: [...INITIAL_BOOKINGS],
    payments: [...INITIAL_PAYMENTS],
    whatsappLogs: [...INITIAL_WHATSAPP_LOGS],
    auditLogs: [
      {
        id: "AUD-1001",
        action: "SYSTEM_INITIALIZED",
        actor: "System Administrator",
        entityType: "SYSTEM",
        entityId: "SYS-INIT",
        details: "Montage Event Operations Suite initialized for Gulberg Expressway complex.",
        timestamp: "2026-09-25T08:00:00Z",
      },
    ],
  };
}

const store = global.__montage_store__;

export const MontageDataStore = {
  // Halls
  getHalls(): Hall[] {
    return store.halls;
  },
  getHallById(id: string): Hall | undefined {
    return store.halls.find((h) => h.id === id || h.slug === id);
  },

  // Menus
  getMenus(): CateringMenu[] {
    return store.menus;
  },
  getMenuById(id: string): CateringMenu | undefined {
    return store.menus.find((m) => m.id === id);
  },

  // Bookings
  getBookings(): Booking[] {
    return [...store.bookings].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  getBookingById(id: string): Booking | undefined {
    return store.bookings.find((b) => b.id === id || b.bookingRef === id);
  },
  createBooking(
    bookingData: Omit<Booking, "id" | "bookingRef" | "createdAt" | "updatedAt">
  ): Booking {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newRef = `MEC-2026-${randomSuffix}`;
    const newBooking: Booking = {
      ...bookingData,
      id: newRef,
      bookingRef: newRef,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.bookings.unshift(newBooking);

    this.logAudit(
      "BOOKING_CREATED",
      "Event Sales Executive",
      "BOOKING",
      newRef,
      `New booking created for ${newBooking.customerName} (${newBooking.eventType}) on ${newBooking.eventDate}`
    );

    return newBooking;
  },
  updateBooking(id: string, updates: Partial<Booking>): Booking | null {
    const index = store.bookings.findIndex((b) => b.id === id || b.bookingRef === id);
    if (index === -1) return null;

    store.bookings[index] = {
      ...store.bookings[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.logAudit(
      "BOOKING_UPDATED",
      "Executive Operations",
      "BOOKING",
      id,
      `Booking ${id} status updated to ${updates.status || store.bookings[index].status}`
    );

    return store.bookings[index];
  },

  // Payments
  getPayments(): PaymentRecord[] {
    return [...store.payments].sort(
      (a, b) => new Date(b.verifiedAt || "").getTime() - new Date(a.verifiedAt || "").getTime()
    );
  },
  getPaymentById(id: string): PaymentRecord | undefined {
    return store.payments.find((p) => p.id === id);
  },
  createPayment(paymentData: Omit<PaymentRecord, "id">): PaymentRecord {
    const payId = `PAY-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newPayment: PaymentRecord = {
      ...paymentData,
      id: payId,
    };
    store.payments.unshift(newPayment);

    // If verified, credit to booking
    if (newPayment.verificationStatus === "VERIFIED" && newPayment.bookingId) {
      const booking = this.getBookingById(newPayment.bookingId);
      if (booking) {
        const newAdvance = (booking.advancePaid || 0) + newPayment.amount;
        const newBalance = Math.max(0, booking.totalAmount - newAdvance);
        this.updateBooking(booking.id, {
          advancePaid: newAdvance,
          balanceDue: newBalance,
          status: newAdvance > 0 ? "CONFIRMED" : booking.status,
        });
      }
    }

    this.logAudit(
      "PAYMENT_RECORDED",
      "Financial Audit AI",
      "PAYMENT",
      payId,
      `Payment of PKR ${newPayment.amount.toLocaleString()} recorded via ${newPayment.bankName} (Ref: ${newPayment.transactionRef})`
    );

    return newPayment;
  },
  updatePayment(id: string, updates: Partial<PaymentRecord>): PaymentRecord | null {
    const index = store.payments.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const oldPayment = store.payments[index];
    store.payments[index] = {
      ...oldPayment,
      ...updates,
    };

    // If changing to verified
    if (
      updates.verificationStatus === "VERIFIED" &&
      oldPayment.verificationStatus !== "VERIFIED"
    ) {
      const booking = this.getBookingById(oldPayment.bookingId);
      if (booking) {
        const newAdvance = (booking.advancePaid || 0) + oldPayment.amount;
        const newBalance = Math.max(0, booking.totalAmount - newAdvance);
        this.updateBooking(booking.id, {
          advancePaid: newAdvance,
          balanceDue: newBalance,
          status: "CONFIRMED",
        });
      }
    }

    return store.payments[index];
  },

  // WhatsApp Logs
  getWhatsAppLogs(): WhatsAppMessage[] {
    return [...store.whatsappLogs].sort(
      (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
    );
  },
  createWhatsAppLog(data: Omit<WhatsAppMessage, "id" | "sentAt">): WhatsAppMessage {
    const waId = `WA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLog: WhatsAppMessage = {
      ...data,
      id: waId,
      sentAt: new Date().toISOString(),
    };
    store.whatsappLogs.unshift(newLog);

    this.logAudit(
      "WHATSAPP_DISPATCHED",
      "Meta Cloud API v21.0",
      "WHATSAPP",
      waId,
      `Template [${newLog.templateName}] sent to ${newLog.recipientPhone} (${newLog.recipientName})`
    );

    return newLog;
  },

  // Audit Logs
  getAuditLogs() {
    return [...store.auditLogs].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  },
  logAudit(
    action: string,
    actor: string,
    entityType: string,
    entityId: string,
    details: string
  ) {
    const auditId = `AUD-${Math.floor(1000 + Math.random() * 9000)}`;
    store.auditLogs.unshift({
      id: auditId,
      action,
      actor,
      entityType,
      entityId,
      details,
      timestamp: new Date().toISOString(),
    });
  },

  // Summary Metrics
  getDashboardMetrics() {
    const totalRevenue = store.bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    const advanceCollected = store.bookings.reduce((sum, b) => sum + (b.advancePaid || 0), 0);
    const outstandingBalance = store.bookings.reduce((sum, b) => sum + (b.balanceDue || 0), 0);
    const confirmedCount = store.bookings.filter((b) => b.status === "CONFIRMED").length;
    const provisionalCount = store.bookings.filter((b) => b.status === "PROVISIONAL").length;
    const totalGuests = store.bookings.reduce((sum, b) => sum + (b.guestCount || 0), 0);
    const verifiedPayments = store.payments.filter((p) => p.verificationStatus === "VERIFIED");
    const pendingPayments = store.payments.filter((p) => p.verificationStatus === "PENDING_AUDIT");

    return {
      totalRevenue,
      advanceCollected,
      outstandingBalance,
      totalBookings: store.bookings.length,
      confirmedCount,
      provisionalCount,
      totalGuests,
      verifiedPaymentsCount: verifiedPayments.length,
      pendingPaymentsCount: pendingPayments.length,
      collectionRatioPercent: totalRevenue > 0 ? Math.round((advanceCollected / totalRevenue) * 100) : 0,
    };
  },
};
