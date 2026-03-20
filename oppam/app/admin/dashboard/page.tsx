import type { Metadata } from "next";
import AdminDashboardContent from "@/components/AdminDashboardContent";

export const metadata: Metadata = {
  title: "അഡ്മിൻ ഡാഷ്‌ബോർഡ് | Admin Dashboard - Oppam",
  description: "Secure complaint management for the Oppam portal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboardPage() {
  return <AdminDashboardContent />;
}
