import { NextResponse } from "next/server";
import { MontageDataStore } from "@/lib/dataStore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const booking = MontageDataStore.getBookingById(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, error: `Invoice for booking reference ${id} not found.` },
        { status: 404 }
      );
    }

    const hall = MontageDataStore.getHallById(booking.hallId);
    const menu = MontageDataStore.getMenuById(booking.cateringMenuId);
    const payments = MontageDataStore.getPayments().filter(
      (p) => p.bookingId === booking.id || p.bookingRef === booking.bookingRef
    );

    const invoiceData = {
      invoiceNumber: `INV-${booking.bookingRef.replace("MEC-", "")}`,
      issueDate: new Date().toLocaleDateString("en-PK", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      venueDetails: {
        legalName: "Montage Event Complex Private Limited",
        location: "Plot 1-4, Executive Block, Main Gulberg Expressway, Gulberg Greens, Islamabad",
        telephone: "+92 51 591 0000 / +92 300 8554900",
        email: "reservations@montage-marquee.pk",
        ntn: "8294102-4",
        praSalesTaxReg: "PRA-32778761101",
        fbrIctReg: "ICT-ST-992140",
        bankDetails: {
          bank: "Meezan Bank Limited",
          branch: "Gulberg Greens Branch, Islamabad",
          accountTitle: "Montage Event Complex Pvt Ltd",
          accountNumber: "0201-0108924102",
          iban: "PK26MEZN0002010108924102",
        },
      },
      client: {
        name: booking.customerName,
        phone: booking.customerPhone,
        cnic: booking.customerCnic,
        email: booking.customerEmail,
      },
      event: {
        bookingRef: booking.bookingRef,
        eventType: booking.eventType,
        date: booking.eventDate,
        timeSlot: booking.timeSlot,
        hallName: hall?.name || "Montage Grand Hall",
        guestCount: booking.guestCount,
        cateringMenu: menu?.name || "Signature Menu",
        decorPackage: booking.decorPackage,
      },
      financials: {
        hallRent: booking.hallRent,
        cateringSubtotal: booking.foodCost,
        perHeadRate: menu?.pricePerHead || 4200,
        decorCost: booking.decorCost,
        soundAndAvCost: booking.soundAndAvCost,
        taxableSubtotal: booking.subtotal,
        taxRatePercent: booking.taxRate,
        taxAmount: booking.taxAmount,
        grandTotal: booking.totalAmount,
        advancePaid: booking.advancePaid,
        balancePayable: booking.balanceDue,
        status: booking.status,
      },
      paymentLedger: payments.map((p) => ({
        paymentId: p.id,
        date: p.verifiedAt,
        bank: p.bankName,
        transactionRef: p.transactionRef,
        amount: p.amount,
        status: p.verificationStatus,
      })),
      complianceNotes: [
        "This is an official computer-generated Tax Invoice issued under PRA / ICT Sales Tax on Services Ordinance.",
        "Generator fuel (dual 500kVA Caterpillar synchronized gensets) is fully included in the hall charges without surcharge.",
        "In accordance with Islamabad District Administration guidelines, music / sound volume restrictions apply after 11:30 PM.",
      ],
    };

    return NextResponse.json({
      success: true,
      invoice: invoiceData,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to generate invoice data: " + String(error) },
      { status: 500 }
    );
  }
}
