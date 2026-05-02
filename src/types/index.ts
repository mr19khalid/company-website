export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  details: string;
}

export interface Project {
  id: number;
  title: string;
  category: 'painting' | 'woodwork' | 'construction' | 'all';
  description: string;
  imageUrl: string;
  beforeImage?: string;
  afterImage?: string;
  date: string;
  client: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  expertise: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  project: string;
  imageUrl: string;
}
export {};
