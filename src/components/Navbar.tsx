"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Calendar,
  Receipt,
  MessageSquare,
  FileText,
  Plus,
  ShieldCheck,
  Clock,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNewBooking: () => void;
  pendingOcrCount: number;
}

export function Navbar({
  activeTab,
  setActiveTab,
  onOpenNewBooking,
  pendingOcrCount,
}: NavbarProps) {
  const [islamabadTime, setIslamabadTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setIslamabadTime(
        now.toLocaleTimeString("en-PK", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "dashboard", label: "Executive Overview", icon: Building2 },
    { id: "slots", label: "Hall Slots & Bookings", icon: Calendar },
    {
      id: "ocr-hub",
      label: "AI Receipt OCR",
      icon: Receipt,
      badge: pendingOcrCount > 0 ? pendingOcrCount : null,
    },
    { id: "whatsapp", label: "WhatsApp Cloud API", icon: MessageSquare },
    { id: "catering", label: "Menu & Costing", icon: UtensilsCrossed },
    { id: "vouchers", label: "Contracts & Invoices", icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Gold Trim */}
      <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 flex items-center justify-center text-white font-serif text-xl font-bold shadow-md shadow-amber-500/20 border border-amber-400/40">
              M
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-serif">
                  MONTAGE
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                  Operations Suite
                </span>
              </div>
              <p className="text-xs text-slate-700 flex items-center space-x-1.5 font-medium">
                <span>Gulberg Expressway, Executive Block, Islamabad</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </p>
            </div>
          </div>

          {/* Time & Environment Status */}
          <div className="hidden lg:flex items-center space-x-6 text-xs text-slate-700 font-medium">
            <div className="flex items-center space-x-2 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>Islamabad:</span>
              <span className="font-semibold text-slate-800 tabular-nums">
                {islamabadTime || "10:30 PM PKT"}
              </span>
            </div>

            <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-semibold">Gemini 2.5 Vision & Meta v21.0 Active</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenNewBooking}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-amber-600/25 transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Booking</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-amber-400" : "text-slate-600"
                  }`}
                />
                <span>{item.label}</span>
                {item.badge !== null && item.badge !== undefined && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-slate-950">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
