import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Taskdey App - Available on Google Play",
  description:
    "Download the Taskdey app for Android and find verified service professionals near you in Ghana. Free to use, secure payments, instant booking.",
  keywords: [
    "download Taskdey",
    "Taskdey app",
    "service app Ghana",
    "Google Play Ghana services",
    "book worker app Ghana",
  ],
  openGraph: {
    title: "Download Taskdey App - Available on Google Play",
    description:
      "Download the Taskdey app and find verified service professionals near you in Ghana. Free to use.",
    url: "https://taskdey.com/download",
  },
  alternates: { canonical: "https://taskdey.com/download" },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
