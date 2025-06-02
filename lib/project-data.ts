import type { ProjectType } from "./contentful"

// Fallback data for development and when CMS is not available
export const fallbackProjects: ProjectType[] = [
  {
    id: "1",
    title: "Sign Language Translation",
    slug: "sign-language-translation",
    description: "A machine learning model that translates sign language gestures into text in real-time.",
    fullDescription: `
      This project uses computer vision and machine learning to translate sign language gestures into text in real-time. 
      
      The system captures video input from a webcam, processes the frames to detect hand gestures, and then uses a trained machine learning model to classify these gestures into corresponding text.
      
      The model was trained on a dataset of American Sign Language (ASL) gestures, achieving an accuracy of over 90% on the test set. The system can recognize the ASL alphabet and some common words and phrases.
      
      Technologies used include Python, TensorFlow, OpenCV, and MediaPipe for hand tracking.
    `,
    image: {
      url: "/placeholder.svg?height=400&width=600",
      width: 600,
      height: 400,
      title: "Sign Language Translation",
    },
    gallery: [
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "Sign Language Translation 1",
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "Sign Language Translation 2",
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "Sign Language Translation 3",
      },
    ],
    tags: ["Python", "Machine Learning", "Computer Vision", "TensorFlow", "OpenCV"],
    github: "https://github.com/mawaisnazir/sign-language-translation",
    demo: "https://sign-language-translation.vercel.app",
    date: "2023-05-15",
    client: "University Project",
    featured: true,
    features: [
      "Real-time sign language detection",
      "Support for ASL alphabet and common phrases",
      "High accuracy (>90%)",
      "Optimized for low-latency performance",
      "User-friendly interface",
    ],
    challenges: [
      "Handling variations in lighting conditions",
      "Accounting for different hand sizes and positions",
      "Optimizing the model for real-time performance",
      "Building a robust dataset for training",
    ],
  },
  {
    id: "2",
    title: "RozirotiPk",
    slug: "roziroti-pk",
    description: "A platform connecting job seekers with employers in Pakistan.",
    fullDescription: `
      RozirotiPk is a comprehensive job portal designed specifically for the Pakistani market. The platform connects job seekers with employers, streamlining the recruitment process.
      
      Job seekers can create profiles, upload resumes, search for jobs, and apply directly through the platform. Employers can post job listings, search for candidates, and manage applications.
      
      The platform includes features such as advanced search filters, job recommendations based on user profiles, email notifications, and analytics for employers.
      
      Built with Next.js for the frontend, MongoDB for the database, and Node.js for the backend, the platform offers a responsive and user-friendly experience.
    `,
    image: {
      url: "/placeholder.svg?height=400&width=600",
      width: 600,
      height: 400,
      title: "RozirotiPk",
    },
    gallery: [
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "RozirotiPk 1",
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "RozirotiPk 2",
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "RozirotiPk 3",
      },
    ],
    tags: ["Next.js", "TailwindCSS", "MongoDB", "Node.js", "Express"],
    github: "https://github.com/mawaisnazir/rozirotiPk",
    demo: "https://rozirotiPk.vercel.app",
    date: "2023-08-20",
    client: "Personal Project",
    featured: true,
    features: [
      "User authentication and profiles",
      "Job posting and application system",
      "Advanced search and filtering",
      "Responsive design for all devices",
      "Email notifications",
      "Analytics dashboard for employers",
    ],
    challenges: [
      "Designing a scalable database schema",
      "Implementing efficient search functionality",
      "Ensuring data security and privacy",
      "Optimizing performance for users with slow internet connections",
    ],
  },
  {
    id: "3",
    title: "AI-Powered Content Generator",
    slug: "ai-content-generator",
    description: "An AI tool that generates high-quality content for blogs, social media, and marketing materials.",
    fullDescription: `
      This AI-powered content generator helps content creators, marketers, and businesses create high-quality content quickly and efficiently.
      
      The tool uses advanced natural language processing models to generate blog posts, social media captions, marketing copy, and more based on user prompts and preferences.
      
      Users can specify the tone, style, length, and target audience for their content, and the AI will generate tailored text that meets their requirements.
      
      The system also includes features for editing, refining, and optimizing the generated content for SEO and readability.
    `,
    image: {
      url: "/placeholder.svg?height=400&width=600",
      width: 600,
      height: 400,
      title: "AI Content Generator",
    },
    gallery: [
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "AI Content Generator 1",
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "AI Content Generator 2",
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "AI Content Generator 3",
      },
    ],
    tags: ["AI", "NLP", "React", "Node.js", "OpenAI"],
    github: "https://github.com/mawaisnazir/ai-content-generator",
    demo: "https://ai-content-generator.vercel.app",
    date: "2023-10-10",
    client: "SaaS Product",
    featured: true,
    features: [
      "AI-powered content generation",
      "Customizable tone and style",
      "Multiple content types (blog, social, marketing)",
      "SEO optimization",
      "Content editing and refinement",
      "User-friendly interface",
    ],
    challenges: [
      "Ensuring high-quality, coherent content generation",
      "Optimizing API usage and costs",
      "Creating an intuitive user experience",
      "Implementing effective content filtering",
    ],
  },
  {
    id: "4",
    title: "E-commerce Dashboard",
    slug: "ecommerce-dashboard",
    description: "A comprehensive dashboard for e-commerce businesses to track sales, inventory, and customer data.",
    fullDescription: `
      This e-commerce dashboard provides business owners with a comprehensive view of their online store's performance.
      
      The dashboard includes real-time analytics for sales, inventory, customer behavior, and marketing campaigns. Users can track key metrics, identify trends, and make data-driven decisions to optimize their business.
      
      Features include customizable widgets, interactive charts and graphs, automated reports, and integration with popular e-commerce platforms like Shopify, WooCommerce, and Magento.
      
      The dashboard is built with a focus on usability and performance, ensuring that business owners can quickly access the information they need without technical expertise.
    `,
    image: {
      url: "/placeholder.svg?height=400&width=600",
      width: 600,
      height: 400,
      title: "E-commerce Dashboard",
    },
    gallery: [
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "E-commerce Dashboard 1",
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "E-commerce Dashboard 2",
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "E-commerce Dashboard 3",
      },
    ],
    tags: ["React", "D3.js", "Node.js", "MongoDB", "API Integration"],
    github: "https://github.com/mawaisnazir/ecommerce-dashboard",
    demo: "https://ecommerce-dashboard.vercel.app",
    date: "2023-07-05",
    client: "E-commerce Businesses",
    featured: false,
    features: [
      "Real-time analytics",
      "Sales and inventory tracking",
      "Customer behavior analysis",
      "Marketing campaign performance",
      "Customizable dashboard widgets",
      "Multi-platform integration",
    ],
    challenges: [
      "Handling large volumes of data efficiently",
      "Creating intuitive data visualizations",
      "Implementing secure API integrations",
      "Ensuring real-time updates without performance issues",
    ],
  },
  {
    id: "5",
    title: "Health Monitoring App",
    slug: "health-monitoring-app",
    description:
      "A mobile application for tracking health metrics, exercise, and nutrition with personalized insights.",
    fullDescription: `
      This health monitoring app helps users track their fitness progress, nutrition, and overall well-being through a comprehensive set of features.
      
      Users can log workouts, track calories and macronutrients, monitor vital signs like heart rate and sleep quality, and receive personalized recommendations based on their goals and progress.
      
      The app integrates with popular fitness devices and wearables to automatically import data, making it easy for users to maintain a complete health profile without manual entry.
      
      Advanced analytics and visualization tools help users understand trends in their health data and make informed decisions about their lifestyle.
    `,
    image: {
      url: "/placeholder.svg?height=400&width=600",
      width: 600,
      height: 400,
      title: "Health Monitoring App",
    },
    gallery: [
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "Health Monitoring App 1",
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "Health Monitoring App 2",
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "Health Monitoring App 3",
      },
    ],
    tags: ["React Native", "Firebase", "Health APIs", "Machine Learning"],
    github: "https://github.com/mawaisnazir/health-monitoring-app",
    demo: "https://health-app.vercel.app",
    date: "2023-09-15",
    client: "Healthcare Startup",
    featured: false,
    features: [
      "Comprehensive health tracking",
      "Nutrition and exercise logging",
      "Integration with fitness wearables",
      "Personalized health insights",
      "Goal setting and progress tracking",
      "Secure health data storage",
    ],
    challenges: [
      "Ensuring data privacy and security",
      "Creating accurate health insights and recommendations",
      "Designing an intuitive user interface for complex data",
      "Optimizing battery usage with background tracking",
    ],
  },
  {
    id: "6",
    title: "Smart Home Automation System",
    slug: "smart-home-automation",
    description: "An IoT system for controlling and automating home devices through a centralized dashboard.",
    fullDescription: `
      This smart home automation system allows users to control and monitor their home devices from a centralized dashboard.
      
      The system integrates with various IoT devices such as smart lights, thermostats, security cameras, door locks, and appliances, providing a unified interface for managing the entire home.
      
      Users can create automated routines, set schedules, and define triggers based on time, location, or device status. The system also includes voice control integration with popular assistants like Alexa and Google Assistant.
      
      Advanced features include energy usage monitoring, anomaly detection for security, and AI-powered suggestions for optimizing home comfort and efficiency.
    `,
    image: {
      url: "/placeholder.svg?height=400&width=600",
      width: 600,
      height: 400,
      title: "Smart Home Automation",
    },
    gallery: [
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "Smart Home Automation 1",
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "Smart Home Automation 2",
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        width: 600,
        height: 400,
        title: "Smart Home Automation 3",
      },
    ],
    tags: ["IoT", "React", "Node.js", "MQTT", "Raspberry Pi"],
    github: "https://github.com/mawaisnazir/smart-home-automation",
    demo: "https://smart-home-demo.vercel.app",
    date: "2023-06-20",
    client: "Home Automation Company",
    featured: false,
    features: [
      "Centralized device control",
      "Automated routines and schedules",
      "Voice assistant integration",
      "Energy usage monitoring",
      "Security system integration",
      "Remote access and control",
    ],
    challenges: [
      "Ensuring compatibility with diverse IoT devices",
      "Implementing robust security measures",
      "Creating a responsive and intuitive interface",
      "Optimizing system performance and reliability",
    ],
  },
]
