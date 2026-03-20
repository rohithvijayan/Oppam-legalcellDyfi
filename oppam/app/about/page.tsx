import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "ഞങ്ങളെക്കുറിച്ച് - ഒപ്പം | About Us - Oppam",
  description: "Learn about Oppam's mission, privacy policy, and partnership network. We provide free legal support for cybercrime victims.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "ഞങ്ങളെക്കുറിച്ച് | About Us - Oppam Legal Aid",
    description: "Learn about the mission of Oppam Legal Cell and our initiatives for cyber safety in Kerala.",
    url: "https://oppam.online/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
