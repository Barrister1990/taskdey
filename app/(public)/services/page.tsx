"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Car,
  ChevronDown,
  Download,
  Filter,
  GraduationCap,
  Heart,
  Home,
  Search,
  Settings,
  Star,
  User,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface Service {
  name: string;
  providers: number;
  rating: number;
  demand: "high" | "medium" | "low";
}

type CategoryName =
  | "Home & Living"
  | "Personal Care"
  | "Technical"
  | "Maintenance"
  | "Professional"
  | "Education"
  | "Health & Wellness"
  | "Transportation";

const categories: { name: string; icon: React.ElementType }[] = [
  { name: "All", icon: Filter },
  { name: "Home & Living", icon: Home },
  { name: "Personal Care", icon: User },
  { name: "Technical", icon: Wrench },
  { name: "Maintenance", icon: Settings },
  { name: "Professional", icon: Briefcase },
  { name: "Education", icon: GraduationCap },
  { name: "Health & Wellness", icon: Heart },
  { name: "Transportation", icon: Car },
];

const servicesByCategory: Record<CategoryName, Service[]> = {
  "Home & Living": [
    { name: "House Cleaning", providers: 18, rating: 4.8, demand: "high" },
    { name: "Gardening", providers: 12, rating: 4.6, demand: "high" },
    { name: "Home Renovation", providers: 8, rating: 4.7, demand: "medium" },
    { name: "Interior Design", providers: 6, rating: 4.5, demand: "medium" },
    { name: "Housekeeping", providers: 22, rating: 4.4, demand: "high" },
    { name: "Laundry Services", providers: 15, rating: 4.3, demand: "high" },
    { name: "Pet Care", providers: 10, rating: 4.6, demand: "medium" },
    { name: "Event Planning", providers: 5, rating: 4.4, demand: "medium" },
    { name: "Catering", providers: 9, rating: 4.5, demand: "medium" },
    { name: "Home Security", providers: 4, rating: 4.3, demand: "low" },
  ],
  "Personal Care": [
    { name: "Barbering", providers: 25, rating: 4.7, demand: "high" },
    { name: "Hairdressing", providers: 20, rating: 4.6, demand: "high" },
    { name: "Beauty & Makeup", providers: 16, rating: 4.5, demand: "medium" },
    { name: "Massage Therapy", providers: 8, rating: 4.8, demand: "medium" },
    { name: "Personal Training", providers: 12, rating: 4.6, demand: "medium" },
    { name: "Tailoring", providers: 18, rating: 4.4, demand: "high" },
    { name: "Nail Care", providers: 11, rating: 4.3, demand: "medium" },
    { name: "Babysitting", providers: 22, rating: 4.5, demand: "high" },
    { name: "Elder Care", providers: 8, rating: 4.6, demand: "medium" },
  ],
  Technical: [
    { name: "Electricians", providers: 14, rating: 4.5, demand: "high" },
    { name: "Plumbing", providers: 16, rating: 4.4, demand: "high" },
    { name: "IT Support", providers: 10, rating: 4.3, demand: "medium" },
    { name: "Phone Repair", providers: 13, rating: 4.2, demand: "high" },
    { name: "Web Design", providers: 8, rating: 4.4, demand: "medium" },
    { name: "CCTV Installation", providers: 5, rating: 4.3, demand: "medium" },
    { name: "Solar Installation", providers: 3, rating: 4.5, demand: "low" },
    { name: "Network Setup", providers: 4, rating: 4.1, demand: "low" },
  ],
  Maintenance: [
    { name: "Carpentry", providers: 19, rating: 4.6, demand: "high" },
    { name: "Painting", providers: 21, rating: 4.4, demand: "high" },
    { name: "Masonry", providers: 12, rating: 4.5, demand: "medium" },
    { name: "Welding", providers: 9, rating: 4.7, demand: "medium" },
    { name: "AC Repair", providers: 8, rating: 4.3, demand: "medium" },
    { name: "Roofing", providers: 6, rating: 4.4, demand: "medium" },
    { name: "Pest Control", providers: 5, rating: 4.2, demand: "medium" },
    { name: "Appliance Repair", providers: 11, rating: 4.3, demand: "high" },
    { name: "General Handyman", providers: 28, rating: 4.4, demand: "high" },
  ],
  Professional: [
    { name: "Legal Services", providers: 8, rating: 4.6, demand: "medium" },
    { name: "Accounting", providers: 12, rating: 4.5, demand: "medium" },
    { name: "Real Estate", providers: 14, rating: 4.3, demand: "medium" },
    { name: "Photography", providers: 16, rating: 4.6, demand: "medium" },
    { name: "Videography", providers: 8, rating: 4.5, demand: "low" },
    { name: "Translation", providers: 5, rating: 4.4, demand: "low" },
    { name: "Notary Services", providers: 10, rating: 4.3, demand: "medium" },
  ],
  Education: [
    { name: "Private Tutoring", providers: 20, rating: 4.7, demand: "high" },
    { name: "Music Lessons", providers: 12, rating: 4.6, demand: "medium" },
    { name: "Language Teaching", providers: 9, rating: 4.5, demand: "medium" },
    { name: "Driving Instruction", providers: 15, rating: 4.3, demand: "high" },
    { name: "Computer Training", providers: 7, rating: 4.4, demand: "medium" },
    { name: "Dance Classes", providers: 7, rating: 4.6, demand: "medium" },
    { name: "Swimming Lessons", providers: 4, rating: 4.7, demand: "medium" },
  ],
  "Health & Wellness": [
    { name: "Nursing Care", providers: 12, rating: 4.8, demand: "medium" },
    { name: "Physiotherapy", providers: 8, rating: 4.7, demand: "medium" },
    { name: "Counseling", providers: 6, rating: 4.6, demand: "medium" },
    { name: "Yoga Instruction", providers: 10, rating: 4.6, demand: "medium" },
    { name: "Fitness Training", providers: 14, rating: 4.5, demand: "medium" },
    { name: "Home Healthcare", providers: 9, rating: 4.7, demand: "medium" },
  ],
  Transportation: [
    { name: "Auto Mechanic", providers: 19, rating: 4.4, demand: "high" },
    { name: "Taxi & Rides", providers: 32, rating: 4.3, demand: "high" },
    { name: "Delivery Services", providers: 26, rating: 4.2, demand: "high" },
    { name: "Moving Services", providers: 11, rating: 4.5, demand: "medium" },
    { name: "Car Detailing", providers: 13, rating: 4.6, demand: "medium" },
    { name: "Courier Services", providers: 17, rating: 4.3, demand: "high" },
    { name: "Towing Services", providers: 7, rating: 4.1, demand: "medium" },
  ],
};

const INITIAL_SHOW = 12;

const demandStyle: Record<string, string> = {
  high: "bg-quaternary/15 text-quaternary border-quaternary/30",
  medium: "bg-tertiary/15 text-tertiary border-tertiary/30",
  low: "bg-muted text-muted-foreground border-border",
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    let items: (Service & { category: string })[];

    if (activeCategory === "All") {
      items = Object.entries(servicesByCategory).flatMap(([cat, svc]) =>
        svc.map((s) => ({ ...s, category: cat }))
      );
    } else {
      const list = servicesByCategory[activeCategory as CategoryName] || [];
      items = list.map((s) => ({ ...s, category: activeCategory }));
    }

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      items = items.filter((s) => s.name.toLowerCase().includes(q));
    }

    return items;
  }, [activeCategory, searchTerm]);

  const visible = showAll || activeCategory !== "All" ? filtered : filtered.slice(0, INITIAL_SHOW);
  const hasMore = activeCategory === "All" && !showAll && filtered.length > INITIAL_SHOW;

  const totalServices = Object.values(servicesByCategory).flat().length;
  const totalProviders = Object.values(servicesByCategory)
    .flat()
    .reduce((a, s) => a + s.providers, 0);

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 sm:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-10"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block bg-primary/10 text-primary px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold border-2 border-primary/20 mb-3 sm:mb-4"
          >
            {totalServices}+ Services Available
          </motion.span>

          <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-2 sm:mb-3">
            Professional <span className="text-primary">Services</span>
          </h1>
          <p className="text-xs sm:text-base text-muted-foreground max-w-2xl mx-auto mb-5 sm:mb-8">
            Ghana&apos;s premier platform connecting skilled professionals with
            clients. Find the right expert for every need.
          </p>

          {/* Stats */}
          <div className="inline-flex items-center gap-3 sm:gap-5 bg-card border-2 border-border rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-hard-sm">
            {[
              { value: `${totalServices}+`, label: "Services" },
              { value: `${totalProviders}+`, label: "Providers" },
              { value: "24/7", label: "Support" },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-3 sm:gap-5">
                {i > 0 && <div className="w-px h-6 sm:h-8 bg-border" />}
                <div className="text-center">
                  <div className="font-heading text-sm sm:text-lg font-extrabold text-primary">
                    {s.value}
                  </div>
                  <div className="text-[9px] sm:text-xs text-muted-foreground font-medium">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-lg mx-auto mb-5 sm:mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowAll(true);
              }}
              className="w-full pl-9 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-full border-2 border-border bg-card text-foreground text-xs sm:text-sm font-medium shadow-hard-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground transition-all"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-6 sm:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center scrollbar-hide">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setActiveCategory(cat.name);
                    setShowAll(false);
                  }}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-300 ease-bounce whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-primary-foreground border-2 border-foreground shadow-hard-sm"
                      : "bg-card text-muted-foreground border-2 border-border hover:text-foreground hover:border-foreground/50"
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchTerm}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4"
          >
            {visible.map((service, index) => (
              <motion.div
                key={`${service.category}-${service.name}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.4) }}
                className="group"
              >
                <div className="bg-card border-2 border-border rounded-xl p-2.5 sm:p-4 shadow-hard-sm hover:shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-0.5 h-full flex flex-col">
                  {/* Name + Demand */}
                  <div className="flex-1 mb-2 sm:mb-3">
                    <h3 className="font-heading text-[11px] sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors mb-1 sm:mb-1.5 leading-tight">
                      {service.name}
                    </h3>
                    <span
                      className={`inline-block px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full text-[8px] sm:text-[10px] font-semibold border ${demandStyle[service.demand]}`}
                    >
                      {service.demand}
                    </span>
                  </div>

                  {/* Rating + Providers */}
                  <div className="flex items-center justify-between text-[9px] sm:text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-tertiary fill-current" />
                      <span className="font-semibold">{service.rating}</span>
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {service.providers}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Show More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6 sm:mt-8"
          >
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <span>Show all {filtered.length} services</span>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </motion.div>
        )}

        {/* No Results */}
        {visible.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <Search className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm sm:text-base font-semibold text-foreground mb-1">
              No services found
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Try a different search or category
            </p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5"
        >
          {/* Workers */}
          <div className="bg-quaternary border-2 border-foreground rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-hard relative overflow-hidden">
            <div className="absolute top-2 right-3 w-6 h-6 rounded-full bg-white/10 hidden sm:block" />
            <h3 className="font-heading text-base sm:text-xl font-extrabold mb-1 sm:mb-2">
              Are You a Provider?
            </h3>
            <p className="text-[10px] sm:text-xs opacity-90 mb-3 sm:mb-4">
              Join 500+ skilled professionals earning on Taskdey.
            </p>
            <Button
              size="sm"
              className="bg-card text-quaternary hover:bg-card/90 rounded-full border-2 border-foreground shadow-hard-sm font-bold text-[10px] sm:text-xs px-3 sm:px-4 h-8 sm:h-9 transition-all ease-bounce hover:-translate-y-0.5"
              asChild
            >
              <Link href="/download" className="flex items-center gap-1.5">
                <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
                Start Earning
              </Link>
            </Button>
          </div>

          {/* Clients */}
          <div className="bg-primary border-2 border-foreground rounded-xl sm:rounded-2xl p-4 sm:p-6 text-primary-foreground shadow-hard relative overflow-hidden">
            <div className="absolute top-2 right-3 w-6 h-6 rounded-full bg-white/10 hidden sm:block" />
            <h3 className="font-heading text-base sm:text-xl font-extrabold mb-1 sm:mb-2">
              Need a Service?
            </h3>
            <p className="text-[10px] sm:text-xs opacity-90 mb-3 sm:mb-4">
              Access verified professionals across Ghana today.
            </p>
            <Button
              size="sm"
              className="bg-card text-primary hover:bg-card/90 rounded-full border-2 border-foreground shadow-hard-sm font-bold text-[10px] sm:text-xs px-3 sm:px-4 h-8 sm:h-9 transition-all ease-bounce hover:-translate-y-0.5"
              asChild
            >
              <Link href="/download" className="flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
                Download App
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
