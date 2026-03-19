"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { useState } from "react";

export default function Navbar() {
  const { t, locale, toggleLocale } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <nav className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-headline font-black text-primary transition-opacity group-hover:opacity-80">
              {t.brand}
            </span>
            <span className="hidden sm:inline text-xs uppercase tracking-widest text-on-surface-variant font-label border-l border-outline-variant pl-2 ml-1">
              {t.brandTagline}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-on-surface-variant hover:text-primary font-medium transition-colors">
              {t.nav.home}
            </Link>
            <Link href="/about" className="text-sm text-on-surface-variant hover:text-primary font-medium transition-colors">
              {t.nav.about}
            </Link>
            <Link href="/#form" className="text-sm text-on-surface-variant hover:text-primary font-medium transition-colors">
              {t.nav.legalAid}
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLocale}
              aria-label="Toggle language"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-outline-variant text-xs font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined text-sm" style={{ fontSize: "16px" }}>language</span>
              <span>{locale === "ml" ? "EN" : "മ"}</span>
            </button>

            {/* CTA */}
            <Link
              href="/#form"
              className="hidden sm:inline-flex bg-gradient-to-r from-primary to-primary-container text-on-primary px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 active:scale-95 transition-all"
            >
              {t.nav.getHelp}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-outline-variant/30 px-6 py-4 flex flex-col gap-3">
            <Link href="/" onClick={() => setMobileOpen(false)} className="py-2 text-on-surface-variant font-medium hover:text-primary transition-colors">
              {t.nav.home}
            </Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="py-2 text-on-surface-variant font-medium hover:text-primary transition-colors">
              {t.nav.about}
            </Link>
            <Link href="/#form" onClick={() => setMobileOpen(false)} className="py-2 text-on-surface-variant font-medium hover:text-primary transition-colors">
              {t.nav.legalAid}
            </Link>
            <Link
              href="/#form"
              onClick={() => setMobileOpen(false)}
              className="mt-2 text-center bg-gradient-to-r from-primary to-primary-container text-on-primary px-5 py-3 rounded-full text-sm font-bold"
            >
              {t.nav.getHelp}
            </Link>
          </div>
        )}
      </header>

      {/* Google Material Symbols */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
    </>
  );
}
