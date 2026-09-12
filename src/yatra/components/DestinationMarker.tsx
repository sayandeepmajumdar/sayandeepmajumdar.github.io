import React, { useState } from 'react';
import { Destination } from '../types';

interface DestinationMarkerProps {
  destination: Destination;
  isSelected?: boolean;
  isHovered?: boolean;
  onClick: (destination: Destination) => void;
  onOpenInfo?: (destination: Destination) => void;
  scale?: number; // Map zoom scale to keep markers readable
}

export function getCategoryColor(categories: string[]): { primary: string; secondary: string } {
  const cat = categories[0]?.toLowerCase() || '';
  if (cat.includes('beach')) return { primary: '#06b6d4', secondary: '#22d3ee' };
  if (cat.includes('mountain')) return { primary: '#10b981', secondary: '#34d399' };
  if (cat.includes('heritage')) return { primary: '#f59e0b', secondary: '#fbbf24' };
  if (cat.includes('spiritual')) return { primary: '#a855f7', secondary: '#c084fc' };
  if (cat.includes('adventure')) return { primary: '#f97316', secondary: '#fb923c' };
  if (cat.includes('wildlife')) return { primary: '#84cc16', secondary: '#a3e635' };
  if (cat.includes('food')) return { primary: '#f43f5e', secondary: '#fb7185' };
  if (cat.includes('romantic')) return { primary: '#ec4899', secondary: '#f472b6' };
  return { primary: '#ea580c', secondary: '#f97316' };
}

export const DestinationMarker: React.FC<DestinationMarkerProps> = ({
  destination,
  isSelected = false,
  isHovered = false,
  onClick,
  onOpenInfo,
  scale = 1,
}) => {
  const [internalHover, setInternalHover] = useState(false);
  const activeHover = isHovered || internalHover;

  const { x, y } = destination.coordinates;
  const colors = getCategoryColor(destination.categories);

  // Counteract map zoom so marker size stays consistent and legible
  const inverseScale = 1 / Math.max(scale * 0.75, 0.85);

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected && onOpenInfo) {
      onOpenInfo(destination);
    } else {
      onClick(destination);
    }
  };

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${inverseScale})`}
      className="cursor-pointer select-none transition-transform duration-200"
      onClick={handleAction}
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
    >
      {/* Ground Shadow */}
      <ellipse
        cx="0"
        cy="2"
        rx={isSelected ? 7 : 4.5}
        ry={isSelected ? 2.5 : 1.8}
        fill="rgba(0, 0, 0, 0.6)"
      />

      {/* Radiant pulsing circles when selected */}
      {isSelected && (
        <>
          <circle
            r="14"
            fill={colors.primary}
            fillOpacity="0.3"
            className="animate-ping origin-center"
          />
          <circle
            r="22"
            fill={colors.secondary}
            fillOpacity="0.15"
            className="animate-pulse origin-center"
          />
        </>
      )}

      {isSelected ? (
        /* Selected: Prominent Location Pin */
        <g className="transition-transform duration-300">
          <path
            d="M 0,0 C -3,-4 -8,-10 -8,-16 A 8,8 0 1,1 8,-16 C 8,-10 3,-4 0,0 Z"
            fill={colors.primary}
            stroke="#ffffff"
            strokeWidth="1.6"
            filter="drop-shadow(0 3px 8px rgba(0,0,0,0.7))"
          />
          {/* Inner white eye */}
          <circle cx="0" cy="-16" r="3.5" fill="#ffffff" />
          <circle cx="0" cy="-16" r="2" fill={colors.secondary} />
        </g>
      ) : (
        /* Unselected Marker: Compact Location Pin */
        <g className="transition-all duration-200 hover:scale-125 origin-bottom">
          <path
            d="M 0,0 C -2.5,-3.5 -6,-8 -6,-13 A 6,6 0 1,1 6,-13 C 6,-8 2.5,-3.5 0,0 Z"
            fill="#0f172a"
            stroke={activeHover ? '#ffffff' : colors.primary}
            strokeWidth={activeHover ? 1.6 : 1.1}
            filter="drop-shadow(0 2px 5px rgba(0,0,0,0.6))"
          />
          <circle
            cx="0"
            cy="-13"
            r={activeHover ? 2.8 : 2.2}
            fill={colors.secondary}
          />
        </g>
      )}

      {/* When Selected: Compact Pill Callout right above the pin */}
      {isSelected && (
        <g
          transform="translate(0, -25)"
          className="transition-all duration-200 hover:scale-105 origin-bottom"
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenInfo) {
              onOpenInfo(destination);
            } else {
              onClick(destination);
            }
          }}
        >
          {/* Pointer Triangle */}
          <polygon
            points="-3,0 3,0 0,3"
            fill="#090d16"
            stroke={colors.primary}
            strokeWidth="0.8"
          />

          {/* Dynamic Compact Pill (Height: 20px) */}
          <rect
            x={-Math.max(92, destination.name.length * 6.5 + 26) / 2}
            y="-20"
            width={Math.max(92, destination.name.length * 6.5 + 26)}
            height="20"
            rx="10"
            fill="#090d16"
            stroke={colors.primary}
            strokeWidth="1.2"
            filter="drop-shadow(0 4px 10px rgba(0,0,0,0.75))"
          />

          {/* Destination Name */}
          <text
            x="0"
            y="-7"
            fill="#ffffff"
            fontSize="8.5"
            fontWeight="700"
            textAnchor="middle"
            fontFamily="Outfit, Inter, sans-serif"
          >
            📍 {destination.name}
          </text>
        </g>
      )}

      {/* Hover preview when not selected (strictly above pin, NO overlap) */}
      {!isSelected && activeHover && (
        <g transform="translate(0, -22)" className="pointer-events-none">
          {/* Pointer Triangle down to pin top */}
          <polygon
            points="-3,-1 3,-1 0,2"
            fill="rgba(15, 23, 42, 0.95)"
            stroke={colors.primary}
            strokeWidth="0.8"
          />
          {/* Dynamic Box placed strictly from y=-22 to y=-2 */}
          <rect
            x={-Math.max(86, destination.name.length * 6.2 + 22) / 2}
            y="-22"
            width={Math.max(86, destination.name.length * 6.2 + 22)}
            height="20"
            rx="6"
            fill="rgba(15, 23, 42, 0.95)"
            stroke={colors.primary}
            strokeWidth="1"
            filter="drop-shadow(0 4px 8px rgba(0,0,0,0.7))"
          />
          <text
            x="0"
            y="-8.5"
            fill="#ffffff"
            fontSize="8.5"
            fontWeight="600"
            textAnchor="middle"
            fontFamily="Outfit, Inter, sans-serif"
          >
            📍 {destination.name}
          </text>
        </g>
      )}
    </g>
  );
};
