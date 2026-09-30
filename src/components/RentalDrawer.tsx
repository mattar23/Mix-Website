'use client';

import React, { useEffect, useState } from 'react';
import { useRental } from './RentalContext';
import { RENTAL_TERMS } from '@/data/equipment';
import { ARTIST_INFO } from '@/data/bio';

export function RentalDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    updatePeriod,
    totalCostSAR,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
  } = useRental();

  const [name, setName] = useState('');
  const [dates, setDates] = useState('');

  useEffect(() => {
    if (!isCartDrawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCartDrawerOpen, setIsCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  // No backend here, so the enquiry opens a pre-filled email rather than
  // pretending to send. What the visitor sees is what Maryam receives.
  const composeMail = () => {
    const lines = cart.map(
      (ci) =>
        `- ${ci.item.brand} ${ci.item.name} x${ci.quantity} (${ci.rentalPeriod === 'week' ? 'weekly' : 'daily'}), ${
          (ci.rentalPeriod === 'week' ? ci.item.weekRateSAR : ci.item.dayRateSAR) * ci.quantity
        } SAR`
    );
    const body = [
      name ? `Name: ${name}` : '',
      dates ? `Dates: ${dates}` : '',
      '',
      'Equipment:',
      ...lines,
      '',
      `Estimated total: ${totalCostSAR} SAR`,
    ]
      .filter(Boolean)
      .join('\n');

    return `mailto:${ARTIST_INFO.email}?subject=${encodeURIComponent(
      'Equipment enquiry'
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="drawer" role="dialog" aria-modal="true" aria-label="Equipment enquiry">
      <div className="drawer__veil" onClick={() => setIsCartDrawerOpen(false)} />

      <div className="drawer__panel">
        <div className="drawer__head">
          <h2 style={{ fontSize: '1.0625rem', fontStretch: '110%' }}>Equipment enquiry</h2>
          <button className="toolbtn" onClick={() => setIsCartDrawerOpen(false)}>
            Close
          </button>
        </div>

        <div className="drawer__body">
          {cart.length === 0 ? (
            <p className="prose prose-fine" style={{ maxWidth: 'none' }}>
              Nothing selected yet. Add gear from the rate sheet and it will collect
              here as a list you can send over.
            </p>
          ) : (
            <>
              <div>
                {cart.map((ci) => {
                  const rate =
                    ci.rentalPeriod === 'week' ? ci.item.weekRateSAR : ci.item.dayRateSAR;
                  return (
                    <div className="line" key={ci.item.id}>
                      <span style={{ fontWeight: 500, letterSpacing: '-0.012em' }}>
                        {ci.item.name}
                      </span>
                      <span className="num">{rate * ci.quantity} SAR</span>

                      <div className="cluster">
                        <span className="qty">
                          <button
                            onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                            aria-label={`Fewer ${ci.item.name}`}
                          >
                            −
                          </button>
                          <span className="qty__n">{ci.quantity}</span>
                          <button
                            onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                            aria-label={`More ${ci.item.name}`}
                            disabled={ci.quantity >= ci.item.quantity}
                          >
                            +
                          </button>
                        </span>

                        <button
                          className="chip"
                          aria-pressed={ci.rentalPeriod === 'day'}
                          onClick={() => updatePeriod(ci.item.id, 'day')}
                        >
                          Day
                        </button>
                        <button
                          className="chip"
                          aria-pressed={ci.rentalPeriod === 'week'}
                          onClick={() => updatePeriod(ci.item.id, 'week')}
                        >
                          Week
                        </button>
                      </div>

                      <button
                        className="meta ul-link"
                        style={{ justifySelf: 'end' }}
                        onClick={() => removeFromCart(ci.item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="split" style={{ paddingTop: '1.4rem' }}>
                <span className="meta">Estimated total</span>
                <span className="num" style={{ fontSize: '1.3125rem' }}>
                  {totalCostSAR} SAR
                </span>
              </div>

              <div style={{ paddingTop: '2rem' }}>
                <label className="field">
                  <span className="field__label">Your name</span>
                  <input
                    className="field__input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className="field">
                  <span className="field__label">Dates you need it</span>
                  <input
                    className="field__input"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    placeholder="e.g. 4 to 8 March"
                  />
                </label>
              </div>

              <p className="meta meta-micro quiet" style={{ marginTop: '1rem' }}>
                {RENTAL_TERMS.deposit}
              </p>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer__foot">
            <a className="btn btn-solid" href={composeMail()} style={{ width: '100%', textAlign: 'center' }}>
              Send this enquiry
            </a>
            <p className="meta meta-micro quiet" style={{ marginTop: '0.75rem' }}>
              Opens your email app with the list filled in.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
