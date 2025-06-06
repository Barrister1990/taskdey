"use client";

import DownloadCTA from "@/components/home/DownloadCTA";
import FAQ from "@/components/home/FAQ";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section id="hero">
        <Hero />
      </section>
      
      <section id="how-it-works">
        <HowItWorks />
      </section>
      
      <section id="features">
        <Features />
      </section>
      
      <section id="testimonials">
        <Testimonials />
      </section>
      
      <section id="faq">
        <FAQ />
      </section>
      
      <section id="download">
        <DownloadCTA />
      </section>
    </motion.div>
  );
}