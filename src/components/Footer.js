import Link from 'next/link';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    setEmail('');
    // You could add a toast notification here
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Top Section with Curved Shape */}
    
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Taskdey</h3>
              <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2"></div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Connecting skilled workers with clients across Ghana. Empowering vocational work through technology.
            </p>
            <div className="flex space-x-5">
              <SocialIcon href="https://www.facebook.com/share/16Lta84UPv/?mibextid=wwXIfr" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/showcase/joymish/?viewAsMember=true" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.youtube.com/channel/UCa-m7eGM6LF2GzatXb_MCww" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.tiktok.com/@taskdey?_t=ZM-8vuk9ldkHR9&_r=1" aria-label="TikTok">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.412 2c2.03 0 3.677 1.648 3.677 3.678v.064c.41.058.819.147 1.223.267a5.055 5.055 0 0 0 2.68-2.68 7.948 7.948 0 0 1-3.695 3.695v8.642c0 3.627-2.937 6.564-6.563 6.564S3.17 20.293 3.17 16.666c0-3.627 2.937-6.563 6.564-6.563.172 0 .344.007.514.02v3.665c-.17-.016-.341-.024-.514-.024a2.899 2.899 0 0 0-2.899 2.9 2.899 2.899 0 0 0 2.899 2.899 2.9 2.9 0 0 0 2.899-2.899V2h2.68v2h-2.68V2z"/>
  </svg>
</SocialIcon>

              <SocialIcon href="https://www.instagram.com/taskdey/profilecard/?igsh=aG5sMHE1MmZ5dXc4" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </SocialIcon>
            </div>
          </div>
          
          {/* Company Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gray-100">Company</h4>
            <ul className="space-y-4">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </ul>
          </div>
          
          {/* Resources Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gray-100">Resources</h4>
            <ul className="space-y-4">
              <FooterLink href="/help-center">Help Center</FooterLink>
              <FooterLink href="/partners">Partner Program</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gray-100">Stay Connected</h4>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Get the latest updates, features and news delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="w-full bg-gray-800/50 backdrop-blur-sm text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition duration-300 border border-gray-700"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium px-4 py-3 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800/60 mt-2 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Taskdey. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-4 md:mt-0 justify-center">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition duration-300 text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition duration-300 text-sm">
              Terms of Service
            </Link>
            <a href="https://www.charlesawuku.com/" className="text-gray-400 hover:text-white transition duration-300 text-sm">
              Contact Developer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Reusable Footer Link Component
const FooterLink = ({ href, children }) => {
  return (
    <li>
      <Link 
        href={href} 
        className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
      >
        {children}
      </Link>
    </li>
  );
};

// Reusable Social Icon Component
const SocialIcon = ({ href, children, ...props }) => {
  return (
    <a 
      href={href} 
      className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 bg-gray-800/70 p-2.5 rounded-full flex items-center justify-center"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
};

export default Footer;