"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Clock,
  CreditCard,
  HelpCircle,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

const accentColors = [
  "bg-primary",
  "bg-secondary",
  "bg-tertiary",
  "bg-quaternary",
  "bg-primary",
  "bg-secondary",
  "bg-tertiary",
  "bg-quaternary",
];

interface FaqItem {
  question: string;
  answer: string;
  icon: LucideIcon;
}

const FAQ_CATEGORIES: Record<string, FaqItem[]> = {
  clients: [
    {
      question: "How do I book a service on Taskdey?",
      answer:
        "Download the Taskdey app from Google Play Store or Apple App Store. Create your account, browse available workers in your area, view their profiles and ratings, then send a request directly. Once accepted, coordinate the details and schedule directly with your chosen worker.",
      icon: Users,
    },
    {
      question: "Are all workers on Taskdey verified and trustworthy?",
      answer:
        "Yes, every worker undergoes comprehensive background checks, identity verification, and skill assessment before joining our platform. We also maintain a rating system where clients can review workers after each job, ensuring quality and accountability.",
      icon: Shield,
    },
    {
      question: "How do payments work on Taskdey?",
      answer:
        "Taskdey does not process payments directly. Payment methods and amounts are agreed upon between you and the worker. Common payment options include Mobile Money (MTN, Vodafone, AirtelTigo), cash, or bank transfers.",
      icon: CreditCard,
    },
    {
      question: "What types of services are available?",
      answer:
        "Taskdey offers a wide range of home services including plumbing, electrical work, cleaning, carpentry, painting, appliance repair, gardening, and many more.",
      icon: Briefcase,
    },
    {
      question: "How do I find workers in my area?",
      answer:
        "Our GPS-powered location system automatically shows you available workers near your location. You can filter by service type, ratings, availability, and distance to find the perfect match.",
      icon: MapPin,
    },
    {
      question: "What if I'm not satisfied with the work?",
      answer:
        "We take quality seriously. You can rate and review workers after each job. If you encounter issues, contact our support team immediately. We work with both parties to resolve disputes.",
      icon: Star,
    },
    {
      question: "Is there customer support available?",
      answer:
        "Yes! Our customer support team is available 24/7 to help with any questions or issues. You can reach us through the app's live chat, phone, or email.",
      icon: Phone,
    },
    {
      question: "How far in advance should I book a service?",
      answer:
        "Many workers are available for same-day or next-day services. However, for specialized services or during peak times, we recommend booking 2-3 days in advance.",
      icon: Clock,
    },
  ],
  workers: [
    {
      question: "How do I join Taskdey as a service provider?",
      answer:
        "Download the Taskdey app, complete your detailed profile with photos and service descriptions, verify your identity and skills through our verification process, and start receiving job requests.",
      icon: Briefcase,
    },
    {
      question: "How much can I realistically earn on Taskdey?",
      answer:
        "Earnings vary based on your skills, experience, and availability. Many active workers earn GH₵2,000-8,000 monthly working flexible hours. Specialized skills typically command higher rates.",
      icon: CreditCard,
    },
    {
      question: "How do I receive payments from clients?",
      answer:
        "Since Taskdey doesn't process payments, you negotiate payment terms directly with clients. Most workers accept Mobile Money (MTN, Vodafone, AirtelTigo), cash, or bank transfers.",
      icon: CreditCard,
    },
    {
      question: "What is the verification process like?",
      answer:
        "Our verification includes identity confirmation, skills assessment, background checks, and reference verification. This process typically takes 2-3 business days.",
      icon: Shield,
    },
    {
      question: "How do I get more job requests?",
      answer:
        "Maintain a complete profile with clear photos, competitive pricing, prompt responses to requests, and excellent service quality. Higher ratings significantly increase your visibility.",
      icon: Star,
    },
    {
      question: "Can I set my own rates and working hours?",
      answer:
        "Absolutely! You have complete control over your pricing and availability. Set your rates based on your skills and market demand, and choose when you want to work.",
      icon: Clock,
    },
    {
      question: "What happens if there's a dispute with a client?",
      answer:
        "Our support team mediates disputes fairly. We encourage clear communication and documentation of work. Both parties can contact support for resolution.",
      icon: MessageCircle,
    },
    {
      question: "Is there support for workers on the platform?",
      answer:
        "Yes! We provide 24/7 support, business tips, and resources to help you succeed. Our team is available via app chat, phone, or email.",
      icon: Phone,
    },
  ],
};

function FaqList({ items, tabKey }: { items: FaqItem[]; tabKey: string }) {
  return (
    <Accordion type="single" collapsible className="space-y-2 sm:space-y-3">
      {items.map((faq, index) => {
        const IconComponent = faq.icon;
        const color = accentColors[index % accentColors.length];
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <AccordionItem
              value={`${tabKey}-${index}`}
              className="bg-card border-2 border-border rounded-xl sm:rounded-2xl shadow-hard-sm hover:shadow-hard transition-all duration-300 ease-bounce px-3 sm:px-5 py-0.5 sm:py-1 data-[state=open]:shadow-hard"
            >
              <AccordionTrigger className="text-left hover:no-underline group py-2.5 sm:py-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={`flex-shrink-0 w-7 h-7 sm:w-10 sm:h-10 ${color} rounded-lg sm:rounded-xl flex items-center justify-center border-2 border-foreground shadow-hard-sm`}
                  >
                    <IconComponent className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-[11px] sm:text-sm lg:text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground leading-relaxed pb-2.5 sm:pb-4 ml-9 sm:ml-13">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        );
      })}
    </Accordion>
  );
}

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("clients");

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-muted/50 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-16 right-10 w-10 h-10 rounded-full bg-tertiary/10 hidden lg:block" />
      <div className="absolute bottom-24 left-8 w-6 h-6 rotate-45 bg-secondary/10 hidden lg:block" />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 left-[15%] w-4 h-4 rounded-full bg-quaternary/15 hidden lg:block"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold border-2 border-primary/20 mb-3 sm:mb-4"
          >
            <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={2.5} />
            <span>FAQ</span>
          </motion.span>

          <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-2 sm:mb-4">
            <span className="text-primary">Frequently Asked</span>
            <br />
            <span>Questions</span>
          </h2>
          <p className="text-xs sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about using Taskdey as a client or
            service provider.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-6 sm:mb-10"
        >
          <div className="inline-flex bg-card border-2 border-border rounded-full p-1 shadow-hard-sm">
            <button
              onClick={() => setActiveTab("clients")}
              className={`relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ease-bounce flex items-center gap-1.5 sm:gap-2 ${
                activeTab === "clients"
                  ? "bg-primary text-primary-foreground border-2 border-foreground shadow-hard-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
              <span>For Clients</span>
            </button>
            <button
              onClick={() => setActiveTab("workers")}
              className={`relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ease-bounce flex items-center gap-1.5 sm:gap-2 ${
                activeTab === "workers"
                  ? "bg-primary text-primary-foreground border-2 border-foreground shadow-hard-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
              <span>For Workers</span>
            </button>
          </div>
        </motion.div>

        {/* FAQ Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <FaqList
              items={FAQ_CATEGORIES[activeTab]}
              tabKey={activeTab}
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10 sm:mt-16"
        >
          <div className="relative bg-primary border-2 border-foreground rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-primary-foreground shadow-hard overflow-hidden max-w-2xl mx-auto">
            {/* Decorative shapes */}
            <div className="absolute top-3 right-4 w-6 h-6 rounded-full bg-white/10 hidden sm:block" />
            <div className="absolute bottom-4 left-5 w-4 h-4 rotate-45 bg-white/10 hidden sm:block" />

            <div className="relative">
              <div className="inline-flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 bg-white/20 rounded-xl sm:rounded-2xl border-2 border-white/30 mb-3 sm:mb-5">
                <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={2.5} />
              </div>
              <h3 className="font-heading text-lg sm:text-2xl font-extrabold mb-2 sm:mb-3">
                Still Have Questions?
              </h3>
              <p className="text-xs sm:text-sm opacity-90 mb-4 sm:mb-6">
                Our support team is here to help you 24/7. Get in touch through
                the app or reach out directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center">
                <a
                  href="tel:+233241940783"
                  className="inline-flex items-center gap-1.5 sm:gap-2 bg-card text-primary px-4 py-2 rounded-full text-xs sm:text-sm font-bold border-2 border-foreground shadow-hard-sm transition-all duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-hard"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                  <span>24/7 Support</span>
                </a>
                <a
                  href="https://wa.me/+233241940783"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 px-4 py-2 rounded-full text-xs sm:text-sm font-bold border-2 border-white/30 transition-all duration-300 ease-bounce hover:-translate-y-0.5 hover:bg-white/30"
                >
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                  <span>Live Chat</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
