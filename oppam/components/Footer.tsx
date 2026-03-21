"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full mt-20 bg-surface-container-low border-t border-outline-variant/40">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Brand & Copyright */}
          <div className="text-center md:text-left space-y-3">
            <Link href="/" className="font-headline font-black text-primary text-2xl inline-block">
              {t.brand}
            </Link>
            <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed">
              {t.home.heroSubtitle}
            </p>
            <p className="text-xs text-on-surface-variant pt-2 opacity-60">
              {t.footer.copyright}
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface">Navigation</h4>
              <ul className="space-y-3 text-sm text-on-surface-variant">
                <li><Link href="/" className="hover:text-primary transition-colors">{t.nav.home}</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">{t.nav.about}</Link></li>
                <li><Link href="/track" className="hover:text-primary transition-colors">Track Complaint</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">{t.footer.privacy}</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">{t.footer.terms}</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
