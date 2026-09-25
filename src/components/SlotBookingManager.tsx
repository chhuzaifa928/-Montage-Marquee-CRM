"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Building2,
  Plus,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  ChevronRight,
  Sparkles,
  Info,
  X,
  Printer,
  Share2,
} from "lucide-react";
import { Booking, CateringMenu, Hall } from "@/db/seedData";

interface SlotBookingManagerProps {
  bookings: Booking[];
  halls: Hall[];
  menus: CateringMenu[];
  onBookingCreated: (booking: Booking) => void;
  onOpenBookingVoucher: (booking: Booking) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
}

export function SlotBookingManager({
  bookings,
  halls,
  menus,
  onBookingCreated,
  onOpenBookingVoucher,
  isCreateModalOpen,
  setIsCreateModalOpen,
}: SlotBookingManagerProps) {
  const [selectedHallFilter, setSelectedHallFilter] = useState<string>("ALL");
  const [searchDate, setSearchDate] = useState<string>("");

  // New Booking Form State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("+92 3");
  const [customerCnic, setCustomerCnic] = useState("61101-");
  const [customerEmail, setCustomerEmail] = useState("");
  const [eventType, setEventType] = useState("Barat");
  const [eventDate, setEventDate] = useState("2026-11-28");
  const [timeSlot, setTimeSlot] = useState("Dinner / Night (07:00 PM - 12:00 AM)");
  const [hallId, setHallId] = useState(halls[0]?.id || "hall-royal-imperial");
  const [cateringMenuId, setCateringMenuId] = useState(menus[0]?.id || "menu-royal-mughal");
  const [guestCount, setGuestCount] = useState(500);
  const [decorPackage, setDecorPackage] = useState("Imperial Gold Stage & Crystal Archways");
  const [decorCost, setDecorCost] = useState(300000);
  const [soundAndAvCost, setSoundAndAvCost] = useState(75000);
  const [advancePaid, setAdvancePaid] = useState(1500000);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const selectedHall = halls.find((h) => h.id === hallId) || halls[0];
  const selectedMenu = menus.find((m) => m.id === cateringMenuId) || menus[0];

  // Dynamic Financial Quotation
  const isLunch = timeSlot.toLowerCase().includes("lunch");
  const hallRent = selectedHall ? (isLunch ? selectedHall.baseRentLunch : selectedHall.baseRentDinner) : 400000;
  const foodCost = guestCount * (selectedMenu ? selectedMenu.pricePerHead : 4200);
  const subtotal = hallRent + foodCost + decorCost + soundAndAvCost;
  const taxAmount = Math.round((subtotal * 16) / 100);
  const totalAmount = subtotal + taxAmount;
  const balanceDue = Math.max(0, totalAmount - advancePaid);

  const filteredBookings = bookings.filter((b) => {
    if (selectedHallFilter !== "ALL" && b.hallId !== selectedHallFilter) return false;
    if (searchDate && b.eventDate !== searchDate) return false;
    return true;
  });

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!customerName || !customerPhone || !eventDate) {
      setErrorMsg("Please fill in client name, phone number, and event date.");
      return;
    }

    if (guestCount < selectedHall.capacityMin || guestCount > selectedHall.capacityMax) {
      setErrorMsg(
        `Guest count (${guestCount}) is outside the recommended range for ${selectedHall.name} (${selectedHall.capacityMin} - ${selectedHall.capacityMax}).`
      );
      return;
    }

    // Check slot collision
    const collision = bookings.find(
      (b) =>
        b.hallId === hallId &&
        b.eventDate === eventDate &&
        b.timeSlot === timeSlot &&
        b.status !== "CANCELLED"
    );

    if (collision) {
      setErrorMsg(
        `Slot Conflict: ${selectedHall.name} is already booked on ${eventDate} for ${timeSlot} (Booking Ref: ${collision.bookingRef}). Please select another hall or slot.`
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
          decorCost,
          soundAndAvCost,
          advancePaid,
          specialInstructions,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create booking");
      }

      onBookingCreated(data.booking);
      setIsCreateModalOpen(false);
      onOpenBookingVoucher(data.booking);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error creating booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls & Filter Bar */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Filter By Venue Hall
            </label>
            <select
              value={selectedHallFilter}
              onChange={(e) => setSelectedHallFilter(e.target.value)}
              className="text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="ALL">All Halls (Gulberg Complex)</option>
              {halls.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Specific Date Filter
            </label>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            />
          </div>

          {searchDate && (
            <button
              onClick={() => setSearchDate("")}
              className="mt-5 text-xs text-amber-700 hover:text-amber-800 font-semibold cursor-pointer underline"
            >
              Clear Date
            </button>
          )}
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Reservation</span>
        </button>
      </div>

      {/* Hall Capacity & Pricing Specs Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {halls.map((h) => (
          <div
            key={h.id}
            className={`p-4 rounded-xl border transition-all ${
              selectedHallFilter === h.id
                ? "bg-amber-50/60 border-amber-400 shadow-xs"
                : "bg-white border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">{h.name}</h4>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {h.capacityMin}–{h.capacityMax} Pax
              </span>
            </div>
            <div className="mt-2 text-xs text-slate-700 flex justify-between font-medium">
              <span>Dinner Rent:</span>
              <span className="font-bold text-amber-800">
                PKR {h.baseRentDinner.toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-slate-700 flex justify-between font-medium">
              <span>Lunch Rent:</span>
              <span className="font-semibold text-slate-700">
                PKR {h.baseRentLunch.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Booked Slots Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Allocated Banquets &amp; Reserved Dates
            </h3>
            <p className="text-xs text-slate-700 font-medium">
              Showing {filteredBookings.length} booking slots matching criteria
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredBookings.length === 0 ? (
            <div className="p-12 text-center text-slate-700">
              <Calendar className="w-10 h-10 mx-auto text-slate-300 mb-3" />
              <p className="font-medium text-sm">No reservations found for this filter selection.</p>
            </div>
          ) : (
            filteredBookings.map((b) => {
              const hall = halls.find((h) => h.id === b.hallId);
              const isConfirmed = b.status === "CONFIRMED";

              return (
                <div
                  key={b.id}
                  className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-800 shrink-0">
                      <span className="text-xs font-bold uppercase">
                        {new Date(b.eventDate).toLocaleDateString("en-US", { month: "short" })}
                      </span>
                      <span className="text-base font-bold leading-none">
                        {new Date(b.eventDate).getDate()}
                      </span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-700">
                          {b.bookingRef}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                            isConfirmed
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {b.status}
                        </span>
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                          {b.eventType}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-base mt-1">
                        {b.customerName}
                      </h4>
                      <div className="text-xs text-slate-700 flex flex-wrap gap-x-4 gap-y-1 mt-1 font-medium">
                        <span className="flex items-center space-x-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-600" />
                          <span>{hall?.name}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-slate-600" />
                          <span>{b.timeSlot}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-3.5 h-3.5 text-slate-600" />
                          <span>{b.guestCount} Guests</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <div className="text-left lg:text-right">
                      <div className="text-sm font-bold text-slate-900">
                        PKR {b.totalAmount.toLocaleString()}
                      </div>
                      <div className="text-xs text-emerald-800 font-medium">
                        Advance: PKR {b.advancePaid.toLocaleString()}
                      </div>
                      <div className="text-xs text-amber-800 font-medium">
                        Due: PKR {b.balanceDue.toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenBookingVoucher(b)}
                      className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-amber-100 text-slate-900 hover:text-amber-950 font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors cursor-pointer border border-slate-200"
                    >
                      <FileText className="w-4 h-4 text-amber-700" />
                      <span>View Voucher</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* New Booking Modal Wizard */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 my-8 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-amber-500 text-slate-950 font-bold">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    New Montage Hall Reservation
                  </h3>
                  <p className="text-xs text-slate-300">
                    Gulberg Expressway, Executive Block, Islamabad
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="bg-red-50 text-red-700 text-xs p-3.5 border-b border-red-200 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateBooking} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Section 1: Client Information */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>1. Client &amp; Pakistani Legal Credentials</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Malik Tariq Javed"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+92 300 1234567"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      CNIC Number (Islamabad Police &amp; Tax record)
                    </label>
                    <input
                      type="text"
                      placeholder="61101-1234567-1"
                      value={customerCnic}
                      onChange={(e) => setCustomerCnic(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="client@domain.pk"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Venue & Date Slot */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>2. Venue Hall &amp; Timing Slot</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Hall Selection *
                    </label>
                    <select
                      value={hallId}
                      onChange={(e) => setHallId(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {halls.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.name} ({h.capacityMin}–{h.capacityMax} Pax)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Time Slot *
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Dinner / Night (07:00 PM - 12:00 AM)">
                        Dinner / Night (07:00 PM - 12:00 AM)
                      </option>
                      <option value="Lunch / Afternoon (12:00 PM - 04:00 PM)">
                        Lunch / Afternoon (12:00 PM - 04:00 PM)
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Event Type *
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Barat">Barat Reception</option>
                      <option value="Walima">Walima Banquet</option>
                      <option value="Mehndi / Sangeet">Mehndi / Sangeet</option>
                      <option value="Corporate Summit">Corporate Summit / Gala</option>
                      <option value="Qawwali Night">Qawwali Night</option>
                      <option value="Bridal Shower / Birthday">Intimate Celebration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Guaranteed Guest Count * ({selectedHall.capacityMin} – {selectedHall.capacityMax} Pax)
                    </label>
                    <input
                      type="number"
                      required
                      min={100}
                      max={2000}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Catering & Add-ons */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>3. Catering Menu &amp; Production Add-ons</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Catering Menu *
                    </label>
                    <select
                      value={cateringMenuId}
                      onChange={(e) => setCateringMenuId(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {menus.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} (PKR {m.pricePerHead.toLocaleString()}/head)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Stage Decor Package (PKR)
                    </label>
                    <input
                      type="number"
                      value={decorCost}
                      onChange={(e) => setDecorCost(Number(e.target.value))}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Concert Audio &amp; AV Truss (PKR)
                    </label>
                    <input
                      type="number"
                      value={soundAndAvCost}
                      onChange={(e) => setSoundAndAvCost(Number(e.target.value))}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Special Operational Instructions
                  </label>
                  <textarea
                    rows={2}
                    placeholder="VIP arrivals, dietary requests, Islamabad district sound restrictions compliance, etc."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Financial Calculation Summary */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-700">
                  <span>Base Hall Rent ({timeSlot.includes("Lunch") ? "Lunch" : "Dinner"}):</span>
                  <span className="font-semibold text-slate-900">PKR {hallRent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Catering ({guestCount} Guests @ PKR {selectedMenu?.pricePerHead.toLocaleString()}/head):</span>
                  <span className="font-semibold text-slate-900">PKR {foodCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Stage Decor &amp; Sound Add-ons:</span>
                  <span className="font-semibold text-slate-900">PKR {(decorCost + soundAndAvCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>16% PRA Sales Tax (Punjab/ICT Ordinance):</span>
                  <span className="font-semibold text-slate-900">PKR {taxAmount.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                  <span>Grand Total Contract Value:</span>
                  <span className="text-amber-800">PKR {totalAmount.toLocaleString()}</span>
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <div className="w-1/2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Advance Paid Today (PKR)
                    </label>
                    <input
                      type="number"
                      value={advancePaid}
                      onChange={(e) => setAdvancePaid(Number(e.target.value))}
                      className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg p-2 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="w-1/2 text-right">
                    <div className="text-xs text-slate-700">Remaining Balance:</div>
                    <div className="text-sm font-bold text-amber-800">
                      PKR {balanceDue.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Registering Booking...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm &amp; Generate Signed Voucher</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
