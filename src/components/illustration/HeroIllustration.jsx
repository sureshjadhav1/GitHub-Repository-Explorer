import React from 'react';

export const HeroIllustration = () => {
  return (
    <div className="relative w-48 h-36 sm:w-56 sm:h-40 flex items-center justify-center select-none pointer-events-none">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 via-purple-400/10 to-pink-400/20 rounded-full filter blur-xl transform scale-90" />
      
      {/* Decorative Window Floating UI */}
      <svg
        className="w-full h-full drop-shadow-lg"
        viewBox="0 0 240 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Floating Code Window */}
        <rect x="25" y="20" width="150" height="105" rx="14" fill="white" className="dark:fill-[#1E2337]" stroke="url(#windowBorder)" strokeWidth="2" />
        
        {/* Window Dots */}
        <circle cx="42" cy="35" r="4" fill="#FF5F56" />
        <circle cx="54" cy="35" r="4" fill="#FFBD2E" />
        <circle cx="66" cy="35" r="4" fill="#27C93F" />

        {/* GitHub Octocat Silhouette on window */}
        <path
          d="M100 50 C80 50 70 65 70 80 C70 95 80 105 92 109 C94 109 95 108 95 106 V99 C95 99 90 100 87 96 C87 96 85 91 82 90 C82 90 78 88 82 88 C82 88 86 89 88 93 C91 97 96 96 98 95 C98 92 99 90 100 89 C89 87 80 84 80 69 C80 64 82 60 85 57 C84 56 82 51 86 45 C86 45 90 44 100 51 C104 50 108 50 112 50 C116 50 120 50 124 51 C134 44 138 45 138 45 C142 51 140 56 139 57 C142 60 144 64 144 69 C144 84 135 87 124 89 C126 91 127 94 127 98 V106 C127 108 128 109 130 109 C142 105 152 95 152 80 C152 65 142 50 100 50 Z"
          fill="url(#octoGradient)"
        />

        {/* Floating Search Magnifying Glass Icon */}
        <g className="animate-bounce" style={{ animationDuration: '3s' }}>
          <rect x="155" y="70" width="55" height="55" rx="27.5" fill="#6746F5" />
          <circle cx="178" cy="93" r="11" stroke="white" strokeWidth="3.5" fill="none" />
          <path d="M186 101 L197 112" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* Decorative Sparkles & Floating Shapes */}
        <circle cx="210" cy="30" r="3" fill="#FF6FAE" />
        <circle cx="15" cy="80" r="4" fill="#A64CFF" />
        <path d="M220 125 L225 135 L215 130 Z" fill="#6746F5" opacity="0.6" />
        <circle cx="190" cy="140" r="2.5" fill="#3B82F6" />

        {/* Gradients */}
        <defs>
          <linearGradient id="windowBorder" x1="25" y1="20" x2="175" y2="125" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6746F5" stopOpacity="0.4" />
            <stop offset="1" stopColor="#FF6FAE" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="octoGradient" x1="70" y1="50" x2="152" y2="109" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6746F5" />
            <stop offset="1" stopColor="#A64CFF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
