import React from 'react';

interface ForgeKitLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showIcon?: boolean;
  className?: string;
}

export const ForgeKitLogo: React.FC<ForgeKitLogoProps> = ({
  size = 'md',
  showIcon = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-sm font-extrabold tracking-tight',
    md: 'text-base sm:text-lg font-extrabold tracking-tight',
    lg: 'text-xl sm:text-2xl font-black tracking-tight',
    hero: 'text-4xl sm:text-6xl font-black tracking-tight',
  };

  const iconSizes = {
    sm: 'w-6 h-6 rounded-lg',
    md: 'w-8 h-8 sm:w-9 sm:h-9 rounded-xl',
    lg: 'w-10 h-10 rounded-2xl',
    hero: 'w-14 h-14 sm:w-16 sm:h-16 rounded-3xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {showIcon && (
        <div
          className={`${iconSizes[size]} relative flex items-center justify-center p-0.5 shadow-md shrink-0 bg-surface border border-line overflow-hidden`}
        >
          {/* 4-color Google-style quadrant background accent */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-20 dark:opacity-30">
            <div className="bg-[#4285F4]" />
            <div className="bg-[#EA4335]" />
            <div className="bg-[#FBBC05]" />
            <div className="bg-[#34A853]" />
          </div>

          {/* SVG Multi-Color Anvil / Tool Mark */}
          <svg
            className="w-4/6 h-4/6 relative z-10 drop-shadow-xs"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Blue Handle */}
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" className="stroke-[#4285F4] dark:stroke-[#60a5fa]" />
            {/* Red & Yellow Accent Dots */}
            <circle cx="18" cy="6" r="1.5" className="fill-[#EA4335]" />
            <circle cx="6" cy="18" r="1.5" className="fill-[#34A853]" />
          </svg>
        </div>
      )}

      {/* Google-Style Colored Lettering */}
      <span className={`${sizeClasses[size]} inline-flex font-sans`}>
        <span className="text-[#4285F4] dark:text-[#5B95F5] transition-colors">F</span>
        <span className="text-[#EA4335] dark:text-[#F06A5D] transition-colors">o</span>
        <span className="text-[#FBBC05] dark:text-[#FCD04B] transition-colors">r</span>
        <span className="text-[#4285F4] dark:text-[#5B95F5] transition-colors">g</span>
        <span className="text-[#34A853] dark:text-[#57B972] transition-colors">e</span>
        <span className="text-[#EA4335] dark:text-[#F06A5D] transition-colors">K</span>
        <span className="text-[#4285F4] dark:text-[#5B95F5] transition-colors">i</span>
        <span className="text-[#34A853] dark:text-[#57B972] transition-colors">t</span>
      </span>
    </div>
  );
};
