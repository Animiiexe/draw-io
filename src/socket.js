// socket.js - Add connection state checking
import { io } from "socket.io-client";

let socket;

export function getSocket() {
  if (!socket || socket.disconnected) {
    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
    }
    
    socket = io("http://localhost:5000", {
      autoConnect: false,
      forceNew: true, // Force new connection
    });
    socket.connect();
  }
  return socket;
}