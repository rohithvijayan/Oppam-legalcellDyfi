import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  openGraph: {
    type: "website",
    locale: "ml_IN",
    alternateLocale: ["en_IN"],
    siteName: "ഒപ്പം | Oppam",
    title: "ഒപ്പം - Cyber Neethi Support Portal",
    description:
      "File a confidential cybercrime complaint online. Free legal support for victims of cyber abuse, sexual harassment, and communal threats.",
  },
  robots: {
    index: true,
    follow: true,
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
              name: "ഒപ്പം - Oppam Legal Aid",
              description:
                "Free legal support for cybercrime victims in Kerala.",
              areaServed: { "@type": "State", name: "Kerala" },
              availableLanguage: ["Malayalam", "English"],
              sameAs: [],
            }),
          }}
        />
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
