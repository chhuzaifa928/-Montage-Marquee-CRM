"use client";

import React from "react";
import {
  TrendingUp,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Users,
  Building2,
  Zap,
  ArrowRight,
  ShieldCheck,
  Receipt,
  FileText,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Booking, Hall, PaymentRecord } from "@/db/seedData";

interface DashboardOverviewProps {
  bookings: Booking[];
  halls: Hall[];
  payments: PaymentRecord[];
  onNavigateToTab: (tab: string) => void;
  onOpenBookingVoucher: (booking: Booking) => void;
  onOpenNewBooking: () => void;
}

export function DashboardOverview({
  bookings,
  halls,
  payments,
  onNavigateToTab,
  onOpenBookingVoucher,
  onOpenNewBooking,
}: DashboardOverviewProps) {
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const advanceCollected = bookings.reduce((sum, b) => sum + (b.advancePaid || 0), 0);
  const balanceOutstanding = bookings.reduce((sum, b) => sum + (b.balanceDue || 0), 0);
  const confirmedCount = bookings.filter((b) => b.status === "CONFIRMED").length;
  const provisionalBookings = bookings.filter((b) => b.status === "PROVISIONAL");

  const formatPkr = (num: number) => {
    return "PKR " + num.toLocaleString("en-PK");
  };

  return (
    <div className="space-y-8">
      {/* Executive Welcome & Venue Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-slate-700/50">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Building2 className="w-80 h-80 text-amber-400" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>Montage Executive Operations Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
            Montage Event Complex
          </h1>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            Main Gulberg Expressway, Executive Block, Islamabad. Operations command center for automated booking slot allocation, Gemini 2.5 Flash bank receipt OCR, and Meta WhatsApp Business Cloud API v21.0 dispatch.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={onOpenNewBooking}
              className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>+ Create Booking</span>
            </button>
            <button
              onClick={() => onNavigateToTab("ocr-hub")}
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium px-4 py-2.5 rounded-xl text-sm transition-all active:scale-95 cursor-pointer"
            >
              <Receipt className="w-4 h-4 text-amber-400" />
              <span>Verify Receipt (Gemini OCR)</span>
            </button>
            <button
              onClick={() => onNavigateToTab("whatsapp")}
              className="inline-flex items-center space-x-2 bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 font-medium px-4 py-2.5 rounded-xl text-sm transition-all active:scale-95 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Cloud API Hub</span>
            </button>
          </div>
        </div>
      </div>

      {/* Provisional Booking Verification Alert */}
      {provisionalBookings.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-700 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                Action Required: {provisionalBookings.length} Provisional Booking Awaiting Payment Audit
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                {provisionalBookings[0].customerName} ({provisionalBookings[0].eventType} on{" "}
                {provisionalBookings[0].eventDate}) has submitted a bank advance slip. Run Gemini Vision OCR to verify and confirm.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToTab("ocr-hub")}
            className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
          >
            <span>Audit Advance Slip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Primary Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total B2B Pipeline */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Total Booking Value
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              {formatPkr(totalRevenue)}
            </div>
            <p className="text-xs text-slate-700 mt-1 flex items-center space-x-1 font-medium">
              <span className="text-emerald-700 font-semibold">16% PRA Tax Included</span>
              <span>• {bookings.length} reservations</span>
            </p>
          </div>
        </div>

        {/* Verified Advance Collected */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Audited Advance
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-emerald-800 tracking-tight">
              {formatPkr(advanceCollected)}
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-1.5 rounded-full"
                style={{
                  width: `${Math.min(100, Math.round((advanceCollected / totalRevenue) * 100))}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-slate-700 mt-1.5 font-medium">
              {Math.round((advanceCollected / totalRevenue) * 100)}% of total pipeline received
            </p>
          </div>
        </div>

        {/* Outstanding Receivables */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Receivable Balance
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-amber-800 tracking-tight">
              {formatPkr(balanceOutstanding)}
            </div>
            <p className="text-xs text-slate-700 mt-1 font-medium">
              Settlement scheduled 48h prior to event
            </p>
          </div>
        </div>

        {/* Confirmed Bookings & Guest Footprint */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Confirmed Guests
            </span>
            <div className="p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              {bookings.reduce((sum, b) => sum + (b.guestCount || 0), 0).toLocaleString()}
            </div>
            <p className="text-xs text-slate-700 mt-1 font-medium">
              Across {confirmedCount} confirmed banquets
            </p>
          </div>
        </div>
      </div>

      {/* Hall Status & Operational Health Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Venue Halls &amp; Power Readiness
            </h3>
            <p className="text-xs text-slate-700 font-medium">
              Real-time capacity, pricing, and infrastructure at Gulberg Expressway complex
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab("slots")}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center space-x-1 cursor-pointer"
          >
            <span>View Slot Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {halls.map((hall) => {
            const hallBookings = bookings.filter((b) => b.hallId === hall.id);
            return (
              <div
                key={hall.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="p-4 border-b border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>Operational</span>
                    </span>
                    <span className="text-xs text-slate-700 font-medium">{hall.dimensionSqFt.toLocaleString()} sq ft</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{hall.name}</h4>
                  <p className="text-xs text-slate-700 mt-1 line-clamp-2 font-medium">{hall.tagline}</p>
                </div>

                <div className="p-4 bg-slate-50/70 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-700">
                    <span>Guest Capacity:</span>
                    <span className="font-semibold text-slate-900">
                      {hall.capacityMin} – {hall.capacityMax}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Base Rent (Dinner):</span>
                    <span className="font-semibold text-amber-800">
                      PKR {hall.baseRentDinner.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Active Bookings:</span>
                    <span className="font-bold text-slate-900">
                      {hallBookings.length}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center text-xs text-slate-700 space-x-1 font-medium">
                    <Zap className="w-3.5 h-3.5 text-amber-700" />
                    <span>500kVA Cat Genset Backup</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Active Booking Ledger
            </h3>
            <p className="text-xs text-slate-700 font-medium">
              Verified contracts with automated Pakistani bank receipt OCR tracking
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigateToTab("slots")}
              className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Full Slot Calendar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50/80 text-slate-700 border-b border-slate-200 text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Client &amp; Contact</th>
                <th className="py-3 px-4">Event &amp; Venue</th>
                <th className="py-3 px-4">Date &amp; Slot</th>
                <th className="py-3 px-4">Guests</th>
                <th className="py-3 px-4">Total (PKR)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Contract Voucher</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {bookings.map((booking) => {
                const hall = halls.find((h) => h.id === booking.hallId);
                const isConfirmed = booking.status === "CONFIRMED";

                return (
                  <tr key={booking.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                      {booking.bookingRef}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{booking.customerName}</div>
                      <div className="text-xs text-slate-700 font-mono font-medium">{booking.customerPhone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-900">{booking.eventType}</div>
                      <div className="text-xs text-slate-700 font-medium">{hall?.name || "Montage Hall"}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-700" />
                        <span>{booking.eventDate}</span>
                      </div>
                      <div className="text-xs text-slate-700 line-clamp-1 font-medium">{booking.timeSlot}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      {booking.guestCount}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">
                        PKR {booking.totalAmount.toLocaleString()}
                      </div>
                      <div className="text-xs text-emerald-800 font-medium">
                        Adv: PKR {booking.advancePaid.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          isConfirmed
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onOpenBookingVoucher(booking)}
                        className="inline-flex items-center space-x-1 bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border border-slate-200"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-700" />
                        <span>Voucher</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
