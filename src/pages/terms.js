// pages/terms.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function TermsPage() {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const renderKeyPoint = (text) => {
    return (
      <div className="flex items-start space-x-2 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <p className="text-gray-600">{text}</p>
      </div>
    );
  };

  const renderSection = (id, title, items) => {
    const isExpanded = expandedSections[id] || false;
    
    return (
      <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden" key={id}>
        <button 
          className="flex justify-between items-center w-full p-4 text-left"
          onClick={() => toggleSection(id)}
        >
          <h3 className="text-lg font-semibold text-gray-800">{id}. {title}</h3>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 text-indigo-600 transform ${isExpanded ? 'rotate-180' : ''} transition-transform`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isExpanded && (
          <div className="p-4 pt-0 border-t border-gray-100">
            {items.map((item, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h4 className="text-md font-medium text-indigo-600 mb-1">{item.title}</h4>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>Terms & Conditions | Taskdey</title>
        <meta name="description" content="Terms and conditions for using the Taskdey service" />
      </Head>

      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
            <p className="text-lg text-gray-600">Last updated: February 16, 2024</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">Welcome to Taskdey</h2>
            <p className="text-gray-600 mb-6">
              These terms of service constitute a legally binding agreement between you and the 
              Apprentice lab services governing your use of the Taskdey mobile application.
            </p>
            
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-5 rounded-r">
              <p className="text-indigo-800 font-medium">
                By using the Taskdey app you accept that you have reviewed the privacy policy
                and agree to all our Terms and conditions.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Key Points to Note</h2>
            
            {renderKeyPoint('You must be at the legally working age in your country of residence.')}
            {renderKeyPoint('Service providers are independent contractors of Clients and not employees of Apprentice lab.')}
            {renderKeyPoint('Taskdey App does not supervise, direct, control and monitor service performed.')}
            {renderKeyPoint('Requesters are solely responsible for determining if the service provider is qualified.')}
            {renderKeyPoint('Taskdey provides no warranty and has no liability regarding User actions or service performance.')}
          </div>
          
          {renderSection('1', 'Taskdey Platforms Connect Clients and Service Providers', [
            { title: '1.1 Platform Connection', 
              content: 'Taskdey serves as a platform connecting service requesters ("clients") with service providers. Clients can access a network of service providers for cleaning services through the App.' },
            { title: '1.2 Facilitating Communication', 
              content: 'Taskdey facilitates communication between clients and service providers to arrange and fulfill cleaning service requests.' }
          ])}
          
          {renderSection('2', 'Use of Taskdey Platform', [
            { title: '2.1 Compliance', 
              content: 'Users must comply with all applicable laws and regulations when using Taskdey.' },
            { title: '2.2 Modifications', 
              content: 'Taskdey reserves the right to modify or discontinue the App or any feature at any time without notice.' },
            { title: '2.3 Account Confidentiality', 
              content: 'Users are responsible for maintaining the confidentiality of their account information and passwords.' }
          ])}
          
          {renderSection('3', 'Deactivation and Suspension', [
            { title: '3.1 Right to Deactivate', 
              content: 'Taskdey reserves the right to deactivate or suspend user accounts for any violation of these Terms and Conditions or for any conduct detrimental to the community.' },
            { title: '3.2 Notification', 
              content: 'Users will be notified of any deactivation or suspension, and the reasons will be provided.' }
          ])}
          
          {renderSection('4', 'Taskdey Platform Registration', [
            { title: '4.1 Accuracy of Information', 
              content: 'Users must provide accurate and complete information during registration.' },
            { title: '4.2 Information Updates', 
              content: 'Users must promptly update their information to ensure it remains accurate.' }
          ])}
          
          {renderSection('5', 'Taskdey as an Online Marketplace', [
            { title: '5.1 Marketplace Functionality', 
              content: 'Taskdey acts as an online marketplace connecting clients and service providers, and does not provide cleaning services directly.' },
            { title: '5.2 Service Quality', 
              content: 'Taskdey is not responsible for the quality, safety, or legality of the services provided by service providers.' }
          ])}
          
          {renderSection('6', 'Intellectual Property Rights', [
            { title: '6.1 Ownership', 
              content: 'All intellectual property rights related to the App are owned by Apprentice lab.' },
            { title: '6.2 Usage Restrictions', 
              content: 'Users may not use, reproduce, or distribute any content from the App without explicit permission.' }
          ])}
          
          {renderSection('7', 'Licensing', [
            { title: '7.1 Limited License', 
              content: 'Taskdey grants users a limited, non-exclusive, revocable license to use the App in accordance with these Terms and Conditions.' },
            { title: '7.2 Usage Restrictions', 
                content: 'Users may not sublicense, sell, or resell any part of the App or access to the App.' }
            ])}
            
            {renderSection('8', 'Free to Use', [
              { title: '8.1 Free Access', 
                content: 'Taskdey is free to use for both clients and service providers.' }
            ])}
            
            {renderSection('8A', 'Refund Policy', [
              { title: '8A.1 No Refunds', 
                content: 'Taskdey does not provide refunds for services booked through the App. All payment transactions are final.' },
              { title: '8A.2 Dispute Resolution', 
                content: 'Users acknowledge that Taskdey bears no responsibility for disputes or issues arising from transactions between clients and service providers.' }
            ])}
            
            {renderSection('9', 'Limitation of Liability', [
              { title: '9.1 Indirect Damages', 
                content: 'Taskdey shall not be liable for any indirect, incidental, special, consequential, or punitive damages.' },
              { title: '9.2 Warranty Disclaimer', 
                content: 'Users acknowledge that the App is provided on an "as-is" and "as available" basis, without any warranties.' }
            ])}
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-700 mb-1">For questions or concerns, please contact:</p>
              <Link href="mailto:apprenticelabgh@gmail.com" className="text-indigo-600 font-medium">apprenticelabgh@gmail.com</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }