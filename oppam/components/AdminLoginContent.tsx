"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "@/components/LanguageProvider";
import { useRouter } from "next/navigation";

export default function AdminLoginContent() {
  const { t } = useLanguage();
  const adm = t.admin;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus("error");
    } else {
      router.push("/admin/dashboard");
    }
  };

  const inputClass = "w-full bg-surface-container-low border-0 rounded-xl px-4 py-3.5 text-on-surface focus:ring-2 focus:ring-primary/30 focus:outline-none transition-all text-sm";

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Orbs */}
      <div className="fixed top-[-10%] left-[-5%] w-[40rem] h-[40rem] rounded-full bg-primary bg-orb" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-secondary bg-orb" />

      <div className="w-full max-w-md mx-6">
        <div className="glass-card rounded-2xl p-8 md:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.1)] border border-white/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-container items-center justify-center mb-4 shadow-lg">
              <span className="material-symbols-outlined text-3xl text-white">admin_panel_settings</span>
            </div>
            <h1 className="font-headline text-2xl font-bold text-on-surface">{adm.loginTitle}</h1>
            <p className="text-sm text-on-surface-variant mt-1">{adm.loginSubtitle}</p>
          </div>

          {status === "error" && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
              <span className="material-symbols-outlined text-red-600 text-xl">error</span>
              <p className="text-red-700 text-sm">{adm.loginError}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 ml-1 text-on-surface-variant">
                {adm.email}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="admin@oppam.org"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 ml-1 text-on-surface-variant">
                {adm.password}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-sm shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-lg">login</span>
              {status === "loading" ? adm.loggingIn : adm.loginButton}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
