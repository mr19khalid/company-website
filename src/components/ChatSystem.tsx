// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   MessageSquare, Send, Paperclip, Image, FileText, Video, 
//   Smile, MoreVertical, Search, Users, Check, CheckCheck,
//   Clock, Phone, Video as VideoIcon, Info, X, Maximize2,
//   Minimize2, Trash2, Pin, Star, Archive, Bell, BellOff,
//   Download  // Added this
// } from 'lucide-react';
// import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
// import Dropzone from 'react-dropzone';
// import { v4 as uuidv4 } from 'uuid';

// // Mock socket connection
// const mockSocket = {
//   on: (event: string, callback: Function) => {
//     console.log(`Mock socket listening to ${event}`);
//     return mockSocket;
//   },
//   emit: (event: string, data: any) => {
//     console.log(`Mock socket emitting ${event}:`, data);
//     return mockSocket;
//   },
//   disconnect: () => console.log('Mock socket disconnected')
// };

// interface ChatMessage {
//   id: string;
//   senderId: string;
//   senderName: string;
//   senderAvatar: string;
//   senderRole: string;
//   content: string;
//   timestamp: Date;
//   type: 'text' | 'image' | 'file' | 'system';
//   fileUrl?: string;
//   fileName?: string;
//   fileSize?: string;
//   read: boolean;
//   pinned: boolean;
//   reactions?: { emoji: string; users: string[] }[];
// }

// interface ChatUser {
//   id: string;
//   name: string;
//   avatar: string;
//   role: string;
//   online: boolean;
//   lastSeen?: Date;
//   typing: boolean;
// }

// interface ChatRoom {
//   id: string;
//   name: string;
//   type: 'project' | 'direct' | 'group';
//   participants: ChatUser[];
//   lastMessage?: ChatMessage;
//   unreadCount: number;
//   muted: boolean;
//   pinned: boolean;
// }

// // Helper function moved outside
// const formatMessageTime = (date: Date) => {
//   if (isToday(date)) {
//     return format(date, 'h:mm a');
//   } else if (isYesterday(date)) {
//     return 'Yesterday';
//   } else {
//     return format(date, 'MMM d');
//   }
// };

// const formatDateHeader = (date: Date) => {
//   if (isToday(date)) return 'Today';
//   if (isYesterday(date)) return 'Yesterday';
//   return format(date, 'MMMM d, yyyy');
// };

// const ChatSystem: React.FC = () => {
//   const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
//     {
//       id: 'project-1',
//       name: 'Kitchen Remodel Team',
//       type: 'project',
//       participants: [
//         { id: 'user-1', name: 'John Richardson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', role: 'Project Manager', online: true, typing: false },
//         { id: 'user-2', name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100', role: 'Design Lead', online: true, typing: false },
//         { id: 'user-3', name: 'Mike Rodriguez', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', role: 'Lead Carpenter', online: false, typing: false, lastSeen: new Date(Date.now() - 3600000) },
//       ],
//       unreadCount: 3,
//       muted: false,
//       pinned: true,
//       lastMessage: {
//         id: 'msg-1',
//         senderId: 'user-1',
//         senderName: 'John Richardson',
//         senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
//         senderRole: 'Project Manager',
//         content: 'Cabinet delivery scheduled for tomorrow 9 AM',
//         timestamp: new Date(Date.now() - 1800000),
//         type: 'text',
//         read: false,
//         pinned: false
//       }
//     },
//     {
//       id: 'project-2',
//       name: 'Bathroom Renovation',
//       type: 'project',
//       participants: [
//         { id: 'user-4', name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', role: 'Project Manager', online: true, typing: true },
//         { id: 'user-5', name: 'Maria Garcia', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', role: 'Paint Supervisor', online: false, typing: false, lastSeen: new Date(Date.now() - 7200000) },
//       ],
//       unreadCount: 0,
//       muted: true,
//       pinned: false
//     },
//     {
//       id: 'direct-1',
//       name: 'Client: Sarah Johnson',
//       type: 'direct',
//       participants: [
//         { id: 'client-1', name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100', role: 'Homeowner', online: true, typing: false },
//       ],
//       unreadCount: 1,
//       muted: false,
//       pinned: true
//     }
//   ]);

//   const [activeRoom, setActiveRoom] = useState<string>('project-1');
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     {
//       id: 'msg-1',
//       senderId: 'user-1',
//       senderName: 'John Richardson',
//       senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
//       senderRole: 'Project Manager',
//       content: 'Good morning team! Cabinet delivery is scheduled for tomorrow at 9 AM.',
//       timestamp: new Date(Date.now() - 7200000),
//       type: 'text',
//       read: true,
//       pinned: false
//     },
//     {
//       id: 'msg-2',
//       senderId: 'user-2',
//       senderName: 'Sarah Chen',
//       senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
//       senderRole: 'Design Lead',
//       content: 'Great! I\'ll be there to oversee the installation. Do we have the color samples ready?',
//       timestamp: new Date(Date.now() - 3600000),
//       type: 'text',
//       read: true,
//       pinned: false
//     },
//     {
//       id: 'msg-3',
//       senderId: 'user-3',
//       senderName: 'Mike Rodriguez',
//       senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
//       senderRole: 'Lead Carpenter',
//       content: 'Yes, all samples are ready. I\'ve also completed the framework for the island.',
//       timestamp: new Date(Date.now() - 1800000),
//       type: 'text',
//       read: true,
//       pinned: true,
//       reactions: [{ emoji: '👍', users: ['user-1', 'user-2'] }]
//     },
//     {
//       id: 'msg-4',
//       senderId: 'user-1',
//       senderName: 'John Richardson',
//       senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
//       senderRole: 'Project Manager',
//       content: 'Perfect! Here\'s the updated blueprint with measurements.',
//       timestamp: new Date(Date.now() - 900000),
//       type: 'file',
//       fileName: 'kitchen_blueprint_final.pdf',
//       fileSize: '2.4 MB',
//       read: false,
//       pinned: false
//     }
//   ]);

//   const [newMessage, setNewMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [showFileDropzone, setShowFileDropzone] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showParticipants, setShowParticipants] = useState(false);
//   const [showInfoPanel, setShowInfoPanel] = useState(false);
//   const [fullscreenChat, setFullscreenChat] = useState(false);
  
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const currentUser = {
//     id: 'current-user',
//     name: 'You',
//     avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
//     role: 'Client'
//   };

//   const currentRoom = chatRooms.find(room => room.id === activeRoom);
//   const filteredRooms = chatRooms.filter(room => 
//     room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     room.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   // Scroll to bottom when new messages arrive
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Simulate typing indicator
//   useEffect(() => {
//     if (newMessage.trim() && !isTyping) {
//       setIsTyping(true);
//       mockSocket.emit('typing', { roomId: activeRoom, userId: currentUser.id });
//     } else if (!newMessage.trim() && isTyping) {
//       setIsTyping(false);
//       mockSocket.emit('stop-typing', { roomId: activeRoom, userId: currentUser.id });
//     }
//   }, [newMessage, activeRoom, currentUser.id, isTyping]);

//   const handleSendMessage = () => {
//     if (!newMessage.trim() && selectedFiles.length === 0) return;

//     const newMessages: ChatMessage[] = [];

//     // Handle text message
//     if (newMessage.trim()) {
//       const textMessage: ChatMessage = {
//         id: uuidv4(),
//         senderId: currentUser.id,
//         senderName: currentUser.name,
//         senderAvatar: currentUser.avatar,
//         senderRole: currentUser.role,
//         content: newMessage,
//         timestamp: new Date(),
//         type: 'text',
//         read: false,
//         pinned: false
//       };
//       newMessages.push(textMessage);
//     }

//     // Handle file uploads
//     selectedFiles.forEach(file => {
//       const fileMessage: ChatMessage = {
//         id: uuidv4(),
//         senderId: currentUser.id,
//         senderName: currentUser.name,
//         senderAvatar: currentUser.avatar,
//         senderRole: currentUser.role,
//         content: '',
//         timestamp: new Date(),
//         type: file.type.startsWith('image/') ? 'image' : 'file',
//         fileName: file.name,
//         fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
//         read: false,
//         pinned: false
//       };
//       newMessages.push(fileMessage);
//     });

//     setMessages(prev => [...prev, ...newMessages]);
//     setNewMessage('');
//     setSelectedFiles([]);
//     setShowFileDropzone(false);

//     // Update last message in chat room
//     setChatRooms(prev => prev.map(room => {
//       if (room.id === activeRoom) {
//         const lastMsg = newMessages[newMessages.length - 1];
//         return {
//           ...room,
//           lastMessage: lastMsg,
//           unreadCount: room.muted ? 0 : room.unreadCount + 1
//         };
//       }
//       return room;
//     }));

//     mockSocket.emit('send-message', {
//       roomId: activeRoom,
//       messages: newMessages
//     });
//   };

//   const handleFileSelect = (acceptedFiles: File[]) => {
//     setSelectedFiles(prev => [...prev, ...acceptedFiles.slice(0, 5)]);
//   };

//   const removeFile = (index: number) => {
//     setSelectedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const groupMessagesByDate = () => {
//     const groups: { date: Date; messages: ChatMessage[] }[] = [];
    
//     messages.forEach(message => {
//       const messageDate = new Date(message.timestamp);
//       messageDate.setHours(0, 0, 0, 0);
      
//       const existingGroup = groups.find(group => 
//         group.date.getTime() === messageDate.getTime()
//       );
      
//       if (existingGroup) {
//         existingGroup.messages.push(message);
//       } else {
//         groups.push({
//           date: messageDate,
//           messages: [message]
//         });
//       }
//     });
    
//     return groups;
//   };

//   const toggleRoomMute = (roomId: string) => {
//     setChatRooms(prev => prev.map(room => 
//       room.id === roomId ? { ...room, muted: !room.muted } : room
//     ));
//   };

//   const toggleRoomPin = (roomId: string) => {
//     setChatRooms(prev => prev.map(room => 
//       room.id === roomId ? { ...room, pinned: !room.pinned } : room
//     ));
//   };

//   const markRoomAsRead = (roomId: string) => {
//     setChatRooms(prev => prev.map(room => 
//       room.id === roomId ? { ...room, unreadCount: 0 } : room
//     ));
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <section className="section-padding bg-gradient-to-b from-white to-gray-50">
//       <div className="container-custom max-w-7xl">
//         <div className="text-center max-w-3xl mx-auto mb-12">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
//             <MessageSquare className="text-white" size={32} />
//           </div>
//           <span className="text-green-600 font-semibold">REAL-TIME COMMUNICATION</span>
//           <h2 className="text-4xl font-bold mt-2 mb-4">
//             Project Collaboration Chat
//           </h2>
//           <p className="text-gray-600">
//             Communicate with your team and clients in real-time. Share files, track progress, and stay connected.
//           </p>
//         </div>

//         <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${fullscreenChat ? 'fixed inset-4 z-50' : ''}`}>
//           {/* Chat Header */}
//           <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-gray-50 to-white">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setFullscreenChat(!fullscreenChat)}
//                 className="p-2 text-gray-600 hover:text-gray-900"
//               >
//                 {fullscreenChat ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
//               </button>
//               <div>
//                 <h3 className="font-bold text-lg">Project Communication</h3>
//                 <p className="text-sm text-gray-600">
//                   Real-time chat with your construction team
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-4">
//               <button 
//                 onClick={() => setShowParticipants(!showParticipants)}
//                 className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
//               >
//                 <Users size={20} />
//                 <span>{currentRoom?.participants.length || 0} online</span>
//               </button>
//               <button className="p-2 text-gray-600 hover:text-gray-900">
//                 <Phone size={20} />
//               </button>
//               <button className="p-2 text-gray-600 hover:text-gray-900">
//                 <VideoIcon size={20} />
//               </button>
//               <button 
//                 onClick={() => setShowInfoPanel(!showInfoPanel)}
//                 className="p-2 text-gray-600 hover:text-gray-900"
//               >
//                 <Info size={20} />
//               </button>
//             </div>
//           </div>

//           <div className="flex h-[600px]">
//             {/* Left Sidebar - Chat List */}
//             <div className="w-80 border-r flex flex-col">
//               {/* Search */}
//               <div className="p-4 border-b">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search conversations..."
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//                   />
//                 </div>
//               </div>

//               {/* Chat Rooms List */}
//               <div className="flex-1 overflow-y-auto">
//                 <div className="p-2">
//                   {/* Pinned Chats */}
//                   {filteredRooms.filter(room => room.pinned).length > 0 && (
//                     <div className="mb-4">
//                       <div className="text-xs font-medium text-gray-500 px-2 mb-2">PINNED</div>
//                       {filteredRooms
//                         .filter(room => room.pinned)
//                         .map(room => (
//                           <ChatRoomItem
//                             key={room.id}
//                             room={room}
//                             isActive={room.id === activeRoom}
//                             onClick={() => {
//                               setActiveRoom(room.id);
//                               markRoomAsRead(room.id);
//                             }}
//                             onMute={toggleRoomMute}
//                             onPin={toggleRoomPin}
//                           />
//                         ))
//                       }
//                     </div>
//                   )}

//                   {/* All Chats */}
//                   <div>
//                     <div className="text-xs font-medium text-gray-500 px-2 mb-2">ALL CONVERSATIONS</div>
//                     {filteredRooms
//                       .filter(room => !room.pinned)
//                       .map(room => (
//                         <ChatRoomItem
//                           key={room.id}
//                           room={room}
//                           isActive={room.id === activeRoom}
//                           onClick={() => {
//                             setActiveRoom(room.id);
//                             markRoomAsRead(room.id);
//                           }}
//                           onMute={toggleRoomMute}
//                           onPin={toggleRoomPin}
//                         />
//                       ))
//                     }
//                   </div>
//                 </div>
//               </div>

//               {/* New Chat Button */}
//               <div className="p-4 border-t">
//                 <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold hover:opacity-90">
//                   <MessageSquare size={20} />
//                   New Conversation
//                 </button>
//               </div>
//             </div>

//             {/* Main Chat Area */}
//             <div className="flex-1 flex flex-col">
//               {/* Chat Header */}
//               <div className="p-4 border-b flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="relative">
//                     <div className="w-12 h-12 rounded-full overflow-hidden">
//                       {currentRoom?.type === 'direct' ? (
//                         <img
//                           src={currentRoom.participants[0]?.avatar}
//                           alt={currentRoom.participants[0]?.name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
//                           {currentRoom?.name.charAt(0)}
//                         </div>
//                       )}
//                     </div>
//                     {currentRoom?.participants.some(p => p.online) && (
//                       <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
//                     )}
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-lg">{currentRoom?.name}</h4>
//                     <div className="flex items-center gap-2">
//                       {currentRoom?.type === 'project' && (
//                         <span className="text-sm text-gray-600">
//                           {currentRoom.participants.filter(p => p.online).length} online
//                         </span>
//                       )}
//                       {currentRoom?.participants.some(p => p.typing) && (
//                         <span className="text-sm text-green-600 animate-pulse">
//                           typing...
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   {currentRoom?.muted ? (
//                     <button 
//                       onClick={() => toggleRoomMute(activeRoom)}
//                       className="p-2 text-gray-400 hover:text-gray-600"
//                       title="Unmute"
//                     >
//                       <BellOff size={20} />
//                     </button>
//                   ) : (
//                     <button 
//                       onClick={() => toggleRoomMute(activeRoom)}
//                       className="p-2 text-gray-600 hover:text-gray-900"
//                       title="Mute"
//                     >
//                       <Bell size={20} />
//                     </button>
//                   )}
//                   <button className="p-2 text-gray-600 hover:text-gray-900">
//                     <MoreVertical size={20} />
//                   </button>
//                 </div>
//               </div>

//               {/* Messages Area */}
//               <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//                 {groupMessagesByDate().map((group, groupIndex) => (
//                   <div key={groupIndex} className="mb-6">
//                     {/* Date Header */}
//                     <div className="flex items-center justify-center my-4">
//                       <div className="px-4 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
//                         {formatDateHeader(group.date)}
//                       </div>
//                     </div>

//                     {/* Messages */}
//                     {group.messages.map((message, index) => (
//                       <React.Fragment key={message.id}>
//                         <ChatMessageBubble
//                           message={message}
//                           isOwn={message.senderId === currentUser.id}
//                           showAvatar={index === 0 || group.messages[index - 1]?.senderId !== message.senderId}
//                         />
//                       </React.Fragment>
//                     ))}
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* File Dropzone */}
//               <AnimatePresence>
//                 {showFileDropzone && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: 'auto', opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     className="border-t"
//                   >
//                     <div className="p-4 bg-blue-50">
//                       <Dropzone onDrop={handleFileSelect} multiple>
//                         {({ getRootProps, getInputProps }) => (
//                           <div {...getRootProps()} className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:bg-blue-100">
//                             <input {...getInputProps()} ref={fileInputRef} />
//                             <Paperclip className="w-8 h-8 text-blue-500 mx-auto mb-2" />
//                             <p className="text-blue-700 font-medium">Drop files here or click to select</p>
//                             <p className="text-blue-600 text-sm">Supports images, PDFs, documents (max 10MB each)</p>
//                           </div>
//                         )}
//                       </Dropzone>

//                       {selectedFiles.length > 0 && (
//                         <div className="mt-4">
//                           <div className="text-sm font-medium text-gray-700 mb-2">Selected files:</div>
//                           <div className="space-y-2">
//                             {selectedFiles.map((file, index) => (
//                               <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
//                                 <div className="flex items-center gap-3">
//                                   {file.type.startsWith('image/') ? (
//                                     <Image className="text-blue-500" size={20} />
//                                   ) : (
//                                     <FileText className="text-gray-500" size={20} />
//                                   )}
//                                   <div>
//                                     <div className="font-medium text-sm">{file.name}</div>
//                                     <div className="text-xs text-gray-500">
//                                       {(file.size / 1024 / 1024).toFixed(1)} MB
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <button
//                                   onClick={() => removeFile(index)}
//                                   className="p-1 text-red-500 hover:text-red-700"
//                                 >
//                                   <X size={16} />
//                                 </button>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Message Input */}
//               <div className="p-4 border-t">
//                 <div className="flex items-end gap-3">
//                   {/* Attachment Button */}
//                   <button
//                     onClick={() => setShowFileDropzone(!showFileDropzone)}
//                     className={`p-2 rounded-lg ${showFileDropzone ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
//                   >
//                     <Paperclip size={20} />
//                   </button>

//                   {/* Emoji Button */}
//                   <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
//                     <Smile size={20} />
//                   </button>

//                   {/* Message Input */}
//                   <div className="flex-1 relative">
//                     <textarea
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={handleKeyPress}
//                       placeholder="Type your message here..."
//                       rows={1}
//                       className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
//                       style={{ minHeight: '44px', maxHeight: '120px' }}
//                     />
//                     {isTyping && (
//                       <div className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
//                         typing...
//                       </div>
//                     )}
//                   </div>

//                   {/* Send Button */}
//                   <button
//                     onClick={handleSendMessage}
//                     disabled={!newMessage.trim() && selectedFiles.length === 0}
//                     className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <Send size={20} />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Right Sidebar - Participants/Info */}
//             <AnimatePresence>
//               {(showParticipants || showInfoPanel) && (
//                 <motion.div
//                   initial={{ width: 0, opacity: 0 }}
//                   animate={{ width: '300px', opacity: 1 }}
//                   exit={{ width: 0, opacity: 0 }}
//                   className="border-l overflow-hidden"
//                 >
//                   <div className="p-4 h-full overflow-y-auto">
//                     {showParticipants && (
//                       <div>
//                         <div className="flex items-center justify-between mb-6">
//                           <h4 className="font-bold text-lg">Participants</h4>
//                           <button
//                             onClick={() => setShowParticipants(false)}
//                             className="p-1 text-gray-500 hover:text-gray-700"
//                           >
//                             <X size={20} />
//                           </button>
//                         </div>

//                         <div className="space-y-4">
//                           {currentRoom?.participants.map(participant => (
//                             <div key={participant.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
//                               <div className="relative">
//                                 <img
//                                   src={participant.avatar}
//                                   alt={participant.name}
//                                   className="w-12 h-12 rounded-full object-cover"
//                                 />
//                                 {participant.online && (
//                                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
//                                 )}
//                               </div>
//                               <div className="flex-1">
//                                 <div className="font-medium">{participant.name}</div>
//                                 <div className="text-sm text-gray-600">{participant.role}</div>
//                                 <div className="text-xs text-gray-500">
//                                   {participant.online ? 'Online' : 
//                                    participant.lastSeen ? `Last seen ${formatDistanceToNow(participant.lastSeen)} ago` : 'Offline'}
//                                 </div>
//                               </div>
//                               {participant.typing && (
//                                 <div className="text-xs text-green-600 animate-pulse">typing...</div>
//                               )}
//                             </div>
//                           ))}
//                         </div>

//                         <button className="w-full mt-6 py-2 border-2 border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50">
//                           + Add Participant
//                         </button>
//                       </div>
//                     )}

//                     {showInfoPanel && (
//                       <div>
//                         <div className="flex items-center justify-between mb-6">
//                           <h4 className="font-bold text-lg">Chat Info</h4>
//                           <button
//                             onClick={() => setShowInfoPanel(false)}
//                             className="p-1 text-gray-500 hover:text-gray-700"
//                           >
//                             <X size={20} />
//                           </button>
//                         </div>

//                         <div className="space-y-6">
//                           {/* Pinned Messages */}
//                           <div>
//                             <h5 className="font-medium mb-3">Pinned Messages</h5>
//                             {messages.filter(m => m.pinned).map(message => (
//                               <div key={message.id} className="p-3 bg-yellow-50 rounded-lg mb-2">
//                                 <div className="font-medium text-sm">{message.senderName}</div>
//                                 <div className="text-sm text-gray-700 truncate">{message.content}</div>
//                                 <div className="text-xs text-gray-500 mt-1">
//                                   {formatMessageTime(message.timestamp)}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>

//                           {/* Shared Files */}
//                           <div>
//                             <h5 className="font-medium mb-3">Shared Files</h5>
//                             {messages.filter(m => m.type === 'file' || m.type === 'image').map(message => (
//                               <div key={message.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
//                                 {message.type === 'image' ? (
//                                   <Image className="text-blue-500" size={20} />
//                                 ) : (
//                                   <FileText className="text-gray-500" size={20} />
//                                 )}
//                                 <div className="flex-1">
//                                   <div className="text-sm font-medium truncate">{message.fileName}</div>
//                                   <div className="text-xs text-gray-500">{message.fileSize}</div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>

//                           {/* Chat Actions */}
//                           <div className="space-y-2">
//                             <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg">
//                               <span>Export Chat</span>
//                               <Download size={16} />
//                             </button>
//                             <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg">
//                               <span>Clear Chat History</span>
//                               <Trash2 size={16} />
//                             </button>
//                             <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg">
//                               <span>Archive Chat</span>
//                               <Archive size={16} />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Chat Features */}
//         <div className="grid md:grid-cols-3 gap-6 mt-12">
//           <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
//             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Send className="text-green-600" size={24} />
//             </div>
//             <h4 className="font-bold text-lg mb-2">Real-time Messaging</h4>
//             <p className="text-gray-600">Instant communication with your team and clients</p>
//           </div>
//           <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
//             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Paperclip className="text-green-600" size={24} />
//             </div>
//             <h4 className="font-bold text-lg mb-2">File Sharing</h4>
//             <p className="text-gray-600">Share blueprints, photos, and documents instantly</p>
//           </div>
//           <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
//             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users className="text-green-600" size={24} />
//             </div>
//             <h4 className="font-bold text-lg mb-2">Team Collaboration</h4>
//             <p className="text-gray-600">Multiple participants with role-based access</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Sub-components
// interface ChatRoomItemProps {
//   room: ChatRoom;
//   isActive: boolean;
//   onClick: () => void;
//   onMute: (roomId: string) => void;
//   onPin: (roomId: string) => void;
// }

// const ChatRoomItem: React.FC<ChatRoomItemProps> = ({ room, isActive, onClick, onMute, onPin }) => {
//   const onlineCount = room.participants.filter(p => p.online).length;
  
//   return (
//     <div
//       onClick={onClick}
//       className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-colors ${
//         isActive ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'
//       }`}
//     >
//       <div className="relative">
//         <div className="w-12 h-12 rounded-full overflow-hidden">
//           {room.type === 'direct' ? (
//             <img
//               src={room.participants[0]?.avatar}
//               alt={room.participants[0]?.name}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
//               {room.name.charAt(0)}
//             </div>
//           )}
//         </div>
//         {onlineCount > 0 && (
//           <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
//         )}
//       </div>
      
//       <div className="flex-1 min-w-0">
//         <div className="flex items-center justify-between">
//           <div className="font-medium truncate">{room.name}</div>
//           {room.lastMessage && (
//             <div className="text-xs text-gray-500 whitespace-nowrap">
//               {formatMessageTime(room.lastMessage.timestamp)}
//             </div>
//           )}
//         </div>
        
//         <div className="flex items-center justify-between">
//           <div className="text-sm text-gray-600 truncate">
//             {room.lastMessage ? (
//               <>
//                 <span className="font-medium">{room.lastMessage.senderName}: </span>
//                 {room.lastMessage.content || `Sent a ${room.lastMessage.type}`}
//               </>
//             ) : (
//               'No messages yet'
//             )}
//           </div>
          
//           {(room.unreadCount > 0 || room.muted) && (
//             <div className="flex items-center gap-1">
//               {room.muted && <BellOff size={12} className="text-gray-400" />}
//               {room.unreadCount > 0 && (
//                 <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
//                   room.muted ? 'bg-gray-200 text-gray-700' : 'bg-green-500 text-white'
//                 }`}>
//                   {room.unreadCount}
//                 </span>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
      
//       <div className="flex flex-col gap-1">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onPin(room.id);
//           }}
//           className={`p-1 ${room.pinned ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
//           title={room.pinned ? 'Unpin' : 'Pin'}
//         >
//           <Star size={14} fill={room.pinned ? 'currentColor' : 'none'} />
//         </button>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onMute(room.id);
//           }}
//           className={`p-1 ${room.muted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
//           title={room.muted ? 'Unmute' : 'Mute'}
//         >
//           {room.muted ? <BellOff size={14} /> : <Bell size={14} />}
//         </button>
//       </div>
//     </div>
//   );
// };

// interface ChatMessageBubbleProps {
//   message: ChatMessage;
//   isOwn: boolean;
//   showAvatar: boolean;
// }

// const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message, isOwn, showAvatar }) => {
//   const [showReactions, setShowReactions] = useState(false);

//   return (
//     <div className={`flex gap-3 mb-2 ${isOwn ? 'flex-row-reverse' : ''}`}>
//       {/* Avatar */}
//       {showAvatar && !isOwn && (
//         <img
//           src={message.senderAvatar}
//           alt={message.senderName}
//           className="w-8 h-8 rounded-full flex-shrink-0"
//         />
//       )}
      
//       {showAvatar && isOwn && <div className="w-8" />}

//       {/* Message Bubble */}
//       <div className={`max-w-lg ${isOwn ? 'items-end' : ''}`}>
//         {/* Sender Info */}
//         {showAvatar && !isOwn && (
//           <div className="flex items-center gap-2 mb-1">
//             <span className="font-medium text-sm">{message.senderName}</span>
//             <span className="text-xs text-gray-500">{message.senderRole}</span>
//           </div>
//         )}

//         {/* Message Content */}
//         <div className={`relative group ${isOwn ? 'text-right' : ''}`}>
//           <div
//             className={`inline-block rounded-2xl px-4 py-2 ${
//               isOwn
//                 ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-tr-none'
//                 : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
//             }`}
//           >
//             {message.type === 'text' && (
//               <div className="whitespace-pre-wrap">{message.content}</div>
//             )}

//             {message.type === 'image' && (
//               <div>
//                 <div className="font-medium mb-1">📷 Image</div>
//                 <div className="text-sm opacity-90">{message.fileName}</div>
//               </div>
//             )}

//             {message.type === 'file' && (
//               <div className="flex items-center gap-3">
//                 <FileText size={24} className="text-blue-500" />
//                 <div>
//                   <div className="font-medium">{message.fileName}</div>
//                   <div className="text-sm text-gray-600">{message.fileSize}</div>
//                 </div>
//               </div>
//             )}

//             {/* Reactions */}
//             {message.reactions && message.reactions.length > 0 && (
//               <div className="flex gap-1 mt-2">
//                 {message.reactions.map((reaction, idx) => (
//                   <div
//                     key={idx}
//                     className="px-2 py-1 bg-white/20 rounded-full text-xs"
//                   >
//                     {reaction.emoji} {reaction.users.length}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Message Actions */}
//           <div className={`absolute top-0 ${isOwn ? '-left-2' : '-right-2'} opacity-0 group-hover:opacity-100 transition-opacity flex gap-1`}>
//             <button className="p-1 bg-white rounded-full shadow hover:bg-gray-100">
//               <Smile size={14} />
//             </button>
//             <button className="p-1 bg-white rounded-full shadow hover:bg-gray-100">
//               <Pin size={14} />
//             </button>
//             <button className="p-1 bg-white rounded-full shadow hover:bg-gray-100">
//               <MoreVertical size={14} />
//             </button>
//           </div>

//           {/* Message Status */}
//           <div className={`flex items-center gap-1 mt-1 text-xs ${isOwn ? 'justify-end' : 'justify-start'}`}>
//             <span className="text-gray-500">{formatMessageTime(message.timestamp)}</span>
//             {isOwn && (
//               <>
//                 {message.read ? (
//                   <CheckCheck size={12} className="text-green-500" />
//                 ) : (
//                   <Check size={12} className="text-gray-400" />
//                 )}
//               </>
//             )}
//             {message.pinned && <Pin size={12} className="text-yellow-500" />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatSystem;