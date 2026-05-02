import { Testimonial } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    company: "",
    content: "The painting team did an exceptional job on our entire house. They were professional, clean, and the quality exceeded our expectations!",
    rating: 5,
    project: "Complete House Painting",
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Owner",
    company: "Chen Enterprises",
    content: "Their construction team completed our office renovation ahead of schedule. The attention to detail was impressive.",
    rating: 5,
    project: "Office Renovation",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Interior Designer",
    company: "Design Studio",
    content: "The custom woodwork for our client's kitchen was flawless. True craftsmanship and excellent communication throughout.",
    rating: 5,
    project: "Custom Kitchen Cabinets",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
  }
];
export {};
