"use client";

import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import {
  ArrowRight,
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Users,
} from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: string;
}

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    value: "info@taskdey.com",
    action: "mailto:info@taskdey.com",
    color: "bg-primary",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+233 241-940783",
    action: "tel:+233241940783",
    color: "bg-secondary",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    value: "WhatsApp",
    action: "https://wa.me/+233241940783",
    color: "bg-quaternary",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Hohoe, Ghana",
    action: "#",
    color: "bg-tertiary",
  },
];

const inquiryTypes = [
  { value: "general", label: "General Inquiry" },
  { value: "support", label: "Technical Support" },
  { value: "sales", label: "Sales & Pricing" },
  { value: "partnership", label: "Partnership" },
  { value: "feedback", label: "Feedback" },
];

const stats = [
  { icon: Users, value: "1K+", label: "Happy Customers" },
  { icon: Headphones, value: "24/7", label: "Support" },
  { icon: Clock, value: "<2hrs", label: "Response Time" },
];

const inputClass =
  "w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-border rounded-lg sm:rounded-xl bg-card text-foreground text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground transition-all";

const labelClass =
  "block text-[10px] sm:text-xs font-bold text-foreground uppercase tracking-wide mb-1 sm:mb-1.5";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
    } catch {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 sm:pb-20 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-24 right-10 w-12 h-12 rounded-full bg-tertiary/10 hidden lg:block" />
      <div className="absolute bottom-32 left-8 w-7 h-7 rotate-45 bg-secondary/10 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Contact Us
          </motion.span>

          <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-2 sm:mb-3">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xs sm:text-base text-muted-foreground max-w-xl mx-auto mb-5 sm:mb-8">
            Have questions about Taskdey? We&apos;re here to help. Reach out and
            we&apos;ll get back to you quickly.
          </p>

          {/* Stats */}
          <div className="inline-flex items-center gap-3 sm:gap-5 bg-card border-2 border-border rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-hard-sm">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3 sm:gap-5">
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

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-14"
        >
          {contactMethods.map((method, i) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.title}
                href={method.action}
                target={method.action.startsWith("http") ? "_blank" : undefined}
                rel={method.action.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                className="group bg-card border-2 border-border rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-hard-sm hover:shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-1 text-center"
              >
                <div
                  className={`inline-flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 ${method.color} rounded-xl border-2 border-foreground shadow-hard-sm mb-2 sm:mb-3`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-[11px] sm:text-sm font-bold text-foreground mb-0.5">
                  {method.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-primary font-semibold group-hover:underline">
                  {method.value}
                </p>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 order-2 lg:order-1"
          >
            <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-hard">
              <h2 className="font-heading text-base sm:text-xl font-extrabold text-foreground mb-4 sm:mb-6">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={inputClass}
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiryType" className={labelClass}>
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className={inputClass}
                    >
                      {inquiryTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={labelClass}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us more..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-bold text-xs sm:text-sm py-2.5 sm:py-3 px-6 rounded-full border-2 border-foreground shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-hard-hover flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 order-1 lg:order-2 space-y-3 sm:space-y-4"
          >
            {/* Info card */}
            <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-hard-sm">
              <h3 className="font-heading text-sm sm:text-base font-bold text-foreground mb-2 sm:mb-3">
                Let&apos;s start a conversation
              </h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
                We&apos;re here to help and answer any question you might have.
                We look forward to hearing from you.
              </p>
            </div>

            {/* Office Hours */}
            <div className="bg-primary/5 border-2 border-primary/15 rounded-xl sm:rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center border-2 border-foreground shadow-hard-sm">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-xs sm:text-sm font-bold text-foreground">
                  Office Hours
                </h3>
              </div>
              <div className="space-y-1 text-[10px] sm:text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold text-foreground">8AM - 6PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold text-foreground">9AM - 2PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold text-foreground">Closed</span>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-hard-sm">
              <h3 className="font-heading text-xs sm:text-sm font-bold text-foreground mb-1 sm:mb-2">
                Quick answers?
              </h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">
                Check our FAQ for immediate answers to common questions.
              </p>
              <Link
                href="/#faq"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline"
              >
                Visit FAQ
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-10 sm:mt-16"
        >
          <div className="bg-primary border-2 border-foreground rounded-xl sm:rounded-2xl p-5 sm:p-8 text-primary-foreground shadow-hard max-w-xl mx-auto relative overflow-hidden">
            <div className="absolute top-2 right-3 w-5 h-5 rounded-full bg-white/10 hidden sm:block" />
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

      <Toaster />
    </div>
  );
}
