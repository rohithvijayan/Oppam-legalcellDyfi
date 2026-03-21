import type { Metadata } from "next";
import TrackContent from "@/components/TrackContent";

export const metadata: Metadata = {
  title: "പരാതി ട്രാക്ക് ചെയ്യുക - ഒപ്പം | Track Complaint - Oppam",
  description: "Track the status of your cybercrime complaint on the Oppam portal using your complaint number.",
  alternates: {
    canonical: "/track",
  },
  openGraph: {
    title: "പരാതി ട്രാക്ക് ചെയ്യുക | Track Complaint - Oppam",
    description: "Check the status of your cybercrime complaint securely on the Oppam official portal.",
    url: "https://oppam.online/track",
    siteName: "Oppam Legal Support",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TrackPage() {
  return <TrackContent />;
}
