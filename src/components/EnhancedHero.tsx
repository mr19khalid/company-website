import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Shield, Award, Clock, Users } from 'lucide-react';
import { GradientButton, InteractiveBackground } from './ui/PremiumComponents';

const EnhancedHero: React.FC = () => {
  return (
    <InteractiveBackground className="relative min-h-screen overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-500/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"
      />

      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                PREMIUM CONSTRUCTION SERVICES
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Building Dreams,
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Crafting Excellence
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Transform your vision into reality with our premium construction services. 
              From concept to completion, we deliver exceptional quality with uncompromising attention to detail.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {[
                { value: '500+', label: 'Projects', icon: Award },
                { value: '98%', label: 'Satisfaction', icon: Shield },
                { value: '15+', label: 'Years', icon: Clock },
                { value: '50+', label: 'Experts', icon: Users },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 + 0.5 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Icon className="w-4 h-4 text-gray-500" />
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-6">
              <GradientButton size="lg" gradient="premium" className="group">
                Start Your Project
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </GradientButton>
              
              <button className="group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="text-white ml-1" size={20} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-white">Watch Our Story</div>
                  <div className="text-sm text-gray-300">3:45 min</div>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Right Content - 3D Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Card Shadow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/30 to-secondary-600/30 rounded-3xl blur-2xl" />
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
                {/* Card Header */}
                <div className="p-6 border-b border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <div className="text-sm text-gray-400">Project Preview</div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8">
                  {/* Project Image */}
                  <div className="relative mb-8 overflow-hidden rounded-xl">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&auto=format&fit=crop"
                      alt="Modern Construction"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-sm font-medium">Modern Villa Project</div>
                      <div className="text-xs opacity-80">Completed 2023</div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {[
                      { label: 'Timeline', value: '6 Months', color: 'from-blue-500 to-cyan-500' },
                      { label: 'Budget', value: '$425K', color: 'from-green-500 to-emerald-500' },
                      { label: 'Team Size', value: '15 Experts', color: 'from-purple-500 to-pink-500' },
                      { label: 'Area', value: '3,500 sqft', color: 'from-orange-500 to-red-500' },
                    ].map((item, idx) => (
                      <div key={idx} className="text-center">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                          {item.value}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">{item.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Project Progress</span>
                      <span>85%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Client Testimonial */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                        alt="Client"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-bold text-white">Michael Chen</div>
                        <div className="text-sm text-gray-400">Property Owner</div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm italic">
                      "Exceptional work! The team delivered beyond our expectations with precision and professionalism."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl backdrop-blur-sm border border-white/10 p-4"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">🏆</div>
                <div className="text-xs text-gray-300 mt-1">Award 2023</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl backdrop-blur-sm border border-white/10 p-4"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">⭐</div>
                <div className="text-xs text-gray-300 mt-1">5.0 Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm text-gray-400">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-gray-400/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full mt-2" />
          </div>
        </div>
      </motion.div>
    </InteractiveBackground>
  );
};

export default EnhancedHero;