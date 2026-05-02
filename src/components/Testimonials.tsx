import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-semibold">TESTIMONIALS</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600">
            Hear from homeowners and businesses who trusted us with their projects.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8 relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 text-primary-100" size={40} />
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              {/* Client info */}
              <div className="flex items-center">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role}
                    {testimonial.company && `, ${testimonial.company}`}
                  </p>
                  <p className="text-primary-600 text-sm font-medium mt-1">
                    {testimonial.project}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "15+", label: "Years Experience" },
            { value: "500+", label: "Projects Completed" },
            { value: "200+", label: "Happy Clients" },
            { value: "24/7", label: "Support Available" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
export {};
