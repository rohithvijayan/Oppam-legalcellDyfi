"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  victim_name: z.string().min(2, "Name must be at least 2 characters"),
  victim_age: z.string().regex(/^\d{1,3}$/, "Enter a valid age"),
  address: z.string().min(5),
  contact_phone: z.string().regex(/^\d{10}$/, "Must be a 10-digit number"),
  contact_email: z.string().email(),
  district: z.string().min(1, "Please select a district"),
  local_body: z.string().min(2),
  police_station: z.string().min(2),
  victim_social_link: z.string().url(),
  accused_social_link: z.string().url(),
  description: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, { message: "You must accept the terms" }),
});

type FormData = z.infer<typeof schema>;

export default function ComplaintForm() {
  const { t, locale } = useLanguage();
  const f = t.home.fields;
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    const files = Array.from(e.target.files || []);
    const oversized = files.filter(f => f.size > 2 * 1024 * 1024);
    if (oversized.length > 0) {
      setFileError("Each file must be under 2MB");
      e.target.value = "";
      return;
    }
    setEvidenceFiles(files);
  };

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => formData.append(k, String(v)));
      evidenceFiles.forEach(f => formData.append("evidence", f));

      const res = await fetch("/api/complaints", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
      setEvidenceFiles([]);
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full bg-[#000000]/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all text-sm backdrop-blur-md";
  const labelClass = `block text-xs font-bold uppercase tracking-wider mb-2 ml-1 ${locale === 'ml' ? 'font-headline text-xs' : ''} text-white/70`;
  const errorClass = "text-red-400 text-xs mt-1 ml-1 font-medium";

  return (
    <div className="bg-[#000000]/30 backdrop-blur-2xl rounded-2xl p-7 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/10" id="form">
      {/* Top accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary to-primary-container rounded-full mb-8 -mt-1 shadow-[0_0_15px_rgba(207,0,0,0.3)]" />

      <div className="mb-7">
        <h2 className="font-headline text-2xl font-bold text-white mb-1">{t.home.formTitle}</h2>
        <p className="text-sm text-white/60">{t.home.formConfidential}</p>
      </div>

      {status === "success" && (
        <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-start gap-3">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <p className="text-green-300 text-sm font-medium">{t.home.submitSuccess}</p>
        </div>
      )}
      {status === "error" && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
          <span className="material-symbols-outlined text-red-400">error</span>
          <p className="text-red-300 text-sm font-medium">{t.home.submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name & Age */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>{f.name}</label>
            <input {...register("victim_name")} type="text" placeholder={f.namePlaceholder} className={inputClass} />
            {errors.victim_name && <p className={errorClass}>{errors.victim_name.message}</p>}
          </div>
          <div>
            <label className={labelClass}>{f.age}</label>
            <input {...register("victim_age")} type="number" min={1} max={120} placeholder={f.agePlaceholder} className={inputClass} />
            {errors.victim_age && <p className={errorClass}>{errors.victim_age.message}</p>}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className={labelClass}>{f.address}</label>
          <textarea {...register("address")} rows={2} placeholder={f.addressPlaceholder} className={inputClass} />
          {errors.address && <p className={errorClass}>{errors.address.message}</p>}
        </div>

        {/* Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>{f.phone}</label>
            <input {...register("contact_phone")} type="tel" placeholder={f.phonePlaceholder} className={inputClass} />
            {errors.contact_phone && <p className={errorClass}>{errors.contact_phone.message}</p>}
          </div>
          <div>
            <label className={labelClass}>{f.email}</label>
            <input {...register("contact_email")} type="email" placeholder={f.emailPlaceholder} className={inputClass} />
            {errors.contact_email && <p className={errorClass}>{errors.contact_email.message}</p>}
          </div>
        </div>

        {/* District */}
        <div>
          <label className={labelClass}>{f.district}</label>
          <select {...register("district")} className={`${inputClass} appearance-none cursor-pointer`}>
            <option value="" className="bg-slate-900">{f.districtPlaceholder}</option>
            {t.districts.map((d) => (
              <option key={d} value={d} className="bg-slate-900">{d}</option>
            ))}
          </select>
          {errors.district && <p className={errorClass}>{errors.district.message}</p>}
        </div>

        {/* Local Body & Police Station */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>{f.localBody}</label>
            <input {...register("local_body")} type="text" placeholder={f.localBodyPlaceholder} className={inputClass} />
            {errors.local_body && <p className={errorClass}>{errors.local_body.message}</p>}
          </div>
          <div>
            <label className={labelClass}>{f.policeStation}</label>
            <input {...register("police_station")} type="text" placeholder={f.policeStationPlaceholder} className={inputClass} />
            {errors.police_station && <p className={errorClass}>{errors.police_station.message}</p>}
          </div>
        </div>

        {/* Social Links */}
        <div>
          <label className={labelClass}>{f.victimSocialLink}</label>
          <input {...register("victim_social_link")} type="url" placeholder={f.victimSocialLinkPlaceholder} className={inputClass} />
          {errors.victim_social_link && <p className={errorClass}>{errors.victim_social_link.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{f.accusedSocialLink}</label>
          <input {...register("accused_social_link")} type="url" placeholder={f.accusedSocialLinkPlaceholder} className={inputClass} />
          {errors.accused_social_link && <p className={errorClass}>{errors.accused_social_link.message}</p>}
        </div>

        {/* Evidence Upload */}
        <div>
          <label className={labelClass}>{f.evidence}</label>
          <div className="relative border-2 border-dashed border-white/10 rounded-xl p-8 text-center bg-[#000000]/20 hover:bg-[#000000]/40 transition-colors cursor-pointer group backdrop-blur-md">
            <span className="material-symbols-outlined text-4xl text-primary/50 group-hover:text-primary transition-colors block mb-2">cloud_upload</span>
            <p className="text-sm font-medium text-white/70">
              {evidenceFiles.length > 0 ? `${evidenceFiles.length} file(s) selected` : f.evidence}
            </p>
            <p className="text-xs text-white/40 mt-1">{f.evidenceDesc}</p>
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </div>
          {fileError && <p className={errorClass}>{fileError}</p>}
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>{f.description}</label>
          <textarea {...register("description")} rows={3} placeholder={f.descriptionPlaceholder} className={inputClass} />
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <input
            {...register("consent")}
            type="checkbox"
            id="consent"
            className="mt-1 rounded border-white/20 bg-transparent text-primary focus:ring-primary accent-primary"
          />
          <label htmlFor="consent" className="text-xs text-white/60 leading-relaxed cursor-pointer">
            {f.consent}
          </label>
        </div>
        {errors.consent && <p className={errorClass}>{errors.consent.message}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-bold text-base shadow-[0_10px_30px_rgba(207,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(207,0,0,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-lg">send</span>
          {status === "submitting" ? t.home.submitting : t.home.submitButton}
        </button>

        {/* Trust bar */}
        <p className="text-xs text-center text-white/40 mt-2 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">lock</span>
          {t.home.trustBadge}
        </p>
      </form>
    </div>
  );
}
