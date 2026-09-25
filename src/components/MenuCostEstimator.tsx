"use client";

import React, { useState } from "react";
import {
  UtensilsCrossed,
  Sparkles,
  Users,
  CheckCircle2,
  DollarSign,
  Coffee,
  Plus,
  ArrowRight,
} from "lucide-react";
import { CateringMenu } from "@/db/seedData";

interface MenuCostEstimatorProps {
  menus: CateringMenu[];
  onSelectMenuForBooking: (menuId: string) => void;
}

export function MenuCostEstimator({
  menus,
  onSelectMenuForBooking,
}: MenuCostEstimatorProps) {
  const [selectedMenuId, setSelectedMenuId] = useState<string>(menus[0]?.id || "");
  const [guestCount, setGuestCount] = useState<number>(500);
  const [liveKashmiriChaiStall, setLiveKashmiriChaiStall] = useState<boolean>(true);
  const [liveJalebiStall, setLiveJalebiStall] = useState<boolean>(true);
  const [includeSeafoodBites, setIncludeSeafoodBites] = useState<boolean>(false);

  const activeMenu = menus.find((m) => m.id === selectedMenuId) || menus[0];

  // Calculations
  const baseRatePerHead = activeMenu ? activeMenu.pricePerHead : 4200;
  const liveChaiSurcharge = liveKashmiriChaiStall ? 150 : 0;
  const liveJalebiSurcharge = liveJalebiStall ? 120 : 0;
  const seafoodSurcharge = includeSeafoodBites ? 350 : 0;

  const finalRatePerHead =
    baseRatePerHead + liveChaiSurcharge + liveJalebiSurcharge + seafoodSurcharge;
  const totalCateringCost = guestCount * finalRatePerHead;
  const praTax = Math.round((totalCateringCost * 16) / 100);
  const grandTotal = totalCateringCost + praTax;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 rounded-2xl p-6 sm:p-7 text-white border border-amber-900/50 shadow-md">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
            <span>Montage Executive Culinary Brigade</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Pakistani Wedding &amp; Corporate Menu Configurator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Calculate precise per-head rates, live catering stalls (Kashmiri Chai, Hot Jalebi, Tandoor), and PRA sales tax projections for banquets at Gulberg Islamabad.
          </p>
        </div>
      </div>

      {/* Menu Cards Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {menus.map((menu) => (
          <button
            key={menu.id}
            type="button"
            onClick={() => setSelectedMenuId(menu.id)}
            className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
              selectedMenuId === menu.id
                ? "bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/30 shadow-xs"
                : "bg-white border-slate-200 hover:border-slate-300"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-mono text-amber-800">
                  PKR {menu.pricePerHead.toLocaleString()}/head
                </span>
                {menu.popularChoice && (
                  <span className="text-[10px] font-bold uppercase bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
                    Signature
                  </span>
                )}
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{menu.name}</h4>
              <p className="text-xs text-slate-700 mt-1 line-clamp-2 font-medium">
                {menu.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-700 space-y-1 font-medium">
              <div>Mains: {menu.mainCourses.length} items</div>
              <div>Breads &amp; Dum Rice: {menu.riceAndBreads.length} items</div>
              <div>Desserts &amp; Chai: {menu.desserts.length + menu.beverages.length} items</div>
            </div>
          </button>
        ))}
      </div>

      {/* Detailed Menu Inspection & Live Stall Add-ons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Dish Breakdown of Selected Menu */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">{activeMenu.name}</h3>
              <p className="text-xs text-slate-700 font-medium">Full course composition &amp; culinary items</p>
            </div>
            <span className="text-sm font-bold text-amber-800 font-mono">
              PKR {activeMenu.pricePerHead.toLocaleString()} / Person
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Appetizers */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block mb-2 uppercase text-[11px] tracking-wider">
                Starters &amp; Barbecue
              </span>
              <ul className="space-y-1 text-slate-700 font-medium">
                {activeMenu.appetizers.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mains */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block mb-2 uppercase text-[11px] tracking-wider">
                Slow-Cooked Main Gravies
              </span>
              <ul className="space-y-1 text-slate-700 font-medium">
                {activeMenu.mainCourses.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rice & Naan */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block mb-2 uppercase text-[11px] tracking-wider">
                Dum Rice &amp; Tandoor Naan
              </span>
              <ul className="space-y-1 text-slate-700 font-medium">
                {activeMenu.riceAndBreads.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desserts & Chai */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block mb-2 uppercase text-[11px] tracking-wider">
                Desserts &amp; Traditional Beverages
              </span>
              <ul className="space-y-1 text-slate-700 font-medium">
                {[...activeMenu.desserts, ...activeMenu.beverages].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Interactive Costing Engine */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Live Catering Budget Calculator
            </h3>
            <p className="text-xs text-slate-700 font-medium mb-4">
              Real-time headcount scaling and interactive stall surcharges
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Guest Headcount:</span>
                  <span className="text-slate-900 font-bold">{guestCount} Persons</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1500}
                  step={25}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              {/* Add-on toggles */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-800 block">
                  Signature Live Terrace Stalls
                </span>

                <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={liveKashmiriChaiStall}
                      onChange={(e) => setLiveKashmiriChaiStall(e.target.checked)}
                      className="accent-amber-600 rounded"
                    />
                    <span className="font-medium text-slate-800">
                      Live Samawar Kashmiri Chai with Pistachio
                    </span>
                  </div>
                  <span className="text-amber-800 font-semibold font-mono">
                    +PKR 150/head
                  </span>
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={liveJalebiStall}
                      onChange={(e) => setLiveJalebiStall(e.target.checked)}
                      className="accent-amber-600 rounded"
                    />
                    <span className="font-medium text-slate-800">
                      Hot Crispy Live Jalebi &amp; Rabri Counter
                    </span>
                  </div>
                  <span className="text-amber-800 font-semibold font-mono">
                    +PKR 120/head
                  </span>
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={includeSeafoodBites}
                      onChange={(e) => setIncludeSeafoodBites(e.target.checked)}
                      className="accent-amber-600 rounded"
                    />
                    <span className="font-medium text-slate-800">
                      Fried Red Snapper &amp; Prawn Bites
                    </span>
                  </div>
                  <span className="text-amber-800 font-semibold font-mono">
                    +PKR 350/head
                  </span>
                </label>
              </div>

              {/* Total Quotation */}
              <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80 space-y-2 mt-4">
                <div className="flex justify-between text-slate-700">
                  <span>Per Head Net Rate:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    PKR {finalRatePerHead.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Food Subtotal ({guestCount} guests):</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    PKR {totalCateringCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>16% PRA Sales Tax:</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    PKR {praTax.toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-amber-200 flex justify-between text-base font-bold text-amber-950">
                  <span>Total Catering Estimate:</span>
                  <span className="font-mono">PKR {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectMenuForBooking(activeMenu.id)}
            className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm py-2.5 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer mt-4"
          >
            <span>Apply This Menu to New Booking</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
