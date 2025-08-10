"use client";
import { useState, useEffect } from "react";
import CanvasBoard from "./CanvasBoard";
import { getSocket } from "./socket";

function App() {
  const socket = getSocket();
  const [userCount, setUserCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('App mounted, socket:', socket);
    
    // Check initial connection state
    if (socket.connected) {
      setIsConnected(true);
      setIsLoading(false);
      console.log('Socket already connected');
    }

    const handleConnect = () => {
      console.log('Socket connected');
      setIsConnected(true);
      setIsLoading(false);
    };

    const handleDisconnect = () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    };

    const handleUserCount = (count) => {
      console.log('User count received:', count, typeof count);
      setUserCount(count);
    };

    const handleConnectError = (error) => {
      console.error('Connection error:', error);
      setIsLoading(false);
    };

    const handlePingCheck = () => {
      console.log('Ping check received');
      socket.emit("pongCheck");
    };

    // Add event listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("userCount", handleUserCount);
    socket.on("connect_error", handleConnectError);
    socket.on("pingCheck", handlePingCheck);

    // Cleanup
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("userCount", handleUserCount);
      socket.off("connect_error", handleConnectError);
      socket.off("pingCheck", handlePingCheck);
    };
  }, [socket]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="app loading">
        <div>Connecting to drawing board... 🎨</div>
      </div>
    );
  }

  return (
   <div className="flex flex-col h-screen bg-gray-50">
  <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
      Draw<span className="text-blue-500">.io</span>
    </h1>

    <div className="flex items-center gap-4">
      <span
        className={`flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full shadow-sm border ${
          isConnected
            ? "bg-green-50 text-green-700 border-green-200"
            : "bg-red-50 text-red-700 border-red-200"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        {isConnected ? "Connected" : "Disconnected"}
      </span>

      <span className="flex items-center gap-2 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full shadow-sm">
        👥 {userCount} user{userCount !== 1 ? "s" : ""} online
      </span>
    </div>
  </header>

  <main className="flex-1 flex flex-col items-center justify-center p-4">
    <CanvasBoard socket={socket} />
  </main>
</div>
  );
}

export default App;