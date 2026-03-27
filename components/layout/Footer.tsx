import { NAV_LINKS } from "@/lib/constants";
import {
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TikTokIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="none"
    stroke="currentColor"
    strokeWidth="16"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M168 32c0 26.51 21.49 48 48 48v40a88 88 0 1 1-88-88v48a40 40 0 1 0 40 40V32" />
  </svg>
);

const socials = [
  {
    href: "https://www.facebook.com/share/16Lta84UPv/?mibextid=wwXIfr",
    label: "Facebook",
    icon: Facebook,
  },
  {
    href: "https://www.tiktok.com/@taskdey?_t=ZM-8vuk9ldkHR9&_r=1",
    label: "TikTok",
    icon: TikTokIcon,
  },
  {
    href: "https://www.instagram.com/taskdey/profilecard/?igsh=aG5sMHE1MmZ5dXc4",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://www.linkedin.com/showcase/joymish/?viewAsMember=true",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/cookies", label: "Cookies" },
];

const contactInfo = [
  { icon: Mail, href: "mailto:info@taskdey.com", label: "info@taskdey.com" },
  { icon: Phone, href: "tel:+233241940783", label: "+233 241 940 783" },
  { icon: MapPin, href: null, label: "Accra, Ghana" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t-2 border-border relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-8 right-12 w-10 h-10 rounded-full bg-tertiary/8 hidden lg:block" />
      <div className="absolute bottom-16 left-10 w-6 h-6 rotate-45 bg-secondary/8 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== Mobile Layout ===== */}
        <div className="block md:hidden py-6">
          {/* Logo */}
          <div className="text-center mb-4">
            <Image
              src="/logo.png"
              alt="Taskdey"
              width={100}
              height={30}
              className="h-7 w-auto mx-auto"
            />
            <p className="text-[10px] text-muted-foreground mt-1">
              Ghana&apos;s premier service platform
            </p>
          </div>

          {/* Compact Links */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] mb-4 px-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="text-center mb-3">
            <a
              href="mailto:info@taskdey.com"
              className="text-[11px] text-muted-foreground hover:text-primary transition-colors"
            >
              info@taskdey.com
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-2 mb-3">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-muted border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-foreground transition-all duration-200"
                aria-label={label}
              >
                <Icon className="w-3 h-3" />
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex justify-center gap-3 text-[10px] mb-2">
            {legalLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label.split(" ")[0]}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center text-[10px] text-muted-foreground">
            &copy; {currentYear} Taskdey
          </p>
        </div>

        {/* ===== Desktop Layout ===== */}
        <div className="hidden md:block py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Company Info */}
            <div className="space-y-5">
              <div>
                <div className="mb-3">
                  <Image
                    src="/logo.png"
                    alt="Taskdey"
                    width={130}
                    height={40}
                    className="h-9 w-auto"
                  />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ghana&apos;s premier platform connecting skilled professionals
                  with clients. Building trust through quality service delivery.
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-heading font-bold text-sm text-foreground mb-3">
                  Connect With Us
                </h4>
                <div className="flex gap-2">
                  {socials.map(({ href, label, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-9 h-9 bg-muted border-2 border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-foreground hover:shadow-hard-sm transition-all duration-300 ease-bounce hover:-translate-y-0.5"
                      aria-label={label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-bold text-sm text-foreground mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                    >
                      <span className="w-1 h-1 bg-primary rounded-full mr-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-bold text-sm text-foreground mb-4">
                Get In Touch
              </h4>
              <ul className="space-y-3">
                {contactInfo.map(({ icon: Icon, href, label }) => (
                  <li key={label} className="flex items-start gap-2.5">
                    <span className="flex items-center justify-center w-7 h-7 bg-primary/10 rounded-lg flex-shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {label}
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Developer */}
            <div>
              <h4 className="font-heading font-bold text-sm text-foreground mb-4">
                Legal & Support
              </h4>
              <ul className="space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                    >
                      <span className="w-1 h-1 bg-primary rounded-full mr-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Developer Credit */}
              <div className="pt-4 mt-4 border-t-2 border-border">
                <p className="text-xs text-muted-foreground mb-1.5">
                  Developed by
                </p>
                <a
                  href="https://charlesawuku.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <span>Charles Awuku</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t-2 border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <p className="text-xs text-muted-foreground">
                &copy; {currentYear} Taskdey. All rights reserved.
              </p>
              <div className="flex gap-5 text-xs">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label.split(" ")[0]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
