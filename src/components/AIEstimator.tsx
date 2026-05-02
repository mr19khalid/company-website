import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, TrendingUp, Target, Zap, Shield, Clock, DollarSign } from 'lucide-react';

interface AIEstimate {
  confidence: number;
  priceRange: { low: number; high: number; average: number };
  timeline: { min: string; max: string; average: string };
  risks: string[];
  recommendations: string[];
  similarProjects: Array<{
    name: string;
    cost: number;
    duration: string;
    similarity: number;
  }>;
  materialSuggestions: Array<{
    name: string;
    cost: number;
    durability: number;
    recommendation: string;
  }>;
}

const AIEstimator: React.FC = () => {
  const [projectDescription, setProjectDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [estimate, setEstimate] = useState<AIEstimate | null>(null);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const simulateAIEstimate = (description: string): AIEstimate => {
    // Simulate AI analysis - in real app, this would call an API
    const words = description.toLowerCase().split(' ');
    const hasKitchen = words.some(w => ['kitchen', 'cabinets', 'countertop'].includes(w));
    const hasBathroom = words.some(w => ['bathroom', 'shower', 'toilet'].includes(w));
    const hasPainting = words.some(w => ['paint', 'color', 'wall'].includes(w));
    
    const size = description.length > 200 ? 'large' : description.length > 100 ? 'medium' : 'small';
    
    let baseCost = 0;
    if (hasKitchen) baseCost += 25000;
    if (hasBathroom) baseCost += 15000;
    if (hasPainting) baseCost += 5000;
    
    if (size === 'large') baseCost *= 1.5;
    if (size === 'small') baseCost *= 0.7;

    return {
      confidence: Math.min(95, 70 + Math.random() * 25),
      priceRange: {
        low: Math.round(baseCost * 0.8),
        high: Math.round(baseCost * 1.2),
        average: Math.round(baseCost)
      },
      timeline: {
        min: `${Math.round(baseCost / 5000)} weeks`,
        max: `${Math.round(baseCost / 3000)} weeks`,
        average: `${Math.round(baseCost / 4000)} weeks`
      },
      risks: [
        'Potential structural changes needed',
        'Material availability may affect timeline',
        'Weather conditions for exterior work'
      ],
      recommendations: [
        'Consider phased approach for large projects',
        'Schedule inspection before final estimate',
        'Order materials 2 weeks in advance'
      ],
      similarProjects: [
        { name: 'Kitchen Remodel - Downtown', cost: 28500, duration: '6 weeks', similarity: 92 },
        { name: 'Bathroom Renovation', cost: 12500, duration: '4 weeks', similarity: 85 },
        { name: 'Whole House Painting', cost: 8200, duration: '3 weeks', similarity: 78 }
      ],
      materialSuggestions: [
        { name: 'Quartz Countertops', cost: 85, durability: 95, recommendation: 'High' },
        { name: 'LED Lighting', cost: 45, durability: 90, recommendation: 'Medium' },
        { name: 'Smart Home Wiring', cost: 120, durability: 98, recommendation: 'Low' }
      ]
    };
  };

  const handleEstimate = () => {
    if (!projectDescription.trim()) return;
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          const aiEstimate = simulateAIEstimate(projectDescription);
          setEstimate(aiEstimate);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedImages(prev => [...prev, ...files.slice(0, 5)]);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <Brain className="text-white" size={32} />
          </div>
          <span className="text-purple-600 font-semibold">AI POWERED</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">
            Intelligent Project Estimator
          </h2>
          <p className="text-gray-600">
            Our AI analyzes thousands of similar projects to give you the most accurate estimate possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Describe Your Project</h3>
              
              {/* Project Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe your project in detail. Include room sizes, materials you want, and any specific requirements..."
                />
                <div className="text-sm text-gray-500 mt-2">
                  {projectDescription.length}/500 characters
                </div>
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Reference Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-purple-600 font-medium">Click to upload images</span>
                    <span className="text-gray-500 text-sm mt-1">PNG, JPG up to 5MB each</span>
                  </label>
                </div>
                
                {/* Uploaded Images Preview */}
                {uploadedImages.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {uploadedImages.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Upload ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== index))}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Estimation Time</div>
                  <div className="font-bold">~20 seconds</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Accuracy</div>
                  <div className="font-bold">90%+</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Data Points</div>
                  <div className="font-bold">5000+</div>
                </div>
              </div>

              <button
                onClick={handleEstimate}
                disabled={isAnalyzing || !projectDescription.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    Analyzing... {analysisProgress}%
                  </div>
                ) : (
                  'Generate AI Estimate'
                )}
              </button>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-6">
              <h4 className="font-bold text-lg mb-4 flex items-center">
                <Cpu className="mr-2" size={20} />
                How Our AI Works
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                  Analyzes 5000+ similar projects
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                  Considers local material costs
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                  Accounts for seasonal factors
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                  Learns from new project data
                </li>
              </ul>
            </div>
          </div>

          {/* Results Panel */}
          <div>
            {isAnalyzing ? (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 relative">
                    <div className="absolute inset-0 border-4 border-purple-100 rounded-full" />
                    <div 
                      className="absolute inset-2 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"
                      style={{ animationDuration: '1s' }}
                    />
                    <Brain className="absolute inset-4 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">AI Analysis in Progress</h3>
                  
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Processing images...</span>
                      <span>{analysisProgress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                        style={{ width: `${analysisProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Analysis Steps */}
                  <div className="space-y-4">
                    {[
                      { step: 'Text Analysis', active: analysisProgress > 20 },
                      { step: 'Image Recognition', active: analysisProgress > 40 },
                      { step: 'Cost Calculation', active: analysisProgress > 60 },
                      { step: 'Timeline Estimation', active: analysisProgress > 80 },
                      { step: 'Generating Report', active: analysisProgress >= 100 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3
                          ${item.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          {item.active ? '✓' : index + 1}
                        </div>
                        <span className={item.active ? 'font-medium' : 'text-gray-500'}>
                          {item.step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : estimate ? (
              <div className="space-y-6">
                {/* Confidence Score */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">AI Confidence Score</h3>
                    <div className="text-3xl font-bold text-purple-600">{estimate.confidence}%</div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"
                      style={{ width: `${estimate.confidence}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>

                {/* Price Estimate */}
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <DollarSign className="mr-2" size={20} />
                    Estimated Cost
                  </h3>
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold mb-2">
                      ${estimate.priceRange.average.toLocaleString()}
                    </div>
                    <div className="text-blue-100">
                      Range: ${estimate.priceRange.low.toLocaleString()} - ${estimate.priceRange.high.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/20 rounded-lg">
                      <div className="text-sm opacity-90">Timeline</div>
                      <div className="font-bold">{estimate.timeline.average}</div>
                    </div>
                    <div className="text-center p-3 bg-white/20 rounded-lg">
                      <div className="text-sm opacity-90">Similar Projects</div>
                      <div className="font-bold">{estimate.similarProjects.length}</div>
                    </div>
                  </div>
                </div>

                {/* Similar Projects */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="font-bold text-lg mb-4">Similar Completed Projects</h3>
                  <div className="space-y-4">
                    {estimate.similarProjects.map((project, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-gray-600">{project.duration} • {project.similarity}% match</div>
                        </div>
                        <div className="font-bold">${project.cost.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Material Suggestions */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="font-bold text-lg mb-4">AI Material Recommendations</h3>
                  <div className="space-y-4">
                    {estimate.materialSuggestions.map((material, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium">{material.name}</div>
                          <div className="text-sm text-gray-600">
                            Durability: {material.durability}/100 • ${material.cost}/unit
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium
                          ${material.recommendation === 'High' ? 'bg-green-100 text-green-700' :
                            material.recommendation === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'}`}>
                          {material.recommendation} Priority
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-white border-2 border-purple-600 text-purple-600 py-3 rounded-lg font-bold hover:bg-purple-50">
                    Save Estimate
                  </button>
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:opacity-90">
                    Schedule Detailed Inspection
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Target className="text-gray-400" size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Get AI-Powered Estimate</h3>
                <p className="text-gray-600 mb-6">
                  Describe your project on the left to receive an intelligent estimate based on thousands of similar projects.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>90%+ accuracy rate</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Shield className="w-5 h-5 text-green-500 mr-2" />
                    <span>Data-driven recommendations</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
                    <span>5000+ project database</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIEstimator;
export {};
