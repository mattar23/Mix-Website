'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRental } from './RentalContext';

const LINKS = [
  { name: 'About', href: '/about' },
  { name: 'Work', href: '/work' },
  { name: 'Services', href: '/services' },
  { name: 'Equipment', href: '/equipment' },
  { name: 'Contact', href: '/contact' },
];

export function Masthead() {
  const pathname = usePathname();
  const { totalItems, setIsCartDrawerOpen } = useRental();
  const [open, setOpen] = useState(false);

  const links = LINKS.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className="navlink"
      aria-current={pathname === link.href ? 'page' : undefined}
      onClick={() => setOpen(false)}
    >
      {link.name}
    </Link>
  ));

  return (
    <header className="masthead">
      <div className="wrap">
        <div className="masthead__bar">
          <Link href="/" className="masthead__name" onClick={() => setOpen(false)}>
            Maryam Attar
          </Link>

          <nav className="masthead__nav" aria-label="Pages">
            {links}
          </nav>

          <div className="masthead__tools">
            <button className="toolbtn" onClick={() => setIsCartDrawerOpen(true)}>
              Enquiry{' '}
              {totalItems > 0 && <span className="toolbtn__count">{totalItems}</span>}
            </button>

            <button
              className="toolbtn masthead__menu"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {open && (
          <nav className="masthead__nav masthead__nav-open" aria-label="Pages">
            {links}
          </nav>
        )}
      </div>
    </header>
  );
}
