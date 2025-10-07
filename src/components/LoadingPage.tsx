import { useEffect, useState } from "react";
import rideyaLogo from "figma:asset/6e7f4dbeb5a4a8f55405b8ef99dd0323b83f0292.png";

interface LoadingPageProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

export function LoadingPage({ onLoadingComplete, duration = 3000 }: LoadingPageProps) {
  const [loadingText, setLoadingText] = useState("Initializing RIDEYA");
  const [isComplete, setIsComplete] = useState(false);

  const loadingStages = [
    "Initializing RIDEYA",
    "Loading Transportation Network",
    "Connecting to Drivers",
    "Preparing Your Journey",
    "Welcome to RIDEYA!"
  ];

  useEffect(() => {
    let currentIndex = 0;
    
    const textInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadingStages.length;
      setLoadingText(loadingStages[currentIndex]);
    }, duration / loadingStages.length);

    const completeTimeout = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 500);
    }, duration);

    return () => {
      clearInterval(textInterval);
      clearTimeout(completeTimeout);
    };
  }, [duration, onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Large floating orbs */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-primary/25 to-accent/25 rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '-4s' }}></div>
        
        {/* Smaller floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/40 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}

        {/* 3D Grid Effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid-3d"></div>
        </div>
      </div>

      {/* Main Loading Content */}
      <div className={`relative text-center transition-all duration-1000 flex flex-col items-center justify-center min-h-screen ${isComplete ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Logo Container with 3D Animation - No Rotation */}
        <div className="relative mb-8">
          <div className="loading-logo-container-static">
            <div className="w-32 h-32 mx-auto bg-white rounded-2xl p-4 shadow-xl border border-primary/20 logo-3d-static">
              <img 
                src={rideyaLogo} 
                alt="RIDEYA" 
                className="w-full h-full object-contain filter brightness-110 contrast-110 animate-pulse-logo"
                style={{ 
                  filter: 'brightness(1.1) contrast(1.1)',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            
            {/* Rotating Ring around Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 border-2 border-primary/30 rounded-full animate-spin-slow"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-44 h-44 border border-accent/20 rounded-full animate-spin-reverse"></div>
            </div>
          </div>
        </div>

        {/* Brand Text with 3D Effect */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-3d mb-3 animate-glow">
            RIDEYA
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            Smart Transportation • Sri Lanka
          </p>
        </div>

        {/* Pulse Wave Animation */}
        <div className="flex justify-center items-center mb-6">
          <div className="relative">
            {/* Multiple pulse rings */}
            <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-primary/40 animate-ping"></div>
            <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDelay: '1s' }}></div>
            
            {/* Center dot */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading Text with Typewriter Effect */}
        <div className="h-8 mb-4">
          <p className="text-lg font-medium text-foreground animate-pulse">
            {loadingText}
            <span className="animate-blink ml-1">|</span>
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-primary rounded-full animate-bounce-dot"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          50% { transform: translateY(-30px) translateX(10px); opacity: 1; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes pulse-logo {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px rgba(255, 107, 53, 0.3); }
          50% { text-shadow: 0 0 30px rgba(255, 107, 53, 0.6), 0 0 40px rgba(255, 107, 53, 0.3); }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes bounce-dot {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }

        @keyframes scale-in {
          0% { transform: scale(0) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }

        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 6s linear infinite; }
        .animate-pulse-logo { animation: pulse-logo 2s ease-in-out infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-blink { animation: blink 1s infinite; }
        .animate-bounce-dot { animation: bounce-dot 1.4s infinite; }
        .animate-scale-in { animation: scale-in 0.6s ease-out; }

        .border-3 {
          border-width: 3px;
        }

        .loading-logo-container-static {
          position: relative;
          transform-style: preserve-3d;
          animation: float-slow 4s ease-in-out infinite;
        }

        .logo-3d-static {
          transform: perspective(1000px);
          box-shadow: 
            0 10px 30px rgba(255, 107, 53, 0.2),
            0 20px 40px rgba(0, 0, 0, 0.1),
            inset 0 1px 2px rgba(255, 255, 255, 0.8);
        }

        .text-3d {
          text-shadow: 
            0 1px 0 rgba(255, 107, 53, 0.8),
            0 2px 0 rgba(255, 107, 53, 0.6),
            0 3px 0 rgba(255, 107, 53, 0.4),
            0 4px 0 rgba(255, 107, 53, 0.2),
            0 5px 10px rgba(0, 0, 0, 0.2);
        }

        .progress-container-3d {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .progress-track {
          position: relative;
          height: 12px;
          background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 
            inset 0 3px 6px rgba(0, 0, 0, 0.1),
            0 2px 4px rgba(255, 255, 255, 0.8);
          transform: rotateX(15deg);
        }

        .progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(90deg, #ff6b35, #ff8c42, #ff6b35);
          background-size: 200% 100%;
          border-radius: 12px;
          animation: shimmer 2s ease-in-out infinite;
          box-shadow: 0 0 15px rgba(255, 107, 53, 0.6);
          transition: width 0.3s ease;
        }

        .progress-glow {
          position: absolute;
          top: -3px;
          width: 6px;
          height: 18px;
          background: radial-gradient(circle, rgba(255, 107, 53, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          transform: translateX(-50%);
          transition: left 0.3s ease;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .grid-3d {
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-move 20s linear infinite;
          transform: perspective(1000px) rotateX(60deg);
        }

        @keyframes grid-move {
          0% { transform: perspective(1000px) rotateX(60deg) translateY(0); }
          100% { transform: perspective(1000px) rotateX(60deg) translateY(50px); }
        }
      `}</style>
    </div>
  );
}