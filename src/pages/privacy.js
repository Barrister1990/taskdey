// pages/privacy.js
import Head from 'next/head';
import { useState } from 'react';

export default function PrivacyPolicy() {
  const [expandedSections, setExpandedSections] = useState({});

  // Toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections({
      ...expandedSections,
      [sectionId]: !expandedSections[sectionId]
    });
  };

  // Privacy policy sections
  const sections = [
    {
      id: 'intro',
      title: 'Introduction',
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
      content: [
        'For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to name, profile picture, email, password, location, age, phone number, and wages. The information that we request will be retained by us and used as described in this privacy policy.',
        'The app does use third-party services that may collect information used to identify you.'
      ]
    },
    {
      id: 'thirdParty',
      title: 'Third-Party Services',
      content: [
        'Link to the privacy policy of third-party service providers used by the app:',
        '• Google Play Services'
      ]
    },
    {
      id: 'logData',
      title: 'Log Data',
      content: [
        'We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol ("IP") address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies',
      content: [
        'Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device\'s internal memory.',
        'This Service does not use these "cookies" explicitly. However, the app may use third-party code and libraries that use "cookies" to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.'
      ]
    },
    {
      id: 'serviceProviders',
      title: 'Service Providers',
      content: [
        'We may employ third-party companies and individuals due to the following reasons:',
        '• To facilitate our Service;\n• To provide the Service on our behalf;\n• To perform Service-related services; or\n• To assist us in analyzing how our Service is used.',
        'We want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.'
      ]
    },
    {
      id: 'security',
      title: 'Security',
      content: [
        'We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.'
      ]
    },
    {
      id: 'links',
      title: 'Links to Other Sites',
      content: [
        'This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.'
      ]
    },
    {
      id: 'childrenPrivacy',
      title: 'Children\'s Privacy',
      content: [
        'These Services do not address anyone under the age of 18. We do not knowingly collect personally identifiable information from children under 18 years of age. In the case we discover that a child under 18 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do the necessary actions.'
      ]
    },
    {
      id: 'changes',
      title: 'Changes to This Privacy Policy',
      content: [
        'We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.',
        'This policy is effective as of 2024-02-16'
      ]
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: [
        'If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at apprenticelabgh@gmail.com.'
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy | Taskdey</title>
        <meta name="description" content="Privacy policy for using the Taskdey service" />
      </Head>

      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Last updated: February 16, 2024</p>
          </div>
          
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button 
                  className="flex justify-between items-center w-full p-4 text-left"
                  onClick={() => toggleSection(section.id)}
                >
                  <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 text-indigo-600 transform ${expandedSections[section.id] ? 'rotate-180' : ''} transition-transform`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSections[section.id] && (
                  <div className="p-4 pt-0 border-t border-gray-100">
                    {section.content.map((paragraph, idx) => (
                      <p key={idx} className="text-gray-600 mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 text-gray-500 text-sm">
            © {new Date().getFullYear()} Apprentice Lab. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}