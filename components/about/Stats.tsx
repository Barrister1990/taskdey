"use client";

import { STATS } from "@/lib/constants";
import { motion } from "framer-motion";

const accentColors = [
  "bg-primary",
  "bg-secondary",
  "bg-tertiary",
  "bg-quaternary",
];

export default function Stats() {
  return (
    <section className="py-12 sm:py-20 bg-muted/50 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-8 left-10 w-10 h-10 rounded-full bg-tertiary/10 hidden lg:block" />
      <div className="absolute bottom-12 right-8 w-6 h-6 rotate-12 bg-secondary/10 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-primary/10 text-primary px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold border-2 border-primary/20 mb-3 sm:mb-4"
          >
            Our Impact
          </motion.span>

          <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">
            Our Impact in <span className="text-primary">Numbers</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6">
          {STATS.map((stat, index) => {
            const color = accentColors[index % accentColors.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group"
              >
                <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-hard-sm hover:shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-1 text-center h-full">
                  {/* Accent dot */}
                  <div
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${color} rounded-full mx-auto mb-2 sm:mb-4 border-2 border-foreground shadow-hard-sm`}
                  />

                  {/* Value */}
                  <motion.div
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="font-heading text-xl sm:text-3xl lg:text-4xl font-extrabold text-primary mb-0.5 sm:mb-2"
                  >
                    {stat.value}
                  </motion.div>

                  {/* Label */}
                  <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative dots */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-8 sm:mt-12 gap-2"
        >
          {accentColors.map((color, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${color} rounded-full`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
