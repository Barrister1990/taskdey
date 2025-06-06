"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useRef, useState } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    location: "Accra, Ghana",
    content: "Taskdey has completely transformed how I handle home maintenance. The plumber I hired through the platform was not only professional but arrived exactly on time and completed the work flawlessly. The entire process was seamless!",
    image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg",
    rating: 5,
    service: "Plumbing"
  },
  {
    name: "Michael Addo",
    role: "Electrician",
    location: "Kumasi, Ghana", 
    content: "As a skilled electrician, Taskdey has been a game-changer for my business. I've been able to connect with quality clients, grow my customer base, and the platform's user-friendly interface makes managing jobs incredibly efficient.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    rating: 5,
    service: "Electrical Work"
  },
  {
    name: "Akosua Mensah",
    role: "Homeowner",
    location: "Tema, Ghana",
    content: "I was skeptical about hiring someone online, but Taskdey's verification process gave me confidence. The cleaner I hired was thorough, trustworthy, and now I book her services regularly. Highly recommended!",
    image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg",
    rating: 5,
    service: "Cleaning"
  },
  {
    name: "Kwame Asante",
    role: "Carpenter",
    location: "Tamale, Ghana",
    content: "Taskdey has opened up so many opportunities for me. The quality of clients and the steady stream of projects has allowed me to focus on what I do best - creating beautiful furniture and home improvements.",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    rating: 5,
    service: "Carpentry"
  }
];

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Width of card + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 dark:from-indigo-400/10 dark:to-purple-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 dark:from-blue-400/10 dark:to-cyan-400/10 rounded-full blur-2xl" />
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
            <Star className="w-4 h-4 fill-current" />
            <span>Testimonials</span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">
              What People Say
            </span>
            <br />
            <span>About Taskdey</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover why thousands of Ghanaians trust Taskdey for their home service needs and business growth.
          </p>
        </motion.div>

        {/* Navigation Buttons - Hidden on mobile, visible on larger screens */}
        <div className="hidden lg:flex justify-end mb-6 gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-3 rounded-xl border transition-all duration-300 ${
              canScrollLeft
                ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 dark:hover:border-indigo-700 shadow-sm hover:shadow-md'
                : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-3 rounded-xl border transition-all duration-300 ${
              canScrollRight
                ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 dark:hover:border-indigo-700 shadow-sm hover:shadow-md'
                : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-none w-72 sm:w-80 lg:w-96 snap-start group"
              >
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] border border-slate-100 dark:border-slate-700 h-full overflow-hidden">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 line-clamp-4">
                      "{testimonial.content}"
                    </p>

                    {/* Service Badge */}
                    <div className="inline-flex items-center px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-full mb-6">
                      {testimonial.service}
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-white dark:ring-slate-700 shadow-md"
                        />
                        {/* Online indicator */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-slate-800" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                          {testimonial.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll indicator dots - Mobile only */}
          <div className="flex justify-center gap-2 mt-6 lg:hidden">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 text-indigo-700 dark:text-indigo-300 px-6 py-3 rounded-full text-sm font-medium border border-indigo-100 dark:border-indigo-800">
            <Star className="w-4 h-4 fill-current" />
            <span>Join 10,000+ satisfied users</span>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}