import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "ഒപ്പം | Oppam - Cyber Neethi Support Portal",
  description: "ഒപ്പം (Oppam) is a free legal support portal for cybercrime victims in Kerala. File confidential complaints for cyber abuse, sexual harassment, and communal threats.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ഒപ്പം - Oppam Legal Aid",
    description: "Submit cybercrime complaints securely with Oppam Legal Cell. Complete confidentiality maintained.",
    url: "https://oppam.online/",
  },
};

export default function Home() {
  return <HomeContent />;
}
