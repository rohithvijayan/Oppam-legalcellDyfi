"use client";

import { useLanguage } from "@/components/LanguageProvider";
import Link from "next/link";

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-24 md:pb-36 px-6 md:px-12 border-b border-primary/10 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/heroBg.webp')" }}
        />
        {/* Dark overlay to fit red-black-white theme and make white text pop */}
        <div className="absolute inset-0 z-10 bg-black/70 backdrop-blur-[2px]"></div>

        <div className="relative z-20 max-w-7xl mx-auto">
          <span className="text-primary font-[800] text-xs md:text-sm tracking-[0.2em] uppercase mb-4 block drop-shadow-md">
            {t.brand}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-[800] text-white font-headline tracking-tight leading-[1.2] drop-shadow-xl break-words">
            {a.pageTitle}
          </h1>
          <div className="mt-8 md:mt-10 h-1.5 md:h-2 w-16 md:w-24 bg-primary drop-shadow-sm rounded-full shadow-[0_0_20px_rgba(207,0,0,0.6)]"></div>
        </div>
      </section>

      {/* Mission & Vision Content */}
      <section className="px-6 md:px-12 py-16 md:py-32 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
        {/* Item 1 */}
        <div className="flex flex-col items-start gap-4 md:gap-6 group">
          <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit">
            <span className="material-symbols-outlined text-primary text-3xl md:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              gavel
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-[800] text-black font-headline leading-tight">
            {a.mission.title}
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed font-light">
            {a.mission.body}
          </p>
        </div>

        {/* Item 2 */}
        <div className="flex flex-col items-start gap-4 md:gap-6 group">
          <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit">
            <span className="material-symbols-outlined text-primary text-3xl md:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              shield
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-[800] text-black font-headline leading-tight">
            {a.privacy.title}
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed font-light">
            {a.privacy.body}
          </p>
        </div>

        {/* Item 3 */}
        <div className="flex flex-col items-start gap-4 md:gap-6 group">
          <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors w-fit">
            <span className="material-symbols-outlined text-primary text-3xl md:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              groups
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-[800] text-black font-headline leading-tight">
            {a.partners.title}
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed font-light">
            {a.partners.body}
          </p>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="px-6 md:px-12 py-16 md:py-32 max-w-7xl mx-auto">
        <div className="bg-black p-8 md:p-20 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-10 md:gap-16 group">
          {/* Decorative glow */}
          <div className="absolute -top-12 -right-12 w-64 md:w-[32rem] h-64 md:h-[32rem] bg-primary/30 rounded-full blur-[80px] md:blur-[120px] group-hover:bg-primary/40 transition-colors pointer-events-none"></div>
          
          <div className="relative z-10 w-full md:w-2/3">
            <h4 className="text-3xl md:text-5xl font-[800] text-white font-headline mb-4 md:mb-6 leading-[1.2] tracking-tight">
              {a.contact.title}
            </h4>
            <p className="text-neutral-300 text-base md:text-xl leading-relaxed mb-0 font-light max-w-xl">
              {a.contact.body}
            </p>
          </div>
          
          <Link href="/form" className="relative z-10 w-full md:w-auto bg-primary text-white font-[800] py-4 md:py-5 px-8 md:px-12 rounded-2xl flex justify-center items-center gap-3 hover:scale-105 active:scale-95 transition-all shrink-0 shadow-[0_15px_40px_rgba(207,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(207,0,0,0.5)] tracking-wide">
            <span className="text-base md:text-lg">{t.nav?.getHelp || "Get Help Now"}</span>
            <span className="material-symbols-outlined text-lg md:text-xl">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
