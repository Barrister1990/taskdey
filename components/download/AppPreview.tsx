"use client";

import { motion } from "framer-motion";
import { Download, Shield, Smartphone, Users, Zap } from "lucide-react";

// AppPreview Component
export default function AppPreview() {
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

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      {/* Main Phone Mockup */}
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16 mb-12 lg:mb-20">
        {/* Phone Preview */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex-shrink-0"
        >
          <div className="relative w-56 sm:w-72 lg:w-96 aspect-[9/19] mx-auto">
            {/* Phone Frame */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black dark:from-gray-700 dark:to-gray-900 rounded-[2.5rem] lg:rounded-[3rem] p-1.5 lg:p-2 shadow-2xl dark:shadow-black/50">
              <div className="w-full h-full bg-black dark:bg-gray-900 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 lg:w-32 h-4 lg:h-6 bg-black dark:bg-gray-900 rounded-b-xl lg:rounded-b-2xl z-10" />
                
                {/* Screen Content */}
                <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/app-preview.mp4" type="video/mp4" />
                    {/* Fallback gradient */}
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700" />
                  </video>
                  
                  {/* Overlay for better visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <Smartphone className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-2 -left-2 lg:-bottom-4 lg:-left-4 w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <Download className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 space-y-4 lg:space-y-6 w-full"
        >
          <div className="space-y-3 lg:space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/30"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">Connect Instantly</h3>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">Find skilled workers in your area</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/30"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">Secure & Trusted</h3>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">Verified profiles and reviews</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/30"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">Lightning Fast</h3>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">Quick booking and responses</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Screenshots Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full"
      >
        {/* Section Title */}
        <div className="text-center mb-6 lg:mb-10">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">App Screenshots</h3>
          <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">See our app in action</p>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="relative">
          {/* Gradient Overlays for scroll indication */}
          <div className="absolute left-0 top-0 bottom-0 w-8 lg:w-16 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 lg:w-16 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
          
          {/* Scrollable Screenshots */}
          <div className="flex gap-3 lg:gap-6 overflow-x-auto pb-4 px-4 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {screenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative flex-shrink-0"
              >
                {/* Phone Frame for Screenshot */}
                <div className="relative w-32 sm:w-40 lg:w-52 aspect-[9/19]">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-600 dark:to-gray-800 rounded-[1.5rem] lg:rounded-[2rem] p-1 lg:p-1.5 shadow-xl dark:shadow-black/50">
                    <div className="w-full h-full bg-black dark:bg-gray-900 rounded-[1.25rem] lg:rounded-[1.75rem] overflow-hidden relative">
                      {/* Mini Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 lg:w-20 h-3 lg:h-4 bg-black dark:bg-gray-900 rounded-b-lg z-10" />
                      
                      {/* Screenshot Content */}
                      <div className="relative w-full h-full">
                        <img
                          src={screenshot}
                          alt={`App Screenshot ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Mini floating indicator */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-4 h-4 lg:w-6 lg:h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg opacity-80"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Scroll Hint */}
        <div className="text-center mt-4 lg:mt-6">
          <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">← Scroll to see more screenshots →</p>
        </div>
      </motion.div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}