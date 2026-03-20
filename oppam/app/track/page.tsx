import type { Metadata } from "next";
import TrackContent from "@/components/TrackContent";

export const metadata: Metadata = {
  title: "പരാതി ട്രാക്ക് ചെയ്യുക - ഒപ്പം | Track Complaint - Oppam",
  description: "Track the status of your cybercrime complaint on the Oppam portal using your complaint number.",
  alternates: {
    canonical: "/track",
  },
  openGraph: {
    title: "ലോഗിൻ സ്റ്റാറ്റസ് | Track Complaint - Oppam",
    description: "Check the status of your reported cybercrime securely.",
    url: "https://oppam.online/track",
  },
};

export default function TrackPage() {
  return <TrackContent />;
}
