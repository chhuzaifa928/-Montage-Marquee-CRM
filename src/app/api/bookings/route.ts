import { NextResponse } from "next/server";
import { MontageDataStore } from "@/lib/dataStore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hallId = searchParams.get("hallId");
    const status = searchParams.get("status");
    const date = searchParams.get("date");

    let bookings = MontageDataStore.getBookings();

    if (hallId) {
      bookings = bookings.filter((b) => b.hallId === hallId);
    }
    if (status) {
      bookings = bookings.filter((b) => b.status === status);
    }
    if (date) {
      bookings = bookings.filter((b) => b.eventDate === date);
    }

    return NextResponse.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings: " + String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customerName,
      customerPhone,
      customerCnic,
      customerEmail,
      eventType,
      eventDate,
      timeSlot,
      hallId,
      cateringMenuId,
      guestCount,
      decorPackage,
      decorCost = 0,
      soundAndAvCost = 0,
      advancePaid = 0,
      specialInstructions = "",
    } = body;

    if (!customerName || !customerPhone || !eventDate || !hallId || !guestCount) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (customerName, phone, date, hall, guests)" },
        { status: 400 }
      );
    }

    const hall = MontageDataStore.getHallById(hallId);
    const menu = MontageDataStore.getMenuById(cateringMenuId);

    const isLunch = timeSlot.toLowerCase().includes("lunch");
    const hallRent = hall ? (isLunch ? hall.baseRentLunch : hall.baseRentDinner) : 400000;
    const perHeadRate = menu ? menu.pricePerHead : 4200;
    const foodCost = Number(guestCount) * perHeadRate;

    const subtotal = hallRent + foodCost + Number(decorCost) + Number(soundAndAvCost);
    const taxRate = 16; // 16% PRA Sales Tax
    const taxAmount = Math.round((subtotal * taxRate) / 100);
    const totalAmount = subtotal + taxAmount;
    const balanceDue = Math.max(0, totalAmount - Number(advancePaid));

    const status = Number(advancePaid) > 0 ? "CONFIRMED" : "PROVISIONAL";

    const newBooking = MontageDataStore.createBooking({
      customerName,
      customerPhone,
      customerCnic: customerCnic || "61101-0000000-1",
      customerEmail: customerEmail || "",
      eventType: eventType || "Barat",
      eventDate,
      timeSlot,
      hallId,
      cateringMenuId: cateringMenuId || "menu-royal-mughal",
      guestCount: Number(guestCount),
      decorPackage: decorPackage || "Imperial Gold Stage & Crystal Archways",
      decorCost: Number(decorCost),
      soundAndAvCost: Number(soundAndAvCost),
      hallRent,
      foodCost,
      subtotal,
      taxRate,
      taxAmount,
      totalAmount,
      advancePaid: Number(advancePaid),
      balanceDue,
      status,
      specialInstructions,
    });

    return NextResponse.json({
      success: true,
      booking: newBooking,
      message: `Booking ${newBooking.bookingRef} successfully created.`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create booking: " + String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Booking ID is required for updates" },
        { status: 400 }
      );
    }

    const updated = MontageDataStore.updateBooking(id, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Booking ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update booking: " + String(error) },
      { status: 500 }
    );
  }
}
