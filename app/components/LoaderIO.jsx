import { Loader } from 'lucide-react';
import React from 'react';

 const LoaderIO = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Canvas Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden">
            {/* Canvas background */}
            <div className="w-20 h-16 bg-gray-50 rounded-lg border-2 border-gray-200 relative">
              {/* Animated drawing lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 64">
                {/* Line 1 - animating */}
                <path
                  d="M10 20 Q25 15 40 20 T70 25"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  className="animate-pulse"
                  style={{
                    strokeDasharray: '60',
                    strokeDashoffset: '60',
                    animation: 'drawLine 2s ease-in-out infinite'
                  }}
                />
                {/* Line 2 - animating with delay */}
                <path
                  d="M15 35 Q30 30 45 35 T75 40"
                  stroke="#ef4444"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: '60',
                    strokeDashoffset: '60',
                    animation: 'drawLine 2s ease-in-out 0.5s infinite'
                  }}
                />
                {/* Line 3 - animating with more delay */}
                <path
                  d="M10 50 Q25 45 40 50 T70 45"
                  stroke="#10b981"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: '60',
                    strokeDashoffset: '60',
                    animation: 'drawLine 2s ease-in-out 1s infinite'
                  }}
                />
              </svg>
            </div>
            
            {/* Animated brush */}
            <div 
              className="absolute w-4 h-6 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-full"
              style={{
                top: '8px',
                right: '12px',
                animation: 'moveBrush 2s ease-in-out infinite'
              }}
            >
              {/* Brush tip */}
              <div className="w-2 h-3 bg-gray-800 rounded-full mx-auto mt-3"></div>
            </div>
          </div>
          
          {/* Floating dots around canvas */}
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="absolute -top-1 -right-3 w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute -bottom-2 -left-1 w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute -bottom-1 -right-2 w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.6s'}}></div>
        </div>

        {/* Loading text with typing animation */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            <span className="inline-block">Connecting to drawing board</span>
            <span className="animate-pulse">
              <span style={{animationDelay: '0s'}}>.</span>
              <span style={{animationDelay: '0.2s'}}>.</span>
              <span style={{animationDelay: '0.4s'}}>.</span>
            </span>
            <span className="ml-2 text-3xl">🎨</span>
          </h2>
          
          <p className="text-gray-600 animate-fade-in-out">
            Preparing your canvas for creativity
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
            style={{
              animation: 'progressBar 2s ease-in-out infinite'
            }}
          ></div>
        </div>

        {/* Loading steps */}
        <div className="mt-6 space-y-2 text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Establishing connection</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
            <span>Loading drawing tools</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
            <span>Syncing with other artists</span>
          </div>
        </div>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes drawLine {
          0% { stroke-dashoffset: 60; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -60; }
        }
        
        @keyframes moveBrush {
          0% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(10px) rotate(5deg); }
          50% { transform: translateX(20px) rotate(-5deg); }
          75% { transform: translateX(10px) rotate(3deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }
        
        @keyframes progressBar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fade-in-out {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .animate-fade-in-out {
          animation: fade-in-out 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoaderIO;

