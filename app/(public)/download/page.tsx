"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,

  Star,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Users,
    title: "Connect Instantly",
    description: "Find skilled workers in your area",
    color: "bg-primary",
  },
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "Verified profiles and reviews",
    color: "bg-quaternary",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Quick booking and responses",
    color: "bg-tertiary",
  },
];

const screenshots = [
  "/images/app-screenshot-1.jpg",
  "/images/app-screenshot-2.jpg",
  "/images/app-screenshot-3.jpg",
  "/images/app-screenshot-4.jpg",
  "/images/app-screenshot-5.jpg",
  "/images/app-screenshot-6.jpg",
  "/images/app-screenshot-7.jpg",
  "/images/app-screenshot-8.jpg",
  "/images/app-screenshot-9.jpg",
  "/images/app-screenshot-10.jpg",
  "/images/app-screenshot-11.jpg",
];

export default function Download() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-20 pb-12 sm:pb-20">
      {/* Decorative shapes */}
      <div className="absolute top-24 right-10 w-14 h-14 rounded-full bg-tertiary/10 hidden lg:block" />
      <div className="absolute bottom-32 left-8 w-8 h-8 rotate-45 bg-secondary/10 hidden lg:block" />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 left-[18%] w-5 h-5 rounded-full bg-quaternary/15 hidden lg:block"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold border-2 border-foreground shadow-hard-sm mb-3 sm:mb-4"
          >
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-tertiary" />
            <span>4.9 rated app</span>
          </motion.span>

          <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-2 sm:mb-3">
            Download <span className="text-primary">Taskdey</span>
            <br />
            <span className="text-xl sm:text-3xl lg:text-4xl">Today</span>
          </h1>

          <p className="text-xs sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Connect with skilled workers in your area. Get things done faster,
            easier, and more reliably than ever before.
          </p>
        </motion.div>

        {/* Main: Features + Download Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center mb-10 sm:mb-16">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-2.5 sm:space-y-4 order-2 lg:order-1"
          >
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="group flex items-center gap-2.5 sm:gap-4 bg-card border-2 border-border rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-hard-sm hover:shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-0.5"
                >
                  <div
                    className={`w-9 h-9 sm:w-12 sm:h-12 ${feat.color} rounded-xl flex items-center justify-center border-2 border-foreground shadow-hard-sm flex-shrink-0`}
                  >
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      {feat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2 sm:pt-4"
            >
              <Button
                size="lg"
                className="group flex-1 bg-foreground hover:bg-foreground text-background h-12 sm:h-14 px-5 rounded-full border-2 border-foreground shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-hard-hover"
                asChild
              >
                <Link href="https://apps.apple.com/gh/app/taskdey/id6739984570" target="_blank">
                  <div className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-[9px] sm:text-xs opacity-80">Download on the</div>
                      <div className="text-xs sm:text-sm font-bold">App Store</div>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </Button>

              <Button
                size="lg"
                className="group flex-1 bg-foreground hover:bg-foreground text-background h-12 sm:h-14 px-5 rounded-full border-2 border-foreground shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-hard-hover"
                asChild
              >
                <Link href="https://play.google.com/store/apps/details?id=com.barrister1990.joymish&pcampaignid=web_share" target="_blank">
                  <div className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-[9px] sm:text-xs opacity-80">Get it on</div>
                      <div className="text-xs sm:text-sm font-bold">Google Play</div>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Phone Mockup Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex justify-center order-1 lg:order-2"
          >
            <div className="relative w-44 sm:w-56 lg:w-64">
              <div className="relative aspect-[9/19] bg-card border-[3px] border-foreground rounded-[2rem] sm:rounded-[2.5rem] shadow-hard overflow-hidden">
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 sm:w-20 h-[4px] sm:h-[5px] bg-foreground/20 rounded-full z-20" />

                <Image
                  src="/images/app-screenshot-1.jpg"
                  alt="Taskdey app screenshot"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 176px, (max-width: 1024px) 224px, 256px"
                  priority
                />
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.7 }}
                className="absolute -top-2.5 -right-2.5 sm:-top-4 sm:-right-4 bg-tertiary text-tertiary-foreground px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-bold border-2 border-foreground shadow-hard-sm z-10"
              >
                <span className="flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                  4.9
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.9 }}
                className="absolute -bottom-2.5 -left-2.5 sm:-bottom-4 sm:-left-4 bg-quaternary text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-bold border-2 border-foreground shadow-hard-sm z-10"
              >
                <span className="flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3" strokeWidth={2.5} />
                  Verified
                </span>
              </motion.div>

              {/* Decorative shapes */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 left-3 w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-secondary border-2 border-foreground shadow-hard-sm hidden sm:block"
              />
            </div>
          </motion.div>
        </div>

        {/* Screenshots Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="font-heading text-base sm:text-xl font-extrabold text-foreground mb-1">
              App Screenshots
            </h3>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Swipe to explore the app
            </p>
          </div>

          <div className="relative -mx-4 sm:mx-0">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div
              className="flex gap-2 sm:gap-4 overflow-x-auto pb-3 px-6 sm:px-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {screenshots.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.5) }}
                  className="flex-shrink-0"
                >
                  <div className="relative w-24 sm:w-36 lg:w-44 aspect-[9/19] bg-card border-2 border-border rounded-xl sm:rounded-2xl overflow-hidden shadow-hard-sm hover:shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-1">
                    {/* Mini notch */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-[3px] bg-foreground/15 rounded-full z-10" />
                    <Image
                      src={src}
                      alt={`App Screenshot ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 96px, (max-width: 1024px) 144px, 176px"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mt-8 sm:mt-14"
        >
          <div className="inline-flex items-center gap-4 sm:gap-6 bg-card border-2 border-border rounded-full px-5 py-2.5 sm:px-7 sm:py-3 shadow-hard-sm">
            {[
              { value: "1K+", label: "Users" },
              { value: "4.9★", label: "Rating" },
              { value: "270+", label: "Tasks Done" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4 sm:gap-6">
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
      </div>
    </div>
  );
}
