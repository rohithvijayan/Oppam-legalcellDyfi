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
          <div className="lg:col-span-6 space-y-8 lg:sticky lg:top-28 text-white flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-primary/20 rounded-full border border-primary/40">
              <span className="material-symbols-outlined text-primary-container text-sm">verified_user</span>
              <span className="text-xs font-bold text-white uppercase tracking-wide">Secure Platform</span>
            </div>

            {/* Title */}
            <div className="flex flex-col items-center lg:items-start w-full">
              <h1 className="text-[4.7rem] md:text-[5.6rem] lg:text-[6.25rem] font-[900] font-headline text-white leading-[1] tracking-tighter drop-shadow-2xl">
                {t.home.heroTitle}
              </h1>
              <div className="h-2 w-32 bg-gradient-to-r from-transparent via-primary to-transparent lg:from-primary lg:to-transparent mt-6 rounded-full" />
            </div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-md drop-shadow-md">
              {t.home.heroSubtitle}
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
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

            {/* Track CTA */}
            <div className="pt-2 w-full flex justify-center lg:justify-start">
              <a
                href="/track"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white/70 hover:text-white text-sm font-semibold backdrop-blur-xl transition-all group"
              >
                <span className="material-symbols-outlined text-base text-primary group-hover:scale-110 transition-transform">manage_search</span>
                Already submitted? Track your complaint
                <span className="material-symbols-outlined text-sm opacity-50">arrow_forward</span>
              </a>
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
