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
  Star,
  Users,
  Zap,
} from "lucide-react";

const accentColors = [
  { bg: "bg-primary", text: "text-primary", light: "bg-primary/10" },
  { bg: "bg-secondary", text: "text-secondary", light: "bg-secondary/10" },
  { bg: "bg-tertiary", text: "text-tertiary", light: "bg-tertiary/10" },
  { bg: "bg-quaternary", text: "text-quaternary", light: "bg-quaternary/10" },
  { bg: "bg-primary", text: "text-primary", light: "bg-primary/10" },
  { bg: "bg-secondary", text: "text-secondary", light: "bg-secondary/10" },
];

const FEATURES = [
  {
    title: "Verified Workers",
    description:
      "All service providers are background-checked and verified for your peace of mind.",
    icon: Shield,
  },
  {
    title: "Instant Matching",
    description:
      "Get matched with available workers in your area within minutes, not hours.",
    icon: Zap,
  },
  {
    title: "Rated & Reviewed",
    description:
      "Choose from highly-rated professionals with authentic reviews from real customers.",
    icon: Star,
  },
  {
    title: "Secure Payments",
    description:
      "Pay safely through the app with multiple payment options and fraud protection.",
    icon: CreditCard,
  },
  {
    title: "Location-Based",
    description:
      "Find workers in your exact location with GPS-powered matching technology.",
    icon: MapPin,
  },
  {
    title: "24/7 Support",
    description:
      "Get help whenever you need it with our round-the-clock customer support team.",
    icon: Headphones,
  },
];

const STATS = [
  { number: "1,000+", label: "Active Users", icon: Users },
  { number: "500+", label: "Verified Workers", icon: Award },
  { number: "270+", label: "Jobs Completed", icon: CheckCircle },
  { number: "4.9/5", label: "Average Rating", icon: Star },
];

export default function Features() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-12 left-8 w-12 h-12 rounded-full bg-tertiary/10 hidden lg:block" />
      <div className="absolute bottom-20 right-12 w-8 h-8 rotate-45 bg-secondary/10 hidden lg:block" />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-[20%] w-5 h-5 rounded-full bg-quaternary/20 hidden lg:block"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-primary/10 text-primary px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold border-2 border-primary/20 mb-3 sm:mb-4"
          >
            Why Choose Taskdey
          </motion.span>

          <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-2 sm:mb-4">
            <span className="text-primary">Experience the Future</span>
            <br />
            <span>of Home Services</span>
          </h2>
          <p className="text-xs sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Discover why thousands of Ghanaians trust Taskdey for reliable,
            professional, and convenient home services.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6 mb-8 sm:mb-14"
        >
          {STATS.map((stat, index) => {
            const IconComponent = stat.icon;
            const color = accentColors[index];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="text-center group"
              >
                <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-hard-sm hover:shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-1 h-full">
                  <div
                    className={`inline-flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 ${color.bg} rounded-xl mb-2 sm:mb-3`}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="font-heading text-lg sm:text-2xl lg:text-3xl font-extrabold text-foreground mb-0.5 sm:mb-1">
                    {stat.number}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 lg:gap-6">
          {FEATURES.map((feature, index) => {
            const IconComponent = feature.icon;
            const color = accentColors[index];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative"
              >
                <div className="relative bg-card border-2 border-border rounded-xl sm:rounded-2xl p-3 sm:p-5 lg:p-6 shadow-hard-sm hover:shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-1 h-full overflow-hidden">
                  {/* Icon sitting half-in/half-out */}
                  <div className="relative mb-2 sm:mb-4">
                    <div
                      className={`inline-flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 ${color.bg} rounded-xl border-2 border-foreground shadow-hard-sm group-hover:animate-wiggle`}
                    >
                      <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-xs sm:text-sm lg:text-base font-bold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
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
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10 sm:mt-16"
        >
          <div className="relative bg-card border-2 border-border rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-hard overflow-hidden">
            {/* Decorative shapes inside */}
            <div className="absolute top-3 right-5 w-6 h-6 rounded-full bg-tertiary/15 hidden sm:block" />
            <div className="absolute bottom-4 left-6 w-4 h-4 rotate-45 bg-secondary/15 hidden sm:block" />
            <div className="absolute top-8 left-10 w-3 h-3 rounded-full bg-quaternary/15 hidden sm:block" />

            <div className="relative">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 bg-primary rounded-xl sm:rounded-2xl border-2 border-foreground shadow-hard-sm mb-3 sm:mb-5">
                <Lock className="w-5 h-5 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="font-heading text-lg sm:text-2xl lg:text-3xl font-extrabold text-foreground mb-2 sm:mb-3">
                Your Trust, Our Priority
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto">
                Join the growing community of satisfied customers who have
                discovered the convenience and reliability of Taskdey.
              </p>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-xs sm:text-sm font-bold border-2 border-foreground shadow-hard-sm">
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
                <span>Trusted by 1,000+ Ghanaians</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
