"use client";

import { useLanguage } from "@/components/LanguageProvider";
import Link from "next/link";

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <div className="relative min-h-screen">
      {/* Full-Screen Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/heroBg.webp')" }}
      />
      {/* The Wash: Dark Overlay */}
      <div className="fixed inset-0 z-10 bg-black/70 backdrop-blur-[2px]" />

      <main className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 pt-12 pb-24">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4 drop-shadow-2xl">
            {a.pageTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
            {a.pageSubtitle}
          </p>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">

          {/* Mission Card – spans 2 cols */}
          <div className="md:col-span-2 bg-black/30 backdrop-blur-xl rounded-2xl p-8 md:p-10 flex flex-col justify-between shadow-xl border border-white/10 hover:border-primary/50 transition-all duration-300 border-t-4 border-t-primary">
            <div>
              <span className="text-primary font-bold tracking-widest text-xs uppercase mb-5 block">{a.mission.label}</span>
              <h2 className="font-headline text-3xl md:text-4xl text-white mb-5 leading-tight">{a.mission.title}</h2>
              <p className="text-base text-white/70 leading-relaxed">{a.mission.body}</p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shadow-sm border border-primary/30">
                <span className="material-symbols-outlined text-primary">gavel</span>
              </div>
              <span className="font-semibold text-white/90 text-sm">{a.mission.footer}</span>
            </div>
          </div>

          {/* Privacy Card – tall, spans 2 rows */}
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl border border-white/10 hover:border-primary/50 transition-all duration-300 row-span-2">
            <div className="relative mb-8">
              <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full" />
              <span className="material-symbols-outlined text-8xl text-primary relative" style={{ fontVariationSettings: "'FILL' 1" }}>
                shield_person
              </span>
            </div>
            <h3 className="font-headline text-2xl text-white mb-3">{a.privacy.title}</h3>
            <p className="text-white/60 mb-8 text-sm leading-relaxed">{a.privacy.body}</p>
            <Link
              href="#"
              className="w-full py-3 rounded-full border border-white/10 text-white text-sm font-bold hover:bg-white/5 transition-colors text-center"
            >
              {a.privacy.button}
            </Link>
          </div>

          {/* Partners Card – wide */}
          <div className="md:col-span-2 bg-black/40 backdrop-blur-xl rounded-2xl p-8 md:p-10 shadow-xl border border-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">{a.partners.label}</span>
              <h3 className="font-headline text-3xl text-white mb-3">{a.partners.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm">{a.partners.body}</p>
            </div>
            <div className="flex gap-5 shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 shadow-md flex flex-col items-center justify-center p-4">
                <span className="text-primary font-black text-2xl">AILU</span>
                <span className="text-[10px] text-white/40 uppercase tracking-tighter">Advocates</span>
              </div>
              <div className="w-24 h-24 rounded-2xl bg-primary shadow-lg flex flex-col items-center justify-center p-4">
                <span className="text-white font-black text-2xl">DYFI</span>
                <span className="text-[10px] text-white/70 uppercase tracking-tighter">Solidarity</span>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between">
            <span className="material-symbols-outlined text-primary text-4xl">contact_support</span>
            <div>
              <h4 className="font-bold text-lg text-white mb-2">{a.contact.title}</h4>
              <p className="text-sm text-white/60">{a.contact.body}</p>
            </div>
            <Link href="/#form" className="text-primary font-bold text-sm inline-flex items-center gap-2 group mt-4">
              {a.contact.link}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>

          {/* Pro Bono Card */}
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between">
            <span className="material-symbols-outlined text-primary text-4xl">volunteer_activism</span>
            <div>
              <h4 className="font-bold text-lg text-white mb-2">{a.proSono.title}</h4>
              <p className="text-sm text-white/60">{a.proSono.body}</p>
            </div>
            <span className="text-xs font-bold text-primary uppercase">{a.proSono.button}</span>
          </div>

        </div>
      </main>
    </div>
  );
}
