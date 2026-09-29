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
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F5F0] border-l border-[#E2DDD4] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#E2DDD4] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8532B]" />
                <span className="text-xs uppercase font-mono tracking-wider text-[#6B665F]">
                  Equipment Booking
                </span>
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-[#181716] mt-1">
                Rental Inquiry Cart
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-[#6B665F] hover:text-[#181716] transition-colors rounded-full hover:bg-[#EFECE5]"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#F7EDE7] text-[#B8532B] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-xl font-semibold text-[#181716]">Inquiry Generated</h3>
                <p className="text-sm text-[#6B665F] leading-relaxed">
                  Thank you, {formData.name}. Your equipment request for{' '}
                  <span className="font-semibold text-[#181716]">{totalCostSAR} SAR</span> has been prepared. Maryam will review your dates and confirm equipment availability.
                </p>
                <div className="p-4 bg-[#EFECE5] rounded border border-[#E2DDD4] text-left text-xs space-y-2">
                  <p><span className="font-semibold text-[#181716]">Client:</span> {formData.name} ({formData.phone})</p>
                  <p><span className="font-semibold text-[#181716]">Dates:</span> {formData.startDate || 'TBD'} to {formData.endDate || 'TBD'}</p>
                  <p><span className="font-semibold text-[#181716]">Items:</span> {cart.map(c => `${c.item.name} (x${c.quantity})`).join(', ')}</p>
                </div>
                <button
                  onClick={resetForm}
                  className="w-full py-2.5 bg-[#181716] text-[#F7F5F0] text-sm uppercase tracking-wider font-mono hover:bg-[#B8532B] transition-colors rounded"
                >
                  Close & Clear
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <p className="text-sm text-[#6B665F]">Your rental inquiry cart is empty.</p>
                <p className="text-xs text-[#6B665F]/80">
                  Select microphones, mixers, pedals, or DI boxes from the inventory to build a custom booking quote.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="mt-4 px-4 py-2 border border-[#181716] text-xs uppercase font-mono tracking-wider hover:bg-[#181716] hover:text-[#F7F5F0] transition-colors rounded"
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
                        className="p-3.5 bg-[#FFFFFF] border border-[#E2DDD4] rounded space-y-2.5"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="text-[10px] uppercase font-mono text-[#B8532B]">
                              {ci.item.brand}
                            </span>
                            <h4 className="text-sm font-medium text-[#181716]">
                              {ci.item.name}
                            </h4>
                          </div>
                          <button
                            onClick={() => removeFromCart(ci.item.id)}
                            className="text-[#6B665F] hover:text-red-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        {/* Period & Quantity Controls */}
                        <div className="flex items-center justify-between text-xs pt-1 border-t border-[#EFECE5]">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updatePeriod(ci.item.id, 'day')}
                              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                                ci.rentalPeriod === 'day'
                                  ? 'bg-[#181716] text-[#F7F5F0]'
                                  : 'bg-[#EFECE5] text-[#6B665F] hover:text-[#181716]'
                              }`}
                            >
                              Day
                            </button>
                            <button
                              onClick={() => updatePeriod(ci.item.id, 'week')}
                              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                                ci.rentalPeriod === 'week'
                                  ? 'bg-[#181716] text-[#F7F5F0]'
                                  : 'bg-[#EFECE5] text-[#6B665F] hover:text-[#181716]'
                              }`}
                            >
                              Week (3x)
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#6B665F]">Qty:</span>
                            <select
                              value={ci.quantity}
                              onChange={(e) =>
                                updateQuantity(ci.item.id, Number(e.target.value))
                              }
                              className="bg-[#EFECE5] text-[#181716] text-xs font-mono px-2 py-0.5 rounded border-none outline-none cursor-pointer"
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
                            <span className="font-mono text-sm font-semibold text-[#181716] ml-2">
                              {subtotal} SAR
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Subtotal */}
                <div className="p-4 bg-[#EFECE5] rounded border border-[#E2DDD4] space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-[#181716]">
                    <span>Estimated Total:</span>
                    <span className="font-mono text-lg text-[#B8532B]">
                      {totalCostSAR} SAR
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B665F] leading-tight flex items-start gap-1.5">
                    <ShieldCheck size={14} className="shrink-0 mt-0.5 text-[#B8532B]" />
                    <span>Refundable deposit required. Pick-up and return in Jeddah, KSA.</span>
                  </p>
                </div>

                {/* Booking Inquiry Form */}
                <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-[#6B665F]">
                    Rental Details
                  </h4>
                  <div>
                    <label className="block text-[11px] font-mono text-[#181716] mb-1">
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
                      className="w-full bg-[#FFFFFF] border border-[#E2DDD4] px-3 py-2 text-xs text-[#181716] rounded outline-none focus:border-[#B8532B]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-mono text-[#181716] mb-1">
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
                        className="w-full bg-[#FFFFFF] border border-[#E2DDD4] px-3 py-2 text-xs text-[#181716] rounded outline-none focus:border-[#B8532B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#181716] mb-1">
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
                        className="w-full bg-[#FFFFFF] border border-[#E2DDD4] px-3 py-2 text-xs text-[#181716] rounded outline-none focus:border-[#B8532B]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-mono text-[#181716] mb-1 flex items-center gap-1">
                        <Calendar size={12} /> Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData({ ...formData, startDate: e.target.value })
                        }
                        className="w-full bg-[#FFFFFF] border border-[#E2DDD4] px-3 py-2 text-xs text-[#181716] rounded outline-none focus:border-[#B8532B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-[#181716] mb-1 flex items-center gap-1">
                        <Calendar size={12} /> Return Date
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                          setFormData({ ...formData, endDate: e.target.value })
                        }
                        className="w-full bg-[#FFFFFF] border border-[#E2DDD4] px-3 py-2 text-xs text-[#181716] rounded outline-none focus:border-[#B8532B]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#181716] mb-1">
                      Session / Project Notes
                    </label>
                    <textarea
                      rows={2}
                      value={formData.projectNotes}
                      onChange={(e) =>
                        setFormData({ ...formData, projectNotes: e.target.value })
                      }
                      placeholder="e.g. Location shoot, recording vocal session this weekend..."
                      className="w-full bg-[#FFFFFF] border border-[#E2DDD4] px-3 py-2 text-xs text-[#181716] rounded outline-none focus:border-[#B8532B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#B8532B] hover:bg-[#9E431E] text-[#FFFFFF] text-xs font-mono uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer mt-2"
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
