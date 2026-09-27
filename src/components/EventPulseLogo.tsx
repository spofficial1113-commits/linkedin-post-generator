import React from 'react';

interface EventPulseLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  showBadge?: boolean;
}

export const EventPulseLogo: React.FC<EventPulseLogoProps> = ({
  size = 32,
  className = '',
  showText = true,
  showBadge = true
}) => {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Brand Icon SVG */}
      <div 
        style={{ width: size, height: size }}
        className="relative shrink-0 rounded-xl bg-gradient-to-br from-[#6b5bf8] via-[#5244e8] to-[#4033d4] flex items-center justify-center shadow-sm overflow-hidden"
      >
        {/* Soft background pulse radial aura */}
        <div className="absolute inset-0 bg-white/10 blur-[2px]" />
        
        {/* Waveform / Heart rate line */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-[72%] h-[72%] text-white relative z-10"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle glowing dot in top right */}
          <circle cx="70" cy="32" r="6" fill="rgba(255,255,255,0.4)" />
          
          {/* Continuous pulse path with rounded caps */}
          <path 
            d="M26 50 H38 L48 28 L58 70 L64 48 H74" 
            stroke="currentColor" 
            strokeWidth="8.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      {showText && (
        <span className="font-display text-lg font-bold tracking-tight text-[#1a1b1f]">
          EventPulse
        </span>
      )}

      {showBadge && (
        <span className="ml-1 inline-flex items-center bg-[#e3dfff] text-[#3622ca] font-medium text-[11px] px-2.5 py-0.5 rounded-full tracking-wide">
          AI Event Content
        </span>
      )}
    </div>
  );
};
