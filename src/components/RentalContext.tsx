'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { EquipmentItem } from '@/data/equipment';

export interface RentalCartItem {
  item: EquipmentItem;
  quantity: number;
  rentalPeriod: 'day' | 'week';
}

interface RentalContextType {
  cart: RentalCartItem[];
  addToCart: (item: EquipmentItem, period?: 'day' | 'week') => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  updatePeriod: (itemId: string, period: 'day' | 'week') => void;
  clearCart: () => void;
  totalCostSAR: number;
  totalItems: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const RentalContext = createContext<RentalContextType | undefined>(undefined);

export function RentalProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<RentalCartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem('maryam_rental_cart');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem('maryam_rental_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (item: EquipmentItem, period: 'day' | 'week' = 'day') => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: Math.min(ci.quantity + 1, item.quantity) } : ci
        );
      }
      return [...prev, { item, quantity: 1, rentalPeriod: period }];
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) =>
        ci.item.id === itemId
          ? { ...ci, quantity: Math.min(qty, ci.item.quantity) }
          : ci
      )
    );
  };

  const updatePeriod = (itemId: string, period: 'day' | 'week') => {
    setCart((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, rentalPeriod: period } : ci))
    );
  };

  const clearCart = () => setCart([]);

  const totalCostSAR = cart.reduce((sum, ci) => {
    const rate = ci.rentalPeriod === 'week' ? ci.item.weekRateSAR : ci.item.dayRateSAR;
    return sum + rate * ci.quantity;
  }, 0);

  const totalItems = cart.reduce((sum, ci) => sum + ci.quantity, 0);

  return (
    <RentalContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updatePeriod,
        clearCart,
        totalCostSAR,
        totalItems,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </RentalContext.Provider>
  );
}

export function useRental() {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
}
