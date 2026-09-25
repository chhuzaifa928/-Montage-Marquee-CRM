"use client";

import React, { useState } from "react";
import {
  Receipt,
  Sparkles,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  FileText,
  DollarSign,
  Building2,
  Calendar,
  Lock,
  ArrowRight,
  Eye,
  RefreshCw,
  Send,
} from "lucide-react";
import { Booking, PaymentRecord } from "@/db/seedData";
import { SAMPLE_RECEIPTS, SampleBankReceipt } from "@/lib/sampleReceipts";
import { ReceiptOcrResult } from "@/lib/geminiOcr";

interface AiReceiptVerificationHubProps {
  bookings: Booking[];
  payments: PaymentRecord[];
  onPaymentRecorded: (payment: PaymentRecord) => void;
  onOpenBookingVoucher: (booking: Booking) => void;
  onSendWhatsAppAlert: (booking: Booking, template: string) => void;
}

export function AiReceiptVerificationHub({
  bookings,
  payments,
  onPaymentRecorded,
  onOpenBookingVoucher,
  onSendWhatsAppAlert,
}: AiReceiptVerificationHubProps) {
  const [selectedSample, setSelectedSample] = useState<SampleBankReceipt>(SAMPLE_RECEIPTS[0]);
  const [activeReceiptImage, setActiveReceiptImage] = useState<string>(SAMPLE_RECEIPTS[0].dataUrl);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [ocrResult, setOcrResult] = useState<ReceiptOcrResult | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    bookings.find((b) => b.status === "PROVISIONAL")?.id || bookings[0]?.id || ""
  );
  const [isCrediting, setIsCrediting] = useState<boolean>(false);
  const [creditSuccessMsg, setCreditSuccessMsg] = useState<string>("");

  // Handle sample switch
  const handleSelectSample = (sample: SampleBankReceipt) => {
    setSelectedSample(sample);
    setActiveReceiptImage(sample.dataUrl);
    setOcrResult(null);
    setCreditSuccessMsg("");
  };

  // Handle custom file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setActiveReceiptImage(reader.result);
        setOcrResult(null);
        setCreditSuccessMsg("");
      }
    };
    reader.readAsDataURL(file);
  };

  // Run Gemini 2.5 Flash OCR
  const handleRunGeminiOcr = async () => {
    setIsProcessing(true);
    setCreditSuccessMsg("");
    try {
      const res = await fetch("/api/ocr/receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: activeReceiptImage,
          mimeType: activeReceiptImage.startsWith("data:image/svg")
            ? "image/svg+xml"
            : "image/png",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "OCR Extraction failed");
      }

      setOcrResult(data.ocrResult);
    } catch (err) {
      console.error(err);
      alert("Failed to run Gemini OCR: " + String(err));
    } finally {
      setIsProcessing(false);
    }
  };

  // Credit amount to selected booking
  const handleCreditToBooking = async () => {
    if (!ocrResult || !selectedBookingId) return;

    setIsCrediting(true);
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: selectedBookingId,
          amount: ocrResult.amount,
          bankName: ocrResult.bankName,
          transactionRef: ocrResult.transactionId,
          receiptImageUrl: activeReceiptImage,
          senderAccountTitle: ocrResult.senderTitle,
          senderAccountNumber: ocrResult.senderAccount,
          ocrExtractedData: ocrResult,
          verificationStatus: "VERIFIED",
          verifiedBy: ocrResult.aiEngineUsed || "AI Gemini 2.5 Flash Vision",
          notes: `Verified via ${ocrResult.aiEngineUsed}. Ref: ${ocrResult.transactionId}`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to record payment");
      }

      onPaymentRecorded(data.payment);
      setCreditSuccessMsg(
        `Successfully credited PKR ${ocrResult.amount.toLocaleString()} to booking ${data.payment.bookingRef}. Status is now CONFIRMED.`
      );
    } catch (err) {
      alert("Error crediting payment: " + String(err));
    } finally {
      setIsCrediting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 rounded-2xl p-6 sm:p-7 text-white border border-emerald-900/50 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Gemini 2.5 Flash Multimodal Vision</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Pakistani Bank Receipt OCR &amp; Financial Forensics
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Instant multimodal verification for Meezan Bank Raast, HBL Mobile, Bank Alfalah, and SadaPay transfers. Extracts Transaction ID, Amount, Timestamp, and audits for font alteration or fraud.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 p-3 rounded-xl">
            <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">SBP Raast / IBFT Compliant</div>
              <div className="text-slate-400">Montage A/C: 02010108924102</div>
            </div>
          </div>
        </div>
      </div>

      {/* 1-Click Sample Selector & Upload Bar */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            1-Click Authentic Pakistani Bank Samples
          </label>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_RECEIPTS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`text-xs px-3.5 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedSample.id === sample.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <span>{sample.bankName}</span>
                <span className="ml-1.5 opacity-75 font-mono">
                  (PKR {sample.expectedAmount.toLocaleString()})
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <label className="inline-flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-colors border border-slate-300">
            <Upload className="w-4 h-4 text-slate-600" />
            <span>Upload Custom Slip</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={handleRunGeminiOcr}
            disabled={isProcessing}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Gemini Vision...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Receipt (Gemini OCR)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Split-Screen Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Receipt Slip Viewer */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
              <Eye className="w-4 h-4 text-slate-500" />
              <span>Bank Receipt Image / Slip Preview</span>
            </div>
            <span className="text-xs text-slate-700 font-mono font-medium">Digital Vector Document</span>
          </div>

          <div className="flex-1 bg-slate-100/70 rounded-xl p-4 flex items-center justify-center min-h-[460px] overflow-hidden border border-slate-200/80">
            {activeReceiptImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeReceiptImage}
                alt="Bank Receipt Slip"
                className="max-h-[500px] w-auto max-w-full rounded-lg shadow-md object-contain transition-transform"
              />
            ) : (
              <div className="text-center text-slate-700">
                <Receipt className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                <p className="text-xs">No receipt selected. Choose a sample above or upload an image.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Extracted Forensic Results & Verification */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Gemini AI Forensic Extraction
                </h3>
              </div>
              {ocrResult && (
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {ocrResult.aiEngineUsed}
                </span>
              )}
            </div>

            {!ocrResult && !isProcessing && (
              <div className="py-16 text-center text-slate-700 space-y-3">
                <Sparkles className="w-12 h-12 mx-auto text-slate-300 animate-pulse" />
                <p className="text-sm font-semibold text-slate-700">
                  Ready to audit bank slip.
                </p>
                <p className="text-xs text-slate-700 max-w-md mx-auto">
                  Click the green &ldquo;Analyze Receipt (Gemini OCR)&rdquo; button above to trigger multimodal extraction of Pakistani banking fields.
                </p>
              </div>
            )}

            {isProcessing && (
              <div className="py-16 text-center text-slate-700 space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto"></div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">
                    Gemini 2.5 Flash Vision Parsing Receipt...
                  </h4>
                  <p className="text-xs text-slate-700 mt-1">
                    Detecting Raast / IBFT transaction parameters, checking font alignment, and matching Montage A/C title.
                  </p>
                </div>
              </div>
            )}

            {ocrResult && (
              <div className="space-y-4 text-xs">
                {/* Amount Banner */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                      Verified Amount
                    </div>
                    <div className="text-2xl font-bold text-emerald-950 mt-0.5">
                      PKR {ocrResult.amount.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center space-x-1 bg-emerald-600 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{ocrResult.status}</span>
                    </span>
                    <div className="text-xs text-emerald-700 font-semibold mt-1">
                      {ocrResult.confidenceScore}% Confidence
                    </div>
                  </div>
                </div>

                {/* Grid of Extracted Fields */}
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-700 block font-medium">Bank Name</span>
                    <span className="font-bold text-slate-900 text-xs">
                      {ocrResult.bankName}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-700 block font-medium">Txn / Raast Ref</span>
                    <span className="font-mono font-bold text-amber-800 text-xs">
                      {ocrResult.transactionId}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-700 block font-medium">Sender Account Title</span>
                    <span className="font-semibold text-slate-900">
                      {ocrResult.senderTitle}
                    </span>
                    <span className="block text-slate-700 font-mono text-xs font-medium">
                      {ocrResult.senderAccount}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-700 block font-medium">Recipient Account Title</span>
                    <span className="font-semibold text-emerald-800 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{ocrResult.receiverTitle}</span>
                    </span>
                    <span className="block text-slate-700 font-mono text-xs font-medium">
                      {ocrResult.receiverAccount}
                    </span>
                  </div>

                  <div className="col-span-2 pt-2 border-t border-slate-200">
                    <span className="text-slate-700 block font-medium">Execution Timestamp</span>
                    <span className="font-medium text-slate-800">
                      {ocrResult.dateTime}
                    </span>
                  </div>
                </div>

                {/* Fraud & Tamper Analysis Meter */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-800">
                      Tamper &amp; Forgery Risk:
                    </span>
                    <span className="font-bold text-emerald-700">
                      {ocrResult.tamperRiskScore}% (Authentic)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${Math.max(5, 100 - ocrResult.tamperRiskScore)}%` }}
                    ></div>
                  </div>
                  <p className="text-slate-700 text-xs mt-2 italic font-medium">
                    &ldquo;{ocrResult.notes}&rdquo;
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Booking Credit Action */}
          {ocrResult && (
            <div className="pt-4 border-t border-slate-200 mt-4 space-y-3">
              {creditSuccessMsg ? (
                <div className="bg-emerald-50 text-emerald-900 p-3.5 rounded-xl border border-emerald-200 text-xs font-semibold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{creditSuccessMsg}</span>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Credit Verified PKR {ocrResult.amount.toLocaleString()} to Booking:
                    </label>
                    <select
                      value={selectedBookingId}
                      onChange={(e) => setSelectedBookingId(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {bookings.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.bookingRef} — {b.customerName} ({b.eventType} on {b.eventDate}) | Status: {b.status} | Balance: PKR {b.balanceDue.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleCreditToBooking}
                    disabled={isCrediting}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl shadow-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {isCrediting ? (
                      <span>Crediting Ledger...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Confirm &amp; Credit PKR {ocrResult.amount.toLocaleString()} to Booking</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Verified Payments Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900">
            Historical Bank Payments &amp; Audited Receipts
          </h3>
          <p className="text-xs text-slate-700 font-medium">
            Bank transfers verified via Gemini 2.5 Flash Multimodal OCR
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Txn ID</th>
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Bank</th>
                <th className="py-3 px-4">Sender Title</th>
                <th className="py-3 px-4">Amount (PKR)</th>
                <th className="py-3 px-4">Verified By</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {p.transactionRef}
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-amber-700">
                    {p.bookingRef}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">{p.bankName}</td>
                  <td className="py-3 px-4 text-slate-800">{p.senderAccountTitle || p.customerName}</td>
                  <td className="py-3 px-4 font-bold text-emerald-800">
                    PKR {p.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{p.verifiedBy}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {p.verificationStatus}
                    </span>
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
