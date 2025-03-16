// pages/about.js
import Head from 'next/head';
import Image from 'next/image';

export default function AboutPage() {
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
      bio: 'Lukman drives Taskdey\'s digital marketing strategies, helping connect vocational workers with clients across Ghana.'
    }
  ];

  return (
    <>
      <Head>
        <title>About Us | Taskdey</title>
        <meta name="description" content="Learn about Taskdey, connecting skilled workers with clients across Ghana" />
      </Head>
      
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Taskdey</h1>
            <p className="text-xl md:text-2xl text-indigo-100">
              Connecting skilled workers with clients across Ghana
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Mission */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600">
              To empower skilled workers and create efficient connections between service providers and clients through technology,
              contributing to economic growth and improved livelihoods across Ghana.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">Building a trusted community of skilled workers and satisfied clients.</p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Empowerment</h3>
              <p className="text-gray-600">Providing vocational workers with tools to grow their businesses and improve their livelihoods.</p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">Ensuring reliable, high-quality service delivery and customer satisfaction.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/founder.jpg"
                  alt="Taskdey founding team"
                   fill
    style={{ objectFit: 'cover' }}
                  
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <div className="w-24 h-1 bg-indigo-600 mb-6"></div>
              <p className="text-gray-600 mb-4">
                Taskdey was born out of a vision to transform how vocational work is accessed and delivered in Ghana. 
                Founded in 2022 by Apprentice Lab, our platform addresses the challenges faced by both skilled workers 
                and clients in finding reliable services.
              </p>
              <p className="text-gray-600 mb-4">
                We recognized that Ghana has a wealth of talented vocational workers - carpenters, plumbers, electricians, 
                tailors, and more - who often struggle to find consistent work and fair compensation. Meanwhile, clients 
                face difficulties finding trusted professionals for their needs.
              </p>
              <p className="text-gray-600">
                Through innovative technology and a commitment to quality, Taskdey bridges this gap, creating 
                opportunities for workers while providing clients with reliable, vetted service providers at 
                transparent prices.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Team */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600">
              Meet the passionate individuals driving Taskdey mission forward
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                     fill
    style={{ objectFit: 'cover' }}
                    
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-indigo-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Impact */}
      <div className="py-16 bg-indigo-700 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl text-indigo-100">
              How Taskdey is transforming the vocational work landscape in Ghana
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2,000+</div>
              <p className="text-indigo-100">Workers Empowered</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,500+</div>
              <p className="text-indigo-100">Jobs Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">8</div>
              <p className="text-indigo-100">Cities Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8/5</div>
              <p className="text-indigo-100">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Approach */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Approach</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600">
              How we are building a sustainable ecosystem for vocational work
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex">
              <div className="mr-4">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Rigorous Vetting</h3>
                <p className="text-gray-600">
                  We carefully screen all workers joining our platform, verifying their skills, experience, and credentials
                  to ensure only qualified professionals are connected with clients.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Efficient Matching</h3>
                <p className="text-gray-600">
                  Our smart matching system connects clients with the most suitable workers based on skills, location, 
                  availability, and ratings, saving time and ensuring quality fits.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110 4m0 0C8 16 6 14 6 12a6 6 0 1112 0c0 2-2 4-6 4" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
                <p className="text-gray-600">
                  We promote fair, transparent pricing for both workers and clients, with clear fee structures
                  and no hidden costs, ensuring value for all parties.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Skills Development</h3>
                <p className="text-gray-600">
                  We provide ongoing training opportunities and professional development resources to help
                  workers enhance their skills and grow their careers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Apprentice Lab Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="md:flex items-center">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Powered by Apprentice Lab</h2>
              <div className="w-24 h-1 bg-indigo-600 mb-6"></div>
              <p className="text-gray-600 mb-4">
                Taskdey is proud to be created and owned by Apprentice Lab, a leading technology innovation hub
                dedicated to developing solutions that address pressing social and economic challenges in Ghana.
              </p>
              <p className="text-gray-600 mb-4">
                With deep expertise in digital platforms and a commitment to local economic development,
                Apprentice Lab has built Taskdey as a scalable solution to empower vocational workers and 
                improve service delivery across Ghana.
              </p>
            
                <a className="inline-flex items-center text-indigo-600 font-semibold">
                  Learn more about Apprentice Lab
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
         
            </div>
            <div className="md:w-1/2">
              <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/about/apprentice-lab.jpg"
                  alt="Apprentice Lab"
                   fill
    style={{ objectFit: 'cover' }}
                  
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Join Us CTA */}
      <div className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Taskdey Community</h2>
          <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
            Whether you are a skilled worker looking to grow your business or a client seeking quality services,
            become part of the Taskdey community today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
       
              <a className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-indigo-50 transition duration-300">
                Register as a Worker
              </a>
            
          
              <a className="px-8 py-3 bg-indigo-800 text-white font-semibold rounded-lg shadow hover:bg-indigo-900 transition duration-300">
                Sign Up as a Client
              </a>
        
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How does Taskdey work?</h3>
              <p className="text-gray-600">
                Taskdey connects skilled vocational workers with clients who need their services. Clients post jobs or 
                search for workers, while workers create profiles showcasing their skills and experience. Our platform 
                handles the matching, scheduling, payment processing, and review system to ensure a smooth experience.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What services are available on Taskdey?</h3>
              <p className="text-gray-600">
                Taskdey offers a wide range of vocational services including plumbing, electrical work, carpentry, 
                painting, tailoring, hairdressing, auto repair, cleaning, catering, and more. We are constantly expanding 
                our service categories to meet the needs of our community.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How are workers vetted?</h3>
              <p className="text-gray-600">
                All workers undergo a thorough vetting process including skills assessment, credential verification, 
                background checks, and in-person interviews. We also maintain a rating system and regularly review worker 
                performance to ensure consistent quality.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Where is Taskdey available?</h3>
              <p className="text-gray-600">
                Taskdey currently operates in Accra,Hohoe, Kumasi, Takoradi, Tamale, Cape Coast, Ho, Koforidua, and Sunyani. 
                We are rapidly expanding to other cities across Ghana to reach more communities.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
       
              <a className="inline-flex items-center text-indigo-600 font-semibold">
                View all frequently asked questions
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
        
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions or feedback? We would love to hear from you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+233 24 940 783</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600">apprenticelabgh@gmail.com.com</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Office</h3>
              <p className="text-gray-600">Hohoe, Ghana</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
          
              <a className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition duration-300">
                Get in Touch
              </a>
          
          </div>
        </div>
      </div>
    </>
  );
}