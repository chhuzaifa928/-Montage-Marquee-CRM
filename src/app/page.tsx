"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { DashboardOverview } from "@/components/DashboardOverview";
import { SlotBookingManager } from "@/components/SlotBookingManager";
import { AiReceiptVerificationHub } from "@/components/AiReceiptVerificationHub";
import { WhatsAppControlCenter } from "@/components/WhatsAppControlCenter";
import { MenuCostEstimator } from "@/components/MenuCostEstimator";
import { ContractsAndInvoices } from "@/components/ContractsAndInvoices";
import { SignedVoucherModal } from "@/components/SignedVoucherModal";
import {
  Booking,
  Hall,
  CateringMenu,
  PaymentRecord,
  WhatsAppMessage,
  INITIAL_BOOKINGS,
  INITIAL_HALLS,
  INITIAL_MENUS,
  INITIAL_PAYMENTS,
  INITIAL_WHATSAPP_LOGS,
} from "@/db/seedData";
import { Building2, ShieldCheck, Heart, Sparkles, CheckCircle2 } from "lucide-react";

export default function MontageOperationsApp() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [halls, setHalls] = useState<Hall[]>(INITIAL_HALLS);
  const [menus, setMenus] = useState<CateringMenu[]>(INITIAL_MENUS);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [whatsappLogs, setWhatsappLogs] = useState<WhatsAppMessage[]>(INITIAL_WHATSAPP_LOGS);

  const [isCreateBookingOpen, setIsCreateBookingOpen] = useState(false);
  const [selectedVoucherBooking, setSelectedVoucherBooking] = useState<Booking | null>(null);
  const [toastMessage, setToastMessage] = useState<string>("");

  // Show auto-dismissing toast notifications
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4500);
  };

  // Fetch initial state from API if available
  useEffect(() => {
    async function loadData() {
      try {
        const [bookingsRes, paymentsRes] = await Promise.all([
          fetch("/api/bookings"),
          fetch("/api/payments"),
        ]);
        if (bookingsRes.ok) {
          const bData = await bookingsRes.json();
          if (bData.bookings) setBookings(bData.bookings);
        }
        if (paymentsRes.ok) {
          const pData = await paymentsRes.json();
          if (pData.payments) setPayments(pData.payments);
        }
      } catch (err) {
        console.warn("Using local fallback data store:", err);
      }
    }
    loadData();
  }, []);

  // Handlers
  const handleBookingCreated = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    triggerToast(`Booking ${newBooking.bookingRef} registered successfully!`);
  };

  const handlePaymentRecorded = (newPayment: PaymentRecord) => {
    setPayments((prev) => [newPayment, ...prev]);

    // Update corresponding booking state
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === newPayment.bookingId || b.bookingRef === newPayment.bookingRef) {
          const newAdvance = (b.advancePaid || 0) + newPayment.amount;
          const newBalance = Math.max(0, b.totalAmount - newAdvance);
          return {
            ...b,
            advancePaid: newAdvance,
            balanceDue: newBalance,
            status: "CONFIRMED",
          };
        }
        return b;
      })
    );

    triggerToast(
      `Verified PKR ${newPayment.amount.toLocaleString()} credited to ${newPayment.bookingRef} via Gemini OCR!`
    );
  };

  const handleMessageSent = (newLog: WhatsAppMessage) => {
    setWhatsappLogs((prev) => [newLog, ...prev]);
    triggerToast(`WhatsApp message dispatched to ${newLog.recipientPhone}`);
  };

  const handleOpenBookingVoucher = (booking: Booking) => {
    setSelectedVoucherBooking(booking);
  };

  const handleSendWhatsAppAlert = (booking: Booking, templateName?: string) => {
    setActiveTab("whatsapp");
    triggerToast(`Ready to dispatch WhatsApp template to ${booking.customerName}`);
  };

  const handleSelectMenuForBooking = (menuId: string) => {
    setIsCreateBookingOpen(true);
  };

  const pendingOcrCount = bookings.filter((b) => b.status === "PROVISIONAL").length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center space-x-3 text-xs sm:text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Executive Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewBooking={() => setIsCreateBookingOpen(true)}
        pendingOcrCount={pendingOcrCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && (
          <DashboardOverview
            bookings={bookings}
            halls={halls}
            payments={payments}
            onNavigateToTab={setActiveTab}
            onOpenBookingVoucher={handleOpenBookingVoucher}
            onOpenNewBooking={() => setIsCreateBookingOpen(true)}
          />
        )}

        {activeTab === "slots" && (
          <SlotBookingManager
            bookings={bookings}
            halls={halls}
            menus={menus}
            onBookingCreated={handleBookingCreated}
            onOpenBookingVoucher={handleOpenBookingVoucher}
            isCreateModalOpen={isCreateBookingOpen}
            setIsCreateModalOpen={setIsCreateBookingOpen}
          />
        )}

        {activeTab === "ocr-hub" && (
          <AiReceiptVerificationHub
            bookings={bookings}
            payments={payments}
            onPaymentRecorded={handlePaymentRecorded}
            onOpenBookingVoucher={handleOpenBookingVoucher}
            onSendWhatsAppAlert={handleSendWhatsAppAlert}
          />
        )}

        {activeTab === "whatsapp" && (
          <WhatsAppControlCenter
            bookings={bookings}
            logs={whatsappLogs}
            onMessageSent={handleMessageSent}
          />
        )}

        {activeTab === "catering" && (
          <MenuCostEstimator
            menus={menus}
            onSelectMenuForBooking={handleSelectMenuForBooking}
          />
        )}

        {activeTab === "vouchers" && (
          <ContractsAndInvoices
            bookings={bookings}
            halls={halls}
            onOpenBookingVoucher={handleOpenBookingVoucher}
            onSendWhatsApp={(b) => handleSendWhatsAppAlert(b)}
          />
        )}
      </main>

      {/* Modal: Signed Voucher & Official Tax Invoice */}
      {selectedVoucherBooking && (
        <SignedVoucherModal
          booking={selectedVoucherBooking}
          hall={halls.find((h) => h.id === selectedVoucherBooking.hallId)}
          menu={menus.find((m) => m.id === selectedVoucherBooking.cateringMenuId)}
          onClose={() => setSelectedVoucherBooking(null)}
          onSendWhatsApp={(b) => {
            setSelectedVoucherBooking(null);
            handleSendWhatsAppAlert(b);
          }}
        />
      )}

      {/* Executive Footer */}
      <footer className="no-print bg-white border-t border-slate-200 py-8 mt-12 text-xs text-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-serif font-bold text-sm">
              M
            </div>
            <div>
              <div className="font-bold text-slate-900">
                Montage Event Complex Private Limited
              </div>
              <div className="text-slate-700 font-medium">
                Plot 1-4, Executive Block, Main Gulberg Expressway, Gulberg Greens, Islamabad
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-700 font-medium">
            <span>NTN: 8294102-4</span>
            <span>PRA Sales Tax: PRA-32778761101</span>
            <span>Tel: +92 51 591 0000</span>
            <span>accounts@montage-marquee.pk</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
