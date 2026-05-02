import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Ruler, DollarSign, Paintbrush, Hammer, Building2, Home, Check } from 'lucide-react';

interface Calculation {
  service: string;
  area: number;
  complexity: 'simple' | 'medium' | 'complex';
  materials: 'basic' | 'premium' | 'luxury';
  timeline: 'standard' | 'rush';
  extras: string[];
}

const ServiceCalculator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [calculation, setCalculation] = useState<Calculation>({
    service: 'painting',
    area: 1000,
    complexity: 'medium',
    materials: 'premium',
    timeline: 'standard',
    extras: [],
  });
  const [estimate, setEstimate] = useState({
    basePrice: 0,
    materialCost: 0,
    laborCost: 0,
    extrasCost: 0,
    total: 0,
    timeline: '3-4 weeks',
  });

  const services = [
    { id: 'painting', label: 'Painting', icon: Paintbrush, baseRate: 3.5 },
    { id: 'woodwork', label: 'Wood Work', icon: Hammer, baseRate: 75 },
    { id: 'construction', label: 'Construction', icon: Building2, baseRate: 150 },
    { id: 'renovation', label: 'Renovation', icon: Home, baseRate: 125 },
  ];

  const complexities = [
    { id: 'simple', label: 'Simple', multiplier: 0.8 },
    { id: 'medium', label: 'Medium', multiplier: 1 },
    { id: 'complex', label: 'Complex', multiplier: 1.5 },
  ];

  const materialTiers = [
    { id: 'basic', label: 'Basic', multiplier: 0.9 },
    { id: 'premium', label: 'Premium', multiplier: 1.2 },
    { id: 'luxury', label: 'Luxury', multiplier: 1.8 },
  ];

  const extrasOptions = [
    { id: 'design', label: 'Design Consultation', cost: 500 },
    { id: 'permits', label: 'Permit Handling', cost: 300 },
    { id: 'cleanup', label: 'Post-Construction Cleanup', cost: 200 },
    { id: 'warranty', label: 'Extended Warranty', cost: 800 },
    { id: 'eco', label: 'Eco-Friendly Materials', cost: 400 },
    { id: 'smart', label: 'Smart Home Integration', cost: 1500 },
  ];

  useEffect(() => {
    calculateEstimate();
  }, [calculation]);

  const calculateEstimate = () => {
    const service = services.find(s => s.id === calculation.service);
    if (!service) return;

    const complexity = complexities.find(c => c.id === calculation.complexity);
    const materials = materialTiers.find(m => m.id === calculation.materials);
    const timelineMultiplier = calculation.timeline === 'rush' ? 1.3 : 1;

    let basePrice = service.baseRate * calculation.area;
    if (service.id !== 'painting') basePrice = service.baseRate * (calculation.area / 100);

    const materialCost = basePrice * (materials?.multiplier || 1) - basePrice;
    const laborCost = basePrice * (complexity?.multiplier || 1) - basePrice;
    
    const extrasCost = calculation.extras.reduce((sum, extraId) => {
      const extra = extrasOptions.find(e => e.id === extraId);
      return sum + (extra?.cost || 0);
    }, 0);

    const total = basePrice + materialCost + laborCost + extrasCost;

    // Calculate timeline
    let weeks = Math.ceil(calculation.area / 500) * (complexity?.multiplier || 1);
    if (calculation.timeline === 'rush') weeks = Math.max(1, weeks * 0.7);
    const timeline = `${Math.ceil(weeks)}-${Math.ceil(weeks * 1.2)} weeks`;

    setEstimate({
      basePrice,
      materialCost,
      laborCost,
      extrasCost,
      total,
      timeline,
    });
  };

  const steps = [
    { number: 1, title: 'Select Service' },
    { number: 2, title: 'Project Details' },
    { number: 3, title: 'Materials & Extras' },
    { number: 4, title: 'Get Quote' },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Calculator className="text-primary-600" size={32} />
          </div>
          <span className="text-primary-600 font-semibold">ESTIMATE TOOL</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">
            Instant Project Calculator
          </h2>
          <p className="text-gray-600">
            Get an accurate estimate for your project in minutes. Adjust parameters to see how they affect cost and timeline.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-between mb-12 relative">
            {steps.map((s, index) => (
              <React.Fragment key={s.number}>
                <div className="flex flex-col items-center z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                    ${step >= s.number ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step > s.number ? <Check size={24} /> : s.number}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${step >= s.number ? 'text-primary-600' : 'text-gray-500'}`}>
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`absolute top-6 left-1/4 right-1/4 h-1 -translate-y-1/2
                    ${step > s.number ? 'bg-primary-600' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Calculator Content */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-3">
              {/* Input Panel */}
              <div className="lg:col-span-2 p-8">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-8"
                    >
                      <h3 className="text-2xl font-bold mb-6">Select Your Service</h3>
                      <div className="grid sm:grid-cols-2 gap-6">
                        {services.map(service => {
                          const Icon = service.icon;
                          return (
                            <button
                              key={service.id}
                              onClick={() => setCalculation({...calculation, service: service.id})}
                              className={`p-6 rounded-xl border-2 text-left transition-all
                                ${calculation.service === service.id 
                                  ? 'border-primary-600 bg-primary-50' 
                                  : 'border-gray-200 hover:border-primary-300'}`}
                            >
                              <div className="flex items-center mb-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4
                                  ${calculation.service === service.id ? 'bg-primary-600' : 'bg-gray-100'}`}>
                                  <Icon className={calculation.service === service.id ? 'text-white' : 'text-gray-600'} size={24} />
                                </div>
                                <span className="font-bold text-lg">{service.label}</span>
                              </div>
                              <p className="text-gray-600 text-sm">
                                Base rate: ${service.baseRate} per {service.id === 'painting' ? 'sq.ft' : 'sq.ft'}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-8"
                    >
                      <h3 className="text-2xl font-bold mb-6">Project Details</h3>
                      
                      {/* Area Input */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <label className="font-medium">Project Area</label>
                          <span className="text-2xl font-bold text-primary-600">
                            {calculation.area.toLocaleString()} sq.ft
                          </span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="10000"
                          step="100"
                          value={calculation.area}
                          onChange={(e) => setCalculation({...calculation, area: parseInt(e.target.value)})}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>100 sq.ft</span>
                          <span>10,000 sq.ft</span>
                        </div>
                      </div>

                      {/* Complexity */}
                      <div>
                        <h4 className="font-medium mb-4">Project Complexity</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {complexities.map(comp => (
                            <button
                              key={comp.id}
                              onClick={() => setCalculation({...calculation, complexity: comp.id as any})}
                              className={`p-4 rounded-lg border-2 text-center
                                ${calculation.complexity === comp.id 
                                  ? 'border-primary-600 bg-primary-50' 
                                  : 'border-gray-200 hover:border-primary-300'}`}
                            >
                              <div className="font-medium">{comp.label}</div>
                              <div className="text-sm text-gray-600 mt-1">
                                {comp.multiplier === 0.8 ? 'Easiest' : 
                                 comp.multiplier === 1 ? 'Standard' : 'Most Complex'}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Timeline */}
                      <div>
                        <h4 className="font-medium mb-4">Project Timeline</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { id: 'standard', label: 'Standard', desc: 'Normal pace' },
                            { id: 'rush', label: 'Rush', desc: '30% faster (+30% cost)' },
                          ].map(option => (
                            <button
                              key={option.id}
                              onClick={() => setCalculation({...calculation, timeline: option.id as any})}
                              className={`p-4 rounded-lg border-2 text-center
                                ${calculation.timeline === option.id 
                                  ? 'border-primary-600 bg-primary-50' 
                                  : 'border-gray-200 hover:border-primary-300'}`}
                            >
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-8"
                    >
                      <h3 className="text-2xl font-bold mb-6">Materials & Extras</h3>
                      
                      {/* Material Tier */}
                      <div>
                        <h4 className="font-medium mb-4">Material Quality</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {materialTiers.map(tier => (
                            <button
                              key={tier.id}
                              onClick={() => setCalculation({...calculation, materials: tier.id as any})}
                              className={`p-4 rounded-lg border-2 text-center
                                ${calculation.materials === tier.id 
                                  ? 'border-primary-600 bg-primary-50' 
                                  : 'border-gray-200 hover:border-primary-300'}`}
                            >
                              <div className="font-medium">{tier.label}</div>
                              <div className="text-sm text-gray-600 mt-1">
                                {tier.multiplier === 0.9 ? '-10%' : 
                                 tier.multiplier === 1.2 ? '+20%' : '+80%'}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Extras */}
                      <div>
                        <h4 className="font-medium mb-4">Additional Services</h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {extrasOptions.map(extra => (
                            <label
                              key={extra.id}
                              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer
                                ${calculation.extras.includes(extra.id)
                                  ? 'border-primary-600 bg-primary-50' 
                                  : 'border-gray-200 hover:border-primary-300'}`}
                            >
                              <input
                                type="checkbox"
                                checked={calculation.extras.includes(extra.id)}
                                onChange={(e) => {
                                  const newExtras = e.target.checked
                                    ? [...calculation.extras, extra.id]
                                    : calculation.extras.filter(id => id !== extra.id);
                                  setCalculation({...calculation, extras: newExtras});
                                }}
                                className="mr-3 w-5 h-5 text-primary-600 rounded"
                              />
                              <div className="flex-1">
                                <div className="font-medium">{extra.label}</div>
                                <div className="text-sm text-gray-600">+${extra.cost.toLocaleString()}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-8"
                    >
                      <h3 className="text-2xl font-bold mb-6">Your Custom Quote</h3>
                      
                      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-xl">
                        <div className="text-center mb-6">
                          <div className="text-5xl font-bold text-primary-600 mb-2">
                            ${estimate.total.toLocaleString()}
                          </div>
                          <div className="text-gray-600">Estimated Total Cost</div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Base Price</span>
                            <span className="font-medium">${estimate.basePrice.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Material Upgrade</span>
                            <span className="font-medium text-green-600">+${estimate.materialCost.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Labor (Complexity)</span>
                            <span className="font-medium text-green-600">+${estimate.laborCost.toLocaleString()}</span>
                          </div>
                          {estimate.extrasCost > 0 && (
                            <div className="flex justify-between">
                              <span>Additional Services</span>
                              <span className="font-medium text-green-600">+${estimate.extrasCost.toLocaleString()}</span>
                            </div>
                          )}
                          <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between text-lg font-bold">
                              <span>Total Estimate</span>
                              <span>${estimate.total.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="mt-8 p-4 bg-white rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Estimated Timeline</div>
                              <div className="text-gray-600">{estimate.timeline}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">Next Available</div>
                              <div className="text-gray-600">March 15, 2024</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center space-y-4">
                        <p className="text-gray-600">
                          This is an estimate. Final quote may vary based on site inspection.
                        </p>
                        <div className="flex gap-4 justify-center">
                          <button className="btn-primary">
                            Save & Print Quote
                          </button>
                          <button className="px-6 py-3 border-2 border-primary-600 text-primary-600 
                                        rounded-lg font-semibold hover:bg-primary-50">
                            Schedule Inspection
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between mt-12 pt-6 border-t">
                  <button
                    onClick={() => setStep(s => Math.max(1, s - 1))}
                    disabled={step === 1}
                    className={`px-6 py-3 rounded-lg font-medium
                      ${step === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    ← Back
                  </button>
                  
                  {step < 4 ? (
                    <button
                      onClick={() => setStep(s => Math.min(4, s + 1))}
                      className="btn-primary"
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      onClick={() => setStep(1)}
                      className="btn-primary"
                    >
                      Start New Estimate
                    </button>
                  )}
                </div>
              </div>

              {/* Summary Sidebar */}
              <div className="bg-gray-900 text-white p-8">
                <h3 className="text-xl font-bold mb-6">Project Summary</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-gray-400 text-sm mb-2">Selected Service</h4>
                    <div className="flex items-center">
                      {(() => {
                        const ServiceIcon = services.find(s => s.id === calculation.service)?.icon || Paintbrush;
                        return <ServiceIcon className="mr-3" size={20} />;
                      })()}
                      <span className="font-medium">
                        {services.find(s => s.id === calculation.service)?.label}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gray-400 text-sm mb-2">Project Size</h4>
                    <div className="flex items-center">
                      <Ruler className="mr-3" size={20} />
                      <span className="font-medium">
                        {calculation.area.toLocaleString()} sq.ft
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gray-400 text-sm mb-2">Complexity</h4>
                    <div className="font-medium">
                      {complexities.find(c => c.id === calculation.complexity)?.label}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-gray-400 text-sm mb-2">Materials</h4>
                    <div className="font-medium">
                      {materialTiers.find(m => m.id === calculation.materials)?.label} Tier
                    </div>
                  </div>

                  {calculation.extras.length > 0 && (
                    <div>
                      <h4 className="text-gray-400 text-sm mb-2">Extras Selected</h4>
                      <ul className="space-y-1">
                        {calculation.extras.map(extraId => (
                          <li key={extraId} className="text-sm">
                            • {extrasOptions.find(e => e.id === extraId)?.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Live Preview */}
                  <div className="pt-6 border-t border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Current Estimate</span>
                      <DollarSign size={20} />
                    </div>
                    <div className="text-3xl font-bold text-primary-400">
                      ${estimate.total.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      Updates in real-time
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCalculator;