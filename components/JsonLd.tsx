"use client";

import {
  FAQPage,
  LocalBusiness,
  Organization,
  SoftwareApplication,
  WebSite,
  WithContext,
} from "schema-dts";

export function JsonLd() {
  const organizationData: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Taskdey",
    url: "https://taskdey.com",
    logo: "https://taskdey.com/logo.png",
    description:
      "Connect with verified local workers in Ghana for professional vocational services.",
    slogan: "Trusted Vocational Services, On Demand",
    foundingDate: "2023",
    address: {
      "@type": "PostalAddress",
      addressCountry: "GH",
      addressLocality: "Accra",
      addressRegion: "Greater Accra",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["en"],
      areaServed: "GH",
      url: "https://taskdey.com/contact",
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
    description:
      "Find and book verified local service professionals in Ghana. Electricians, plumbers, carpenters, mechanics, and more.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://taskdey.com/services?q={search_term_string}",
      },
    },
  };

  const localBusinessData: WithContext<LocalBusiness> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Taskdey",
    image: "https://taskdey.com/logo.png",
    url: "https://taskdey.com",
    description:
      "Ghana's leading marketplace for hiring verified vocational service providers — electricians, plumbers, carpenters, mechanics, tailors, painters, masons, and cleaners.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Accra",
      addressRegion: "Greater Accra",
      addressCountry: "GH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 5.6037,
      longitude: -0.187,
    },
    areaServed: {
      "@type": "Country",
      name: "Ghana",
    },
    priceRange: "Free",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Vocational Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrician Services", description: "Professional electrical installations, repairs, and maintenance in Ghana" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Plumbing Services", description: "Expert plumbing services for homes and businesses in Ghana" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Carpentry Services", description: "Custom furniture and woodwork services in Ghana" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mechanic Services", description: "Vehicle repair and maintenance services in Ghana" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tailoring Services", description: "Custom clothing alterations and designs in Ghana" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Painting Services", description: "Interior and exterior painting services in Ghana" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Masonry Services", description: "Quality construction and building services in Ghana" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cleaning Services", description: "Professional home and office cleaning in Ghana" } },
      ],
    },
  };

  const appData: WithContext<SoftwareApplication> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Taskdey",
    operatingSystem: "Android",
    applicationCategory: "LifestyleApplication",
    description:
      "Find and book verified service professionals in Ghana. Free app with secure payments and instant booking.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GHS",
    },
    downloadUrl:
      "https://play.google.com/store/apps/details?id=com.barrister1990.joymish",
  };

  const faqData: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I book a service on Taskdey?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply download the Taskdey app, browse available workers, and book instantly with our easy-to-use interface.",
        },
      },
      {
        "@type": "Question",
        name: "Are the workers on Taskdey verified?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all workers undergo thorough background checks and skill verification before joining our platform.",
        },
      },
      {
        "@type": "Question",
        name: "What payment methods does Taskdey accept?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We accept Mobile Money (MTN, Vodafone, AirtelTigo) and major credit/debit cards.",
        },
      },
      {
        "@type": "Question",
        name: "How do I join Taskdey as a worker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Download the app, complete your profile, verify your skills, and start receiving job requests.",
        },
      },
      {
        "@type": "Question",
        name: "How much can workers earn on Taskdey?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Earnings vary by skill and experience. Many workers earn \u20B52,000\u20135,000 monthly working flexible hours.",
        },
      },
      {
        "@type": "Question",
        name: "When do workers get paid on Taskdey?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Payments are processed immediately after job completion and transferred to your account within 24 hours.",
        },
      },
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}
