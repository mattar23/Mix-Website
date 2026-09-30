'use client';

import React, { useMemo, useState } from 'react';
import { EQUIPMENT_INVENTORY, RENTAL_TERMS } from '@/data/equipment';
import { useRental } from '@/components/RentalContext';

const CATEGORIES = [
  'All',
  'Microphones',
  'Recording & Interfaces',
  'DI Boxes & Signal',
  'Guitar Pedals & FX',
  'Amplifiers',
  'Cables & Accessories',
];

const TERMS: { label: string; body: string }[] = [
  { label: 'Rates', body: RENTAL_TERMS.periods },
  { label: 'Collection', body: RENTAL_TERMS.pickupDelivery },
  { label: 'Deposit', body: RENTAL_TERMS.deposit },
  { label: 'Condition', body: RENTAL_TERMS.conditionTesting },
];

export default function EquipmentClient() {
  const { addToCart } = useRental();
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EQUIPMENT_INVENTORY.filter((item) => {
      const inCategory = category === 'All' || item.category === category;
      const matches =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return inCategory && matches;
    });
  }, [category, query]);

  // Group so the sheet reads like a printed inventory, not a flat dump.
  const groups = useMemo(() => {
    const map = new Map<string, typeof EQUIPMENT_INVENTORY>();
    rows.forEach((item) => {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    });
    return [...map.entries()];
  }, [rows]);

  return (
    <>
      <section className="wrap step">
        <h1 className="hero-type" style={{ maxWidth: '13ch' }}>
          Equipment for hire
        </h1>
        <div className="doc" style={{ marginTop: 'clamp(2rem, 5vw, 4rem)' }}>
          <p className="meta doc__margin">Jeddah</p>
          <p className="prose">
            Everything here is gear Maryam records with. Rates are per item, in Saudi
            riyals. A week costs the same as three days.
          </p>
        </div>
      </section>

      <section className="wrap step-b">
        <div className="cluster" style={{ marginBottom: '1.5rem' }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className="chip"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <label className="field" style={{ maxWidth: '22rem' }}>
          <span className="sr-only">Search equipment</span>
          <input
            className="field__input"
            type="search"
            placeholder="Search by name or brand"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        {groups.length === 0 && (
          <p className="prose" style={{ paddingTop: '2rem' }}>
            Nothing matches that. Try a brand name, or clear the search.
          </p>
        )}

        {groups.map(([groupName, items]) => (
          <table className="sheet" role="table" key={groupName} style={{ marginTop: '3rem' }}>
            <caption>{groupName}</caption>
            <thead role="rowgroup">
              <tr role="row">
                <th role="columnheader" scope="col">Item</th>
                <th role="columnheader" scope="col" style={{ textAlign: 'right' }}>
                  Day
                </th>
                <th role="columnheader" scope="col" style={{ textAlign: 'right' }}>
                  Week
                </th>
                <th role="columnheader" scope="col">
                  <span className="sr-only">Add to enquiry</span>
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              {items.map((item) => (
                <tr role="row" key={item.id}>
                  <td role="cell">
                    <span className="sheet__name">{item.name}</span>
                    <span className="sheet__stock" style={{ display: 'block' }}>
                      {item.brand} · {item.quantity} available
                    </span>
                  </td>
                  <td role="cell" className="sheet__rate">{item.dayRateSAR}</td>
                  <td role="cell" className="sheet__rate">{item.weekRateSAR}</td>
                  <td role="cell" className="sheet__act">
                    <button
                      className="btn btn-sm"
                      onClick={() => addToCart(item, 'day')}
                    >
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </section>

      <section className="wrap step-b">
        <hr className="rule" />
        <div className="doc" style={{ paddingTop: '2.5rem' }}>
          <p className="meta doc__margin">Terms</p>
          <dl className="two-col">
            {TERMS.map((t) => (
              <div key={t.label}>
                <dt className="meta">{t.label}</dt>
                <dd className="prose prose-fine" style={{ marginTop: '0.35rem' }}>
                  {t.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
