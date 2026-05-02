import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, Calendar, DollarSign, Star, MapPin, ExternalLink, Maximize2 } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string[];
  type: 'residential' | 'commercial';
  budget: 'low' | 'medium' | 'high';
  year: number;
  duration: string;
  location: string;
  rating: number;
  description: string;
  image: string;
  teamSize: number;
  challenges: string[];
  solutions: string[];
}

const AdvancedPortfolio: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    types: [] as string[],
    budgets: [] as string[],
    years: [] as number[],
  });
  const [sortBy, setSortBy] = useState<'newest' | 'budget' | 'rating'>('newest');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Modern Office Complex",
      category: ["construction", "renovation"],
      type: "commercial",
      budget: "high",
      year: 2024,
      duration: "12 months",
      location: "Downtown Business District",
      rating: 4.9,
      description: "Complete construction of a 10-story modern office building with sustainable features.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
      teamSize: 45,
      challenges: ["Tight urban site", "Zoning restrictions", "Noise control"],
      solutions: ["Prefabricated elements", "Extended work hours", "Community engagement"]
    },
    {
      id: 2,
      title: "Luxury Villa Renovation",
      category: ["renovation", "woodwork"],
      type: "residential",
      budget: "high",
      year: 2023,
      duration: "8 months",
      location: "Suburban Estate Area",
      rating: 4.8,
      description: "Complete renovation of a luxury villa with custom woodwork and smart home integration.",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      teamSize: 25,
      challenges: ["Heritage restrictions", "Complex designs", "Client overseas"],
      solutions: ["3D modeling", "Regular virtual updates", "Local project manager"]
    },
    {
      id: 3,
      title: "Restaurant Interior Design",
      category: ["painting", "woodwork"],
      type: "commercial",
      budget: "medium",
      year: 2023,
      duration: "3 months",
      location: "Historic District",
      rating: 4.7,
      description: "Complete interior overhaul including custom furniture and artistic painting.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      teamSize: 15,
      challenges: ["Historic preservation", "Fast timeline", "Multiple stakeholders"],
      solutions: ["Specialized craftsmen", "Parallel work streams", "Daily coordination"]
    }
  ];

  const categories = ["construction", "renovation", "painting", "woodwork"];
  const types = ["residential", "commercial"];
  const budgets = ["low", "medium", "high"];
  const years = [2024, 2023, 2022, 2021];

  const filteredProjects = projects
    .filter(project => {
      if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      if (selectedFilters.categories.length > 0 && 
          !selectedFilters.categories.some(cat => project.category.includes(cat))) {
        return false;
      }
      
      if (selectedFilters.types.length > 0 && 
          !selectedFilters.types.includes(project.type)) {
        return false;
      }
      
      if (selectedFilters.budgets.length > 0 && 
          !selectedFilters.budgets.includes(project.budget)) {
        return false;
      }
      
      if (selectedFilters.years.length > 0 && 
          !selectedFilters.years.includes(project.year)) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest': return b.year - a.year;
        case 'budget': {
          const budgetOrder = { low: 1, medium: 2, high: 3 };
          return budgetOrder[b.budget] - budgetOrder[a.budget];
        }
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

  const toggleFilter = (type: keyof typeof selectedFilters, value: string | number) => {
    setSelectedFilters(prev => {
      const current = prev[type] as (string | number)[];
      const newValue = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [type]: newValue };
    });
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary-600 font-semibold">PORTFOLIO</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">
            Advanced Project Showcase
          </h2>
          <p className="text-gray-600">
            Explore our portfolio with advanced filtering, sorting, and detailed project insights.
          </p>
        </div>

        {/* Advanced Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search projects by name, description, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                >
                  <List size={20} />
                </button>
              </div>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
                <option value="budget">Budget (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="mt-6">
            <div className="flex items-center gap-4 mb-4">
              <Filter size={20} className="text-gray-500" />
              <span className="font-medium">Filters:</span>
              
              {selectedFilters.categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleFilter('categories', cat)}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium flex items-center gap-1"
                >
                  {cat}
                  <span className="text-xs">×</span>
                </button>
              ))}
              
              {selectedFilters.types.map(type => (
                <button
                  key={type}
                  onClick={() => toggleFilter('types', type)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1"
                >
                  {type}
                  <span className="text-xs">×</span>
                </button>
              ))}
              
              {selectedFilters.budgets.map(budget => (
                <button
                  key={budget}
                  onClick={() => toggleFilter('budgets', budget)}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1"
                >
                  {budget}
                  <span className="text-xs">×</span>
                </button>
              ))}
              
              {selectedFilters.years.map(year => (
                <button
                  key={year}
                  onClick={() => toggleFilter('years', year)}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-1"
                >
                  {year}
                  <span className="text-xs">×</span>
                </button>
              ))}
              
              {(selectedFilters.categories.length > 0 || selectedFilters.types.length > 0 || 
                selectedFilters.budgets.length > 0 || selectedFilters.years.length > 0) && (
                <button
                  onClick={() => setSelectedFilters({ categories: [], types: [], budgets: [], years: [] })}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Filter Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h4 className="font-medium mb-2">Category</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.categories.includes(cat)}
                        onChange={() => toggleFilter('categories', cat)}
                        className="mr-2 w-4 h-4 text-primary-600 rounded"
                      />
                      <span className="text-sm capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Project Type</h4>
                <div className="space-y-2">
                  {types.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.types.includes(type)}
                        onChange={() => toggleFilter('types', type)}
                        className="mr-2 w-4 h-4 text-primary-600 rounded"
                      />
                      <span className="text-sm capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Budget Range</h4>
                <div className="space-y-2">
                  {budgets.map(budget => (
                    <label key={budget} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.budgets.includes(budget)}
                        onChange={() => toggleFilter('budgets', budget)}
                        className="mr-2 w-4 h-4 text-primary-600 rounded"
                      />
                      <span className="text-sm capitalize">{budget}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Year</h4>
                <div className="space-y-2">
                  {years.map(year => (
                    <label key={year} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.years.includes(year)}
                        onChange={() => toggleFilter('years', year)}
                        className="mr-2 w-4 h-4 text-primary-600 rounded"
                      />
                      <span className="text-sm">{year}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-600">
                Showing {filteredProjects.length} of {projects.length} projects
              </span>
            </div>
            <div className="text-gray-600">
              Sorted by: {sortBy === 'newest' ? 'Newest' : sortBy === 'rating' ? 'Rating' : 'Budget'}
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent hover:border-primary-500 hover:shadow-2xl transition-all
                  ${viewMode === 'list' ? 'flex' : ''}`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-64'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-black/60 text-white px-3 py-1 rounded-full">
                      <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{project.rating}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="flex flex-wrap gap-2">
                      {project.category.map(cat => (
                        <span key={cat} className="px-2 py-1 bg-primary-600 text-white text-xs rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${project.type === 'commercial' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {project.type}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-6">{project.description}</p>

                  <div className={`grid ${viewMode === 'list' ? 'grid-cols-4' : 'grid-cols-2'} gap-4 mb-6`}>
                    <div className="flex items-center">
                      <MapPin size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm">{project.year}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm capitalize">{project.budget} budget</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">{project.teamSize} team members</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button className="text-primary-600 font-medium hover:text-primary-700 flex items-center">
                      View Details
                      <ExternalLink size={16} className="ml-2" />
                    </button>
                    <span className="text-gray-500 text-sm">{project.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-bold">{selectedProject.title}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center">
                          <Star size={20} className="fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-medium">{selectedProject.rating}</span>
                        </div>
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                          {selectedProject.type}
                        </span>
                        <span className="text-gray-600">{selectedProject.year}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-gray-500 hover:text-gray-700 p-2"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2">
                      <div className="rounded-xl overflow-hidden mb-6">
                        <img
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          className="w-full h-64 object-cover"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <h4 className="font-bold text-lg mb-4">Project Challenges</h4>
                          <ul className="space-y-2">
                            {selectedProject.challenges.map((challenge, idx) => (
                              <li key={idx} className="flex items-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                                <span>{challenge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <h4 className="font-bold text-lg mb-4">Our Solutions</h4>
                          <ul className="space-y-2">
                            {selectedProject.solutions.map((solution, idx) => (
                              <li key={idx} className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                                <span>{solution}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-lg mb-4">Project Description</h4>
                        <p className="text-gray-700">{selectedProject.description}</p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div className="bg-primary-50 p-6 rounded-xl">
                        <h4 className="font-bold text-lg mb-4">Project Details</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-gray-600">Location</div>
                            <div className="font-medium">{selectedProject.location}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Duration</div>
                            <div className="font-medium">{selectedProject.duration}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Team Size</div>
                            <div className="font-medium">{selectedProject.teamSize} professionals</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Budget Range</div>
                            <div className="font-medium capitalize">{selectedProject.budget}</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                        <h4 className="font-bold text-lg mb-4">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.category.map(cat => (
                            <span key={cat} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white p-6 rounded-xl">
                        <h4 className="font-bold text-lg mb-4">Similar Projects</h4>
                        <p className="mb-4">Looking for something similar?</p>
                        <button className="w-full bg-white text-primary-600 py-3 rounded-lg font-bold hover:bg-gray-100">
                          Get a Quote for Similar Project
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AdvancedPortfolio;
export {};
