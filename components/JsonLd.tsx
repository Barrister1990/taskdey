"use client";

import { Organization, WebSite, SoftwareApplication, WithContext } from "schema-dts";

export function JsonLd() {
  const organizationData: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Taskdey",
    url: "https://taskdey.com",
    logo: "https://taskdey.com/images/logo.png",
    description: "Connect with verified local workers in Ghana for professional vocational services.",
    slogan: "Trusted Vocational Services, On Demand",
    foundingDate: "2023",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Ghana",
      addressLocality: "Accra",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+233-123-456-789",
      contactType: "customer service",
      availableLanguage: ["en"],
      areaServed: "GH",
    },
    sameAs: [
      "https://facebook.com/taskdey",
      "https://twitter.com/taskdey",
      "https://instagram.com/taskdey",
    ],
  };

  const websiteData: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Taskdey",
    url: "https://taskdey.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://taskdey.com/services?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const appData: WithContext<SoftwareApplication> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Taskdey",
    operatingSystem: "Android",
    applicationCategory: "ServiceApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GHS",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "15000",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appData) }}
      />
    </>
  );
}