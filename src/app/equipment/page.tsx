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
        <h1 className="hero-type">Equipment Rental</h1>
        <p className="prose" style={{ marginTop: '1.25rem' }}>
          Gear Maryam records with, available to rent in Jeddah. Rates are per
          item, per day, in Saudi riyals. A week costs the same as three days.
        </p>
      </section>

      {/* One rate per row. The week rate is always three days, so the
          sentence above carries it and the sheet stays a single column of prices. */}
      <section className="wrap step-b">
        <div className="sheets">
          {groups.map(({ category, items }) => (
            <table className="sheet" key={category}>
              <caption>{category}</caption>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <th scope="row" className="sheet__name">
                      {item.brand} {item.name}
                      {item.quantity > 1 && (
                        <span className="sheet__stock"> {item.quantity} available</span>
                      )}
                    </th>
                    <td className="sheet__rate">
                      {item.dayRateSAR} <span className="sheet__unit">SAR / day</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      </section>

      <section className="wrap step-b" id="terms" style={{ scrollMarginTop: '7.5rem' }}>
        <hr className="rule" />
        <div className="split" style={{ paddingTop: '2rem', alignItems: 'center' }}>
          <p className="prose">
            Tell us which items and which dates, and we will confirm availability,
            the deposit, and a collection time.
          </p>
          <Link className="btn btn-solid" href="/contact?service=rental">
            Enquire about rental
          </Link>
        </div>

        <details className="fold">
          <summary>Rental terms</summary>
          <p className="prose prose-fine" style={{ marginTop: '1rem' }}>
            The terms are summarised here. The full agreement is signed at handover.
          </p>
          <ol className="terms">
            {RENTAL_TERMS.map((t) => (
              <li key={t.heading}>
                <p className="margin-head">{t.heading}</p>
                <p className="prose prose-fine" style={{ marginTop: '0.25rem' }}>
                  {t.body}
                </p>
              </li>
            ))}
          </ol>
        </details>
      </section>
    </>
  );
}
