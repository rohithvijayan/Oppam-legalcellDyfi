"use client";

import { useState } from "react";
import Link from "next/link";

type TrackResult = {
  complaint_number: string;
  status: "PENDING" | "REVIEWED" | "ACTION_TAKEN";
  admin_notes: string | null;
  created_at: string;
  location_district: string;
};

const STATUS_CONFIG: Record<string, { label: string; icon: string; color: string; bg: string; border: string }> = {
  PENDING: {
    label: "Pending Review",
    icon: "hourglass_empty",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  REVIEWED: {
    label: "Under Review",
    icon: "fact_check",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  ACTION_TAKEN: {
    label: "Action Taken",
    icon: "verified",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
  },
};

export default function TrackPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = input.trim().toUpperCase();
    if (!id) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch(`/api/track/${encodeURIComponent(id)}`);
      if (res.status === 404) {
        setError("No complaint found with this number. Please check and try again.");
      } else if (!res.ok) {
        setError("Something went wrong. Please try again later.");
      } else {
        const data = await res.json();
        setResult(data);
      }
    } catch {
      setError("Network error. Please check your connection.");
    }

    setLoading(false);
  };

  const statusCfg = result ? STATUS_CONFIG[result.status] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Nav */}
      <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 text-white font-black text-xl tracking-tight">
          <span className="material-symbols-outlined text-primary">gavel</span>
          Oppam
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Home
        </Link>
      </nav>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-5">
              <span className="material-symbols-outlined text-3xl text-primary">manage_search</span>
            </div>
            <h1 className="text-3xl font-black text-white mb-2">Track Your Complaint</h1>
            <p className="text-white/40 text-sm">
              Enter the complaint number you received after submitting your complaint.
            </p>
          </div>

          {/* Search card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl mb-6">
            <form onSubmit={handleTrack} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                  Complaint Number
                </label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value.toUpperCase())}
                  placeholder="e.g. OPM-2026-00001"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white font-mono text-lg placeholder:text-white/20 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all tracking-widest"
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold text-sm shadow-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-lg animate-spin" style={{ animationDuration: "1s" }}>
                      progress_activity
                    </span>
                    Searching...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">search</span>
                    Track Complaint
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 mb-6">
              <span className="material-symbols-outlined text-red-400">error</span>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Result */}
          {result && statusCfg && (
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
              {/* Status header */}
              <div className={`${statusCfg.bg} ${statusCfg.border} border-b px-6 py-5 flex items-center gap-4`}>
                <div className={`w-12 h-12 rounded-xl ${statusCfg.bg} ${statusCfg.border} border flex items-center justify-center`}>
                  <span className={`material-symbols-outlined text-2xl ${statusCfg.color}`}>{statusCfg.icon}</span>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider font-bold mb-0.5">Current Status</p>
                  <p className={`text-xl font-black ${statusCfg.color}`}>{statusCfg.label}</p>
                </div>
              </div>

              {/* Details */}
              <div className="px-6 py-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider font-bold mb-1">Complaint No.</p>
                    <p className="text-white font-mono font-bold tracking-widest text-sm">{result.complaint_number}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider font-bold mb-1">District</p>
                    <p className="text-white text-sm font-medium">{result.location_district}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider font-bold mb-1">Submitted On</p>
                    <p className="text-white text-sm font-medium">
                      {new Date(result.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {result.admin_notes && (
                  <div className="mt-2 pt-4 border-t border-white/10">
                    <p className="text-xs text-white/30 uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">comment</span>
                      Message from our team
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed bg-white/5 rounded-xl px-4 py-3">
                      {result.admin_notes}
                    </p>
                  </div>
                )}

                {!result.admin_notes && (
                  <div className="mt-2 pt-4 border-t border-white/10">
                    <p className="text-white/30 text-sm text-center py-2 flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-base">chat_bubble_outline</span>
                      No messages from our team yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer note */}
          <p className="text-center text-xs text-white/20 mt-8">
            Need help? Contact our support team for assistance.
          </p>
        </div>
      </main>
    </div>
  );
}
