"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full mt-20 bg-surface-container-low border-t border-outline-variant/40">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="font-headline font-black text-primary text-xl">{t.brand}</span>
          <p className="text-xs text-on-surface-variant mt-1">{t.footer.copyright}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">{t.footer.privacy}</Link>
          <Link href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">{t.footer.terms}</Link>
          <Link href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">{t.footer.contact}</Link>
        </div>
      </div>
    </footer>
  );
}
