// socket.js - Add connection state checking
import { io } from "socket.io-client";

let socket;

export function getSocket() {
  if (!socket || socket.disconnected) {
    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
    }

    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      autoConnect: false,
      closeOnBeforeunload: false, // Disable auto-close on unload
      forceNew: false, // Force new connection
    });
    socket.connect();
  }
  return socket;
}
