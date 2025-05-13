// pages/index.js
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  BriefcaseBusiness,
  ChevronRight,
  Clock,
  Download,
  Map,
  MessageSquare,
  Shield,
  Smartphone,
  Star,
  Users
} from 'lucide-react';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// SEO Components remain unchanged
const SEOContent = () => (
  <NextSeo
    title="Taskdey - Connecting Workers & Clients in Ghana | Find Local Services"
    description="Taskdey connects skilled vocational workers with clients in Ghana. Find electricians, plumbers, carpenters, and more skilled professionals near you. Download the app today!"
    canonical="https://taskdey.com/"
    openGraph={{
      url: 'https://taskdey.com/',
      title: 'Taskdey - Connecting Workers & Clients in Ghana',
      description: 'Find skilled vocational workers near you or offer your services. The #1 platform for connecting service providers and clients in Ghana.',
      images: [
        {
          url: 'https://taskdey.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Taskdey App Preview',
        }
      ],
      site_name: 'Taskdey',
    }}
    twitter={{
      handle: '@taskdeyapp',
      site: '@taskdeyapp',
      cardType: 'summary_large_image',
    }}
    additionalMetaTags={[
      {
        name: 'keywords',
        content: 'vocational workers, Ghana, plumber, electrician, carpenter, handyman, service app, skilled workers, home services, local services'
      },
      {
        name: 'application-name',
        content: 'Taskdey'
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'theme-color',
        content: '#4f46e5'
      }
    ]}
    additionalLinkTags={[
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '180x180'
      },
      {
        rel: 'manifest',
        href: '/manifest.json'
      }
    ]}
  />
);

// Structured Data Component
const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "name": "Taskdey",
    "operatingSystem": "Android, iOS",
    "applicationCategory": "ServiceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "GHS"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "10000"
    },
    "description": "Taskdey connects skilled vocational workers with clients in Ghana. Find electricians, plumbers, carpenters and more skilled professionals near you."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('client');
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    howItWorks: false,
    testimonials: false,
    stats: false,
    faq: false,
  });
  const [activeFaq, setActiveFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const loadingToast = toast.loading("Sending your message...");
    
    const formData = {
      name: `${e.target.firstName.value} ${e.target.lastName.value}`,
      email: e.target.email.value,
      phone: e.target.phone.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
      timestamp: new Date().toISOString(),
    };
    
    try {
      const response = await fetch('/api/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      toast.dismiss(loadingToast);
      toast.success("Message sent successfully! We'll get back to you soon.");
      
      e.target.reset();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to send message. Please try again later.");
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Refs for scroll animations
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const testimonialsRef = useRef(null);
  const statsRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    // Initial animation
    setIsVisible({
      hero: true,
      features: false,
      howItWorks: false,
      testimonials: false,
      stats: false,
      faq: false,
    });
    
    // Set up intersection observers for scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === featuresRef.current) {
            setIsVisible(prev => ({ ...prev, features: true }));
          } else if (entry.target === howItWorksRef.current) {
            setIsVisible(prev => ({ ...prev, howItWorks: true }));
          } else if (entry.target === testimonialsRef.current) {
            setIsVisible(prev => ({ ...prev, testimonials: true }));
          } else if (entry.target === statsRef.current) {
            setIsVisible(prev => ({ ...prev, stats: true }));
          } else if (entry.target === faqRef.current) {
            setIsVisible(prev => ({ ...prev, faq: true }));
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (howItWorksRef.current) observer.observe(howItWorksRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (statsRef.current) observer.observe(statsRef.current);
    if (faqRef.current) observer.observe(faqRef.current);
    
    return () => {
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (howItWorksRef.current) observer.unobserve(howItWorksRef.current);
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
      if (statsRef.current) observer.unobserve(statsRef.current);
      if (faqRef.current) observer.unobserve(faqRef.current);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const features = [
    {
      title: "Connect Instantly",
      description: "Find skilled workers near you with just a few taps. Our location-based matching ensures you get help quickly.",
      icon: <Map className="h-8 w-8 text-indigo-500" />,
    },
    {
      title: "Verified Workers",
      description: "All service providers are vetted and verified. We check IDs, qualifications, and background for your safety.",
      icon: <Shield className="h-8 w-8 text-indigo-500" />,
    },
    {
      title: "Fast Service",
      description: "Get quick responses and service within hours. Most jobs are assigned within 30 minutes of posting.",
      icon: <Clock className="h-8 w-8 text-indigo-500" />,
    },
    {
      title: "Growing Community",
      description: "Join thousands of workers and clients in Ghana. Our network covers all major cities and many rural areas.",
      icon: <Users className="h-8 w-8 text-indigo-500" />,
    },
    {
      title: "Secure Payments",
      description: "Pay through our secure platform with multiple payment options. Funds are only released when you're satisfied.",
      icon: <BriefcaseBusiness className="h-8 w-8 text-indigo-500" />,
    },
    {
      title: "Direct Messaging",
      description: "Communicate directly with workers through our built-in messaging system. Discuss details and requirements easily.",
      icon: <MessageSquare className="h-8 w-8 text-indigo-500" />,
    },
  ];


  const stats = [
    { value: "2,000+", label: "Active Workers" },
    { value: "1,500+", label: "Completed Tasks" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "16", label: "Regions Covered" },
  ];

  const workerServices = [
    "Electricians", "Plumbers", "Carpenters", "Painters", 
    "Mechanics", "Cleaners", "Gardeners", "Tailors", 
    "Masons", "Welders", "Chefs", "Drivers"
  ];
  
  const faqs = [
    {
      question: "How do I find workers on Taskdey?",
      answer: "Simply download the app, create an account, and search for the service you need. You can browse nearby workers, view their profiles and ratings, and book them directly through the app."
    },
    {
      question: "How does payment work?",
      answer: "Taskdey offers secure in-app payments. You can pay using mobile money, credit/debit cards, or bank transfers. Payment is only released to workers after you confirm that the job has been completed satisfactorily."
    },
    {
      question: "How can I become a service provider?",
      answer: "Download the app, create a worker account, complete your profile with relevant skills and experience, upload verification documents, and pass our vetting process. Once approved, you can start receiving job requests."
    },
    {
      question: "What areas does Taskdey cover?",
      answer: "Taskdey currently operates in major cities across Ghana, including Accra, Kumasi, Tamale, Cape Coast, and Takoradi, with plans to expand to more regions soon."
    },
    {
      question: "Is there a guarantee on work done?",
      answer: "Yes, all work done through Taskdey comes with a 7-day satisfaction guarantee. If you're not satisfied with the work, we facilitate resolution between you and the worker or help find a replacement."
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      <Head>
        <title>Taskdey - Empowering Vocational Workers in Ghana</title>
        <meta name="description" content="Connect with skilled workers near you. Taskdey bridges the gap between service providers and clients in Ghana." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" hrefLang="en" href="https://taskdey.com/" />
      </Head>

      {/* Add the SEO components */}
      <SEOContent />
      <StructuredData />
      
      {/* Hero Section - Modern Redesign */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-600 overflow-hidden pt-20 lg:pt-24 pb-20">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-40 -top-40 w-80 h-80 rounded-full bg-indigo-500"></div>
          <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-indigo-300"></div>
          <div className="absolute left-1/3 bottom-0 w-60 h-60 rounded-full bg-indigo-400"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible.hero ? 1 : 0, y: isVisible.hero ? 0 : 50 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left text-white"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Connect with <span className="text-indigo-300">Local Skills</span>,<br/>
                Unlock <span className="text-indigo-300">Opportunities</span>
              </h1>
              <p className="text-xl text-indigo-100 mb-8 max-w-lg mx-auto lg:mx-0">
                Taskdey empowers vocational workers in Ghana while helping clients find reliable service providers - all in one seamless app.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <a href="#download" className="bg-white text-indigo-700 px-8 py-4 rounded-lg hover:bg-indigo-100 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 font-semibold transition duration-300 transform hover:-translate-y-1">
                  <Download className="h-5 w-5" />
                  <span>Download Now</span>
                </a>
                <a href="#how-it-works" className="bg-transparent border border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 flex items-center justify-center space-x-2 font-semibold transition duration-300 transform hover:-translate-y-1">
                  <span>Learn More</span>
                  <ChevronRight className="h-5 w-5" />
                </a>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <span className="text-sm text-white font-medium">Popular Services:</span>
                {workerServices.slice(0, 4).map((service, index) => (
                  <span key={index} className="px-3 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm">
                    {service}
                  </span>
                ))}
                <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-sm">
                  +{workerServices.length - 4} more
                </span>
              </div>
            </motion.div>
            
            {/* App Preview */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="relative max-w-xs">
                <div className="">
                <div style={{ position: 'relative', width: '256px', height: '550px' }}>
                    <Image 
                      src="/find.png" 
                      alt="Taskdey App Preview" 
                      fill
    style={{ objectFit: 'cover' }}
                      className="rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t  flex items-end p-6">
                      <div className="text-white">
                      
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating element */}
                <div className="absolute -right-16 top-16 bg-white p-4 rounded-xl shadow-lg transform rotate-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">2,000+</p>
                      <p className="text-xs text-gray-500">Workers</p>
                    </div>
                  </div>
                </div>
                
                {/* Second floating element */}
                <div className="absolute -left-12 bottom-16 bg-white p-4 rounded-xl shadow-lg transform -rotate-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Star className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">4.8/5</p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff" preserveAspectRatio="none">
            <path d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,69.3C672,85,768,107,864,106.7C960,107,1056,85,1152,64C1248,43,1344,21,1392,10.7L1440,0L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Stats Section - Redesigned */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible.stats ? 1 : 0, y: isVisible.stats ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-white shadow-md">
                <p className="text-3xl md:text-4xl font-bold mb-1 text-indigo-600 text-center">{stat.value}</p>
                <p className="text-gray-600 text-center font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section - Redesigned */}
      <section id="services" className="py-20 bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible.features ? 1 : 0, y: isVisible.features ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Discover Services Available</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with skilled professionals across a wide range of services
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {workerServices.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isVisible.features ? 1 : 0, scale: isVisible.features ? 1 : 0.9 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center group hover:bg-indigo-600"
              >
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-white transition-colors duration-300">
                  <BriefcaseBusiness className="h-6 w-6 text-indigo-600 group-hover:text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">{service}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Redesigned */}
      <section ref={featuresRef} id="features" className="py-20 bg-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full bg-indigo-500"></div>
          <div className="absolute left-0 top-1/4 w-96 h-96 rounded-full bg-indigo-300"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible.features ? 1 : 0, y: isVisible.features ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Taskdey?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to make finding and hiring skilled workers simple, fast, and reliable.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible.features ? 1 : 0, y: isVisible.features ? 0 : 30 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-white rounded-xl p-8 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-white shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
              >
                <div className="mb-6 bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Redesigned */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible.howItWorks ? 1 : 0, y: isVisible.howItWorks ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Taskdey Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the simplicity of finding workers or jobs with our easy-to-use app.
            </p>
          </motion.div>
          
          {/* Tabs */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex justify-center mb-8">
              <button 
                onClick={() => setActiveTab('client')}
                className={`px-8 py-3 rounded-l-full transition duration-300 ${activeTab === 'client' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
              >
                For Clients
              </button>
              <button 
                onClick={() => setActiveTab('worker')}
                className={`px-8 py-3 rounded-r-full transition duration-300 ${activeTab === 'worker' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
              >
                For Workers
              </button>
            </div>
            
            {/* Client Tab */}
            <AnimatePresence mode="wait">
              {activeTab === 'client' && (
                <motion.div 
                  key="client"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                 <div>
  <div className="grid gap-8">
    <div className="bg-white rounded-xl p-6 shadow-lg flex">
      <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
        <span className="font-bold text-indigo-600">1</span>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Search for a Service</h3>
        <p className="text-gray-600">Open the app and search for the specific service you need. Browse through available categories or use the search function to find exactly what you are looking for.</p>
      </div>
    </div>
    <div className="bg-white rounded-xl p-6 shadow-lg flex">
      <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
        <span className="font-bold text-indigo-600">2</span>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Find Workers Near You</h3>
        <p className="text-gray-600">Browse through available workers in your area. View profiles, ratings, and previous work samples. Compare options and select a worker close to your location for faster service.</p>
      </div>
    </div>
    <div className="bg-white rounded-xl p-6 shadow-lg flex">
      <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
        <span className="font-bold text-indigo-600">3</span>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Book and Complete</h3>
        <p className="text-gray-600">Book your chosen worker with just a few taps. Communicate job details, track their arrival in real-time, and pay securely through the app when the work is completed to your satisfaction.</p>
      </div>
    </div>
  </div>
</div>
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className=" rounded-3xl  overflow-hidden">
                       <div style={{ position: 'relative', width: '256px', height: '550px' }}>
  <Image 
    src="/appreview.png"
    alt="Taskdey App Preview"
    fill
    style={{ objectFit: 'cover' }}
    className="rounded-2xl"
  />
</div>
                      </div>
                      {/* Floating notification */}
                      <div className="absolute -right-12 top-16 bg-white p-3 rounded-lg shadow-lg max-w-xs">
                        <p className="text-sm font-medium">Task Complete!</p>
                        <p className="text-xs text-gray-500">Your plumber has fixed the leak</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Worker Tab */}
              {activeTab === 'worker' && (
                <motion.div 
                  key="worker"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  <div className="flex justify-center order-last md:order-first">
                    <div className="relative">
                      <div className=" overflow-hidden">
                      <div style={{ position: 'relative', width: '256px', height: '550px' }}>
  <Image 
    src="/hero.png"
    alt="Taskdey App Preview"
    fill
    style={{ objectFit: 'cover' }}
    className="rounded-2xl"
  />
</div>
                      </div>
                      {/* Floating notification */}
                      <div className="absolute -left-12 top-24 bg-white p-3 rounded-lg shadow-lg max-w-xs">
                        <p className="text-sm font-medium">New Job Request!</p>
                        <p className="text-xs text-gray-500">5km away - Plumbing work</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid gap-8">
                      <div className="bg-white rounded-xl p-6 shadow-lg flex">
                        <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="font-bold text-indigo-600">1</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-2">Create Your Profile</h3>
                          <p className="text-gray-600">Sign up and build a comprehensive profile. Add your skills, experience, certification documents, and portfolio of previous work to stand out.</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-6 shadow-lg flex">
                        <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="font-bold text-indigo-600">2</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-2">Complete Verification</h3>
                          <p className="text-gray-600">Verify your identity and qualifications through our thorough vetting process. This builds trust with clients and gives you access to more job opportunities.</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-6 shadow-lg flex">
                        <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="font-bold text-indigo-600">3</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-2">Receive Bookings</h3>
                          <p className="text-gray-600">Get notified of job requests near you. Accept bookings that match your schedule and expertise. Communicate with clients through the app.</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-6 shadow-lg flex">
                        <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="font-bold text-indigo-600">4</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-2">Earn and Grow</h3>
                          <p className="text-gray-600">Complete jobs, get secure payments, and build your reputation through reviews. Develop your career and increase your rates as your rating improves.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      
      {/* FAQ Section - Redesigned */}
      <section ref={faqRef} id="faq" className="py-20 bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible.faq ? 1 : 0, y: isVisible.faq ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to the most common questions about Taskdey.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible.faq ? 1 : 0, y: isVisible.faq ? 0 : 20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="mb-4"
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className={`w-full text-left p-5 rounded-xl flex justify-between items-center transition duration-300 ${activeFaq === index ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-900 hover:bg-indigo-50 shadow'}`}
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <div className={`transform transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white border border-gray-100 rounded-b-xl p-5 shadow-inner">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-gray-600 mb-6">Have more questions? We&apos;sre here to help.</p>
            <a href="#contact" className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-medium">
              <span>Contact Support</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      
      {/* Download Section - Redesigned */}
      <section id="download" className="py-20 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-indigo-700 text-indigo-100 text-sm font-medium mb-4">Get Started</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Download the Taskdey App Today</h2>
              <p className="text-xl text-indigo-200 mb-8">
                Join thousands of satisfied users across Ghana. Download our app and transform how you find work or hire skilled professionals.
              </p>
              
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center md:justify-start">
                      <a href="https://apps.apple.com/gh/app/taskdey/id6739984570" className="bg-black text-white px-6 py-3 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-900 transition duration-300">
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.577 11.429c-.013-1.287.382-2.555 1.132-3.603-1.111-1.538-2.902-2.46-4.813-2.47-2.001-.076-3.919 1.17-4.932 1.17-1.027 0-2.57-1.156-4.241-1.12-1.768.055-3.426.994-4.513 2.484-1.98 3.383-.504 8.347 1.395 11.077.947 1.338 2.05 2.82 3.496 2.767 1.42-.057 1.951-.889 3.669-.889 1.704 0 2.203.889 3.678.851 1.531-.025 2.496-1.349 3.413-2.698.777-1.053 1.35-2.241 1.694-3.508-1.872-.823-3.065-2.645-3.068-4.685h.09v1.624z"/>
                            <path d="M14.623 3.446c-1.199-1.543-3.096-2.334-5.007-2.072.178 1.312.752 2.531 1.643 3.492.869.988 2.09 1.648 3.41 1.853.15-1.147-.229-2.295-1.046-3.273z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs">Download on the</div>
                          <div className="font-bold text-lg">App Store</div>
                        </div>
                      </a>
                      
                      <a href="https://play.google.com/store/apps/details?id=com.barrister1990.joymish&pcampaignid=web_share" className="bg-black text-white px-6 py-3 rounded-xl flex items-center justify-center space-x-3 hover:bg-gray-900 transition duration-300">
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.563v21.02c0 .193.045.383.112.562l11.02-11.099L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs">GET IT ON</div>
                          <div className="font-bold text-lg">Google Play</div>
                        </div>
                      </a>
                    </div>
              
              <div className="bg-indigo-800/50 p-4 rounded-xl backdrop-blur-sm flex items-center space-x-3">
                <AlertCircle className="h-6 w-6 text-amber-300 flex-shrink-0" />
                <p className="text-indigo-100 text-sm">By downloading the app, you agree to our Terms of Service and Privacy Policy.</p>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-end">
                    <div className="relative">
                    <div style={{ position: 'relative', width: '256px', height: '550px' }}>
        <Image 
          src="/down.png"
          alt="Taskdey App"
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-2xl"
        />
      </div>
                      
                      {/* QR code */}
                      <div className="absolute -left-16 bottom-16 bg-white p-4 rounded-xl shadow-lg">
                        <div className="w-20 h-20 bg-gray-200">
                          <div className="relative w-full h-full">
                            <Image 
                              src="/qrcode.png" 
                              alt="QR Code" 
                              fill
                            />
                          </div>
                        </div>
                        <p className="text-xs text-center mt-2 text-gray-600">Scan to download</p>
                      </div>
                    </div>
                  </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section - New */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-10 text-center text-white shadow-xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-white"></div>
              <div className="absolute left-10 top-10 w-32 h-32 rounded-full bg-white"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform How You Work?</h2>
              <p className="text-xl text-indigo-100 mb-10 max-w-xl mx-auto">
                Whether you&apos;sre looking for work or need to hire skilled professionals, Taskdey makes it simple, reliable, and efficient.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#download" className="bg-white text-indigo-700 px-8 py-4 rounded-lg hover:bg-indigo-100 shadow-lg flex items-center justify-center space-x-2 font-semibold transition duration-300">
                  <Download className="h-5 w-5" />
                  <span>Download Now</span>
                </a>
                <a href="#contact" className="bg-transparent border border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 flex items-center justify-center space-x-2 font-semibold transition duration-300">
                  <MessageSquare className="h-5 w-5" />
                  <span>Contact Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
<section id="contact" className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">Get In Touch</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions or feedback? We&apos;sre here to help. Reach out to our team and we&apos;sll get back to you soon.
        </p>
      </div>
      
      <div className="grid md:grid-cols-5 gap-8">
        {/* Contact Information */}
        <div className="md:col-span-2 bg-indigo-600 text-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-500 rounded-full p-2 mt-1">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Email Us</h4>
                <p className="text-indigo-200">taskdeygh@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-500 rounded-full p-2 mt-1">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Call Us</h4>
                <p className="text-indigo-200">+233 24 1940 783</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-500 rounded-full p-2 mt-1">
                <Map className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Office</h4>
                <p className="text-indigo-200">Kasoa</p>
                <p className="text-indigo-200">Accra, Ghana</p>
              </div>
            </div>
          </div>
          

        </div>
        
        {/* Contact Form */}
        <div className="md:col-span-3 bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
          
          <form onSubmit={handleContactFormSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              placeholder="John"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              placeholder="Doe"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            placeholder="john@example.com"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            placeholder="+1 (123) 456-7890"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
          <select 
            id="subject" 
            name="subject"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
            disabled={isSubmitting}
          >
            <option value="">Select a subject</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Pricing Question">Pricing Question</option>
            <option value="Partnership Opportunity">Partnership Opportunity</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
          <textarea 
            id="message" 
            name="message"
            rows="5" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
            placeholder="Please describe how we can help you..."
            required
            disabled={isSubmitting}
          ></textarea>
        </div>
        
        <div className="mb-6 flex items-start">
          <input 
            type="checkbox" 
            id="privacy" 
            name="privacy"
            className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            required
            disabled={isSubmitting}
          />
          <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
            I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-800">Privacy Policy</a> and consent to Taskdey processing my data.
          </label>
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  </div>
</section>
    </div>
  );
}