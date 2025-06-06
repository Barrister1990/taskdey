// pages/privacy.tsx
"use client";
import { ChevronDown, Eye, FileText, Lock, Mail, Shield, Users } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

interface PrivacySection {
  id: string;
  title: string;
  content: string[];
  icon?: React.ComponentType<any>;
}

export default function PrivacyPolicy() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections({
      ...expandedSections,
      [sectionId]: !expandedSections[sectionId]
    });
  };

  // Privacy policy sections with icons
  const sections: PrivacySection[] = [
    {
      id: 'intro',
      title: 'Introduction',
      icon: FileText,
      content: [
        'Apprentice Lab built the Taskdey app as a Free app. This SERVICE is provided by Apprentice Lab at no cost and is intended for use as is.',
        'This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.',
        'If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.',
        'The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at Taskdey unless otherwise defined in this Privacy Policy.'
      ]
    },
    {
      id: 'collection',
      title: 'Information Collection and Use',
      icon: Eye,
      content: [
        'For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to name, profile picture, email, password, location, age, phone number, and wages. The information that we request will be retained by us and used as described in this privacy policy.',
        'The app does use third-party services that may collect information used to identify you.'
      ]
    },
    {
      id: 'thirdParty',
      title: 'Third-Party Services',
      icon: Users,
      content: [
        'Link to the privacy policy of third-party service providers used by the app:',
        '• Google Play Services'
      ]
    },
    {
      id: 'logData',
      title: 'Log Data',
      icon: FileText,
      content: [
        'We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol ("IP") address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies',
      icon: Shield,
      content: [
        'Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device\'s internal memory.',
        'This Service does not use these "cookies" explicitly. However, the app may use third-party code and libraries that use "cookies" to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.'
      ]
    },
    {
      id: 'serviceProviders',
      title: 'Service Providers',
      icon: Users,
      content: [
        'We may employ third-party companies and individuals due to the following reasons:',
        '• To facilitate our Service;\n• To provide the Service on our behalf;\n• To perform Service-related services; or\n• To assist us in analyzing how our Service is used.',
        'We want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.'
      ]
    },
    {
      id: 'security',
      title: 'Security',
      icon: Lock,
      content: [
        'We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.'
      ]
    },
    {
      id: 'links',
      title: 'Links to Other Sites',
      icon: FileText,
      content: [
        'This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.'
      ]
    },
    {
      id: 'childrenPrivacy',
      title: 'Children\'s Privacy',
      icon: Shield,
      content: [
        'These Services do not address anyone under the age of 18. We do not knowingly collect personally identifiable information from children under 18 years of age. In the case we discover that a child under 18 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do the necessary actions.'
      ]
    },
    {
      id: 'changes',
      title: 'Changes to This Privacy Policy',
      icon: FileText,
      content: [
        'We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.',
        'This policy is effective as of 2024-02-16'
      ]
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: Mail,
      content: [
        'If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at info@taskdey.com.'
      ]
    }
  ];

  const privacyStats = [
    {
      icon: Shield,
      value: '100%',
      label: 'Data Protected'
    },
    {
      icon: Lock,
      value: '256-bit',
      label: 'Encryption'
    },
    {
      icon: Eye,
      value: 'Zero',
      label: 'Data Selling'
    }
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy | Taskdey</title>
        <meta name="description" content="Privacy policy for using the Taskdey service" />
      </Head>

      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900/20 pt-20 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Privacy <span className="text-indigo-600 dark:text-indigo-400">Policy</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
                Your privacy is important to us. Learn how we collect, use, and protect your information when you use Taskdey.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: February 16, 2024
              </p>
              
              {/* Privacy Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12">
                {privacyStats.map((stat, index) => {
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

        {/* Privacy Policy Content */}
        <div className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Introduction Card */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 sm:p-8 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Your Privacy Matters
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      At Taskdey, we are committed to protecting your personal information and being transparent about how we collect, use, and share your data. This policy explains our practices in clear, understandable terms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy Policy Sections */}
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
                    Have Questions About Privacy?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    If you have any questions or concerns about our privacy practices, we are here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="mailto:info@taskdey.com"
                      className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Email Us
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