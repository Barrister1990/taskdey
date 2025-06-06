"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ServiceCardProps {
  name: string;
  demand: string;
  description: string;
  averageRate: string;
}

export default function ServiceCard({ name, demand, description, averageRate }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl p-6 shadow-lg group hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        {demand === "high" && (
          <Badge variant="secondary" className="bg-green-500/10 text-green-500">
            High Demand
          </Badge>
        )}
      </div>

      <p className="text-muted-foreground mb-4">{description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium">Average Rate:</span>
        <span className="text-indigo-600 font-semibold">{averageRate}</span>
      </div>

      <div className="mt-4 space-y-2">
        <Button
          className="w-full bg-black hover:bg-black/90 text-white"
          asChild
        >
          <Link href="https://apps.apple.com/app/taskdey">Download on App Store</Link>
        </Button>
        <Button
          className="w-full bg-black hover:bg-black/90 text-white"
          asChild
        >
          <Link href="https://play.google.com/store/apps/details?id=com.taskdey.app">Get it on Play Store</Link>
        </Button>
      </div>
    </motion.div>
  );
}