import React from 'react';
import { siteConfig } from '@/config/site';
import { EQUIPMENT_INVENTORY } from '@/data/equipment';
import { SERVICES } from '@/data/services';

export function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Maryam Attar',
    alternateName: 'مريم عطار',
    jobTitle: 'Audio Engineer, Music Producer & Sound Designer',
    url: siteConfig.url,
    image: `${siteConfig.url}/images/maryam-studio-portrait.jpg`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jeddah',
      addressRegion: 'Makkah Province',
      addressCountry: 'SA',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Berklee College of Music',
        award: 'BA Interdisciplinary Music Studies (Dean’s List, GPA 4.0)',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'University of Westminster',
        award: 'DipHE Cognitive & Clinical Neuroscience',
      },
    ],
    knowsAbout: [
      'Music Production',
      'Audio Engineering',
      'Analog Mixing',
      'Sound Design',
      'Audio Restoration',
      'Scoring for Visuals',
    ],
    sameAs: [
      siteConfig.socials.instagram,
      siteConfig.socials.soundcloud,
      siteConfig.socials.linkedin,
    ],
  };

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Maryam Attar Studio & Equipment Hire',
    image: `${siteConfig.url}/images/aesthetic/equipment-flightcase.jpg`,
    '@id': `${siteConfig.url}/#business`,
    url: siteConfig.url,
    telephone: '+966 55 422 4024',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jeddah',
      addressCountry: 'SA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 21.5433,
      longitude: 39.1728,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Jeddah',
      },
      {
        '@type': 'Country',
        name: 'Saudi Arabia',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Worldwide (Remote Audio Sessions)',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Audio Production & Gear Hire Services',
      itemListElement: [
        ...SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            description: s.shortDesc,
          },
        })),
        {
          '@type': 'OfferCatalog',
          name: 'Equipment Rental Catalog',
          itemListElement: EQUIPMENT_INVENTORY.slice(0, 10).map((gear) => ({
            '@type': 'Offer',
            priceCurrency: 'SAR',
            price: gear.dayRateSAR,
            name: gear.name,
            description: gear.description,
            itemOffered: {
              '@type': 'Product',
              name: gear.name,
              brand: {
                '@type': 'Brand',
                name: gear.brand,
              },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
    </>
  );
}
