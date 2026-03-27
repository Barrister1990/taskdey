"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Camera,
  CheckCircle,
  DollarSign,
  Download,
  Search,
  Settings,
  Shield,
  Smartphone,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const accentColors = [
  { bg: "bg-primary", text: "text-primary", light: "bg-primary/10" },
  { bg: "bg-secondary", text: "text-secondary", light: "bg-secondary/10" },
  { bg: "bg-tertiary", text: "text-tertiary", light: "bg-tertiary/10" },
  { bg: "bg-quaternary", text: "text-quaternary", light: "bg-quaternary/10" },
  { bg: "bg-primary", text: "text-primary", light: "bg-primary/10" },
];

const clientSteps = [
  {
    title: "Download & Register",
    description:
      "Get the Taskdey app from Play Store or App Store and create your account.",
    icon: Smartphone,
  },
  {
    title: "Verify Your Account",
    description:
      "Complete profile verification through phone number and email for security.",
    icon: Shield,
  },
  {
    title: "Browse Workers",
    description:
      "Explore verified service providers in your area, check ratings and reviews.",
    icon: Search,
  },
  {
    title: "Book & Schedule",
    description:
      "Select your preferred worker, choose a time, and schedule your appointment.",
    icon: Calendar,
  },
  {
    title: "Work Completed",
    description:
      "Your worker arrives on time, completes the job, and you pay securely.",
    icon: CheckCircle,
  },
];

const workerSteps = [
  {
    title: "Download & Register",
    description:
      "Download the Taskdey app and sign up as a service provider with your details.",
    icon: Smartphone,
  },
  {
    title: "Set Up Profile",
    description:
      "Add your services, upload gallery photos, set your availability and pricing.",
    icon: Settings,
  },
  {
    title: "Upload Gallery",
    description:
      "Showcase your work with high-quality photos to attract more clients.",
    icon: Camera,
  },
  {
    title: "Verify Identity",
    description:
      "Complete identity verification and background checks to build trust.",
    icon: UserCheck,
  },
  {
    title: "Get Bookings",
    description:
      "Receive booking requests, accept jobs, and get paid instantly.",
    icon: DollarSign,
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("client");
  const currentSteps = activeTab === "client" ? clientSteps : workerSteps;

  return (
    <section className="py-12 sm:py-20 bg-muted/50 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-tertiary/10 hidden lg:block" />
      <div className="absolute bottom-20 left-8 w-10 h-10 rotate-12 bg-secondary/10 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-primary/10 text-primary px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold border-2 border-primary/20 mb-3 sm:mb-4"
          >
            Simple Process
          </motion.span>
          <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-2 sm:mb-4">
            How Taskdey Works
          </h2>
          <p className="text-xs sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Whether you need services or want to provide them, getting started
            is simple and straightforward.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8 sm:mb-14"
        >
          <div className="inline-flex bg-card border-2 border-border rounded-full p-1 shadow-hard-sm">
            <button
              onClick={() => setActiveTab("client")}
              className={`relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ease-bounce flex items-center gap-1.5 sm:gap-2 ${
                activeTab === "client"
                  ? "bg-primary text-primary-foreground border-2 border-foreground shadow-hard-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
              <span>For Clients</span>
            </button>
            <button
              onClick={() => setActiveTab("worker")}
              className={`relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ease-bounce flex items-center gap-1.5 sm:gap-2 ${
                activeTab === "worker"
                  ? "bg-primary text-primary-foreground border-2 border-foreground shadow-hard-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
              <span>For Workers</span>
            </button>
          </div>
        </motion.div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-5 lg:gap-6"
          >
            {currentSteps.map((step, index) => {
              const IconComponent = step.icon;
              const color = accentColors[index];
              return (
                <motion.div
                  key={`${activeTab}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`relative group ${index === 4 ? "col-span-2 sm:col-span-2 lg:col-span-1 max-w-[50%] sm:max-w-none mx-auto lg:mx-0" : ""}`}
                >
                  {/* Dashed connecting line (xl only) */}
                  {index < currentSteps.length - 1 && (
                    <div className="hidden xl:block absolute top-10 left-[calc(100%+2px)] w-[calc(100%-52px)] z-0 pointer-events-none">
                      <svg width="100%" height="2" className="overflow-visible">
                        <line
                          x1="0"
                          y1="1"
                          x2="100%"
                          y2="1"
                          stroke="hsl(var(--border))"
                          strokeWidth="2"
                          strokeDasharray="6 4"
                        />
                      </svg>
                    </div>
                  )}

                  <div className="relative bg-card border-2 border-border rounded-xl sm:rounded-2xl p-3 sm:p-5 lg:p-6 shadow-hard-sm hover:shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-1 h-full">
                    {/* Step Number Badge */}
                    <div className="absolute -top-2.5 -left-2.5 sm:-top-3 sm:-left-3">
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 ${color.bg} rounded-full flex items-center justify-center text-white font-bold text-[10px] sm:text-xs border-2 border-foreground shadow-hard-sm`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 ${color.light} rounded-xl mb-2 sm:mb-4`}
                    >
                      <IconComponent
                        className={`w-4 h-4 sm:w-6 sm:h-6 ${color.text}`}
                        strokeWidth={2.5}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="font-heading text-xs sm:text-sm lg:text-base font-bold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10 sm:mt-16"
        >
          <div className="bg-primary border-2 border-foreground rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 text-primary-foreground shadow-hard relative overflow-hidden">
            {/* Decorative shapes inside CTA */}
            <div className="absolute top-3 right-4 w-8 h-8 rounded-full bg-white/10 hidden sm:block" />
            <div className="absolute bottom-4 left-6 w-5 h-5 rotate-45 bg-white/10 hidden sm:block" />

            <h3 className="font-heading text-lg sm:text-2xl lg:text-3xl font-extrabold mb-2 sm:mb-3">
              Ready to Get Started?
            </h3>
            <p className="text-xs sm:text-sm lg:text-base opacity-90 mb-4 sm:mb-6 max-w-2xl mx-auto">
              Join thousands of{" "}
              {activeTab === "client"
                ? "satisfied customers"
                : "successful service providers"}{" "}
              who trust Taskdey
              {activeTab === "client"
                ? " for their home services."
                : " to grow their business."}
            </p>
            <Link href="/download">
              <button className="bg-card text-primary hover:bg-card/90 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm border-2 border-foreground shadow-hard-sm transition-all duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-hard inline-flex items-center gap-2">
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                Download Now!
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
