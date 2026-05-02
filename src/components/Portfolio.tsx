import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ExternalLink, ZoomIn } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'painting' | 'woodwork' | 'construction'>('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const categories = [
    { key: 'all', label: 'All Projects', count: projects.length },
    { key: 'painting', label: 'Painting', count: projects.filter(p => p.category === 'painting').length },
    { key: 'woodwork', label: 'Wood Work', count: projects.filter(p => p.category === 'woodwork').length },
    { key: 'construction', label: 'Construction', count: projects.filter(p => p.category === 'construction').length },
  ];

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-semibold">OUR WORK</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600">
            Explore our portfolio of completed projects showcasing our expertise 
            in painting, woodwork, and construction.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setFilter(category.key as any)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                filter === category.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
              <span className="ml-2 text-sm opacity-75">
                ({category.count})
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setSelectedProject(project.id)}
                    className="bg-white/90 p-3 rounded-full hover:bg-white transition-colors"
                  >
                    <ZoomIn size={24} />
                  </button>
                  <button className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-colors">
                    <ExternalLink size={24} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                    {project.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Client: {project.client}</span>
                  <span>{project.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-primary-600 text-primary-600 
                          rounded-lg font-semibold hover:bg-primary-50 transition-colors">
            View All Projects
          </button>
        </div>
      </div>

      {/* Modal for selected project */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold">
                  {projects.find(p => p.id === selectedProject)?.title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              {projects.find(p => p.id === selectedProject)?.beforeImage && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4">Before & After</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <img
                        src={projects.find(p => p.id === selectedProject)?.beforeImage}
                        alt="Before"
                        className="rounded-lg"
                      />
                      <p className="text-center mt-2 text-gray-600">Before</p>
                    </div>
                    <div>
                      <img
                        src={projects.find(p => p.id === selectedProject)?.afterImage}
                        alt="After"
                        className="rounded-lg"
                      />
                      <p className="text-center mt-2 text-gray-600">After</p>
                    </div>
                  </div>
                </div>
              )}
              
              <p className="text-gray-700">
                {projects.find(p => p.id === selectedProject)?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
export {};
