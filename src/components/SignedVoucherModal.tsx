"use client";

import React, { useRef } from "react";
import {
  X,
  Printer,
  Share2,
  Download,
  Building2,
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  FileText,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Booking, Hall, CateringMenu } from "@/db/seedData";

interface SignedVoucherModalProps {
  booking: Booking | null;
  hall: Hall | undefined;
  menu: CateringMenu | undefined;
  onClose: () => void;
  onSendWhatsApp: (booking: Booking) => void;
}

export function SignedVoucherModal({
  booking,
  hall,
  menu,
  onClose,
  onSendWhatsApp,
}: SignedVoucherModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 my-4 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Controls Toolbar (Hidden in Print) */}
        <div className="no-print bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">
              Official Tax Invoice &amp; Signed Booking Contract ({booking.bookingRef})
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print A4 Voucher</span>
            </button>

            <button
              onClick={() => onSendWhatsApp(booking)}
              className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Send via WhatsApp</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Voucher Document */}
        <div
          ref={printRef}
          className="printable-voucher p-6 sm:p-10 bg-white overflow-y-auto text-slate-900 font-sans space-y-6 flex-1"
        >
          {/* Document Header & Montage Official Crest */}
          <div className="border-b-2 border-amber-600/60 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-serif text-3xl font-bold border-2 border-amber-400 shadow-md">
                M
              </div>
              <div>
                <h1 className="text-2xl font-serif font-black tracking-tight text-slate-900 uppercase">
                  Montage Event Complex
                </h1>
                <p className="text-xs text-amber-700 font-bold uppercase tracking-wider">
                  Executive Block • Main Gulberg Expressway • Islamabad
                </p>
                <div className="text-[11px] text-slate-700 mt-1 space-y-0.5 font-medium">
                  <p>NTN: 8294102-4 | PRA Sales Tax Reg: PRA-32778761101 | FBR ICT: 992140</p>
                  <p>Tel: +92 51 591 0000 | Email: accounts@montage-marquee.pk</p>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-xs font-bold text-slate-700 uppercase">Booking Contract Ref</div>
              <div className="text-base font-bold font-mono text-amber-700">
                {booking.bookingRef}
              </div>
              <div className="text-[11px] text-slate-700 mt-1 font-medium">
                Issue Date: {new Date().toLocaleDateString("en-PK", { dateStyle: "long" })}
              </div>
              <div className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                Status: {booking.status}
              </div>
            </div>
          </div>

          {/* Client & Event Specs Two-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Client Record */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Client / Host Credentials
              </span>
              <div className="font-bold text-sm text-slate-900">{booking.customerName}</div>
              <div className="text-slate-700 font-mono font-medium">CNIC: {booking.customerCnic}</div>
              <div className="text-slate-700 font-mono font-medium">Phone: {booking.customerPhone}</div>
              {booking.customerEmail && (
                <div className="text-slate-700 font-medium">Email: {booking.customerEmail}</div>
              )}
            </div>

            {/* Event Allocation */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Venue &amp; Schedule Allocation
              </span>
              <div className="font-bold text-sm text-slate-900">
                {hall?.name || "Montage Grand Hall"}
              </div>
              <div className="text-slate-700 font-medium">
                <span className="font-semibold text-slate-800">Date:</span> {booking.eventDate} ({booking.eventType})
              </div>
              <div className="text-slate-700 font-medium">
                <span className="font-semibold text-slate-800">Slot:</span> {booking.timeSlot}
              </div>
              <div className="text-slate-700 font-medium">
                <span className="font-semibold text-slate-800">Headcount:</span> {booking.guestCount} Guaranteed Guests
              </div>
            </div>
          </div>

          {/* Itemized Financial Ledger Table */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Itemized Financial Breakdown &amp; Tax Statement
            </div>
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Description / Line Item</th>
                  <th className="py-2.5 px-3 text-center">Unit / Headcount</th>
                  <th className="py-2.5 px-3 text-right">Rate (PKR)</th>
                  <th className="py-2.5 px-3 text-right">Total Amount (PKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-slate-900">Hall Rental &amp; Infrastructure</span>
                    <span className="block text-[11px] text-slate-700">
                      Includes 500kVA dual Cat generator backup, central HVAC, VIP bridal suite &amp; valet.
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">1 Event Slot</td>
                  <td className="py-2.5 px-3 text-right">{booking.hallRent.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-medium">{booking.hallRent.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-slate-900">
                      Catering: {menu?.name || "Signature Menu"}
                    </span>
                    <span className="block text-[11px] text-slate-700">
                      Multi-course imperial buffet with mutton, chicken biryani, fresh naan &amp; Kashmiri chai.
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">{booking.guestCount} Persons</td>
                  <td className="py-2.5 px-3 text-right">
                    {(menu?.pricePerHead || 4200).toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-medium">{booking.foodCost.toLocaleString()}</td>
                </tr>
                {booking.decorCost > 0 && (
                  <tr>
                    <td className="py-2.5 px-3">
                      <span className="font-semibold text-slate-900">Thematic Stage &amp; Floral Decor</span>
                      <span className="block text-[11px] text-slate-700">{booking.decorPackage}</span>
                    </td>
                    <td className="py-2.5 px-3 text-center">Custom Setup</td>
                    <td className="py-2.5 px-3 text-right">{booking.decorCost.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-medium">{booking.decorCost.toLocaleString()}</td>
                  </tr>
                )}
                {booking.soundAndAvCost > 0 && (
                  <tr>
                    <td className="py-2.5 px-3">
                      <span className="font-semibold text-slate-900">Audio-Visual &amp; Robotic Lighting Truss</span>
                      <span className="block text-[11px] text-slate-700">Line-array speakers, P2.5 LED screen, Shure wireless microphones.</span>
                    </td>
                    <td className="py-2.5 px-3 text-center">Package</td>
                    <td className="py-2.5 px-3 text-right">{booking.soundAndAvCost.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-medium">{booking.soundAndAvCost.toLocaleString()}</td>
                  </tr>
                )}
                <tr className="bg-slate-50 font-medium">
                  <td colSpan={3} className="py-2 px-3 text-right text-slate-700">
                    Subtotal (Excluding PRA Sales Tax):
                  </td>
                  <td className="py-2 px-3 text-right text-slate-900">
                    PKR {booking.subtotal.toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-slate-50 font-medium">
                  <td colSpan={3} className="py-2 px-3 text-right text-slate-700">
                    16% PRA Sales Tax (Punjab / ICT Service Tax Ordinance):
                  </td>
                  <td className="py-2 px-3 text-right text-slate-900">
                    PKR {booking.taxAmount.toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-amber-50/60 font-bold text-sm">
                  <td colSpan={3} className="py-2.5 px-3 text-right text-amber-900">
                    Grand Total Contract Value:
                  </td>
                  <td className="py-2.5 px-3 text-right text-amber-900">
                    PKR {booking.totalAmount.toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-emerald-50/70 font-semibold text-xs text-emerald-900">
                  <td colSpan={3} className="py-2 px-3 text-right">
                    Verified Advance Received:
                  </td>
                  <td className="py-2 px-3 text-right">
                    - PKR {booking.advancePaid.toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-slate-100 font-bold text-sm text-slate-900">
                  <td colSpan={3} className="py-2.5 px-3 text-right">
                    Outstanding Balance Due on Event Day:
                  </td>
                  <td className="py-2.5 px-3 text-right text-amber-800">
                    PKR {booking.balanceDue.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Montage Official Bank Account Details */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Authorized Settlement Bank Account (Meezan Bank Limited)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 font-medium">
              <div>
                Account Title: <span className="font-bold text-slate-900">Montage Event Complex Pvt Ltd</span>
              </div>
              <div>
                Account Number: <span className="font-mono font-bold text-slate-900">0201-0108924102</span>
              </div>
              <div>
                Branch: <span className="font-semibold text-slate-900">Gulberg Greens Branch, Islamabad</span>
              </div>
              <div>
                IBAN: <span className="font-mono font-bold text-slate-900">PK26MEZN0002010108924102</span>
              </div>
            </div>
          </div>

          {/* Legal Terms & Authorized Digital Seal */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-end gap-6 text-[11px] text-slate-700">
            <div className="max-w-md space-y-1 font-medium">
              <p className="font-bold text-slate-900 uppercase">Executive Terms &amp; Compliance:</p>
              <p>• In accordance with Islamabad Administration guidelines, sound output terminates at 11:30 PM.</p>
              <p>• Fireworks and aerial firing are strictly prohibited on the complex premises.</p>
              <p>• Final guest headcount and menu changes must be locked at least 72 hours prior to the event.</p>
            </div>

            {/* Official Digital Seal */}
            <div className="text-center sm:text-right flex flex-col items-center sm:items-end">
              <div className="w-24 h-24 rounded-full border-2 border-amber-600/60 p-1 flex items-center justify-center relative mb-1">
                <div className="w-full h-full rounded-full border border-dashed border-amber-600 flex flex-col items-center justify-center text-[8px] font-bold text-amber-800 uppercase tracking-tighter text-center">
                  <span>MONTAGE</span>
                  <span className="text-[10px]">★ ★ ★</span>
                  <span>ISLAMABAD</span>
                  <span>VERIFIED</span>
                </div>
              </div>
              <div className="text-xs font-bold text-slate-900">
                Director of Operations
              </div>
              <div className="text-[10px] text-slate-700 font-medium">Montage Event Complex Pvt Ltd</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
