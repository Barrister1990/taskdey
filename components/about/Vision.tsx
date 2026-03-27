"use client";

import { motion } from "framer-motion";
import { Lightbulb, Sparkles, Target } from "lucide-react";

const cards = [
  {
    title: "Our Vision",
    icon: Target,
    color: "bg-primary",
    description:
      "To be Ghana's leading platform connecting skilled workers with clients, creating opportunities and fostering economic growth in our communities through innovative technology and trusted partnerships.",
  },
  {
    title: "Our Mission",
    icon: Lightbulb,
    color: "bg-secondary",
    description:
      "To empower skilled workers and provide clients with reliable, on-demand access to quality vocational services through innovative technology, fostering trust and excellence in every interaction.",
  },
];

const quickFacts = [
  { value: "2024", label: "Founded" },
  { value: "Ghana", label: "Based" },
  { value: "∞", label: "Possibilities" },
];

export default function Vision() {
  return (
    <section className="pt-12 sm:pt-16 pb-12 sm:pb-20 bg-background relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-10 right-12 w-14 h-14 rounded-full bg-tertiary/10 hidden lg:block" />
      <div className="absolute bottom-16 left-8 w-8 h-8 rotate-45 bg-secondary/10 hidden lg:block" />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-[20%] w-5 h-5 rounded-full bg-quaternary/15 hidden lg:block"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 sm:mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold border-2 border-primary/20 mb-3 sm:mb-4"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={2.5} />
            About Our Purpose
          </motion.span>

          <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-2 sm:mb-4">
            Vision <span className="text-primary">&</span> Mission
          </h1>

          <p className="text-xs sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Building the future of vocational services in Ghana through
            technology, innovation, and unwavering trust in our community.
          </p>
        </motion.div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 max-w-4xl mx-auto">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="group"
              >
                <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-hard-sm hover:shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-1 h-full">
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-5">
                    <div
                      className={`w-9 h-9 sm:w-12 sm:h-12 ${card.color} rounded-xl sm:rounded-2xl flex items-center justify-center border-2 border-foreground shadow-hard-sm`}
                    >
                      <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <h2 className="font-heading text-base sm:text-xl lg:text-2xl font-extrabold text-foreground">
                      {card.title}
                    </h2>
                  </div>

                  <p className="text-[11px] sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 sm:mt-14 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 sm:gap-5 bg-card border-2 border-border rounded-full px-4 py-2.5 sm:px-6 sm:py-3 shadow-hard-sm">
            {quickFacts.map((fact, i) => (
              <div key={fact.label} className="flex items-center gap-3 sm:gap-5">
                {i > 0 && (
                  <div className="w-px h-6 sm:h-8 bg-border" />
                )}
                <div className="text-center">
                  <div className="font-heading text-sm sm:text-lg font-extrabold text-primary">
                    {fact.value}
                  </div>
                  <div className="text-[9px] sm:text-xs text-muted-foreground font-medium">
                    {fact.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
