"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "@/components/LanguageProvider";
import { useRouter } from "next/navigation";

type Complaint = {
  id: string;
  created_at: string;
  victim_name: string;
  victim_age: number;
  address: string;
  contact_phone: string;
  contact_email: string;
  location_district: string;
  location_local_body: string;
  police_station: string;
  victim_social_link: string;
  accused_social_link: string;
  evidence_urls: string[];
  description: string | null;
  status: "PENDING" | "REVIEWED" | "ACTION_TAKEN";
  admin_notes: string | null;
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  REVIEWED: "bg-blue-100 text-blue-700 border-blue-200",
  ACTION_TAKEN: "bg-green-100 text-green-700 border-green-200",
};

export default function AdminDashboardContent() {
  const { t } = useLanguage();
  const adm = t.admin;
  const router = useRouter();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [adminNotes, setAdminNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const checkAuth = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.replace("/admin");
    }
  }, [router]);

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.replace("/admin");
      return;
    }

    try {
      const res = await fetch("/api/admin/complaints", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setComplaints(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    checkAuth();
    fetchComplaints();
  }, [checkAuth, fetchComplaints]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin");
  };

  const openDetail = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setNewStatus(complaint.status);
    setAdminNotes(complaint.admin_notes || "");
  };

  const handleSave = async () => {
    if (!selectedComplaint) return;
    setSaving(true);
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.replace("/admin");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch(`/api/admin/complaints/${selectedComplaint.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ status: newStatus, admin_notes: adminNotes }),
      });

      if (res.ok) {
        await fetchComplaints();
        setSelectedComplaint(null);
      } else {
        console.error("Failed to update complaint via secure API");
      }
    } catch (err) {
      console.error(err);
    }
    
    setSaving(false);
  };

  const getSignedUrl = async (path: string) => {
    const { data } = await supabase.storage.from("evidence").createSignedUrl(path, 3600);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  // Stats
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "PENDING").length;
  const reviewed = complaints.filter((c) => c.status === "REVIEWED").length;
  const actionTaken = complaints.filter((c) => c.status === "ACTION_TAKEN").length;

  const filtered = complaints.filter(
    (c) =>
      c.victim_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location_district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contact_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statCards = [
    { label: adm.statsTotal, value: total, icon: "folder_open", color: "text-on-surface" },
    { label: adm.statsPending, value: pending, icon: "pending", color: "text-amber-600" },
    { label: adm.statsReviewed, value: reviewed, icon: "fact_check", color: "text-blue-600" },
    { label: adm.statsActionTaken, value: actionTaken, icon: "check_circle", color: "text-green-600" },
  ];

  return (
    <div className="min-h-screen bg-surface-container-low p-4 md:p-8">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">{adm.dashboardTitle}</h1>
          <p className="text-sm text-on-surface-variant mt-1 font-label">{t.brand}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant text-sm text-on-surface-variant hover:border-primary hover:text-primary transition-all"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          {adm.logout}
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-5 shadow-sm border border-white/50">
            <div className="flex items-center justify-between mb-3">
              <span className={`material-symbols-outlined text-2xl ${s.color}`}>{s.icon}</span>
            </div>
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-on-surface-variant font-label mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl">search</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, district, email..."
          className="w-full max-w-sm bg-white border-0 rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl shadow-sm border border-white/50 overflow-hidden">
        {loading ? (
          <div className="py-24 text-center text-on-surface-variant flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-outline animate-spin" style={{ animationDuration: "1s" }}>progress_activity</span>
            <p>Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl text-outline block mb-3">inbox</span>
            <p>No complaints found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant/30 bg-surface-container-lowest">
                  <th className="text-left px-6 py-4 font-bold text-on-surface-variant uppercase text-xs tracking-wider">{adm.tableHeaders.id}</th>
                  <th className="text-left px-6 py-4 font-bold text-on-surface-variant uppercase text-xs tracking-wider">{adm.tableHeaders.name}</th>
                  <th className="text-left px-6 py-4 font-bold text-on-surface-variant uppercase text-xs tracking-wider hidden md:table-cell">{adm.tableHeaders.district}</th>
                  <th className="text-left px-6 py-4 font-bold text-on-surface-variant uppercase text-xs tracking-wider hidden lg:table-cell">{adm.tableHeaders.date}</th>
                  <th className="text-left px-6 py-4 font-bold text-on-surface-variant uppercase text-xs tracking-wider">{adm.tableHeaders.status}</th>
                  <th className="text-right px-6 py-4 font-bold text-on-surface-variant uppercase text-xs tracking-wider">{adm.tableHeaders.action}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filtered.map((c, i) => (
                  <tr key={c.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-6 py-4 text-on-surface-variant font-mono text-xs">{i + 1}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-on-surface">{c.victim_name}</div>
                      <div className="text-xs text-on-surface-variant">{c.contact_email}</div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant hidden md:table-cell">{c.location_district}</td>
                    <td className="px-6 py-4 text-on-surface-variant text-xs hidden lg:table-cell">
                      {new Date(c.created_at).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${STATUS_COLORS[c.status]}`}>
                        {adm.status[c.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openDetail(c)}
                        className="inline-flex items-center gap-1.5 text-primary text-xs font-bold hover:underline"
                      >
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                        {adm.viewDetails}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-white border-b border-outline-variant/30 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="font-bold text-on-surface">{selectedComplaint.victim_name}</h2>
                <p className="text-xs text-on-surface-variant">{selectedComplaint.contact_email} · {selectedComplaint.contact_phone}</p>
              </div>
              <button onClick={() => setSelectedComplaint(null)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Details grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Age", value: selectedComplaint.victim_age },
                  { label: "District", value: selectedComplaint.location_district },
                  { label: "Local Body", value: selectedComplaint.location_local_body },
                  { label: "Police Station", value: selectedComplaint.police_station },
                  { label: "Submitted", value: new Date(selectedComplaint.created_at).toLocaleDateString("en-IN") },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs font-bold uppercase text-on-surface-variant mb-1">{item.label}</p>
                    <p className="text-sm text-on-surface">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-on-surface-variant">Victim Profile</p>
                <a href={selectedComplaint.victim_social_link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline break-all">
                  {selectedComplaint.victim_social_link}
                </a>
                <p className="text-xs font-bold uppercase text-on-surface-variant mt-3">Accused Profile</p>
                <a href={selectedComplaint.accused_social_link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline break-all">
                  {selectedComplaint.accused_social_link}
                </a>
              </div>

              {/* Address */}
              {selectedComplaint.address && (
                <div>
                  <p className="text-xs font-bold uppercase text-on-surface-variant mb-1">Address</p>
                  <p className="text-sm text-on-surface bg-surface-container-low rounded-xl px-4 py-3">{selectedComplaint.address}</p>
                </div>
              )}

              {/* Description */}
              {selectedComplaint.description && (
                <div>
                  <p className="text-xs font-bold uppercase text-on-surface-variant mb-1">Description</p>
                  <p className="text-sm text-on-surface bg-surface-container-low rounded-xl px-4 py-3 leading-relaxed">
                    {selectedComplaint.description}
                  </p>
                </div>
              )}

              {/* Evidence */}
              {selectedComplaint.evidence_urls?.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase text-on-surface-variant mb-3">{adm.evidenceLinks}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedComplaint.evidence_urls.map((url, i) => (
                      <button
                        key={i}
                        onClick={() => getSignedUrl(url)}
                        className="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-xl text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">attach_file</span>
                        File {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Status update */}
              <div>
                <p className="text-xs font-bold uppercase text-on-surface-variant mb-3">{adm.updateStatus}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {(["PENDING", "REVIEWED", "ACTION_TAKEN"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setNewStatus(s)}
                      className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                        newStatus === s
                          ? STATUS_COLORS[s] + " shadow-sm"
                          : "border-outline-variant text-on-surface-variant hover:border-primary"
                      }`}
                    >
                      {adm.status[s]}
                    </button>
                  ))}
                </div>

                <label className="block text-xs font-bold uppercase text-on-surface-variant mb-2">{adm.adminNotes}</label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={4}
                  placeholder={adm.adminNotesPlaceholder}
                  className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none resize-none transition-all"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="px-5 py-2.5 rounded-full border border-outline-variant text-sm text-on-surface-variant hover:border-primary hover:text-primary transition-all"
                >
                  {adm.close}
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary text-sm font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">save</span>
                  {saving ? "Saving..." : adm.saveChanges}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
