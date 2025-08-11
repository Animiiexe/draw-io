"use client";

import { useState, useEffect } from "react";
import { 
  Palette, 
  Users, 
  Wifi, 
  WifiOff, 
  Home, 
  Menu,
  X
} from "lucide-react";
import CanvasBoard from "../components/CanvasBoard";
import { getSocket } from "../components/socket";
import LoaderIO from "../components/LoaderIO";
import Link from "next/link";

function Page() {
  const socket = getSocket();
  const [userCount, setUserCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [connectionTime, setConnectionTime] = useState(null);
   const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    console.log('App mounted, socket:', socket);
   const connectionTimeout = setTimeout(() => {
      if (!isConnected) {
        console.log('Connection timeout reached');
        setIsLoading(false);
        setConnectionError('Connection is taking longer than expected. Please refresh the page.');
      }
    }, 2000); 
    // Check initial connection state
    if (socket.connected) {
      setIsConnected(true);
      setIsLoading(false);
      setConnectionTime(new Date());
      console.log('Socket already connected');
    }

    const handleConnect = () => {
      console.log('Socket connected');
      clearTimeout(connectionTimeout);
      setIsConnected(true);
      setIsLoading(false);
      setConnectionTime(new Date());
    };

    const handleDisconnect = () => {
      console.log('Socket disconnected');
      setIsConnected(false);
      setConnectionTime(null);
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

    const handleBeforeUnload = () => {
      socket.emit('leave'); // Custom event to notify server
      socket.disconnect(); // Force disconnect
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

        if (socket.connected) {
      handleConnect();
    } else {
      // Manually try to connect if not already connected
      socket.connect();
    }

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
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [socket]);

 if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {connectionError ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <WifiOff className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Connection Issue
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md text-center">
              {connectionError}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        ) : (
          <LoaderIO />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      {/* Enhanced Header */}
      <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Draw.io
                </h1>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6 ml-8">
                <Link 
                  href="/" 
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
              </nav>
            </div>

            {/* Status and Actions */}
            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm shadow-lg border transition-all duration-300 ${
                isConnected
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700"
                  : "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700"
              }`}>
                {isConnected ? (
                  <Wifi className="w-4 h-4 animate-pulse" />
                ) : (
                  <WifiOff className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
                  {isConnected ? "Connected" : "Disconnected"}
                </span>
              </div>

              {/* User Count */}
              <div className="flex items-center space-x-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-xl font-medium text-sm shadow-lg border border-indigo-200 dark:border-indigo-700">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {userCount} user{userCount !== 1 ? "s" : ""} online
                </span>
                <span className="sm:hidden">
                  {userCount}
                </span>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-3">
                <Link 
                  href="/" 
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium py-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Canvas Area */}
      <main className="flex-1 flex flex-col">
        {/* Canvas Container */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-7xl mx-auto">
            {/* Canvas Wrapper with Enhanced Styling */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Canvas Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Collaborative Canvas
                    </h2>
                    {connectionTime && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Connected at {connectionTime.toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                  
                  {/* Live Indicator */}
                  {isConnected && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        LIVE
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Canvas Component */}
              <div className="relative">
                <CanvasBoard socket={socket} />
                
                {/* Overlay for disconnected state */}
                {!isConnected && (
                  <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4">
                      <WifiOff className="w-16 h-16 text-red-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Connection Lost
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Trying to reconnect to the drawing session...
                      </p>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Status Bar */}
        <footer className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="container mx-auto flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-4">
              <span>Draw.io v2.0</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Real-time collaborative drawing</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {isConnected && (
                <>
                  <span className="hidden sm:inline">Socket ID: {socket.id?.slice(0, 8)}...</span>
                  <span className="hidden sm:inline">•</span>
                </>
              )}
              <span>
                {userCount} active user{userCount !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Page;