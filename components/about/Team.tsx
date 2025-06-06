"use client";
import { TEAM } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Team() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6 mx-auto"
          >
            <div className="w-8 h-8 bg-white rounded-lg opacity-90"></div>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full mb-6"></div>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            The passionate individuals behind Taskdey&apos;s mission to transform
            vocational services in Ghana.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {TEAM.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -12,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer"
            >
              {/* Card Container */}
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden h-full">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Floating Orbs */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 group-hover:animate-pulse"></div>

                {/* Content */}
                <div className="relative z-10 text-center flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative mb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="relative mx-auto"
                    >
                      {/* Image Ring */}
                      <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-1 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-spin-slow">
                        <div className="w-full h-full rounded-full bg-white dark:bg-gray-800"></div>
                      </div>
                      
                      <img
                        src={member.image}
                        alt={member.name}
                        className="relative w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto object-cover border-4 border-white dark:border-gray-700 shadow-xl group-hover:shadow-2xl transition-all duration-500"
                      />
                      
                      {/* Status Indicator */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-3 border-white dark:border-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                        <div className="w-full h-full rounded-full bg-green-400 animate-ping opacity-75"></div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <div className="relative mb-4">
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm md:text-base group-hover:text-purple-600 transition-colors duration-300">
                      {member.role}
                    </p>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
                  </div>

                  {/* Bio */}
                  <div className="flex-grow flex items-center">
                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                      {member.bio}
                    </p>
                  </div>

                  {/* Social Links Placeholder */}
                  <div className="flex justify-center space-x-3 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                      >
                        <div className="w-4 h-4 bg-white rounded-sm opacity-80"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px]">
                    <div className="w-full h-full rounded-3xl bg-white dark:bg-gray-800"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16 md:mt-20"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-base md:text-lg">
            Want to join our amazing team?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span>We are Hiring</span>
            <div className="ml-2 w-5 h-5 bg-white/20 rounded-md group-hover:translate-x-1 transition-transform duration-200"></div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}