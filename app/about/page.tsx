"use client";

import { motion } from "framer-motion";
import Vision from "@/components/about/Vision";
import Team from "@/components/about/Team";
import Stats from "@/components/about/Stats";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <Vision />
      <Stats />
      <Team />
    </motion.div>
  );
}