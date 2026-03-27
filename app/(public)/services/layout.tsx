import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Find Skilled Workers in Ghana",
  description:
    "Browse verified electricians, plumbers, carpenters, mechanics, tailors, painters, masons, and cleaners across Ghana. Book trusted professionals instantly on Taskdey.",
  keywords: [
    "electrician Ghana",
    "plumber Accra",
    "carpenter Ghana",
    "mechanic near me Ghana",
    "tailor Ghana",
    "painter Ghana",
    "mason Ghana",
    "cleaner Accra",
    "hire skilled worker Ghana",
    "book service professional Ghana",
    "home repair Ghana",
    "handyman services Accra",
  ],
  openGraph: {
    title: "Services - Find Skilled Workers in Ghana | Taskdey",
    description:
      "Browse verified electricians, plumbers, carpenters, mechanics, and more across Ghana. Book trusted professionals instantly.",
    url: "https://taskdey.com/services",
  },
  alternates: { canonical: "https://taskdey.com/services" },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
