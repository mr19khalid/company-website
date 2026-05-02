import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paintbrush, Hammer, Building2, Home, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { GlassCard, SectionHeader, FloatingServiceCard } from './ui/PremiumComponents';

const EnhancedServices: React.FC = () => {

    
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: <Paintbrush size={28} />,
      title: 'Premium Painting',
      description: 'Transform spaces with our expert painting services using premium materials and techniques.',
      features: ['Color Consultation', 'Surface Preparation', 'Premium Paints', 'Clean Finish'],
      stats: { projects: 250, satisfaction: 99, timeline: '3-5 Days' }
    },
    {
      icon: <Hammer size={28} />,
      title: 'Custom Woodwork',
      description: 'Bespoke carpentry solutions crafted with precision and attention to detail.',
      features: ['Custom Design', 'Fine Materials', 'Precision Crafting', 'Quality Finish'],
      stats: { projects: 180, satisfaction: 98, timeline: '2-4 Weeks' }
    },
    {
      icon: <Building2 size={28} />,
      title: 'Construction',
      description: 'Complete construction solutions from foundation to finishing touches.',
      features: ['Project Management', 'Quality Materials', 'Timely Delivery', 'Post-Support'],
      stats: { projects: 120, satisfaction: 97, timeline: '3-6 Months' }
    },
    {
      icon: <Home size={28} />,
      title: 'Renovation',
      description: 'Transform existing spaces into modern, functional, and beautiful environments.',
      features: ['Design Planning', 'Structural Work', 'Modern Fixtures', 'Complete Makeover'],
      stats: { projects: 95, satisfaction: 96, timeline: '1-3 Months' }
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-white" />
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary-500/5 to-transparent" />
      
      <div className="container-custom relative z-10">
        <SectionHeader
          title="Our Premium Services"
          subtitle="Experience excellence in every project with our comprehensive construction solutions"
          centered
        />

        {/* Service Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {services.map((service, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveService(index)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeService === index
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:border-primary-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  activeService === index ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  {service.icon}
                </div>
                <span>{service.title}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Service Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left - Service Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full mb-4">
                <Zap className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-primary-600">
                  Premium Service
                </span>
              </div>
              <h3 className="text-4xl font-bold mb-4">
                {services[activeService].title}
              </h3>
              <p className="text-xl text-gray-600 mb-8">
                {services[activeService].description}
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              {services[activeService].features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="text-primary-600" size={20} />
                  </div>
                  <span className="font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {Object.entries(services[activeService].stats).map(([key, value], idx) => (
                <GlassCard key={idx} className="text-center p-6">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    {value}
                  </div>
                  <div className="text-sm text-gray-600 capitalize mt-2">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-6">
              <button className="group flex-1 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-3">
                Request Service
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-primary-500 hover:text-primary-600 transition-colors">
                View Portfolio
              </button>
            </div>
          </motion.div>

          {/* Right - Service Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            {/* Floating Card */}
            <div className="relative h-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-3xl blur-2xl" />
              
              <GlassCard className="h-full overflow-hidden">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={`https://images.unsplash.com/photo-${activeService === 0 ? '1589939705384' : activeService === 1 ? '1497366754035' : activeService === 2 ? '1545324418' : '1566665797739'}?w=1200&auto=format&fit=crop`}
                    alt={services[activeService].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-bold">
                      Featured Project
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-2xl font-bold">{services[activeService].title}</div>
                      <div className="text-gray-600">Case Study: Modern Residence</div>
                    </div>
                    <div className="text-4xl">🏆</div>
                  </div>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Client Satisfaction</span>
                      <span>{services[activeService].stats.satisfaction}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${services[activeService].stats.satisfaction}%` }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-r from-primary-500/5 to-transparent rounded-xl">
                      <div className="text-sm text-gray-600">Timeline</div>
                      <div className="text-xl font-bold">{services[activeService].stats.timeline}</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-secondary-500/5 to-transparent rounded-xl">
                      <div className="text-sm text-gray-600">Budget Range</div>
                      <div className="text-xl font-bold">
                        ${activeService === 0 ? '5K-20K' : activeService === 1 ? '10K-50K' : activeService === 2 ? '50K-500K' : '20K-100K'}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-2xl">⭐</div>
                  <div className="text-xs text-gray-700">5 Stars</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* All Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <FloatingServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedServices;