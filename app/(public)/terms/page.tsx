"use client";

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  FileText,
  Gavel,
  Mail,
  Scale,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TermsItem {
  title: string;
  content: string;
}

interface TermsSection {
  id: string;
  title: string;
  items: TermsItem[];
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const termsSections: TermsSection[] = [
  {
    id: "1",
    title: "Taskdey Platforms Connect Clients and Service Providers",
    icon: Users,
    items: [
      {
        title: "1.1 Platform Connection",
        content:
          'Taskdey serves as a platform connecting service requesters ("clients") with service providers. Clients can access a network of service providers for cleaning services through the App.',
      },
      {
        title: "1.2 Facilitating Communication",
        content:
          "Taskdey facilitates communication between clients and service providers to arrange and fulfill cleaning service requests.",
      },
    ],
  },
  {
    id: "2",
    title: "Use of Taskdey Platform",
    icon: Shield,
    items: [
      {
        title: "2.1 Compliance",
        content:
          "Users must comply with all applicable laws and regulations when using Taskdey.",
      },
      {
        title: "2.2 Modifications",
        content:
          "Taskdey reserves the right to modify or discontinue the App or any feature at any time without notice.",
      },
      {
        title: "2.3 Account Confidentiality",
        content:
          "Users are responsible for maintaining the confidentiality of their account information and passwords.",
      },
    ],
  },
  {
    id: "3",
    title: "Deactivation and Suspension",
    icon: AlertTriangle,
    items: [
      {
        title: "3.1 Right to Deactivate",
        content:
          "Taskdey reserves the right to deactivate or suspend user accounts for any violation of these Terms and Conditions or for any conduct detrimental to the community.",
      },
      {
        title: "3.2 Notification",
        content:
          "Users will be notified of any deactivation or suspension, and the reasons will be provided.",
      },
    ],
  },
  {
    id: "4",
    title: "Taskdey Platform Registration",
    icon: FileText,
    items: [
      {
        title: "4.1 Accuracy of Information",
        content:
          "Users must provide accurate and complete information during registration.",
      },
      {
        title: "4.2 Information Updates",
        content:
          "Users must promptly update their information to ensure it remains accurate.",
      },
    ],
  },
  {
    id: "5",
    title: "Taskdey as an Online Marketplace",
    icon: Scale,
    items: [
      {
        title: "5.1 Marketplace Functionality",
        content:
          "Taskdey acts as an online marketplace connecting clients and service providers, and does not provide cleaning services directly.",
      },
      {
        title: "5.2 Service Quality",
        content:
          "Taskdey is not responsible for the quality, safety, or legality of the services provided by service providers.",
      },
    ],
  },
  {
    id: "6",
    title: "Intellectual Property Rights",
    icon: Shield,
    items: [
      {
        title: "6.1 Ownership",
        content:
          "All intellectual property rights related to the App are owned by Apprentice lab.",
      },
      {
        title: "6.2 Usage Restrictions",
        content:
          "Users may not use, reproduce, or distribute any content from the App without explicit permission.",
      },
    ],
  },
  {
    id: "7",
    title: "Licensing",
    icon: Gavel,
    items: [
      {
        title: "7.1 Limited License",
        content:
          "Taskdey grants users a limited, non-exclusive, revocable license to use the App in accordance with these Terms and Conditions.",
      },
      {
        title: "7.2 Usage Restrictions",
        content:
          "Users may not sublicense, sell, or resell any part of the App or access to the App.",
      },
    ],
  },
  {
    id: "8",
    title: "Free to Use",
    icon: CheckCircle,
    items: [
      {
        title: "8.1 Free Access",
        content:
          "Taskdey is free to use for both clients and service providers.",
      },
    ],
  },
  {
    id: "8A",
    title: "Refund Policy",
    icon: AlertTriangle,
    items: [
      {
        title: "8A.1 No Refunds",
        content:
          "Taskdey does not provide refunds for services booked through the App. All payment transactions are final.",
      },
      {
        title: "8A.2 Dispute Resolution",
        content:
          "Users acknowledge that Taskdey bears no responsibility for disputes or issues arising from transactions between clients and service providers.",
      },
    ],
  },
  {
    id: "9",
    title: "Limitation of Liability",
    icon: Shield,
    items: [
      {
        title: "9.1 Indirect Damages",
        content:
          "Taskdey shall not be liable for any indirect, incidental, special, consequential, or punitive damages.",
      },
      {
        title: "9.2 Warranty Disclaimer",
        content:
          'Users acknowledge that the App is provided on an "as-is" and "as available" basis, without any warranties.',
      },
    ],
  },
];

const keyPoints = [
  "You must be at the legally working age in your country of residence.",
  "Service providers are independent contractors of Clients and not employees of Apprentice lab.",
  "Taskdey App does not supervise, direct, control and monitor service performed.",
  "Requesters are solely responsible for determining if the service provider is qualified.",
  "Taskdey provides no warranty and has no liability regarding User actions or service performance.",
];

const termsStats = [
  { icon: Users, value: "100%", label: "User Protection" },
  { icon: Scale, value: "Fair", label: "Terms" },
  { icon: Shield, value: "Legal", label: "Compliance" },
];

const accentColors = [
  "bg-primary",
  "bg-secondary",
  "bg-quaternary",
  "bg-tertiary",
  "bg-primary",
  "bg-secondary",
  "bg-quaternary",
  "bg-tertiary",
  "bg-primary",
  "bg-secondary",
];

export default function TermsPage() {
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
      <div className="absolute top-28 right-14 w-10 h-10 rounded-full bg-tertiary/10 hidden lg:block" />
      <div className="absolute bottom-36 left-8 w-6 h-6 rotate-45 bg-secondary/10 hidden lg:block" />
      <div className="absolute top-1/2 right-6 w-3 h-3 rounded-full bg-primary/15 hidden lg:block" />

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
            Terms & <span className="text-primary">Conditions</span>
          </h1>
          <p className="text-xs sm:text-base text-muted-foreground max-w-xl mx-auto mb-2 sm:mb-3">
            Please read these terms carefully before using Taskdey. By using our
            service, you agree to these terms.
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground/70">
            Last updated: February 16, 2024
          </p>

          {/* Stats */}
          <div className="inline-flex items-center gap-3 sm:gap-5 bg-card border-2 border-border rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-hard-sm mt-5 sm:mt-8">
            {termsStats.map((stat, i) => (
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

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-hard-sm mb-4 sm:mb-6"
        >
          <div className="flex items-start gap-2.5 sm:gap-4">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-tertiary rounded-lg sm:rounded-xl flex items-center justify-center border-2 border-foreground shadow-hard-sm">
              <Gavel
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                strokeWidth={2.5}
              />
            </div>
            <div>
              <h2 className="font-heading text-xs sm:text-base font-bold text-foreground mb-1 sm:mb-2">
                Welcome to Taskdey
              </h2>
              <p className="text-[10px] sm:text-sm text-muted-foreground leading-relaxed mb-2 sm:mb-3">
                These terms of service constitute a legally binding agreement
                between you and Apprentice Lab governing your use of the Taskdey
                mobile application.
              </p>
              <div className="bg-primary/10 border-2 border-primary/20 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3">
                <p className="text-[10px] sm:text-xs font-semibold text-primary">
                  By using the Taskdey app you accept that you have reviewed the
                  privacy policy and agree to all our Terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Points */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-hard-sm mb-4 sm:mb-6"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-7 h-7 sm:w-9 sm:h-9 bg-quaternary rounded-lg sm:rounded-xl flex items-center justify-center border-2 border-foreground shadow-hard-sm">
              <CheckCircle
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                strokeWidth={2.5}
              />
            </div>
            <h2 className="font-heading text-xs sm:text-base font-bold text-foreground">
              Key Points to Note
            </h2>
          </div>

          <div className="space-y-2 sm:space-y-2.5">
            {keyPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-2 sm:gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-quaternary/15 rounded-full flex items-center justify-center mt-0.5">
                  <CheckCircle
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-quaternary"
                    strokeWidth={2.5}
                  />
                </div>
                <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-2.5 sm:space-y-3">
          {termsSections.map((section, index) => {
            const Icon = section.icon;
            const isExpanded = expandedSections[section.id];
            const color = accentColors[index % accentColors.length];

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.04 }}
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
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div
                        className={`flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 ${color} rounded-lg sm:rounded-xl flex items-center justify-center border-2 border-foreground shadow-hard-sm`}
                      >
                        <Icon
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                          strokeWidth={2.5}
                        />
                      </div>
                      <h3 className="text-[11px] sm:text-sm lg:text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        {section.id}. {section.title}
                      </h3>
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
                          <div className="pt-2.5 sm:pt-4 space-y-3 sm:space-y-4 ml-9 sm:ml-12">
                            {section.items.map((item, idx) => (
                              <div key={idx}>
                                <h4 className="text-[10px] sm:text-xs font-bold text-primary mb-0.5 sm:mb-1">
                                  {item.title}
                                </h4>
                                <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground leading-relaxed">
                                  {item.content}
                                </p>
                              </div>
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
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 border-2 border-foreground shadow-hard-sm">
            <Mail
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              strokeWidth={2.5}
            />
          </div>
          <h3 className="font-heading text-sm sm:text-lg font-bold text-foreground mb-1 sm:mb-2">
            Questions About Our Terms?
          </h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-5 max-w-md mx-auto">
            If you have any questions or concerns about our terms and
            conditions, please don&apos;t hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <a
              href="mailto:info@taskdey.com"
              className="inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold border-2 border-foreground shadow-hard-sm transition-all duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-hard"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
              info@taskdey.com
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
