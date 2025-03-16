// pages/index.js
import { AnimatePresence, motion } from 'framer-motion';
import { BriefcaseBusiness, Clock, Map, Menu, MessageSquare, Shield, Star, Users, X } from 'lucide-react';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';


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

// Structured Data Component - Copy this too
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
  });

  useEffect(() => {
    // Trigger animations on page load
    const timeout = setTimeout(() => {
      setIsVisible({
        hero: true,
        features: true,
        howItWorks: true,
        testimonials: true,
        stats: true,
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  const testimonials = [
    {
      name: "Addae Collins",
      role: "Teacher",
      content: "Since joining Taskdey, I've been able to find consistent work in my neighborhood. The app has truly changed my life as a vocational worker. I earn 40% more than before and can support my family better.",
      avatar: "/collins",
      rating: 5,
    },
    {
      name: "Lukman Sullemana",
      role: "Client",
      content: "Finding reliable workers used to be a headache. With Taskdey, I get qualified professionals near me within minutes. It's revolutionary! I've used it for plumbing, electrical work, and carpentry - all excellent experiences.",
      avatar: "/luke",
      rating: 5,
    },
    {
      name: "Charles Awuku",
      role: "IT Personnel",
      content: "The Taskdey app has helped me grow my client base and increased my monthly income. Vocational work is now respected and profitable. I've been able to expand my business and even hire an apprentice.",
      avatar: "/cha",
      rating: 4,
    },
    {
      name: "Richmond Abaa",
      role: "Client",
      content: "I love how easy it is to find vetted professionals on Taskdey. The rating system helps me choose the best workers, and the secure payment gives me peace of mind. It's transformed how I maintain my home.",
      avatar: "/api/placeholder/50/50",
      rating: 5,
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

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <Head>
        <title>Taskdey - Empowering Vocational Workers in Ghana</title>
        <meta name="description" content="Connect with skilled workers near you. Taskdey bridges the gap between service providers and clients in Ghana." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" hrefLang="en" href="https://taskdey.com/" />
        <link rel="alternate" hrefLang="fr" href="https://taskdey.com/fr/" />
      </Head>

 {/* Add the SEO components */}
 <SEOContent />
      <StructuredData />
      {/* Navigation */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">Taskdey</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-indigo-600 transition duration-300">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition duration-300">How It Works</a>
            <a href="#testimonials" className="text-gray-700 hover:text-indigo-600 transition duration-300">Testimonials</a>
            <a href="#services" className="text-gray-700 hover:text-indigo-600 transition duration-300">Services</a>
            <a href="#download" className="text-gray-700 hover:text-indigo-600 transition duration-300">Download</a>
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <a href="#download" className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
              Get the App
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-500 hover:text-indigo-600 focus:outline-none">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
                <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-indigo-600 transition duration-300">Features</a>
                <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-indigo-600 transition duration-300">How It Works</a>
                <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-indigo-600 transition duration-300">Testimonials</a>
                <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-indigo-600 transition duration-300">Services</a>
                <a href="#download" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-indigo-600 transition duration-300">Download</a>
                <a href="#download" onClick={() => setIsMenuOpen(false)} className="bg-indigo-600 text-white px-6 py-2 rounded-full text-center hover:bg-indigo-700 transition duration-300">
                  Get the App
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible.hero ? 1 : 0, y: isVisible.hero ? 0 : 50 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="inline-block">Connecting </span>
                <span className="text-indigo-600 inline-block">Workers</span>
                <span className="inline-block"> to </span>
                <span className="text-indigo-600 inline-block">Opportunities</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Taskdey empowers vocational workers in Ghana by connecting them with clients in need of their services, all in one convenient app.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4 mb-8">
                <a href="#download" className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
                  Download Now
                </a>
                <a href="#how-it-works" className="bg-white text-indigo-600 border border-indigo-600 px-8 py-3 rounded-full hover:bg-indigo-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
                  Learn More
                </a>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {workerServices.slice(0, 6).map((service, index) => (
                  <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                    {service}
                  </span>
                ))}
                <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm">
                  +{workerServices.length - 6} more
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
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible.stats ? 1 : 0, y: isVisible.stats ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {stats.map((stat, index) => (
              <div key={index} className="p-4">
                <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-indigo-200">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
{/* Features Section */}
<section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible.features ? 1 : 0, y: isVisible.features ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Taskdey?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to make finding and hiring skilled workers simple, fast, and reliable.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible.features ? 1 : 0, y: isVisible.features ? 0 : 30 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300"
              >
                <div className="mb-4 bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible.features ? 1 : 0, y: isVisible.features ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Services Available</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with skilled professionals across a wide range of services
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {workerServices.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isVisible.features ? 1 : 0, scale: isVisible.features ? 1 : 0.9 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center"
              >
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BriefcaseBusiness className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{service}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible.testimonials ? 1 : 0, y: isVisible.testimonials ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from workers and clients in Ghana who use Taskdey.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isVisible.testimonials ? 1 : 0, scale: isVisible.testimonials ? 1 : 0.9 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 relative"
              >
                <div className="mb-4 flex items-center">
                  <div className="bg-indigo-100 rounded-full overflow-hidden w-12 h-12 mr-4">
                    <Image src={testimonial.avatar} alt={testimonial.name} width={50} height={50} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4" fill={i < testimonial.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">{testimonial.content}</p>
                <div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Started with Taskdey Today</h2>
              <p className="text-xl mb-8 text-indigo-100">
                Download the Taskdey app and join thousands of users transforming how vocational work gets done in Ghana.
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

{/* Footer */}
<footer className="bg-gray-900 text-white py-12">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-2xl font-bold mb-4 text-indigo-400">Taskdey</h3>
        <p className="text-gray-400 mb-4">
          Connecting skilled workers with clients across Ghana. Empowering vocational work through technology.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/showcase/joymish/?viewAsMember=true" className="text-gray-400 hover:text-white transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="https://www.youtube.com/channel/UCa-m7eGM6LF2GzatXb_MCww" className="text-gray-400 hover:text-white transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
          </a>
        </div>
      </div>
      
      <div>
        <h4 className="font-bold mb-4">Company</h4>
        <ul className="space-y-2">
          <Link href="/about">
          <li className="text-gray-400 hover:text-white transition duration-300">About Us</li>
         </Link>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold mb-4">Resources</h4>
        <ul className="space-y-2">
        
          <li>
            <Link href="/terms" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</Link>
        
            </li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold mb-4">Newsletter</h4>
        <p className="text-gray-400 mb-4">Stay updated with our latest features and news.</p>
        <form className="flex flex-col space-y-2">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300">
            Subscribe
          </button>
        </form>
      </div>
    </div>
    
    <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Taskdey. All rights reserved.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <Link href="/privacy">
        <p className="text-gray-400 hover:text-white transition duration-300 text-sm">Privacy Policy</p>
   
        </Link>
        <Link href="/terms" >
        <p className="text-gray-400 hover:text-white transition duration-300 text-sm">Terms of Service</p>
      
        </Link>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}