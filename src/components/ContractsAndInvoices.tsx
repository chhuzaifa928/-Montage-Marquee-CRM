"use client";

import React, { useState } from "react";
import {
  FileText,
  Printer,
  Share2,
  Download,
  Building2,
  Calendar,
  CheckCircle2,
  Search,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { Booking, Hall } from "@/db/seedData";

interface ContractsAndInvoicesProps {
  bookings: Booking[];
  halls: Hall[];
  onOpenBookingVoucher: (booking: Booking) => void;
  onSendWhatsApp: (booking: Booking) => void;
}

export function ContractsAndInvoices({
  bookings,
  halls,
  onOpenBookingVoucher,
  onSendWhatsApp,
}: ContractsAndInvoicesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = bookings.filter((b) => {
    if (statusFilter !== "ALL" && b.status !== statusFilter) return false;
    if (
      searchTerm &&
      !b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !b.bookingRef.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !b.customerPhone.includes(searchTerm)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-7 text-white border border-slate-700/50 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Signed Legal Vouchers &amp; FBR / PRA Tax Invoices</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Executive Contract Repository
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              FBR NTN: 8294102-4 &amp; PRA registered computerized vouchers with verified advance receipts, hall allocations, and legal terms.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 p-3 rounded-xl">
            <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">Digital Seal Active</div>
              <div className="text-slate-400">PRA Sales Tax 16% Compliant</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by client name, booking ref, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs font-semibold text-slate-700">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="PROVISIONAL">PROVISIONAL</option>
          </select>
        </div>
      </div>

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((b) => {
          const hall = halls.find((h) => h.id === b.hallId);
          const isConfirmed = b.status === "CONFIRMED";

          return (
            <div
              key={b.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {b.bookingRef}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      isConfirmed
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-base">{b.customerName}</h4>
                <p className="text-xs text-slate-700 font-medium mt-0.5">
                  {b.eventType} • {hall?.name}
                </p>

                <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1 font-medium">
                  <div className="flex justify-between text-slate-700">
                    <span>Event Date:</span>
                    <span className="font-bold text-slate-900">{b.eventDate}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Total Amount:</span>
                    <span className="font-bold text-slate-900">
                      PKR {b.totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Advance Received:</span>
                    <span className="font-bold text-emerald-800">
                      PKR {b.advancePaid.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Balance Due:</span>
                    <span className="font-bold text-amber-800">
                      PKR {b.balanceDue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
                <button
                  onClick={() => onOpenBookingVoucher(b)}
                  className="flex-1 inline-flex items-center justify-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>View Voucher</span>
                </button>

                <button
                  onClick={() => onSendWhatsApp(b)}
                  className="inline-flex items-center justify-center p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer border border-emerald-200"
                  title="Share via WhatsApp"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
