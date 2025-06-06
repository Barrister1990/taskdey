// Navigation
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/download', label: 'Download' },
  { href: '/contact', label: 'Contact' },
];

// Stats
export const STATS = [
  { value: '500+', label: 'Verified Workers' },
  { value: '1,000+', label: 'Happy Clients' },
  { value: '270+', label: 'Jobs Completed' },
  { value: '4.9/5', label: 'Average Rating' },
];

// Services
export const SERVICES = [
  { 
    name: 'Electrician',
    demand: 'high',
    description: 'Professional electrical installations, repairs, and maintenance',
    averageRate: '₵50/hr'
  },
  { 
    name: 'Plumber',
    demand: 'high',
    description: 'Expert plumbing services for homes and businesses',
    averageRate: '₵45/hr'
  },
  { 
    name: 'Tailor',
    demand: 'medium',
    description: 'Custom clothing alterations and designs',
    averageRate: '₵40/hr'
  },
  { 
    name: 'Mason',
    demand: 'high',
    description: 'Quality construction and building services',
    averageRate: '₵55/hr'
  },
  { 
    name: 'Mechanic',
    demand: 'medium',
    description: 'Vehicle repair and maintenance services',
    averageRate: '₵45/hr'
  },
  { 
    name: 'Cleaner',
    demand: 'high',
    description: 'Professional home and office cleaning',
    averageRate: '₵35/hr'
  },
  { 
    name: 'Carpenter',
    demand: 'medium',
    description: 'Custom furniture and woodwork services',
    averageRate: '₵50/hr'
  },
  { 
    name: 'Painter',
    demand: 'medium',
    description: 'Interior and exterior painting services',
    averageRate: '₵40/hr'
  },
];

// Features
export const FEATURES = [
  {
    title: 'Smart Job Matching',
    description: 'Our AI-powered system matches you with skilled workers based on your specific needs, location, and schedule.',
  },
  {
    title: 'Secure Payments',
    description: 'Pay securely through our platform with multiple payment options including Mobile Money and card payments.',
  },
  {
    title: 'Reviews & Ratings',
    description: 'Make informed decisions with verified reviews and detailed ratings from previous clients.',
  },
  {
    title: 'Live Chat',
    description: 'Communicate directly with workers through our secure in-app chat system to discuss job details.',
  },
  {
    title: 'Verified Workers',
    description: 'All workers undergo thorough background checks and skill verification before joining our platform.',
  },
  {
    title: 'Schedule Flexibility',
    description: 'Book services at your convenience with our 24/7 booking system and get instant confirmations.',
  },
  {
    title: 'Price Transparency',
    description: 'View upfront pricing and get detailed quotes before booking any service.',
  },
  {
    title: 'Service Guarantee',
    description: 'Every job is backed by our satisfaction guarantee for your peace of mind.',
  },
];

// Benefits for Workers
export const WORKER_BENEFITS = [
  {
    title: 'Flexible Hours',
    description: 'Choose your own working hours and maintain work-life balance',
  },
  {
    title: 'Steady Income',
    description: 'Access a steady stream of job opportunities and earn more',
  },
  {
    title: 'Zero Commission',
    description: 'Keep 100% of your earnings - we don\'t charge any commission',
  },
  {
    title: 'Professional Growth',
    description: 'Access training resources and improve your skills',
  },
];

// Team
export const TEAM = [
  {
    name: 'Charles Awuku',
    role: 'CEO & Founder',
    image: '/images/charles-awuku.jpg',
    bio: "Charles is a visionary entrepreneur and full-stack developer with over a decade of experience in technology and service innovation. As CEO and Founder, he combines hands-on technical expertise with strategic leadership to drive the platform's growth. Passionate about solving real-world problems, Charles is dedicated to creating economic opportunities for skilled workers across Ghana.",
  },
  {
    name: 'Lukman Sulemana',
    role: 'CTO & Head of Operations',
    image: '/images/lukman-suleman.jpg',
    bio: 'With a strong background in operations and technology leadership, Lukman drives the strategic execution of our platform across Ghana. As CTO and Head of Operations, he ensures service excellence, team efficiency, and scalable growth. His passion for innovation and operational impact is central to our mission of empowering workers and connecting communities.',
  },
];

// Testimonials
export const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Homeowner',
    content: 'Taskdey has transformed how I find reliable workers. The plumber I hired was professional, punctual, and did an excellent job!',
    image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg',
    rating: 5,
  },
  {
    name: 'Michael Addo',
    role: 'Electrician',
    content: 'Since joining Taskdey, my business has grown significantly. The platform makes it easy to find clients and manage bookings.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    rating: 5,
  },
  {
    name: 'Grace Mensah',
    role: 'Business Owner',
    content: 'The quality of service providers on Taskdey is exceptional. I use it regularly for my office maintenance needs.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    rating: 5,
  },
];

// How It Works Steps
export const HOW_IT_WORKS = {
  clients: [
    {
      title: 'Download & Register',
      description: 'Get the Taskdey app from Play Store and create your account in minutes.',
    },
    {
      title: 'Book a Service',
      description: 'Browse verified workers, check reviews, and book with instant confirmation.',
    },
    {
      title: 'Track & Pay',
      description: 'Track worker arrival, approve completion, and pay securely through the app.',
    },
  ],
  workers: [
    {
      title: 'Sign Up as Worker',
      description: 'Complete your profile and verify your skills to start receiving jobs.',
    },
    {
      title: 'Accept Bookings',
      description: 'Receive job requests and accept those that match your schedule.',
    },
    {
      title: 'Complete & Earn',
      description: 'Provide quality service and receive secure payments directly to your account.',
    },
  ],
};

// FAQ Categories
export const FAQ_CATEGORIES = {
  clients: [
    {
      question: 'How do I book a service?',
      answer: 'Simply download the Taskdey app, browse available workers, and book instantly with our easy-to-use interface.',
    },
    {
      question: 'Are the workers verified?',
      answer: 'Yes, all workers undergo thorough background checks and skill verification before joining our platform.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept Mobile Money (MTN, Vodafone, AirtelTigo) and major credit/debit cards.',
    },
  ],
  workers: [
    {
      question: 'How do I join as a worker?',
      answer: 'Download the app, complete your profile, verify your skills, and start receiving job requests.',
    },
    {
      question: 'How much can I earn?',
      answer: 'Earnings vary by skill and experience. Many workers earn ₵2000-5000 monthly working flexible hours.',
    },
    {
      question: 'When do I get paid?',
      answer: 'Payments are processed immediately after job completion and transferred to your account within 24 hours.',
    },
  ],
};