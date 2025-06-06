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
const clientSteps = [
  {
    title: "Download & Register",
    description:
      "Get the Taskdey app from Play Store or App Store and create your account with basic information.",
    icon: Smartphone,
    color: "bg-blue-500",
    darkColor: "dark:bg-blue-600",
  },
  {
    title: "Verify Your Account",
    description:
      "Complete your profile verification through phone number and email to ensure security.",
    icon: Shield,
    color: "bg-green-500",
    darkColor: "dark:bg-green-600",
  },
  {
    title: "Browse Workers",
    description:
      "Explore verified service providers in your area, check ratings and reviews.",
    icon: Search,
    color: "bg-purple-500",
    darkColor: "dark:bg-purple-600",
  },
  {
    title: "Book & Schedule",
    description:
      "Select your preferred worker, choose a convenient time, and schedule your appointment.",
    icon: Calendar,
    color: "bg-orange-500",
    darkColor: "dark:bg-orange-600",
  },
  {
    title: "Work Completed",
    description:
      "Your worker arrives on time, completes the job professionally, and you pay securely.",
    icon: CheckCircle,
    color: "bg-indigo-500",
    darkColor: "dark:bg-indigo-600",
  },
];

const workerSteps = [
  {
    title: "Download & Register",
    description:
      "Download the Taskdey app and sign up as a service provider with your professional details.",
    icon: Smartphone,
    color: "bg-blue-500",
    darkColor: "dark:bg-blue-600",
  },
  {
    title: "Set Up Profile",
    description:
      "Add your services, upload gallery photos, set your availability and pricing.",
    icon: Settings,
    color: "bg-cyan-500",
    darkColor: "dark:bg-cyan-600",
  },
  {
    title: "Upload Gallery",
    description:
      "Showcase your work with high-quality photos to attract more clients.",
    icon: Camera,
    color: "bg-pink-500",
    darkColor: "dark:bg-pink-600",
  },
  {
    title: "Verify Identity",
    description:
      "Complete identity verification and background checks to build trust with clients.",
    icon: UserCheck,
    color: "bg-green-500",
    darkColor: "dark:bg-green-600",
  },
  {
    title: "Get Bookings",
    description:
      "Receive booking requests, accept jobs that fit your schedule, and get paid instantly.",
    icon: DollarSign,
    color: "bg-yellow-500",
    darkColor: "dark:bg-yellow-600",
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("client");

  const currentSteps = activeTab === "client" ? clientSteps : workerSteps;

  return (
    <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-slate-900 dark:text-white">
            How Taskdey Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Whether you need services or want to provide them, getting started
            with Taskdey is simple and straightforward.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12 sm:mb-16"
        >
          <div className="bg-white dark:bg-slate-800 p-1 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab("client")}
                className={`relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 sm:gap-3 ${
                  activeTab === "client"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>For Clients</span>
                {activeTab === "client" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-indigo-600 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab("worker")}
                className={`relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 sm:gap-3 ${
                  activeTab === "worker"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>For Workers</span>
                {activeTab === "worker" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-indigo-600 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8"
          >
            {currentSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={`${activeTab}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Connecting Line (hidden on mobile, shown on larger screens) */}
                  {index < currentSteps.length - 1 && (
                    <div className="hidden xl:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800 z-0" />
                  )}

                  <div className="relative bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-slate-100 dark:border-slate-700 h-full">
                    {/* Step Number */}
                    <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 ${step.color} ${step.darkColor} rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 ${step.color}/10 ${step.darkColor}/20 rounded-2xl mb-4 sm:mb-6`}
                    >
                      <IconComponent
                        className={`w-6 h-6 sm:w-8 sm:h-8 ${step.color.replace(
                          "bg-",
                          "text-"
                        )} ${step.darkColor.replace("dark:bg-", "dark:text-")}`}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-400/5 dark:to-purple-400/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of{" "}
              {activeTab === "client"
                ? "satisfied customers"
                : "successful service providers"}{" "}
              who trust Taskdey
              {activeTab === "client"
                ? " for their home services."
                : " to grow their business."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/download">
                <button className="bg-white text-indigo-600 hover:bg-slate-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  Download Now!
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
