// socket.js - Add connection state checking
import { io } from "socket.io-client";

let socket;

export function getSocket() {
  if (!socket || socket.disconnected) {
    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
    }
    
    socket = io("https://sporting-ninnette-animiiexe-60c889d8.koyeb.app/", {
      autoConnect: false,
      forceNew: true, // Force new connection
    });
    socket.connect();
  }
  return socket;
}