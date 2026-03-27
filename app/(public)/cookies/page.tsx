"use client";

import {
  ArrowRight,
  ChevronDown,
  Cookie,
  Eye,
  FileText,
  Globe,
  Mail,
  Settings,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CookieSection {
  id: string;
  title: string;
  content: string[];
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const sections: CookieSection[] = [
  {
    id: "intro",
    title: "What Are Cookies?",
    icon: Cookie,
    content: [
      "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.",
      "At Taskdey, we use cookies to enhance your experience, analyze site usage, and provide personalized content. This policy explains what cookies we use and why.",
      "By continuing to use our website, you consent to our use of cookies in accordance with this policy.",
    ],
  },
  {
    id: "types",
    title: "Types of Cookies We Use",
    icon: Settings,
    content: [
      "Essential Cookies: These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.",
      "Analytics Cookies: We use these cookies to understand how visitors interact with our website by collecting and reporting information anonymously.",
      "Functional Cookies: These cookies allow the website to remember choices you make and provide enhanced, more personal features.",
      "Marketing Cookies: These cookies track your activity across websites to help advertisers deliver more relevant advertising.",
    ],
  },
  {
    id: "specific",
    title: "Specific Cookies We Use",
    icon: FileText,
    content: [
      "Google Analytics: We use Google Analytics to analyze website traffic and usage patterns. These cookies help us understand which pages are most popular and how users navigate our site.",
      "Session Cookies: These temporary cookies are deleted when you close your browser. They help maintain your session as you navigate through our website.",
      "Preference Cookies: These cookies remember your settings and preferences, such as language selection and display preferences.",
      "Security Cookies: These cookies help identify and prevent security risks, protecting both you and our website from malicious activity.",
    ],
  },
  {
    id: "thirdParty",
    title: "Third-Party Cookies",
    icon: Globe,
    content: [
      "Some cookies on our website are set by third-party services that appear on our pages. We use various third-party services to enhance functionality and analyze performance.",
      "Google Services: We use Google Analytics, Google Fonts, and other Google services that may set cookies on your device.",
      "Social Media: If you share content from our website on social media platforms, those platforms may set their own cookies.",
      "We do not control these third-party cookies and recommend reviewing the privacy policies of these services for more information about their cookie practices.",
    ],
  },
  {
    id: "management",
    title: "Managing Your Cookie Preferences",
    icon: Settings,
    content: [
      "You can control and manage cookies in several ways. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer.",
      "Browser Settings: You can change your browser settings to block or delete cookies. However, please note that disabling cookies may affect the functionality of our website.",
      "Cookie Preferences: We provide a cookie consent banner where you can choose which types of cookies to accept or decline.",
      "Opt-Out Tools: For analytics and marketing cookies, you can use opt-out tools provided by services like Google Analytics.",
    ],
  },
  {
    id: "retention",
    title: "Cookie Retention",
    icon: Eye,
    content: [
      "Different cookies have different lifespans. Session cookies are deleted when you close your browser, while persistent cookies remain on your device for a set period.",
      "Essential cookies typically remain active for the duration of your session or up to 1 year.",
      "Analytics cookies are usually retained for up to 2 years to help us understand long-term usage patterns.",
      "You can delete cookies at any time through your browser settings, and they will also be automatically deleted when they expire.",
    ],
  },
  {
    id: "updates",
    title: "Updates to This Policy",
    icon: FileText,
    content: [
      "We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.",
      'We will notify you of any significant changes by posting the updated policy on our website and updating the "last modified" date.',
      "We encourage you to review this policy periodically to stay informed about our use of cookies.",
      "This policy is effective as of February 16, 2024",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
    content: [
      "If you have any questions about our use of cookies or this Cookie Policy, please contact us at info@taskdey.com.",
      "We are committed to addressing your concerns and ensuring transparency in our data practices.",
    ],
  },
];

const cookieStats = [
  { icon: Shield, value: "Secure", label: "Data Protection" },
  { icon: Settings, value: "Control", label: "Your Choice" },
  { icon: Eye, value: "Transparent", label: "Privacy First" },
];

const accentColors = [
  "bg-tertiary",
  "bg-primary",
  "bg-secondary",
  "bg-quaternary",
  "bg-primary",
  "bg-tertiary",
  "bg-secondary",
  "bg-quaternary",
];

export default function CookiesPolicy() {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 sm:pb-20 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-32 right-10 w-10 h-10 rounded-full bg-tertiary/10 hidden lg:block" />
      <div className="absolute bottom-44 left-8 w-6 h-6 rotate-45 bg-quaternary/10 hidden lg:block" />
      <div className="absolute top-1/3 left-5 w-3 h-3 rounded-full bg-primary/15 hidden lg:block" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-10"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block bg-primary/10 text-primary px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold border-2 border-primary/20 mb-3 sm:mb-4"
          >
            Legal
          </motion.span>

          <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-2 sm:mb-3">
            Cookie <span className="text-primary">Policy</span>
          </h1>
          <p className="text-xs sm:text-base text-muted-foreground max-w-xl mx-auto mb-2 sm:mb-3">
            Learn how we use cookies to enhance your experience on Taskdey and
            how you can control them.
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground/70">
            Last updated: February 16, 2024
          </p>

          {/* Stats */}
          <div className="inline-flex items-center gap-3 sm:gap-5 bg-card border-2 border-border rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-hard-sm mt-5 sm:mt-8">
            {cookieStats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 sm:gap-5"
              >
                {i > 0 && <div className="w-px h-6 sm:h-8 bg-border" />}
                <div className="text-center">
                  <div className="font-heading text-sm sm:text-lg font-extrabold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-[9px] sm:text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-primary/5 border-2 border-primary/15 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6"
        >
          <div className="flex items-start gap-2.5 sm:gap-4">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-tertiary rounded-lg sm:rounded-xl flex items-center justify-center border-2 border-foreground shadow-hard-sm">
              <Cookie
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                strokeWidth={2.5}
              />
            </div>
            <div>
              <h2 className="font-heading text-xs sm:text-base font-bold text-foreground mb-1 sm:mb-2">
                Understanding Cookies
              </h2>
              <p className="text-[10px] sm:text-sm text-muted-foreground leading-relaxed">
                We use cookies to improve your browsing experience, analyze site
                traffic, and personalize content. This policy explains what
                cookies we use, why we use them, and how you can control them.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-2.5 sm:space-y-3">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isExpanded = expandedSections[section.id];
            const color = accentColors[index % accentColors.length];

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + index * 0.04 }}
              >
                <div
                  className={`bg-card border-2 border-border rounded-xl sm:rounded-2xl shadow-hard-sm transition-all duration-300 ease-bounce overflow-hidden ${
                    isExpanded
                      ? "shadow-hard"
                      : "hover:shadow-hard hover:-translate-y-0.5"
                  }`}
                >
                  <button
                    className="flex items-center justify-between w-full p-3 sm:p-5 text-left group"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className={`flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 ${color} rounded-lg sm:rounded-xl flex items-center justify-center border-2 border-foreground shadow-hard-sm`}
                      >
                        <Icon
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                          strokeWidth={2.5}
                        />
                      </div>
                      <h2 className="text-[11px] sm:text-sm lg:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {section.title}
                      </h2>
                    </div>
                    <ChevronDown
                      className={`flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground transition-transform duration-300 ml-2 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 sm:px-5 pb-3 sm:pb-5 border-t-2 border-border/50">
                          <div className="pt-2.5 sm:pt-4 space-y-2 sm:space-y-3 ml-9 sm:ml-12">
                            {section.content.map((paragraph, idx) => (
                              <p
                                key={idx}
                                className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground leading-relaxed"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 sm:mt-12 bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-hard-sm text-center"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-quaternary rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 border-2 border-foreground shadow-hard-sm">
            <Mail
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              strokeWidth={2.5}
            />
          </div>
          <h3 className="font-heading text-sm sm:text-lg font-bold text-foreground mb-1 sm:mb-2">
            Questions About Cookies?
          </h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-5 max-w-md mx-auto">
            If you have any questions about our cookie practices or need help
            managing your preferences, we&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <a
              href="mailto:info@taskdey.com"
              className="inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold border-2 border-foreground shadow-hard-sm transition-all duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-hard"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
              Email Us
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 bg-card text-foreground px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold border-2 border-border shadow-hard-sm transition-all duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-hard"
            >
              Contact Page
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-8 sm:mt-14"
        >
          <div className="bg-primary border-2 border-foreground rounded-xl sm:rounded-2xl p-5 sm:p-8 text-primary-foreground shadow-hard max-w-xl mx-auto relative overflow-hidden">
            <div className="absolute top-2 right-3 w-5 h-5 rounded-full bg-white/10 hidden sm:block" />
            <div className="absolute bottom-3 left-4 w-3 h-3 rotate-45 bg-white/8 hidden sm:block" />
            <h3 className="font-heading text-base sm:text-xl font-extrabold mb-1 sm:mb-2">
              Ready to get started?
            </h3>
            <p className="text-[10px] sm:text-xs opacity-90 mb-3 sm:mb-5">
              Download Taskdey and experience professional services on demand.
            </p>
            <Link
              href="/download"
              className="inline-flex items-center gap-1.5 bg-card text-primary px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold border-2 border-foreground shadow-hard-sm transition-all duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-hard"
            >
              Download App
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
