'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRental } from './RentalContext';
import { ThemeToggle } from './ThemeToggle';
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
    <header className="sticky top-0 z-40 bg-[var(--bg-main)]/90 backdrop-blur-md border-b border-[var(--border-color)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Brand / Logo + Region Indicator */}
        <div className="flex items-baseline gap-3">
          <Link
            href="/"
            className="text-lg md:text-xl font-bold tracking-tight text-[var(--text-main)] uppercase hover:opacity-80 transition-opacity"
          >
            Maryam Attar
          </Link>
          <span className="hidden xl:inline text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider">
            JEDDAH / REMOTE
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-mono uppercase tracking-wider transition-colors relative py-1 ${
                  isActive
                    ? 'text-[var(--text-main)] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle + Rental Cart Drawer Trigger + Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Bespoke Studio Lighting Theme Toggle */}
          <ThemeToggle />

          {/* Rental Cart Trigger */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label="View equipment rental cart"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--accent)] text-xs font-mono tracking-wider text-[var(--text-main)] transition-all cursor-pointer"
          >
            <ShoppingBag size={13} className="text-[var(--accent)]" />
            <span className="hidden sm:inline text-[11px]">CART</span>
            {totalItems > 0 && (
              <span className="w-4 h-4 rounded-full bg-[var(--accent)] text-white text-[9px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[var(--text-main)] hover:bg-[var(--bg-subtle)] rounded-md transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-main)] border-b border-[var(--border-color)] px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-xs font-mono uppercase tracking-wider py-2 transition-colors ${
                  isActive
                    ? 'text-[var(--accent)] font-semibold pl-2 border-l-2 border-[var(--accent)]'
                    : 'text-[var(--text-main)] hover:text-[var(--accent)]'
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
