'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRental } from './RentalContext';
import { ShoppingBag, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/work' },
  { name: 'Equipment', href: '/equipment' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartDrawerOpen } = useRental();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#E2DDD4] transition-all">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="text-lg md:text-xl font-bold tracking-tight text-[#181716] uppercase hover:opacity-80 transition-opacity"
        >
          Maryam Attar
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm tracking-wide transition-colors relative py-1 ${
                  isActive
                    ? 'text-[#181716] font-medium'
                    : 'text-[#6B665F] hover:text-[#181716]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8532B]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Rental Cart Drawer Trigger & Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Rental Cart Trigger */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label="View equipment rental cart"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E2DDD4] bg-[#FFFFFF] hover:border-[#B8532B] text-xs font-mono tracking-wider text-[#181716] transition-colors cursor-pointer"
          >
            <ShoppingBag size={14} className="text-[#B8532B]" />
            <span className="hidden sm:inline">RENTAL CART</span>
            {totalItems > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#B8532B] text-[#FFFFFF] text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#181716] hover:bg-[#EFECE5] rounded-md transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F5F0] border-b border-[#E2DDD4] px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-base py-2 transition-colors ${
                  isActive
                    ? 'text-[#B8532B] font-semibold pl-2 border-l-2 border-[#B8532B]'
                    : 'text-[#181716] hover:text-[#B8532B]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
