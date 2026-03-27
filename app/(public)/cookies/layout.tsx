import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how Taskdey uses cookies to improve your browsing experience on our service marketplace platform.",
  openGraph: {
    title: "Cookie Policy | Taskdey",
    description:
      "Learn how Taskdey uses cookies to improve your browsing experience.",
    url: "https://taskdey.com/cookies",
  },
  alternates: { canonical: "https://taskdey.com/cookies" },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
