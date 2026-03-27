"use client";

import {
  ArrowRight,
  ChevronDown,
  Eye,
  FileText,
  Lock,
  Mail,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PrivacySection {
  id: string;
  title: string;
  content: string[];
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const sections: PrivacySection[] = [
  {
    id: "intro",
    title: "Introduction",
    icon: FileText,
    content: [
      "Apprentice Lab built the Taskdey app as a Free app. This SERVICE is provided by Apprentice Lab at no cost and is intended for use as is.",
      "This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.",
      "If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.",
      "The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at Taskdey unless otherwise defined in this Privacy Policy.",
    ],
  },
  {
    id: "collection",
    title: "Information Collection and Use",
    icon: Eye,
    content: [
      "For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to name, profile picture, email, password, location, age, phone number, and wages. The information that we request will be retained by us and used as described in this privacy policy.",
      "The app does use third-party services that may collect information used to identify you.",
    ],
  },
  {
    id: "thirdParty",
    title: "Third-Party Services",
    icon: Users,
    content: [
      "Link to the privacy policy of third-party service providers used by the app:",
      "• Google Play Services",
    ],
  },
  {
    id: "logData",
    title: "Log Data",
    icon: FileText,
    content: [
      'We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol ("IP") address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.',
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    icon: Shield,
    content: [
      "Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.",
      'This Service does not use these "cookies" explicitly. However, the app may use third-party code and libraries that use "cookies" to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.',
    ],
  },
  {
    id: "serviceProviders",
    title: "Service Providers",
    icon: Users,
    content: [
      "We may employ third-party companies and individuals due to the following reasons:",
      "• To facilitate our Service;\n• To provide the Service on our behalf;\n• To perform Service-related services; or\n• To assist us in analyzing how our Service is used.",
      "We want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.",
    ],
  },
  {
    id: "security",
    title: "Security",
    icon: Lock,
    content: [
      "We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.",
    ],
  },
  {
    id: "links",
    title: "Links to Other Sites",
    icon: FileText,
    content: [
      "This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.",
    ],
  },
  {
    id: "childrenPrivacy",
    title: "Children's Privacy",
    icon: Shield,
    content: [
      "These Services do not address anyone under the age of 18. We do not knowingly collect personally identifiable information from children under 18 years of age. In the case we discover that a child under 18 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do the necessary actions.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    icon: FileText,
    content: [
      "We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.",
      "This policy is effective as of 2024-02-16",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
    content: [
      "If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at info@taskdey.com.",
    ],
  },
];

const privacyStats = [
  { icon: Shield, value: "100%", label: "Data Protected" },
  { icon: Lock, value: "256-bit", label: "Encryption" },
  { icon: Eye, value: "Zero", label: "Data Selling" },
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
  "bg-quaternary",
];

export default function PrivacyPolicy() {
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
      <div className="absolute top-28 right-12 w-10 h-10 rounded-full bg-tertiary/10 hidden lg:block" />
      <div className="absolute bottom-40 left-10 w-6 h-6 rotate-45 bg-secondary/10 hidden lg:block" />
      <div className="absolute top-1/3 left-6 w-3 h-3 rounded-full bg-primary/15 hidden lg:block" />

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
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-xs sm:text-base text-muted-foreground max-w-xl mx-auto mb-2 sm:mb-3">
            Your privacy is important to us. Learn how we collect, use, and
            protect your information.
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground/70">
            Last updated: February 16, 2024
          </p>

          {/* Stats */}
          <div className="inline-flex items-center gap-3 sm:gap-5 bg-card border-2 border-border rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-hard-sm mt-5 sm:mt-8">
            {privacyStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
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
              );
            })}
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
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg sm:rounded-xl flex items-center justify-center border-2 border-foreground shadow-hard-sm">
              <Shield
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                strokeWidth={2.5}
              />
            </div>
            <div>
              <h2 className="font-heading text-xs sm:text-base font-bold text-foreground mb-1 sm:mb-2">
                Your Privacy Matters
              </h2>
              <p className="text-[10px] sm:text-sm text-muted-foreground leading-relaxed">
                At Taskdey, we are committed to protecting your personal
                information and being transparent about how we collect, use, and
                share your data.
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
                    isExpanded ? "shadow-hard" : "hover:shadow-hard hover:-translate-y-0.5"
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
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground transition-transform duration-300 ${
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
                                className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground leading-relaxed whitespace-pre-line"
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
            Questions About Privacy?
          </h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-5 max-w-md mx-auto">
            If you have any questions or concerns about our privacy practices,
            we&apos;re here to help.
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
