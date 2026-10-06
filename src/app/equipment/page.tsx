import { Metadata } from 'next';
import Link from 'next/link';
import { EQUIPMENT_INVENTORY, RENTAL_TERMS } from '@/data/equipment';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Audio equipment rental in Jeddah',
  description:
    'Microphones, recorders, DI boxes, pedals, and amplifiers for hire in Jeddah, Saudi Arabia. Shure SM7B and SM57, Tascam Model 12, Cloudlifter, Radial. Day and week rates in riyals, terms published in full.',
  alternates: { canonical: `${siteConfig.url}/equipment` },
  openGraph: {
    title: 'Audio equipment rental in Jeddah | Maryam Attar',
    description: 'Studio and field recording gear for hire in Jeddah, with day and week rates.',
    url: `${siteConfig.url}/equipment`,
    images: [
      {
        url: `${siteConfig.url}/images/aesthetic/equipment-flightcase.jpg`,
        width: 1200,
        height: 630,
        alt: 'Audio equipment ready for hire in Jeddah',
      },
    ],
  },
};

const ORDER = [
  'Microphones',
  'Recording & Interfaces',
  'DI Boxes & Signal',
  'Guitar Pedals & FX',
  'Amplifiers',
  'Cables & Accessories',
] as const;

export default function EquipmentPage() {
  const groups = ORDER.map((category) => ({
    category,
    items: EQUIPMENT_INVENTORY.filter((item) => item.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <section className="wrap step">
        <span className="accent-rule" aria-hidden="true" />
        <h1 className="hero-type" style={{ maxWidth: '13ch' }}>
          Equipment for hire
        </h1>
        <div className="doc" style={{ marginTop: 'clamp(2rem, 5vw, 4rem)' }}>
          <p className="meta doc__margin">Jeddah</p>
          <p className="prose">
            Gear Maryam records with, available to hire in Jeddah. Rates are per
            item, in Saudi riyals. A week costs the same as three days.
          </p>
        </div>
      </section>

      <section className="wrap step-b">
        {groups.map(({ category, items }) => (
          <table className="sheet" key={category}>
            <caption>{category}</caption>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col" className="sheet__rate">Day</th>
                <th scope="col" className="sheet__rate">Week</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="sheet__name">
                      {item.brand} {item.name}
                    </span>
                    <span className="sheet__stock">{item.quantity} available</span>
                  </td>
                  <td className="sheet__rate">{item.dayRateSAR}</td>
                  <td className="sheet__rate">{item.weekRateSAR}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </section>

      <section className="wrap step-b">
        <hr className="rule" />
        <div className="doc" style={{ paddingTop: '2.5rem' }}>
          <p className="meta doc__margin">Hire</p>
          <div className="stack stack-lg">
            <p className="prose">
              Tell us which items and which dates, and we will confirm availability,
              the deposit, and a collection time.
            </p>
            <Link className="btn btn-solid" href="/contact?service=rental">
              Enquire about hire
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap step-b" id="terms" style={{ scrollMarginTop: '6rem' }}>
        <hr className="rule" />
        <div className="doc" style={{ paddingTop: '2.5rem' }}>
          <p className="meta doc__margin">Terms</p>
          <div style={{ maxWidth: '44rem' }}>
            <p className="prose" style={{ marginBottom: '2rem' }}>
              The terms are summarised here. The full agreement is signed at handover.
            </p>
            <ol className="terms">
              {RENTAL_TERMS.map((t) => (
                <li key={t.heading}>
                  <p className="meta">{t.heading}</p>
                  <p className="prose prose-fine" style={{ marginTop: '0.35rem' }}>
                    {t.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
