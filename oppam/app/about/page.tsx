"use client";

import { useLanguage } from "@/components/LanguageProvider";
import Link from "next/link";

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;

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

      <main className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 pt-12 pb-24">
        {/* Header */}
        <header className="text-center mb-20 md:mb-24 px-4">
          <h1 className="font-headline text-6xl md:text-8xl font-[800] text-white tracking-tighter mb-6 drop-shadow-2xl leading-[0.9]">
            {a.pageTitle}
          </h1>
          <p className="text-lg md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
            {a.pageSubtitle}
          </p>
          <div className="h-2 w-32 bg-primary mx-auto mt-8 rounded-full shadow-[0_0_20px_rgba(207,0,0,0.4)]" />
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[minmax(300px,auto)]">

          {/* Mission Card – spans 2 cols */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-3xl rounded-2xl p-10 flex flex-col justify-between shadow-2xl border border-white/10 hover:border-white/30 hover:bg-white/15 transition-all duration-300 border-t-8 border-t-primary group">
            <div>
              <span className="text-primary font-[800] tracking-widest text-xs uppercase mb-6 block">{a.mission.label}</span>
              <h2 className="font-headline text-4xl md:text-5xl text-white mb-6 leading-[1.1] font-[800] tracking-tight">{a.mission.title}</h2>
              <p className="text-lg text-white/70 leading-relaxed font-light">{a.mission.body}</p>
            </div>
            <div className="mt-10 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-2xl">gavel</span>
              </div>
              <span className="font-semibold text-white/90 text-sm tracking-wide">{a.mission.footer}</span>
            </div>
          </div>

          {/* Privacy Card – tall, spans 2 rows */}
          <div className="bg-white/10 backdrop-blur-3xl rounded-2xl p-10 flex flex-col items-center justify-center text-center shadow-2xl border border-white/10 hover:border-white/30 hover:bg-white/15 transition-all duration-300 row-span-2 group">
            <div className="relative mb-10">
              <div className="absolute -inset-8 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/30 transition-all" />
              <span className="material-symbols-outlined text-9xl text-primary relative drop-shadow-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                shield_person
              </span>
            </div>
            <h3 className="font-headline text-3xl text-white mb-5 font-[800] tracking-tight">{a.privacy.title}</h3>
            <p className="text-white/60 mb-10 text-sm leading-relaxed max-w-xs">{a.privacy.body}</p>
            <Link
              href="#"
              className="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition-all text-center tracking-wide"
            >
              {a.privacy.button}
            </Link>
          </div>

          {/* Partners Card – wide */}
          <div className="md:col-span-2 bg-white/15 backdrop-blur-3xl rounded-2xl p-10 shadow-2xl border border-white/10 hover:border-white/30 hover:bg-white/20 transition-all duration-300 flex flex-col md:flex-row items-center gap-12 group">
            <div className="flex-1">
              <span className="text-primary font-[800] tracking-widest text-xs uppercase mb-4 block">{a.partners.label}</span>
              <h3 className="font-headline text-4xl text-white mb-4 font-[800] tracking-tight">{a.partners.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm font-light">{a.partners.body}</p>
            </div>
            <div className="flex gap-6 shrink-0">
              <div className="w-28 h-28 rounded-2xl bg-white/5 border border-white/10 shadow-xl flex flex-col items-center justify-center p-5 group-hover:scale-105 transition-transform">
                <span className="text-primary font-[800] text-3xl">AILU</span>
                <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-1 font-bold">Advocates</span>
              </div>
              <div className="w-28 h-28 rounded-2xl bg-primary shadow-2xl flex flex-col items-center justify-center p-5 group-hover:scale-105 transition-transform">
                <span className="text-white font-[800] text-3xl">DYFI</span>
                <span className="text-[10px] text-white/70 uppercase tracking-[0.2em] mt-1 font-bold">Solidarity</span>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-white/10 backdrop-blur-3xl rounded-2xl p-10 shadow-2xl border border-white/10 hover:border-white/30 hover:bg-white/15 transition-all duration-300 flex flex-col justify-between group">
            <span className="material-symbols-outlined text-primary text-5xl mb-6">contact_support</span>
            <div>
              <h4 className="font-[800] text-xl text-white mb-3 tracking-tight">{a.contact.title}</h4>
              <p className="text-sm text-white/60 leading-relaxed">{a.contact.body}</p>
            </div>
            <Link href="/#form" className="text-primary font-[800] text-sm inline-flex items-center gap-2 group/link mt-6 tracking-wide uppercase">
              {a.contact.link}
              <span className="material-symbols-outlined group-hover/link:translate-x-2 transition-transform">arrow_forward</span>
            </Link>
          </div>

          {/* Pro Bono Card */}
          <div className="bg-white/10 backdrop-blur-3xl rounded-2xl p-10 shadow-2xl border border-white/10 hover:border-white/30 hover:bg-white/15 transition-all duration-300 flex flex-col justify-between group">
            <span className="material-symbols-outlined text-primary text-5xl mb-6">volunteer_activism</span>
            <div>
              <h4 className="font-[800] text-xl text-white mb-3 tracking-tight">{a.proSono.title}</h4>
              <p className="text-sm text-white/60 leading-relaxed">{a.proSono.body}</p>
            </div>
            <span className="text-xs font-[800] text-primary uppercase tracking-widest bg-primary/10 py-2 px-4 rounded-full inline-block self-start mt-4">
              {a.proSono.button}
            </span>
          </div>

        </div>
      </main>
    </div>
  );
}
