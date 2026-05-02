// Real implementation would connect to a Socket.io server
// This is a mock setup for demonstration

export const initializeSocket = () => {
  // In real app:
  // import io from 'socket.io-client';
  // const socket = io('http://localhost:3001');
  
  const mockSocket = {
    // Connection
    connect: () => console.log('Connecting to socket server...'),
    disconnect: () => console.log('Disconnecting from socket server...'),
    
    // Event listeners
    on: (event: string, callback: Function) => {
      console.log(`Listening for ${event}`);
      return mockSocket;
    },
    
    // Event emitters
    emit: (event: string, data: any) => {
      console.log(`Emitting ${event}:`, data);
      return mockSocket;
    },
    
    // Connection status
    connected: true,
    id: 'mock-socket-id'
  };
  
  return mockSocket;
};

export const socketEvents = {
  // Client events
  SEND_MESSAGE: 'send-message',
  JOIN_ROOM: 'join-room',
  LEAVE_ROOM: 'leave-room',
  TYPING: 'typing',
  STOP_TYPING: 'stop-typing',
  READ_RECEIPT: 'read-receipt',
  
  // Server events
  NEW_MESSAGE: 'new-message',
  MESSAGE_SENT: 'message-sent',
  USER_JOINED: 'user-joined',
  USER_LEFT: 'user-left',
  USER_TYPING: 'user-typing',
  USER_STOPPED_TYPING: 'user-stopped-typing',
  MESSAGE_READ: 'message-read',
  ERROR: 'error'
};