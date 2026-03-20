import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FacebookPixel from "@/components/FacebookPixel";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: "ഒപ്പം | Oppam - Cyber Neethi Support Portal",
    template: "%s | Oppam",
  },
  description:
    "ഒപ്പം (Oppam) - Free legal support portal for cybercrime victims in Kerala. Report cyber abuse, sexual harassment, and communal threats confidentially.",
  keywords: [
    "cyber crime complaint kerala",
    "സൈബർ ക്രൈം പരാതി",
    "free legal aid kerala",
    "സൗജന്യ നിയമസഹായം",
    "ഒപ്പം",
    "oppam legal aid",
    "legal aid platform",
    "cyber harassment complaint",
  ],
  authors: [{ name: "Oppam Legal Aid" }],
  creator: "Oppam Legal Aid",
  publisher: "Oppam Legal Aid",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://oppam.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ml_IN",
    alternateLocale: ["en_IN"],
    url: "https://oppam.online",
    siteName: "ഒപ്പം | Oppam",
    title: "ഒപ്പം - Oppam Cyber Legal Aid",
    description: "Secure, confidential portal to report cybercrimes in Kerala.",
    images: [
      {
        url: "/heroBg.webp",
        width: 1200,
        height: 630,
        alt: "Oppam Legal Aid Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ഒപ്പം | Oppam - Cyber Neethi Support Portal",
    description: "Free legal support for cybercrime victims in Kerala.",
    images: ["/heroBg.webp"],
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
  category: "Legal",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ml">
      <head>
        <meta name="theme-color" content="#cf0000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anek+Malayalam:wght@100..800&family=Noto+Sans+Malayalam:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&family=Material+Symbols+Outlined:wght@100..700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              "name": "Oppam Legal Cell",
              "description": "Free legal support for cybercrime victims in Kerala.",
              "url": "https://oppam.online",
              "logo": "https://oppam.online/favicon.ico",
              "areaServed": { "@type": "State", name: "Kerala" },
              "availableLanguage": ["Malayalam", "English"],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kannur",
                "addressRegion": "Kerala",
                "addressCountry": "IN"
              }
            }),
          }}
        />
        <Suspense fallback={null}>
          <FacebookPixel />
          <GoogleAnalytics />
        </Suspense>
      </head>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
