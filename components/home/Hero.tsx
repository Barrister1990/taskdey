"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Smartphone, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const bounceTransition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

function DotPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-40 dark:opacity-20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" className="fill-muted-foreground/30" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

function SquiggleDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 12"
      className={`w-32 h-3 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 6 Q 10 0, 20 6 T 40 6 T 60 6 T 80 6 T 100 6 T 120 6 T 140 6 T 160 6 T 180 6 T 200 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Large amber circle behind text */}
      <div className="absolute -left-20 top-1/4 w-[500px] h-[500px] rounded-full bg-tertiary/20 dark:bg-tertiary/10 blur-sm pointer-events-none" />

      {/* Small floating decorative shapes */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[15%] w-6 h-6 rounded-full bg-secondary/60 dark:bg-secondary/40 hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-32 left-[10%] w-4 h-4 rotate-45 bg-quaternary/60 dark:bg-quaternary/40 hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-40 left-[45%] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-primary/40 hidden lg:block"
      />

      <div className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* --- Text Left --- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left order-2 lg:order-1 relative z-10"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...bounceTransition, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold border-2 border-foreground shadow-hard-sm mb-8"
              >
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20">
                  <span className="text-xs">&#9733;</span>
                </span>
                <span>Trusted by 10,000+ Ghanaians</span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-2"
              >
                <span className="text-primary">Trusted Vocational</span>
                <br />
                <span className="text-foreground">Services,{" "}</span>
                <span className="relative inline-block">
                  <span className="text-foreground">On Demand</span>
                  <SquiggleDivider className="absolute -bottom-1 left-0 text-tertiary w-full" />
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Connect instantly with verified local workers across Ghana.
                Download our free app and get things done faster.
              </motion.p>

              {/* Feature pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10"
              >
                {[
                  { icon: Shield, label: "Verified Workers", color: "bg-quaternary" },
                  { icon: Users, label: "Instant Matching", color: "bg-primary" },
                  { icon: Smartphone, label: "Easy Booking", color: "bg-secondary" },
                ].map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 bg-card border-2 border-border rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-hard-sm"
                  >
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full ${color} text-white`}>
                      <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </span>
                    <span>{label}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                {/* Apple */}
                <Button
                  size="lg"
                  className="group relative bg-foreground hover:bg-foreground text-background h-14 px-6 rounded-full border-2 border-foreground shadow-hard transition-all duration-300 ease-bounce hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-hard-active"
                  asChild
                >
                  <Link href="https://apps.apple.com/gh/app/taskdey/id6739984570">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                      <div className="text-left">
                        <div className="text-xs opacity-80">Download on the</div>
                        <div className="text-sm font-bold">App Store</div>
                      </div>
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 ml-1 group-hover:translate-x-0.5 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </Button>

                {/* Google Play */}
                <Button
                  size="lg"
                  className="group relative bg-transparent hover:bg-tertiary text-foreground h-14 px-6 rounded-full border-2 border-foreground transition-all duration-300 ease-bounce hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-x-0.5 active:translate-y-0.5"
                  asChild
                >
                  <Link href="https://play.google.com/store/apps/details?id=com.barrister1990.joymish&pcampaignid=web_share">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                      </svg>
                      <div className="text-left">
                        <div className="text-xs opacity-80">Get it on</div>
                        <div className="text-sm font-bold">Google Play</div>
                      </div>
                    </div>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* --- Image Right --- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative order-1 lg:order-2 flex justify-center"
            >
              {/* Dot pattern behind image */}
              <div className="absolute inset-0 -inset-x-6 -inset-y-6 rounded-3xl overflow-hidden pointer-events-none">
                <DotPattern />
              </div>

              {/* Main image with blob mask */}
              <div className="relative w-full max-w-md aspect-[4/5]">
                <div
                  className="relative w-full h-full overflow-hidden border-[3px] border-foreground shadow-hard"
                  style={{
                    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                  }}
                >
                  <Image
                    src="/images/hero-worker.jpg"
                    alt="Skilled worker providing vocational services in Ghana"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 90vw, 450px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                </div>

                {/* Floating badge top-left */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...bounceTransition, delay: 0.8 }}
                  className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-quaternary text-white px-4 py-2 rounded-full text-sm font-bold border-2 border-foreground shadow-hard-sm z-10"
                >
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4" strokeWidth={2.5} />
                    Verified
                  </span>
                </motion.div>

                {/* Floating badge top-right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...bounceTransition, delay: 1.0 }}
                  className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold border-2 border-foreground shadow-hard-sm z-10"
                >
                  Fast Match
                </motion.div>

                {/* Bottom pill */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-card text-foreground px-5 py-2.5 rounded-full text-sm font-bold border-2 border-foreground shadow-hard z-10 whitespace-nowrap"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-1.5">
                      <div className="w-5 h-5 bg-primary rounded-full border-2 border-card" />
                      <div className="w-5 h-5 bg-quaternary rounded-full border-2 border-card" />
                      <div className="w-5 h-5 bg-secondary rounded-full border-2 border-card" />
                    </div>
                    <span>10k+ Users</span>
                  </div>
                </motion.div>

                {/* Decorative shape: small amber circle */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-8 -right-6 w-10 h-10 rounded-full bg-tertiary border-2 border-foreground shadow-hard-sm hidden sm:block"
                />

                {/* Decorative shape: small violet square */}
                <motion.div
                  animate={{ rotate: [0, 15, 0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-8 right-12 w-6 h-6 bg-secondary/70 border-2 border-foreground rotate-12 hidden sm:block"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
