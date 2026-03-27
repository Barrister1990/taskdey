import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review the terms and conditions for using the Taskdey service marketplace platform in Ghana.",
  openGraph: {
    title: "Terms & Conditions | Taskdey",
    description:
      "Review the terms and conditions for using the Taskdey platform.",
    url: "https://taskdey.com/terms",
  },
  alternates: { canonical: "https://taskdey.com/terms" },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
