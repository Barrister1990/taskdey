import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Taskdey's privacy policy to understand how we collect, use, and protect your personal data on our service marketplace platform.",
  openGraph: {
    title: "Privacy Policy | Taskdey",
    description:
      "Read Taskdey's privacy policy to understand how we collect, use, and protect your personal data.",
    url: "https://taskdey.com/privacy",
  },
  alternates: { canonical: "https://taskdey.com/privacy" },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
