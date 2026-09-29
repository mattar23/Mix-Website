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

export default function EquipmentClient() {
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
      {/* Hero Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg overflow-hidden p-6 md:p-10 shadow-xs">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)]">
              Gear Hire Catalog · Jeddah, KSA
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-[var(--text-main)] tracking-tight">
            Equipment Rental
          </h1>
          <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-xl font-light">
            A selection of calibrated studio and field audio equipment available for short and long-term rental in Jeddah, Saudi Arabia. Professional microphones, preamps, analog mixers, and boutique pedal effects.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-mono uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              <ShoppingBag size={14} />
              <span>Open Rental Cart ({cart.length})</span>
            </button>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Weekly rate cap: 7 days for the rate of 3
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 relative aspect-[16/9] w-full rounded overflow-hidden border border-[var(--border-color)]">
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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto text-xs font-mono uppercase tracking-wider">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition-colors relative pb-2 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'text-[var(--text-main)] font-bold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]" />
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
            className="w-full md:w-64 bg-[var(--bg-card)] border border-[var(--border-color)] px-3 py-1.5 text-xs text-[var(--text-main)] rounded outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        {/* EQUIPMENT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const inCart = cart.some((c) => c.item.id === item.id);

            return (
              <div
                key={item.id}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-[var(--text-main)] transition-all duration-200"
              >
                <div>
                  {item.image && (
                    <div className="relative aspect-[16/10] w-full bg-[var(--bg-subtle)] rounded mb-3 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-3"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-[var(--accent)] uppercase">{item.brand}</span>
                    <span className="text-[var(--text-muted)]">Available: {item.quantity}</span>
                  </div>

                  <h3 className="text-base font-medium text-[var(--text-main)] leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-lg font-mono font-semibold text-[var(--text-main)]">
                        {item.dayRateSAR} SAR
                      </span>
                      <span className="text-xs text-[var(--text-muted)]"> / day</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-[var(--text-muted)]">
                        {item.weekRateSAR} SAR / week
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(item, 'day')}
                      className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                        inCart
                          ? 'bg-[var(--bg-subtle)] text-[var(--text-main)] hover:bg-[var(--border-color)]'
                          : 'bg-[var(--text-main)] hover:bg-[var(--accent)] text-[var(--bg-main)] hover:text-white'
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check size={14} className="text-[var(--accent)]" />
                          <span>Added (Day)</span>
                        </>
                      ) : (
                        <span>+ Add Daily Rate</span>
                      )}
                    </button>
                    <button
                      onClick={() => addToCart(item, 'week')}
                      className="px-3 py-2 border border-[var(--border-color)] hover:border-[var(--text-main)] text-[var(--text-main)] text-xs font-mono uppercase tracking-wider rounded transition-colors cursor-pointer"
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
          <div className="text-center py-16 text-[var(--text-muted)] text-sm">
            No equipment found matching your search.
          </div>
        )}
      </div>

      {/* RENTAL INFORMATION FOOTER BAR */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-8 md:p-10 space-y-6">
        <div className="border-b border-[var(--border-subtle)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)]">
              Terms & Rental Protocol
            </span>
            <h2 className="text-2xl font-light text-[var(--text-main)]">Rental Information</h2>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-mono uppercase tracking-wider rounded transition-colors cursor-pointer"
          >
            <span>Inquire About Gear</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-[var(--text-muted)]">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-[var(--text-main)] font-mono uppercase text-[11px]">
              <Clock size={14} className="text-[var(--accent)]" />
              <span>Rental Periods</span>
            </div>
            <p className="leading-relaxed">{RENTAL_TERMS.periods}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-[var(--text-main)] font-mono uppercase text-[11px]">
              <Truck size={14} className="text-[var(--accent)]" />
              <span>Collection & Delivery</span>
            </div>
            <p className="leading-relaxed">{RENTAL_TERMS.pickupDelivery}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-[var(--text-main)] font-mono uppercase text-[11px]">
              <ShieldCheck size={14} className="text-[var(--accent)]" />
              <span>Security Deposit</span>
            </div>
            <p className="leading-relaxed">{RENTAL_TERMS.deposit}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-[var(--text-main)] font-mono uppercase text-[11px]">
              <FileText size={14} className="text-[var(--accent)]" />
              <span>Testing & Quality</span>
            </div>
            <p className="leading-relaxed">{RENTAL_TERMS.conditionTesting}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
