"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  Briefcase,
  Clock,
  CreditCard,
  HelpCircle,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Star,
  Users
} from "lucide-react";
import { useState } from "react";

// Enhanced FAQ Categories with more comprehensive information
const FAQ_CATEGORIES = {
  clients: [
    {
      question: 'How do I book a service on Taskdey?',
      answer: 'Download the Taskdey app from Google Play Store or Apple App Store. Create your account, browse available workers in your area, view their profiles and ratings, then send a request directly. Once accepted, coordinate the details and schedule directly with your chosen worker.',
      icon: Users
    },
    {
      question: 'Are all workers on Taskdey verified and trustworthy?',
      answer: 'Yes, every worker undergoes comprehensive background checks, identity verification, and skill assessment before joining our platform. We also maintain a rating system where clients can review workers after each job, ensuring quality and accountability.',
      icon: Shield
    },
    {
      question: 'How do payments work on Taskdey?',
      answer: 'Taskdey does not process payments directly. Payment methods and amounts are agreed upon between you and the worker. Common payment options include Mobile Money (MTN, Vodafone, AirtelTigo), cash, or bank transfers. This gives you flexibility to choose what works best for both parties.',
      icon: CreditCard
    },
    {
      question: 'What types of services are available?',
      answer: 'Taskdey offers a wide range of home services including plumbing, electrical work, cleaning, carpentry, painting, appliance repair, gardening, and many more. Our workers are skilled professionals across various trades and domestic services.',
      icon: Briefcase
    },
    {
      question: 'How do I find workers in my area?',
      answer: 'Our GPS-powered location system automatically shows you available workers near your location. You can filter by service type, ratings, availability, and distance to find the perfect match for your needs.',
      icon: MapPin
    },
    {
      question: 'What if I\'m not satisfied with the work?',
      answer: 'We take quality seriously. You can rate and review workers after each job. If you encounter issues, contact our support team immediately. We work with both parties to resolve disputes and maintain high service standards.',
      icon: Star
    },
    {
      question: 'Is there customer support available?',
      answer: 'Yes! Our customer support team is available 24/7 to help with any questions or issues. You can reach us through the app\'s live chat, phone, or email. We\'re committed to ensuring your experience is smooth and satisfactory.',
      icon: Phone
    },
    {
      question: 'How far in advance should I book a service?',
      answer: 'Many workers are available for same-day or next-day services. However, for specialized services or during peak times, we recommend booking 2-3 days in advance to ensure availability and proper scheduling.',
      icon: Clock
    }
  ],
  workers: [
    {
      question: 'How do I join Taskdey as a service provider?',
      answer: 'Download the Taskdey app, complete your detailed profile with photos and service descriptions, verify your identity and skills through our verification process, and start receiving job requests from clients in your area.',
      icon: Briefcase
    },
    {
      question: 'How much can I realistically earn on Taskdey?',
      answer: 'Earnings vary based on your skills, experience, and availability. Many active workers earn ₵2,000-8,000 monthly working flexible hours. Specialized skills like plumbing or electrical work typically command higher rates than general services.',
      icon: CreditCard
    },
    {
      question: 'How do I receive payments from clients?',
      answer: 'Since Taskdey doesn\'t process payments, you negotiate payment terms directly with clients. Most workers accept Mobile Money (MTN, Vodafone, AirtelTigo), cash, or bank transfers. Payment is typically made upon job completion or as agreed with the client.',
      icon: CreditCard
    },
    {
      question: 'What is the verification process like?',
      answer: 'Our verification includes identity confirmation, skills assessment, background checks, and reference verification. This process typically takes 2-3 business days and ensures client trust while maintaining platform quality.',
      icon: Shield
    },
    {
      question: 'How do I get more job requests?',
      answer: 'Maintain a complete profile with clear photos, competitive pricing, prompt responses to requests, and excellent service quality. Higher ratings and positive reviews significantly increase your visibility and job opportunities.',
      icon: Star
    },
    {
      question: 'Can I set my own rates and working hours?',
      answer: 'Absolutely! You have complete control over your pricing and availability. Set your rates based on your skills and market demand, and choose when you want to work. Taskdey gives you the flexibility to run your business your way.',
      icon: Clock
    },
    {
      question: 'What happens if there\'s a dispute with a client?',
      answer: 'Our support team mediates disputes fairly. We encourage clear communication and documentation of work. Both parties can contact support, and we work to resolve issues while maintaining platform integrity and user satisfaction.',
      icon: MessageCircle
    },
    {
      question: 'Is there support for workers on the platform?',
      answer: 'Yes! We provide 24/7 support, business tips, and resources to help you succeed. Our team is available via app chat, phone, or email to assist with technical issues, disputes, or general questions about maximizing your earning potential.',
      icon: Phone
    }
  ],
};

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("clients");

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-10 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 dark:from-indigo-400/10 dark:to-purple-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 left-10 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 dark:from-blue-400/10 dark:to-cyan-400/10 rounded-full blur-2xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">
              Frequently Asked
            </span>
            <br />
            <span>Questions</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about using Taskdey as a client or service provider. Get the information you need to get started.
          </p>
        </motion.div>

        {/* FAQ Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Tabs defaultValue="clients" className="w-full" onValueChange={setActiveTab}>
            {/* Enhanced Tab Navigation */}
            <div className="flex justify-center mb-8 sm:mb-12">
              <TabsList className="grid w-full max-w-md grid-cols-2 h-12 sm:h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 border border-slate-200 dark:border-slate-700">
                <TabsTrigger 
                  value="clients" 
                  className="flex items-center gap-2 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 data-[state=active]:bg-white data-[state=active]:dark:bg-slate-700 data-[state=active]:shadow-md data-[state=active]:text-indigo-600 data-[state=active]:dark:text-indigo-400"
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">For Clients</span>
                  <span className="sm:hidden">Clients</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="workers" 
                  className="flex items-center gap-2 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 data-[state=active]:bg-white data-[state=active]:dark:bg-slate-700 data-[state=active]:shadow-md data-[state=active]:text-indigo-600 data-[state=active]:dark:text-indigo-400"
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="hidden sm:inline">For Workers</span>
                  <span className="sm:hidden">Workers</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Clients FAQ */}
            <TabsContent value="clients">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Accordion type="single" collapsible className="space-y-4">
                  {FAQ_CATEGORIES.clients.map((faq, index) => {
                    const IconComponent = faq.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <AccordionItem 
                          value={`client-${index}`}
                          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2"
                        >
                          <AccordionTrigger className="text-left hover:no-underline group py-4 sm:py-6">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              </div>
                              <span className="text-sm sm:text-base lg:text-lg font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                                {faq.question}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed pb-4 sm:pb-6 ml-14 sm:ml-16">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    );
                  })}
                </Accordion>
              </motion.div>
            </TabsContent>

            {/* Workers FAQ */}
            <TabsContent value="workers">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Accordion type="single" collapsible className="space-y-4">
                  {FAQ_CATEGORIES.workers.map((faq, index) => {
                    const IconComponent = faq.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <AccordionItem 
                          value={`worker-${index}`}
                          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2"
                        >
                          <AccordionTrigger className="text-left hover:no-underline group py-4 sm:py-6">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              </div>
                              <span className="text-sm sm:text-base lg:text-lg font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                                {faq.question}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed pb-4 sm:pb-6 ml-14 sm:ml-16">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    );
                  })}
                </Accordion>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-500 dark:via-purple-500 dark:to-indigo-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white overflow-hidden max-w-2xl mx-auto">
            {/* Background pattern */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
            
            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 sm:mb-6">
                <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
                Still Have Questions?
              </h3>
              <p className="text-sm sm:text-base lg:text-lg opacity-90 mb-6 sm:mb-8">
                Our support team is here to help you 24/7. Get in touch with us through the app or reach out directly.
              </p>
             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
      {/* Call Support */}
      <a href="tel:+233241940783" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-all">
        <Phone className="w-4 h-4" />
        <span>24/7 Support</span>
      </a>

      {/* WhatsApp Chat */}
      <a
        href="https://wa.me/+233241940783"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-all"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Live Chat Available</span>
      </a>
    </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}