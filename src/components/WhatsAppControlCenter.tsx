"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  RefreshCw,
  Bell,
  CheckCheck,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { Booking, WhatsAppMessage } from "@/db/seedData";
import { renderTemplateText } from "@/lib/whatsapp";

interface WhatsAppControlCenterProps {
  bookings: Booking[];
  logs: WhatsAppMessage[];
  onMessageSent: (log: WhatsAppMessage) => void;
}

export function WhatsAppControlCenter({
  bookings,
  logs,
  onMessageSent,
}: WhatsAppControlCenterProps) {
  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    bookings[0]?.id || ""
  );
  const [selectedTemplate, setSelectedTemplate] = useState<
    | "montage_booking_confirmation"
    | "montage_payment_receipt_verified"
    | "montage_event_reminder"
    | "montage_invoice_pdf_dispatch"
  >("montage_booking_confirmation");
  const [customPhone, setCustomPhone] = useState<string>("");
  const [isSending, setIsSending] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState<string>("");

  const activeBooking =
    bookings.find((b) => b.id === selectedBookingId) || bookings[0];

  const recipientPhone = customPhone || activeBooking?.customerPhone || "+92 300 8554921";
  const recipientName = activeBooking?.customerName || "Malik Tariq Javed";

  // Template parameters
  const templateParams: Record<string, string | number> = {
    customerName: recipientName,
    bookingRef: activeBooking?.bookingRef || "MEC-2026-0814",
    eventDate: activeBooking?.eventDate || "18-Oct-2026",
    timeSlot: activeBooking?.timeSlot || "Dinner / Night",
    hallName:
      activeBooking?.hallId === "hall-royal-imperial"
        ? "The Royal Imperial Hall"
        : "The Grand Marquee",
    guestCount: activeBooking?.guestCount || 750,
    totalAmount: activeBooking?.totalAmount || 4918400,
    advancePaid: activeBooking?.advancePaid || 2000000,
    balanceDue: activeBooking?.balanceDue || 2918400,
    bankName: "Meezan Bank Limited",
    transactionRef: "MZ-260920-881920",
    amount: 2000000,
    eventType: activeBooking?.eventType || "Barat",
    menuName: "Royal Mughal Darbar Feast",
    contractUrl: `https://montage-marquee.pk/voucher/${activeBooking?.bookingRef || "MEC-2026-0814"}`,
    invoiceUrl: `https://montage-marquee.pk/api/invoice/${activeBooking?.bookingRef || "MEC-2026-0814"}`,
  };

  const previewBody = renderTemplateText(selectedTemplate, templateParams);

  const handleSendWhatsApp = async () => {
    setIsSending(true);
    setStatusFeedback("");
    try {
      const res = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipientPhone,
          recipientName,
          templateName: selectedTemplate,
          parameters: templateParams,
          bookingId: activeBooking?.id,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to dispatch WhatsApp message");
      }

      const newLogItem: WhatsAppMessage = {
        id: `WA-${Date.now().toString().slice(-6)}`,
        bookingId: activeBooking?.id || "MEC-GENERAL",
        recipientPhone,
        recipientName,
        templateName: selectedTemplate,
        messageBody: data.result.renderedText,
        status: data.result.status || "SENT",
        metaMessageId: data.result.messageId,
        sentAt: new Date().toISOString(),
      };

      onMessageSent(newLogItem);
      setStatusFeedback(
        `Dispatched successfully via ${data.result.mode === "LIVE_META_API" ? "Official Meta Graph API v21.0" : "Montage WhatsApp Sandbox"}. Message ID: ${data.result.messageId}`
      );
    } catch (err) {
      alert("Error dispatching WhatsApp message: " + String(err));
    } finally {
      setIsSending(false);
    }
  };

  const copyVerifyToken = () => {
    navigator.clipboard.writeText("montage_islamabad_webhook_secret_2026");
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 rounded-2xl p-6 sm:p-7 text-white border border-emerald-800/40 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Meta WhatsApp Business Cloud API (Graph API v21.0)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Customer WhatsApp Automation Suite
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Automated Pakistani mobile delivery for instant reservation vouchers, Gemini-verified payment receipts, and 48-hour event protocol reminders with live delivery receipts.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 p-3 rounded-xl">
            <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">Meta Webhook Active</div>
              <div className="text-emerald-400">Hub Challenge Verified (200 OK)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Meta Webhook Endpoint Credentials Bar */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-bold text-slate-900 block">
            Meta Graph API v21.0 Webhook Callback URL:
          </span>
          <code className="text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-0.5 block">
            https://montage-marquee.pk/api/whatsapp/webhook
          </code>
        </div>

        <div className="flex items-center space-x-3">
          <div>
            <span className="font-bold text-slate-900 block">Verify Token:</span>
            <code className="text-slate-800 font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-300 mt-0.5 block">
              montage_islamabad_webhook_secret_2026
            </code>
          </div>
          <button
            onClick={copyVerifyToken}
            className="mt-4 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
            title="Copy Verify Token"
          >
            {copiedToken ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Dispatcher Controls on Left, Smartphone Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Dispatcher Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">
              Outbound Template Dispatcher
            </h3>
            <p className="text-xs text-slate-700 font-medium">
              Select an active booking and standardized WhatsApp Business template
            </p>
          </div>

          {statusFeedback && (
            <div className="bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-200 text-xs font-semibold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusFeedback}</span>
            </div>
          )}

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Target Booking Ledger
              </label>
              <select
                value={selectedBookingId}
                onChange={(e) => setSelectedBookingId(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {bookings.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.bookingRef} — {b.customerName} ({b.eventType} on {b.eventDate})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                WhatsApp Template Message Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    id: "montage_booking_confirmation",
                    label: "Booking Confirmation",
                    desc: "Official confirmation with hall & advance receipt",
                  },
                  {
                    id: "montage_payment_receipt_verified",
                    label: "Payment OCR Verified",
                    desc: "Gemini AI audited bank slip acknowledgment",
                  },
                  {
                    id: "montage_event_reminder",
                    label: "48-Hour Event Reminder",
                    desc: "Headcount lock, timing & valet coordination",
                  },
                  {
                    id: "montage_invoice_pdf_dispatch",
                    label: "Tax Invoice PDF Link",
                    desc: "PRA & FBR registered digital voucher link",
                  },
                ].map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setSelectedTemplate(tpl.id as typeof selectedTemplate)}
                    className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                      selectedTemplate === tpl.id
                        ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div className="font-bold text-slate-900">{tpl.label}</div>
                    <div className="text-slate-700 text-xs mt-0.5 font-medium">{tpl.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Recipient Mobile Phone
                </label>
                <input
                  type="text"
                  value={recipientPhone}
                  onChange={(e) => setCustomPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  disabled
                  value={recipientName}
                  className="w-full text-xs sm:text-sm bg-slate-100 border border-slate-300 rounded-lg p-2.5 text-slate-800 font-semibold"
                />
              </div>
            </div>

            <button
              onClick={handleSendWhatsApp}
              disabled={isSending}
              className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Dispatching to Meta Cloud API...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send WhatsApp Message to {recipientPhone}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Smartphone WhatsApp UI Preview */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col items-center">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>Interactive Device Preview (Recipient Screen)</span>
          </div>

          {/* Smartphone Frame */}
          <div className="w-full max-w-[340px] bg-slate-900 rounded-[36px] p-3 shadow-2xl border-4 border-slate-800">
            {/* Top Speaker & Camera Notch */}
            <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900"></div>
            </div>

            {/* WhatsApp App Screen */}
            <div className="bg-[#e5ddd5] rounded-[26px] overflow-hidden min-h-[480px] flex flex-col justify-between text-xs">
              {/* WhatsApp App Bar */}
              <div className="bg-[#075e54] text-white p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white font-serif font-bold text-sm shadow-xs">
                    M
                  </div>
                  <div>
                    <div className="font-bold text-sm flex items-center space-x-1">
                      <span>Montage Event Complex</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center text-[9px] font-bold">
                        ✓
                      </span>
                    </div>
                    <div className="text-[10px] text-emerald-100">Official Business Account</div>
                  </div>
                </div>
              </div>

              {/* Chat Canvas */}
              <div className="p-3 space-y-3 overflow-y-auto flex-1">
                {/* Date Stamp */}
                <div className="text-center">
                  <span className="bg-white/80 text-slate-600 text-[10px] px-2.5 py-0.5 rounded-md shadow-2xs font-medium">
                    TODAY
                  </span>
                </div>

                {/* WhatsApp Message Bubble */}
                <div className="bg-white rounded-lg p-3 shadow-xs border border-black/5 max-w-[95%] ml-auto relative text-slate-900 text-xs leading-relaxed space-y-1">
                  <div className="whitespace-pre-line break-words font-sans">
                    {previewBody}
                  </div>
                  <div className="flex items-center justify-end space-x-1 text-[10px] text-slate-500 pt-1">
                    <span>10:32 PM</span>
                    <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Fake WhatsApp Message Input */}
              <div className="bg-[#f0f0f0] p-2 flex items-center space-x-2 border-t border-slate-300">
                <div className="bg-white rounded-full px-3 py-1.5 flex-1 text-slate-500 text-[11px]">
                  Message Montage Event Complex...
                </div>
                <div className="w-7 h-7 rounded-full bg-[#075e54] text-white flex items-center justify-center">
                  <Send className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live WhatsApp Logs History */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900">
            WhatsApp Delivery Ledger &amp; Meta Message IDs
          </h3>
          <p className="text-xs text-slate-700 font-medium">
            Real-time webhook callback receipts from Meta Graph API v21.0
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Meta Message ID</th>
                <th className="py-3 px-4">Recipient</th>
                <th className="py-3 px-4">Template</th>
                <th className="py-3 px-4">Delivery Status</th>
                <th className="py-3 px-4">Timestamp (PKT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 text-xs max-w-xs truncate">
                    {log.metaMessageId}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{log.recipientName}</div>
                    <div className="text-xs text-slate-700 font-mono font-medium">{log.recipientPhone}</div>
                  </td>
                  <td className="py-3 px-4 font-medium text-amber-700 text-xs">
                    {log.templateName}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>{log.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">
                    {new Date(log.sentAt).toLocaleString("en-PK", {
                      timeZone: "Asia/Karachi",
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
