// components/Layout.js
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
           
              <a className="flex items-center">
                <div className="relative h-8 w-32">
                  <Image
                    src="/logo.png"
                    alt="Taskdey Logo"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </a>
       




            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600"
                onClick={toggleMobileMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="container mx-auto px-4 py-3 space-y-3">
         
                <a className="block text-gray-700 hover:text-indigo-600 font-medium">Home</a>
           
                <a className="block text-gray-700 hover:text-indigo-600 font-medium">Services</a>
     
                <a className="block text-gray-700 hover:text-indigo-600 font-medium">How It Works</a>
 
                <a className="block text-gray-700 hover:text-indigo-600 font-medium">About</a>
    
                <a className="block text-gray-700 hover:text-indigo-600 font-medium">Contact</a>
      
              <div className="pt-3 border-t border-gray-200 flex flex-col space-y-3">
     
                  <a className="text-indigo-600 hover:text-indigo-800 font-medium">Login</a>
              
                  <a className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300 text-center">
                    Sign Up
                  </a>
           
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

 
    </div>
  );
};

export default Layout;