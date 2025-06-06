"use client";

import AppPreview from "@/components/download/AppPreview";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";


import { Star } from "lucide-react";
export default function Download() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-teal-400/20 dark:from-green-500/10 dark:to-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white rounded-full text-sm font-medium mb-6 shadow-lg dark:shadow-blue-500/25"
            >
              <Star className="w-4 h-4" />
              <span>4.8★ rated app</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
              Download Taskdey
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl">Today</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect with skilled workers in your area. Get things done faster, 
              easier, and more reliably than ever before.
            </p>
          </motion.div>

          {/* App Preview */}
          <AppPreview />

          {/* Download Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 lg:mt-20"
          >
            {/* Google Play Store */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 bg-black hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-2xl shadow-lg dark:shadow-black/50 transition-all duration-300 hover:shadow-xl dark:hover:shadow-black/70"
                onClick={() =>
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.barrister1990.joymish&pcampaignid=web_share",
                    "_blank"
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-300 dark:text-gray-400">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </div>
              </Button>
            </motion.div>

            {/* Apple App Store */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 bg-black hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-2xl shadow-lg dark:shadow-black/50 transition-all duration-300 hover:shadow-xl dark:hover:shadow-black/70"
                onClick={() =>
                  window.open(
                    "https://apps.apple.com/gh/app/taskdey/id6739984570",
                    "_blank"
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.19 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-300 dark:text-gray-400">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-8 sm:gap-16 justify-center items-center mt-16 text-center"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">1K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">4.9★</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">App Rating</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">270+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}