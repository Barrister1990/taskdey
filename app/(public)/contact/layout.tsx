import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch",
  description:
    "Have questions about Taskdey? Contact our team for support, partnerships, or general enquiries. We're based in Accra, Ghana.",
  openGraph: {
    title: "Contact Taskdey - Get in Touch",
    description:
      "Have questions about Taskdey? Contact our team for support, partnerships, or general enquiries.",
    url: "https://taskdey.com/contact",
  },
  alternates: { canonical: "https://taskdey.com/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
