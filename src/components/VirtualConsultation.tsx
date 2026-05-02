import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, UserCheck, FileText, CreditCard, Shield, CheckCircle, X } from 'lucide-react';

interface TimeSlot {
  id: string;
  time: string;
  date: string;
  available: boolean;
  consultant: string;
}

interface Consultant {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  rating: number;
  image: string;
}

const VirtualConsultation: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedConsultant, setSelectedConsultant] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    projectDescription: '',
  });
  const [consultationType, setConsultationType] = useState<'video' | 'phone' | 'onsite'>('video');

  const services = [
    { id: 'painting', label: 'Painting Consultation', duration: '30 min', price: 49 },
    { id: 'woodwork', label: 'Woodwork Design', duration: '45 min', price: 79 },
    { id: 'construction', label: 'Construction Planning', duration: '60 min', price: 99 },
    { id: 'full', label: 'Full Project Consultation', duration: '90 min', price: 149 },
  ];

  const consultants: Consultant[] = [
    {
      id: 'john',
      name: 'John Richardson',
      role: 'Senior Project Manager',
      expertise: ['Construction', 'Renovation'],
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    },
    {
      id: 'sarah',
      name: 'Sarah Chen',
      role: 'Design Specialist',
      expertise: ['Interior Design', 'Color Theory'],
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    },
    {
      id: 'mike',
      name: 'Mike Rodriguez',
      role: 'Woodwork Expert',
      expertise: ['Custom Carpentry', 'Fine Finishing'],
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
  ];

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    // Generate time slots for next 7 days
    const generateTimeSlots = () => {
      const slots: TimeSlot[] = [];
      const consultants = ['john', 'sarah', 'mike'];
      const startHour = 9;
      const endHour = 17;
      
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        
        for (let hour = startHour; hour < endHour; hour++) {
          const time = `${hour}:00`;
          const consultant = consultants[Math.floor(Math.random() * consultants.length)];
          slots.push({
            id: `${dateStr}-${time}`,
            time,
            date: day,
            available: Math.random() > 0.3, // 70% availability
            consultant,
          });
        }
      }
      return slots;
    };

    setTimeSlots(generateTimeSlots());
  }, []);

  const steps = [
    { number: 1, title: 'Select Service', icon: FileText },
    { number: 2, title: 'Choose Consultant', icon: UserCheck },
    { number: 3, title: 'Pick Time', icon: Calendar },
    { number: 4, title: 'Your Details', icon: UserCheck },
    { number: 5, title: 'Confirmation', icon: CheckCircle },
  ];

  const filteredTimeSlots = selectedConsultant 
    ? timeSlots.filter(slot => slot.consultant === selectedConsultant && slot.available)
    : timeSlots.filter(slot => slot.available);

  const selectedServiceData = services.find(s => s.id === selectedService);
  const selectedConsultantData = consultants.find(c => c.id === selectedConsultant);

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Video className="text-primary-600" size={32} />
          </div>
          <span className="text-primary-600 font-semibold">VIRTUAL CONSULTATION</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">
            Book Professional Consultation
          </h2>
          <p className="text-gray-600">
            Schedule a virtual meeting with our experts. Get professional advice from the comfort of your home.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Progress Steps */}
          <div className="border-b">
            <div className="flex justify-between p-6">
              {steps.map((s, index) => {
                const Icon = s.icon;
                return (
                  <div key={s.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold
                      ${step >= s.number ? 'bg-primary-600 border-primary-600 text-white' : 'border-gray-300 text-gray-400'}`}>
                      {step > s.number ? <CheckCircle size={20} /> : s.number}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-gray-500">Step {s.number}</div>
                      <div className={`font-medium ${step >= s.number ? 'text-primary-600' : 'text-gray-500'}`}>
                        {s.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${step > s.number ? 'bg-primary-600' : 'bg-gray-300'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-bold mb-6">Select Consultation Type</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map(service => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service.id);
                        setTimeout(() => setStep(2), 300);
                      }}
                      className={`p-6 rounded-xl border-2 text-left transition-all
                        ${selectedService === service.id 
                          ? 'border-primary-600 bg-primary-50' 
                          : 'border-gray-200 hover:border-primary-300'}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="font-bold text-lg">{service.label}</div>
                          <div className="text-gray-600">{service.duration} session</div>
                        </div>
                        <div className="text-2xl font-bold text-primary-600">${service.price}</div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Perfect for {service.id === 'full' ? 'complete project planning' : 
                                  service.id === 'construction' ? 'construction projects' :
                                  service.id === 'woodwork' ? 'woodwork designs' : 'painting projects'}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    <Shield className="mr-2 text-blue-500" size={20} />
                    Consultation Guarantee
                  </h4>
                  <p className="text-gray-700">
                    Consultation fee is fully refundable if you proceed with the project. 
                    Get expert advice with zero risk.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-bold mb-6">Choose Your Consultant</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {consultants.map(consultant => (
                    <button
                      key={consultant.id}
                      onClick={() => {
                        setSelectedConsultant(consultant.id);
                        setTimeout(() => setStep(3), 300);
                      }}
                      className={`p-6 rounded-xl border-2 text-center transition-all
                        ${selectedConsultant === consultant.id 
                          ? 'border-primary-600 bg-primary-50' 
                          : 'border-gray-200 hover:border-primary-300'}`}
                    >
                      <img
                        src={consultant.image}
                        alt={consultant.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <div className="font-bold text-lg">{consultant.name}</div>
                      <div className="text-gray-600 mb-2">{consultant.role}</div>
                      <div className="flex items-center justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(consultant.rating) 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'}`}
                          >
                            ★
                          </div>
                        ))}
                        <span className="ml-2 text-sm">{consultant.rating}</span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2">
                        {consultant.expertise.map(exp => (
                          <span key={exp} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-bold mb-6">Select Date & Time</h3>
                
                {/* Consultation Type */}
                <div>
                  <h4 className="font-medium mb-4">Consultation Format</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'video', label: 'Video Call', desc: 'Zoom/Meet' },
                      { id: 'phone', label: 'Phone Call', desc: 'Audio only' },
                      { id: 'onsite', label: 'On-site', desc: 'Additional fee may apply' },
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => setConsultationType(type.id as any)}
                        className={`p-4 rounded-lg border-2 text-center
                          ${consultationType === type.id 
                            ? 'border-primary-600 bg-primary-50' 
                            : 'border-gray-200 hover:border-primary-300'}`}
                      >
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-gray-600">{type.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <h4 className="font-medium mb-4">Available Time Slots</h4>
                  <div className="grid grid-cols-4 gap-3 max-h-96 overflow-y-auto p-2">
                    {filteredTimeSlots.map(slot => (
                      <button
                        key={slot.id}
                        onClick={() => {
                          setSelectedDate(slot.date);
                          setSelectedTime(slot.time);
                          setTimeout(() => setStep(4), 300);
                        }}
                        className={`p-3 rounded-lg border text-center
                          ${selectedDate === slot.date && selectedTime === slot.time
                            ? 'border-primary-600 bg-primary-50' 
                            : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div className="text-sm font-medium">{slot.date}</div>
                        <div className="text-lg font-bold">{slot.time}</div>
                        <div className="text-xs text-gray-500">
                          {consultants.find(c => c.id === slot.consultant)?.name.split(' ')[0]}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-bold mb-6">Your Information</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={userDetails.name}
                      onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={userDetails.email}
                      onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={userDetails.phone}
                      onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Address
                    </label>
                    <input
                      type="text"
                      value={userDetails.address}
                      onChange={(e) => setUserDetails({...userDetails, address: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="123 Main St, City"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    value={userDetails.projectDescription}
                    onChange={(e) => setUserDetails({...userDetails, projectDescription: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Briefly describe your project..."
                  />
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Consultation Scheduled!</h3>
                  <p className="text-gray-600">
                    Your consultation has been scheduled successfully.
                  </p>
                </div>

                {/* Confirmation Details */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-lg mb-4">Consultation Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service:</span>
                          <span className="font-medium">{selectedServiceData?.label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Consultant:</span>
                          <span className="font-medium">{selectedConsultantData?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date & Time:</span>
                          <span className="font-medium">{selectedDate} at {selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Format:</span>
                          <span className="font-medium capitalize">{consultationType} Call</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-4">Payment Summary</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Consultation Fee:</span>
                          <span className="font-medium">${selectedServiceData?.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax:</span>
                          <span className="font-medium">${(selectedServiceData?.price || 0) * 0.1}</span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span className="text-primary-600">
                              ${(selectedServiceData?.price || 0) * 1.1}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Shield className="text-blue-500 mr-3" size={24} />
                      <div>
                        <div className="font-medium">Secure Payment Processing</div>
                        <div className="text-sm text-gray-600">
                          Your payment is encrypted and secure. Fee is fully refundable if you proceed with the project.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <button className="btn-primary w-full max-w-md">
                    <CreditCard className="mr-2" size={20} />
                    Pay Now & Confirm Booking
                  </button>
                  <p className="text-gray-600 text-sm">
                    You'll receive a confirmation email with meeting details within 5 minutes.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between p-6 border-t">
            <button
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className={`px-6 py-3 rounded-lg font-medium
                ${step === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              ← Back
            </button>
            
            {step < 5 ? (
              <button
                onClick={() => setStep(s => Math.min(5, s + 1))}
                disabled={(step === 1 && !selectedService) || (step === 2 && !selectedConsultant) || 
                         (step === 3 && (!selectedDate || !selectedTime)) ||
                         (step === 4 && (!userDetails.name || !userDetails.email || !userDetails.phone))}
                className={`px-6 py-3 rounded-lg font-medium
                  ${(step === 1 && !selectedService) || (step === 2 && !selectedConsultant) || 
                    (step === 3 && (!selectedDate || !selectedTime)) ||
                    (step === 4 && (!userDetails.name || !userDetails.email || !userDetails.phone))
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'btn-primary'}`}
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={() => {
                  // Reset and start over
                  setStep(1);
                  setSelectedService('');
                  setSelectedConsultant('');
                  setSelectedDate('');
                  setSelectedTime('');
                  setUserDetails({ name: '', email: '', phone: '', address: '', projectDescription: '' });
                }}
                className="px-6 py-3 border-2 border-primary-600 text-primary-600 
                         rounded-lg font-medium hover:bg-primary-50"
              >
                Schedule Another Consultation
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualConsultation;
export {};
