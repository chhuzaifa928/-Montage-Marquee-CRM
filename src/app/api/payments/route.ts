import { NextResponse } from "next/server";
import { MontageDataStore } from "@/lib/dataStore";

export async function GET() {
  try {
    const payments = MontageDataStore.getPayments();
    return NextResponse.json({
      success: true,
      payments,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch payments: " + String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      bookingId,
      amount,
      bankName,
      transactionRef,
      receiptImageUrl = "",
      senderAccountTitle = "",
      senderAccountNumber = "",
      recipientAccount = "Montage Event Complex - Meezan A/C 02010108924102",
      ocrExtractedData,
      verificationStatus = "VERIFIED",
      verifiedBy = "AI Gemini 2.5 Flash",
      notes = "",
    } = body;

    if (!bookingId || !amount || !bankName || !transactionRef) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (bookingId, amount, bankName, transactionRef)" },
        { status: 400 }
      );
    }

    const booking = MontageDataStore.getBookingById(bookingId);
    if (!booking) {
      return NextResponse.json(
        { success: false, error: `Booking ${bookingId} not found` },
        { status: 404 }
      );
    }

    const payment = MontageDataStore.createPayment({
      bookingId: booking.id,
      bookingRef: booking.bookingRef,
      customerName: booking.customerName,
      amount: Number(amount),
      bankName,
      transactionRef,
      receiptImageUrl,
      senderAccountTitle,
      senderAccountNumber,
      recipientAccount,
      ocrExtractedData,
      verificationStatus,
      verifiedBy,
      verifiedAt: new Date().toISOString(),
      notes,
    });

    return NextResponse.json({
      success: true,
      payment,
      updatedBooking: MontageDataStore.getBookingById(booking.id),
      message: `Payment of PKR ${Number(amount).toLocaleString()} successfully recorded and credited.`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create payment: " + String(error) },
      { status: 500 }
    );
  }
}
