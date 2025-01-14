import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "IShowSpeed World Travel Map | Countries Visited Tracker",
    template: "%s | IShowSpeed Travel Map"
  },
  description: "Interactive map tracking IShowSpeed's global adventures. Explore countries visited, watch travel vlogs, and see upcoming destinations. Features chronological view and video links.",
  keywords: [
    "IShowSpeed",
    "Speed",
    "Darren Watkins Jr",
    "travel map",
    "IShowSpeed travels",
    "Speed world tour",
    "countries visited",
    "Speed vlogs",
    "travel videos",
    "Speed international",
    "world exploration"
  ],
  creator: "IShowSpeed Travel Tracker",
  publisher: "IShowSpeed Travel Tracker",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "IShowSpeed World Travel Map | Countries Visited Tracker",
    description: "Explore IShowSpeed's global adventures with this interactive map. Watch country-specific vlogs, track visit dates, and discover upcoming destinations.",
    url: "https://ishowspeedtracker.com/",
    siteName: "IShowSpeed Travel Map",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IShowSpeed World Travel Map - Interactive Country Tracker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IShowSpeed World Travel Map | Countries Visited Tracker",
    description: "Explore IShowSpeed's global adventures with this interactive map. Watch country-specific vlogs, track visit dates, and discover upcoming destinations.",
    creator: "@IShowSpeed",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  alternates: {
    canonical: "https://ishowspeedtracker.com/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  manifest: "/site.webmanifest",
  category: "entertainment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <Script
  strategy="afterInteractive"
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
/>
<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
    `,
  }}
/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}