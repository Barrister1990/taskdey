"use client";

import { TEAM } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const cardColors = [
  { shadow: "bg-primary", accent: "text-primary" },
  { shadow: "bg-secondary", accent: "text-secondary" },
  { shadow: "bg-tertiary", accent: "text-tertiary" },
  { shadow: "bg-quaternary", accent: "text-quaternary" },
];

export default function Team() {
  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-10 right-10 w-12 h-12 rounded-full bg-tertiary/10 hidden lg:block" />
      <div className="absolute bottom-20 left-12 w-7 h-7 rotate-12 bg-secondary/10 hidden lg:block" />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 left-[18%] w-4 h-4 rounded-full bg-primary/10 hidden lg:block"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 bg-primary rounded-xl sm:rounded-2xl border-2 border-foreground shadow-hard-sm mb-3 sm:mb-5 mx-auto"
          >
            <Users className="w-5 h-5 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
          </motion.div>

          <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-2 sm:mb-4">
            Meet Our <span className="text-primary">Team</span>
          </h2>

          <p className="text-xs sm:text-base text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals behind Taskdey&apos;s mission to
            transform vocational services in Ghana.
          </p>
        </motion.div>

        {/* Team Grid — centered for 2 members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 max-w-3xl mx-auto">
          {TEAM.map((member, index) => {
            const color = cardColors[index % cardColors.length];
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group"
              >
                <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-hard-sm hover:shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-1 h-full text-center">
                  {/* Photo */}
                  <div className="relative mx-auto mb-3 sm:mb-5 w-20 h-20 sm:w-28 sm:h-28">
                    <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-foreground shadow-hard-sm">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Accent dot */}
                    <div
                      className={`absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 ${color.shadow} rounded-full border-2 border-foreground shadow-hard-sm`}
                    />
                  </div>

                  {/* Name */}
                  <h3 className="font-heading text-sm sm:text-lg font-extrabold text-foreground mb-0.5 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className={`text-[10px] sm:text-xs font-semibold ${color.accent} mb-2 sm:mb-4`}>
                    {member.role}
                  </p>

                  {/* Bio */}
                  <p className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Hiring CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8 sm:mt-14"
        >
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            Want to join our amazing team?
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold text-xs sm:text-sm border-2 border-foreground shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-hard-hover"
          >
            <span>We&apos;re Hiring</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
