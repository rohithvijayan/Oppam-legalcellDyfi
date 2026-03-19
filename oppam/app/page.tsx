"use client";

import ComplaintForm from "@/components/ComplaintForm";
import { useLanguage } from "@/components/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen">
      {/* Responsive Full-Screen Background Image */}
      {/* Mobile View */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: "url('/heromobilebg.webp')" }}
      />
      {/* Desktop View */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{ backgroundImage: "url('/heroBg.webp')" }}
      />
      {/* The Wash: Dark Overlay */}
      <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-[2px]" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 py-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left: Hero */}
          <div className="lg:col-span-6 space-y-8 lg:sticky lg:top-28 text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 rounded-full border border-primary/40">
              <span className="material-symbols-outlined text-primary-container text-sm">verified_user</span>
              <span className="text-xs font-bold text-white uppercase tracking-wide">AILU · DYFI</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-6xl md:text-7xl lg:text-[5rem] font-[800] font-headline text-white leading-[1] tracking-tighter drop-shadow-2xl">
                {t.home.heroTitle}
              </h1>
              <div className="h-2 w-32 bg-gradient-to-r from-primary to-transparent mt-6 rounded-full" />
            </div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-md drop-shadow-md">
              {t.home.heroSubtitle}
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 pt-2">
              {[
                { icon: "lock", label: "End-to-End Encrypted" },
                { icon: "gavel", label: "Legally Backed" },
                { icon: "visibility_off", label: "Confidential" },
              ].map((item) => (
                <div key={item.icon} className="flex items-center gap-2 text-sm text-white/70">
                  <span className="material-symbols-outlined text-primary text-base">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Brand tag */}
            <div className="flex items-center gap-3 pt-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-md">
                <span className="text-white font-headline font-black text-lg">ഒ</span>
              </div>
              <div>
                <p className="font-headline font-black text-white text-lg leading-none">{t.brand}</p>
                <p className="text-xs text-white/60">{t.brandTagline}</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-6">
            <ComplaintForm />
          </div>
        </div>
      </div>
    </div>
  );
}
