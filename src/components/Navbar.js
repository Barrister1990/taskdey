import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg py-2' 
          : 'bg-white/80 backdrop-blur-sm py-5'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
  <div className="relative h-9 w-36 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110">
    <Image
      src="/logo.png"
      alt="Taskdey Logo"
      fill
      sizes="(max-width: 768px) 144px, 144px"
      style={{ objectFit: "contain" }}
      priority
    />
  </div>
  <span className="ml-2 text-xl font-bold text-gray-800 transition-all duration-300 group-hover:text-blue-600">
    Taskdey
  </span>
</Link>


            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              <NavLink href="/#">Home</NavLink>
              <NavLink href="/#services">Services</NavLink>
              <NavLink href="/#how-it-works">How It Works</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/#contact">Contact</NavLink>
            </nav>



            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute h-0.5 rounded-full bg-current transform transition-all duration-300 ${
                    mobileMenuOpen ? 'w-6 rotate-45 top-3' : 'w-6 top-1.5'
                  }`}></span>
                  <span className={`absolute h-0.5 w-6 bg-current rounded-full top-3 transition-opacity duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`absolute h-0.5 rounded-full bg-current transform transition-all duration-300 ${
                    mobileMenuOpen ? 'w-6 -rotate-45 top-3' : 'w-6 top-4.5'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute w-full bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-xl transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="container mx-auto px-6 py-5 space-y-5">
            <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="/#services" onClick={() => setMobileMenuOpen(false)}>Services</MobileNavLink>
            <MobileNavLink href="/#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setMobileMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink href="/#contact" onClick={() => setMobileMenuOpen(false)}>Contact</MobileNavLink>
      
          </div>
        </div>
      </header>
      
      {/* Spacer to prevent content overlap */}
      <div className="h-24"></div>
    </>
  );
};

// Desktop Nav Link with hover effect
const NavLink = ({ href, children }) => {
  return (
    <Link 
      href={href} 
      className="relative text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300 group text-sm tracking-wide"
    >
      {children}
      <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-300 ease-out group-hover:w-full"></span>
    </Link>
  );
};

// Mobile Nav Link with slide effect
const MobileNavLink = ({ href, onClick, children }) => {
  return (
    <Link 
      href={href} 
      className="block text-gray-700 hover:text-indigo-600 hover:translate-x-1 font-medium transition-all duration-300"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;