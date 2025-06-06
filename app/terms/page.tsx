// pages/terms.tsx
"use client";
import { AlertTriangle, CheckCircle, ChevronDown, FileText, Gavel, Mail, Scale, Shield, Users } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

interface TermsSection {
  id: string;
  title: string;
  items: TermsItem[];
  icon?: React.ComponentType<any>;
}

interface TermsItem {
  title: string;
  content: string;
}

export default function TermsPage() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const renderKeyPoint = (text: string, index: number) => {
    return (
      <div key={index} className="flex items-start space-x-3 mb-4">
        <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <CheckCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </div>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{text}</p>
      </div>
    );
  };

  const termsSections: TermsSection[] = [
    {
      id: '1',
      title: 'Taskdey Platforms Connect Clients and Service Providers',
      icon: Users,
      items: [
        { 
          title: '1.1 Platform Connection', 
          content: 'Taskdey serves as a platform connecting service requesters ("clients") with service providers. Clients can access a network of service providers for cleaning services through the App.' 
        },
        { 
          title: '1.2 Facilitating Communication', 
          content: 'Taskdey facilitates communication between clients and service providers to arrange and fulfill cleaning service requests.' 
        }
      ]
    },
    {
      id: '2',
      title: 'Use of Taskdey Platform',
      icon: Shield,
      items: [
        { 
          title: '2.1 Compliance', 
          content: 'Users must comply with all applicable laws and regulations when using Taskdey.' 
        },
        { 
          title: '2.2 Modifications', 
          content: 'Taskdey reserves the right to modify or discontinue the App or any feature at any time without notice.' 
        },
        { 
          title: '2.3 Account Confidentiality', 
          content: 'Users are responsible for maintaining the confidentiality of their account information and passwords.' 
        }
      ]
    },
    {
      id: '3',
      title: 'Deactivation and Suspension',
      icon: AlertTriangle,
      items: [
        { 
          title: '3.1 Right to Deactivate', 
          content: 'Taskdey reserves the right to deactivate or suspend user accounts for any violation of these Terms and Conditions or for any conduct detrimental to the community.' 
        },
        { 
          title: '3.2 Notification', 
          content: 'Users will be notified of any deactivation or suspension, and the reasons will be provided.' 
        }
      ]
    },
    {
      id: '4',
      title: 'Taskdey Platform Registration',
      icon: FileText,
      items: [
        { 
          title: '4.1 Accuracy of Information', 
          content: 'Users must provide accurate and complete information during registration.' 
        },
        { 
          title: '4.2 Information Updates', 
          content: 'Users must promptly update their information to ensure it remains accurate.' 
        }
      ]
    },
    {
      id: '5',
      title: 'Taskdey as an Online Marketplace',
      icon: Scale,
      items: [
        { 
          title: '5.1 Marketplace Functionality', 
          content: 'Taskdey acts as an online marketplace connecting clients and service providers, and does not provide cleaning services directly.' 
        },
        { 
          title: '5.2 Service Quality', 
          content: 'Taskdey is not responsible for the quality, safety, or legality of the services provided by service providers.' 
        }
      ]
    },
    {
      id: '6',
      title: 'Intellectual Property Rights',
      icon: Shield,
      items: [
        { 
          title: '6.1 Ownership', 
          content: 'All intellectual property rights related to the App are owned by Apprentice lab.' 
        },
        { 
          title: '6.2 Usage Restrictions', 
          content: 'Users may not use, reproduce, or distribute any content from the App without explicit permission.' 
        }
      ]
    },
    {
      id: '7',
      title: 'Licensing',
      icon: Gavel,
      items: [
        { 
          title: '7.1 Limited License', 
          content: 'Taskdey grants users a limited, non-exclusive, revocable license to use the App in accordance with these Terms and Conditions.' 
        },
        { 
          title: '7.2 Usage Restrictions', 
          content: 'Users may not sublicense, sell, or resell any part of the App or access to the App.' 
        }
      ]
    },
    {
      id: '8',
      title: 'Free to Use',
      icon: CheckCircle,
      items: [
        { 
          title: '8.1 Free Access', 
          content: 'Taskdey is free to use for both clients and service providers.' 
        }
      ]
    },
    {
      id: '8A',
      title: 'Refund Policy',
      icon: AlertTriangle,
      items: [
        { 
          title: '8A.1 No Refunds', 
          content: 'Taskdey does not provide refunds for services booked through the App. All payment transactions are final.' 
        },
        { 
          title: '8A.2 Dispute Resolution', 
          content: 'Users acknowledge that Taskdey bears no responsibility for disputes or issues arising from transactions between clients and service providers.' 
        }
      ]
    },
    {
      id: '9',
      title: 'Limitation of Liability',
      icon: Shield,
      items: [
        { 
          title: '9.1 Indirect Damages', 
          content: 'Taskdey shall not be liable for any indirect, incidental, special, consequential, or punitive damages.' 
        },
        { 
          title: '9.2 Warranty Disclaimer', 
          content: 'Users acknowledge that the App is provided on an "as-is" and "as available" basis, without any warranties.' 
        }
      ]
    }
  ];

  const keyPoints = [
    'You must be at the legally working age in your country of residence.',
    'Service providers are independent contractors of Clients and not employees of Apprentice lab.',
    'Taskdey App does not supervise, direct, control and monitor service performed.',
    'Requesters are solely responsible for determining if the service provider is qualified.',
    'Taskdey provides no warranty and has no liability regarding User actions or service performance.'
  ];

  const termsStats = [
    {
      icon: Users,
      value: '100%',
      label: 'User Protection'
    },
    {
      icon: Scale,
      value: 'Fair',
      label: 'Terms'
    },
    {
      icon: Shield,
      value: 'Legal',
      label: 'Compliance'
    }
  ];

  return (
    <>
      <Head>
        <title>Terms & Conditions | Taskdey</title>
        <meta name="description" content="Terms and conditions for using the Taskdey service" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900/20 pt-20 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Terms & <span className="text-indigo-600 dark:text-indigo-400">Conditions</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
                Please read these terms carefully before using Taskdey. By using our service, you agree to be bound by these terms and conditions.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: February 16, 2024
              </p>
              
              {/* Terms Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12">
                {termsStats.map((stat, index) => {
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

        {/* Terms Content */}
        <div className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Welcome Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gavel className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Welcome to Taskdey
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      These terms of service constitute a legally binding agreement between you and the 
                      Apprentice lab services governing your use of the Taskdey mobile application.
                    </p>
                    
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600 dark:border-indigo-400 p-4 rounded-r-lg">
                      <p className="text-indigo-800 dark:text-indigo-200 font-medium">
                        By using the Taskdey app you accept that you have reviewed the privacy policy
                        and agree to all our Terms and conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Key Points Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Key Points to Note
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {keyPoints.map((point, index) => renderKeyPoint(point, index))}
                </div>
              </div>

              {/* Terms Sections */}
              <div className="space-y-4">
                {termsSections.map((section) => {
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
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {section.id}. {section.title}
                          </h3>
                        </div>
                        <ChevronDown 
                          className={`w-5 h-5 text-gray-400 dark:text-gray-500 transform transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      {isExpanded && (
                        <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700">
                          <div className="pt-4 space-y-6">
                            {section.items.map((item, index) => (
                              <div key={index}>
                                <h4 className="text-md font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                                  {item.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                  {item.content}
                                </p>
                              </div>
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
                    Questions About Our Terms?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    If you have any questions or concerns about our terms and conditions, please don't hesitate to reach out.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="mailto:info@taskdey.com"
                      className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      info@taskdey.com
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      Contact Page
                    </Link>
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
            <Link
              href="/download"
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}