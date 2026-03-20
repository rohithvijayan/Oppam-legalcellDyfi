import type { Metadata } from "next";
import AdminLoginContent from "@/components/AdminLoginContent";

export const metadata: Metadata = {
  title: "അഡ്മിൻ ലോഗിൻ | Admin Login - Oppam",
  description: "Secure administrative access for the Oppam portal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return <AdminLoginContent />;
}
