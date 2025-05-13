// pages/about.js
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('mission');
  
  // Team members data
  const teamMembers = [
    {
      name: 'Charles Awuku',
      role: 'Founder & CEO',
      image: '/team.jpg',
      bio: 'A software developer, teacher, and tech entrepreneur, Charles founded Taskdey to bridge the gap between skilled workers and clients in Ghana.'
    },
    {
      name: 'Lukman Sulemana',
      role: 'Digital Marketing Lead',
      image: '/teaml.jpg',
      bio: 'Lukman drives Taskdey&apos;s digital marketing strategies, helping connect vocational workers with clients across Ghana.'
    }
  ];
  
  // FAQ data
  const faqItems = [
    {
      question: "How does Taskdey work?",
      answer: "Taskdey connects skilled vocational workers with clients who need their services. Clients post jobs or search for workers, while workers create profiles showcasing their skills and experience. Our platform handles the matching, scheduling, payment processing, and review system to ensure a smooth experience."
    },
    {
      question: "What services are available on Taskdey?",
      answer: "Taskdey offers a wide range of vocational services including plumbing, electrical work, carpentry, painting, tailoring, hairdressing, auto repair, cleaning, catering, and more. We are constantly expanding our service categories to meet the needs of our community."
    },
    {
      question: "How are workers vetted?",
      answer: "All workers undergo a thorough vetting process including skills assessment, credential verification, background checks, and in-person interviews. We also maintain a rating system and regularly review worker performance to ensure consistent quality."
    },
    {
      question: "Where is Taskdey available?",
      answer: "Taskdey currently operates in Accra, Hohoe, Kumasi, Takoradi, Tamale, Cape Coast, Ho, Koforidua, and Sunyani. We are rapidly expanding to other cities across Ghana to reach more communities."
    }
  ];

  return (
    <>
      <Head>
        <title>About Us | Taskdey</title>
        <meta name="description" content="Learn about Taskdey, connecting skilled workers with clients across Ghana" />
      </Head>
      
      {/* Modern Hero Section with Parallax Effect */}
      <div className="relative h-screen bg-gradient-to-r from-indigo-900 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 bg-[url('/about-hero-bg.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        
        {/* Animated Shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">About Taskdey</span>
            </h1>
            <p className="text-xl md:text-3xl mb-10 text-indigo-100">
              Connecting skilled workers with clients across Ghana
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                Join as Worker
              </a>
              <a className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg shadow-lg hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out transform hover:-translate-y-1">
                Find Services
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
      
      {/* Stats with Animated Counters */}
      <div className="py-12 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-5xl mx-auto">
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="text-4xl font-bold mb-2 text-indigo-600">2,000+</div>
              <p className="text-gray-600 font-medium">Workers Empowered</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="text-4xl font-bold mb-2 text-indigo-600">1,500+</div>
              <p className="text-gray-600 font-medium">Jobs Completed</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="text-4xl font-bold mb-2 text-indigo-600">8</div>
              <p className="text-gray-600 font-medium">Cities Served</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="text-4xl font-bold mb-2 text-indigo-600">4.8/5</div>
              <p className="text-gray-600 font-medium">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* About Us Tabs Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Our Story</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
          </div>
          
          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center mb-10">
            <nav className="flex space-x-2 p-1 bg-white rounded-xl shadow-md">
              {['mission', 'story', 'approach'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition duration-300 ${
                    activeTab === tab 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-indigo-50'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Mission Tab */}
            <div className={`${activeTab === 'mission' ? 'block' : 'hidden'}`}>
              <div className="md:flex">
                <div className="md:w-1/2 bg-indigo-600 text-white p-12">
                  <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                  <p className="text-xl leading-relaxed">
                    To empower skilled workers and create efficient connections between service providers and clients through technology,
                    contributing to economic growth and improved livelihoods across Ghana.
                  </p>
                </div>
                <div className="md:w-1/2 p-12">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition duration-300">
                      <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold mb-2">Community</h4>
                      <p className="text-gray-600">Building a trusted community of skilled workers and satisfied clients.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition duration-300">
                      <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold mb-2">Empowerment</h4>
                      <p className="text-gray-600">Providing vocational workers with tools to grow their businesses.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition duration-300">
                      <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold mb-2">Quality</h4>
                      <p className="text-gray-600">Ensuring reliable, high-quality service delivery and customer satisfaction.</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition duration-300">
                      <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold mb-2">Trust</h4>
                      <p className="text-gray-600">Building a platform based on transparency, security, and reliability.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Story Tab */}
            <div className={`${activeTab === 'story' ? 'block' : 'hidden'}`}>
              <div className="md:flex items-stretch">
                <div className="md:w-2/5 relative">
                  <div className="absolute inset-0 bg-indigo-800 opacity-20"></div>
                  <div className="h-full relative">
                    <Image
                      src="/founder.jpg"
                      alt="Taskdey founding team"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <div className="md:w-3/5 p-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">The Journey So Far</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Taskdey was born out of a vision to transform how vocational work is accessed and delivered in Ghana. 
                    Founded in 2022 by Apprentice Lab, our platform addresses the challenges faced by both skilled workers 
                    and clients in finding reliable services.
                  </p>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    We recognized that Ghana has a wealth of talented vocational workers - carpenters, plumbers, electricians, 
                    tailors, and more - who often struggle to find consistent work and fair compensation. Meanwhile, clients 
                    face difficulties finding trusted professionals for their needs.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Through innovative technology and a commitment to quality, Taskdey bridges this gap, creating 
                    opportunities for workers while providing clients with reliable, vetted service providers at 
                    transparent prices.
                  </p>
                  
                  <div className="mt-8">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-indigo-600 h-2.5 rounded-full w-3/4"></div>
                      </div>
                      <span className="ml-4 text-gray-600 font-medium">3 Years</span>
                    </div>
                    <p className="text-gray-500 mt-2">Growing and expanding since 2022</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Approach Tab */}
            <div className={`${activeTab === 'approach' ? 'block' : 'hidden'}`}>
              <div className="p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Approach</h3>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-3">Rigorous Vetting</h4>
                      <p className="text-gray-600 leading-relaxed">
                        We carefully screen all workers joining our platform, verifying their skills, experience, and credentials
                        to ensure only qualified professionals are connected with clients.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-3">Efficient Matching</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Our smart matching system connects clients with the most suitable workers based on skills, location, 
                        availability, and ratings, saving time and ensuring quality fits.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110 4m0 0C8 16 6 14 6 12a6 6 0 1112 0c0 2-2 4-6 4" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-3">Transparent Pricing</h4>
                      <p className="text-gray-600 leading-relaxed">
                        We promote fair, transparent pricing for both workers and clients, with clear fee structures
                        and no hidden costs, ensuring value for all parties.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-3">Skills Development</h4>
                      <p className="text-gray-600 leading-relaxed">
                        We provide ongoing training opportunities and professional development resources to help
                        workers enhance their skills and grow their careers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Section with Hover Effects */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate innovators driving Taskdey&apos;s mission forward
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-lg transition duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl">
                  <div className="relative h-96">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent opacity-70"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-bold">{member.name}</h3>
                    <p className="text-indigo-200 mb-4">{member.role}</p>
                    <p className="text-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg transition duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl flex items-center justify-center min-h-96">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Join Our Team</h3>
                <p className="text-indigo-100 mb-6">We&apos;re always looking for talented individuals to join our mission</p>
                <a className="inline-block px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg transition duration-300 hover:bg-opacity-90">
                  View Openings
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Apprentice Lab Section with Gradient */}
      <div className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="md:flex items-center">
            <div className="md:w-1/2 md:pr-16 mb-10 md:mb-0">
              <div className="inline-block mb-4 px-4 py-1 bg-indigo-400 bg-opacity-30 rounded-full text-sm font-semibold">POWERED BY</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Apprentice Lab</h2>
              <div className="w-24 h-1 bg-indigo-300 mb-8"></div>
              <p className="text-indigo-100 mb-6 text-lg leading-relaxed">
                Taskdey is proud to be created and owned by Apprentice Lab, a leading technology innovation hub
                dedicated to developing solutions that address pressing social and economic challenges in Ghana.
              </p>
              <p className="text-indigo-100 mb-8 text-lg leading-relaxed">
                With deep expertise in digital platforms and a commitment to local economic development,
                Apprentice Lab has built Taskdey as a scalable solution to empower vocational workers and 
                improve service delivery across Ghana.
              </p>
              <a href='https://www.apprenticelabgh.com/' className="inline-flex items-center text-white font-semibold bg-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
                Learn more about Apprentice Lab
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-80 md:h-96 w-full rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition duration-300">
                <Image
                  src="/about/apprentice-lab.jpg"
                  alt="Apprentice Lab"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section with Accordion */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              // pages/about.js continued from previous part
              <details key={index} className="group bg-white rounded-xl shadow-md overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <h3 className="text-xl font-semibold text-gray-900">{item.question}</h3>
                  <span className="ml-6 flex-shrink-0 text-indigo-600 group-open:rotate-180 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  <div className="border-t border-gray-200 pt-4">
                    {item.answer}
                  </div>
                </div>
              </details>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <a className="inline-flex items-center text-indigo-600 font-semibold group">
              View all frequently asked questions
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
      
    </>
  );
}