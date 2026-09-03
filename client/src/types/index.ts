export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'superadmin';
  avatar?: string;
}

export interface HeroData {
  _id?: string;
  greeting: string;
  name: string;
  titles: string[];
  bio: string;
  availability: string;
  yearsOfExp: string;
  projectsCompleted: string;
  happyClients: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
}

export interface AboutData {
  _id?: string;
  summary: string;
  story: string;
  profileImage: string;
  coreValues: { title: string; desc: string }[];
  highlights: string[];
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  techStack: string[];
  thumbnail: string;
  images: string[];
  videoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  metrics?: { label: string; value: string }[];
  timeline?: string;
  createdAt?: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
  level: string;
  icon: string;
  color: string;
  featured: boolean;
  order: number;
}

export interface Experience {
  _id: string;
  role: string;
  company: string;
  companyLogo?: string;
  location?: string;
  type: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  skills: string[];
  order: number;
}

export interface Education {
  _id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string;
  cgpa?: string;
  coursework: string[];
  description: string;
  order: number;
}

export interface Service {
  _id: string;
  title: string;
  shortDesc: string;
  description: string;
  icon: string;
  features: string[];
  timeline: string;
  priceRange?: string;
  order: number;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  readingTime: string;
  published: boolean;
  featured: boolean;
  views: number;
  publishedAt?: string;
}

export interface GalleryItem {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
  caption: string;
  order: number;
}

export interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  image: string;
  order: number;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  order: number;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: string;
}

export interface SiteSettings {
  _id?: string;
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
  author: string;
  contactEmail: string;
  location: string;
  soundEffects: boolean;
  maintenanceMode: boolean;
  socialLinks: { platform: string; url: string }[];
}

export interface DashboardStats {
  totalProjects: number;
  totalBlogs: number;
  totalMessages: number;
  unreadMessages: number;
  pageviewsChart: { date: string; views: number }[];
  topPages: { path: string; views: number }[];
}
