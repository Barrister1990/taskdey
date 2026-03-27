import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Our Mission & Team",
  description:
    "Learn about Taskdey's mission to connect Ghanaians with verified vocational service providers. Meet the team building Ghana's leading service marketplace.",
  keywords: [
    "about Taskdey",
    "service marketplace Ghana",
    "vocational services team",
    "Ghana startup",
    "Taskdey mission",
  ],
  openGraph: {
    title: "About Taskdey - Our Mission & Team",
    description:
      "Learn about Taskdey's mission to connect Ghanaians with verified vocational service providers.",
    url: "https://taskdey.com/about",
  },
  alternates: { canonical: "https://taskdey.com/about" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
