"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Briefcase,
  Car,
  Download,
  Filter,
  GraduationCap,
  Heart,
  Home,
  Search,
  Settings,
  Smartphone,
  Star,
  User,
  Users,
  Wrench
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";


interface Service {
  name: string;
  providers: number;
  rating: number;
  price: number;
  demand: "high" | "medium" | "low";
}
interface ServiceWithCategory extends Service {
  category: string;
}
interface Category {
  name: string;
  icon: any;
  color: string;
}
type CategoryName = "Home & Living" | "Personal Care" | "Technical" | "Maintenance" | "Professional" | "Education" | "Health & Wellness" | "Transportation";
// Categories with icons
const categories: Category[] = [
  { name: "All", icon: Filter, color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
  { name: "Home & Living", icon: Home, color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
  { name: "Personal Care", icon: User, color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300" },
  { name: "Technical", icon: Wrench, color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" },
  { name: "Maintenance", icon: Settings, color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
  { name: "Professional", icon: Briefcase, color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300" },
  { name: "Education", icon: GraduationCap, color: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300" },
  { name: "Health & Wellness", icon: Heart, color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
  { name: "Transportation", icon: Car, color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" },
];

// Comprehensive services by category with reduced provider numbers
const servicesByCategory: Record<CategoryName, Service[]> = {
  "Home & Living": [
    { name: "House Cleaning", providers: 18, rating: 4.8, price: 25, demand: "high" },
    { name: "Gardening & Landscaping", providers: 12, rating: 4.6, price: 35, demand: "high" },
    { name: "Home Renovation", providers: 8, rating: 4.7, price: 85, demand: "medium" },
    { name: "Interior Design", providers: 6, rating: 4.5, price: 120, demand: "medium" },
    { name: "Housekeeping", providers: 22, rating: 4.4, price: 20, demand: "high" },
    { name: "Laundry Services", providers: 15, rating: 4.3, price: 15, demand: "high" },
    { name: "Pet Care", providers: 10, rating: 4.6, price: 30, demand: "medium" },
    { name: "Event Planning", providers: 5, rating: 4.4, price: 200, demand: "medium" },
    { name: "Catering Services", providers: 9, rating: 4.5, price: 150, demand: "medium" },
    { name: "Home Security", providers: 4, rating: 4.3, price: 45, demand: "low" },
  ],
  "Personal Care": [
    { name: "Barbering", providers: 25, rating: 4.7, price: 15, demand: "high" },
    { name: "Hairdressing", providers: 20, rating: 4.6, price: 40, demand: "high" },
    { name: "Beauty & Makeup", providers: 16, rating: 4.5, price: 60, demand: "medium" },
    { name: "Massage Therapy", providers: 8, rating: 4.8, price: 80, demand: "medium" },
    { name: "Personal Training", providers: 12, rating: 4.6, price: 50, demand: "medium" },
    { name: "Tailoring & Alterations", providers: 18, rating: 4.4, price: 25, demand: "high" },
    { name: "Nail Care", providers: 11, rating: 4.3, price: 35, demand: "medium" },
    { name: "Personal Chef", providers: 5, rating: 4.7, price: 120, demand: "low" },
    { name: "Babysitting", providers: 22, rating: 4.5, price: 12, demand: "high" },
    { name: "Elder Care", providers: 8, rating: 4.6, price: 25, demand: "medium" },
  ],
  "Technical": [
    { name: "Electricians", providers: 14, rating: 4.5, price: 65, demand: "high" },
    { name: "Plumbing", providers: 16, rating: 4.4, price: 60, demand: "high" },
    { name: "IT Support", providers: 10, rating: 4.3, price: 55, demand: "medium" },
    { name: "Phone & Computer Repair", providers: 13, rating: 4.2, price: 40, demand: "high" },
    { name: "Software Development", providers: 6, rating: 4.6, price: 100, demand: "medium" },
    { name: "Web Design", providers: 8, rating: 4.4, price: 80, demand: "medium" },
    { name: "CCTV Installation", providers: 5, rating: 4.3, price: 150, demand: "medium" },
    { name: "Audio/Visual Setup", providers: 7, rating: 4.2, price: 70, demand: "medium" },
    { name: "Solar Installation", providers: 3, rating: 4.5, price: 200, demand: "low" },
    { name: "Network Setup", providers: 4, rating: 4.1, price: 90, demand: "low" },
  ],
  "Maintenance": [
    { name: "Carpentry", providers: 19, rating: 4.6, price: 50, demand: "high" },
    { name: "Painting", providers: 21, rating: 4.4, price: 35, demand: "high" },
    { name: "Masonry", providers: 12, rating: 4.5, price: 55, demand: "medium" },
    { name: "Welding", providers: 9, rating: 4.7, price: 70, demand: "medium" },
    { name: "Air Conditioning", providers: 8, rating: 4.3, price: 75, demand: "medium" },
    { name: "Roofing", providers: 6, rating: 4.4, price: 80, demand: "medium" },
    { name: "Pest Control", providers: 5, rating: 4.2, price: 55, demand: "medium" },
    { name: "Appliance Repair", providers: 11, rating: 4.3, price: 45, demand: "high" },
    { name: "Flooring", providers: 7, rating: 4.5, price: 65, demand: "medium" },
    { name: "General Handyman", providers: 28, rating: 4.4, price: 40, demand: "high" },
  ],
  "Professional": [
    { name: "Legal Services", providers: 8, rating: 4.6, price: 150, demand: "medium" },
    { name: "Accounting", providers: 12, rating: 4.5, price: 100, demand: "medium" },
    { name: "Business Consulting", providers: 6, rating: 4.4, price: 120, demand: "low" },
    { name: "Real Estate", providers: 14, rating: 4.3, price: 200, demand: "medium" },
    { name: "Insurance Services", providers: 9, rating: 4.2, price: 80, demand: "medium" },
    { name: "Financial Planning", providers: 7, rating: 4.5, price: 130, demand: "low" },
    { name: "Translation Services", providers: 5, rating: 4.4, price: 60, demand: "low" },
    { name: "Notary Services", providers: 10, rating: 4.3, price: 25, demand: "medium" },
    { name: "Photography", providers: 16, rating: 4.6, price: 200, demand: "medium" },
    { name: "Videography", providers: 8, rating: 4.5, price: 300, demand: "low" },
  ],
  "Education": [
    { name: "Private Tutoring", providers: 20, rating: 4.7, price: 35, demand: "high" },
    { name: "Music Lessons", providers: 12, rating: 4.6, price: 45, demand: "medium" },
    { name: "Language Teaching", providers: 9, rating: 4.5, price: 40, demand: "medium" },
    { name: "Exam Preparation", providers: 8, rating: 4.8, price: 50, demand: "medium" },
    { name: "Computer Training", providers: 7, rating: 4.4, price: 60, demand: "medium" },
    { name: "Driving Instruction", providers: 15, rating: 4.3, price: 30, demand: "high" },
    { name: "Art Classes", providers: 6, rating: 4.5, price: 55, demand: "low" },
    { name: "Dance Classes", providers: 7, rating: 4.6, price: 40, demand: "medium" },
    { name: "Swimming Lessons", providers: 4, rating: 4.7, price: 35, demand: "medium" },
    { name: "Skill Development", providers: 9, rating: 4.4, price: 70, demand: "medium" },
  ],
  "Health & Wellness": [
    { name: "Nursing Care", providers: 12, rating: 4.8, price: 40, demand: "medium" },
    { name: "Physiotherapy", providers: 8, rating: 4.7, price: 80, demand: "medium" },
    { name: "Mental Health Counseling", providers: 6, rating: 4.6, price: 100, demand: "medium" },
    { name: "Nutrition Consulting", providers: 7, rating: 4.5, price: 90, demand: "low" },
    { name: "Yoga Instruction", providers: 10, rating: 4.6, price: 45, demand: "medium" },
    { name: "Fitness Training", providers: 14, rating: 4.5, price: 55, demand: "medium" },
    { name: "Home Healthcare", providers: 9, rating: 4.7, price: 60, demand: "medium" },
    { name: "Medical Equipment", providers: 5, rating: 4.3, price: 35, demand: "low" },
    { name: "Therapy Services", providers: 8, rating: 4.8, price: 120, demand: "medium" },
    { name: "Wellness Coaching", providers: 6, rating: 4.4, price: 80, demand: "low" },
  ],
  "Transportation": [
    { name: "Auto Mechanic", providers: 19, rating: 4.4, price: 55, demand: "high" },
    { name: "Taxi/Ride Services", providers: 32, rating: 4.3, price: 15, demand: "high" },
    { name: "Delivery Services", providers: 26, rating: 4.2, price: 20, demand: "high" },
    { name: "Moving Services", providers: 11, rating: 4.5, price: 80, demand: "medium" },
    { name: "Car Detailing", providers: 13, rating: 4.6, price: 40, demand: "medium" },
    { name: "Motorcycle Repair", providers: 10, rating: 4.3, price: 45, demand: "medium" },
    { name: "Logistics", providers: 8, rating: 4.4, price: 60, demand: "medium" },
    { name: "Car Rental", providers: 5, rating: 4.2, price: 100, demand: "low" },
    { name: "Towing Services", providers: 7, rating: 4.1, price: 70, demand: "medium" },
    { name: "Courier Services", providers: 17, rating: 4.3, price: 25, demand: "high" },
  ],
};
interface ServiceCardProps {
  service: ServiceWithCategory;
  category: string;
}
const ServiceCard: React.FC<ServiceCardProps> = ({ service, category }) => {
  const getDemandColor = (demand: Service["demand"]): string => {
    switch (demand) {
      case "high": return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "medium": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case "low": return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group bg-white dark:bg-gray-800 dark:shadow-gray-900/20">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {service.name}
            </h3>
            <Badge variant="secondary" className={`text-xs ${getDemandColor(service.demand)}`}>
              {service.demand} demand
            </Badge>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4" />
                <span>{service.providers} providers</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-medium">{service.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Starting from:</span>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">₵{service.price}/hr</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button 
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg dark:shadow-gray-900/20" 
              asChild
            >
              <Link href="/download" className="flex items-center justify-center gap-2">
                <Smartphone className="w-4 h-4" />
                Get Started
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const getFilteredServices = () => {
    if (activeCategory === "All") {
      const allServices = Object.entries(servicesByCategory).flatMap(([cat, services]) =>
        services.map(service => ({ ...service, category: cat }))
      );
      
      if (searchTerm) {
        return allServices.filter(service =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return allServices;
    }

const categoryServices = servicesByCategory[activeCategory as CategoryName] || [];
    if (searchTerm) {
      return categoryServices.filter((service: Service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).map((service: Service) => ({ ...service, category: activeCategory }));
    }
    return categoryServices.map((service: Service) => ({ ...service, category: activeCategory }));
  };

  const totalServices = Object.values(servicesByCategory).flat().length;
  const totalProviders = Object.values(servicesByCategory)
    .flat()
    .reduce((acc: number, service: Service) => acc + service.providers, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Professional Services Marketplace
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Ghana&apos;s premier platform connecting skilled professionals with clients. 
            Whether you are looking for services or offering your expertise, Taskdey is your gateway to success.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-gray-900/20">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{totalServices}+</div>
              <div className="text-gray-600 dark:text-gray-400">Service Types</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-gray-900/20">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalProviders}+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Providers</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-gray-900/20">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Platform Support</div>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 bg-white dark:bg-gray-800 dark:text-gray-100 shadow-lg focus:ring-2 focus:ring-indigo-500 text-lg dark:shadow-gray-900/20"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                    activeCategory === category.name
                      ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg transform scale-105"
                      : `${category.color} hover:shadow-md hover:scale-105`
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getFilteredServices().map((service, index) => (
              <motion.div
                key={`${service.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ServiceCard service={service} category={service.category} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dual CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 space-y-8"
        >
          {/* For Service Providers */}
          <div className="text-center bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Are You a Service Provider?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join 500+ skilled professionals earning money on Taskdey. Share your expertise, set your rates, and get booked by clients in your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl shadow-lg"
                asChild
              >
                <Link href="https://apps.apple.com/app/taskdey" className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Start Earning Today
                </Link>
              </Button>
            </div>
          </div>

          {/* For Clients */}
          <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Need Professional Services?</h2>
            <p className="text-xl mb-8 opacity-90">
              Access verified professionals across Ghana. From home repairs to personal care, find the right expert for every need with transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl shadow-lg"
                asChild
              >
                <Link href="https://apps.apple.com/app/taskdey" className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  App Store
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl shadow-lg"
                asChild
              >
                <Link href="https://play.google.com/store/apps/details?id=com.taskdey.app" className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Play Store
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}