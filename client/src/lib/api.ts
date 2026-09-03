import {
  HeroData, AboutData, Project, Skill, Experience, Education,
  Service, Blog, GalleryItem, Certificate, Testimonial, ContactMessage, SiteSettings, DashboardStats
} from '../types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data.data !== undefined ? data.data : data;
}

// Content APIs
export const api = {
  // Public content fetchers
  getHero: async (): Promise<HeroData> => {
    try {
      const res = await fetchAPI<HeroData[]>('/content/hero');
      return res[0] || defaultHero;
    } catch {
      return defaultHero;
    }
  },

  getAbout: async (): Promise<AboutData> => {
    try {
      const res = await fetchAPI<AboutData[]>('/content/about');
      return res[0] || defaultAbout;
    } catch {
      return defaultAbout;
    }
  },

  getProjects: async (): Promise<Project[]> => {
    try {
      return await fetchAPI<Project[]>('/content/projects');
    } catch {
      return defaultProjects;
    }
  },

  getSkills: async (): Promise<Skill[]> => {
    try {
      return await fetchAPI<Skill[]>('/content/skills');
    } catch {
      return defaultSkills;
    }
  },

  getExperiences: async (): Promise<Experience[]> => {
    try {
      return await fetchAPI<Experience[]>('/content/experiences');
    } catch {
      return defaultExperiences;
    }
  },

  getEducation: async (): Promise<Education[]> => {
    try {
      return await fetchAPI<Education[]>('/content/education');
    } catch {
      return defaultEducation;
    }
  },

  getServices: async (): Promise<Service[]> => {
    try {
      return await fetchAPI<Service[]>('/content/services');
    } catch {
      return defaultServices;
    }
  },

  getBlogs: async (): Promise<Blog[]> => {
    try {
      return await fetchAPI<Blog[]>('/content/blogs');
    } catch {
      return defaultBlogs;
    }
  },

  getGallery: async (): Promise<GalleryItem[]> => {
    try {
      return await fetchAPI<GalleryItem[]>('/content/gallery');
    } catch {
      return defaultGallery;
    }
  },

  getCertificates: async (): Promise<Certificate[]> => {
    try {
      return await fetchAPI<Certificate[]>('/content/certificates');
    } catch {
      return defaultCertificates;
    }
  },

  getTestimonials: async (): Promise<Testimonial[]> => {
    try {
      return await fetchAPI<Testimonial[]>('/content/testimonials');
    } catch {
      return defaultTestimonials;
    }
  },

  getSettings: async (): Promise<SiteSettings> => {
    try {
      const res = await fetchAPI<SiteSettings[]>('/content/settings');
      return res[0] || defaultSettings;
    } catch {
      return defaultSettings;
    }
  },

  sendMessage: async (msg: { name: string; email: string; subject?: string; message: string }) => {
    return fetchAPI('/messages', {
      method: 'POST',
      body: JSON.stringify(msg),
    });
  },

  // Admin CMS CRUD endpoints
  createContent: async (type: string, data: any) => {
    return fetchAPI(`/content/${type}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateContent: async (type: string, id: string, data: any) => {
    return fetchAPI(`/content/${type}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteContent: async (type: string, id: string) => {
    return fetchAPI(`/content/${type}/${id}`, {
      method: 'DELETE',
    });
  },

  getMessages: async (): Promise<ContactMessage[]> => {
    return fetchAPI<ContactMessage[]>('/messages');
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      return await fetchAPI<DashboardStats>('/analytics/stats');
    } catch {
      return {
        totalProjects: 3,
        totalBlogs: 2,
        totalMessages: 5,
        unreadMessages: 2,
        pageviewsChart: [
          { date: '2026-07-25', views: 320 },
          { date: '2026-07-26', views: 450 },
          { date: '2026-07-27', views: 580 },
          { date: '2026-07-28', views: 720 },
          { date: '2026-07-29', views: 910 },
        ],
        topPages: [
          { path: '/', views: 1850 },
          { path: '/projects', views: 920 },
          { path: '/blog', views: 640 },
          { path: '/about', views: 410 },
        ],
      };
    }
  },
};

// Default Fallbacks
const defaultHero: HeroData = {
  greeting: "Hello, World 👋 I'm",
  name: 'Paramesh Rajuri',
  titles: ['AI Engineer', 'Agentic AI Developer', 'Full Stack Developer', 'Cloud & IoT Architect'],
  bio: 'AI Engineer passionate about Agentic AI, Large Language Models, Machine Learning, and scalable software engineering. I build intelligent applications, automation systems, enterprise platforms, and cloud-native solutions that solve real-world problems.',
  availability: 'Available for Select Projects & Consulting',
  yearsOfExp: '3+ Years',
  projectsCompleted: '15+',
  happyClients: '30+ Tech',
  resumeUrl: '/resume.pdf',
  githubUrl: 'https://github.com',
  linkedinUrl: 'https://www.linkedin.com/in/paramesh-rajuri-700394222',
  twitterUrl: 'https://twitter.com',
};

const defaultAbout: AboutData = {
  summary: "I'm an AI Engineer and Full Stack Developer with a strong foundation in Python, Machine Learning, Agentic AI, Large Language Models, and modern web technologies. My experience spans AI-powered software, logistics platforms, IoT automation, enterprise applications, and cloud-native systems.",
  story: 'AI Engineer and Full Stack Developer specializing in Python, Machine Learning, Generative AI, Large Language Models (LLMs), and Agentic AI. Experienced in developing scalable AI-powered applications, enterprise software, logistics platforms, IoT automation systems, and cloud-native solutions. Skilled in Prompt Engineering, Retrieval-Augmented Generation (RAG), FastAPI, React.js, Node.js, REST APIs, and intelligent automation. Passionate about building production-ready AI systems and autonomous agents that solve real-world business challenges.',
  profileImage: '/images/profile.jpg',
  coreValues: [
    { title: 'Agentic AI & LLM Systems', desc: 'Specialized in LangChain, LangGraph, RAG pipelines, Prompt Engineering, FAISS, ChromaDB, and autonomous AI agents.' },
    { title: 'Full Stack & Cloud Architecture', desc: 'Proficient in Python, FastAPI, Flask, Django, Node.js, React.js, Tailwind CSS, MongoDB, MySQL, and Docker.' },
    { title: 'IoT & Intelligent Automation', desc: 'Hands-on experience with ESP32 Mesh, LoRa communication, Smart Grid safety automation, and cloud logistics.' },
  ],
  highlights: [
    'Startup Lead at Afflicart Pvt. Ltd. designing scalable backend architectures & AI applications.',
    'Developed cloud-based logistics platform for ParcelHorse with real-time shipment tracking & dashboards.',
    'Engineered Smart Grid Electrical Worker Safety Automation & IoT Train Monitoring Systems.',
  ],
};

const defaultProjects: Project[] = [
  {
    _id: '1',
    title: 'Pharmacy Inventory Management System',
    slug: 'pharmacy-inventory-management-system',
    tagline: 'Complete pharmacy inventory & billing platform with responsive dashboards.',
    description: 'A complete pharmacy inventory and billing platform with real-time inventory tracking, product management, sales analytics, and responsive dashboards.',
    content: '# Pharmacy Inventory Management System\n\nDesigned for modern healthcare providers to manage medicine inventory, billing, supplier orders, and real-time sales reporting...',
    category: 'Full Stack',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'REST APIs'],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80'],
    liveUrl: 'https://pharmacy-management-system-theta-three.vercel.app',
    githubUrl: 'https://github.com',
    featured: true,
    order: 1,
    metrics: [{ label: 'Platform Type', value: 'MERN Stack' }, { label: 'Status', value: 'Production Live' }],
    timeline: '2 Months',
  },
  {
    _id: '2',
    title: 'Lineman Safety Automation System',
    slug: 'lineman-safety-automation-system',
    tagline: 'IoT-based electrical worker safety system with remote relay automation.',
    description: 'IoT-based electrical worker safety system with remote monitoring, smart grid relay automation, and real-time status alerts.',
    content: '# Lineman Safety Automation System\n\nEngineered to protect high-voltage electrical grid workers through hardware relay automation and cloud monitoring...',
    category: 'IoT',
    tags: ['ESP32', 'MERN', 'Firebase', 'Relay Automation'],
    techStack: ['ESP32', 'React', 'Node.js', 'Firebase'],
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'],
    liveUrl: 'https://www.linkedin.com/posts/paramesh-rajuri-700394222_iot-webservices-smartgrid-activity-7389610075579019264-fzhL',
    githubUrl: 'https://github.com',
    featured: true,
    order: 2,
    metrics: [{ label: 'Hardware', value: 'ESP32 + Relays' }, { label: 'Target Industry', value: 'Smart Grid & Safety' }],
    timeline: '3 Months',
  },
  {
    _id: '3',
    title: 'IoT Train Monitoring System',
    slug: 'iot-train-monitoring-system',
    tagline: 'Smart cargo monitoring using ESP32 Mesh networking & LoRa communication.',
    description: 'Smart cargo & train monitoring system using ESP32 Mesh networking and long-range LoRa wireless communication.',
    content: '# IoT Train Monitoring System\n\nProvides real-time telemetry for railway cargo containers using mesh nodes and long-range LoRa transmission...',
    category: 'IoT',
    tags: ['ESP32 Mesh', 'LoRa', 'Sensors', 'Embedded Systems'],
    techStack: ['ESP32', 'LoRa', 'Embedded C++', 'Python'],
    thumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
    images: ['https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80'],
    liveUrl: 'https://www.linkedin.com/posts/paramesh-rajuri-700394222_iot-embeddedsystems-trainsafety-activity-7360299916243472384-2QIp',
    githubUrl: 'https://github.com',
    featured: true,
    order: 3,
    metrics: [{ label: 'Network', value: 'ESP32 Mesh + LoRa' }, { label: 'Domain', value: 'Rail Transit IoT' }],
    timeline: '2 Months',
  },
];

const defaultSkills: Skill[] = [
  { _id: '1', name: 'Python', category: 'Artificial Intelligence', proficiency: 98, level: 'Expert', icon: 'Code', color: '#3776ab', featured: true, order: 1 },
  { _id: '2', name: 'Agentic AI & AI Agents', category: 'Artificial Intelligence', proficiency: 95, level: 'Expert', icon: 'Cpu', color: '#6366f1', featured: true, order: 2 },
  { _id: '3', name: 'LLMs & GenAI', category: 'Artificial Intelligence', proficiency: 94, level: 'Expert', icon: 'Sparkles', color: '#ec4899', featured: true, order: 3 },
  { _id: '4', name: 'LangChain & LangGraph', category: 'Artificial Intelligence', proficiency: 92, level: 'Expert', icon: 'Network', color: '#10b981', featured: true, order: 4 },
  { _id: '5', name: 'FastAPI', category: 'Backend', proficiency: 96, level: 'Expert', icon: 'Server', color: '#009688', featured: true, order: 5 },
  { _id: '6', name: 'React.js', category: 'Frontend', proficiency: 92, level: 'Expert', icon: 'Code', color: '#61dafb', featured: true, order: 6 },
];

const defaultExperiences: Experience[] = [
  {
    _id: '1',
    role: 'Startup Lead',
    company: 'Afflicart Pvt. Ltd.',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    location: 'Hyderabad, India',
    type: 'Full-time',
    startDate: '2022',
    endDate: 'Present',
    current: true,
    description: 'Led the development of AI-ready enterprise applications, automation systems, logistics platforms, and cloud-native software.',
    achievements: [
      'Designed scalable backend architectures using Python, FastAPI, React.js, Node.js, Firebase, and REST APIs.',
      'Built intelligent automation tools and agentic workflows to streamline business operations.',
    ],
    skills: ['Python', 'FastAPI', 'React.js', 'Node.js', 'Firebase', 'Agentic AI'],
    order: 1,
  },
  {
    _id: '2',
    role: 'Software Engineer',
    company: 'ParcelHorse Logistics',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80',
    location: 'Remote / India',
    type: 'Contract',
    startDate: '2024',
    endDate: '2024',
    current: false,
    description: 'Designed and developed a cloud-based logistics platform with shipment tracking, order management, dashboards, and backend APIs.',
    achievements: [
      'Implemented real-time shipment status tracking and dispatch management dashboards.',
      'Built high-performance REST API endpoints for seamless third-party logistics integration.',
    ],
    skills: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'Cloud Logistics'],
    order: 2,
  },
  {
    _id: '3',
    role: 'Freelance Software Developer',
    company: 'Self-Employed',
    companyLogo: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=200&q=80',
    location: 'Hyderabad, India',
    type: 'Freelance',
    startDate: '2021',
    endDate: '2023',
    current: false,
    description: 'Developed scalable web applications, enterprise dashboards, automation tools, and cloud-deployed software for startups and businesses.',
    achievements: [
      'Delivered over 15+ custom software projects across web, AI, and IoT domains.',
      'Maintained high client satisfaction through agile development and clear technical communication.',
    ],
    skills: ['Python', 'React.js', 'MongoDB', 'IoT', 'FastAPI'],
    order: 3,
  },
];

const defaultEducation: Education[] = [
  {
    _id: '1',
    degree: 'Bachelor of Technology (B.Tech) in Electronics and Communication Engineering',
    institution: 'Rajiv Gandhi University of Knowledge Technologies (RGUKT), Basar',
    location: 'Basar, Telangana, India',
    startDate: '2018',
    endDate: '2022',
    cgpa: '8.5 / 10.0',
    coursework: ['Artificial Intelligence', 'Embedded Systems', 'Signal Processing', 'Computer Networks'],
    description: 'Specialized in Signal Processing, Embedded IoT Systems, and AI Applications.',
    order: 1,
  },
];

const defaultServices: Service[] = [
  {
    _id: '1',
    title: 'AI Agent & Agentic AI Development',
    shortDesc: 'Autonomous AI agents powered by LLMs, RAG, and LangChain/LangGraph.',
    description: 'Design and deployment of custom autonomous AI agents, multi-agent orchestrations, and RAG pipelines for intelligent enterprise automation.',
    icon: 'Sparkles',
    features: ['Autonomous AI Agent Workflows', 'LangChain & LangGraph Orchestration', 'RAG & Vector Database Search', 'Prompt Engineering'],
    timeline: '2 - 4 Weeks',
    priceRange: 'Custom Quote',
    order: 1,
  },
  {
    _id: '2',
    title: 'Full Stack & MERN Web Engineering',
    shortDesc: 'Scalable web applications built with Python, FastAPI, React.js & Node.js.',
    description: 'End-to-end web application development featuring responsive UIs, type-safe REST APIs, and resilient databases.',
    icon: 'Layout',
    features: ['React.js & Tailwind CSS Frontend', 'FastAPI & Node.js RESTful APIs', 'Database Optimization'],
    timeline: '2 - 6 Weeks',
    priceRange: 'Custom Quote',
    order: 2,
  },
];

const defaultBlogs: Blog[] = [
  {
    _id: '1',
    title: 'Building Autonomous AI Agents with LangGraph & RAG',
    slug: 'building-autonomous-ai-agents',
    summary: 'Deep dive into constructing stateful multi-agent systems, memory persistence, and vector search with Python.',
    content: '# Building Autonomous AI Agents with LangGraph & RAG\n\nAgentic AI represents a paradigm shift from static prompts to goal-directed autonomous loops...',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    category: 'Artificial Intelligence',
    tags: ['Python', 'Agentic AI', 'LangChain', 'RAG'],
    readingTime: '7 min read',
    published: true,
    featured: true,
    views: 1850,
  },
];

const defaultGallery: GalleryItem[] = [
  { _id: '1', title: 'AI & Embedded Systems Lab', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80', category: 'Workspaces', caption: 'Hardware prototyping & Python AI development station.', order: 1 },
];

const defaultCertificates: Certificate[] = [
  { _id: '1', title: 'STEM Educator Certification', issuer: 'Cognospace', issueDate: 'Verified', credentialUrl: 'https://drive.google.com/file/d/11girkMGd2URS6j33Ef_D-Gv1We2I4zyj/view', image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80', order: 1 },
  { _id: '2', title: 'Robotics Internship Certification', issuer: 'IIT Bombay', issueDate: 'Verified', credentialUrl: 'https://drive.google.com/file/d/15QNyMTHbg1T75Si9LGI08Xbssu8yjVcE/view', image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=600&q=80', order: 2 },
  { _id: '3', title: 'Embedded Systems Internship', issuer: 'Pantech Solutions', issueDate: 'Verified', credentialUrl: 'https://drive.google.com/file/d/15R2WfOpSbawqxMBEUFf15Ay5XpDInGNg/view', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80', order: 3 },
  { _id: '4', title: 'Software Development Internship', issuer: 'Syslabs Services LLP', issueDate: 'Verified', credentialUrl: 'https://drive.google.com/file/d/1sdSDA1aSb_3jy8ND9Y5Rg2ciJZKoAX68/view', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80', order: 4 },
];

const defaultTestimonials: Testimonial[] = [
  {
    _id: '1',
    name: 'Yuva Hackathon Winner',
    role: 'Grand Champion',
    company: 'State Hackathon Committee',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quote: 'Awarded 1st Place for building intelligent automation and IoT systems under high-pressure hackathon conditions.',
    rating: 5,
    order: 1,
  },
];

const defaultSettings: SiteSettings = {
  siteTitle: 'Paramesh Rajuri | AI Engineer & Agentic AI Developer',
  siteDescription: 'Personal portfolio of Paramesh Rajuri, AI Engineer and Full Stack Developer specializing in Agentic AI, LLMs, FastAPI, and Cloud Applications.',
  keywords: ['AI Engineer', 'Agentic AI Developer', 'Paramesh Rajuri', 'Python', 'FastAPI', 'React.js', 'LLMs', 'Hyderabad'],
  author: 'Paramesh Rajuri',
  contactEmail: 'parameshrajuri@gmail.com',
  location: 'Hyderabad, India',
  soundEffects: true,
  maintenanceMode: false,
  socialLinks: [
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/paramesh-rajuri-700394222' },
    { platform: 'Portfolio', url: 'https://mavixverse.vercel.app' },
    { platform: 'Email', url: 'mailto:parameshrajuri@gmail.com' },
  ],
};
