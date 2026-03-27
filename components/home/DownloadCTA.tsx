"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Download,
  Smartphone,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const APP_STORE_URL =
  "https://apps.apple.com/gh/app/taskdey/id6739984570";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.barrister1990.joymish&pcampaignid=web_share";

const partnerLogos = [
  "/images/yea.jpeg",
  "/images/moe.jpeg",
  "/images/nss.jpeg",
  "/images/tvet.png",
];

const highlights = [
  { label: "Instant Booking", icon: CheckCircle },
  { label: "Top Rated Workers", icon: Star },
];

export default function DownloadCTA() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-primary relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-8 right-10 w-16 h-16 rounded-full bg-white/5 hidden lg:block" />
      <div className="absolute bottom-12 left-8 w-8 h-8 rotate-45 bg-white/5 hidden lg:block" />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-[20%] w-5 h-5 rounded-full bg-tertiary/20 hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 right-[15%] w-4 h-4 bg-secondary/20 rotate-12 hidden lg:block"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-14 text-primary-foreground"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold border-2 border-white/20 mb-3 sm:mb-4"
          >
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-tertiary" />
            <span>4.9/5 Rating &bull; 1K+ Downloads</span>
          </motion.span>

          <h2 className="font-heading text-xl sm:text-3xl lg:text-5xl font-extrabold mb-2 sm:mb-4">
            Transform Your
            <br />
            <span className="text-tertiary">Service Experience</span>
          </h2>
          <p className="text-xs sm:text-base text-white/80 max-w-2xl mx-auto">
            Join thousands of satisfied users on Ghana&apos;s leading service
            marketplace. Download Taskdey today.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-10 sm:mb-16"
        >
          {[
            { value: "500+", label: "Happy Users" },
            { value: "270+", label: "Services Booked" },
            { value: "500+", label: "Providers" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 border-2 border-white/15 rounded-xl sm:rounded-2xl px-4 py-2 sm:px-6 sm:py-3 text-center text-primary-foreground"
            >
              <div className="font-heading text-lg sm:text-2xl font-extrabold">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs text-white/70 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main content: Phone + Download */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Phone Mockup Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative flex justify-center order-2 lg:order-1"
          >
            <div className="relative w-48 sm:w-64 lg:w-72">
              {/* Phone frame */}
              <div className="relative aspect-[9/19] bg-card border-[3px] border-foreground rounded-[2rem] sm:rounded-[2.5rem] shadow-hard overflow-hidden">
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-[5px] bg-foreground/20 rounded-full z-20" />

                {/* Placeholder content — replace this Image with your phone mockup screenshot */}
                <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary flex flex-col items-center justify-center text-primary-foreground p-4 sm:p-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 border-2 border-white/30">
                    <Smartphone className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-heading text-sm sm:text-lg font-extrabold mb-1">
                    Taskdey App
                  </h3>
                  <p className="text-[10px] sm:text-xs text-white/70 text-center">
                    Replace with phone mockup
                  </p>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.6 }}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-quaternary text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold border-2 border-foreground shadow-hard-sm z-10"
              >
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
                  Verified
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.8 }}
                className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-tertiary text-tertiary-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold border-2 border-foreground shadow-hard-sm z-10"
              >
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                  4.9 Stars
                </span>
              </motion.div>

              {/* Decorative shapes */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 left-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-secondary border-2 border-foreground shadow-hard-sm hidden sm:block"
              />
              <motion.div
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 right-8 w-5 h-5 bg-quaternary/60 border-2 border-foreground rotate-12 hidden sm:block"
              />
            </div>
          </motion.div>

          {/* Right Side — Download Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 space-y-4 sm:space-y-6 text-primary-foreground"
          >
            <div className="text-center lg:text-left">
              <h3 className="font-heading text-lg sm:text-2xl font-extrabold mb-1 sm:mb-2">
                Get the App Now
              </h3>
              <p className="text-xs sm:text-sm text-white/70">
                Click the buttons below to download Taskdey
              </p>
            </div>

            {/* Download Buttons */}
            <div className="space-y-3 sm:space-y-4">
              {/* App Store */}
              <Button
                size="lg"
                className="group w-full bg-card hover:bg-card/90 text-foreground h-12 sm:h-14 px-4 sm:px-6 rounded-xl sm:rounded-2xl border-2 border-foreground shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-hard-hover"
                asChild
              >
                <Link href={APP_STORE_URL} target="_blank">
                  <div className="flex items-center gap-2.5 sm:gap-3 w-full">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="text-left flex-1">
                      <div className="text-[10px] sm:text-xs opacity-70">Download on the</div>
                      <div className="text-xs sm:text-sm font-bold">App Store</div>
                    </div>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </Button>

              {/* Google Play */}
              <Button
                size="lg"
                className="group w-full bg-card hover:bg-card/90 text-foreground h-12 sm:h-14 px-4 sm:px-6 rounded-xl sm:rounded-2xl border-2 border-foreground shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-hard-hover"
                asChild
              >
                <Link href={PLAY_STORE_URL} target="_blank">
                  <div className="flex items-center gap-2.5 sm:gap-3 w-full">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div className="text-left flex-1">
                      <div className="text-[10px] sm:text-xs opacity-70">Get it on</div>
                      <div className="text-xs sm:text-sm font-bold">Google Play</div>
                    </div>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </Button>
            </div>

            {/* Highlights */}
            <div className="flex gap-2 sm:gap-3">
              {highlights.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex-1 flex items-center gap-1.5 sm:gap-2 bg-white/10 border-2 border-white/15 rounded-xl px-3 py-2 sm:px-4 sm:py-3"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-tertiary flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-[10px] sm:text-xs font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Partner Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10 sm:mt-16 pt-8 sm:pt-10 border-t-2 border-white/10"
        >
          <p className="text-[10px] sm:text-xs text-white/50 font-semibold uppercase tracking-wider mb-4 sm:mb-6">
            Trusted by leading organisations
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5">
            {partnerLogos.map((logo, index) => (
              <div
                key={index}
                className="w-16 h-8 sm:w-24 sm:h-12 bg-white/10 border-2 border-white/10 rounded-lg sm:rounded-xl flex items-center justify-center p-1.5 sm:p-2"
              >
                <Image
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  width={80}
                  height={40}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
