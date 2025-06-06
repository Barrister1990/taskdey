import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://taskdey.com'),
  title: {
    default: "Taskdey - Trusted Vocational Services, On Demand in Ghana",
    template: "%s | Taskdey - Professional Services Marketplace"
  },
  description: "Find verified local workers in Ghana for all your service needs. Professional electricians, plumbers, tailors, mechanics, and more. Free to use, secure payments, and instant booking.",
  keywords: [
    "vocational services Ghana",
    "skilled workers Ghana",
    "home services Accra",
    "find electrician Ghana",
    "plumber near me Ghana",
    "handyman services Ghana",
    "local workers Ghana",
    "service marketplace Ghana",
    "on-demand services Ghana",
    "professional services Ghana",
    "home maintenance Ghana",
    "skilled labor Ghana",
    "service booking app Ghana",
    "verified workers Ghana",
    "mobile money payments Ghana"
  ],
  authors: [{ name: "Taskdey Team", url: "https://taskdey.com/about" }],
  creator: "Taskdey",
  publisher: "Taskdey",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  applicationName: "Taskdey",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://taskdey.com',
    siteName: 'Taskdey',
    title: 'Taskdey - Professional Service Marketplace in Ghana',
    description: 'Find verified local workers in Ghana. Book skilled professionals for all your service needs. Free app, secure payments, instant booking.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Taskdey App Preview',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taskdey - Find Local Service Professionals in Ghana',
    description: 'Connect with verified local workers in Ghana. Book skilled professionals instantly through our free app.',
    images: ['/images/twitter-image.jpg'],
    creator: '@taskdey',
    site: '@taskdey',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://taskdey.com',
    languages: {
      'en-GH': 'https://taskdey.com',
    },
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Taskdey" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}