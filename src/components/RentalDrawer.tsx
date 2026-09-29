'use client';

import React, { useState } from 'react';
import { useRental } from './RentalContext';
import { X, Trash2, ArrowRight, CheckCircle2, Calendar, ShieldCheck } from 'lucide-react';

export function RentalDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    updatePeriod,
    clearCart,
    totalCostSAR,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
  } = useRental();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    projectNotes: '',
  });

  if (!isCartDrawerOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    clearCart();
    setIsCartDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[var(--bg-main)] border-l border-[var(--border-color)] shadow-2xl flex flex-col text-[var(--text-main)]">
          {/* Header */}
          <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <span className="text-xs uppercase font-mono tracking-wider text-[var(--text-muted)]">
                  Equipment Booking
                </span>
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-[var(--text-main)] mt-1">
                Rental Inquiry Cart
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors rounded-full hover:bg-[var(--bg-subtle)] cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-main)]">Inquiry Generated</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Thank you, {formData.name}. Your equipment request for{' '}
                  <span className="font-semibold text-[var(--text-main)]">{totalCostSAR} SAR</span> has been prepared. Maryam will review your dates and confirm equipment availability.
                </p>
                <div className="p-4 bg-[var(--bg-subtle)] rounded border border-[var(--border-color)] text-left text-xs space-y-2">
                  <p><span className="font-semibold text-[var(--text-main)]">Client:</span> {formData.name} ({formData.phone})</p>
                  <p><span className="font-semibold text-[var(--text-main)]">Dates:</span> {formData.startDate || 'TBD'} to {formData.endDate || 'TBD'}</p>
                  <p><span className="font-semibold text-[var(--text-main)]">Items:</span> {cart.map(c => `${c.item.name} (x${c.quantity})`).join(', ')}</p>
                </div>
                <button
                  onClick={resetForm}
                  className="w-full py-2.5 bg-[var(--text-main)] text-[var(--bg-main)] text-xs uppercase tracking-wider font-mono hover:bg-[var(--accent)] hover:text-white transition-colors rounded cursor-pointer"
                >
                  Close & Clear
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <p className="text-sm text-[var(--text-muted)]">Your rental inquiry cart is empty.</p>
                <p className="text-xs text-[var(--text-muted)]/80">
                  Select microphones, mixers, pedals, or DI boxes from the inventory to build a custom booking quote.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="mt-4 px-4 py-2 border border-[var(--border-color)] text-xs uppercase font-mono tracking-wider hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] transition-colors rounded cursor-pointer"
                >
                  Browse Equipment
                </button>
              </div>
            ) : (
              <>
                {/* List of items */}
                <div className="space-y-4">
                  {cart.map((ci) => {
                    const rate =
                      ci.rentalPeriod === 'week'
                        ? ci.item.weekRateSAR
                        : ci.item.dayRateSAR;
                    const subtotal = rate * ci.quantity;

                    return (
                      <div
                        key={ci.item.id}
                        className="p-3.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded space-y-2.5"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="text-[10px] uppercase font-mono text-[var(--accent)]">
                              {ci.item.brand}
                            </span>
                            <h4 className="text-sm font-medium text-[var(--text-main)]">
                              {ci.item.name}
                            </h4>
                          </div>
                          <button
                            onClick={() => removeFromCart(ci.item.id)}
                            className="text-[var(--text-muted)] hover:text-red-500 transition-colors p-1 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        {/* Period & Quantity Controls */}
                        <div className="flex items-center justify-between text-xs pt-1 border-t border-[var(--border-subtle)]">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updatePeriod(ci.item.id, 'day')}
                              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                                ci.rentalPeriod === 'day'
                                  ? 'bg-[var(--text-main)] text-[var(--bg-main)]'
                                  : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                              }`}
                            >
                              Day
                            </button>
                            <button
                              onClick={() => updatePeriod(ci.item.id, 'week')}
                              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                                ci.rentalPeriod === 'week'
                                  ? 'bg-[var(--text-main)] text-[var(--bg-main)]'
                                  : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                              }`}
                            >
                              Week (3x)
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[var(--text-muted)]">Qty:</span>
                            <select
                              value={ci.quantity}
                              onChange={(e) =>
                                updateQuantity(ci.item.id, Number(e.target.value))
                              }
                              className="bg-[var(--bg-subtle)] text-[var(--text-main)] text-xs font-mono px-2 py-0.5 rounded border border-[var(--border-color)] outline-none cursor-pointer"
                            >
                              {Array.from(
                                { length: ci.item.quantity },
                                (_, i) => i + 1
                              ).map((q) => (
                                <option key={q} value={q}>
                                  {q}
                                </option>
                              ))}
                            </select>
                            <span className="font-mono text-sm font-semibold text-[var(--text-main)] ml-2">
                              {subtotal} SAR
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Subtotal */}
                <div className="p-4 bg-[var(--bg-subtle)] rounded border border-[var(--border-color)] space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-[var(--text-main)]">
                    <span>Estimated Total:</span>
                    <span className="font-mono text-lg text-[var(--accent)]">
                      {totalCostSAR} SAR
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] leading-tight flex items-start gap-1.5">
                    <ShieldCheck size={14} className="shrink-0 mt-0.5 text-[var(--accent)]" />
                    <span>Refundable deposit required. Pick-up and return in Jeddah, KSA. Delivery options available.</span>
                  </p>
                </div>

                {/* Booking Inquiry Form */}
                <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-[var(--text-muted)]">
                    Rental Parameters
                  </h4>
                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-main)] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Tariq Al-Ghamdi"
                      className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] px-3 py-2 text-xs text-[var(--text-main)] rounded outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-mono text-[var(--text-main)] mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="producer@studio.com"
                        className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] px-3 py-2 text-xs text-[var(--text-main)] rounded outline-none focus:border-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[var(--text-main)] mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+966 5..."
                        className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] px-3 py-2 text-xs text-[var(--text-main)] rounded outline-none focus:border-[var(--accent)]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-mono text-[var(--text-main)] mb-1 flex items-center gap-1">
                        <Calendar size={12} /> Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData({ ...formData, startDate: e.target.value })
                        }
                        className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] px-3 py-2 text-xs text-[var(--text-main)] rounded outline-none focus:border-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[var(--text-main)] mb-1 flex items-center gap-1">
                        <Calendar size={12} /> Return Date
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                          setFormData({ ...formData, endDate: e.target.value })
                        }
                        className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] px-3 py-2 text-xs text-[var(--text-main)] rounded outline-none focus:border-[var(--accent)]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[var(--text-main)] mb-1">
                      Session / Project Notes
                    </label>
                    <textarea
                      rows={2}
                      value={formData.projectNotes}
                      onChange={(e) =>
                        setFormData({ ...formData, projectNotes: e.target.value })
                      }
                      placeholder="e.g. Location shoot, recording session this weekend..."
                      className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] px-3 py-2 text-xs text-[var(--text-main)] rounded outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer mt-2"
                  >
                    <span>Submit Rental Booking Request</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
