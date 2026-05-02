import React from 'react';
import { motion } from 'framer-motion';

// Glass Morphism Card
export const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}> = ({ children, className = '', hover = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={hover ? { y: -5, scale: 1.02 } : {}}
    className={`relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl ${className}`}
    style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5" />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

// Gradient Button
export const GradientButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  gradient?: 'primary' | 'secondary' | 'success' | 'premium';
}> = ({ children, onClick, className = '', size = 'md', gradient = 'primary' }) => {
  const gradients = {
    primary: 'from-primary-600 via-primary-500 to-primary-700',
    secondary: 'from-secondary-600 via-secondary-500 to-secondary-700',
    success: 'from-green-600 via-emerald-500 to-teal-600',
    premium: 'from-purple-600 via-pink-500 to-rose-600'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl font-bold text-white ${sizes[size]} ${className}`}
      style={{
        background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${gradients[gradient]} animate-gradient-x`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

// Animated Section Header
export const SectionHeader: React.FC<{
  title: string;
  subtitle: string;
  centered?: boolean;
}> = ({ title, subtitle, centered = true }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="inline-block mb-4"
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg blur opacity-30" />
        <h2 className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
    </motion.div>
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-xl text-gray-600 max-w-3xl mx-auto"
    >
      {subtitle}
    </motion.p>
  </div>
);

// Floating Service Card
export const FloatingServiceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay?: number;
}> = ({ icon, title, description, features, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotateX: -10 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    whileHover={{ y: -10, scale: 1.02 }}
    transition={{ delay: delay * 0.1 }}
    className="relative group"
  >
    <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <GlassCard hover={false}>
      <div className="p-8">
        <div className="relative">
          <div className="absolute -top-12 -left-4 w-24 h-24 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-2xl" />
          <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mb-6 relative z-10">
            <div className="text-white text-2xl">{icon}</div>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="space-y-3">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mr-3" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/20">
          <button className="w-full py-3 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-600 rounded-lg font-semibold hover:from-primary-500/20 hover:to-secondary-500/20 transition-all">
            Learn More →
          </button>
        </div>
      </div>
    </GlassCard>
  </motion.div>
);

// Interactive Background
export const InteractiveBackground: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`relative overflow-hidden ${className}`}>
    {/* Animated gradient background */}
    <div className="absolute inset-0">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-secondary-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
    </div>
    
    {/* Grid pattern */}
    <div className="absolute inset-0 bg-grid-white/10 bg-grid-16" />
    
    {/* Content */}
    <div className="relative z-10">{children}</div>
  </div>
);
export {};
