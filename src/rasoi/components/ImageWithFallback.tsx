import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  dishName?: string;
  categoryName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Indian Food Dish',
  className = '',
  dishName,
  categoryName,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // High quality curated fallback if specific dish fails to load
  const defaultFallback =
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80';

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100 text-stone-700 p-4 overflow-hidden ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-rose-900/10 flex items-center justify-center text-rose-800 mb-2">
          <Utensils className="w-6 h-6" />
        </div>
        <span className="text-xs font-semibold text-stone-800 text-center line-clamp-1">
          {dishName || alt}
        </span>
        {categoryName && (
          <span className="text-[10px] text-amber-800 uppercase tracking-wider font-medium mt-0.5">
            {categoryName}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-stone-200 via-amber-100 to-stone-200 animate-pulse" />
      )}
      <img
        src={src || defaultFallback}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
