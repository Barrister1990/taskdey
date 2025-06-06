"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, Sparkles, Target } from "lucide-react";

export default function Vision() {
  return (
    <section className="pt-16 pb-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 lg:-top-40 lg:-right-40 lg:w-80 lg:h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 lg:-bottom-40 lg:-left-40 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            About Our Purpose
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-100 dark:to-white bg-clip-text text-transparent leading-tight px-2">
            Vision & Mission
          </h1>
          
          <p className="text-slate-600 dark:text-slate-300 max-w-sm sm:max-w-2xl lg:max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4 sm:px-0">
            Building the future of vocational services in Ghana through technology,
            innovation, and unwavering trust in our community.
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0 max-w-sm sm:max-w-2xl lg:max-w-6xl mx-auto">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl sm:rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-white/20 dark:border-slate-700/50 group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1 sm:group-hover:-translate-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Our Vision</h2>
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mt-1 sm:mt-2"></div>
                </div>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
                To be Ghana&apos;s leading platform connecting skilled workers with clients,
                creating opportunities and fostering economic growth in our communities
                through innovative technology and trusted partnerships.
              </p>
              
              <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium group-hover:gap-3 gap-2 transition-all duration-300 text-sm sm:text-base">
                <span>Learn more about our vision</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl sm:rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-white/20 dark:border-slate-700/50 group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1 sm:group-hover:-translate-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-1 sm:mt-2"></div>
                </div>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
                To empower skilled workers and provide clients with reliable,
                on-demand access to quality vocational services through innovative
                technology, fostering trust and excellence in every interaction.
              </p>
              
              <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium group-hover:gap-3 gap-2 transition-all duration-300 text-sm sm:text-base">
                <span>Discover our mission</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats or additional info section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl px-6 py-4 sm:px-8 sm:py-6 shadow-lg border border-white/20 dark:border-slate-700/50 max-w-sm sm:max-w-none mx-auto">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">2024</div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Founded</div>
            </div>
            <div className="w-full h-px sm:w-px sm:h-8 lg:h-10 bg-slate-200 dark:bg-slate-700"></div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">Ghana</div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Based</div>
            </div>
            <div className="w-full h-px sm:w-px sm:h-8 lg:h-10 bg-slate-200 dark:bg-slate-700"></div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">∞</div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Possibilities</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}