import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/services';
import { Paintbrush, Hammer, Building2, Home } from 'lucide-react';

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(0);

  const iconComponents = {
    '🎨': Paintbrush,
    '🪚': Hammer,
    '🏗️': Building2,
    '🏠': Home,
  };

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-semibold">OUR SERVICES</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">
            Comprehensive Construction Solutions
          </h2>
          <p className="text-gray-600">
            From painting to complete construction, we provide end-to-end 
            solutions with professional expertise and quality craftsmanship.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = iconComponents[service.icon as keyof typeof iconComponents] || Home;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveService(index)}
                className={`bg-white rounded-xl p-6 shadow-lg cursor-pointer transition-all duration-300 
                          ${activeService === index ? 'ring-2 ring-primary-500 transform -translate-y-2' : 'hover:shadow-xl'}`}
              >
                <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="text-primary-600" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Active Service Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    {services[activeService].title}
                  </h3>
                  <p className="text-gray-700 mb-6">
                    {services[activeService].details}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {services[activeService].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary">
                    Request Service
                  </button>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${activeService === 0 ? '1589939705384' : activeService === 1 ? '1497366754035' : activeService === 2 ? '1545324418' : '1566665797739'}?w=800`}
                    alt={services[activeService].title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;