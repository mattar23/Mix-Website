import React from 'react';
import { siteConfig } from '@/config/site';
import { EQUIPMENT_INVENTORY } from '@/data/equipment';
import { SERVICES } from '@/data/services';

// Two graphs: the person, and the practice as a local business with its
// services and hire catalogue. Nothing here is stated that the pages do
// not also show, which is what keeps it honest for search engines.
export function JsonLd() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: 'Maryam Attar',
    alternateName: 'مريم عطار',
    jobTitle: siteConfig.author.role,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    email: siteConfig.author.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jeddah',
      addressRegion: 'Makkah Province',
      addressCountry: 'SA',
    },
    knowsAbout: [
      'Mixing',
      'Podcast and voiceover mixing',
      'Audio engineering',
      'Audio equipment hire',
    ],
    knowsLanguage: ['en', 'ar'],
    sameAs: Object.values(siteConfig.socials),
  };

  const business = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/#business`,
    name: 'Maryam Attar, Mixing, Voiceover and Equipment Hire',
    url: siteConfig.url,
    image: `${siteConfig.url}/images/aesthetic/equipment-flightcase.jpg`,
    email: siteConfig.author.email,
    founder: { '@id': `${siteConfig.url}/#person` },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jeddah',
      addressCountry: 'SA',
    },
    areaServed: [
      ...siteConfig.areaServed.map((name) => ({ '@type': 'Country', name })),
      { '@type': 'AdministrativeArea', name: 'Remote sessions worldwide' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services and equipment hire',
      itemListElement: [
        ...SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            serviceType: s.title,
            description: s.shortDesc,
            provider: { '@id': `${siteConfig.url}/#business` },
            areaServed: siteConfig.areaServed,
          },
        })),
        {
          '@type': 'OfferCatalog',
          name: 'Equipment hire, Jeddah',
          itemListElement: EQUIPMENT_INVENTORY.map((gear) => ({
            '@type': 'Offer',
            priceCurrency: 'SAR',
            price: gear.dayRateSAR,
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: gear.dayRateSAR,
              priceCurrency: 'SAR',
              unitText: 'DAY',
            },
            availability: 'https://schema.org/InStock',
            itemOffered: {
              '@type': 'Product',
              name: `${gear.brand} ${gear.name}`,
              description: gear.description,
              brand: { '@type': 'Brand', name: gear.brand },
            },
          })),
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
    </>
  );
}
