// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Activity, Users, Calendar, CheckCircle, AlertCircle, Clock, DollarSign, TrendingUp, Download, MessageSquare, Camera, FileText } from 'lucide-react';

// interface Project {
//   id: string;
//   name: string;
//   status: 'planning' | 'active' | 'on-hold' | 'completed';
//   progress: number;
//   budget: { spent: number; total: number };
//   timeline: { start: string; end: string; current: string };
//   team: Array<{ name: string; role: string; avatar: string }>;
//   tasks: Array<{ id: string; title: string; status: 'pending' | 'in-progress' | 'completed'; due: string }>;
//   updates: Array<{ date: string; message: string; user: string }>;
// }

// const ProjectDashboard: React.FC = () => {
//   const [selectedProject, setSelectedProject] = useState<string>('project-1');
//   const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'quarter'>('week');

//   const projects: Record<string, Project> = {
//     'project-1': {
//       id: 'project-1',
//       name: 'Modern Kitchen Remodel',
//       status: 'active',
//       progress: 65,
//       budget: { spent: 28500, total: 42000 },
//       timeline: { start: '2024-01-15', end: '2024-04-30', current: 'Week 8 of 16' },
//       team: [
//         { name: 'John Richardson', role: 'Project Manager', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
//         { name: 'Sarah Chen', role: 'Design Lead', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100' },
//         { name: 'Mike Rodriguez', role: 'Lead Carpenter', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
//       ],
//       tasks: [
//         { id: 't1', title: 'Cabinet Installation', status: 'in-progress', due: '2024-03-15' },
//         { id: 't2', title: 'Countertop Measurement', status: 'pending', due: '2024-03-18' },
//         { id: 't3', title: 'Electrical Rough-in', status: 'completed', due: '2024-03-10' },
//         { id: 't4', title: 'Plumbing Fixtures', status: 'in-progress', due: '2024-03-20' },
//       ],
//       updates: [
//         { date: 'Today, 10:30 AM', message: 'Cabinet delivery completed ahead of schedule', user: 'John Richardson' },
//         { date: 'Yesterday, 3:45 PM', message: 'Electrical inspection passed successfully', user: 'Mike Rodriguez' },
//         { date: 'Mar 12, 9:15 AM', message: 'Client approved final design changes', user: 'Sarah Chen' },
//       ]
//     },
//     'project-2': {
//       id: 'project-2',
//       name: 'Office Building Painting',
//       status: 'active',
//       progress: 40,
//       budget: { spent: 12500, total: 32000 },
//       timeline: { start: '2024-02-01', end: '2024-05-15', current: 'Week 6 of 15' },
//       team: [
//         { name: 'Alex Johnson', role: 'Project Manager', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
//         { name: 'Maria Garcia', role: 'Paint Supervisor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
//       ],
//       tasks: [
//         { id: 't5', title: 'Surface Preparation', status: 'completed', due: '2024-03-01' },
//         { id: 't6', title: 'Primer Application', status: 'in-progress', due: '2024-03-20' },
//         { id: 't7', title: 'First Coat Painting', status: 'pending', due: '2024-03-25' },
//       ],
//       updates: [
//         { date: 'Today, 8:45 AM', message: 'Primer application started on east wing', user: 'Maria Garcia' },
//         { date: 'Mar 13, 2:30 PM', message: 'Surface preparation completed 2 days early', user: 'Alex Johnson' },
//       ]
//     }
//   };

//   const currentProject = projects[selectedProject];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'active': return 'bg-green-100 text-green-800';
//       case 'planning': return 'bg-blue-100 text-blue-800';
//       case 'on-hold': return 'bg-yellow-100 text-yellow-800';
//       case 'completed': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getTaskStatusIcon = (status: string) => {
//     switch (status) {
//       case 'completed': return <CheckCircle className="text-green-500" size={16} />;
//       case 'in-progress': return <Activity className="text-blue-500" size={16} />;
//       case 'pending': return <Clock className="text-yellow-500" size={16} />;
//       default: return null;
//     }
//   };

//   return (
//     <section className="section-padding bg-gray-50">
//       <div className="container-custom max-w-7xl">
//         <div className="text-center max-w-3xl mx-auto mb-12">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4">
//             <Activity className="text-white" size={32} />
//           </div>
//           <span className="text-blue-600 font-semibold">LIVE TRACKING</span>
//           <h2 className="text-4xl font-bold mt-2 mb-4">
//             Project Management Dashboard
//           </h2>
//           <p className="text-gray-600">
//             Real-time tracking of your construction projects with live updates and team collaboration.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Project Overview */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Project Selector */}
//             <div className="bg-white rounded-2xl shadow-xl p-6">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                 <div>
//                   <h3 className="text-2xl font-bold">Active Projects</h3>
//                   <p className="text-gray-600">Select a project to view details</p>
//                 </div>
//                 <div className="flex gap-2">
//                   {Object.keys(projects).map(key => (
//                     <button
//                       key={key}
//                       onClick={() => setSelectedProject(key)}
//                       className={`px-4 py-2 rounded-lg font-medium transition-colors
//                         ${selectedProject === key 
//                           ? 'bg-blue-600 text-white' 
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                     >
//                       {projects[key].name.split(' ')[0]}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Project Header */}
//             <div className="bg-white rounded-2xl shadow-xl p-6">
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//                 <div>
//                   <div className="flex items-center gap-4 mb-2">
//                     <h3 className="text-2xl font-bold">{currentProject.name}</h3>
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentProject.status)}`}>
//                       {currentProject.status.toUpperCase()}
//                     </span>
//                   </div>
//                   <p className="text-gray-600">{currentProject.timeline.current}</p>
//                 </div>
                
//                 <div className="flex items-center gap-4">
//                   <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
//                     <MessageSquare size={20} />
//                     Message Team
//                   </button>
//                   <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                     <Camera size={20} />
//                     Add Photo
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Progress & Stats */}
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Progress */}
//               <div className="bg-white rounded-2xl shadow-xl p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h4 className="font-bold text-lg">Project Progress</h4>
//                   <span className="text-2xl font-bold text-blue-600">{currentProject.progress}%</span>
//                 </div>
//                 <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
//                   <div 
//                     className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
//                     style={{ width: `${currentProject.progress}%` }}
//                   />
//                 </div>
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <span>Start: {currentProject.timeline.start}</span>
//                   <span>End: {currentProject.timeline.end}</span>
//                 </div>
//               </div>

//               {/* Budget */}
//               <div className="bg-white rounded-2xl shadow-xl p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h4 className="font-bold text-lg">Budget Overview</h4>
//                   <div className="text-right">
//                     <div className="text-2xl font-bold text-green-600">
//                       ${currentProject.budget.spent.toLocaleString()}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       of ${currentProject.budget.total.toLocaleString()}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
//                   <div 
//                     className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
//                     style={{ width: `${(currentProject.budget.spent / currentProject.budget.total) * 100}%` }}
//                   />
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Spent</span>
//                   <span className="text-gray-600">
//                     ${(currentProject.budget.total - currentProject.budget.spent).toLocaleString()} remaining
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Tasks */}
//             <div className="bg-white rounded-2xl shadow-xl p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h4 className="font-bold text-lg">Current Tasks</h4>
//                 <button className="text-blue-600 hover:text-blue-700 font-medium">
//                   View All Tasks →
//                 </button>
//               </div>
//               <div className="space-y-4">
//                 {currentProject.tasks.map(task => (
//                   <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//                     <div className="flex items-center gap-4">
//                       {getTaskStatusIcon(task.status)}
//                       <div>
//                         <div className="font-medium">{task.title}</div>
//                         <div className="text-sm text-gray-600">Due: {task.due}</div>
//                       </div>
//                     </div>
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium
//                       ${task.status === 'completed' ? 'bg-green-100 text-green-700' :
//                         task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
//                         'bg-yellow-100 text-yellow-700'}`}>
//                       {task.status.replace('-', ' ')}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Team & Updates */}
//           <div className="space-y-6">
//             {/* Team */}
//             <div className="bg-white rounded-2xl shadow-xl p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h4 className="font-bold text-lg flex items-center">
//                   <Users className="mr-2" size={20} />
//                   Project Team
//                 </h4>
//                 <span className="text-sm text-gray-600">{currentProject.team.length} members</span>
//               </div>
//               <div className="space-y-4">
//                 {currentProject.team.map((member, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <img
//                       src={member.avatar}
//                       alt={member.name}
//                       className="w-12 h-12 rounded-full object-cover"
//                     />
//                     <div className="flex-1">
//                       <div className="font-medium">{member.name}</div>
//                       <div className="text-sm text-gray-600">{member.role}</div>
//                     </div>
//                     <button className="text-blue-600 hover:text-blue-700">
//                       <MessageSquare size={20} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               <button className="w-full mt-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
//                 + Add Team Member
//               </button>
//             </div>

//             {/* Recent Updates */}
//             <div className="bg-white rounded-2xl shadow-xl p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h4 className="font-bold text-lg">Recent Updates</h4>
//                 <button className="text-blue-600 hover:text-blue-700 font-medium">
//                   <Activity size={20} />
//                 </button>
//               </div>
//               <div className="space-y-4">
//                 {currentProject.updates.map((update, index) => (
//                   <div key={index} className="p-4 bg-blue-50 rounded-lg">
//                     <div className="flex justify-between items-start mb-2">
//                       <div className="font-medium">{update.user}</div>
//                       <div className="text-sm text-gray-600">{update.date}</div>
//                     </div>
//                     <p className="text-gray-700">{update.message}</p>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-6">
//                 <textarea
//                   placeholder="Add an update..."
//                   rows={3}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="flex justify-end gap-2 mt-2">
//                   <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
//                     Cancel
//                   </button>
//                   <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                     Post Update
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Quick Actions */}
//             <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-6">
//               <h4 className="font-bold text-lg mb-4">Quick Actions</h4>
//               <div className="grid grid-cols-2 gap-4">
//                 <button className="flex flex-col items-center justify-center p-4 bg-white/20 rounded-lg hover:bg-white/30">
//                   <FileText size={24} className="mb-2" />
//                   <span className="text-sm">View Reports</span>
//                 </button>
//                 <button className="flex flex-col items-center justify-center p-4 bg-white/20 rounded-lg hover:bg-white/30">
//                   <Download size={24} className="mb-2" />
//                   <span className="text-sm">Export Data</span>
//                 </button>
//                 <button className="flex flex-col items-center justify-center p-4 bg-white/20 rounded-lg hover:bg-white/30">
//                   <Calendar size={24} className="mb-2" />
//                   <span className="text-sm">Schedule</span>
//                 </button>
//                 <button className="flex flex-col items-center justify-center p-4 bg-white/20 rounded-lg hover:bg-white/30">
//                   <DollarSign size={24} className="mb-2" />
//                   <span className="text-sm">Invoices</span>
//                 </button>
//               </div>
//             </div>

//             {/* Project Health */}
//             <div className="bg-white rounded-2xl shadow-xl p-6">
//               <h4 className="font-bold text-lg mb-4">Project Health</h4>
//               <div className="space-y-4">
//                 <div>
//                   <div className="flex justify-between text-sm mb-1">
//                     <span>Timeline</span>
//                     <span className="text-green-600">On Track</span>
//                   </div>
//                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <div className="h-full bg-green-500 w-3/4" />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex justify-between text-sm mb-1">
//                     <span>Budget</span>
//                     <span className="text-yellow-600">Slightly Over</span>
//                   </div>
//                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <div className="h-full bg-yellow-500 w-9/10" />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex justify-between text-sm mb-1">
//                     <span>Quality</span>
//                     <span className="text-green-600">Excellent</span>
//                   </div>
//                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <div className="h-full bg-green-500 w-9/10" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProjectDashboard;