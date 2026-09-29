'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { EQUIPMENT_INVENTORY, RENTAL_TERMS } from '@/data/equipment';
import { useRental } from '@/components/RentalContext';
import { ShoppingBag, ArrowRight, ShieldCheck, Check, Clock, Truck, FileText } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Microphones',
  'Recording & Interfaces',
  'DI Boxes & Signal',
  'Guitar Pedals & FX',
  'Amplifiers',
  'Cables & Accessories',
] as const;

export default function EquipmentPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { addToCart, setIsCartDrawerOpen, cart } = useRental();

  const filteredItems = EQUIPMENT_INVENTORY.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16">
      {/* Hero Banner (Inspired by Mockup 5 & Road Case Header) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg overflow-hidden p-6 md:p-10 shadow-xs">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B8532B]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8532B]">
              Gear Hire Catalog · Jeddah, KSA
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-[#181716] tracking-tight">
            Equipment Rental
          </h1>
          <p className="text-base text-[#6B665F] leading-relaxed max-w-xl font-light">
            A selection of calibrated studio and field audio equipment available for short and long-term rental. Professional microphones, preamps, analog mixers, and boutique pedal effects.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B8532B] hover:bg-[#9E431E] text-white text-xs font-mono uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              <ShoppingBag size={14} />
              <span>Open Rental Cart ({cart.length})</span>
            </button>
            <span className="text-xs font-mono text-[#6B665F]">
              Weekly rental cap: 7 days for the rate of 3
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 relative aspect-[16/9] w-full rounded overflow-hidden border border-[#E2DDD4]">
          <Image
            src="/images/aesthetic/equipment-flightcase.jpg"
            alt="Audio equipment flight case"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* FILTER TABS & SEARCH */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E2DDD4] pb-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto text-xs font-mono uppercase tracking-wider">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition-colors relative pb-2 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'text-[#181716] font-bold'
                    : 'text-[#6B665F] hover:text-[#181716]'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8532B]" />
                )}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gear, brand, or model..."
            className="w-full md:w-64 bg-[#FFFFFF] border border-[#E2DDD4] px-3 py-1.5 text-xs text-[#181716] rounded outline-none focus:border-[#B8532B]"
          />
        </div>

        {/* EQUIPMENT CARDS / TABLE VIEW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const inCart = cart.some((c) => c.item.id === item.id);

            return (
              <div
                key={item.id}
                className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-[#181716] transition-all duration-200"
              >
                <div>
                  {item.image && (
                    <div className="relative aspect-[16/10] w-full bg-[#F7F5F0] rounded mb-3 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-3"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-[#B8532B] uppercase">{item.brand}</span>
                    <span className="text-[#6B665F]">Available: {item.quantity}</span>
                  </div>

                  <h3 className="text-base font-medium text-[#181716] leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#6B665F] mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EFECE5] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-lg font-mono font-semibold text-[#181716]">
                        {item.dayRateSAR} SAR
                      </span>
                      <span className="text-xs text-[#6B665F]"> / day</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-[#6B665F]">
                        {item.weekRateSAR} SAR / week
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(item, 'day')}
                      className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                        inCart
                          ? 'bg-[#EFECE5] text-[#181716] hover:bg-[#E2DDD4]'
                          : 'bg-[#181716] hover:bg-[#B8532B] text-white'
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check size={14} className="text-[#B8532B]" />
                          <span>Added (Day)</span>
                        </>
                      ) : (
                        <span>+ Add Daily Rate</span>
                      )}
                    </button>
                    <button
                      onClick={() => addToCart(item, 'week')}
                      className="px-3 py-2 border border-[#E2DDD4] hover:border-[#181716] text-[#181716] text-xs font-mono uppercase tracking-wider rounded transition-colors cursor-pointer"
                      title="Add with weekly 3x cap"
                    >
                      + Week
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-[#6B665F] text-sm">
            No equipment found matching your search.
          </div>
        )}
      </div>

      {/* RENTAL INFORMATION FOOTER BAR (Faithfully mirrors Mockup 5 Option 2) */}
      <section className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg p-8 md:p-10 space-y-6">
        <div className="border-b border-[#EFECE5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#B8532B]">
              Terms & Rental Protocol
            </span>
            <h2 className="text-2xl font-light text-[#181716]">Rental Information</h2>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B8532B] hover:bg-[#9E431E] text-white text-xs font-mono uppercase tracking-wider rounded transition-colors"
          >
            <span>Inquire About Gear</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-[#6B665F]">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-[#181716] font-mono uppercase text-[11px]">
              <Clock size={14} className="text-[#B8532B]" />
              <span>Rental Periods</span>
            </div>
            <p className="leading-relaxed">{RENTAL_TERMS.periods}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-[#181716] font-mono uppercase text-[11px]">
              <Truck size={14} className="text-[#B8532B]" />
              <span>Collection & Delivery</span>
            </div>
            <p className="leading-relaxed">{RENTAL_TERMS.pickupDelivery}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-[#181716] font-mono uppercase text-[11px]">
              <ShieldCheck size={14} className="text-[#B8532B]" />
              <span>Security Deposit</span>
            </div>
            <p className="leading-relaxed">{RENTAL_TERMS.deposit}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-[#181716] font-mono uppercase text-[11px]">
              <FileText size={14} className="text-[#B8532B]" />
              <span>Testing & Quality</span>
            </div>
            <p className="leading-relaxed">{RENTAL_TERMS.conditionTesting}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
