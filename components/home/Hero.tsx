"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, Smartphone, Star, Users } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 dark:from-indigo-400/10 dark:to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-indigo-400/20 dark:from-blue-400/10 dark:to-indigo-400/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Star className="w-4 h-4 fill-current" />
                <span>Trusted by 10,000+ Ghanaians</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">
                  Trusted Vocational
                </span>
                <br />
                <span className="text-slate-900 dark:text-white">Services, On Demand</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Connect instantly with verified local workers across Ghana. 
                Download our free app and get things done faster.
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8 text-sm text-slate-600 dark:text-slate-400"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Verified Workers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Instant Matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-purple-500" />
                  <span>Easy Booking</span>
                </div>
              </motion.div>

              {/* Download Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  size="lg"
                  className="bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black h-14 px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link href="https://apps.apple.com/app/taskdey">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs opacity-90">Download on the</div>
                        <div className="text-sm font-semibold">App Store</div>
                      </div>
                    </div>
                  </Link>
                </Button>
                
                <Button
                  size="lg"
                  className="bg-black hover:bg-black/90 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black h-14 px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link href="https://play.google.com/store/apps/details?id=com.taskdey.app">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-xs opacity-90">Get it on</div>
                        <div className="text-sm font-semibold">Google Play</div>
                      </div>
                    </div>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Phone Mockup Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative max-w-sm mx-auto">
                {/* Floating elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute -top-4 -left-4 bg-green-500 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg z-10"
                >
                  ✓ Verified
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="absolute -top-2 -right-4 bg-blue-500 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg z-10"
                >
                  Fast Match
                </motion.div>

                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 dark:from-indigo-500/20 dark:to-purple-500/20 rounded-[3rem] blur-3xl scale-110" />
                
                {/* Phone container */}
                <div className="w-full flex justify-center">
  <div className="relative w-full max-w-[220px] sm:max-w-[260px] aspect-[9/19.5]">
    {/* Phone Frame */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-700 dark:to-slate-900 rounded-[2rem] p-[8px] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden bg-white dark:bg-slate-800">
        
        {/* Notch */}
        <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-16 h-[5px] bg-black/70 dark:bg-white/10 rounded-full z-20" />

        {/* App Preview Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/app-preview.mp4" type="video/mp4" />
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center">
            <div className="text-center p-6">
              <Smartphone className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
              <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">App Preview</p>
            </div>
          </div>
        </video>
      </div>
    </div>

    {/* Light Reflection */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-[2rem] pointer-events-none z-30" />
  </div>
</div>


                {/* Bottom floating element */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white"></div>
                      <div className="w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                      <div className="w-5 h-5 bg-purple-500 rounded-full border-2 border-white"></div>
                    </div>
                    <span>10k+ Users</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}