"use client";

import { ChevronDown, Cookie, Eye, FileText, Globe, Mail, Settings, Shield } from 'lucide-react';
import { useState } from 'react';

interface CookieSection {
  id: string;
  title: string;
  content: string[];
  icon?: React.ComponentType<any>;
}

export default function CookiesPolicy() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections({
      ...expandedSections,
      [sectionId]: !expandedSections[sectionId]
    });
  };

  // Cookie policy sections with icons
  const sections: CookieSection[] = [
    {
      id: 'intro',
      title: 'What Are Cookies?',
      icon: Cookie,
      content: [
        'Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.',
        'At Taskdey, we use cookies to enhance your experience, analyze site usage, and provide personalized content. This policy explains what cookies we use and why.',
        'By continuing to use our website, you consent to our use of cookies in accordance with this policy.'
      ]
    },
    {
      id: 'types',
      title: 'Types of Cookies We Use',
      icon: Settings,
      content: [
        'Essential Cookies: These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.',
        'Analytics Cookies: We use these cookies to understand how visitors interact with our website by collecting and reporting information anonymously.',
        'Functional Cookies: These cookies allow the website to remember choices you make and provide enhanced, more personal features.',
        'Marketing Cookies: These cookies track your activity across websites to help advertisers deliver more relevant advertising.'
      ]
    },
    {
      id: 'specific',
      title: 'Specific Cookies We Use',
      icon: FileText,
      content: [
        'Google Analytics: We use Google Analytics to analyze website traffic and usage patterns. These cookies help us understand which pages are most popular and how users navigate our site.',
        'Session Cookies: These temporary cookies are deleted when you close your browser. They help maintain your session as you navigate through our website.',
        'Preference Cookies: These cookies remember your settings and preferences, such as language selection and display preferences.',
        'Security Cookies: These cookies help identify and prevent security risks, protecting both you and our website from malicious activity.'
      ]
    },
    {
      id: 'thirdParty',
      title: 'Third-Party Cookies',
      icon: Globe,
      content: [
        'Some cookies on our website are set by third-party services that appear on our pages. We use various third-party services to enhance functionality and analyze performance.',
        'Google Services: We use Google Analytics, Google Fonts, and other Google services that may set cookies on your device.',
        'Social Media: If you share content from our website on social media platforms, those platforms may set their own cookies.',
        'We do not control these third-party cookies and recommend reviewing the privacy policies of these services for more information about their cookie practices.'
      ]
    },
    {
      id: 'management',
      title: 'Managing Your Cookie Preferences',
      icon: Settings,
      content: [
        'You can control and manage cookies in several ways. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer.',
        'Browser Settings: You can change your browser settings to block or delete cookies. However, please note that disabling cookies may affect the functionality of our website.',
        'Cookie Preferences: We provide a cookie consent banner where you can choose which types of cookies to accept or decline.',
        'Opt-Out Tools: For analytics and marketing cookies, you can use opt-out tools provided by services like Google Analytics.'
      ]
    },
    {
      id: 'retention',
      title: 'Cookie Retention',
      icon: Eye,
      content: [
        'Different cookies have different lifespans. Session cookies are deleted when you close your browser, while persistent cookies remain on your device for a set period.',
        'Essential cookies typically remain active for the duration of your session or up to 1 year.',
        'Analytics cookies are usually retained for up to 2 years to help us understand long-term usage patterns.',
        'You can delete cookies at any time through your browser settings, and they will also be automatically deleted when they expire.'
      ]
    },
    {
      id: 'updates',
      title: 'Updates to This Policy',
      icon: FileText,
      content: [
        'We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.',
        'We will notify you of any significant changes by posting the updated policy on our website and updating the "last modified" date.',
        'We encourage you to review this policy periodically to stay informed about our use of cookies.',
        'This policy is effective as of February 16, 2024'
      ]
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: Mail,
      content: [
        'If you have any questions about our use of cookies or this Cookie Policy, please contact us at info@taskdey.com.',
        'We are committed to addressing your concerns and ensuring transparency in our data practices.'
      ]
    }
  ];

  const cookieStats = [
    {
      icon: Shield,
      value: 'Secure',
      label: 'Data Protection'
    },
    {
      icon: Settings,
      value: 'Control',
      label: 'Your Choice'
    },
    {
      icon: Eye,
      value: 'Transparent',
      label: 'Privacy First'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900/20 pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Cookie <span className="text-indigo-600 dark:text-indigo-400">Policy</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Learn about how we use cookies to enhance your experience on Taskdey and how you can control them.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: February 16, 2024
            </p>
            
            {/* Cookie Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12">
              {cookieStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-2 sm:mb-3">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Policy Content */}
      <div className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Introduction Card */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Understanding Cookies
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    We use cookies to improve your browsing experience, analyze site traffic, and personalize content. This policy explains what cookies we use, why we use them, and how you can control them.
                  </p>
                </div>
              </div>
            </div>

            {/* Cookie Policy Sections */}
            <div className="space-y-4">
              {sections.map((section) => {
                const IconComponent = section.icon || FileText;
                const isExpanded = expandedSections[section.id];
                
                return (
                  <div key={section.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <button 
                      className="flex items-center justify-between w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {section.title}
                        </h2>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 dark:text-gray-500 transform transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    {isExpanded && (
                      <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700">
                        <div className="pt-4 space-y-4">
                          {section.content.map((paragraph, idx) => (
                            <p key={idx} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sm:p-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Questions About Cookies?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  If you have any questions about our cookie practices or need help managing your preferences, we&apos;re here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:info@taskdey.com"
                    className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Email Us
                  </a>
                  <button
                    className="inline-flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Contact Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to get started with Taskdey?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Join thousands of teams already using Taskdey to boost their productivity.
          </p>
          <button className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200">
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  );
}