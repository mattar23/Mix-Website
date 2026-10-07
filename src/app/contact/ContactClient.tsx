'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ARTIST_INFO } from '@/data/bio';
import { SERVICES } from '@/data/services';

function ContactForm() {
  const searchParams = useSearchParams();
  // Old deep links (production, sound-design, restoration) and anything
  // unknown fall back to the first service rather than an empty select.
  const requested = searchParams.get('service');
  const known = SERVICES.some((s) => s.id === requested) || requested === 'rental';
  const preset = known && requested ? requested : SERVICES[0].id;

  const [form, setForm] = useState({
    name: '',
    email: '',
    service: preset,
    timeline: '',
    message: '',
  });

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // There is no server behind this site, so the form hands off to the
  // visitor's mail client with everything filled in. Nothing is silently lost.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceName =
      SERVICES.find((s) => s.id === form.service)?.title ?? form.service;

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Enquiry: ${serviceName}`,
      form.timeline ? `Timeline: ${form.timeline}` : '',
      '',
      form.message,
    ]
      .filter(Boolean)
      .join('\n');

    window.location.href = `mailto:${ARTIST_INFO.email}?subject=${encodeURIComponent(
      `${serviceName} enquiry`
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field-pair">
        <label className="field">
          <span className="field__label">Your name</span>
          <input className="field__input" required value={form.name} onChange={set('name')} />
        </label>

        <label className="field">
          <span className="field__label">Email</span>
          <input
            className="field__input"
            type="email"
            required
            value={form.email}
            onChange={set('email')}
          />
        </label>
      </div>

      <div className="field-pair">
        <label className="field">
          <span className="field__label">What do you need</span>
          <select className="field__select" value={form.service} onChange={set('service')}>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
            <option value="rental">Equipment rental</option>
            <option value="other">Something else</option>
          </select>
        </label>

        <label className="field">
          <span className="field__label">Rough timeline</span>
          <input
            className="field__input"
            value={form.timeline}
            onChange={set('timeline')}
            placeholder="e.g. mixing in April"
          />
        </label>
      </div>

      <label className="field">
        <span className="field__label">About the project</span>
        <textarea
          className="field__area"
          required
          value={form.message}
          onChange={set('message')}
          placeholder={
            form.service === 'rental'
              ? 'Which items, how many, and which dates?'
              : 'What are you making, who is it for, and where is it going?'
          }
        />
      </label>

      <button className="btn btn-solid" type="submit">
        Send enquiry
      </button>
      <p className="meta meta-micro quiet" style={{ marginTop: '0.75rem' }}>
        This opens your email app with the details filled in.
      </p>
    </form>
  );
}

export default function ContactClient() {
  return (
    <>
      <section className="wrap step">
        <span className="accent-rule" aria-hidden="true" />
        <h1 className="hero-type" style={{ maxWidth: '12ch' }}>
          Tell me what you are making.
        </h1>
      </section>

      <section className="wrap step-b">
        <div className="doc">
          <div className="doc__margin stack stack-sm">
            <p className="meta">
              <a className="ul-link" href={`mailto:${ARTIST_INFO.email}`}>
                {ARTIST_INFO.email}
              </a>
            </p>
            <p className="meta">{ARTIST_INFO.location}</p>
            {ARTIST_INFO.socials.map((s) => (
              <p className="meta" key={s.name}>
                <a className="ul-link" href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.name}
                </a>
              </p>
            ))}
          </div>

          <div style={{ maxWidth: '44rem' }}>
            <p className="prose" style={{ marginBottom: '3rem' }}>
              Mixing, podcast and voiceover work, or equipment rental in Jeddah. A
              sentence about the project is enough to start.
            </p>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
