'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ARTIST_INFO } from '@/data/bio';
import { SERVICES } from '@/data/services';
import { siteConfig } from '@/config/site';

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

  // Sending straight from the page needs a form service, since the site has
  // no server. With a key set the form posts to it; without one it falls back
  // to opening the visitor's mail client. See DEPLOY.md.
  const direct = Boolean(siteConfig.formKey);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    // A message set by the blank check below must not outlive the fix.
    e.target.setCustomValidity('');
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Every field is required. The browser already stops an empty one; this
    // also stops one that holds only spaces.
    const fields = Array.from(e.currentTarget.elements).filter(
      (el): el is HTMLInputElement | HTMLTextAreaElement =>
        el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement
    );
    for (const field of fields) {
      if (field.value.trim() === '') {
        field.setCustomValidity('Please fill in this field.');
        field.reportValidity();
        return;
      }
    }
    const serviceName =
      SERVICES.find((s) => s.id === form.service)?.title ?? form.service;

    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Enquiry: ${serviceName}`,
      `Timeline: ${form.timeline.trim()}`,
      '',
      form.message.trim(),
    ].join('\n');

    const mailto = `mailto:${ARTIST_INFO.email}?subject=${encodeURIComponent(
      `${serviceName} enquiry`
    )}&body=${encodeURIComponent(body)}`;

    if (!direct) {
      window.location.href = mailto;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: siteConfig.formKey,
          subject: `${serviceName} enquiry from ${form.name.trim()}`,
          from_name: 'maryamattar.co',
          name: form.name.trim(),
          email: form.email.trim(),
          enquiry: serviceName,
          timeline: form.timeline.trim(),
          message: form.message.trim(),
        }),
      });
      const data: { success?: boolean } = await res.json();
      setStatus(data.success ? 'sent' : 'failed');
    } catch {
      setStatus('failed');
    }
  };

  if (status === 'sent') {
    return (
      <p className="prose" role="status">
        Thank you, {form.name.trim()}. Your enquiry has been sent, and Maryam will reply to{' '}
        {form.email.trim()}.
      </p>
    );
  }

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
          <select
            className="field__select"
            required
            value={form.service}
            onChange={set('service')}
          >
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
            required
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

      <p className="cluster cluster-lg">
        <button className="btn btn-solid" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending' : 'Send enquiry'}
        </button>
        <span className="meta meta-micro quiet" role="status">
          {status === 'failed' ? (
            <>
              The enquiry could not be sent. Please try again, or write to{' '}
              <a className="ul-link" href={`mailto:${ARTIST_INFO.email}`}>
                {ARTIST_INFO.email}
              </a>
              .
            </>
          ) : direct ? (
            'All fields are required.'
          ) : (
            'All fields are required. This opens your email app with the details filled in.'
          )}
        </span>
      </p>
    </form>
  );
}

export default function ContactClient() {
  return (
    <>
      <section className="wrap step-t" style={{ paddingBottom: '1.75rem' }}>
        <h1 className="hero-type">Tell me what you are making</h1>
        <span className="accent-rule" aria-hidden="true" />
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
          </div>

          <div style={{ maxWidth: '44rem' }}>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
