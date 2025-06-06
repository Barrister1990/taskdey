"use client";

import { motion } from "framer-motion";
import {
  Award,
  CheckCircle,
  CreditCard,
  Headphones,
  Lock,
  MapPin,
  Shield,
  Smartphone,
  Star,
  Users,
  Zap
} from "lucide-react";

const FEATURES = [
  {
    title: "Verified Workers",
    description: "All service providers are background-checked and verified for your peace of mind and safety.",
    icon: Shield,
    color: "from-green-500 to-emerald-500",
    darkColor: "dark:from-green-400 dark:to-emerald-400"
  },
  {
    title: "Instant Matching",
    description: "Get matched with available workers in your area within minutes, not hours.",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    darkColor: "dark:from-yellow-400 dark:to-orange-400"
  },
  {
    title: "Rated & Reviewed",
    description: "Choose from highly-rated professionals with authentic reviews from real customers.",
    icon: Star,
    color: "from-purple-500 to-pink-500",
    darkColor: "dark:from-purple-400 dark:to-pink-400"
  },
  {
    title: "Secure Payments",
    description: "Pay safely through the app with multiple payment options and fraud protection.",
    icon: CreditCard,
    color: "from-blue-500 to-cyan-500",
    darkColor: "dark:from-blue-400 dark:to-cyan-400"
  },
  {
    title: "Location-Based",
    description: "Find workers in your exact location with GPS-powered matching technology.",
    icon: MapPin,
    color: "from-red-500 to-rose-500",
    darkColor: "dark:from-red-400 dark:to-rose-400"
  },
  {
    title: "24/7 Support",
    description: "Get help whenever you need it with our round-the-clock customer support team.",
    icon: Headphones,
    color: "from-indigo-500 to-purple-500",
    darkColor: "dark:from-indigo-400 dark:to-purple-400"
  }
];

const STATS = [
  { number: "1,000+", label: "Active Users", icon: Users },
  { number: "500+", label: "Verified Workers", icon: Award },
  { number: "270+", label: "Jobs Completed", icon: CheckCircle },
  { number: "4.9/5", label: "Average Rating", icon: Star }
];

export default function Features() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50/50 dark:bg-slate-900/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 dark:from-indigo-400/5 dark:to-purple-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 dark:from-blue-400/5 dark:to-cyan-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Smartphone className="w-4 h-4" />
            <span>Why Choose Taskdey</span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">
              Experience the Future
            </span>
            <br />
            <span>of Home Services</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover why thousands of Ghanaians trust Taskdey for reliable, professional, and convenient home services.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20"
        >
          {STATS.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-slate-100 dark:border-slate-700">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {FEATURES.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] border border-slate-100 dark:border-slate-700 h-full overflow-hidden">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} ${feature.darkColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl sm:rounded-3xl`} />
                  
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} ${feature.darkColor} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    
                    {/* Floating particles */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300" />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 dark:group-hover:from-indigo-400 dark:group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl sm:rounded-b-3xl" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-500 dark:via-purple-500 dark:to-indigo-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white overflow-hidden">
            {/* Background pattern */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
            
            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 sm:mb-6">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
                Your Trust, Our Priority
              </h3>
              <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join the growing community of satisfied customers who have discovered the convenience and reliability of Taskdey.
              </p>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>Trusted by 1,000+ Ghanaians</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}