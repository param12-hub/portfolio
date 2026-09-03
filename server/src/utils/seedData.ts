import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch {
  // Ignore
}
import { env } from '../config/env';
import { User } from '../models/User';
import { Hero } from '../models/Hero';
import { About } from '../models/About';
import { Project } from '../models/Project';
import { Experience } from '../models/Experience';
import { Skill } from '../models/Skill';
import { Education } from '../models/Education';
import { Service } from '../models/Service';
import { Blog } from '../models/Blog';
import { Gallery } from '../models/Gallery';
import { Certificate } from '../models/Certificate';
import { Testimonial } from '../models/Testimonial';
import { Setting } from '../models/Setting';

export const seedDatabase = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(env.MONGO_URI);
    }
    console.log('[Seed]: Connected to MongoDB...');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Hero.deleteMany({}),
      About.deleteMany({}),
      Project.deleteMany({}),
      Experience.deleteMany({}),
      Skill.deleteMany({}),
      Education.deleteMany({}),
      Service.deleteMany({}),
      Blog.deleteMany({}),
      Gallery.deleteMany({}),
      Certificate.deleteMany({}),
      Testimonial.deleteMany({}),
      Setting.deleteMany({}),
    ]);

    // 1. Admin User
    const passwordHash = await bcrypt.hash('Admin@123456', 10);
    await User.create({
      name: 'Paramesh Rajuri',
      email: 'admin@portfolio.dev',
      passwordHash,
      role: 'superadmin',
      avatar: '/images/profile.jpg',
    });

    // 2. Hero Section
    await Hero.create({
      greeting: 'Hello, World 👋 I am',
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
    });

    // 3. About Section
    await About.create({
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
    });

    // 4. Projects
    await Project.create([
      {
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
        metrics: [
          { label: 'Platform Type', value: 'MERN Stack' },
          { label: 'Status', value: 'Production Live' },
        ],
        timeline: '2 Months',
      },
      {
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
        metrics: [
          { label: 'Hardware', value: 'ESP32 + Relays' },
          { label: 'Target Industry', value: 'Smart Grid & Safety' },
        ],
        timeline: '3 Months',
      },
      {
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
        metrics: [
          { label: 'Network', value: 'ESP32 Mesh + LoRa' },
          { label: 'Domain', value: 'Rail Transit IoT' },
        ],
        timeline: '2 Months',
      },
    ]);

    // 5. Skills
    await Skill.create([
      // AI & LLMs
      { name: 'Python', category: 'Artificial Intelligence', proficiency: 98, level: 'Expert', icon: 'Code', color: '#3776ab', featured: true, order: 1 },
      { name: 'Agentic AI & AI Agents', category: 'Artificial Intelligence', proficiency: 95, level: 'Expert', icon: 'Cpu', color: '#6366f1', featured: true, order: 2 },
      { name: 'LLMs & GenAI', category: 'Artificial Intelligence', proficiency: 94, level: 'Expert', icon: 'Sparkles', color: '#ec4899', featured: true, order: 3 },
      { name: 'LangChain & LangGraph', category: 'Artificial Intelligence', proficiency: 92, level: 'Expert', icon: 'Network', color: '#10b981', featured: true, order: 4 },
      { name: 'RAG & Vector DBs (FAISS, Chroma)', category: 'Artificial Intelligence', proficiency: 90, level: 'Advanced', icon: 'Database', color: '#06b6d4', featured: true, order: 5 },
      { name: 'Prompt Engineering & Ollama', category: 'Artificial Intelligence', proficiency: 95, level: 'Expert', icon: 'Terminal', color: '#a855f7', featured: true, order: 6 },
      // Backend
      { name: 'FastAPI', category: 'Backend', proficiency: 96, level: 'Expert', icon: 'Server', color: '#009688', featured: true, order: 7 },
      { name: 'Node.js & Express.js', category: 'Backend', proficiency: 90, level: 'Advanced', icon: 'Server', color: '#339933', featured: true, order: 8 },
      { name: 'Django & Flask', category: 'Backend', proficiency: 88, level: 'Advanced', icon: 'Server', color: '#092e20', featured: true, order: 9 },
      // Frontend
      { name: 'React.js', category: 'Frontend', proficiency: 92, level: 'Expert', icon: 'Code', color: '#61dafb', featured: true, order: 10 },
      { name: 'Tailwind CSS', category: 'Frontend', proficiency: 94, level: 'Expert', icon: 'Layout', color: '#38bdf8', featured: true, order: 11 },
      // Database & Cloud
      { name: 'MongoDB & MySQL', category: 'Database', proficiency: 90, level: 'Advanced', icon: 'Database', color: '#47a248', featured: true, order: 12 },
      { name: 'Docker & AWS', category: 'DevOps', proficiency: 85, level: 'Advanced', icon: 'Container', color: '#2496ed', featured: true, order: 13 },
    ]);

    // 6. Experience
    await Experience.create([
      {
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
    ]);

    // 7. Education
    await Education.create([
      {
        degree: 'Bachelor of Technology (B.Tech) in Electronics and Communication Engineering',
        institution: 'Rajiv Gandhi University of Knowledge Technologies (RGUKT), Basar',
        location: 'Basar, Telangana, India',
        startDate: '2018',
        endDate: '2022',
        cgpa: '8.5 / 10.0',
        coursework: ['Artificial Intelligence', 'Embedded Systems', 'Signal Processing', 'Computer Networks', 'Data Structures & Algorithms'],
        description: 'Specialized in Signal Processing, Embedded IoT Systems, and AI Applications.',
        order: 1,
      },
    ]);

    // 8. Services
    await Service.create([
      {
        title: 'AI Agent & Agentic AI Development',
        shortDesc: 'Autonomous AI agents powered by LLMs, RAG, and LangChain/LangGraph.',
        description: 'Design and deployment of custom autonomous AI agents, multi-agent orchestrations, and RAG pipelines for intelligent enterprise automation.',
        icon: 'Sparkles',
        features: ['Autonomous AI Agent Workflows', 'LangChain & LangGraph Orchestration', 'RAG & Vector Database Search', 'Prompt Engineering & Fine-Tuning'],
        timeline: '2 - 4 Weeks',
        priceRange: 'Custom Quote',
        order: 1,
      },
      {
        title: 'Full Stack & MERN Web Engineering',
        shortDesc: 'Scalable web applications built with Python, FastAPI, React.js & Node.js.',
        description: 'End-to-end web application development featuring responsive UIs, type-safe REST APIs, and resilient MongoDB/MySQL databases.',
        icon: 'Layout',
        features: ['React.js & Tailwind CSS Frontend', 'FastAPI & Node.js RESTful APIs', 'Database Design & Optimization', 'Cloud Deployment & Dockerization'],
        timeline: '2 - 6 Weeks',
        priceRange: 'Custom Quote',
        order: 2,
      },
      {
        title: 'IoT & Smart System Automation',
        shortDesc: 'Hardware-to-cloud IoT solutions using ESP32 Mesh, LoRa & Relays.',
        description: 'Custom IoT telemetry platforms, smart grid safety automation systems, and remote hardware monitoring suites.',
        icon: 'Wrench',
        features: ['ESP32 Mesh Networking', 'LoRa Long-Range Communication', 'Cloud Dashboard Integration', 'Hardware Relay Automation'],
        timeline: '3 - 6 Weeks',
        priceRange: 'Custom Quote',
        order: 3,
      },
    ]);

    // 9. Blog
    await Blog.create([
      {
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
    ]);

    // 10. Gallery
    await Gallery.create([
      { title: 'AI & Embedded Systems Lab', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80', category: 'Workspaces', caption: 'Hardware prototyping & Python AI development station.', order: 1 },
    ]);

    // 11. Certificates
    await Certificate.create([
      { title: 'STEM Educator Certification', issuer: 'Cognospace', issueDate: 'Verified', credentialUrl: 'https://drive.google.com/file/d/11girkMGd2URS6j33Ef_D-Gv1We2I4zyj/view', image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80', order: 1 },
      { title: 'Robotics Internship Certification', issuer: 'IIT Bombay', issueDate: 'Verified', credentialUrl: 'https://drive.google.com/file/d/15QNyMTHbg1T75Si9LGI08Xbssu8yjVcE/view', image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=600&q=80', order: 2 },
      { title: 'Embedded Systems Internship', issuer: 'Pantech Solutions', issueDate: 'Verified', credentialUrl: 'https://drive.google.com/file/d/15R2WfOpSbawqxMBEUFf15Ay5XpDInGNg/view', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80', order: 3 },
      { title: 'Software Development Internship', issuer: 'Syslabs Services LLP', issueDate: 'Verified', credentialUrl: 'https://drive.google.com/file/d/1sdSDA1aSb_3jy8ND9Y5Rg2ciJZKoAX68/view', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80', order: 4 },
    ]);

    // 12. Testimonials / Achievements
    await Testimonial.create([
      {
        name: 'Yuva Hackathon Winner',
        role: 'Grand Champion',
        company: 'State Hackathon Committee',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        quote: 'Awarded 1st Place for building intelligent automation and IoT systems under high-pressure hackathon conditions.',
        rating: 5,
        order: 1,
      },
    ]);

    // 13. Setting
    await Setting.create({
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
    });

    console.log('[Seed Completed Successfully]! Seeded content for Paramesh Rajuri');
    if (require.main === module) {
      process.exit(0);
    }
  } catch (error) {
    console.error('[Seed Error]:', error);
    if (require.main === module) {
      process.exit(1);
    }
  }
};

if (require.main === module) {
  seedDatabase();
}
