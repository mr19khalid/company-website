import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Mail, Key, Eye, EyeOff, Bell, Settings, LogOut, Home, FileText, Calendar, MessageCircle, CreditCard, Shield } from 'lucide-react';

interface ClientProject {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'upcoming';
  progress: number;
  lastUpdate: string;
  nextMilestone: string;
}

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'blueprint' | 'invoice' | 'permit';
  date: string;
  size: string;
}

const ClientPortal: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    projectType: ''
  });

  const clientProjects: ClientProject[] = [
    {
      id: '1',
      name: 'Kitchen Remodel',
      status: 'active',
      progress: 65,
      lastUpdate: '2 hours ago',
      nextMilestone: 'Cabinet Installation - Mar 20'
    },
    {
      id: '2',
      name: 'Bathroom Renovation',
      status: 'active',
      progress: 40,
      lastUpdate: '1 day ago',
      nextMilestone: 'Tile Work - Mar 25'
    },
    {
      id: '3',
      name: 'Exterior Painting',
      status: 'upcoming',
      progress: 10,
      lastUpdate: '1 week ago',
      nextMilestone: 'Color Selection - Apr 1'
    }
  ];

  const documents: Document[] = [
    { id: '1', name: 'Construction Contract', type: 'contract', date: '2024-01-15', size: '2.4 MB' },
    { id: '2', name: 'Architectural Blueprints', type: 'blueprint', date: '2024-01-20', size: '5.7 MB' },
    { id: '3', name: 'Invoice #001', type: 'invoice', date: '2024-02-01', size: '1.2 MB' },
    { id: '4', name: 'Building Permit', type: 'permit', date: '2024-01-25', size: '3.1 MB' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would call your authentication API
    setIsLoggedIn(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would call your registration API
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4">
              <Lock className="text-white" size={32} />
            </div>
            <span className="text-blue-600 font-semibold">CLIENT PORTAL</span>
            <h2 className="text-4xl font-bold mt-2 mb-4">
              Secure Client Access
            </h2>
            <p className="text-gray-600">
              Login to track your projects, view documents, and communicate with our team.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex border-b">
              <button
                onClick={() => setShowLogin(true)}
                className={`flex-1 py-4 font-medium text-lg ${showLogin ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                Login
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className={`flex-1 py-4 font-medium text-lg ${!showLogin ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                Register
              </button>
            </div>

            <div className="p-8">
              {showLogin ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        required
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="client@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={loginData.remember}
                        onChange={(e) => setLoginData({...loginData, remember: e.target.checked})}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="ml-2 text-gray-700">Remember me</span>
                    </label>
                    <a href="#" className="text-blue-600 hover:text-blue-700 text-sm">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-bold text-lg hover:opacity-90"
                  >
                    Login to Portal
                  </button>

                  <div className="text-center text-gray-600">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setShowLogin(false)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Register here
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          required
                          value={registerData.name}
                          onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="John Smith"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="email"
                          required
                          value={registerData.email}
                          onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={registerData.password}
                          onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type
                    </label>
                    <select
                      value={registerData.projectType}
                      onChange={(e) => setRegisterData({...registerData, projectType: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select project type</option>
                      <option value="painting">Painting</option>
                      <option value="renovation">Renovation</option>
                      <option value="construction">Construction</option>
                      <option value="woodwork">Wood Work</option>
                    </select>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Shield className="text-blue-500 mr-3 mt-1" size={20} />
                      <div>
                        <div className="font-medium text-blue-900">Secure Registration</div>
                        <div className="text-sm text-blue-700">
                          Your information is encrypted and protected. We'll never share your data.
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-bold text-lg hover:opacity-90"
                  >
                    Create Account
                  </button>

                  <div className="text-center text-gray-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setShowLogin(true)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Login here
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="text-blue-600" size={24} />
              </div>
              <h4 className="font-bold text-lg mb-2">Project Tracking</h4>
              <p className="text-gray-600">Real-time updates on your construction progress</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-blue-600" size={24} />
              </div>
              <h4 className="font-bold text-lg mb-2">Document Access</h4>
              <p className="text-gray-600">View contracts, invoices, and blueprints</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-blue-600" size={24} />
              </div>
              <h4 className="font-bold text-lg mb-2">Team Communication</h4>
              <p className="text-gray-600">Direct messaging with project managers</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Logged-in View
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom max-w-7xl">
        {/* Portal Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold">Client Portal</h2>
              <p className="text-gray-600">Welcome back, John Smith</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings size={24} />
              </button>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-white" size={32} />
                </div>
                <h3 className="font-bold text-lg">John Smith</h3>
                <p className="text-gray-600">VIP Client</p>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'projects', label: 'My Projects', icon: Home },
                  { id: 'documents', label: 'Documents', icon: FileText },
                  { id: 'schedule', label: 'Schedule', icon: Calendar },
                  { id: 'messages', label: 'Messages', icon: MessageCircle },
                  { id: 'payments', label: 'Payments', icon: CreditCard },
                  { id: 'settings', label: 'Settings', icon: Settings },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                        ${activeTab === item.id 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Projects</span>
                    <span className="font-bold">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending Messages</span>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Documents</span>
                    <span className="font-bold">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-2xl font-bold mb-6">My Projects</h3>
                  
                  <div className="space-y-6">
                    {clientProjects.map(project => (
                      <div key={project.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <h4 className="font-bold text-lg">{project.name}</h4>
                            <div className="flex items-center gap-4 mt-2">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium
                                ${project.status === 'active' ? 'bg-green-100 text-green-700' :
                                  project.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                                  'bg-blue-100 text-blue-700'}`}>
                                {project.status}
                              </span>
                              <span className="text-gray-600 text-sm">
                                Last update: {project.lastUpdate}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-blue-600">{project.progress}%</div>
                            <div className="text-sm text-gray-600">Progress</div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="text-sm text-gray-600">Next Milestone</div>
                            <div className="font-medium">{project.nextMilestone}</div>
                          </div>
                          <div className="flex gap-3">
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                              View Details
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                              Message Team
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-6">
                  <button className="p-6 bg-white rounded-2xl shadow-xl text-left hover:shadow-2xl transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <MessageCircle className="text-blue-600" size={24} />
                    </div>
                    <h4 className="font-bold text-lg mb-2">New Message</h4>
                    <p className="text-gray-600">Send a message to your project manager</p>
                  </button>
                  <button className="p-6 bg-white rounded-2xl shadow-xl text-left hover:shadow-2xl transition-shadow">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <FileText className="text-green-600" size={24} />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Upload File</h4>
                    <p className="text-gray-600">Share photos or documents with the team</p>
                  </button>
                  <button className="p-6 bg-white rounded-2xl shadow-xl text-left hover:shadow-2xl transition-shadow">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Calendar className="text-purple-600" size={24} />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Schedule Visit</h4>
                    <p className="text-gray-600">Request a site visit or meeting</p>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Documents</h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Upload Document
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Document Name</th>
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Size</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map(doc => (
                        <tr key={doc.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <FileText className="text-gray-400" size={20} />
                              <span className="font-medium">{doc.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm
                              ${doc.type === 'contract' ? 'bg-blue-100 text-blue-700' :
                                doc.type === 'blueprint' ? 'bg-purple-100 text-purple-700' :
                                doc.type === 'invoice' ? 'bg-green-100 text-green-700' :
                                'bg-yellow-100 text-yellow-700'}`}>
                              {doc.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{doc.date}</td>
                          <td className="py-3 px-4 text-gray-600">{doc.size}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button className="text-blue-600 hover:text-blue-700">
                                View
                              </button>
                              <button className="text-gray-600 hover:text-gray-700">
                                Download
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Add other tabs similarly... */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientPortal;