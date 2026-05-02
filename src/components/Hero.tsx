import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700/20 to-secondary-500/10" />
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Professional
              <span className="block text-primary-600">Construction &</span>
              <span className="block">Renovation Services</span>
            </h1>
            
            <p className="text-xl text-gray-600 mt-6 mb-8">
              One company for all your construction needs. Painting, woodwork, 
              and complete renovation services with unmatched quality and professionalism.
            </p>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {[
                "Licensed & Insured Professionals",
                "Free Consultation & Estimate",
                "Quality Guaranteed Work",
                "On-Time Project Completion"
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary flex items-center">
                Get Free Estimate
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button className="px-6 py-3 border-2 border-primary-600 text-primary-600 
                               rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                View Our Work
              </button>
            </div>
          </motion.div>

          {/* Image/Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="aspect-video rounded-lg overflow-hidden mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200"
                  alt="Construction Project"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-600">500+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">98%</div>
                  <div className="text-sm text-gray-600">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
export {};
