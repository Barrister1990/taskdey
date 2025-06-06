import { NAV_LINKS } from "@/lib/constants";
import {
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone
} from "lucide-react";
import Link from "next/link";



export default function Footer() {
  const currentYear = new Date().getFullYear();

const TikTokIcon = ({ className = 'w-5 h-5' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="none"
    stroke="currentColor"
    strokeWidth="16"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M168 32c0 26.51 21.49 48 48 48v40a88 88 0 1 1-88-88v48a40 40 0 1 0 40 40V32" />
  </svg>
);
  return (
    <footer className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-6 md:py-16">
        {/* Mobile Layout - Very Compact */}
        <div className="block md:hidden">
          {/* Company Name */}
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 dark:from-indigo-400 to-purple-600 dark:to-purple-400 bg-clip-text text-transparent">
              Taskdey
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Ghana's premier service platform
            </p>
          </div>

          {/* Compact Links Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mb-4">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact - Single Line */}
          <div className="text-center mb-4">
            <a 
              href="mailto:info@taskdey.com"
              className="text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              info@taskdey.com
            </a>
          </div>

          {/* Social Icons - Smaller */}
          <div className="flex justify-center space-x-3 mb-4">
            <a
              href="https://www.facebook.com/share/16Lta84UPv/?mibextid=wwXIfr"
              className="w-7 h-7 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-3 h-3 text-slate-600 dark:text-slate-300" />
            </a>
            <a
              href="https://www.tiktok.com/@taskdey?_t=ZM-8vuk9ldkHR9&_r=1"
              className="w-7 h-7 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all duration-200"
              aria-label="Tick Tock"
            >
              <TikTokIcon className="w-3 h-3 text-slate-600 dark:text-slate-300" />
            </a>
            <a
              href="https://www.instagram.com/taskdey/profilecard/?igsh=aG5sMHE1MmZ5dXc4"
              className="w-7 h-7 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-3 h-3 text-slate-600 dark:text-slate-300" />
            </a>
            <a
              href="https://www.linkedin.com/showcase/joymish/?viewAsMember=true"
              className="w-7 h-7 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3 h-3 text-slate-600 dark:text-slate-300" />
            </a>
          </div>

          {/* Legal Links - Horizontal */}
          <div className="flex justify-center space-x-4 text-xs mb-3">
            <Link
              href="/privacy"
              className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Terms
            </Link>
            
          </div>

          {/* Copyright */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            &copy; {currentYear} Taskdey
          </p>
        </div>

        {/* Desktop Layout - Full Version */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 dark:from-indigo-400 to-purple-600 dark:to-purple-400 bg-clip-text text-transparent">
                  Taskdey
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
                  Ghana's premier platform connecting skilled professionals with clients. 
                  Building trust through quality service delivery.
                </p>
              </div>
              
              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/share/16Lta84UPv/?mibextid=wwXIfr"
                    className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all duration-300 group"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-white" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@taskdey?_t=ZM-8vuk9ldkHR9&_r=1"
                    className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all duration-300 group"
                    aria-label="Twitter"
                  >
                    <TikTokIcon className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-white" />
                  </a>
                  <a
                    href="https://www.instagram.com/taskdey/profilecard/?igsh=aG5sMHE1MmZ5dXc4"
                    className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all duration-300 group"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-white" />
                  </a>
                  <a
                    href="https://www.linkedin.com/showcase/joymish/?viewAsMember=true"
                    className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all duration-300 group"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="font-semibold text-lg text-slate-900 dark:text-white">Quick Links</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="font-semibold text-lg text-slate-900 dark:text-white">Get In Touch</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                  <a 
                    href="mailto:info@taskdey.com"
                    className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                  >
                    info@taskdey.com
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                  <a 
                    href="tel:+233123456789"
                    className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                  >
                    +233 241 940 783
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">
                    Accra, Ghana
                  </span>
                </li>
              </ul>
            </div>

            {/* Legal & Developer */}
            <div className="space-y-6">
              <h4 className="font-semibold text-lg text-slate-900 dark:text-white">Legal & Support</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  
                </li>
              </ul>

              {/* Developer Credit */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Developed by</p>
                <a
                  href="https://charlesawuku.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 group"
                >
                  <span className="font-medium">Charles Awuku</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                &copy; {currentYear} Taskdey. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                >
                  Terms
                </Link>
                <Link
                  href="/cookies"
                  className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}