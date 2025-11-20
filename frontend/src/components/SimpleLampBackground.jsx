import React from 'react';

export default function SimpleLampBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #1a1410 0%, #0d0a08 50%, #000000 100%)',
      }}
    >
      {/* Animated Genie Lamp SVG */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'float 6s ease-in-out infinite, rotate 20s linear infinite',
          filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.6))',
        }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          {/* Lamp Body */}
          <ellipse cx="100" cy="140" rx="50" ry="15" fill="url(#goldGradient)" opacity="0.3" />
          <path
            d="M70 140 Q70 100 100 90 Q130 100 130 140 Z"
            fill="url(#goldGradient)"
            stroke="#FFD700"
            strokeWidth="2"
          />
          {/* Lamp Spout */}
          <path
            d="M100 90 Q85 85 80 70 L80 60 Q80 50 90 50 L110 50 Q120 50 120 60 L120 70 Q115 85 100 90 Z"
            fill="url(#goldGradient2)"
            stroke="#FFD700"
            strokeWidth="2"
          />
          {/* Handle */}
          <path
            d="M130 120 Q145 120 150 110 Q155 100 150 90 Q145 80 130 80"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Decorative bands */}
          <ellipse cx="100" cy="100" rx="30" ry="3" fill="#FFD700" opacity="0.8" />
          <ellipse cx="100" cy="130" rx="40" ry="3" fill="#FFD700" opacity="0.8" />
          
          {/* Magical sparkles */}
          <circle cx="60" cy="80" r="2" fill="#FFD700" opacity="0.8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="140" cy="100" r="2" fill="#FFD700" opacity="0.8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="60" r="2" fill="#FFD700" opacity="0.8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
          </circle>
          
          {/* Gradients */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#FF8C00" />
            </linearGradient>
            <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE55C" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFA500" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Magical particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            background: '#FFD700',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0.6,
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-20px);
          }
        }

        @keyframes rotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
}
