//feature section imports
import features1 from '../public/assets/featureSection/feature1.png'
import features2 from '../public/assets/featureSection/feature2.png'
import features3 from '../public/assets/featureSection/feature3.png'
import features4 from '../public/assets/featureSection/feature4.png'
import features5 from '../public/assets/featureSection/feature5.png'
import features6 from '../public/assets/featureSection/feature6.png'

//destination section
import destination1 from '../public/assets/destinationSection/kashmir.jpg'
import destination2 from '../public/assets/destinationSection/jaipur.jpg'
import destination3 from '../public/assets/destinationSection/delhi.jpg'
import destination4 from '../public/assets/destinationSection/mumbai.jpg'
import destination5 from '../public/assets/destinationSection/banaras.jpg'
import destination6 from '../public/assets/destinationSection/kolkata.jpg'
import destination7 from '../public/assets/destinationSection/manali.jpg'
import destination8 from '../public/assets/destinationSection/hyderabad.jpg'

//last section home
import last1 from '../public/assets/exploreSection/last1.jpg'
import last2 from '../public/assets/exploreSection/last2.jpg'
import last3 from '../public/assets/exploreSection/last3.jpg'

//Gallery data
import road from '../public/assets/exploreSection/road.jpg'
import beach from '../public/assets/exploreSection/beach.jpg'
import trek from '../public/assets/exploreSection/trek.jpg'
import food from '../public/assets/exploreSection/food.jpg'
import history from '../public/assets/exploreSection/history.jpg'
import city from '../public/assets/exploreSection/city.jpg'

export const navbarData = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about-us" },
  { title: "Contact", path: "/contact-us" },
  { title: "Blogs", path: "/blogs" },
  { title: "Create Trip", path: "/create-trip" },

  {
    title: "Others",
    dropdown: [
      { title: "FAQ", path: "/faq" },
      { title: "Term & Condition", path: "/term-condition" },
      { title: "Privacy Policy", path: "/privacy-policy" },
      { title: "Help Center", path: "/help-center" },
    ],
  },
];

export const featureData = [
    {
        title: "Add places from guides with 1 click",
        description: "We crawled the web so you don’t have to. Easily save mentioned places.",
        imageUrl: features1,
    },
    {
        title: "Checklists for anything",
        description: "Stay organized with a packing list, to-do list, shopping list, any kind of list.",
        imageUrl: features2,
    },
    {
        title: "Get personalized suggestions",
        description: "Find the best places to visit with smart recommendations based on your itinerary.",
        imageUrl: features3,
    },
    {
        title: "Offline access",
        description: "No wifi, no problem. Your trip plans are locally downloaded for access anywhere.",
        imageUrl: features4,
    },
    {
        title: "Unlimited attachments",
        description: "Never dig through your emails again — access all your trip files and PDFs in one place.",
        imageUrl: features5,
    },
    {
        title: "Optimize your route",
        description: "Perfect for road trips and saving money on gas! Get the best route auto-rearranged.",
        imageUrl: features6,
    },
]

export const destinationData = [
    {
        id:1,
        imageUrl: destination1,
        title:'Srinagar,Kashmir'
    },
    {
        id:2,
        imageUrl: destination2,
        title:'Jaipur,Rajasthan'
    },
    {
        id:3,
        imageUrl: destination3,
        title:'Delhi,India'
    },
    {
        id:4,
        imageUrl: destination4,
        title:'Mumbai,Maharashtra'
    },
    {
        id:5,
        imageUrl: destination5,
        title:'Banaras, Uttar Pradesh'
    },
    {
        id:6,
        imageUrl: destination6,
        title:'Kolkata, West Bengal'
    },
    {
        id:7,
        imageUrl: destination7,
        title:'Manali, Himachal Pradesh'
    },
    {
        id:8,
        imageUrl: destination8,
        title:'Hyderabad, Telangana'
    },
]

export const exploreData = [
    {
        title: "The best road trip planner",
        description: "Use Ashventure as a route map showing directions, distances, and driving times between different attractions you might want to visit.",
        imageUrl: last1,
    },
    {
        title: "The best vacation planner",
        description: "Use Ashventure to map your journey to figure out the best routes, keep track of hotel and flight bookings and reservations, and read guides from other trip planning websites.",
        imageUrl: last2,
    },
    {
        title: "The best group itinerary planner",
        description: "Use Ashventure to share your itinerary with tripmates, friends, and families and collaborate in real time, so everyone stays in the loop.",
        imageUrl: last3,
    },
]

export const aboutHeroData = [
    {
        id:1,
        image: destination1,
        title:'Srinagar,Kashmir'
    },
    {
        id:2,
        image: destination2,
        title:'Jaipur,Rajasthan'
    },
    {
        id:3,
        image: destination3,
        title:'Delhi,India'
    },
    {
        id:4,
        image: destination4,
        title:'Mumbai,Maharashtra'
    },
    {
        id:5,
        image: destination5,
        title:'Banaras, Uttar Pradesh'
    },
    {
        id:6,
        image: destination6,
        title:'Kolkata, West Bengal'
    },
    {
        id:7,
        image: destination7,
        title:'Manali, Himachal Pradesh'
    },
    {
        id:8,
        image: destination8,
        title:'Hyderabad, Telangana'
    },
]

export const missionData = [
    {
        title:'Authenticity',
        description:'We value genuine experiences, helping users discover destinations beyond the usual tourist spots for a deeper connection to local cultures.',
    },
    {
        title:'User-Centric Design',
        description:'We prioritize user experience by creating a platform that’s intuitive, accessible, and tailored to each traveler’s unique needs.',
    },
    {
        title:'Innovation',
        description:'We continually explore new technologies to simplify travel planning, making it engaging, flexible, and adaptable to future travel trends.',
    },
    {
        title:'Empowerment',
        description:'We empower travelers with tools to plan confidently, make informed choices, and customize journeys that align with their personal interests.',
    },
    {
        title:'Sustainability',
        description:'We support eco-friendly travel by promoting sustainable destinations and practices that respect the planet and local communities.',
    },
    {
        title:'Exploration',
        description:'Fostering a sense of wonder and inspiring curiosity, our mission is to ignite a passion for discovering, exploring, and embracing new destinations worldwide.',
    }
]

export const whyUsData = [
  {
    id: 1,
    iconName: "ShieldCheck",
    title: "Ultimate flexibility",
    description:
      "You're in control with flexible bookings, free cancellations, and secure payment options designed to fit every type of travel plan or budget."
  },
  {
    id: 2,
    iconName: "Sparkles",
    title: "Memorable experiences",
    description:
      "Browse and book tours and activities that are carefully curated to deliver unforgettable moments you'll cherish long after your trip.",
  },
  {
    id: 3,
    iconName: "Gem",
    title: "Quality at our core",
    description:
      "We maintain high-quality standards backed by millions of trusted reviews, ensuring every experience you choose is reliable and exceptional.",
  },
  {
    id: 4,
    iconName: "Headphones",
    title: "Complete support",
    description:
      "Whether it's a change in schedule, a new plan, or questions along the way, our dedicated support team is here for you—anytime, 24/7.",
  },
];

export const galleryData = [
    {
        image: road,
        title: "Road Trips"
    },
    {
        image: city,
        title: "City Tours"
    },
    {
        image: trek,
        title: "Hiking"
    },
    {
        image: history,
        title: "Historical Places"
    },
    {
        image: food,
        title: "Foods"
    },
    {
        image: beach,
        title: "Beaches"
    },
]

export const faqData = [
  {
    category: "Get Started",
    items: [
      {
        question: "How do I create my first trip plan?",
        answer: "Simply sign up, choose your destination, select your preferences, and our system will generate a personalized itinerary for you."
      },
      {
        question: "Do I need to pay to use basic features?",
        answer: "No, basic planning tools are completely free. Premium upgrades offer additional customization options."
      },
      {
        question: "How do I create an account on Ashventure?",
        answer:"To create an account, click the Sign Up button on the top right corner of the homepage. Enter your name, email, and a secure password. After verifying your email, you're all set to explore the world with Ashventure!"
      },
      {
        question: "How does Ashventure's trip planning feature work?",
        answer: "With Ashventure, you can create a personalized trip plan using our easy-to-use trip planner. Click 'Create Trip', add your destinations, set travel dates, and include activities, restaurants, and accommodations."
      }
    ]
  },
  {
    category: "Trip Planning",
    items: [
      {
        question: "Can I customize my itinerary?",
        answer: "Yes! You can add activities, remove suggestions and adjust timings."
      },
      {
        question: "Do you support international trips?",
        answer: "Absolutely — our platform covers destinations across the globe with smart recommendations."
      },
      {
        question: "Can I save multiple itineraries?",
        answer: "Absolutely! Ashventure allows you to save multiple itineraries. After logging in, simply name each trip, and they&apos;ll be stored in your &apos;My Trips&apos; section for easy access."
      },
      {
        question: "How can I edit my trip details?",
        answer: "To edit your trip, go to the My Trips section and select the trip you want to modify. You can update destinations, activities, and notes or change travel dates. Click the save button to save the changes."
      }
    ]
  },
  {
    category: "Account & Profile Management",
    items: [
      {
        question: "How can I change my password?",
        answer: "Go to Settings -> Account Security and click Change Password. Enter your current password, followed by your new password, and save the changes."
      },
      {
        question: "What should I do if I forget my password?",
        answer: "On the login page, click Forgot Password? Enter your registered email, and you&apos;ll receive an OTP which you should put that and follow the instructions to set a new password."
      }
    ]
  },
  {
    category: "Privacy & Security",
    items: [
      {
        question: "How does Ashventure keep my personal data safe?",
        answer: "We use advanced encryption and secure servers to protect your data. Our privacy policy ensures that your information is never shared without your consent."
      },
      {
        question: "Does Ashventure use cookies?",
        answer: "Yes, we use cookies to enhance your browsing experience and provide personalized recommendations."
      }
    ]
  },
  {
    category: "Technical Support",
    items: [
      {
        question: "What should I do if Ashventure crashes?",
        answer: "If the site crashes, try refreshing your browser. If the issue persists, clear your cache and cookies or use a different browser. For further help, contact our support team."
      },
      {
        question: "How can I report a bug?",
        answer: "Head to Help Center -> Query Form and describe the issue in detail. Our team will work on resolving it as soon as possible."
      }
    ]
  },
  {
    category: "Contact and Support",
    items: [
      {
        question: "What are Ashventure's customer support hours?",
        answer: "Our support team is available 24/7 through live chat and email. You can also submit a request via the Contact Us section on our website."
      },
      {
        question: "Can I provide feedback about my experience?",
        answer: "Yes! Visit the Feedback section under Contact Us, and let us know what you think. We value your opinions and use them to improve our platform."
      }
    ]
  }
];

export const privacyData = [
  {
    title: "Information We Collect",
    description:
      "We collect information directly from you, automatically when you use our services, and from third parties. This includes your name, contact information, payment details, and site usage data.",
    bulletPoints: [
      "Personal Identification: Name, email, phone number.",
      "Usage Information: Device type, IP address, pages visited, and interaction data.",
    ],
  },
  {
    title: "How We Use Your Data",
    description:
      "Your data is used to provide and personalize our services, process transactions, improve our platform, and communicate with you.",
    bulletPoints: [
      "Provide and personalize our services.",
      "Process transactions and improve our platform.",
      "Send updates, offers, or responses to your inquiries.",
      "Ensure transparency and responsible data usage.",
    ],
  },
  {
    title: "Data Sharing & Disclosure",
    description:
      "We only share data as needed, such as with trusted partners for service delivery or when legally required. We never sell your information to third parties.",
    bulletPoints: [
      "Customer service platforms.",
      "Analytics and performance monitoring services.",
      "Legal or regulatory authorities when required.",
    ],
  },
  {
    title: "Data Retention & Security",
    description:
      "We retain your data only for as long as necessary and apply industry-standard security measures to protect it.",
    bulletPoints: [
      "SSL encryption for secure data transmission.",
      "Regular data backups and monitoring.",
      "Strict access controls and security audits.",
    ],
  },
  {
    title: "Your Rights & Choices",
    description:
      "You have full control over your personal data and can exercise your rights at any time.",
    bulletPoints: [
      "Access or correct your personal information.",
      "Request deletion or restrict data processing.",
      "Opt out of marketing communications.",
    ],
  },
  {
    title: "Cookies & Tracking Technologies",
    description:
      "We use cookies to enhance user experience, analyze usage patterns, and deliver personalized content. You can manage cookie preferences through your browser settings.",
    bulletPoints: [
      "Essential Cookies: Required for site functionality.",
      "Analytics Cookies: Help us understand site usage.",
      "Marketing Cookies: Provide personalized offers.",
    ],
  },
  {
    title: "Changes to This Policy",
    description:
      "We may update this Privacy Policy from time to time. Any significant changes will be communicated clearly.",
    bulletPoints: [
      "Users will be notified of major updates.",
      "Continued use of the site implies acceptance of changes.",
    ],
  },
  {
    title: "Contact Us",
    description:
      "If you have any questions or concerns regarding this Privacy Policy or your data, feel free to contact us.",
    bulletPoints: [
      "Email: support@ashventure.com",
      "Phone: 9330235553",
    ],
  },
];

export const termsConditionsData = [
  {
    title: "Use of Services",
    description:
      "AshVenture provides AI-generated travel itineraries based on user inputs such as destination, budget, dates, and number of travelers. You agree to use the platform only for lawful purposes.",
    bulletPoints: [
      "You may create, edit, and customize itineraries.",
      "You must not misuse, abuse, or attempt to exploit the platform.",
      "You must not submit false or misleading information.",
    ],
  },
  {
    title: "AI-Generated Content Disclaimer",
    description:
      "The itineraries generated by AshVenture are based on AI models and third-party data sources. We do not guarantee accuracy, availability, pricing, or suitability of any recommendations.",
    bulletPoints: [
      "Travel conditions may change over time.",
      "You are responsible for verifying bookings and reservations.",
      "AshVenture is not liable for travel disruptions or losses.",
    ],
  },
  {
    title: "User Responsibilities",
    description:
      "You are responsible for maintaining the confidentiality of your account and any activity that occurs under your account.",
    bulletPoints: [
      "Ensure the accuracy of information you provide.",
      "Keep your login credentials secure.",
      "Immediately notify us of any unauthorized access.",
    ],
  },
  {
    title: "Intellectual Property",
    description:
      "All content, designs, logos, text, and software used on AshVenture are the intellectual property of AshVenture and may not be copied, modified, or distributed without permission.",
  },
  {
    title: "Prohibited Activities",
    description:
      "You agree not to engage in activities that may harm or disrupt the platform.",
    bulletPoints: [
      "Reverse engineering or scraping data.",
      "Uploading malicious code or viruses.",
      "Using the platform for illegal purposes.",
    ],
  },
  {
    title: "Limitation of Liability",
    description:
      "AshVenture shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.",
  },
  {
    title: "Termination",
    description:
      "We reserve the right to suspend or terminate your access to the platform if you violate these Terms & Conditions.",
  },
  {
    title: "Changes to Terms",
    description:
      "We may update these Terms & Conditions from time to time. Continued use of the platform after updates constitutes acceptance of the revised terms.",
  },
  {
    title: "Contact Information",
    description:
      "If you have any questions regarding these Terms & Conditions, please contact us.",
    bulletPoints: [
      "Email: support@ashventure.com",
      "Phone: 9330235553",
    ],
  },
];

export const helpCenterData = [
  {
    title: "Getting Started",
    description:
      "New to AshVenture? This section helps you understand how to begin your journey with our AI-powered travel planner. From entering basic trip details to generating a complete itinerary, these steps will guide you through the entire onboarding process so you can start planning confidently and quickly.",
    steps: [
      "Create an account or continue as a guest.",
      "Enter your destination, dates, number of people, and budget.",
      "Let AI generate a personalized itinerary.",
      "Edit and customize your trip as per your preferences.",
    ],
  },
  {
    title: "Creating a Trip",
    description:
      "Creating a trip on AshVenture is simple and intuitive. This section explains how to provide essential travel information so our AI can generate the most suitable itinerary based on your preferences, group size, and budget, ensuring a well-structured and enjoyable travel plan.",
    steps: [
      "Go to the Create Trip page.",
      "Fill in travel details like dates, budget, and group size.",
      "Submit the form to generate an AI itinerary.",
      "Review the suggested plan and save it to My Trips.",
    ],
  },
  {
    title: "Editing Your Itinerary",
    description:
      "AshVenture gives you complete freedom to modify your itinerary even after it has been generated. You can rearrange activities, swap plans between days, or make changes anytime to ensure your trip perfectly matches your travel style and priorities.",
    steps: [
      "Open a trip from My Trips.",
      "Move activities between days using drag and drop.",
      "Add or remove places anytime.",
      "Save changes instantly without losing progress.",
    ],
  },
  {
    title: "Map & Location Features",
    description:
      "Our integrated map features help you visualize your trip and discover new places effortlessly. By using real-time location data, you can explore nearby attractions, understand distances, and enhance your itinerary with smart location-based suggestions.",
    steps: [
      "View your itinerary locations directly on the map.",
      "Discover nearby attractions and add them to your trip.",
      "Get route suggestions for better travel planning.",
    ],
  },
  {
    title: "Managing Your Profile",
    description:
      "Your profile helps AshVenture personalize your experience. Keeping your preferences and interests updated allows our AI to generate better and more relevant itineraries tailored to your travel habits and future plans.",
    steps: [
      "Go to Profile from the navigation menu.",
      "Update your name, preferences, or travel interests.",
      "Save changes to personalize future trip suggestions.",
    ],
  },
  {
    title: "Account & Privacy",
    description:
      "We value your privacy and are committed to keeping your personal data secure. This section explains how your information is handled, stored, and protected while giving you full control over your trips and account-related data.",
    steps: [
      "Your trips are private and secure.",
      "You can edit or delete your trips anytime.",
      "We do not sell your personal data to third parties.",
    ],
  },
  {
    title: "Need More Help?",
    description:
      "If you have questions that are not covered here or need personalized assistance, our support team is always ready to help. We aim to resolve your queries quickly so you can focus on planning an amazing trip without any hassle.",
    steps: [
      "Email us at support@ashventure.com",
      "Use the Contact Us page for queries",
      "We usually respond within 24–48 hours",
    ],
  },
];